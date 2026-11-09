/* Helping the player find their way: mobile data that runs out, what money is for,
   a picture map of the street, and markers on the doors to the next room. */

/* ---------- mobile data ---------- */
const NET_START=300, NET_PACK=500, NET_PRICE=20, NET_RATE=0.4;   /* MB, MB per top-up, coins (= 200 baht), MB per second */
const netMB=()=>S.net==null?NET_START:S.net;
const onWifi=()=>!!(S.onWifi && S.onWifi[S.zone] && WIFI[S.zone]);
const online=()=>onWifi() || netMB()>0;
let netZone=-1;
function stepNet(dt){
  if(S.char && S.zone!==netZone){ netZone=S.zone; if(WIFI[S.zone] && !onWifi() && netMB()<120 && S.briefed) setTimeout(()=>toast(L("📶 ที่นี่มี Wi-Fi ฟรี ประหยัดเน็ตได้ (มือถือ › Wi-Fi) แต่ระวังตัวปลอม","📶 Free Wi-Fi here saves data (phone › Wi-Fi), but watch for fakes")),1800); }
  if(!S.char || !S.briefed || CIN || onWifi()) return;
  const was=netMB(); if(was<=0) return;
  S.net=Math.max(0, was-dt*NET_RATE);
  if(was>60 && S.net<=60){ toast(L("📶 เน็ตมือถือใกล้หมด! ต่อ Wi-Fi ของร้าน หรือเติมเน็ต","📶 Mobile data is running low! Join a shop's Wi-Fi or top up")); hudKey=""; }
  if(S.net<=0){ sfx("bad"); toast(L("📵 เน็ตหมดแล้ว! ขั้นลงมือแก้ในมือถือกับแชตจะใช้ไม่ได้ จนกว่าจะต่อ Wi-Fi หรือเติมเน็ต","📵 Out of data! The phone fix steps and chats need internet: join Wi-Fi or top up")); save(); hudKey=""; }
  if(Math.floor(was/10)!==Math.floor(S.net/10)) hudKey="";
}
function buyNet(after){
  if(S.coins<NET_PRICE){ toast(L(`เงินไม่พอ ต้องมี ${BAHT(NET_PRICE)}`,`Not enough money: you need ${BAHT(NET_PRICE)}`)); sfx("bad"); return false; }
  addCoins(-NET_PRICE); S.net=netMB()+NET_PACK; save(); hudKey=""; sfx("good");
  toast(L(`📶 เติมเน็ต ${NET_PACK} MB แล้ว (−${BAHT(NET_PRICE)})`,`📶 Added ${NET_PACK} MB (−${BAHT(NET_PRICE)})`));
  after&&after(); return true;
}
function needNet(then, back){
  if(online()){ then(); return; }
  const w=WIFI[S.zone];
  openSheet("net", `${top_(L("📵 ไม่มีอินเทอร์เน็ต","📵 No internet"))}<div class="sh-body">
    <div class="wcomic"><span class="wv">📵</span><p>${L("เน็ตมือถือหมดแล้ว ต้องต่ออินเทอร์เน็ตก่อนถึงจะทำต่อได้","Your mobile data has run out. Get online first")}</p></div>
    <div class="moneyopts">
      <button class="mopt" data-netbuy><span>💳</span><div><b>${L(`เติมเน็ต ${NET_PACK} MB`,`Top up ${NET_PACK} MB`)}</b><small>${BAHT(NET_PRICE)} · ${L("เงินในกระเป๋า","you have")} ${BAHT(S.coins)}</small></div></button>
      ${back?`<p class="note">${L("หรือปิดเคสนี้ก่อน แล้วต่อ Wi-Fi จากมือถือ จากนั้นกลับมาคุยกับคนนี้เพื่อทำขั้นสุดท้าย","Or close this case, join Wi-Fi from your phone, then talk to this person again to finish")}</p>`:w?`<button class="mopt" data-netwifi><span>📶</span><div><b>${L("ต่อ Wi-Fi ที่นี่ (ฟรี)","Join Wi-Fi here (free)")}</b><small>${L("ระวัง! บางตัวเป็น Wi-Fi ปลอมที่แอบดักข้อมูล","Careful! Some are fakes that steal data")}</small></div></button>`:`<p class="note">${L("ที่นี่ไม่มี Wi-Fi · ร้านกาแฟ ห้องสมุด ธนาคาร และร้านเน็ตมี Wi-Fi","No Wi-Fi here · the café, library, bank and net café have Wi-Fi")}</p>`}
    </div>
    <div class="btns"><button class="btn g" data-netlater><span>${L("ไว้ทีหลัง","Later")}</span></button></div></div>`);
  $("sheet").querySelector("[data-netlater]").onclick=()=>{ if(back) back(); else closeSheet(); };
  $("sheet").querySelector("[data-netbuy]").onclick=()=>{ if(buyNet()){ if(!back) closeSheet(); then(); } };
  const wb=$("sheet").querySelector("[data-netwifi]"); if(wb) wb.onclick=()=>openWifi();
}
function netLabel(){
  if(onWifi()) return {i:"📶",t:"Wi-Fi",cls:"wifi"};
  const m=Math.ceil(netMB());
  return {i:m>0?"📶":"📵",t:m>0?`4G ${m} MB`:L("เน็ตหมด","No data"),cls:m<=0?"out":m<=60?"low":""};
}

