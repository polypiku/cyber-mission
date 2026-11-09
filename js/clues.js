/* Clues beyond the cases: hidden spots found with the detective lens, people who let things slip,
   the haunted house, and what you see undercover inside the gang's building. Also handing clues to Phop. */

Object.assign(EV_GROUPS, {
  hq:{t:["ข้างในตึกรังแก๊ง","Inside the gang's building"],r:["ชั้น 2 เป็นคอลเซ็นเตอร์ ชั้น 3 มีคนถูกหลอกมาขังไว้","Floor 2 is a call centre; floor 3 holds people tricked into working there"]}
});
Object.assign(EVID, {
  /* haunted house cases (earned like any case) */
  merit:{i:"🙏",g:"acct",src:"ghost",t:["บัญชีทำบุญปลอม","Fake donation account"],d:["เงินทำบุญเข้าบัญชีนายธนพล ส.","Donations went to Mr Thanaphon S."]},
  inherit:{i:"📜",g:"acct",src:"ghost",t:["จดหมายมรดกปลอม","Fake inheritance letter"],d:["ค่าธรรมเนียมโอนเข้าบัญชีนายสมพงษ์ ร.","The 'fee' went to Mr Sompong R."]},
  romance:{i:"💔",g:"phone",src:"ghost",t:["โปรไฟล์หาคู่ปลอม","Fake dating profile"],d:["สมัครด้วยเบอร์ 02 xxx 8810","Registered with 02 xxx 8810"]},
  fortune:{i:"🔮",g:"server",src:"ghost",t:["เว็บดูดวงเสริมโชค","Lucky-charm fortune site"],d:["อยู่บนเซิร์ฟเวอร์ 185.xx.xx.7","Hosted on 185.xx.xx.7"]},
  /* found with the detective lens */
  lx_lib:{i:"💾",g:"server",src:"lens",t:["USB แปลกในคอมห้องสมุด","Strange USB in a library PC"],d:["ไฟล์ข้างในส่งข้อมูลไป 185.xx.xx.7","Its files send data to 185.xx.xx.7"]},
  lx_cafe:{i:"📡",g:"server",src:"lens",t:["เราเตอร์ซ่อนใต้ชั้นวาง","Router hidden under a shelf"],d:["ตั้งชื่อ Wi-Fi เหมือนของร้าน","Broadcasts a name copying the café's Wi-Fi"]},
  lx_net:{i:"🗑️",g:"phone",src:"lens",t:["ซองซิมในถังขยะ","SIM packets in the bin"],d:["เลขล็อตเดียวกับ 02 xxx 8810","Same batch as 02 xxx 8810"]},
  lx_bank:{i:"📒",g:"acct",src:"lens",t:["สมุดบัญชี 5 เล่มที่ลืมไว้","Five forgotten bank books"],d:["ชื่อธนพล ปวีณา สมพงษ์ ฯลฯ","Thanaphon, Paweena, Sompong and more"]},
  lx_uni:{i:"📄",g:"acct",src:"lens",t:["ใบปลิวรับเปิดบัญชี","“Open an account” flyer"],d:["“รับ 2,000 แค่เปิดบัญชี แอดไลน์พี่เจ”","“฿2,000 just for opening an account. Add Jay on LINE”"]},
  lx_hq:{i:"📦",g:"hq",src:"lens",t:["ลังซิมในล็อบบี้","Crate of SIMs in the lobby"],d:["ส่งถึง “โกลบอล ดิจิทัล มาร์เก็ตติ้ง”","Addressed to “Global Digital Marketing”"]},
  /* people who let things slip */
  npc_it:{i:"🧰",g:"server",src:"people",t:["“ช่าง” ที่ไม่มีใครเรียก","The technician nobody called"],d:["กล่องที่เขาเสียบคือ Wi-Fi ปลอม","His box is a fake Wi-Fi hotspot"]},
  npc_admin:{i:"💅",g:"acct",src:"people",t:["เจ๊แอดมินกลุ่มลงทุน","The investment-group admin"],d:["จ้างคนเปิดบัญชีม้า 2,000 บาท","Pays ฿2,000 per mule account"]},
  /* undercover inside the gang's building */
  hq_script:{i:"📋",g:"hq",src:"hq",t:["สคริปต์บนไวท์บอร์ด","Script on the whiteboard"],d:["ปลอมเป็นธนาคาร เป้า 300 สาย/วัน","Pose as the bank, 300 calls a day each"]},
  hq_dorm:{i:"🛏️",g:"hq",src:"hq",t:["คำให้การจากชั้น 3","Testimony from floor 3"],d:["ถูกยึดบัตรและมือถือ ขังไว้ทุกคืน","IDs and phones taken, locked in every night"]}
});
const CLUE_SRC = {
  case:{th:"ช่วยคนในเคส",en:"Helping people in cases"},
  lens:{th:"ของแปลกที่ซ่อนอยู่ในห้อง",en:"Odd things hidden in rooms"},
  people:{th:"คนที่เผลอพูด",en:"People who let it slip"},
  ghost:{th:"บ้านผีสิง",en:"Haunted house"},
  hq:{th:"แฝงตัวในตึก",en:"Undercover in the building"}
};
const srcOf = (k)=>EVID[k].src||"case";
const isCaseId = (k)=>!!(CASES.th[k]);
const UC_MIN = 18;
function clueWhere(k){
  const src=srcOf(k), zoneOf=(id)=>Object.keys(ZONES).find(z=>ZONES[z].cases.includes(id));
  if(src==="case"){ const z=zoneOf(k); return `${z?ZONES[z].name[S.lang]:""} · ${CASES[S.lang][k].title}`; }
  if(src==="ghost") return L("บ้านร้างในป่า","The old house in the woods");
  if(src==="people") return L(k==="npc_it"?"มีคนแปลกหน้าในร้านเน็ต":"มีคนแปลกหน้าในธนาคาร",k==="npc_it"?"A stranger at the net café":"A stranger at the bank");
  if(src==="hq") return L("ข้างในตึกรังแก๊ง","Inside the gang's building");
  const sp=SPOTS.find(s=>s.id===k); const zn=sp.z===8?L("ตึกรังแก๊ง","the gang's building"):ZONES[sp.z].name[S.lang];
  return L(`ซ่อนอยู่ที่${zn} · มองหาเครื่องหมาย ?`,`Hidden at ${zn} · look for the ? mark`);
}                      /* clues handed in before Phop sends you undercover */

