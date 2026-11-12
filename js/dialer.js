/* The Phone app: a keypad, a list of real Thai hotlines and recent calls.
   Calling a hotline plays a short practice call that explains what that line does and what to have
   ready. A separate "call for real" button opens the device's own dialer (tel: link). */
const HOTLINES=[
  {n:"1441", sn:["ศูนย์ AOC","AOC center"], nm:["ศูนย์ AOC 1441 (ศูนย์ต่อต้านการฉ้อโกงทางออนไลน์)","AOC 1441 (Anti Online Scam Operation Center)"], short:["โดนหลอกโอนเงิน ขออายัดบัญชีคนร้าย","Scammed? Freeze the scammer's account"], ic:"🛡️",
   intro:["ศูนย์ AOC 1441 สวัสดีค่ะ กด 1 แจ้งเหตุและขออายัดบัญชีต้องสงสัย กด 2 ขอปลดอายัดบัญชีของตัวเอง กด 3 ปรึกษาข้อกฎหมาย","AOC 1441, hello. Press 1 to report a scam and freeze a suspicious account. Press 2 to unfreeze your own account. Press 3 for legal advice."],
   menu:[
    ["แจ้งเหตุ: เจ้าหน้าที่จดข้อมูล แล้วต่อสายไปธนาคารของคุณเพื่อยืนยันตัวตนและอายัดบัญชีคนร้าย จากนั้นจะได้เลขคดีและ SMS นัดพบพนักงานสอบสวนภายใน 7 วัน เตรียมสลิปโอน เลขบัญชีคนร้าย และแชตไว้","Report: staff take your details and pass you to your bank to verify you and freeze the scammer's account. You get a case number and an SMS to meet an investigator within 7 days. Have your transfer slips, the scammer's account number and the chats ready."],
    ["ปลดอายัด: ถ้าบัญชีของคุณถูกระงับโดยไม่ได้ทำผิด แจ้งเพื่อตรวจสอบและขอปลดได้","Unfreeze: if your own account was frozen by mistake, ask here to have it checked and released."],
    ["ปรึกษากฎหมาย: สอบถามสิทธิ์ ขั้นตอนแจ้งความ และการติดตามเงินคืน","Legal advice: your rights, how to file a report, and how money recovery works."]]},
  {n:"191", sn:["ตำรวจ","Police"], nm:["ตำรวจ แจ้งเหตุด่วนเหตุร้าย","Police emergency"], short:["มีคนข่มขู่ ทำร้าย หรือเหตุด่วน","Threats, violence or any emergency"], ic:"🚓",
   intro:["191 ตำรวจครับ ถ้ามีคนข่มขู่จะทำร้าย หรืออยู่ในอันตรายตอนนี้ แจ้งได้ทันที ถ้าโดนหลอกออนไลน์แต่ไม่มีอันตรายต่อตัว ให้โทร 1441 หรือแจ้งความที่ thaipoliceonline.go.th","Police, 191. If someone is threatening to hurt you or you're in danger now, tell us right away. For online scams with no danger to you, call 1441 or report at thaipoliceonline.go.th."]},
  {n:"1212", sn:["ร้องเรียนออนไลน์","Online complaints"], nm:["ศูนย์รับเรื่องร้องเรียนปัญหาออนไลน์ 1212","1212 Online complaints center"], short:["ซื้อของออนไลน์แล้วไม่ได้ของ / ได้ของไม่ตรงปก","Bought online, got nothing or the wrong thing"], ic:"🛒",
   intro:["1212 สวัสดีค่ะ รับเรื่องซื้อขายออนไลน์ไม่ได้ของหรือของไม่ตรงปก เตรียมลิงก์ร้าน หลักฐานการโอน และแชตกับร้านไว้ได้เลยค่ะ","1212, hello. We take cases of online shopping where nothing arrived or it wasn't as described. Have the shop link, your payment proof and the chat ready."]},
  {n:"1213", sn:["แบงก์ชาติ","Bank of Thailand"], nm:["ศูนย์คุ้มครองผู้ใช้บริการทางการเงิน ธปท. 1213","Bank of Thailand financial consumer line 1213"], short:["ปัญหากับธนาคาร แอปเงินกู้ หนี้นอกระบบ","Problems with banks, loan apps, loan sharks"], ic:"🏦",
   intro:["1213 ธนาคารแห่งประเทศไทยค่ะ ปรึกษาปัญหาบริการธนาคาร บัตร และแอปเงินกู้ที่ไม่ได้รับอนุญาตได้ ถ้าโดนหลอกโอนเงิน ให้โทรธนาคารของคุณหรือ 1441 ก่อนเพื่ออายัดให้เร็วที่สุด","Bank of Thailand, 1213. We help with problems with banks, cards and unlicensed loan apps. If you were tricked into a transfer, call your bank or 1441 first so the money is frozen as fast as possible."]},
  {n:"1207", sn:["ก.ล.ต.","SEC"], nm:["สำนักงาน ก.ล.ต. 1207","SEC Thailand 1207"], short:["เช็กว่าบริษัทหรือแอปลงทุนได้รับอนุญาตไหม","Check if an investment firm or app is licensed"], ic:"📈",
   intro:["1207 ก.ล.ต. ครับ ก่อนลงทุน เช็กได้ว่าบริษัท แอปเทรด หรือเหรียญคริปโตได้รับอนุญาตหรือไม่ ถ้ามีคนการันตีกำไร นั่นคือสัญญาณหลอกครับ","SEC, 1207. Before you invest, check whether a firm, trading app or crypto exchange is licensed. Anyone who guarantees profits is a red flag."]}
];
let dialNum="", dialTab="keys";
const callLog=()=>{ S.calls=S.calls||[]; return S.calls; };
function logCall(num, kind){ const l=callLog(); l.unshift({num, kind, t:Math.round(S.playMs||0)}); if(l.length>20) l.length=20; if(kind==="missed") S.missedNew=(S.missedNew||0)+1; }
function openDialer(tab){
  if(tab) dialTab=tab; if(dialTab==="recent") S.missedNew=0;
  const li=EN()?1:0, keys=[["1",""],["2","ABC"],["3","DEF"],["4","GHI"],["5","JKL"],["6","MNO"],["7","PQRS"],["8","TUV"],["9","WXYZ"],["*",""],["0","+"],["#",""]];
  let body="";
  if(dialTab==="keys") body=`<div class="dl-num" aria-live="polite">${esc(dialNum)||"&nbsp;"}</div>${dialNum&&HOTLINES.find(h=>h.n===dialNum)?`<div class="dl-hint">${esc(HOTLINES.find(h=>h.n===dialNum).nm[li])}</div>`:`<div class="dl-hint">&nbsp;</div>`}
    <div class="dl-pad">${keys.map(([d,s])=>`<button class="dl-key" data-dk="${d}"><b>${d}</b><small>${s||"&nbsp;"}</small></button>`).join("")}</div>
    <div class="dl-row"><span></span><button class="cl-btn yes" data-dcall aria-label="${L("โทร","Call")}"><span>📞</span></button><button class="dl-del" data-ddel aria-label="${L("ลบ","Delete")}">⌫</button></div>`;
  else if(dialTab==="hot") body=`<p class="dl-note">${L("สายด่วนจริงในไทย กดเพื่อฝึกโทรในเกมก่อน แล้วค่อยโทรจริงเมื่อจำเป็น","Real Thai hotlines. Tap to practise the call in the game first, then call for real when you need to.")}</p>
    <div class="clist">${HOTLINES.map(h=>`<button class="crow dl-hot" data-dhot="${h.n}"><span class="av dl-av">${h.ic}</span><span class="cb"><b>${h.n} · ${esc(h.sn[li])}</b><small>${esc(h.short[li])}</small></span><span class="dl-go">📞</span></button>`).join("")}</div>`;
  else { const l=callLog(); body=l.length?`<div class="clist">${l.map(c=>{ const blocked=S.sc&&Object.entries(SCAM_CALLS).some(([k,v])=>v.num===c.num&&S.sc.blocked[k]); const lab={missed:L("ไม่ได้รับ","Missed"),declined:L("ปฏิเสธ","Declined"),answered:L("รับสาย","Answered"),blocked:L("บล็อกแล้ว","Blocked"),out:L("โทรออก","Outgoing")}[c.kind]||c.kind;
      return `<div class="crow dl-rec ${c.kind==="missed"?"miss":""}"><span class="av dl-av">${c.kind==="out"?"↗":"↙"}</span><span class="cb"><b>${esc(c.num)}</b><small>${lab}${blocked?" · 🚫":""}</small></span>${c.kind==="out"||blocked?"":`<button class="dl-blk" data-dblk="${esc(c.num)}">${L("บล็อก","Block")}</button>`}</div>`; }).join("")}</div>`
      :`<p class="cempty">${L("ยังไม่มีประวัติการโทร","No calls yet")}</p>`; }
  const tabs=[["keys",L("แป้นกด","Keypad")],["hot",L("สายด่วน","Hotlines")],["recent",L("ล่าสุด","Recents")+(S.missedNew?` (${S.missedNew})`:"")]];
  phoneScreen(L("โทรศัพท์","Phone"), `<div class="dl">${body}</div><div class="dl-tabs" role="tablist">${tabs.map(([k,n])=>`<button class="${dialTab===k?"on":""}" role="tab" aria-selected="${dialTab===k}" data-dtab="${k}">${n}</button>`).join("")}</div>`);
  const q=s=>$("sheet").querySelectorAll(s);
  q("[data-dtab]").forEach(b=>b.onclick=()=>openDialer(b.dataset.dtab));
  q("[data-dk]").forEach(b=>b.onclick=()=>{ if(dialNum.length<14){ dialNum+=b.dataset.dk; sfx("blip"); } openDialer(); });
  q("[data-ddel]").forEach(b=>b.onclick=()=>{ dialNum=dialNum.slice(0,-1); openDialer(); });
  q("[data-dcall]").forEach(b=>b.onclick=()=>{ if(dialNum) placeCall(dialNum); });
  q("[data-dhot]").forEach(b=>b.onclick=()=>placeCall(b.dataset.dhot));
  q("[data-dblk]").forEach(b=>b.onclick=()=>{ const k=Object.keys(SCAM_CALLS).find(k=>SCAM_CALLS[k].num===b.dataset.dblk); if(k){ scBlock(k); openDialer(); } });
}
/* an outgoing call: a hotline plays its practice call; a scam number gets a warning; anything else is not in service */
function placeCall(num){
  const li=EN()?1:0, h=HOTLINES.find(x=>x.n===num), scam=Object.values(SCAM_CALLS).find(c=>c.num.replace(/\D/g,"")===num.replace(/\D/g,""));
  logCall(num,"out"); save();
  let lines=[], extra="";
  if(h){ lines.push(h.intro[li]);
    if(h.menu) extra=`<div class="dl-ivr">${h.menu.map((m,i)=>`<button class="cl-opt" data-ivr="${i}"><b>${i+1}</b> · ${esc(m[li].split(":")[0])}</button>`).join("")}</div><div id="ivrOut"></div>`;
    S.hotUsed=S.hotUsed||{}; if(!S.hotUsed[num]){ S.hotUsed[num]=1; addCoins(10); toast(L(`☎️ รู้จักสายด่วน ${num} แล้ว +${BAHT(10)}`,`☎️ You know hotline ${num} now +${BAHT(10)}`)); save(); hudKey=""; }
  } else if(scam) lines.push(L("เบอร์นี้เคยโทรมาหลอกคุณ อย่าโทรกลับเบอร์แปลก เขาอาจหลอกต่อหรือคิดค่าโทรแพง บล็อกแล้วแจ้ง 1441 ดีกว่า","This number tried to scam you. Don't call strange numbers back: they may scam you again or charge you. Block it and report to 1441 instead."));
  else lines.push(L("ขออภัย หมายเลขที่ท่านเรียก ไม่สามารถติดต่อได้ในขณะนี้","Sorry, the number you dialled cannot be reached right now."));
  openSheet("phone",`${top_("📞 "+esc(num))}<div class="sh-body"><div class="device incall"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <div class="ic-head"><span class="cl-av dl-big" aria-hidden="true">${h?h.ic:"📞"}</span><b>${esc(num)}</b><small>${h?esc(h.nm[li]):L("กำลังโทร…","Calling…")}</small></div>
    <div class="cl-log">${lines.map(t=>`<div class="cl-line them"><p>${esc(t)}</p></div>`).join("")}</div>${extra}
    ${h?`<a class="cl-opt dl-real" href="tel:${h.n}" target="_top">📲 ${L(`โทรจริงไปที่ ${h.n} จากเครื่องของคุณ`,`Call ${h.n} for real from your device`)}</a><p class="cl-note">${L("ปุ่มนี้โทรออกจริง ใช้เมื่อเกิดเหตุจริงเท่านั้น","This button places a real call. Use it only when you really need help.")}</p>`:""}
    <button class="cl-btn no ic-hang" data-dhang><span>📞</span>${L("วางสาย","End call")}</button><div class="homebar"></div></div></div></div>`);
  $("sheet").querySelectorAll("[data-ivr]").forEach(b=>b.onclick=()=>{ sfx("blip"); $("ivrOut").innerHTML=`<div class="cl-log"><div class="cl-line them"><p>${esc(h.menu[+b.dataset.ivr][li])}</p></div></div>`; });
  $("sheet").querySelector("[data-dhang]").onclick=()=>{ dialNum=""; openDialer(); };
}
