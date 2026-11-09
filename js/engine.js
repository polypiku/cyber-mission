/* Camera, game loop, input, movement, HUD and dialogue boxes. */
/* ---------- camera + loop ---------- */
function updateCam(){
  const vw=VW/Z, vh=VH/Z;
  camX = W<=vw ? (W-vw)/2 : Math.min(Math.max(player.x-vw/2,0),W-vw);
  const ty = player.y-CHAR_H/2-vh/2;
  camY = H<=vh ? (H-vh)/2 : Math.min(Math.max(ty,0),H-vh);
}
function render(now){
  ctx.setTransform(1,0,0,1,0,0); ctx.fillStyle="#2B2118"; ctx.fillRect(0,0,cv.width,cv.height);
  ctx.setTransform(DPR*Z,0,0,DPR*Z,-camX*DPR*Z,-camY*DPR*Z);
  ctx.imageSmoothingQuality="high";
  if(bg.width) ctx.drawImage(bg,0,0,W,H);
  drawAmbientBack(ctx,now);
  if(S.zone===0){ drawDoorBadges(ctx,now); drawOfficesLive(ctx,now); }
  const near=nearest();
  if(near && !busy()){ ctx.beginPath(); ctx.ellipse(near.x,near.y,24,9,0,0,7); ctx.strokeStyle="#FF5A1F"; ctx.lineWidth=3; ctx.stroke(); }
  if(target && !busy()){ ctx.beginPath(); ctx.arc(target.x,target.y,6+(RM?0:Math.sin(now/120)),0,7); ctx.strokeStyle="rgba(20,20,20,.55)"; ctx.lineWidth=2; ctx.stroke(); }
  const items = (S.zone===0||S.zone===2||S.zone===8||cbFloor()) ? [] : [{y:186,d:g=>drawCounter(g)}];
  if(cbFloor()){ items.push({y:CB_TOP+1,d:g=>drawCellBlockBars(g,true)}); items.push({y:9000,d:g=>drawCellBlockBars(g,false)}); }
  if(S.zone===0){ items.push({y:(CRUMBS?CRUMBS.y-12:0),d:g=>drawCrumbs(g)}); PIGEONS.forEach(p=>items.push({y:p.y,d:g=>drawPigeon(g,p,now)})); }
  if(vilOn()) items.push({y:9999,d:g=>drawVilFx(g,now)});
  if(S.zone===0) items.push({y:REPAIR.y+12,d:g=>drawRepair(g,now)});
  if(S.zone===1){ items.push({y:CAT.y+1,d:g=>drawBowl(g,now)}); items.push({y:CAT.y,d:g=>drawCat(g,now)}); }
  if(S.zone===0){
    items.push({y:446,d:g=>drawFountain(g,now)});
    OUT_TREES.forEach(p=>items.push({y:p.y+10,d:g=>drawTree(g,p)}));
    OUT_BENCHES.forEach(b=>items.push({y:b.y+8,d:g=>drawBench(g,b)}));
    OUT_LAMPS.forEach(l=>items.push({y:l.y+4,d:g=>drawLamp(g,l,now)}));
    items.push({y:KIOSK.y+10,d:g=>drawKiosk(g,now)});
    if(!(CIN&&CIN.noCars)) CARS.forEach(c=>items.push({y:c.y+20,d:g=>drawCar(g,c)}));
    if(CIN&&CIN.van){ const v=CIN.van; items.push({y:v.y+20,d:g=>drawCar(g,v)}); }
    XINGS.filter(xg=>!xg.sig).forEach(xg=>{ items.push({y:606,d:g=>drawTL(g,xg.x0-30,606,xg,now)}); items.push({y:780,d:g=>drawTL(g,xg.x1+30,780,xg,now)}); });
    const EWS={sig:"ew"}, NSS={sig:"ns"};
    items.push({y:606,d:g=>drawTL(g,872,606,EWS,now)}); items.push({y:782,d:g=>drawTL(g,1018,782,NSS,now)});
    if(!(CIN&&CIN.noCars)) VCARS.forEach(c=>items.push({y:c.y+c.len/2,d:g=>drawCarV(g,c)}));
  }
  TABLES.forEach(t=>items.push({y:S.zone===2?t.y+LIB_SIZE[t.item][1]/2:t.y+18,d:g=>drawTable(g,t)}));
  CHAIRS.forEach(c=>items.push({y:c.y+8,d:g=>drawChair(g,c)}));
  PLANTS.forEach(p=>items.push({y:p.y+14,d:g=>drawPlant(g,p)}));
  if(S.char){ npcs.forEach(n=>items.push({y:n.y,d:g=>drawChar(g,n,now)})); items.push({y:player.y,d:g=>drawChar(g,player,now)}); }
  items.sort((a,b)=>a.y-b.y).forEach(it=>it.d(ctx));
  drawLibStairSign(ctx,now); drawEscortTalk(ctx); drawSpots(ctx,now); drawGoalArrow(ctx,now); drawExits(ctx,now); drawCinFx(ctx,now);
  if(S.char) npcs.forEach(n=>drawMarker(ctx,n,now));
  if(S.char){ drawUrgent(ctx,now); drawChatter(ctx,now); drawVirusArrow(ctx,now); drawCoinFx(ctx,(now-(window._cfx||now))/1000); window._cfx=now; }
  const dn=nearDoor(); if(dn && !busy()){ ctx.beginPath(); ctx.ellipse(dn.door,262,34,10,0,0,7); ctx.strokeStyle="#FF5A1F"; ctx.lineWidth=3; ctx.stroke(); }
}

