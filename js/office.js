/* The three office buildings across the road, inside and out. */
/* ---------- the three office buildings across the road: one of them hides the Shadow gang ---------- */
const OFFICES=[
  {x:50,  w:400, door:250,  name:{th:"อาคารเจริญกิจ",en:"Charoenkij Building"}, wall:"#E7DFCF", glass:"#9FC6DB", trim:"#3E5C76", roof:"#9C9488", floor:["#E9E6DF","#DEDAD1"], style:0, tenants:[{th:"บจก. เจริญกิจ การบัญชี",en:"Charoenkij Accounting"},{th:"บจก. สยามดีไซน์ สตูดิโอ",en:"Siam Design Studio"}]},
  {x:470, w:400, door:670,  name:{th:"สยามบิซ เซ็นเตอร์",en:"SiamBiz Center"},     wall:"#D5DBE1", glass:"#7FB0C9", trim:"#2E3B33", roof:"#8C949C", floor:["#E3E8EC","#D7DDE3"], style:1, tenants:[{th:"บจก. ไทยโลจิสติกส์",en:"Thai Logistics"},{th:"บจก. บิซคลาวด์ ไอที",en:"BizCloud IT"}]},
  {x:1300,w:460, door:1530, name:{th:"รุ่งเรือง ทาวเวอร์",en:"Rungrueang Tower"},   wall:"#E9D6C1", glass:"#A9C9B8", trim:"#8E4A2B", roof:"#A78F7A", floor:["#EFE6DA","#E4D9CB"], style:2, tenants:[{th:"บจก. รุ่งเรือง ประกันภัย",en:"Rungrueang Insurance"},{th:"บจก. กรีนฟู้ด เทรดดิ้ง",en:"Green Food Trading"}]}
];
const SCAM_TENANT={th:"บจก. โกลบอล ดิจิทัล มาร์เก็ตติ้ง",en:"Global Digital Marketing Co."};
const OFF_TOP=858, OFF_FH=118, OFF_LIFT={x0:690,x1:790};
const OFNT="'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif";
function hqB(){ if(!(S.hqB>=0&&S.hqB<3)){ S.hqB=Math.floor(Math.random()*3); save(); } return S.hqB; }
const isScam=(i)=>i===hqB();
const raided=()=>(S.bustTier||0)>=1;
const offB=()=>OFFICES[S.bld||0]||OFFICES[0];
const offFloor=()=>Math.min(3,Math.max(1,S.floor||1));
const tenantOf=(i,f)=>f===1?{th:"ล็อบบี้",en:"Lobby"}:isScam(i)?SCAM_TENANT:OFFICES[i].tenants[f-2];
function offFloorName(f){
  if(isScam(S.bld) && raided()) return f===1?L("ล็อบบี้","Lobby"):f===2?L("ห้องคอลเซ็นเตอร์","Call-centre room"):L("ห้องพักพนักงาน","Staff dorm");
  return tenantOf(S.bld,f)[S.lang];
}
const OFF_BODY={workMan:"crowd07",workMom:"crowd02",studentBoy:"crowd09",studentGirl:"crowd10"}, TRAP_BODY={workMan:"crowd19",workMom:"crowd24",studentBoy:"crowd21",studentGirl:"crowd22"};
for(const b of ["workMan","workMom","studentBoy","studentGirl"]){
  SPRITES["o_s_"+b]=SPRITES[OFF_BODY[b]]; PEOPLE["o_s_"+b]={name:{th:"พนักงานออฟฟิศ",en:"Office worker"}, role:{th:"ทำงานในตึกนี้",en:"Works in this building"}};
  SPRITES["o_t_"+b]=SPRITES[TRAP_BODY[b]]; PEOPLE["o_t_"+b]={name:{th:"คนที่ถูกขังไว้",en:"Trapped worker"}, role:{th:"ถูกหลอกมาทำงาน",en:"Lured here by a fake job"}};
}
SPRITES.o_recep=SPRITES.workMom; PEOPLE.o_recep={name:{th:"พนักงานต้อนรับ",en:"Receptionist"}, role:{th:"เคาน์เตอร์ล็อบบี้",en:"Lobby desk"}};
SPRITES.o_guard=SPRITES.workMan; PEOPLE.o_guard={name:{th:"รปภ. หน้าลิฟต์",en:"Lift guard"}, role:{th:"ไม่ให้ใครขึ้นชั้นบน",en:"Lets nobody upstairs"}};

