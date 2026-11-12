/* Sheets, case pages, comic panels and the first-case tutorial. */
/* ---------- sheets ---------- */
let sheetMode=null;
/* ---------- the phone in a case shows one page at a time: tap next instead of scrolling ---------- */
let phPage=0;
function paginatePhone(keep){
  const body=$("phBody"); if(!body) return;
  body.classList.add("paged");
  const kids=[...body.children].filter(k=>!k.classList.contains("pager"));
  kids.forEach(k=>{ k.style.display=""; k.style.zoom=""; });
  const cs=getComputedStyle(body), avail=body.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-2, gap=parseFloat(cs.rowGap)||12;
  const pages=[]; let cur=[], used=0;
  /* an illustrated panel shrinks its picture (not the text) so it fits on the first page with the title */
  kids.filter(k=>k.classList.contains("kphoto")).forEach(k=>{ const im=k.querySelector(".kimg"); if(!im) return; im.style.height=""; im.style.aspectRatio="";
    const t=kids[0]&&kids[0].classList.contains("ktitle")?kids[0].offsetHeight+gap:0, over=k.offsetHeight-(avail-t);
    if(over>0){ im.style.aspectRatio="auto"; im.style.height=Math.max(120,im.offsetHeight-over)+"px"; } });
  for(const k of kids){
    let h=k.offsetHeight;
    if(h>avail){ k.style.zoom=Math.max(.55,avail/h).toFixed(3); h=k.offsetHeight; }
    if(cur.length && used+gap+h>avail){
      const lone=cur.length===1 && cur[0].classList.contains("ktitle"), room=avail-used-gap;
      if(lone && room/h>=.5){ k.style.zoom=((parseFloat(k.style.zoom)||1)*room/h).toFixed(3); h=k.offsetHeight; }   // keep the title with its first panel
      else { pages.push(cur); cur=[]; used=0; }
    }
    used+=(cur.length?gap:0)+h; cur.push(k);
  }
  if(cur.length) pages.push(cur);
  body._pages=pages; phPage=keep?Math.min(phPage,pages.length-1):0;
  let bar=body.parentNode.querySelector(".pager");
  if(pages.length<=1){ if(bar) bar.remove(); kids.forEach(k=>k.style.display=""); return; }
  if(!bar){ bar=document.createElement("div"); bar.className="pager"; body.after(bar);
    bar.innerHTML=`<button class="pg prev" aria-label="${L("หน้าก่อน","Previous page")}">‹</button><span class="pgn"></span><button class="pg next"><span>${L("ถัดไป","Next")}</span> ›</button>`;
    bar.querySelector(".prev").onclick=()=>{ sfx("blip"); showPhPage(phPage-1); }; bar.querySelector(".next").onclick=()=>{ sfx("blip"); showPhPage(phPage+1); }; }
  showPhPage(phPage);
}
function showPhPage(i){
  const body=$("phBody"); if(!body||!body._pages) return; const P=body._pages;
  phPage=Math.max(0,Math.min(P.length-1,i));
  P.forEach((pg,j)=>pg.forEach(k=>k.style.display=j===phPage?"":"none"));
  const bar=body.parentNode.querySelector(".pager"); if(!bar) return;
  bar.querySelector(".pgn").innerHTML=P.map((_,j)=>`<i class="${j===phPage?"on":""}"></i>`).join("");
  bar.querySelector(".prev").disabled=phPage===0;
  const nx=bar.querySelector(".next"); nx.disabled=phPage===P.length-1; nx.classList.toggle("pulse",phPage<P.length-1);
}
addEventListener("resize",()=>{ if(sheetMode==="case") paginatePhone(true); });
$("veil").addEventListener("click",e=>{ if(e.target===$("veil") && $("sheet").classList.contains("asphone")) closeSheet(); });
const ppTick=()=>{ if(typeof nowClock!=="function") return; const el=$("ppTime"); if(el && el.textContent!==nowClock()) el.textContent=nowClock(); const w=$("ppWx"); if(w){ const t=S.char&&typeof wxIcon==="function"?wxIcon()+(WX.rainOn&&umbOpen()?"☂️":""):""; if(w.textContent!==t) w.textContent=t; }
  /* keep the clock running on any open phone screen too */
  const c=nowClock(); document.querySelectorAll("#sheet .sbar>b, #sheet .hs-clock>b, #sheet .lk-time, #peek .sbar>b, #peek .lk-time, #sheet .ph-sbar>span:first-child, #sheet .hs-now").forEach(e=>{ if(e.textContent!==c) e.textContent=c; }); }; setTimeout(ppTick,0); setInterval(ppTick,1000);
