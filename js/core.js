/* Save data, sound, the cast, zones, scoring and the evidence list. */
/* ================= Café Mission: walkable prototype ================= */
const $ = (id)=>document.getElementById(id);
/* Safari measures and centres Thai text on canvas wrongly, so measure with a hidden DOM span
   and draw centred/right-aligned Thai text as left-aligned at the corrected x. */
(function(){
  const P=CanvasRenderingContext2D.prototype, oFill=P.fillText, oMeasure=P.measureText;
  const TH=/[\u0E00-\u0E7F]/, cache=new Map(); let sp=null;
  function domWidth(ctx,t){
    const k=ctx.font+"|"+t; if(cache.has(k)) return cache.get(k);
    if(!sp){ sp=document.createElement("span"); sp.setAttribute("aria-hidden","true"); sp.style.cssText="position:absolute;left:-9999px;top:-9999px;visibility:hidden;white-space:pre;pointer-events:none"; document.body.appendChild(sp); }
    sp.style.font=ctx.font; sp.textContent=t;
    const w=sp.getBoundingClientRect().width;
    if(!document.fonts || document.fonts.status==="loaded") cache.set(k,w);
    return w;
  }
  if(document.fonts&&document.fonts.addEventListener) document.fonts.addEventListener("loadingdone",()=>cache.clear());
  P.measureText=function(t){ if(!TH.test(t)) return oMeasure.call(this,t); return {width:domWidth(this,t)}; };
  P.fillText=function(t,x,y,mw){
    const a=this.textAlign;
    if(TH.test(t) && (a==="center"||a==="right"||a==="end")){
      const w=domWidth(this,t); this.textAlign="left";
      oFill.call(this,t,a==="center"?x-w/2:x-w,y); this.textAlign=a; return;
    }
    return mw==null ? oFill.call(this,t,x,y) : oFill.call(this,t,x,y,mw);
  };
})();
const T=48, RW=18*T, RH=13*T;
let W=RW, H=RH;
const SCALE={phum:.74,baitoey:.74,f_kidGirl:.74,f_kidBoy:.74};
const CHAR_H=84, SPEED=165, TALK=66;
const SAVE_KEY="cafe-mission-v1";
const TOUCH = matchMedia("(pointer: coarse)").matches;
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.body.classList.toggle("desk", !TOUCH);

/* ---------- save ---------- */
const fresh = ()=>({lang:"th", char:null, name:"", chapter:0, intro:false, results:{}, best:{}, late:{}, ev:{}, evNew:0, busted:false, inbox:[], msgSeen:[], msgStats:{ok:0,bad:0}, mg:{sms:0,url:0}, rank:0, sound:true, seenCases:[], fed:{cat:0,birds:0}, wifi:{}, phoneBroken:null, coins:100, items:{shield:0,lens:0,ins:0,data:false,shoes:false}, zone:1, unlocked:1, seen:{}, bars:{money:70,privacy:70,trust:70}, chat:false, chatSeen:false, tip:0});
let S = fresh();
try{ const v=JSON.parse(localStorage.getItem(SAVE_KEY)||"null"); if(v&&v.bars) S=Object.assign(fresh(),v); }catch(e){}
for(const [k,r] of Object.entries(S.results)) if(!S.best[k]) S.best[k]=r.type;
if(!S.late) S.late={}; if(!S.ev) S.ev={}; if(!S.inbox) S.inbox=[]; if(!S.msgSeen) S.msgSeen=[]; if(!S.msgStats) S.msgStats={ok:0,bad:0}; if(!S.mg) S.mg={sms:0,url:0}; if(S.rank==null) S.rank=0; if(S.sound==null) S.sound=true; if(!S.seenCases) S.seenCases=[]; if(!S.fed) S.fed={cat:0,birds:0}; if(!S.wifi) S.wifi={}; if(S.coins==null) S.coins=100; if(!S.items) S.items={shield:0,lens:0,ins:0,data:false,shoes:false}; if(S.phoneBroken===undefined) S.phoneBroken=null; S.items.lens=Math.min(3,S.items.lens||0); if(!S.ts) S.ts=1; applyTS(); if(S.briefed&&!S.items.lens) S.items.lens=1;
const save = ()=>{ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }catch(e){} };
const EN = ()=>S.lang==="en";
const L = (th,en)=>EN()?en:th;
const esc = (s)=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- sound effects (tiny synth, no files) ---------- */
let AC=null;
function sfx(kind){
  if(!S.sound) return;
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    if(AC.state==="suspended") AC.resume();
    const seq={blip:[[660,.04]],good:[[660,.08],[880,.08],[1320,.14]],bad:[[220,.16],[160,.22]],ping:[[1046,.07],[1568,.12]],ev:[[523,.08],[659,.08],[784,.08],[1046,.2]],rank:[[392,.1],[523,.1],[659,.1],[784,.1],[1046,.3]],tick:[[880,.03]]}[kind]||[[440,.05]];
    let t=AC.currentTime;
    for(const [f,d] of seq){ const o=AC.createOscillator(), gn=AC.createGain(); o.type=kind==="bad"?"sawtooth":"triangle"; o.frequency.value=f; gn.gain.setValueAtTime(.0001,t); gn.gain.exponentialRampToValueAtTime(kind==="blip"||kind==="tick"?.03:.08,t+.01); gn.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(gn); gn.connect(AC.destination); o.start(t); o.stop(t+d+.02); t+=d*.9; }
  }catch(e){}
}


