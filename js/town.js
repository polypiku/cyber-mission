/* Drawing the storybook town: lawns with hedges, winding brick paths, a river with wooden and stone
   bridges, one main road, a pond with a gazebo, a vegetable garden, a fountain square, a playground,
   and buildings in several styles (houses, awning shops, a school, a columned library). */

let BRICK_PAT=null;
function brickPattern(g){
  if(BRICK_PAT) return BRICK_PAT;
  const c=document.createElement("canvas"); c.width=48; c.height=24; const b=c.getContext("2d");
  b.fillStyle="#C9A06E"; b.fillRect(0,0,48,24);
  const cols=["#E2C296","#D8B585","#DDB98A","#E6C9A0"];
  for(let row=0;row<2;row++) for(let k=-1;k<3;k++){ const x=k*24+(row?12:0); b.fillStyle=cols[(row*3+k+4)%4]; b.fillRect(x+1,row*12+1,22,10); }
  BRICK_PAT=g.createPattern(c,"repeat"); return BRICK_PAT;
}
function smoothPath(g,P){
  g.beginPath(); g.moveTo(P[0][0],P[0][1]);
  for(let i=1;i<P.length-1;i++){ const mx=(P[i][0]+P[i+1][0])/2, my=(P[i][1]+P[i+1][1])/2; g.quadraticCurveTo(P[i][0],P[i][1],mx,my); }
  g.lineTo(P[P.length-1][0],P[P.length-1][1]);
}
function drawBrickPath(g,P,w){
  g.save(); g.lineCap="round"; g.lineJoin="round";
  smoothPath(g,P); g.strokeStyle="#A27A4E"; g.lineWidth=w+8; g.stroke();
  smoothPath(g,P); g.strokeStyle=brickPattern(g); g.lineWidth=w; g.stroke();
  g.restore();
}
/* every path is a little asphalt road: curbs, then tarmac, then the dashed yellow centre line,
   each layer drawn for all roads together so the junctions join up cleanly */
