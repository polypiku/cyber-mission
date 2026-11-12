/* Play together: other players walk around the same town, and everyone can race at the cyber quiz table.
   Each player's cases stay on their own device. Only a small state is shared (name, character, position,
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
/* Each player sends their own state by broadcast (a few times a second while moving, every 2 s while still);
   a player not heard from for 7 s has left. Rooms: "" is the shared town, a 4-digit code is a private room
   (a class), and ?room=1234 in the link joins it straight away. */
const MP_ROOM_KEY="cm-room";
let mpRoom=(()=>{ const q=(location.search.match(/[?&]room=(\d{4})/)||[])[1]; if(q){ try{ localStorage.setItem(MP_ROOM_KEY,q); }catch(e){} return q; } try{ return localStorage.getItem(MP_ROOM_KEY)||""; }catch(e){ return ""; } })();
const mpHeard={};
function mpPeersFromHeard(){ const now=Date.now(); for(const k in mpHeard) if(now-mpHeard[k].t>7000) delete mpHeard[k];
  MP.peers=[{id:mpId, me:true, p:MP.me}].concat(Object.entries(mpHeard).map(([k,v])=>({id:k, me:false, p:v.p}))); }
async function mpSupa(){
  MP.st="load";
  if(!window.supabase) await mpLoad("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js");
  MP.sb=MP.sb||window.supabase.createClient(SUPA.url,SUPA.key);
  if(MP.ch){ try{ await MP.sb.removeChannel(MP.ch); }catch(e){} MP.ch=null; }
  for(const k in mpHeard) delete mpHeard[k]; MP.on=false; MP.st="join";
  const ch=MP.sb.channel("cyber-mission-"+(mpRoom||"town"),{config:{broadcast:{self:false, ack:false}}});
  ch.on("broadcast",{event:"st"},({payload})=>{ if(payload&&payload.id&&payload.id!==mpId){ mpHeard[payload.id]={p:payload.p||{}, t:Date.now()}; mpPeersFromHeard(); } });
  ch.on("broadcast",{event:"bye"},({payload})=>{ if(payload&&payload.id){ delete mpHeard[payload.id]; mpPeersFromHeard(); } });
  await new Promise((ok,no)=>{ const t=setTimeout(()=>no("timeout"),10000); ch.subscribe((s,err)=>{ MP.st=s; if(err) MP.err=String(err&&err.message||err); console.log("[mp] supabase",s,err||"");
    if(s==="SUBSCRIBED"){ clearTimeout(t); MP.on=true; MP.dirty=true; ok(); } else if(s==="CHANNEL_ERROR"||s==="TIMED_OUT"){ clearTimeout(t); MP.on=false; no(s); } else if(s==="CLOSED") MP.on=false; }); });
  MP.ch=ch; MP.kind="supa"; mpPeersFromHeard();
  if(!MP.iv) MP.iv=setInterval(mpPeersFromHeard,1000);
}
addEventListener("pagehide",()=>{ if(MP.kind==="supa"&&MP.ch) try{ MP.ch.send({type:"broadcast", event:"bye", payload:{id:mpId}}); }catch(e){} });
/* switch room: "" = shared town, or a 4-digit code */
async function mpJoin(code){
  mpRoom=code||""; try{ localStorage.setItem(MP_ROOM_KEY,mpRoom); }catch(e){}
  if(MP.ch) try{ MP.ch.send({type:"broadcast", event:"bye", payload:{id:mpId}}); }catch(e){}
  if(SUPA.url && SUPA.key){ try{ await mpSupa(); }catch(e){ MP.err=e instanceof Event?L("โหลดตัวเชื่อมต่อไม่ได้","couldn't load the connector"):String(e&&e.message||e); } }
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
  if(SUPA.url && SUPA.key){ try{ await mpSupa(); return; }catch(e){ MP.kind=null; MP.err=MP.err||(e instanceof Event?L("โหลดตัวเชื่อมต่อไม่ได้","couldn't load the connector"):String(e&&e.message||e)); console.warn("[mp] supabase failed",e); } }
  try{ await mpClaude(); }catch(e){ MP.kind=null; }
}
function mpFlush(){
  if(!MP.on) return;
  const now=performance.now(), gap=MP.kind==="supa"?300:120;
  if(!MP.dirty && now-MP.sent<2000) return;   /* resend every few seconds anyway, so a dropped update heals */
  if(now-MP.sent<gap) return;
  MP.sent=now; MP.dirty=false; const st={...MP.me};
  if(MP.kind==="claude") MP.room.presence(st).catch(()=>{});
  else if(MP.kind==="supa" && MP.ch) MP.ch.send({type:"broadcast", event:"st", payload:{id:mpId, p:st}}).then(r=>{ if(r!=="ok"){ MP.dirty=true; MP.err="send "+r; } }).catch(e=>{ MP.dirty=true; MP.err="send "+(e&&e.message||e); });
}
/* which room of the town you're standing in: zone, plus library floor / office building+floor / police floor */
const mpZone=()=>S.zone+"."+(S.zone===2?libFloor():S.zone===8?(S.bld||0)+"-"+offFloor():S.zone===7?(S.floor||1):0);
function stepMp(){
  if(S.char) mpSet({v:1, pid:mpId, nm:mpName(), ch:S.char, zk:mpZone(), x:Math.round(player.x), y:Math.round(player.y), d:player.dir, mv:player.moving?1:0});
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
    el.onclick=()=>{ if(!busy()) openRoomSheet(); }; document.body.appendChild(el); }
  el.hidden=!show; if(!show) return;
  const t=MP.on?`👥 ${n+1} ${L("คนออนไลน์","online")}${mpRoom?` · ${L("ห้อง","Room")} ${mpRoom}`:""}`:`⚠️ ${L("ยังไม่เชื่อมต่อ","Not connected")}`; if(el.textContent!==t) el.textContent=t;
}

