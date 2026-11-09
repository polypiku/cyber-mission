/* Day and night, rain, and floods.
   One in-game day takes DAY_LEN real seconds. Rain comes now and then; heavy rain floods the street,
   which slows you down until the water drains away. */
const DAY_LEN=420;                 /* seconds for a whole day */
const WX={t:(S.wxT!=null?S.wxT:0.33), rain:0, rainOn:false, heavy:false, rainLeft:0, nextRain:70+Math.random()*60,
  flood:0, floodWarned:false, drops:[], flash:0, saveT:0};

/* 0 at midday … 1 at deepest night */
function nightAmt(){
  const t=WX.t, ss=(a,b,x)=>{ const k=Math.max(0,Math.min(1,(x-a)/(b-a))); return k*k*(3-2*k); };
  if(t<.5) return 1-ss(.2,.3,t);      /* dawn */
  return ss(.72,.84,t);                /* dusk */
}
function clockText(){ const m=Math.floor(WX.t*24*60), h=Math.floor(m/60), mm=m%60; return String(h).padStart(2,"0")+":"+String(mm).padStart(2,"0"); }
const outdoors=()=>S.zone===0;
const floodSlow=()=>outdoors()?1-.5*Math.min(1,WX.flood/.8):1;

function stepWeather(dt){
  WX.t=(WX.t+dt/DAY_LEN)%1;
  WX.saveT+=dt; if(WX.saveT>5){ WX.saveT=0; S.wxT=WX.t; }
  if(!WX.rainOn){
    WX.nextRain-=dt;
    if(WX.nextRain<=0 && !busy()){
      WX.rainOn=true; WX.heavy=Math.random()<.6; WX.rainLeft=45+Math.random()*35;
      toast(WX.heavy?L("⛈️ พายุฝนมาแล้ว! ถ้าตกนานถนนอาจน้ำท่วม","⛈️ A storm's coming! The street may flood"):L("🌧️ ฝนเริ่มตกแล้ว","🌧️ It's starting to rain"));
    }
  } else {
    WX.rainLeft-=dt;
    if(WX.heavy) WX.flood=Math.min(1,WX.flood+dt/28);
    if(WX.heavy && Math.random()<dt*.06) WX.flash=1;
    if(WX.rainLeft<=0){ WX.rainOn=false; WX.nextRain=100+Math.random()*120; toast(L("🌤️ ฝนหยุดแล้ว","🌤️ The rain has stopped")); }
  }
  if(!WX.rainOn) WX.flood=Math.max(0,WX.flood-dt/32);
  WX.rain+=((WX.rainOn?(WX.heavy?1:.55):0)-WX.rain)*Math.min(1,dt*.8);
  WX.flash=Math.max(0,WX.flash-dt*3);
  if(WX.flood>.35 && !WX.floodWarned){ WX.floodWarned=true; sfx("bad");
    toast(L("🌊 น้ำท่วมถนนแล้ว เดินช้าลง! ช่วงนี้ระวังเพจรับบริจาคช่วยน้ำท่วมปลอมด้วยนะ","🌊 The street is flooding, you'll walk slower! Watch out for fake flood-donation pages")); }
  if(WX.flood<.05 && WX.floodWarned && !WX.rainOn){ WX.floodWarned=false; toast(L("☀️ น้ำลดแล้ว เดินได้ปกติ","☀️ The water's gone down. Walk as normal")); }
  /* rain streaks in screen space */
  const want=Math.round(WX.rain*(outdoors()?220:0));
  while(WX.drops.length<want) WX.drops.push({x:Math.random()*VW,y:Math.random()*VH,v:700+Math.random()*400,l:10+Math.random()*14});
  if(WX.drops.length>want) WX.drops.length=want;
  for(const d of WX.drops){ d.y+=d.v*dt; d.x-=d.v*.18*dt; if(d.y>VH){ d.y=-20; d.x=Math.random()*(VW+80); } }
  const c=$("wxChip"); if(c){ const n=nightAmt(), ic=WX.flood>.35?"🌊":WX.rainOn?(WX.heavy?"⛈️":"🌧️"):n>.5?"🌙":n>.1?"🌇":"☀️";
    const txt=`${ic} ${clockText()}${WX.flood>.35?" · "+L("น้ำท่วม","Flood"):WX.rainOn?" · "+L("ฝนตก","Rain"):""}`; if(c.textContent!==txt) c.textContent=txt; c.hidden=!S.char; }
}