/* ---------- what money is for ---------- */
function openMoney(){
  const cheapest=Math.min(...SHOP.filter(it=>!shopOwned(it)).map(shopPrice).filter(Boolean));
  openSheet("money", `${top_(L("💵 เงินใช้ทำอะไร","💵 What money is for"))}<div class="sh-body">
    <div class="wallet"><span>${L("เงินในกระเป๋า","Your wallet")}</span><b>${BAHT(S.coins)}</b></div>
    <div class="moneyopts">
      <button class="mopt" data-netbuy><span>📶</span><div><b>${L(`เติมเน็ตมือถือ ${NET_PACK} MB`,`Mobile data ${NET_PACK} MB`)}</b><small>${BAHT(NET_PRICE)} · ${L(`เหลือ ${Math.ceil(netMB())} MB`,`${Math.ceil(netMB())} MB left`)}</small></div></button>
      <button class="mopt" data-shop><span>🛒</span><div><b>${L("อัปเกรดมือถือ","Phone upgrades")}</b><small>${L("ตัวจัดการรหัสผ่าน · VPN · สำรองคลาวด์ · แว่นนักสืบ","Password manager · VPN · cloud backup · lens")}${isFinite(cheapest)?` · ${L("เริ่ม","from")} ${BAHT(cheapest)}`:""}</small></div></button>
      <div class="mopt static"><span>🔧</span><div><b>${L("ซ่อมมือถือที่ติดไวรัส","Repair a phone with malware")}</b><small>${L("ร้านหมอโฟนริมถนน","Phone Dr. on the street")} · ${BAHT(40)}</small></div></div>
      <div class="mopt static"><span>⚠️</span><div><b>${L("เสียเงินเมื่อพลาด","Lost when you slip up")}</b><small>${L("โดนหลอกในเคส ต่อ Wi-Fi ปลอม","Getting scammed in a case, joining a fake Wi-Fi")}</small></div></div>
    </div>
    <div class="box"><h4>${L("หาเงินได้จาก","Earn money by")}</h4><ul class="list">
      <li>${L("ช่วยคนในเคสให้ปลอดภัย","Keeping people safe in cases")}</li><li>${L("ส่งเบาะแสให้พี่ภพ","Handing clues to Phop")}</li>
      <li>${L("ตอบข้อความในแชตถูก","Judging chat messages correctly")}</li><li>${L("มินิเกมที่ตู้ริมถนน","Mini-games at the street kiosk")}</li><li>${L("จับคนปล่อย Wi-Fi ปลอม","Catching fake Wi-Fi hackers")}</li></ul></div>
    <div class="btns"><button class="btn y" data-close><span>${L("เข้าใจแล้ว","Got it")}</span></button></div></div>`);
  $("sheet").querySelector("[data-netbuy]").onclick=()=>{ if(buyNet()) openMoney(); };
}
let moneyHintDone=false;
function moneyHint(){
  if(moneyHintDone || !S.char || busy() || S.moneyHint) return;
  const can=SHOP.filter(it=>!shopOwned(it)&&shopPrice(it)).some(it=>S.coins>=shopPrice(it));
  if(can){ moneyHintDone=true; S.moneyHint=true; save(); toast(L("💡 มีเงินพอซื้ออัปเกรดมือถือแล้ว กดที่ยอดเงินมุมซ้ายบนเพื่อดู","💡 You can afford a phone upgrade. Tap your money (top left) to see")); }
}