/* ---------- tension soundtrack while the phone is infected (all synthesized) ---------- */
let TN=null, tnBeat=0, tnTick=0, tnGlitch=0, tnAlarm=0;
function tnStart(){
  AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume();
  const out=AC.createGain(); out.gain.value=0.0001; out.connect(AC.destination);
  const lp=AC.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=220; lp.Q.value=6; lp.connect(out);
  const o1=AC.createOscillator(), o2=AC.createOscillator(); o1.type="sawtooth"; o2.type="sawtooth"; o1.frequency.value=55; o2.frequency.value=55.8;
  o1.connect(lp); o2.connect(lp); o1.start(); o2.start();
  TN={out,lp,o1,o2};
}
function tnStop(){ if(!TN) return; const T=TN; TN=null; try{ T.out.gain.setTargetAtTime(0.0001,AC.currentTime,.15); setTimeout(()=>{ try{ T.o1.stop(); T.o2.stop(); T.out.disconnect(); }catch(e){} },700); }catch(e){} }
function tnNote(f,d,type,vol,slideTo){
  const t=AC.currentTime, o=AC.createOscillator(), g=AC.createGain(); o.type=type; o.frequency.setValueAtTime(f,t); if(slideTo) o.frequency.exponentialRampToValueAtTime(slideTo,t+d);
  g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t+d+.02);
}
function stepTension(dt){
  let L=0;
  if(S.phoneBroken) L=.75+(hackT<10?.25:0); else if(S.hack) L=.15+.6*S.hack.p;
  const veiled=!$("veil").hidden && sheetMode==="cut";
  if(!S.sound || !S.char || L<=0 || veiled){ tnStop(); return; }
  try{
    if(!TN) tnStart();
    const t=AC.currentTime, quiet=busy()?.5:1;
    TN.out.gain.setTargetAtTime((.025+.06*L)*quiet,t,.3);
    TN.lp.frequency.setTargetAtTime(160+900*L,t,.4);
    TN.o2.frequency.setTargetAtTime(55.8+L*2.5,t,.5);
    // heartbeat: lub-dub, faster as it gets worse
    if((tnBeat-=dt)<=0){ tnBeat=1.15-.6*L; tnNote(70,.18,"sine",.35*quiet,38); setTimeout(()=>{ if(TN) tnNote(62,.16,"sine",.25*quiet,34); },170); }
    // clock ticks once the phone is dead, double-time in the last 10 seconds
    if(S.phoneBroken && (tnTick-=dt)<=0){ tnTick=hackT<10?.5:1; tnNote(2200,.03,"square",.05*quiet); }
    // random digital glitches
    if((tnGlitch-=dt)<=0){ tnGlitch=.4+Math.random()*(3-2.4*L); if(Math.random()<L){ tnNote(300+Math.random()*1800,.05+Math.random()*.06,"square",.035*quiet,100+Math.random()*900); } }
    // two-tone alarm in the last 10 seconds
    if(S.phoneBroken && hackT<10 && !busy() && (tnAlarm-=dt)<=0){ tnAlarm=1; tnNote(880,.22,"triangle",.06); setTimeout(()=>{ if(TN) tnNote(660,.22,"triangle",.06); },250); }
  }catch(e){}
}