/* ----- the street side: three normal-looking facades ----- */
function drawOfficesStatic(g){ OFFICES.forEach(b=>drawOfficeFacade(g,b)); }
function drawOfficeFacade(g,b){
  const {x,w,door,style}=b, top=OFF_TOP, h=OH-top-10, fh=OFF_FH;
  g.fillStyle="rgba(0,0,0,.22)"; g.fillRect(x+8,top+8,w,h);
  rr(g,x,top,w,h,4); g.fillStyle=b.roof; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle=b.wall; g.fillRect(x+3,top+3,w-6,fh);
  if(style===2){ g.fillStyle="rgba(142,74,43,.12)"; for(let yy=top+6;yy<top+fh;yy+=10) for(let xx=x+6+((yy/10)%2?10:0);xx<x+w-10;xx+=20) g.fillRect(xx,yy,16,6); }
  for(let f=1;f<3;f++){ g.fillStyle=b.trim; g.fillRect(x+3,top+3+f*fh/3-3,w-6,6); }
  for(let f=0;f<3;f++){ const wy=top+12+f*fh/3, wh=fh/3-22;
    if(style===0){ for(let wx=x+18; wx<x+w-50; wx+=54){ if(Math.abs(wx+20-door)<62) continue; rr(g,wx,wy,40,wh,2); g.fillStyle=b.glass; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.strokeStyle="rgba(255,255,255,.8)"; g.beginPath(); g.moveTo(wx+6,wy+wh-4); g.lineTo(wx+14,wy+4); g.stroke(); } }
    else if(style===1){ g.fillStyle=b.glass; g.fillRect(x+14,wy-3,w-28,wh+6); g.strokeStyle=INK; g.lineWidth=2; g.strokeRect(x+14,wy-3,w-28,wh+6); for(let wx=x+14; wx<x+w-14; wx+=30){ g.beginPath(); g.moveTo(wx,wy-3); g.lineTo(wx,wy+wh+3); g.stroke(); } }
    else { for(let wx=x+24; wx<x+w-50; wx+=70){ if(Math.abs(wx+18-door)<70) continue; g.beginPath(); g.moveTo(wx,wy+wh); g.lineTo(wx,wy+8); g.arc(wx+18,wy+8,18,Math.PI,0); g.lineTo(wx+36,wy+wh); g.closePath(); g.fillStyle=b.glass; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); } }
  }
  g.lineWidth=3; g.strokeStyle=INK; g.beginPath(); g.moveTo(x,top+fh+3); g.lineTo(x+w,top+fh+3); g.stroke();
  // glass entrance doors
  rr(g,door-40,top+3,80,fh-30,2); g.fillStyle=b.trim; g.fill(); g.lineWidth=3; g.stroke();
  rr(g,door-34,top+8,32,fh-42,2); g.fillStyle="#CFE6F1"; g.fill(); g.lineWidth=2; g.stroke();
  rr(g,door+2,top+8,32,fh-42,2); g.fillStyle="#CFE6F1"; g.fill(); g.stroke();
  g.fillStyle="#FFC414"; g.fillRect(door-6,top+40,3,14); g.fillRect(door+4,top+40,3,14);
  // rooftop sign with the building name
  rr(g,door-140,top+fh+14,280,40,5); g.fillStyle=b.trim; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#FFFFFF"; g.font=`800 18px ${OFNT}`; g.textAlign="center"; g.textBaseline="middle"; g.fillText(b.name[S.lang],door,top+fh+35);
  // rooftop details, different per building
  const ry=top+fh+70;
  if(style===0){ g.beginPath(); g.arc(x+70,ry,24,0,7); g.fillStyle="#C9CED4"; g.fill(); g.lineWidth=2.5; g.stroke(); g.beginPath(); g.arc(x+70,ry,14,0,7); g.stroke();
    for(let k=0;k<3;k++){ rr(g,x+w-170+k*48,ry-16,38,30,3); g.fillStyle="#DADFE3"; g.fill(); g.lineWidth=2; g.stroke(); g.beginPath(); g.arc(x+w-151+k*48,ry-1,9,0,7); g.stroke(); } }
  else if(style===1){ g.beginPath(); g.arc(x+w-90,ry-4,30,0,7); g.fillStyle="#6F7780"; g.fill(); g.lineWidth=2.5; g.stroke(); g.fillStyle="#FFC414"; g.font=`800 26px ${OFNT}`; g.fillText("H",x+w-90,ry-3);
    for(let k=0;k<4;k++){ rr(g,x+30+k*40,ry-14,30,26,3); g.fillStyle="#DADFE3"; g.fill(); g.lineWidth=2; g.stroke(); } }
  else { for(let k=0;k<5;k++){ rr(g,x+30+k*84,ry-14,64,28,6); g.fillStyle="#8A5A33"; g.fill(); g.lineWidth=2; g.stroke(); for(let j=0;j<3;j++){ g.beginPath(); g.arc(x+46+k*84+j*16,ry-14,9,0,7); g.fillStyle="#3F8E4E"; g.fill(); g.stroke(); } } }
}
function drawOfficesLive(g,now){
  OFFICES.forEach((b,i)=>{
    const {door}=b, top=OFF_TOP;
    g.fillStyle="#C9CED4"; g.strokeStyle=INK; g.lineWidth=2; rr(g,door+48,top+14,18,9,2); g.fill(); g.stroke();
    if(Math.floor(now/600+i)%2){ g.fillStyle="#E5402F"; g.beginPath(); g.arc(door+62,top+18,2.2,0,7); g.fill(); }
    if(isScam(i) && (raided()||(CIN&&CIN.cars))){
      g.save(); g.lineWidth=7; for(const [y1,y2] of [[top+10,top+80],[top+80,top+10]]){ g.strokeStyle="#F2C14E"; g.beginPath(); g.moveTo(door-42,y1); g.lineTo(door+42,y2); g.stroke(); g.setLineDash([6,6]); g.strokeStyle=INK; g.beginPath(); g.moveTo(door-42,y1); g.lineTo(door+42,y2); g.stroke(); g.setLineDash([]); } g.restore();
      for(const cx of [door-150,door+160]){ drawCar(g,{x:cx,y:820,v:1,c:"#F5F5F5"}); const k=Math.floor(now/250)%2; g.fillStyle=k?"#E5402F":"#2F6DB5"; rr(g,cx-12,788,10,6,2); g.fill(); g.fillStyle=k?"#2F6DB5":"#E5402F"; rr(g,cx+2,788,10,6,2); g.fill(); }
    }
  });
}
function nearOffice(){ if(S.zone!==0 || !S.char) return -1; return OFFICES.findIndex(b=>Math.abs(player.x-b.door)<44 && player.y>800); }
function nearHQ(){ return nearOffice()>=0; }
let hqT=0;
function tryHQ(){
  const i=nearOffice(); if(i<0) return;
  if(performance.now()-hqT<1500){ player.y=Math.min(player.y,836); return; } hqT=performance.now();
  enterOffice(i);
}
function enterOffice(i){
  urgent=null; rush=null; escort=null; wifiT=0;
  S.zone=8; S.bld=i; S.floor=1; save(); setWorld(); buildCast(); drawStatic();
  player.x=432; player.y=560; player.dir="up"; keys.clear(); target=null; targetNpc=null; endJoy&&endJoy();
  closeSheet(); hudKey=""; hud(); sfx("blip");
  toast(OFFICES[i].name[S.lang]+(isScam(i)&&raided()?L(" · ตำรวจปิดล้อมแล้ว"," · sealed by police"):""));
}

