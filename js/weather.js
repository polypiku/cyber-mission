/* Day and night, and rain.
   One in-game day takes DAY_LEN real seconds. Rain comes now and then. When it rains everyone
   outside opens an umbrella; you only get one by helping the person whose case gives it to you. */
const DAY_LEN=420;                 /* seconds for a whole day */
const WX={t:(S.wxT!=null?S.wxT:0.33), rain:0, rainOn:false, heavy:false, rainLeft:0, nextRain:70+Math.random()*60,
  drops:[], flash:0, saveT:0};

/* 0 at midday … 1 at deepest night */
function nightAmt(){
  const t=WX.t, ss=(a,b,x)=>{ const k=Math.max(0,Math.min(1,(x-a)/(b-a))); return k*k*(3-2*k); };
  if(t<.5) return 1-ss(.2,.3,t);      /* dawn */
  return ss(.72,.84,t);                /* dusk */
}
function clockText(){ const m=Math.floor(WX.t*24*60), h=Math.floor(m/60), mm=m%60; return String(h).padStart(2,"0")+":"+String(mm).padStart(2,"0"); }
const outdoors=()=>S.zone===0;
const floodSlow=()=>1;

function stepWeather(dt){
  WX.t=(WX.t+dt/DAY_LEN)%1;
  WX.saveT+=dt; if(WX.saveT>5){ WX.saveT=0; S.wxT=WX.t; }
  if(!WX.rainOn){
    WX.nextRain-=dt;
    if(WX.nextRain<=0 && !busy()){
      WX.rainOn=true; WX.heavy=Math.random()<.6; WX.rainLeft=45+Math.random()*35;
      toast(WX.heavy?L("⛈️ พายุฝนมาแล้ว!","⛈️ A storm's coming!"):L("🌧️ ฝนเริ่มตกแล้ว","🌧️ It's starting to rain"));
      setTimeout(umbrellaQuest,2600);
    }
  } else {
    WX.rainLeft-=dt;
    if(WX.heavy && Math.random()<dt*.06) WX.flash=1;
    if(WX.rainLeft<=0){ WX.rainOn=false; WX.nextRain=100+Math.random()*120; toast(L("🌤️ ฝนหยุดแล้ว","🌤️ The rain has stopped")); }
  }
  WX.rain+=((WX.rainOn?(WX.heavy?1:.55):0)-WX.rain)*Math.min(1,dt*.8);
  WX.flash=Math.max(0,WX.flash-dt*3);
  if(S.umbCase && !hasUmbrella() && S.best[S.umbCase]) giveUmbrella();
  /* rain streaks in screen space */
  const want=Math.round(WX.rain*(outdoors()?220:0));
  while(WX.drops.length<want) WX.drops.push({x:Math.random()*VW,y:Math.random()*VH,v:700+Math.random()*400,l:10+Math.random()*14});
  if(WX.drops.length>want) WX.drops.length=want;
  for(const d of WX.drops){ d.y+=d.v*dt; d.x-=d.v*.18*dt; if(d.y>VH){ d.y=-20; d.x=Math.random()*(VW+80); } }
  const c=$("wxChip"); if(c){ const n=nightAmt(), ic=WX.rainOn?(WX.heavy?"⛈️":"🌧️"):n>.5?"🌙":n>.1?"🌇":"☀️";
    const txt=`${ic} ${clockText()}${WX.rainOn?" · "+L("ฝนตก","Rain")+(hasUmbrella()?" ☂️":""):""}`; if(c.textContent!==txt) c.textContent=txt; c.hidden=!S.char; }
}

