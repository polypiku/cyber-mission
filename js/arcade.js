/* Mini-games at the street kiosk. */
/* ---------- mini-games at the street kiosk ---------- */
let MG=null;
function stopMG(){ if(MG&&MG.iv) clearInterval(MG.iv); MG=null; }
function openArcade(){
  stopMG();
  openSheet("arcade", `${top_(L("ตู้ฝึกสมอง","Training kiosk"))}<div class="sh-body">
    <p class="note" style="font-size:.86rem">${L("ฝึกความไวก่อนออกไปช่วยคนจริง ทำคะแนนสูงสุดเก็บไว้แข่งกับตัวเอง","Sharpen your reflexes before helping real people. Beat your own high score.")}</p>
    <button class="mgcard" data-mg="sms"><span class="mgi">📩</span><span><b>${L("ข้อความจริงหรือหลอก","Real or scam?")}</b><small>${L("45 วินาที ตัดสินให้เร็วและแม่นที่สุด","45 seconds. Judge fast and accurately")}</small></span><em>${L("สูงสุด","Best")} ${S.mg.sms}</em></button>
    <button class="mgcard" data-mg="url"><span class="mgi">🔗</span><span><b>${L("จับผิดลิงก์","Spot the fake link")}</b><small>${L("แตะส่วนที่ผิดปกติของลิงก์ หรือกด \"ปลอดภัย\"","Tap the suspicious part of each link, or press \"Safe\"")}</small></span><em>${L("สูงสุด","Best")} ${S.mg.url}</em></button>
  </div>`);
  $("sheet").querySelectorAll("[data-mg]").forEach(b=>b.onclick=()=>b.dataset.mg==="sms"?startSmsGame():startUrlGame());
}
const shuffled=(a)=>{ const r=[...a]; for(let i=r.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [r[i],r[j]]=[r[j],r[i]]; } return r; };
function startSmsGame(){
  stopMG();
  MG={kind:"sms", t:45, score:0, streak:0, q:shuffled(MSGS), i:0, miss:[], lock:false};
  openSheet("arcade", `${top_(L("ข้อความจริงหรือหลอก","Real or scam?"),true)}<div class="sh-body mg">
    <div class="mghud"><span>⏱ <b id="mgT">45</b></span><span>${L("คะแนน","Score")} <b id="mgS">0</b></span><span>🔥 <b id="mgK">0</b></span></div>
    <div class="mgbar"><i id="mgBar" style="width:100%"></i></div>
    <div id="mgCard"></div>
    <div class="judge"><button class="btn" data-ans="scam"><span>🚩 ${L("หลอก","Scam")}</span></button><button class="btn y" data-ans="ok" style="grid-template-columns:1fr"><span>✓ ${L("ปกติ","Legit")}</span></button></div>
    <p class="note" style="text-align:center">${TOUCH?"":L("คีย์ลัด: ← หลอก · → ปกติ","Keys: ← scam · → legit")}</p></div>`);
  const show=()=>{ const m=MG.q[MG.i%MG.q.length]; $("mgCard").innerHTML=`<div class="mgmsg"><small>${esc(m.from[EN()?1:0])}</small><p>${esc(m.t[EN()?1:0])}</p></div>`; };
  const answer=(scam)=>{ if(!MG||MG.lock||MG.t<=0) return; const m=MG.q[MG.i%MG.q.length], right=scam===m.scam;
    if(right){ MG.streak++; MG.score+=10+Math.min(MG.streak-1,5)*2; } else { MG.streak=0; MG.t=Math.max(0,MG.t-3); MG.miss.push(m); }
    $("mgS").textContent=MG.score; $("mgK").textContent=MG.streak;
    const c=$("mgCard"); c.classList.remove("ok","no"); void c.offsetWidth; c.classList.add(right?"ok":"no");
    MG.lock=true; setTimeout(()=>{ if(!MG) return; MG.lock=false; MG.i++; show(); }, right?180:650); };
  $("sheet").querySelectorAll("[data-ans]").forEach(b=>b.onclick=()=>answer(b.dataset.ans==="scam"));
  MG.key=(e)=>{ if(sheetMode!=="arcade"||!MG) return; if(e.code==="ArrowLeft") answer(true); if(e.code==="ArrowRight") answer(false); };
  window.addEventListener("keydown",MG.key);
  show();
  MG.iv=setInterval(()=>{ if(!MG) return; MG.t-=0.1; const tt=Math.max(0,MG.t); $("mgT").textContent=Math.ceil(tt); $("mgBar").style.width=(tt/45*100)+"%"; if(MG.t<=0) endMG(); },100);
}
function startUrlGame(){
  stopMG();
  MG={kind:"url", t:0, score:0, q:shuffled(URLS).slice(0,8), i:0, miss:[], lock:false, rt:12};
  openSheet("arcade", `${top_(L("จับผิดลิงก์","Spot the fake link"),true)}<div class="sh-body mg">
    <div class="mghud"><span>${L("ข้อ","Round")} <b id="mgI">1</b>/8</span><span>${L("คะแนน","Score")} <b id="mgS">0</b></span><span>⏱ <b id="mgT">12</b></span></div>
    <div class="mgbar"><i id="mgBar" style="width:100%"></i></div>
    <p class="note" style="text-align:center">${L("แตะส่วนของลิงก์ที่บอกว่าเป็นของปลอม ถ้าไม่มี กด \"ปลอดภัย\"","Tap the part that gives the fake away. If none, press \"Safe\"")}</p>
    <div id="mgCard"></div><div id="mgWhy"></div></div>`);
  const show=()=>{ const u=MG.q[MG.i]; MG.rt=12; MG.lock=false; $("mgI").textContent=MG.i+1; $("mgWhy").innerHTML="";
    $("mgCard").innerHTML=`<div class="urlbox">${u.p.map((s,k)=>`<button class="seg" data-seg="${k}">${esc(s)}</button>`).join("")}</div><div class="btns"><button class="btn g" data-seg="-1"><span>✓ ${L("ปลอดภัย","Safe")}</span></button></div>`;
    $("mgCard").querySelectorAll("[data-seg]").forEach(b=>b.onclick=()=>pick(+b.dataset.seg)); };
  const pick=(k)=>{ if(!MG||MG.lock) return; MG.lock=true; const u=MG.q[MG.i], right=k===u.bad;
    if(right) MG.score+=10+Math.ceil(MG.rt); else MG.miss.push(u);
    $("mgS").textContent=MG.score;
    $("mgCard").querySelectorAll(".seg").forEach((b,i)=>{ if(i===u.bad) b.classList.add("bad"); else if(i===k) b.classList.add("wrong"); });
    $("mgWhy").innerHTML=`<div class="endcard ${right?"safe":"danger"}"><b>${right?L("ถูกต้อง!","Correct!"):L("พลาด","Missed")}</b><p style="margin:.3em 0 0">${u.why[EN()?1:0]}</p></div><div class="btns">${btn(MG.i<7?L("ข้อต่อไป","Next"):L("ดูผล","Results"),"data-next","y")}</div>`;
    $("mgWhy").querySelector("[data-next]").onclick=()=>{ MG.i++; if(MG.i>=8) endMG(); else show(); }; };
  show();
  MG.iv=setInterval(()=>{ if(!MG||MG.lock) return; MG.rt-=0.1; $("mgT").textContent=Math.max(0,Math.ceil(MG.rt)); $("mgBar").style.width=(Math.max(0,MG.rt)/12*100)+"%"; if(MG.rt<=0) pick(-2); },100);
}
function endMG(){
  if(!MG) return; const kind=MG.kind, score=MG.score, miss=MG.miss; if(MG.key) window.removeEventListener("keydown",MG.key); stopMG();
  const best=S.mg[kind]||0, nb=score>best; if(nb){ S.mg[kind]=score; save(); } const mgc=addCoins(Math.min(30,Math.floor(score/20)*2));
  const missList=miss.slice(0,4).map(m=>kind==="sms"?`<li><b>${esc(m.from[EN()?1:0])}:</b> ${m.scam?L("หลอก","scam"):L("ปกติ","legit")} · ${m.why[EN()?1:0]}</li>`:`<li><span class="mono">${esc(m.p.join(""))}</span> · ${m.why[EN()?1:0]}</li>`).join("");
  openSheet("arcade", `${top_(L("ผลการฝึก","Results"))}<div class="sh-body">
    <div class="score"><span class="mgi" style="font-size:2.4rem">${kind==="sms"?"📩":"🔗"}</span><div><span class="eyebrow">${L("คะแนน","Score")}</span><b>${score}</b><p>${nb?L("สถิติใหม่!","New best!"):L(`สูงสุด ${best}`,`Best ${best}`)}</p>${mgc?coinTag(mgc):""}</div></div>
    ${missList?`<div class="box"><h4>${L("ข้อที่พลาด","What you missed")}</h4><ul class="list">${missList}</ul></div>`:`<p>${L("ไม่พลาดเลย เยี่ยม!","No mistakes. Brilliant!")}</p>`}
    <div class="btns">${btn(L("เล่นอีกครั้ง","Play again"),`data-mg="${kind}"`,"y")}<button class="btn g" data-arcade><span>${L("กลับไปที่ตู้","Back to kiosk")}</span></button></div></div>`);
  $("sheet").querySelectorAll("[data-mg]").forEach(b=>b.onclick=()=>b.dataset.mg==="sms"?startSmsGame():startUrlGame());
  $("sheet").querySelectorAll("[data-arcade]").forEach(b=>b.onclick=()=>openArcade());
}