addEventListener("keydown",e=>{ if(sheetMode!=="case"||!$("phBody")?._pages) return; if(e.key==="ArrowRight"){ showPhPage(phPage+1); e.preventDefault(); } if(e.key==="ArrowLeft"){ showPhPage(phPage-1); e.preventDefault(); } });
function openSheet(mode, html){
  sheetMode=mode; $("sheet").innerHTML=html; $("veil").hidden=false; $("veil").scrollTop=0; keys.clear(); endJoy(); target=null;
  $("sheet").classList.toggle("start", mode==="start");
  $("sheet").classList.toggle("case3", mode==="case"); $("veil").classList.toggle("v3", mode==="case");
  phoneize($("sheet"));
  const asPhone = mode==="phone"||mode==="wifi";
  $("sheet").classList.toggle("asphone",asPhone); $("veil").classList.toggle("vphone",asPhone); document.body.classList.toggle("phone-open",asPhone);
  if(asPhone){ $("sheet").insertAdjacentHTML("afterbegin",`<div class="ph-sbar"><span>${nowClock()}</span><span class="sic">${typeof SB_ICONS!=="undefined"?SB_ICONS:""}</span></div>`); $("sheet").insertAdjacentHTML("beforeend",`<button class="ph-home" data-close aria-label="${L("ปิดมือถือ","Put the phone away")}"></button>`); }
  wireSheet(); hud();
  if(mode==="case"){ requestAnimationFrame(()=>paginatePhone(false)); setTimeout(()=>paginatePhone(true),400); }
}
function closeSheet(){ document.body.classList.remove("phone-open"); $("sheet").classList.remove("asphone"); $("veil").classList.remove("vphone"); endCoach(); if(MG){ if(MG.key) window.removeEventListener("keydown",MG.key); stopMG(); } $("veil").hidden=true; sheetMode=null; $("sheet").innerHTML=""; hud(); }
const top_ = (title, closable=true)=>`<div class="sh-top"><h2>${title}</h2>${closable?`<button class="x" data-close aria-label="${L("ปิด","Close")}">${XI}</button>`:""}</div>`;
const langSw = ()=>`<div class="langsw" role="group" aria-label="Language"><button type="button" data-lang="th" aria-pressed="${!EN()}">ไทย</button><button type="button" data-lang="en" aria-pressed="${EN()}">EN</button></div>`;
const btn = (label, attrs, cls="")=>`<button class="btn ${cls}" ${attrs}><span>${label}</span><i>${ARROW}</i></button>`;

/* start / character select */
let pickChar=null;
function openStart(){
  pickChar = PICKS.includes(S.char) ? S.char : (PICKS.includes(pickChar) ? pickChar : "studentGirl");
  const resume = S.char && (S.intro || doneCount());
  openSheet("start", `<div class="hero-s"><div class="startset">${langSw()}<button type="button" class="setbtn-s" data-settings>⚙️ ${L("ตั้งค่า · ขนาดตัวอักษร","Settings · text size")}</button></div><span class="eyebrow">${L("รู้ทันไซเบอร์ · ภารกิจแก๊งเงา","Cyber Savvy · The Shadow gang")}</span>
    <div class="big">${L("ภารกิจรู้ทันไซเบอร์","Cyber Mission")}</div>
    <p>${L("คุณเป็นนักศึกษามหาวิทยาลัยหัวเฉียวฯ ตำรวจไซเบอร์ขอให้ช่วยสืบแก๊งมิจฉาชีพที่อยู่แถวมหาลัย ช่วยคนที่กำลังจะโดนหลอก เก็บเบาะแส แล้วพาตำรวจไปจับแก๊งให้ได้","You're a student at Huachiew Chalermprakiet University. Cyber police ask you to help track a scam gang near campus: help people about to be scammed, collect clues, and lead the police to the gang.")}</p></div>
    <div class="sh-body">
      <span class="sect">${L("ตัวละครของคุณ","Your character")}</span>
      <div class="picks two">${PICKS.map(id=>`<button class="pick" data-pick="${id}" aria-pressed="${pickChar===id}"><img src="${SPRITES[id].down.src}" alt=""><b>${id==="studentGirl"?L("ผู้หญิง","Female"):L("ผู้ชาย","Male")}</b><small>${L("นักศึกษา","Student")}</small></button>`).join("")}</div>
      <label class="namefield"><span>${L("ชื่อของคุณ","Your name")}</span><input id="pname" maxlength="16" autocomplete="off" placeholder="${L("พิมพ์ชื่อเล่น","Type a nickname")}" value="${esc(S.name||"")}"></label>
      <div class="btns">${resume?btn(L("เล่นต่อ","Continue"),"data-go=\"resume\"","y"):""}${btn(resume?L("เริ่มใหม่","Start over"):L("เริ่มเกม","Start game"),"data-go=\"new\"")}</div>
      <p class="note">${L("ธนาคาร ร้าน ชื่อคน และเว็บไซต์ในเกมเป็นเรื่องสมมติทั้งหมด ความคืบหน้าเก็บในเบราว์เซอร์เครื่องนี้","All banks, shops, names and websites in the game are fictional. Progress is saved in this browser.")}</p>
    </div>`);
}
const PICKS=["studentGirl","studentBoy"];
function castList(){
  const prev=S.char, pz=S.zone; S.char=pickChar; S.zone=1; buildCast(); S.char=prev; S.zone=pz;
  const roleTxt={teller:L("พนักงานธนาคาร","Bank teller"),repairman:L("ซ่อมมือถือ","Fixes phones"),clue_admin:L("ชวนลงทุน","Pitching investments"),clue_it:L("ช่างซ่อมเน็ต?","Wi-Fi technician?"),mentor:L("พี่เลี้ยง ให้คำแนะนำ","Mentor, shows you around"),grandma:L("อยากสแกน QR ส่วนลด","Wants to scan a discount QR"),grandpa:L("ได้ SMS จากธนาคาร","Got an SMS from the bank"),friend:L("เน็ตหมด ต้องใช้ Wi-Fi","Out of data, needs Wi-Fi"),tips:L("ให้เคล็ดลับ","Shares tips")};
  const el=$("castList"); if(!el) return;
  el.innerHTML=npcs.filter(n=>!n.filler).map(n=>`<div><img src="${SPRITES[n.id].face.src}" alt=""><span><b>${esc(nm(n.id))}</b>${roleTxt[n.role]}</span></div>`).join("");
}