/* ---------- umbrellas ---------- */
const hasUmbrella=()=>!!(S.items&&S.items.umbrella);
const caseZone=(k)=>+Object.keys(ZONES).find(z=>ZONES[z].cases.includes(k));
/* when it starts raining and you have no umbrella, pick someone at random: help them and they give you theirs */
function umbrellaQuest(){
  if(hasUmbrella()) return;
  if(!S.umbCase || !UMB_CASES[S.umbCase] || S.best[S.umbCase]){
    const rr_=recoverRole(), pool=Object.keys(UMB_CASES).filter(k=>!S.best[k] && UMB_CASES[k]!==rr_);
    if(!pool.length){ giveUmbrella(); return; }
    S.umbCase=pool[Math.floor(Math.random()*pool.length)]; save();
  }
  const k=S.umbCase, who=nm(UMB_CASES[k]);
  toast(L(`☔ ไม่มีร่ม เปียกหมดเลย! ${who}ที่ถนนหน้าร้านกำลังมีปัญหา ไปช่วยแล้วจะได้ร่ม (มองหา 🌂)`,
          `☔ No umbrella, you're soaked! ${who} on the street needs help. Help them and you'll get an umbrella (look for 🌂)`));
}
/* what the umbrella owners say before and after */
const UMB_SCRIPT={
  u_parcel:{intro:[t("ฝนตกแบบนี้ พัสดุของใช้ลูกพี่ก็ยังไม่มาเลย","With all this rain, the baby things still haven't arrived."),t("เพิ่งมี SMS มาบอกให้จ่ายค่าส่งเพิ่ม ช่วยดูหน่อยได้ไหม","A text just asked me to pay extra. Can you take a look?")],
    after:{safe:t("ของมาถึงแล้ว ขอบใจนะ! เอาร่มพี่ไปเลย พี่มีอีกคัน","It arrived, thank you! Take my umbrella, I have another."),warn:t("เกือบไปแล้ว ขอบใจนะ เอาร่มนี่ไปใช้เถอะ","That was close. Thanks, take this umbrella."),danger:t("บัตรพี่โดนรูดไปแล้ว… แต่ขอบใจที่อยู่ด้วยนะ เอาร่มไปเถอะ","My card got charged… but thanks for staying. Take the umbrella.")}},
  u_alert:{intro:[t("หลานเอ๊ย กรมอุตุฯ แอดไลน์มา บอกพายุเข้า","Kid, the Met Department added me on LINE. A storm's coming."),t("ให้ลงแอปรับเงินชดเชย ตาลงเลยดีไหม","They want me to install an app for compensation. Should I?")],
    after:{safe:t("ดีนะที่หลานเตือน เอาร่มตาไปกันฝนเถอะ","Good thing you warned me. Take my umbrella."),warn:t("ตาจะระวังกว่านี้ เอาร่มไปใช้นะหลาน","I'll be more careful. Here, take the umbrella."),danger:t("เงินบำนาญตา… เฮ้อ เอาร่มไปเถอะหลาน อย่าเปียกเลย","My pension… sigh. Take the umbrella, don't get wet.")}},
  u_shop:{intro:[t("ร่มยายพังเพราะลมแรง","The wind broke my umbrella."),t("ไลฟ์นี้ขายร่มกับเสื้อกันฝนแค่ 59 บาท ยายจะโอนเลย","This live sale has an umbrella and raincoat for 59 baht. I'll pay now.")],
    after:{safe:t("ยายได้ร่มใหม่จากร้านจริงแล้ว คันเก่าที่ซ่อมได้ยายให้หลาน","I got a new one at a real shop. You have my old one, it's fixed."),warn:t("ยายจะดูรีวิวก่อนทุกครั้ง เอาร่มคันนี้ไปนะ","I'll check reviews from now on. Take this umbrella."),danger:t("ยายโดนบล็อกแล้ว… เอาร่มเก่ายายไปใช้ก่อนนะ","I got blocked… take my old umbrella for now.")}}
};
function giveUmbrella(){
  S.items=S.items||{}; S.items.umbrella=true; S.umbCase=null; save(); sfx("good"); hudKey="";
  toast(L("🌂 ได้ร่มแล้ว! “ขอบคุณที่ช่วยนะ เอาร่มคันนี้ไปใช้เถอะ”","🌂 You got an umbrella! “Thanks for helping. Take this one.”"));
}
const UMB_COL=["#E5402F","#2F6DB5","#FFC414","#2E9A6E","#E77FA0","#7A5AA6","#FF8A50"];
/* drawn right after each character: an open umbrella in the rain, a 🌂 over the person who'll give you one,
   and raindrops on you while you have none */
function drawUmbrellaFor(g,c,h,now){
  if(c.ghost || c.hide || S.zone!==0) return;
  const raining=WX.rain>.25;
  if(c!==player && !hasUmbrella() && S.umbCase && caseOf(c)===S.umbCase){
    const by=c.y-h-30+(RM?0:Math.sin(now/260)*3);
    g.beginPath(); g.arc(c.x+26,by,15,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    g.font="18px sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText("🌂",c.x+26,by+1);
  }
  if(!raining) return;
  if(c===player && !hasUmbrella()){
    if(RM) return;
    g.fillStyle="rgba(120,180,230,.85)";
    for(let i=0;i<6;i++){ const p=((now/500)+i/6)%1, x=c.x-18+((i*13)%36), y=c.y-h-6+p*(h*.7); g.beginPath(); g.ellipse(x,y,1.6,4,0,0,7); g.fill(); }
    return;
  }
  let hsh=0; for(const ch of String(c.id)) hsh=(hsh*31+ch.charCodeAt(0))>>>0;
  const col=UMB_COL[hsh%UMB_COL.length], side=(c.dir==="left"?-1:1)*10, top=c.y-h-14, R=Math.max(30,h*.36);
  g.strokeStyle="#3A2516"; g.lineWidth=2.5; g.beginPath(); g.moveTo(c.x+side,c.y-h*.45); g.lineTo(c.x+side*.4,top); g.stroke();
  g.beginPath(); g.moveTo(c.x-R,top+4); g.quadraticCurveTo(c.x,top-R*1.05,c.x+R,top+4);
  for(let i=4;i>0;i--){ const x0=c.x-R+(i)*R*2/4, x1=c.x-R+(i-1)*R*2/4; g.quadraticCurveTo((x0+x1)/2,top-4,x1,top+4); }
  g.closePath(); g.fillStyle=col; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle="rgba(255,255,255,.3)"; g.beginPath(); g.ellipse(c.x-R*.35,top-R*.45,R*.25,R*.12,-.4,0,7); g.fill();
  g.beginPath(); g.arc(c.x,top-R*.62,3,0,7); g.fillStyle=INK; g.fill();
}
function drawFloodUnder(){}
function drawFloodOver(){}
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
