/* The shop lane (zone 14): a brick path that runs up from the main street, with the food court,
   mini mart, phone shop and market on alternate sides and the student dorm at the top. */
const SOI_W=RW, SOI_H=1500, LANE={x0:340,x1:524};
const SOI_POS={9:{x:40,top:1080}, 11:{x:534,top:840}, 12:{x:40,top:600}, 10:{x:534,top:360}, 13:{x:282,top:90}};
const SOI_SHOPS=SOI_BLDG.map(b=>{ const p=SOI_POS[b.zone], w=b.zone===13?300:290; return {...b, x:p.x, w, door:p.x+w/2, top:p.top, bot:p.top+190}; });
const SOI_OF={}; SOI_SHOPS.forEach(b=>SOI_OF[b.zone]=b);
const SOI_TREES=[{x:80,y:1420},{x:790,y:1420},{x:790,y:1250},{x:80,y:860},{x:790,y:640},{x:80,y:420},{x:150,y:250},{x:720,y:250}];
const SOI_LAMPS=[{x:332,y:1300},{x:532,y:1060},{x:332,y:820},{x:532,y:580},{x:332,y:340}];
const SOI_BENCHES=[{x:690,y:1330},{x:180,y:980}];
const SOI_SOLIDS=[{x:0,y:0,w:SOI_W,h:70},{x:0,y:0,w:28,h:SOI_H},{x:SOI_W-28,y:0,w:28,h:SOI_H},
  {x:0,y:SOI_H-16,w:LANE.x0,h:16},{x:LANE.x1,y:SOI_H-16,w:SOI_W-LANE.x1,h:16},
  ...SOI_SHOPS.map(b=>({x:b.x-14,y:b.top-40,w:b.w+28,h:230})),
  ...SOI_TREES.map(p=>({x:p.x-22,y:p.y-14,w:44,h:28})),
  ...SOI_LAMPS.map(l=>({x:l.x-6,y:l.y-6,w:12,h:12})),
  ...SOI_BENCHES.map(b=>({x:b.x-40,y:b.y-12,w:80,h:22}))];
FILL_SPOTS.soi=[{x:440,y:1380,d:"up"},{x:400,y:1150,d:"right"},{x:470,y:900,d:"left"},{x:420,y:700,d:"down"},{x:460,y:480,d:"down"},{x:640,y:1130,d:"left"},{x:220,y:1340,d:"right"},{x:650,y:300,d:"down"}];
FILL_SPOTS.street=FILL_SPOTS.street.filter(p=>p.x<OW-60);

function drawSoiStatic(g){
  grassArea(g,0,0,SOI_W,SOI_H,121);
  treeLine(g,0,SOI_W,10,70,131);
  brickPave(g,LANE.x0,280,LANE.x1-LANE.x0,SOI_H-280,141);
  let s=150;
  for(const b of SOI_SHOPS){
    brickPave(g,b.door-34,b.bot,68,b.zone===13?20:60,s++);
    if(b.zone!==13){ const x0=Math.min(b.door-34,LANE.x0), x1=Math.max(b.door+34,LANE.x1); brickPave(g,x0,b.bot+20,x1-x0,46,s++); }
  }
  /* gate back to the street */
  brickPave(g,LANE.x0-30,SOI_H-60,LANE.x1-LANE.x0+60,60,199);
  for(const b of SOI_SHOPS){
    drawShopFront(g,b,b.top);
    for(const wx of [b.x+22, b.x+b.w-112]) flowerBox(g,wx-2,b.top+154,94,["#F48FB1","#FFD84D","#FFFFFF","#FF8A50"][b.zone%4]);
    pottedPlant(g,b.door-48,b.bot+2); pottedPlant(g,b.door+48,b.bot+2);
  }
  for(const [x,y,c] of [[300,1230,"#F48FB1"],[566,980,"#FFD84D"],[300,750,"#FFFFFF"],[566,520,"#FF8A50"],[300,520,"#F48FB1"],[566,1400,"#FFD84D"]]) flowerBush(g,x,y,14,c);
  for(const [x,y] of [[60,1020],[810,880],[60,560],[810,1060],[250,1460],[620,1460]]) bush(g,x,y,12);
  /* the arch over the lane entrance */
  const ax=LANE.x0-24, aw=LANE.x1-LANE.x0+48, ay=SOI_H-120;
  g.fillStyle="#7A4A2A"; g.fillRect(ax,ay,10,110); g.fillRect(ax+aw-10,ay,10,110);
  rr(g,ax-10,ay-8,aw+20,34,6); g.fillStyle="#C2552E"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#FFE08A"; g.font="800 16px 'Noto Sans Thai', sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  g.fillText(L("ซอยร้านค้า · ทางออกถนนใหญ่ ↓","Shop lane · main street ↓"),ax+aw/2,ay+9);
}
function soiItems(items,now){
  SOI_TREES.forEach(p=>items.push({y:p.y+10,d:g=>drawTree(g,p)}));
  SOI_LAMPS.forEach(l=>items.push({y:l.y+4,d:g=>drawLamp(g,l,now)}));
  SOI_BENCHES.forEach(b=>items.push({y:b.y+8,d:g=>drawBench(g,b)}));
}
/* pills over each door: name, and how many people still need help */
function drawSoiBadges(g,now){
  g.font="800 13px 'Noto Sans Thai', sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  for(const b of SOI_SHOPS){
    const left=ZONES[b.zone].cases.filter(k=>!S.best[k]).length;
    const label=left?L(`❗ รอให้ช่วย ${left} คน`,`❗ ${left} need help`):L("✓ ช่วยครบแล้ว","✓ All helped");
    const tw=g.measureText(label).width+22, by=b.bot+86+(RM?0:Math.sin(now/300+b.door)*3);
    rr(g,b.door-tw/2,by-13,tw,26,13); g.fillStyle=left?"#FFC414":"#D8F1E3"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.fillText(label,b.door,by+1);
  }
}
const soiDoorHit=()=>SOI_SHOPS.find(b=>Math.abs(player.x-b.door)<30 && player.y<b.bot+18 && player.y>b.bot-12);
const soiExit=()=>player.y>SOI_H-30 && player.x>LANE.x0 && player.x<LANE.x1;