/* case player */
const VL = (v)=>({good:L("ทางที่ดี","Good move"),risky:L("เสี่ยง","Risky"),bad:L("อันตราย","Dangerous")})[v];
const TL = (k)=>({safe:L("ปลอดภัย","Safe"),warn:L("เฉียดฉิว","Close call"),danger:L("เสียหาย","Harmed")})[k];
let C=null;
/* ---------- the player's face reacting while deciding ---------- */
const pickLine=(arr)=>arr[Math.floor(Math.random()*arr.length)];
const MOOD_LINES={
  think:{th:["อืม… ทางไหนดีนะ","เดี๋ยวนะ ขอคิดก่อน","หยุด คิด ก่อนตัดสินใจ…","ลองดูหลักฐานอีกที…"],en:["Hmm… which way?","Wait, let me think.","Stop and think first…","Let me check the evidence again…"]},
  good:{th:["โอเค แบบนี้แหละ!","ปลอดภัยไว้ก่อน","ตรวจสอบให้ชัวร์ดีกว่า"],en:["Okay, that's the one!","Better safe than sorry.","Let's make sure first."]},
  risky:{th:["อืม… ไม่ค่อยแน่ใจแฮะ","หวังว่าคงไม่เป็นไรนะ…","ครึ่งๆ กลางๆ หรือเปล่า"],en:["Hmm… not so sure.","Hope this is fine…","Is that only half right?"]},
  bad:{th:["เอ๊ะ… รู้สึกไม่ดีเลย","เหงื่อแตกแล้ว…","แย่แล้วหรือเปล่าเนี่ย!"],en:["Uh-oh… this feels wrong.","I'm sweating now…","Did I just mess up?!"]},
  end_safe:{th:["รอดแล้ว!","เยี่ยมเลย ทำได้ดี"],en:["Phew, safe!","Nice, well done."]},
  end_warn:{th:["เฉียดไปนิดเดียว…","เกือบไปแล้ว"],en:["That was close…","Nearly got me."]},
  end_danger:{th:["ไม่น่าเลย…","คราวหน้าต้องระวังกว่านี้"],en:["I shouldn't have…","I'll be more careful next time."]}
};
const FX={
  think:'<i class="tb t1"></i><i class="tb t2"></i><i class="tb t3"></i>',
  good:'<i class="spark s1"></i><i class="spark s2"></i><i class="spark s3"></i>',
  risky:'<i class="drop d1"></i><i class="drop big"></i>',
  bad:'<i class="gloom"></i><i class="drop d1"></i><i class="drop d2"></i><i class="drop d3"></i><i class="drop big"></i>'
};
const hero=()=>(typeof HEROES!=="undefined"&&HEROES[S.char]?.hero)||SPRITES[S.char].down;
/* ---------- story text shown as comic panels (webtoon style, scrolls down the phone) ---------- */
const sprOf=(id)=>(typeof HEROES!=="undefined"&&HEROES[id]?.hero)||SPRITES[id].down;
const KBG=["#F4C9B0","#A9C47F","#A7B8C9","#FFF4E0","#F2C46B"];
const STAFF_RX=/พนักงาน|พนง\.|เจ้าหน้าที่|Teller|Staff|clerk|officer/i;
function linkify(t){ return esc(t).replace(/([a-z0-9-]+(\.[a-z0-9-]+)+(\/[\w\-\/]*)?)/gi,'<span class="url">$1</span>'); }
function makePanel(text, who, i, end){
  const parts=text.split(/"([^"]+)"/);
  let nar=[], says=[];
  parts.forEach((p,k)=>{ p=p.trim(); if(!p) return; if(k%2){ const before=parts[k-1]||""; says.push({t:p, staff:STAFF_RX.test(before.slice(-40))}); } else nar.push(p); });
  const flip=i%2===1, bg=KBG[i%KBG.length];
  const cap=nar.length?`<div class="kcap">${linkify(nar.join(" "))}</div>`:"";
  const bubbles=says.slice(0,3).map(s=>`<div class="kbub ${s.staff?"staff":""}">${s.staff?`<small>${L("พนักงาน","Staff")}</small>`:""}${linkify(s.t)}</div>`).join("");
  const sticker = end ? `<span class="kstk k-${end}">${end==="safe"?"✓":end==="warn"?"!":"✕"}</span>` : "";
  const fx = end==="danger" ? '<i class="ktear t1"></i><i class="ktear t2"></i>' : end==="safe" ? '<i class="kspark s1"></i><i class="kspark s2"></i>' : "";
  return `<div class="kp ${flip?"flip":""} ${end?"kend k-"+end:""}" style="--kbg:${bg}">${cap}<div class="krow">${bubbles?`<div class="kbubs">${bubbles}</div>`:`<div class="kbubs"></div>`}<div class="kchar"><img src="${sprOf(who).src}" alt="" ${String(who).startsWith("ghost")?'class="kghost"':""}>${fx}</div></div>${sticker}</div>`;
}
/* a scene's first story panel can be a full illustration (CASE_ART in data/heroes.js) with the caption laid over it */
function photoPanel(text, art){
  const parts=text.split(/"([^"]+)"/), nar=[], says=[];
  parts.forEach((p,k)=>{ p=p.trim(); if(!p) return; (k%2?says:nar).push(p); });
  return `<div class="kp kphoto"><img class="kimg" src="${art}" alt="" onload="if(document.getElementById('phBody'))paginatePhone(true)">${nar.length?`<div class="kcap">${linkify(nar.join(" "))}</div>`:""}${says.length?`<div class="kbubs">${says.slice(0,3).map(s=>`<div class="kbub">${linkify(s)}</div>`).join("")}</div>`:""}</div>`;
}
function comicize(html, who, art){
  const box=document.createElement("div"); box.innerHTML=html; let i=0;
  [...box.children].forEach(el=>{ if(el.tagName==="P"){ const d=document.createElement("div"); d.innerHTML=(art&&i===0)?photoPanel(el.textContent, art):makePanel(el.textContent, who, i); i++; el.replaceWith(d.firstChild); } });
  return box.innerHTML;
}
function actor(mood, line){
  const n=esc(nm(S.char));
  return `<div class="actor m-${mood}" id="actor"><div class="say b-${mood}" id="bub"><small>${n}</small><span id="bubTxt">${esc(line)}</span></div>
    <div class="fig" style="aspect-ratio:${hero().w}/${hero().h}"><span class="halo"></span><img src="${hero().src}" alt="${n}" decoding="async"><span class="headfx" id="pfx">${FX[mood]}</span></div></div>`;
}
function setMood(mood){
  if(mood==="good") sfx("good"); else if(mood==="bad") sfx("bad"); else if(mood==="risky") sfx("tick");
  const a=$("actor"), b=$("bub"); if(!a) return;
  a.className="actor m-"+mood; $("pfx").innerHTML=FX[mood];
  b.className="say b-"+mood; $("bubTxt").textContent=pickLine(MOOD_LINES[mood][S.lang]);
}
function bigPhone(title, body, closable){
  return `<div class="device bigphone"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <div class="ph-head"><h2>${title}</h2>${closable?`<button class="x" data-close aria-label="${L("ปิด","Close")}">${XI}</button>`:""}</div>
    <div class="ph-body" id="phBody">${body}</div><div class="homebar"></div></div></div>`;
}
const c3=(a,p,panel)=>`<div class="c3">${a}${p}<div class="cpanel">${panel}</div></div>`;
function openCase(id, npc){
  if(S.phoneBroken && id!=="bust"){ closeDlg(); openHacked(); return; }
  const c=CASES[S.lang][id];
  const late = !!(S.late && S.late[id] && c.lateStart && !S.best[id]);
  if(urgent && urgent.cid===id) urgent=null;
  C={id, npc, scene: late?c.lateStart:c.start, hist:[], order:null, applied:null, late}; renderCase();
}
function shuffle(n){ const a=[...Array(n).keys()]; for(let i=n-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
/* ---------- first-case tutorial: spotlight each part of the case screen ---------- */
let coach=null;
const COACH_CASE=[
  {sel:".bigphone", i:"📱", t:["เรื่องที่เกิดขึ้น","What's happening"], d:["มือถือตรงกลางเล่าเรื่องเป็นช่องการ์ตูน และโชว์ข้อความ ลิงก์ หรือหน้าจอที่ตัวละครเจอ ดูรายละเอียดให้ดี เบาะแสซ่อนอยู่ในนี้","The phone in the middle tells the story as comic panels and shows the messages, links or screens the person sees. Look closely, the clues are in here."]},
  {sel:".pager", i:"👉", t:["พลิกหน้า","Turn the page"], d:["ถ้าเรื่องยาว กด “ถัดไป ›” เพื่อดูหน้าต่อไป จุดตรงกลางบอกว่ามีกี่หน้า (บนคอมกดลูกศร ← → ได้)","If there's more, tap “Next ›”. The dots show how many pages there are (arrow keys ← → work on a computer)."]},
  {sel:".cchoices", i:"🤔", t:["ตัดสินใจ","Decide"], d:["เลือกว่าจะทำอะไร ระวังนะ ตัวเลือกผิดมักฟังดูมีเหตุผลหรือใส่ใจ ถามตัวเองว่า “เหตุผลนี้มีช่องโหว่ไหม” ก่อนกด","Pick what to do. Careful: wrong choices usually sound sensible or caring. Ask yourself “where's the hole in this reasoning?” before you tap."]},
  {sel:".step", i:"🔀", t:["ทางแยก","Decision points"], d:["หนึ่งเคสมี 2–3 ทางแยก แต่ละครั้งที่เลือก เรื่องจะเปลี่ยนไปตามนั้น","Each case has 2–3 decision points, and the story changes with every choice."]},
  {sel:"#actor", i:"😮", t:["ตัวคุณ","You"], d:["ตัวละครของคุณจะทำหน้าตามสิ่งที่เลือก ยิ้ม = ทางดี เหงื่อตก = เสี่ยง ตกใจ = พลาด","Your character reacts to each choice: a smile is good, sweat is risky, shock means trouble."]},
  {sel:null, i:"⭐", t:["ได้ดาวกี่ดวง","Earning stars"], d:["จบเคสได้ ★★★ ปลอดภัย · ★★ เกือบไป · ★ พลาด ดาวรวมมีผลตอนจับแก๊ง และได้เงินรางวัลด้วย พลาดก็เล่นซ้ำได้ ลองเลย!","Finish with ★★★ safe · ★★ close call · ★ caught out. Stars shape how the gang bust ends and earn money. You can always replay. Go for it!"]}
];
const COACH_END=[
  {sel:".pts", i:"⭐", t:["ผลของเคส","Your result"], d:["ดาวที่ได้จากเคสนี้ ระบบเก็บผลที่ดีที่สุดไว้เสมอ","The stars for this case. Your best result is always kept."]},
  {sel:".bigphone", i:"📖", t:["เฉลย","The breakdown"], d:["ในมือถือมีเรื่องที่เกิดขึ้น บทเรียน และเฉลยทีละทางแยก พลิกหน้าอ่านได้","The phone shows what happened, the lessons, and a breakdown of every decision. Flip through it."]},
  {sel:"[data-replay]", i:"🔁", t:["เล่นซ้ำ","Replay"], d:["อยากได้ดาวเพิ่ม กดลองเคสนี้ใหม่ได้ทุกเมื่อ","Want more stars? Replay the case any time."]}
];
function startCoach(steps, done){
  endCoach(); const el=document.createElement("div"); el.id="coach"; el.className="coach";
  el.innerHTML=`<div class="co-hole"></div><div class="co-tip" role="dialog" aria-live="polite"><div class="co-h"><span class="co-i"></span><b class="co-t"></b><small class="co-n"></small></div><p class="co-d"></p><div class="co-b"><button class="co-skip">${L("ข้าม","Skip")}</button><button class="co-next"></button></div></div>`;
  document.body.appendChild(el);
  coach={el, steps:steps.filter(st=>!st.sel||(()=>{ const q=document.querySelector(st.sel); return q && q.getClientRects().length>0; })()), i:0, done};
  el.querySelector(".co-skip").onclick=()=>endCoach(true);
  el.querySelector(".co-next").onclick=()=>{ sfx("blip"); if(++coach.i>=coach.steps.length) endCoach(true); else showCoach(); };
  showCoach();
}
function showCoach(){
  if(!coach) return; const st=coach.steps[coach.i], el=coach.el, tip=el.querySelector(".co-tip"), hole=el.querySelector(".co-hole");
  const coI=el.querySelector(".co-i");
  if(st.who && SPRITES[st.who]){ coI.innerHTML=`<img src="${SPRITES[st.who].face.src}" alt="">`; coI.classList.add("face"); } else { coI.textContent=st.i; coI.classList.remove("face"); }
  el.querySelector(".co-t").textContent=st.who?`${nm(st.who)} · ${st.t[EN()?1:0]}`:st.t[EN()?1:0]; el.querySelector(".co-d").textContent=st.d[EN()?1:0];
  el.querySelector(".co-n").textContent=`${coach.i+1}/${coach.steps.length}`;
  el.querySelector(".co-next").textContent=coach.i===coach.steps.length-1?L("เข้าใจแล้ว!","Got it!"):L("ต่อไป ›","Next ›");
  camFocus=st.focus?st.focus():null; if(camFocus) updateCam();
  let tg=st.sel&&document.querySelector(st.sel);
  if(st.world){ const w=typeof st.world==="function"?st.world():st.world, cr=$("cv").getBoundingClientRect();
    if(w){ const L_=cr.left+(w.x-camX)*Z, T_=cr.top+(w.y-camY)*Z; tg={getBoundingClientRect:()=>({left:L_,top:T_,width:w.w*Z,height:w.h*Z})}; } }
  else if(tg && tg.scrollIntoView) tg.scrollIntoView({block:"center",behavior:"instant"});
  requestAnimationFrame(()=>{ if(!coach) return;
    const W=innerWidth, H=innerHeight;
    if(!tg){ hole.style.cssText=`left:${W/2}px;top:${H/2}px;width:0;height:0`; tip.style.left=Math.max(12,(W-tip.offsetWidth)/2)+"px"; tip.style.top=Math.max(12,(H-tip.offsetHeight)/2)+"px"; return; }
    const r=tg.getBoundingClientRect(), pad=8, x=Math.max(4,r.left-pad), y=Math.max(4,r.top-pad), w=Math.min(W-8,r.width+pad*2), h=Math.min(H-8,r.height+pad*2);
    hole.style.cssText=`left:${x}px;top:${y}px;width:${w}px;height:${h}px`;
    const tw=tip.offsetWidth, th=tip.offsetHeight; let tx, ty;
    if(x+w+16+tw<=W){ tx=x+w+16; ty=y+h/2-th/2; }            // right of it
    else if(x-16-tw>=0){ tx=x-16-tw; ty=y+h/2-th/2; }         // left of it
    else if(y+h+12+th<=H){ tx=x+w/2-tw/2; ty=y+h+12; }        // below
    else if(y-12-th>=0){ tx=x+w/2-tw/2; ty=y-12-th; }         // above
    else { tx=(W-tw)/2; ty=H-th-12; }
    tip.style.left=Math.max(12,Math.min(W-tw-12,tx))+"px"; tip.style.top=Math.max(12,Math.min(H-th-12,ty))+"px";
  });
}
function endCoach(finished){ camFocus=null; if(!coach) return; const d=coach.done; coach.el.remove(); coach=null; if(finished&&d) d(); }
addEventListener("resize",()=>{ if(coach) showCoach(); });
function maybeCoach(kind){
  if(!S.tut) S.tut={};
  if(S.tut[kind]) return;
  setTimeout(()=>{ if(sheetMode!=="case" || coach) return; S.tut[kind]=true; save(); startCoach(kind==="case"?COACH_CASE:COACH_END); },650);
}
function renderCase(){
  const c=CASES[S.lang][C.id];
  if(c.endings[C.scene]) return renderEnding(c);
  const s=c.scenes[C.scene];
  if(!C.order||C.order.k!==C.scene) C.order={k:C.scene,o:shuffle(s.choices.length)};
  const hint=c.level==="ง่าย"&&s.clues&&s.clues.length;
  const from = C.npc ? `<div class="step eyebrow"><span class="checker"></span>${L("ช่วย","Helping")} ${esc(nm(C.npc.id))} · ${L("ทางแยกที่","Decision")} ${C.hist.length+1}</div>` : `<div class="step eyebrow"><span class="checker"></span>${L("ทางแยกที่","Decision")} ${C.hist.length+1}</div>`;
  const who=(C.npc&&C.npc.id)||S.char;
  const art=typeof CASE_ART!=="undefined"&&CASE_ART[C.id]&&CASE_ART[C.id][C.scene];
  const body=`<h3 class="ktitle">${s.title}</h3>${comicize(s.body, who, art)}`;
  const panel=`${from}<span class="sect">${L("คุณจะทำอย่างไร","What do you do?")}</span>
    <div class="cchoices">${C.order.o.map((ci,i)=>`<button class="choice" data-ch="${ci}"><span class="k">${"ABCD"[i]}</span><span>${s.choices[ci].t}</span></button>`).join("")}</div>
    <button class="howto" data-howto>❔ ${L("วิธีเล่นเคส","How cases work")}</button>`;
  openSheet("case", c3(actor("think", pickLine(MOOD_LINES.think[S.lang])), bigPhone(c.title, body, true), panel));
  if(!C.hist.length) maybeCoach("case");
}
function applyResult(type){
  const bar=BAR_OF[C.id], d={};
  if(type==="safe"){ d[bar]=10; if(bar!=="trust") d.trust=5; }
  else if(type==="warn"){ d[bar]=-10; }
  else { d[bar]=-30; if(bar!=="trust") d.trust=-10; }
  const out={};
  for(const [k,v] of Object.entries(d)){ const was=S.bars[k]; S.bars[k]=Math.max(0,Math.min(100,was+v)); out[k]=S.bars[k]-was; if(!out[k]) out[k]=v>0?"max":"min"; }
  return out;
}
function renderEnding(c){
  const e=c.endings[C.scene];
  if(C.applied==null){
    if(!S.results[C.id] && isZoneCase(C.id)){ C.applied=applyResult(e.type); S.results[C.id]={end:C.scene,type:e.type}; }
    else { C.applied={}; if(!S.results[C.id]) S.results[C.id]={end:C.scene,type:e.type}; }
    if(EVID[C.id] && e.type!=="danger" && !S.ev[C.id]){ if(FIXES[C.id]) C.needFix=true; else { S.ev[C.id]=true; S.evNew=(S.evNew||0)+1; C.newEv=true; setTimeout(()=>sfx("ev"),400); } }
    if(!S.seenCases.includes(C.id)) S.seenCases.push(C.id);
    if(C.id==="bust" && e.type==="safe"){ S.busted=true; S.bustPending=true; }
    C.lastType=e.type;
    const prev=S.best[C.id];
    C.newBest = !prev || RANK[e.type]>RANK[prev];
    { const RW_={safe:40,warn:15,danger:0}; let cn=0; if(C.newBest) cn+=RW_[e.type]-(prev?RW_[prev]:0); if(e.type==="danger" && !prev) cn-=20; if(e.cost) cn-=e.cost; C.coins=addCoins(cn); }
    C.prevBest = prev;
    if(C.newBest) S.best[C.id]=e.type;
    if(C.id==="chat") S.chatSeen=true;
    if(S.zone===1 && doneCount()>=2 && !S.chat){ S.chat=true; S.chatPending=true; }
    const nz=S.zone+1;
    advanceChapter();
    if(zoneDone(S.zone) && !S.zoneDoneSeen?.[S.zone]){ S.zoneDoneSeen={...(S.zoneDoneSeen||{}),[S.zone]:true}; }
    save();
  }
  const deltas=Object.entries(C.applied).map(([k,v])=>v==="max"?`<span class="delta up">${barName(k)} ${L("เต็ม 100 แล้ว","already full")}</span>`:v==="min"?`<span class="delta down">${barName(k)} ${L("เหลือ 0","at 0")}</span>`:`<span class="delta ${v>0?"up":"down"}">${barName(k)} ${v>0?"+":"−"}${Math.abs(v)}</span>`).join("")+(C.coins?coinTag(C.coins):"");
  const body=`<div class="endtop"><span class="badge t-${e.type}">${e.label||TL(e.type)}</span></div>
    <h3 class="ktitle">${e.title}</h3>${makePanel(e.story, (C.npc&&C.npc.id)||S.char, 0, e.type)}
    <div class="box"><h4>${L("บทเรียน","Lessons")}</h4><ul class="list">${e.lessons.map(l=>`<li>${l}</li>`).join("")}</ul></div>
    <span class="sect">${L("เฉลยทีละทางแยก","Decision by decision")}</span>
    ${C.hist.map((h,i)=>{ const s=c.scenes[h.s], ch=s.choices[h.c]; return `<div class="rc"><small>${L("ทางแยกที่","Decision")} ${i+1} · ${s.title}</small><div class="you">${L("คุณเลือก","You chose")}: ${ch.t}<span class="vd ${ch.v}">${VL(ch.v)}</span></div>${s.clues&&s.clues.length?`<b style="font-size:.82rem">${L("สิ่งที่ควรสังเกต","What to notice")}</b><ul class="list">${s.clues.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}</div>`; }).join("")}`;
  const panel=`<div class="step eyebrow"><span class="checker"></span>${L("จบเคส","Case over")}</div>
    <div class="endbig t-${e.type}">${e.label||TL(e.type)}</div>
    ${isZoneCase(C.id)?`<div class="pts">${starsHtml(e.type)}<b>+${PTS[e.type]}</b>${C.prevBest&&C.newBest?`<em>${L("สถิติใหม่!","New best!")}</em>`:""}</div>
    ${C.prevBest&&!C.newBest&&C.prevBest!==e.type?`<p class="note">${L(`ผลเดิมของเคสนี้ (${starStr(C.prevBest)}) ดีกว่า เลยเก็บคะแนนเดิมไว้`,`Your earlier result (${starStr(C.prevBest)}) was better, so it's kept.`)}</p>`:""}
    ${ZONES[S.zone]?`<div class="zprog"><div class="zl"><span>${L("คะแนนโซน","Zone score")} ${zno(S.zone)}</span><b>${zoneScore(S.zone)}/${zoneMax(S.zone)}</b></div><div class="meter"><i style="width:${zoneScore(S.zone)/zoneMax(S.zone)*100}%"></i></div>${ZONES[S.zone+1]?`<small>${L(`ช่วยแล้ว ${ALLCASES().filter(k=>S.best[k]).length}/${ALLCASES().length} คนทั้งเมือง · ครบทุกคนถึงจะได้ฉากจบ`,`${ALLCASES().filter(k=>S.best[k]).length}/${ALLCASES().length} helped in town · help everyone to reach the ending`)}</small>`:""}</div>`:""}`:""}
    ${C.needFix&&!S.ev[C.id]?`<div class="fixbox"><span class="evi">📱</span><div><small>${L("ขั้นสุดท้าย · รับเบาะแส","Last step · earn the clue")}</small><b>${esc(LX(FIXES[C.id].goal))}</b></div><button class="btn y" data-fix><span>${L("ลงมือแก้ในมือถือ","Fix it on the phone")}</span><i>${ARROW}</i></button></div>`:EVID[C.id]?(C.newEv?`<div class="evnew"><span class="evi">${EVID[C.id].i}</span><div><small>${L("หลักฐานใหม่เข้าบอร์ด","New evidence on the board")} · ${evCount()}/${Object.keys(EVID).length}</small><b>${EVID[C.id].t[EN()?1:0]}</b><span>${EVID[C.id].d[EN()?1:0]}</span></div></div>`:(!S.ev[C.id]?`<p class="note">${L("ถ้าช่วยได้โดยไม่เสียหาย จะได้หลักฐานชิ้นนี้ไปต่อจิ๊กซอว์แก๊งเงา","Help without harm to earn this piece of evidence against the Shadow gang")}</p>`:"")):""}
    ${C.coins&&!isZoneCase(C.id)?`<div class="deltas">${coinTag(C.coins)}</div>`:""}${isZoneCase(C.id)?`<div class="deltas">${deltas||`<span class="delta">${L("เล่นซ้ำ หลอดสถานะไม่เปลี่ยน","Replay, bars unchanged")}</span>`}</div>`:""}
    <p class="note">${L("อ่านเรื่องที่เกิดขึ้นและเฉลยได้ในมือถือ","Read what happened and the breakdown on the phone")}</p>
    <div class="btns col">${btn(S.zone===0?L("กลับไปที่ถนน","Back to the street"):L("กลับไปในร้าน","Back to the café"),"data-done","y")}<button class="btn g" data-replay><span>${L("ลองเคสนี้ใหม่","Replay this case")}</span></button></div>`;
  openSheet("case", c3(actor({safe:"good",warn:"risky",danger:"bad"}[e.type], pickLine(MOOD_LINES["end_"+e.type][S.lang])), bigPhone(c.title, body, false), panel));
  maybeCoach("end");
}
function finishCase(){
  const ty=C.lastType||S.best[C.id], npc=C.npc, cid=C.id; C=null; closeSheet();
  const sc=npc && (UMB_SCRIPT[cid]||scriptFor(npc.role));
  const onEnd = (npc && npc.ghost && ty!=="danger") ? ()=>{ startAscend(npc); afterCaseCheck(); } : afterCaseCheck;
  if(sc?.after){ talking=npc; face(npc,player); say(npc.id, lines([sc.after[ty]]), {onEnd}); }
  else afterCaseCheck();
  hud();
}
function afterCaseCheck(){
  if(ghostOpen() && !S.alleyHint){ S.alleyHint=true; save(); setTimeout(()=>toast(L("เสียงแปลกๆ ดังมาจากตรอกมืดข้างร้านกาแฟ… 👻","Strange noises from the dark alley by the café… 👻")),2800); }
  if(S.bustPending){ S.bustPending=false; save(); setTimeout(playEnding,350); hud(); return; }
  if(S.unlockPending){ const z=S.unlockPending; S.unlockPending=0; save(); setTimeout(()=>openUnlock(z), 350); hud(); return; }
  if(S.chatPending){ S.chatPending=false; save(); setTimeout(showPeek, 450); hud(); return; }
  if(doneCount()===ZN().cases.length && !ZN().bonus) toast(allDone()?L("ช่วยครบทุกคนในเมืองแล้ว! เปิดบอร์ดหลักฐานแล้วส่งให้ตำรวจได้เลย","Everyone in town helped! Open the evidence board and hand it to the police"):L(`ช่วยครบโซนนี้แล้ว! ยังเหลืออีก ${ALLCASES().filter(k=>!S.best[k]).length} คนในโซนอื่น`,`This zone is done! ${ALLCASES().filter(k=>!S.best[k]).length} people still need help elsewhere`));
}
