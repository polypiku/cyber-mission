/* Walk-in ending cutscenes where the characters move on their own. */
/* ---------- walk-in ending cinematics: you and the police move on their own ---------- */
for(const k of ["cin_cop1","cin_cop2"]){ SPRITES[k]=SPRITES.police; PEOPLE[k]={name:{th:"ตำรวจชุดบุก",en:"Raid officer"}, role:{th:"ตำรวจไซเบอร์",en:"Cyber police"}}; }
SPRITES.cin_thug=SPRITES.workMan; PEOPLE.cin_thug={name:{th:"ชายชุดดำ",en:"Man in black"}, role:{th:"ลูกน้องแก๊งเงา",en:"Shadow gang"}};
SPRITES.cin_boss=SPRITES.shadowBoss; PEOPLE.cin_boss={name:{th:"เฮียเงา",en:"Boss Shadow"}, role:{th:"หัวหน้าแก๊งเงา",en:"Shadow gang leader"}};
for(const b of ["workMan","workMom","studentBoy","studentGirl"]){ SPRITES["cin_sc_"+b]=SPRITES[{workMan:"crowd11",workMom:"crowd12",studentBoy:"crowd03",studentGirl:"crowd16"}[b]]; PEOPLE["cin_sc_"+b]={name:{th:"คนโทรหลอก",en:"Scam caller"}, role:{th:"แก๊งคอลเซ็นเตอร์",en:"Call-centre gang"}}; }
let CIN=null;
setTimeout(()=>{ const b=$("cinSkip"); if(b) b.onclick=()=>{ if(CIN) endCinema(true); }; },0);
function mk(id,extra={}){ return {id,role:"cin",cin:true,on:false,x:-999,y:-999,dir:"down",home:"down",t:0,...extra}; }
function cinHide(a){ a.on=false; npcs=npcs.filter(n=>n!==a); }
function cinPlace(a,x,y,dir){ a.x=x; a.y=y; if(dir) a.dir=dir; a.on=true; }
function cinZone(z,opt={}){
  urgent=null; rush=null; escort=null; wifiT=0;
  S.zone=z; if(opt.bld!=null) S.bld=opt.bld; if(opt.floor!=null) S.floor=opt.floor;
  setWorld(); buildCast(); if(opt.clear) npcs=[]; drawStatic();
}
function cinReAdd(){ if(!CIN) return; npcs=npcs.filter(n=>!n.cin).concat(CIN.act.filter(a=>a.on)); }
function startCinema(steps,onDone,opt={}){
  const actors=(opt.actors||[]).flat().filter(Boolean);
  closeDlg(); closeSheet();
  CIN={steps,i:-1,t:0,act:actors,em:[],onDone,fading:false,allRed:!!opt.allRed,noCars:!!opt.noCars,cars:!!opt.cars,van:null,
       back:{z:S.zone,f:S.floor,b:S.bld,x:player.x,y:player.y,dir:player.dir}};
  keys.clear(); target=null; targetNpc=null; endJoy&&endJoy();
  document.body.classList.add("cin"); $("cin").hidden=false; $("cinNight").className=opt.night?"night":opt.dawn?"dawn":""; hud();
  nextCin();
}
function cinCap(who,th,en){
  const id=who==="me"?S.char:who, cap=$("cinCap");
  cap.innerHTML=`<img alt="" src="${SPRITES[id].face.src}"${/thug/.test(id)?' style="filter:brightness(.3)"':""}><div><b>${esc(nm(id))}</b><p>${esc(S.lang==="en"?en:th)}</p></div>`; cap.hidden=false;
}
function nextCin(){
  const c=CIN; if(!c) return;
  c.i++; c.t=0; $("cinCap").hidden=true;
  if(c.i>=c.steps.length) return endCinema();
  const s=c.steps[c.i];
  if(s.fn){ s.fn(); cinReAdd(); return nextCin(); }
  if(s.fade){ c.fading=true; $("cinFade").classList.add("on");
    setTimeout(()=>{ if(CIN!==c) return; s.fade(); cinReAdd(); $("cinFade").classList.remove("on");
      setTimeout(()=>{ if(CIN!==c) return; c.fading=false; nextCin(); }, s.hold||420); }, 450); return; }
  if(s.say){ cinCap(...s.say); if(s.say[0]!=="me") sfx("blip"); }
  if(s.em) (typeof s.em==="function"?s.em():s.em).forEach(([a,txt,sec])=>c.em.push({a,txt,until:performance.now()+(sec||2)*1000}));
  if(s.sfx) sfx(s.sfx);
}
function stepCinema(dt){
  const c=CIN; if(!c) return;
  for(const a of c.act) a.moving=false;
  if(c.van){ const v=c.van; if(v.go){ v.x+=v.v*dt; } else if(v.stopAt!=null){ const d=v.stopAt-v.x; if(Math.abs(d)>3) v.x+=Math.sign(d)*Math.min(Math.abs(d),v.v*dt); } }
  if(c.fading) return;
  const s=c.steps[c.i]; if(!s) return; c.t+=dt;
  if(s.mv){ let done=true; for(const [a,x,y,sp] of s.mv){ if(!a||!a.on&&a!==player) continue; if(!moveTo(a,x,y,sp||105,dt)) done=false; }
    if(done && c.t>(s.min||0)){ (s.face||[]).forEach(([a,d])=>a.dir=d); nextCin(); } return; }
  if(s.until){ if(s.until()) nextCin(); return; }
  if(c.t>=(s.t||s.wait||2.2)) nextCin();
}
function drawCinFx(g,now){
  const c=CIN; if(!c) return;
  c.em=c.em.filter(e=>e.until>now);
  for(const e of c.em){ const a=e.a; if(!a||(a!==player&&!a.on)) continue; const h=CHAR_H*(SCALE[a.id]||1);
    g.font="700 22px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
    const y=a.y-h-18-(RM?0:Math.abs(Math.sin(now/180))*4); rr(g,a.x-20,y-18,40,36,12); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.fillText(e.txt,a.x,y+1); }
}
function endCinema(skipped){
  const c=CIN; if(!c) return; CIN=null;
  document.body.classList.remove("cin"); $("cin").hidden=true; $("cinCap").hidden=true; $("cinFade").classList.remove("on"); $("cinNight").className="";
  const b=c.back; cinZone(b.z,{floor:b.f,bld:b.b}); player.x=b.x; player.y=b.y; player.dir=b.dir; player.moving=false;
  hudKey=""; hud();
  c.onDone&&c.onDone(skipped);
}
function raidScript(n){
  const B=OFFICES[hqB()], dx=B.door, s2=(BUILDINGS.find(b=>b.zone===7)||{door:1386}).door, bodies=["workMan","workMom","studentBoy","studentGirl"];
  const spots=n<=2?[]:n===3?[[180,268],[420,398]]:[[120,268],[260,268],[400,268],[540,268],[120,398],[260,398],[400,398],[540,398]];
  const A={phop:mk("police"),c1:mk("cin_cop1"),c2:mk("cin_cop2"),rec:mk("o_recep"),guard:mk("o_guard"),sc:spots.map((_,k)=>mk("cin_sc_"+bodies[k%4])),boss:n>=4?mk("cin_boss"):null};
  if(A.sc[0]) A.sc[0].id="itGuy"; if(n>=4&&A.sc[1]) A.sc[1].id="jeAdmin";
  const st=[];
  st.push({fade:()=>{ cinZone(0); player.x=s2; player.y=300; player.dir="down";
    cinPlace(A.phop,s2+40,292,"down"); cinPlace(A.c1,s2-34,262,"down"); cinPlace(A.c2,s2+74,262,"down"); }});
  st.push({say:["police",`ทุกคนพร้อมนะ เป้าหมายคือ${B.name.th} ฝั่งตรงข้ามถนน`,`Everyone ready? Target: ${B.name.en}, across the road.`],t:2.8});
  st.push({mv:[[player,s2,578],[A.phop,s2+40,578],[A.c1,s2-34,548],[A.c2,s2+74,548]]});
  st.push({mv:[[player,1070,590],[A.phop,1108,590],[A.c1,1040,560],[A.c2,1118,556]]});
  st.push({say:["me","ไฟคนข้ามเขียวแล้ว ไปกัน","Walk light's green. Let's go."],t:1.8});
  st.push({mv:[[player,1070,812],[A.phop,1108,812],[A.c1,1040,790],[A.c2,1118,790]]});
  st.push({mv:[[player,dx,816],[A.phop,dx+40,816],[A.c1,dx-40,796],[A.c2,dx+80,796]]});
  st.push({say:["police",n>=4?"หลักฐานแน่นพอ บุกได้!":"เข้าไปเลย ระวังตัวด้วย",n>=4?"The evidence is solid. Go!":"In we go. Stay sharp."],t:2.2,face:[[player,"down"]]});
  st.push({mv:[[player,dx,850],[A.phop,dx+30,850],[A.c1,dx-30,846],[A.c2,dx+50,846]]});
  // lobby
  st.push({fade:()=>{ cinZone(8,{bld:hqB(),floor:1,clear:true});
    cinPlace(player,432,580,"up"); cinPlace(A.phop,474,590,"up"); cinPlace(A.c1,394,600,"up"); cinPlace(A.c2,512,600,"up");
    cinPlace(A.rec,430,138,"down"); cinPlace(A.guard,806,150,"left"); }});
  st.push({mv:[[player,660,262],[A.phop,712,246],[A.c1,620,286],[A.c2,740,292]]});
  st.push({say:["police","ตำรวจ! ห้ามขยับ!","Police! Don't move!"],em:[[A.guard,"😨",2.4],[A.rec,"😲",2.4]],t:2});
  st.push({say:["o_guard","เอ่อ… ผม… ผมแค่เฝ้าลิฟต์","Uh… I… I just guard the lift"],t:2.2});
  st.push({mv:[[A.c1,780,190,150]]});
  st.push({mv:[[A.c1,432,600,130],[A.guard,432,560,130]]});
  st.push({fn:()=>{ cinHide(A.c1); cinHide(A.guard); }});
  st.push({mv:[[player,740,140],[A.phop,700,158],[A.c2,782,170]]});
  // floor 2: the call-centre room
  st.push({fade:()=>{ cinZone(8,{bld:hqB(),floor:2,clear:true});
    cinPlace(player,740,154,"down"); cinPlace(A.phop,700,166,"down"); cinPlace(A.c2,786,176,"down");
    cinHide(A.rec); spots.forEach(([x,y],k)=>cinPlace(A.sc[k],x,y,"up"));
    if(A.boss) cinPlace(A.boss,600,520,"up"); }});
  st.push({mv:[[player,664,272],[A.phop,624,268],[A.c2,700,300]]});
  if(n<=2){
    st.push({say:["me","ไม่มีใครเลย… มีแต่โต๊ะว่างกับกล่องซิมที่ถูกเผา","No one's here… just empty desks and burned SIM boxes."],t:2.8});
    st.push({say:["police","พวกมันรู้ตัวก่อน หลักฐานเรายังไม่แน่นพอ","They knew we were coming. Our evidence wasn't solid enough."],t:2.8});
  } else {
    st.push({say:["police","ตำรวจไซเบอร์! วางโทรศัพท์ลง!","Cyber police! Put the phones down!"],em:()=>A.sc.map(a=>[a,"😱",2.6]),sfx:"bad",t:2.2});
    st.push({fn:()=>{ A.sc.forEach(a=>a.dir="down"); if(A.boss) A.boss.dir="right"; }});
    if(n===3) st.push({say:["police","เหลือแค่ลูกน้องสองคน ที่เหลือหนีไปก่อนแล้ว…","Only two small fry left. The rest already fled…"],t:2.8});
    if(n>=4){
      st.push({say:["cin_boss","ลบข้อมูลให้หมด! หนีเร็ว!","Wipe everything! Run!"],em:[[A.boss,"💨",2]],t:1.8});
      if(n===4){ st.push({mv:[[A.boss,800,560,230]]}); st.push({fn:()=>cinHide(A.boss)});
        st.push({say:["police","เฮียเงาหนีไปทางประตูหลัง! แต่ลูกน้องโดนจับหมดแล้ว","Boss Shadow got out the back! But his whole crew is caught."],t:2.8}); }
      else { st.push({mv:[[A.boss,770,540,200],[A.c2,770,500,240]]}); st.push({fn:()=>{ A.boss.dir="up"; A.c2.dir="down"; }});
        st.push({say:["police","จับได้แล้ว เฮียเงา! คำให้การของปวีณาบอกทางหนีไว้หมด","Got you, Boss Shadow! Paweena's statement told us every way out."],em:[[A.boss,"😣",2.6]],t:3}); }
      st.push({say:["police","ชั้น 3 ยังมีคนถูกขังอยู่ เดี๋ยวพวกเราไปช่วยต่อ","People are still locked up on floor 3. We'll get them out next."],t:2.6});
    }
  }
  st.push({wait:0.6});
  return {steps:st, opt:{allRed:true, cars:true, dawn:true, actors:[A.phop,A.c1,A.c2,A.rec,A.guard,A.sc,A.boss]}};
}
function takenScript(){
  const s2=(BUILDINGS.find(b=>b.zone===7)||{door:1386}).door, st=[], A={phop:mk("police"),t1:mk("cin_thug",{dark:true}),t2:mk("cin_thug",{dark:true})};
  st.push({fade:()=>{ cinZone(0); player.x=s2; player.y=300; player.dir="down"; cinPlace(A.phop,s2+40,292,"left"); }});
  st.push({say:["police","ขอโทษนะ หลักฐานยังไม่พอ ต้องรอหมายค้นก่อน","Sorry. The evidence isn't enough. We have to wait for a warrant."],t:2.8});
  st.push({say:["me","งั้นวันนี้กลับก่อนนะ","I'll head home for today then."],t:1.8});
  st.push({mv:[[player,s2,560,90]]});
  st.push({fn:()=>{ cinHide(A.phop); CIN.van={x:-220,y:652,v:300,c:"#18181C",cab:"#0C0C0E",kind:"truck",len:176,stopAt:1250}; }});
  st.push({mv:[[player,1250,590,80]],min:2.2});
  st.push({until:()=>CIN.van&&Math.abs(CIN.van.x-1250)<4});
  st.push({say:["me","เดี๋ยว… รถตู้คันนี้จอดทำไม…","Wait… why is this van stopping…"],em:[[player,"😨",2.6]],t:2});
  st.push({fn:()=>{ cinPlace(A.t1,1210,640,"up"); cinPlace(A.t2,1290,640,"up"); }});
  st.push({mv:[[A.t1,1222,596,160],[A.t2,1278,596,160]]});
  st.push({say:["cin_thug","ไปกับพวกเราดีๆ นักสืบ","Come quietly, detective."],t:2.2});
  st.push({mv:[[player,1250,646,90],[A.t1,1226,646,90],[A.t2,1274,646,90]]});
  st.push({fn:()=>{ player.hide=true; cinHide(A.t1); cinHide(A.t2); CIN.van.go=true; CIN.van.v=320; sfx("bad"); }});
  st.push({wait:1.6});
  return {steps:st, opt:{noCars:true, night:true, actors:[A.phop,A.t1,A.t2]}};
}
function playEndingScene(n, persist){
  const E=ENDINGS[n], title=`${L("ฉากจบ","Ending")} ${n}/5 · ${E.t[EN()?1:0]}`;
  const sc=n===1?takenScript():raidScript(n), skip=n===1?2:1;
  startCinema(sc.steps, ()=>{ player.hide=false; openCutscene(title, E.panels().slice(skip), ()=>endingCard(n)); }, sc.opt);
}