/* ---------- street map ---------- */
function streetMapSVG(){
  const gi=goalInfo(), gz=gi&&gi.z;
  const pz=S.zone===0?{x:player.x,y:player.y}:(doorOf(S.zone)||null);
  let s=`<svg class="smap" viewBox="0 0 ${OW} ${OH}" role="img" aria-label="${L("แผนที่ถนน","Street map")}">`;
  s+=`<rect width="${OW}" height="${OH}" fill="#E9E1D2"/>`;
  s+=`<rect x="0" y="612" width="${OW}" height="154" fill="#4A4D52"/><rect x="${IC.x0}" y="250" width="${IC.x1-IC.x0}" height="${OH-250}" fill="#4A4D52"/>`;
  for(let x=20;x<OW;x+=70) if(x<IC.x0-30||x>IC.x1+10) s+=`<rect x="${x}" y="686" width="40" height="6" fill="#F2F2F2"/>`;
  const lab=(x,y,t,fs,fill)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs||30}" font-weight="800" fill="${fill||"#1B1B1B"}" font-family="Noto Sans Thai, sans-serif">${esc(t)}</text>`;
  for(const b of BUILDINGS){ if(b.hide) continue;
    const open=b.alley?(b.soi||ghostOpen()):zoneOpen(b.zone), goal=b.zone===gz;
    const fill=b.alley?(b.col||"#6B5E70"):(b.wall||"#EEE"), y0=b.alley?150:40, h=b.alley?100:210;
    s+=`<g class="mb${open?"":" locked"}${goal?" tgt":""}"${open&&!b.alley||b.soi?` data-zone="${b.zone}"`:""}><rect x="${b.x}" y="${y0}" width="${b.w}" height="${h}" rx="10" fill="${fill}" stroke="#1B1B1B" stroke-width="6"/>`;
    if(!b.alley){ s+=`<rect x="${b.x}" y="${y0}" width="${b.w}" height="46" rx="10" fill="${b.roof||"#888"}" stroke="#1B1B1B" stroke-width="6"/>`;
      s+=lab(b.x+b.w/2,y0+125,b.name[S.lang],46,b.zone===4?"#FFFFFF":"#1B1B1B")+lab(b.x+b.w/2,y0+190,(open?`${L("โซน","Zone")} ${zno(b.zone)}`:"🔒")+(goal?" 🎯":""),48,b.zone===4?"#FFC414":"#7A4A2A"); }
    else s+=lab(b.x+b.w/2,y0-14,`${b.icon||"👻"}${goal?"🎯":""}`,64);
    s+=`</g>`; }
  s+=lab(IC.x0+(IC.x1-IC.x0)/2,330,L("🎓 มหาลัย","🎓 Campus"),46)+lab(1386,330,L("🚓 ตำรวจ","🚓 Police"),46)+lab(498,330,L("👻 ตรอก","👻 Alley"),40);
  for(const [i,o] of OFFICES.entries()){ const hq=S.hqFound&&i===hqB(), goal=gz===8;
    s+=`<g class="mb${goal?" tgt":""}"><rect x="${o.x}" y="${OFF_TOP+30}" width="${o.w}" height="${OH-OFF_TOP-40}" rx="10" fill="${o.wall}" stroke="#1B1B1B" stroke-width="6"/>`+lab(o.x+o.w/2,OFF_TOP+110,o.name[S.lang],44)+lab(o.x+o.w/2,OFF_TOP+175,hq?L("⚠️ รังแก๊ง","⚠️ Gang's base"):L("🏢 ออฟฟิศ","🏢 Offices"),44,hq?"#C0392B":"#555")+`</g>`; }
  s+=`<g>${lab(REPAIR.x,REPAIR.y-30,"🔧",64)}${lab(REPAIR.x,REPAIR.y+40,L("หมอโฟน","Phone Dr."),44)}</g>`;
  s+=`<g>${lab(KIOSK.x,KIOSK.y+20,"🕹️",64)}${lab(KIOSK.x,KIOSK.y+80,L("มินิเกม","Games"),44)}</g>`;
  if(pz) s+=`<g class="me"><circle cx="${pz.x}" cy="${pz.y}" r="34" fill="#2F6DB5" stroke="#FFF" stroke-width="10"/>${lab(pz.x,pz.y+80,L("คุณ","You"),46,"#2F6DB5")}</g>`;
  return s+`</svg>`;
}