/* the room sheet: shared town, make a room (a new 4-digit code), or type a code to join */
function openRoomSheet(){
  const link=location.origin+location.pathname+"?room="+mpRoom;
  openSheet("room",`${top_("👥 "+L("ห้องเล่นด้วยกัน","Play together"))}<div class="sh-body room">
    <p class="note">${L("ทุกคนในห้องเดียวกันจะเห็นกันเดินในเมือง และแข่งตอบที่โต๊ะ 🏆 ได้ เคสของแต่ละคนยังแยกกันเหมือนเดิม","Everyone in the same room sees each other walking around town and can race at the 🏆 table. Each player's cases stay their own.")}</p>
    <div class="rm-now"><small>${L("ตอนนี้อยู่","You're in")}</small><b>${mpRoom?L("ห้อง ","Room ")+mpRoom:L("เมืองรวม (ทุกคน)","Shared town (everyone)")}</b><small>${MP.on?`🟢 ${L("เชื่อมต่อแล้ว","Connected")} · ${mpOthers().length+1} ${L("คน","players")}`:`⚠️ ${L("ยังไม่เชื่อมต่อ","Not connected")}${MP.err?" · "+esc(MP.err):""}`}</small>
      ${mpRoom?`<button class="btn g" data-rmcopy><span>🔗 ${L("คัดลอกลิงก์เชิญ","Copy invite link")}</span></button>`:""}</div>
    ${btn("➕ "+L("สร้างห้องใหม่ (ได้รหัส 4 หลัก)","Make a new room (4-digit code)"),"data-rmnew","y")}
    <div class="rm-join"><input id="rmCode" inputmode="numeric" maxlength="4" placeholder="${L("รหัส 4 หลัก","4-digit code")}" aria-label="${L("รหัสห้อง","Room code")}">${btn(L("เข้าห้อง","Join"),"data-rmjoin","")}</div>
    ${mpRoom?btn("🏙️ "+L("กลับเมืองรวม","Back to the shared town"),"data-rmtown",""):""}
  </div>`);
  const go=async c=>{ closeSheet(); toast(c?L(`🔑 เข้าห้อง ${c}…`,`🔑 Joining room ${c}…`):L("🏙️ กลับเมืองรวม…","🏙️ Back to the shared town…")); await mpJoin(c); toast(MP.on?L("เชื่อมต่อแล้ว","Connected"):L("เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง","Couldn't connect, try again")); if(titleOn) openTitle(); };
  const sh=$("sheet");
  sh.querySelector("[data-rmnew]").onclick=()=>go(String(1000+Math.floor(Math.random()*9000)));
  sh.querySelector("[data-rmjoin]").onclick=()=>{ const c=($("rmCode").value||"").replace(/\D/g,""); if(c.length!==4){ toast(L("ใส่รหัสให้ครบ 4 หลัก","Type all 4 digits")); return; } go(c); };
  $("rmCode").onkeydown=e=>{ e.stopPropagation(); if(e.key==="Enter") sh.querySelector("[data-rmjoin]").click(); };
  const cp=sh.querySelector("[data-rmcopy]"); if(cp) cp.onclick=()=>{ try{ navigator.clipboard.writeText(link); toast(L("คัดลอกลิงก์แล้ว ส่งให้เพื่อนได้เลย","Link copied, send it to your friends")); }catch(e){ toast(link); } };
  const tw=sh.querySelector("[data-rmtown]"); if(tw) tw.onclick=()=>go("");
}

