/* Play-together chat: type a short message, it pops up as a bubble over your character and lands in a
   chat panel for everyone in the same room. Messages ride on the shared player state (MP.me.say), so they
   work over every link the game uses (Supabase, the Claude room, test tabs). Nothing is stored: the log
   lives in memory only and is gone when the game is closed or the room changes. */
const CHAT_MAX=80, CHAT_GAP=1200, BUB_MS=6000, CHAT_LOG=40;
const CHAT={log:[], seen:{}, bub:{}, mine:null, seq:0, last:0, open:false, unread:0, key:""};
/* a light word filter for a classroom; masks the word, keeps the message */
const CHAT_BAD=["ควย","เหี้ย","สัส","เย็ด","แตด","fuck","shit","bitch","cunt"];
function chatClean(t){
  let s=String(t||"").replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim().slice(0,CHAT_MAX);
  for(const w of CHAT_BAD){ s=s.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),"*".repeat(Math.min(w.length,4))); }
  return s;
}
function chatReset(){ CHAT.log=[]; CHAT.seen={}; CHAT.bub={}; CHAT.mine=null; CHAT.unread=0; CHAT.key=""; mpSet({say:null}); }
function chatSend(text){
  const t=chatClean(text); if(!t) return false;
  const now=Date.now(); if(now-CHAT.last<CHAT_GAP){ toast(L("ส่งช้าลงอีกนิดนะ","Slow down a little")); return false; }
  CHAT.last=now; CHAT.seq++;
  mpSet({say:{i:CHAT.seq, t, w:now}});
  CHAT.mine={t, at:performance.now()};
  chatPush({nm:mpName(), t, me:true});
  return true;
}
function chatPush(m){
  CHAT.log.push(m); if(CHAT.log.length>CHAT_LOG) CHAT.log.shift();
  if(!CHAT.open && !m.me) CHAT.unread++;
  CHAT.key=""; chatRender();
}
/* called every frame from stepMp: pick up new messages from the other players */
function chatTick(){
  if(!MP.on) return;
  const now=Date.now();
  for(const o of mpOthers()){
    const s=o.p.say; if(!s || typeof s.i!=="number") continue;
    const seen=CHAT.seen[o.id];
    if(seen===s.i) continue;
    CHAT.seen[o.id]=s.i;
    if(typeof s.w==="number" && Math.abs(now-s.w)>20000) continue;   /* an old message from someone who just walked in */
    const t=chatClean(s.t); if(!t) continue;
    CHAT.bub[o.id]={t, at:performance.now()};
    chatPush({nm:String(o.p.nm||"?").slice(0,16), t, me:false});
  }
  chatDock();
}

/* ---------- bubbles over heads ---------- */
const CHAT_FONT="600 13px system-ui, -apple-system, 'Segoe UI', 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', sans-serif";
function chatWrap(g,t,maxW){
  const out=[]; let line="";
  for(const ch of Array.from(t)){
    const test=line+ch;
    if(g.measureText(test).width>maxW && line){ out.push(line); line=ch; if(out.length===2) break; } else line=test;
  }
  if(out.length<2 && line) out.push(line);
  else if(out.length===2 && Array.from(t).length>Array.from(out.join("")).length){ out[1]=out[1].replace(/.$/,"…"); }
  return out;
}
function chatBubble(g,x,headY,t,now,at){
  const age=now-at; if(age>BUB_MS) return;
  const a=age>BUB_MS-600?(BUB_MS-age)/600:1;
  g.save(); g.globalAlpha=Math.max(0,a); g.font=CHAT_FONT; g.textAlign="center"; g.textBaseline="middle";
  const lines=chatWrap(g,t,170), w=Math.max(...lines.map(l=>g.measureText(l).width))+20, h=lines.length*17+12;
  const bx=x-w/2, by=headY-h-12;
  rr(g,bx,by,w,h,10); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle="#1E1A16"; g.stroke();
  g.beginPath(); g.moveTo(x-6,by+h-1); g.lineTo(x,by+h+8); g.lineTo(x+6,by+h-1); g.closePath(); g.fillStyle="#FFFFFF"; g.fill();
  g.beginPath(); g.moveTo(x-6,by+h); g.lineTo(x,by+h+8); g.lineTo(x+6,by+h); g.stroke();
  g.fillStyle="#1E1A16"; lines.forEach((l,i)=>g.fillText(l,x,by+6+8.5+i*17));
  g.restore();
}
/* added to the draw list after everyone else, so bubbles sit on top */
function chatDrawItems(items){
  if(!MP.on) return;
  const zk=mpZone();
  items.push({y:1e6, d:(g,now)=>{
    const t=performance.now();
    if(CHAT.mine && S.char) chatBubble(g,player.x,player.y-CHAR_H-26,CHAT.mine.t,t,CHAT.mine.at);
    for(const o of mpOthers()){
      const b=CHAT.bub[o.id], s=MP.shown[o.id]; if(!b || !s || o.p.zk!==zk) continue;
      chatBubble(g,s.x,s.y-CHAR_H-26,b.t,t,b.at);
    }
  }});
}

