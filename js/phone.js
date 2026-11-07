/* The phone: home screen, chats, Wi-Fi, scanner and incoming messages. */
/* ---------- realistic phone screens ---------- */
const SB_ICONS='<svg viewBox="0 0 54 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="6" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/><path d="M24 4.5a8 8 0 0110 0M26 7a4.6 4.6 0 016 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="29" cy="10" r="1.3"/><rect x="38" y="1.5" width="13" height="9" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="40" y="3.5" width="8" height="5" rx="1"/><rect x="51.6" y="4.5" width="1.6" height="3" rx=".6"/></svg>';
const nowClock=()=>{ const d=new Date(); return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"); };
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
    <button class="ncard" id="peekOpen"><span class="appic"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg></span><span class="nb"><span class="nh"><b>${L("ต้นข้าว","Ton Khao")}</b><small>${L("ตอนนี้","now")}</small></span><span>${L("แกๆ ว่างมั้ย ขอยืม 3,000 หน่อย","hey are you free? can I borrow 3,000")}</span></span></button>
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
const PH_APPS=()=>[
  {k:"chat",i:"💬",n:L("แชต","Chats"),bg:"linear-gradient(160deg,#4CD964,#1FA34A)",badge:S.inbox.length+(S.chat&&!S.best.chat?1:0)},
  {k:"wifi",i:"📶",n:"Wi-Fi",bg:"linear-gradient(160deg,#5AA9F0,#1F5FB5)"},
  {k:"scan",i:"🔍",n:L("สแกน","Scan"),bg:"linear-gradient(160deg,#FF6B5A,#C82A1C)"},
  {k:"wallet",i:"💵",n:L("กระเป๋าเงิน","Wallet"),bg:"linear-gradient(160deg,#FFD25A,#E89A1C)"},
  {k:"board",i:"🗂️",n:L("หลักฐาน","Evidence"),bg:"linear-gradient(160deg,#A98BE0,#6A45B0)",badge:S.evNew||0},
  {k:"dex",i:"📖",n:L("สมุดกลโกง","Handbook"),bg:"linear-gradient(160deg,#F08A5D,#B8481E)"},
  {k:"map",i:"🗺️",n:L("แผนที่","Map"),bg:"linear-gradient(160deg,#6FD18B,#2E8B4A)"},
  {k:"set",i:"⚙️",n:L("ตั้งค่า","Settings"),bg:"linear-gradient(160deg,#B8BEC6,#6E7780)"}
];
function openPhone(){
  if(S.phoneBroken) return openHacked();
  if(S.hack) return openHackWarn();
  const d=new Date(), date=L(`วัน${TH_DAYS[d.getDay()]}ที่ ${d.getDate()} ${TH_MON[d.getMonth()]}`, d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"}));
  const apps=PH_APPS().map(a=>`<button class="happ" data-app="${a.k}"><span class="hic" style="background:${a.bg}">${a.i}${a.badge?`<i class="hbadge">${a.badge}</i>`:""}</span><small>${esc(a.n)}</small></button>`).join("");
  openSheet("phone", `${top_(L("โทรศัพท์ของคุณ","Your phone"))}<div class="sh-body"><div class="device homescr"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <div class="hs-clock"><b>${nowClock()}</b><small>${date}</small></div>
    <div class="hs-widget"><span>📍 ${esc(placeName())}</span><span>💵 ${BAHT(S.coins)}</span></div>
    <div class="hs-grid">${apps}</div>
    <button class="hs-scan" data-app="scan"><span class="hs-scan-ic">🔍</span><span><b>${L("สแกนรอบตัว","Scan around me")}</b><small>${L("หา Wi-Fi ปลอมและเครื่องดักข้อมูล","Find fake Wi-Fi and snooping devices")}</small></span></button>
    <div class="homebar"></div></div></div></div>`);
  $("sheet").querySelectorAll("[data-app]").forEach(b=>b.onclick=()=>phoneApp(b.dataset.app));
}
function phoneScreen(title, inner){
  openSheet("phone", `${top_(title)}<div class="sh-body"><div class="device"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <button class="ph-back" data-phhome>‹ ${L("หน้าหลัก","Home")}</button><div class="apptitle">${title}</div>${inner}<div class="homebar"></div></div></div></div>`);
}
function phoneApp(k){
  sfx("blip");
  if(k==="chat") return openChats();
  if(k==="wifi"){ if(WIFI[S.zone]) return openWifi();
    return phoneScreen("Wi-Fi", `<div class="clist"><div class="crow wrow"><span class="wfi">📱</span><span class="cb"><b>${L("เน็ตมือถือ 5G · เชื่อมต่ออยู่","Mobile 5G · connected")}</b><small>${L("แถวนี้ไม่มี Wi-Fi ของร้าน ใช้เน็ตตัวเองปลอดภัยกว่า Wi-Fi สาธารณะ","No shop Wi-Fi around here. Your own data is safer than public Wi-Fi")}</small></span><span class="sig">▂▄▆█</span></div></div>`); }
  if(k==="scan") return openScan();
  if(k==="wallet") return phoneScreen(L("กระเป๋าเงิน","Wallet"), `<div class="pwallet"><small>${L("ยอดเงินคงเหลือ","Balance")}</small><b>${BAHT(S.coins)}</b>
      <p>${L("ได้เงินจากการช่วยคนในแต่ละเคส และตัดสินข้อความหลอกได้ถูก","Earn money by helping people in cases and spotting scam messages")}</p></div>
    <div class="clist">${SHOP.filter(it=>S.items[it.id]).map(it=>`<div class="crow"><span class="av">${it.i}</span><span class="cb"><b>${esc(it.n[EN()?1:0])}${it.stack?` ×${S.items[it.id]}`:""}</b><small>${esc(it.d[EN()?1:0])}</small></span></div>`).join("")||`<p class="cempty">${L("ยังไม่มีของอัปเกรด ซื้อได้ที่ร้านซ่อมมือถือริมถนน","No upgrades yet. Buy them at the phone stall on the street")}</p>`}</div>`);
  if(k==="board") return openBoard();
  if(k==="dex") return openDex();
  if(k==="map") return openZones();
  if(k==="set") return openMenu();
}
let scanAt=-99;
function openScan(){
  phoneScreen(L("สแกน","Scan"), `<div class="scanpad"><div class="radar" id="radar"><i></i><b>📡</b></div>
    <p>${L("สแกน Wi-Fi และอุปกรณ์รอบตัว เพื่อหาเครือข่ายปลอมหรือเครื่องที่แอบดักข้อมูล","Scan nearby Wi-Fi and devices for fake networks or anything snooping on traffic")}</p>
    <button class="btn y" data-doscan><span>🔍 ${L("เริ่มสแกน","Start scan")}</span></button></div><div id="scanOut"></div>`);
  $("sheet").querySelector("[data-doscan]").onclick=doScan;
}
function doScan(){
  const t0=performance.now()/1000, wait=Math.ceil(15-(t0-scanAt));
  if(wait>0){ $("scanOut").innerHTML=`<p class="cempty">${L(`เพิ่งสแกนไป รออีก ${wait} วินาทีแล้วค่อยสแกนใหม่`,`Just scanned. Wait ${wait}s before scanning again`)}</p>`; return; }
  scanAt=t0; $("radar").classList.add("on"); $("scanOut").innerHTML=`<p class="cempty">${L("กำลังสแกน…","Scanning…")}</p>`; sfx("ping");
  const b=$("sheet").querySelector("[data-doscan]"); if(b) b.disabled=true;
  setTimeout(()=>{ if(!$("scanOut")) return; $("radar").classList.remove("on"); if(b) b.disabled=false; $("scanOut").innerHTML=scanReport(); }, RM?250:1700);
}
function scanReport(){
  const z=S.zone, w=WIFI[z], rows=[]; let risk=0, extra="";
  const row=(ok,n,d)=>`<div class="scanrow ${ok?"ok":"bad"}"><span>${ok?"✅":"⚠️"}</span><span><b>${esc(n)}</b><small>${d}</small></span></div>`;
  if(w){ rows.push(row(true,w.real.n,L("มีรหัสผ่าน · WPA2 · ของร้านจริง","Password · WPA2 · the shop's own")));
    if(vilOn()){ w.fakes.forEach(f=>{ risk++; rows.push(row(false,f.n,L("เปิด ไม่มีรหัส · ชื่อเลียนแบบร้าน · ให้ล็อกอินก่อนใช้","Open, no password · copies the shop's name · wants you to log in"))); }); } }
  rows.push(row(true,L("เน็ตมือถือ 5G (ของคุณ)","Mobile 5G (yours)"),L("เข้ารหัสโดยผู้ให้บริการ ปลอดภัย","Encrypted by your carrier · safe")));
  const v=npcs.find(n=>n.vil);
  if(vilOn() && v){ const d=Math.hypot(v.x-player.x,v.y-player.y), lvl=d<170?3:d<360?2:1; risk++;
    extra=`<div class="scan-dev l${lvl}"><b>📡 ${L("พบเครื่องปล่อย Wi-Fi ปลอมอยู่แถวนี้","Rogue hotspot somewhere nearby")}</b><span class="sigb">${"▮".repeat(lvl)}${"▯".repeat(3-lvl)}</span>
      <small>${[L("สัญญาณอ่อน อยู่ไกลจากคุณ ลองเดินไปอีกมุมแล้วสแกนใหม่","Weak: it's far from you. Move to another spot and scan again"),L("สัญญาณปานกลาง อยู่ไม่ไกล ลองขยับเข้าไปอีก","Medium: not far. Move a bit closer"),L("สัญญาณแรงมาก! อยู่ห่างแค่ไม่กี่ก้าว สังเกตคนรอบตัวที่ก้มเล่นเครื่องแปลกๆ","Very strong! Only a few steps away. Watch for someone fiddling with an odd device")][lvl-1]}</small></div>`; }
  if(z===8 && isScam(S.bld) && !raided()){ risk++;
    extra+=`<div class="scan-dev l3"><b>📶 ${L("มีซิมการ์ดออนไลน์พร้อมกันกว่า 300 ซิมจากชั้นบน","Over 300 SIM cards online at once upstairs")}</b><small>${L("ออฟฟิศทั่วไปไม่ใช้ซิมเยอะขนาดนี้ แบบนี้คล้าย “ซิมบ็อกซ์” ที่แก๊งคอลเซ็นเตอร์ใช้โทรหาเหยื่อ","Normal offices don't run this many SIMs. It looks like a “SIM box”, the kind call-centre gangs use to phone victims")}</small></div>`; }
  const verdict=risk?`<div class="endcard danger"><b>⚠ ${L(`พบความเสี่ยง ${risk} จุด`,`${risk} risk${risk>1?"s":""} found`)}</b><p style="margin:.3em 0 0">${L("ต่อเฉพาะ Wi-Fi ที่ร้านให้รหัสเอง หรือใช้เน็ตมือถือตัวเอง","Only join Wi-Fi the shop gives you a password for, or use your own data")}</p></div>`
    :`<div class="endcard safe"><b>✅ ${L("ไม่พบสิ่งผิดปกติ","Nothing suspicious")}</b><p style="margin:.3em 0 0">${L("แต่ยังต้องระวังลิงก์และข้อความแปลกๆ เหมือนเดิม","Still watch out for odd links and messages")}</p></div>`;
  return `${verdict}${extra}<div class="apptitle" style="font-size:1rem;padding:10px 4px 2px">${L("เครือข่ายที่เจอ","Networks found")}</div>${rows.join("")}`;
}
function openChats(){
  if(S.phoneBroken) return openHacked();
  if(S.hack) return openHackWarn();
  S.chatSeen=true; save();
  const r=S.best.chat?{type:S.best.chat}:null;
  const row = (ava,name,prev,time,extra,attr)=>`<button class="crow" ${attr}><span class="av">${ava}</span><span class="cb"><span class="nh"><b>${name}</b><small>${time}</small></span><span class="pv">${prev}</span></span>${extra}</button>`;
  const inboxRows = S.inbox.map(id=>{ const m=MSGS.find(x=>x.id===id); return m?row(esc(m.from[EN()?1:0].slice(0,1)),esc(m.from[EN()?1:0]),esc(m.t[EN()?1:0]),L("ตอนนี้","now"),`<i class="unread"></i>`,`data-msg="${id}"`):""; }).join("");
  const rows = inboxRows + (S.chat ? row(L("ต","T"),L("ต้นข้าว","Ton Khao"),L("แกๆ ว่างมั้ย ขอยืม 3,000 หน่อย","hey are you free? can I borrow 3,000"),L("19:42","19:42"), r?`<span class="badge t-${r.type}">${TL(r.type)}</span>`:`<i class="unread"></i>`,"data-chat") : "")
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
