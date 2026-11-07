/* Boot: load images and start the game. */
/* ---------- boot ---------- */
let last=performance.now();
function frame(now){
  const dt=Math.min(0.05,(now-last)/1000); last=now;
  if(S.char) step(dt);
  updateCam(); render(now); hud();
  requestAnimationFrame(frame);
}
document.documentElement.lang=S.lang;
resize();
setWorld();
if(S.char) buildCast();
Promise.all([loadImages(), document.fonts?document.fonts.ready:Promise.resolve()]).then(()=>{ drawStatic(); });
/* canvas text uses the same Thai webfont as the measuring span; once it arrives, redraw so centred text lines up */
if(document.fonts&&document.fonts.load){ Promise.all(["600","700","800"].map(w=>document.fonts.load(`${w} 16px 'Noto Sans Thai'`,"ก"))).then(()=>{ drawStatic(); }).catch(()=>{}); document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",()=>drawStatic()); }
drawStatic();
openStart();
requestAnimationFrame(frame);
