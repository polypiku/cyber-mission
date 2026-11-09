/* The hands-on step at the end of each case: do the fix yourself on the phone to earn the clue. */
const LX=(a)=>Array.isArray(a)?a[EN()?1:0]:a;
const fixTier=(id)=>{ const z=Object.keys(ZONES).find(k=>ZONES[k].cases.includes(id)); return FIX_TIER[z]||2; };
const needsFix=(id)=>!!FIXES[id] && !S.ev[id];
let FIXST=null;

function openFix(id, done){
  const f=FIXES[id]; if(!f){ done&&done(false); return; }
  FIXST={id, f, tier:fixTier(id), done, st:{}};
  drawFix();
}
function fixShell(inner){
  const f=FIXST.f, tr=FIXST.tier;
  return `<div class="fx"><div class="fx-head"><span class="fx-app">${esc(LX(f.app)||({reply:L("แชต","Chat"),dial:L("โทรศัพท์","Phone"),order:L("รายการที่ต้องทำ","To-do"),pick:L("เบราว์เซอร์","Browser"),multi:L("เช็กลิสต์","Checklist"),pin:L("ตั้งรหัส","Set PIN")})[f.kind])}</span><span class="fx-tier">${"🔧".repeat(tr)} ${L(`ระดับ ${tr}`,`Level ${tr}`)}</span></div>
    <div class="fx-goal"><small>${L("ลงมือแก้เอง","Fix it yourself")}</small><b>${esc(LX(f.goal))}</b></div>
    ${FIXST.hint?`<div class="hintbox"><b>💡 ${L("คำใบ้","Hint")}</b><span>${FIXST.hint}</span></div>`:""}
    ${inner}<div class="fx-msg" id="fxMsg" aria-live="polite"></div>
    ${FIXST.hint?"":`<button class="hintbuy" data-fxhint>💡 ${L("ติดอยู่? ซื้อคำใบ้","Stuck? Buy a hint")} <b>${BAHT(HINT_PRICE.fix)}</b></button>`}
    <div class="fx-foot"><button class="btn g" data-fxback><span>${L("ไว้ทีหลัง","Later")}</span></button><button class="btn y" data-fxgo><span>${FIXST.f.kind==="dial"?L("📞 โทร","📞 Call"):L("ส่ง / ยืนยัน","Submit")}</span></button></div></div>`;
}
function fixMsg(ok, txt){ const m=$("fxMsg"); if(!m) return; m.className="fx-msg "+(ok?"ok":"bad"); m.innerHTML=txt; if(!ok) sfx("bad"); }
function drawFix(){
  const f=FIXST.f, k=f.kind, tr=FIXST.tier, st=FIXST.st;
  let inner="";
  if(k==="reply"){
    inner=`<div class="fx-chat"><div class="fx-to">${esc(LX(f.to))}</div><div class="inbub">${esc(LX(f.msg))}</div></div>
      ${tr<3?`<div class="fx-tips">${f.groups.map(g=>`<span>${esc(LX(g.h))}</span>`).join("")}</div>`:`<p class="fx-note">${L("เขียนให้ครบใจความ ไม่มีคำใบ้","Cover everything. No hints at this level")}</p>`}
      <textarea id="fxIn" rows="3" maxlength="200" placeholder="${L("พิมพ์ข้อความ…","Type a message…")}">${esc(st.txt||"")}</textarea>`;
  }
  else if(k==="pw"){
    if(!st.mail){
      inner=`<p class="fx-note">${L("เปิดอีเมลรีเซ็ตรหัสที่เป็นของจริง ดูที่อยู่ผู้ส่งให้ดี","Open the real reset email. Check the sender's address")}</p><div class="fx-inbox">${f.inbox.map((m,i)=>`<button class="fx-mail" data-fxmail="${i}"><b>${esc(LX(m.s))}</b><small>${esc(m.from)}</small></button>`).join("")}</div>`;
    } else {
      const rules=pwRules(tr);
      inner=`<div class="fx-mailopen"><small>${esc(f.inbox.find(m=>m.ok).from)}</small><b>${L("ตั้งรหัสผ่านใหม่","Set a new password")}</b></div>
        <div class="fx-pwrow"><input id="fxIn" type="text" autocomplete="off" spellcheck="false" placeholder="${L("รหัสผ่านใหม่","New password")}" value="${esc(st.pw||"")}">${S.items.pwm?`<button class="fx-gen" data-fxgen title="${L("สร้างรหัสอัตโนมัติ","Generate")}">🔑</button>`:""}</div>
        <ul class="fx-rules" id="fxRules">${rules.map(r=>`<li data-r="${r.k}">${r.t}</li>`).join("")}</ul>
        ${f.twofa||tr>=3?`<label class="fx-tog"><span>${L("ยืนยันตัวตนสองขั้นตอน (2FA)","Two-step verification (2FA)")}</span><input type="checkbox" id="fx2fa" ${st.twofa?"checked":""}><i></i></label>`:""}
        ${S.items.pwm?"":`<p class="fx-note">${L("มีตัวจัดการรหัสผ่านจะสร้างรหัสยากๆ ให้ได้ทันที (ร้านอัปเกรดในมือถือ)","A password manager can generate strong passwords for you (phone upgrades)")}</p>`}`;
    }
  }
  else if(k==="dial"){
    const side = f.card?`<div class="fx-card"><small>${L("หลังบัตรธนาคารนครทอง","Back of the Nakhonthong card")}</small><b>☎ ${f.card}</b></div>`:"";
    const sms = f.sms?`<div class="inbub">${esc(LX(f.sms))}</div>`:"";
    const con = f.contacts?`<div class="fx-contacts"><small>${L("รายชื่อติดต่อ","Contacts")}</small>${f.contacts.map(c=>`<div><b>${esc(EN()?c[1]:c[0])}</b><span>${c[2]}</span></div>`).join("")}</div>`:"";
    const note = f.note?`<p class="fx-note">${tr<=1?`${esc(LX(f.note))}: ${f.answer}`:esc(LX(f.note))}</p>`:"";
    inner=`${sms}${side}${con}${note}<div class="fx-num" id="fxNum">${esc(st.num||"")}<i></i></div>
      <div class="fx-pad">${["1","2","3","4","5","6","7","8","9","*","0","⌫"].map(d=>`<button data-fxd="${d}">${d}</button>`).join("")}</div>`;
  }
  else if(k==="settings"){
    st.on=st.on||f.items.map(i=>i.on);
    inner=`<div class="fx-set">${f.items.map((it,i)=>`<label class="fx-tog"><span>${esc(LX(it.t))}</span><input type="checkbox" data-fxt="${i}" ${st.on[i]?"checked":""}><i></i></label>`).join("")}</div>`;
  }
  else if(k==="order"){
    st.pick=st.pick||[];
    if(!st.pool){ const all=[...f.steps.map((s,i)=>({s,i})), ...((tr>=3&&f.extra)||[]).map(s=>({s,i:-1}))]; st.pool=all.sort(()=>Math.random()-.5); }
    inner=`<p class="fx-note">${L("แตะทีละข้อตามลำดับที่ควรทำ","Tap the steps in the order you'd do them")}${tr>=3&&f.extra?L(" (มีข้อที่ไม่ควรทำปนอยู่)"," (some shouldn't be done at all)"):""}</p>
      <ol class="fx-seq">${st.pick.map(p=>`<li>${esc(LX(st.pool[p].s))}</li>`).join("")||`<li class="empty">${L("ยังไม่ได้เลือก","Nothing yet")}</li>`}</ol>
      <div class="fx-pool">${st.pool.map((p,i)=>`<button data-fxo="${i}" ${st.pick.includes(i)?"disabled":""}>${esc(LX(p.s))}</button>`).join("")}</div>
      ${st.pick.length?`<button class="fx-undo" data-fxundo>↩ ${L("เอาข้อล่าสุดออก","Undo last")}</button>`:""}`;
  }
  else if(k==="pick"||k==="multi"){
    st.sel=st.sel||[];
    inner=`<p class="fx-q">${esc(LX(f.q))}</p><div class="fx-opts ${k}">${f.opts.map((o,i)=>`<button data-fxp="${i}" aria-pressed="${st.sel.includes(i)}">${k==="pick"&&typeof o.t==="string"?`<code>${esc(o.t)}</code>`:esc(LX(o.t))}</button>`).join("")}</div>`;
  }
  else if(k==="pin"){
    inner=`<p class="fx-note">${esc(LX(f.hint))}</p><div class="fx-num pin" id="fxNum">${(st.num||"").replace(/./g,"●")}${"○".repeat(6-(st.num||"").length)}</div>
      <div class="fx-pad">${["1","2","3","4","5","6","7","8","9","","0","⌫"].map(d=>d?`<button data-fxd="${d}">${d}</button>`:"<span></span>").join("")}</div>`;
  }
  openSheet("fix", `${top_(L("📱 ขั้นสุดท้าย","📱 Last step"),false)}<div class="sh-body">${fixShell(inner)}</div>`);
  wireFix();
}
function pwRules(tr){
  const r=[{k:"len",n:tr>=3?12:tr>=2?10:8}];
  const out=[{k:"len",t:L(`ยาวอย่างน้อย ${r[0].n} ตัว`,`At least ${r[0].n} characters`)}];
  if(tr>=2) out.push({k:"mix",t:L("มีทั้งตัวอักษรและตัวเลข","Letters and numbers")});
  if(tr>=3) out.push({k:"sym",t:L("มีตัวพิมพ์ใหญ่และสัญลักษณ์","An uppercase letter and a symbol")});
  out.push({k:"weak",t:L("ไม่ใช่รหัสเดาง่าย (1234, password, ชื่อตัวเอง)","Not guessable (1234, password, your name)")});
  return out.map(o=>({...o,n:r[0].n}));
}
function pwCheck(pw,tr){
  const rules=pwRules(tr), low=pw.toLowerCase(), nm_=(S.name||"").toLowerCase();
  const res={len:pw.length>=rules[0].n, mix:/[a-z]/i.test(pw)&&/\d/.test(pw), sym:/[A-Z]/.test(pw)&&/[^A-Za-z0-9]/.test(pw),
    weak:!!pw && !/1234|abcd|password|qwer|1111|0000/.test(low) && !(nm_ && nm_.length>1 && low.includes(nm_))};
  return rules.map(r=>[r.k,res[r.k]]);
}
function genPw(){ const c="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789", s="!@#$%&*?"; let p=""; for(let i=0;i<13;i++) p+=c[Math.floor(Math.random()*c.length)]; return p.slice(0,5)+s[Math.floor(Math.random()*s.length)]+p.slice(5)+Math.floor(Math.random()*10); }
function wireFix(){
  const sh=$("sheet"), st=FIXST.st, f=FIXST.f;
  const q=(s,fn)=>sh.querySelectorAll(s).forEach(el=>el.onclick=(e)=>fn(el,e));
  q("[data-fxback]",()=>fixExit(false));
  q("[data-fxgo]",()=>submitFix());
  q("[data-fxhint]",()=>buyFixHint());
  const inp=$("fxIn");
  if(inp){ inp.oninput=()=>{ if(f.kind==="reply") st.txt=inp.value; else { st.pw=inp.value; liveRules(); } }; inp.onkeydown=(e)=>{ e.stopPropagation(); if(e.key==="Enter"&&f.kind!=="reply"){ e.preventDefault(); submitFix(); } }; setTimeout(()=>inp.focus({preventScroll:true}),60); if(f.kind==="pw") liveRules(); }
  q("[data-fxmail]",(el)=>{ const m=f.inbox[+el.dataset.fxmail]; if(m.ok){ st.mail=true; sfx("blip"); drawFix(); } else if(m.skip) fixMsg(false,L("อีเมลนี้ไม่เกี่ยว ลองหาอีเมลรีเซ็ตรหัส","Not this one. Find the reset email")); else { el.classList.add("bad"); fixMsg(false,L(`ระวัง! ${esc(m.from)} ไม่ใช่โดเมนจริง นี่คืออีเมลฟิชชิง`,`Careful! ${esc(m.from)} isn't the real domain. That's phishing`)); } });
  q("[data-fxgen]",()=>{ st.pw=genPw(); $("fxIn").value=st.pw; liveRules(); sfx("ping"); });
  const tf=$("fx2fa"); if(tf) tf.onchange=()=>{ st.twofa=tf.checked; };
  q("[data-fxd]",(el)=>{ const d=el.dataset.fxd, max=f.kind==="pin"?6:12; st.num=st.num||""; if(d==="⌫") st.num=st.num.slice(0,-1); else if(st.num.length<max) st.num+=d; sfx("blip"); const n=$("fxNum"); if(f.kind==="pin") n.textContent=st.num.replace(/./g,"●")+"○".repeat(6-st.num.length); else n.innerHTML=esc(st.num)+"<i></i>"; });
  sh.querySelectorAll("[data-fxt]").forEach(el=>el.onchange=()=>{ st.on[+el.dataset.fxt]=el.checked; });
  q("[data-fxo]",(el)=>{ st.pick.push(+el.dataset.fxo); sfx("blip"); drawFix(); });
  q("[data-fxundo]",()=>{ st.pick.pop(); drawFix(); });
  q("[data-fxp]",(el)=>{ const i=+el.dataset.fxp; if(f.kind==="pick") st.sel=[i]; else st.sel=st.sel.includes(i)?st.sel.filter(x=>x!==i):[...st.sel,i]; sh.querySelectorAll("[data-fxp]").forEach(b=>b.setAttribute("aria-pressed",String(st.sel.includes(+b.dataset.fxp)))); sfx("blip"); });
}
function liveRules(){ const ul=$("fxRules"); if(!ul) return; pwCheck(FIXST.st.pw||"",FIXST.tier).forEach(([k,ok])=>{ const li=ul.querySelector(`[data-r="${k}"]`); if(li) li.classList.toggle("ok",ok); }); }
const digits=(s)=>(s||"").replace(/\D/g,"");
function submitFix(){
  const f=FIXST.f, st=FIXST.st, tr=FIXST.tier; let ok=false, why="";
  if(f.kind==="reply"){
    const tx=(st.txt||"").toLowerCase();
    const miss=f.groups.filter(g=>!g.w.some(w=>tx.includes(w.toLowerCase())));
    ok=!miss.length && tx.trim().length>=6;
    why=ok?"":L("ยังขาด: ","Still missing: ")+miss.map(g=>esc(LX(g.h))).join(", ");
    if(!tx.trim()) why=L("พิมพ์ข้อความก่อน","Type a message first");
  }
  else if(f.kind==="pw"){
    if(!st.mail){ why=L("เลือกอีเมลรีเซ็ตที่เป็นของจริงก่อน","Pick the real reset email first"); }
    else { const bad=pwCheck(st.pw||"",tr).filter(([,v])=>!v); const need2=f.twofa||tr>=3;
      ok=!bad.length && (!need2 || st.twofa);
      why=bad.length?L("รหัสยังไม่ผ่านเงื่อนไขทุกข้อ","The password doesn't meet every rule"):L("อย่าลืมเปิด 2FA","Don't forget to turn on 2FA"); }
  }
  else if(f.kind==="dial"){
    const n=digits(st.num);
    ok=n===f.answer;
    if(!ok) why=(n && n===digits(LX(f.sms||"")))?L("นั่นเบอร์ของมิจฉาชีพ! ใช้เบอร์ที่เชื่อถือได้","That's the scammer's number! Use one you trust"):L("เบอร์ไม่ถูก ลองดูอีกที","Wrong number. Look again");
  }
  else if(f.kind==="settings"){
    const wrong=f.items.filter((it,i)=>st.on[i]!==it.want);
    ok=!wrong.length; why=L(`ยังตั้งไม่ถูกอีก ${wrong.length} ข้อ`,`${wrong.length} setting${wrong.length>1?"s":""} still wrong`);
  }
  else if(f.kind==="order"){
    const seq=st.pick.map(p=>st.pool[p].i);
    if(seq.includes(-1)) why=L("มีข้อที่ไม่ควรทำเลยปนอยู่ เอาออกก่อน","One of those shouldn't be done at all");
    else if(seq.length<f.steps.length) why=L("ยังเลือกไม่ครบ","Not all steps chosen");
    else { ok=seq.every((v,i)=>v===i); if(!ok) why=L("ลำดับยังไม่ถูก คิดว่าอะไรต้องทำก่อน","Not quite the right order. What must come first?"); }
  }
  else if(f.kind==="pick"){ ok=st.sel.length===1 && f.opts[st.sel[0]].ok; why=st.sel.length?L("ยังไม่ใช่ ดูชื่อโดเมน/ชื่อบัญชีให้ดี","Not that one. Look closely at the domain or account name"):L("เลือกก่อน","Choose one first"); }
  else if(f.kind==="multi"){ const want=f.opts.map((o,i)=>o.ok?i:-1).filter(i=>i>=0); ok=want.length===st.sel.length && want.every(i=>st.sel.includes(i)); why=st.sel.some(i=>!f.opts[i].ok)?L("มีข้อที่ไม่ควรเลือกปนอยู่","One of your picks shouldn't be there"):L("ยังเลือกไม่ครบ","You're missing some"); }
  else if(f.kind==="pin"){
    const p=st.num||""; const seq="0123456789012345", rseq="9876543210987654";
    if(p.length<6) why=L("ต้องครบ 6 หลัก","Needs 6 digits");
    else if(f.bad.includes(p)) why=L("นั่นคือวันเกิด! เดาง่ายมาก","That's a birthday! Too easy to guess");
    else if(/^(\d)\1+$/.test(p)||seq.includes(p)||rseq.includes(p)) why=L("เลขซ้ำหรือเรียงกันเดาง่าย","Repeated or sequential digits are easy to guess");
    else ok=true;
  }
  if(!ok){ fixMsg(false, why); return; }
  sfx("good"); const id=FIXST.id;
  if(!S.ev[id]){ S.ev[id]=true; S.evNew=(S.evNew||0)+1; } save(); hudKey="";
  const e=EVID[id];
  $("sheet").querySelector(".sh-body").innerHTML=`<div class="fx done"><div class="fx-ok">✅</div><b>${L("แก้เสร็จแล้ว!","Fixed!")}</b>${e?`<div class="evnew"><span class="evi">${e.i}</span><div><small>${L("เบาะแสใหม่เข้าบอร์ด","New clue on the board")} · ${evCount()}/${clueTotal()}</small><b>${e.t[EN()?1:0]}</b><span>${e.d[EN()?1:0]}</span></div></div>`:""}<div class="btns">${btn(L("ต่อไป","Continue"),"data-fxend","y")}</div></div>`;
  setTimeout(()=>sfx("ev"),300);
  $("sheet").querySelector("[data-fxend]").onclick=()=>fixExit(true);
}
function fixExit(ok){ const d=FIXST&&FIXST.done; FIXST=null; if(d) d(ok); else closeSheet(); }