/* ---------- lens spots ---------- */
const SPOTS = [
  {id:"lx_lib",  z:2, floor:2, x:118, y:520, lv:1},
  {id:"lx_cafe", z:1, x:792, y:300, lv:1},
  {id:"lx_net",  z:4, x:96,  y:540, lv:2},
  {id:"lx_bank", z:3, x:796, y:330, lv:2},
  {id:"lx_uni",  z:6, x:796, y:540, lv:3},
  {id:"lx_hq",   z:8, hq:true, floor:1, x:736, y:520, lv:2},
  {id:"hq_script", z:8, hq:true, floor:2, x:340, y:126, lv:0, uc:true}
];
function spotHere(s){
  if(S.zone!==s.z || S.ev[s.id]) return false;
  if(s.z===2 && libFloor()!==s.floor) return false;
  if(s.z===8 && (S.bld!==hqB() || offFloor()!==s.floor)) return false;
  if(s.uc && !(S.uc && !raided())) return false;
  if(s.z!==8 && !casesOpen(s.z)) return false;
  return true;
}
const spotsHere = ()=>SPOTS.filter(spotHere);
const spotShown = (s)=>true;
function nearSpot(){ if(!S.char||busy()) return null; return spotsHere().find(s=>spotShown(s) && Math.hypot(player.x-s.x,player.y-s.y)<60) || null; }