function goSoi(fromZone){
  urgent=null; rush=null; escort=null; wifiT=0;
  S.zone=14; save(); setWorld(); buildCast(); drawStatic();
  const b=SOI_OF[fromZone];
  if(b){ player.x=b.door; player.y=b.bot+34; player.dir="down"; } else { player.x=432; player.y=SOI_H-70; player.dir="up"; }
  target=null; targetNpc=null; keys.clear(); closeSheet(); hudKey=""; hud(); toast(ZONES[14].name[S.lang]);
  if(!fromZone && !S.seen[14] && typeof playEntryScene==="function") setTimeout(()=>playEntryScene(14),400);
}
/* rooms in the lane open back onto the lane; the lane opens onto the street */
const _goOutside=goOutside;
goOutside=function(fromZone){ if(SOI_OF[fromZone]) return goSoi(fromZone); _goOutside(fromZone); };
const _goZone=goZone;
goZone=function(z){
  if(z===14) return goSoi(null);
  const first=!S.seen[z] && ENTRY_TIP[z] && !(z===1&&!S.intro) && !(z===6&&!S.briefed) && !(z===9&&!S.overheard);
  if(!first) return _goZone(z);
  entryPending=true; S.seen[z]=true; _goZone(z); S.seen[z]=false; save();
  setTimeout(()=>{ entryPending=false; playEntryScene(z); },450);
};
let entryPending=false;
const _zoneEvent=zoneEvent;
zoneEvent=function(){ if(entryPending||CIN) return; _zoneEvent(); };
const _doorOf=doorOf;
doorOf=function(z){ if(S.zone===14){ const b=SOI_OF[z]; return b?{x:b.door,y:b.bot}:{x:432,y:SOI_H}; } return _doorOf(SOI_OF[z]?14:z); };
const _drawGoalArrow=drawGoalArrow;
drawGoalArrow=function(g,now){
  if(S.zone!==14) return _drawGoalArrow(g,now);
  if(!S.char || busy() || CIN) return;
  const gi=goalInfo(); if(!gi || gi.z==null) return; const d=doorOf(gi.z); if(!d) return;
  const dx=d.x-player.x, dy=d.y-player.y; if(Math.hypot(dx,dy)<90) return;
  const a=Math.atan2(dy,dx), r=58+(RM?0:Math.sin(now/220)*5), cx=player.x+Math.cos(a)*r, cy=player.y-34+Math.sin(a)*r;
  g.save(); g.translate(cx,cy); g.rotate(a); g.beginPath(); g.moveTo(16,0); g.lineTo(-8,-12); g.lineTo(-3,0); g.lineTo(-8,12); g.closePath();
  g.fillStyle="#FFC414"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); g.restore();
};

