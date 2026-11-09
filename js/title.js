/* The title screen shown when the game opens: a dusk town backdrop, the logo, and the play button.
   To use a picture logo later, set LOGO_SRC to its path (e.g. "assets/logo.webp"). */
const LOGO_SRC = null;
const GAME_VER = "v0.3";
let titleOn=false;

function cityBackdrop(){
  /* far hills, a temple spire, the campus tower, shophouses and trees, with lit windows */
  const win=(x,y,w,h,cols,rows,seed)=>{ let s="", r=seeded(seed); for(let i=0;i<cols;i++) for(let j=0;j<rows;j++){ if(r()<.35) continue; s+=`<rect x="${x+8+i*(w-16)/cols}" y="${y+10+j*(h-20)/rows}" width="${(w-16)/cols-6}" height="${(h-20)/rows-8}" rx="2" fill="${r()<.7?"#FFD27A":"#FFE9B0"}" opacity="${.65+r()*.35}"/>`; } return s; };
  let trees=""; const r=seeded(77);
  for(let x=-20;x<1640;x+=38+r()*30){ const h=60+r()*60; trees+=`<circle cx="${x}" cy="${452-h*.4}" r="${26+r()*22}" fill="#1E2A3F"/>`; }
  return `<svg class="t-city" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <path d="M0 330 Q200 230 380 300 T760 280 T1140 250 T1600 300 V520 H0Z" fill="#7B4E86" opacity=".55"/>
    <path d="M0 360 Q260 300 520 350 T1040 330 T1600 350 V520 H0Z" fill="#5A3A70" opacity=".7"/>
    <g fill="#3A2752"><path d="M1250 360 L1262 230 L1274 360Z"/><rect x="1236" y="350" width="52" height="40"/><path d="M1220 392 h84 l-10 -16 h-64z"/></g>
    <g fill="#2B2340"><rect x="140" y="250" width="150" height="200"/><rect x="190" y="190" width="50" height="70"/><path d="M182 192 L215 160 L248 192Z"/><circle cx="215" cy="222" r="14" fill="#FFE9B0"/>${win(140,260,150,180,4,4,3)}</g>
    <g fill="#26203A"><rect x="330" y="300" width="170" height="150"/><path d="M318 304 L415 262 L512 304Z"/>${win(330,310,170,130,4,3,5)}
      <rect x="560" y="320" width="140" height="130"/><path d="M548 324 L630 286 L712 324Z"/>${win(560,330,140,110,3,3,7)}
      <rect x="900" y="280" width="200" height="170"/>${win(900,290,200,150,5,4,9)}
      <rect x="1350" y="300" width="180" height="150"/><path d="M1338 304 L1440 262 L1542 304Z"/>${win(1350,310,180,130,4,3,11)}</g>
    <g>${trees}</g>
    <rect x="0" y="452" width="1600" height="68" fill="#1A1626"/>
    <path d="M0 470 H1600" stroke="#FFC414" stroke-width="3" stroke-dasharray="40 30" opacity=".7"/>
    ${[120,420,720,1020,1320].map(x=>`<g><rect x="${x}" y="370" width="5" height="84" fill="#120F1C"/><circle cx="${x+2}" cy="366" r="9" fill="#FFE38A"/><circle cx="${x+2}" cy="366" r="26" fill="#FFE38A" opacity=".18"/></g>`).join("")}
  </svg>`;
}
function logoHTML(){
  if(LOGO_SRC) return `<img class="t-logoimg" src="${LOGO_SRC}" alt="Cyber Mission">`;
  return `<div class="t-logo" role="img" aria-label="Cyber Mission ภารกิจรู้ทันไซเบอร์">
    <svg class="t-shield" viewBox="0 0 64 72" aria-hidden="true"><path d="M32 3 L60 13 V35 C60 52 47 64 32 69 C17 64 4 52 4 35 V13Z" fill="#2F6DB5" stroke="#141414" stroke-width="4"/><path d="M22 33 h20 v16 h-20z" fill="#FFC414" stroke="#141414" stroke-width="3"/><path d="M25 33 v-6 a7 7 0 0 1 14 0 v6" fill="none" stroke="#141414" stroke-width="3.5"/></svg>
    <span class="t-w1">CYBER</span><span class="t-w2">MISSION</span>
    <span class="t-ribbon">ภารกิจรู้ทันไซเบอร์</span></div>`;
}
function openTitle(){
  titleOn=true;
  const el=$("title"), resume=S.char && (S.intro || doneCount());
  el.innerHTML=`<div class="t-sky"></div><div class="t-sun"></div><div class="t-bits" aria-hidden="true">${Array.from({length:18},(_,i)=>`<i style="left:${(i*53)%100}%;animation-delay:-${(i*.73)%9}s;animation-duration:${8+(i%5)*2}s">${i%3?"1":"0"}</i>`).join("")}</div>
    ${cityBackdrop()}
    <div class="t-top"><span class="t-chip">${L("เวอร์ชันทดสอบ","Test build")} ${GAME_VER}</span>${langSw()}</div>
    <main class="t-center">
      ${logoHTML()}
      <div class="t-plank">${resume&&S.name?L(`ยินดีต้อนรับกลับ ${esc(S.name)}`,`Welcome back, ${esc(S.name)}`):L("ยินดีต้อนรับ","Welcome")}</div>
      <button class="t-play" data-tplay><span><b>${resume?L("เล่นต่อ","Continue"):L("เริ่มเล่น","Play")}</b><small>${resume?"CONTINUE":"PLAY"}</small></span><i aria-hidden="true">›</i></button>
      ${resume?`<button class="t-again" data-tnew>${L("เริ่มเกมใหม่ / เปลี่ยนตัวละคร","New game / change character")}</button>`:""}
      <div class="t-row">
        <button data-thow><span aria-hidden="true">📖</span>${L("วิธีเล่น","How to play")}</button>
        <button data-tnews><span aria-hidden="true">📰</span>${L("อัปเดต","Updates")}</button>
        <button data-tset><span aria-hidden="true">⚙️</span>${L("ตั้งค่า","Settings")}</button>
      </div>
    </main>
    <footer class="t-foot"><button data-tcred>${L("ผู้จัดทำ","Credits")}</button><span>|</span><button data-tpriv>${L("ข้อมูลส่วนตัว","Privacy")}</button><span>|</span><span>${L("ชื่อคน ร้าน และเว็บในเกมเป็นเรื่องสมมติ","All names in the game are fictional")}</span></footer>`;
  el.hidden=false;
  const q=(s,f)=>{ const b=el.querySelector(s); if(b) b.onclick=f; };
  q("[data-tplay]",()=>{ sfx("good"); if(resume){ pickChar=S.char; beginGame("resume"); } else { hideTitle(); openStart(); } });
  q("[data-tnew]",()=>{ hideTitle(); openStart(); });
  q("[data-thow]",()=>titleSheet("how"));
  q("[data-tnews]",()=>titleSheet("news"));
  q("[data-tset]",()=>openSettings(true));
  q("[data-tcred]",()=>titleSheet("cred"));
  q("[data-tpriv]",()=>titleSheet("priv"));
  el.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{ S.lang=b.dataset.lang; save(); document.documentElement.lang=S.lang; openTitle(); });
}
function hideTitle(){ titleOn=false; const el=$("title"); if(el) el.hidden=true; }
function titleSheet(k){
  const C2={
    how:[L("📖 วิธีเล่น","📖 How to play"),`<ol class="list">
      <li>${L("เดินด้วยจอยสติ๊ก (มือถือ) หรือ WASD / ลูกศร (คอม) แตะหรือคลิกพื้นเพื่อเดินไปตรงนั้น","Walk with the joystick (phone) or WASD / arrows (computer). Tap or click the ground to walk there")}</li>
      <li>${L("คนที่มี ! เหนือหัวกำลังจะโดนหลอก เดินไปคุยแล้วเลือกทางที่ปลอดภัย","People with a ! are about to be scammed. Talk to them and pick the safe way")}</li>
      <li>${L("จบเคสแล้วลงมือแก้ในมือถือเพื่อรับเบาะแส","After a case, fix things on the phone to earn the clue")}</li>
      <li>${L("ป้ายเหลืองด้านบนบอกว่าต้องไปไหนต่อ กดปุ่มแผนที่ (หรือ M) เพื่อเปิดแผนที่เต็มจอ","The yellow goal pill says where to go next; the map button (or M) opens the full map")}</li>
      <li>${L("ระวังคนที่มีคลื่น Wi-Fi สีแดงลอยออกมา คนนั้นน่าสงสัย","Watch for people giving off red Wi-Fi waves: they're suspects")}</li>
      <li>${L("ส่งเบาะแสให้พี่ภพที่สถานีตำรวจ ยิ่งเยอะ ฉากจบยิ่งดี","Hand clues to Phop at the police station: the more, the better the ending")}</li></ol>`],
    news:[L("📰 อัปเดตล่าสุด","📰 Latest updates"),`<ul class="list">
      <li>${L("หน้าเข้าเกมใหม่ และแผนที่เต็มจอ (ปุ่มแผนที่ หรือกด M)","New title screen and a full-screen map (map button or M)")}</li>
      <li>${L("ถนนหน้าร้านมีต้นไม้ สวนหย่อม และหลังคาทรงไทย","The main street now has trees, gardens and Thai-style roofs")}</li>
      <li>${L("เน็ตมือถือหมดได้ ต้องเติมหรือต่อ Wi-Fi","Mobile data can run out: top up or join Wi-Fi")}</li>
      <li>${L("ขั้นลงมือแก้ในมือถือทุกเคส และเบาะแส 36 ชิ้น","A hands-on fix step for every case, and 36 clues")}</li></ul>`],
    cred:[L("ผู้จัดทำ","Credits"),`<p>${L("ออกแบบเกม เนื้อเรื่อง และกำกับ: ฑิตยา คูณศรี (พริ้ง) · วิทยาการคอมพิวเตอร์ มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ","Game design, story and direction: Thittaya Koonsee (Prink) · Computer Science, Huachiew Chalermprakiet University")}</p><p>${L("เขียนโค้ดร่วมกับ Claude (Anthropic)","Coded together with Claude (Anthropic)")}</p>`],
    priv:[L("ข้อมูลส่วนตัว","Privacy"),`<p>${L("เกมนี้ไม่ส่งข้อมูลออกไปไหน ชื่อและความคืบหน้าเก็บไว้ในเบราว์เซอร์ของเครื่องนี้เท่านั้น","This game sends nothing anywhere. Your name and progress stay in this browser only.")}</p>`]
  }[k];
  openSheet("tinfo", `${top_(C2[0],false)}<div class="sh-body">${C2[1]}<div class="btns"><button class="btn y" data-tback><span>${L("กลับ","Back")}</span></button></div></div>`);
  $("sheet").querySelector("[data-tback]").onclick=()=>closeSheet();
}
