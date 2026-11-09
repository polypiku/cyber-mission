/* New places on the east end of the street: food court, mini mart, phone shop, market and student dorm.
   Also the bus that takes you anywhere for a fare, the push-button crossings, and the food-court scene
   where you overhear the gang over lunch. */

/* the cases that moved out of their old rooms keep their old lines */
const CASE_SCRIPT = { qr:SCRIPT.grandma, airdrop:SCRIPT2.friend, invest:SCRIPT3.friend, parent:SCRIPT4.grandma, scholar:SCRIPT6.friend };
/* people who moved out with their case */
const MOVED_OUT = {1:["grandma"], 2:["friend"], 3:["friend"], 4:["grandma"], 6:["friend"]};
const SIDE_ZONES = [9,11,12,10,13];

/* ---------- rooms ---------- */
const ROOM_SHELL = ROOM_SOLIDS.slice(0,6);
const ROOMS2 = {
  9:{ floor:["#F4E6CC","#EAD7B4"], wall:"#FBF1DE", trim:"#D9822B", sign:["ศูนย์อาหาร","FOOD COURT"],
      props:[
        {k:"stall",x:56,y:108,w:140,h:72,label:["ข้าวมันไก่","Chicken rice"],c:"#E9A23B"},
        {k:"stall",x:206,y:108,w:140,h:72,label:["ก๋วยเตี๋ยว","Noodles"],c:"#D9573A"},
        {k:"stall",x:356,y:108,w:150,h:72,label:["ข้าวแกง","Curry rice"],c:"#C2552E"},
        {k:"stall",x:516,y:108,w:140,h:72,label:["ส้มตำ","Papaya salad"],c:"#5FAE47"},
        {k:"stall",x:666,y:108,w:150,h:72,label:["น้ำ · ขนม","Drinks"],c:"#3B7FD0"},
        {k:"table",x:70,y:250,w:200,h:90},{k:"table",x:70,y:420,w:200,h:90},
        {k:"table",x:600,y:250,w:200,h:90},{k:"table",x:600,y:420,w:200,h:90}]},
  10:{ floor:["#E3C79A","#D8B985"], wall:"#F6E7C8", trim:"#B8432E", sign:["ตลาดนัด","MARKET"],
      props:[
        {k:"tent",x:60,y:112,w:200,h:86,label:["ผักผลไม้","Fruit & veg"],c:"#5FAE47"},
        {k:"tent",x:330,y:112,w:200,h:86,label:["ไก่ทอด","Fried chicken"],c:"#E9A23B"},
        {k:"tent",x:600,y:112,w:210,h:86,label:["เสื้อผ้า","Clothes"],c:"#7A5AA6"},
        {k:"tent",x:80,y:350,w:210,h:80,label:["ของเล่น","Toys"],c:"#3B7FD0"},
        {k:"tent",x:570,y:350,w:220,h:80,label:["เคสมือถือ","Phone cases"],c:"#D9573A"}]},
  11:{ floor:["#F2F5F0","#E4EAE2"], wall:"#F4F7F2", trim:"#2E8B57", sign:["ร้านสะดวกซื้อ","MINI MART"],
      props:[
        {k:"shelf",x:80,y:220,w:300,h:36},{k:"shelf",x:80,y:320,w:300,h:36},{k:"shelf",x:80,y:420,w:300,h:36},
        {k:"fridge",x:770,y:120,w:50,h:300},
        {k:"counter",x:520,y:470,w:230,h:46},
        {k:"atm",x:470,y:112,w:60,h:60}]},
  12:{ floor:["#EEF3F7","#E1E9F0"], wall:"#E8F1F8", trim:"#2F6DB5", sign:["หมอโฟน ไอที","PHONE DR. IT"],
      props:[
        {k:"glass",x:120,y:190,w:620,h:48},
        {k:"glass",x:60,y:280,w:50,h:230},
        {k:"bench",x:600,y:390,w:190,h:50},
        {k:"board",x:120,y:112,w:620,h:40,solid:false}]},
  13:{ floor:["#EADFEE","#DED0E4"], wall:"#F3EAF5", trim:"#7A4E8C", sign:["หอพักนักศึกษา","STUDENT DORM"],
      props:[
        {k:"mail",x:70,y:110,w:300,h:60},
        {k:"board",x:470,y:112,w:290,h:44,solid:false},
        {k:"sofa",x:110,y:380,w:210,h:52},{k:"sofa",x:540,y:380,w:210,h:52},
        {k:"vending",x:770,y:190,w:50,h:120},
        {k:"lowtable",x:380,y:250,w:110,h:56}]}
};
for(const r of Object.values(ROOMS2)) r.solids=[...ROOM_SHELL, ...r.props.filter(p=>p.solid!==false).map(p=>({x:p.x,y:p.y,w:p.w,h:p.h}))];
const isRoom2=()=>!!ROOMS2[S.zone];

