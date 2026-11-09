/* Drawing the town: grass, a winding river with bridges, brick paths between the buildings,
   one straight main road, a park with a fountain and a pond, and trees (some pink, like cherry blossom). */

let BRICK_PAT=null;
function brickPattern(g){
  if(BRICK_PAT) return BRICK_PAT;
  const c=document.createElement("canvas"); c.width=48; c.height=24; const b=c.getContext("2d");
  b.fillStyle="#C9A06E"; b.fillRect(0,0,48,24);
  const cols=["#E2C296","#D8B585","#DDB98A","#E6C9A0"];
  for(let row=0;row<2;row++) for(let k=-1;k<3;k++){ const x=k*24+(row?12:0); b.fillStyle=cols[(row*3+k+4)%4]; b.fillRect(x+1,row*12+1,22,10); }
  BRICK_PAT=g.createPattern(c,"repeat"); return BRICK_PAT;
}
/* a smooth curve through a list of points */
function smoothPath(g,P){
  g.beginPath(); g.moveTo(P[0][0],P[0][1]);
  for(let i=1;i<P.length-1;i++){ const mx=(P[i][0]+P[i+1][0])/2, my=(P[i][1]+P[i+1][1])/2; g.quadraticCurveTo(P[i][0],P[i][1],mx,my); }
  g.lineTo(P[P.length-1][0],P[P.length-1][1]);
}
function drawBrickPath(g,P,w){
  g.save(); g.lineCap="round"; g.lineJoin="round";
  smoothPath(g,P); g.strokeStyle="#8E6A44"; g.lineWidth=w+8; g.stroke();
  smoothPath(g,P); g.strokeStyle=brickPattern(g); g.lineWidth=w; g.stroke();
  g.restore();
}
function riverPts(){ const pts=[]; for(let y=-20;y<=OH+20;y+=24) pts.push([riverX(Math.max(0,Math.min(OH,y))),y]); return pts; }
function drawRiver(g){
  const P=riverPts();
  g.save(); g.lineCap="butt"; g.lineJoin="round";
  smoothPath(g,P); g.strokeStyle="#B9A57C"; g.lineWidth=RIVER_W+22; g.stroke();
  smoothPath(g,P); g.strokeStyle="#2E6E95"; g.lineWidth=RIVER_W+4; g.stroke();
  smoothPath(g,P); g.strokeStyle="#6EC3EA"; g.lineWidth=RIVER_W-4; g.stroke();
  smoothPath(g,P); g.strokeStyle="rgba(255,255,255,.35)"; g.lineWidth=RIVER_W-48; g.setLineDash([28,46]); g.stroke(); g.setLineDash([]);
  g.restore();
}
function drawBridge(g,y0,y1,road){
  const cx=riverX((y0+y1)/2), x0=cx-RIVER_W/2-26, x1=cx+RIVER_W/2+26;
  g.fillStyle="rgba(0,0,0,.2)"; g.fillRect(x0+4,y0+8,x1-x0,y1-y0);
  if(road){ g.fillStyle="#5A5E64"; g.fillRect(x0,y0,x1-x0,y1-y0); }
  else { g.fillStyle="#B0763F"; g.fillRect(x0,y0,x1-x0,y1-y0); g.strokeStyle="rgba(60,30,10,.35)"; g.lineWidth=2; for(let x=x0+10;x<x1;x+=12){ g.beginPath(); g.moveTo(x,y0); g.lineTo(x,y1); g.stroke(); } }
  for(const ry of [y0,y1]){ rr(g,x0-6,ry-7,x1-x0+12,12,5); g.fillStyle=road?"#C9CED4":"#8A5A33"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    for(const px of [x0,x1]){ rr(g,px-9,ry-12,18,22,4); g.fill(); g.stroke(); } }
}
function drawAvenue(g){
  const {y0,y1}=AVE;
  g.fillStyle="#B9B2A6"; g.fillRect(0,y0-12,OW,12); g.fillRect(0,y1,OW,12);
  g.fillStyle="#5A5E64"; g.fillRect(0,y0,OW,y1-y0);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,y0-12); g.lineTo(OW,y0-12); g.moveTo(0,y0); g.lineTo(OW,y0); g.moveTo(0,y1); g.lineTo(OW,y1); g.moveTo(0,y1+12); g.lineTo(OW,y1+12); g.stroke();
  g.strokeStyle="#FFD84D"; g.lineWidth=5; g.setLineDash([40,30]); g.beginPath(); g.moveTo(0,(y0+y1)/2); g.lineTo(OW,(y0+y1)/2); g.stroke(); g.setLineDash([]);
  /* zebra crossings where the paths meet the road */
  g.fillStyle="#F2F2F2";
  for(const x of [466,1105,1852,2716,410,1840,2700]){ if(Math.abs(x-riverX((y0+y1)/2))<140) continue; for(let yy=y0+8;yy<y1-8;yy+=20) g.fillRect(x-34,yy,68,11); }
}
function drawFlowerBed(g,d){
  const {x,y,rx,ry}=d;
  g.beginPath(); g.ellipse(x,y,rx+10,ry+8,0,0,7); g.fillStyle="#C9A06E"; g.fill(); g.lineWidth=3; g.strokeStyle="#8E6A44"; g.stroke();
  g.beginPath(); g.ellipse(x,y,rx,ry,0,0,7); g.fillStyle="#6B4A2E"; g.fill();
  const r=seeded(Math.round(x+y)), cols=["#F48FB1","#FFD84D","#FFFFFF","#FF8A50","#C9B8F0"];
  for(let i=0;i<70;i++){ const a=r()*Math.PI*2, k=Math.sqrt(r())*.92, px=x+Math.cos(a)*rx*k, py=y+Math.sin(a)*ry*k;
    g.fillStyle="#4E9A3F"; g.beginPath(); g.arc(px,py+2,4,0,7); g.fill(); g.fillStyle=cols[Math.floor(k*5)%5]; g.beginPath(); g.arc(px,py,3.2,0,7); g.fill(); }
}
function drawPond(g,P){
  const {x,y,rx,ry}=P;
  g.beginPath(); g.ellipse(x,y,rx+12,ry+10,0,0,7); g.fillStyle="#B9A57C"; g.fill();
  g.beginPath(); g.ellipse(x,y,rx,ry,0,0,7); g.fillStyle="#6EC3EA"; g.fill(); g.lineWidth=3; g.strokeStyle="#2E6E95"; g.stroke();
  g.fillStyle="rgba(255,255,255,.4)"; g.beginPath(); g.ellipse(x-rx*.3,y-ry*.3,rx*.35,ry*.18,0,0,7); g.fill();
  for(const [dx,dy] of [[-.6,.2],[.5,-.1],[.1,.45]]){ g.fillStyle="#4E9A3F"; g.beginPath(); g.ellipse(x+dx*rx,y+dy*ry,13,8,0,0,7); g.fill(); g.lineWidth=1.5; g.strokeStyle="#24502A"; g.stroke(); }
  for(let i=0;i<9;i++){ const a=i/9*Math.PI*2; g.fillStyle="#9AA0A6"; g.beginPath(); g.ellipse(x+Math.cos(a)*(rx+10),y+Math.sin(a)*(ry+8),10,7,0,0,7); g.fill(); g.lineWidth=1.5; g.strokeStyle=INK; g.stroke(); }
}
function drawGhostDecor(g,b){
  g.save(); g.globalAlpha=.55; g.fillStyle="#1A1424"; g.fillRect(b.x,b.y0,b.w,190); g.restore();
  g.strokeStyle="#8C7A5A"; g.lineWidth=7;
  for(const wx of [b.x+22, b.x+b.w-112]){ g.beginPath(); g.moveTo(wx+4,b.y0+96); g.lineTo(wx+86,b.y0+146); g.moveTo(wx+86,b.y0+96); g.lineTo(wx+4,b.y0+146); g.stroke(); }
  g.strokeStyle="rgba(255,255,255,.5)"; g.lineWidth=1.2;
  for(const [cx,cy] of [[b.x+6,b.y0+6],[b.x+b.w-6,b.y0+6]]){ for(let r=8;r<34;r+=8){ g.beginPath(); g.arc(cx,cy,r,0,Math.PI*2); g.stroke(); } }
}
/* the whole outdoor backdrop */
function drawTownStatic(g){
  grassArea(g,0,0,OW,OH,21);
  treeLine(g,0,OW,10,70,31);
  /* dark woods round the old house */
  g.save(); g.globalAlpha=.25; g.fillStyle="#1F3A24"; g.beginPath(); g.ellipse(270,1990,330,240,0,0,7); g.fill(); g.restore();
  drawRiver(g);
  drawAvenue(g);
  for(const P of PATHS) drawBrickPath(g,P,56);
  /* short brick aprons from each door to its path */
  const rowPath={[ROW_A]:PATHS[0],[ROW_B]:PATHS[1],[ROW_C]:PATHS[2]};
  for(const b of BUILDINGS){ const to=b.ghost?2075:rowPath[b.y0]?pathYAt(rowPath[b.y0],b.door):0; if(to) brickPave(g,b.door-32,b.bot,64,to-b.bot,71+b.zone); }
  for(const o of OFFICES) brickPave(g,o.door-40,AVE.y1+12,80,OFF_TOP-AVE.y1-12,81);
  for(const [a,b] of BRIDGES) drawBridge(g,a,b,a===AVE.y0);
  drawPond(g,POND); drawPond(g,POND2);
  for(const d of BEDS) drawFlowerBed(g,d);
  /* flower beds round the fountain */
  for(const [dx,dy,c] of [[-110,-40,"#F48FB1"],[110,-40,"#FFD84D"],[-120,60,"#FFFFFF"],[120,60,"#FF8A50"]]) flowerBush(g,FOUNTAIN.x+dx,FOUNTAIN.y+dy,16,c);
  for(const b of BUILDINGS){
    drawShopFront(g,b,b.y0);
    if(b.ghost) drawGhostDecor(g,b);
    else { for(const wx of [b.x+22, b.x+b.w-112]) flowerBox(g,wx-2,b.y0+154,94,["#F48FB1","#FFD84D","#FFFFFF","#FF8A50"][b.zone%4]); pottedPlant(g,b.door-48,b.bot+2); pottedPlant(g,b.door+48,b.bot+2); }
  }
  drawOfficesStatic(g);
  /* scattered bushes and flowers */
  const r=seeded(777);
  for(let i=0;i<70;i++){ const x=60+r()*(OW-120), y=120+r()*(OH-200);
    if(BUILDINGS.some(b=>x>b.x-30&&x<b.x+b.w+30&&y>b.y0-60&&y<b.bot+40) || (y>AVE.y0-40&&y<AVE.y1+40) || Math.abs(x-riverX(y))<RIVER_W || (y>OFF_TOP-20&&y<OFF_TOP+OFF_H+20&&x<1260)) continue;
    if(OUT_SOLIDS.some(s=>x>s.x-20&&x<s.x+s.w+20&&y>s.y-20&&y<s.y+s.h+20)) continue;
    if(PATHS.some(P=>P.some((p,k)=>k&&(()=>{ const [ax,ay]=P[k-1], dx=p[0]-ax, dy=p[1]-ay, t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy))); return Math.hypot(x-ax-dx*t,y-ay-dy*t)<46; })()))) continue;
    if(r()<.5) flowerBush(g,x,y,13,["#F48FB1","#FFD84D","#FFFFFF","#FF8A50"][i%4]); else bush(g,x,y,12);
  }
  drawBusStops(g);
}
function drawStreetStatic(g){ drawTownStatic(g); }

