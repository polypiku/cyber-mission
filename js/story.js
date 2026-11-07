/* Prologue, the police station, the raid and the five endings. */
/* ---------- story: prologue, Phop at the station, the raid and the five endings ---------- */
const P=(bg,art,cap,say)=>({bg,art,cap,say:say||[]});
function face_(id){ const sp=SPRITES[id]; return sp&&sp.face?`<img src="${sp.face.src}" alt="">`:"🙂"; }
function openCutscene(title, panels, onDone){
  let i=0;
  const show=()=>{
    const pn=panels[i], last=i===panels.length-1;
    const says=pn.say.map(([who,th,en])=>`<div class="cs-say"><span class="cs-face">${who==="me"?face_(S.char):face_(who)}</span><div><b>${who==="me"?L("คุณ","You"):nm(who)}</b><p>${EN()?en:th}</p></div></div>`).join("");
    openSheet("cut", `<div class="cs"><div class="cs-top"><span>${title}</span><small>${i+1} / ${panels.length}</small></div>
      <div class="cs-panel" style="--bg:${pn.bg}"><div class="cs-art">${pn.art}</div><div class="cs-cap">${pn.cap[EN()?1:0]}</div></div>
      <div class="cs-says">${says}</div>
      <div class="btns"><button class="btn g" data-cskip><span>${L("ข้าม","Skip")}</span></button><button class="btn y" data-cnext><span>${last?L("ต่อไป","Continue"):L("ถัดไป ›","Next ›")}</span></button></div></div>`);
    $("sheet").querySelector("[data-cnext]").onclick=()=>{ sfx("blip"); if(last){ closeSheet(); onDone&&onDone(); } else { i++; show(); } };
    $("sheet").querySelector("[data-cskip]").onclick=()=>{ closeSheet(); onDone&&onDone(); };
  };
  show();
}
const mentorId=()=>"volOat";
function PROLOGUE(){ const M=mentorId(); return [
  P("#2A231C","📺🚨📱💸",["ข่าวด่วน: ย่านตลาดนี้มีคนโดนหลอกออนไลน์ติดกันหลายสิบราย ทั้ง QR ปลอม SMS ปลอม ตำรวจปลอม","Breaking news: dozens of online scams in this market district: fake QR codes, fake SMS, fake police."]),
  P("#22344A","👮📞👩‍✈️",["เบาะแสทั้งหมดชี้ไปที่ “แก๊งเงา” ที่ซ่อนตัวอยู่แถวนี้","Every clue points to the “Shadow gang”, hiding somewhere nearby."],[["police","แก๊งนี้หลอกคนธรรมดาทุกวัน ตำรวจอยู่ทุกที่ไม่ได้ ผมอยากให้ชมรมการ์ดไซเบอร์ช่วย","This gang scams ordinary people every day. Police can't be everywhere. I need the Cyber Guard club's help."],[M,"ได้เลยพี่ภพ เราจะส่งคนไปสืบ","Leave it to us, Phop. We'll send someone in."]]),
  P("#173E3C","🕵️☕🏦📚🎮",["ภารกิจของเรา: ปลอมตัวเป็นคนธรรมดา ช่วยคนที่กำลังจะโดนหลอก เก็บหลักฐาน แล้วหาว่าแก๊งเงาอยู่ที่ไหน","Our mission: blend in, help people about to be scammed, collect evidence, and find where the Shadow gang hides."],[["me","เริ่มจากร้านกาแฟก่อนเลย","Let's start at the café."]]),
  P("#5B3A24","🎓🚓🏢",["ถนนเส้นนี้มีสี่แยกตรงกลาง เลี้ยวขึ้นไปคือมหาวิทยาลัย ซอย 2 ไปสถานีตำรวจ และตึกออฟฟิศสามตึกฝั่งตรงข้ามถนน ได้ข่าวว่าแก๊งเงาซ่อนอยู่ในตึกหนึ่ง","This street has a crossroads in the middle; the road north goes to the university, Soi 2 to the police station, and three office buildings across the road. Word is the gang hides in one of them."],[[M,"ช่วยให้ครบทุกคน แล้วเอาหลักฐานไปให้พี่ภพ นั่นแหละคือวิธีจับแก๊งเงา","Help everyone, then take the evidence to Phop. That's how we catch the Shadow gang."]])
];}
function endingNo(){
  const pct=starTotal()/starMax(), caughtAll=[1,2,3,4].every(z=>S.caught&&S.caught[z]), witness=S.best.parttime==="safe";
  if(pct>=.9 && witness && caughtAll) return 5;
  if(pct>=.75) return 4; if(pct>=.55) return 3; if(pct>=.35) return 2; return 1;
}
const ENDINGS={
 5:{t:["ทลายรัง","Nest destroyed"],c:"#2BB673",panels:()=>[
   P("#22344A","🚓🚓🚓🌅",["รุ่งเช้า ตำรวจล้อมตึกฝั่งตรงข้ามถนนเงียบๆ ทุกทางออก","At dawn, police quietly surround every exit of the building across the road."],[["police","หลักฐานครบทุกสาย มีพยาน มีคนแฝงตัวถูกจับครบ บุกได้!","Every thread is covered, we have a witness, every hidden hacker is caught. Go!"]]),
   P("#2A231C","🚪💥👮👮",["ประตูเปิด ข้างในมีคอมพิวเตอร์หลายสิบเครื่อง ซิมการ์ดเป็นกล่องๆ และบทพูดหลอกคนติดผนัง","The door opens: dozens of computers, boxes of SIM cards, scam scripts pinned to the walls."]),
   P("#3A0606","🕴️😱🔗",["“เฮียเงา” หัวหน้าแก๊งกำลังจะลบข้อมูล แต่คำให้การของปวีณาทำให้ตำรวจรู้ทางหนีไฟลับ จับได้คาที่","“Boss Shadow” tries to wipe the servers, but Paweena's statement revealed the secret fire exit. Caught red-handed."]),
   P("#173E3C","🏦🔒💸➡️👵👴",["บัญชีม้าทั้งหมดถูกอายัด เงินจำนวนมากถูกคืนให้ผู้เสียหาย ตาบุญกับยายศรีได้เงินคืน","Every mule account is frozen. Much of the money goes back to victims, Grandpa Boon and Grandma Sri included."]),
   P("#5B3A24","🎓🙇‍♀️💐",["ปวีณาได้รับการคุ้มครองในฐานะพยาน และกลับไปเรียนต่อ","Paweena is protected as a witness and goes back to her studies."],[["paweena","ขอบคุณที่ไม่ปล่อยให้เราอยู่คนเดียวนะ","Thank you for not leaving me alone in this."]]),
   P("#2BB673","🏆🛡️✨",["พี่ภพยื่นบัตรอาสาสมัครตำรวจไซเบอร์ให้คุณ ย่านนี้ปลอดภัยขึ้นจริงๆ","Phop hands you a cyber police volunteer badge. The district really is safer."],[["police","คุณคือเหตุผลที่เราจับได้ทั้งแก๊ง","You're the reason we caught the whole gang."]])]},
 4:{t:["จับลูกน้อง หัวหน้าหนี","Crew caught, boss escaped"],c:"#2F6DB5",panels:()=>[
   P("#22344A","🚓🚓🌅",["รุ่งเช้า ตำรวจล้อมตึกฝั่งตรงข้ามถนน","At dawn, police surround the building across the road."],[["police","หลักฐานแน่นพอ บุก!","The evidence is solid. Go!"]]),
   P("#2A231C","🚪💥👮👥",["คนโทรหลอกหลายสิบคนถูกควบคุมตัว เครื่องคอมและซิมถูกยึดหมด","Dozens of scam callers are detained, computers and SIMs seized."]),
   P("#3A0606","🕴️🏃💨🚤",["แต่ “เฮียเงา” หนีออกทางลับ ไปขึ้นเรือข้ามแดนได้ทัน","But “Boss Shadow” slips out a secret way and escapes across the border by boat."]),
   P("#173E3C","🏦🔒",["บัญชีม้าส่วนใหญ่ถูกอายัด ผู้เสียหายหลายคนได้เงินคืนบางส่วน","Most mule accounts are frozen, and many victims get part of their money back."]),
   P("#1a1a1a","📱🕶️…",["คืนนั้นมือถือคุณสั่น ข้อความจากเบอร์ไม่รู้จัก: “เจอกันใหม่นะ การ์ดไซเบอร์”","That night your phone buzzes. Unknown number: “See you again, Cyber Guard.”"],[["police","ถ้ามีพยานและจับคนแฝงตัวได้ครบกว่านี้ เราคงไม่พลาดเขา","With a witness and every hidden hacker caught, we wouldn't have missed him."]])]},
 3:{t:["ปิดเซิร์ฟเวอร์ได้","Servers shut down"],c:"#F2C14E",panels:()=>[
   P("#22344A","🚓🌅",["ตำรวจบุกตึกฝั่งตรงข้ามถนน","Police raid the building across the road."]),
   P("#2A231C","🖥️🔌📦",["เจอเซิร์ฟเวอร์ 185.xx.xx.7 ที่ใช้ทำเว็บปลอมทั้งหมด ยึดได้ทันที","They find the 185.xx.xx.7 server behind every fake site and seize it."]),
   P("#3A0606","🚪🕳️👣",["แต่คนส่วนใหญ่หนีไปก่อนแล้ว เหลือแค่ลูกน้องไม่กี่คน","But most of the crew had already fled. Only a few small fry remain."]),
   P("#1a1a1a","🌐➡️🏚️",["ไม่กี่สัปดาห์ต่อมา เว็บปลอมชุดใหม่ก็โผล่มาจากที่อื่น","A few weeks later, new fake sites pop up from somewhere else."],[["police","เราตัดแขนเขาได้ข้างหนึ่ง แต่ยังไม่ถึงหัว ต้องมีหลักฐานมากกว่านี้","We cut off one arm, not the head. We need more evidence."]])]},
 2:{t:["ห้องว่างเปล่า","An empty room"],c:"#F2994A",panels:()=>[
   P("#22344A","🚓🌅",["ตำรวจบุกตึกฝั่งตรงข้ามถนน","Police raid the building across the road."]),
   P("#2A231C","🚪🕳️🪑",["ห้องว่างเปล่า เหลือแค่โต๊ะ สายไฟ และกล่องซิมที่ถูกเผา","The room is empty: desks, cables and a box of burned SIM cards."]),
   P("#3A0606","📱🕵️",["แก๊งเงารู้ตัวก่อน มีคนแจ้งข่าวว่าหลักฐานของเรายังไม่แน่นพอ","The Shadow gang was tipped off that our evidence wasn't solid enough."]),
   P("#1a1a1a","👵💸😢",["ผู้เสียหายหลายคนยังไม่ได้เงินคืน","Many victims never get their money back."],[["police","ยังไม่จบ กลับไปช่วยคนให้ดีกว่านี้ แล้วเรามาลองใหม่","It's not over. Go back, help people better, and we'll try again."]])]},
 1:{t:["ถูกจับเข้าแก๊ง","Taken by the gang"],c:"#E5402F",panels:()=>[
   P("#22344A","🚓…⏳",["หลักฐานยังไม่พอ ตำรวจต้องรอหมายค้น การบุกถูกเลื่อนออกไป","The evidence isn't enough. Police must wait for a warrant, and the raid is delayed."]),
   P("#1a1a1a","🌙🚐👥",["คืนนั้นระหว่างทางกลับ รถตู้สีดำจอดข้างคุณ","That night, on your way home, a black van pulls up beside you."],[["me","เดี๋ยว… พวกคุณเป็นใคร","Wait… who are you?"]]),
   P("#3A0606","🏢🔒💻",["คุณตื่นขึ้นในตึกฝั่งตรงข้ามถนน มือถือถูกยึด ประตูล็อกจากข้างนอก","You wake inside the building across the road. Phone taken, door locked from outside."]),
   P("#2A231C","🎧📞📜",["หัวหน้ายื่นหูฟังกับบทพูดให้ “ต่อจากนี้แกต้องโทรหลอกคนแทนเรา”","The boss hands you a headset and a script: “From now on, you make the calls for us.”"],[["me","…ไม่ ฉันจะไม่หลอกใคร","…No. I won't scam anyone."]]),
   P("#1a1a1a","🧠🔁",["ในใจคุณย้อนคิดทุกคนที่ยังไม่ได้ช่วยให้ดีพอ… ถ้าย้อนเวลาได้","You think back to everyone you could have helped better… if only you could go back."]),
   P("#E5402F","↩️⭐",["ฉากจบนี้ไม่ใช่ตอนจบจริง กลับไปเล่นเคสใหม่ เก็บดาวให้มากขึ้น แล้วไปหาพี่ภพอีกครั้ง","This isn't the real ending. Replay cases, earn more stars, and go back to Phop."],[["police","(ข้อความเสียงที่ส่งไม่ถึงคุณ) เราจะหาคุณให้เจอ","(a voice message that never reached you) We'll find you."]])]}
};
const RAID_OPEN=()=>[P("#22344A","👮🗂️🧩",["ที่สถานีตำรวจ พี่ภพกางหลักฐานทุกชิ้นบนโต๊ะ","At the station, Phop lays every piece of evidence on the table."],[["police","บัญชีม้า เซิร์ฟเวอร์ ซิมการ์ด ทุกสายชี้ไปที่ตึกเดียวกัน","Mule accounts, server, SIM cards: every thread points to one building."]])];
function playEnding(){
  const n=endingNo(), E=ENDINGS[n];
  S.ending=n; S.bestEnding=Math.max(S.bestEnding||0,n); if(n>=2){ S.bustTier=Math.max(S.bustTier||0,n); S.busted=true; } save();
  playEndingScene(n,true);
}
function endingCard(n){
  const E=ENDINGS[n], pct=Math.round(starTotal()/starMax()*100), caught=[1,2,3,4].filter(z=>S.caught&&S.caught[z]).length;
  const tick=(ok)=>ok?"✅":"⬜";
  openSheet("unlock", `<div class="unlockhero" style="background:${E.c}"><span class="eyebrow">${L("ฉากจบ","Ending")} ${n} / 5</span><div class="ubig">${E.t[EN()?1:0]}</div><p>${L("ฉากจบที่ดีที่สุดที่เคยได้","Best ending so far")}: ${S.bestEnding}/5</p></div>
    <div class="sh-body"><div class="box"><h4>${L("สิ่งที่ส่งผลต่อฉากจบ","What decides the ending")}</h4><ul class="list">
      <li>★ ${L("ดาวรวม","Stars")} ${starTotal()}/${starMax()} (${pct}%) · ${L("ฉาก 2: 35% · 3: 55% · 4: 75% · 5: 90%","Ending 2: 35% · 3: 55% · 4: 75% · 5: 90%")}</li>
      <li>${tick(S.best.parttime==="safe")} ${L("ปวีณายอมเป็นพยาน (เคสมหาวิทยาลัย ★★★)","Paweena agrees to testify (university case ★★★)")}</li>
      <li>${tick(caught===4)} ${L(`จับคนแฝงตัวปล่อย Wi-Fi ปลอมได้ ${caught}/4 ร้าน`,`Hidden Wi-Fi hackers caught: ${caught}/4 shops`)}</li></ul></div>
    ${n<5?`<p>${L("เล่นเคสซ้ำให้ได้ ★★★ มากขึ้น แล้วกลับไปคุยกับพี่ภพที่สถานีตำรวจเพื่อบุกอีกครั้ง","Replay cases for more ★★★, then talk to Phop at the police station to raid again.")}</p>`:`<p>${L("ทุกเคสในเกมมาจากกลโกงที่เกิดขึ้นจริงในไทย จำไว้: หยุด คิด ตรวจสอบ","Every case is based on real scams in Thailand. Remember: stop, think, check.")}</p>`}
    <div class="btns">${btn(L("กลับไปเล่นต่อ","Back to the game"),"data-close","y")}</div></div>`);
}
function jailList(){ if(!Array.isArray(S.jailed)) S.jailed=Object.keys(S.caught||{}).map(z=>({b:"workMan",z:+z})); return S.jailed; }
function talkPolice(n){
  const jl=jailList().length; if(jl && (S.jailSeen||0)<jl){ S.jailSeen=jl; save(); toast(L(`🔒 คนร้ายที่คุณจับได้ ${jl} คน ถูกขังอยู่ในห้องขัง (ประตูขวามือ)`,`🔒 ${jl} ${jl>1?"suspects":"suspect"} you caught ${jl>1?"are":"is"} in the cell block (door on the right)`)); }
  if(!S.seen[7]){ say(n.id, lines(ZONE_INTRO[7]), {onEnd:()=>{ S.seen[7]=true; save(); zoneEvent(); }}); return; }
  const done=ALLCASES().filter(k=>S.best[k]).length, all=ALLCASES().length;
  if(!allDone()){
    const left=Object.entries(ZONES).filter(([z,v])=>!v.bonus).map(([z,v])=>[z,v.cases.filter(k=>!S.best[k]).length]).filter(([,c])=>c>0);
    say(n.id, lines([t(`ตอนนี้ช่วยไปแล้ว ${done}/${all} คน หลักฐานยังไม่พอบุกตึก`,`You've helped ${done}/${all} people so far. Not enough evidence for a raid yet.`),
      t(`ยังเหลือที่: ${left.map(([z,c])=>ZONES[z].name.th+" ("+c+")").join(", ")}`,`Still to do: ${left.map(([z,c])=>ZONES[z].name.en+" ("+c+")").join(", ")}`),
      t("ยิ่งได้ ★★★ เยอะ หลักฐานยิ่งแน่น ฉากบุกจะยิ่งดี","The more ★★★ you earn, the stronger the evidence and the better the raid.")])); return;
  }
  if(!S.hqFound && !S.busted){ say(n.id, lines([t("หลักฐานครบแล้ว! แต่เรายังไม่รู้ว่าแก๊งซ่อนอยู่ตึกไหน","The evidence is complete! But we still don't know which building the gang is hiding in."),t("ฝั่งตรงข้ามถนนมีตึกออฟฟิศ 3 ตึก หน้าตาเหมือนบริษัทธรรมดาหมด ลองเข้าไปสำรวจทีละตึก ดูว่าตึกไหนมีอะไรแปลกๆ","There are three office buildings across the road, all looking like normal companies. Check each one for anything odd."),t("เจอแล้วกลับมาบอกพี่ แล้วเราจะบุกทันที","Find it, come back, and we raid right away.")])); return; }
  const again=S.ending && S.ending<5;
  say(n.id, lines([again?t(`ครั้งก่อนได้ฉากจบ ${S.ending}/5 อยากลองบุกใหม่ด้วยหลักฐานที่ดีขึ้นไหม`,`Last time we got ending ${S.ending}/5. Want to raid again with better evidence?`):t("หลักฐานครบแล้ว! มาดูกันว่าจะชี้ไปที่ใคร","The evidence is complete! Let's see where it points.")]),
    {choices:[{label:{th:"🗂️ ส่งหลักฐานและวางแผนบุก",en:"🗂️ Hand in the evidence and plan the raid"},fn:()=>openCase("bust",n)},{label:{th:"ยังก่อน",en:"Not yet"},ghost:true}]});
}
/* rooms for the two new zones */
function drawRoomShell(g,o){
  g.fillStyle=o.floor[0]; g.fillRect(0,0,W,H);
  for(let x=0;x<W;x+=48) for(let y=108;y<590;y+=48){ g.fillStyle=((x+y)/48)%2?o.floor[0]:o.floor[1]; g.fillRect(x,y,48,48); }
  rr(g,296,300,300,172,18); g.fillStyle=o.rug[0]; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,310,314,272,144,12); g.setLineDash([8,7]); g.strokeStyle=o.rug[2]; g.lineWidth=2.5; g.stroke(); g.setLineDash([]);
  g.fillStyle=o.rug[2]; g.font="800 21px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(o.rug[1],446,388);
  g.fillStyle=o.wall; g.fillRect(0,0,W,108); g.fillStyle=o.trim; g.fillRect(0,86,W,22);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,86); g.lineTo(W,86); g.moveTo(0,108); g.lineTo(W,108); g.stroke();
  g.fillStyle=o.side; g.fillRect(0,108,44,H); g.fillRect(W-44,108,44,H); g.fillRect(0,580,384,44); g.fillRect(480,580,W-480,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(384,580); g.moveTo(480,580); g.lineTo(W-44,580); g.lineTo(W-44,108); g.stroke();
  g.fillStyle=o.floor[0]; g.fillRect(384,580,96,44); rr(g,392,584,80,30,4); g.fillStyle=o.trim; g.fill(); g.lineWidth=2.5; g.stroke();
}
function drawUniStatic(g){
  drawRoomShell(g,{floor:["#E9E4DA","#DFD9CD"],rug:["#8E1B2B",S.lang==="en"?"STUDENT LOUNGE":"ลานกิจกรรมนักศึกษา","#F7D7A8"],wall:"#F4EFE6",trim:"#8E1B2B",side:"#D9D0C2"});
  rr(g,40,12,300,64,4); g.fillStyle="#C9A76A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  const notes=[["#FFFFFF",S.lang==="en"?"Scholarships":"ทุนการศึกษา"],["#FFE9A8",S.lang==="en"?"Part-time!":"รับพาร์ทไทม์!"],["#D6F0FF",S.lang==="en"?"Exam timetable":"ตารางสอบ"],["#FFD3D3",S.lang==="en"?"Club fair":"รับสมัครชมรม"]];
  notes.forEach(([c,tx],k)=>{ const x=52+k*72, y=20+(k%2)*6; g.save(); g.translate(x+30,y+22); g.rotate((k%2?.05:-.04)); rr(g,-30,-20,60,40,2); g.fillStyle=c; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.font="700 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(tx,0,0); g.fillStyle="#E5402F"; g.beginPath(); g.arc(0,-16,3,0,7); g.fill(); g.restore(); });
  rr(g,400,10,420,66,4); g.fillStyle="#8E1B2B"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#F7D7A8"; g.font="800 16px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"Huachiew Chalermprakiet University":"มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ",610,34);
  g.fillStyle="#FFFFFF"; g.font="600 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"Student services building":"อาคารบริการนักศึกษา",610,58);
}
function drawCellDoor(g){
  const x=RW-44, y0=PDOOR.y0, y1=PDOOR.y1;
  g.fillStyle="#6E7780"; g.fillRect(x,y0,44,y1-y0); g.fillStyle="#8D949B"; g.fillRect(x+6,y0,38,y1-y0);
  g.strokeStyle="#3B3F44"; g.lineWidth=4; for(let y=y0+10;y<y1;y+=14){ g.beginPath(); g.moveTo(x+8,y); g.lineTo(x+40,y); g.stroke(); }
  g.strokeStyle=INK; g.lineWidth=3; g.strokeRect(x,y0,44,y1-y0);
  rr(g,x-112,y0-40,112,28,6); g.fillStyle="#22344A"; g.fill(); g.lineWidth=2.5; g.stroke();
  g.fillStyle="#F2C14E"; g.font="800 13px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"CELLS →":"ห้องขัง →",x-56,y0-26);
}
function drawCellBlockStatic(g){
  g.fillStyle="#9AA1A8"; g.fillRect(0,0,CB_W,CB_H);
  // corridor
  g.fillStyle="#C9CFD5"; g.fillRect(0,CB_TOP,CB_W,CB_BOT-CB_TOP);
  for(let x=0;x<CB_W;x+=48){ g.fillStyle=(x/48)%2?"#C9CFD5":"#BFC6CD"; g.fillRect(x,CB_TOP,48,CB_BOT-CB_TOP); }
  g.fillStyle="#E5B92E"; for(let x=40;x<CB_X0+5*CB_CW;x+=36){ g.fillRect(x,CB_TOP+8,18,4); g.fillRect(x,CB_BOT-12,18,4); }
  // top wall
  g.fillStyle="#5E666E"; g.fillRect(0,0,CB_W,70); g.fillStyle="#22344A"; g.fillRect(0,54,CB_W,16);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,70); g.lineTo(CB_W,70); g.stroke();
  rr(g,CB_X0+5*CB_CW/2-170,8,340,38,6); g.fillStyle="#22344A"; g.fill(); g.lineWidth=3; g.stroke();
  g.fillStyle="#F2C14E"; g.font="800 17px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"CYBER CRIME HOLDING CELLS":"ห้องขังผู้ต้องหาคดีไซเบอร์",CB_X0+5*CB_CW/2,27);
  // left end: way back to the station
  g.fillStyle="#AEB4BA"; g.fillRect(0,70,CB_X0,CB_TOP-70); g.fillRect(0,CB_BOT,CB_X0,CB_H-CB_BOT);
  rr(g,20,96,104,60,5); g.fillStyle="#6E5A48"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  rr(g,34,84,40,24,3); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle="#9FD3E6"; g.fillRect(38,88,32,16);
  for(let k=0;k<4;k++){ g.fillStyle="#C9A76A"; g.beginPath(); g.arc(30+k*22,190,6,0,7); g.fill(); g.lineWidth=1.5; g.stroke(); g.strokeStyle="#3B3F44"; g.beginPath(); g.moveTo(30+k*22,196); g.lineTo(30+k*22,206); g.stroke(); g.strokeStyle=INK; }
  g.fillStyle="#22344A"; g.fillRect(0,CB_TOP+14,10,CB_BOT-CB_TOP-28);
  rr(g,30,CB_BOT+18,104,28,6); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle=INK; g.font="800 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"← STATION":"← กลับสถานี",82,CB_BOT+32);
  // right end wall
  g.fillStyle="#5E666E"; g.fillRect(CB_X0+5*CB_CW,70,CB_W,CB_H); g.strokeStyle=INK; g.lineWidth=3; g.strokeRect(CB_X0+5*CB_CW,70,CB_W,CB_H);
  // bottom wall
  g.fillStyle="#5E666E"; g.fillRect(0,CB_H-36,CB_W,36);
  // the ten cells
  const jl=jailList();
  for(let i=0;i<CB_N;i++){ const c=cbCell(i), full=jl.some((_,k)=>k%CB_N===i);
    g.fillStyle=full?"#B7A99A":"#A9B0B7"; g.fillRect(c.x,c.y0,c.w,c.y1-c.y0);
    g.strokeStyle="rgba(0,0,0,.12)"; g.lineWidth=1.5; for(let y=c.y0+24;y<c.y1;y+=24){ g.beginPath(); g.moveTo(c.x,y); g.lineTo(c.x+c.w,y); g.stroke(); }
    // bunk + toilet
    const by=c.top?c.y0+10:c.y1-40;
    rr(g,c.x+12,by,70,28,4); g.fillStyle="#6E5A48"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); rr(g,c.x+16,by+4,20,20,3); g.fillStyle="#EDE6DA"; g.fill(); g.lineWidth=1.5; g.stroke();
    rr(g,c.x+c.w-40,by+2,26,24,6); g.fillStyle="#E6ECEA"; g.fill(); g.lineWidth=2; g.stroke();
    // dividing walls
    g.fillStyle="#5E666E"; g.fillRect(c.x-5,c.y0,10,c.y1-c.y0); if(i%5===4) g.fillRect(c.x+c.w-5,c.y0,10,c.y1-c.y0);
    // number plate
    const py=c.top?CB_TOP+20:CB_BOT-20;
    rr(g,c.cx-30,py-11,60,22,5); g.fillStyle=full?"#E5402F":"#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
    g.fillStyle=full?"#FFFFFF":INK; g.font="800 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText((S.lang==="en"?"CELL ":"ห้อง ")+(i+1),c.cx,py+1);
  }
}
function drawCellBlockBars(g,top){
  g.save(); g.lineCap="round";
  for(let i=top?0:5;i<(top?5:10);i++){ const c=cbCell(i);
    const yb=top?CB_TOP:CB_H-36, yt=top?CB_TOP-150:CB_BOT-6;
    g.strokeStyle="#3B3F44"; g.lineWidth=5; for(let x=c.x+12;x<c.x+c.w-4;x+=16){ g.beginPath(); g.moveTo(x,yt); g.lineTo(x,yb); g.stroke(); }
    g.strokeStyle=INK; g.lineWidth=7; g.beginPath(); g.moveTo(c.x,yt); g.lineTo(c.x+c.w,yt); g.moveTo(c.x,yb); g.lineTo(c.x+c.w,yb); g.stroke();
    const ly=top?yb-56:yt+70; rr(g,c.cx+40,ly,18,22,4); g.fillStyle="#C9A76A"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle=INK; g.beginPath(); g.arc(c.cx+49,ly+10,2.5,0,7); g.fill();
  }
  g.restore();
}
function drawPoliceStatic(g){
  drawRoomShell(g,{floor:["#DCE3EA","#D2DAE2"],rug:["#22344A",S.lang==="en"?"REPORT · 1441":"แจ้งความ · สายด่วน 1441","#DCE7F0"],wall:"#EEF2F6",trim:"#22344A",side:"#C5CED8"});
  rr(g,40,12,240,64,4); g.fillStyle="#22344A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#F2C14E"; g.beginPath(); for(let k=0;k<10;k++){ const a=-Math.PI/2+k*Math.PI/5, r=k%2?8:18; g.lineTo(76+Math.cos(a)*r,44+Math.sin(a)*r); } g.closePath(); g.fill(); g.lineWidth=2; g.stroke();
  g.fillStyle="#FFFFFF"; g.font="800 15px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"POLICE STATION":"สถานีตำรวจ",104,34);
  g.font="600 10px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"Cyber crime desk":"โต๊ะคดีไซเบอร์",104,56);
  rr(g,560,12,250,64,4); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle=INK; g.font="800 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.fillText(S.lang==="en"?"Scammed? Act fast:":"โดนหลอก? ทำทันที:",685,28);
  g.font="600 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"Call 1441 · thaipoliceonline.go.th":"โทร 1441 · thaipoliceonline.go.th",685,48); g.fillText(S.lang==="en"?"Keep slips, account no., chats":"เก็บสลิป เลขบัญชี แชต",685,64);
  drawCellDoor(g);
  rr(g,300,16,220,58,3); g.fillStyle="#C9A76A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  const pins=[[330,30],[400,52],[470,28],[440,62],[350,60]]; g.strokeStyle="#E5402F"; g.lineWidth=2; g.beginPath(); pins.forEach(([x,y],k)=>k?g.lineTo(x,y):g.moveTo(x,y)); g.stroke();
  pins.forEach(([x,y])=>{ rr(g,x-12,y-8,24,16,1); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=1.5; g.strokeStyle=INK; g.stroke(); });
}
function drawUniCounter(g){
  rr(g,528,96,288,44,3); g.fillStyle="#F4EFE6"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,528,136,288,50,3); g.fillStyle="#8E1B2B"; g.fill(); g.stroke();
  g.fillStyle="#F7D7A8"; g.font="800 16px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"STUDENT AFFAIRS":"กองกิจการนักศึกษา",672,162);
  rr(g,560,80,52,36,3); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=3; g.stroke(); g.fillStyle="#9FD3E6"; g.fillRect(566,86,40,22);
  for(let k=0;k<3;k++){ rr(g,700+k*14,98-k*3,40,10,2); g.fillStyle=["#FFFFFF","#FFE9A8","#D6F0FF"][k]; g.fill(); g.lineWidth=1.8; g.stroke(); }
}
function drawPoliceCounter(g){
  rr(g,528,96,288,44,3); g.fillStyle="#EEF2F6"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,528,136,288,50,3); g.fillStyle="#22344A"; g.fill(); g.stroke();
  g.fillStyle="#F2C14E"; g.font="800 16px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"REPORTS · ASK HERE":"รับแจ้งความ · สอบถาม",672,162);
  rr(g,560,80,52,36,3); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=3; g.stroke(); g.fillStyle="#9FD3E6"; g.fillRect(566,86,40,22);
  rr(g,740,90,48,20,3); g.fillStyle="#C9A76A"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle="#FFFFFF"; g.fillRect(746,94,36,4);
}
function drawKiosk(g,now){
  const {x,y}=KIOSK;
  g.fillStyle="rgba(0,0,0,.2)"; g.beginPath(); g.ellipse(x,y+12,32,8,0,0,7); g.fill();
  rr(g,x-26,y-74,52,86,6); g.fillStyle="#6A4C93"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,x-20,y-66,40,30,3); g.fillStyle="#13221C"; g.fill(); g.lineWidth=2; g.stroke();
  const k=RM?0:Math.floor(now/400)%3;
  g.fillStyle=["#FFC414","#FF5A1F","#2BB673"][k]; g.font="800 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"TRAIN":"ฝึกสมอง",x,y-51);
  g.fillStyle="#FFC414"; g.beginPath(); g.arc(x-8,y-20,5,0,7); g.fill(); g.stroke(); g.fillStyle="#E5402F"; g.beginPath(); g.arc(x+8,y-20,5,0,7); g.fill(); g.stroke();
  rr(g,x-30,y-90,60,18,4); g.fillStyle="#FFC414"; g.fill(); g.lineWidth=2.5; g.stroke();
  g.fillStyle=INK; g.font="800 10px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"MINI-GAMES":"มินิเกม",x,y-81);
}
function drawFountain(g,now){
  const cx=720, cy=440;
  g.fillStyle="rgba(0,0,0,.15)"; g.beginPath(); g.ellipse(cx,cy+26,62,14,0,0,7); g.fill();
  g.beginPath(); g.ellipse(cx,cy+8,60,30,0,0,7); g.fillStyle="#B9B2A6"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.beginPath(); g.ellipse(cx,cy+4,48,22,0,0,7); g.fillStyle="#7CC8F2"; g.fill(); g.lineWidth=2; g.stroke();
  g.fillStyle="#B9B2A6"; g.fillRect(cx-7,cy-30,14,34); g.strokeRect(cx-7,cy-30,14,34);
  const k=RM?0:now/300;
  g.strokeStyle="#BFE6FA"; g.lineWidth=3; g.lineCap="round";
  for(const s of [-1,1]){ g.beginPath(); g.moveTo(cx,cy-30); g.quadraticCurveTo(cx+s*18,cy-52-Math.sin(k)*3,cx+s*30,cy-4); g.stroke(); }
  g.fillStyle="#FFFFFF"; for(let i=0;i<3;i++){ const a=k+i*2.1; g.beginPath(); g.arc(cx+Math.cos(a)*30,cy+4+Math.sin(a)*12,2,0,7); g.fill(); }
}
/* cars driving along the road */
const CARS=[{x:120,y:652,v:120,c:"#FF5A1F"},{x:520,y:652,v:120,c:"#E5402F",kind:"bus",len:210},{x:1000,y:652,v:120,c:"#2F6DB5"},{x:1400,y:652,v:120,c:"#7A5AA6"},
  {x:1700,y:726,v:-140,c:"#FFC414"},{x:1150,y:726,v:-140,c:"#F4F4F4",cab:"#2F6DB5",kind:"truck",len:180},{x:600,y:726,v:-140,c:"#2BB673"},{x:180,y:726,v:-140,c:"#F4F4F4",cab:"#C2552E",kind:"truck",len:170}];