/* ---------- markers on the doors to the next room ---------- */
function roomExits(){
  if(S.zone===0 || !S.char) return [];
  const out=[];
  if(S.zone===7 && !cbFloor()) out.push({k:"cells",x:RW-70,y:(PDOOR.y0+PDOOR.y1)/2,dir:"right",t:L("ห้องขัง","Cells")+" ➜"});
  if(S.zone===7 && cbFloor()) out.push({k:"station",x:70,y:(CB_TOP+CB_BOT)/2,dir:"left",t:"⬅ "+L("สถานีตำรวจ","Station")});
  if(S.zone===8) out.push({k:"lift"+S.bld,x:(OFF_LIFT.x0+OFF_LIFT.x1)/2,y:150,dir:"up",t:"🛗 "+L("ลิฟต์","Lift")});
  return out;
}
function drawExits(g,now){
  if(CIN) return;
  for(const e of roomExits()){
    const fresh=!(S.doorSeen&&S.doorSeen[e.k]), b=RM?0:Math.sin(now/(fresh?160:320))*(fresh?6:3);
    const ax=e.dir==="right"?b:e.dir==="left"?-b:0, ay=e.dir==="up"?-b:0;
    g.save(); g.font="800 15px 'Noto Sans Thai', sans-serif"; g.textAlign="center"; g.textBaseline="middle";
    const tw=g.measureText(e.t).width+24, x=e.x+ax-(e.dir==="right"?tw/2-10:e.dir==="left"?-tw/2+10:0), y=e.y-60+ay;
    rr(g,x-tw/2,y-15,tw,30,15); g.fillStyle=fresh?"#FFC414":"#FFFFFF"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.fillText(e.t,x,y+1); g.restore();
  }
}
function markExitSeen(k){ S.doorSeen=S.doorSeen||{}; if(!S.doorSeen[k]){ S.doorSeen[k]=true; save(); } }

