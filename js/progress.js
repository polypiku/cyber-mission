/* Story chapters (which zones are open), the haunted-house gate and the clue tally that decides the ending. */

/* the order the story sends you: library → café → net café → bank → back to campus */
const CHAPTERS = [2, 1, 4, 3, 6];
const GHOST_MIN = 300;                      /* points (★ in the HUD) needed to enter the haunted house */
const chapterOf = (z)=>CHAPTERS.indexOf(+z);
const chapter = ()=>S.chapter||0;
const ghostOpen = ()=>true;

/* every place is open from the start; the chapter order is only a suggested route */
function zoneOpen(z){ return true; }
function casesOpen(z){ return true; }
function lockMsg(z){
  z=+z;
  if(ZONES[z] && ZONES[z].bonus) return L(`ตรอกถูกกั้นไว้… ต้องมีคะแนนอย่างน้อย ${GHOST_MIN} ★ ถึงจะกล้าเข้าไป (ตอนนี้ ${totalScore()})`,`The alley is blocked… you need at least ${GHOST_MIN} ★ to dare go in (now ${totalScore()})`);
  const i=chapterOf(z), prev=CHAPTERS[i-1];
  if(prev==null) return L("ยังเข้าไม่ได้","Not open yet");
  const done=ZONES[prev].cases.filter(k=>S.best[k]).length;
  return L(`ยังไม่มีเบาะแสชี้มาที่นี่ ช่วยคนใน${ZONES[prev].name.th}ให้ครบก่อน (${done}/${ZONES[prev].cases.length})`,`No lead points here yet. Help everyone at ${ZONES[prev].name.en} first (${done}/${ZONES[prev].cases.length})`);
}
/* called after every case: finishing the current chapter's zone opens the next one */
function advanceChapter(){
  const cur=CHAPTERS[chapter()];
  if(cur==null || !zoneDone(cur)) return;
  S.chapter=chapter()+1;

}
/* older saves had every zone open: work out which chapter they had reached */
function migrateChapter(){
  if(S.chapter!=null) return;
  let c=0; while(c<CHAPTERS.length && zoneDone(CHAPTERS[c])) c++;
  S.chapter=c;
}
/* the lead each chapter leaves behind, shown on the unlock card */
const LEADS = {
  1:[["เบาะแสจากห้องสมุด: ไฟล์ปลอมกับหน้าเว็บปลอมชี้ไปที่เครือข่ายในคาเฟ่ Bean House","The library leads: the fake files and pages point to a network inside Bean House café"]],
  4:[["เบาะแสจากคาเฟ่: บัญชีรับเงินเดียวกันถูกใช้ขายของในเกม คนที่ร้านเน็ต NET ZONE น่าจะโดนอยู่","From the café: the same receiving account sells in-game items. People at NET ZONE are likely targets"]],
  3:[["เบาะแสจากร้านเน็ต: “พี่บอส” ใช้เบอร์เดียวกับคนที่โทรหลอกลูกค้าธนาคาร","From the net café: “Boss” uses the same number that calls bank customers"]],
  6:[["เบาะแสจากธนาคาร: เงินทุกก้อนไหลผ่านบัญชีของนักศึกษาคนหนึ่งในมหาวิทยาลัย","From the bank: every payment flows through a student's account at the university"]]
};
const clueTotal = ()=>Object.keys(EVID).length;

/* ---------- what to do next: the goal pill under the HUD and the arrow on the street ---------- */
const zoneName=(z)=>ZONES[z]?ZONES[z].name[S.lang]:"";
function doorOf(z){
  if(z===8){ const o=OFFICES[S.hqFound?hqB():0]; return {x:o.door,y:OFF_TOP+10}; }
  const b=BUILDINGS.find(b=>b.zone===z && !b.hide); return b?{x:b.door,y:b.bot}:null;
}
function goalInfo(){
  if(!S.char) return null;
  if(!S.briefed) return {t:L("คุยกับพี่ภพ ตำรวจไซเบอร์","Talk to Phop, the cyber police officer"), z:6};
  const ORDER=[...CHAPTERS,9,11,12,10,13,7];
  const rest=ORDER.filter(z=>ZONES[z] && !zoneDone(z));
  if(rest.length){ const z=rest.includes(S.zone)?S.zone:rest[0]; const n=ZONES[z].cases.filter(k=>!S.best[k]).length, tot=ZONES[z].cases.length;
    if(S.zone===z) return {t:L(`ช่วยคนที่มี ! ใน${zoneName(z)} (${tot-n}/${tot})`,`Help everyone with a ! at ${zoneName(z)} (${tot-n}/${tot})`), z, here:true};
    return {t:L(`แนะนำ: ไปที่${zoneName(z)} (รอให้ช่วย ${n} คน) · ไปที่ไหนก่อนก็ได้`,`Suggested: ${zoneName(z)} (${n} waiting) · go anywhere you like`), z}; }
  if(!S.hqFound) return {t:L("สำรวจตึกออฟฟิศ 3 ตึกฝั่งตรงข้ามถนน หาตึกของแก๊ง","Search the 3 office buildings across the road for the gang's base"), z:8};
  if(evCount()>(S.handed||0)) return {t:L(`เอาเบาะแส ${evCount()-(S.handed||0)} ชิ้นไปส่งพี่ภพที่สถานีตำรวจ`,`Take ${evCount()-(S.handed||0)} clue(s) to Phop at the police station`), z:7, here:S.zone===7};
  if(S.uc && !raided() && !(S.ev.hq_script&&S.ev.hq_dorm)) return {t:L("แฝงตัวขึ้นชั้น 2–3 ของตึกแก๊ง หาเบาะแส","Sneak up to floors 2–3 of the gang's building for clues"), z:8};
  if(!S.ending) return {t:L("ไปหาพี่ภพที่สถานีตำรวจ วางแผนบุกรังแก๊ง","See Phop at the police station to plan the raid"), z:7, here:S.zone===7};
  if(S.ending<5) return {t:L(`ได้ฉากจบ ${S.ending}/5 · หาเบาะแสเพิ่มแล้วบุกใหม่ได้`,`Ending ${S.ending}/5 · find more clues and raid again`), z:7, here:S.zone===7};
  return {t:L("ทลายแก๊งเงาสำเร็จ! เดินเล่นต่อได้เลย","The Shadow gang is finished! Explore as you like")};
}
function drawGoalArrow(g,now){
  if(S.zone!==0 || !S.char || busy() || CIN) return;
  const gi=goalInfo(); if(!gi || gi.z==null) return; const d=doorOf(gi.z); if(!d) return;
  const dx=d.x-player.x, dy=d.y-player.y, dist=Math.hypot(dx,dy); if(dist<90) return;
  const a=Math.atan2(dy,dx), r=58+(RM?0:Math.sin(now/220)*5), cx=player.x+Math.cos(a)*r, cy=player.y-34+Math.sin(a)*r;
  g.save(); g.translate(cx,cy); g.rotate(a);
  g.beginPath(); g.moveTo(16,0); g.lineTo(-8,-12); g.lineTo(-3,0); g.lineTo(-8,12); g.closePath();
  g.fillStyle="#FFC414"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); g.restore();
}
