/* Story chapters (which zones are open), the haunted-house gate and the clue tally that decides the ending. */

/* the order the story sends you: library → café → net café → bank → back to campus */
const CHAPTERS = [2, 1, 4, 3, 6];
const GHOST_MIN = 300;                      /* points (★ in the HUD) needed to enter the haunted house */
const chapterOf = (z)=>CHAPTERS.indexOf(+z);
const chapter = ()=>S.chapter||0;
const ghostOpen = ()=>totalScore()>=GHOST_MIN;

/* can the player walk into this zone? */
function zoneOpen(z){
  z=+z;
  if(z===0 || z===6 || z===7 || z===8) return true;        /* street, campus, police, offices */
  if(ZONES[z] && ZONES[z].bonus) return ghostOpen();
  const i=chapterOf(z); return i>=0 && i<=chapter();
}
/* are this zone's cases ready to play yet? */
function casesOpen(z){
  z=+z;
  if(z===7) return chapter()>=1;                             /* police cases open after the library */
  if(z===6) return chapter()>=4;                             /* campus cases are the last chapter */
  if(ZONES[z] && ZONES[z].bonus) return ghostOpen();
  return zoneOpen(z);
}
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
  S.unlockPending = CHAPTERS[S.chapter]!=null ? CHAPTERS[S.chapter] : -1;
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