function goOutside(fromZone){
  urgent=null; rush=null; escort=null;
  const ob=fromZone===8?OFFICES[S.bld||0]:null;
  S.zone=0; save(); setWorld(); buildCast(); drawStatic();
  const b=bOf(fromZone)||BUILDINGS[0];
  if(ob){ player.x=ob.door; player.y=822; player.dir="up"; hqT=performance.now(); } else { player.x=b.door; player.y=300; player.dir="down"; } target=null; targetNpc=null; keys.clear();
  hudKey=""; hud(); toast(ZN().name[S.lang]);
}
function talkTo(n){
  if(busy()) return;
  target=null; targetNpc=null; talking=n; face(n,player);
  if(n.filler){ talkFiller(n); return; }
  if(n.role==="briefing"){ if(!S.briefed) briefing(); return; }
  if(n.role && n.role.startsWith("o_")){ talkOffice(n); return; }
  if(n.role==="repairman"){ openRepair(); return; }
  if(n.role==="teller"){ say(n.id, lines([t("สวัสดีค่ะ ถ้ามีใครโทรมาอ้างว่าเป็นธนาคาร ให้วางสายแล้วโทรกลับเบอร์หลังบัตรเองนะคะ","Hello! If anyone calls claiming to be the bank, hang up and call the number on the back of your card yourself."),
    t("ธนาคารไม่เคยส่งลิงก์ให้กรอกรหัสหรือ OTP ทาง SMS หรือไลน์ค่ะ","Banks never send links asking for your PIN or OTP by SMS or LINE."),
    t("ไม่แน่ใจเรื่องการเงิน โทรสายด่วนแบงก์ชาติ 1213 ถามได้ฟรีค่ะ","Unsure about anything money-related? Call the Bank of Thailand hotline 1213.")])); return; }
  if(n.role==="clue_admin"){ const first=!S.clueAdmin; S.clueAdmin=true; save();
    say(n.id, lines([t("น้องๆ สนใจลงทุนไหมคะ กลุ่ม VIP ของเจ๊กำไรเดือนละ 30% ไม่มีขาดทุน","Hey there! Want to invest? My VIP group makes 30% a month, never a loss."),
      t("ไม่มีเงินก็ไม่เป็นไร แค่เปิดบัญชีใหม่ให้เจ๊ยืมใช้ รับค่าขนมไปเลย 2,000","No money? No problem. Just open a new account for me to borrow and take ฿2,000 pocket money."),
      t("แอดไลน์เจ๊ไว้นะ เดี๋ยวส่งลิงก์ให้","Add me on LINE, I'll send you the link.")]),{onEnd:()=>{ if(first) setTimeout(()=>toast(L("🕵️ จำหน้าเธอไว้: กำไรสูงเกินจริง + หาคนเปิดบัญชีม้า = สัญญาณแก๊งเงา","🕵️ Remember her: impossible returns + recruiting mule accounts = Shadow gang signs")),300); }}); return; }
  if(n.role==="clue_it"){ const first=!S.clueIT; S.clueIT=true; save();
    say(n.id, lines([t("มาซ่อมเน็ตให้ร้านครับ เดี๋ยวเสียบกล่องนี้ไว้ เน็ตจะแรงขึ้น","I'm here to fix the shop's internet. I'll plug this box in and it'll be faster."),
      t("ใครถามก็บอกว่าช่างจากบริษัทนะ ไม่ต้องไปถามเจ้าของร้านหรอก","If anyone asks, I'm from the company. No need to bother the owner.")]),{onEnd:()=>{ if(first) setTimeout(()=>toast(L("🕵️ เจ้าของร้านไม่ได้เรียกช่าง… กล่องนั้นอาจเป็นตัวปล่อย Wi-Fi ปลอม","🕵️ The owner never called a technician… that box could be a fake Wi-Fi hotspot")),300); }}); return; }
  if(n.role==="fon"){
    const FON=[
      [t("พี่ใกล้คลอดแล้ว ช่วงนี้มีคนทักมาขายของเด็กอ่อนถูกมาก ให้โอนก่อนแล้วค่อยส่ง… พี่เลยเช็กชื่อบัญชีกับเลขบัญชีก่อนทุกครั้ง","I'm due soon. People keep messaging me cheap baby gear, pay first and they'll ship… so I always check the account name and number first."),t("ถ้าร้านไม่ยอมเก็บเงินปลายทาง ไม่มีรีวิวจริง พี่ไม่ซื้อเลย","If a shop won't do cash on delivery and has no real reviews, I don't buy.")],
      [t("เมื่อวานมี SMS บอกว่าได้เงินอุดหนุนเด็กแรกเกิด ให้กดลิงก์ไปกรอกเลขบัญชี","Yesterday an SMS said I'd get a newborn grant and to enter my bank details at a link."),t("สิทธิ์จริงต้องลงทะเบียนกับหน่วยงานรัฐโดยตรง ไม่มีใครส่งลิงก์มาให้กรอกหรอก","Real benefits are registered with the government office directly. Nobody texts you a form link.")],
      [t("มีคนโทรมาอ้างเป็นโรงพยาบาล บอกว่าต้องโอนค่ามัดจำห้องคลอดด่วน","Someone called claiming to be the hospital, saying I had to pay a delivery-room deposit right now."),t("พี่วางสายแล้วโทรกลับเบอร์โรงพยาบาลที่อยู่ในสมุดฝากครรภ์เอง ปรากฏว่าไม่มีเรื่องนี้เลย","I hung up and called the number in my pregnancy record book. There was no such thing.")]
    ];
    S.fonI=((S.fonI||0)+1)%FON.length; save(); say(n.id, lines(FON[S.fonI])); return;
  }
  if(n.role==="police"){ talkPolice(n); return; }
  if(n.role==="prisoner"){
    const where=ZONES[n.jz]?ZONES[n.jz].name[S.lang]:"";
    const P_=[[t(`ผมแค่นั่งปล่อย Wi-Fi ฟรีใน${where}…`,`I was only running free Wi-Fi in the ${where}…`),t("ไม่คิดเลยว่าจะมีคนสังเกตเห็น","I never thought anyone would notice.")],
      [t("ทุกรหัสที่ดักได้ ผมส่งให้พี่บอสหมดแล้ว","Every password I captured went straight to Boss."),t("ตอนนี้พี่บอสไม่รับสายผมแล้ว…","Now Boss won't even answer my calls…")],
      [t("ดักข้อมูลคนอื่นมันผิดกฎหมาย ผมรู้แล้ว","Stealing people's data is a crime. I know that now."),t("ถ้าย้อนเวลาได้ ผมจะไม่ทำแบบนี้อีก","If I could go back, I'd never do it again.")]];
    n.pi=((n.pi||0)+1)%P_.length; say(n.id, lines(P_[n.pi])); return;
  }
  if(n.role==="mentor" && S.zone===0){
    const open=Object.keys(ZONES).map(Number).filter(z=>zoneOpen(z));
    const nextZ=CHAPTERS.find(z=>!zoneOpen(z));
    const ls=[t(`ข้างนอกนี่คือถนนที่เชื่อมทุกโซน ตอนนี้เข้าได้ ${open.length} ที่ คะแนนรวม ${totalScore()}/${totalMax()}`,`This street links every zone. ${open.length} open so far. Total score ${totalScore()}/${totalMax()}.`)];
    if(nextZ) ls.push(t(lockMsg(nextZ),lockMsg(nextZ)));
    else if(chapter()<CHAPTERS.length) ls.push(t(`ตอนนี้ไปช่วยคนที่${ZONES[CHAPTERS[chapter()]].name.th}ก่อนนะ`,`Head to ${ZONES[CHAPTERS[chapter()]].name.en} next.`));
    ls.push(allDone()&&!S.busted ? t("ช่วยครบทุกที่แล้ว! เอาหลักฐานไปให้พี่ภพที่สถานีตำรวจ ซอย 2 ได้เลย","You've helped everywhere! Take the evidence to Phop at the police station, Soi 2.")
      : S.busted ? t("แก๊งเงาถูกทลายแล้ว แต่มิจฉาชีพยังมีอีกเยอะ ระวังตัวด้วยนะ","The Shadow gang is down, but there are plenty more scammers. Stay sharp.")
      : t(`ทุกเรื่องที่เจอเป็นฝีมือแก๊งเดียวกัน ตอนนี้มีหลักฐาน ${evCount()}/${Object.keys(EVID).length} ชิ้น ช่วยให้ครบทุกที่ รวมทั้งมหาวิทยาลัยกับสถานีตำรวจในซอย`,`It's all one gang. You have ${evCount()}/${Object.keys(EVID).length} clues. Help everywhere, including the university and police station down the sois.`));
    if(!(S.bustTier>=1)) ls.push((S.hqFound?t(`${OFFICES[hqB()].name.th} นั่นแหละ มียามกันไม่ให้ขึ้นชั้นบน พี่ว่าใช่รังแก๊งเงาแน่ๆ`,`${OFFICES[hqB()].name.en}, the one with a guard blocking the lift. That has to be the Shadow gang's den.`):t("ได้ข่าวว่าแก๊งเงาซ่อนอยู่ในตึกออฟฟิศสักตึกฝั่งตรงข้ามถนน หน้าตาเหมือนบริษัทธรรมดาเลย ต้องเข้าไปสำรวจเอง","Word is the Shadow gang hides in one of the office buildings across the road. They look like ordinary companies, so we'll have to check them ourselves.")));
    if(allDone()) ls.push(t("เมื่อกี้พี่ได้ยินเสียงแปลกๆ จากตรอกมืดข้างร้านกาแฟ… ลองไปดูไหม","I just heard strange noises from the dark alley by the café… want to take a look?"));
    if(recoverRole()) ls.push(t("ยายกับตาเพิ่งได้สายแปลกๆ ไปคุยด้วยหน่อยนะ","Grandma and Grandpa just got some strange calls. Go and talk to them."));
    S.seen[0]=true; save();
    say(n.id, lines(ls)); return;
  }
  if(n.role==="mentor"){
    if(S.zone===1 && !S.intro){ startTour(); return; }
    if(S.zone!==1 && !S.seen[S.zone]){ say(n.id, ZONE_INTRO[S.zone]?lines(ZONE_INTRO[S.zone]):mentorIntro2(), {onEnd:()=>{ S.seen[S.zone]=true; save(); zoneEvent(); }}); return; }
    if(doneCount()===ZN().cases.length){ say(n.id, lines([t("เยี่ยมมาก! ช่วยครบทุกคนแล้ว มาดูผลกันหน่อย","Brilliant! You've helped everyone. Let's see how you did.")]), {onEnd:openSummary}); return; }
    const left=ZN().cases.length-doneCount();
    const extra = S.zone===1 && S.chat && !S.results.chat ? [t("มือถือของน้องสั่นอยู่นะ ลองเปิดดูสิ","Your phone is buzzing. Take a look.")] : [];
    say(n.id, lines([t(`ยังเหลืออีก ${left} เรื่องที่ต้องช่วย ดูที่เครื่องหมาย ! นะ`,`${left} more to go. Look for the ! markers.`),...extra])); return;
  }
  if(n.role==="tips" && !caseOf(n)){ const tip=SCRIPT.tips[S.tip%SCRIPT.tips.length]; S.tip++; save(); say(n.id, lines([tip])); return; }
  const cid=caseOf(n), sc=scriptFor(n.role);
  if(!cid){ say(n.id, lines([thanksLine(n.role,n.id)])); return; }
  const r=S.best[cid];
  if(!r){ say(n.id, lines(sc.intro), {choices:[{...CH.help[0],fn:()=>openCase(cid,n)},CH.help[1]]}); return; }
  const more = r!=="safe" ? [t(`(เคสนี้ได้ ${starStr(r)} ลองใหม่ให้ได้ ★★★ เพื่อเก็บคะแนนเต็ม)`,`(This case is at ${starStr(r)}. Replay for ★★★ to get full points.)`)] : [];
  say(n.id, lines([sc.after[r],...more]), {choices:[{...CH.again[0],fn:()=>openCase(cid,n)},CH.again[1]]});
}
function busy(){ return !!CIN || !!D || !$("veil").hidden || !$("peek").hidden || !!coach || arriving; }
