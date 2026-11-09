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

function seeded(seed){ let a=seed>>>0; return ()=>{ a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
/* ---------- outside: a storybook town. Each building sits on its own lot, brick paths wind between them,
   one main road runs across the top third, and a river runs down the right side and curls along the bottom ---------- */
const OW=2560, OH=3520;
const AVE={y0:1060,y1:1180};
const OFF_TOP=3170, OFF_H=280;
/* lots: a patch of lawn (or paving) with a hedge round it, one per building or park */
const LOTS=[
  {x:70,y:120,w:620,h:400,fence:true},{x:770,y:120,w:620,h:400},{x:1470,y:110,w:620,h:420,park:true},
  {x:70,y:620,w:620,h:380},{x:770,y:620,w:620,h:380},{x:1470,y:620,w:620,h:380},
  {x:70,y:1250,w:620,h:420,plaza:true},{x:770,y:1250,w:620,h:420,plaza:true},{x:1470,y:1250,w:620,h:420,plaza:true},
  {x:70,y:1770,w:620,h:400,fence:true},{x:770,y:1770,w:620,h:400,park:true},{x:1470,y:1770,w:620,h:400,park:true},
  {x:50,y:2290,w:700,h:500,fence:true},{x:830,y:2290,w:560,h:500},{x:1470,y:2290,w:620,h:500,park:true}
];
const BUILDINGS=[
  {zone:13, style:"house", x:220, w:320, y0:230, door:380, front:560, name:{th:"หอพักนักศึกษา",en:"STUDENT DORM"}, sub:{th:"หอใน ม.หัวเฉียวฯ",en:"Huachiew dorm"}, wall:"#F7F4EE", roof:"#2F5FB0", sign:"#4A2B5A", signFg:"#F6D9FF"},
  {zone:9, style:"awning", x:920, w:320, y0:230, door:1080, front:560, name:{th:"ศูนย์อาหาร",en:"FOOD COURT"}, sub:{th:"อร่อย ราคาเบา",en:"Cheap and tasty"}, wall:"#FBEFD9", roof:"#E77FA0", sign:"#7A3B12", signFg:"#FFE08A"},
  {zone:10, style:"awning", x:210, w:340, y0:700, door:380, front:1094, name:{th:"ตลาดนัด",en:"MARKET"}, sub:{th:"ของกิน ของใช้",en:"Food and goods"}, wall:"#F6F1E4", roof:"#2E9A6E", sign:"#5A2A1A", signFg:"#FFD84D"},
  {zone:4, style:"awning", x:910, w:340, y0:700, door:1080, front:1094, name:{th:"NET ZONE",en:"NET ZONE"}, sub:{th:"ร้านเน็ต · เกม",en:"Internet café · games"}, wall:"#EEEAF6", roof:"#7A5AA6", sign:"#13162A", signFg:"#5EE6D0"},
  {zone:12, style:"awning", x:1630, w:300, y0:700, door:1780, front:1094, name:{th:"หมอโฟน ไอที",en:"PHONE DR. IT"}, sub:{th:"มือถือ · ซ่อม",en:"Phones · repair"}, wall:"#E8F1F8", roof:"#2F6DB5", sign:"#173D66", signFg:"#7FD3F7"},
  {zone:11, style:"flat", x:220, w:320, y0:1310, door:380, front:1720, name:{th:"ร้านสะดวกซื้อ",en:"MINI MART"}, sub:{th:"เปิด 24 ชั่วโมง",en:"Open 24 hours"}, wall:"#F4F7F2", roof:"#2F6DB5", sign:"#1F6E43", signFg:"#FFFFFF"},
  {zone:3, style:"flat", x:920, w:320, y0:1310, door:1080, front:1720, name:{th:"ธนาคารนครทอง",en:"NKT BANK"}, sub:{th:"สาขาตลาด",en:"Market branch"}, wall:"#EEF3F7", roof:"#0F5E46", sign:"#0F5E46", signFg:"#F2C14E"},
  {zone:1, style:"awning", x:1620, w:320, y0:1310, door:1780, front:1720, name:{th:"Bean House",en:"Bean House"}, sub:{th:"ร้านกาแฟ",en:"Café"}, wall:"#FFF3E6", roof:"#E5677F", sign:"#2E3B33", signFg:"#FFC414", cup:true},
  {zone:7, style:"house", x:210, w:340, y0:1830, door:380, front:2240, name:{th:"สถานีตำรวจ",en:"POLICE"}, sub:{th:"ตำรวจไซเบอร์",en:"Cyber police"}, wall:"#F2F2EE", roof:"#3E4660", sign:"#173D66", signFg:"#FFFFFF"},
  {zone:6, style:"school", x:140, w:520, y0:2360, door:400, front:2850, name:{th:"ม.หัวเฉียวฯ",en:"HUACHIEW UNI"}, sub:{th:"มหาวิทยาลัย",en:"University"}, wall:"#F2D58A", roof:"#2F5FB0", sign:"#7A2E1A", signFg:"#FFE08A"},
  {zone:2, style:"museum", x:920, w:380, y0:2360, door:1110, front:2850, name:{th:"ห้องสมุดเมือง",en:"CITY LIBRARY"}, sub:{th:"2 ชั้น",en:"2 floors"}, wall:"#E9E4DA", roof:"#AEB4BC", sign:"#3A2516", signFg:"#F2C14E"},
  {zone:5, style:"house", ghost:true, x:1980, w:300, y0:3190, door:2130, front:3460, name:{th:"บ้านร้างในป่า",en:"THE OLD HOUSE"}, sub:{th:"ว่ากันว่ามีผี…",en:"They say it's haunted…"}, wall:"#5A4E66", roof:"#2A2238", sign:"#1A1424", signFg:"#C9B8F0"}
];
BUILDINGS.forEach(b=>b.bot=b.y0+190);
/* the river: down the right side, then curling west along the bottom */
const RIVER=[[2300,-40],[2250,300],[2320,700],[2240,1100],[2310,1500],[2240,1900],[2300,2300],[2230,2700],[2050,2960],[1700,3050],[1300,3030],[900,3070],[500,3040],[100,3080],[-60,3060]], RIVER_W=110;
function riverSamples(){
  if(riverSamples.c) return riverSamples.c;
  const P=RIVER, out=[]; const seg=(a,c,b)=>{ for(let t=0;t<1;t+=.02){ const u=1-t; out.push([u*u*a[0]+2*u*t*c[0]+t*t*b[0], u*u*a[1]+2*u*t*c[1]+t*t*b[1]]); } };
  let cur=P[0];
  for(let i=1;i<P.length-1;i++){ const m=[(P[i][0]+P[i+1][0])/2,(P[i][1]+P[i+1][1])/2]; seg(cur,P[i],m); cur=m; }
  out.push(cur,P[P.length-1]); return (riverSamples.c=out);
}
function riverDist(x,y){ let d=1e9; for(const p of riverSamples()){ const k=Math.hypot(x-p[0],y-p[1]); if(k<d) d=k; } return d; }
/* bridges: across (h = walk east-west over a north-south river) or v */
const BRIDGES=[{x:2280,y:560,dir:"h",kind:"wood",half:44},{x:2275,y:1120,dir:"h",kind:"road",half:62},{x:2275,y:2240,dir:"h",kind:"wood",half:44},
  {x:1120,y:3045,dir:"v",kind:"stone",half:56},{x:1880,y:3010,dir:"v",kind:"wood",half:44}];
/* brick paths (centre lines) */
const PATHS=[
  [[30,565],[300,575],[720,548],[1100,572],[1420,556],[1800,575],[2150,560],[2330,560],[2540,566]],
  [[30,1720],[300,1735],[720,1712],[1100,1730],[1420,1714],[1800,1734],[2150,1716]],
  [[30,2240],[300,2252],[720,2228],[1100,2248],[1420,2232],[1800,2246],[2150,2236],[2330,2240],[2540,2236]],
  [[30,2850],[300,2862],[720,2840],[1120,2858],[1420,2846],[1800,2862],[2120,2850]],
  [[730,140],[700,340],[748,560],[716,820],[736,1060]],[[1420,140],[1440,340],[1404,560],[1440,820],[1424,1060]],
  [[730,1180],[710,1460],[742,1720],[712,1990],[736,2240],[700,2540],[730,2850]],[[1420,1180],[1440,1460],[1404,1720],[1436,1990],[1414,2240],[1444,2540],[1420,2850]],
  [[2150,560],[2130,820],[2160,1060]],[[2150,1180],[2170,1460],[2140,1716],[2170,1990],[2150,2236],[2170,2540],[2120,2850]],
  [[1120,2858],[1110,2960],[1120,3130],[700,3125],[300,3132]],[[1120,3130],[1500,3120],[1880,3125],[1880,2930],[2050,2880]],[[1880,3125],[1850,3300],[1900,3462],[2130,3466]]
];
function pathYAt(P,x){ for(let i=1;i<P.length;i++){ const [ax,ay]=P[i-1],[bx,by]=P[i]; if(x<=bx){ const k=(x-ax)/(bx-ax); return ay+(by-ay)*k; } } return P[P.length-1][1]; }
const FOUNTAIN={x:1760,y:2520}, POND={x:1800,y:270,rx:160,ry:80}, GAZEBO={x:2000,y:440};
const BEDS=[{x:1080,y:1960,rx:170,ry:80}];
const PLAY=[{k:"slide",x:180,y:2690},{k:"swing",x:600,y:2700}];
const OUT_SOLIDS=[{x:0,y:0,w:OW,h:60},{x:0,y:0,w:28,h:OH},{x:OW-28,y:0,w:28,h:OH},{x:0,y:OH-24,w:OW,h:24},
  ...BUILDINGS.map(b=>({x:b.x-14,y:b.y0-60,w:b.w+28,h:250})),
  {x:FOUNTAIN.x-62,y:FOUNTAIN.y-22,w:124,h:56},{x:POND.x-POND.rx*.9,y:POND.y-POND.ry*.8,w:POND.rx*1.8,h:POND.ry*1.6},{x:GAZEBO.x-50,y:GAZEBO.y-30,w:100,h:50},
  ...BEDS.map(d=>({x:d.x-d.rx*.85,y:d.y-d.ry*.7,w:d.rx*1.7,h:d.ry*1.4})),
  ...PLAY.map(p=>({x:p.x-46,y:p.y-30,w:92,h:44}))];
(()=>{ const r=RIVER_W/2-8;
  const P=riverSamples();
  P.forEach(([x,y],i)=>{
    if(BRIDGES.some(b=>b.dir==="h"?Math.abs(y-b.y)<b.half-6&&Math.abs(x-b.x)<140:Math.abs(x-b.x)<b.half-6&&Math.abs(y-b.y)<140)) return;
    const q=P[Math.min(P.length-1,i+1)], p0=P[Math.max(0,i-1)], vert=Math.abs(q[1]-p0[1])>=Math.abs(q[0]-p0[0]);
    OUT_SOLIDS.push(vert?{x:x-r,y:y-7,w:r*2,h:14}:{x:x-7,y:y-r,w:14,h:r*2});
  }); })();
/* no traffic lights or cars any more */
const IC={x0:-9999,x1:-9998,y0:-9999,y1:-9998};
const XINGS=[], YXINGS=[];
const TL_P=16, IC_P=28; let tlT=0, xWarnT=0;
function ewState(){ return "r"; }
function nsState(){ return "r"; }
function tlState(xg){ return "r"; }
const OUT_BENCHES=[{x:1600,y:2400},{x:1920,y:2400},{x:1300,y:1960},{x:860,y:1960},{x:1640,y:460}];
const OUT_LAMPS=[{x:640,y:520},{x:1360,y:520},{x:640,y:1690},{x:1360,y:1690},{x:640,y:2200},{x:1360,y:2200},{x:1600,y:2800},{x:640,y:2800}];
const BUS_STOPS=[{x:560,y:1048},{x:1260,y:1048},{x:1960,y:1048}];
const KIOSK={x:1580,y:420};
/* trees fill every gap that isn't a building, path, river, road or park piece */
const OUT_TREES=(()=>{
  const r=seeded(4242), out=[], segd=(x,y,P)=>{ let d=1e9; for(let i=1;i<P.length;i++){ const [ax,ay]=P[i-1],[bx,by]=P[i], dx=bx-ax, dy=by-ay, k=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy||1))); d=Math.min(d,Math.hypot(x-ax-dx*k,y-ay-dy*k)); } return d; };
  const clear=(x,y)=>{
    if(x<50||x>OW-50||y<100||y>OH-40) return false;
    if(BUILDINGS.some(b=>x>b.x-60&&x<b.x+b.w+60&&y>b.y0-90&&y<b.bot+90)) return false;
    if(y>AVE.y0-60&&y<AVE.y1+50) return false;
    if(riverDist(x,y)<RIVER_W) return false;
    if(Math.hypot(x-FOUNTAIN.x,y-FOUNTAIN.y)<190||Math.hypot((x-POND.x)/POND.rx,(y-POND.y)/POND.ry)<1.6||Math.hypot(x-GAZEBO.x,y-GAZEBO.y)<110||Math.hypot(x-KIOSK.x,y-KIOSK.y)<100) return false;
    if(BEDS.some(d=>Math.hypot((x-d.x)/d.rx,(y-d.y)/d.ry)<1.6)||PLAY.some(p=>Math.hypot(x-p.x,y-p.y)<120)) return false;
    if(y>OFF_TOP-90&&y<OFF_TOP+OFF_H+40&&x<1500) return false;
    if(LOTS.filter(l=>l.plaza).some(l=>x>l.x&&x<l.x+l.w&&y>l.y&&y<l.y+l.h)) return false;
    if(PATHS.some(P=>segd(x,y,P)<72)) return false;
    if([...OUT_BENCHES,...OUT_LAMPS,...BUS_STOPS].some(o=>Math.hypot(x-o.x,y-o.y)<90)) return false;
    if(out.some(o=>Math.hypot(x-o.x,y-o.y)<100)) return false;
    return true; };
  for(let gy=110;gy<OH;gy+=95) for(let gx=50;gx<OW;gx+=105){ const x=gx+r()*70, y=gy+r()*60; if(clear(x,y)) out.push({x:Math.round(x),y:Math.round(y),pink:r()<.33}); }
  return out;
})();
OUT_TREES.forEach(p=>OUT_SOLIDS.push({x:p.x-22,y:p.y-14,w:44,h:28}));
OUT_BENCHES.forEach(b=>OUT_SOLIDS.push({x:b.x-40,y:b.y-12,w:80,h:22}));
OUT_LAMPS.forEach(l=>OUT_SOLIDS.push({x:l.x-6,y:l.y-6,w:12,h:12}));
BUS_STOPS.forEach(b=>OUT_SOLIDS.push({x:b.x-44,y:b.y-8,w:88,h:12}));
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
const LIB_ROLES={1:["mentor","grandpa","grandma"],2:["tips"]};
const libFloor=()=>S.floor===2?2:1;
function libCast(mentor, friend, tips){
  const f=libFloor();
  const all=[
    {id:mentor, role:"mentor", x:620, y:850, dir:"up", f:1},
    {id:"uncleYoon", role:"grandpa", x:250, y:206, dir:"left", f:1},
    {id:"auntDaeng", role:"grandma", x:1140, y:600, dir:"up", f:1},
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
  escort=null; S.floor=into?2:1; markExitSeen(into?"cells":"station"); save(); setWorld(); buildCast(); drawStatic();
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
  else if(ROOMS2[S.zone]){ W=RW; H=RH; SOLIDS=ROOMS2[S.zone].solids; TABLES=[]; CHAIRS=[]; PLANTS=[]; }
  else { W=RW; H=RH; SOLIDS=ROOM_SOLIDS; TABLES=ROOM_TABLES; CHAIRS=ROOM_CHAIRS; PLANTS=ROOM_PLANTS; }
}
const bOf=(z)=>BUILDINGS.find(b=>b.zone===z);

let player={id:"studentGirl",x:432,y:500,dir:"down",moving:false,t:0};
let npcs=[];
function buildCast(){ buildCast0(); const mo=MOVED_OUT[S.zone]||[]; npcs=npcs.filter(n=>!mo.includes(n.role)); addFillers(); }
function buildCast0(){
  const others=PLAYABLE.filter(c=>c!==S.char);
  const mentor = "volOat";
  const rest = others;
  const friend0 = rest.find(c=>c.startsWith("student"));
  const friend = ({1:"pBoss",3:"pMay",6:"ton"})[S.zone] || friend0;
  const tips = ({0:"rider",1:"rider",2:"jayFresh",6:"mew"})[S.zone] || rest.find(c=>c!==friend0 && c!=="guardBoy") || rest.find(c=>c!==friend0);
  if(S.zone===0){
    npcs=[{id:mentor, role:"mentor", x:900, y:620, dir:"down"},{id:tips, role:"tips", x:1240, y:1220, dir:"left"},
      {id:"grandma", role:"grandma", x:520, y:1790, dir:"right"},{id:"grandpa", role:"grandpa", x:1560, y:2290, dir:"left"},{id:"fon", role:"fon", x:600, y:1220, dir:"down"},{id:"techTon", role:"repairman", x:REPAIR.x+56, y:REPAIR.y+6, dir:"left"}].map(n=>({...n, home:n.dir}));
    player.id=S.char; return;
  }
  if(S.zone===2){ npcs=libCast(mentor,friend,tips); player.id=S.char; return; }
  if(ROOMS2[S.zone]){ npcs=cast2(mentor,friend0).map(n=>({...n, home:n.dir})); player.id=S.char; return; }
  if(S.zone===8){ npcs=officeCast().map(n=>({...n, home:n.dir})); player.id=S.char; return; }
  if(S.zone===6){
    npcs=[{id:mentor, role:"mentor", x:528, y:548, dir:"up"},{id:friend, role:"friend", x:268, y:514, dir:"right"},{id:tips, role:"tips", x:690, y:232, dir:"down"},
      {id:"paweena", role:"paweena", x:132, y:322, dir:"right"},{id:"prof", role:"prof", x:308, y:190, dir:"down"},
      ...(S.briefed?[]:[{id:"police", role:"briefing", x:470, y:430, dir:"down"},{id:"cin_cop1", role:"briefing", x:400, y:410, dir:"down"}])].map(n=>({...n, home:n.dir}));
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
      {id:"maePu", role:"grandma", x:132, y:322, dir:"right"},
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
const caseOf = (n)=>casesOpen(S.zone)?ZN().roleCase[n.role]:undefined;
const doneCount = ()=>ZN().cases.filter(k=>S.best[k]).length;
