/* =====================================================================
   Mesin pencarian jenis usaha PU v2 (vanilla JS, tanpa DOM).
   createFinderEngine(window.KAMUS_USAHA_PU) → {search, suggest, ...}
   ===================================================================== */
function createFinderEngine(DB){
  'use strict';
  const L=DB.lexicon||{}, SC=DB.search_config||{};
  const W=Object.assign({exact_alias:120,exact_official:110,phrase_base:45,phrase_len_bonus:10,alias_prefix:50,alias_infix:40,
    token_max:100,activity_match:18,activity_conflict:-22,negative_term:-55,inferred_penalty:-10,needs_confirmation:-4,
    stem_factor:0.85,fuzzy_factor:0.6,prefix_factor:0.5,official_factor:0.7,inferred_factor:0.95,generic_wildcard:0.75},SC.weights_v2||{});
  const P=Object.assign({max_candidates:6,min_candidate_score:35,near_gap:45,strong_min_score:150,relative_cutoff:0.35},SC.result_policy||{});
  const VAR=L.variants||{}, STOP=new Set(L.stopwords||[]), WEAK=L.weak_tokens||{}, NOSTEM=new Set(L.no_stem||[]);
  const ENTRIES=DB.entries||[], BYID=new Map(ENTRIES.map(e=>[e.id,e]));
  const RULES=DB.decision_rules||[], RULE_BY_ID=new Map(RULES.map(r=>[r.id,r]));
  const ACTS=DB.activities||{};
  const VOW='aiueo';

  /* ---------- teks ---------- */
  function baseNorm(s){
    return String(s==null?'':s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
      .replace(/&/g,' dan ').replace(/['’`]/g,'').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
  }
  function canon(s){
    const out=[];
    for(const t of baseNorm(s).split(' ')){
      if(!t)continue;
      const v=Object.prototype.hasOwnProperty.call(VAR,t)?VAR[t]:t;
      for(const p of String(v).split(' ')){ if(p&&out[out.length-1]!==p) out.push(p); }
    }
    return out;
  }
  const stemCache=new Map();
  function stripPrefix(w,hadAn,out){
    const v=c=>VOW.includes(c), add=(x,min)=>{ if(x&&x.length>=(min||4)) out.add(x); };
    if(w.startsWith('penge')||w.startsWith('menge')) add(w.slice(5),3);
    if(w.startsWith('peng')||w.startsWith('meng')){ const r=w.slice(4); if(r){ if(v(r[0])){add(r);add('k'+r);} else add(r);} }
    if(w.startsWith('peny')||w.startsWith('meny')){ const r=w.slice(4); if(r&&v(r[0])) add('s'+r); }
    if(w.startsWith('pem')||w.startsWith('mem')){ const r=w.slice(3); if(r){ if(v(r[0])) add('p'+r); else add(r);} }
    if(w.startsWith('pen')||w.startsWith('men')){ const r=w.slice(3); if(r){ if(v(r[0])){add('t'+r);add(r);} else add(r);} }
    if(w.startsWith('per')) add(w.slice(3));
    if(w.startsWith('pe')||w.startsWith('me')) add(w.slice(2));
    if(w.startsWith('ber')) add(w.slice(3));
    if(w.startsWith('be')) add(w.slice(2));
    if(w.startsWith('ter')) add(w.slice(3));
    if(w.startsWith('di')) add(w.slice(2));
    if(hadAn&&w.startsWith('ke')) add(w.slice(2));
  }
  function stems(t){
    if(stemCache.has(t)) return stemCache.get(t);
    const set=new Set([t]);
    if(t.length>=5&&!NOSTEM.has(t)&&!/\d/.test(t)){
      const bases=[t]; let hadAn=false;
      for(const suf of ['nya','lah','kah']) if(t.endsWith(suf)&&t.length-suf.length>=4) bases.push(t.slice(0,-suf.length));
      for(const b of bases.slice()){
        if(b.endsWith('kan')&&b.length-3>=4) bases.push(b.slice(0,-3));
        if(b.endsWith('an')&&b.length-2>=3){ bases.push(b.slice(0,-2)); hadAn=true; }
      }
      for(const b of bases){ set.add(b); if(b.length>=5) stripPrefix(b,hadAn,set); }
    }
    stemCache.set(t,set); return set;
  }
  function lev(a,b,max){
    if(Math.abs(a.length-b.length)>max) return max+1;
    let prev=Array.from({length:b.length+1},(_,j)=>j);
    for(let i=1;i<=a.length;i++){
      const cur=[i]; let rowMin=i;
      for(let j=1;j<=b.length;j++){ const c=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1)); cur.push(c); if(c<rowMin)rowMin=c; }
      if(rowMin>max) return max+1; prev=cur;
    }
    return prev[b.length];
  }
  function eqTok(a,b){ if(a===b) return true; const sa=stems(a), sb=stems(b); for(const x of sa) if(sb.has(x)) return true; return false; }
  function containsSeq(hay,needle,eq){
    if(!needle.length||needle.length>hay.length) return false;
    outer: for(let i=0;i<=hay.length-needle.length;i++){ for(let j=0;j<needle.length;j++){ if(!(eq?eq(hay[i+j],needle[j]):hay[i+j]===needle[j])) continue outer; } return true; }
    return false;
  }

  /* ---------- indeks ---------- */
  const DF=new Map(), SDF=new Map();
  const KRANK={official:0,inferred:1,alias:2};
  function mkPhrase(raw,kind){
    const t=canon(raw), m=t.filter(x=>!STOP.has(x));
    return {raw,kind,t,text:t.join(' '),m,mtext:m.join(' ')};
  }
  const docs=ENTRIES.map(e=>{
    const phrases=[mkPhrase(e.official_name,'official')]
      .concat((e.aliases||[]).map(a=>mkPhrase(a,'alias')))
      .concat((e.aliases_inferred||[]).map(a=>mkPhrase(a,'inferred')));
    const tok=new Map(), stem=new Map(), tokKind=new Map();
    for(const ph of phrases){
      const f=ph.kind==='official'?W.official_factor:ph.kind==='inferred'?W.inferred_factor:1;
      for(const t of ph.m){
        if(!tok.has(t)||tok.get(t)<f){ tok.set(t,f); tokKind.set(t,ph.kind); }
        for(const s of stems(t)) if(s!==t&&(!stem.has(s)||stem.get(s)<f)) stem.set(s,f);
      }
    }
    for(const t of tok.keys()) DF.set(t,(DF.get(t)||0)+1);
    for(const s of stem.keys()) if(!tok.has(s)) SDF.set(s,(SDF.get(s)||0)+1);
    const neg=(e.negative_terms||[]).map(canon).filter(x=>x.length);
    return {e,phrases,tok,stem,tokKind,neg};
  });
  const N=docs.length, LOGN=Math.log(1+N);
  function idf(key){ const df=(DF.get(key)||0)+(SDF.get(key)||0); return df?Math.log(1+N/df)/LOGN:0; }
  const VOCAB=[...DF.keys()];
  const byLen=new Map(); for(const v of VOCAB){ if(!byLen.has(v.length)) byLen.set(v.length,[]); byLen.get(v.length).push(v); }
  function fuzzy(t){
    const k=t.length>=7?2:1, res=[];
    for(let L2=t.length-k;L2<=t.length+k;L2++) for(const v of (byLen.get(L2)||[])){
      if(v[0]!==t[0]&&k===1) continue;
      const d=lev(t,v,k); if(d<=k) res.push({tok:v,d});
    }
    return res.sort((a,b)=>a.d-b.d||(DF.get(b.tok)-DF.get(a.tok))).slice(0,4);
  }
  function isStop(t){
    if(STOP.has(t)) return true;
    if(DF.has(t)) return false;
    for(const s of stems(t)) if(s!==t&&STOP.has(s)) return true;
    return false;
  }
  const SIG=Object.entries(L.activity_signals||{}).map(([act,terms])=>({act,phrases:terms.map(canon).filter(p=>p.length)}));
  const CONFL=L.activity_conflicts||{};
  const HINTS=(L.segment_hints||[]).map(h=>Object.assign({},h,{phrases:h.terms.map(canon)}));
  const TIPS=(L.tips||[]).map(t=>Object.assign({},t,{phrases:t.terms.map(canon)}));
  const CROUTE=(L.construction_route_terms||[]).map(canon);
  const TRIG=RULES.map(r=>({r,trig:new Set((r.triggers||[]).map(t=>canon(t).filter(x=>!STOP.has(x)).join(' ')).filter(Boolean))}));
  const GENERIC=(L.generic_entries||[]).map(g=>({entry:g.entry,phrases:g.terms.map(canon).filter(p=>p.length)}));
  const GENERIC_TOK=new Set(); for(const g of GENERIC) for(const p of g.phrases) for(const t of p) GENERIC_TOK.add(t);
  const SIGNAL_TOK=new Set(); for(const sgl of Object.values(L.activity_signals||{})) for(const t of sgl){ const c=canon(t); if(c.length===1) SIGNAL_TOK.add(c[0]); }
  const GQ=(L.generic_queries||[]).map(g=>Object.assign({},g,{set:new Set(g.terms.map(t=>canon(t).join(' ')))}));
  const GQ_TOK=new Set(); for(const g of GQ) for(const t of g.terms) for(const x of canon(t)) GQ_TOK.add(x);

  /* ---------- analisis query ---------- */
  function detectSignals(toks){
    const found=new Set();
    for(const s of SIG){
      for(const p of s.phrases){
        if(p.length===1){ if(toks.some(t=>t===p[0]||stems(t).has(p[0]))){found.add(s.act);break;} }
        else if(containsSeq(toks,p)){found.add(s.act);break;}
      }
    }
    return found;
  }
  function isKnown(t){ if(DF.has(t)||SDF.has(t)) return true; for(const s of stems(t)) if(s!==t&&(DF.has(s)||SDF.has(s))) return true; return false; }
  function hasPhrase(toks,p){ return p.length===1?toks.some(t=>t===p[0]||stems(t).has(p[0])):containsSeq(toks,p); }
  function analyze(q){
    let toks=canon(q);
    // koreksi ejaan: token tak dikenal → token kosakata terdekat (jarak 1; atau 2 untuk kata ≥8 huruf)
    const corrected=[];
    toks=toks.map(t=>{
      if(STOP.has(t)||isKnown(t)||t.length<4||/\d/.test(t)) return t;
      const fz=fuzzy(t); if(!fz.length) return t;
      const lim=t.length>=8?2:1; if(fz[0].d>lim) return t;
      corrected.push({from:t,to:fz[0].tok}); return fz[0].tok;
    });
    const mean=toks.filter(t=>!isStop(t));
    const qt=mean.map((t,i)=>{
      const st=[...stems(t)].filter(s=>s!==t);
      const known=isKnown(t);
      const fz=(!known&&t.length>=4&&!/^\d+$/.test(t))?fuzzy(t):[];
      let w0=Math.max(idf(t),...st.map(idf),...fz.map(f=>idf(f.tok)),0);
      if(!w0) w0=0.5;
      const w=w0*(Object.prototype.hasOwnProperty.call(WEAK,t)?WEAK[t]:1);
      return {t,stems:st,fuzzy:fz,w,known:known||fz.length>0,isLast:i===mean.length-1,generic:GENERIC_TOK.has(t),signal:SIGNAL_TOK.has(t)||[...st].some(x=>SIGNAL_TOK.has(x))};
    });
    const generic=new Set(GENERIC.filter(g=>g.phrases.some(p=>hasPhrase(toks,p))).map(g=>g.entry));
    return {raw:q,toks,mean,mtext:mean.join(' '),qt,signals:detectSignals(toks),corrected,generic,knownCount:qt.filter(x=>x.known).length||mean.length};
  }

  /* ---------- skor ---------- */
  function tokenMatch(q,d){
    let m=0,kind=null;
    const f=d.tok.get(q.t); if(f){m=f;kind=d.tokKind.get(q.t);}
    if(m<1){
      for(const s of q.stems){ const g=d.tok.get(s); if(g&&g*W.stem_factor>m){m=g*W.stem_factor;kind=d.tokKind.get(s);} const h=d.stem.get(s); if(h&&h*W.stem_factor>m){m=h*W.stem_factor;kind=kind||'alias';} }
      const g2=d.stem.get(q.t); if(g2&&g2*W.stem_factor>m){m=g2*W.stem_factor;kind=kind||'alias';}
    }
    if(m===0) for(const fz of q.fuzzy){ const g=d.tok.get(fz.tok); if(g){ const v=g*W.fuzzy_factor*(fz.d===1&&q.t.length>=6?1.25:1); if(v>m){m=v;kind=d.tokKind.get(fz.tok);} } }
    if(m===0&&q.isLast&&q.t.length>=3&&!q.known){ for(const [tok,g] of d.tok){ if(tok.length>q.t.length&&tok.startsWith(q.t)&&g*W.prefix_factor>m){m=g*W.prefix_factor;kind=d.tokKind.get(tok);} } }
    return {m,kind};
  }
  function scoreDoc(d,A){
    let best={s:0,ph:null};
    for(const ph of d.phrases){
      if(!ph.m.length) continue;
      let s=0;
      if(ph.mtext===A.mtext) s=ph.kind==='official'?W.exact_official:W.exact_alias;
      else{
        if(ph.m.length<=A.mean.length&&containsSeq(A.mean,ph.m,eqTok)){
          const cov=Math.min(1,ph.m.length/Math.max(1,A.knownCount));
          s=W.phrase_base*cov+W.phrase_len_bonus*Math.min(ph.m.length,3);
        }
        if(A.mtext.length>=3){
          if(ph.mtext.startsWith(A.mtext+' ')||(ph.mtext.startsWith(A.mtext)&&A.qt.length&&!A.qt[A.qt.length-1].known)) s=Math.max(s,W.alias_prefix);
          else if(ph.mtext.includes(' '+A.mtext+' ')||ph.mtext.endsWith(' '+A.mtext)) s=Math.max(s,W.alias_infix);
        }
        if(ph.kind==='official') s*=0.9;
      }
      if(s>best.s||(s===best.s&&s>0&&KRANK[ph.kind]>KRANK[best.ph.kind])) best={s,ph};
    }
    let num=0,den=0; const kinds=new Set(); let matchedTok=0;
    const wild=A.generic.has(d.e.id);
    for(const q of A.qt){
      den+=q.w; const r=tokenMatch(q,d);
      let m=r.m; if(wild&&m<W.generic_wildcard&&!q.generic&&!q.signal) m=W.generic_wildcard;
      num+=q.w*m; if(r.m>0){matchedTok++;kinds.add(r.kind);}
    }
    const cov=den?num/den:0;
    if(best.s===0&&cov===0) return null;
    const parts={phrase:Math.round(best.s),token:Math.round(W.token_max*cov)};
    let score=best.s+W.token_max*cov;
    const acts=d.e.activity||[];
    if(A.signals.size){
      if(acts.some(a=>A.signals.has(a))){score+=W.activity_match;parts.activity=W.activity_match;}
      else if([...A.signals].some(sig=>acts.length&&acts.every(a=>(CONFL[sig]||[]).includes(a)))){score+=W.activity_conflict;parts.activity=W.activity_conflict;}
    }
    let negHits=0;
    for(const n of d.neg){ if(containsSeq(A.toks,n)){ negHits++; if(negHits>=2)break; } }
    if(negHits){score+=W.negative_term*negHits;parts.negative=W.negative_term*negHits;}
    const viaInferred=best.ph?best.ph.kind==='inferred':(kinds.size>0&&[...kinds].every(k=>k==='inferred'));
    if(viaInferred){score+=W.inferred_penalty;parts.inferred=W.inferred_penalty;}
    if(d.e.needs_confirmation){score+=W.needs_confirmation;parts.confirm=W.needs_confirmation;}
    // label pencocokan untuk ditampilkan
    let label=null;
    if(best.ph&&best.ph.kind!=='official') label=best.ph.raw;
    else{
      let bo=0;
      for(const ph of d.phrases){ if(ph.kind==='official')continue; let o=0; for(const t of ph.m) if(A.mean.some(q=>eqTok(q,t)))o++; if(o>bo||(o===bo&&o>0&&label&&ph.raw.length<label.length)){bo=o;label=ph.raw;} }
      if(!bo) label=null;
    }
    return {score:Math.round(score),parts,viaInferred,label,coverage:cov,matchedTok};
  }

  /* ---------- keputusan ---------- */
  function triggeredRule(A,skip){
    for(const x of TRIG){ if(skip&&skip.includes(x.r.id)) continue; if(x.trig.has(A.mtext)) return x.r; }
    return null;
  }
  function resolvePrefer(ids,scoreMap){
    let best=ids[0],bs=-Infinity;
    for(const id of ids){ const s=scoreMap.get(id); if(s!==undefined&&s>bs){bs=s;best=id;} }
    return best;
  }
  function ruleQuestion(r,A,scored){
    const scoreMap=new Map(scored.map(x=>[x.e.id,x.score]));
    let opts=r.options.map((o,i)=>Object.assign({index:i},o));
    if(!r.ignore_signals&&A.signals.size){
      const f=opts.filter(o=>o.action||!o.activity||A.signals.has(o.activity));
      if(f.length) opts=f;
    }
    opts=opts.map(o=>{ if(o.action) return o; const id=resolvePrefer(o.prefer||[],scoreMap); return Object.assign({},o,{entry:id,group:(BYID.get(id)||{}).group}); });
    const hasAction=opts.some(o=>o.action);
    const groups=new Set(opts.filter(o=>!o.action).map(o=>o.group));
    if(!hasAction&&groups.size<=1) return {skip:true,entry:opts[0]&&opts[0].entry};
    return {type:'rule',rule:r.id,title:r.question,note:r.note||'',options:opts.map(o=>({label:o.label,action:o.action||null,entry:o.entry||null,group:o.group||null,prefer:o.prefer||[],index:o.index}))};
  }
  function exampleFor(x){ return x.label||((x.e.aliases||[])[0])||''; }
  function search(q,opt){
    opt=opt||{};
    const A=analyze(q);
    const out={query:q,analysis:A,corrected:A.corrected,status:null,candidates:[],near:[],question:null,hints:[],tips:[],route:null,consensusGroup:null,generic:false};
    out.hints=HINTS.filter(h=>h.phrases.some(p=>p.length&&containsSeq(A.toks,p)));
    out.tips=TIPS.filter(t=>t.phrases.some(p=>p.length&&containsSeq(A.toks,p)));
    if(!A.mean.length){out.status='empty';return out;}
    if(!opt.skipRoute&&CROUTE.some(p=>containsSeq(A.toks,p))){out.status='route';out.route='constructionGate';return out;}
    if(A.mean.every(t=>GQ_TOK.has(t))){
      const g=GQ.find(x=>x.set.has(A.mtext))||GQ.find(x=>A.mean.some(t=>x.set.has(t)));
      if(g){out.status='generic';out.generic={message:g.message,examples:g.examples};return out;}
    }
    let scored=[];
    for(const d of docs){ if(opt.exclude&&opt.exclude.includes(d.e.id)) continue; const r=scoreDoc(d,A); if(r&&r.score>=P.min_candidate_score) scored.push(Object.assign({e:d.e},r)); }
    scored.sort((a,b)=>b.score-a.score||b.coverage-a.coverage||a.e.group-b.e.group);
    if(!scored.length){out.status='none';return out;}
    const topS=scored[0].score;
    scored=scored.filter(x=>x.score>=topS*P.relative_cutoff).slice(0,P.max_candidates);
    out.candidates=scored;
    let near=scored.filter(x=>topS-x.score<P.near_gap&&(x===scored[0]||x.matchedTok>=scored[0].matchedTok));
    // 1) aturan eksplisit (trigger)
    if(!opt.noQuestion){
      const r=triggeredRule(A,opt.skipRules);
      if(r){
        const qn=ruleQuestion(r,A,scored);
        if(qn&&!qn.skip){out.question=qn;out.status='question';out.near=near;return out;}
        if(qn&&qn.skip&&qn.entry){ // semua opsi relevan bertarif sama → dahulukan entri itu
          const i=scored.findIndex(x=>x.e.id===qn.entry);
          if(i>0){ const [x]=scored.splice(i,1); scored.unshift(x); }
          else if(i<0&&BYID.get(qn.entry)){ scored.unshift({e:BYID.get(qn.entry),score:topS,parts:{rule:1},viaInferred:false,label:null,coverage:1}); }
          out.candidates=scored; near=scored.filter(x=>scored[0].score-x.score<P.near_gap);
        }
      }
      // 2) aturan dari tag ambiguitas kandidat teratas
      const top0=scored[0];
      for(const tag of (top0.e.ambiguity_tags||[])){
        if(opt.skipRules&&opt.skipRules.includes(tag)) continue;
        const r=RULE_BY_ID.get(tag); if(!r) continue;
        const hasAction=r.options.some(o=>o.action);
        if(hasAction){ out.question=ruleQuestion(r,A,scored); out.status='question'; out.near=near; return out; }
        const pref=new Set(r.options.flatMap(o=>o.prefer||[]));
        const inv=near.filter(x=>pref.has(x.e.id));
        if(inv.length>=2&&new Set(inv.map(x=>x.e.group)).size>1){
          const qn=ruleQuestion(r,A,scored);
          if(qn&&!qn.skip){out.question=qn;out.status='question';out.near=near;return out;}
        }
      }
      // 3) facet kegiatan / pilih kandidat bila tarif berbeda
      if(new Set(near.map(x=>x.e.group)).size>1){
        let pool=near;
        if(A.signals.size){ const f=near.filter(x=>(x.e.activity||[]).some(a=>A.signals.has(a))); if(f.length) pool=f; }
        if(new Set(pool.map(x=>x.e.group)).size>1){
          const byAct=new Map();
          for(const x of pool){ const acts=x.e.activity||['jasa']; const a=acts.find(y=>A.signals.has(y))||acts[0]; if(!byAct.has(a)) byAct.set(a,[]); byAct.get(a).push(x); }
          if(byAct.size>1){
            out.question={type:'facet',rule:'facet_activity',title:'Apa kegiatan utama usaha Anda?',note:'Kata kunci ini cocok dengan beberapa jenis kegiatan yang tarif JKK-nya berbeda.',
              options:[...byAct.entries()].map(([a,xs],i)=>({label:(ACTS[a]||{label:a}).label,example:xs.map(exampleFor).filter(Boolean).slice(0,2).join(', '),entries:xs.map(x=>x.e.id),group:new Set(xs.map(x=>x.e.group)).size===1?xs[0].e.group:null,index:i}))};
          }else{
            out.question={type:'pick',rule:'pick_candidate',title:'Mana yang paling mendekati kegiatan utama usaha Anda?',note:'Kandidat berikut memiliki tarif JKK berbeda.',options:pool.map((x,i)=>({label:x.e.official_name,entry:x.e.id,group:x.e.group,index:i}))};
          }
          out.status='question';out.near=pool;return out;
        }
        near=pool;
        const rest=scored.filter(x=>!pool.includes(x));
        out.candidates=pool.concat(rest);
      }
    }
    out.near=near;
    if(near.length>1&&new Set(near.map(x=>x.e.group)).size===1){out.status='consensus';out.consensusGroup=near[0].e.group;}
    else if(out.candidates[0].score>=P.strong_min_score&&near.length===1) out.status='strong';
    else out.status='weak';
    return out;
  }
  function resolveOption(res,index){
    const q=res.question; if(!q) return null;
    const o=q.options.find(x=>x.index===index); if(!o) return null;
    if(o.action) return {action:o.action};
    if(q.type==='facet'){ if(o.entries.length===1||o.group!=null) return {entry:o.entries[0],alternatives:o.entries.slice(1)}; return {pick:o.entries}; }
    return {entry:o.entry,alternatives:(o.prefer||[]).filter(x=>x!==o.entry)};
  }
  function suggest(q,limit){
    limit=limit||6;
    const t=canon(q).join(' '); if(t.length<2) return [];
    const seen=new Map();
    for(const d of docs) for(const ph of d.phrases){
      if(!ph.text) continue;
      let r=0;
      if(ph.text===t) r=100; else if(ph.text.startsWith(t)) r=80-Math.min(30,ph.text.length-t.length); else if(ph.text.includes(' '+t)) r=45-Math.min(20,ph.text.length-t.length);
      if(!r) continue;
      if(ph.kind==='official') r-=12; else if(ph.kind==='inferred') r-=4;
      const key=ph.text, cur=seen.get(key);
      if(!cur) seen.set(key,{label:ph.kind==='official'?d.e.official_name:ph.raw,r,ids:[d.e.id],kind:ph.kind});
      else{ if(!cur.ids.includes(d.e.id)) cur.ids.push(d.e.id); if(r>cur.r) cur.r=r; }
    }
    return [...seen.values()].sort((a,b)=>b.r-a.r||a.label.length-b.label.length).slice(0,limit)
      .map(x=>({label:x.label,ids:x.ids,entries:x.ids.map(id=>BYID.get(id)),multi:x.ids.length>1}));
  }
  function sectorEntries(sectorId){ return ENTRIES.filter(e=>(e.sectors||[]).includes(sectorId)); }
  function audit(){
    const alias=ENTRIES.reduce((s,e)=>s+(e.aliases||[]).length,0), inf=ENTRIES.reduce((s,e)=>s+(e.aliases_inferred||[]).length,0);
    const noAlias=ENTRIES.filter(e=>!(e.aliases||[]).length&&!(e.aliases_inferred||[]).length).map(e=>e.id);
    const idx=new Map();
    for(const d of docs) for(const ph of d.phrases){ if(ph.kind==='official'||!ph.mtext) continue; if(!idx.has(ph.mtext)) idx.set(ph.mtext,new Set()); idx.get(ph.mtext).add(d.e.id); }
    const collisions=[...idx.entries()].filter(([,v])=>v.size>1).map(([k,v])=>({alias:k,ids:[...v],groups:[...new Set([...v].map(id=>BYID.get(id).group))]}));
    const perGroup={}; for(const e of ENTRIES){ perGroup[e.group]=(perGroup[e.group]||0)+1; }
    return {entries:ENTRIES.length,aliases:alias,inferred:inf,noAlias,collisions,perGroup,draft:ENTRIES.filter(e=>e.alias_review_status==='draft_v0_3').length,vocab:VOCAB.length};
  }
  function runTests(cases){
    const results=[];
    for(const c of (cases||DB.test_cases||[])){
      const r=search(c.q); const ids=r.candidates.map(x=>x.e.id); const answered=['strong','consensus','weak'].includes(r.status);
      let ok=true; const why=[];
      if(c.top){ const pass=answered&&ids[0]===c.top; if(!pass){ok=false;why.push(`top=${ids[0]||'-'} (${r.status}${r.question?':'+r.question.rule:''})`);} }
      if(c.in3){ if(!ids.slice(0,3).includes(c.in3)){ok=false;why.push(`top3=${ids.slice(0,3).join(',')||'-'}`);} }
      if(c.group){ const pass=answered&&r.candidates[0].e.group===c.group; if(!pass){ok=false;why.push(`group=${r.candidates[0]?r.candidates[0].e.group:'-'} (${r.status})`);} }
      if(c.ask){ const pass=r.status==='question'&&(c.ask==='*'||r.question.rule===c.ask); if(!pass){ok=false;why.push(`status=${r.status}${r.question?':'+r.question.rule:''} top=${ids[0]||'-'}`);} }
      if(c.route){ if(r.route!==c.route){ok=false;why.push(`route=${r.route||'-'} status=${r.status}`);} }
      if(c.hint){ if(!r.hints.some(h=>h.id===c.hint)){ok=false;why.push('hint tidak muncul');} }
      if(c.none){ if(r.status!=='none'){ok=false;why.push(`status=${r.status} top=${ids[0]||'-'}`);} }
      if(c.generic){ if(r.status!=='generic'){ok=false;why.push(`status=${r.status}`);} }
      results.push({q:c.q,ok,why:why.join('; '),expect:c});
    }
    return {total:results.length,passed:results.filter(x=>x.ok).length,results};
  }
  return {search,resolveOption,suggest,analyze,canon,stems,sectorEntries,audit,runTests,byId:id=>BYID.get(id),entries:ENTRIES,rules:RULES,
    sectors:DB.sectors||[],activities:ACTS,riskGroups:DB.risk_groups||{},version:(DB.metadata||{}).version};
}
/* ENGINE:END */
if(typeof module!=='undefined') module.exports={createFinderEngine};