/* menu */
function openMenu(){
  openSheet("menu", `${top_(L("เมนู","Menu"))}<div class="sh-body">
    <div class="box"><h4>${L("ภาษา","Language")}</h4>${langSw()}</div>
    <div class="btns"><button class="btn g" data-sound aria-pressed="${S.sound}"><span>${S.sound?L("เสียง: เปิด","Sound: on"):L("เสียง: ปิด","Sound: off")}</span></button><button class="btn g" data-dex><span>📖 ${L("สมุดกลโกง","Scam handbook")}</span></button></div>
    <div class="btns"><button class="btn y" data-tour><span>🧭 ${L("ดูทัวร์วิธีเล่นอีกครั้ง","Replay the how-to-play tour")}</span></button></div>
    <div class="box"><h4>${L("วิธีเล่น","How to play")}</h4><ul class="list">
      <li>${TOUCH?L("ใช้จอยสติ๊กซ้ายล่างหรือแตะที่พื้นเพื่อเดิน","Use the joystick or tap the floor to walk"):L("ใช้ WASD หรือปุ่มลูกศรเดิน หรือคลิกที่พื้น","Walk with WASD, arrow keys, or click the floor")}</li>
      <li>${TOUCH?L("เข้าใกล้คนที่มีเครื่องหมาย ! แล้วกดปุ่ม \"คุย\" หรือแตะที่ตัวละครโดยตรง","Get close to someone with a ! and press \"Talk\", or tap them directly"):L("เข้าใกล้คนที่มีเครื่องหมาย ! แล้วกด E หรือคลิกที่ตัวละคร","Get close to someone with a ! and press E, or click them")}</li>
      <li>${L("ทุกการตัดสินใจมีผลกับหลอดเงิน ความเป็นส่วนตัว และความไว้ใจ","Every decision affects money, privacy and trust")}</li></ul></div>
    <div class="btns">${btn(L("เปลี่ยนตัวละคร","Change character"),"data-tostart","y")}<button class="btn g" data-reset><span>${L("ล้างความคืบหน้า","Reset progress")}</span></button></div></div>`);
}

