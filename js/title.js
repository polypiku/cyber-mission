/* The title screen shown when the game opens: a night cyber-city backdrop with Mind and Non, the logo, and the play button.
   LOGO_SRC (the picture logo) is set in data/heroes.js so the single-file build can inline it. */
const GAME_VER = "v0.3";
let titleOn=false;

/* a night city in the logo's blues: glowing skyline, a circuit grid, floating pixels and the two heroes */
function cyberScene(){
  const r=(a,b)=>a+Math.random()*(b-a);
  let win=""; const bld=[[0,150,90],[95,230,70],[170,120,110],[285,260,80],[370,170,95],[470,300,70],[545,190,120],[670,240,85],[760,140,100],[865,280,75],[945,200,110],[1060,250,90],[1155,160,100],[1260,230,80],[1345,180,95]];
  const city=bld.map(([x,h,w],k)=>{ let ws=""; for(let yy=380-h+16; yy<370; yy+=22) for(let xx=x+10; xx<x+w-12; xx+=18) if(Math.random()<.42) ws+=`<rect x="${xx}" y="${yy}" width="8" height="10" rx="1.5" fill="${Math.random()<.7?"#5FD4FF":"#FFD34D"}" opacity="${(.45+Math.random()*.5).toFixed(2)}"/>`;
    return `<rect x="${x}" y="${380-h}" width="${w}" height="${h}" fill="${k%2?"#0B2563":"#0E2D74"}"/>${k%3===0?`<rect x="${x+w/2-2}" y="${380-h-26}" width="4" height="26" fill="#0E2D74"/><circle cx="${x+w/2}" cy="${380-h-28}" r="4" fill="#FF5A6E"/>`:""}${ws}`; }).join("");
  const px=Array.from({length:14},(_,k)=>`<i class="t-bit ${k%3===0?"y":k%3===1?"c":"b"}" style="left:${r(3,95).toFixed(1)}%;top:${r(6,62).toFixed(1)}%;--d:${r(0,4).toFixed(2)}s;--s:${(r(.7,1.3)).toFixed(2)}"></i>`).join("");
  const hero=(id,side)=>HEROES[id]?`<img class="t-hero ${side}" src="${HEROES[id].hero.src}" alt="">`:"";
  return `<div class="t-cyber" aria-hidden="true">
    <div class="t-glow"></div>${px}
    <svg class="t-city" viewBox="0 0 1440 380" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="tcG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E8BFF" stop-opacity=".0"/><stop offset="1" stop-color="#2E8BFF" stop-opacity=".35"/></linearGradient></defs><rect width="1440" height="380" fill="url(#tcG)"/>${city}<rect y="370" width="1440" height="10" fill="#49C8FF" opacity=".55"/></svg>
    <div class="t-floor"></div>
    ${hero(S.char==="studentBoy"?"studentBoy":"studentGirl","left")}${hero(S.char==="studentBoy"?"studentGirl":"studentBoy","right")}
  </div>`;
}
function logoHTML(){
  if(LOGO_SRC) return `<img class="t-logoimg" src="${LOGO_SRC}" alt="Cyber Mission">`;
  return `<div class="t-logo" role="img" aria-label="Cyber Mission ภารกิจรู้ทันไซเบอร์">
    <svg class="t-shield" viewBox="0 0 64 72" aria-hidden="true"><path d="M32 3 L60 13 V35 C60 52 47 64 32 69 C17 64 4 52 4 35 V13Z" fill="#3B7FD0" stroke="#2B1A10" stroke-width="5"/><path d="M32 10 L53 18 V35 C53 48 43 57 32 61 Z" fill="#fff" opacity=".18"/><path d="M22 33 h20 v16 h-20z" fill="#FFC414" stroke="#141414" stroke-width="3"/><path d="M25 33 v-6 a7 7 0 0 1 14 0 v6" fill="none" stroke="#141414" stroke-width="3.5"/></svg>
    <i class="t-px a"></i><i class="t-px b"></i><i class="t-px c"></i><i class="t-px d"></i>
    <span class="t-w1" data-t="CYBER">CYBER</span><span class="t-w2" data-t="MISSION">MISSION</span>
    <span class="t-ribbon">ภารกิจรู้ทันไซเบอร์</span></div>`;
}
function openTitle(){
  titleOn=true;
  const el=$("title"), resume=S.char && (S.intro || doneCount());
  el.innerHTML=`${cyberScene()}
    <div class="t-top"><span class="t-chip">${L("เวอร์ชันทดสอบ","Test build")} ${GAME_VER}</span>${langSw()}</div>
    <main class="t-center">
      ${logoHTML()}
      <div class="t-plank">${resume&&S.name?L(`ยินดีต้อนรับกลับ ${esc(S.name)}`,`Welcome back, ${esc(S.name)}`):L("ยินดีต้อนรับ","Welcome")}</div>
      <button class="t-play" data-tplay><em aria-hidden="true"></em><span><b>${resume?L("เล่นต่อ","Continue"):L("เริ่มเล่น","Play")}</b><small>${resume?"CONTINUE":"PLAY"}</small></span><i aria-hidden="true">›</i></button>
      ${resume?`<button class="t-again" data-tnew>${L("เริ่มเกมใหม่ / เปลี่ยนตัวละคร","New game / change character")}</button>`:""}
      <div class="t-row">
        <button data-thow><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3z" fill="#DCEBFA"/><path d="M21 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z" fill="#DCEBFA"/><path d="M3 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7zM5.5 9h4M5.5 12h4M14.5 9h4M14.5 12h4"/></svg>${L("วิธีเล่น","How to play")}</button>
        <button data-tnews><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="12" rx="2" fill="#FFF6E3"/><path d="M3 8l2.5-4.5L21 5.5 20 8" fill="#3A3F46"/><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 8l2.5-4.5L21 5.5 20 8M8 4.2l2 3.6M13 4.6l2 3.4M10.5 11.5v5l4-2.5z"/></svg>${L("อัปเดต","Updates")}</button>
        <button data-tset><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l1.6 2.3 2.7-.7.6 2.7 2.6 1-.8 2.7 1.9 2-1.9 2 .8 2.7-2.6 1-.6 2.7-2.7-.7L12 21.2l-1.6-2.3-2.7.7-.6-2.7-2.6-1 .8-2.7L3.4 11l1.9-2-.8-2.7 2.6-1 .6-2.7 2.7.7z" fill="#3B7FD0"/><circle cx="12" cy="12" r="3.4" fill="#FFF6E3"/></svg>${L("ตั้งค่า","Settings")}</button>
      </div>
    </main>
    <footer class="t-foot"><button data-tcred>${L("ผู้จัดทำ","Credits")}</button><i>|</i><button data-tpriv>${L("ข้อมูลส่วนตัว","Privacy")}</button><i>|</i><button data-thow2>${L("วิธีเล่น","How to play")}</button><i>|</i><span>${L("ชื่อในเกมเป็นเรื่องสมมติ","All names are fictional")}</span></footer>`;
  el.hidden=false;
  const q=(s,f)=>{ const b=el.querySelector(s); if(b) b.onclick=f; };
  q("[data-tplay]",()=>{ sfx("good"); if(resume){ pickChar=S.char; beginGame("resume"); } else { hideTitle(); openStart(); } });
  q("[data-tnew]",()=>{ hideTitle(); openStart(); });
  q("[data-thow]",()=>titleSheet("how")); q("[data-thow2]",()=>titleSheet("how"));
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
