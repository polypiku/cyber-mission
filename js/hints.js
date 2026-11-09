/* Buy a hint when stuck: in a case it crosses out the worst choice and shows what to look for,
   in a phone fix it gives away part of the answer, and anywhere else it says what to do next. */
const HINT_PRICE={case:2, fix:2, map:1};   /* coins: 20 / 20 / 10 baht */
function payHint(kind){
  const p=HINT_PRICE[kind];
  if(S.coins<p){ sfx("bad"); toast(L(`เงินไม่พอซื้อคำใบ้ (${BAHT(p)}) ช่วยคนให้สำเร็จเพื่อรับเงินเพิ่ม`,`Not enough for a hint (${BAHT(p)}). Help people to earn more`)); return false; }
  addCoins(-p); sfx("ping"); return true;
}
/* ---- inside a case ---- */
const caseHinted=()=>!!(C && C.hints && C.hints[C.scene]);
function caseHintBtn(){
  if(caseHinted()) return "";
  return `<button class="hintbuy" data-chint>💡 ${L("ติดอยู่? ซื้อคำใบ้","Stuck? Buy a hint")} <b>${BAHT(HINT_PRICE.case)}</b></button>`;
}
function caseHintBox(s){
  if(!caseHinted()) return "";
  const clue=(s.clues||[])[0];
  return `<div class="hintbox"><b>💡 ${L("คำใบ้","Hint")}</b><span>${L("สังเกตตรงนี้","Look for this")}: ${esc(clue||"")}</span><small>${L("ตัวเลือกที่ขีดฆ่าคือทางที่แย่ที่สุด","The crossed-out choice is the worst one")}</small></div>`;
}
function buyCaseHint(){
  if(!C || caseHinted() || !payHint("case")) return;
  C.hints=C.hints||{}; C.hints[C.scene]=true; renderCase();
}
/* ---- inside a phone fix ---- */
function fixHintText(){
  const f=FIXST.f, k=f.kind, q=(x)=>`“${esc(LX(x))}”`;
  if(k==="pw") return L(`อีเมลจริงส่งมาจาก ${esc(f.inbox.find(m=>m.ok).from)} · รหัสใหม่ใช้ตัวปุ่มสร้างรหัส หรือผสมตัวใหญ่ ตัวเลข และสัญลักษณ์`,`The real email is from ${esc(f.inbox.find(m=>m.ok).from)} · mix capitals, numbers and a symbol`);
  if(k==="dial") return L(`เบอร์ที่ถูกขึ้นต้นด้วย ${f.answer.slice(0,3)}… และไม่ใช่เบอร์ที่อยู่ในข้อความ`,`The right number starts ${f.answer.slice(0,3)}… and isn't the one in the message`);
  if(k==="settings"){ const i=f.items.findIndex(it=>it.on!==it.want); const it=f.items[i]; return L(`เริ่มจาก ${q(it.t)} ต้อง${it.want?"เปิด":"ปิด"}`,`Start with ${q(it.t)}: turn it ${it.want?"on":"off"}`); }
  if(k==="order") return L(`ขั้นแรกคือ ${q(f.steps[0])} และขั้นที่สองคือ ${q(f.steps[1])}`,`First: ${q(f.steps[0])}. Second: ${q(f.steps[1])}`);
  if(k==="pick"){ const bad=f.opts.filter(o=>!o.ok).slice(0,2).map(o=>q(o.t)).join(L(" และ "," and ")); return L(`ตัด ${bad} ออกได้เลย`,`Rule out ${bad}`); }
  if(k==="multi"){ const ok=f.opts.filter(o=>o.ok); return L(`มีข้อถูก ${ok.length} ข้อ เช่น ${q(ok[0].t)}`,`${ok.length} are right, for example ${q(ok[0].t)}`); }
  if(k==="pin") return L("ห้ามใช้วันเกิดของใครในบ้าน และห้ามเลขเรียง เช่น 123456 ลองสุ่มตัวเลขเอง","No family birthdays and no sequences like 123456. Pick random digits");
  return "";
}
function buyFixHint(){
  if(!FIXST || FIXST.hint || !payHint("fix")) return;
  FIXST.hint=fixHintText(); drawFix();
}
/* ---- anywhere else: the 💡 button in the HUD ---- */
function openHintMenu(){
  if(busy()) return;
  say(S.char, lines([t(`อยากได้คำใบ้ว่าควรทำอะไรต่อไหม (${BAHT(HINT_PRICE.map)})`,`Want a hint about what to do next? (${BAHT(HINT_PRICE.map)})`)]),
    {choices:[{label:{th:`💡 ซื้อคำใบ้ ${BAHT(HINT_PRICE.map)}`,en:`💡 Buy a hint ${BAHT(HINT_PRICE.map)}`},fn:()=>{ if(payHint("map")) setTimeout(giveMapHint,120); }},{label:{th:"ไม่เป็นไร",en:"No thanks"},ghost:true}]});
}
function giveMapHint(){
  const gi=goalInfo(), ls=[];
  const here=ZONES[S.zone]&&ZONES[S.zone].cases.filter(k=>!S.best[k]);
  if(here&&here.length){ const n=npcs.find(x=>caseOf(x)===here[0]); ls.push(t(`ในนี้ยังมี ${here.length} คนรอให้ช่วย ลองคุยกับ${n?nm(n.id):"คนที่มี !"}ก่อน`,`${here.length} people here still need help. Try ${n?nm(n.id):"someone with a !"} first`)); }
  const sp=spotsHere()[0]; if(sp) ls.push(t("มีของแปลกๆ ซ่อนอยู่ในห้องนี้ เดินไปตรงเครื่องหมาย ? แล้วกด E","Something odd is hidden in this room. Walk to the ? and press E"));
  if(gi) ls.push(t(`เป้าหมายตอนนี้: ${gi.t}`,`Current goal: ${gi.t}`));
  const nh=nextHint(); if(nh) ls.push(nh);
  say("volOat", lines(ls.slice(0,3)));
}