/* ---------- the quiz table ---------- */
const QT_N=5, QT_COUNT=5, QT_Q=15, QT_REV=3;   /* 5 questions; seconds for countdown, question, reveal */
/* How a round runs: everyone at the table presses Ready; when all are ready the leader (the seated player
   with the smallest id) starts a 5-second countdown. The leader alone moves the round on (question →
   reveal → next) and shares it as `qr`; a question ends early once everyone in the round has answered.
   If the leader leaves, the next one picks the round up from where it was. */
let QT={cur:null, last:null, iv:null, key:""};
function qtRand(seed){ let s=seed>>>0||1; return ()=>{ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; }
function qtBuild(r){
  const rnd=qtRand(r.seed), idx=[...QT_QS.keys()];
  for(let i=idx.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [idx[i],idx[j]]=[idx[j],idx[i]]; }
  return {id:r.id, qs:idx.slice(0,QT_N).map(k=>{ const o=[0,1,2,3]; for(let i=3;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [o[i],o[j]]=[o[j],o[i]]; } return {k,o}; }),
    score:0, right:0, ans:{}};
}
/* everyone sitting at the table, you first */
function qtSeatList(){
  const me={me:true, pid:mpId, p:MP.me};
  return [me].concat(MP.on?mpOthers().filter(o=>o.p.qt).map(o=>({me:false, pid:String(o.p.pid||o.id), p:o.p})):[]);
}
const qtNewer=(a,b)=>!b || a.id>b.id || (a.id===b.id && (a.t||0)>(b.t||0));
function qtLead(list, r, now){
  const inRound=r?list.filter(x=>x.p.qri===r.id):[]; let n=null;
  if(!r || r.ph==="end"){
    if(list.every(x=>x.p.rd)) n={id:now.toString(36)+"-"+mpId.slice(0,4), seed:Math.floor(Math.random()*2**31), k:0, ph:"count", t:now};
  } else if(r.ph==="count"){ if(now-r.t>=QT_COUNT*1000) n={...r, ph:"q", k:0, t:now}; }
  else if(r.ph==="q"){ const all=inRound.length>0 && inRound.every(x=>(x.p.qak??-1)>=r.k); if(all || now-r.t>=QT_Q*1000) n={...r, ph:"rev", t:now}; }
  else if(r.ph==="rev"){ if(now-r.t>=QT_REV*1000) n=r.k+1>=QT_N?{...r, ph:"end", t:now}:{...r, ph:"q", k:r.k+1, t:now}; }
  if(n){ mpSet({qr:n}); return n; } return r;
}
function openQuizTable(){
  stopMG(); mpSet({qt:1, rd:0, qr:null, pid:mpId, nm:mpName()}); QT.key=""; QT.cur=null; QT.last=null;
  openSheet("quiz", `${top_("🏆 "+L("โต๊ะแข่งตอบปัญหาไซเบอร์","Cyber quiz race"))}<div class="sh-body qt" id="qtBody"></div>`);
  clearInterval(QT.iv); QT.iv=setInterval(qtTick,150); qtTick();
}
function qtLeave(){ clearInterval(QT.iv); QT.iv=null; mpSet({qt:0, rd:0, qr:null}); }
function qtTick(){
  if(sheetMode!=="quiz"){ qtLeave(); return; }
  const list=qtSeatList(), now=Date.now(), ld=list.reduce((a,b)=>b.pid<a.pid?b:a);
  let live=null; for(const x of list){ const r=x.p.qr; if(r&&typeof r.id==="string"&&qtNewer(r,live)) live=r; }
  if(QT.last && QT.last.ph!=="end" && qtNewer(QT.last,live) && !list.some(x=>x.p.qr)) live=QT.last;   /* the leader just left */
  if(ld.me){ if(live && (!MP.me.qr || qtNewer(live,MP.me.qr))) mpSet({qr:live}); live=qtLead(list, live, now); }
  else if(MP.me.qr) mpSet({qr:null});
  if(live) QT.last=live;
  if(live && live.ph!=="end" && (!QT.cur || QT.cur.id!==live.id)){ QT.cur=qtBuild(live); mpSet({qri:live.id, qs:0, qak:-1, rd:0}); QT.key=""; }
  qtRender(live, list, now);
}
function qtAnswer(i){
  const c=QT.cur, r=QT.last; if(!c||!r||r.id!==c.id||r.ph!=="q"||c.ans[r.k]!=null) return;
  c.ans[r.k]=i; const left=Math.max(0,QT_Q-(Date.now()-r.t)/1000);
  if(c.qs[r.k].o[i]===0){ c.right++; c.score+=100+Math.round(left*10); }
  mpSet({qs:c.score, qak:r.k}); QT.key="";
}
function qtBoard(list, id, final){
  const rows=list.filter(x=>x.p.qri===id).map(x=>({me:x.me, nm:x.me?mpName():String(x.p.nm||"?").slice(0,16), sc:x.p.qs|0})).sort((a,b)=>b.sc-a.sc);
  if(!rows.length) return "";
  const medal=["🥇","🥈","🥉"];
  return `<ol class="qt-board${final?" final":""}">${rows.slice(0,final?10:6).map((r,i)=>`<li class="${r.me?"me":""}"><span>${medal[i]||(i+1)}</span><b>${esc(r.nm)}${r.me?` (${L("คุณ","you")})`:""}</b><i>${r.sc}</i></li>`).join("")}</ol>`;
}
function qtRender(live, list, now){
  const body=$("qtBody"); if(!body) return;
  const c=QT.cur, ph=live&&live.ph!=="end"?live.ph:(live&&c&&c.id===live.id?"end":"lobby");
  const dur=ph==="count"?QT_COUNT:ph==="q"?QT_Q:ph==="rev"?QT_REV:0, left=dur?Math.max(0,dur-(now-live.t)/1000):0;
  const inRound=live?list.filter(x=>x.p.qri===live.id):[], answered=live?inRound.filter(x=>(x.p.qak??-1)>=live.k).length:0;
  const bar=$("qtBar"); if(bar && dur){ bar.style.width=(left/dur*100)+"%"; const tt=$("qtT"); if(tt) tt.textContent=Math.ceil(left); }
  const key=[ph, live&&live.k, live&&live.id, c&&JSON.stringify(c.ans), S.lang, MP.on, answered, inRound.map(x=>x.p.qs|0).join(","), list.map(x=>x.pid+":"+(x.p.rd?1:0)+(x.me?"":x.p.nm)).join(",")].join("|");
  if(key===QT.key) return; QT.key=key;
  if(ph==="lobby" || ph==="end"){
    const meReady=!!MP.me.rd, ready=list.filter(x=>x.p.rd).length;
    const seats=`<ul class="qt-seats">${list.map(x=>`<li class="${x.me?"me":""} ${x.p.rd?"rdy":""}"><b>${esc(x.me?mpName():String(x.p.nm||"?").slice(0,16))}${x.me?` (${L("คุณ","you")})`:""}</b><i>${x.p.rd?"✅ "+L("พร้อม","Ready"):"⏳ "+L("ยังไม่พร้อม","Not ready")}</i></li>`).join("")}</ul>`;
    body.innerHTML=`${ph==="end"?`<div class="qt-end"><h3>${L("จบรอบ!","Round over!")}</h3><p>${L(`คุณตอบถูก ${c.right}/${QT_N} ข้อ · ${c.score} คะแนน`,`You got ${c.right}/${QT_N} · ${c.score} points`)}</p></div>${qtBoard(list, live.id, true)}`:
      `<p class="note">${L(`คำถาม ${QT_N} ข้อ ข้อละ ${QT_Q} วินาที ตอบถูกได้ 100 คะแนน ยิ่งเร็วยิ่งได้โบนัส ถ้าทุกคนตอบครบจะไปข้อถัดไปทันที`,`${QT_N} questions, ${QT_Q} seconds each. A right answer is 100 points plus a speed bonus. Once everyone has answered, the next question comes straight away.`)}</p>`}
      <p class="qt-wait">👥 ${L(`ที่โต๊ะ ${list.length} คน · พร้อมแล้ว ${ready}/${list.length}`,`${list.length} at the table · ${ready}/${list.length} ready`)}</p>${seats}
      <p class="note">${list.length>1?L("เมื่อทุกคนกดพร้อม เกมจะเริ่มใน 5 วินาที","When everyone is ready, the race starts in 5 seconds"):L("รอเพื่อนมานั่งโต๊ะได้ หรือกดพร้อมเพื่อเล่นคนเดียว","Wait for friends to sit down, or press Ready to play solo")}</p>
      ${btn(meReady?L("✅ พร้อมแล้ว (กดเพื่อยกเลิก)","✅ Ready (tap to cancel)"):L("✋ พร้อม!","✋ I'm ready!"),"data-qtrdy",meReady?"g qt-btn-ready on":"y")}`;
    body.querySelector("[data-qtrdy]").onclick=()=>{ mpSet({rd:MP.me.rd?0:1}); QT.key=""; qtTick(); };
    return;
  }
  if(ph==="count"){ body.innerHTML=`<p class="qt-wait">👥 ${inRound.length||list.length} ${L("คนในรอบนี้","players this round")}</p><div class="qt-count"><small>${L("เตรียมตัว…","Get ready…")}</small><b id="qtT">${Math.ceil(left)}</b></div><div class="mgbar"><i id="qtBar"></i></div>`; return; }
  const qd=c.qs[live.k], Q=QT_QS[qd.k], li=EN()?1:0, mine=c.ans[live.k], rev=ph==="rev";
  body.innerHTML=`<div class="mghud"><span>${L("ข้อ","Q")} <b>${live.k+1}/${QT_N}</b></span><span>⏱ <b id="qtT">${Math.ceil(left)}</b></span><span>${L("คะแนน","Score")} <b>${c.score}</b></span></div>
    <div class="mgbar"><i id="qtBar"></i></div>
    <p class="qt-q">${esc(Q.q[li])}</p>
    <div class="qt-opts">${qd.o.map((oi,i)=>`<button class="qt-opt${rev&&oi===0?" ok":""}${mine===i&&oi!==0&&rev?" no":""}${mine===i?" qpick":""}" data-qa="${i}" ${mine!=null||rev?"disabled":""}><span>${"ABCD"[i]}</span><em>${esc(Q.a[oi][li])}</em></button>`).join("")}</div>
    ${rev?`<p class="qt-msg ${mine!=null&&qd.o[mine]===0?"ok":"no"}">${mine==null?L("หมดเวลา!","Time's up!"):qd.o[mine]===0?L("ถูกต้อง! 🎉","Correct! 🎉"):L("ยังไม่ถูก","Not quite")}</p>${qtBoard(list, live.id, false)}`
      :`<p class="qt-msg">${mine!=null?L("ตอบแล้ว รอเพื่อน… ","Answered, waiting… "):""}${L(`ตอบแล้ว ${answered}/${inRound.length} คน`,`${answered}/${inRound.length} answered`)}</p>`}`;
  body.querySelectorAll("[data-qa]").forEach(b=>b.onclick=()=>{ qtAnswer(+b.dataset.qa); qtTick(); });
}
mpInit();