let lensFx=null;
const LENS_R=[0,170,260,380];
function lensLv(){ return Math.min(3,S.items&&S.items.lens||0); }
function sweepLens(){
  if(busy()) return;
  const lv=lensLv();
  if(!lv){ toast(L("ยังไม่มีแว่นนักสืบ ไปรับจากพี่ภพก่อน","No detective lens yet. Get one from Phop first")); return; }
  lensFx={t0:performance.now(), r:LENS_R[lv]}; sfx("ping");
  S.lensSeen=S.lensSeen||{};
  const near=spotsHere().filter(s=>s.lv>0 && Math.hypot(player.x-s.x,player.y-s.y)<LENS_R[lv]+40);
  const ok=near.filter(s=>s.lv<=lv), weak=near.filter(s=>s.lv>lv);
  ok.forEach(s=>S.lensSeen[s.id]=true); save();
  setTimeout(()=>{
    if(ok.length){ sfx("ev"); toast(L("🔍 เจออะไรบางอย่าง! เดินไปดูตรงที่มีเครื่องหมาย ?","🔍 Something's there! Walk to the ? mark")); }
    else if(weak.length) toast(L(`🔍 เหมือนมีอะไรแถวนี้ แต่แว่นระดับ ${lv} มองไม่ชัด ต้องอัปเกรดเป็นระดับ ${weak[0].lv}`,`🔍 Something's nearby, but a level ${lv} lens can't make it out. Upgrade to level ${weak[0].lv}`));
    else if(spotsHere().some(s=>s.lv>0)) toast(L("🔍 ยังไม่เจอ ลองเดินไปอีกมุมของห้องแล้วส่องใหม่","🔍 Nothing here. Try another corner of the room"));
    else toast(L("🔍 ที่นี่ไม่มีเบาะแสซ่อนอยู่แล้ว","🔍 No hidden clues left here"));
  },700);
}
function gainClue(id, who){
  if(S.ev[id]) return;
  S.ev[id]=true; S.evNew=(S.evNew||0)+1; save(); hudKey=""; sfx("ev");
  const e=EVID[id];
  setTimeout(()=>toast(`🧩 ${L("เบาะแสใหม่","New clue")}: ${e.t[EN()?1:0]} · ${evCount()}/${clueTotal()}`),who?50:300);
}
function collectSpot(s){
  const e=EVID[s.id];
  say(S.char, lines([t(`${e.i} ${e.t[0]}… ${e.d[0]}`,`${e.i} ${e.t[1]}… ${e.d[1]}`),
    t("ถ่ายรูปเก็บไว้ให้พี่ภพดูดีกว่า","I'll take a photo for Phop.")]), {onEnd:()=>{ gainClue(s.id,true); drawStatic(); }});
}
function drawSpots(g,now){
  if(!S.char) return;
  for(const s of spotsHere()){
    if(!spotShown(s)) continue;
    const b=RM?0:Math.sin(now/200)*3;
    g.save(); g.globalAlpha=.9; g.beginPath(); g.ellipse(s.x,s.y,22,8,0,0,7); g.fillStyle="rgba(255,196,20,.35)"; g.fill(); g.restore();
    rr(g,s.x-15,s.y-46+b,30,30,15); g.fillStyle="#FFC414"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.font="800 18px 'Noto Sans Thai', sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText("?",s.x,s.y-30+b);
  }
  if(lensFx){
    const k=Math.max(0,(now-lensFx.t0)/900); if(k>1.4){ lensFx=null; return; }
    const r=lensFx.r*Math.min(1,k);
    g.save(); g.globalAlpha=Math.max(0,1-k*.7); g.beginPath(); g.arc(player.x,player.y-30,r,0,7); g.lineWidth=4; g.strokeStyle="#FFC414"; g.stroke();
    g.setLineDash([10,8]); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.restore();
  }
}

/* ---------- gang members in the cells after the raid ---------- */
const GANG_BODY={itGuy:"itGuy",jeAdmin:"jeAdmin",shadowBoss:"shadowBoss",sc1:"crowd11",sc2:"crowd12",sc3:"crowd03",sc4:"crowd16"};
for(const [k,b] of Object.entries(GANG_BODY)){
  SPRITES["j_g_"+k]=SPRITES[b];
  PEOPLE["j_g_"+k]=/^sc/.test(k)?{name:{th:"คนโทรหลอก",en:"Scam caller"},role:{th:"แก๊งคอลเซ็นเตอร์",en:"Call-centre gang"}}:{name:PEOPLE[b].name,role:{th:"ผู้ต้องหาแก๊งเงา",en:"Shadow gang suspect"}};
}
function gangFor(n){
  if(n<=2) return [];
  if(n===3) return ["itGuy","sc1"];
  const g=["itGuy","jeAdmin","sc1","sc2","sc3","sc4","sc1","sc2"];
  return n>=5 ? ["shadowBoss",...g] : g;
}
function jailGang(n){
  const keep=jailList().filter(j=>!j.gang);
  S.jailed=[...gangFor(n).map(k=>({b:"g_"+k, z:8, gang:k})), ...keep]; save();
}
const GANG_LINES={
  itGuy:[t("ผมแค่รับจ้างไปเสียบกล่อง Wi-Fi ตามร้าน","I was only paid to plug Wi-Fi boxes into shops."),t("ไม่คิดว่าเด็กมหาลัยจะจำหน้าผมได้","Never thought a student would remember my face.")],
  jeAdmin:[t("เจ๊แค่หาคนเปิดบัญชีให้ ไม่ได้หลอกใครนะ","I only found people to open accounts. I didn't scam anyone."),t("…ก็ได้ เงินทุกบาทไหลผ่านบัญชีที่เจ๊หามา","…Fine. Every baht flowed through accounts I recruited.")],
  shadowBoss:[t("แกคิดว่าจับฉันได้แล้วจะจบเหรอ","You think catching me ends it?"),t("มิจฉาชีพมีอีกเยอะ… แต่คนที่รู้ทันก็เยอะขึ้นเรื่อยๆ สินะ","There are plenty more like me… but more people see through us every day, I suppose.")],
  sc:[t("ผมแค่อ่านตามสคริปต์… รู้ทั้งรู้ว่าหลอกคน","I just read the script… knowing full well it was a scam."),t("ถ้ามีคนโทรมาอ้างเป็นธนาคาร ให้วางสายแล้วโทรกลับเบอร์หลังบัตรเอง","If someone calls claiming to be your bank, hang up and call the number on your card.")]
};

