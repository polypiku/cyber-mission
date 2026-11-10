/* ---------- the bag: items you carry (use them by tapping) and the evidence you've collected ----------
   and the phone's own Settings app: real phone security settings, separate from the game's settings */
if(S.umbOn===undefined) S.umbOn=false;
const psInit=()=>{ if(!S.ps) S.ps={lock:false, bio:false, preview:true, airdrop:"all", unknown:true, twofa:false, updated:false, autoUpd:false, findMy:false}; return S.ps; };
psInit();
const umbOpen=()=>hasUmbrella() && !!S.umbOn;  /* S.umbOn is unset in a fresh save = folded */
function toggleUmbrella(){
  if(!hasUmbrella()) return;
  S.umbOn=!S.umbOn; save(); hudKey=""; sfx("blip");
  toast(S.umbOn?L("☂️ กางร่มแล้ว","☂️ Umbrella up"):L("🌂 หุบร่มเก็บใส่กระเป๋าแล้ว","🌂 Umbrella folded into your bag"));
}
/* remind once per shower if it's raining and the umbrella is still in the bag */
let wetHinted=false;
function stepBag(){
  const rain=WX.rain>.25 && S.zone===0;
  if(!rain){ wetHinted=false; return; }
  if(!wetHinted && hasUmbrella() && !S.umbOn && !busy()){ wetHinted=true; toast(L("🌧️ ฝนตกแล้ว! กด 🎒 กระเป๋า (หรือปุ่ม U) เพื่อกางร่ม","🌧️ It's raining! Open 🎒 your bag (or press U) to put up your umbrella")); }
}
window.addEventListener("keydown",e=>{ if(e.code==="KeyU" && !e.repeat && !busy() && !/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||"")){ if(hasUmbrella()) toggleUmbrella(); else toast(L("ยังไม่มีร่ม ช่วยคนริมถนนตอนฝนตกเพื่อรับร่ม","No umbrella yet. Help someone on the street when it rains")); } });

let bagTab="items";
function openBag(tab){
  if(tab) bagTab=tab;
  const T=(k,ic,n)=>`<button class="bagtab ${bagTab===k?"on":""}" data-bagtab="${k}">${ic} ${n}</button>`;
  let body="";
  if(bagTab==="items"){
    const card=(ic,name,state,desc,act,cls="")=>`<div class="bagit ${cls}"><span class="bi">${ic}</span><div class="bb"><b>${name}</b>${state?`<em>${state}</em>`:""}<small>${desc}</small></div>${act||""}</div>`;
    const umb = hasUmbrella()
      ? card(umbOpen()?"☂️":"🌂", L("ร่ม","Umbrella"), umbOpen()?L("กางอยู่","In use"):L("หุบเก็บไว้","Folded"),
          L("กางตอนฝนตกจะได้ไม่เปียก ใช้ได้ตอนอยู่ข้างนอก · ปุ่มลัด U","Put it up so you stay dry outside · shortcut U"),
          `<button class="btn ${umbOpen()?"g":"y"} bagbtn" data-umb><span>${umbOpen()?L("หุบร่ม","Fold"):L("กางร่ม","Use")}</span></button>`)
      : card("🌂", L("ร่ม","Umbrella"), L("ยังไม่มี","Not yet"), L("ตอนฝนตก จะมีคนริมถนนต้องการความช่วยเหลือ ช่วยเขาแล้วจะได้ร่ม","When it rains, someone on the street needs help. Help them to get an umbrella"),"","lockd");
    const ups=SHOP.map(it=>card(it.i, esc(it.n[EN()?1:0]), S.items[it.id]?L("ติดตั้งในมือถือแล้ว · ทำงานเอง","Installed · works by itself"):L("ยังไม่มี","Not yet"),
      S.items[it.id]?esc(it.d[EN()?1:0]):L("ซื้อได้ที่ร้านหมอโฟนริมถนน","Buy it at the Phone Dr. on the street"),"",S.items[it.id]?"":"lockd")).join("");
    body=`<p class="baghead">${L("ของที่พกติดตัว","Things you carry")}</p><div class="baglist">${umb}</div>
      <p class="baghead">${L("อัปเกรดมือถือ","Phone upgrades")}</p><div class="baglist">${ups}</div>`;
  } else {
    const all=Object.keys(EVID), got=all.filter(k=>S.ev[k]);
    body=`<div class="bagev-top"><b>${got.length}/${all.length}</b><span>${L("หลักฐานที่เก็บได้ ยิ่งครบ ยิ่งจับแก๊งเงาได้หมด","pieces of evidence. The more you have, the more of the Shadow gang you catch")}</span></div>
      ${got.length?`<div class="baglist">${got.map(k=>`<div class="bagit ev g-${EVID[k].g}"><span class="bi">${EVID[k].i}</span><div class="bb"><b>${esc(EVID[k].t[EN()?1:0])}</b><small>${esc(EVID[k].d[EN()?1:0])}</small></div></div>`).join("")}</div>`
        :`<p class="cempty">${L("ยังไม่มีหลักฐาน ช่วยคนในเคสให้ปลอดภัยแล้วลงมือแก้ในมือถือเพื่อรับหลักฐาน","No evidence yet. Help people safely, then fix it on the phone to earn evidence")}</p>`}
      <div class="btns">${btn(L("เปิดบอร์ดหลักฐาน","Open the evidence board"),"data-board","y")}</div>`;
  }
  openSheet("bag", `${top_(L("🎒 กระเป๋า","🎒 Bag"))}<div class="sh-body"><div class="bagtabs">${T("items","🎒",L("ไอเท็ม","Items"))}${T("ev","🧩",L("หลักฐาน","Evidence"))}</div>${body}</div>`);
  const sh=$("sheet");
  sh.querySelectorAll("[data-bagtab]").forEach(b=>b.onclick=()=>{ sfx("blip"); openBag(b.dataset.bagtab); });
  const u=sh.querySelector("[data-umb]"); if(u) u.onclick=()=>{ toggleUmbrella(); openBag(); };
  const bd=sh.querySelector("[data-board]"); if(bd) bd.onclick=()=>openBoard();
}

