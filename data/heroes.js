/* Image manifest. Each entry points at a file in assets/; w and h are the drawn size in pixels. */
const HEROES={"guardGirl":{"hero":{"w":298,"h":717,"src":"assets/heroes/guardGirl/hero.webp"}},
"guardBoy":{"hero":{"w":285,"h":718,"src":"assets/heroes/guardBoy/hero.webp"}},
"studentGirl":{"hero":{"w":389,"h":715,"src":"assets/heroes/studentGirl/hero.webp"}},
"studentBoy":{"hero":{"w":327,"h":715,"src":"assets/heroes/studentBoy/hero.webp"}}};
/* the university front picture shown when you arrive on campus */
const UNI_FRONT="assets/scenes/uni-front.webp";
/* the game logo on the title screen */
const LOGO_SRC="assets/scenes/logo.webp";
/* the title screen background (night city) */
const TITLE_BG="assets/scenes/title-bg.webp";
/* prologue pictures, one per panel: [image, which part to keep when cropped] */
/* pictures for ending panels, matched by the panel's emoji */
const ENDING_ART={"🏢🔒💻":"assets/scenes/endings/e1-room.webp","🎧📞📜":"assets/scenes/endings/e1-boss.webp","🧠🔁":"assets/scenes/endings/e1-memory.webp","↩️⭐":"assets/scenes/endings/e1-phop.webp","🚪💥👮👥":"assets/scenes/endings/e2-raid.webp","🕴️🏃💨🚤":"assets/scenes/endings/e2-escape.webp","🏦🔒":"assets/scenes/endings/e2-frozen.webp","📱🕶️…":"assets/scenes/endings/e2-message.webp","🚪💥👮👮":"assets/scenes/endings/e3-raid.webp","🕴️😱🔗":"assets/scenes/endings/e3-caught.webp","🏦🔒💸➡️👵👴":"assets/scenes/endings/e3-refund.webp","🎓🙇‍♀️💐":"assets/scenes/endings/e3-paweena.webp","🏆🛡️✨":"assets/scenes/endings/e3-card.webp"};
const PROLOGUE_ART=[["assets/scenes/prologue/p1.webp","center"],["assets/scenes/prologue/p2.webp","center"],["assets/scenes/prologue/p3.webp","center"],["assets/scenes/prologue/p4.webp","center"],["assets/scenes/prologue/p5.webp","center"]];
/* case illustrations: CASE_ART[case][scene] replaces the first comic panel of that scene */
const CASE_ART={qr:{s1:"assets/scenes/cases/qr-s1.webp"},wifi:{s1:"assets/scenes/cases/wifi-s1.webp"},chat:{s1:"assets/scenes/cases/chat-s1.webp"},publicpc:{s1:"assets/scenes/cases/publicpc-s1.webp"},airdrop:{s1:"assets/scenes/cases/airdrop-s1.webp"},video:{s1:"assets/scenes/cases/video-s1.webp"},remote:{s1:"assets/scenes/cases/remote-s1.webp"},rush:{s1:"assets/scenes/cases/rush-s1.webp"},topup:{s1:"assets/scenes/cases/topup-s1.webp"},loanapp:{s1:"assets/scenes/cases/loanapp-s1.webp"},itmail:{s1:"assets/scenes/cases/itmail-s1.webp"},crypto:{s1:"assets/scenes/cases/crypto-s1.webp"},parttime:{s1:"assets/scenes/cases/parttime-s1.webp"},callfund:{s1:"assets/scenes/cases/callfund-s1.webp"},leak:{s1:"assets/scenes/cases/leak-s1.webp"}};