/* ---------- cast ---------- */
const PEOPLE = {
  guardGirl:{name:{th:"พี่ฟ้า",en:"Fah"}, role:{th:"ทีมการ์ดไซเบอร์",en:"Cyber Guard team"}},
  guardBoy:{name:{th:"พี่ภพ",en:"Phop"}, role:{th:"ตำรวจไซเบอร์",en:"Cyber police"}},
  studentGirl:{name:{th:"มายด์",en:"Mind"}, role:{th:"นักศึกษาปี 1",en:"First-year student"}},
  studentBoy:{name:{th:"นนท์",en:"Non"}, role:{th:"นักศึกษาปี 1",en:"First-year student"}},
  grandma:{name:{th:"ยายศรี",en:"Grandma Sri"}, role:{th:"ลูกค้าประจำ",en:"Regular customer"}},
  grandpa:{name:{th:"ตาบุญ",en:"Grandpa Boon"}, role:{th:"ลูกค้าประจำ",en:"Regular customer"}},
  phum:{name:{th:"ภูมิ",en:"Phum"}, role:{th:"น้องชายของต้น · ป.5",en:"Ton's little brother · grade 5"}},
  baitoey:{name:{th:"ใบเตย",en:"Baitoey"}, role:{th:"เพื่อนของภูมิ · ป.5",en:"Phum's friend · grade 5"}},
  chai:{name:{th:"พี่ชัย",en:"Chai"}, role:{th:"เจ้าของร้านเน็ต",en:"Net café owner"}},
  paweena:{name:{th:"ปวีณา",en:"Paweena"}, role:{th:"นักศึกษาปี 2",en:"2nd-year student"}},
  prof:{name:{th:"อ.มณี",en:"Dr Manee"}, role:{th:"อาจารย์วิชาความปลอดภัยไซเบอร์",en:"Cyber security lecturer"}},
  visitor:{name:{th:"คุณแก้ว",en:"Kaew"}, role:{th:"คนมาติดต่อที่สถานี",en:"Visitor at the station"}},
  maeNoi:{name:{th:"แม่น้อย",en:"Mae Noi"}, role:{th:"ผู้ปกครองของเจน · นักศึกษาปี 1",en:"Jen's mum · 1st-year parent"}},
  fon:{name:{th:"พี่ฝน",en:"Fon"}, role:{th:"พนักงานออฟฟิศ · ใกล้คลอดแล้ว",en:"Office worker · expecting soon"}}
};
Object.assign(PEOPLE,{ghostChoy:{name:{th:"ผีแม่ช้อย",en:"Mae Choy (ghost)"}, role:{th:"วิญญาณในบ้านเก่า",en:"Spirit of the old house"}},
  ghostHem:{name:{th:"ผีตาเหม",en:"Grandpa Hem (ghost)"}, role:{th:"วิญญาณในบ้านเก่า",en:"Spirit of the old house"}},
  ghostPaeng:{name:{th:"ผีแป้ง",en:"Paeng (ghost)"}, role:{th:"วิญญาณในบ้านเก่า",en:"Spirit of the old house"}},
  volOat:{name:{th:"พี่โอ๊ต",en:"Oat"}, role:{th:"อาสาสมัครไซเบอร์ · พี่เลี้ยง",en:"Cyber volunteer · mentor"}},
  shadowBoss:{name:{th:"เฮียเงา",en:"Boss Shadow"}, role:{th:"หัวหน้าแก๊งเงา",en:"Shadow gang leader"}},
  jeAdmin:{name:{th:"เจ๊แอดมิน",en:"Jae Admin"}, role:{th:"ชวนลงทุนกำไรสูง",en:"Pushes sky-high returns"}},
  itGuy:{name:{th:"ช่างไอที",en:"The IT guy"}, role:{th:"อ้างว่ามาซ่อมเน็ตให้ร้าน",en:"Says he's here to fix the Wi-Fi"}},
  techTon:{name:{th:"ช่างต้น",en:"Ton the repairman"}, role:{th:"ร้านซ่อมมือถือริมถนน",en:"Street phone-repair stall"}},
  tellerNun:{name:{th:"พี่นุ่น",en:"Noon"}, role:{th:"พนักงานธนาคาร",en:"Bank teller"}},
  uncleYoon:{name:{th:"ลุงประยูร",en:"Uncle Prayoon"}, role:{th:"ครูเกษียณ มาห้องสมุดทุกวัน",en:"Retired teacher, library regular"}},
  pTai:{name:{th:"พี่ต่าย",en:"Tai"}, role:{th:"แม่ค้าออนไลน์",en:"Online seller"}},
  praeGirl:{name:{th:"น้องแพร",en:"Prae"}, role:{th:"นักเรียน ม.ปลาย",en:"High-school student"}},
  pBoss:{name:{th:"พี่บอส",en:"Boss"}, role:{th:"นักศึกษา ป.โท · ฟรีแลนซ์",en:"Grad student · freelancer"}},
  auntDaeng:{name:{th:"ป้าแดง",en:"Auntie Daeng"}, role:{th:"ชมรมถักไหมพรมห้องสมุด",en:"Library knitting club"}},
  jayFresh:{name:{th:"น้องเจ",en:"Jay"}, role:{th:"นักศึกษาปี 1",en:"First-year student"}},
  pMay:{name:{th:"พี่เมย์",en:"May"}, role:{th:"พนักงานเงินเดือนปีแรก",en:"First-jobber"}},
  maePu:{name:{th:"แม่ปู",en:"Pu (Phum's mum)"}, role:{th:"แม่ของต้นกับภูมิ",en:"Ton and Phum's mum"}},
  ton:{name:{th:"ต้น",en:"Ton"}, role:{th:"นักศึกษาปี 3 · พี่ชายภูมิ",en:"Third-year · Phum's brother"}},
  mew:{name:{th:"น้องมิว",en:"Mew"}, role:{th:"นักศึกษาปี 1",en:"First-year student"}},
  rider:{name:{th:"พี่ไรเดอร์",en:"The rider"}, role:{th:"ไรเดอร์ส่งอาหาร",en:"Food delivery rider"}},
  ghostTong:{name:{th:"ผีพี่โต้ง",en:"Tong (ghost)"}, role:{th:"ผีเจ้าของบ้าน",en:"The house's own ghost"}}
});
const PLACEHOLDER_ART={maeNoi:"maePu", paweena:"studentGirl", prof:"workMom", visitor:"workMom", phum:"kidBoy", baitoey:"kidGirl", chai:"workMan", fon:"workMom", ghostChoy:"grandma", ghostHem:"grandpa", ghostPaeng:"studentGirl", ghostTong:"studentBoy"};
for(const [k,v] of Object.entries(PLACEHOLDER_ART)) if(!SPRITES[k]) SPRITES[k]=SPRITES[v];
/* filler people: ordinary customers and passers-by the Wi-Fi hacker hides among */
SPRITES.police=SPRITES.policePhop; PEOPLE.police={name:{th:"พี่ภพ",en:"Phop"}, role:{th:"ตำรวจไซเบอร์",en:"Cyber police"}};
const FILL_NAMES={"crowd01":["ผู้ชายเสื้อเทา","Man in grey"],"crowd02":["ผู้หญิงเสื้อฟ้า","Woman in blue"],"crowd03":["วัยรุ่นฮู้ดดำ","Teen in a hoodie"],"crowd04":["วัยรุ่นเสื้อลาย","Teen in stripes"],"crowd05":["คุณลุง","Older man"],"crowd06":["คุณป้า","Older woman"],"crowd07":["ผู้ชายเสื้อโปโล","Man in a polo"],"crowd08":["ผู้หญิงชุดกระโปรง","Woman in a dress"],"crowd09":["หนุ่มเสื้อขาว","Young man"],"crowd10":["สาวเสื้อครีม","Young woman"],"crowd11":["ผู้ชายเสื้อลายสก็อต","Man in plaid"],"crowd12":["ผู้หญิงเสื้อส้ม","Woman in orange"],"crowd13":["ผู้ชายเสื้อเทา","Man in grey"],"crowd14":["ผู้หญิงเสื้อฟ้า","Woman in blue"],"crowd15":["วัยรุ่นฮู้ดดำ","Teen in a hoodie"],"crowd16":["วัยรุ่นเสื้อลาย","Teen in stripes"],"crowd17":["คุณลุง","Older man"],"crowd18":["คุณป้า","Older woman"],"crowd19":["ผู้ชายเสื้อโปโล","Man in a polo"],"crowd20":["ผู้หญิงชุดกระโปรง","Woman in a dress"],"crowd21":["หนุ่มเสื้อขาว","Young man"],"crowd22":["สาวเสื้อครีม","Young woman"],"crowd23":["ผู้ชายเสื้อลายสก็อต","Man in plaid"],"crowd24":["ผู้หญิงเสื้อส้ม","Woman in orange"],"workMan":["หนุ่มออฟฟิศ","Office guy"],"workMom":["สาวออฟฟิศ","Office woman"],"kidGirl":["เด็กหญิง","Girl"],"kidBoy":["เด็กชาย","Boy"]};
for(const [b,nmz] of Object.entries(FILL_NAMES)){ SPRITES["j_"+b]=SPRITES[b]; PEOPLE["j_"+b]={name:{th:"ผู้ต้องหา",en:"Suspect"}, role:{th:"ปล่อย Wi-Fi ปลอมดักข้อมูล",en:"Ran a fake Wi-Fi hotspot"}}; SPRITES["f_"+b]=SPRITES[b]; PEOPLE["f_"+b]={name:{th:nmz[0],en:nmz[1]}, role:{th:"ลูกค้า",en:"Customer"}}; }
const PLAYABLE=["studentGirl","studentBoy","guardGirl","guardBoy"];
const nm = (id)=>(id===S.char && S.name) ? S.name : PEOPLE[id].name[S.lang];
/* ---------- zones + scoring ---------- */
const ZONES = {
  1:{name:{th:"ร้านกาแฟ Bean House",en:"Bean House café"}, cases:["qr","bank","wifi","chat"], roleCase:{grandma:"qr", grandpa:"bank", friend:"wifi", phone:"chat"}},
  2:{name:{th:"ห้องสมุดเมือง",en:"City Library"}, cases:["charge","helper","publicpc","airdrop"], roleCase:{grandpa:"charge", grandma:"helper", tips:"publicpc", friend:"airdrop"}},
  3:{name:{th:"ธนาคารนครทอง",en:"Nakhonthong Bank"}, cases:["rush","video","invest","remote"], roleCase:{grandma:"rush", grandpa:"video", friend:"invest", tips:"remote"}},
  4:{name:{th:"ร้านเน็ต NET ZONE",en:"NET ZONE internet café"}, cases:["topup","trade","secret","parent"], roleCase:{friend:"topup", tips:"trade", grandpa:"secret", grandma:"parent"}},
  6:{name:{th:"มหาวิทยาลัยดาวเหนือ",en:"Dao Nuea University"}, cases:["scholar","itmail","parttime","fakeprof","callfund"], roleCase:{friend:"scholar", tips:"itmail", paweena:"parttime", prof:"fakeprof", parent:"callfund"}},
  7:{name:{th:"สถานีตำรวจ",en:"Police station"}, cases:["report","ransom"], roleCase:{grandpa:"report", visitor:"ransom"}},
  5:{bonus:true, name:{th:"บ้านผีสิงในตรอกมืด",en:"The haunted house in the alley"}, cases:["merit","inherit","romance","fortune"], roleCase:{grandma:"merit", grandpa:"inherit", tips:"romance", friend:"fortune"}}
};
const MAINZ = ()=>Object.keys(ZONES).map(Number).filter(z=>!ZONES[z].bonus);
const zno = (z)=>{ z=+z; const i=CHAPTERS.indexOf(z); if(i>=0) return i+1; if(z===7) return "🚓"; if(ZONES[z]&&ZONES[z].bonus) return "👻"; return ""; };
const OUTZ={name:{th:"ถนนหน้าร้าน",en:"The street"}, cases:[], roleCase:{}};
const VICTIM_CASES={grandma:["qr","rush"], grandpa:["bank","video"]};
function recoverRole(){
  if(S.best.recover==="safe") return null;
  for(const r of ["grandma","grandpa"]) if(VICTIM_CASES[r].some(k=>S.best[k]==="danger")) return r;
  return null;
}
const ZN = ()=>{ if(S.zone!==0) return ZONES[S.zone]||ZONES[1]; const r=recoverRole(); OUTZ.roleCase=r?{[r]:"recover"}:{};
  if(S.umbCase && UMB_CASES[S.umbCase] && !(S.items&&S.items.umbrella)) OUTZ.roleCase[UMB_CASES[S.umbCase]]=S.umbCase;   /* the rainy-day case gives you an umbrella */
  return OUTZ; };
