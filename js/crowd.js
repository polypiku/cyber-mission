/* The crowd, the hidden Wi-Fi hacker, Phop's escort, the infection, money and virus mode. */
/* ---------- the hooded stranger in every shop, his fake Wi-Fi, and the phone repair stall ---------- */
const VIL={x:136,y:500};
const REPAIR={x:1500,y:470};
OUT_SOLIDS.push({x:REPAIR.x-40,y:REPAIR.y-16,w:80,h:28});
const WIFI={
  1:{real:{n:"BeanHouse",how:["รหัสพิมพ์อยู่บนใบเสร็จ","Password is printed on your receipt"]},fakes:[{n:"BeanHouse_FREE",ask:["ล็อกอินด้วย Facebook เพื่อใช้ฟรี","Log in with Facebook to use it free"]},{n:"Free_Fast_5G",ask:["ติดตั้งแอป WiFi Booster ก่อนใช้งาน","Install the WiFi Booster app first"]}]},
  2:{real:{n:"CityLib-Member",how:["รหัสอยู่บนบัตรห้องสมุด","Password is on your library card"]},fakes:[{n:"CityLib_FREE_5G",ask:["ล็อกอินด้วยบัญชี Google เพื่อใช้ฟรี","Sign in with Google to use it free"]},{n:"Free_Library_WiFi",ask:["ติดตั้งโปรไฟล์ VPN ความปลอดภัยก่อนเชื่อมต่อ","Install a security VPN profile to connect"]}]},
  3:{real:{n:"NKT-Guest",how:["รหัสอยู่บนป้ายที่เคาน์เตอร์ธนาคาร","Password is on the sign at the bank counter"]},fakes:[{n:"NKT_Bank_Free",ask:["ล็อกอินแอปธนาคารเพื่อยืนยันตัวตนก่อนใช้เน็ต","Log in to your bank app to verify before browsing"]},{n:"NKT-Secure-Login",ask:["กรอกเลขบัตรประชาชนเพื่อรับสิทธิ์เน็ตฟรี","Enter your ID number for free internet"]}]},
  4:{real:{n:"NETZONE_PC",how:["รหัสอยู่หลังบัตรเวลาที่ซื้อจากเคาน์เตอร์","Password is on the back of your time card"]},fakes:[{n:"NETZONE-FREE-GAMING",ask:["ล็อกอินบัญชีเกมเพื่อรับเพชรฟรี + เน็ตฟรี","Log in to your game account for free gems + Wi-Fi"]},{n:"FreeDiamond_WiFi",ask:["ติดตั้งแอปปั๊มเพชรก่อนเชื่อมต่อ","Install the gem-booster app to connect"]}]}
};
let wifiT=0, vilSay=0;
const vilOn=()=>S.zone>=1 && S.zone<=4 && npcs.some(n=>n.vil);
function nearVillain(){ return false; }
function nearRepair(){ return S.zone===0 && S.char && Math.hypot(player.x-REPAIR.x,player.y-(REPAIR.y+30))<72; }
/* ---------- the crowd: filler people, one of whom may be the Wi-Fi hacker ---------- */
const FILL_SPOTS={
  room:[{x:470,y:262,d:"down"},{x:150,y:430,d:"right"},{x:620,y:330,d:"left"},{x:790,y:330,d:"left"},{x:420,y:500,d:"up"},{x:770,y:500,d:"left"},{x:330,y:440,d:"right"},{x:560,y:236,d:"down"}],
  lib1:[{x:1150,y:640,d:"left"},{x:300,y:850,d:"up"},{x:1150,y:875,d:"up"},{x:480,y:780,d:"right"},{x:860,y:880,d:"up"},{x:150,y:255,d:"right"},{x:590,y:420,d:"down"},{x:1300,y:780,d:"left"},{x:600,y:240,d:"down"},{x:560,y:620,d:"right"},{x:900,y:660,d:"left"},{x:330,y:700,d:"right"},{x:980,y:580,d:"left"},{x:120,y:500,d:"right"},{x:1300,y:540,d:"left"},{x:900,y:200,d:"down"}],
  lib2:[{x:1200,y:300,d:"left"},{x:1300,y:700,d:"left"},{x:560,y:880,d:"up"},{x:840,y:895,d:"up"},{x:1080,y:620,d:"left"},{x:240,y:880,d:"right"},{x:1100,y:260,d:"down"},{x:450,y:420,d:"right"},{x:560,y:320,d:"down"},{x:640,y:640,d:"right"},{x:880,y:640,d:"left"},{x:480,y:560,d:"right"},{x:1300,y:520,d:"left"},{x:1000,y:620,d:"down"},{x:300,y:880,d:"up"}],
  street:[{x:1000,y:380,d:"down"},{x:1700,y:380,d:"down"},{x:260,y:560,d:"right"},{x:620,y:520,d:"right"},{x:1500,y:380,d:"down"},{x:1220,y:530,d:"left"},{x:820,y:540,d:"left"},{x:1320,y:420,d:"down"},{x:1700,y:540,d:"left"},{x:180,y:420,d:"right"},{x:1080,y:560,d:"up"}]
};
let FILL_LINES_=null;
const FL=()=>FILL_LINES_||(FILL_LINES_={
  plain:[[t("รอเพื่อนอยู่น่ะ มาสายประจำ","Waiting for a friend. Always late."),t("ขอนั่งเงียบๆ แป๊บนะ","Just sitting quietly for a bit.")],
    [t("เมื่อวานมี SMS บอกว่าพัสดุตกค้าง เกือบกดแล้ว","Yesterday I got a stuck-parcel SMS. Nearly tapped it."),t("ดีที่ไปเช็กในแอปขนส่งก่อน","Glad I checked the courier app first.")],
    [t("Wi-Fi ที่นี่ต้องถามรหัสที่เคาน์เตอร์นะ","The Wi-Fi here needs a password from the counter."),t("เขาพิมพ์ไว้บนใบเสร็จด้วย","They print it on the receipt too.")],
    [t("ทำงานส่งลูกค้าอยู่ ขอโฟกัสก่อนนะ","Working on a client job, need to focus."),t("ไว้ค่อยคุยกันนะ","Let's chat later.")],
    [t("แบตจะหมดแล้ว หาปลั๊กอยู่","My battery's dying, looking for a socket."),t("เอาหัวชาร์จมาเองด้วย ไม่ใช้สายของใครหรอก","Brought my own adapter. I don't use other people's cables.")],
    [t("ช่วงนี้ข่าวมิจฉาชีพเยอะจัง","So much scam news lately."),t("แม่เราเกือบโอนให้ตำรวจปลอมแล้ว","My mum nearly paid a fake cop.")],
    [t("เล่นเกมรอรถอยู่","Gaming while I wait for my ride."),t("ใช้เน็ตมือถือตัวเองแหละ ชัวร์กว่า","On my own data. Safer.")]],
  vil:[[t("Wi-Fi ร้านช้าจะตาย","The shop Wi-Fi is so slow."),t("ลองต่อตัวที่ชื่อ FREE สิ ไม่ต้องใส่รหัส เร็วกว่าเยอะ","Try the one called FREE. No password, way faster.")],
    [t("จะไปถามรหัสที่เคาน์เตอร์ทำไม","Why bother asking the counter for a password?"),t("มีตัวที่เปิดฟรีอยู่ ต่อได้เลย","There's an open one, just join it.")],
    [t("ต่อเน็ตไม่ได้เหรอ","Can't get online?"),t("ส่งมือถือมาสิ เดี๋ยวพี่ตั้งค่าให้","Hand me your phone, I'll set it up for you.")]]
});
/* is this crowd person a man, a woman, or a teen we won't guess about? */
function fillerSex(id){ const n=(FILL_NAMES[String(id).replace(/^f_/,"")]||[""])[0]; return /ผู้หญิง|สาว|ป้า/.test(n)?"f":/ผู้ชาย|หนุ่ม|ลุง/.test(n)?"m":"x"; }
const susLine=(n)=>{ const s=fillerSex(n.id); return L(s==="f"?"เอ่อ… ฉันแค่…":s==="m"?"เอ่อ… ผมแค่…":"เอ่อ… หนูแค่…","Uh… I was just…"); };
const themEn=(n)=>{ const s=fillerSex(n&&n.id); return s==="f"?"her":s==="m"?"him":"them"; };
function addFillers(){
  const z=S.zone; if(z===5 || !S.char || cbFloor() || (z===8 && isScam(S.bld) && offFloor()>1)) return;
  const used=new Set([S.char,...npcs.map(n=>PLACEHOLDER_ART[n.id]||n.id)]);
  const pool=Object.keys(FILL_NAMES).filter(b=>!used.has(b) && b!=="guardBoy").sort(()=>Math.random()-.5);
  const spots=(z===0?FILL_SPOTS.street:z===2?FILL_SPOTS["lib"+libFloor()]:FILL_SPOTS.room).filter(p=>
    !SOLIDS.some(r=>p.x>r.x-14&&p.x<r.x+r.w+14&&p.y>r.y-8&&p.y<r.y+r.h+8) &&
    !npcs.some(n=>Math.hypot(n.x-p.x,n.y-p.y)<80) && Math.hypot(p.x-432,p.y-540)>90 && !(z===7 && p.x>680 && p.y>250 && p.y<430)).sort(()=>Math.random()-.5);
  const want=z===0?6:z===2?9:z===8?3:4, n=Math.min(want, spots.length), out=[]; while(pool.length&&pool.length<n) pool.push(...pool.slice(0,n-pool.length));
  for(let i=0;i<n;i++){ const sp=spots[i]; out.push({id:"f_"+pool[i%pool.length], role:"filler", filler:true, x:sp.x, y:sp.y, dir:sp.d, home:sp.d, line:Math.floor(Math.random()*FL().plain.length), glance:2+Math.random()*4}); }
  if(z>=1 && z<=4 && out.length && !((S.bustTier||0)>=1) && !(S.caught&&S.caught[z])){ const cand=out.filter(o=>!/kid/.test(o.id)); const v=(cand.length?cand:out)[Math.floor(Math.random()*(cand.length||out.length))]; v.vil=true; v.line=Math.floor(Math.random()*FL().vil.length); VIL.x=v.x; VIL.y=v.y; }
  npcs.push(...out);
}
function stepFillers(dt){
  for(const n of npcs){ if(!n.filler || talking===n) continue;
    if(n.leaving) continue; n.glance-=dt; if(n.glance<=0){ n.glance=3+Math.random()*5; const ds=["left","right","down",n.home]; n.home=ds[Math.floor(Math.random()*ds.length)]; } }
}
function talkFiller(n){
  const ls=n.vil?FL().vil[n.line]:FL().plain[n.line];
  if(!n.vil) n.line=(n.line+1)%FL().plain.length;
  const canReport=S.zone>=1&&S.zone<=4;
  say(n.id, lines(ls), canReport?{choices:[{label:{th:"ไม่มีอะไร ขอบคุณ",en:"Nothing, thanks"},ghost:true},{label:{th:"🚩 แจ้งเคาน์เตอร์ว่าคนนี้น่าสงสัย",en:"🚩 Report this person to the counter"},fn:()=>reportFiller(n)}]}:{});
}
/* ---------- Phop, the cyber police officer, comes in and walks the suspect out ---------- */
let escort=null;
function doorPoint(){
  if(S.zone===2) return libFloor()===1?{x:720,y:LH-56}:{x:LIB_STAIRS.x+LIB_STAIRS.w/2,y:LIB_STAIRS.y+130};
  return {x:432,y:592};
}
function startEscort(sus){
  const d=doorPoint(), mentor=npcs.find(x=>x.id==="guardBoy"&&!x.filler);
  let pol=mentor, back=null;
  if(pol){ back={x:pol.x,y:pol.y,dir:pol.home}; }
  else { pol={id:"police", role:"police", x:d.x, y:d.y+20, dir:"up", home:"up", leaving:true}; npcs.push(pol); }
  pol.leaving=true;
  escort={pol, sus, phase:"in", t:0, back, d};
}
function moveTo(n,x,y,sp,dt){
  const dx=x-n.x, dy=y-n.y, d=Math.hypot(dx,dy); if(d<4) return true;
  const st=Math.min(d,sp*dt); n.x+=dx/d*st; n.y+=dy/d*st; n.moving=true; n.t=(n.t||0)+dt*1.2;
  n.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?"left":"right"):(dy<0?"up":"down"); return false;
}
function stepEscort(dt){
  if(!escort) return; const e=escort, pol=e.pol, sus=e.sus; e.t+=dt;
  if(e.phase==="in"){ const side=sus.x>pol.x?-38:38; if(moveTo(pol,sus.x+side,sus.y,170,dt)){ e.phase="talk"; e.t=0; face(pol,sus); face(sus,pol); sfx("ping"); } return; }
  if(e.phase==="talk"){ pol.dir=pol.x<sus.x?"right":"left"; sus.dir=pol.x<sus.x?"left":"right"; if(e.t>2.6){ e.phase="out"; e.t=0; } return; }
  if(e.phase==="out"){
    const arrived=moveTo(pol,e.d.x,e.d.y,120,dt);
    moveTo(sus,pol.x+(sus.x<pol.x?-22:22)*0, pol.y-30,125,dt);
    if(arrived){ npcs=npcs.filter(x=>x!==sus); if(!e.back) npcs=npcs.filter(x=>x!==pol); else { e.phase="back"; return; }
      escort=null; toast(L("🚓 พี่ภพพาตัวไปขังที่สถานีตำรวจ (ซอย 2) แล้ว Wi-Fi ปลอมในที่นี้ถูกปิด",`🚓 Phop has taken ${themEn(e.sus)} to the cell at the police station (Soi 2). The fake Wi-Fi here is shut down`)); }
    return; }
  if(e.phase==="back"){ if(moveTo(pol,e.back.x,e.back.y,150,dt)){ pol.leaving=false; pol.home=e.back.dir; pol.dir=e.back.dir; escort=null; toast(L("🚓 พี่ภพพาตัวไปขังที่สถานีตำรวจ (ซอย 2) แล้ว Wi-Fi ปลอมในที่นี้ถูกปิด",`🚓 Phop has taken ${themEn(e.sus)} to the cell at the police station (Soi 2). The fake Wi-Fi here is shut down`)); } }
}
function drawEscortTalk(g){
  if(!escort || escort.phase!=="talk") return;
  const e=escort, k=e.t;
  const bub=(n,txt,col)=>{ const h=CHAR_H*(SCALE[n.id]||1); g.font="700 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
    const tw=g.measureText(txt).width+18, x=n.x, y=n.y-h-22; rr(g,x-tw/2,y-12,tw,24,10); g.fillStyle=col; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.fillText(txt,x,y); };
  bub(e.pol, L("ตำรวจไซเบอร์ครับ ขอตรวจเครื่องหน่อย","Cyber police. I need to check your device."),"#DCE8FF");
  if(k>1.2) bub(e.sus, susLine(e.sus),"#FFFFFF");
}
function reportFiller(n){
  const z=S.zone;
  if(n.vil){
    jailList(); S.caught=S.caught||{}; S.caught[z]=true; if(S.hack&&S.hack.zone===z){ S.hack=null; setTimeout(()=>toast(L("การดักข้อมูลหยุดแล้ว มือถือกลับมาปกติ","The interception stopped. Your phone is back to normal")),2600); } S.bars.privacy=Math.min(100,S.bars.privacy+5); addCoins(30); save(); hudKey=""; sfx("good");
    n.vil=false; n.leaving=true; talking=null; S.jailed.push({b:n.id.replace(/^f_/,""), z}); save(); startEscort(n);
    toast(L("✅ แจ้งถูกคน! พี่ภพ ตำรวจไซเบอร์ กำลังมารับตัว (+300 บาท)","✅ Right person! Phop from the cyber police is on his way (+฿300)"));
  } else {
    S.bars.trust=Math.max(0,S.bars.trust-5); S.falseReports=(S.falseReports||0)+1; save(); hudKey=""; sfx("bad");
    toast(L("❌ คนนี้เป็นแค่ลูกค้าธรรมดา ความไว้ใจ −5 สังเกตสัญญาณและคำพูดก่อนแจ้งนะ","❌ Just an ordinary customer. Trust −5. Watch for the signal and listen before reporting."));
  }
}
function drawVilFx(g,now){
  const v=npcs.find(n=>n.vil); if(!v) return;
  const demo=coach&&coach.steps[coach.i]&&coach.steps[coach.i].demo, per=demo?1700:4200, p=RM?.35:(now%per)/1700; if(p>=1) return; // a red ripple every ~4 seconds (held still for reduced motion)
  const h=CHAR_H*(SCALE[v.id]||1), x=v.x+(v.dir==="left"?-10:10), y=v.y-h*.55;
  const R=demo?40:18;
  g.save(); g.lineCap="round"; g.lineWidth=demo?4:2.6; g.strokeStyle=`rgba(229,64,47,${.8*(1-p)})`;
  g.beginPath(); g.arc(x,y,5+p*R,Math.PI*1.2,Math.PI*1.8); g.stroke();
  if(p>.25){ const q=(p-.25)/.75; g.strokeStyle=`rgba(229,64,47,${.6*(1-q)})`; g.beginPath(); g.arc(x,y,5+q*R,Math.PI*1.2,Math.PI*1.8); g.stroke(); }
  g.restore();
}
const COACH_VIL=(M)=>[
  {who:M, i:"🕵️", t:["มีคนแฝงตัวอยู่","Someone is hiding here"], d:["คนที่ปล่อย Wi-Fi ปลอมไม่ได้แต่งตัวแปลกๆ นะ เขาแฝงตัวเป็นลูกค้าธรรมดาปนอยู่กับคนอื่นในทุกร้าน","The person running fake Wi-Fi doesn't look strange. He blends in as an ordinary customer in every shop."]},
  {who:M, i:"📶", demo:true, focus:()=>npcs.find(n=>n.vil)||null, world:()=>{ const v=npcs.find(n=>n.vil); return v?{x:v.x-70,y:v.y-CHAR_H*(SCALE[v.id]||1)-50,w:140,h:CHAR_H*(SCALE[v.id]||1)+70}:null; }, t:["ใครมีคลื่น Wi-Fi ออกมา = น่าสงสัย!","Wi-Fi waves coming off someone = suspicious!"], d:["ดูคนในวงนี้ เห็นคลื่น Wi-Fi สีแดงลอยออกมาจากตัวไหม? จำไว้เลย ใครมีคลื่นแบบนี้ คนนั้นน่าสงสัย! ร้านต่อไปจะไม่บอกแล้ว คลื่นขึ้นทุกไม่กี่วินาที ต้องยืนสังเกตเอง","See the red Wi-Fi waves coming off the person in the circle? Remember: whoever gives off waves like that is your suspect! In later shops nobody will point him out. The waves pop up every few seconds, so stand and watch."]},
  {who:M, i:"👂", t:["ฟังคำพูด","Listen"], d:["ลองเข้าไปคุย คนร้ายมักชวนให้ต่อ Wi-Fi ที่ไม่ต้องใส่รหัส หรืออาสาตั้งค่ามือถือให้ ส่วนคนทั่วไปจะบอกให้ถามรหัสที่เคาน์เตอร์","Chat with people. The hacker pushes a no-password network or offers to set up your phone. Ordinary people tell you to ask the counter."]},
  {who:M, i:"🚩", t:["แจ้งเคาน์เตอร์","Report them"], d:["มั่นใจแล้วกด “🚩 แจ้งเคาน์เตอร์” แจ้งถูก พี่ภพ ตำรวจไซเบอร์ จะมารับตัวไป ได้เงินรางวัล 300 บาท และ Wi-Fi ปลอมในร้านนั้นจะหายไป แจ้งผิดคน ความไว้ใจลด อย่าตัดสินจากหน้าตา","When you're sure, tap “🚩 Report”. Right: Phop from the cyber police takes them away, +฿300, and that shop's fake Wi-Fi is gone. Wrong: trust drops. Never judge by looks."]},
  {who:M, i:"📱", t:["ถ้าหาไม่ทัน","If you're too slow"], d:["ถ้าเผลอต่อ Wi-Fi ปลอม จอจะเริ่มกระตุกแปลกๆ ยิ่งปล่อยนานยิ่งหนัก รีบเปิดมือถือกด “ตัดการเชื่อมต่อ” หรือจับคนร้ายให้ทัน ไม่งั้นเครื่องพังทั้งเครื่อง","Join a fake Wi-Fi by mistake and the screen starts glitching, worse the longer you wait. Open your phone and tap “Disconnect”, or catch the hacker in time, or the whole phone dies."]}
];
function stepWifi(dt){
  vilSay+=dt;
  if(!vilOn() || !S.intro || S.phoneBroken || (S.wifi&&S.wifi[S.zone]) || busy()) return;
  if(S.zone!==1 && !S.seen[S.zone]) return;
  wifiT+=dt;
  if(!(S.tut&&S.tut.vil)){ if(S.zone===1 && doneCount()<1) return; if(wifiT<3 || coach) return; S.tut=S.tut||{}; S.tut.vil=true; save(); const m=npcs.find(n=>n.role==="mentor"); startCoach(COACH_VIL(m?m.id:"guardGirl")); wifiT=3; return; }
  const v=npcs.find(n=>n.vil), close=v&&Math.hypot(player.x-v.x,player.y-v.y)<120;
  if((close && wifiT>6) || wifiT>45){ wifiT=-999; sfx("ping"); toast(L("📶 มือถือเจอ Wi-Fi ฟรีหลายตัว…","📶 Your phone found several free Wi-Fi networks…")); setTimeout(()=>{ if(!busy()) openWifi(); else wifiT=20; },700); }
}
function drawVillain(g,now){
  if(!vilOn()) return;
  const {x,y}=VIL, k=RM?0:now;
  g.save();
  g.fillStyle="rgba(0,0,0,.28)"; g.beginPath(); g.ellipse(x,y+14,24,7,0,0,7); g.fill();
  // body: hood + slumped shoulders, pure silhouette
  g.fillStyle="#15161C"; g.strokeStyle="#000"; g.lineWidth=2.5;
  g.beginPath(); g.moveTo(x-22,y+8); g.quadraticCurveTo(x-26,y-30,x-12,y-40); g.lineTo(x+12,y-40); g.quadraticCurveTo(x+26,y-30,x+22,y+8); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(x,y-54,17,19,0,0,7); g.fill(); g.stroke();
  g.fillStyle="#000"; g.beginPath(); g.ellipse(x+3,y-50,11,12,0,0,7); g.fill(); // face hidden in the hood
  const blink=Math.floor(k/2600)%6===0 && (k%2600)<140;
  if(!blink){ g.fillStyle="#FF3B3B"; g.shadowColor="#FF3B3B"; g.shadowBlur=8; g.fillRect(x-2,y-53,4,2.5); g.fillRect(x+6,y-53,4,2.5); g.shadowBlur=0; }
  // laptop on lap with a green glow
  g.fillStyle="#2A2E38"; g.beginPath(); g.moveTo(x-4,y-14); g.lineTo(x+26,y-14); g.lineTo(x+30,y-4); g.lineTo(x,y-4); g.closePath(); g.fill(); g.stroke();
  g.fillStyle="rgba(127,255,170,"+(.35+.2*Math.sin(k/300))+")"; g.beginPath(); g.ellipse(x+14,y-22,18,10,0,0,7); g.fill();
  // Wi-Fi arcs pulsing out of the laptop
  if(!(S.wifi&&S.wifi[S.zone]==="ok")){
    g.lineCap="round";
    for(let i=0;i<3;i++){ const p=((k/700)+i/3)%1; g.strokeStyle=`rgba(255,59,59,${(1-p)*.8})`; g.lineWidth=3; g.beginPath(); g.arc(x+14,y-80,8+p*26,Math.PI*1.2,Math.PI*1.8); g.stroke(); }
    g.fillStyle="#FF3B3B"; g.beginPath(); g.arc(x+14,y-80,3,0,7); g.fill();
  }
  // muttering bubble now and then
  if(vilSay%9<3.2){
    const s=S.phoneBroken?L("หึหึ… ได้ข้อมูลแล้ว","Heh… got your data"):L("Wi-Fi ฟรีนะ… ต่อเลย 😏","Free Wi-Fi… go on 😏");
    g.font="700 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
    const tw=g.measureText(s).width+18, by=y-112;
    rr(g,x+14-tw/2,by-12,tw,24,8); g.fillStyle="#1B1E26"; g.fill(); g.lineWidth=2; g.strokeStyle="#000"; g.stroke();
    g.fillStyle="#FFD3D3"; g.fillText(s,x+14,by);
  }
  g.restore();
}
function drawRepair(g,now){
  const {x,y}=REPAIR;
  g.fillStyle="rgba(0,0,0,.2)"; g.beginPath(); g.ellipse(x,y+16,46,9,0,0,7); g.fill();
  // poles + striped awning
  g.fillStyle="#7A5233"; g.fillRect(x-38,y-86,5,96); g.fillRect(x+33,y-86,5,96);
  for(let i=0;i<6;i++){ g.fillStyle=i%2?"#FFFFFF":"#2F6DB5"; g.fillRect(x-44+i*15,y-98,15,18); }
  g.lineWidth=2.5; g.strokeStyle=INK; g.strokeRect(x-44,y-98,90,18);
  for(let i=0;i<6;i++){ g.fillStyle=i%2?"#FFFFFF":"#2F6DB5"; g.beginPath(); g.arc(x-36.5+i*15,y-80,7.5,0,Math.PI); g.fill(); g.stroke(); }
  // counter
  rr(g,x-40,y-28,80,40,4); g.fillStyle="#F2C14E"; g.fill(); g.lineWidth=3; g.stroke();
  g.fillStyle=INK; g.font="800 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  g.fillText(S.lang==="en"?"PHONE DR.":"หมอโฟน",x,y-12); g.font="600 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"repairs":"ซ่อมมือถือ",x,y+2);
  // phones on the counter
  for(const dx of [-26,-10,20]){ rr(g,x+dx,y-42,10,16,2); g.fillStyle="#16181B"; g.fill(); g.lineWidth=1.5; g.stroke(); g.fillStyle="#7CC8F2"; g.fillRect(x+dx+2,y-40,6,10); }
  // a spinning wrench sign when your phone needs help
  if(S.phoneBroken){ const b=RM?0:Math.sin(now/200)*3; rr(g,x-30,y-136+b,60,26,13); g.fillStyle="#E5402F"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); g.fillStyle="#FFFFFF"; g.font="800 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(L("🔧 ซ่อม","🔧 Fix"),x,y-122+b); }
}
function wifiPhone(inner){
  return `<div class="device"><span class="island"></span><div class="scr">${sbar(nowClock())}${inner}<div class="homebar"></div></div></div>`;
}
const WIFI_ICON=(lock)=>`<span class="wfi">📶${lock?"<i>🔒</i>":""}</span>`;
function openWifi(){
  const z=S.zone, w=WIFI[z]; if(!w || S.phoneBroken) return;
  const ord=shuffle(3), nets=[{kind:"real",n:w.real.n},{kind:"fake",i:0,n:w.fakes[0].n},{kind:"fake",i:1,n:w.fakes[1].n}];
  const rows=ord.map(i=>{ const it=nets[i]; return `<button class="crow wrow" data-net="${it.kind}${it.kind==="fake"?it.i:""}">${WIFI_ICON(it.kind==="real")}<span class="cb"><b>${esc(it.n)}</b><small>${it.kind==="real"?L("ต้องใช้รหัสผ่าน","Password required"):L("เปิด · ไม่ต้องใส่รหัส","Open · no password")}</small></span><span class="sig">${it.kind==="real"?"▂▄▆":"▂▄▆█"}</span></button>`; }).join("");
  openSheet("wifi", `${top_(L("Wi-Fi","Wi-Fi"))}<div class="sh-body">
    <div class="wcomic"><span class="wv">📶</span><p>${L("มือถือเจอ Wi-Fi หลายตัวในร้าน… บางตัวอาจมีคนแอบปล่อยไว้","Your phone finds several Wi-Fi networks here… someone may have planted one of them.")}</p></div>
    ${wifiPhone(`<div class="apptitle">${L("เลือกเครือข่าย","Choose a network")}</div><div class="clist">${rows}
      <button class="crow wrow" data-net="data"><span class="wfi">📱</span><span class="cb"><b>${L("ไม่ต่อ ใช้เน็ตมือถือตัวเอง","Don't connect, use my own data")}</b><small>${L("4G / 5G ของคุณ","Your 4G / 5G")}</small></span><span></span></button></div>`)}
    <div id="wifiOut"></div></div>`);
  $("sheet").querySelectorAll("[data-net]").forEach(b=>b.onclick=()=>pickWifi(b.dataset.net));
}
function wifiDone(ok, msg, dv){
  S.wifi[S.zone]=ok?"ok":"bad"; if(dv) S.bars.privacy=Math.max(0,Math.min(100,S.bars.privacy+dv));
  save(); hudKey=""; sfx(ok?"good":"bad");
  $("sheet").querySelector(".sh-body").innerHTML=`<div class="endcard ${ok?"safe":"danger"}"><b>${ok?L("ปลอดภัย!","Safe!"):L("โดนแฮก!","Hacked!")}</b><p style="margin:.3em 0 0">${msg}</p>${dv?`<span class="delta ${dv>0?"up":"down"}">${barName("privacy")} ${dv>0?"+":"−"}${Math.abs(dv)}</span>`:""}${!ok&&coinFx.length?coinTag(coinFx[coinFx.length-1].n):""}</div>
    <div class="btns"><button class="btn ${ok?"y":""}" data-close><span>${ok?L("ไปต่อ","Carry on"):L("ไปร้านซ่อมมือถือ","Go to the repair stall")}</span></button></div>`;
  wireSheet();
}
function pickWifi(k){
  const z=S.zone, w=WIFI[z];
  S.onWifi=S.onWifi||{};
  if(k==="data"){ S.onWifi[z]=false; return wifiDone(true, L("ไม่ต่อ Wi-Fi ที่ไม่รู้ที่มา ใช้เน็ตมือถือตัวเองปลอดภัยที่สุด โดยเฉพาะตอนทำธุรกรรม","Skipping unknown Wi-Fi and using your own data is safest, especially for banking."), 4); }
  if(k==="real"){
    $("wifiOut").innerHTML=`<div class="wpw"><b>🔒 ${esc(w.real.n)}</b><p>${w.real.how[EN()?1:0]}</p><div class="btns">${btn(L("ถามร้านแล้วใส่รหัส","Ask the shop & enter it"),'data-pw="1"',"y")}<button class="btn g" data-pw="0"><span>${L("ยกเลิก","Cancel")}</span></button></div></div>`;
    $("wifiOut").querySelector('[data-pw="1"]').onclick=()=>(S.onWifi[z]=true, wifiDone(true, L(`ต่อ ${w.real.n} ที่ร้านแจกรหัสเอง ชื่อตรงกับที่ร้านบอก ใช้งานได้ แต่ถ้าจะโอนเงินก็ยังควรใช้เน็ตมือถือ`,`You joined ${w.real.n} with the password from staff, so the name matches. Still, use mobile data for banking.`), 3));
    $("wifiOut").querySelector('[data-pw="0"]').onclick=()=>{ $("wifiOut").innerHTML=""; };
    return;
  }
  const f=w.fakes[+k.slice(4)];
  $("wifiOut").innerHTML=`<div class="wportal"><div class="wph">📶 ${esc(f.n)} · ${L("เชื่อมต่อแล้ว","connected")}</div><p><b>${L("ยินดีต้อนรับ! เน็ตฟรีไม่จำกัด","Welcome! Unlimited free internet")}</b><br>${f.ask[EN()?1:0]}</p>
    <div class="btns"><button class="btn" data-go="1"><span>${L("ตกลง ทำตามเลย","OK, do it")}</span></button><button class="btn g" data-go="0"><span>${L("ไม่เอา ตัดการเชื่อมต่อ","No, disconnect")}</span></button></div></div>`;
  $("wifiOut").querySelector('[data-go="1"]').onclick=()=>{
    const lost=addCoins(-30); S.wifi[z]="bad"; S.onWifi[z]=true; S.hack={zone:z,net:f.n,p:0}; S.bars.privacy=Math.max(0,S.bars.privacy-5); save(); hudKey=""; sfx("bad");
    $("sheet").querySelector(".sh-body").innerHTML=`<div class="endcard danger"><b>⚠ ${L("เชื่อมต่อ Wi-Fi ปลอมแล้ว!","You joined a fake Wi-Fi!")}</b><p style="margin:.3em 0 0">${L(`${esc(f.n)} กำลังดักข้อมูลและแอบติดตั้งมัลแวร์ จอจะเริ่มกระตุก ยิ่งปล่อยนานยิ่งหนัก จนเครื่องใช้ไม่ได้`,`${esc(f.n)} is intercepting your data and sneaking in malware. Your screen will start glitching, worse the longer you leave it, until the phone dies.`)}</p>${lost?coinTag(lost):""} <span class="delta down">${barName("privacy")} −5</span></div>
      <div class="box"><h4>${L("รีบทำอย่างใดอย่างหนึ่ง","Act fast, either")}</h4><ul class="list"><li>${L("เปิดมือถือ 📱 แล้วกด “ตัดการเชื่อมต่อ” ทันที","Open your phone 📱 and tap “Disconnect” right away")}</li><li>${L("หาคนที่ปล่อย Wi-Fi ปลอม (คลื่นสีแดงจางๆ) แล้วแจ้งเคาน์เตอร์","Find whoever runs the fake Wi-Fi (faint red ripples) and report them")}</li></ul></div>
      <div class="btns"><button class="btn y" data-close><span>${L("เข้าใจแล้ว","Got it")}</span></button></div>`;
    wireSheet();
  };

  $("wifiOut").querySelector('[data-go="0"]').onclick=()=>{ sfx("ping"); $("wifiOut").innerHTML=`<div class="endcard"><b>${L("รอดไปหวุดหวิด","Close call")}</b><p style="margin:.3em 0 0">${L("Wi-Fi ฟรีที่ขอให้ล็อกอิน กรอก OTP หรือติดตั้งแอป คือกับดัก ลองเลือกใหม่","Free Wi-Fi that wants a login, an OTP or an app install is a trap. Pick again.")}</p></div>`; };
}
function talkVillain(){
  target=null; keys.clear();
  if(S.wifi[S.zone] || S.phoneBroken){ sfx("blip"); toast(S.phoneBroken?L("คนแปลกหน้าหัวเราะเบาๆ “ขอบใจสำหรับรหัสนะ”","The stranger chuckles: “Thanks for the password.”"):L("คนแปลกหน้าหันหน้าหนี พิมพ์อะไรรัวๆ ในโน้ตบุ๊ก","The stranger turns away and types fast on a laptop.")); return; }
  openWifi();
}
/* ---------- a fake-Wi-Fi infection grows: glitches get worse until the phone dies ---------- */
const HACK_SECS=40;
let flickT=0, gpopT=0;
function stepHack(dt){
  const on=!!S.hack && !S.phoneBroken;
  const el=$("glitch"); el.hidden=!on; $("phoneBtn").classList.toggle("infect",on && S.hack.p>.3);
  if(!on){ $("stage").classList.remove("flick"); return; }
  const p=S.hack.p;
  el.style.setProperty("--a",Math.min(1,p*1.15).toFixed(3));
  el.classList.toggle("lv2",p>.33); el.classList.toggle("lv3",p>.66);
  if(busy()) return;
  S.hack.p=Math.min(1,p+dt/HACK_SECS*(S.items.vpn?.5:1));
  if(!RM && (flickT-=dt)<=0){ flickT=Math.max(.35,4.5-p*4)+Math.random()*1.2; $("stage").classList.add("flick"); setTimeout(()=>$("stage").classList.remove("flick"),90+p*220); if(p>.5) sfx("tick"); }
  if(!RM && p>.66 && (gpopT-=dt)<=0){ gpopT=1.8+Math.random(); const d=document.createElement("div"); d.className="vpop"; d.textContent=VPOP[Math.floor(Math.random()*VPOP.length)][EN()?1:0]; d.style.left=(8+Math.random()*60)+"%"; d.style.top=(22+Math.random()*50)+"%"; el.appendChild(d); setTimeout(()=>d.remove(),1500); }
  if(S.hack.p>=1){
    const h=S.hack; S.hack=null;
    S.phoneBroken={zone:h.zone,net:h.net}; S.bars.money=Math.max(0,S.bars.money-5); S.virusStrikes=0; takeBreakSnap(); save(); hudKey=""; sfx("bad");
    toast(L("📵 สายไปแล้ว! มือถือถูกยึดทั้งเครื่อง ไปซ่อมที่ร้านริมถนน","📵 Too late! The phone's been taken over. Get to the street repair stall"));
  }
}
function openHackWarn(){
  const h=S.hack, pct=Math.round(h.p*100);
  openSheet("phone", `${top_(L("โทรศัพท์ของคุณ","Your phone"))}<div class="sh-body"><div class="device ghack" style="--a:${h.p}"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <div class="apptitle">Wi-Fi</div><div class="clist"><div class="crow wrow"><span class="wfi">📶</span><span class="cb"><b>${esc(h.net)}</b><small>${L("เชื่อมต่อแล้ว · ไม่ปลอดภัย","Connected · not secure")}</small></span><span class="sig">▂▄▆█</span></div></div>
    <div class="hkbar"><span>${L("กิจกรรมแปลกปลอม","Suspicious activity")}</span><i style="width:${pct}%"></i><b>${pct}%</b></div><div class="homebar"></div></div></div>
    <div class="btns col"><button class="btn y" data-disc><span>✂ ${L("ตัดการเชื่อมต่อ และลืมเครือข่ายนี้","Disconnect and forget this network")}</span></button><button class="btn g" data-close><span>${L("ปิด","Close")}</span></button></div></div>`);
  $("sheet").querySelector("[data-disc]").onclick=()=>{
    const late=S.hack.p>.66;
    if(late){ S.hack.p=1; closeSheet(); toast(L("สายไปแล้ว… มัลแวร์ติดตั้งเสร็จก่อนตัดการเชื่อมต่อ","Too late… the malware finished installing before you disconnected")); return; }
    S.hack=null; save(); hudKey=""; sfx("good"); closeSheet();
    toast(L("✂ ตัดการเชื่อมต่อทัน! อย่าลืมเปลี่ยนรหัสผ่านที่พิมพ์ไปตอนต่อ Wi-Fi นั้นด้วย","✂ Disconnected in time! Remember to change any password you typed on that Wi-Fi"));
  };
}
/* if the phone is left hacked, you lose everything */
let cryUntil=0;
function takeBreakSnap(){ const c={...S}; delete c.preBreak; S.preBreak=JSON.stringify({s:c, x:player.x, y:player.y, floor:S.floor}); }
function rewindBreak(){
  if(!S.preBreak) return false;
  const snap=JSON.parse(S.preBreak), keep=snap.s;
  Object.keys(S).forEach(k=>delete S[k]); Object.assign(S,keep); S.preBreak=JSON.stringify(snap); S.virusStrikes=0;
  setWorld(); buildCast(); drawStatic(); player.x=snap.x; player.y=snap.y; target=null; keys.clear(); hackT=30; cryUntil=0; save(); hudKey=""; hud();
  return true;
}
function playPhoneLoss(){
  const lostCoins=S.coins;
  openCutscene(L("ฉากจบพิเศษ · เสียทุกอย่าง","Special ending · Everything lost"),[
    P("#0A0B0F","📱☠️⏰",["คุณไม่ได้เอามือถือไปซ่อม… มัลแวร์ทำงานต่อทั้งคืน","You never got the phone fixed… the malware ran all night."]),
    P("#3A0606","🏦➡️💸💸💸",[`แอปธนาคารถูกเปิดเอง เงินในบัญชีถูกโอนออกจนหมด เงิน ${BAHT(lostCoins)} ในกระเป๋าหายไปด้วย`,`Your bank app opened by itself and the account was drained. Your ${BAHT(lostCoins)} are gone too.`]),
    P("#2A231C","🖼️💬📤",["รูปส่วนตัว แชต และรายชื่อเพื่อนถูกส่งออกไป เพื่อนๆ ได้ข้อความจากบัญชีของคุณ “ขอยืมเงินด่วน”","Private photos, chats and contacts were copied out. Friends got messages from your account: “urgent, can I borrow money?”"]),
    P("#22344A","🪑😭💧",["คุณนั่งร้องไห้อยู่ริมถนน ทุกอย่างหายไปในคืนเดียว","You sit crying by the road. Everything gone in one night."],[["me","ถ้ารีบไปซ่อมตั้งแต่แรก… คงไม่เป็นแบบนี้","If I'd fixed it straight away… this wouldn't have happened."]]),
    P("#7A0F0F",`<div class="cs-news"><b>📺 ข่าวด่วน · BREAKING</b><span>${L("ข้อมูลส่วนตัวรั่วไหลกว่า 12,000 ราย! พบรูป แชต และเลขบัญชีถูกขายในกลุ่มลับ","Over 12,000 people's data leaked! Photos, chats and account numbers sold in secret groups")}</span><i>${L("หนึ่งในนั้นคือ… คุณ","One of them is… you")}</i></div>`,["ข่าวคืนนั้นออกทุกช่อง ข้อมูลจากมือถือของคุณกลายเป็นส่วนหนึ่งของข้อมูลรั่วไหลครั้งใหญ่","That night it's on every channel. The data from your phone is part of a huge leak."]),
    P("#173E3C","🧑‍🔧📱",["หมอโฟนช่วยล้างเครื่องให้ แต่ข้อมูลและเงินที่เสียไป ไม่มีวันกลับมา","Phone Dr. wipes the phone for you, but the lost data and money will never come back."],[["me","ต่อไปนี้ถ้าเครื่องโดนแฮก จะรีบตัดเน็ต ซ่อม แล้วเปลี่ยนรหัสทันที","From now on, if I'm hacked, I'll disconnect, fix it and change passwords right away."]])
  ],()=>lossCard());
}
function lossCard(){
  openSheet("unlock", `<div class="unlockhero" style="background:#7A0F0F"><span class="eyebrow">GAME OVER</span><div class="ubig">${L("ข้อมูลรั่วไหล","Data leaked")}</div><p>${L("มือถือติดไวรัสนานเกินไป จนเสียทั้งเงินและข้อมูล","The phone stayed infected too long. Money and data, all gone.")}</p></div>
    <div class="sh-body"><div class="box"><h4>${L("ถ้าย้อนกลับไปได้ ต้องทำแบบนี้","If you could go back, do this")}</h4><ul class="list">
      <li>${L("ตัดเน็ตทันทีที่รู้ว่าเครื่องติดไวรัส","Disconnect the moment you know it's infected")}</li>
      <li>${L("รีบไปซ่อม (ร้านหมอโฟนริมถนน) ภายใน 30 วินาที","Get to the repair stall (Phone Dr., by the road) within 30 seconds")}</li>
      <li>${L("ล้างเครื่อง เปลี่ยนรหัสทุกบัญชี เปิด 2FA แจ้งธนาคาร","Wipe it, change every password, turn on 2FA, tell the bank")}</li></ul></div>
    <p><b>${L("กลับไปแก้ใหม่อีกครั้ง!","Go back and fix it!")}</b> ${L("ย้อนเวลาไปตอนที่มือถือเพิ่งพัง แล้ววิ่งไปซ่อมให้ทัน","Rewind to the moment the phone died and make it to the repair stall in time.")}</p>
    <div class="btns">${btn(L("⏪ ย้อนกลับไปแก้ใหม่","⏪ Go back and fix it"),"data-rewind","y")}<button class="btn g" data-acceptloss><span>${L("ยอมรับผลแล้วเล่นต่อ","Accept it and carry on")}</span></button></div></div>`);
  $("sheet").querySelector("[data-rewind]").onclick=()=>{ closeSheet(); if(rewindBreak()){ sfx("ping"); toast(L("⏪ ย้อนกลับมาแล้ว! มือถือเพิ่งพัง รีบไปร้านหมอโฟนให้ทันใน 30 วินาที","⏪ Rewound! Your phone just died. Get to Phone Dr. within 30 seconds")); } else acceptLoss(); };
  $("sheet").querySelector("[data-acceptloss]").onclick=()=>{ closeSheet(); acceptLoss(); };
}
function acceptLoss(){
  {
    if(!S.items.cloud) S.coins=0; S.bars.money=5; S.bars.privacy=5; S.bars.trust=Math.max(0,S.bars.trust-20); S.phoneBroken=null; S.hack=null; S.preBreak=null; S.phoneLosses=(S.phoneLosses||0)+1; save(); hudKey=""; hud();
    cryUntil=performance.now()+20000; sfx("bad");
    toast(L("มือถือถูกล้างเครื่องแล้ว แต่เงินและข้อมูลหายหมด…","The phone has been wiped, but your money and data are gone…"));
  }
}
function openHacked(){
  openSheet("phone", `${top_(L("โทรศัพท์ของคุณ","Your phone"))}<div class="sh-body"><div class="device hacked"><span class="island"></span><div class="scr">
    <div class="hk"><div class="hk-ico">☠</div><b>${L("เครื่องนี้ถูกควบคุม","THIS DEVICE IS LOCKED")}</b><p>${L("ข้อมูลของคุณถูกส่งออกไปแล้ว…","Your data has been sent…")}</p><code>${esc(S.phoneBroken.net)} › 10.0.0.66</code></div><div class="homebar"></div></div></div>
    <div class="endcard danger" style="margin-top:14px"><b>📵 ${L("มือถือใช้ไม่ได้","Phone unusable")}</b><p style="margin:.3em 0 0">${L("รับเคสหรืออ่านข้อความไม่ได้จนกว่าจะซ่อม ออกไปที่ถนนแล้วหาแผง “หมอโฟน” หน้าร้าน NET ZONE","You can't take cases or read messages until it's fixed. Go out to the street and find the “Phone Dr.” stall by NET ZONE.")}</p></div></div>`);
}
const REPAIR_OPTS=[
  {ok:true, t:["ล้างเครื่องกลับค่าโรงงาน + เปลี่ยนรหัสทุกบัญชี + เปิด 2FA + แจ้งธนาคาร","Factory reset + change every password + turn on 2FA + tell the bank"], why:["ครบถ้วน! ล้างมัลแวร์ออกหมด และรหัสที่หลุดไปก็ใช้ไม่ได้แล้ว","Complete! The malware is gone and the leaked passwords are useless now"]},
  {ok:false,t:["แค่ลบแอปแปลกๆ ทิ้งก็พอ","Just delete the weird app"], why:["ยังไม่พอ มัลแวร์อาจซ่อนอยู่ และรหัสที่พิมพ์ไปแล้วก็หลุดไปแล้ว ต้องเปลี่ยนรหัสด้วย","Not enough: malware can hide, and the passwords you typed already leaked"]},
  {ok:false,t:["ปิดเครื่องแล้วเปิดใหม่","Turn it off and on again"], why:["รีสตาร์ตไม่ได้ลบมัลแวร์ และไม่ช่วยเรื่องรหัสที่หลุด","A restart doesn't remove malware or fix leaked passwords"]},
  {ok:false,t:["เปลี่ยนรหัสผ่านจากเครื่องนี้เลยตอนนี้","Change passwords on this phone right now"], why:["ถ้าเครื่องยังติดมัลแวร์ รหัสใหม่ก็โดนดักอีก ต้องล้างเครื่องก่อน หรือเปลี่ยนจากเครื่องอื่น","If the phone is still infected the new passwords get stolen too. Clean it first, or use another device"]}
];
function openRepair(){
  target=null; keys.clear();
  if(!S.phoneBroken){ openShop(L("“มือถือปกติดี จะซื้ออะไรเพิ่มไหม ช่วงนี้ Wi-Fi ปลอมระบาดหนักเลย”","“Your phone's fine. Want an upgrade? Fake Wi-Fi is everywhere lately.”")); return; }
  if(false){ openSheet("repair", `${top_(L("หมอโฟน · ซ่อมมือถือ","Phone Dr. · repairs"))}<div class="sh-body"><div class="wcomic"><span class="wv">🧑‍🔧</span><p>${L("“มือถือปกติดีนี่ ระวัง Wi-Fi ฟรีในร้านนะ ช่วงนี้มีคนโดนกันเยอะ”","“Your phone's fine. Watch out for free Wi-Fi in the shops, lots of people are getting caught.”")}</p></div><div class="btns"><button class="btn g" data-close><span>${L("ปิด","Close")}</span></button></div></div>`); return; }
  const ord=shuffle(REPAIR_OPTS.length);
  openSheet("repair", `${top_(L("หมอโฟน · ซ่อมมือถือ","Phone Dr. · repairs"))}<div class="sh-body">
    <div class="wcomic"><span class="wv">🧑‍🔧</span><p>${L(`“โดน Wi-Fi ปลอม ${esc(S.phoneBroken.net)} มาสินะ… จะให้แก้แบบไหนดี”`,`“Caught by the fake ${esc(S.phoneBroken.net)} hotspot, eh… how should we fix it?”`)}</p></div>
    <div class="opts">${ord.map(i=>`<button class="fixopt" data-fix="${i}">${REPAIR_OPTS[i].t[EN()?1:0]}</button>`).join("")}</div><div id="fixOut"></div></div>`);
  $("sheet").querySelectorAll("[data-fix]").forEach(b=>b.onclick=()=>{
    const o=REPAIR_OPTS[+b.dataset.fix];
    if(!o.ok){ sfx("bad"); b.disabled=true; b.classList.add("dim"); $("fixOut").innerHTML=`<div class="endcard danger"><b>${L("ช่างส่ายหน้า","The repairer shakes his head")}</b><p style="margin:.3em 0 0">${o.why[EN()?1:0]}</p></div>`; return; }
    const free=false; const paid=addCoins(-40);
    S.phoneBroken=null; S.virusStrikes=0; S.preBreak=null; S.bars.privacy=Math.min(100,S.bars.privacy+5); S.repairs=(S.repairs||0)+1; save(); hudKey=""; sfx("good");
    $("sheet").querySelector(".sh-body").innerHTML=`<div class="endcard safe"><b>📱 ${L("ซ่อมเสร็จ!","Fixed!")}</b><p style="margin:.3em 0 0">${o.why[EN()?1:0]}</p>${free?`<span class="delta up">🧯 ${L("ประกันจ่ายให้ ซ่อมฟรี","Insurance paid, free repair")}</span>`:paid?`${coinTag(paid)} <small>${L("ค่าซ่อม","repair fee")}</small>`:`<span class="delta">${L("เงินไม่พอ ช่างซ่อมให้ฟรีครั้งนี้","Not enough money, he fixed it free this time")}</span>`} <span class="delta up">${barName("privacy")} +5</span></div>
      <div class="btns"><button class="btn y" data-close><span>${L("ขอบคุณครับ","Thanks")}</span></button><button class="btn g" data-shop><span>🛒 ${L("ดูร้านอัปเกรด","See upgrades")}</span></button></div>`;
    wireSheet(); toast(L("มือถือกลับมาใช้ได้แล้ว","Your phone works again"));
  });
}
/* ---------- coins: earned by doing the right thing, drained by scams, spent on upgrades ---------- */
let coinFx=[];
const BAHT=(n)=>{ const v=(Math.round(n)*10).toLocaleString("en-US"); return L(`${v} บาท`,`฿${v}`); };
function addCoins(n){
  if(!n) return 0; const before=S.coins; S.coins=Math.max(0,S.coins+n); const d=S.coins-before; if(!d) return 0;
  coinFx.push({n:d,t:0}); save(); hudKey=""; return d;
}
function drawCoinFx(g,dt){
  coinFx=coinFx.filter(f=>(f.t+=dt)<1.6);
  coinFx.forEach((f,i)=>{ const a=1-f.t/1.6, y=player.y-CHAR_H-40-f.t*34-i*20;
    g.save(); g.globalAlpha=a; g.font="800 16px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.lineWidth=4; g.strokeStyle="#FFFFFF";
    const s=(f.n>0?"+":"−")+BAHT(Math.abs(f.n)); g.strokeText(s,player.x,y); g.fillStyle=f.n>0?"#B5651D":"#E5402F"; g.fillText(s,player.x,y); g.restore(); });
}
const coinTag=(n)=>`<span class="delta ${n>0?"up":"down"}">💵 ${n>0?"+":"−"}${BAHT(Math.abs(n))}</span>`;
const SHOP=[
  {id:"pwm", i:"🔑", n:["ตัวจัดการรหัสผ่าน","Password manager"], d:["ตอนตั้งรหัสใหม่ในมือถือ กดปุ่มเดียวได้รหัสยาวและเดายาก","When setting a new password, one tap makes a long, unguessable one"], p:150},
  {id:"vpn", i:"🛰️", n:["VPN","VPN"], d:["เข้ารหัสการเชื่อมต่อ ถ้าเผลอต่อ Wi-Fi ปลอม ไวรัสจะลามช้าลงครึ่งหนึ่ง","Encrypts your connection. On a fake Wi-Fi, malware spreads half as fast"], p:120},
  {id:"cloud", i:"☁️", n:["สำรองข้อมูลคลาวด์","Cloud backup"], d:["ถ้ามือถือพังจนกู้ไม่ได้ เงินในกระเป๋าไม่หาย","If the phone is lost to malware, you keep your money"], p:100},
  {id:"lens", i:"🔍", n:["อัปเกรดแว่นนักสืบ","Detective lens upgrade"], d:["ส่องได้ไกลขึ้น และเห็นเบาะแสที่ซ่อนลึกกว่าเดิม","Sweeps further and reveals better-hidden clues"], lv:[0,0,120,220]}
];
const shopPrice=(it)=>it.lv?it.lv[Math.min(3,(S.items.lens||0)+1)]:it.p;
const shopOwned=(it)=>it.lv?(S.items.lens||0)>=3:!!S.items[it.id];
function openShop(msg){
  const card=(it)=>{ const own=shopOwned(it), pr=shopPrice(it), poor=S.coins<pr, lv=it.lv?(S.items.lens||0):0;
    return `<div class="shopit ${own?"own":""}"><span class="si">${it.i}</span><div class="sb"><b>${it.n[EN()?1:0]}${it.lv?` <em>${L("ระดับ","Lv")} ${lv}${own?"":" → "+(lv+1)}</em>`:""}</b><small>${it.d[EN()?1:0]}</small></div>
      <button class="buy" data-buy="${it.id}" ${own||poor||(it.lv&&!lv)?"disabled":""}>${own?L(it.lv?"สูงสุด":"มีแล้ว",it.lv?"Max":"Owned"):it.lv&&!lv?L("รับจากพี่ภพ","From Phop"):BAHT(pr)}</button></div>`; };
  openSheet("shop", `${top_(L("หมอโฟน · อัปเกรดมือถือ","Phone Dr. · phone upgrades"))}<div class="sh-body">
    <div class="wallet"><span>${L("เงินในกระเป๋า","Your wallet")}</span><b>${BAHT(S.coins)}</b></div>
    ${msg?`<div class="wcomic"><span class="wv">🧑‍🔧</span><p>${msg}</p></div>`:""}
    <div class="shop">${SHOP.map(card).join("")}</div>
    <p class="note">${L("ของช่วยได้ แต่ไม่ได้ทำให้ไม่โดนหลอก ยังต้องคิดเองทุกครั้ง · หาเงินได้จากการช่วยคน ส่งเบาะแส ตอบข้อความถูก และเล่นมินิเกม","Upgrades help, but they don't make you scam-proof. Earn money by helping people, handing in clues, judging messages and mini-games.")}</p></div>`);
  $("sheet").querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>{
    const it=SHOP.find(x=>x.id===b.dataset.buy), pr=shopPrice(it); if(S.coins<pr||shopOwned(it)) return;
    S.coins-=pr; if(it.lv) S.items.lens=Math.min(3,(S.items.lens||0)+1); else S.items[it.id]=true;
    save(); hudKey=""; sfx("good"); toast(L(`ได้ ${it.n[0]} แล้ว`,`Got ${it.n[1]}`));
    openShop(it.lv?L(`“แว่นระดับ ${S.items.lens} แล้ว ส่องได้ไกลขึ้นเยอะ”`,`“Level ${S.items.lens} lens. Sweeps much further now”`):L(`“${it.n[0]} ติดตั้งให้แล้ว”`,`“${it.n[1]}, installed”`));
  });
}
/* ---------- virus mode: the whole game glitches until you reach the repair stall ---------- */
let hackT=30, vpopT=0, virusOn=false;
const VPOP=[["⚠ VIRUS DETECTED","⚠ VIRUS DETECTED"],["☠ กำลังส่งรหัสผ่าน…","☠ Sending passwords…"],["💳 ดึงข้อมูลบัตร 87%","💳 Copying card data 87%"],["📷 เปิดกล้องอยู่","📷 Camera is on"],["🔓 SYSTEM INFECTED","🔓 SYSTEM INFECTED"],["📤 อัปโหลดรูปภาพ…","📤 Uploading photos…"]];
function stepVirus(dt){
  const on=!!S.phoneBroken && !!S.char;
  if(on!==virusOn){ virusOn=on; $("virus").hidden=!on; $("stage").classList.toggle("infected",on); if(on) hackT=30; }
  if(!on) return;
  const paused=busy();
  if(!paused){ hackT-=dt;
    if(hackT<=0){ hackT=30; S.virusStrikes=(S.virusStrikes||0)+1; if(S.virusStrikes>=3){ S.virusStrikes=0; save(); setTimeout(playPhoneLoss,200); return; } const lost=addCoins(-40); S.bars.privacy=Math.max(0,S.bars.privacy-8); S.bars.money=Math.max(0,S.bars.money-8); save(); hudKey=""; sfx("bad");
      toast(L(`⏰ ไม่ทัน! คนร้ายดูดเงินเพิ่ม${lost?" "+BAHT(Math.abs(lost)):""} รีบไปร้านซ่อม!`,`⏰ Too slow! The hacker drained more${lost?" ("+BAHT(Math.abs(lost))+")":""}. Hurry to the repair stall!`)); }
    if(!RM && (vpopT-=dt)<=0){ vpopT=1.1+Math.random()*.9; const el=document.createElement("div"); el.className="vpop"; el.textContent=VPOP[Math.floor(Math.random()*VPOP.length)][EN()?1:0];
      el.style.left=(8+Math.random()*60)+"%"; el.style.top=(22+Math.random()*50)+"%"; $("virus").appendChild(el); setTimeout(()=>el.remove(),1500); }
  }
  const sec=Math.max(0,Math.ceil(hackT));
  $("vtime").textContent=`0:${String(sec).padStart(2,"0")}`; $("vclock").classList.toggle("hurry",sec<=10);
  $("vwhere").textContent=S.zone===0?L("ไปที่แผง “หมอโฟน” หน้า NET ZONE","Get to the “Phone Dr.” stall by NET ZONE"):L("ออกจากร้าน ไปหมอโฟนริมถนน","Leave the shop, find Phone Dr. on the street");
  $("vclock").classList.toggle("paused",paused);
}
function drawVirusArrow(g,now){
  if(!S.phoneBroken || S.zone!==0) return;
  const dx=REPAIR.x-player.x, dy=REPAIR.y-player.y, d=Math.hypot(dx,dy); if(d<120) return;
  const a=Math.atan2(dy,dx), r=58+(RM?0:Math.sin(now/150)*4), x=player.x+Math.cos(a)*r, y=player.y-40+Math.sin(a)*r;
  g.save(); g.translate(x,y); g.rotate(a); g.beginPath(); g.moveTo(16,0); g.lineTo(-8,-11); g.lineTo(-3,0); g.lineTo(-8,11); g.closePath();
  g.fillStyle="#E5402F"; g.fill(); g.lineWidth=2.5; g.strokeStyle="#FFFFFF"; g.stroke(); g.restore();
}
