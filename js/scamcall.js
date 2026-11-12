/* Scam calls to your own phone: an unknown number rings now and then. Hang up and it calls back later;
   only "Block" stops that number. Answer and you get a talk scene with choices that can cost money,
   leak your data (which brings a threat call), or end safely. The phone's "Filter spam calls"
   setting labels these calls as suspected scams. */
const SC_FIRST=60e3, SC_AGAIN=[45e3,75e3], SC_RING=15e3;
let scRing=null;
const scState=()=>{ S.sc=S.sc||{blocked:{}, next:0, i:0, leaked:false, lost:0, calls:0}; return S.sc; };
const scReady=()=>S.char && !titleOn && S.prologue && S.briefed && Object.keys(S.best||{}).length>=1;
const scWait=()=>{ const [a,b]=SC_AGAIN; return a+Math.random()*(b-a); };
function scPick(){
  const st=scState(), ids=Object.keys(SCAM_CALLS).filter(k=>!st.blocked[k] && (!SCAM_CALLS[k].needLeak || st.leaked));
  if(!ids.length) return null;
  /* a leaked player gets the threat call first */
  if(st.leaked && ids.includes("threat") && !st.threatSeen) return "threat";
  const k=ids[st.i % ids.length]; st.i++; return k;
}
function stepScamCall(){
  if(!scReady() || scRing) return;
  const st=scState(), now=S.playMs||0;
  if(!st.next){ st.next=now+SC_FIRST; return; }
  if(now<st.next || busy()) return;
  const k=scPick(); if(!k){ st.next=now+5*60e3; return; }
  scIncoming(k);
}
function scIncoming(k){
  const C=SCAM_CALLS[k], st=scState(), li=EN()?1:0, flag=S.ps&&S.ps.spam;
  st.calls++; scRing={k, t:setTimeout(()=>scEnd("missed"),SC_RING)};
  const el=$("peek");
  el.innerHTML=`<div class="device lockscr callscr"><span class="island"></span><div class="scr">${sbar(nowClock())}
    <div class="cl-top"><small>${L("สายเรียกเข้า","Incoming call")}</small><div class="cl-av" aria-hidden="true">👤</div><b>${esc(C.num)}</b>
    <span class="cl-tag ${flag?"warn":""}">${flag?L("⚠️ ต้องสงสัยว่าเป็นมิจฉาชีพ","⚠️ Suspected scam"):esc(C.tag[li])}</span></div>
    <div class="cl-acts"><button class="cl-btn blk" id="clBlock"><span>🚫</span>${L("บล็อก","Block")}</button><button class="cl-btn no" id="clNo"><span>📵</span>${L("วางสาย","Decline")}</button><button class="cl-btn yes" id="clYes"><span>📞</span>${L("รับสาย","Answer")}</button></div>
    <div class="homebar"></div></div></div>`;
  el.hidden=false; el.classList.remove("in"); void el.offsetWidth; requestAnimationFrame(()=>el.classList.add("in"));
  try{ navigator.vibrate && navigator.vibrate([300,150,300,150,300]); }catch(e){}
  sfx("bad");
  $("clYes").onclick=()=>scEnd("answer"); $("clNo").onclick=()=>scEnd("decline"); $("clBlock").onclick=()=>scEnd("block");
  setTimeout(()=>$("clNo")?.focus({preventScroll:true}),400);
  hudKey="";
}
function scEnd(how){
  if(!scRing) return; const k=scRing.k; clearTimeout(scRing.t); scRing=null; hidePeek();
  const st=scState(), now=S.playMs||0;
  if(how==="block"){ scBlock(k); return; }
  st.next=now+scWait();
  if(how==="missed") toast(L(`📞 สายที่ไม่ได้รับจาก ${SCAM_CALLS[k].num} · เดี๋ยวเขาโทรมาอีก`,`📞 Missed call from ${SCAM_CALLS[k].num} · they'll call again`));
  else if(how==="decline") toast(L("วางสายแล้ว แต่ยังไม่ได้บล็อก เบอร์นี้จะโทรมาอีก","Declined, but not blocked. This number will call again"));
  else scTalk(k);
  save(); hud();
}
function scBlock(k){
  const st=scState(); st.blocked[k]=true; st.next=(S.playMs||0)+scWait(); save(); sfx("good");
  toast(L(`🚫 บล็อก ${SCAM_CALLS[k].num} แล้ว เบอร์นี้โทรมาไม่ได้อีก`,`🚫 Blocked ${SCAM_CALLS[k].num}. It can't call you again`)); hud();
}
/* the call itself: a phone-call screen with the caller's lines and your choices */
function scTalk(k){
  const C=SCAM_CALLS[k], li=EN()?1:0, st=scState(); if(k==="threat") st.threatSeen=true;
  const log=[], res={lost:0, leak:false, bad:0};
  const step=(i)=>{
    const s=C.steps[i]; log.push(`<div class="cl-line them"><span class="cl-av sm" aria-hidden="true">👤</span><p>${esc(s.say[li])}</p></div>`);
    if(s.sms) log.push(`<div class="cl-sms"><b>SMS</b> ${esc(s.sms[li])}</div>`);
    openSheet("call",`${top_("📞 "+esc(C.num))}<div class="sh-body cl-talk"><div class="cl-log">${log.join("")}</div>
      <p class="cl-q">${esc(s.q[li])}</p><div class="cl-opts">${s.opts.map((o,j)=>`<button class="btn ${j?"g":"y"}" data-clo="${j}"><span>${esc(o.t[li])}</span></button>`).join("")}</div></div>`);
    const lg=document.querySelector(".cl-log"); if(lg) lg.scrollTop=lg.scrollHeight;
    document.querySelectorAll("[data-clo]").forEach(b=>b.onclick=()=>{
      const o=s.opts[+b.dataset.clo]; log.push(`<div class="cl-line me"><p>${esc(o.t[li])}</p></div>`);
      if(o.eff){ res.bad++; if(o.eff.coins){ const lost=Math.min(S.coins, -o.eff.coins); addCoins(-lost); res.lost+=lost; st.lost+=lost; }
        if(o.eff.money) S.bars.money=Math.max(0,S.bars.money+o.eff.money); if(o.eff.privacy) S.bars.privacy=Math.max(0,S.bars.privacy+o.eff.privacy);
        if(o.eff.leak){ res.leak=true; st.leaked=true; } sfx("bad"); hudKey=""; }
      if(o.end) done(o.good); else step(o.go);
    });
  };
  const done=(good)=>{
    if(good && !res.bad){ addCoins(20); S.bars.privacy=Math.min(100,S.bars.privacy+3); sfx("good"); }
    save();
    const verdict=!res.bad?L("รอดปลอดภัย! ไม่เสียอะไรเลย","Safe! You lost nothing")
      :L(`เสียเงิน ${BAHT(res.lost)}${res.leak?" · ข้อมูลส่วนตัวหลุดไปแล้ว":""}`,`You lost ${BAHT(res.lost)}${res.leak?" · your personal data leaked":""}`);
    openSheet("call",`${top_("📞 "+L("วางสายแล้ว","Call ended"))}<div class="sh-body cl-talk">
      <div class="cl-res ${res.bad?"bad":"ok"}"><b>${verdict}</b>${!res.bad?`<small>+${BAHT(20)}</small>`:""}${res.leak?`<small>${L("ระวัง: แก๊งอาจโทรมาข่มขู่ด้วยข้อมูลนี้","Careful: the gang may call back to threaten you with it")}</small>`:""}</div>
      <div class="box"><h4>${L("จำไว้","Remember")}</h4><ul>${C.lesson.map(x=>`<li>${esc(x[li])}</li>`).join("")}</ul></div>
      <p class="note">${L("เบอร์นี้จะโทรมาอีกจนกว่าคุณจะบล็อก","This number will keep calling until you block it")}</p>
      <div class="btns"><button class="btn y" data-clblk><span>🚫 ${L("บล็อกเบอร์นี้","Block this number")}</span></button><button class="btn g" data-close><span>${L("ปิด","Close")}</span></button></div></div>`);
    const b=document.querySelector("[data-clblk]"); if(b) b.onclick=()=>{ closeSheet(); scBlock(k); };
    hud();
  };
  step(0);
}