CARS.forEach(c=>{ c.len=c.len||92; });
function stepCars(dt){
  if(CIN&&CIN.noCars) return;
  const onX=S.char?XINGS.find(xg=>player.x>xg.x0-16&&player.x<xg.x1+16&&player.y>610&&player.y<772):null;
  if(onX && tlState(onX)!=="r" && performance.now()-xWarnT>6000 && !busy()){ xWarnT=performance.now(); toast(L("⚠️ ไฟคนข้ามยังแดงอยู่ รอไฟเขียวก่อนข้ามนะ","⚠️ The walk light is still red. Wait for green before you cross")); }
  for(const c of CARS){
    const d=c.v>0?1:-1, half=c.len/2, front=c.x+d*half;
    let stop=false;
    for(const xg of XINGS){
      const line=d>0?xg.x0-22:xg.x1+22, dist=(line-front)*d;
      if(dist>=-2 && dist<80 && tlState(xg)!=="g" && (!xg.dir||xg.dir===d)) stop=true;
      if(onX===xg && dist>=-6 && dist<150) stop=true;
    }
    if(!stop) for(const o of CARS){ if(o===c || Math.sign(o.v)!==d) continue; const gap=((o.x-d*o.len/2)-front)*d; if((o.x-c.x)*d>0 && gap<28){ stop=true; break; } }
    if(!stop) c.x+=c.v*dt;
    const m=half+40;
    if((d>0&&c.x>OW+m)||(d<0&&c.x<-m)){ let e=d>0?-m:OW+m; const lane=CARS.filter(o=>o!==c&&Math.sign(o.v)===d);
      for(let k=0;k<lane.length;k++) for(const o of lane){ const orear=o.x-d*o.len/2; if((e+d*half+d*30-orear)*d>0 && (o.x-e)*d>-half-o.len) e=orear-d*(30+half); }
      c.x=e; }
  }
}
const VCARS=[{x:918,y:60,vy:110,c:"#2BB673",len:84},{x:918,y:-360,vy:110,c:"#F4F4F4",len:84},{x:918,y:-760,vy:110,c:"#7A5AA6",len:84},
  {x:972,y:1000,vy:-110,c:"#FF5A1F",len:84},{x:972,y:1380,vy:-110,c:"#2F6DB5",len:84},{x:972,y:1760,vy:-110,c:"#FFC414",len:84}];