/* the flood water on the street, under the people */
function drawFloodUnder(g,now){
  if(!outdoors() || WX.flood<.02) return;
  const a=Math.min(1,WX.flood), top=600-170*a;
  g.save(); g.globalAlpha=.25+.35*a;
  g.beginPath(); g.moveTo(0,OH);
  for(let x=0;x<=OW;x+=40) g.lineTo(x,top+Math.sin(x/90+now/600)*6);
  g.lineTo(OW,OH); g.closePath();
  const gr=g.createLinearGradient(0,top,0,OH); gr.addColorStop(0,"#7FB6D6"); gr.addColorStop(1,"#4C86A8"); g.fillStyle=gr; g.fill();
  g.globalAlpha=.5*a; g.strokeStyle="#E8F6FF"; g.lineWidth=2;
  for(let i=0;i<26;i++){ const x=(i*157+now*.02)%OW, y=top+40+((i*97)%(OH-top-60)), r=(now/40+i*13)%26; g.beginPath(); g.ellipse(x,y,r+6,(r+6)*.35,0,0,7); g.stroke(); }
  g.restore();
}
/* water round everyone's legs */
function drawFloodOver(g,now){
  if(!outdoors() || WX.flood<.15) return;
  const a=Math.min(1,WX.flood), top=600-170*a;
  const wade=(c)=>{ if(c.hide||c.y<top) return; const h=10+22*a; g.fillStyle="rgba(110,170,205,.55)"; g.beginPath(); g.ellipse(c.x,c.y-h/2+2,22,h/2+4,0,0,7); g.fill();
    g.strokeStyle="rgba(235,248,255,.8)"; g.lineWidth=2; g.beginPath(); g.ellipse(c.x,c.y-h+4,20+Math.sin(now/200+c.x)*2,5,0,0,7); g.stroke(); };
  npcs.forEach(wade); wade(player);
}
/* night, rain and lightning over everything */
const DARK=document.createElement("canvas");
function drawWeather(ctx,now){
  const n=nightAmt(), dim=outdoors()?n*.62:n*.28, over=WX.rain*.18;
  ctx.save(); ctx.setTransform(DPR,0,0,DPR,0,0);
  if(dim>.01 || over>.01){
    if(DARK.width!==Math.round(VW) || DARK.height!==Math.round(VH)){ DARK.width=Math.round(VW); DARK.height=Math.round(VH); }
    const d=DARK.getContext("2d"); d.globalCompositeOperation="source-over"; d.clearRect(0,0,VW,VH);
    d.fillStyle=`rgba(18,24,60,${dim})`; d.fillRect(0,0,VW,VH);
    if(over>.01){ d.fillStyle=`rgba(70,80,95,${over})`; d.fillRect(0,0,VW,VH); }
    if(dim>.05){
      d.globalCompositeOperation="destination-out";
      const glow=(x,y,r,k)=>{ const sx=(x-camX)*Z, sy=(y-camY)*Z, R=r*Z; const gr=d.createRadialGradient(sx,sy,0,sx,sy,R); gr.addColorStop(0,`rgba(0,0,0,${k})`); gr.addColorStop(1,"rgba(0,0,0,0)"); d.fillStyle=gr; d.fillRect(sx-R,sy-R,R*2,R*2); };
      glow(player.x,player.y-40,170,.75);
      if(outdoors()){ OUT_LAMPS.forEach(l=>glow(l.x,l.y-82,190,.9)); BUILDINGS.forEach(b=>{ if(!b.alley){ glow(b.x+67,170,90,.6); glow(b.x+b.w-67,170,90,.6); } }); }
      else glow(W/2,H/2,520,.6);
    }
    ctx.drawImage(DARK,0,0,VW,VH);
    if(dim>.2 && outdoors()){ /* warm lamp halos */
      ctx.globalCompositeOperation="lighter";
      for(const l of OUT_LAMPS){ const sx=(l.x-camX)*Z, sy=(l.y-82-camY)*Z, R=60*Z, gr=ctx.createRadialGradient(sx,sy,0,sx,sy,R); gr.addColorStop(0,`rgba(255,200,90,${.35*dim})`); gr.addColorStop(1,"rgba(255,200,90,0)"); ctx.fillStyle=gr; ctx.fillRect(sx-R,sy-R,R*2,R*2); }
      ctx.globalCompositeOperation="source-over";
    }
  }
  if(WX.drops.length && !RM){
    ctx.strokeStyle="rgba(210,230,255,.55)"; ctx.lineWidth=1.4; ctx.beginPath();
    for(const d of WX.drops){ ctx.moveTo(d.x,d.y); ctx.lineTo(d.x+d.l*.18,d.y-d.l); }
    ctx.stroke();
  }
  if(WX.flash>0 && outdoors()){ ctx.fillStyle=`rgba(255,255,255,${WX.flash*.55})`; ctx.fillRect(0,0,VW,VH); }
  ctx.restore();
}
(function(){ const c=document.createElement("div"); c.id="wxChip"; c.className="wxchip"; c.hidden=true; c.setAttribute("aria-live","off"); document.body.appendChild(c); })();