/* ---------- a short scene the first time you walk into each place, with a small hint ---------- */
const ENTRY_TIP={
  1:["ร้านกาแฟคนเยอะ ใครแอบปล่อย Wi-Fi ปลอม จะมีคลื่นลอยออกมาจากตัว คอยสังเกตนะ","Busy café. Anyone running a fake Wi-Fi gives off waves. Keep an eye out."],
  2:["ห้องสมุดมีสองชั้น อย่าลืมขึ้นบันไดมุมขวาบนไปดูชั้น 2 ด้วย","The library has two floors. Don't forget the stairs at the top right."],
  3:["ถ้ามีใครโทรมาอ้างเป็นธนาคาร ให้วางสายแล้วโทรกลับเบอร์หลังบัตรเสมอ","If anyone calls claiming to be the bank, hang up and call the number on the card."],
  4:["ร้านเน็ตมีเด็กเยอะ เกมกับการเติมเงินคือเหยื่อล่อที่แก๊งชอบใช้","Lots of kids here. Games and top-ups are the gang's favourite bait."],
  5:["ผีที่นี่โดนหลอกจนไปไหนไม่ได้… ช่วยพวกเขาแล้วจะได้เบาะแสด้วย","These ghosts were scammed and can't move on… helping them gives clues too."],
  6:["ที่มหาลัย ระวังอีเมลกับไลน์ที่อ้างเป็นอาจารย์หรือฝ่าย IT","At uni, watch for emails and LINE messages pretending to be lecturers or IT."],
  7:["เอาเบาะแสมาส่งพี่ภพที่นี่ ยิ่งส่งเยอะ ฉากจบยิ่งดี","Bring clues to Phop here. The more you hand in, the better the ending."],
  10:["ตลาดนัดรับโอนผ่าน QR เกือบทุกร้าน ดูชื่อบัญชีก่อนจ่ายทุกครั้ง","Almost every stall takes QR. Check the account name every time."],
  11:["มีคนยืนคุยโทรศัพท์หน้าตู้ ATM นานผิดปกติ… น่าเป็นห่วงนะ","Someone's been on the phone at the ATM for ages… worrying."],
  12:["คนที่มาร้านวันนี้ มีทั้งเครื่องโดนควบคุม เบอร์หาย และวิดีโอคอลปลอม","Today: a hijacked phone, a stolen number and a fake video call."],
  13:["เด็กปีหนึ่งมักโดนชวนทำงานออนไลน์ ระวังงานที่ต้องจ่ายเงินก่อน","First-years get offered online jobs. Beware any job you pay for first."],
  14:["ซอยนี้มีร้านเรียงกันห้าร้าน ป้ายเหลืองหน้าร้านบอกว่ามีคนรอให้ช่วยกี่คน","Five shops line this lane. The yellow badges show how many people need help."]
};
function playEntryScene(z){
  if(CIN || S.zone!==z) return;
  const tip=ENTRY_TIP[z]; if(!tip) return;
  const sp=npcs.find(n=>n.role==="mentor")||npcs.find(n=>n.role==="police");
  const A=sp?{m:mk(sp.id)}:{};
  const target=npcs.find(n=>!n.filler && n!==sp && caseOf(n) && !S.best[caseOf(n)]);
  const px=player.x, py=player.y, fx=px, fy=Math.max(140,py-(z===14?120:80));
  const st=[];
  st.push({fn:()=>{ if(sp){ npcs=npcs.filter(n=>n!==sp); cinPlace(A.m,sp.x,sp.y,sp.dir); } player.dir="up"; }});
  st.push({mv:[[player,fx,fy,115]],face:[[player,"up"]]});
  st.push({say:["me",`(${ZONES[z].name.th}…)`,`(${ZONES[z].name.en}…)`],t:1.6,em:[[player,"👀",1.6]]});
  if(sp){
    const mx=Math.min(W-80,fx+70), my=fy-6;
    st.push({mv:[[A.m,mx,my,160]],face:[[A.m,"left"],[player,"right"]]});
    const intro=ZONE_INTRO[z]&&ZONE_INTRO[z][0];
    if(intro) st.push({say:[sp.id,intro.t.th,intro.t.en],t:2.8});
    st.push({say:[sp.id,"💡 "+tip[0],"💡 "+tip[1]],t:3.4,sfx:"ping"});
  } else st.push({say:["me","💡 "+tip[0],"💡 "+tip[1]],t:3.4,sfx:"ping"});
  if(target) st.push({fn:()=>{ target.on=true; }},{say:[sp?sp.id:"me",`คนที่มี ❗ ตรงนั้น (${nm(target.id)}) ดูกังวลอยู่ ลองเข้าไปคุยก่อนเลย`,`${nm(target.id)}, over there with the ❗, looks worried. Start there.`],t:2.8,em:[[target,"❗",2.8]]});
  startCinema(st, ()=>{ S.seen[z]=true; save(); player.x=fx; player.y=fy; player.dir="up"; hudKey=""; hud(); setTimeout(()=>_zoneEvent(),300); }, {actors:Object.values(A)});
}