/* ---------- input ---------- */
const keys=new Set();
let joy={x:0,y:0,active:false,id:null}, target=null, targetNpc=null, stuckT=0, lastPos=null;
/* use physical key positions so WASD/E work on a Thai keyboard layout too */
const KMAP={KeyW:"w",KeyA:"a",KeyS:"s",KeyD:"d",KeyE:"e",KeyQ:"q",ArrowUp:"arrowup",ArrowDown:"arrowdown",ArrowLeft:"arrowleft",ArrowRight:"arrowright",Space:" ",Enter:"enter",NumpadEnter:"enter",Escape:"escape"};
const keyOf=(e)=>KMAP[e.code]||e.key.toLowerCase();
window.addEventListener("keydown",(e)=>{
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  const k=keyOf(e);
  if(["arrowup","arrowdown","arrowleft","arrowright","w","a","s","d"].includes(k)){ if(!busy()){ keys.add(k); target=null; targetNpc=null; e.preventDefault(); } }
  if(k==="e"||k===" "||k==="enter"){
    if(!$("dlg").hidden && (k==="e"||document.activeElement?.tagName!=="BUTTON")){ advance(); e.preventDefault(); return; }
    if(!busy()){ interact(); e.preventDefault(); }
  }
  if(k==="q" && !busy()){ sweepLens(); e.preventDefault(); }
  if(k==="escape"){ if(!$("veil").hidden && sheetMode!=="case" && sheetMode!=="start") closeSheet(); }
});
window.addEventListener("keyup",(e)=>keys.delete(keyOf(e)));
window.addEventListener("blur",()=>keys.clear());
const joyEl=$("joy"), knob=$("knob");
joyEl.addEventListener("pointerdown",(e)=>{ joy.active=true; joy.id=e.pointerId; joyEl.setPointerCapture(e.pointerId); target=null; targetNpc=null; moveJoy(e); });
joyEl.addEventListener("pointermove",(e)=>{ if(joy.active&&e.pointerId===joy.id) moveJoy(e); });
/* dynamic joystick: on touch screens it appears wherever the thumb lands and follows it */
const JR=62;
function placeJoy(x,y){ joyEl.style.left=(x-JR)+"px"; joyEl.style.top=(y-JR)+"px"; joyEl.style.bottom="auto"; joyEl.classList.add("float"); joyEl.classList.remove("idle"); }
function resetJoy(){ joyEl.style.left=""; joyEl.style.top=""; joyEl.style.bottom=""; joyEl.classList.remove("float"); joyEl.classList.add("idle"); }
const endJoy=()=>{ joy={x:0,y:0,active:false,id:null}; knob.style.transform=""; resetJoy(); };
joyEl.classList.add("idle");
joyEl.addEventListener("pointerup",endJoy); joyEl.addEventListener("pointercancel",endJoy);
function moveJoy(e){
  const r=joyEl.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2, R=r.width/2-14;
  let dx=e.clientX-cx, dy=e.clientY-cy; const d=Math.hypot(dx,dy); if(d>R){ dx=dx/d*R; dy=dy/d*R; }
  knob.style.transform=`translate(${dx}px,${dy}px)`;
  joy.x=dx/R; joy.y=dy/R; if(Math.hypot(joy.x,joy.y)<0.18){ joy.x=0; joy.y=0; }
}
let dj=null;
cv.addEventListener("pointerdown",(e)=>{
  if(document.activeElement && document.activeElement!==document.body) document.activeElement.blur(); try{ window.focus(); }catch(_){}
  if(busy()||!S.char) return;
  if(e.pointerType!=="mouse"){ dj={id:e.pointerId,x:e.clientX,y:e.clientY}; try{ cv.setPointerCapture(e.pointerId); }catch(_){} return; }
  tapWalk(e);
});
cv.addEventListener("pointermove",(e)=>{
  if(!dj || e.pointerId!==dj.id) return;
  if(!joy.active){
    if(Math.hypot(e.clientX-dj.x,e.clientY-dj.y)<12 || busy()) return;
    placeJoy(dj.x,dj.y); joy.active=true; joy.id=e.pointerId; target=null; targetNpc=null;
  }
  moveJoy(e);
});
const djEnd=(e)=>{ if(!dj || e.pointerId!==dj.id) return; if(joy.active) endJoy(); else if(!busy()) tapWalk({clientX:dj.x,clientY:dj.y}); dj=null; };
cv.addEventListener("pointerup",djEnd); cv.addEventListener("pointercancel",(e)=>{ if(dj&&e.pointerId===dj.id){ endJoy(); dj=null; } });
function tapWalk(e){
  const r=cv.getBoundingClientRect();
  const wx=(e.clientX-r.left)/Z+camX, wy=(e.clientY-r.top)/Z+camY;
  const hit=npcs.find(n=>Math.abs(wx-n.x)<24 && wy<n.y+8 && wy>n.y-CHAR_H);
  if(hit){ targetNpc=hit; const a=Math.atan2(player.y-hit.y,player.x-hit.x); target={x:hit.x+Math.cos(a)*44,y:hit.y+Math.sin(a)*30}; }
  else { targetNpc=null; target={x:wx,y:wy}; }
  stuckT=0;
}
$("act").addEventListener("click",()=>{ if(!busy()) interact(); });
$("bars").addEventListener("click",(e)=>{ if(D||busy()) return; if(e.target.closest(".coinrow,.netrow")) openMoney(); });
$("lensBtn").addEventListener("click",()=>sweepLens());