function drawRoom2Static(g){
  const R=ROOMS2[S.zone];
  /* floor tiles */
  for(let y=108,r=0;y<RH;y+=48,r++) for(let x=0;x<RW;x+=48){ g.fillStyle=(x/48+r)%2?R.floor[0]:R.floor[1]; g.fillRect(x,y,48,48); }
  g.strokeStyle="rgba(0,0,0,.05)"; g.lineWidth=1; for(let y=108;y<RH;y+=48){ g.beginPath(); g.moveTo(0,y); g.lineTo(RW,y); g.stroke(); }
  /* back wall and sign */
  g.fillStyle=R.wall; g.fillRect(0,0,RW,108); g.fillStyle=R.trim; g.fillRect(0,86,RW,22);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,86); g.lineTo(RW,86); g.moveTo(0,108); g.lineTo(RW,108); g.stroke();
  rr(g,RW/2-150,14,300,52,8); g.fillStyle=R.trim; g.fill(); g.lineWidth=3; g.stroke();
  g.fillStyle="#FFFFFF"; g.font="800 24px 'Noto Sans Thai', sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(R.sign[EN()?1:0],RW/2,41);
  for(const wx of [40,RW-200]){ rr(g,wx,18,160,56,4); g.fillStyle="#CBE6F1"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); g.beginPath(); g.moveTo(wx+80,18); g.lineTo(wx+80,74); g.lineWidth=2; g.stroke(); }
  /* side and bottom walls with the door gap */
  g.fillStyle="#D7C3A6"; g.fillRect(0,108,44,RH); g.fillRect(RW-44,108,44,RH); g.fillRect(0,580,384,44); g.fillRect(480,580,RW-480,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,108); g.lineTo(44,580); g.lineTo(384,580); g.moveTo(480,580); g.lineTo(RW-44,580); g.lineTo(RW-44,108); g.stroke();
  rr(g,392,584,80,30,4); g.fillStyle="#7A4A2A"; g.fill(); g.lineWidth=2.5; g.stroke();
  for(const p of R.props) drawProp(g,p);
}
function drawProp(g,p){
  const {x,y,w,h}=p, lab=p.label?p.label[EN()?1:0]:"";
  g.fillStyle="rgba(0,0,0,.14)"; g.fillRect(x+5,y+6,w,h);
  const box=(c,r)=>{ rr(g,x,y,w,h,r||6); g.fillStyle=c; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke(); };
  const text=(t,cx,cy,sz,c)=>{ g.fillStyle=c||INK; g.font=`800 ${sz||13}px 'Noto Sans Thai', sans-serif`; g.textAlign="center"; g.textBaseline="middle"; g.fillText(t,cx,cy); };
  if(p.k==="stall"){ box("#F7EAD2"); rr(g,x,y,w,26,6); g.fillStyle=p.c; g.fill(); g.stroke(); text(lab,x+w/2,y+13,13,"#FFFFFF");
    for(let i=0;i<3;i++){ g.beginPath(); g.arc(x+28+i*(w-56)/2,y+50,12,0,7); g.fillStyle=["#C9CED4","#F2C14E","#E9E1D2"][i]; g.fill(); g.lineWidth=2; g.stroke(); } }
  else if(p.k==="table"){ rr(g,x,y,w,18,4); g.fillStyle="#B07A4A"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); rr(g,x,y+h-18,w,18,4); g.fill(); g.stroke();
    rr(g,x+8,y+24,w-16,h-48,6); g.fillStyle="#F1F1EC"; g.fill(); g.lineWidth=3; g.stroke();
    for(let i=0;i<3;i++){ g.beginPath(); g.arc(x+40+i*60,y+h/2,9,0,7); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.stroke(); g.beginPath(); g.arc(x+40+i*60,y+h/2,4,0,7); g.fillStyle=["#E9A23B","#D9573A","#5FAE47"][i]; g.fill(); } }
  else if(p.k==="tent"){ box("#F7EAD2"); for(let i=0;i*24<w;i++){ g.fillStyle=i%2?p.c:"#FFFFFF"; g.fillRect(x+i*24,y,Math.min(24,w-i*24),26); } g.lineWidth=3; g.strokeStyle=INK; g.strokeRect(x,y,w,26);
    rr(g,x+w/2-60,y+30,120,22,4); g.fillStyle="#FFF6E3"; g.fill(); g.lineWidth=2; g.stroke(); text(lab,x+w/2,y+41,12);
    for(let i=0;i<5;i++){ g.fillStyle=["#E9A23B","#5FAE47","#D9573A","#3B7FD0","#F2C14E"][i]; g.beginPath(); g.arc(x+24+i*(w-48)/4,y+h-14,7,0,7); g.fill(); g.lineWidth=1.5; g.stroke(); } }
  else if(p.k==="shelf"){ box("#C9CED4",4); for(let xx=x+8;xx<x+w-14;xx+=22){ g.fillStyle=["#E9A23B","#D9573A","#3B7FD0","#5FAE47","#F2C14E"][((xx/22)|0)%5]; g.fillRect(xx,y+6,16,h-12); } }
  else if(p.k==="fridge"){ box("#BFE3F2",4); for(let yy=y+14;yy<y+h-10;yy+=36){ g.strokeStyle=INK; g.lineWidth=2; g.beginPath(); g.moveTo(x,yy+30); g.lineTo(x+w,yy+30); g.stroke(); for(let k=0;k<3;k++){ g.fillStyle=["#D9573A","#5FAE47","#F2C14E"][k]; g.fillRect(x+8+k*13,yy+6,9,22); } } }
  else if(p.k==="counter"){ box("#B07A4A"); rr(g,x+w-70,y-26,48,30,4); g.fillStyle="#2B2B2B"; g.fill(); g.lineWidth=2; g.stroke(); text(L("แคชเชียร์","Cashier"),x+70,y+h/2,12,"#FFFFFF"); }
  else if(p.k==="atm"){ box("#5E7A8C",4); rr(g,x+10,y+8,w-20,22,3); g.fillStyle="#BFE3F2"; g.fill(); g.lineWidth=2; g.stroke(); text("ATM",x+w/2,y+46,12,"#FFFFFF"); }
  else if(p.k==="glass"){ box("#D8ECF6",6); for(let xx=x+12;xx<x+w-20;xx+=34) if(w>h){ rr(g,xx,y+10,18,h-20,3); g.fillStyle="#2B2B2B"; g.fill(); g.fillStyle="#7FD3F7"; g.fillRect(xx+3,y+14,12,h-30); } else { rr(g,x+12,y+12,w-24,30,3); g.fillStyle="#2B2B2B"; g.fill(); }
    if(h>w) for(let yy=y+12;yy<y+h-30;yy+=40){ rr(g,x+12,yy,w-24,30,3); g.fillStyle="#2B2B2B"; g.fill(); g.fillStyle="#7FD3F7"; g.fillRect(x+16,yy+4,w-32,22); } }
  else if(p.k==="bench"){ box("#8A5A33"); text(L("โต๊ะซ่อม","Repair bench"),x+w/2,y+h/2,12,"#FFF6E3"); }
  else if(p.k==="board"){ box("#C99561",4); for(let i=0;i<Math.floor(w/52);i++){ g.fillStyle=["#FFF6E3","#FFE08A","#BFE3F2","#F6C9D6"][i%4]; g.save(); g.translate(x+14+i*52,y+6); g.rotate((i%3-1)*.06); g.fillRect(0,0,38,h-12); g.restore(); } }
  else if(p.k==="mail"){ box("#9AA0A6",4); for(let r=0;r<2;r++) for(let c=0;c<Math.floor(w/30);c++){ rr(g,x+6+c*30,y+6+r*26,24,20,2); g.fillStyle="#C9CED4"; g.fill(); g.lineWidth=1.5; g.stroke(); } }
  else if(p.k==="sofa"){ box("#7A4E8C",12); rr(g,x+8,y+8,w-16,h-22,8); g.fillStyle="#9A6BAE"; g.fill(); g.lineWidth=2; g.stroke(); }
  else if(p.k==="vending"){ box("#D9573A",6); rr(g,x+6,y+8,w-12,h-50,3); g.fillStyle="#BFE3F2"; g.fill(); g.lineWidth=2; g.stroke(); }
  else if(p.k==="lowtable"){ box("#B07A4A",8); }
}