/* ---------- the slap in the net-café case: you walk over and do it, and it goes badly ---------- */
function slapScene(then){
  const kid=npcs.find(n=>caseOf(n)==="topup") || npcs.find(n=>n.id==="phum");
  if(!kid){ then(); return; }
  const A=mk(kid.id), kx=kid.x, ky=kid.y, side=player.x<kx?-1:1;
  const st=[];
  st.push({fn:()=>{ npcs=npcs.filter(n=>n!==kid); cinPlace(A,kx,ky,kid.dir||"down"); }});
  st.push({mv:[[player,kx+side*40,ky,150]],face:[[player,side<0?"right":"left"]]});
  st.push({say:["me","ภูมิ! เอาเงินยายไปใช้ได้ยังไง!","Phum! How could you spend Grandma's money!"],em:[[player,"😠",1.6]],t:1.6});
  st.push({fn:()=>{ sfx("bad"); A.dir=side<0?"left":"right"; }, });
  st.push({em:()=>[[player,"✋",.7],[A,"💥",.7]],wait:.7});
  st.push({say:[kid.id,"ฮือ… ไม่บอกใครแล้ว!","Waah… I'm never telling anyone!"],em:()=>[[A,"😭",2.2]],t:2});
  st.push({mv:[[A,kx-side*320,ky,200]]});
  st.push({fn:()=>{ cinHide(A); sfx("bad"); }});
  st.push({say:["me","…มือถือยายหล่นจอแตกด้วย","…and Grandma's phone fell and cracked."],em:[[player,"😰",2]],t:2});
  startCinema(st, ()=>then(), {actors:[A]});
}