/* ---------- handing clues to Phop ---------- */
function clueBreakdown(){
  const out={}; for(const k of Object.keys(EVID)){ const s=srcOf(k); out[s]=out[s]||[0,0]; out[s][1]++; if(S.ev[k]) out[s][0]++; } return out;
}
function nextHint(){
  if(!S.hqFound) return t("ตึกออฟฟิศ 3 ตึกฝั่งตรงข้ามถนน ตึกไหนมีอะไรแปลกๆ ลองเข้าไปดู","Check the three office buildings across the road for anything odd.");
  if(!S.uc && (S.handed||0)<UC_MIN) return t(`ส่งเบาะแสให้ได้ ${UC_MIN} ชิ้น พี่จะทำบัตรพนักงานให้แฝงตัวขึ้นไปดูชั้นบน`,`Hand in ${UC_MIN} clues and I'll make you a staff pass to sneak upstairs.`);
  if(S.uc && !(S.ev.hq_script&&S.ev.hq_dorm)) return t("ขึ้นไปชั้น 2 ถ่ายรูปไวท์บอร์ด แล้วไปคุยกับคนที่ชั้น 3","Go up, photograph the whiteboard on floor 2, and talk to people on floor 3.");
  if(!ghostOpen()) return t(`ได้ยินว่าบ้านร้างในป่าทางซ้ายล่างของเมืองมีเบาะแส แต่ต้องมีคะแนน ${GHOST_MIN} ★ ก่อนนะ`,`Word is the old house in the woods, bottom left of town hides clues, but you need ${GHOST_MIN} ★ first.`);
  if(["merit","inherit","romance","fortune"].some(k=>!S.ev[k])) return t("บ้านร้างในป่าทางซ้ายล่างของเมืองยังมีเบาะแสเหลืออยู่","The old house in the woods still holds clues.");
  if(SPOTS.some(s=>s.lv>0 && !S.ev[s.id])) return t("ยังมีของแปลกๆ ซ่อนอยู่ตามห้องต่างๆ มองหาเครื่องหมาย ? สีเหลือง","There are still odd things hidden in rooms. Look for the yellow ? marks.");
  if(!S.ev.npc_it || !S.ev.npc_admin) return t("มีคนแปลกหน้าในร้านเน็ตกับธนาคาร ลองไปคุยดู","There are strangers at the net café and the bank. Talk to them.");
  return t("เคสไหนยังไม่ได้เบาะแส ลองเล่นใหม่ให้ปลอดภัย","Replay any case that didn't give a clue, and keep everyone safe.");
}
function forecastLine(){
  const n=endingFrom(S.handed||0);
  return t(`ถ้าบุกตอนนี้ คาดว่าจะได้ฉากจบ ${n}/5 “${ENDINGS[n].t[0]}”`,`If we raided now: ending ${n}/5, “${ENDINGS[n].t[1]}”`);
}
const raidReady = ()=>allDone() && S.hqFound;
function handIn(n){
  const before=S.handed||0, now=evCount(), got=now-before;
  S.handed=now; addCoins(got*5); save(); sfx("good"); hudKey="";
  const ls=[t(`ได้มาอีก ${got} ชิ้น! รวมส่งแล้ว ${now}/${clueTotal()} ชิ้น (+${BAHT(got*5)})`,`${got} more! ${now}/${clueTotal()} handed in (+${BAHT(got*5)})`), forecastLine()];
  let after=null;
  if(S.hqFound && !S.uc && now>=UC_MIN){
    S.uc=true; save();
    ls.push(t(`เบาะแสพอแล้ว พี่ทำบัตรพนักงาน “${SCAM_TENANT.th}” ให้ บอกยามว่าเป็นพนักงานใหม่ ขึ้นไปดูชั้น 2 กับ 3 ได้เลย`,`That's enough. Here's a “${SCAM_TENANT.en}” staff pass. Tell the guard you're new and look around floors 2 and 3.`),
      t("ห้ามทำอะไรเสี่ยงนะ แค่ถ่ายรูปแล้วรีบออกมา","Nothing risky. Just take photos and get out."));
    after=()=>setTimeout(()=>toast(L("🪪 ได้บัตรพนักงานปลอม ขึ้นลิฟต์ในตึกรังแก๊งได้แล้ว","🪪 Got a staff pass. You can take the lift in the gang's building now")),300);
  } else ls.push(nextHint());
  say(n.id, lines(ls), {onEnd:()=>{ after&&after(); if(raidReady()) setTimeout(()=>talkPolice(n),200); }});
}
function talkPolice(n){
  const jl=jailList().length; if(jl && (S.jailSeen||0)<jl){ S.jailSeen=jl; save(); toast(L(`🔒 คนร้ายที่จับได้ ${jl} คน อยู่ในห้องขัง (ประตูขวามือ)`,`🔒 ${jl} ${jl>1?"suspects":"suspect"} in the cell block (door on the right)`)); }
  if(!S.seen[7]){ say(n.id, lines(ZONE_INTRO[7]), {onEnd:()=>{ S.seen[7]=true; save(); zoneEvent(); }}); return; }
  if(!lensLv()){ S.items.lens=1; save(); hudKey=""; }
  const fresh=evCount()-(S.handed||0);
  if(fresh>0){ say(n.id, lines([t(`มีเบาะแสใหม่ ${fresh} ชิ้นใช่ไหม ส่งมาเลย`,`You've got ${fresh} new clue${fresh>1?"s":""}? Let's see.`)]),
    {choices:[{label:{th:`🗂️ ส่งเบาะแส ${fresh} ชิ้น`,en:`🗂️ Hand in ${fresh} clue${fresh>1?"s":""}`},fn:()=>handIn(n)},{label:{th:"ยังก่อน",en:"Not yet"},ghost:true}]}); return; }
  const status=t(`ส่งเบาะแสแล้ว ${S.handed||0}/${clueTotal()} ชิ้น`,`Clues handed in: ${S.handed||0}/${clueTotal()}`);
  if(!raidReady()){
    const left=allDone()?null:Object.entries(ZONES).filter(([z,v])=>!v.bonus && casesOpen(+z)).map(([z,v])=>[z,v.cases.filter(k=>!S.best[k]).length]).filter(([,c])=>c>0);
    say(n.id, lines([status, left&&left.length?t(`ยังมีคนรอให้ช่วยที่: ${left.map(([z,c])=>ZONES[z].name.th+" ("+c+")").join(", ")}`,`People still need help at: ${left.map(([z,c])=>ZONES[z].name.en+" ("+c+")").join(", ")}`):nextHint(), forecastLine()])); return;
  }
  const again=S.ending && S.ending<5;
  say(n.id, lines([status, again?t(`ครั้งก่อนได้ฉากจบ ${S.ending}/5 อยากบุกใหม่ไหม`,`Last time we got ending ${S.ending}/5. Raid again?`):t("ทุกคนในย่านได้รับการช่วยแล้ว และเรารู้ว่าแก๊งอยู่ตึกไหน","Everyone has been helped, and we know which building it is."), forecastLine(), nextHint()]),
    {choices:[{label:{th:"🚓 วางแผนบุก",en:"🚓 Plan the raid"},fn:()=>openCase("bust",n)},{label:{th:"หาเบาะแสเพิ่มก่อน",en:"Find more clues first"},ghost:true}]});
}