/* who is in each new place */
const NEW_PEOPLE = {
  pPook:["crowd08","พี่ปุ๊ก","Pook","พนักงานออฟฟิศ","Office worker"],
  pNok:["crowd02","พี่นก","Nok","ฝ่ายบัญชีบริษัท","Company accountant"],
  paJan:["crowd06","ป้าจันทร์","Auntie Jan","แม่ค้าผลไม้","Fruit seller"],
  jeNoi:["crowd12","เจ๊น้อย","Jae Noi","แม่ค้าเสื้อผ้า","Clothes seller"],
  lungSom:["crowd05","ลุงสมศักดิ์","Uncle Somsak","ข้าราชการเกษียณ","Retired civil servant"],
  nongPrang:["crowd10","น้องปราง","Prang","พนักงานร้านสะดวกซื้อ","Mini-mart cashier"],
  pJack:["crowd07","พี่แจ็ค","Jack","เจ้าของร้านอาหาร","Restaurant owner"],
  lungChit:["crowd17","ลุงชิต","Uncle Chit","เพิ่งขายที่ดิน","Just sold his land"],
  maeNuan:["crowd18","ป้านวล","Auntie Nuan","แม่ของตั้ม","Tam's mum"],
  nongBam:["crowd22","น้องแบม","Bam","นักศึกษาปี 2","2nd-year student"]
};
for(const [k,[b,th,en,rth,ren]] of Object.entries(NEW_PEOPLE)){ SPRITES[k]=SPRITES[b]; PEOPLE[k]={name:{th,en},role:{th:rth,en:ren}}; }
function cast2(mentor, friend0){
  const z=S.zone, M={id:mentor, role:"mentor", x:528, y:548, dir:"up"};
  const P=(id,role,x,y,dir)=>({id,role,x,y,dir:dir||"down"});
  const out={
    9:[M,P("pMay","friend",330,420,"right"),P("pPook","c_pig",470,300),P("pNok","c_bec",700,385,"left")],
    10:[M,P("grandma","grandma",430,262),P("paJan","c_gold",170,290,"right"),P("jeNoi","c_share",700,290,"left")],
    11:[M,P("maePu","grandma",470,330,"left"),P("lungSom","c_atm",500,210,"up"),P("nongPrang","c_wrong",630,440)],
    12:[M,P("techTon","repairman",430,300),P("pJack","c_sim",250,330,"right"),P("lungChit","c_apk",690,360,"left"),P("maeNuan","c_deep",330,480,"right")],
    13:[M,P(friend0,"friend",220,300,"right"),P("ton","tips",650,300,"left"),P("nongBam","c_task",430,480,"up")]
  }[z]||[M];
  if(z===9 && !S.overheard) return [M];
  return out;
}
const sc=(a,b,safe,warn,danger)=>({intro:[t(...a),t(...b)], after:{safe:t(...safe),warn:t(...warn),danger:t(...danger)}});
Object.assign(CASE_SCRIPT,{
  pig:sc(["เควินบอกว่ากำไรพี่ 3.2 ล้านแล้ว","Kevin says my profit is 3.2 million now."],["แค่จ่ายภาษีก่อน ก็ถอนได้หมดเลย","I just pay the tax first, then I can withdraw it all."],["พี่เลิกคุยกับเควินแล้ว ขอบใจนะ","I've stopped talking to Kevin. Thank you."],["เงินบางส่วนยังตามไม่ได้…","Some of the money still can't be traced…"],["พี่กู้มาจ่ายไปแล้ว…","I already borrowed to pay…"]),
  bec:sc(["คู่ค้าขอเปลี่ยนเลขบัญชีกะทันหัน","Our supplier suddenly changed their bank account."],["ต้องโอน 12 ล้านก่อนบ่ายสามนะ","I have to send 12 million before 3 pm."],["ตอนนี้บริษัทมีกฎโทรยืนยันทุกครั้งแล้ว","Now we phone to confirm every change."],["รอบนี้รอด แต่ยังไม่ได้เปลี่ยนรหัสเลย","Safe this time, but nobody changed passwords."],["เงิน 12 ล้านหายไปแล้ว…","The 12 million is gone…"]),
  gold:sc(["ทองถูกกว่าหน้าร้านบาทละสองพันแน่ะ","This gold is 2,000 cheaper per baht-weight."],["ป้าจะซื้อเก็บไว้เป็นค่าเทอมลูก","I'm buying it for my daughter's tuition."],["ป้าไปซื้อที่หน้าร้านจริงแล้วจ้ะ","I bought it at the real shop instead."],["เสียไปนิดหน่อย แต่ก้อนใหญ่ยังอยู่","Lost a little, but the big money is safe."],["เงินค่าเทอมลูกหายหมดแล้ว…","My daughter's tuition is all gone…"]),
  share:sc(["วงแชร์เปิดวง VIP ดอก 50% แน่ะ","The circle has a VIP round at 50%."],["เจ๊จะลงสามแสนเลย","I'm putting in 300,000."],["แม่ค้าในตลาดรอดกันทุกคน","Everyone in the market got out in time."],["เจ๊รอด แต่เพื่อนที่ชวนมายังเสีย","I'm fine, but the friends I invited lost money."],["แม่ท้าวหายไปพร้อมเงินทุกคน…","The host vanished with everyone's money…"]),
  atm:sc(["อย่ายุ่ง ตำรวจสั่งห้ามบอกใคร","Stay out of it. The police said tell no one."],["ลุงต้องโอนให้ ปปง. ตรวจ","I have to send it to AMLO for checking."],["ขอบใจนะหนู เงินเกษียณลุงยังอยู่","Thank you. My pension is still there."],["เสียไปสี่แสน แต่ที่เหลือยังอยู่","Lost 400,000, but the rest is safe."],["ลุงโอนไปหมดแล้ว…","I sent it all…"]),
  wrong:sc(["มีเงินโอนผิดเข้ามาห้าหมื่นค่ะ","Fifty thousand came in by mistake."],["เขาขอให้โอนคืนเข้าอีกบัญชีหนึ่ง","They want it sent back to a different account."],["ธนาคารคืนให้ตามระบบแล้วค่ะ","The bank returned it properly."],["ยังต้องเคลียร์หนี้ในชื่อหนูอยู่เลย","I'm still clearing the debt in my name."],["บัญชีหนูโดนอายัดแล้ว…","My account's been frozen…"]),
  simswap:sc(["มือถือไม่มีสัญญาณตั้งแต่เมื่อคืน","My phone's had no signal since last night."],["เมื่อวานเจ้าหน้าที่ค่ายเพิ่งโทรมาเอง","A network agent called me just yesterday."],["ตอนนี้ใช้แอปยืนยันตัวตนแล้ว","I use an authenticator app now."],["เสียไปบางส่วน แต่ระงับทัน","Some lost, but locked in time."],["เงินร้านหายหมด…","The restaurant's money is all gone…"]),
  apk:sc(["จอขึ้นว่ากำลังอัปเดต ห้ามปิดเครื่อง","The screen says updating, don't turn it off."],["ลุงลงแอปคืนภาษีที่สรรพากรส่งมา","I installed the tax-refund app they sent."],["ล้างเครื่องแล้ว ลุงจะเตือนเพื่อนๆ","Phone's clean. I'll warn my friends."],["เสียไปเยอะ แต่ยังพอมีเหลือ","Lost a lot, but there's some left."],["เงินขายที่ดินหายหมด…","All the land money is gone…"]),
  deepfake:sc(["ตั้มลูกป้าวิดีโอคอลมา หน้าเขาจริงๆ","My son Tam video-called. It was really him."],["เขาบอกว่ารถชน ต้องการเงินด่วน","He says he crashed and needs money fast."],["บ้านเรามีคำลับแล้วจ้ะ","Our family has a code word now."],["รอดรอบนี้ แต่ญาติคนอื่นโดนต่อ","Safe this time, but other relatives were targeted."],["ป้าโอนไปเกือบล้าน…","I sent almost a million…"]),
  task:sc(["งานกดไลก์ได้เงินจริงนะ ตอนแรก","The like-for-pay job really paid. At first."],["ตอนนี้ต้องเติมอีกสี่แสนห้า","Now I need to top up 450,000."],["บอกพ่อแม่แล้ว เขาช่วยหนูอยู่","I told my parents. They're helping."],["หยุดได้ แต่หนูยังไม่กล้าบอกใคร","I stopped, but I can't tell anyone yet."],["หนูเป็นหนี้เป็นล้านแล้ว…","I owe over a million now…"])
});
Object.assign(EVID,{
  pig:{i:"💘",g:"server",t:["แอปเทรด BitNova Pro","The BitNova Pro app"],d:["ไฟล์แอปโหลดจาก 185.xx.xx.7","The app downloads from 185.xx.xx.7"]},
  bec:{i:"📧",g:"server",t:["อีเมล siamsteel-co.com","siamsteel-co.com email"],d:["ส่งจากเซิร์ฟเวอร์ 185.xx.xx.7","Sent from 185.xx.xx.7"]},
  gold:{i:"🪙",g:"acct",t:["เพจร้านทองปลอม","Fake gold-shop page"],d:["เงินเข้าบัญชีนายสมพงษ์ ร.","Money went to Mr Sompong R."]},
  share:{i:"🪢",g:"acct",t:["บัญชีแม่ท้าวเจน","“Mae Thao Jen” accounts"],d:["วนเงินผ่านบัญชีปวีณาและธนพล","Money cycled via Paweena and Thanaphon"]},
  atm:{i:"☎️",g:"phone",t:["เบอร์ “ปปง.” ปลอม","Fake “AMLO” number"],d:["ซิมล็อตเดียวกับ 02 xxx 8810","Same SIM batch as 02 xxx 8810"]},
  wrong:{i:"💸",g:"acct",t:["บัญชีที่ขอให้โอนคืน","The “send it back” account"],d:["ชื่อ น.ส. ปวีณา (อีกแล้ว!)","Ms Paweena (again!)"]},
  simswap:{i:"📶",g:"phone",t:["ซิมใหม่ในชื่อพี่แจ็ค","Replacement SIM in Jack's name"],d:["ออกด้วยบัตรปลอม ล็อตเดียวกับ 02 xxx 8810","Fake ID, same batch as 02 xxx 8810"]},
  apk:{i:"📲",g:"server",t:["แอป “สรรพากร Refund”","“Revenue Refund” app"],d:["ควบคุมเครื่องจาก 185.xx.xx.7","Controls phones from 185.xx.xx.7"]},
  deepfake:{i:"🎭",g:"server",t:["วิดีโอปลอมหน้าตั้ม","Deepfake of Tam"],d:["สร้างจากคลิปที่เก็บไว้บน 185.xx.xx.7","Built from clips on 185.xx.xx.7"]},
  task:{i:"👍",g:"acct",t:["กลุ่มงานกดไลก์","Like-for-pay group"],d:["เงินมัดจำเข้าบัญชีธนพล ส.","Deposits went to Thanaphon S."]}
});
const ZONE_INTRO2 = {
  9:[t("ศูนย์อาหารตรงนี้ คนจากตึกออฟฟิศฝั่งตรงข้ามมากินข้าวกันเยอะ","Office workers from across the road eat here."),t("หูไวไว้นะ บางทีได้ยินอะไรดีๆ","Keep your ears open. You hear things here.")],
  10:[t("ตลาดนัดคนเยอะ ร้านส่วนใหญ่รับโอนผ่าน QR","The market is busy, and most stalls take QR payments."),t("ก่อนจ่าย ดูชื่อบัญชีให้ตรงกับร้านทุกครั้งนะ","Always check the account name matches the stall before paying.")],
  11:[t("ร้านสะดวกซื้อมีทั้งตู้ ATM และที่จ่ายบิล","The mini mart has an ATM and bill payments."),t("ระวังคนที่ยืนใกล้ตู้ ATM เกินไปด้วยนะ","Watch out for anyone standing too close to the ATM.")],
  12:[t("ร้านหมอโฟนย้ายมาเปิดเป็นร้านจริงแล้ว ซื้ออัปเกรด ซ่อมมือถือได้ที่นี่","Phone Dr. has a real shop now: upgrades and repairs here."),t("แอปที่ลงจากลิงก์แปลกๆ เอามาให้ช่างดูได้","Bring any app you installed from a strange link for a check.")],
  13:[t("หอพักนักศึกษา เด็กปีหนึ่งหลายคนเพิ่งย้ายเข้ามา","The student dorm. Lots of first-years just moved in."),t("คนใหม่ๆ มักโดนหลอกง่าย ช่วยกันดูหน่อยนะ","Newcomers are easy targets. Let's look out for them.")]
};