/* trees: green or pink blossom */
function drawTree(g,p){
  g.fillStyle="rgba(0,0,0,.18)"; g.beginPath(); g.ellipse(p.x,p.y+10,26,8,0,0,7); g.fill();
  g.fillStyle="#7A5233"; g.fillRect(p.x-6,p.y-30,12,40); g.lineWidth=2.5; g.strokeStyle=INK; g.strokeRect(p.x-6,p.y-30,12,40);
  const c=p.pink?"#F6B8CF":"#3F8E4E";
  for(const [dx,dy,r] of [[-18,-50,20],[16,-54,21],[0,-74,22],[-4,-46,18]]){ g.beginPath(); g.arc(p.x+dx,p.y+dy,r,0,7); g.fillStyle=c; g.fill(); g.stroke(); }
  if(p.pink){ g.fillStyle="#FFFFFF"; for(const [dx,dy] of [[-20,-56],[10,-70],[18,-48],[-6,-82],[-10,-40]]){ g.beginPath(); g.arc(p.x+dx,p.y+dy,2.6,0,7); g.fill(); } }
  g.fillStyle="rgba(255,255,255,.25)"; g.beginPath(); g.arc(p.x-6,p.y-80,7,0,7); g.fill();
}

/* the badge over each door: zone, score, or what's waiting inside */
function drawDoorBadges(g,now){
  g.font="800 13px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  for(const b of BUILDINGS){
    const left=ZONES[b.zone]?ZONES[b.zone].cases.filter(k=>!S.best[k]).length:0;
    let label;
    if(b.zone===7) label=L("🚓 ส่งเบาะแสที่นี่","🚓 Hand in clues here")+(left?` · ❗${left}`:"");
    else if(b.zone===5) label=left?L(`👻 ผีรอให้ช่วย ${left} ตน`,`👻 ${left} ghosts need help`):L("👻 ผีไปสู่สุคติหมดแล้ว","👻 All ghosts at peace");
    else label=left?L(`❗ รอให้ช่วย ${left} คน · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`,`❗ ${left} need help · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`):L(`✓ ช่วยครบแล้ว · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`,`✓ All helped · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`);
    const tw=g.measureText(label).width+22, by=b.bot+64+(RM?0:Math.sin(now/300+b.zone)*3);
    rr(g,b.door-tw/2,by-14,tw,28,14); g.fillStyle=b.ghost?"#C9B8F0":left?"#FFC414":"#D8F1E3"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.fillText(label,b.door,by+1);
  }
  if(!RM){ const b=BUILDINGS.find(x=>x.ghost); for(let i=0;i<3;i++){ const p=((now/2400)+i/3)%1; g.fillStyle=`rgba(230,220,255,${.6*(1-p)})`; g.beginPath(); g.arc(b.door-12+i*12,b.bot-10-p*150,4,0,7); g.fill(); } }
}