function drawRoads(g,list,w){
  g.save(); g.lineCap="round"; g.lineJoin="round";
  for(const P of list){ smoothPath(g,P); g.strokeStyle=INK; g.lineWidth=w+26; g.stroke(); }
  for(const P of list){ smoothPath(g,P); g.strokeStyle="#C9C2B6"; g.lineWidth=w+20; g.stroke(); }
  for(const P of list){ smoothPath(g,P); g.strokeStyle=INK; g.lineWidth=w+4; g.stroke(); }
  for(const P of list){ smoothPath(g,P); g.strokeStyle="#5A5E64"; g.lineWidth=w; g.stroke(); }
  g.fillStyle="#5A5E64"; g.fillRect(0,AVE.y0+3,OW,AVE.y1-AVE.y0-6);
  g.lineCap="butt"; g.setLineDash([30,24]);
  for(const P of list){ smoothPath(g,P); g.strokeStyle="#FFD84D"; g.lineWidth=5; g.stroke(); }
  g.beginPath(); g.moveTo(0,(AVE.y0+AVE.y1)/2); g.lineTo(OW,(AVE.y0+AVE.y1)/2); g.lineWidth=5; g.stroke();
  g.setLineDash([]); g.restore();
}
function polyline(g,P){ g.beginPath(); g.moveTo(P[0][0],P[0][1]); for(let i=1;i<P.length;i++) g.lineTo(P[i][0],P[i][1]); }
function drawRiver(g){
  const P=riverSamples();
  g.save(); g.lineCap="round"; g.lineJoin="round";
  polyline(g,P); g.strokeStyle="#8FBF62"; g.lineWidth=RIVER_W+30; g.stroke();
  polyline(g,P); g.strokeStyle="#2E6E95"; g.lineWidth=RIVER_W+6; g.stroke();
  polyline(g,P); g.strokeStyle="#5DB7E8"; g.lineWidth=RIVER_W-4; g.stroke();
  polyline(g,P); g.strokeStyle="rgba(255,255,255,.4)"; g.lineWidth=8; g.setLineDash([26,60]); g.stroke(); g.setLineDash([]);
  g.restore();
  /* lily pads */
  const r=seeded(31);
  for(let i=0;i<14;i++){ const p=P[Math.floor(r()*P.length)]; const dx=(r()-.5)*40, dy=(r()-.5)*40;
    g.fillStyle="#4E9A3F"; g.beginPath(); g.arc(p[0]+dx,p[1]+dy,9,.4,Math.PI*2-.2); g.lineTo(p[0]+dx,p[1]+dy); g.fill(); }
}
function drawBridge(g,b){
  const h=b.dir==="h", len=RIVER_W+70, half=b.half;
  const x0=h?b.x-len/2:b.x-half, y0=h?b.y-half:b.y-len/2, w=h?len:half*2, hh=h?half*2:len;
  g.fillStyle="rgba(0,0,0,.2)"; g.fillRect(x0+5,y0+8,w,hh);
  if(b.kind==="road"){ g.fillStyle="#5A5E64"; g.fillRect(x0,y0,w,hh); }
  else if(b.kind==="stone"){ rr(g,x0,y0,w,hh,22); g.fillStyle="#BFC4C9"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.strokeStyle="rgba(0,0,0,.18)"; g.lineWidth=2; for(let yy=y0+14;yy<y0+hh;yy+=16){ g.beginPath(); g.moveTo(x0+6,yy); g.lineTo(x0+w-6,yy); g.stroke(); } }
  else { g.fillStyle="#B0763F"; g.fillRect(x0,y0,w,hh); g.strokeStyle="rgba(60,30,10,.35)"; g.lineWidth=2;
    if(h) for(let x=x0+10;x<x0+w;x+=12){ g.beginPath(); g.moveTo(x,y0); g.lineTo(x,y0+hh); g.stroke(); }
    else for(let y=y0+10;y<y0+hh;y+=12){ g.beginPath(); g.moveTo(x0,y); g.lineTo(x0+w,y); g.stroke(); } }
  const rail=b.kind==="road"?"#C9CED4":b.kind==="stone"?"#9AA0A6":"#8A5A33";
  const rails=h?[[x0-6,y0-7,w+12,12],[x0-6,y0+hh-5,w+12,12]]:[[x0-7,y0-6,12,hh+12],[x0+w-5,y0-6,12,hh+12]];
  for(const [rx,ry,rw,rh] of rails){ rr(g,rx,ry,rw,rh,5); g.fillStyle=rail; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); }
  const posts=h?[[x0,y0],[x0+w,y0],[x0,y0+hh],[x0+w,y0+hh]]:[[x0,y0],[x0+w,y0],[x0,y0+hh],[x0+w,y0+hh]];
  for(const [px,py] of posts){ rr(g,px-9,py-11,18,20,4); g.fillStyle=rail; g.fill(); g.stroke(); }
}
function drawAvenue(g){
  const {y0,y1}=AVE;
  g.fillStyle="#C9C2B6"; g.fillRect(0,y0-12,OW,12); g.fillRect(0,y1,OW,12);
  g.fillStyle="#5A5E64"; g.fillRect(0,y0,OW,y1-y0);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,y0-12); g.lineTo(OW,y0-12); g.moveTo(0,y0); g.lineTo(OW,y0); g.moveTo(0,y1); g.lineTo(OW,y1); g.moveTo(0,y1+12); g.lineTo(OW,y1+12); g.stroke();
  g.strokeStyle="#FFD84D"; g.lineWidth=5; g.setLineDash([40,30]); g.beginPath(); g.moveTo(0,(y0+y1)/2); g.lineTo(OW,(y0+y1)/2); g.stroke(); g.setLineDash([]);
}
function drawLot(g,l){
  rr(g,l.x,l.y,l.w,l.h,26);
  g.fillStyle=l.plaza?"#A8D985":"#9CD27A"; g.fill(); g.lineWidth=3; g.strokeStyle="#5E9E45"; g.stroke();
  if(l.plaza){ rr(g,l.x+40,l.y+250,l.w-80,l.h-280,12); g.fillStyle="#C9CBC6"; g.fill(); g.lineWidth=2.5; g.strokeStyle="#8E918C"; g.stroke();
    g.strokeStyle="rgba(0,0,0,.08)"; g.lineWidth=1.5; for(let x=l.x+60;x<l.x+l.w-40;x+=40){ g.beginPath(); g.moveTo(x,l.y+252); g.lineTo(x,l.y+l.h-32); g.stroke(); } }
  /* hedges round the back and sides */
  for(let x=l.x+26;x<l.x+l.w-20;x+=34) bush(g,x,l.y+14,13,"#4E9A3F");
  for(let y=l.y+50;y<l.y+l.h-40;y+=38){ bush(g,l.x+14,y,12,"#4E9A3F"); bush(g,l.x+l.w-14,y,12,"#4E9A3F"); }
  if(l.fence){ const fy=l.y+l.h-18, gap=BUILDINGS.find(b=>b.door>l.x&&b.door<l.x+l.w&&b.y0>l.y&&b.y0<l.y+l.h);
    g.strokeStyle=INK; g.lineWidth=2;
    for(let x=l.x+20;x<l.x+l.w-14;x+=16){ if(gap&&Math.abs(x-gap.door)<52) continue; rr(g,x,fy-22,10,26,3); g.fillStyle="#FFFFFF"; g.fill(); g.stroke(); }
    g.fillStyle="#FFFFFF"; for(const [a,b] of [[l.x+20,(gap?gap.door-52:l.x+l.w-14)],[gap?gap.door+52:l.x+l.w,l.x+l.w-14]]) if(b>a){ g.fillRect(a,fy-14,b-a,5); g.strokeRect(a,fy-14,b-a,5); } }
}
/* ---------- building styles ---------- */
function signBoard(g,b,cx,cy,w,fs){
  rr(g,cx-w/2,cy-18,w,36,6); g.fillStyle=b.sign; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle=b.signFg; g.font=`800 ${fs||17}px 'Noto Sans Thai', sans-serif`; g.textAlign="center"; g.textBaseline="middle"; g.fillText(b.name[S.lang],cx,cy+1);
}
function windowAt(g,x,y,w,h){ rr(g,x,y,w,h,4); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.beginPath(); g.moveTo(x+w/2,y); g.lineTo(x+w/2,y+h); g.moveTo(x,y+h/2); g.lineTo(x+w,y+h/2); g.lineWidth=2; g.stroke();
  g.strokeStyle="rgba(255,255,255,.9)"; g.lineWidth=3; g.beginPath(); g.moveTo(x+7,y+h/2-6); g.lineTo(x+16,y+7); g.stroke(); }
