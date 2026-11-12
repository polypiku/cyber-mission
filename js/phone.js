/* The phone: home screen, chats, Wi-Fi, scanner and incoming messages. */
/* ---------- realistic phone screens ---------- */
const SB_ICONS='<svg viewBox="0 0 54 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="6" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/><path d="M24 4.5a8 8 0 0110 0M26 7a4.6 4.6 0 016 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="29" cy="10" r="1.3"/><rect x="38" y="1.5" width="13" height="9" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="40" y="3.5" width="8" height="5" rx="1"/><rect x="51.6" y="4.5" width="1.6" height="3" rx=".6"/></svg>';
const nowClock=()=>{ if(typeof clockText==="function") return clockText(); const d=new Date(); return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"); };
const sbar=(clock)=>`<div class="sbar"><b>${clock}</b><span class="sic">${SB_ICONS}</span></div>`;
function phoneize(root){
  root.querySelectorAll(".phone").forEach(ph=>{
    const top=ph.querySelector(":scope > .phone-top"), head=ph.querySelector(":scope > .chathead");
    if(!top && !head) return;
    const name = (top?top.querySelector("b"):head.querySelector("b"))?.innerHTML || "";
    const sub = (top?top.querySelector("span"):head.querySelector("small"))?.textContent || "";
    const letter = head?.querySelector(".ava")?.textContent || (top?.querySelector("b")?.textContent||"?").trim().slice(0,1);
    const timeEl = ph.querySelector(":scope > .time");
    const allText = ph.textContent;
    const m = (timeEl?.textContent||"").match(/\d{1,2}:\d{2}/) || allText.match(/\d{1,2}:\d{2}/);
    const clock = m?m[0]:"12:00";
    let msgs="";
    if(timeEl) msgs+=`<div class="stamp">${timeEl.innerHTML}</div>`;
    const parts = top ? [...ph.querySelectorAll(":scope > .bubble")] : [...ph.querySelectorAll(".thread > *")];
    parts.forEach(el=>{
      if(el.classList.contains("time")) msgs+=`<div class="stamp">${el.innerHTML}</div>`;
      else msgs+=`<div class="${el.classList.contains("me")?"outbub":"inbub"}">${el.innerHTML}</div>`;
    });
    const isSms = !!top;
    const box=document.createElement("div");
    if(ph.closest(".bigphone")){
      box.className="inapp";
      box.innerHTML=`<div class="apphead"><span class="bk" aria-hidden="true">‹</span><span class="av ${isSms?"sms":""}">${esc(letter)}</span><span class="who"><b>${name}</b><small>${esc(isSms?L("ข้อความ · SMS","Text message · SMS"):sub)}</small></span></div>
        <div class="msgs">${msgs}</div><div class="composer"><span>${isSms?L("ข้อความ","Text message"):L("พิมพ์ข้อความ","Message")}</span><i></i></div>`;
      ph.replaceWith(box); return;
    }
    box.className="device";
    box.innerHTML=`<span class="island"></span><div class="scr">${sbar(clock)}
      <div class="apphead"><span class="bk" aria-hidden="true">‹</span><span class="av ${isSms?"sms":""}">${esc(letter)}</span><span class="who"><b>${name}</b><small>${esc(isSms?L("ข้อความ · SMS","Text message · SMS"):sub)}</small></span></div>
      <div class="msgs">${msgs}</div>
      <div class="composer"><span>${isSms?L("ข้อความ","Text message"):L("พิมพ์ข้อความ","Message")}</span><i></i></div><div class="homebar"></div></div>`;
    ph.replaceWith(box);
  });
}

/* new-message pop-up: the phone slides up with a lock-screen notification */
function showPeek(){
  const d=new Date();
  const date=d.toLocaleDateString(EN()?"en-GB":"th-TH",{weekday:"long",day:"numeric",month:"long"});
  const el=$("peek");
  el.innerHTML=`<div class="device lockscr"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <div class="lk-date">${esc(date)}</div><div class="lk-time">${nowClock()}</div>
    <button class="ncard" id="peekOpen"><span class="appic"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg></span><span class="nb"><span class="nh"><b>${L("ต้นข้าว","Ton Khao")}</b><small>${L("ตอนนี้","now")}</small></span><span>${L("แก ส่งรหัส 6 หลักที่เพิ่งเข้าไปให้หน่อย ด่วน","hey, send me the 6-digit code you just got, urgent")}</span></span></button>
    <div class="lk-acts"><button class="lk-btn" id="peekLater">${L("ไว้ทีหลัง","Later")}</button><button class="lk-btn y" id="peekGo">${L("เปิดอ่าน","Open")}</button></div>
    <div class="homebar"></div></div></div>`;
  el.hidden=false; el.classList.remove("in"); void el.offsetWidth; requestAnimationFrame(()=>el.classList.add("in"));
  try{ navigator.vibrate && navigator.vibrate([120,60,120]); }catch(e){}
  const open=()=>{ hidePeek(); S.chatSeen=true; save(); openCase("chat",null); };
  $("peekOpen").onclick=open; $("peekGo").onclick=open;
  $("peekLater").onclick=()=>{ hidePeek(); hud(); };
  setTimeout(()=>$("peekGo")?.focus({preventScroll:true}),400);
  hudKey="";
}
function hidePeek(){ const el=$("peek"); el.classList.remove("in"); el.hidden=true; el.innerHTML=""; hudKey=""; }

/* phone */
/* ---------- the phone: home screen, apps and a security scanner ---------- */
const TH_DAYS=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"], TH_MON=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
function placeName(){
  if(S.zone===0) return L("ถนนหน้าร้าน","Main street");
  if(S.zone===8) return offB().name[S.lang]+` · ${L("ชั้น","Fl.")} ${offFloor()}`;
  if(S.zone===7 && S.floor===2) return L("ห้องขัง สน.","Police cells");
  const z=ZONES[S.zone]; return z?z.name[S.lang]:"";
}
/* flat white glyphs for the home-screen icons, so every app looks like it came from the same phone */
const PH_GLYPH={
  phone:'<path d="M6.6 3.5h3l1.5 4-2 1.3a11 11 0 005.6 5.6l1.3-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.6 5.7a2 2 0 012-2.2z" fill="#fff" stroke="none"/>',
  chat:'<path d="M4 5.5h16v10.5H10l-6 4.5z" fill="#fff" stroke="none"/>',
  wifi:'<path d="M2.5 9a14 14 0 0119 0M5.8 12.4a9.5 9.5 0 0112.4 0M9 15.7a5 5 0 016 0"/><circle cx="12" cy="19" r="1.4" fill="#fff" stroke="none"/>',
  scan:'<path d="M12 3l8 3v6c0 4.8-3.4 8-8 9-4.6-1-8-4.2-8-9V6z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/>',
  wallet:'<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1.3" fill="#fff" stroke="none"/>',
  board:'<path d="M3 7.5a1.5 1.5 0 011.5-1.5H9l2 2h8.5A1.5 1.5 0 0121 9.5v8a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5z"/>',
  dex:'<path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0z"/><path d="M12 5.5V19"/>',
  feed:'<path d="M3.5 10v4h3.5l7 4.5v-13L7 10z" fill="#fff"/><path d="M17.5 9a4.5 4.5 0 010 6M19.8 6.6a8 8 0 010 10.8"/>',
  map:'<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  set:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.9 1.9M16.6 16.6l1.9 1.9M5.5 18.5l1.9-1.9M16.6 7.4l1.9-1.9"/>'
};
const phIcon=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PH_GLYPH[k]||""}</svg>`;
const PH_DOCK=["phone","chat","feed","set"];
const PH_APPS=()=>[
  {k:"phone",n:L("โทรศัพท์","Phone"),bg:"linear-gradient(160deg,#5BE07A,#1FA34A)",badge:S.missedNew||0},
  {k:"chat",n:L("แชต","Chats"),bg:"linear-gradient(160deg,#5AC8FA,#1F7AE0)",badge:S.inbox.length+(S.chat&&!S.best.chat?1:0)},
  {k:"wifi",n:"Wi-Fi",bg:"linear-gradient(160deg,#5AA9F0,#1F5FB5)"},
  {k:"scan",n:L("สแกนไวรัส","Virus scan"),bg:"linear-gradient(160deg,#FF6B5A,#C82A1C)"},
  {k:"wallet",n:L("กระเป๋าเงิน","Wallet"),bg:"linear-gradient(160deg,#2E2E36,#111116)"},
  {k:"board",n:L("หลักฐาน","Evidence"),bg:"linear-gradient(160deg,#A98BE0,#6A45B0)",badge:S.evNew||0},
  {k:"dex",n:L("สมุดกลโกง","Handbook"),bg:"linear-gradient(160deg,#F5A25D,#D2601E)"},
  {k:"feed",n:L("เตือนภัยกัน","Scam Alert"),bg:"linear-gradient(160deg,#F9CE34,#EE2A7B 55%,#6228D7)",badge:feedUnread()},
  {k:"map",n:L("แผนที่","Map"),bg:"linear-gradient(160deg,#6FD18B,#2E8B4A)"},
  {k:"set",n:L("ตั้งค่า","Settings"),bg:"linear-gradient(160deg,#9AA1AA,#5E656E)",badge:(()=>{const [a,b]=psScore();return b-a;})()}
];
function openPhone(){
  if(S.phoneBroken) return openHacked();
  if(S.hack) return openHackWarn();
  const d=new Date(), date=L(`วัน${TH_DAYS[d.getDay()]}ที่ ${d.getDate()} ${TH_MON[d.getMonth()]}`, d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"}));
  const app=(a,dock)=>`<button class="happ" data-app="${a.k}"><span class="hic" style="background:${a.bg}">${phIcon(a.k)}${a.badge?`<i class="hbadge">${a.badge>9?"9+":a.badge}</i>`:""}</span><small>${esc(a.n)}</small></button>`;
  const all=PH_APPS(), grid=all.filter(a=>!PH_DOCK.includes(a.k)).map(a=>app(a)).join(""), dock=PH_DOCK.map(k=>app(all.find(a=>a.k===k),true)).join("");
  const wx=WX.rainOn?L("ฝนตก","Raining")+(umbOpen()?" · ☂️":""):nightAmt()>.5?L("กลางคืน","Night"):nightAmt()>.1?L("ใกล้ค่ำ","Evening"):L("ท้องฟ้าแจ่มใส","Clear sky");
  openSheet("phone", `${top_(L("โทรศัพท์ของคุณ","Your phone"))}<div class="sh-body"><div class="device homescr"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <div class="hs-clock"><b>${nowClock()}</b><small>${date}</small></div>
    <div class="hs-widget"><div class="hs-place"><small>${L("ตอนนี้อยู่ที่","You are at")}</small><b>${esc(placeName())}</b></div>
      <div class="hs-row"><span>${wxIcon()} ${wx}</span><span class="hs-money">${BAHT(S.coins)}</span></div></div>
    <div class="hs-grid">${grid}</div>
    <div class="hs-dock">${dock}</div>
    <div class="homebar"></div></div></div></div>`);
  $("sheet").querySelectorAll("[data-app]").forEach(b=>b.onclick=()=>phoneApp(b.dataset.app));
}
function phoneScreen(title, inner){
  openSheet("phone", `${top_(title)}<div class="sh-body"><div class="device"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <button class="ph-back" data-phhome>‹ ${L("หน้าหลัก","Home")}</button><div class="apptitle">${title}</div>${inner}<div class="homebar"></div></div></div></div>`);
}
function phoneApp(k){
  sfx("blip");
  if(k==="chat") return needNet(()=>openChats());
  if(k==="wifi"){ if(WIFI[S.zone]) return openWifi();
    return phoneScreen("Wi-Fi", `<div class="clist"><div class="crow wrow"><span class="wfi">📱</span><span class="cb"><b>${L("เน็ตมือถือ 5G · เชื่อมต่ออยู่","Mobile 5G · connected")}</b><small>${L("แถวนี้ไม่มี Wi-Fi ของร้าน ใช้เน็ตตัวเองปลอดภัยกว่า Wi-Fi สาธารณะ","No shop Wi-Fi around here. Your own data is safer than public Wi-Fi")}</small></span><span class="sig">▂▄▆█</span></div></div>`); }
  if(k==="scan") return openScan();
  if(k==="wallet") return phoneScreen(L("กระเป๋าเงิน","Wallet"), `<div class="pwallet"><small>${L("ยอดเงินคงเหลือ","Balance")}</small><b>${BAHT(S.coins)}</b>
      <p>${L("ได้เงินจากการช่วยคนในแต่ละเคส และตัดสินข้อความหลอกได้ถูก","Earn money by helping people in cases and spotting scam messages")}</p></div>
    <div class="clist">${SHOP.filter(it=>S.items[it.id]).map(it=>`<div class="crow"><span class="av">${it.i}</span><span class="cb"><b>${esc(it.n[EN()?1:0])}</b><small>${esc(it.d[EN()?1:0])}</small></span></div>`).join("")||`<p class="cempty">${L("ยังไม่มีของอัปเกรด ซื้อได้ที่ร้านซ่อมมือถือริมถนน","No upgrades yet. Buy them at the phone stall on the street")}</p>`}</div><div class="btns"><button class="btn y" data-shop><span>🛒 ${L("ร้านอัปเกรด","Upgrade shop")}</span></button></div>`);
  if(k==="board") return openBoard();
  if(k==="dex") return openDex();
  if(k==="map") return openZones();
  if(k==="set") return openPhoneSettings();
  if(k==="phone") return openDialer();
  if(k==="feed") return needNet(()=>openFeed());
}
/* the scan app is a plain virus scanner */
let scanAt=-99;
function openScan(){
  phoneScreen(L("สแกนไวรัส","Virus scan"), `<div class="scanpad"><div class="radar" id="radar"><i></i><b>🛡️</b></div>
    <p>${L("ตรวจหาแอปแปลกปลอมและมัลแวร์ในเครื่อง ถ้าเพิ่งต่อ Wi-Fi แปลกๆ ให้สแกนทันที","Checks the phone for rogue apps and malware. Joined an odd Wi-Fi? Scan right away")}</p>
    <button class="btn y" data-doscan><span>🛡️ ${L("เริ่มสแกน","Start scan")}</span></button></div><div id="scanOut"></div>`);
  $("sheet").querySelector("[data-doscan]").onclick=doScan;
}
function doScan(){
  const t0=performance.now()/1000, wait=Math.ceil(10-(t0-scanAt));
  if(wait>0){ $("scanOut").innerHTML=`<p class="cempty">${L(`เพิ่งสแกนไป รออีก ${wait} วินาที`,`Just scanned. Wait ${wait}s`)}</p>`; return; }
  scanAt=t0; $("radar").classList.add("on"); $("scanOut").innerHTML=`<p class="cempty">${L("กำลังสแกน…","Scanning…")}</p>`; sfx("ping");
  const b=$("sheet").querySelector("[data-doscan]"); if(b) b.disabled=true;
  setTimeout(()=>{ if(!$("scanOut")) return; $("radar").classList.remove("on"); if(b) b.disabled=false; $("scanOut").innerHTML=scanReport(); }, RM?250:1700);
}
function scanReport(){
  if(S.phoneBroken) return `<div class="endcard danger"><b>☠ ${L("มัลแวร์ยึดเครื่องแล้ว ลบเองไม่ได้","Malware has taken over. It can't be removed here")}</b><p style="margin:.3em 0 0">${L("รีบไปร้านหมอโฟนริมถนนให้ล้างเครื่อง","Hurry to Phone Dr. by the road to wipe it")}</p></div>`;
  if(S.hack){ const net=S.hack.net; S.hack=null; save(); hudKey=""; sfx("good");
    return `<div class="endcard safe"><b>✅ ${L("เจอมัลแวร์ 1 ตัว ลบแล้ว!","Found 1 piece of malware and removed it!")}</b><p style="margin:.3em 0 0">${L(`มาจาก Wi-Fi “${esc(net||"")}” อย่าต่อเครือข่ายที่ไม่มีรหัสอีก แล้วเปลี่ยนรหัสบัญชีสำคัญด้วย`,`It came from the “${esc(net||"")}” Wi-Fi. Avoid open networks and change your important passwords`)}</p></div>`; }
  return `<div class="endcard safe"><b>✅ ${L("ไม่พบไวรัส","No viruses found")}</b><p style="margin:.3em 0 0">${L("เครื่องสะอาด แต่ยังต้องระวังลิงก์และ Wi-Fi แปลกๆ เหมือนเดิม","All clean. Still watch out for odd links and Wi-Fi")}</p></div>`;
}
function openChats(){
  if(S.phoneBroken) return openHacked();
  if(S.hack) return openHackWarn();
  S.chatSeen=true; save();
  const r=S.best.chat?{type:S.best.chat}:null;
  const row = (ava,name,prev,time,extra,attr)=>`<button class="crow" ${attr}><span class="av">${ava}</span><span class="cb"><span class="nh"><b>${name}</b><small>${time}</small></span><span class="pv">${prev}</span></span>${extra}</button>`;
  const inboxRows = S.inbox.map(id=>{ const m=MSGS.find(x=>x.id===id); return m?row(esc(m.from[EN()?1:0].slice(0,1)),esc(m.from[EN()?1:0]),esc(m.t[EN()?1:0]),L("ตอนนี้","now"),`<i class="unread"></i>`,`data-msg="${id}"`):""; }).join("");
  const rows = inboxRows + (S.chat ? row(L("ต","T"),L("ต้นข้าว","Ton Khao"),L("แก ส่งรหัส 6 หลักที่เพิ่งเข้าไปให้หน่อย ด่วน","hey, send me the 6-digit code you just got, urgent"),L("19:42","19:42"), r?`<span class="badge t-${r.type}">${TL(r.type)}</span>`:`<i class="unread"></i>`,"data-chat") : "")
    + row("N","NKT-Bank",L("[นครทอง] บัญชีของท่านถูกระงับชั่วคราว…","[Nakhonthong] Your account has been temporarily suspended…"),L("เมื่อวาน","Yesterday"),"","disabled")
    + row(L("แ","M"),L("แม่","Mum"),L("กินข้าวยังลูก","Have you eaten yet?"),L("จันทร์","Mon"),"","disabled");
  openSheet("phone", `${top_(L("โทรศัพท์ของคุณ","Your phone"))}<div class="sh-body"><div class="device"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <button class="ph-back" data-phhome>‹ ${L("หน้าหลัก","Home")}</button><div class="apptitle">${L("แชต","Chats")}</div><div class="clist">${rows}</div>
    ${S.chat?"":`<p class="cempty">${L("ข้อความใหม่จะเข้ามาระหว่างที่คุณช่วยคนในร้าน","New messages arrive while you're helping people in the café.")}</p>`}<div class="homebar"></div></div></div></div>`);
}

/* ---------- messages that arrive while you walk ---------- */
let msgT=-35;
function stepInbox(dt){
  if(!S.char || !S.intro || busy() || S.phoneBroken) return;
  msgT+=dt;
  if(msgT<60) return;
  msgT=Math.random()*-25;
  if(S.inbox.length>=3) return;
  const pool=MSGS.filter(m=>!S.inbox.includes(m.id) && !S.msgSeen.includes(m.id));
  const src=pool.length?pool:MSGS.filter(m=>!S.inbox.includes(m.id));
  if(!src.length) return;
  const m=src[Math.floor(Math.random()*src.length)];
  S.inbox.push(m.id); save(); hudKey=""; sfx("ping");
  toast(L(`📩 ข้อความใหม่จาก ${m.from[0]} · เปิดดูที่มือถือ`,`📩 New message from ${m.from[1]} · check your phone`));
}
function openMsg(id){
  if(S.phoneBroken) return openHacked();
  const m=MSGS.find(x=>x.id===id); if(!m) return;
  const from=m.from[EN()?1:0], text=m.t[EN()?1:0];
  openSheet("phone", `${top_(L("ข้อความใหม่","New message"))}<div class="sh-body">
    <div class="device"><span class="island"></span><div class="scr">${sbar(nowClock())}
      <div class="apphead"><span class="bk" aria-hidden="true">‹</span><span class="av sms">${esc(from.slice(0,1))}</span><span class="who"><b>${esc(from)}</b><small>${L("ข้อความ · SMS","Text message · SMS")}</small></span></div>
      <div class="msgs"><div class="stamp">${L("ตอนนี้","now")}</div><div class="inbub">${esc(text).replace(/([a-z0-9-]+(\.[a-z0-9-]+)+(\/[\w-]*)*)/gi,'<span class="url">$1</span>')}</div></div><div class="homebar"></div></div></div>
    <p class="note" style="text-align:center">${L("ข้อความนี้จริงหรือหลอก ตัดสินใจเลย","Real or scam? You decide.")}</p>
    <div class="judge"><button class="btn" data-judge="scam"><span>🚩 ${L("หลอก รายงานแล้วลบ","Scam: report & delete")}</span></button><button class="btn y" data-judge="ok" style="grid-template-columns:1fr"><span>✓ ${L("ปกติ เก็บไว้","Fine: keep it")}</span></button></div>
    <div id="judgeOut"></div></div>`);
  $("sheet").querySelectorAll("[data-judge]").forEach(b=>b.onclick=()=>{
    const said=b.dataset.judge==="scam", right=said===m.scam;
    S.inbox=S.inbox.filter(x=>x!==id); if(!S.msgSeen.includes(id)) S.msgSeen.push(id);
    S.msgStats[right?"ok":"bad"]++;
    sfx(right?"good":"bad");
    const k=m.bar, dv=right?3:-6; S.bars[k]=Math.max(0,Math.min(100,S.bars[k]+dv)); const mc=addCoins(right?5:(m.scam?-15:0)); save(); hudKey="";
    $("sheet").querySelectorAll("[data-judge]").forEach(x=>{ x.disabled=true; x.classList.toggle("dim",x!==b); });
    $("judgeOut").innerHTML=`<div class="endcard ${right?"safe":"danger"}"><b>${right?L("ถูกต้อง!","Correct!"):L("พลาดแล้ว","Not quite")}</b> · ${m.scam?L("ข้อความหลอก","Scam"):L("ข้อความปกติ","Legit")}<p style="margin:.3em 0 0">${m.why[EN()?1:0]}</p><span class="delta ${dv>0?"up":"down"}">${barName(k)} ${dv>0?"+":"−"}${Math.abs(dv)}</span> ${mc?coinTag(mc):""}</div>
      <div class="btns">${S.inbox.length?btn(L("ข้อความถัดไป","Next message"),`data-msg="${S.inbox[0]}"`,"y"):""}<button class="btn g" data-close><span>${L("ปิด","Close")}</span></button></div>`;
    $("judgeOut").querySelectorAll("[data-msg]").forEach(x=>x.onclick=()=>openMsg(x.dataset.msg));
    $("judgeOut").querySelectorAll("[data-close]").forEach(x=>x.onclick=()=>closeSheet());
  });
}