/* ---------- movement ---------- */
/* which zebra crossing a point is on, and whether people may walk on it now */
function xingAt(x,y){
  const a=XINGS.find(xg=>x>xg.x0&&x<xg.x1&&y>604&&y<774); if(a) return {k:a, go:()=>ewState()==="r"};
  const b=YXINGS.find(yx=>x>IC.x0-6&&x<IC.x1+6&&y>yx.y0&&y<yx.y1); if(b) return {k:b, go:()=>nsState()==="r"};
  return null;
}
let redWarnT=0;
function redLight(x,y){
  if(S.zone!==0 || CIN) return false;
  const to=xingAt(x,y); if(!to || to.go()) return false;
  const from=xingAt(player.x,player.y); if(from && from.k===to.k) return false;   /* already crossing: let them finish */
  if(performance.now()-redWarnT>2500){ redWarnT=performance.now(); xWarnT=performance.now(); toast(L("🚦 ไฟคนข้ามยังแดง รอไฟเขียวก่อนนะ","🚦 Don't walk yet. Wait for the green man")); }
  return true;
}
function blocked(x,y,self){
  const b={x:x-12,y:y-7,w:24,h:14};
  if(self===player && redLight(x,y)) return true;
  for(const s of SOLIDS) if(b.x<s.x+s.w&&b.x+b.w>s.x&&b.y<s.y+s.h&&b.y+b.h>s.y) return true;
  for(const n of npcs){ if(n===self||n.leaving) continue; if(Math.abs(n.x-x)<26&&Math.abs(n.y-y)<14) return true; }
  return false;
}
function step(dt){
  let vx=0, vy=0;
  if(!busy()){
    if(keys.has("arrowleft")||keys.has("a")) vx-=1; if(keys.has("arrowright")||keys.has("d")) vx+=1;
    if(keys.has("arrowup")||keys.has("w")) vy-=1; if(keys.has("arrowdown")||keys.has("s")) vy+=1;
    if(joy.active){ vx=joy.x; vy=joy.y; }
    if(!vx&&!vy&&target){
      const dx=target.x-player.x, dy=target.y-player.y, d=Math.hypot(dx,dy);
      if(targetNpc && Math.hypot(targetNpc.x-player.x,targetNpc.y-player.y)<TALK){ const n=targetNpc; target=null; targetNpc=null; face(player,n); talkTo(n); }
      else if(d<5){ target=null; }
      else { vx=dx/d; vy=dy/d; }
    }
  }
  const m=Math.hypot(vx,vy);
  player.moving=m>0.05;
  if(player.moving){
    const k=Math.min(1,m); vx=vx/m*k; vy=vy/m*k;
    const sp=SPEED, nx=player.x+vx*sp*dt, ny=player.y+vy*sp*dt;
    if(!blocked(nx,player.y,player)) player.x=nx;
    if(!blocked(player.x,ny,player)) player.y=ny;
    player.dir = Math.abs(vx)>Math.abs(vy)*0.9 ? (vx<0?"left":"right") : (vy<0?"up":"down");
    player.t+=dt;
    if(target){ const p=lastPos; if(p && Math.hypot(p.x-player.x,p.y-player.y)<0.3){ stuckT+=dt; if(stuckT>0.35){ target=null; if(targetNpc && Math.hypot(targetNpc.x-player.x,targetNpc.y-player.y)<TALK+30){ const n=targetNpc; face(player,n); talkTo(n); } targetNpc=null; } } else stuckT=0; }
    lastPos={x:player.x,y:player.y};
  }
  if(S.zone===0){ tlT+=dt; stepCars(dt); stepVCars(dt); }
  if(!busy() && S.char){
    // leaving a shop through its door
    if(S.zone>0 && (S.zone===2 ? inLibExit() : (player.y>598 && player.x>384 && player.x<480))) goOutside(S.zone);
    else if(inLibStairs()) askStairs();
    else if(inLift()) askLift();
    else if(S.zone===7 && !cbFloor() && player.x>RW-60 && player.y>PDOOR.y0 && player.y<PDOOR.y1) switchCells(true);
    else if(cbFloor() && player.x<44) switchCells(false);
    // walking into a shop door on the street
    else if(S.zone===0 && nearHQ() && player.y>846) tryHQ();
    else if(S.zone===0 && player.y<268){ const b=BUILDINGS.find(b=>Math.abs(player.x-b.door)<30); if(b) tryEnter(b); }
  }
  // NPCs drift back to their resting direction
  npcs.forEach(n=>{ if(rush&&rush.n===n) return; n.moving=false; if(!talking||talking!==n){ n.dir=n.home; } });
  stepRush(dt); stepUrgent(dt); stepInbox(dt); stepWifi(dt); stepVirus(dt); stepHack(dt); stepTension(dt); stepFillers(dt); stepEscort(dt); stepCinema(dt); stepAmbient(dt);
}
function face(a,b){ const dx=b.x-a.x, dy=b.y-a.y; a.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?"left":"right"):(dy<0?"up":"down"); }
function nearest(){
  if(!S.char) return null;
  let best=null, bd=TALK;
  for(const n of npcs){ if(n.leaving) continue; const d=Math.hypot(n.x-player.x,n.y-player.y)-((n.role==="prisoner"&&cbFloor())||n.role==="o_trap"||n.role==="teller"?50:0); if(d<bd){ bd=d; best=n; } }
  return best;
}

