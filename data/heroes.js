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
const PROLOGUE_ART=[["assets/scenes/prologue/p1.webp","center"],["assets/scenes/prologue/p2.webp","center"],["assets/scenes/prologue/p3.webp","center"],["assets/scenes/prologue/p4.webp","center"],["assets/scenes/prologue/p5.webp","center"]];
/* case illustrations: CASE_ART[case][scene] replaces the first comic panel of that scene */
const CASE_ART={leak:{s1:"assets/scenes/cases/leak-s1.webp"}};
