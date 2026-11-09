/* Lush street scenery: a tree line behind the shops, textured grass, brick pavements, dirt plaza
   with grass islands and flower beds, and tiled Thai-style roofs. Drawn once into the static layer. */

function seeded(seed){ let a=seed>>>0; return ()=>{ a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
const GREEN=["#4E9A3F","#5FAE47","#3F8636","#6DBB4E"];

/* grass with little tufts and flowers */
function grassArea(g,x,y,w,h,seed){
  g.fillStyle="#8CC665"; g.fillRect(x,y,w,h);
  const r=seeded(seed||7), n=Math.floor(w*h/900);
  for(let i=0;i<n;i++){ const px=x+r()*w, py=y+r()*h;
    g.strokeStyle=r()<.5?"#6FAE4C":"#7EBB57"; g.lineWidth=1.6;
    g.beginPath(); g.moveTo(px-3,py); g.lineTo(px-1,py-5); g.moveTo(px,py); g.lineTo(px+1,py-6); g.moveTo(px+3,py); g.lineTo(px+4,py-4); g.stroke(); }
  for(let i=0;i<n/5;i++){ const px=x+r()*w, py=y+r()*h, c=["#FFFFFF","#FFD84D","#F48FB1","#FFB0A0"][Math.floor(r()*4)];
    g.fillStyle=c; for(const [dx,dy] of [[-2,0],[2,0],[0,-2],[0,2]]){ g.beginPath(); g.arc(px+dx,py+dy,1.7,0,7); g.fill(); }
    g.fillStyle="#F2A900"; g.beginPath(); g.arc(px,py,1.2,0,7); g.fill(); }
}
/* a dense line of tree canopies, back to front */
function treeLine(g,x0,x1,yTop,yBase,seed){
  const r=seeded(seed||11);
  for(let row=0;row<3;row++){
    for(let x=x0-20;x<x1+20;x+=26+r()*18){
      const rad=22+r()*16, y=yTop+row*16+r()*10, c=GREEN[Math.floor(r()*GREEN.length)];
      g.beginPath(); g.arc(x,y,rad,0,7); g.fillStyle=c; g.fill(); g.lineWidth=2.5; g.strokeStyle="#24502A"; g.stroke();
      g.fillStyle="rgba(255,255,255,.14)"; g.beginPath(); g.arc(x-rad*.35,y-rad*.4,rad*.35,0,7); g.fill();
      if(r()<.25){ g.fillStyle=["#F48FB1","#FFD84D","#FF8A50"][Math.floor(r()*3)]; for(let k=0;k<4;k++){ g.beginPath(); g.arc(x+(r()-.5)*rad,y+(r()-.5)*rad,2.6,0,7); g.fill(); } }
    }
  }
  g.fillStyle="rgba(20,50,25,.25)"; g.fillRect(x0,yBase-6,x1-x0,6);
}
/* warm brick pavers */
function brickPave(g,x,y,w,h,seed){
  g.fillStyle="#DDB98A"; g.fillRect(x,y,w,h);
  const r=seeded(seed||3);
  for(let yy=y,row=0;yy<y+h;yy+=16,row++) for(let xx=x-(row%2?16:0);xx<x+w;xx+=32){
    const v=r(); g.fillStyle=v<.33?"#D3AD7C":v<.66?"#E2C296":"#D8B585";
    g.fillRect(Math.max(x,xx)+1,yy+1,Math.min(31,x+w-Math.max(x,xx))-1,15); }
  g.strokeStyle="rgba(120,80,40,.25)"; g.lineWidth=1; g.strokeRect(x+.5,y+.5,w-1,h-1);
}
/* packed-earth plaza with pebbles */
function dirtArea(g,x,y,w,h,seed){
  g.fillStyle="#CFA572"; g.fillRect(x,y,w,h);
  const r=seeded(seed||5), n=Math.floor(w*h/500);
  for(let i=0;i<n;i++){ g.fillStyle=r()<.5?"rgba(120,80,40,.18)":"rgba(255,240,210,.25)"; g.beginPath(); g.ellipse(x+r()*w,y+r()*h,1.5+r()*2.5,1+r()*1.5,0,0,7); g.fill(); }
}
/* a soft-edged grass island */
function grassIsland(g,cx,cy,rx,ry,seed){
  const r=seeded(seed);
  g.save(); g.beginPath();
  for(let i=0;i<14;i++){ const a=i/14*Math.PI*2, k=.85+r()*.25; g.ellipse(cx+Math.cos(a)*rx*.55,cy+Math.sin(a)*ry*.55,rx*.5*k,ry*.5*k,0,0,7); }
  g.fillStyle="#7DB85A"; g.fill(); g.clip();
  grassArea(g,cx-rx,cy-ry,rx*2,ry*2,seed+1);
  g.restore();
}
function bush(g,x,y,rad,c){
  g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(x,y+rad*.6,rad*1.2,rad*.35,0,0,7); g.fill();
  for(const [dx,dy,k] of [[-rad*.6,0,.75],[rad*.6,0,.75],[0,-rad*.35,.9]]){ g.beginPath(); g.arc(x+dx,y+dy,rad*k,0,7); g.fillStyle=c||"#4E9A3F"; g.fill(); g.lineWidth=2; g.strokeStyle="#24502A"; g.stroke(); }
  g.fillStyle="rgba(255,255,255,.18)"; g.beginPath(); g.arc(x-rad*.3,y-rad*.55,rad*.28,0,7); g.fill();
}
function flowerBush(g,x,y,rad,flower){
  bush(g,x,y,rad,"#3F8636");
  const r=seeded(Math.round(x*7+y));
  g.fillStyle=flower; for(let i=0;i<9;i++){ g.beginPath(); g.arc(x+(r()-.5)*rad*1.8,y-rad*.3+(r()-.5)*rad,2.8,0,7); g.fill(); }
}
function pottedPlant(g,x,y){
  rr(g,x-9,y-14,18,16,3); g.fillStyle="#B8643A"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
  bush(g,x,y-20,9,"#5FAE47");
}
function flowerBox(g,x,y,w,c){
  rr(g,x,y,w,10,2); g.fillStyle="#8A5A33"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
  for(let xx=x+5;xx<x+w-3;xx+=8){ g.fillStyle="#4E9A3F"; g.beginPath(); g.arc(xx,y-1,4,0,7); g.fill(); g.fillStyle=c; g.beginPath(); g.arc(xx,y-4,2.4,0,7); g.fill(); }
}
/* tiled gable roof over a shop */
function thaiRoof(g,b,y0){
  const x=b.x-18, w=b.w+36, top=y0-50, base=y0+4, inset=34;
  g.fillStyle="rgba(0,0,0,.18)"; g.beginPath(); g.moveTo(x+6,base+6); g.lineTo(x+w+6,base+6); g.lineTo(x+w-inset+6,top+6); g.lineTo(x+inset+6,top+6); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(x,base); g.lineTo(x+w,base); g.lineTo(x+w-inset,top); g.lineTo(x+inset,top); g.closePath();
  g.fillStyle=b.roof; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.save(); g.clip();
  g.strokeStyle="rgba(0,0,0,.22)"; g.lineWidth=1.5;
  for(let yy=top+9;yy<base;yy+=9){ g.beginPath(); g.moveTo(x,yy); g.lineTo(x+w,yy); g.stroke(); }
  for(let yy=top,row=0;yy<base;yy+=9,row++) for(let xx=x+(row%2?7:0);xx<x+w;xx+=14){ g.beginPath(); g.moveTo(xx,yy); g.lineTo(xx,yy+9); g.stroke(); }
  g.fillStyle="rgba(255,255,255,.12)"; g.fillRect(x,top,w,10);
  g.restore();
  /* ridge with curled finials (chofa-like) */
  g.lineWidth=5; g.strokeStyle=INK; g.beginPath(); g.moveTo(x+inset-4,top); g.lineTo(x+w-inset+4,top); g.stroke();
  g.lineWidth=3; g.strokeStyle="#F2C14E"; g.beginPath(); g.moveTo(x+inset-4,top); g.lineTo(x+w-inset+4,top); g.stroke();
  for(const [fx,s] of [[x+inset-4,-1],[x+w-inset+4,1]]){ g.beginPath(); g.moveTo(fx,top); g.quadraticCurveTo(fx+s*8,top-4,fx+s*6,top-14); g.lineWidth=4; g.strokeStyle=INK; g.stroke(); g.lineWidth=2; g.strokeStyle="#F2C14E"; g.stroke(); }
}
/* string of party lights between two points */
function stringLights(g,x1,y1,x2,y2,sag){
  g.strokeStyle="#3A2516"; g.lineWidth=1.5; g.beginPath(); g.moveTo(x1,y1); g.quadraticCurveTo((x1+x2)/2,(y1+y2)/2+sag,x2,y2); g.stroke();
  const cols=["#FFD84D","#FF8A50","#7FD3F7","#F48FB1"];
  for(let i=1;i<12;i++){ const t=i/12, mx=(x1+x2)/2, my=(y1+y2)/2+sag, px=(1-t)*(1-t)*x1+2*(1-t)*t*mx+t*t*x2, py=(1-t)*(1-t)*y1+2*(1-t)*t*my+t*t*y2;
    g.fillStyle=cols[i%4]; g.beginPath(); g.arc(px,py+3,3,0,7); g.fill(); g.lineWidth=1; g.strokeStyle=INK; g.stroke(); }
}

/* the whole street backdrop, replacing the old flat grass and grey paving */
function drawStreetGround(g){
  grassArea(g,0,0,OW,OH,21);
  treeLine(g,0,OW,10,70,31);
  /* grass everywhere; brick for the walkways: in front of the shops, along the road,
     from every door down to the road, and a small square round the fountain */
  brickPave(g,28,250,OW-56,70,41);
  brickPave(g,28,536,OW-56,64,42);
  for(const b of BUILDINGS){ if(b.alley && !(b.soi&&!b.road)) continue; brickPave(g,b.door-34,300,68,240,71+b.zone); }
  brickPave(g,600,380,240,140,61);
  brickPave(g,226,440,150,60,62); brickPave(g,1066,440,150,60,63); brickPave(g,1486,440,150,60,64);
}
/* flowers, bushes and lights drawn over the shop fronts */
function drawStreetDecor(g){
  const fb=["#F48FB1","#FFD84D","#FFFFFF","#FF8A50"];
  for(const b of BUILDINGS){ if(b.alley) continue;
    for(const wx of [b.x+22, b.x+b.w-112]) flowerBox(g,wx-2,214,94,fb[(b.zone+wx)%4]);
    pottedPlant(g,b.door-48,262); pottedPlant(g,b.door+48,262);
  }
  for(const [x,y,c] of [[580,370,"#F48FB1"],[860,370,"#FFD84D"],[220,400,"#FFFFFF"],[1660,420,"#FF8A50"],[30,340,"#F48FB1"],[OW-30,340,"#FFD84D"]]) flowerBush(g,x,y,16,c);
  for(const [x,y] of [[580,500],[860,500],[1300,450],[1700,470],[180,520],[420,420]]) bush(g,x,y,12);
  /* south pavement hedges */
  for(let x=60;x<OW-40;x+=150){ if(OFFICES.some(o=>Math.abs(o.door-x)<90) || (x>IC.x0-60&&x<IC.x1+60)) continue; bush(g,x,846,13,"#4E9A3F"); }
}