/* ---------- the food-court scene: overhearing the gang over lunch ---------- */
Object.assign(EVID, { canteen_talk:{i:"🍜",g:"hq",src:"people",t:["บทสนทนาที่ศูนย์อาหาร","Overheard at the food court"],d:["“เป้า 300 สาย กินเสร็จรีบกลับขึ้นชั้น 2”","“300 calls today. Back up to floor 2 after lunch.”"]} });
function playCanteenScene(){
  const A={it:mk("itGuy"), je:mk("jeAdmin"), s1:mk("cin_sc_workMan"), s2:mk("cin_sc_workMom")};
  const seats=[[650,232],[740,232],[650,360],[740,360]];
  const st=[];
  st.push({fn:()=>{ cinPlace(A.it,seats[0][0],seats[0][1],"down"); cinPlace(A.je,seats[1][0],seats[1][1],"down"); cinPlace(A.s1,seats[2][0],seats[2][1],"up"); cinPlace(A.s2,seats[3][0],seats[3][1],"up");
    cinPlace(player,432,560,"up"); }});
  st.push({mv:[[player,520,300,120]],face:[[player,"right"]]});
  st.push({say:["me","(…คนกลุ่มนั้น ช่างเน็ตกับเจ๊ที่ชวนลงทุนนี่นา)","(…that group: the 'technician' and the investment lady)"],t:2.4,em:[[player,"👀",2.4]]});
  st.push({say:["itGuy","เมื่อเช้าเสียบกล่อง Wi-Fi ไว้ที่ร้านกาแฟกับห้องสมุดแล้ว รหัสไหลมาเต็มเลย","Plugged the Wi-Fi boxes into the café and library this morning. Passwords are pouring in."],t:3});
  st.push({say:["jeAdmin","บัญชีม้าชุดใหม่ได้จากเด็กมหาลัยอีก 5 คน จ่ายคนละ 2,000","Got five more mule accounts from uni kids. Two thousand each."],t:3});
  st.push({say:["cin_sc_workMan","เป้าวันนี้ 300 สาย อ้างเป็นธนาคารเหมือนเดิม","Today's target is 300 calls. Pose as the bank as usual."],t:2.8});
  st.push({say:["jeAdmin","กินเสร็จรีบกลับขึ้นชั้น 2 นะ เฮียเงาไม่ชอบให้ใครออกมานาน","Finish up and get back to floor 2. Boss Shadow hates anyone being out long."],t:3});
  st.push({say:["cin_sc_workMom","ตึกเราอยู่ตรงข้ามถนนนี่เอง ยามข้างล่างไม่ให้ใครขึ้นอยู่แล้ว","Our building's just across the road. The guard won't let anyone up anyway."],t:3});
  st.push({mv:[[A.it,420,560,150],[A.je,445,575,150],[A.s1,430,545,150],[A.s2,440,590,150]]});
  st.push({fn:()=>{ [A.it,A.je,A.s1,A.s2].forEach(cinHide); }});
  st.push({say:["me","ตึกตรงข้ามถนน… ชั้น 2… ต้องรีบบอกพี่ภพ!","Across the road… floor 2… I have to tell Phop!"],t:2.6,em:[[player,"❗",2.6]],sfx:"ev"});
  startCinema(st, ()=>{ S.overheard=true; S.seen[9]=true; save(); buildCast(); gainClue("canteen_talk"); hudKey=""; }, {actors:Object.values(A)});
}