function doorAt(g,b,col){ const y=b.bot-82; rr(g,b.door-28,y,56,82,3); g.fillStyle=col||"#7A4A2A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,b.door-20,y+10,40,30,3); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle="#FFC414"; g.beginPath(); g.arc(b.door+18,y+52,3,0,7); g.fill(); }
function shadow(g,x,y,w,h){ g.fillStyle="rgba(0,0,0,.18)"; g.fillRect(x+8,y+8,w,h); }
function drawHouse(g,b){
  const {x,w,y0,bot}=b, top=y0+50;
  shadow(g,x,top,w,bot-top); rr(g,x,top,w,bot-top,4); g.fillStyle=b.wall; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  /* roof */
  g.beginPath(); g.moveTo(x-16,top+8); g.lineTo(x+40,y0-50); g.lineTo(x+w-40,y0-50); g.lineTo(x+w+16,top+8); g.closePath(); g.fillStyle=b.roof; g.fill(); g.lineWidth=3; g.stroke();
  g.save(); g.clip(); g.strokeStyle="rgba(0,0,0,.18)"; g.lineWidth=1.5; for(let yy=y0-42;yy<top+8;yy+=10){ g.beginPath(); g.moveTo(x-20,yy); g.lineTo(x+w+20,yy); g.stroke(); } g.restore();
  /* front gable over the door */
  g.beginPath(); g.moveTo(b.door-70,top+10); g.lineTo(b.door,y0-30); g.lineTo(b.door+70,top+10); g.closePath(); g.fillStyle=b.roof; g.fill(); g.stroke();
  g.beginPath(); g.moveTo(b.door-52,top+10); g.lineTo(b.door,y0-12); g.lineTo(b.door+52,top+10); g.closePath(); g.fillStyle=b.wall; g.fill(); g.lineWidth=2; g.stroke();
  windowAt(g,b.door-14,y0+8,28,26);
  g.fillStyle="#8E8A80"; g.fillRect(x+w-70,y0-70,22,36); g.strokeRect(x+w-70,y0-70,22,36);
  for(const wx of [x+28, x+w-98]) windowAt(g,wx,top+40,70,58);
  for(const wx of [x+24, x+w-102]) flowerBox(g,wx,top+104,78,b.ghost?"#9B7BE0":"#F48FB1");
  doorAt(g,b); signBoard(g,b,b.door,top+26,Math.min(w-40,190),15);
}
function drawAwning(g,b){
  const {x,w,y0,bot}=b, top=y0+20;
  shadow(g,x,top,w,bot-top); rr(g,x,top,w,bot-top,4); g.fillStyle=b.wall; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  /* flat roof band with the sign */
  rr(g,x-8,y0-30,w+16,56,6); g.fillStyle=b.roof; g.fill(); g.lineWidth=3; g.stroke();
  g.fillStyle="rgba(255,255,255,.25)"; g.fillRect(x-4,y0-26,w+8,10);
  signBoard(g,b,b.door,y0-2,Math.min(w-30,230),17);
  if(b.cup){ g.beginPath(); g.arc(x+w-30,y0-2,18,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2.5; g.stroke(); g.font="20px sans-serif"; g.fillText("☕",x+w-30,y0); }
  /* striped awning */
  const ay=top+18, n=Math.max(6,Math.round(w/34)), sw=(w+20)/n;
  for(let i=0;i<n;i++){ g.beginPath(); g.moveTo(x-10+i*sw,ay); g.lineTo(x-10+(i+1)*sw,ay); g.lineTo(x-10+(i+1)*sw,ay+30); g.arc(x-10+(i+.5)*sw,ay+30,sw/2,0,Math.PI); g.closePath();
    g.fillStyle=i%2?"#FFFFFF":b.roof; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); }
  for(const wx of [x+22, x+w-112]){ windowAt(g,wx,ay+56,90,62); }
  for(const wx of [x+22, x+w-112]) flowerBox(g,wx-2,ay+122,94,"#FFD84D");
  doorAt(g,b);
}
function drawFlat(g,b){
  const {x,w,y0,bot}=b, top=y0+10;
  shadow(g,x,top,w,bot-top); rr(g,x,top,w,bot-top,4); g.fillStyle=b.wall; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,x-6,y0-24,w+12,36,4); g.fillStyle="#E9ECEF"; g.fill(); g.lineWidth=3; g.stroke();
  g.fillStyle=b.roof; g.fillRect(x+3,top+14,w-6,14); g.strokeRect(x+3,top+14,w-6,14);
  signBoard(g,b,b.door,top+52,Math.min(w-40,220),17);
  /* glass shop front */
  rr(g,x+16,top+80,w-32,bot-top-90,4); g.fillStyle="#BFE0F0"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  for(let xx=x+16+(w-32)/4;xx<x+w-20;xx+=(w-32)/4){ g.beginPath(); g.moveTo(xx,top+80); g.lineTo(xx,bot-10); g.lineWidth=2; g.stroke(); }
  rr(g,b.door-30,bot-80,60,80,3); g.fillStyle="#CFE6F1"; g.fill(); g.lineWidth=3; g.stroke(); g.beginPath(); g.moveTo(b.door,bot-80); g.lineTo(b.door,bot); g.stroke();
  for(const px of [x+28,x+w-28]) pottedPlant(g,px,bot+2);
}
function drawSchool(g,b){
  const {x,w,y0,bot}=b, top=y0+30;
  shadow(g,x,top,w,bot-top); rr(g,x,top,w,bot-top,4); g.fillStyle=b.wall; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.beginPath(); g.moveTo(x-18,top+10); g.lineTo(x+30,y0-40); g.lineTo(x+w-30,y0-40); g.lineTo(x+w+18,top+10); g.closePath(); g.fillStyle=b.roof; g.fill(); g.stroke();
  g.beginPath(); g.moveTo(b.door-90,top+12); g.lineTo(b.door,y0-90); g.lineTo(b.door+90,top+12); g.closePath(); g.fillStyle=b.roof; g.fill(); g.stroke();
  g.beginPath(); g.moveTo(b.door-70,top+12); g.lineTo(b.door,y0-68); g.lineTo(b.door+70,top+12); g.closePath(); g.fillStyle=b.wall; g.fill(); g.lineWidth=2; g.stroke();
  g.beginPath(); g.arc(b.door,y0-12,22,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=3; g.stroke();
  g.lineWidth=2.5; g.beginPath(); g.moveTo(b.door,y0-12); g.lineTo(b.door,y0-27); g.moveTo(b.door,y0-12); g.lineTo(b.door+10,y0-8); g.stroke();
  for(const row of [top+30,top+92]) for(let wx=x+24;wx<x+w-60;wx+=64){ if(Math.abs(wx+22-b.door)<60) continue; windowAt(g,wx,row,44,42); }
  signBoard(g,b,b.door,top+40,180,15);
  rr(g,b.door-34,bot-84,68,84,3); g.fillStyle="#2F6DB5"; g.fill(); g.lineWidth=3; g.stroke(); g.beginPath(); g.moveTo(b.door,bot-84); g.lineTo(b.door,bot); g.stroke();
}
function drawMuseum(g,b){
  const {x,w,y0,bot}=b, top=y0+56;
  shadow(g,x,top,w,bot-top);
  rr(g,x,top,w,bot-top-16,2); g.fillStyle="#5E5A55"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  for(let i=0;i<3;i++){ rr(g,x-10-i*8,bot-16+i*6,w+20+i*16,8,2); g.fillStyle="#D9D5CC"; g.fill(); g.lineWidth=2; g.stroke(); }
  const n=6; for(let i=0;i<n;i++){ const cx=x+18+i*(w-36)/(n-1); if(Math.abs(cx-b.door)<34) continue; rr(g,cx-12,top+8,24,bot-top-26,3); g.fillStyle=b.wall; g.fill(); g.lineWidth=2.5; g.stroke(); }
  rr(g,x-10,top-14,w+20,24,3); g.fillStyle=b.wall; g.fill(); g.lineWidth=3; g.stroke();
  g.beginPath(); g.moveTo(x-16,top-14); g.lineTo(b.door,y0-60); g.lineTo(x+w+16,top-14); g.closePath(); g.fillStyle=b.roof; g.fill(); g.stroke();
  g.beginPath(); g.moveTo(x+30,top-20); g.lineTo(b.door,y0-40); g.lineTo(x+w-30,top-20); g.closePath(); g.fillStyle=b.wall; g.fill(); g.lineWidth=2; g.stroke();
  g.font="28px sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText("📚",b.door,top-34);
  signBoard(g,b,b.door,top+2,Math.min(w-60,220),16);
  doorAt(g,b,"#3A2516");
}
function drawBuilding(g,b){
  if(b.style==="house") drawHouse(g,b);
  else if(b.style==="awning") drawAwning(g,b);
  else if(b.style==="flat") drawFlat(g,b);
  else if(b.style==="school") drawSchool(g,b);
  else if(b.style==="museum") drawMuseum(g,b);
  else drawShopFront(g,b,b.y0);
  if(b.ghost) drawGhostDecor(g,b);
}
function drawGhostDecor(g,b){
  g.save(); g.globalAlpha=.45; g.fillStyle="#1A1424"; g.fillRect(b.x,b.y0+50,b.w,140); g.restore();
  g.strokeStyle="#8C7A5A"; g.lineWidth=6;
  for(const wx of [b.x+28, b.x+b.w-98]){ g.beginPath(); g.moveTo(wx,b.y0+90); g.lineTo(wx+70,b.y0+148); g.moveTo(wx+70,b.y0+90); g.lineTo(wx,b.y0+148); g.stroke(); }
}
/* ---------- park pieces ---------- */
function drawPond(g,P){
  const {x,y,rx,ry}=P;
  g.beginPath(); g.ellipse(x,y,rx+12,ry+10,0,0,7); g.fillStyle="#B9A57C"; g.fill();
  g.beginPath(); g.ellipse(x,y,rx,ry,0,0,7); g.fillStyle="#6EC3EA"; g.fill(); g.lineWidth=3; g.strokeStyle="#2E6E95"; g.stroke();
  g.fillStyle="rgba(255,255,255,.4)"; g.beginPath(); g.ellipse(x-rx*.3,y-ry*.3,rx*.35,ry*.18,0,0,7); g.fill();
  for(const [dx,dy] of [[-.6,.2],[.5,-.1],[.1,.45]]){ g.fillStyle="#4E9A3F"; g.beginPath(); g.ellipse(x+dx*rx,y+dy*ry,13,8,0,0,7); g.fill(); g.lineWidth=1.5; g.strokeStyle="#24502A"; g.stroke(); }
  for(let i=0;i<11;i++){ const a=i/11*Math.PI*2; g.fillStyle="#9AA0A6"; g.beginPath(); g.ellipse(x+Math.cos(a)*(rx+10),y+Math.sin(a)*(ry+8),10,7,0,0,7); g.fill(); g.lineWidth=1.5; g.strokeStyle=INK; g.stroke(); }
}
function drawGazebo(g){
  const {x,y}=GAZEBO;
  g.fillStyle="rgba(0,0,0,.18)"; g.beginPath(); g.ellipse(x,y+14,58,14,0,0,7); g.fill();
  rr(g,x-50,y-10,100,24,6); g.fillStyle="#B0763F"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  for(const px of [x-42,x-14,x+14,x+42]){ g.fillStyle="#8A5A33"; g.fillRect(px-3,y-60,6,52); g.strokeRect(px-3,y-60,6,52); }
  g.beginPath(); g.moveTo(x-62,y-58); g.lineTo(x,y-110); g.lineTo(x+62,y-58); g.closePath(); g.fillStyle="#9C5A2E"; g.fill(); g.lineWidth=3; g.stroke();
  g.beginPath(); g.arc(x,y-112,5,0,7); g.fillStyle="#FFC414"; g.fill(); g.stroke();
}
function drawFlowerBed(g,d){
  const {x,y,rx,ry}=d;
  g.beginPath(); g.ellipse(x,y,rx+12,ry+10,0,0,7); g.fillStyle="#C9A06E"; g.fill(); g.lineWidth=3; g.strokeStyle="#8E6A44"; g.stroke();
  g.beginPath(); g.ellipse(x,y,rx,ry,0,0,7); g.fillStyle="#7A5233"; g.fill();
  for(let row=-2;row<=2;row++) for(let k=-4;k<=4;k++){ const px=x+k*rx*.2, py=y+row*ry*.33; if(Math.hypot((px-x)/rx,(py-y)/ry)>.85) continue;
    g.fillStyle="#5FAE47"; g.beginPath(); g.ellipse(px-4,py,5,3,-.6,0,7); g.fill(); g.beginPath(); g.ellipse(px+4,py,5,3,.6,0,7); g.fill(); }
}
function drawPlay(g,p){
  g.fillStyle="rgba(0,0,0,.15)"; g.beginPath(); g.ellipse(p.x,p.y+12,50,12,0,0,7); g.fill();
  if(p.k==="slide"){ g.fillStyle="#E5402F"; rr(g,p.x-40,p.y-60,24,70,3); g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    g.beginPath(); g.moveTo(p.x-16,p.y-52); g.lineTo(p.x+40,p.y+8); g.lineTo(p.x+28,p.y+12); g.lineTo(p.x-16,p.y-34); g.closePath(); g.fillStyle="#FFC414"; g.fill(); g.stroke();
    g.beginPath(); g.moveTo(p.x-46,p.y-62); g.lineTo(p.x-28,p.y-82); g.lineTo(p.x-10,p.y-62); g.closePath(); g.fillStyle="#2F6DB5"; g.fill(); g.stroke(); }
  else { g.strokeStyle=INK; g.lineWidth=4; g.beginPath(); g.moveTo(p.x-46,p.y+10); g.lineTo(p.x-34,p.y-60); g.lineTo(p.x+34,p.y-60); g.lineTo(p.x+46,p.y+10); g.stroke();
    g.lineWidth=2; for(const sx of [p.x-14,p.x+14]){ g.beginPath(); g.moveTo(sx,p.y-60); g.lineTo(sx,p.y-10); g.stroke(); rr(g,sx-9,p.y-12,18,6,2); g.fillStyle="#8A5A33"; g.fill(); g.stroke(); } }
}
/* ---------- the whole outdoor backdrop ---------- */
function drawTownStatic(g){
  grassArea(g,0,0,OW,OH,21);
  treeLine(g,0,OW,10,70,31);
  g.save(); g.globalAlpha=.25; g.fillStyle="#1F3A24"; g.beginPath(); g.ellipse(2140,3330,330,220,0,0,7); g.fill(); g.restore();
  for(const l of LOTS) drawLot(g,l);
  drawRiver(g);
  drawAvenue(g);
  drawRoads(g,PATHS,74);
  for(const b of BUILDINGS){ const L_=LOTS.find(l=>b.door>l.x&&b.door<l.x+l.w&&b.y0>l.y&&b.y0<l.y+l.h); brickPave(g,b.door-32,b.bot,64,Math.max(10,b.front-b.bot-46),71+b.zone); }
  
  for(const br of BRIDGES) drawBridge(g,br);
  drawPond(g,POND);
  for(const d of BEDS) drawFlowerBed(g,d);
  /* the fountain square */
  g.beginPath(); g.ellipse(FOUNTAIN.x,FOUNTAIN.y+10,190,110,0,0,7); g.fillStyle=brickPattern(g); g.fill(); g.lineWidth=4; g.strokeStyle="#A27A4E"; g.stroke();
  for(const [dx,dy,c] of [[-150,-50,"#F48FB1"],[150,-50,"#FFD84D"],[-150,80,"#FFFFFF"],[150,80,"#FF8A50"]]) flowerBush(g,FOUNTAIN.x+dx,FOUNTAIN.y+dy,16,c);
  for(const b of BUILDINGS) drawBuilding(g,b);
  drawOfficesStatic(g);
  for(const p of PLAY) drawPlay(g,p);
  drawGazebo(g);
  /* scattered flowers */
  const r=seeded(777);
  for(let i=0;i<160;i++){ const x=60+r()*(OW-120), y=120+r()*(OH-200);
    if(OUT_SOLIDS.some(s=>x>s.x-16&&x<s.x+s.w+16&&y>s.y-16&&y<s.y+s.h+16) || (y>AVE.y0-30&&y<AVE.y1+30) || riverDist(x,y)<RIVER_W) continue;
    if(LOTS.some(l=>x>l.x-10&&x<l.x+l.w+10&&y>l.y-10&&y<l.y+l.h+10&&!l.park)) continue;
    const c=["#F48FB1","#FFD84D","#FFFFFF","#FF8A50"][i%4];
    if(r()<.6){ g.fillStyle=c; for(const [dx,dy] of [[-3,0],[3,0],[0,-3],[0,3]]){ g.beginPath(); g.arc(x+dx,y+dy,2.6,0,7); g.fill(); } g.fillStyle="#F2A900"; g.beginPath(); g.arc(x,y,1.8,0,7); g.fill(); }
    else bush(g,x,y,11);
  }
  drawBusStops(g);
}
function drawStreetStatic(g){ drawTownStatic(g); }
function drawTree(g,p){
  g.fillStyle="rgba(0,0,0,.18)"; g.beginPath(); g.ellipse(p.x,p.y+10,26,8,0,0,7); g.fill();
  g.fillStyle="#7A5233"; g.fillRect(p.x-6,p.y-30,12,40); g.lineWidth=2.5; g.strokeStyle=INK; g.strokeRect(p.x-6,p.y-30,12,40);
  const c=p.pink?"#F6B8CF":"#3F8E4E";
  for(const [dx,dy,r] of [[-18,-50,20],[16,-54,21],[0,-74,22],[-4,-46,18]]){ g.beginPath(); g.arc(p.x+dx,p.y+dy,r,0,7); g.fillStyle=c; g.fill(); g.stroke(); }
  if(p.pink){ g.fillStyle="#FFFFFF"; for(const [dx,dy] of [[-20,-56],[10,-70],[18,-48],[-6,-82],[-10,-40]]){ g.beginPath(); g.arc(p.x+dx,p.y+dy,2.6,0,7); g.fill(); } }
  g.fillStyle="rgba(255,255,255,.25)"; g.beginPath(); g.arc(p.x-6,p.y-80,7,0,7); g.fill();
}
function drawDoorBadges(g,now){
  g.font="800 13px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  for(const b of BUILDINGS){
    const left=ZONES[b.zone]?ZONES[b.zone].cases.filter(k=>!S.best[k]).length:0;
    let label;
    if(b.zone===7) label=L("🚓 ส่งเบาะแสที่นี่","🚓 Hand in clues here")+(left?` · ❗${left}`:"");
    else if(b.zone===5) label=left?L(`👻 ผีรอให้ช่วย ${left} ตน`,`👻 ${left} ghosts need help`):L("👻 ผีไปสู่สุคติหมดแล้ว","👻 All ghosts at peace");
    else label=left?L(`❗ รอให้ช่วย ${left} คน · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`,`❗ ${left} need help · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`):L(`✓ ช่วยครบแล้ว · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`,`✓ All helped · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`);
    const tw=g.measureText(label).width+22, by=b.bot+44+(RM?0:Math.sin(now/300+b.zone)*3);
    rr(g,b.door-tw/2,by-14,tw,28,14); g.fillStyle=b.ghost?"#C9B8F0":left?"#FFC414":"#D8F1E3"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.fillText(label,b.door,by+1);
  }
  if(!RM){ const b=BUILDINGS.find(x=>x.ghost); for(let i=0;i<3;i++){ const p=((now/2400)+i/3)%1; g.fillStyle=`rgba(230,220,255,${.6*(1-p)})`; g.beginPath(); g.arc(b.door-12+i*12,b.bot-10-p*150,4,0,7); g.fill(); } }
}
function streetMapSVG(){
  const gi=goalInfo(), gz=gi&&gi.z;
  const pz=S.zone===0?{x:player.x,y:player.y}:(doorOf(S.zone)||null);
  const lab=(x,y,t,fs,fill)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs||30}" font-weight="800" fill="${fill||"#1B1B1B"}" font-family="Noto Sans Thai, sans-serif">${esc(t)}</text>`;
  const rp=riverSamples().filter((_,i)=>i%3===0).map((p,i)=>`${i?"L":"M"}${p[0].toFixed(0)} ${p[1].toFixed(0)}`).join(" ");
  let s=`<svg class="smap" viewBox="0 0 ${OW} ${OH}" role="img" aria-label="${L("แผนที่เมือง","Town map")}">`;
  s+=`<rect width="${OW}" height="${OH}" fill="#A9D98A"/>`;
  for(const l of LOTS) s+=`<rect x="${l.x}" y="${l.y}" width="${l.w}" height="${l.h}" rx="26" fill="#C3E6A6"/>`;
  s+=`<path d="${rp}" stroke="#6EC3EA" stroke-width="${RIVER_W}" fill="none"/>`;
  s+=`<rect x="0" y="${AVE.y0}" width="${OW}" height="${AVE.y1-AVE.y0}" fill="#5A5E64"/>`;
  for(const P of PATHS) s+=`<path d="${P.map((p,i)=>`${i?"L":"M"}${p[0]} ${p[1]}`).join(" ")}" stroke="#5A5E64" stroke-width="60" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  for(const b of BUILDINGS){ const goal=b.zone===gz;
    s+=`<g class="mb${goal?" tgt":""}" data-zone="${b.zone}"><rect x="${b.x}" y="${b.y0-30}" width="${b.w}" height="220" rx="10" fill="${b.wall}" stroke="#1B1B1B" stroke-width="6"/><rect x="${b.x}" y="${b.y0-30}" width="${b.w}" height="56" rx="10" fill="${b.roof}" stroke="#1B1B1B" stroke-width="6"/>`;
    s+=lab(b.x+b.w/2,b.y0+110,b.name[S.lang],40,b.ghost?"#FFFFFF":"#1B1B1B")+(goal?lab(b.x+b.w/2,b.y0+170,"🎯",48):"")+`</g>`; }
  for(const [i,o] of OFFICES.entries()){ const hq=S.hqFound&&i===hqB(), goal=gz===8;
    s+=`<g class="mb${goal?" tgt":""}"><rect x="${o.x}" y="${OFF_TOP}" width="${o.w}" height="${OFF_H}" rx="10" fill="${o.wall}" stroke="#1B1B1B" stroke-width="6"/>`+lab(o.x+o.w/2,OFF_TOP+150,o.name[S.lang]+(hq?" ⚠️":""),34)+`</g>`; }
  s+=`<g>${lab(REPAIR.x,REPAIR.y-10,"🔧",56)}${lab(KIOSK.x,KIOSK.y,"🕹️",56)}</g>`;
  if(pz) s+=`<g class="me"><circle cx="${pz.x}" cy="${pz.y}" r="34" fill="#2F6DB5" stroke="#FFF" stroke-width="10"/>${lab(pz.x,pz.y+80,L("คุณ","You"),46,"#2F6DB5")}</g>`;
  return s+`</svg>`;
}
FILL_SPOTS.street=(()=>{ const out=[]; const r=seeded(99);
  for(const P of PATHS.slice(0,4)) for(let i=1;i<P.length;i++){ const [x,y]=P[i]; if(riverDist(x,y)<160) continue; out.push({x:x+(r()<.5?-50:50),y:y+(r()<.5?-44:44),d:["down","left","right","up"][Math.floor(r()*4)]}); }
  return out; })();
