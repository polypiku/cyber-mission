/* The "เตือนภัยกัน" app: a photo-feed style list of people's scam stories. Tap a post to read the story,
   the warning signs and how to protect yourself. The first read of each post pays a small reward. */
let feedTag="all";
const feedUnread=()=>FEED.filter(p=>!(S.feedRead||{})[p.id]).length;
const fmtK=n=>n>=1000?(n/1000).toFixed(1).replace(/\.0$/,"")+"k":String(n);
function feedCard(p,li){
  return `<div class="fd-pic" style="--fc:${p.c}"><span class="fd-emo" aria-hidden="true">${p.emo}</span><b>${esc(p.pic[li])}</b></div>`;
}
function openFeed(){
  const li=EN()?1:0, R=S.feedRead||{};
  const list=FEED.filter(p=>feedTag==="all"||p.tag===feedTag);
  const inner=`<div class="fd">
    <div class="fd-tags" role="tablist">${Object.entries(FEED_TAGS).map(([k,v])=>`<button class="fd-tag ${feedTag===k?"on":""}" data-fdtag="${k}" role="tab" aria-selected="${feedTag===k}">${esc(v[li])}</button>`).join("")}</div>
    ${list.map(p=>`<article class="fd-post">
      <header><span class="fd-av" style="background:${p.c}">${p.av}</span><b>${esc(p.u)}</b><small>· ${esc(p.ago[li])}</small>${R[p.id]?"":`<i class="fd-new">${L("ใหม่","New")}</i>`}</header>
      <button class="fd-open" data-fdpost="${p.id}" aria-label="${esc(p.pic[li])}">${feedCard(p,li)}</button>
      <div class="fd-acts" aria-hidden="true"><span>♡</span><span>💬</span><span>➤</span><span class="fd-save">🔖</span></div>
      <p class="fd-likes">${fmtK(p.likes)} ${L("ถูกใจ","likes")}</p>
      <p class="fd-cap"><b>${esc(p.u)}</b> ${esc(p.cap[li])}</p>
      <button class="fd-more" data-fdpost="${p.id}">${L("อ่านเรื่องเต็มและวิธีป้องกัน ›","Read the story and how to stay safe ›")}</button>
    </article>`).join("")}</div>`;
  phoneScreen(L("เตือนภัยกัน","Scam Alert"), inner);
  $("sheet").querySelectorAll("[data-fdtag]").forEach(b=>b.onclick=()=>{ feedTag=b.dataset.fdtag; openFeed(); });
  $("sheet").querySelectorAll("[data-fdpost]").forEach(b=>b.onclick=()=>openFeedPost(b.dataset.fdpost));
}
function openFeedPost(id){
  const p=FEED.find(x=>x.id===id); if(!p) return; const li=EN()?1:0;
  S.feedRead=S.feedRead||{}; let first=false;
  if(!S.feedRead[id]){ S.feedRead[id]=1; first=true; addCoins(5); S.bars.privacy=Math.min(100,S.bars.privacy+1); save(); hudKey=""; }
  const inner=`<div class="fd fd-one">
    <button class="ph-back" data-fdback>‹ ${L("ฟีด","Feed")}</button>
    <article class="fd-post">
      <header><span class="fd-av" style="background:${p.c}">${p.av}</span><b>${esc(p.u)}</b><small>· ${esc(FEED_TAGS[p.tag][li])}</small></header>
      ${feedCard(p,li)}
      <p class="fd-likes">${fmtK(p.likes)} ${L("ถูกใจ","likes")}</p>
      <p class="fd-story">${esc(p.story[li])}</p>
      <div class="fd-box warn"><h4>🚩 ${L("สัญญาณเตือน","Warning signs")}</h4><ul>${p.signs.map(x=>`<li>${esc(x[li])}</li>`).join("")}</ul></div>
      <div class="fd-box ok"><h4>🛡️ ${L("ป้องกันตัวยังไง","How to protect yourself")}</h4><ul>${p.tips.map(x=>`<li>${esc(x[li])}</li>`).join("")}</ul></div>
      <div class="fd-coms"><small>${L(`ความคิดเห็น ${p.com.length} รายการ`,`${p.com.length} comments`)}</small>${p.com.map(c=>`<p><b>${esc(c[0])}</b> ${esc(c[1+li])}</p>`).join("")}</div>
    </article></div>`;
  phoneScreen(L("เตือนภัยกัน","Scam Alert"), inner);
  $("sheet").querySelector("[data-fdback]").onclick=openFeed;
  if(first) toast(L(`📖 อ่านแล้วรู้ทัน +${BAHT(5)}`,`📖 Read and ready +${BAHT(5)}`));
}