/* ---------- bus ---------- */
const BUS_FARE=1;   /* coins: 10 baht */
function nearBus(){ if(S.zone!==0||busy()) return null; return BUS_STOPS.find(b=>Math.hypot(player.x-b.x,player.y-b.y)<80)||null; }
function rideBus(z){
  if(z===S.zone) return;
  if(!zoneOpen(z)){ toast(lockMsg(z)); return; }
  if(S.coins<BUS_FARE){ sfx("bad"); toast(L(`เงินไม่พอค่ารถเมล์ (${BAHT(BUS_FARE)}) เดินไปก่อนนะ`,`Not enough for the bus (${BAHT(BUS_FARE)}). Walk for now`)); return; }
  addCoins(-BUS_FARE); sfx("ping");
  const ov=document.createElement("div"); ov.className="busride"; ov.setAttribute("role","status");
  ov.innerHTML=`<div class="br-road"><svg class="br-bus" viewBox="0 0 160 70" aria-hidden="true"><rect x="4" y="6" width="150" height="48" rx="10" fill="#E5402F" stroke="#141414" stroke-width="4"/><rect x="14" y="14" width="26" height="20" rx="3" fill="#BFE3F2" stroke="#141414" stroke-width="3"/><rect x="46" y="14" width="26" height="20" rx="3" fill="#BFE3F2" stroke="#141414" stroke-width="3"/><rect x="78" y="14" width="26" height="20" rx="3" fill="#BFE3F2" stroke="#141414" stroke-width="3"/><rect x="112" y="14" width="34" height="34" rx="3" fill="#BFE3F2" stroke="#141414" stroke-width="3"/><circle cx="36" cy="56" r="10" fill="#2B2B2B" stroke="#141414" stroke-width="3"/><circle cx="124" cy="56" r="10" fill="#2B2B2B" stroke="#141414" stroke-width="3"/><rect x="10" y="38" width="96" height="8" fill="#FFC414"/></svg></div>
    <b>🚌 ${L("กำลังไป","Riding to")} ${esc(ZONES[z].name[S.lang])}</b><small>${L("ค่ารถ","Fare")} ${BAHT(BUS_FARE)}</small>`;
  document.body.appendChild(ov); arriving=true;
  setTimeout(()=>{ arriving=false; ov.classList.add("out"); setTimeout(()=>ov.remove(),300); if(z===6) goZone(6); else enterZone(z); }, RM?300:1400);
}
function drawBusStops(g){
  for(const b of BUS_STOPS){
    g.fillStyle="rgba(0,0,0,.16)"; g.fillRect(b.x-44,b.y-4,92,8);
    g.fillStyle="#3A3F46"; g.fillRect(b.x-40,b.y-74,6,74); g.fillRect(b.x+34,b.y-74,6,74);
    rr(g,b.x-50,b.y-86,100,16,4); g.fillStyle="#2F6DB5"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    rr(g,b.x-34,b.y-24,68,10,3); g.fillStyle="#C86A3A"; g.fill(); g.lineWidth=2; g.stroke();
    rr(g,b.x+40,b.y-112,30,30,15); g.fillStyle="#FFC414"; g.fill(); g.lineWidth=2.5; g.stroke();
    g.fillStyle=INK; g.font="800 13px 'Noto Sans Thai', sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText("BUS",b.x+55,b.y-97);
    g.fillStyle="#FFFFFF"; g.font="800 11px 'Noto Sans Thai', sans-serif"; g.fillText(L("ป้ายรถเมล์","Bus stop"),b.x,b.y-78);
  }
}

/* ---------- push-button crossings: press and the walk light comes on in about 2 s ---------- */
let pedCallT=-99;
function pedRequest(to){
  const now=performance.now()/1000; if(now-pedCallT<5) return; pedCallT=now;
  const p=tlT%IC_P;
  if(XINGS.includes(to.k)){ if(p<8) tlT+=8-p; }
  else { if(p>=14 && p<22) tlT+=22-p; }
  sfx("blip"); toast(L("🔘 กดปุ่มขอข้ามแล้ว รอไฟคนข้ามเขียวแป๊บเดียว","🔘 Button pressed. The walk light comes on in a moment"));
}
Object.assign(ZONE_INTRO, ZONE_INTRO2);