/* ---------- the chat button and panel ---------- */
function chatDock(){
  const show=MP.on && !!S.char && sheetMode!=="start";
  let btn=$("chatBtn");
  if(!btn){ if(!show) return;
    btn=document.createElement("button"); btn.id="chatBtn"; btn.type="button";
    btn.onclick=()=>chatToggle(); document.body.appendChild(btn);
    const p=document.createElement("div"); p.id="chatPanel"; p.hidden=true; p.setAttribute("role","dialog"); p.setAttribute("aria-label",L("แชตในห้อง","Room chat"));
    p.innerHTML=`<div class="cp-head"><b>${L("💬 แชตในห้อง","💬 Room chat")}</b><small>${L("ไม่ถูกบันทึก ปิดเกมแล้วหายหมด","Not saved: gone when you close the game")}</small><button type="button" class="cp-x" aria-label="${L("ปิดแชต","Close chat")}">✕</button></div>
      <div class="cp-log" id="chatLog" aria-live="polite"></div>
      <form class="cp-form" id="chatForm" autocomplete="off"><input id="chatIn" maxlength="${CHAT_MAX}" placeholder="${L("พิมพ์ข้อความ…","Type a message…")}" aria-label="${L("ข้อความ","Message")}" enterkeyhint="send"><button type="submit">${L("ส่ง","Send")}</button></form>`;
    document.body.appendChild(p);
    p.querySelector(".cp-x").onclick=()=>chatToggle(false);
    const inp=$("chatIn");
    inp.addEventListener("keydown",e=>{ e.stopPropagation(); if(e.key==="Escape"){ chatToggle(false); } });
    inp.addEventListener("keyup",e=>e.stopPropagation());
    $("chatForm").onsubmit=e=>{ e.preventDefault(); if(chatSend(inp.value)) inp.value=""; inp.focus(); };
  }
  btn.hidden=!show; if(!show){ chatToggle(false); return; }
  const t=`💬${CHAT.unread?` <i>${CHAT.unread>9?"9+":CHAT.unread}</i>`:""}`;
  if(btn.dataset.t!==t){ btn.innerHTML=t; btn.dataset.t=t; btn.setAttribute("aria-label",L(`แชต${CHAT.unread?` ข้อความใหม่ ${CHAT.unread}`:""}`,`Chat${CHAT.unread?`, ${CHAT.unread} new`:""}`)); }
}
function chatToggle(open){
  const p=$("chatPanel"); if(!p) return;
  CHAT.open=open===undefined?!CHAT.open:!!open;
  p.hidden=!CHAT.open;
  if(CHAT.open){ CHAT.unread=0; CHAT.key=""; chatRender(); setTimeout(()=>$("chatIn")?.focus({preventScroll:true}),50); }
  else if(document.activeElement===$("chatIn")) document.activeElement.blur();
  chatDock();
}
function chatRender(){
  const box=$("chatLog"); if(!box || !CHAT.open) return;
  const key=CHAT.log.length+":"+(CHAT.log.at(-1)?.t||""); if(key===CHAT.key) return; CHAT.key=key;
  box.innerHTML=CHAT.log.length?CHAT.log.map(m=>`<p class="${m.me?"me":""}"><b>${esc(m.nm)}${m.me?` (${L("คุณ","you")})`:""}</b> ${esc(m.t)}</p>`).join("")
    :`<p class="cp-empty">${L("ยังไม่มีข้อความ พิมพ์ทักเพื่อนในห้องได้เลย","No messages yet. Say hi to the room!")}</p>`;
  box.scrollTop=box.scrollHeight;
}