/* summary */
function rating(){
  const avg=(S.bars.money+S.bars.privacy+S.bars.trust)/3;
  if(avg>=85) return [L("ผู้พิทักษ์แห่ง Bean House","Guardian of Bean House"),L("ทุกคนในร้านปลอดภัยเพราะคุณ","Everyone in the café is safe thanks to you")];
  if(avg>=65) return [L("ผู้ช่วยที่ไว้ใจได้","Trusted helper"),L("พลาดบ้างเล็กน้อย แต่ช่วยคนได้เยอะ","A few slips, but you helped a lot")];
  if(avg>=45) return [L("ยังต้องฝึกอีกนิด","Needs a bit more practice"),L("ลองย้อนดูเฉลยของเคสที่พลาด แล้วเล่นใหม่","Review the cases you missed and try again")];
  return [L("มาลองใหม่อีกรอบ","Let's try again"),L("ไม่เป็นไร ในเกมพลาดได้ ดีกว่าพลาดกับเงินจริง","That's okay: better to slip in a game than with real money")];
}
function caseRows(z){
  const prevZone=S.zone; S.zone=z; const cast=npcs;
  const rows=ZONES[z].cases.map(k=>{ const b=S.best[k], c=CASES[S.lang][k], n=cast.find(x=>caseOf(x)===k);
    const face=n?SPRITES[n.id].face.src:null;
    return `<div>${face?`<img src="${face}" alt="">`:`<span class="ava" style="width:40px;height:40px">${L("ต","T")}</span>`}<span><b>${n?esc(nm(n.id)):L("ต้นข้าว (แชต)","Ton Khao (chat)")}</b>${c.title}</span>${starsHtml(b)}</div>`; }).join("");
  S.zone=prevZone; return rows;
}
function openSummary(){
  const [rt,rd]=rating(), z=S.zone, nz=MAINZ().find(x=>x>z)||0, full=zoneDone(z);
  const left=ALLCASES().filter(k=>!S.best[k]).length;
  const next = left===0
      ? `<div class="unlockbox"><b>${L("ช่วยครบทุกคนในเมืองแล้ว!","Everyone in town has been helped!")}</b><span>${L("เปิดบอร์ดหลักฐานแล้วส่งให้ตำรวจเพื่อดูฉากจบ","Open the evidence board and hand it to the police for the ending")}</span></div>`
      : `<div class="unlockbox locked"><b>${L(`ยังเหลืออีก ${left} คนในเมือง`,`${left} people still need help`)}</b><span>${L("ไปโซนไหนก่อนก็ได้ ช่วยให้ครบทุกคนถึงจะได้ฉากจบ","Go to any zone; help everyone to reach the ending")}</span></div>`;
  openSheet("summary", `${top_(L(`สรุปภารกิจโซน ${zno(z)}`,`Zone ${zno(z)} report`))}<div class="sh-body">
    <div class="score"><img src="${SPRITES[S.char].face.src}" alt=""><div><span class="eyebrow">${esc(ZN().name[S.lang])} · ${L("คะแนน","Score")} ${zoneScore(z)}/${zoneMax(z)}</span><b>${rt}</b><p>${rd}</p></div></div>
    <div class="box sumbars">${["money","privacy","trust"].map(k=>`<div class="bar-row">${BAR_ICON[k]}<span>${barName(k)}</span><div class="meter ${S.bars[k]<40?"low":""}"><i style="width:${S.bars[k]}%"></i></div><b>${S.bars[k]}</b></div>`).join("")}</div>
    <span class="sect">${L("ดาวแต่ละเคส","Stars per case")}</span><div class="res">${caseRows(z)}</div>
    ${next}
    <div class="btns">${ZONES[nz]?btn(L(`ไปโซน ${zno(nz)}`,`Go to Zone ${zno(nz)}`),`data-zone="${nz}"`,"y"):""}<button class="btn g" data-close><span>${L("เดินเล่นต่อ","Keep exploring")}</span></button><button class="btn g" data-reset><span>${L("ล้างความคืบหน้า","Reset progress")}</span></button></div></div>`);
}
/* scam handbook: every scam you've met, with how to spot it */
function openDex(){
  const ids=[...Object.keys(EVID),"recover",...ZONES[5].cases];
  const zoneOf=(k)=>Object.keys(ZONES).find(z=>ZONES[z].cases.includes(k));
  const rows=ids.map(id=>{ const c=CASES[S.lang][id]; if(!c) return "";
    const seen=S.seenCases.includes(id), b=S.best[id];
    if(!seen) return `<div class="dexc lockd"><span class="evi">?</span><div><b>${L("ยังไม่เจอ","Not met yet")}</b><small>${zoneOf(id)?L(`โซน ${zno(zoneOf(id))}`,`Zone ${zno(zoneOf(id))}`):L("ถนนหน้าร้าน","The street")}</small></div></div>`;
    const safeEnd=Object.values(c.endings).find(e=>e.type==="safe");
    return `<details class="dexc"><summary><span class="evi">${EVID[id]?EVID[id].i:"🔁"}</span><div><b>${c.title}</b><small>${zoneOf(id)?L(`โซน ${zno(zoneOf(id))}`,`Zone ${zno(zoneOf(id))}`):L("ถนนหน้าร้าน","The street")}</small></div>${b?starsHtml(b):""}</summary>
      <div class="dexb"><h4>${L("กลโกงนี้คืออะไร","What this scam is")}</h4><ul class="list">${c.learn.map(x=>`<li>${x}</li>`).join("")}</ul>
      ${safeEnd?`<h4>${L("วิธีรับมือ","How to handle it")}</h4><ul class="list">${safeEnd.lessons.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}</div></details>`; }).join("");
  openSheet("board", `${top_(L("สมุดกลโกง","Scam handbook"))}<div class="sh-body">
    <div class="seg2" role="tablist"><button data-board aria-pressed="false">${L("บอร์ดสืบสวน","Board")}</button><button aria-pressed="true">${L("สมุดกลโกง","Scam handbook")} ${S.seenCases.length}/${ids.length}</button></div>
    <p class="note" style="font-size:.86rem">${L("เจอเคสไหนแล้ว จะมีบันทึกในสมุดนี้ เปิดอ่านทบทวนได้ทุกเมื่อ","Every scam you meet is recorded here to review any time.")}</p>
    <div class="dex">${rows}</div>
    <div class="box"><h4>${L("สถิติของคุณ","Your stats")}</h4><ul class="list">
      <li>${L("ยศ","Rank")}: <b>${esc(rankName(rankIdx()))}</b> · XP ${xp()}</li>
      <li>${L("ตัดสินข้อความในมือถือ","Phone messages judged")}: ${S.msgStats.ok} ${L("ถูก","right")} · ${S.msgStats.bad} ${L("ผิด","wrong")}</li>
      <li>${L("มินิเกมสูงสุด","Mini-game bests")}: 📩 ${S.mg.sms} · 🔗 ${S.mg.url}</li>
      <li>${L("ให้อาหารสัตว์","Animals fed")}: 🐟 ${S.fed.cat} · 🌾 ${S.fed.birds}</li></ul></div></div>`);
}
/* evidence board */
function openBoard(){
  S.evNew=0; save(); hudKey="";
  const zoneOf=(k)=>Object.keys(ZONES).find(z=>ZONES[z].cases.includes(k));
  const cards=Object.entries(EVID).map(([k,v])=>S.ev[k]
    ? `<div class="evc g-${v.g}"><span class="pin"></span><span class="evi">${v.i}</span><b>${v.t[EN()?1:0]}</b><small>${v.d[EN()?1:0]}</small></div>`
    : `<div class="evc lockd"><span class="pin"></span><span class="evi">?</span><b>${L("ยังไม่พบ","Not found")}</b><small>${L(`โซน ${zno(zoneOf(k))} · ${CASES[S.lang][k].title}`,`Zone ${zoneOf(k)} · ${CASES[S.lang][k].title}`)}</small></div>`).join("");
  const groups=Object.entries(EV_GROUPS).map(([gk,gv])=>{ const mem=Object.keys(EVID).filter(k=>EVID[k].g===gk), got=mem.filter(k=>S.ev[k]).length;
    return `<div class="evg g-${gk}"><div class="zl"><b>${gv.t[EN()?1:0]}</b><span>${got}/${mem.length}</span></div><div class="meter"><i style="width:${got/mem.length*100}%"></i></div><small>${got>=2?gv.r[EN()?1:0]:L("ต้องมีอย่างน้อย 2 ชิ้นถึงจะเห็นจุดเชื่อม","Need at least 2 pieces to see the link")}</small></div>`; }).join("");
  const n=evCount();
  openSheet("board", `${top_(L("บอร์ดสืบสวน: แก๊งเงา","Investigation board: the Shadow gang"))}<div class="sh-body">
    <div class="seg2" role="tablist"><button aria-pressed="true">${L("บอร์ดสืบสวน","Board")}</button><button data-dex aria-pressed="false">${L("สมุดกลโกง","Scam handbook")} ${S.seenCases.length}/${Object.keys(EVID).length+2}</button></div>
    <p class="note" style="font-size:.86rem">${L("ทุกเคสเป็นฝีมือแก๊งเดียวกัน ช่วยได้โดยไม่เสียหาย (★★ ขึ้นไป) จะได้หลักฐานหนึ่งชิ้น ช่วยครบทุกโซนแล้วส่งให้ตำรวจได้ ยิ่งมีดาวเยอะ ยิ่งจับได้ครบทั้งแก๊ง","Every case is the same gang's work. Help without harm (★★ or better) to earn evidence. Finish every zone to hand it to the police; the more stars, the more of the gang gets caught.")}</p>
    <div class="evgrid">${cards}</div>
    <span class="sect">${L("จุดเชื่อมที่พบ","Links found")}</span><div class="evgs">${groups}</div>
    <div class="zprog"><div class="zl"><span>${L("ดาวทั้งหมด (มีผลตอนจับแก๊ง)","All stars (decide the final raid)")}</span><b>${starTotal()}/${starMax()}</b></div><div class="meter"><i style="width:${starTotal()/starMax()*100}%"></i></div><small>${L(`หลักฐาน ${n}/${Object.keys(EVID).length} ชิ้น · คาดว่าจะ${["","จับได้แค่ลูกน้อง","จับได้เกือบหมด แต่หัวหน้าหนี","จับได้ทั้งแก๊ง"][bustTier()]}`,`Evidence ${n}/${Object.keys(EVID).length} · forecast: ${["","only the small fry","most of them, but the boss escapes","the whole gang"][bustTier()]}`)}</small></div>
    ${S.bustTier===3?`<div class="unlockbox"><b>${L("ทลายแก๊งเงาครบทั้งแก๊งแล้ว!","The whole Shadow gang is behind bars!")}</b><span>${L("ขอบคุณที่ช่วยทุกคนในเมือง","Thanks for helping everyone in town")}</span></div>`
      : allDone()?`<div class="btns">${btn(S.zone===7?(S.ending?L("บุกอีกครั้งด้วยหลักฐานที่ดีขึ้น","Raid again with better evidence"):L("ส่งหลักฐานให้พี่ภพ","Hand the evidence to Phop")):L("🚓 ไปส่งหลักฐานที่สถานีตำรวจ (ซอย 2)","🚓 Take it to the police station (Soi 2)"),"data-bust","y")}</div>`
      : `<p class="note">${L("ช่วยให้ครบทุกคนทุกโซนก่อน จึงจะส่งหลักฐานได้","Finish every case in every zone to hand in the evidence")}</p>`}
  </div>`);
}
function openFinale(){
  const tier=bustTier(); S.bustTier=Math.max(S.bustTier||0,tier); save();
  const T={3:[L("จับได้ทั้งแก๊ง!","The whole gang is caught!"),L("หลักฐานแน่นทุกจุด ตำรวจจับได้ทั้งหัวหน้า คนโทร คนทำเว็บ และคนจ้างเปิดบัญชีม้า","Every link held. Police caught the boss, the callers, the site builders and the mule recruiters.")],
           2:[L("จับได้เกือบหมด แต่หัวหน้าหนี","Most caught, but the boss escaped"),L("ลูกน้องถูกจับหลายคน แต่หลักฐานบางจุดไม่แน่นพอ หัวหน้าแก๊งหนีไปได้ เล่นเคสซ้ำเพื่อเก็บดาวเพิ่ม แล้วส่งหลักฐานใหม่ได้","Many were arrested, but some links were weak and the boss slipped away. Replay cases for more stars, then hand the evidence in again.")],
           1:[L("จับได้แค่ลูกน้อง","Only the small fry"),L("หลักฐานยังไม่พอ ตำรวจจับได้แค่คนรับจ้างระดับล่าง แก๊งยังทำงานต่อ ลองกลับไปช่วยคนให้รอดมากขึ้นเพื่อเก็บดาว","Not enough evidence: only low-level helpers were arrested and the gang carries on. Go back and save more people to collect stars.")]}[tier];
  openSheet("unlock", `<div class="unlockhero"><span class="eyebrow">${L("ฉากจบ · ภาค 1","Ending · chapter 1")} · ${"★".repeat(tier)}${"☆".repeat(3-tier)}</span><div class="ubig">${T[0]}</div><p>${L("ผลขึ้นกับดาวที่คุณเก็บได้","Decided by the stars you collected")}</p></div>
    <div class="sh-body"><p>${T[1]}</p><div class="box sumbars">
      <div class="bar-row"><span>★</span><span>${L("ดาวทั้งหมด","All stars")}</span><div class="meter"><i style="width:${starTotal()/starMax()*100}%"></i></div><b>${starTotal()}</b></div>
      <div class="bar-row"><span>🧩</span><span>${L("หลักฐาน","Evidence")}</span><div class="meter"><i style="width:${evCount()/Object.keys(EVID).length*100}%"></i></div><b>${evCount()}</b></div>
      <div class="bar-row"><span>✓</span><span>${L("เคสที่ได้ ★★★","★★★ cases")}</span><div class="meter"><i style="width:${ALLCASES().filter(k=>S.best[k]==="safe").length/ALLCASES().length*100}%"></i></div><b>${ALLCASES().filter(k=>S.best[k]==="safe").length}</b></div></div>
    <p>${L("ทุกเคสในเกมมาจากกลโกงที่เกิดขึ้นจริงในไทย สิ่งที่ช่วยได้มากที่สุดคือหยุด คิด ตรวจสอบ และไม่ปล่อยให้ใครอยู่คนเดียวกับปัญหา","Every case here is based on real scams in Thailand. What helps most: stop, think, check, and never leave someone alone with the problem.")}</p>
    <div class="btns">${btn(L("เดินเล่นต่อ","Keep exploring"),"data-close","y")}</div></div>`);
}
/* mission map: all zones, scores, locks */
const LOCK_I='<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="1"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>';
function openZones(){
  const cards=Object.keys(ZONES).map(Number).filter(z=>!ZONES[z].bonus || allDone()).map(z=>{
    const open=ZONES[z].bonus?allDone():S.unlocked>=z, cur=S.zone===z, sc=zoneScore(z), mx=zoneMax(z);
    return `<div class="zcard ${open?"":"locked"} ${cur?"cur":""}">
      <div class="zh"><span class="zno">${ZONES[z].bonus?"👻":zno(z)}</span><div><b>${esc(ZONES[z].name[S.lang])}</b><small>${open?`${L("คะแนน","Score")} ${sc}/${mx}${zoneFull(z)?" · "+L("เต็ม!","Perfect!"):""}`:L(`ล็อก: ช่วยให้ครบทุกคนในโซน ${z-1} ก่อน`,`Locked: finish every case in Zone ${z-1}`)}</small></div>${open?(cur?`<span class="here">${L("อยู่ที่นี่","You're here")}</span>`:""):`<span class="lk">${LOCK_I}</span>`}</div>
      ${open?`<div class="meter"><i style="width:${sc/mx*100}%"></i></div><div class="res">${caseRows(z)}</div>${cur?"":btn(L("ไปที่นี่","Go here"),`data-zone="${z}"`,"y")}`
            :`<div class="meter"><i style="width:${ZONES[z-1].cases.filter(k=>S.best[k]).length/ZONES[z-1].cases.length*100}%"></i></div><p class="note">${L(`ช่วยในโซน ${z-1} แล้ว ${ZONES[z-1].cases.filter(k=>S.best[k]).length}/${ZONES[z-1].cases.length} คน`,`Zone ${z-1}: ${ZONES[z-1].cases.filter(k=>S.best[k]).length}/${ZONES[z-1].cases.length} helped`)}</p>`}
    </div>`; }).join("");
  openSheet("zones", `${top_(L("แผนที่ภารกิจ","Mission map"))}<div class="sh-body">
    <p class="note" style="font-size:.86rem">${L("แต่ละเคสได้ ★★★ = 100 · ★★ = 50 · ★ = 0 คะแนน นับผลที่ดีที่สุด เล่นซ้ำได้เรื่อยๆ","Each case: ★★★ = 100 · ★★ = 50 · ★ = 0 points. Your best result counts, replay any time.")}</p>
    ${cards}${S.zone>0?`<div class="btns"><button class="btn g" data-out><span>${L("ออกไปที่ถนนหน้าร้าน","Go out to the street")}</span></button></div>`:""}</div>`);
}
function openUnlock(z){
  openSheet("unlock", `<div class="unlockhero"><span class="eyebrow">${L("ช่วยครบทุกคนแล้ว!","Everyone helped!")}</span><div class="ubig">${L(`ปลดล็อกโซน ${z}`,`Zone ${z} unlocked`)}</div><p>${esc(ZONES[z].name[S.lang])}</p></div>
    <div class="sh-body"><p>${L(`โซน ${z-1} ได้ ${zoneScore(z-1)}/${zoneMax(z-1)} คะแนน ดาวที่เก็บได้จะมีผลตอนจับแก๊งเงา อยากได้เพิ่มก็กลับมาเล่นซ้ำได้`,`Zone ${z-1}: ${zoneScore(z-1)}/${zoneMax(z-1)}. Your stars decide how much of the Shadow gang gets caught; come back to replay for more.`)}</p>
    <p class="note">${L(`เดินออกประตูร้าน แล้วเข้า${esc(ZONES[z].name.th)}ที่อยู่ข้างๆ ได้เลย`,`Walk out the door and into ${esc(ZONES[z].name.en)} next door.`)}</p>
    <div class="btns">${btn(L("ออกไปข้างนอก","Head outside"),`data-out`,"y")}<button class="btn g" data-close><span>${L("อยู่ที่นี่ก่อน","Stay here for now")}</span></button></div></div>`);
}
function goZone(z){
  if(!ZONES[z] || (ZONES[z].bonus ? !allDone() : S.unlocked<z)) return;
  S.zone=z; if(z===2||z===7) S.floor=1; save(); setWorld(); buildCast(); drawStatic();
  if(z===7){ const jl=jailList().length; if(jl>(S.jailSeen||0)){ S.jailSeen=jl; save(); setTimeout(()=>toast(L(`🔒 คนร้ายที่คุณจับได้ถูกขังอยู่ในห้องขังแล้ว (${jl} คน) เดินเข้าประตูขวามือไปดูได้`,`🔒 The suspects you caught are in the cell block (${jl}). Walk through the door on the right`)),1200); } }
  player.x=z===2?720:432; player.y=z===2?LH-90:560; player.dir="up"; keys.clear(); target=null; targetNpc=null;
  closeSheet(); hudKey=""; hud();
  toast(ZONES[z].name[S.lang]);
  const m=npcs.find(n=>n.role==="mentor")||npcs.find(n=>n.role==="police");
  rush=null; urgent=null; wifiT=0; escort=null;
  if(z!==1 && !S.seen[z]) setTimeout(()=>{ face(player,m); talkTo(m); },400);
  else setTimeout(zoneEvent,500);
}

/* sheet events */
function wireSheet(){
  const sh=$("sheet"), on=(sel,fn)=>sh.querySelectorAll(sel).forEach(b=>b.onclick=(e)=>fn(b,e));
  on("[data-close]",()=>closeSheet());
  on("[data-shop]",()=>openShop());
  on("[data-phhome]",()=>openPhone());
  on("[data-lens]",()=>useLens());
  on("[data-tour]",()=>{ closeSheet(); if(S.zone!==1||!npcs.find(n=>n.role==="mentor")){ startCoach(gameTour().filter(st=>!st.world)); } else setTimeout(startTour,100); });
  on("[data-howto]",()=>setTimeout(()=>startCoach(COACH_CASE),50));
  on("[data-zone]",(b)=>goZone(+b.dataset.zone));
  on("[data-dex]",()=>openDex()); on("[data-board]",()=>openBoard());
  on("[data-sound]",(b)=>{ S.sound=!S.sound; save(); b.setAttribute("aria-pressed",String(S.sound)); b.querySelector("span").textContent=S.sound?L("เสียง: เปิด","Sound: on"):L("เสียง: ปิด","Sound: off"); if(S.sound) sfx("good"); });
  on("[data-bust]",()=>{ closeSheet(); const pol=npcs.find(n=>n.role==="police"); if(S.zone===7&&pol){ if(!S.hqFound&&!S.busted) talkPolice(pol); else openCase("bust",pol); } else toast(L("เอาหลักฐานไปให้พี่ภพที่สถานีตำรวจ (ซอย 2 บนถนน)","Take the evidence to Phop at the police station (Soi 2 on the street)")); });
  on("[data-out]",()=>{ closeSheet(); goOutside(S.zone||1); });
  on("[data-lang]",(b)=>{ S.lang=b.dataset.lang; save(); document.documentElement.lang=S.lang; drawStatic(); if(sheetMode==="start") openStart(); else if(sheetMode==="menu") openMenu(); hud(); });
  on("[data-pick]",(b)=>{ pickChar=b.dataset.pick; sh.querySelectorAll("[data-pick]").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); castList(); });
  on("[data-go]",(b)=>{
    if(b.dataset.go==="new"){ const lang=S.lang; S=fresh(); S.lang=lang; S.char=pickChar; player.x=432; player.y=500; player.dir="up"; }
    else if(S.char!==pickChar){ S.char=pickChar; }
    save(); setWorld(); buildCast(); drawStatic(); closeSheet(); hudKey=""; if(S.zone===2){ player.x=720; player.y=LH-90; } if(cbFloor()){ player.x=70; player.y=(CB_TOP+CB_BOT)/2; }
    if(S.zone===1 && !S.intro){ const m=npcs.find(n=>n.role==="mentor"); setTimeout(()=>{ face(player,m); talkTo(m); },250); }
    else setTimeout(zoneEvent,400);
  });
  on("[data-hint]",(b)=>{ const h=$("hint"); h.hidden=!h.hidden; b.setAttribute("aria-expanded",String(!h.hidden)); });
  on("[data-ch]",(b)=>{
    if(C.locked) return; C.locked=true;
    const c=CASES[S.lang][C.id], s=c.scenes[C.scene], ci=+b.dataset.ch, v=s.choices[ci].v;
    const mood = v==="bad"?"bad":v==="risky"?"risky":"good";
    sh.querySelectorAll("[data-ch]").forEach(x=>{ x.disabled=true; x.classList.add(x===b?"picked":"dim"); });
    setMood(mood);
    let gone=false;
    const go=()=>{ if(gone) return; gone=true; C.locked=false; C.hist.push({s:C.scene,c:ci}); C.scene=s.choices[ci].to; renderCase(); };
    C.skip=go;
    setTimeout(go, RM?650:(mood==="bad"?1700:1250));
  });
  on("#actor",()=>{ if(C&&C.locked&&C.skip) C.skip(); });
  on("[data-done]",()=>finishCase());
  on("[data-replay]",()=>{ const id=C.id, npc=C.npc; C=null; openCase(id,npc); });
  on("[data-chat]",()=>{ closeSheet(); openCase("chat",null); });
  on("[data-msg]",(b)=>openMsg(b.dataset.msg));
  on("[data-tostart]",()=>{ closeSheet(); openStart(); });
  on("[data-reset]",(b)=>{ if(!b.dataset.armed){ b.dataset.armed="1"; b.querySelector("span").textContent=L("กดอีกครั้งเพื่อยืนยัน","Tap again to confirm"); return; } resetAll(); });
  on("[data-reset2]",()=>resetAll());
}
function resetAll(){ const lang=S.lang, ch=S.char; S=fresh(); S.lang=lang; S.char=ch; save(); setWorld(); buildCast(); drawStatic(); hudKey=""; player.x=432; player.y=500; player.dir="up"; closeSheet(); openStart(); }
$("phoneBtn").onclick=()=>{ if(!D) openPhone(); };
$("menuBtn").onclick=()=>{ if(!D) openMenu(); };
/* DEBUG (temporary): shortcut to preview the 5 endings without changing the save */
(function(){
  const b=document.createElement("button"); b.id="dbgEnd"; b.textContent="🎬"; b.title="ดูฉากจบ (ทางลัดชั่วคราว)";
  document.body.appendChild(b);
  b.onclick=()=>{ if(D) return;
    openSheet("menu", `${top_(L("ทางลัดฉากจบ (ชั่วคราว)","Ending shortcuts (temporary)"))}<div class="sh-body"><p class="note">${L("ดูอย่างเดียว ไม่บันทึกผลลงเซฟ","Preview only. Your save isn't changed.")}</p>
      <div class="btns" style="grid-template-columns:1fr">${[1,2,3,4,5].map(n=>`<button class="btn ${n===5?"y":n===1?"":"g"}" data-dbgend="${n}"><span>${L("ฉากจบ","Ending")} ${n} · ${esc(ENDINGS[n].t[EN()?1:0])}</span></button>`).join("")}
      <button class="btn g" data-close><span>${L("ปิด","Close")}</span></button></div></div>`);
    $("sheet").querySelectorAll("[data-dbgend]").forEach(x=>x.onclick=()=>{ const n=+x.dataset.dbgend, E=ENDINGS[n]; closeSheet();
      playEndingScene(n,false); });
  };
})();
$("prog").onclick=()=>{ if(!D && $("peek").hidden) openZones(); };
$("boardBtn").onclick=()=>{ if(!D && $("peek").hidden) openBoard(); };
$("veil").addEventListener("click",(e)=>{ if(e.target===$("veil") && (sheetMode==="phone"||sheetMode==="menu")) closeSheet(); });