/* the small map in the mission list */
function streetMapSVG(){
  const gi=goalInfo(), gz=gi&&gi.z;
  const pz=S.zone===0?{x:player.x,y:player.y}:(doorOf(S.zone)||null);
  const lab=(x,y,t,fs,fill)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs||30}" font-weight="800" fill="${fill||"#1B1B1B"}" font-family="Noto Sans Thai, sans-serif">${esc(t)}</text>`;
  const rp=riverPts().map((p,i)=>`${i?"L":"M"}${p[0].toFixed(0)} ${p[1]}`).join(" ");
  let s=`<svg class="smap" viewBox="0 0 ${OW} ${OH}" role="img" aria-label="${L("แผนที่เมือง","Town map")}">`;
  s+=`<rect width="${OW}" height="${OH}" fill="#A9D98A"/>`;
  s+=`<path d="${rp}" stroke="#6EC3EA" stroke-width="${RIVER_W}" fill="none"/>`;
  s+=`<rect x="0" y="${AVE.y0}" width="${OW}" height="${AVE.y1-AVE.y0}" fill="#5A5E64"/>`;
  for(const P of PATHS) s+=`<path d="${P.map((p,i)=>`${i?"L":"M"}${p[0]} ${p[1]}`).join(" ")}" stroke="#DDB98A" stroke-width="50" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  for(const b of BUILDINGS){ const goal=b.zone===gz;
    s+=`<g class="mb${goal?" tgt":""}" data-zone="${b.zone}"><rect x="${b.x}" y="${b.y0}" width="${b.w}" height="190" rx="10" fill="${b.wall}" stroke="#1B1B1B" stroke-width="6"/><rect x="${b.x}" y="${b.y0}" width="${b.w}" height="46" rx="10" fill="${b.roof}" stroke="#1B1B1B" stroke-width="6"/>`;
    s+=lab(b.x+b.w/2,b.y0+120,b.name[S.lang],40,b.zone===4||b.ghost?"#FFFFFF":"#1B1B1B")+(goal?lab(b.x+b.w/2,b.y0+175,"🎯",48):"")+`</g>`; }
  for(const [i,o] of OFFICES.entries()){ const hq=S.hqFound&&i===hqB(), goal=gz===8;
    s+=`<g class="mb${goal?" tgt":""}"><rect x="${o.x}" y="${OFF_TOP}" width="${o.w}" height="${OFF_H}" rx="10" fill="${o.wall}" stroke="#1B1B1B" stroke-width="6"/>`+lab(o.x+o.w/2,OFF_TOP+150,o.name[S.lang]+(hq?" ⚠️":""),34)+`</g>`; }
  s+=`<g>${lab(REPAIR.x,REPAIR.y-10,"🔧",56)}${lab(KIOSK.x,KIOSK.y,"🕹️",56)}</g>`;
  if(pz) s+=`<g class="me"><circle cx="${pz.x}" cy="${pz.y}" r="34" fill="#2F6DB5" stroke="#FFF" stroke-width="10"/>${lab(pz.x,pz.y+80,L("คุณ","You"),46,"#2F6DB5")}</g>`;
  return s+`</svg>`;
}

/* street people sit along the paths */
FILL_SPOTS.street=(()=>{ const out=[]; const r=seeded(99);
  for(const P of PATHS.slice(0,3)) for(let i=1;i<P.length;i++){ const [x,y]=P[i]; if(Math.abs(x-riverX(y))<150) continue; out.push({x:x+(r()<.5?-50:50),y:y+(r()<.5?-46:46),d:["down","left","right","up"][Math.floor(r()*4)]}); }
  return out; })();