/* ----- inside: 3 floors each ----- */
const OFF_BASE=[{x:0,y:0,w:RW,h:108},{x:0,y:0,w:44,h:RH},{x:RW-44,y:0,w:44,h:RH},{x:0,y:580,w:384,h:44},{x:480,y:580,w:384,h:44},{x:384,y:612,w:96,h:12}];
const DORM_ROOMS=[0,1,2].map(i=>({top:true,x:44+i*596/3,w:596/3})).concat([0,1,2,3].map(i=>({top:false,x:44+i*194,w:194}))).map(r=>({...r,cx:r.x+r.w/2}));
function offRects(){
  const f=offFloor(), sc=isScam(S.bld);
  if(f===1) return [{k:"desk",x:300,y:150,w:260,h:52},{k:"sofaV",x:56,y:300,w:56,h:130},{k:"ctable",x:136,y:340,w:56,h:56},{k:"sofaH",x:600,y:440,w:150,h:48},{k:"plant",x:56,y:124,w:40,h:30},{k:"plant",x:56,y:540,w:40,h:30},{k:"plant",x:770,y:540,w:40,h:30}];
  if(!sc && f===2){ const r=[]; for(let j=0;j<2;j++) for(let c=0;c<3;c++) r.push({k:"desks",x:110+c*230,y:200+j*170,w:150,h:70}); r.push({k:"plant",x:56,y:540,w:40,h:30}); return r; }
  if(!sc && f===3) return [{k:"meet",x:56,y:124,w:300,h:180},{k:"rtable",x:470,y:250,w:120,h:70},{k:"pantry",x:500,y:512,w:300,h:50},{k:"plant",x:56,y:540,w:40,h:30}];
  if(sc && f===2){ const r=[]; for(let i=0;i<3;i++) r.push({k:"cc",x:70,y:180+i*130,w:560,h:44}); r.push({k:"boxes",x:690,y:430,w:110,h:70}); return r; }
  return [{k:"dormTop",x:44,y:108,w:596,h:142},{k:"dormBot",x:44,y:420,w:776,h:160}];
}
function offSolids(){ const s=[...OFF_BASE]; if(offFloor()>1) s.push({x:384,y:580,w:96,h:44}); return s.concat(offRects().map(({x,y,w,h})=>({x,y,w,h}))); }
function officeCast(){
  const f=offFloor(), sc=isScam(S.bld), out=[];
  if(f===1){ out.push({id:"o_recep",role:"o_recep",x:430,y:138,dir:"down"}); if(sc&&!raided()) out.push({id:"o_guard",role:"o_guard",x:806,y:150,dir:"left"}); }
  else if(!sc){ const sp=f===2?[[230,316],[460,486],[740,330]]:[[440,220],[640,330]], bodies=["o_s_workMan","o_s_workMom","o_s_studentBoy","o_s_studentGirl"];
    sp.forEach(([x,y],k)=>out.push({id:bodies[(k+S.bld+f)%4],role:"o_staff",x,y,dir:["down","left","right"][k%3],k:(S.bld*5+f*2+k)})); }
  else if(f===2 && !raided()){ const b=["cin_sc_workMan","cin_sc_workMom","cin_sc_studentBoy","cin_sc_studentGirl"]; let k=0;
    for(let i=0;i<3;i++) for(const x of [150,350,550]) if((i+x)%3!==1) out.push({id:b[(k++)%4],role:"o_scam",x,y:248+i*130,dir:"up",k}); }
  else if(f===2) out.push({id:"police",role:"o_cop",x:700,y:300,dir:"left"});
  else DORM_ROOMS.forEach((r,k)=>out.push({id:["o_t_workMan","o_t_workMom","o_t_studentGirl","o_t_studentBoy"][k%4],role:"o_trap",x:r.cx-24,y:r.top?205:500,dir:"down",k}));
  return out;
}
function inLift(){ return S.zone===8 && player.y<124 && player.x>OFF_LIFT.x0 && player.x<OFF_LIFT.x1; }
function askLift(){ markExitSeen("lift"+S.bld);
  keys.clear(); target=null; targetNpc=null; endJoy&&endJoy(); player.y=154; player.dir="down";
  const f=offFloor();
  if(isScam(S.bld) && !raided() && S.uc && f===1 && !S.ucOk){
    S.ucOk=true; save();
    say("o_guard", lines([t("หยุดก่อน! …อ้อ บัตรพนักงานใหม่เหรอ","Stop! …Oh, a new staff pass?"),t("ขึ้นไปได้ ชั้น 2 ห้องทำงาน ชั้น 3 ห้องพัก อย่าเดินเพ่นพ่านล่ะ","Go on up. Floor 2 is the work room, floor 3 the dorm. Don't wander.")]),{onEnd:()=>askLift()});
    return;
  }
  if(isScam(S.bld) && !raided() && !S.uc){
    const first=!S.hqFound; S.hqFound=true; save(); hudKey="";
    say("o_guard", lines([t("เดี๋ยวๆ ชั้นบนเฉพาะพนักงานเท่านั้น ห้ามขึ้น","Hold on. Upstairs is staff only. You can't go up."),t("บริษัทเราทำการตลาดออนไลน์ ไม่รับคนนอก กลับไปเถอะ","We do online marketing. No visitors. Off you go.")]),
      {onEnd:()=>{ if(first) setTimeout(()=>{ sfx("ev"); toast(L("🕵️ ตึกนี้แปลก… มียามกันลิฟต์ แล้วได้ยินเสียงคนคุยโทรศัพท์หลายสิบสายจากชั้นบน","🕵️ Something's off… a guard blocks the lift, and you hear dozens of phone calls upstairs")); setTimeout(()=>toast(L("ไปบอกพี่ภพที่สถานีตำรวจ (ซอย 2) ว่าเจอตึกแล้ว","Tell Phop at the police station (Soi 2) you found the building")),3400); },300); else if(!S.uc) setTimeout(()=>toast(L(`ต้องส่งเบาะแสให้พี่ภพ ${UC_MIN} ชิ้นก่อน ถึงจะได้บัตรพนักงานขึ้นไป`,`Hand Phop ${UC_MIN} clues to get a staff pass for upstairs`)),300); }});
    return;
  }
  const btns=[1,2,3].map(k=>`<button class="btn ${k===f?"g":"y"}" data-lift="${k}" ${k===f?"disabled":""}><span>${L(`ชั้น ${k}`,`Floor ${k}`)} · ${esc(offFloorName(k))}${k===f?L(" (อยู่ที่นี่)"," (here)"):""}</span></button>`).join("");
  openSheet("lift", `${top_(L("ลิฟต์","Lift"))}<div class="sh-body"><div class="wcomic" style="background:var(--paper);color:var(--ink)"><span class="wv" style="filter:none">🛗</span><p>${L(`ตอนนี้อยู่ชั้น ${f} จะไปชั้นไหน?`,`You're on floor ${f}. Which floor?`)}</p></div><div class="btns">${btns}<button class="btn g" data-close><span>${L("ยังไม่ไป","Stay here")}</span></button></div></div>`);
  $("sheet").querySelectorAll("[data-lift]").forEach(el=>el.onclick=()=>{ closeSheet(); goOffFloor(+el.dataset.lift); });
}
function goOffFloor(k){
  escort=null; S.floor=k; save(); setWorld(); buildCast(); drawStatic();
  player.x=740; player.y=154; player.dir="down"; keys.clear(); target=null; targetNpc=null; endJoy&&endJoy(); sfx("blip"); hudKey=""; hud();
  toast(`${L(`ชั้น ${k}`,`Floor ${k}`)} · ${offFloorName(k)}`);
  if(isScam(S.bld) && k===3 && !raided()){ setTimeout(()=>toast(L("🔒 ทุกห้องล็อกจากข้างนอก… ลองคุยกับคนข้างในเบาๆ","🔒 Every door is locked from outside… talk quietly to the people inside")),2600); return; }
  if(isScam(S.bld) && k===2 && !raided()){ setTimeout(()=>toast(L("📞 ห้องเต็มไปด้วยคนคุยโทรศัพท์… ไวท์บอร์ดข้างบนน่าสนใจ","📞 The room is full of people on calls… that whiteboard looks interesting")),2600); return; }
  if(isScam(S.bld) && k===3 && !S.dormSeen){ S.dormSeen=true; save(); setTimeout(()=>toast(L("🔒 ทุกห้องล็อกจากข้างนอก… มีเสียงคนร้องไห้ คุยกับแต่ละคนเพื่อไขกุญแจ","🔒 Every door is locked from outside… someone's crying. Talk to each person to unlock their door")),2600); }
}
const freedN=()=>Object.keys(S.freed||{}).length;
const STAFF_TIPS=[
  [t("อีเมลจาก “ซีอีโอ” สั่งให้ซื้อบัตรของขวัญด่วนแล้วส่งรหัสกลับไป เป็นมุกยอดฮิตเลย","An email from the “CEO” says buy gift cards urgently and send the codes. Classic scam."),t("โทรถามตัวจริงด้วยเบอร์ที่เรามีอยู่แล้วก่อนเสมอ","Always call the real person on a number you already have.")],
  [t("เมื่อวานมีคนเจอ USB ตกที่ลานจอดรถ เกือบเสียบเครื่องบริษัทแล้ว","Someone found a USB stick in the car park and nearly plugged it into a work PC."),t("ของที่ไม่รู้ที่มา ให้ส่งฝ่าย IT อย่าเสียบเอง","If you don't know where it came from, hand it to IT. Don't plug it in.")],
  [t("ลูกค้าส่งอีเมลมาขอเปลี่ยนเลขบัญชีรับเงิน ฟังดูปกติใช่ไหม","A supplier emailed asking us to change their bank account. Sounds normal, right?"),t("ต้องโทรยืนยันกับเบอร์เดิมในระบบ ไม่ใช่เบอร์ที่อยู่ในอีเมลนั้น","Confirm on the number already on file, not the one in that email.")],
  [t("หัวหน้าแปะรหัสผ่านไว้บนโพสต์อิทข้างจอ ใครเดินผ่านก็เห็น","My boss keeps his password on a sticky note by the screen. Anyone walking past can read it."),t("ใช้ตัวจัดการรหัสผ่าน แล้วเปิดยืนยันสองขั้นตอนดีกว่า","A password manager plus two-step verification is much better.")],
  [t("ลุกจากโต๊ะเมื่อไหร่ ล็อกจอทุกครั้ง Windows กด Win+L","Lock your screen whenever you leave your desk. On Windows, press Win+L."),t("แค่สองวินาที กันคนแอบส่งอีเมลในชื่อเราได้","Two seconds, and nobody can send email as you.")],
  [t("มีคนใส่เสื้อช่างเดินตามหลังเข้าประตูคีย์การ์ดมา","A man in a repair shirt followed me through the key-card door."),t("ต้องให้เขาไปแลกบัตรที่ล็อบบี้ก่อน ไม่ใช่เปิดประตูให้เพราะเกรงใจ","He should sign in at the lobby first. Don't hold the door just to be polite.")],
  [t("มีไลน์ชวนทำงานออนไลน์ กดไลก์ได้วันละพัน ต้องโอนค่าสมัครก่อน","A LINE message offered ฿1,000 a day for liking posts, pay a sign-up fee first."),t("งานจริงไม่เก็บเงินก่อน ถ้าต้องจ่ายก่อนได้งาน คือมิจฉาชีพ","Real jobs don't charge you. Pay to get a job = scam.")]
];
function talkOffice(n){
  const sc=isScam(S.bld), hq=OFFICES[hqB()].name;
  if(n.role==="o_recep"){
    if(!sc) return say(n.id, lines([t(`สวัสดีค่ะ ${offB().name.th} ชั้น 2 ${tenantOf(S.bld,2).th} ชั้น 3 ${tenantOf(S.bld,3).th} ลิฟต์อยู่ทางขวาค่ะ`,`Hello, welcome to ${offB().name.en}. Floor 2 is ${tenantOf(S.bld,2).en}, floor 3 is ${tenantOf(S.bld,3).en}. The lift is on the right.`),
      t("ช่วงนี้มีคนโทรมาอ้างเป็นแผนกบัญชีของบริษัทในตึก ขอให้โอนเงินด่วน เราต้องโทรกลับเบอร์ภายในก่อนทุกครั้งค่ะ","Lately people call pretending to be a tenant's accounts team asking for urgent transfers. We always call back on the internal number first.")]));
    if(!raided()) return say(n.id, lines([t(`ชั้น 2 กับ 3 เป็นของ${SCAM_TENANT.th}ค่ะ… แต่ไม่ค่อยมีใครได้ขึ้นไปนะคะ`,`Floors 2 and 3 are all ${SCAM_TENANT.en}… but hardly anyone gets to go up.`),
      t("พนักงานที่นั่นไม่เคยลงมาเลย ข้าวก็มีคนยกขึ้นไปส่ง แปลกดีนะคะ","Their staff never come down. Someone carries their meals up. Strange, isn't it?")]));
    return say(n.id, lines([t("ไม่อยากเชื่อเลยว่าชั้นบนเป็นแก๊งคอลเซ็นเตอร์ ขอบคุณที่ช่วยนะคะ","I can't believe upstairs was a call-centre gang. Thank you for helping."),
      t(freedN()<DORM_ROOMS.length?"ได้ยินว่าชั้น 3 ยังมีคนถูกขังอยู่ ขึ้นลิฟต์ไปได้เลยค่ะ":"ทุกคนที่ถูกขังได้ออกมาแล้ว ตำรวจพาไปพบเจ้าหน้าที่ช่วยเหลือค่ะ",freedN()<DORM_ROOMS.length?"I hear people are still locked in on floor 3. Take the lift up.":"Everyone who was locked in is out. The police took them to support staff.")]));
  }
  if(n.role==="o_guard") return askLift();
  if(n.role==="o_staff"){
    const tip=STAFF_TIPS[n.k%STAFF_TIPS.length];
    const clue=(n.k%3===0 && !raided()) ? [t(`ว่าแต่… ${hq.th} น่ะ แปลกนะ ไฟเปิดทั้งคืน พนักงานไม่เคยลงมากินข้าวเลย`,`By the way… ${hq.en} is odd. Lights on all night, and their staff never come down for lunch.`)] : [];
    return say(n.id, lines(sc?tip:[...tip,...clue]));
  }
  if(n.role==="o_cop") return say(n.id, lines([t("ที่นี่คือห้องทำงานของแก๊งเงา โทรหาเหยื่อวันละหลายพันสาย มีสคริปต์ปลอมเป็นธนาคาร ตำรวจ ไปรษณีย์","This is the Shadow gang's work room. Thousands of calls a day, with scripts posing as banks, police and couriers."),
    t("ซิมการ์ดเป็นลังๆ บัญชีม้าอีกเพียบ ตรงกับหลักฐานที่คุณเก็บมาทุกอย่าง","Crates of SIM cards and piles of mule accounts. It all matches the evidence you collected."),
    freedN()<DORM_ROOMS.length?t("แต่ที่แย่กว่าคือชั้น 3 คนที่นั่นถูกหลอกมาทำงานแล้วถูกขังไว้ ช่วยพี่ไขกุญแจห้องพวกเขาหน่อย","Worse is floor 3. People were tricked into working here and locked in. Help me unlock their rooms."):t("ทุกคนในชั้น 3 ได้ออกมาแล้ว เก่งมาก","Everyone on floor 3 is out. Great work.")]));
  if(n.role==="o_scam"){ const SC=[[t("เงียบหน่อย กำลังโทรอยู่ “สวัสดีค่ะ ติดต่อจากธนาคาร…”","Shh, I'm on a call. “Hello, this is your bank…”")],[t("พนักงานใหม่เหรอ อ่านสคริปต์บนไวท์บอร์ดให้จำ เดี๋ยวหัวหน้าดุ","New here? Memorise the script on the whiteboard or the boss will yell.")],[t("วันนี้ยังโทรไม่ถึงเป้า… ถ้าไม่ถึงก็อดข้าวอีก","Still short of today's target… miss it and no dinner again.")]];
    return say(n.id, lines(SC[n.k%SC.length])); }
  if(n.role==="o_trap" && !raided()){
    const first=!S.ev.hq_dorm;
    return say(n.id, lines([t("…เธอเป็นใคร ไม่ใช่คนของพวกมันใช่ไหม","…Who are you? You're not one of them, are you?"),
      t("พวกเราถูกหลอกมาทำงาน บัตรประชาชนกับมือถือถูกยึด ห้องล็อกจากข้างนอกทุกคืน","We were tricked into coming here. They took our IDs and phones and lock the rooms every night."),
      t("ตอนนี้ยังไขกุญแจไม่ได้ ถ้าพวกมันรู้จะแย่ ช่วยบอกตำรวจทีนะ","Don't unlock anything yet, they'd find out. Please tell the police.")]),{onEnd:()=>{ if(first) gainClue("hq_dorm",true); }});
  }
  if(n.role==="o_trap"){
    S.freed=S.freed||{};
    if(S.freed[n.k]) return say(n.id, lines([t("ขอบคุณมากนะ ตำรวจกำลังพาพวกเราไปพบเจ้าหน้าที่ช่วยเหลือ","Thank you so much. The police are taking us to support staff."),t("ถ้ามีคนรู้จักหายไปหลังได้งานแบบนี้ แจ้งศูนย์ช่วยเหลือสังคม 1300 ได้","If someone you know disappears after a job like this, call the 1300 social assistance hotline.")]));
    const ST=[
      [t("เขาประกาศรับแอดมินออนไลน์ เงินเดือนสี่หมื่น ไม่ต้องมีประสบการณ์","They advertised an online admin job, ฿40,000 a month, no experience needed."),t("พอมาถึงก็ยึดบัตรประชาชนกับมือถือ บอกว่าต้องใช้หนี้ค่าเดินทางก่อนถึงจะออกได้","When I arrived they took my ID card and phone, and said I owed them travel costs before I could leave.")],
      [t("ทุกวันต้องโทรหลอกคนให้ได้ตามเป้า ไม่ถึงเป้าก็ไม่ได้กินข้าว","Every day I had to scam people to hit a target. Miss it and no dinner."),t("ผมไม่อยากหลอกใครเลย…","I never wanted to cheat anyone…")],
      [t("เพื่อนในเฟซชวนมาทำงานบริษัทการตลาด ฉันเชื่อเพราะเป็นคนรู้จัก","A Facebook friend invited me to a marketing job. I trusted her because I knew her."),t("งานที่ดีเกินจริงจากแชต ต้องเช็กชื่อบริษัทกับกรมพัฒนาธุรกิจการค้าก่อน","A too-good job from a chat? Check the company with the Department of Business Development first.")],
      [t("ห้องนี้ล็อกจากข้างนอกทุกคืน หน้าต่างก็ติดเหล็กดัด","This room was locked from outside every night, and the window has bars."),t("ขอบคุณที่มาช่วยนะ จะได้กลับบ้านไปหาแม่แล้ว","Thank you for coming. I can finally go home to my mum.")]
    ];
    return say(n.id, lines(ST[n.k%ST.length]), {choices:[{label:{th:"🔓 ไขกุญแจประตูให้",en:"🔓 Unlock the door"},fn:()=>{
      S.freed[n.k]=true; save(); drawStatic(); sfx("good"); hudKey="";
      const c=freedN(), all=DORM_ROOMS.length;
      if(c>=all && !S.freedAll){ S.freedAll=true; save(); addCoins(50); toast(L(`ช่วยทุกคนออกมาได้ครบ ${all} ห้องแล้ว! (+500 บาท)`,`Everyone is out, all ${all} rooms! (+฿500)`)); }
      else toast(L(`🔓 ไขกุญแจแล้ว ${c}/${all} ห้อง`,`🔓 Unlocked ${c}/${all} rooms`));
    }}]});
  }
}
/* ----- interior art ----- */
function drawOfficeStatic(g){
  const b=offB(), f=offFloor(), sc=isScam(S.bld), dark=sc&&f>1;
  const fl=dark?["#B8B4AC","#ADA9A1"]:b.floor;
  g.fillStyle=fl[0]; g.fillRect(0,0,W,H);
  for(let x=0;x<W;x+=48) for(let y=108;y<590;y+=48){ g.fillStyle=((x+y)/48)%2?fl[0]:fl[1]; g.fillRect(x,y,48,48); }
  if(f===1){ rr(g,250,300,360,190,16); g.fillStyle=b.trim; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); g.fillStyle="#FFFFFF"; g.font=`800 20px ${OFNT}`; g.textAlign="center"; g.textBaseline="middle"; g.fillText(b.name[S.lang],430,395); }
  // walls
  g.fillStyle=dark?"#8F8A80":b.wall; g.fillRect(0,0,W,108); g.fillStyle=b.trim; g.fillRect(0,86,W,22);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,86); g.lineTo(W,86); g.moveTo(0,108); g.lineTo(W,108); g.stroke();
  const side=dark?"#7D786F":"#CFC8BA";
  g.fillStyle=side; g.fillRect(0,108,44,H); g.fillRect(W-44,108,44,H); g.fillRect(0,580,W,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(W-44,580); g.lineTo(W-44,108); g.stroke();
  if(f===1){ g.fillStyle=fl[0]; g.fillRect(384,580,96,44); rr(g,392,584,80,30,4); g.fillStyle=b.trim; g.fill(); g.lineWidth=2.5; g.stroke(); }
  // lift
  rr(g,OFF_LIFT.x0,14,OFF_LIFT.x1-OFF_LIFT.x0,94,3); g.fillStyle="#9AA3AC"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  for(const dx of [0,1]){ rr(g,OFF_LIFT.x0+8+dx*44,30,40,76,2); g.fillStyle="#C9D1D8"; g.fill(); g.lineWidth=2; g.stroke(); }
  rr(g,OFF_LIFT.x0+18,16,64,12,3); g.fillStyle=INK; g.fill(); g.fillStyle="#FFC414"; g.font=`800 9px ${OFNT}`; g.textAlign="center"; g.textBaseline="middle"; g.fillText(`▲▼ ${f}`,OFF_LIFT.x0+50,22.5);
  rr(g,OFF_LIFT.x0-4,112,108,24,12); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.font=`800 11px ${OFNT}`; g.fillText(L("🛗 ลิฟต์ · ชั้น 1-3","🛗 Lift · floors 1-3"),OFF_LIFT.x0+50,124);
  // wall boards
  if(f===1){ rr(g,250,8,360,72,4); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=3; g.stroke(); g.fillStyle="#FFC414"; g.font=`800 12px ${OFNT}`; g.textAlign="left"; g.fillText(L("ผังอาคาร","Directory"),264,22);
    g.fillStyle="#FFFFFF"; g.font=`600 12px ${OFNT}`; for(let k=3;k>=1;k--){ g.fillText(`${L("ชั้น","Fl.")} ${k}  ${tenantOf(S.bld,k)[S.lang]}`,264,40+(3-k)*16); } }
  else if(sc&&f===2){ rr(g,60,8,560,74,3); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); g.textAlign="left"; g.fillStyle="#2F6DB5"; g.font=`800 12px ${OFNT}`;
    g.fillText(L("สคริปต์วันนี้: “สวัสดีค่ะ ติดต่อจากธนาคาร บัญชีของท่านถูกใช้ผิดกฎหมาย…”","Today's script: “Hello, this is your bank. Your account was used illegally…”"),74,26);
    g.fillStyle="#E5402F"; g.fillText(L("เป้าต่อคน: 300 สาย/วัน · ยอดโอนต่ำสุด 50,000 บาท","Target: 300 calls/day each · min. transfer ฿50,000"),74,48);
    g.fillStyle=INK; g.font=`600 11px ${OFNT}`; g.fillText(L("ห้ามใช้มือถือส่วนตัว · ห้ามลงไปชั้นล่าง","No personal phones · Do not go downstairs"),74,68); }
  else if(sc&&f===3){ rr(g,60,10,420,60,3); g.fillStyle="#3A0606"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); g.fillStyle="#FFD3D3"; g.textAlign="center"; g.font=`800 14px ${OFNT}`; g.fillText(L("ห้องพักพนักงาน · ห้ามออกนอกห้องหลัง 22:00","Staff rooms · No leaving rooms after 22:00"),270,40); }
  else { rr(g,260,12,340,60,4); g.fillStyle=b.trim; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); g.fillStyle="#FFFFFF"; g.textAlign="center"; g.font=`800 15px ${OFNT}`; g.fillText(tenantOf(S.bld,f)[S.lang],430,42);
    g.beginPath(); g.arc(120,46,24,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=3; g.stroke(); g.beginPath(); g.moveTo(120,46); g.lineTo(120,30); g.moveTo(120,46); g.lineTo(132,52); g.stroke(); }
  for(const r of offRects()) drawOffProp(g,r,b);
}
function drawOffProp(g,r,b){
  const {x,y,w,h,k}=r; g.lineWidth=3; g.strokeStyle=INK; g.textAlign="center"; g.textBaseline="middle";
  const sh=()=>{ g.fillStyle="rgba(0,0,0,.14)"; g.fillRect(x+4,y+h-2,w,6); };
  if(k==="desk"){ sh(); rr(g,x,y-14,w,22,4); g.fillStyle="#F2F2F2"; g.fill(); g.stroke(); rr(g,x,y,w,h,4); g.fillStyle=b.trim; g.fill(); g.stroke(); g.fillStyle="#FFFFFF"; g.font=`800 14px ${OFNT}`; g.fillText(L("ติดต่อ · แลกบัตร","Reception · Visitor pass"),x+w/2,y+h/2+4); return; }
  if(k==="sofaV"||k==="sofaH"){ sh(); rr(g,x,y,w,h,10); g.fillStyle="#5E7A9C"; g.fill(); g.stroke(); rr(g,x+8,y+8,w-16,h-16,6); g.fillStyle="#7C97B8"; g.fill(); g.lineWidth=2; g.stroke(); return; }
  if(k==="ctable"||k==="rtable"){ sh(); rr(g,x,y,w,h,Math.min(w,h)/2); g.fillStyle="#C9935D"; g.fill(); g.stroke(); if(k==="rtable") for(const dx of [-30,0,30]){ g.beginPath(); g.arc(x+w/2+dx,y+h/2,6,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.stroke(); } return; }
  if(k==="plant"){ rr(g,x+8,y,24,26,4); g.fillStyle="#C2552E"; g.fill(); g.stroke(); for(const [dx,dy,rad] of [[12,-6,11],[28,-8,11],[20,-18,12]]){ g.beginPath(); g.arc(x+dx,y+dy,rad,0,7); g.fillStyle="#3F8E4E"; g.fill(); g.lineWidth=2; g.stroke(); } return; }
  if(k==="desks"){ sh(); rr(g,x,y,w,h,4); g.fillStyle="#E6D3B3"; g.fill(); g.stroke(); g.beginPath(); g.moveTo(x,y+h/2); g.lineTo(x+w,y+h/2); g.lineWidth=2; g.stroke();
    for(const [dx,dy] of [[18,6],[w-58,6],[18,h/2+4],[w-58,h/2+4]]){ rr(g,x+dx,y+dy,40,24,2); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle="#9FD3E6"; g.fillRect(x+dx+4,y+dy+4,32,14); } return; }
  if(k==="meet"){ g.fillStyle="rgba(159,211,230,.35)"; g.fillRect(x,y,w,h); g.lineWidth=4; g.strokeStyle="#5B7D8C"; g.strokeRect(x,y,w,h); g.strokeStyle=INK; g.lineWidth=2;
    rr(g,x+60,y+60,w-120,60,8); g.fillStyle="#C9935D"; g.fill(); g.lineWidth=2.5; g.stroke(); for(let i=0;i<4;i++){ for(const yy of [y+46,y+132]){ rr(g,x+74+i*44,yy,22,16,4); g.fillStyle="#3E5C76"; g.fill(); g.lineWidth=1.5; g.stroke(); } }
    g.fillStyle=INK; g.font=`800 12px ${OFNT}`; g.fillText(L("ห้องประชุม","Meeting room"),x+w/2,y+20); return; }
  if(k==="pantry"){ sh(); rr(g,x,y,w,h,3); g.fillStyle="#E6ECEA"; g.fill(); g.stroke(); rr(g,x+16,y-26,40,36,4); g.fillStyle="#3B3B3B"; g.fill(); g.lineWidth=2; g.stroke(); rr(g,x+w-60,y-48,46,58,4); g.fillStyle="#FFFFFF"; g.fill(); g.stroke();
    g.fillStyle=INK; g.font=`800 12px ${OFNT}`; g.fillText(L("แพนทรี","Pantry"),x+w/2,y+h/2); return; }
  if(k==="cc"){ sh(); rr(g,x,y,w,h,3); g.fillStyle="#6E6A64"; g.fill(); g.stroke();
    for(let i=0;i<7;i++){ const sx=x+12+i*78; rr(g,sx,y+4,34,20,2); g.fillStyle="#1B1E26"; g.fill(); g.lineWidth=1.5; g.stroke(); g.fillStyle="#7FE0A8"; g.fillRect(sx+3,y+7,28,12);
      for(let p=0;p<3;p++){ rr(g,sx+38+p*10,y+8+p*3,8,14,2); g.fillStyle=["#FFFFFF","#E5402F","#2F6DB5"][p]; g.fill(); g.lineWidth=1.2; g.stroke(); }
      g.fillStyle="#F2F2F2"; g.fillRect(sx+4,y+28,22,12); g.lineWidth=1; g.strokeRect(sx+4,y+28,22,12); } return; }
  if(k==="boxes"){ for(let i=0;i<6;i++){ const bx=x+(i%3)*36, by=y+Math.floor(i/3)*34; rr(g,bx,by,34,32,2); g.fillStyle="#C9A76A"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle=INK; g.font=`800 9px ${OFNT}`; g.fillText("SIM",bx+17,by+16); } return; }
  if(k==="dormTop"||k==="dormBot"){
    const top=k==="dormTop"; g.fillStyle="#9C968C"; g.fillRect(x,y,w,h);
    DORM_ROOMS.forEach((rm,i)=>{ if(rm.top!==top) return; const open=!!(S.freed&&S.freed[i]);
      g.fillStyle="#B3ADA2"; g.fillRect(rm.x+6,y+6,rm.w-12,h-12);
      const by=top?y+14:y+h-46; rr(g,rm.x+rm.w-70,by,56,32,4); g.fillStyle="#6E5A48"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); rr(g,rm.x+rm.w-66,by+4,18,24,3); g.fillStyle="#EDE6DA"; g.fill(); g.lineWidth=1.5; g.stroke();
      rr(g,rm.x+14,top?y+16:y+h-40,40,24,3); g.fillStyle="#8EA3B8"; g.fill(); g.lineWidth=1.5; g.stroke();
      g.fillStyle="#5E666E"; g.fillRect(rm.x-3,y,6,h);
      // the door on the corridor side
      const dy=top?y+h-8:y, dx=rm.x+rm.w/2+20;
      g.fillStyle="#5E666E"; g.fillRect(rm.x,dy,rm.w,8);
      if(open){ g.fillStyle=fl0(); g.fillRect(dx-22,dy-2,44,12); }
      else { rr(g,dx-22,dy-4,44,16,2); g.fillStyle="#7A4A2A"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.beginPath(); g.arc(dx,dy+(top?-2:18),6,Math.PI,0); g.lineWidth=2.5; g.stroke(); rr(g,dx-7,dy+(top?-2:18),14,12,2); g.fillStyle="#F2C14E"; g.fill(); g.lineWidth=2; g.stroke(); }
    });
    g.lineWidth=3; g.strokeStyle=INK; g.strokeRect(x,y,w,h); return; }
}
const fl0=()=>"#B8B4AC";
