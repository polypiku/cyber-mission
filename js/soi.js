/* First-visit scenes: the first time you walk into each place, a short scene with a small hint. */
if(S.zone===14) S.zone=0;   /* the old shop lane is now part of the town */
const _goZone=goZone;
goZone=function(z){
  const first=!S.seen[z] && ENTRY_TIP[z] && !(z===1&&!S.intro) && !(z===6&&!S.briefed) && !(z===9&&!S.overheard);
  if(!first) return _goZone(z);
  entryPending=true; S.seen[z]=true; _goZone(z); S.seen[z]=false; save();
  setTimeout(()=>{ entryPending=false; playEntryScene(z); },450);
};
let entryPending=false;
const _zoneEvent=zoneEvent;
zoneEvent=function(){ if(entryPending||CIN) return; _zoneEvent(); };
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
  13:["เด็กปีหนึ่งมักโดนชวนทำงานออนไลน์ ระวังงานที่ต้องจ่ายเงินก่อน","First-years get offered online jobs. Beware any job you pay for first."]
};
function playEntryScene(z){
  if(CIN || S.zone!==z) return;
  const tip=ENTRY_TIP[z]; if(!tip) return;
  const sp=npcs.find(n=>n.role==="mentor")||npcs.find(n=>n.role==="police");
  const A=sp?{m:mk(sp.id)}:{};
  const target=npcs.find(n=>!n.filler && n!==sp && caseOf(n) && !S.best[caseOf(n)]);
  const px=player.x, py=player.y, fx=px, fy=Math.max(140,py-80);
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
