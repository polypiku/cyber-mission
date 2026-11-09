/* Canvas drawing for rooms, furniture and the street. */
/* ---------- canvas ---------- */
const cv=$("cv"), ctx=cv.getContext("2d");
let VW=0, VH=0, DPR=1, Z=1, camX=0, camY=0;
const bg=document.createElement("canvas");
function resize(){
  DPR=Math.min(window.devicePixelRatio||1,2);
  VW=cv.clientWidth; VH=cv.clientHeight;
  cv.width=Math.round(VW*DPR); cv.height=Math.round(VH*DPR);
  const fit=Math.min(VW/RW, VH/RH);
  Z = VW>=760 ? Math.min(1.7, fit) : Math.min(1.7, Math.max(fit, VW/(9.5*T)));
}
window.addEventListener("resize",resize);

function rr(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
const INK="#141414";
function drawStatic(){
  const s=2; bg.width=W*s; bg.height=H*s; const g=bg.getContext("2d"); g.scale(s,s);
  g.lineJoin="round"; g.lineCap="round";
  if(S.zone===2){ drawLibStatic(g); return; }
  if(S.zone===0){ drawStreetStatic(g); return; }
  if(S.zone===3){ drawBankStatic(g); return; }
  if(S.zone===4){ drawNetStatic(g); return; }
  if(S.zone===5){ drawHauntStatic(g); return; }
  if(S.zone===6){ drawUniStatic(g); return; }
  if(S.zone===8){ drawOfficeStatic(g); return; }
  if(S.zone===7){ if(cbFloor()) drawCellBlockStatic(g); else drawPoliceStatic(g); return; }
  // floor
  g.fillStyle="#E7CFA6"; g.fillRect(0,0,W,H);
  g.strokeStyle="rgba(122,78,36,.22)"; g.lineWidth=1.2;
  for(let y=108,r=0;y<590;y+=24,r++){ g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke();
    for(let x=(r%2?48:0);x<W;x+=96){ g.beginPath(); g.moveTo(x,y); g.lineTo(x,y+24); g.stroke(); } }
  // rug
  rr(g,296,300,300,172,20); g.fillStyle="#D9573A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,310,314,272,144,14); g.setLineDash([8,7]); g.strokeStyle="#F6C9A6"; g.lineWidth=2.5; g.stroke(); g.setLineDash([]);
  g.fillStyle="#F6C9A6"; g.font="800 24px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"STOP · THINK · CHECK":"หยุด · คิด · ตรวจสอบ",446,388);
  // back wall
  g.fillStyle="#F5ECDD"; g.fillRect(0,0,W,108);
  g.fillStyle="#C78C57"; g.fillRect(0,86,W,22);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,86); g.lineTo(W,86); g.moveTo(0,108); g.lineTo(W,108); g.stroke();
  // windows
  for(let i=0;i<3;i++){ const x=64+i*124; rr(g,x,14,108,62,4); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.beginPath(); g.moveTo(x+54,14); g.lineTo(x+54,76); g.moveTo(x,45); g.lineTo(x+108,45); g.lineWidth=2.5; g.stroke();
    g.strokeStyle="rgba(255,255,255,.85)"; g.lineWidth=3; g.beginPath(); g.moveTo(x+12,36); g.lineTo(x+28,20); g.moveTo(x+66,36); g.lineTo(x+82,20); g.stroke(); }
  // menu board
  rr(g,566,10,214,62,4); g.fillStyle="#2E3B33"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#FFC414"; g.font="800 17px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.fillText("BEAN HOUSE",580,28);
  g.fillStyle="#F5ECDD"; g.font="500 11px 'IBM Plex Mono', monospace"; g.fillText("LATTE 65   MOCHA 70",580,48); g.fillText("COCOA 55   TEA   45",580,62);
  // side + bottom walls
  g.fillStyle="#D7C3A6"; g.fillRect(0,108,44,H); g.fillRect(W-44,108,44,H); g.fillRect(0,580,384,44); g.fillRect(480,580,W-480,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(384,580); g.moveTo(480,580); g.lineTo(W-44,580); g.lineTo(W-44,108); g.stroke();
  // door mat + gap
  g.fillStyle="#E7CFA6"; g.fillRect(384,580,96,44);
  rr(g,392,584,80,30,4); g.fillStyle="#7A4A2A"; g.fill(); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke();
  g.strokeStyle="#A8714A"; g.lineWidth=2; for(let x=402;x<468;x+=10){ g.beginPath(); g.moveTo(x,588); g.lineTo(x,610); g.stroke(); }
  // router on left wall
  rr(g,10,408,26,18,3); g.fillStyle="#F5F1EA"; g.fill(); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke();
  g.beginPath(); g.moveTo(15,408); g.lineTo(12,394); g.moveTo(31,408); g.lineTo(34,394); g.stroke();
  g.fillStyle="#2BB673"; g.beginPath(); g.arc(18,417,2.4,0,7); g.fill(); g.fillStyle="#FFC414"; g.beginPath(); g.arc(26,417,2.4,0,7); g.fill();
}

/* the street */
function drawStreetStatic(g){
  drawStreetGround(g);
  // the dark alley between the café and the store
  g.fillStyle="#2A2238"; g.fillRect(462,40,72,212); g.strokeStyle=INK; g.lineWidth=3; g.strokeRect(462,40,72,212);
  g.fillStyle="#3A3050"; for(let y=60;y<250;y+=26) g.fillRect(470+(y%52?6:0),y,26,10);
  g.fillStyle="rgba(150,130,200,.25)"; g.beginPath(); g.ellipse(498,236,34,10,0,0,7); g.fill();
  // the two sois (side lanes) to the university and the police station
  for(const b of BUILDINGS.filter(x=>x.soi && !x.road)){
    g.fillStyle="#BDB6A8"; g.fillRect(b.x,40,b.w,212); g.strokeStyle=INK; g.lineWidth=3; g.strokeRect(b.x,40,b.w,212);
    g.fillStyle="#CFC8BA"; for(let y=48;y<250;y+=22) g.fillRect(b.x+6,y,b.w-12,14);
    g.strokeStyle="#F2F2F2"; g.lineWidth=3; g.setLineDash([12,10]); g.beginPath(); g.moveTo(b.door,46); g.lineTo(b.door,248); g.stroke(); g.setLineDash([]);
    g.fillStyle="#9AA0A6"; g.fillRect(b.x+b.w-10,70,5,120); rr(g,b.x+b.w-22,58,30,16,4); g.fillStyle="#FFF4D6"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
  }
  // curb + road
  g.fillStyle="#B9B2A6"; g.fillRect(0,600,OW,14); g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,600); g.lineTo(OW,600); g.moveTo(0,614); g.lineTo(OW,614); g.stroke();
  g.fillStyle="#4A4D52"; g.fillRect(0,614,OW,150);
  // south curb + sidewalk
  g.fillStyle="#B9B2A6"; g.fillRect(0,764,OW,14); g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,764); g.lineTo(OW,764); g.moveTo(0,778); g.lineTo(OW,778); g.stroke();
  brickPave(g,0,778,OW,80,91);
  grassArea(g,0,858,OW,OH-858,93);
  drawOfficesStatic(g);
  drawSouthRoad(g);
  g.strokeStyle="#F2F2F2"; g.lineWidth=4; g.setLineDash([34,26]); g.beginPath(); g.moveTo(0,690); g.lineTo(OW,690); g.stroke(); g.setLineDash([]);
  g.fillStyle="#F2F2F2"; for(let i=0;i<7;i++) g.fillRect(696+i*0, 622+i*20, 0, 0);
  drawCrossroads(g);
  for(const xg of XINGS){ g.fillStyle="#F2F2F2"; for(let xx=xg.x0+4;xx+12<=xg.x1;xx+=22) g.fillRect(xx,620,12,140);
    if(!xg.dir||xg.dir>0) g.fillRect(xg.x0-20,618,6,70); if(!xg.dir||xg.dir<0) g.fillRect(xg.x1+14,692,6,70); }
  // side fences
  grassArea(g,0,250,28,350,95); grassArea(g,OW-28,250,28,350,96);
  // buildings
  for(const b of BUILDINGS){
    if(b.alley) continue;
    const y0=60, h=190;
    thaiRoof(g,b,y0);
    g.fillStyle="rgba(0,0,0,.18)"; g.fillRect(b.x+8,y0+8,b.w,h);
    rr(g,b.x,y0,b.w,h,4); g.fillStyle=b.wall; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    // roof / awning
    rr(g,b.x-10,y0-18,b.w+20,30,4); g.fillStyle=b.roof; g.fill(); g.stroke();
    g.fillStyle="rgba(255,255,255,.35)"; for(let x=b.x;x<b.x+b.w;x+=40) g.fillRect(x+4,y0-14,16,22);
    // sign
    rr(g,b.door-110,y0+22,220,46,4); g.fillStyle=b.sign; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.fillStyle=b.signFg; g.font="800 20px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(b.name[S.lang],b.door,y0+40);
    g.fillStyle="#FFFFFF"; g.font="600 10.5px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(b.sub[S.lang],b.door,y0+59);
    // windows
    for(const wx of [b.x+22, b.x+b.w-112]){ rr(g,wx,y0+88,90,66,4); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
      g.beginPath(); g.moveTo(wx+45,y0+88); g.lineTo(wx+45,y0+154); g.lineWidth=2; g.stroke();
      g.strokeStyle="rgba(255,255,255,.9)"; g.lineWidth=3; g.beginPath(); g.moveTo(wx+10,y0+112); g.lineTo(wx+26,y0+96); g.stroke(); }
    // door
    rr(g,b.door-30,y0+108,60,h-108,3); g.fillStyle=b.soon?"#8E8796":"#7A4A2A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    if(!b.soon){ rr(g,b.door-22,y0+118,44,40,3); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=2; g.stroke(); }
    g.fillStyle="#FFC414"; g.beginPath(); g.arc(b.door+20,y0+160,3,0,7); g.fill();
  }
  drawStreetDecor(g);
}
function drawTree(g,p){
  g.fillStyle="rgba(0,0,0,.18)"; g.beginPath(); g.ellipse(p.x,p.y+10,26,8,0,0,7); g.fill();
  g.fillStyle="#7A5233"; g.fillRect(p.x-6,p.y-30,12,40); g.lineWidth=2.5; g.strokeStyle=INK; g.strokeRect(p.x-6,p.y-30,12,40);
  for(const [dx,dy,r] of [[-18,-50,20],[16,-54,21],[0,-74,22],[-4,-46,18]]){ g.beginPath(); g.arc(p.x+dx,p.y+dy,r,0,7); g.fillStyle="#3F8E4E"; g.fill(); g.stroke(); }
  g.fillStyle="rgba(255,255,255,.25)"; g.beginPath(); g.arc(p.x-6,p.y-80,7,0,7); g.fill();
}
function drawBench(g,b){
  g.fillStyle="rgba(0,0,0,.16)"; g.fillRect(b.x-38,b.y+8,80,6);
  rr(g,b.x-40,b.y-22,80,12,3); g.fillStyle="#C86A3A"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  rr(g,b.x-40,b.y-6,80,12,3); g.fill(); g.stroke();
  g.fillStyle=INK; g.fillRect(b.x-34,b.y+6,5,8); g.fillRect(b.x+29,b.y+6,5,8);
}
function drawLamp(g,l,now){
  g.fillStyle="#3A3F46"; g.fillRect(l.x-3,l.y-74,6,74); g.lineWidth=2; g.strokeStyle=INK; g.strokeRect(l.x-3,l.y-74,6,74);
  rr(g,l.x-10,l.y-92,20,20,4); g.fillStyle="#FFE38A"; g.fill(); g.stroke();
  g.fillStyle=INK; g.fillRect(l.x-8,l.y+0,16,4);
}
/* TV with scrolling scam-news headlines */
const NEWS={th:["ด่วน! แก๊งคอลเซ็นเตอร์อ้างเป็นตำรวจ วิดีโอคอลขู่ผู้สูงอายุ","เตือนภัย QR ปลอมแปะทับในร้านกาแฟหลายแห่ง","ตำรวจเผย บัญชีม้าถูกจ้างเปิดผ่านกลุ่มหางานนักศึกษา","SMS พัสดุตกค้างระบาดช่วงเทศกาลช้อปปิ้ง","สายด่วน 1441 รับแจ้งเหตุภัยออนไลน์ 24 ชั่วโมง"],en:["Breaking: call-centre gang poses as police on video calls","Warning: fake QR stickers found in several cafés","Police: mule accounts recruited via student job groups","Stuck-parcel SMS surge during shopping festival","Hotline 1441 takes online scam reports 24/7"]};
function drawTV(g,x,y,now){
  rr(g,x,y,104,60,4); g.fillStyle="#1B1E22"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#2D5A9B"; g.fillRect(x+6,y+6,92,34);
  g.fillStyle="#FFFFFF"; g.font="800 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.textBaseline="middle"; g.fillText("NEWS",x+10,y+14);
  g.fillStyle="#E5402F"; g.beginPath(); g.arc(x+92,y+13,3,0,7); g.fill();
  g.fillStyle="rgba(255,255,255,.7)"; g.fillRect(x+12,y+22,40,3); g.fillRect(x+12,y+28,62,3);
  g.fillStyle="#FFC414"; g.fillRect(x+6,y+42,92,12);
  g.save(); g.beginPath(); g.rect(x+6,y+42,92,12); g.clip();
  const list=NEWS[S.lang], txt=list.join("   •   ")+"   •   "; g.font="700 8.5px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillStyle=INK;
  const w=g.measureText(txt).width, off=RM?0:(now/40)%w; g.fillText(txt,x+98-off,y+48.5); g.fillText(txt,x+98-off+w,y+48.5); g.restore();
}
function drawAmbientBack(g,now){
  if(S.zone===1) drawTV(g,446,14,now);
  if(S.zone===5 && !RM){ for(let i=0;i<14;i++){ const p=((now/9000)+i/14)%1, x=60+((i*137)%780), y=560-p*440; g.fillStyle=`rgba(230,220,255,${.35*Math.sin(p*Math.PI)})`; g.beginPath(); g.arc(x+Math.sin(now/1200+i)*12,y,2.2,0,7); g.fill(); } }
  if(S.zone===3) drawTV(g,446,14,now);
  if(S.zone===1 && !RM){ // coffee steam over cups
    for(const t of TABLES) if(t.item==="cups"||t.item==="cups2") for(const dx of [-12,12]){
      for(let k=0;k<2;k++){ const p=((now/1400)+k*.5+dx*.01)%1; g.strokeStyle=`rgba(255,255,255,${.7*(1-p)})`; g.lineWidth=2; g.beginPath(); const sx=t.x+dx, sy=t.y-10-p*22; g.moveTo(sx,sy); g.quadraticCurveTo(sx+4*Math.sin(now/300+k),sy-5,sx,sy-10); g.stroke(); } }
  }
}
/* pigeons on the street scatter when you walk up */
const PIGEONS=[{x:620,y:520},{x:650,y:540},{x:600,y:548},{x:1090,y:400},{x:1110,y:416},{x:360,y:400}].map(p=>({...p,hx:p.x,hy:p.y,fly:0,back:0}));
function drawPigeon(g,p,now){
  const f=p.fly, bob=RM?0:(p.peck?Math.abs(Math.sin(now/90+p.hx))*5:Math.abs(Math.sin(now/180+p.hx))*2);
  g.save(); g.translate(p.x,p.y-f*80); if(p.face<0) g.scale(-1,1);
  if(f<0.05){ g.fillStyle="rgba(0,0,0,.15)"; g.beginPath(); g.ellipse(0,2,9,3,0,0,7); g.fill(); }
  g.fillStyle="#8E949C"; g.strokeStyle=INK; g.lineWidth=1.6;
  g.beginPath(); g.ellipse(0,-6,9,6,0,0,7); g.fill(); g.stroke();
  g.beginPath(); g.arc(7,-11-(f?0:bob),4,0,7); g.fillStyle="#6C727A"; g.fill(); g.stroke();
  g.fillStyle="#F2A900"; g.beginPath(); g.moveTo(11,-11-(f?0:bob)); g.lineTo(14,-10-(f?0:bob)); g.lineTo(11,-9-(f?0:bob)); g.fill();
  if(f>0){ const w=Math.sin(now/40)*6; g.fillStyle="#A9AFB7"; g.beginPath(); g.ellipse(-2,-10-w,8,3,-.5,0,7); g.fill(); g.stroke(); }
  g.restore();
}
/* the café cat wanders about */
const CAT={x:700,y:520,tx:700,ty:520,wait:2,face:1,meow:0,eat:0,follow:0};
function drawCat(g,now){
  const {x,y}=CAT, s=CAT.face, walk=CAT.moving&&!RM?Math.sin(now/90)*2:0;
  g.save(); g.translate(x,y); g.scale(s,1);
  g.fillStyle="rgba(0,0,0,.15)"; g.beginPath(); g.ellipse(0,2,14,4,0,0,7); g.fill();
  g.fillStyle="#E8A456"; g.strokeStyle=INK; g.lineWidth=2;
  g.beginPath(); g.ellipse(0,-9,13,8,0,0,7); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(-12,-12); g.quadraticCurveTo(-24,-22+(RM?0:Math.sin(now/300)*4),-18,-30); g.lineWidth=4; g.stroke(); g.strokeStyle="#E8A456"; g.lineWidth=2; g.stroke(); g.strokeStyle=INK;
  g.lineWidth=2; g.beginPath(); g.arc(12,-17,7,0,7); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(8,-22); g.lineTo(9,-28); g.lineTo(13,-23); g.moveTo(14,-23); g.lineTo(18,-28); g.lineTo(18,-21); g.fill(); g.stroke();
  g.fillStyle=INK; g.fillRect(13,-19,1.8,2.4); g.fillRect(16,-19,1.8,2.4);
  g.fillRect(-8,-3+walk,3,5); g.fillRect(6,-3-walk,3,5);
  g.restore();
  if(CAT.meow>0){ g.save(); g.font="700 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; const tx=CAT.follow>0?L("เมี้ยว~ ♥","meow~ ♥"):L("เมี้ยว~","meow~"), tw=g.measureText(tx).width+14; rr(g,x-tw/2,y-56,tw,20,10); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.fillText(tx,x,y-46); g.restore(); }
}
function stepAmbient(dt){
  if(CRUMBS){ CRUMBS.t-=dt; if(CRUMBS.t<=0) CRUMBS=null; }
  if(S.zone===0) for(const p of PIGEONS){
    const d=Math.hypot(player.x-p.x,player.y-p.y);
    if(p.fly===0 && CRUMBS && Math.hypot(p.x-CRUMBS.x,p.y-CRUMBS.y)<260){ // waddle over and peck
      const tx=CRUMBS.x+p.ox, ty=CRUMBS.y+p.oy, ddx=tx-p.x, ddy=ty-p.y, dd=Math.hypot(ddx,ddy);
      p.peck = dd<4; if(dd>=4){ p.x+=ddx/dd*Math.min(55*dt,dd); p.y+=ddy/dd*Math.min(55*dt,dd); p.face=ddx<0?-1:1; }
      continue;
    }
    p.peck=false;
    if(p.fly===0 && !CRUMBS && (Math.abs(p.x-p.hx)>2||Math.abs(p.y-p.hy)>2)){ const ddx=p.hx-p.x, ddy=p.hy-p.y, dd=Math.hypot(ddx,ddy); p.x+=ddx/dd*Math.min(30*dt,dd); p.y+=ddy/dd*Math.min(30*dt,dd); p.face=ddx<0?-1:1; continue; }
    if(p.fly===0 && d<70 && player.moving){ p.fly=0.01; p.back=8; p.dx=(p.x<player.x?-1:1)*(60+Math.random()*60); }
    if(p.fly>0){ if(p.back>0){ p.back-=dt; p.fly=Math.min(1,p.fly+dt*1.6); p.x+=p.dx*dt; } else { p.fly=Math.max(0,p.fly-dt*1.2); p.x+=(p.hx-p.x)*Math.min(1,dt*2); if(p.fly===0){ p.x=p.hx; p.y=p.hy; } } }
  }
  if(S.zone===1 && CAT.eat>0){ CAT.eat-=dt; CAT.moving=false; if(CAT.eat<=0){ CAT.follow=12; CAT.meow=1.6; } return; }
  if(S.zone===1 && CAT.follow>0){ CAT.follow-=dt; CAT.tx=player.x+(player.x>CAT.x?-46:46); CAT.ty=player.y+6; CAT.wait=2; }
  if(S.zone===1){
    const dx=CAT.tx-CAT.x, dy=CAT.ty-CAT.y, d=Math.hypot(dx,dy);
    if(d<3){ CAT.moving=false; CAT.wait-=dt; if(CAT.wait<=0){ const spots=[[700,520],[560,250],[470,530],[300,420],[760,300],[140,460]]; const s=spots[Math.floor(Math.random()*spots.length)]; CAT.tx=s[0]; CAT.ty=s[1]; CAT.wait=3+Math.random()*4; } }
    else { CAT.moving=true; const sp=(CAT.follow>0?120:38)*dt; CAT.x+=dx/d*Math.min(sp,d); CAT.y+=dy/d*Math.min(sp,d); CAT.face=dx<0?-1:1; }
    const near=Math.hypot(player.x-CAT.x,player.y-CAT.y)<60;
    if(near && CAT.meow<=0 && !CAT.meowed){ CAT.meow=1.6; CAT.meowed=true; }
    if(!near) CAT.meowed=false;
    if(CAT.meow>0) CAT.meow-=dt;
  }
}
/* feeding animals */
let CRUMBS=null;
PIGEONS.forEach((p,i)=>{ p.ox=Math.cos(i*1.9)*18; p.oy=Math.sin(i*1.9)*10; });
function nearCat(){ return S.zone===1 && S.char && CAT.eat<=0 && Math.hypot(player.x-CAT.x,player.y-CAT.y)<70; }
function nearBirds(){ return S.zone===0 && S.char && !CRUMBS && PIGEONS.some(p=>p.fly===0 && Math.hypot(player.x-p.x,player.y-p.y)<110); }
function feedCat(){
  CAT.eat=3.2; CAT.tx=CAT.x; CAT.ty=CAT.y; CAT.face=player.x<CAT.x?-1:1; CAT.bowl={x:CAT.x+CAT.face*18,y:CAT.y+4};
  S.fed.cat++; save(); sfx("good"); toast(L("ให้ปลาแมวแล้ว 🐟 แมวจะเดินตามสักพัก","You fed the cat 🐟 It'll follow you for a bit"));
}
function feedBirds(){
  const dx=player.dir==="left"?-40:player.dir==="right"?40:0, dy=player.dir==="up"?-30:player.dir==="down"?30:0;
  CRUMBS={x:player.x+dx,y:player.y+dy,t:7,dots:Array.from({length:12},()=>[Math.random()*36-18,Math.random()*18-9])};
  PIGEONS.forEach(p=>{ if(p.fly>0){ p.back=0; } });
  S.fed.birds++; save(); sfx("ping"); toast(L("โปรยข้าวให้นก 🌾","Scattered grain for the pigeons 🌾"));
}
function drawCrumbs(g){ if(!CRUMBS) return; g.fillStyle="#E8C48A"; g.strokeStyle=INK; g.lineWidth=.8; for(const [dx,dy] of CRUMBS.dots){ g.beginPath(); g.arc(CRUMBS.x+dx,CRUMBS.y+dy,2.2,0,7); g.fill(); g.stroke(); } }
function drawBowl(g,now){
  if(!(CAT.eat>0) || !CAT.bowl) return; const {x,y}=CAT.bowl;
  g.beginPath(); g.ellipse(x,y,12,5,0,0,7); g.fillStyle="#3A5A94"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#9AA3AA"; g.beginPath(); g.ellipse(x,y-2,7,2.5,0,0,7); g.fill();
  if(!RM) for(let i=0;i<3;i++){ const p=((now/900)+i/3)%1; g.save(); g.globalAlpha=1-p; g.fillStyle="#E5402F"; g.font="700 14px sans-serif"; g.textAlign="center"; g.fillText("♥",CAT.x+(i-1)*10,CAT.y-34-p*26); g.restore(); }
}
