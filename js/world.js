/* Map layouts: rooms, the street, the crossroads and the two-floor library. */
/* ---------- world ---------- */
const ROOM_SOLIDS=[
  {x:0,y:0,w:RW,h:108},{x:0,y:0,w:44,h:RH},{x:RW-44,y:0,w:44,h:RH},
  {x:0,y:580,w:384,h:44},{x:480,y:580,w:384,h:44},{x:384,y:612,w:96,h:12},
  {x:528,y:96,w:288,h:90}
];
const ROOM_TABLES=[
  {x:200,y:316,item:"qr"},{x:372,y:182,item:"cups"},{x:200,y:506,item:"laptop"},{x:660,y:430,item:"cups2"}
];
const ROOM_CHAIRS=[{x:262,y:320},{x:438,y:186},{x:136,y:510},{x:604,y:434},{x:716,y:434}];
const ROOM_PLANTS=[{x:76,y:150},{x:78,y:560},{x:790,y:556}];
/* police station: a door on the right wall leads to a separate cell block */
const PDOOR={y0:292,y1:388};
/* cell block: 10 cells, 5 on top and 5 below, corridor down the middle */
const CB_W=23*T, CB_H=13*T, CB_X0=144, CB_CW=184, CB_TOP=250, CB_BOT=396, CB_N=10;
const CB_SOLIDS=[{x:0,y:0,w:CB_W,h:CB_TOP},{x:0,y:CB_BOT,w:CB_W,h:CB_H-CB_BOT},{x:0,y:CB_TOP,w:24,h:CB_BOT-CB_TOP},{x:CB_X0+5*CB_CW,y:CB_TOP,w:CB_W,h:CB_BOT-CB_TOP}];
const cbCell=(i)=>{ const top=i<5, c=i%5, x=CB_X0+c*CB_CW; return {i, top, x, w:CB_CW, cx:x+CB_CW/2, y0:top?70:CB_BOT, y1:top?CB_TOP:CB_H-36}; };
const cbFloor=()=>S.zone===7&&S.floor===2;
ROOM_TABLES.forEach(t=>ROOM_SOLIDS.push({x:t.x-36,y:t.y-20,w:72,h:40}));
ROOM_CHAIRS.forEach(c=>ROOM_SOLIDS.push({x:c.x-14,y:c.y-10,w:28,h:20}));
ROOM_PLANTS.forEach(p=>ROOM_SOLIDS.push({x:p.x-20,y:p.y-14,w:40,h:28}));
const POLICE_SOLIDS=ROOM_SOLIDS.filter(r=>!(r.x===RW-44&&r.y===0)).concat([{x:RW-44,y:0,w:44,h:PDOOR.y0},{x:RW-44,y:PDOOR.y1,w:44,h:RH-PDOOR.y1}]);

/* ---------- outside: the street that links the zones ---------- */
const OW=38*T, OH=23*T;
const BUILDINGS=[
  {zone:1, x:96,  w:360, door:276, name:{th:"Bean House",en:"Bean House"}, sub:{th:"ร้านกาแฟ",en:"Café"}, wall:"#F3E3C8", roof:"#C2552E", sign:"#2E3B33", signFg:"#FFC414"},
  {zone:2, x:540, w:310, door:695, name:{th:"ห้องสมุดเมือง",en:"CITY LIBRARY"}, sub:{th:"2 ชั้น · Wi-Fi ฟรี",en:"2 floors · Free Wi-Fi"}, wall:"#EFE6D6", roof:"#5B3A24", sign:"#3A2516", signFg:"#F2C14E"},
  {zone:3, x:1040, w:304, door:1192, name:{th:"ธนาคารนครทอง",en:"NKT BANK"}, sub:{th:"สาขาตลาด",en:"Market branch"}, wall:"#F1ECE0", roof:"#0F5E46", sign:"#0F5E46", signFg:"#F2C14E"},
  {zone:5, alley:true, x:462, w:72, door:498, name:{th:"ตรอกมืด",en:"Dark alley"}, sub:{th:"",en:""}},
  {zone:6, alley:true, soi:true, road:true, x:850, w:40, door:870, icon:"🎓", col:"#F2C14E", name:{th:"ถนนไป ม.หัวเฉียวฯ",en:"Road to the university"}, sub:{th:"",en:""}},
  {zone:6, alley:true, soi:true, road:true, hide:true, x:1000, w:40, door:1020, icon:"🎓", col:"#F2C14E", name:{th:"ถนนไป ม.หัวเฉียวฯ",en:"Road to the university"}, sub:{th:"",en:""}},
  {zone:7, alley:true, soi:true, x:1350, w:72, door:1386, icon:"🚓", col:"#9CC3F0", name:{th:"ซอย 2 · สถานีตำรวจ",en:"Soi 2 · Police station"}, sub:{th:"",en:""}},
  {zone:4, x:1428, w:360, door:1608, name:{th:"NET ZONE",en:"NET ZONE"}, sub:{th:"ร้านเน็ต · เกม",en:"Internet café · games"}, wall:"#2E3350", roof:"#7A5AA6", sign:"#13162A", signFg:"#5EE6D0"}
];
/* three zebra crossings, each with traffic lights */
const IC={x0:890,x1:1000,y0:612,y1:766};   /* the crossroads: main road x the road up to the university */
const XINGS=[{x0:760,x1:880,sig:"ew",dir:1},{x0:1010,x1:1130,sig:"ew",dir:-1}];
const YXINGS=[{y0:520,y1:600,dir:1},{y0:778,y1:858,dir:-1}];
const TL_P=16, IC_P=28; let tlT=0, xWarnT=0;
function ewState(){ if(CIN&&CIN.allRed) return "r"; const p=tlT%IC_P; return p<8?"g":p<10?"y":"r"; }
function nsState(){ if(CIN&&CIN.allRed) return "r"; const p=tlT%IC_P; return p<14?"r":p<22?"g":p<24?"y":"r"; }
function tlState(xg){ if(xg.sig==="ew") return ewState(); if(xg.sig==="ns") return nsState(); const p=(tlT+xg.ph)%TL_P; return p<9?"g":p<11?"y":"r"; }
const OUT_SOLIDS=[{x:0,y:0,w:OW,h:250},{x:0,y:0,w:28,h:OH},{x:OW-28,y:0,w:28,h:OH},
  ...[0,...XINGS.map(x=>x.x1)].map((a,i)=>({x:a,y:612,w:(i<XINGS.length?XINGS[i].x0:OW)-a,h:154})),
  {x:890,y:250,w:110,h:270},{x:890,y:600,w:110,h:12},{x:890,y:766,w:110,h:12},{x:0,y:858,w:OW,h:OH-858},
  {x:672,y:420,w:96,h:56}];