function onYX(){ if(!S.char||S.zone!==0) return null; return YXINGS.find(yx=>player.x>IC.x0-8&&player.x<IC.x1+8&&player.y>yx.y0-6&&player.y<yx.y1+6)||null; }
function stepVCars(dt){
  if(CIN&&CIN.noCars) return;
  const onY=onYX();
  if(onY && nsState()!=="r" && performance.now()-xWarnT>6000 && !busy()){ xWarnT=performance.now(); toast(L("⚠️ ไฟคนข้ามยังแดงอยู่ รอไฟเขียวก่อนข้ามนะ","⚠️ The walk light is still red. Wait for green before you cross")); }
  for(const c of VCARS){
    const d=c.vy>0?1:-1, half=c.len/2, front=c.y+d*half; let stop=false;
    for(const yx of YXINGS){ const line=d>0?yx.y0-20:yx.y1+20, dist=(line-front)*d;
      if(dist>=-2 && dist<80 && nsState()!=="g" && yx.dir===d) stop=true;
      if(onY===yx && dist>=-6 && dist<150) stop=true; }
    if(!stop) for(const o of VCARS){ if(o===c||Math.sign(o.vy)!==d) continue; const gap=((o.y-d*o.len/2)-front)*d; if((o.y-c.y)*d>0 && gap<28){ stop=true; break; } }
    if(!stop) c.y+=c.vy*dt;
    const m=half+40;
    if((d>0&&c.y>OH+m)||(d<0&&c.y<-m)){ let e=d>0?-m:OH+m; const lane=VCARS.filter(o=>o!==c&&Math.sign(o.vy)===d);
      for(let k=0;k<lane.length;k++) for(const o of lane){ const orear=o.y-d*o.len/2; if((e+d*half+d*30-orear)*d>0 && (o.y-e)*d>-half-o.len) e=orear-d*(30+half); }
      c.y=e; }
  }
}
function drawCarV(g,c){
  const d=c.vy>0?1:-1, H2=c.len/2; g.save(); g.translate(c.x,c.y); if(d<0) g.scale(1,-1);
  g.fillStyle="rgba(0,0,0,.22)"; g.beginPath(); g.ellipse(5,5,24,H2+2,0,0,7); g.fill();
  g.fillStyle=INK; for(const [wx,wy] of [[-24,-H2+12],[18,-H2+12],[-24,H2-28],[18,H2-28]]) g.fillRect(wx,wy,6,16);
  rr(g,-20,-H2,40,c.len,10); g.fillStyle=c.c; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,-15,-H2+22,30,c.len-56,6); g.fillStyle="rgba(0,0,0,.12)"; g.fill();
  rr(g,-15,H2-32,30,14,4); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=2; g.stroke();
  rr(g,-14,-H2+8,28,10,3); g.fill(); g.stroke();
  g.fillStyle="#FFE38A"; g.fillRect(-16,H2-5,8,4); g.fillRect(8,H2-5,8,4);
  g.restore();
}
function drawCrossroads(g){
  // the road north to the university, with sidewalks between the library and the bank
  g.fillStyle="#D9D4CA"; g.fillRect(850,0,40,612); g.fillRect(1000,0,40,612);
  g.strokeStyle="rgba(80,70,60,.18)"; g.lineWidth=1.2; for(let y=0;y<612;y+=40){ g.beginPath(); g.moveTo(850,y); g.lineTo(890,y); g.moveTo(1000,y); g.lineTo(1040,y); g.stroke(); }
  g.fillStyle="#4A4D52"; g.fillRect(IC.x0,0,IC.x1-IC.x0,620);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(IC.x0,0); g.lineTo(IC.x0,612); g.moveTo(IC.x1,0); g.lineTo(IC.x1,612); g.stroke();
  g.strokeStyle="#F2F2F2"; g.lineWidth=4; g.setLineDash([30,24]); g.beginPath(); g.moveTo(945,0); g.lineTo(945,500); g.stroke(); g.setLineDash([]);
  g.fillStyle="#F2F2F2"; for(let yy=524;yy+10<=600;yy+=18) g.fillRect(IC.x0+4,yy,IC.x1-IC.x0-8,10);
  g.fillRect(IC.x0+2,494,53,6);
  // signpost at the top
  rr(g,858,6,174,26,6); g.fillStyle="#2F6D3A"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#FFFFFF"; g.font="800 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"↑ HCU University":"↑ ม.หัวเฉียวฯ",945,19);
}
function drawSouthRoad(g){
  g.fillStyle="#4A4D52"; g.fillRect(IC.x0,760,IC.x1-IC.x0,OH-760);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(IC.x0,766); g.lineTo(IC.x0,OH); g.moveTo(IC.x1,766); g.lineTo(IC.x1,OH); g.stroke();
  g.fillStyle="#F2F2F2"; for(let yy=782;yy+10<=858;yy+=18) g.fillRect(IC.x0+4,yy,IC.x1-IC.x0-8,10);
  g.fillRect(945,878,53,6);
  g.strokeStyle="#F2F2F2"; g.lineWidth=4; g.setLineDash([30,24]); g.beginPath(); g.moveTo(945,890); g.lineTo(945,OH); g.stroke(); g.setLineDash([]);
}
function drawTL(g,x,y,xg,now){
  const st=tlState(xg), walk=st==="r";
  g.fillStyle="rgba(0,0,0,.2)"; g.beginPath(); g.ellipse(x,y+2,10,4,0,0,7); g.fill();
  g.fillStyle="#3B3F44"; g.fillRect(x-3,y-96,6,96); g.strokeStyle=INK; g.lineWidth=2; g.strokeRect(x-3,y-96,6,96);
  rr(g,x-12,y-142,24,56,5); g.fillStyle="#22252C"; g.fill(); g.lineWidth=2.5; g.stroke();
  [["r","#E5402F"],["y","#FFC414"],["g","#2BB673"]].forEach(([k,col],i)=>{ g.beginPath(); g.arc(x,y-131+i*17,6.5,0,7); g.fillStyle=st===k?col:"#4A4D52"; g.fill(); if(st===k){ g.fillStyle=col+"55"; g.beginPath(); g.arc(x,y-131+i*17,10,0,7); g.fill(); } });
  rr(g,x+5,y-80,22,26,4); g.fillStyle="#22252C"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
  const blink=walk && ((tlT+xg.ph)%TL_P)>14.5 && Math.floor(now/200)%2;
  g.fillStyle=blink?"#4A4D52":walk?"#5EE68A":"#FF5A4A"; g.save(); g.translate(x+16,y-67);
  if(walk){ g.beginPath(); g.arc(0,-8,2.6,0,7); g.fill(); g.lineWidth=2.2; g.strokeStyle=g.fillStyle; g.beginPath(); g.moveTo(0,-5); g.lineTo(0,2); g.lineTo(-4,8); g.moveTo(0,2); g.lineTo(4,8); g.moveTo(-4,-1); g.lineTo(4,-3); g.stroke(); }
  else { g.beginPath(); g.arc(0,-8,2.6,0,7); g.fill(); g.fillRect(-2.5,-5,5,9); g.fillRect(-2.5,4,2,5); g.fillRect(0.5,4,2,5); }
  g.restore();
}
function drawBus(g,c){
  const d=c.v>0?1:-1, H2=c.len/2; g.save(); g.translate(c.x,c.y); g.scale(d,1);
  g.fillStyle="rgba(0,0,0,.25)"; g.beginPath(); g.ellipse(0,22,H2+4,9,0,0,7); g.fill();
  rr(g,-H2,-48,c.len,66,10); g.fillStyle=c.c; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#FFFFFF"; g.fillRect(-H2+4,-8,c.len-8,7);
  for(let x=-H2+12;x<H2-50;x+=32){ rr(g,x,-40,24,22,3); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=2; g.stroke(); }
  rr(g,H2-30,-40,24,34,5); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=2; g.stroke();
  rr(g,H2-62,-38,24,50,3); g.fillStyle="#9C2A20"; g.fill(); g.lineWidth=2; g.stroke(); g.beginPath(); g.moveTo(H2-50,-38); g.lineTo(H2-50,12); g.stroke();
  rr(g,H2-28,-56,22,10,2); g.fillStyle="#FFC414"; g.fill(); g.lineWidth=2; g.stroke();
  g.fillStyle="#FFE38A"; g.fillRect(H2-6,4,6,8);
  for(const wx of [-H2+38,H2-44]){ g.beginPath(); g.arc(wx,18,11,0,7); g.fillStyle=INK; g.fill(); g.beginPath(); g.arc(wx,18,5,0,7); g.fillStyle="#9AA3AA"; g.fill(); }
  g.restore();
}
function drawTruck(g,c){
  const d=c.v>0?1:-1, H2=c.len/2; g.save(); g.translate(c.x,c.y); g.scale(d,1);
  g.fillStyle="rgba(0,0,0,.25)"; g.beginPath(); g.ellipse(0,22,H2+4,9,0,0,7); g.fill();
  rr(g,-H2,-52,c.len-52,68,4); g.fillStyle=c.c; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle=c.cab; g.fillRect(-H2+10,-18,c.len-72,10); g.strokeStyle="rgba(0,0,0,.12)"; g.lineWidth=1.5; for(let x=-H2+24;x<H2-60;x+=24){ g.beginPath(); g.moveTo(x,-48); g.lineTo(x,12); g.stroke(); }
  rr(g,H2-50,-34,50,50,8); g.fillStyle=c.cab; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,H2-34,-28,26,18,3); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=2; g.stroke();
  g.fillStyle="#FFE38A"; g.fillRect(H2-6,0,6,8);
  for(const wx of [-H2+28,-H2+62,H2-26]){ g.beginPath(); g.arc(wx,18,11,0,7); g.fillStyle=INK; g.fill(); g.beginPath(); g.arc(wx,18,5,0,7); g.fillStyle="#9AA3AA"; g.fill(); }
  g.restore();
}
function drawCar(g,c){
  if(c.kind==="bus") return drawBus(g,c); if(c.kind==="truck") return drawTruck(g,c);
  const d=c.v>0?1:-1;
  g.save(); g.translate(c.x,c.y); g.scale(d,1);
  g.fillStyle="rgba(0,0,0,.25)"; g.beginPath(); g.ellipse(0,20,48,8,0,0,7); g.fill();
  rr(g,-46,-16,92,34,8); g.fillStyle=c.c; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,-24,-32,48,22,6); g.fillStyle=c.c; g.fill(); g.stroke();
  rr(g,-18,-28,16,14,3); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=2; g.stroke(); rr(g,2,-28,16,14,3); g.fill(); g.stroke();
  g.fillStyle="#FFE38A"; g.fillRect(40,-8,6,8);
  for(const wx of [-26,26]){ g.beginPath(); g.arc(wx,18,9,0,7); g.fillStyle=INK; g.fill(); g.beginPath(); g.arc(wx,18,4,0,7); g.fillStyle="#9AA3AA"; g.fill(); }
  g.restore();
}
function drawDoorBadges(g,now){
  for(const b of BUILDINGS){
    if(b.alley){ drawAlleyBadge(g,b,now); continue; }
    const open=!b.soon && S.unlocked>=b.zone, y=40+(RM?0:Math.sin(now/300+b.zone)*3);
    g.font="800 13px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
    let label;
    if(b.closed){ label=L("🚧 ปิดปรับปรุง","🚧 Closed for renovation"); const tw=g.measureText(label).width+22, by=y+108; rr(g,b.door-tw/2,by-14,tw,28,14); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.fillText(label,b.door,by+1);
      g.fillStyle="#8C8578"; g.fillRect(b.door-34,160,68,90); g.strokeStyle="#6E685E"; g.lineWidth=2; for(let yy=168;yy<250;yy+=9){ g.beginPath(); g.moveTo(b.door-34,yy); g.lineTo(b.door+34,yy); g.stroke(); } continue; }
    if(b.soon) label=L("🔒 เร็วๆ นี้","🔒 Coming soon");
    else if(!open) label=L(`🔒 ช่วยให้ครบทุกคนในโซน ${b.zone-1} ก่อน`,`🔒 Finish every case in Zone ${b.zone-1} first`);
    else label=`${L("โซน","Zone")} ${zno(b.zone)} · ★ ${zoneScore(b.zone)}/${zoneMax(b.zone)}`;
    const tw=g.measureText(label).width+22, by=y+108;
    rr(g,b.door-tw/2,by-14,tw,28,14); g.fillStyle=open?(zoneFull(b.zone)?"#D8F1E3":"#FFC414"):"#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.fillText(label,b.door,by+1);
    if(!open){ // chain across the door
      g.strokeStyle="#5E5850"; g.lineWidth=4; g.beginPath(); g.moveTo(b.door-30,190); g.lineTo(b.door+30,230); g.moveTo(b.door+30,190); g.lineTo(b.door-30,230); g.stroke();
    }
  }
}
function drawAlleyBadge(g,b,now){
  if(b.hide) return;
  if(b.road){ b={...b, door:(IC.x0+IC.x1)/2}; }
  if(b.soi){
    g.font="800 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
    const label=`${b.icon} ${b.name[S.lang]}`, tw=g.measureText(label).width+20, by=26+(RM?0:Math.sin(now/300+b.door)*3);
    rr(g,b.door-tw/2,by-12,tw,24,12); g.fillStyle=b.col; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.fillText(label,b.door,by+1);
    return;
  }
  const open=allDone();
  if(!open){ // caution tape
    g.save(); g.lineWidth=7; for(const [y1,y2] of [[196,230],[230,196]]){ g.strokeStyle="#F2C14E"; g.beginPath(); g.moveTo(462,y1); g.lineTo(534,y2); g.stroke(); g.setLineDash([6,6]); g.strokeStyle=INK; g.beginPath(); g.moveTo(462,y1); g.lineTo(534,y2); g.stroke(); g.setLineDash([]); } g.restore();
  } else if(!RM){ // eerie glow
    g.save(); g.globalAlpha=.35+.25*Math.sin(now/400); g.fillStyle="#9B7BE0"; g.beginPath(); g.ellipse(498,170,40,70,0,0,7); g.fill(); g.restore();
    for(let i=0;i<3;i++){ const p=((now/2400)+i/3)%1; g.fillStyle=`rgba(230,220,255,${.6*(1-p)})`; g.beginPath(); g.arc(486+i*12,230-p*150,4,0,7); g.fill(); }
  }
  g.font="800 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  const label=open?L("👻 ตรอกมืด","👻 Dark alley"):L("🔒 ช่วยครบทุกคนก่อน","🔒 Help everyone first");
  const tw=g.measureText(label).width+20, by=26+(RM?0:Math.sin(now/300)*3);
  rr(g,b.door-tw/2,by-12,tw,24,12); g.fillStyle=open?"#C9B8F0":"#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle=INK; g.fillText(label,b.door,by+1);
}
/* bonus zone: haunted house */
function drawHauntStatic(g){
  g.fillStyle="#2B2433"; g.fillRect(0,0,W,H);
  g.strokeStyle="rgba(200,180,230,.10)"; g.lineWidth=1.2;
  for(let y=108,r=0;y<590;y+=24,r++){ g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke(); for(let x=(r%2?48:0);x<W;x+=96){ g.beginPath(); g.moveTo(x,y); g.lineTo(x,y+24); g.stroke(); } }
  rr(g,296,300,300,172,20); g.fillStyle="#4A2E3A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,310,314,272,144,14); g.setLineDash([8,7]); g.strokeStyle="#C9B8F0"; g.lineWidth=2.5; g.stroke(); g.setLineDash([]);
  g.fillStyle="#C9B8F0"; g.font="800 24px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"STOP · THINK · CHECK":"หยุด · คิด · ตรวจสอบ",446,388);
  g.fillStyle="#3A3146"; g.fillRect(0,0,W,108); g.fillStyle="#5A3E52"; g.fillRect(0,86,W,22);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,86); g.lineTo(W,86); g.moveTo(0,108); g.lineTo(W,108); g.stroke();
  for(let i=0;i<3;i++){ const x=64+i*124; rr(g,x,14,108,62,4); g.fillStyle="#1C2233"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.beginPath(); g.moveTo(x+54,14); g.lineTo(x+54,76); g.moveTo(x,45); g.lineTo(x+108,45); g.lineWidth=2.5; g.stroke();
    g.strokeStyle="#6B6478"; g.lineWidth=2; g.beginPath(); g.moveTo(x+60,20); g.lineTo(x+80,40); g.lineTo(x+70,60); g.stroke();
    g.fillStyle="#E8E4C9"; g.beginPath(); g.arc(x+26,32,9,0,7); g.fill(); }
  // portrait frame
  rr(g,566,8,214,64,4); g.fillStyle="#4A3A2A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#C9B8F0"; g.font="800 17px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"THE OLD HOUSE":"บ้านเก่าในตรอก",580,28);
  g.fillStyle="#E8E4C9"; g.font="600 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"spirits waiting to move on":"วิญญาณที่ยังไปไหนไม่ได้",580,52);
  // cobwebs
  g.strokeStyle="rgba(230,225,240,.5)"; g.lineWidth=1.2;
  for(const [cx,cy,s] of [[44,108,1],[W-44,108,-1]]) for(let k=1;k<=4;k++){ g.beginPath(); g.arc(cx,cy,k*12,s>0?0:Math.PI/2,s>0?Math.PI/2:Math.PI); g.stroke(); }
  g.fillStyle="#3A3146"; g.fillRect(0,108,44,H); g.fillRect(W-44,108,44,H); g.fillRect(0,580,384,44); g.fillRect(480,580,W-480,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(384,580); g.moveTo(480,580); g.lineTo(W-44,580); g.lineTo(W-44,108); g.stroke();
  g.fillStyle="#2B2433"; g.fillRect(384,580,96,44);
  rr(g,392,584,80,30,4); g.fillStyle="#5A3E52"; g.fill(); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke();
}
function drawHauntCounter(g,now){
  rr(g,528,96,288,44,3); g.fillStyle="#5A4632"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,528,136,288,50,3); g.fillStyle="#3E3024"; g.fill(); g.stroke();
  g.fillStyle="#C9B8F0"; g.font="800 16px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"ALTAR":"โต๊ะหมู่บูชา",672,162);
  for(const x of [570,620,724,774]){ g.fillStyle="#F2EEDC"; g.fillRect(x-4,92,8,22); g.strokeStyle=INK; g.lineWidth=1.5; g.strokeRect(x-4,92,8,22); drawFlame(g,x,90,now); }
  rr(g,652,70,40,40,4); g.fillStyle="#2B2433"; g.fill(); g.lineWidth=2.5; g.stroke(); g.fillStyle="#E8E4C9"; g.beginPath(); g.arc(672,88,10,0,7); g.fill();
}
function drawFlame(g,x,y,now){ const f=RM?0:Math.sin(now/90+x)*1.5; g.fillStyle="#FFC414"; g.beginPath(); g.ellipse(x,y-4+f*.3,3.5,6+f,0,0,7); g.fill(); g.fillStyle="rgba(255,196,20,.18)"; g.beginPath(); g.arc(x,y-4,14,0,7); g.fill(); }
function drawHauntTable(g,t,now){
  g.fillStyle="rgba(0,0,0,.25)"; g.beginPath(); g.ellipse(t.x,t.y+16,36,10,0,0,7); g.fill();
  g.fillStyle="#3E3024"; g.fillRect(t.x-4,t.y,8,16);
  g.beginPath(); g.ellipse(t.x,t.y,38,24,0,0,7); g.fillStyle="#6A5440"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#F2EEDC"; g.fillRect(t.x-3,t.y-18,6,14); g.strokeStyle=INK; g.lineWidth=1.5; g.strokeRect(t.x-3,t.y-18,6,14); drawFlame(g,t.x,t.y-20,now);
  g.strokeStyle="rgba(230,225,240,.45)"; g.lineWidth=1; for(let k=1;k<=3;k++){ g.beginPath(); g.arc(t.x+30,t.y-6,k*5,Math.PI,Math.PI*1.5); g.stroke(); }
}
/* zone 4: NET ZONE internet café */
function drawNetStatic(g){
  g.fillStyle="#2A2F45"; g.fillRect(0,0,W,H);
  g.strokeStyle="rgba(94,230,208,.10)"; g.lineWidth=1.2;
  for(let x=0;x<=W;x+=48){ g.beginPath(); g.moveTo(x,108); g.lineTo(x,580); g.stroke(); }
  for(let y=108;y<=580;y+=48){ g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke(); }
  rr(g,296,300,300,172,20); g.fillStyle="#1C3B47"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,310,314,272,144,14); g.setLineDash([8,7]); g.strokeStyle="#5EE6D0"; g.lineWidth=2.5; g.stroke(); g.setLineDash([]);
  g.fillStyle="#5EE6D0"; g.font="800 24px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"STOP · THINK · CHECK":"หยุด · คิด · ตรวจสอบ",446,388);
  g.fillStyle="#1D2033"; g.fillRect(0,0,W,108);
  g.fillStyle="#7A5AA6"; g.fillRect(0,86,W,22); g.fillStyle="#5EE6D0"; g.fillRect(0,82,W,4);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,82); g.lineTo(W,82); g.moveTo(0,108); g.lineTo(W,108); g.stroke();
  // game posters
  const posters=[["#E4553B","LEVEL UP"],["#3A5A94","GG"],["#2BB673","QUEST"]];
  posters.forEach((p,i)=>{ const x=70+i*124; rr(g,x,12,96,64,4); g.fillStyle=p[0]; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.fillStyle="#FFF4E0"; g.font="800 15px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.fillText(p[1],x+48,46); });
  // neon sign
  rr(g,566,8,214,64,6); g.fillStyle="#13162A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#5EE6D0"; g.font="800 22px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.textBaseline="middle"; g.fillText("NET ZONE",580,30);
  g.fillStyle="#F2C14E"; g.font="600 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(S.lang==="en"?"1 HR 20 BAHT · TOP-UP HERE":"ชม.ละ 20 บาท · เติมเกมได้",580,54);
  g.fillStyle="#3B3F58"; g.fillRect(0,108,44,H); g.fillRect(W-44,108,44,H); g.fillRect(0,580,384,44); g.fillRect(480,580,W-480,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(384,580); g.moveTo(480,580); g.lineTo(W-44,580); g.lineTo(W-44,108); g.stroke();
  g.fillStyle="#2A2F45"; g.fillRect(384,580,96,44);
  rr(g,392,584,80,30,4); g.fillStyle="#7A5AA6"; g.fill(); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke();
  rr(g,10,408,26,18,3); g.fillStyle="#F5F1EA"; g.fill(); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke();
  g.beginPath(); g.moveTo(15,408); g.lineTo(12,394); g.moveTo(31,408); g.lineTo(34,394); g.stroke();
}
function drawNetCounter(g){
  rr(g,528,96,288,44,3); g.fillStyle="#3B3F58"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,528,136,288,50,3); g.fillStyle="#7A5AA6"; g.fill(); g.stroke();
  g.fillStyle="#5EE6D0"; g.font="800 17px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"CASHIER · TOP-UP":"แคชเชียร์ · เติมเกม",672,162);
  rr(g,552,76,52,38,4); g.fillStyle="#1B1E22"; g.fill(); g.stroke(); g.fillStyle="#5EE6D0"; g.fillRect(558,82,40,20);
  for(let i=0;i<4;i++){ rr(g,700+i*24,84,18,26,3); g.fillStyle=["#E4553B","#F2C14E","#2BB673","#5EE6D0"][i]; g.fill(); g.lineWidth=2; g.stroke(); }
}
function drawPCDesk(g,t,i,now){
  g.fillStyle="rgba(0,0,0,.25)"; g.beginPath(); g.ellipse(t.x,t.y+18,40,9,0,0,7); g.fill();
  rr(g,t.x-38,t.y-6,76,26,3); g.fillStyle="#4A4F6A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  for(const dx of [-18,18]){
    rr(g,t.x+dx-14,t.y-30,28,22,2); g.fillStyle="#13162A"; g.fill(); g.lineWidth=2.2; g.stroke();
    const k=(Math.floor((now||0)/500)+i+dx)%3; g.fillStyle=["#5EE6D0","#7A5AA6","#F2C14E"][(k+3)%3]; g.fillRect(t.x+dx-11,t.y-27,22,16);
    g.fillStyle="#1B1E22"; g.fillRect(t.x+dx-3,t.y-8,6,4);
    rr(g,t.x+dx-12,t.y+4,24,6,2); g.fillStyle="#2A2F45"; g.fill(); g.lineWidth=1.5; g.stroke();
  }
}
/* zone 3: bank branch */
function drawBankStatic(g){
  g.fillStyle="#ECE6DA"; g.fillRect(0,0,W,H);
  g.strokeStyle="rgba(110,90,60,.16)"; g.lineWidth=1.4;
  for(let x=0;x<=W;x+=96){ g.beginPath(); g.moveTo(x,108); g.lineTo(x,580); g.stroke(); }
  for(let y=108;y<=580;y+=96){ g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke(); }
  // queue lane rope
  rr(g,296,300,300,172,20); g.fillStyle="#0F5E46"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,310,314,272,144,14); g.setLineDash([8,7]); g.strokeStyle="#F2C14E"; g.lineWidth=2.5; g.stroke(); g.setLineDash([]);
  g.fillStyle="#F2C14E"; g.font="800 24px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"STOP · THINK · CHECK":"หยุด · คิด · ตรวจสอบ",446,388);
  // back wall
  g.fillStyle="#F6F2EA"; g.fillRect(0,0,W,108);
  g.fillStyle="#0F5E46"; g.fillRect(0,86,W,22); g.fillStyle="#F2C14E"; g.fillRect(0,82,W,5);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,82); g.lineTo(W,82); g.moveTo(0,108); g.lineTo(W,108); g.stroke();
  // ATMs instead of windows
  for(let i=0;i<3;i++){ const x=76+i*124;
    rr(g,x,10,84,74,5); g.fillStyle="#C9CED4"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    rr(g,x+12,18,60,30,3); g.fillStyle="#2E8B6A"; g.fill(); g.lineWidth=2; g.stroke();
    g.fillStyle="#E8F5EE"; g.font="700 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.fillText("ATM",x+42,33);
    g.fillStyle="#3B3B3B"; g.fillRect(x+16,56,26,4); for(let k=0;k<3;k++) for(let j=0;j<3;j++){ g.fillStyle="#F6F2EA"; g.fillRect(x+48+j*8,52+k*7,6,5); } }
  // queue display
  rr(g,566,8,214,64,4); g.fillStyle="#13221C"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#F2C14E"; g.font="800 15px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"NKT BANK":"ธนาคารนครทอง",580,24);
  g.fillStyle="#7FE0A8"; g.font="600 13px 'IBM Plex Mono', monospace"; g.fillText("A047 → 2   B112 → 3",580,50);
  // walls
  g.fillStyle="#D9D1C2"; g.fillRect(0,108,44,H); g.fillRect(W-44,108,44,H); g.fillRect(0,580,384,44); g.fillRect(480,580,W-480,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(384,580); g.moveTo(480,580); g.lineTo(W-44,580); g.lineTo(W-44,108); g.stroke();
  g.fillStyle="#ECE6DA"; g.fillRect(384,580,96,44);
  rr(g,388,584,42,34,2); g.fillStyle="#D4ECF6"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); rr(g,434,584,42,34,2); g.fill(); g.stroke();
  // security notice on the wall
  rr(g,6,300,32,70,3); g.fillStyle="#FFE9A8"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
  g.fillStyle=INK; g.font="800 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.save(); g.translate(22,335); g.rotate(-Math.PI/2); g.fillText(S.lang==="en"?"CALL 1441":"สายด่วน 1441",0,0); g.restore();
}
function drawBankCounter(g){
  rr(g,528,96,288,44,3); g.fillStyle="#E9E1CF"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,528,136,288,50,3); g.fillStyle="#0F5E46"; g.fill(); g.stroke();
  for(let i=0;i<3;i++){ const x=552+i*92;
    g.fillStyle="rgba(203,230,241,.7)"; g.fillRect(x,70,70,40); g.lineWidth=2; g.strokeStyle=INK; g.strokeRect(x,70,70,40);
    rr(g,x+22,146,26,26,13); g.fillStyle="#F2C14E"; g.fill(); g.lineWidth=2.5; g.stroke();
    g.fillStyle=INK; g.font="800 14px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(String(i+1),x+35,160); }
}
function drawBankTable(g,t,i){
  if(t.item==="qr"){ // queue ticket machine
    g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(t.x,t.y+18,26,8,0,0,7); g.fill();
    rr(g,t.x-18,t.y-40,36,56,4); g.fillStyle="#0F5E46"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    rr(g,t.x-12,t.y-34,24,16,2); g.fillStyle="#E8F5EE"; g.fill(); g.lineWidth=2; g.stroke();
    g.fillStyle="#FFFFFF"; g.fillRect(t.x-8,t.y-8,16,8); g.strokeRect(t.x-8,t.y-8,16,8); return;
  }
  // waiting bench (row of seats)
  g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(t.x,t.y+16,40,8,0,0,7); g.fill();
  rr(g,t.x-38,t.y-20,76,14,4); g.fillStyle="#2E8B6A"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  for(let k=0;k<3;k++){ rr(g,t.x-36+k*25,t.y-6,22,18,4); g.fillStyle="#3BA17C"; g.fill(); g.stroke(); }
}
/* zone 2: QuickMart convenience store + parcel point */
function drawMartStatic(g){
  /* zone 2: CO-WORK HUB — carpet tiles, glass wall, neon Wi-Fi sign */
  g.fillStyle="#D9DEDC"; g.fillRect(0,0,W,H);
  for(let x=0;x<W;x+=64) for(let y=108;y<580;y+=64){ g.fillStyle=((x+y)/64)%2?"#D1D7D4":"#DCE1DF"; g.fillRect(x,y,64,64); }
  // walkway rug
  rr(g,296,300,300,172,14); g.fillStyle="#1F5E5B"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,310,314,272,144,10); g.setLineDash([8,7]); g.strokeStyle="#7CF0C8"; g.lineWidth=2.5; g.stroke(); g.setLineDash([]);
  g.fillStyle="#BFF5E3"; g.font="800 22px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  g.fillText(S.lang==="en"?"ASK BEFORE YOU CONNECT":"ถามก่อนต่อ · ก่อนเสียบ",446,386);
  // back wall: dark slate with big windows
  g.fillStyle="#2B3A3F"; g.fillRect(0,0,W,108);
  g.fillStyle="#1F5E5B"; g.fillRect(0,96,W,12); g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,108); g.lineTo(W,108); g.stroke();
  for(let i=0;i<3;i++){ const x=40+i*130; rr(g,x,12,116,70,3); g.fillStyle="#9FD3E6"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.beginPath(); g.moveTo(x+58,12); g.lineTo(x+58,82); g.stroke(); g.strokeStyle="rgba(255,255,255,.8)"; g.lineWidth=3; g.beginPath(); g.moveTo(x+12,46); g.lineTo(x+32,26); g.moveTo(x+70,46); g.lineTo(x+90,26); g.stroke(); }
  // neon sign
  rr(g,560,10,232,62,6); g.fillStyle="#173E3C"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.save(); g.shadowColor="#7CF0C8"; g.shadowBlur=10; g.fillStyle="#7CF0C8"; g.font="800 19px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.fillText("CO-WORK HUB 24",576,32); g.restore();
  g.fillStyle="#E6ECEA"; g.font="600 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="left"; g.fillText(S.lang==="en"?"FREE Wi-Fi · OPEN 24H":"Wi-Fi ฟรี · เปิด 24 ชม.",578,56);
  // wifi glyph on the sign
  g.strokeStyle="#7CF0C8"; g.lineWidth=2.5; g.lineCap="round"; for(const r of [6,11,16]){ g.beginPath(); g.arc(768,52,r,Math.PI*1.25,Math.PI*1.75); g.stroke(); } g.fillStyle="#7CF0C8"; g.beginPath(); g.arc(768,52,2.5,0,7); g.fill();
  // the suspicious free charging station against the wall
  rr(g,232,26,58,92,6); g.fillStyle="#F2F2F2"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,238,32,46,20,3); g.fillStyle="#FFC414"; g.fill(); g.lineWidth=2; g.stroke();
  g.fillStyle=INK; g.font="800 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.fillText(S.lang==="en"?"FREE CHARGE":"ชาร์จฟรี",261,43);
  for(let k=0;k<4;k++){ const cx=242+k*12; g.fillStyle="#3B3B3B"; g.fillRect(cx,60,6,8); g.strokeStyle="#3B3B3B"; g.lineWidth=2; g.beginPath(); g.moveTo(cx+3,68); g.quadraticCurveTo(cx+3+(k-1.5)*6,98,cx+1,112); g.stroke(); }
  g.fillStyle="#E5402F"; g.beginPath(); g.arc(282,108,3,0,7); g.fill();
  // side + bottom walls
  g.fillStyle="#BCC6C3"; g.fillRect(0,108,44,H); g.fillRect(W-44,108,44,H); g.fillRect(0,580,384,44); g.fillRect(480,580,W-480,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(384,580); g.moveTo(480,580); g.lineTo(W-44,580); g.lineTo(W-44,108); g.stroke();
  g.fillStyle="#D9DEDC"; g.fillRect(384,580,96,44);
  rr(g,388,584,42,34,2); g.fillStyle="#9FD3E6"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); rr(g,434,584,42,34,2); g.fill(); g.stroke();
  // wall sockets for honest charging
  for(const y of [300,460]){ rr(g,W-40,y,14,22,2); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.fillRect(W-36,y+6,2,5); g.fillRect(W-31,y+6,2,5); }
  // router
  rr(g,10,408,26,18,3); g.fillStyle="#F5F1EA"; g.fill(); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke();
  g.beginPath(); g.moveTo(15,408); g.lineTo(12,394); g.moveTo(31,408); g.lineTo(34,394); g.stroke();
  g.fillStyle="#2BB673"; g.beginPath(); g.arc(18,417,2.4,0,7); g.fill(); g.fillStyle="#FFC414"; g.beginPath(); g.arc(26,417,2.4,0,7); g.fill();
}
function drawCoDesk(g,t,i){
  g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(t.x,t.y+18,44,9,0,0,7); g.fill();
  g.fillStyle="#3B3B3B"; g.fillRect(t.x-36,t.y,4,18); g.fillRect(t.x+32,t.y,4,18);
  rr(g,t.x-42,t.y-16,84,22,3); g.fillStyle="#E9D9BE"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  // laptop
  rr(g,t.x-26,t.y-34,30,20,2); g.fillStyle="#C7CDD3"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle=i%2?"#7FB7E8":"#9FE3C7"; g.fillRect(t.x-22,t.y-31,22,14);
  rr(g,t.x-30,t.y-14,38,5,1.5); g.fillStyle="#AEB5BC"; g.fill(); g.stroke();
  // lamp or plant + coffee
  if(i%2){ g.strokeStyle=INK; g.lineWidth=2.5; g.beginPath(); g.moveTo(t.x+26,t.y-12); g.lineTo(t.x+30,t.y-34); g.lineTo(t.x+20,t.y-40); g.stroke(); g.fillStyle="#FFC414"; g.beginPath(); g.arc(t.x+19,t.y-38,6,0,Math.PI); g.fill(); g.stroke(); }
  else { rr(g,t.x+18,t.y-26,12,12,2); g.fillStyle="#C98A5B"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle="#3BA17C"; g.beginPath(); g.arc(t.x+24,t.y-30,8,0,7); g.fill(); g.stroke(); }
  g.beginPath(); g.arc(t.x+10,t.y-8,5,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=1.8; g.strokeStyle=INK; g.stroke();
}
function parcel(g,x,y,w,h){ rr(g,x,y,w,h,2); g.fillStyle="#C99A5B"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.fillStyle="#E9C98F"; g.fillRect(x+w/2-3,y+1,6,h-2); g.fillStyle="#FFFFFF"; g.fillRect(x+4,y+h-9,10,6); }
const SHELF_COLS=["#FF5A1F","#2BB673","#FFC414","#2F6DB5","#E05C8A","#7A5AC8"];
function drawShelf(g,t,i){
  g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(t.x,t.y+20,40,9,0,0,7); g.fill();
  rr(g,t.x-38,t.y-24,76,42,3); g.fillStyle="#F4F6F8"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.lineWidth=2; g.beginPath(); g.moveTo(t.x-38,t.y-3); g.lineTo(t.x+38,t.y-3); g.stroke();
  if(t.item==="laptop"){ // parcel lockers
    for(let r=0;r<2;r++) for(let c=0;c<4;c++){ rr(g,t.x-34+c*17,t.y-21+r*21,15,17,1.5); g.fillStyle=(r+c)%3===0?"#FFC414":"#DDE4EC"; g.fill(); g.lineWidth=1.5; g.stroke(); }
    return;
  }
  for(let r=0;r<2;r++) for(let c=0;c<6;c++){
    const col=SHELF_COLS[(c+r*2+i)%SHELF_COLS.length];
    rr(g,t.x-34+c*11.5,t.y-20+r*21,9,15,1.5); g.fillStyle=col; g.fill(); g.lineWidth=1.4; g.strokeStyle=INK; g.stroke();
  }
}
/* sortable props */
function drawCounter(g){
  if(S.zone===3) return drawBankCounter(g);
  if(S.zone===6) return drawUniCounter(g);
  if(S.zone===7) return drawPoliceCounter(g);
  if(S.zone===4) return drawNetCounter(g);
  if(S.zone===5) return drawHauntCounter(g,performance.now());
  if(S.zone===2){ // reception desk
    rr(g,528,96,288,44,3); g.fillStyle="#E6ECEA"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    rr(g,528,136,288,50,3); g.fillStyle="#1F5E5B"; g.fill(); g.stroke();
    g.fillStyle="#BFF5E3"; g.font="800 17px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"RECEPTION · ASK HERE":"เคาน์เตอร์ · ถามที่นี่",672,162);
    rr(g,556,80,52,36,3); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=3; g.stroke(); g.fillStyle="#7CF0C8"; g.fillRect(562,86,40,22);
    rr(g,700,92,64,30,3); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2.5; g.stroke();
    g.fillStyle=INK; g.font="700 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText("Wi-Fi: CityLib-Member",732,102); g.fillText(S.lang==="en"?"pw on member card":"รหัสบนบัตรสมาชิก",732,114);
    g.beginPath(); g.arc(790,112,9,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle="#3BA17C"; g.beginPath(); g.arc(790,100,8,0,7); g.fill(); g.stroke();
    return;
  }
  rr(g,528,96,288,44,3); g.fillStyle="#C9935D"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  rr(g,528,136,288,50,3); g.fillStyle="#8A5A33"; g.fill(); g.stroke();
  g.fillStyle="#F5ECDD"; g.font="800 18px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText("BEAN HOUSE",672,162);
  rr(g,552,74,50,48,4); g.fillStyle="#9AA3AA"; g.fill(); g.stroke();
  rr(g,560,82,34,14,2); g.fillStyle="#2E3B33"; g.fill();
  g.fillStyle="#FFFFFF"; rr(g,568,104,18,14,3); g.fill(); g.stroke();
  rr(g,746,84,46,32,3); g.fillStyle="#3B3B3B"; g.fill(); g.stroke();
  g.fillStyle="#7FD1A1"; g.fillRect(752,90,34,10);
  for(const cx of [640,664,688]){ g.beginPath(); g.arc(cx,116,8,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.stroke(); }
}
function drawTable(g,t){
  if(S.zone===2) return drawLibProp(g,t,TABLES.indexOf(t));
  if(S.zone===3) return drawBankTable(g,t,TABLES.indexOf(t));
  if(S.zone===4) return drawPCDesk(g,t,TABLES.indexOf(t),performance.now());
  if(S.zone===5) return drawHauntTable(g,t,performance.now());
  g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(t.x,t.y+16,36,10,0,0,7); g.fill();
  g.fillStyle="#7A5233"; g.fillRect(t.x-4,t.y,8,16);
  g.beginPath(); g.ellipse(t.x,t.y,38,24,0,0,7); g.fillStyle="#F7F1E6"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  if(t.item==="qr"){ rr(g,t.x-12,t.y-24,24,22,2); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.stroke();
    g.fillStyle=INK; for(let i=0;i<3;i++)for(let j=0;j<3;j++) if((i+j)%2===0) g.fillRect(t.x-8+i*5,t.y-20+j*5,4,4);
    g.fillStyle="#FF5A1F"; g.save(); g.translate(t.x+8,t.y-22); g.rotate(-.2); g.fillRect(-6,-5,12,10); g.strokeRect(-6,-5,12,10); g.restore(); }
  if(t.item==="laptop"){ rr(g,t.x-18,t.y-16,36,22,2); g.fillStyle="#C7CDD3"; g.fill(); g.lineWidth=2; g.stroke(); g.fillStyle="#7FB7E8"; g.fillRect(t.x-13,t.y-12,26,14); }
  if(t.item==="cups"||t.item==="cups2"){ for(const dx of [-12,12]){ g.beginPath(); g.arc(t.x+dx,t.y-4,7,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.stroke(); g.beginPath(); g.arc(t.x+dx,t.y-4,4,0,7); g.fillStyle="#8A5A33"; g.fill(); } }
  if(t.item==="cups"){ rr(g,t.x+16,t.y-14,18,10,2); g.fillStyle="#3B3B3B"; g.fill(); }
}
function drawChair(g,c){
  if(S.zone===2){ drawLibChair(g,c); return; }
  if(false){ g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(c.x,c.y+10,14,4,0,0,7); g.fill(); g.strokeStyle=INK; g.lineWidth=2; g.beginPath(); g.moveTo(c.x,c.y+2); g.lineTo(c.x,c.y+9); g.moveTo(c.x-9,c.y+10); g.lineTo(c.x+9,c.y+10); g.stroke(); rr(g,c.x-13,c.y-16,26,20,8); g.fillStyle="#2F7F7A"; g.fill(); g.lineWidth=2.5; g.stroke(); rr(g,c.x-10,c.y-22,20,9,4); g.fillStyle="#1F5E5B"; g.fill(); g.stroke(); return; }
  if(S.zone===5){ rr(g,c.x-13,c.y-16,26,28,3); g.fillStyle="#5A4632"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); g.beginPath(); g.moveTo(c.x-9,c.y-10); g.lineTo(c.x+6,c.y+6); g.stroke(); return; }
  if(S.zone===4){ rr(g,c.x-15,c.y-16,30,30,8); g.fillStyle="#E4553B"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); rr(g,c.x-10,c.y-12,20,8,3); g.fillStyle="#13162A"; g.fill(); return; }
  if(S.zone===3){ rr(g,c.x-14,c.y-14,28,26,5); g.fillStyle="#3BA17C"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); g.fillStyle="rgba(0,0,0,.12)"; g.fillRect(c.x-10,c.y+6,20,4); return; }
  rr(g,c.x-14,c.y-14,28,26,5); g.fillStyle="#E07A3F"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle="rgba(0,0,0,.12)"; g.fillRect(c.x-10,c.y+6,20,4);
}
function drawPlant(g,p){
  g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(p.x,p.y+12,22,7,0,0,7); g.fill();
  g.beginPath(); g.moveTo(p.x-16,p.y-12); g.lineTo(p.x+16,p.y-12); g.lineTo(p.x+12,p.y+12); g.lineTo(p.x-12,p.y+12); g.closePath(); g.fillStyle="#C86A3A"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  for(const [dx,dy,r] of [[-12,-26,13],[10,-30,14],[0,-44,14],[-2,-24,12]]){ g.beginPath(); g.arc(p.x+dx,p.y+dy,r,0,7); g.fillStyle="#4E9A5B"; g.fill(); g.stroke(); }
}
function spriteFor(c){
  const set=IMG[c.id]; if(!set) return {im:null};
  if(c.dir==="up") return {im:set.up}; if(c.dir==="left") return {im:set.left}; if(c.dir==="right") return {im:set.left,flip:true};
  return {im:set.down};
}
function drawChar(g,c,now){
  const {im,flip}=spriteFor(c); if(!im||!im.naturalWidth) return;
  const h=CHAR_H*(SCALE[c.id]||1), w=im.naturalWidth*h/im.naturalHeight;
  if(!c.ghost){ g.fillStyle="rgba(0,0,0,.2)"; g.beginPath(); g.ellipse(c.x,c.y,17,6,0,0,7); g.fill(); }
  let bob=0, tilt=0, sy=1;
  if(c!==player && crying(c) && !c.moving){ bob=-sobOf(now); }
  else if(c.moving && !RM){ const p=c.t*13; bob=-Math.abs(Math.sin(p))*3.2; tilt=Math.sin(p)*0.05; }
  else if(!RM){ sy=1+Math.sin(now/520+c.x)*0.012; }
  if(c.ghost){
    const t=now/600+c.x, fl=RM?-8:-8+Math.sin(t)*5, up=c.ascend?c.ascend*120:0, al=c.ascend?Math.max(0,.7-c.ascend*.5):.62;
    g.save(); g.globalAlpha=al*.5; g.fillStyle="#BFE6FA"; g.beginPath(); g.ellipse(c.x,c.y-CHAR_H*.45+fl-up,w*.8,CHAR_H*.6,0,0,7); g.fill(); g.restore();
    g.save(); g.globalAlpha=al; g.translate(c.x,c.y+fl-up); g.scale(flip?-1:1,1); g.drawImage(im,-w/2,-h,w,h); g.restore();
    if(c.ascend && !RM){ g.save(); g.globalAlpha=Math.max(0,1-c.ascend*.5); g.fillStyle="#FFF4C2"; for(let i=0;i<5;i++){ const a=now/200+i*1.3; g.beginPath(); g.arc(c.x+Math.cos(a)*24,c.y-CHAR_H*.5-up+Math.sin(a)*30,3,0,7); g.fill(); } g.restore(); }
    if(crying(c) && !c.ascend) drawTears(g,c,w,fl,now);
    return;
  }
  if(c.hide) return;
  g.save(); g.translate(c.x,c.y+bob); g.rotate(tilt); g.scale(flip?-1:1,sy); if(c.dark) g.filter="brightness(0.28) contrast(1.15)";
  g.drawImage(im,-w/2,-h,w,h); g.restore();
  if(c!==player && crying(c) && !c.moving) drawTears(g,c,w,bob,now);
  if(c===player && performance.now()<cryUntil) drawTears(g,c,w,bob,now);
  if(S.zone===3 && c.role==="grandpa" && !S.best.video) drawVideoPhone(g,c,now);
  if(S.zone===3 && c.role==="grandma" && rush && rush.n===c) drawPanic(g,c,now);
}
function drawVideoPhone(g,n,now){
  // phone held up, glowing, with a REC dot: he's on a video call
  const x=n.x+(n.dir==="left"?-14:14), y=n.y-CHAR_H*0.62;
  g.save(); g.fillStyle="rgba(124,200,242,.35)"; g.beginPath(); g.arc(x,y,16+(RM?0:Math.sin(now/200)*2),0,7); g.fill();
  rr(g,x-7,y-11,14,22,3); g.fillStyle="#1B1E22"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#3A6EA5"; g.fillRect(x-5,y-8,10,15);
  g.fillStyle="#E5402F"; g.beginPath(); g.arc(x+3,y-5,1.8+(RM?0:Math.abs(Math.sin(now/300))),0,7); g.fill();
  g.restore();
}
const CHAT_LINES={
  5:{grandma:[["บุญไม่มาถึงเลย…","The merit never comes…"]],grandpa:[["แกร๊ก… แกร๊ก…","Clank… clank…"],["สองล้านอะไรกัน","Two million? What?"]],tips:[["James จ๋า…","Oh, James…"]],friend:[["ผีเหรอ ไหน!?","A ghost? Where!?"]]},
  1:{grandpa:[["บัญชีจะถูกระงับเหรอ…","My account's being suspended…"],["มีรูปกุญแจด้วยนะ","It has a padlock…"]],friend:[["เน็ตหมดพอดีเลย…","My data just ran out…"],["ต้องส่งงานใน 20 นาที!","Report due in 20 minutes!"]],tips:[["ดูชื่อผู้รับก่อนโอนทุกครั้งนะ","Always check the payee first"],["OTP ห้ามให้ใครเด็ดขาด","Never share an OTP"]],grandma:[["ลด 50% เชียวนะ","50% off, you know"]]},
  2:{friend:[["แค่ 15 บาทเอง…","It's only 15 baht…"]],grandpa:[["ตาสั่งอะไรไปนะ…","What did I order…?"],["890 บาท…","890 baht…"]],tips:[["ไรเดอร์มาแล้ว!","The rider's here!"],["เขาโอนมาแล้วนะ","They've paid already"]],grandma:[["เขาจ่ายจริงนะ!","They really pay!"]]},
  4:{friend:[["อีกนิดเดียว…","Just one more…"],["รอบแรกได้จริงนะ","The first one was real"]],tips:[["สกินตำนาน!","A legendary skin!"]],grandpa:[["เด็กคนนั้นแชตกับใครนะ","Who's that kid chatting with…"]],grandma:[["14 รายการ!?","14 payments!?"]]},
  3:{grandpa:[["ครับ… ผมอยู่คนเดียวครับ","Yes… I'm alone, sir"],["ห้ามวางสาย…","Mustn't hang up…"]],friend:[["บัญชีละ 2,000 ง่ายจัง","2,000 per account, easy"]],tips:[["แอปโหลดช้าจัง","This app's slow…"],["หมดเขตบ่ายสี่…","Ends at 4 pm…"]],grandma:[["ต้นจ๋า…","Oh, Ton…"]]}
};
function drawChatter(g,now){
  const L2=CHAT_LINES[S.zone]; if(!L2 || busy()) return;
  npcs.forEach((n,i)=>{
    if((rush&&rush.n===n)||(urgent&&urgent.n===n)) return;
    const k=caseOf(n); if(n.role!=="tips" && (!k || S.best[k])) return;
    if(k && S.best[k]) return;
    const arr=L2[n.role]; if(!arr) return;
    if(Math.hypot(n.x-player.x,n.y-player.y)>380) return;
    const cyc=(now/1000+i*2.3)%8; if(cyc>2.8) return;
    const line=arr[Math.floor((now/8000+i))%arr.length][S.lang==="en"?1:0];
    const a=Math.min(1,cyc*4,(2.8-cyc)*4), y=n.y-CHAR_H-44;
    g.save(); g.globalAlpha=a; g.font="600 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; const tw=g.measureText(line).width+16;
    rr(g,n.x-tw/2,y-12,tw,22,11); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.textAlign="center"; g.textBaseline="middle"; g.fillText(line,n.x,y-1); g.restore();
  });
}
function drawPanic(g,n,now){
  const y=n.y-CHAR_H-26;
  g.save(); g.font="800 14px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; const t=L("แย่แล้วๆ!","Oh no!"); const tw=g.measureText(t).width+18;
  g.translate(n.x,y); g.rotate(RM?0:Math.sin(now/90)*0.06);
  rr(g,-tw/2,-13,tw,26,6); g.fillStyle="#FF5A1F"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle=INK; g.textAlign="center"; g.textBaseline="middle"; g.fillText(t,0,1); g.restore();
  // dust puffs at the feet
  if(!RM) for(let i=0;i<3;i++){ const p=((now/300)+i/3)%1; g.fillStyle=`rgba(180,170,150,${.6*(1-p)})`; g.beginPath(); g.arc(n.x-(i-1)*10,n.y+2-p*8,4+p*6,0,7); g.fill(); }
}
/* someone whose case went badly stands in the café crying */
const crying=(n)=>{ if(n.role==="prisoner") return true; if(n.role==="o_trap") return !(S.freed&&S.freed[n.k]); const k=caseOf(n); return !!(k && S.best[k]==="danger"); };
const sobOf=(now)=>RM?0:Math.max(0,Math.sin(now/170))*1.6;
function drawTears(g,n,w,bob,now){
  if(n.dir==="up") return;
  const ey=n.y+bob-CHAR_H+CHAR_H*0.268;
  const eyes = n.dir==="down" ? [[-1,n.x-w*0.16],[1,n.x+w*0.16]] : n.dir==="left" ? [[-1,n.x-w*0.12]] : [[1,n.x+w*0.12]];
  g.save(); g.lineCap="round";
  for(const [s,ex] of eyes){
    // streak down the cheek
    g.strokeStyle="#141414"; g.lineWidth=3.6; g.beginPath(); g.moveTo(ex,ey+1.5); g.lineTo(ex+s*0.6,ey+9); g.stroke();
    g.strokeStyle="#7CC8F2"; g.lineWidth=2.2; g.beginPath(); g.moveTo(ex,ey+1.5); g.lineTo(ex+s*0.6,ey+9); g.stroke();
    // drops springing off the cheek
    for(let k=0;k<3;k++){
      const p=RM?0.35+k*0.2:((now/760)+k/3)%1;
      const x=ex+s*(1.5+p*11), y=ey+9+p*p*24-(1-p)*p*8, r=2.4-p*0.8;
      g.globalAlpha=Math.min(1,(1-p)*1.6);
      g.fillStyle="#7CC8F2"; g.strokeStyle="#141414"; g.lineWidth=1;
      g.beginPath(); g.moveTo(x,y-r*1.9); g.quadraticCurveTo(x+r,y-r*0.3,x+r,y); g.arc(x,y,r,0,Math.PI); g.quadraticCurveTo(x-r,y-r*0.3,x,y-r*1.9); g.fill(); g.stroke();
    }
    g.globalAlpha=1;
  }
  g.restore();
}
function drawMarker(g,n,now){
  if(rush && rush.n===n) return;
  if(urgent && urgent.n===n) return;
  const k=marker(n); if(!k) return;
  if(k==="cry"){
    const y=n.y-CHAR_H-18+(RM?0:Math.sin(now/300)*2), t=EN()?"sob…":"ฮือ…";
    g.font="700 13px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; const tw=g.measureText(t).width+16;
    g.fillStyle="#DCE6F5"; g.strokeStyle=INK; g.lineWidth=2.5;
    g.beginPath(); g.roundRect(n.x-tw/2,y-12,tw,24,12); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(n.x-5,y+11); g.lineTo(n.x,y+18); g.lineTo(n.x+5,y+11); g.fill(); g.stroke();
    g.fillRect(n.x-6,y+8,12,4);
    g.fillStyle=INK; g.textAlign="center"; g.textBaseline="middle"; g.fillText(t,n.x,y+1);
    return;
  }
  const y=n.y-CHAR_H-16+(RM?0:Math.sin(now/260)*3);
  g.beginPath(); g.arc(n.x,y,12,0,7); g.fillStyle=k==="done"?"#2BB673":k==="tip"?"#FFFFFF":"#FFC414"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.beginPath(); g.moveTo(n.x-5,y+10); g.lineTo(n.x,y+17); g.lineTo(n.x+5,y+10); g.fill(); g.stroke();
  g.beginPath(); g.arc(n.x,y,10.6,0,7); g.fill();
  g.fillStyle=k==="done"?"#FFFFFF":INK; g.font="800 15px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  g.fillText(k==="done"?"✓":k==="tip"?"…":"!",n.x,y+1);
}
function marker(n){
  if(n.role==="mentor") return ((S.zone===1?!S.intro:!S.seen[S.zone]) || doneCount()===ZN().cases.length) ? "new" : null;
  const c=caseOf(n); if(!c) return n.role==="tips" ? "tip" : null;
  if(c==="recover" && S.best.recover && S.best.recover!=="safe") return "cry";
  if(S.best[c]) return S.best[c]==="danger" ? "cry" : "done";
  return "new";
}