/* ---------- phone Settings: like a real phone, each switch is a real security habit ---------- */
const PS_ROWS=()=>[
  {g:L("ล็อกหน้าจอ","Screen lock")},
  {k:"lock", ic:"🔒", bg:"#E5402F", n:L("รหัสล็อกหน้าจอ","Screen passcode"), want:true, why:L("มือถือหาย คนเก็บได้ก็เปิดแอปธนาคารและอ่าน OTP ไม่ได้","If the phone is lost, nobody can open your bank app or read OTPs")},
  {k:"bio", ic:"🫆", bg:"#E77FA0", n:L("สแกนใบหน้า / ลายนิ้วมือ","Face / fingerprint unlock"), want:true, need:"lock", why:L("ปลดล็อกเร็วโดยไม่ต้องพิมพ์รหัสให้ใครแอบมอง","Unlock fast without typing a code someone can watch")},
  {k:"preview", ic:"💬", bg:"#4CD964", n:L("แสดงเนื้อหาข้อความบนหน้าจอล็อก","Show message text on lock screen"), want:false, why:L("OTP ที่เด้งบนหน้าจอล็อก ใครหยิบมือถือไปก็เห็น","OTPs popping up on the lock screen can be read by anyone holding the phone")},
  {g:L("การเชื่อมต่อ","Connections")},
  {k:"airdrop", ic:"📡", bg:"#2F6DB5", n:L("AirDrop / แชร์ใกล้เคียง","AirDrop / Nearby Share"), seg:[["off",L("ปิด","Off")],["contacts",L("ผู้ติดต่อ","Contacts")],["all",L("ทุกคน","Everyone")]], ok:v=>v!=="all", why:L("เปิดรับจากทุกคน คนแปลกหน้าส่งรูปหรือไฟล์อันตรายมาได้","Open to everyone lets strangers send you pictures or harmful files")},
  {g:L("ความปลอดภัย","Security")},
  {k:"unknown", ic:"📦", bg:"#FF8A50", n:L("ติดตั้งแอปจากแหล่งที่ไม่รู้จัก","Install unknown apps"), want:false, why:L("แอปปลอมที่ส่งมาทางไลน์หรือ SMS (.apk) ลงเครื่องไม่ได้","Fake apps sent by LINE or SMS (.apk) can't get installed")},
  {k:"twofa", ic:"🔑", bg:"#7A5AA6", n:L("ยืนยันตัวตนสองขั้นตอน","Two-step verification"), want:true, why:L("ถึงรหัสผ่านหลุด คนร้ายก็ยังเข้าบัญชีไม่ได้","Even if your password leaks, nobody else can sign in")},
  {k:"findMy", ic:"📍", bg:"#2E9A6E", n:L("ค้นหามือถือของฉัน","Find my phone"), want:true, why:L("มือถือหายก็ล็อกหรือลบข้อมูลจากเครื่องอื่นได้","If it's lost, lock or wipe it from another device")},
  {g:L("ทั่วไป","General")},
  {k:"updated", ic:"⬇️", bg:"#6E7780", n:L("อัปเดตซอฟต์แวร์","Software update"), upd:true, want:true, why:L("อัปเดตปิดช่องโหว่ที่คนร้ายใช้เจาะเครื่อง","Updates close the holes attackers use")},
  {k:"autoUpd", ic:"🔁", bg:"#6E7780", n:L("อัปเดตอัตโนมัติ","Automatic updates"), want:true, why:L("ไม่ต้องจำ เครื่องอัปเดตเองตอนชาร์จกลางคืน","No need to remember. It updates while charging at night")}
];
const psOk=(r)=>r.seg?r.ok(S.ps[r.k]):S.ps[r.k]===r.want;
function psScore(){ psInit(); const rows=PS_ROWS().filter(r=>r.k); return [rows.filter(psOk).length, rows.length]; }
let psUpdating=false;
function openPhoneSettings(){
  psInit();
  const [ok,n]=psScore(), full=ok===n;
  const rows=PS_ROWS().map(r=>{
    if(r.g) return `<div class="ps-g">${r.g}</div>`;
    const good=psOk(r), off=r.need && !S.ps[r.need];
    let ctl;
    if(r.seg) ctl=`<div class="ps-seg">${r.seg.map(([v,lab])=>`<button class="${S.ps[r.k]===v?"on":""}" data-psseg="${r.k}" data-v="${v}">${lab}</button>`).join("")}</div>`;
    else if(r.upd) ctl=S.ps.updated?`<span class="ps-val">${L("ล่าสุดแล้ว","Up to date")}</span>`:`<button class="ps-updbtn" data-psupd ${psUpdating?"disabled":""}>${psUpdating?L("กำลังอัปเดต…","Updating…"):L("อัปเดตเลย","Update now")}</button>`;
    else ctl=`<button class="ps-sw ${S.ps[r.k]?"on":""}" role="switch" aria-checked="${!!S.ps[r.k]}" aria-label="${esc(r.n)}" data-pssw="${r.k}" ${off?"disabled":""}><i></i></button>`;
    return `<div class="ps-row ${r.seg?"ps-segrow":""}"><span class="ps-ic" style="background:${r.bg}">${r.ic}</span><div class="ps-b"><b>${r.n}${r.upd&&!S.ps.updated?` <span class="ps-red">1</span>`:""}</b><small class="${good?"ok":"bad"}">${good?"✓ ":"⚠ "}${r.why}</small></div>${ctl}</div>`;
  }).join("");
  phoneScreen(L("ตั้งค่า","Settings"), `<div class="ps">
    <div class="ps-acct"><span class="ps-av">${esc((S.name||"?").slice(0,1))}</span><div><b>${esc(S.name||L("เจ้าของเครื่อง","Owner"))}</b><small>${L("บัญชีผู้ใช้ · รหัสผ่าน · การชำระเงิน","Account · passwords · payments")}</small></div></div>
    <div class="ps-check ${full?"full":""}"><div><b>${L("ตรวจความปลอดภัยของเครื่อง","Phone security check")}</b><small>${full?L("ตั้งค่าปลอดภัยครบแล้ว เยี่ยมมาก!","All safe. Nicely done!"):L(`ยังมี ${n-ok} อย่างที่ควรแก้ ดูที่ ⚠`,`${n-ok} thing(s) to fix. Look for ⚠`)}</small></div><span class="ps-meter"><i style="width:${ok/n*100}%"></i></span><em>${ok}/${n}</em></div>
    ${rows}
    <div class="ps-g">${L("เกี่ยวกับเครื่อง","About")}</div>
    <div class="ps-row"><span class="ps-ic" style="background:#9AA3AD">📱</span><div class="ps-b"><b>${L("ระบบปฏิบัติการ","System version")}</b><small>${S.ps.updated?"PhoneOS 18.4":"PhoneOS 18.0"} · ${L("พื้นที่ว่าง 41 GB","41 GB free")}</small></div></div>
    <p class="ps-foot">${L("ตั้งค่าเกม เช่น เสียงและภาษา อยู่ที่ปุ่มเฟือง ⚙ มุมขวาบนของจอ","Game settings like sound and language are on the ⚙ button at the top right of the screen")}</p></div>`);
  const sh=$("sheet");
  sh.querySelectorAll("[data-pssw]").forEach(b=>b.onclick=()=>{ const k=b.dataset.pssw; S.ps[k]=!S.ps[k]; if(k==="lock"&&!S.ps.lock) S.ps.bio=false; psChanged(); });
  sh.querySelectorAll("[data-psseg]").forEach(b=>b.onclick=()=>{ S.ps[b.dataset.psseg]=b.dataset.v; psChanged(); });
  const u=sh.querySelector("[data-psupd]"); if(u) u.onclick=()=>{ psUpdating=true; sfx("ping"); openPhoneSettings(); setTimeout(()=>{ psUpdating=false; S.ps.updated=true; psChanged(); }, RM?200:1400); };
}
function psChanged(){
  sfx("blip"); const [ok,n]=psScore();
  if(ok===n && !S.psDone){ S.psDone=true; const m=addCoins(60); S.bars.privacy=Math.min(100,S.bars.privacy+8); hudKey=""; sfx("good");
    setTimeout(()=>toast(L(`🛡️ มือถือปลอดภัยครบทุกข้อ! +${m} บาท · ความเป็นส่วนตัว +8`,`🛡️ Phone fully secured! +${m} baht · privacy +8`)),200); }
  save();
  const sc=$("sheet").querySelector(".scr"), y=sc?sc.scrollTop:0;
  if($("sheet").querySelector(".ps")) openPhoneSettings();
  const sc2=$("sheet").querySelector(".scr"); if(sc2) sc2.scrollTop=y;
}