const OUT_TREES=[{x:80,y:360},{x:80,y:560},{x:500,y:560},{x:1110,y:560},{x:1290,y:360},{x:1360,y:560},{x:1760,y:360},{x:1760,y:560}];
const OUT_BENCHES=[{x:300,y:470},{x:1140,y:470}];
const OUT_LAMPS=[{x:470,y:330},{x:1070,y:330},{x:120,y:600},{x:1240,y:600}];
OUT_TREES.forEach(p=>OUT_SOLIDS.push({x:p.x-22,y:p.y-14,w:44,h:28}));
OUT_BENCHES.forEach(b=>OUT_SOLIDS.push({x:b.x-40,y:b.y-12,w:80,h:22}));
OUT_LAMPS.forEach(l=>OUT_SOLIDS.push({x:l.x-6,y:l.y-6,w:12,h:12}));
const KIOSK={x:790,y:330};
OUT_SOLIDS.push({x:KIOSK.x-26,y:KIOSK.y-14,w:52,h:24});
/* ---------- zone 2: the city library — a bigger, two-floor map ---------- */
const LW=30*T, LH=20*T, LIB_DOOR={x0:672,x1:768};
const LIB_STAIRS={x:1260,y:120,w:120,h:120};
function libWalls(floor){
  const s=[{x:0,y:0,w:LW,h:120},{x:0,y:0,w:44,h:LH},{x:LW-44,y:0,w:44,h:LH},
    {x:LIB_STAIRS.x-12,y:120,w:12,h:120},{x:LIB_STAIRS.x+LIB_STAIRS.w,y:120,w:12,h:120}];
  if(floor===1) s.push({x:0,y:LH-44,w:LIB_DOOR.x0,h:44},{x:LIB_DOOR.x1,y:LH-44,w:LW-LIB_DOOR.x1,h:44},{x:LIB_DOOR.x0,y:LH-12,w:96,h:12});
  else s.push({x:0,y:LH-44,w:LW,h:44});
  return s;
}
const LIB={
  1:{props:[
      {x:220,y:300,item:"shelf"},{x:420,y:300,item:"shelf"},{x:220,y:440,item:"shelf"},{x:420,y:440,item:"shelf"},{x:220,y:580,item:"shelf"},{x:420,y:580,item:"shelf"},
      {x:760,y:330,item:"table"},{x:760,y:530,item:"table"},
      {x:1060,y:320,item:"pc"},{x:1220,y:320,item:"pc"},{x:1060,y:450,item:"pc"},{x:1220,y:450,item:"pc"},
      {x:1060,y:760,item:"desk"},{x:170,y:150,item:"kiosk"}],
    chairs:[{x:700,y:292},{x:820,y:292},{x:700,y:372},{x:820,y:372},{x:700,y:492},{x:820,y:492},{x:700,y:572},{x:820,y:572},
      {x:1060,y:360},{x:1220,y:360},{x:1060,y:490},{x:1220,y:490}],
    plants:[{x:84,y:890},{x:1356,y:890},{x:600,y:150},{x:1356,y:620}]},
  2:{props:[
      {x:200,y:180,item:"carrel"},{x:320,y:180,item:"carrel"},{x:440,y:180,item:"carrel"},{x:560,y:180,item:"carrel"},{x:680,y:180,item:"carrel"},{x:800,y:180,item:"carrel"},{x:920,y:180,item:"carrel"},
      {x:780,y:440,item:"table"},{x:1080,y:440,item:"table"},
      {x:1200,y:690,item:"printer"},{x:720,y:800,item:"sofa"},{x:960,y:800,item:"sofa"}],
    chairs:[{x:200,y:222},{x:320,y:222},{x:440,y:222},{x:560,y:222},{x:680,y:222},{x:800,y:222},{x:920,y:222},
      {x:720,y:402},{x:840,y:402},{x:720,y:482},{x:840,y:482},{x:1020,y:402},{x:1140,y:402},{x:1020,y:482},{x:1140,y:482}],
    plants:[{x:1356,y:890},{x:500,y:890},{x:1356,y:330}],
    rooms:[{x:60,y:300,w:340,h:220,n:"A"},{x:60,y:600,w:340,h:220,n:"B"}]}
};
const LIB_SIZE={shelf:[150,36],table:[200,56],pc:[120,40],desk:[300,60],kiosk:[60,30],carrel:[100,40],printer:[80,44],sofa:[140,40]};
for(const f of [1,2]){
  const L_=LIB[f]; L_.solids=libWalls(f);
  L_.props.forEach(p=>{ const [w,h]=LIB_SIZE[p.item]; L_.solids.push({x:p.x-w/2,y:p.y-h/2,w,h}); });
  L_.chairs.forEach(c=>L_.solids.push({x:c.x-14,y:c.y-10,w:28,h:20}));
  L_.plants.forEach(p=>L_.solids.push({x:p.x-20,y:p.y-14,w:40,h:28}));
  (L_.rooms||[]).forEach(r=>L_.solids.push({x:r.x,y:r.y,w:r.w,h:r.h}));
}
const LIB_ROLES={1:["mentor","grandpa","grandma"],2:["tips","friend"]};
const libFloor=()=>S.floor===2?2:1;
function libCast(mentor, friend, tips){
  const f=libFloor();
  const all=[
    {id:mentor, role:"mentor", x:620, y:850, dir:"up", f:1},
    {id:"uncleYoon", role:"grandpa", x:250, y:206, dir:"left", f:1},
    {id:"grandma", role:"grandma", x:1140, y:600, dir:"up", f:1},
    {id:tips, role:"tips", x:930, y:560, dir:"left", f:2},
    {id:"praeGirl", role:"friend", x:1100, y:700, dir:"right", f:2}
  ];
  return all.filter(n=>n.f===f).map(n=>({...n, home:n.dir}));
}
function inLibExit(){ return S.zone===2 && libFloor()===1 && player.y>LH-50 && player.x>LIB_DOOR.x0 && player.x<LIB_DOOR.x1; }
function inLibStairs(){ return S.zone===2 && player.y<LIB_STAIRS.y+92 && player.x>LIB_STAIRS.x+8 && player.x<LIB_STAIRS.x+LIB_STAIRS.w-8; }
function pendingOnFloor(f){ return LIB_ROLES[f].filter(r=>r!=="mentor").filter(r=>!S.best[ZONES[2].roleCase[r]]).length; }
function askStairs(){
  keys.clear(); target=null; targetNpc=null; player.y=LIB_STAIRS.y+104; player.dir="down";
  const f=libFloor(), o=f===1?2:1, p=pendingOnFloor(o), up=o>f;
  openSheet("stairs", `${top_(L("บันได","Stairs"))}<div class="sh-body">
    <div class="wcomic" style="background:var(--paper);color:var(--ink)"><span class="wv" style="filter:none">${up?"⬆️":"⬇️"}</span><p>${up?L(`จะขึ้นไปชั้น ${o} ไหม?`,`Go up to floor ${o}?`):L(`จะลงไปชั้น ${o} ไหม?`,`Go down to floor ${o}?`)}${p?`<br><small>❗ ${L(`ชั้น ${o} ยังมีคนรอความช่วยเหลือ ${p} คน`,`${p} ${p>1?"people":"person"} on floor ${o} still need help`)}</small>`:""}</p></div>
    <div class="btns"><button class="btn y" data-floor><span>${up?L(`ขึ้นชั้น ${o}`,`Go up`):L(`ลงชั้น ${o}`,`Go down`)}</span></button><button class="btn g" data-close><span>${L(`อยู่ชั้น ${f} ต่อ`,`Stay on floor ${f}`)}</span></button></div></div>`);
  $("sheet").querySelector("[data-floor]").onclick=()=>{ closeSheet(); switchFloor(); };
}
function switchCells(into){
  escort=null; S.floor=into?2:1; save(); setWorld(); buildCast(); drawStatic();
  if(into){ player.x=70; player.y=(CB_TOP+CB_BOT)/2; player.dir="right"; } else { player.x=RW-80; player.y=(PDOOR.y0+PDOOR.y1)/2; player.dir="left"; }
  keys.clear(); target=null; targetNpc=null; endJoy&&endJoy(); sfx("blip"); hudKey=""; hud();
  const jl=jailList().length;
  toast(into?L(`🔒 ห้องขัง · ขังอยู่ ${jl}/${CB_N} ห้อง`,`🔒 Cell block · ${jl}/${CB_N} cells in use`):L("สถานีตำรวจ","Police station"));
}
function switchFloor(){
  escort=null;
  S.floor=libFloor()===1?2:1; save(); setWorld(); buildCast(); drawStatic();
  player.x=LIB_STAIRS.x+LIB_STAIRS.w/2; player.y=LIB_STAIRS.y+150; player.dir="down"; keys.clear(); target=null; targetNpc=null; endJoy&&endJoy();
  if(urgent){ const nn=npcs.find(x=>x.role===urgent.u.role); urgent.n = nn || {...urgent.n, x:-9999, y:-9999}; }
  wifiT=Math.min(wifiT,20); sfx("blip"); hudKey=""; hud();
  const p=pendingOnFloor(S.floor);
  toast(L(`ชั้น ${S.floor}${p?` · มีคนต้องการความช่วยเหลือ ${p} คน`:""}`,`Floor ${S.floor}${p?` · ${p} ${p>1?"people need":"person needs"} help`:""}`));
}
/* static art for each floor */
function drawLibStatic(g){
  const f=libFloor();
  // floor
  if(f===1){ g.fillStyle="#E4C9A0"; g.fillRect(0,0,W,H); g.strokeStyle="rgba(120,80,40,.18)"; g.lineWidth=1.2;
    for(let y=120,r=0;y<H;y+=28,r++){ g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke(); for(let x=(r%2?60:0);x<W;x+=120){ g.beginPath(); g.moveTo(x,y); g.lineTo(x,y+28); g.stroke(); } } }
  else { g.fillStyle="#C9D3DB"; g.fillRect(0,0,W,H); for(let x=0;x<W;x+=60) for(let y=120;y<H;y+=60){ g.fillStyle=((x+y)/60)%2?"#C2CCD5":"#CDD7DF"; g.fillRect(x,y,60,60); } }
  // rug
  if(f===1){ rr(g,560,640,320,170,16); g.fillStyle="#7A2E2E"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    rr(g,574,654,292,142,10); g.setLineDash([8,7]); g.strokeStyle="#F1D7A8"; g.lineWidth=2.5; g.stroke(); g.setLineDash([]);
    g.fillStyle="#F1D7A8"; g.font="800 20px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"WELCOME · QUIET PLEASE":"ยินดีต้อนรับ · โปรดเงียบ",720,725); }
  else { rr(g,580,600,520,140,16); g.fillStyle="#3E5C76"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
    g.fillStyle="#DCE7F0"; g.font="800 20px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"QUIET STUDY ZONE":"โซนอ่านหนังสือเงียบ",840,670); }
  // back wall: built-in bookcases, windows and the sign
  g.fillStyle=f===1?"#5B3A24":"#4A5B6A"; g.fillRect(0,0,W,120);
  g.fillStyle=f===1?"#7A5233":"#5E7182"; g.fillRect(0,104,W,16); g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(0,120); g.lineTo(W,120); g.stroke();
  const BOOK=["#C2552E","#2F6DB5","#FFC414","#2BB673","#7A5AA6","#E05C8A","#F2F2F2"];
  for(let x=60;x<1220;x+=150){ if(x>480&&x<960) continue;
    rr(g,x,10,130,90,3); g.fillStyle="#3A2516"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
    for(let r=0;r<3;r++){ g.fillStyle="#2A1A0F"; g.fillRect(x+4,14+r*29+24,122,3); for(let b=0;b<13;b++){ const bh=16+((b*7+r*3+x)%7); g.fillStyle=BOOK[(b+r+x/150)%BOOK.length|0]; g.fillRect(x+6+b*9,14+r*29+24-bh,7,bh); } } }
  rr(g,500,14,440,80,6); g.fillStyle=f===1?"#173E3C":"#22344A"; g.fill(); g.lineWidth=3; g.strokeStyle=INK; g.stroke();
  g.fillStyle="#F2C14E"; g.font="800 24px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  g.fillText(S.lang==="en"?"CITY LIBRARY":"ห้องสมุดเมือง",720,42);
  g.fillStyle="#E6ECEA"; g.font="600 13px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText(f===1?(S.lang==="en"?"Floor 1 · Books · Computers · Loans":"ชั้น 1 · หนังสือ · คอมพิวเตอร์ · ยืม-คืน"):(S.lang==="en"?"Floor 2 · Study zone · Group rooms · Printing":"ชั้น 2 · โซนอ่าน · ห้องกลุ่ม · ปริ้นต์"),720,72);
  // side + bottom walls
  g.fillStyle=f===1?"#A9805A":"#9AA8B5"; g.fillRect(0,120,44,H); g.fillRect(W-44,120,44,H);
  if(f===1){ g.fillRect(0,H-44,LIB_DOOR.x0,44); g.fillRect(LIB_DOOR.x1,H-44,W-LIB_DOOR.x1,44);
    g.fillStyle="#E4C9A0"; g.fillRect(LIB_DOOR.x0,H-44,96,44); rr(g,LIB_DOOR.x0+4,H-40,42,34,2); g.fillStyle="#BFE0EE"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke(); rr(g,LIB_DOOR.x0+50,H-40,42,34,2); g.fill(); g.stroke(); }
  else g.fillRect(0,H-44,W,44);
  g.strokeStyle=INK; g.lineWidth=3; g.beginPath(); g.moveTo(44,120); g.lineTo(44,H-44); g.lineTo(f===1?LIB_DOOR.x0:W-44,H-44); if(f===1){ g.moveTo(LIB_DOOR.x1,H-44); g.lineTo(W-44,H-44); } g.lineTo(W-44,120); g.stroke();
  // stairs (top-right)
  const st=LIB_STAIRS; g.fillStyle="#8C8C8C"; g.fillRect(st.x,st.y-100,st.w,st.h+100);
  for(let i=0;i<8;i++){ const y=st.y-100+i*27; g.fillStyle=i%2?"#B8B8B8":"#C9C9C9"; g.fillRect(st.x,y,st.w,27); g.strokeStyle="rgba(0,0,0,.35)"; g.lineWidth=2; g.beginPath(); g.moveTo(st.x,y); g.lineTo(st.x+st.w,y); g.stroke(); }
  g.lineWidth=3; g.strokeStyle=INK; g.strokeRect(st.x,st.y-100,st.w,st.h+100);
  g.fillStyle="#7A5233"; g.fillRect(st.x-12,st.y-100,12,st.h+100); g.fillRect(st.x+st.w,st.y-100,12,st.h+100); g.strokeRect(st.x-12,st.y-100,12,st.h+100); g.strokeRect(st.x+st.w,st.y-100,12,st.h+100);
  // glass group-study rooms on floor 2
  for(const r of (LIB[f].rooms||[])){
    rr(g,r.x,r.y,r.w,r.h,6); g.fillStyle="rgba(170,215,235,.55)"; g.fill(); g.lineWidth=4; g.strokeStyle=INK; g.stroke();
    rr(g,r.x+60,r.y+70,r.w-120,r.h-120,6); g.fillStyle="#E9D9BE"; g.fill(); g.lineWidth=2.5; g.stroke();
    for(const dx of [90,170,250]){ g.fillStyle="#2F7F7A"; g.beginPath(); g.arc(r.x+dx,r.y+50,12,0,7); g.fill(); g.stroke(); g.beginPath(); g.arc(r.x+dx,r.y+r.h-30,12,0,7); g.fill(); g.stroke(); }
    g.strokeStyle="rgba(255,255,255,.8)"; g.lineWidth=3; g.beginPath(); g.moveTo(r.x+14,r.y+40); g.lineTo(r.x+40,r.y+14); g.stroke();
    rr(g,r.x+r.w-96,r.y+8,86,24,4); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke();
    g.fillStyle=INK; g.font="700 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?`Group room ${r.n}`:`ห้องกลุ่ม ${r.n}`,r.x+r.w-53,r.y+21);
  }
  // wall sockets
  for(const y of [300,520,760]){ rr(g,W-40,y,14,22,2); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2; g.strokeStyle=INK; g.stroke(); g.fillStyle=INK; g.fillRect(W-36,y+6,2,5); g.fillRect(W-31,y+6,2,5); }
  // router
  rr(g,10,408,26,18,3); g.fillStyle="#F5F1EA"; g.fill(); g.strokeStyle=INK; g.lineWidth=2.5; g.stroke(); g.beginPath(); g.moveTo(15,408); g.lineTo(12,394); g.moveTo(31,408); g.lineTo(34,394); g.stroke();
  g.fillStyle="#2BB673"; g.beginPath(); g.arc(18,417,2.4,0,7); g.fill(); g.fillStyle="#FFC414"; g.beginPath(); g.arc(26,417,2.4,0,7); g.fill();
}
/* live overlay: stair sign with how many people still need help on the other floor */
function drawLibStairSign(g,now){
  if(S.zone!==2) return;
  const f=libFloor(), o=f===1?2:1, p=pendingOnFloor(o), st=LIB_STAIRS, b=RM?0:Math.sin(now/300)*2;
  const label=(S.lang==="en"?`Floor ${o} ${o>f?"↑":"↓"}`:`ชั้น ${o} ${o>f?"↑":"↓"}`)+(p?`  ❗${p}`:"");
  g.font="800 14px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle";
  const tw=g.measureText(label).width+24, x=st.x+st.w/2, y=st.y+st.h+16+b;
  rr(g,x-tw/2,y-15,tw,30,15); g.fillStyle=p?"#FFC414":"#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle=INK; g.fillText(label,x,y+1);
}
const BOOKC=["#C2552E","#2F6DB5","#FFC414","#2BB673","#7A5AA6","#E05C8A","#3B3B3B"];
function drawLibProp(g,t,i){
  const [w,h]=LIB_SIZE[t.item], x=t.x, y=t.y;
  g.fillStyle="rgba(0,0,0,.16)"; g.beginPath(); g.ellipse(x,y+h/2,w/2+4,9,0,0,7); g.fill();
  g.lineWidth=3; g.strokeStyle=INK;
  if(t.item==="shelf"){ // tall double-sided bookcase
    rr(g,x-w/2,y-h/2-58,w,h+58,3); g.fillStyle="#7A5233"; g.fill(); g.stroke();
    for(let r=0;r<3;r++){ const sy=y-h/2-54+r*26; g.fillStyle="#3A2516"; g.fillRect(x-w/2+5,sy,w-10,22);
      for(let b=0;b<15;b++){ const bh=13+((b*5+r*3+i*7)%8); g.fillStyle=BOOKC[(b+r+i)%BOOKC.length]; g.fillRect(x-w/2+8+b*9.2,sy+22-bh,7,bh); } }
    g.fillStyle="#5B3A24"; g.fillRect(x-w/2,y+h/2-14,w,14); g.strokeRect(x-w/2,y-h/2-58,w,h+58);
    return; }
  if(t.item==="table"){ rr(g,x-w/2,y-h/2,w,h,5); g.fillStyle="#C9935D"; g.fill(); g.stroke();
    for(const dx of [-60,0,60]){ rr(g,x+dx-12,y-12,22,16,1.5); g.fillStyle=BOOKC[(dx/60+2+i)%BOOKC.length]; g.fill(); g.lineWidth=1.8; g.stroke(); }
    g.lineWidth=2.5; g.beginPath(); g.moveTo(x+86,y+8); g.lineTo(x+90,y-22); g.lineTo(x+78,y-30); g.stroke(); g.fillStyle="#2BB673"; g.beginPath(); g.arc(x+76,y-28,7,0,Math.PI); g.fill(); g.stroke(); return; }
  if(t.item==="pc"){ rr(g,x-w/2,y-h/2,w,h,3); g.fillStyle="#E6ECEA"; g.fill(); g.stroke();
    for(const dx of [-28,28]){ rr(g,x+dx-20,y-46,40,28,2); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=2.5; g.stroke(); g.fillStyle="#7FB7E8"; g.fillRect(x+dx-16,y-42,32,20); g.fillStyle=INK; g.fillRect(x+dx-3,y-18,6,10); }
    g.fillStyle="#2F6DB5"; g.font="800 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.fillText(S.lang==="en"?"PUBLIC PC":"คอมสาธารณะ",x,y+6); return; }
  if(t.item==="desk"){ rr(g,x-w/2,y-h/2,w,h,4); g.fillStyle="#173E3C"; g.fill(); g.stroke(); rr(g,x-w/2,y-h/2-16,w,22,4); g.fillStyle="#E6ECEA"; g.fill(); g.stroke();
    g.fillStyle="#F2C14E"; g.font="800 15px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"LOANS · INFO · ASK HERE":"ยืม-คืน · สอบถาม · ถามที่นี่",x,y+10);
    rr(g,x-120,y-40,52,30,3); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=2.5; g.stroke(); g.fillStyle="#7CF0C8"; g.fillRect(x-115,y-35,42,18);
    rr(g,x+40,y-42,92,30,3); g.fillStyle="#FFFFFF"; g.fill(); g.stroke(); g.fillStyle=INK; g.font="700 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillText("Wi-Fi: CityLib-Member",x+86,y-32); g.fillText(S.lang==="en"?"pw on library card":"รหัสบนบัตรห้องสมุด",x+86,y-20); return; }
  if(t.item==="kiosk"){ rr(g,x-w/2,y-h/2-56,w,h+56,6); g.fillStyle="#F2F2F2"; g.fill(); g.stroke();
    rr(g,x-w/2+6,y-h/2-50,w-12,18,3); g.fillStyle="#FFC414"; g.fill(); g.lineWidth=2; g.stroke();
    g.fillStyle=INK; g.font="800 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"FREE CHARGE":"ชาร์จฟรี",x,y-h/2-41);
    for(let k=0;k<4;k++){ const cx=x-21+k*12; g.fillStyle="#3B3B3B"; g.fillRect(cx,y-h/2-24,6,8); g.strokeStyle="#3B3B3B"; g.lineWidth=2; g.beginPath(); g.moveTo(cx+3,y-h/2-16); g.quadraticCurveTo(cx+3+(k-1.5)*6,y,cx+1,y+h/2-2); g.stroke(); }
    g.fillStyle="#E5402F"; g.beginPath(); g.arc(x+w/2-8,y+h/2-8,3,0,7); g.fill(); return; }
  if(t.item==="carrel"){ rr(g,x-w/2,y-h/2,w,h,3); g.fillStyle="#E9D9BE"; g.fill(); g.stroke();
    g.fillStyle="#5E7182"; g.fillRect(x-w/2,y-h/2-34,6,h+34); g.fillRect(x+w/2-6,y-h/2-34,6,h+34); g.fillRect(x-w/2,y-h/2-34,w,8); g.strokeRect(x-w/2,y-h/2-34,w,h+34);
    rr(g,x-14,y-10,28,18,2); g.fillStyle=BOOKC[i%BOOKC.length]; g.fill(); g.lineWidth=2; g.stroke();
    g.fillStyle="#FFE9A8"; g.beginPath(); g.arc(x+30,y-22,5,0,7); g.fill(); return; }
  if(t.item==="printer"){ rr(g,x-w/2,y-h/2-20,w,h+20,5); g.fillStyle="#E6ECEA"; g.fill(); g.stroke(); rr(g,x-w/2+8,y-h/2-12,w-16,12,2); g.fillStyle="#2B3A3F"; g.fill(); g.lineWidth=2; g.stroke();
    g.fillStyle="#FFFFFF"; g.fillRect(x-18,y-h/2-26,36,10); g.strokeRect(x-18,y-h/2-26,36,10);
    g.fillStyle=INK; g.font="800 9px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.textAlign="center"; g.textBaseline="middle"; g.fillText(S.lang==="en"?"PRINT":"ปริ้นต์",x,y+6); return; }
  if(t.item==="sofa"){ rr(g,x-w/2,y-h/2-14,w,h+14,10); g.fillStyle="#C2552E"; g.fill(); g.stroke(); rr(g,x-w/2+10,y-h/2+4,w-20,h-10,6); g.fillStyle="#D9734B"; g.fill(); g.lineWidth=2; g.stroke(); return; }
}
function drawLibChair(g,c){
  g.fillStyle="rgba(0,0,0,.14)"; g.fillRect(c.x-12,c.y+8,26,4);
  rr(g,c.x-13,c.y-14,26,24,4); g.fillStyle=libFloor()===1?"#8A5A33":"#3E5C76"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle="rgba(255,255,255,.18)"; g.fillRect(c.x-9,c.y-10,18,5);
}
let SOLIDS=ROOM_SOLIDS, TABLES=ROOM_TABLES, CHAIRS=ROOM_CHAIRS, PLANTS=ROOM_PLANTS;
function setWorld(){
  if(S.zone===0){ W=OW; H=OH; SOLIDS=OUT_SOLIDS; TABLES=[]; CHAIRS=[]; PLANTS=[]; }
  else if(S.zone===2){ const L_=LIB[libFloor()]; W=LW; H=LH; SOLIDS=L_.solids; TABLES=L_.props; CHAIRS=L_.chairs; PLANTS=L_.plants; }
  else if(S.zone===8){ W=RW; H=RH; SOLIDS=offSolids(); TABLES=[]; CHAIRS=[]; PLANTS=[]; }
  else if(S.zone===7){ if(cbFloor()){ W=CB_W; H=CB_H; SOLIDS=CB_SOLIDS; TABLES=[]; CHAIRS=[]; PLANTS=[]; } else { W=RW; H=RH; SOLIDS=POLICE_SOLIDS; TABLES=ROOM_TABLES; CHAIRS=ROOM_CHAIRS; PLANTS=ROOM_PLANTS; } }
  else { W=RW; H=RH; SOLIDS=ROOM_SOLIDS; TABLES=ROOM_TABLES; CHAIRS=ROOM_CHAIRS; PLANTS=ROOM_PLANTS; }
}
const bOf=(z)=>BUILDINGS.find(b=>b.zone===z);

let player={id:"studentGirl",x:432,y:500,dir:"down",moving:false,t:0};
let npcs=[];
function buildCast(){ buildCast0(); addFillers(); }
function buildCast0(){
  const others=PLAYABLE.filter(c=>c!==S.char);
  const mentor = "volOat";
  const rest = others;
  const friend = rest.find(c=>c.startsWith("student"));
  const tips = rest.find(c=>c!==friend && c!=="guardBoy") || rest.find(c=>c!==friend);
  if(S.zone===0){
    npcs=[{id:mentor, role:"mentor", x:600, y:360, dir:"down"},{id:tips, role:"tips", x:1060, y:470, dir:"left"},
      {id:"grandma", role:"grandma", x:236, y:520, dir:"right"},{id:"grandpa", role:"grandpa", x:1200, y:380, dir:"left"},{id:"fon", role:"fon", x:400, y:420, dir:"down"},{id:"techTon", role:"repairman", x:REPAIR.x+56, y:REPAIR.y+6, dir:"left"}].map(n=>({...n, home:n.dir}));
    player.id=S.char; return;
  }
  if(S.zone===2){ npcs=libCast(mentor,friend,tips); player.id=S.char; return; }
  if(S.zone===8){ npcs=officeCast().map(n=>({...n, home:n.dir})); player.id=S.char; return; }
  if(S.zone===6){
    npcs=[{id:mentor, role:"mentor", x:528, y:548, dir:"up"},{id:friend, role:"friend", x:268, y:514, dir:"right"},{id:tips, role:"tips", x:690, y:232, dir:"down"},
      {id:"paweena", role:"paweena", x:132, y:322, dir:"right"},{id:"prof", role:"prof", x:308, y:190, dir:"down"}].map(n=>({...n, home:n.dir}));
    player.id=S.char; return;
  }
  if(S.zone===7){
    if(cbFloor()){
      npcs=jailList().map((j,i)=>{ const c=cbCell(i%CB_N), k=Math.floor(i/CB_N); return {id:"j_"+j.b, role:"prisoner", x:c.cx+(k?(k%2?-44:44):0), y:c.top?214:452, dir:c.top?"down":"up", jz:j.z, cell:c.i}; }).map(n=>({...n, home:n.dir}));
      player.id=S.char; return;
    }
    npcs=[{id:"police", role:"police", x:672, y:226, dir:"down"},{id:"grandpa", role:"grandpa", x:132, y:322, dir:"right"},{id:"visitor", role:"visitor", x:268, y:514, dir:"right"}];
    npcs.push({id:mentor, role:"mentor", x:528, y:548, dir:"up"});
    npcs=npcs.map(n=>({...n, home:n.dir})); player.id=S.char; return;
  }
  if(S.zone===5){
    const freed=(k)=>S.best[k] && S.best[k]!=="danger";
    npcs=[
      {id:mentor, role:"mentor", x:528, y:548, dir:"up"},
      {id:"ghostChoy", role:"grandma", x:140, y:250, dir:"down", ghost:true},
      {id:"ghostHem", role:"grandpa", x:330, y:236, dir:"down", ghost:true},
      {id:"ghostPaeng", role:"tips", x:716, y:500, dir:"left", ghost:true},
      {id:"ghostTong", role:"friend", x:268, y:514, dir:"left", ghost:true}
    ].filter(n=>!n.ghost || !freed(ZONES[5].roleCase[n.role])).map(n=>({...n, home:n.dir}));
    player.id=S.char; return;
  }
  if(S.zone===4){
    npcs=[
      {id:mentor, role:"mentor", x:528, y:548, dir:"up"},
      {id:"phum", role:"friend", x:268, y:514, dir:"left"},
      {id:"baitoey", role:"tips", x:716, y:500, dir:"left"},
      {id:"chai", role:"grandpa", x:620, y:236, dir:"down"},
      {id:"grandma", role:"grandma", x:132, y:322, dir:"right"},
      ...((S.bustTier||0)>=3?[]:[{id:"itGuy", role:"clue_it", x:440, y:330, dir:"down"}])
    ].map(n=>({...n, home:n.dir}));
    player.id=S.char; return;
  }
  if(S.zone===3){
    npcs=[
      {id:mentor, role:"mentor", x:528, y:548, dir:"up"},
      {id:"grandma", role:"grandma", x:640, y:250, dir:"down"},
      {id:"grandpa", role:"grandpa", x:96, y:250, dir:"up"},
      {id:friend, role:"friend", x:330, y:236, dir:"up"},
      {id:"pTai", role:"tips", x:716, y:506, dir:"left"},
      {id:"tellerNun", role:"teller", x:587, y:104, dir:"down"},
      ...((S.bustTier||0)>=4?[]:[{id:"jeAdmin", role:"clue_admin", x:200, y:470, dir:"right"}])
    ].map(n=>({...n, home:n.dir}));
    player.id=S.char; return;
  }
  npcs=[
    {id:mentor, role:"mentor", x:528, y:548, dir:"up"},
    {id:"grandma", role:"grandma", x:132, y:322, dir:"right"},
    {id:"grandpa", role:"grandpa", x:308, y:190, dir:"right"},
    {id:friend, role:"friend", x:268, y:514, dir:"left"},
    {id:tips, role:"tips", x:690, y:232, dir:"down"}
  ].map(n=>({...n, home:n.dir}));
  player.id=S.char;
}
const caseOf = (n)=>ZN().roleCase[n.role];
const doneCount = ()=>ZN().cases.filter(k=>S.best[k]).length;