/* ---------- HUD ---------- */
let hudKey="";
function goalPill(){
  const el=$("goal"); if(!el) return; const gi=goalInfo(); const show=!!gi && !CIN && !sheetMode;
  el.hidden=!show; if(!show) return;
  const txt=`🎯 ${esc(gi.t)}`; if(el.dataset.t!==txt){ el.dataset.t=txt; el.innerHTML=`<span>${txt}</span>`; }
  el.style.top=($("hud").offsetHeight+6)+"px";
}
let hudPrev=null, hudFlash={}, hudFlashT=null;
function hud(){
  const n=nearest();
  const show = !!n && !busy();
  const dn=nearDoor();
  checkRank();
  const sp0=nearSpot(); const key=[sp0&&sp0.id,netLabel().t,S.lang,S.zone,S.evNew,xp(),nearCat(),nearBirds(),nearHQ(),nearRepair(),nearVillain(),!!S.phoneBroken,S.coins,JSON.stringify(S.items),S.inbox.length,nearKiosk(),dn&&dn.zone,S.zone?zoneScore(S.zone):totalScore(),S.bars.money,S.bars.privacy,S.bars.trust,doneCount(),S.chat,S.chatSeen,!!S.results.chat,show&&n.id,sheetMode].join("|");
  if(key===hudKey) return; hudKey=key;
  if(hudPrev && !sheetMode){ let ch=false; for(const k of ["money","privacy","trust"]){ const dv=S.bars[k]-hudPrev[k]; if(dv){ hudFlash[k]=dv>0?"flash-up":"flash-down"; ch=true; } }
    if(ch){ clearTimeout(hudFlashT); hudFlashT=setTimeout(()=>{ hudFlash={}; hudKey=""; },1600); } }
  if(!sheetMode) hudPrev={...S.bars};
  const ri=rankIdx(), nx=RANKS[ri+1];
  $("bars").innerHTML=`<button type="button" class="coinrow" title="${L("เงินใช้ทำอะไร","What money is for")}"><span>💵</span><b>${BAHT(S.coins)}</b>${S.items.vpn?`<i title="VPN">🛰️</i>`:""}${S.items.cloud?`<i title="Cloud">☁️</i>`:""}${S.items.pwm?`<i title="Password manager">🔑</i>`:""}</button>${(()=>{ const nl=netLabel(); return `<button type="button" class="netrow ${nl.cls}" title="${L("อินเทอร์เน็ต","Internet")}"><span>${nl.i}</span><b>${nl.t}</b></button>`; })()}<div class="rankrow" title="XP ${xp()}"><span>🛡</span><b>${esc(rankName(ri))}</b>${nx?`<i style="--p:${Math.min(100,(xp()-RANKS[ri][0])/(nx[0]-RANKS[ri][0])*100)}%"></i>`:""}</div>`+["money","privacy","trust"].map(k=>{ const v=S.bars[k]; return `<div class="bar-row${hudFlash[k]?" "+hudFlash[k]:""}" title="${barName(k)}">${BAR_ICON[k]}<div class="meter ${v<40?"low":""}" role="meter" aria-label="${barName(k)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><i style="width:${v}%"></i></div><b>${v}</b></div>`; }).join("");
  $("prog").innerHTML = S.zone===0 ? `<span class="zn">${L("รวม","Total")}</span><span class="st">★</span> ${totalScore()}/${totalMax()}` : (S.zone===8?`<span class="zn">🏢 ${L("ชั้น","Fl.")} ${offFloor()}</span><span class="st">★</span> ${totalScore()}/${totalMax()}`:`<span class="zn">${L("โซน","Zone")} ${ZONES[S.zone]&&ZONES[S.zone].bonus?"👻":zno(S.zone)}</span><span class="st">★</span> ${zoneScore(S.zone)}/${zoneMax(S.zone)}`);
  $("prog").setAttribute("aria-label", S.zone===0 ? L(`คะแนนรวม ${totalScore()} จาก ${totalMax()} เปิดแผนที่ภารกิจ`,`Total score ${totalScore()} of ${totalMax()}. Open mission map`) : L(`โซน ${zno(S.zone)} คะแนน ${zoneScore(S.zone)} จาก ${zoneMax(S.zone)} เปิดแผนที่ภารกิจ`,`Zone ${zno(S.zone)}, score ${zoneScore(S.zone)} of ${zoneMax(S.zone)}. Open mission map`));
  const pending=S.zone===1 && S.chat && !S.results.chat;
  $("boardDot").hidden=!S.evNew; $("boardDot").textContent=S.evNew||""; $("boardBtn").setAttribute("aria-label",L("บอร์ดหลักฐาน","Evidence board"));
  const pcount=S.inbox.length+(pending?1:0);
  $("phoneDot").hidden=!pcount && !S.phoneBroken; $("phoneDot").textContent=S.phoneBroken?"✕":pcount; $("phoneBtn").classList.toggle("broken",!!S.phoneBroken); $("phoneBtn").classList.toggle("ring", (pending && !S.chatSeen) || S.inbox.length>0);
  $("phoneBtn").setAttribute("aria-label",L("โทรศัพท์","Phone")); $("lensBtn").hidden=!lensLv(); $("lensLv").textContent=lensLv()||""; $("lensBtn").setAttribute("aria-label",L(`แว่นนักสืบ ระดับ ${lensLv()} (Q)`,`Detective lens level ${lensLv()} (Q)`)); $("menuBtn").setAttribute("aria-label",L("เมนู","Menu"));
  const kk = !show && !busy() && nearKiosk();
  const fc = !show && !kk && !busy() && nearCat(), fb = !show && !kk && !fc && !busy() && nearBirds(), feed=fc||fb;
  const hq = !show && !kk && !feed && !busy() && nearHQ();
  const rp = !show && !kk && !feed && !hq && !busy() && nearRepair(), vl = !show && !kk && !feed && !hq && !rp && !busy() && nearVillain();
  const sp = !show && !busy() && sp0;
  const showDoor = !show && !sp && !kk && !feed && !rp && !vl && !!dn && !busy();
  $("prompt").hidden=!(show||sp||showDoor||kk||feed||hq||rp||vl);
  if(sp) $("prompt").innerHTML=`${L("ตรวจดู ","Inspect ")}${EVID[sp.id].i}${TOUCH?"":"<kbd>E</kbd>"}`;
  if(rp) $("prompt").innerHTML=`${S.phoneBroken?L("ซ่อมมือถือที่หมอโฟน 🔧","Fix your phone at Phone Dr. 🔧"):L("ร้านซ่อมมือถือ","Phone repair stall")}${TOUCH?"":"<kbd>E</kbd>"}`;
  if(vl) $("prompt").innerHTML=`${L("ชายใส่ฮู้ดดำ…","The hooded man…")}${TOUCH?"":"<kbd>E</kbd>"}`;
  if(hq) $("prompt").innerHTML=`${L("เข้า ","Enter ")}${esc(OFFICES[nearOffice()].name[S.lang])}${TOUCH?"":"<kbd>E</kbd>"}`;
  if(feed) $("prompt").innerHTML=`${fc?L("ให้อาหารแมว 🐟","Feed the cat 🐟"):L("ให้อาหารนก 🌾","Feed the pigeons 🌾")}${TOUCH?"":"<kbd>E</kbd>"}`;
  if(kk) $("prompt").innerHTML=`${L("เล่นมินิเกม","Play mini-games")}${TOUCH?"":"<kbd>E</kbd>"}`;
  if(show) $("prompt").innerHTML=`${L("คุยกับ","Talk to")} ${esc(nm(n.id))}${TOUCH?"":"<kbd>E</kbd>"}`;
  else if(showDoor) $("prompt").innerHTML=`${(dn.alley?(dn.soi||ghostOpen()):(!dn.soon&&zoneOpen(dn.zone)))?L("เข้า ","Enter ")+esc(dn.name[S.lang]):L("ล็อกอยู่: ","Locked: ")+esc(dn.name[S.lang])}${TOUCH?"":"<kbd>E</kbd>"}`;
  const act=$("act"); act.disabled=!(show||sp||showDoor||kk||feed||hq||rp||vl); act.textContent=sp?L("ตรวจ","Inspect"):kk?L("เล่น","Play"):feed?L("ให้อาหาร","Feed"):hq?L("เข้า","Enter"):vl?L("สำรวจ","Look"):rp?L("ซ่อม","Repair"):showDoor?L("เข้า","Enter"):L("คุย","Talk");
  $("keys").innerHTML=L(`<kbd>WASD</kbd>/<kbd>←↑→↓</kbd> เดิน · <kbd>E</kbd> คุย · <kbd>Q</kbd> ส่องแว่น · คลิกพื้นเพื่อเดิน`,`<kbd>WASD</kbd>/<kbd>←↑→↓</kbd> walk · <kbd>E</kbd> talk · <kbd>Q</kbd> lens · click the floor to walk`);
  const hide = sheetMode==="start";
  $("hud").hidden=hide; $("joy").hidden=hide; $("act").hidden=hide; $("keys").hidden=hide;
}
let toastT;
function toast(msg){ const t=$("toast"); t.textContent=msg; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2600); }

