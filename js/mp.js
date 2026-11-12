/* Play together: other players walk around the same town, and everyone can race at the cyber quiz table.
   Each player's cases stay on their own device. Only "presence" is shared (name, character, position,
   quiz score), it lives only while the game is open, and nothing is stored on a server.
   The link: Supabase Realtime when SUPA has a url and key (for the public website), otherwise the Claude
   artifact room, otherwise single-player. */
const SUPA={url:"https://mhxcivjgcobzrosgjupu.supabase.co", key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeGNpdmpnY29ienJvc2dqdXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ0OTI1NjEsImV4cCI6MjExMDA2ODU2MX0.poafJhGL6zQxCEZaC7FihrScjNpY0OekDEI1zTX2mP4"};   /* Supabase → Project Settings → API: Project URL and the anon public key */
const MP={st:"…", err:"", on:false, kind:null, peers:[], me:{}, dirty:false, sent:0, shown:{}};
const mpId=(()=>{ const r=()=>Math.random().toString(36).slice(2,10); try{ let v=sessionStorage.getItem("cm-mp"); if(!v){ v=r(); sessionStorage.setItem("cm-mp",v); } return v; }catch(e){ return r(); } })();
function mpSet(patch){ let ch=false; for(const k in patch){ if(JSON.stringify(MP.me[k])!==JSON.stringify(patch[k])){ MP.me[k]=patch[k]; ch=true; } } if(ch) MP.dirty=true; }
const mpOthers=()=>MP.peers.filter(p=>!p.me && p.p && p.p.v===1);
const mpName=()=>(S.name||(S.char&&PEOPLE[S.char]?PEOPLE[S.char].name[S.lang]:"")||L("ผู้เล่น","Player")).slice(0,16);

function mpLoad(src){ return new Promise((ok,no)=>{ const s=document.createElement("script"); s.src=src; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
async function mpSupa(){
  MP.st="load"; await mpLoad("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js");
  MP.st="join";
  const sb=window.supabase.createClient(SUPA.url,SUPA.key), ch=sb.channel("cyber-mission-town",{config:{presence:{key:mpId}}});
  ch.on("presence",{event:"sync"},()=>{ const st=ch.presenceState(); MP.peers=Object.entries(st).map(([k,a])=>({id:k, me:k===mpId, p:(a&&a[a.length-1])||{}})); });
  await new Promise((ok,no)=>{ const t=setTimeout(()=>no("timeout"),10000); ch.subscribe((s,err)=>{ MP.st=s; if(err) MP.err=String(err&&err.message||err); console.log("[mp] supabase",s,err||""); if(s==="SUBSCRIBED"){ clearTimeout(t); ok(); } else if(s==="CHANNEL_ERROR"||s==="TIMED_OUT"){ clearTimeout(t); no(s); } }); });
  MP.ch=ch; MP.kind="supa"; MP.on=true; MP.dirty=true;
}
async function mpClaude(){
  if(!(window.claude && typeof claude.use==="function")) return;
  const room=await claude.use("room"); if(!room) return;
  MP.room=room; MP.kind="claude";
  room.onPeers(c=>{ MP.peers=c.peers.map(x=>({id:x.peer, me:x.sameTab, p:x.presence||{}})); }, ()=>{ MP.on=false; MP.peers=[]; });
  room.onConnection(c=>{ MP.on=c; if(c) MP.dirty=true; }, ()=>{ MP.on=false; MP.peers=[]; });
}
/* for testing on one computer: open the game with ?mpdev in several tabs */
function mpTabs(){
  const bc=new BroadcastChannel("cm-mp"), seen={};
  bc.onmessage=e=>{ const d=e.data; if(d&&d.id){ seen[d.id]={p:d.p,t:Date.now()}; } };
  setInterval(()=>{ bc.postMessage({id:mpId,p:MP.me}); const now=Date.now();
    MP.peers=[{id:mpId,me:true,p:MP.me}].concat(Object.entries(seen).filter(([k,v])=>now-v.t<3000).map(([k,v])=>({id:k,me:false,p:v.p}))); },200);
  MP.kind="tabs"; MP.on=true;
}
async function mpInit(){
  if(/[?&]mpdev/.test(location.search) && window.BroadcastChannel){ mpTabs(); return; }
  if(SUPA.url && SUPA.key){ try{ await mpSupa(); return; }catch(e){ MP.kind=null; MP.err=MP.err||String(e&&e.message||e||"load"); console.warn("[mp] supabase failed",e); } }
  try{ await mpClaude(); }catch(e){ MP.kind=null; }
}
function mpFlush(){
  if(!MP.on) return;
  const now=performance.now(), gap=MP.kind==="supa"?300:120;
  if(!MP.dirty && now-MP.sent<4000) return;   /* resend every few seconds anyway, so a dropped update heals */
  if(now-MP.sent<gap) return;
  MP.sent=now; MP.dirty=false; const st={...MP.me};
  if(MP.kind==="claude") MP.room.presence(st).catch(()=>{});
  else if(MP.kind==="supa") MP.ch.track(st).then(r=>{ if(r!=="ok"){ MP.dirty=true; MP.err="track "+r; } }).catch(e=>{ MP.dirty=true; MP.err="track "+(e&&e.message||e); });
}
/* which room of the town you're standing in: zone, plus library floor / office building+floor / police floor */
const mpZone=()=>S.zone+"."+(S.zone===2?libFloor():S.zone===8?(S.bld||0)+"-"+offFloor():S.zone===7?(S.floor||1):0);
function stepMp(){
  if(S.char) mpSet({v:1, nm:mpName(), ch:S.char, zk:mpZone(), x:Math.round(player.x), y:Math.round(player.y), d:player.dir, mv:player.moving?1:0});
  mpFlush(); mpPill();
}

/* ---------- drawing the other players ---------- */
function mpDrawItems(items, now){
  const zk=mpZone();
  for(const o of mpOthers()){
    const p=o.p; if(p.zk!==zk || !IMG[p.ch] || typeof p.x!=="number") continue;
    const s=MP.shown[o.id]||(MP.shown[o.id]={x:p.x,y:p.y});
    s.x+=(p.x-s.x)*0.25; s.y+=(p.y-s.y)*0.25; if(Math.hypot(p.x-s.x,p.y-s.y)>300){ s.x=p.x; s.y=p.y; }
    items.push({y:s.y, d:g=>mpDrawOne(g,o,s,now)});
  }
  if(S.zone===6 && QT_SPOT) items.push({y:QT_SPOT.y-40, d:g=>mpDrawTableSign(g,now)});
}
function mpDrawOne(g,o,s,now){
  const p=o.p, c={id:p.ch, dir:p.d||"down", moving:!!p.mv, t:now/1000+s.x*.01};
  const {im,flip}=spriteFor(c); if(!im||!im.naturalWidth) return;
  const h=CHAR_H, w=im.naturalWidth*h/im.naturalHeight, bob=c.moving&&!RM?-Math.abs(Math.sin(c.t*13))*3.2:0;
  g.save(); g.fillStyle="rgba(0,0,0,.18)"; g.beginPath(); g.ellipse(s.x,s.y,17,6,0,0,7); g.fill();
  g.globalAlpha=.92; g.translate(s.x,s.y+bob); g.scale(flip?-1:1,1); g.drawImage(im,-w/2,-h,w,h); g.restore();
  const name=String(p.nm||"").slice(0,16)||"?";
  g.save(); g.font="700 12px 'Noto Sans Thai', Tahoma, sans-serif"; const tw=g.measureText(name).width+18, ty=s.y-h-14;
  rr(g,s.x-tw/2,ty-11,tw,20,10); g.fillStyle=p.qt?"#FFC93C":"#1E1A16"; g.fill(); g.lineWidth=2; g.strokeStyle="#1E1A16"; g.stroke();
  g.fillStyle=p.qt?"#1E1A16":"#FFF4E0"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(name,s.x,ty); g.restore();
}
/* the quiz table: the round table with dice at the student plaza */
const QT_SPOT={x:200, y:316};
const nearQuizTable=()=>S.zone===6 && S.char && Math.hypot(player.x-QT_SPOT.x,player.y-(QT_SPOT.y+18))<70;
function mpDrawTableSign(g,now){
  const n=1+mpOthers().filter(o=>o.p.qt).length*(MP.on?1:0), x=QT_SPOT.x, y=QT_SPOT.y-74+(RM?0:Math.sin(now/400)*2);
  const t=L("🏆 แข่งตอบปัญหา","🏆 Quiz race")+(n>1?` · ${n}`:"");
  g.save(); g.font="800 13px 'Noto Sans Thai', Tahoma, sans-serif"; const tw=g.measureText(t).width+20;
  rr(g,x-tw/2,y-13,tw,26,6); g.fillStyle="#FFC93C"; g.fill(); g.lineWidth=2.5; g.strokeStyle="#1E1A16"; g.stroke();
  g.fillStyle="#1E1A16"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(t,x,y+1); g.restore();
}
/* small "players online" pill */
function mpPill(){
  let el=document.getElementById("mpPill");
  const n=MP.on?mpOthers().length:0, show=!!S.char && sheetMode!=="start" && (MP.on || !!SUPA.url);
  if(!el){ if(!show) return; el=document.createElement("button"); el.id="mpPill"; el.setAttribute("aria-live","polite");
    el.onclick=()=>toast(`MP: ${MP.kind||"-"} · ${MP.st}${MP.err?" · "+MP.err:""} · peers ${MP.peers.length} · ${L("ห้อง","room")} ${mpZone()}`); document.body.appendChild(el); }
  el.hidden=!show; if(!show) return;
  const t=MP.on?`👥 ${n+1} ${L("คนออนไลน์","online")}${MP.kind==="supa"?"":" ·"+MP.kind}`:`⚠️ ${L("ยังไม่เชื่อมต่อ","Not connected")}`; if(el.textContent!==t) el.textContent=t;
}

/* ---------- the quiz table ---------- */
const QT_N=5, QT_COUNT=3, QT_Q=15, QT_REV=3;   /* 5 questions; seconds for countdown, question, reveal */
let QT={cur:null, played:{}, iv:null, key:""};
function qtRand(seed){ let s=seed>>>0||1; return ()=>{ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; }
function qtBuild(r){
  const rnd=qtRand(r.seed), idx=[...QT_QS.keys()];
  for(let i=idx.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [idx[i],idx[j]]=[idx[j],idx[i]]; }
  return {id:r.id, qs:idx.slice(0,QT_N).map(k=>{ const o=[0,1,2,3]; for(let i=3;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [o[i],o[j]]=[o[j],o[i]]; } return {k,o}; }),
    t0:performance.now(), score:0, right:0, ans:{}, at:{}};
}
function qtPhase(c){
  const el=(performance.now()-c.t0)/1000; if(el<QT_COUNT) return {ph:"count", left:QT_COUNT-el};
  const k=Math.floor((el-QT_COUNT)/(QT_Q+QT_REV)), inq=(el-QT_COUNT)-k*(QT_Q+QT_REV);
  if(k>=QT_N) return {ph:"end"};
  return inq<QT_Q ? {ph:"q", k, left:QT_Q-inq} : {ph:"rev", k, left:QT_Q+QT_REV-inq};
}
/* the round in play: the newest one any seated player started */
function qtLive(){
  let best=null; for(const o of MP.peers.concat(MP.on?[]:[{me:true,p:MP.me}])){ const r=o.p&&o.p.qt&&o.p.qr; if(r&&typeof r.id==="string"&&(!best||r.id>best.id)) best=r; }
  if(!best && MP.me.qr) best=MP.me.qr; return best;
}
function qtSeated(){
  const list=[{id:"me", me:true, p:MP.me}].concat(MP.on?mpOthers().filter(o=>o.p.qt):[]);
  return list.map(o=>({me:o.me, nm:String(o.p.nm||"?").slice(0,16), ch:o.p.ch, sc:o.p.qri===(QT.cur&&QT.cur.id)?(o.p.qs|0):null}));
}
function openQuizTable(){
  stopMG(); mpSet({qt:1, nm:mpName()}); QT.key="";
  openSheet("quiz", `${top_("🏆 "+L("โต๊ะแข่งตอบปัญหาไซเบอร์","Cyber quiz race"))}<div class="sh-body qt" id="qtBody"></div>`);
  clearInterval(QT.iv); QT.iv=setInterval(qtTick,150); qtTick();
}
function qtLeave(){ clearInterval(QT.iv); QT.iv=null; mpSet({qt:0}); }
function qtStart(){
  const r={id:Date.now().toString(36)+"-"+mpId.slice(0,4), seed:Math.floor(Math.random()*2**31)};
  mpSet({qr:r}); QT.played[r.id]=true; QT.cur=qtBuild(r); mpSet({qri:r.id, qs:0}); QT.key="";
}
function qtTick(){
  if(sheetMode!=="quiz"){ qtLeave(); return; }
  const live=qtLive(), c=QT.cur;
  /* join a round someone else started (or a newer one that beat ours during the countdown) */
  if(live && !QT.played[live.id] && (!c || qtPhase(c).ph==="end" || (qtPhase(c).ph==="count" && live.id>c.id))){ QT.played[live.id]=true; QT.cur=qtBuild(live); mpSet({qri:live.id, qs:0}); QT.key=""; }
  qtRender();
}
function qtAnswer(i){
  const c=QT.cur; if(!c) return; const ph=qtPhase(c); if(ph.ph!=="q" || c.ans[ph.k]!=null) return;
  c.ans[ph.k]=i; const right=c.qs[ph.k].o[i]===0;
  if(right){ c.right++; c.score+=100+Math.round(ph.left*10); }
  mpSet({qs:c.score}); QT.key="";
}
function qtBoard(final){
  const rows=qtSeated().filter(r=>r.sc!=null).sort((a,b)=>b.sc-a.sc);
  if(!rows.length) return "";
  const medal=["🥇","🥈","🥉"];
  return `<ol class="qt-board${final?" final":""}">${rows.slice(0,final?10:6).map((r,i)=>`<li class="${r.me?"me":""}"><span>${medal[i]||(i+1)}</span><b>${esc(r.nm)}${r.me?` (${L("คุณ","you")})`:""}</b><i>${r.sc}</i></li>`).join("")}</ol>`;
}
function qtRender(){
  const body=$("qtBody"); if(!body) return;
  const c=QT.cur, ph=c?qtPhase(c):{ph:"lobby"}, seated=qtSeated();
  const key=[ph.ph,ph.k,c&&c.id,c&&JSON.stringify(c.ans),S.lang,MP.on,seated.map(s=>s.nm+":"+s.sc).join(",")].join("|");
  const bar=$("qtBar"); if(bar && ph.left!=null){ const tot=ph.ph==="q"?QT_Q:ph.ph==="rev"?QT_REV:QT_COUNT; bar.style.width=Math.max(0,ph.left/tot*100)+"%"; const tt=$("qtT"); if(tt) tt.textContent=Math.ceil(ph.left); }
  if(key===QT.key) return; QT.key=key;
  const who=`<p class="qt-who">${MP.on?`👥 ${L("ที่โต๊ะตอนนี้","At the table")}: ${seated.map(s=>`<span class="${s.me?"me":""}">${esc(s.nm)}</span>`).join("")}`:L("ตอนนี้เล่นคนเดียว · เปิดเกมพร้อมเพื่อนเพื่อแข่งกันสด","Playing solo · open the game with friends at the same time to race live")}</p>`;
  if(ph.ph==="lobby" || ph.ph==="end"){
    body.innerHTML=`${who}${ph.ph==="end"?`<div class="qt-end"><h3>${L("จบรอบ!","Round over!")}</h3><p>${L(`คุณตอบถูก ${c.right}/${QT_N} ข้อ · ${c.score} คะแนน`,`You got ${c.right}/${QT_N} · ${c.score} points`)}</p></div>${qtBoard(true)}`:
      `<p class="note">${L(`คำถาม ${QT_N} ข้อ ข้อละ ${QT_Q} วินาที ตอบถูกได้ 100 คะแนน ยิ่งตอบเร็วยิ่งได้โบนัส ทุกคนที่นั่งโต๊ะจะได้คำถามเดียวกันพร้อมกัน`,`${QT_N} questions, ${QT_Q} seconds each. A right answer is 100 points plus a speed bonus. Everyone at the table gets the same questions at the same time.`)}</p>`}
      ${btn(ph.ph==="end"?L("เริ่มรอบใหม่","New round"):L("เริ่มแข่ง!","Start the race!"),"data-qtgo","y")}`;
    body.querySelector("[data-qtgo]").onclick=()=>{ qtStart(); qtTick(); };
    return;
  }
  if(ph.ph==="count"){ body.innerHTML=`${who}<div class="qt-count"><small>${L("เตรียมตัว…","Get ready…")}</small><b id="qtT">${Math.ceil(ph.left)}</b></div><div class="mgbar"><i id="qtBar"></i></div>`; return; }
  const qd=c.qs[ph.k], Q=QT_QS[qd.k], li=EN()?1:0, mine=c.ans[ph.k], rev=ph.ph==="rev";
  body.innerHTML=`<div class="mghud"><span>${L("ข้อ","Q")} <b>${ph.k+1}/${QT_N}</b></span><span>⏱ <b id="qtT">${Math.ceil(ph.left)}</b></span><span>${L("คะแนน","Score")} <b>${c.score}</b></span></div>
    <div class="mgbar"><i id="qtBar"></i></div>
    <p class="qt-q">${esc(Q.q[li])}</p>
    <div class="qt-opts">${qd.o.map((oi,i)=>`<button class="qt-opt${rev&&oi===0?" ok":""}${mine===i&&oi!==0&&rev?" no":""}${mine===i?" qpick":""}" data-qa="${i}" ${mine!=null||rev?"disabled":""}><span>${"ABCD"[i]}</span><em>${esc(Q.a[oi][li])}</em></button>`).join("")}</div>
    ${rev?`<p class="qt-msg ${mine!=null&&qd.o[mine]===0?"ok":"no"}">${mine==null?L("หมดเวลา!","Time's up!"):qd.o[mine]===0?L("ถูกต้อง! 🎉","Correct! 🎉"):L("ยังไม่ถูก","Not quite")}</p>${qtBoard(false)}`:mine!=null?`<p class="qt-msg">${L("ตอบแล้ว รอเพื่อน…","Answered, waiting for the others…")}</p>`:""}`;
  body.querySelectorAll("[data-qa]").forEach(b=>b.onclick=()=>{ qtAnswer(+b.dataset.qa); qtRender(); });
}
mpInit();