/* ---------- full-screen map, opened with the map button or M ---------- */
let townC=null, townKey="", bigTab="town";
function townImage(){
  const key=S.lang+(S.hqFound?1:0);
  if(S.zone===0){ townC=document.createElement("canvas"); townC.width=bg.width; townC.height=bg.height; townC.getContext("2d").drawImage(bg,0,0); townKey=key; return townC; }
  if(townC && townKey===key) return townC;
  const z=S.zone, f=S.floor, b=S.bld;
  S.zone=0; setWorld(); drawStatic();
  townC=document.createElement("canvas"); townC.width=bg.width; townC.height=bg.height; townC.getContext("2d").drawImage(bg,0,0); townKey=key;
  S.zone=z; S.floor=f; S.bld=b; setWorld(); drawStatic();
  return townC;
}
function openBigMap(tab){
  if(!S.char) return;
  bigTab=tab||(S.zone===0?"town":bigTab==="room"?"room":"town");
  const el=$("bigmap"), town=bigTab==="town", gi=goalInfo();
  const img=town?townImage():bg, MW=town?OW:W, MH=town?OH:H;
  const pct=(x,y)=>`left:${x/MW*100}%;top:${y/MH*100}%`;
  let pins="";
  if(town){
    for(const b of BUILDINGS){ if(b.hide) continue;
      const open=b.alley?(b.soi||ghostOpen()):zoneOpen(b.zone), goal=gi&&gi.z===b.zone, here=S.zone===b.zone;
      const label=b.alley?(b.zone===5?L("👻 ตรอกมืด","👻 Dark alley"):b.zone===7?L("🚓 สถานีตำรวจ","🚓 Police"):L("🎓 มหาวิทยาลัย","🎓 Campus")):`${b.name[S.lang]}${zno(b.zone)?` · ${L("โซน","Zone")} ${zno(b.zone)}`:""}`;
      pins+=`<button class="bm-pin${open?"":" locked"}${goal?" tgt":""}${here?" here":""}" style="${pct(b.door,b.alley?150:120)}" ${open?`data-bmgo="${b.zone}"`:"disabled"} aria-label="${esc(label)}">${open?"":"🔒 "}${esc(label)}${goal?" 🎯":""}</button>`; }
    for(const [i,o] of OFFICES.entries()){ const hq=S.hqFound&&i===hqB();
      pins+=`<span class="bm-pin office${gi&&gi.z===8?" tgt":""}" style="${pct(o.door,OFF_TOP+120)}">${esc(o.name[S.lang])}${hq?L(" · ⚠️ รังแก๊ง"," · ⚠️ gang"):""}</span>`; }
    pins+=`<span class="bm-pin small" style="${pct(REPAIR.x,REPAIR.y-40)}">🔧 ${L("หมอโฟน","Phone Dr.")}</span><span class="bm-pin small" style="${pct(KIOSK.x,KIOSK.y-60)}">🕹️ ${L("มินิเกม","Games")}</span>`;
    const me=S.zone===0?{x:player.x,y:player.y}:(doorOf(S.zone)||{x:OW/2,y:300});
    pins+=`<span class="bm-me" style="${pct(me.x,me.y)}"><i></i><b>${L("คุณ","You")}</b></span>`;
    if(S.zone===0) for(const n of npcs){ const c=!n.filler&&caseOf(n); if(c&&!S.best[c]) pins+=`<span class="bm-bang" style="${pct(n.x,n.y-60)}">!</span>`; }
  } else {
    for(const n of npcs){ const c=!n.filler&&caseOf(n); if(c&&!S.best[c]) pins+=`<span class="bm-bang" style="${pct(n.x,n.y-60)}">!</span>`; }
    for(const e of roomExits()) pins+=`<span class="bm-pin small exit" style="${pct(e.x,e.y-40)}">${esc(e.t)}</span>`;
    if(S.zone!==2 && S.zone!==8 && !(S.zone===7&&cbFloor())) pins+=`<span class="bm-pin small exit" style="${pct(432,RH-30)}">🚪 ${L("ทางออกสู่ถนน","Exit to street")}</span>`;
    pins+=`<span class="bm-me" style="${pct(player.x,player.y)}"><i></i><b>${L("คุณ","You")}</b></span>`;
  }
  el.innerHTML=`<div class="bm-top"><b>🗺️ ${L("แผนที่","Map")}</b>
      <div class="bm-tabs" role="tablist"><button role="tab" aria-selected="${town}" data-bmtab="town">${L("ทั้งเมือง","Town")}</button>${S.zone!==0?`<button role="tab" aria-selected="${!town}" data-bmtab="room">${L("ที่นี่","Here")} · ${esc(zoneName(S.zone))}</button>`:""}</div>
      <button class="bm-close" data-bmclose aria-label="${L("ปิดแผนที่","Close map")}">✕</button></div>
    ${gi?`<div class="bm-goal">🎯 ${esc(gi.t)}</div>`:""}
    <div class="bm-scroll"><div class="bm-map" style="aspect-ratio:${MW}/${MH}"><canvas id="bmCv"></canvas>${pins}</div></div>
    <div class="bm-foot"><span><i class="lg me"></i>${L("คุณ","You")}</span><span><i class="lg bang">!</i>${L("คนที่ต้องช่วย","Needs help")}</span><span><i class="lg tgt"></i>${L("ที่ต้องไป","Your goal")}</span>${town?`<span>${L("แตะชื่อสถานที่ที่เปิดแล้วเพื่อไปได้เลย","Tap an open place to go there")}</span>`:""}<button class="bm-list" data-bmlist>${L("📋 รายการภารกิจ","📋 Mission list")}</button></div>`;
  el.hidden=false; sfx("blip");
  const cvm=$("bmCv"); cvm.width=img.width; cvm.height=img.height; cvm.getContext("2d").drawImage(img,0,0);
  el.querySelectorAll("[data-bmtab]").forEach(b=>b.onclick=()=>openBigMap(b.dataset.bmtab));
  el.querySelector("[data-bmclose]").onclick=closeBigMap;
  el.querySelector("[data-bmlist]").onclick=()=>{ closeBigMap(); openZones(); };
  el.querySelectorAll("[data-bmgo]").forEach(b=>b.onclick=()=>{ const z=+b.dataset.bmgo; closeBigMap(); if(z===S.zone) return; goZone(z); });
  const here=el.querySelector(".bm-me"), sc=el.querySelector(".bm-scroll");
  if(here && sc.scrollWidth>sc.clientWidth) sc.scrollLeft=here.offsetLeft-sc.clientWidth/2;
}
function closeBigMap(){ const el=$("bigmap"); if(el){ el.hidden=true; el.innerHTML=""; } }
const bigMapOpen=()=>!$("bigmap").hidden;