/* ---------- dialog ---------- */
let D=null, talking=null, typer=null;
const seg = (typeof Intl!=="undefined" && Intl.Segmenter) ? new Intl.Segmenter("th",{granularity:"grapheme"}) : null;
const graphemes = (s)=>seg?[...seg.segment(s)].map(x=>x.segment):Array.from(s);
function say(who, lines, opts={}){
  sfx("blip");
  D={who, lines, i:0, choices:opts.choices||null, onEnd:opts.onEnd||null, full:false};
  $("dlg").hidden=false; showLine();
}
function showLine(){
  const line=D.lines[D.i], who=line.who||D.who;
  $("dlgFace").src=SPRITES[who].face.src;
  $("dlgWho").innerHTML=`${esc(nm(who))}<small>${esc(PEOPLE[who].role[S.lang])}${who===S.char?" · "+L("คุณ","you"):""}</small>`;
  $("dlgCh").innerHTML=""; $("dlgNx").textContent="";
  const txt=line.t[S.lang]; const gs=graphemes(txt); let k=0;
  clearInterval(typer); D.full=false;
  if(RM){ $("dlgTxt").textContent=txt; finishLine(); return; }
  $("dlgTxt").textContent="";
  typer=setInterval(()=>{ k+=2; $("dlgTxt").textContent=gs.slice(0,k).join(""); if(k>=gs.length) finishLine(); },26);
}
function finishLine(){
  clearInterval(typer); D.full=true; $("dlgTxt").textContent=D.lines[D.i].t[S.lang];
  const last=D.i===D.lines.length-1;
  if(last && D.choices){
    $("dlgCh").innerHTML=D.choices.map((c,i)=>`<button class="cbtn ${c.ghost?"ghost":""}" data-c="${i}">${esc(c.label[S.lang])}</button>`).join("");
    $("dlgCh").querySelectorAll("[data-c]").forEach(b=>b.onclick=(ev)=>{ ev.stopPropagation(); const c=D.choices[+b.dataset.c]; closeDlg(); c.fn&&c.fn(); });
    $("dlgCh").querySelector("button")?.focus({preventScroll:true});
  } else $("dlgNx").textContent = last ? L("แตะเพื่อปิด ▸","Tap to close ▸") : L("แตะเพื่ออ่านต่อ ▸","Tap to continue ▸");
}
function advance(){
  if(!D) return;
  if(!D.full){ finishLine(); return; }
  if(D.i<D.lines.length-1){ D.i++; showLine(); return; }
  if(D.choices) return;
  const f=D.onEnd; closeDlg(); f&&f();
}
function closeDlg(){ clearInterval(typer); $("dlg").hidden=true; D=null; talking=null; }
$("dlg").addEventListener("click",(e)=>{ if(e.target.closest("button")) return; advance(); });
/* tapping anywhere on the screen moves the story on: the dialogue box, or the next comic panel */
const TAP_SKIP="button,a,input,textarea,select,label,.fx,.hud,#goal,.phonepeek,.joy,.act";
document.addEventListener("pointerup",(e)=>{
  if(e.pointerType==="mouse" && e.button!==0) return;
  if(e.target.closest(TAP_SKIP) || e.target.closest("#dlg")) return;
  if(D && !sheetMode){ if(!(D.full && D.i===D.lines.length-1 && D.choices)) { e.preventDefault(); advance(); } return; }
  if(sheetMode==="cut"){ const nx=$("sheet").querySelector("[data-cnext]"); if(nx) nx.click(); }
},true);