function applyTS(){ document.documentElement.style.setProperty("--ts", String(S.ts||1)); }
const totalScore=()=>MAINZ().reduce((a,z)=>a+zoneScore(z),0), totalMax=()=>MAINZ().reduce((a,z)=>a+zoneMax(z),0);
const BAR_OF = {callfund:"money", scholar:"privacy", itmail:"privacy", parttime:"money", fakeprof:"money", report:"money", ransom:"privacy", invest:"money", publicpc:"privacy", charge:"money", helper:"privacy", update:"privacy", airdrop:"privacy", qr:"money", bank:"money", wifi:"privacy", chat:"trust", pkg:"privacy", call:"money", job:"trust", seller:"money", rush:"money", video:"money", mule:"trust", remote:"privacy", merit:"trust", inherit:"money", romance:"trust", fortune:"money", topup:"money", trade:"privacy", secret:"trust", parent:"money"};
/* ---------- the Shadow gang: evidence collected from each case ---------- */
const EVID = {
  qr:{i:"🏷️",g:"acct",t:["สติกเกอร์ QR ปลอม","Fake QR sticker"],d:["บัญชีปลายทาง: นาย ธนพล ส.","Receiving account: Mr Thanaphon S."]},
  bank:{i:"🌐",g:"server",t:["โดเมน nakhonthong-verify.co","Domain nakhonthong-verify.co"],d:["ชี้ไปที่เซิร์ฟเวอร์ 185.xx.xx.7","Points to server 185.xx.xx.7"]},
  wifi:{i:"📶",g:"server",t:["หน้าล็อกอิน Wi-Fi ปลอม","Fake Wi-Fi login page"],d:["ส่งรหัสที่ดักได้ไปที่ 185.xx.xx.7","Sends captured passwords to 185.xx.xx.7"]},
  chat:{i:"💬",g:"acct",t:["บัญชี \"พี่สาว\" ของต้นข้าว","Ton Khao's \"sister\" account"],d:["ปลายทาง: น.ส. ปวีณา","Receiving: Ms Paweena"]},
  scholar:{i:"🎓",g:"server",t:["เว็บทุนปลอม","Fake scholarship site"],d:["daonuea-scholar.site อยู่บน 185.xx.xx.7","daonuea-scholar.site is on 185.xx.xx.7"]},
  itmail:{i:"✉️",g:"server",t:["อีเมล IT ปลอม","Fake IT email"],d:["daonuea-mail.help ส่งจากเซิร์ฟเวอร์เดียวกัน 185.xx.xx.7","daonuea-mail.help sends from the same 185.xx.xx.7"]},
  parttime:{i:"🗣️",g:"acct",t:["คำให้การของปวีณา","Paweena's statement"],d:["“พี่บอส” สั่งเปิดบัญชีจากตึกฝั่งตรงข้ามถนน","“Boss” ran the accounts from the building across the road"]},
  callfund:{i:"📞",g:"phone",t:["สายปลอมอ้างงานทุน","Fake scholarship-office call"],d:["โทรจากเบอร์ 02 xxx 8810 เบอร์เดียวกับไลน์อาจารย์ปลอม","Came from 02 xxx 8810, the same number as the fake lecturer LINE"]},
  fakeprof:{i:"👩‍🏫",g:"phone",t:["ไลน์อาจารย์ปลอม","Fake lecturer LINE"],d:["สมัครด้วยเบอร์ 02 xxx 8810","Registered with 02 xxx 8810"]},
  report:{i:"🧾",g:"acct",t:["บัญชีที่ถูกอายัด","The frozen account"],d:["เงินของลุงไหลไปบัญชีปวีณา แล้วต่อไปตึกเดียวกัน","The money went to Paweena's account, then to the same building"]},
  ransom:{i:"🔒",g:"phone",t:["ข้อความขู่ของ ShadowLock","ShadowLock's threats"],d:["ไลน์ข่มขู่สมัครด้วยซิมล็อตเดียวกับ 02 xxx 8810","The threatening LINE uses the same SIM batch as 02 xxx 8810"]},
  charge:{i:"🔌",g:"phone",t:["ตู้ชาร์จปลอม","Fake charging station"],d:["แอปในตู้ส่ง OTP ไปที่เบอร์ 02 xxx 8810","Its app forwards OTPs to 02 xxx 8810"]},
  helper:{i:"🪪",g:"acct",t:["บัญชีขาย “แพ็ก VIP”","The “VIP pass” account"],d:["ปลายทาง: น.ส. ปวีณา (อีกแล้ว!)","Receiving: Ms Paweena (again!)"]},
  publicpc:{i:"⌨️",g:"server",t:["ตัวดักแป้นพิมพ์","Keyloggers"],d:["ส่งข้อมูลที่ดักได้ไปที่ 185.xx.xx.7","They send what they capture to 185.xx.xx.7"]},
  airdrop:{i:"📄",g:"server",t:["ไฟล์มาโครจาก LIB-Printer","Macro file from LIB-Printer"],d:["มาโครโหลดแรนซัมแวร์จาก 185.xx.xx.7","The macro pulls ransomware from 185.xx.xx.7"]},
  rush:{i:"🏦",g:"acct",t:["บัญชีค่าประกันตัว","The bail account"],d:["ปลายทาง: นายสมพงษ์ ร.","Receiving: Mr Sompong R."]},
  video:{i:"📹",g:"phone",t:["เบอร์ \"จ่าสมชาย\"","\"Sgt Somchai\" number"],d:["+66 8x xxx 0912 ซิมชุดเดียวกับ 02 xxx 8810","+66 8x xxx 0912, same SIM batch as 02 xxx 8810"]},
  invest:{i:"📈",g:"acct",t:["บัญชีกลุ่มลงทุนปลอม","Fake investment group accounts"],d:["เงินลงทุนโอนเข้าบัญชี ธนพล ปวีณา สมพงษ์","Deposits went to Thanaphon, Paweena, Sompong"]},
  topup:{i:"💎",g:"acct",t:["QR ขายเพชรนอกระบบ","Off-platform diamond QR"],d:["ปลายทาง: น.ส. ปวีณา (อีกแล้ว!)","Receiving: Ms Paweena (again!)"]},
  trade:{i:"🎮",g:"server",t:["เว็บ game-trade.site","game-trade.site"],d:["อยู่บนเซิร์ฟเวอร์ 185.xx.xx.7","Hosted on 185.xx.xx.7"]},
  secret:{i:"🕶️",g:"phone",t:["บัญชี \"พี่บอส\"","\"Big Bro Boss\" account"],d:["ยืนยันบัญชีด้วยเบอร์ 02 xxx 8810","Verified with number 02 xxx 8810"]},
  parent:{i:"🔎",g:"server",t:["โฆษณาคืนเงินเกมปลอม","Fake game-refund ad"],d:["ลิงก์ไปที่ 185.xx.xx.7","Links to 185.xx.xx.7"]},
  remote:{i:"📱",g:"phone",t:["แอป PEA Refund","The PEA Refund app"],d:["ต่อ 185.xx.xx.7 และให้โทรกลับ 02 xxx 8810","Talks to 185.xx.xx.7, says call 02 xxx 8810"]}
};
const EV_GROUPS = {
  acct:{t:["บัญชีม้าชุดเดียวกัน","One set of mule accounts"],r:["บัญชีรับเงินในหลายเคสซ้ำกัน และทั้งหมดถูกจ้างเปิดโดย \"พี่เจ\"","The same receiving accounts repeat across cases, all opened for \"Jay\""]},
  server:{t:["เซิร์ฟเวอร์เดียวกัน","One server"],r:["เว็บปลอมทุกเว็บอยู่บนเซิร์ฟเวอร์ 185.xx.xx.7","Every fake site lives on server 185.xx.xx.7"]},
  phone:{t:["ซิมชุดเดียวกัน","One SIM batch"],r:["เบอร์ที่โทรหาเหยื่อมาจากซิมล็อตเดียวกัน","The numbers calling victims come from one SIM batch"]}
};
const RANKS=[[0,"ผู้ช่วยฝึกหัด","Trainee helper"],[250,"ผู้ช่วยที่ไว้ใจได้","Trusted helper"],[550,"การ์ดไซเบอร์ฝึกหัด","Cyber guard cadet"],[900,"การ์ดไซเบอร์","Cyber guard"],[1250,"ผู้พิทักษ์เมือง","Guardian of the town"]];
function xp(){ return totalScore() + evCount()*20 + (S.msgStats?S.msgStats.ok*5:0) + Math.floor(((S.mg&&S.mg.sms)||0)/5) + Math.floor(((S.mg&&S.mg.url)||0)/5) + (S.busted?150:0); }
function rankIdx(){ const x=xp(); let r=0; RANKS.forEach((k,i)=>{ if(x>=k[0]) r=i; }); return r; }
const rankName=(i)=>RANKS[i][EN()?2:1];
const MAXZ = Math.max(...MAINZ());
function syncUnlocks(){ /* zones now open chapter by chapter, see progress.js */ }
function checkRank(){ syncUnlocks(); const r=rankIdx(); if(r>S.rank){ S.rank=r; save(); setTimeout(()=>{ toast(L(`เลื่อนยศเป็น "${rankName(r)}"!`,`Promoted to "${rankName(r)}"!`)); sfx("rank"); },700); } }
const evCount = ()=>Object.keys(EVID).filter(k=>S.ev[k]).length;
const isZoneCase = (id)=>Object.values(ZONES).some(z=>z.cases.includes(id));
const PTS = {safe:100, warn:50, danger:0}, STARS={safe:3, warn:2, danger:1}, RANK={danger:0, warn:1, safe:2};
const zoneScore = (z)=>ZONES[z]?ZONES[z].cases.reduce((a,k)=>a+(S.best[k]?PTS[S.best[k]]:0),0):0;
const zoneMax = (z)=>ZONES[z]?ZONES[z].cases.length*100:0;
const zoneFull = (z)=>!!ZONES[z] && zoneScore(z)===zoneMax(z);
const zoneDone = (z)=>!!ZONES[z] && ZONES[z].cases.every(k=>S.best[k]);
const ALLCASES = ()=>Object.values(ZONES).filter(z=>!z.bonus).flatMap(z=>z.cases);
const allDone = ()=>ALLCASES().every(k=>S.best[k]);
const starTotal = ()=>ALLCASES().reduce((a,k)=>a+(S.best[k]?STARS[S.best[k]]:0),0);
const starMax = ()=>ALLCASES().length*3;
/* how well the final raid goes depends on the stars you collected */
function bustTier(){ const f=starTotal()/starMax(); return f>=0.85?3:f>=0.6?2:1; }
const starsHtml = (type, cls="")=>{ const n=type?STARS[type]:0; return `<span class="stars ${cls}" role="img" aria-label="${n}/3">${[0,1,2].map(i=>`<i class="${i<n?"on":""}">★</i>`).join("")}</span>`; };
const starStr = (type)=>{ const n=type?STARS[type]:0; return "★".repeat(n)+"☆".repeat(3-n); };
const barName = (k)=>({money:L("เงิน","Money"),privacy:L("ความเป็นส่วนตัว","Privacy"),trust:L("ความไว้ใจ","Trust")})[k];
const BAR_ICON = {
  money:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="1"/><circle cx="12" cy="12" r="2.6"/></svg>',
  privacy:'<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="1"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>',
  trust:'<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>'
};
const ARROW='<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
const XI='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';

/* ---------- images ---------- */
const IMG={};
function loadImages(){
  const ps=[];
  for(const [id,views] of Object.entries(SPRITES)){
    IMG[id]={};
    for(const [v,d] of Object.entries(views)){ const im=new Image(); im.src=d.src; IMG[id][v]=im; ps.push(im.decode?im.decode().catch(()=>{}):new Promise(r=>{im.onload=r;im.onerror=r;})); }
  }
  return Promise.all(ps);
}
