/* ===== Zone 4: the net café — a kid keeps topping up, gets scammed in-game, and the family finds out ===== */
(function(){
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const gchat=(title,lines)=>`<div class="gchat"><div class="gch">${title}</div>${lines.map(l=>`<div class="gl"><b style="color:${l[2]||"#7FE0A8"}">${l[0]}</b> ${l[1]}</div>`).join("")}</div>`;
const sms=(from,lines,time)=>`<div class="phone"><div class="phone-top"><b>${from}</b><span>SMS</span></div>${lines.map(l=>`<div class="bubble">${l}</div>`).join("")}<div class="time">${time}</div></div>`;
const site=(color,url,path,logo,fields,btn)=>`<div class="browser" style="--fake:${color}"><div class="addr"><i class="lock"></i><span class="dim">https://</span>${url}<span class="dim">${path}</span></div><div class="page"><div class="flogo"><i></i>${logo}</div>${fields.map(f=>`<div class="field">${f}</div>`).join("")}<div class="fbtn">${btn}</div></div></div>`;
const notif=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;

const TH={
topup:{id:"topup",level:"ยาก",start:"s1",lateStart:"L1",title:"เพชรราคาถูกจากพี่ในเกม",
 learn:["ซื้อของในเกมจากคนนอกระบบ","ครั้งแรกได้ของจริงเพื่อให้ไว้ใจ","เด็กใช้แอปธนาคารของผู้ใหญ่","ความลับคือสิ่งที่คนหลอกต้องการ"],
 scenes:{
  s1:{title:"เติมอีกนิดเดียว",
   body:`<p>ภูมิ น้องชายของต้น นั่งหน้าคอมเครื่อง 7 มือหนึ่งถือมือถือของยาย</p>${gchat("แชตส่วนตัว · RazerKing99 (เลเวล 98)",[["RazerKing99","เพชร 5,000 เม็ด แค่ 300 ถูกกว่าในเกมครึ่งนึงนะน้อง"],["RazerKing99","รอบนี้แพ็ก VIP 1,500 รีบก่อนหมด สแกน QR ที่ส่งไปเลย"],["ภูมิ","รอบแรกได้เพชรจริงด้วย ขอบคุณครับพี่","#FFC414"]])}<p>\"รอบแรกเขาให้เพชรจริงนะพี่ ไม่โกงแน่\"</p>`,
   clues:["ครั้งแรกได้ของจริง เพื่อให้ซื้อครั้งต่อไปที่แพงกว่า","ขายถูกกว่าในเกมครึ่งหนึ่ง และให้โอนนอกระบบ","มือถือในมือภูมิเป็นของยาย"],
   choices:[{t:"ถามภูมิว่าเงินมาจากไหน แล้วชวนหยุดก่อนโอน",to:"s2a",v:"good"},{t:"รอบแรกพี่เขาส่งเพชรให้จริง แสดงว่าน่าเชื่อถือ โอนต่อได้",to:"s2b",v:"bad"},{t:"ให้ภูมิขอให้พี่เขาส่งเพชรมาก่อน แล้วค่อยโอนทีหลัง",to:"s2b",v:"risky"}]},
  s2a:{title:"เงินของยาย",
   body:`<p>ภูมิก้มหน้า \"ผมรู้รหัสแอปธนาคารของยาย มันเป็นวันเกิดผมเอง ซื้อไปสี่รอบแล้ว\"</p>${notif(["โอนออก 300 · 300 · 300 · 1,500 บาท (สัปดาห์นี้)"])}<p>\"ห้ามบอกยายนะพี่ ยายต้องโกรธแน่\"</p>`,
   clues:["ยิ่งปิดเป็นความลับ ยิ่งช่วยไม่ได้","เด็กกลัวโดนดุ ต้องชวนเล่าแบบไม่ตำหนิ","คนขายนอกระบบไม่มีวันคืนเงิน"],
   choices:[{t:"บอกภูมิว่าเราจะไปเล่าให้ยายฟังด้วยกัน และจะช่วยพูดให้",to:"E1",v:"good"},{t:"สัญญาว่าจะเก็บเป็นความลับ ถ้าภูมิสัญญาว่าจะไม่ทำอีก",to:"E2",v:"risky"},{t:"ช่วยภูมิคิดวิธีเก็บเงินค่าขนมคืนยายเอง ยายจะได้ไม่เสียใจ",to:"E3",v:"bad"}]},
  s2b:{title:"แพ็ก VIP ไม่มา",
   body:`${gchat("แชตส่วนตัว · RazerKing99",[["RazerKing99","ระบบติดนิดหน่อย ต้องโอนค่าปลดล็อกอีก 500"],["RazerKing99","ถ้าไม่โอน พี่จะรีพอร์ตไอดีน้องว่าซื้อขายนอกระบบ โดนแบนแน่"]])}<p>ภูมิหน้าซีด \"ไอดีนี้ผมเล่นมาสามปีนะ\"</p>`,
   clues:["ขู่ว่าจะโดนแบน เพื่อให้กลัวจนโอนเพิ่ม","ค่าปลดล็อกจะมีไม่จบ","ต้องให้ผู้ใหญ่รู้ตอนนี้เลย"],
   choices:[{t:"หยุดโอน แคปหลักฐาน รายงานผู้เล่นในเกม แล้วไปบอกยายด้วยกัน",to:"E2",v:"good"},{t:"โอนค่าปลดล็อกไปก่อน ไม่งั้นบัญชีเกมที่เล่นมาทั้งปีจะโดนแบน",to:"E4",v:"bad"},{t:"ลบแชตทิ้งแล้วบล็อก จะได้ไม่มีใครมาหลอกภูมิได้อีก",to:"E3",v:"bad"}]},
  L1:{title:"ไม่ทัน ภูมิโอนไปแล้ว",
   body:`<p>คุณไปถึงช้าไป ภูมิโอน 1,500 ไปแล้ว แต่แพ็ก VIP ไม่มา</p>${gchat("แชตส่วนตัว · RazerKing99",[["RazerKing99","ระบบติด ต้องโอนค่าปลดล็อกอีก 500 ไม่งั้นรีพอร์ตไอดีน้อง"]])}`,
   clues:["ตอนนี้ต้องจำกัดความเสียหาย","ขู่แบนเพื่อให้โอนเพิ่ม","บอกผู้ใหญ่ทันที"],
   choices:[{t:"หยุดโอน แคปหลักฐาน รายงานผู้เล่น แล้วไปบอกยายด้วยกัน",to:"E2",v:"good"},{t:"โอนค่าปลดล็อก ไม่งั้นบัญชีเกมจะโดนแบน",to:"E4",v:"bad"},{t:"ลบแชตทิ้งแล้วบล็อก จะได้ไม่มีใครหลอกได้อีก",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ยายได้ยินจากปากภูมิเอง",story:"ยายตกใจแต่ไม่ดุ เพราะภูมิเล่าเอง ยายเปลี่ยนรหัสแอปเป็นเลขที่ไม่เกี่ยวกับวันเกิดใคร และพาภูมิไปรายงานบัญชีคนขาย",lessons:["ของในเกมให้ซื้อผ่านร้านในเกมเท่านั้น","ครั้งแรกที่ได้ของจริง คือเหยื่อล่อ","ช่วยเด็กเล่าให้ผู้ใหญ่ฟัง ดีกว่าช่วยเก็บความลับ"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"หยุดได้ แต่เงินบางส่วนหายแล้ว",story:"ไม่มีการโอนเพิ่ม แต่เงินของยายที่โอนไปแล้วตามคืนไม่ได้ และถ้าภูมิยังเก็บเป็นความลับ ช่องโหว่ในแอปของยายก็ยังอยู่",lessons:["หยุดเร็วช่วยจำกัดความเสียหาย","ความลับทำให้ผู้ใหญ่แก้ปัญหาต้นเหตุไม่ได้","รายงานผู้เล่นและเก็บหลักฐานไว้"]},
  E3:{type:"danger",label:"เสียหาย",title:"ความลับพาไปไกลกว่าเดิม",story:"ภูมิพยายามหาเงินมาคืนยายด้วยการขายไอดีเกมให้คนแปลกหน้า ถูกโกงซ้ำ และรู้สึกผิดจนไม่กล้าบอกใครอีกเลย",lessons:["อย่าให้เด็กแบกปัญหาคนเดียว","ลบแชตคือลบหลักฐาน","ผู้ใหญ่ที่ไว้ใจได้คือทางออก"]},
  E4:{type:"danger",label:"เสียหาย",title:"ปลดล็อกไม่มีวันจบ",story:"500 แล้วก็ 1,000 แล้วก็ 2,000 จนเงินในบัญชียายเหลือไม่ถึงร้อย ยายรู้ตอนจะจ่ายค่าไฟ",lessons:["คำขู่แบน คือเครื่องมือให้โอนเพิ่ม","ไม่มีค่าปลดล็อกในระบบเกมจริง","บอกผู้ใหญ่ทันทีที่ถูกขู่"]}
 }},

trade:{id:"trade",level:"ยาก",start:"s1",title:"แลกสกินหายาก",
 learn:["เว็บเทรดไอเทมปลอม","OTP เปลี่ยนอีเมล = ยึดบัญชี","ใช้ระบบเทรดในเกมเท่านั้น","เปิด 2FA ให้บัญชีเกม"],
 scenes:{
  s1:{title:"สกินที่ทุกคนอยากได้",
   body:`${gchat("แชตส่วนตัว · TradeMaster",[["TradeMaster","สกินตำนานตัวนี้ แลกกับของเธอ 3 ชิ้นพอ"],["TradeMaster","ระบบเทรดต้องล็อกอินที่ game-trade.site ด้วยไอดีเกมนะ"]])}${site("#6A4C93","game-trade.site","/login","GAME TRADE",["ไอดีเกม","รหัสผ่าน"],"ล็อกอินเพื่อรับไอเทม")}<p>ใบเตยเพื่อนของภูมิหันมา \"เว็บมีโลโก้เกมเลยนะ\"</p>`,
   clues:["โลโก้ก๊อปได้ ดูชื่อเว็บ","เกมจริงมีระบบเทรดในเกม ไม่ต้องล็อกอินเว็บนอก","ของดีเกินจริงเพื่อให้รีบ"],
   choices:[{t:"เปิดในเกมดูว่ามีระบบเทรดในเกมไหม ไม่ล็อกอินเว็บนอก",to:"s2a",v:"good"},{t:"ล็อกอินได้ เว็บมีโลโก้เกมกับ https ครบ",to:"s2b",v:"bad"},{t:"ล็อกอินด้วยไอดีสำรองแทน ถ้าโดนก็ไม่เสียไอดีหลัก",to:"s2b",v:"risky"}]},
  s2a:{title:"ระบบในเกมมีอยู่แล้ว",
   body:`${gchat("แชตส่วนตัว · TradeMaster",[["TradeMaster","ระบบในเกมมันช้า ใช้เว็บเร็วกว่า"],["TradeMaster","เดี๋ยวมีรหัสเข้ามือถือแม่เธอ ส่งมาให้หน่อยนะ ไว้ยืนยัน"]])}`,
   clues:["ขอรหัสที่ส่งเข้ามือถือผู้ปกครอง คือการขอกุญแจบัญชี","ปฏิเสธและรายงาน","บล็อกอย่างเดียว เขาไปหลอกเพื่อนคนอื่นต่อ"],
   choices:[{t:"ปฏิเสธ รายงานผู้เล่นในเกม และเตือนเพื่อนในกิลด์",to:"E1",v:"good"},{t:"ส่งรหัส 6 หลักให้ เขาบอกว่าแค่ใช้ยืนยันการเทรด",to:"E4",v:"bad"},{t:"บล็อกเขาเงียบๆ แล้วเล่นต่อ ไม่ต้องให้เรื่องยาว",to:"E2",v:"risky"}]},
  s2b:{title:"รหัสเด้งเข้ามือถือแม่",
   body:`${sms("GameID",["รหัส 604218 สำหรับ <b>เปลี่ยนอีเมลของบัญชีเกม</b> ห้ามให้ผู้อื่น"],"วันนี้ 16:05")}<p>ใบเตยกำลังจะโทรขอรหัสจากแม่ \"แม่คะ มีเลขเข้ามือถือแม่ไหม\"</p>`,
   clues:["รหัสนี้ใช้เปลี่ยนอีเมลบัญชี = ยึดบัญชีไปเลย","หน้าเว็บได้รหัสผ่านไปแล้ว ต้องเปลี่ยนทันที","เปิด 2FA"],
   choices:[{t:"อ่านให้ใบเตยฟังว่าเป็นรหัสเปลี่ยนอีเมล หยุดเลย แล้วเปลี่ยนรหัสผ่านพร้อมเปิด 2FA",to:"E2",v:"good"},{t:"โทรขอรหัสจากแม่ บอกแม่ว่าเป็นรหัสยืนยันเกม",to:"E4",v:"bad"},{t:"ตอนนี้ยังไม่มีอะไรเสียหาย กลับบ้านแล้วค่อยเปลี่ยนรหัส",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"กิลด์รอดทั้งกิลด์",story:"ใบเตยรายงานบัญชี TradeMaster และเตือนในกิลด์ มีเพื่อนสองคนที่กำลังจะล็อกอินเว็บเดียวกันพอดี",lessons:["เทรดไอเทมในระบบเกมเท่านั้น","ไม่ส่งรหัสที่เข้ามือถือใครให้ใคร","เตือนเพื่อนในกลุ่ม"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รหัสผ่านหลุด แต่บัญชีรอด",story:"คนร้ายได้รหัสผ่านไปแล้วหรือยังวนหลอกคนอื่นอยู่ ใบเตยเปลี่ยนรหัสและเปิด 2FA ทัน บัญชีไม่หาย แต่ต้องคอยระวังต่อ",lessons:["ล็อกอินเว็บนอก = รหัสหลุด","เปลี่ยนรหัสทันทีและเปิด 2FA","รายงานเพื่อหยุดเขาหลอกคนอื่น"]},
  E3:{type:"danger",label:"เสียหาย",title:"บัญชีถูกยึดก่อนถึงบ้าน",story:"ยังไม่ทันถึงบ้าน คนร้ายใช้รหัสผ่านล็อกอินและผูกอีเมลใหม่ ไอเทมทั้งหมดถูกขายต่อ",lessons:["รหัสหลุดแล้วห้ามรอ","เปิด 2FA ไว้ก่อนเกิดเรื่อง","แจ้งเกมทันทีเพื่อกู้บัญชี"]},
  E4:{type:"danger",label:"เสียหาย",title:"บัญชีหาย แถมถูกใช้หลอกเพื่อน",story:"บัญชีของใบเตยถูกยึด แล้วถูกใช้ทักเพื่อนในกิลด์ขอยืมเงินซื้อเพชร",lessons:["รหัสที่ส่งเข้ามือถือ ห้ามส่งต่อ","บัญชีที่หลุดถูกใช้หลอกคนใกล้ตัว","แจ้งเพื่อนให้รู้ทันที"]}
 }},

secret:{id:"secret",level:"ยาก",start:"s1",title:"\"พี่บอส\" ในเกม",
 learn:["คนแปลกหน้าในเกมที่ขอให้เก็บเป็นความลับ","ของขวัญฟรีเพื่อสร้างความไว้ใจ","การชวนย้ายไปคุยแอปอื่น","คุยกับเด็กแบบไม่ตำหนิ"],
 scenes:{
  s1:{title:"พี่ชัยกังวล",
   body:`<p>พี่ชัยเจ้าของร้านเน็ตเรียกคุณมาเบาๆ \"เด็กคนนั้นคุยกับผู้ใหญ่ในเกมทุกวัน เมื่อกี้พี่เห็นบนจอ\"</p>${gchat("แชตส่วนตัว · พี่บอส",[["พี่บอส","เรื่องนี้เป็นความลับของเรานะ ห้ามบอกพ่อแม่ ไม่งั้นโดนแบน"],["พี่บอส","ถ่ายรูปบัตรของยายส่งมา พี่เติมโปรพิเศษให้"],["พี่บอส","ย้ายไปคุยอีกแอปกันดีกว่า ที่นี่มีคนเห็น"]])}`,
   clues:["ขอให้เก็บเป็นความลับจากพ่อแม่ คือสัญญาณอันตราย","ชวนย้ายไปคุยที่อื่นเพื่อไม่ให้ใครเห็น","ขอข้อมูลของผู้ใหญ่ในบ้าน"],
   choices:[{t:"ชวนพี่ชัยไปคุยกับภูมิแบบไม่ตำหนิ และบอกว่าคนที่ขอให้ปิดเป็นความลับคือสัญญาณอันตราย",to:"s2a",v:"good"},{t:"ให้พี่ชัยปิดคอมเครื่องนั้น แล้วบอกภูมิให้กลับบ้านไปก่อน",to:"s2b",v:"risky"},{t:"เป็นเรื่องในครอบครัวภูมิ ให้ครอบครัวจัดการเองดีกว่า",to:"E4",v:"bad"}]},
  s2a:{title:"ภูมิยอมเล่า",
   body:`<p>ภูมิพูดเสียงเบา \"พี่บอสใจดีนะ เติมเกมให้ฟรีตั้งหลายครั้ง เขาบอกว่าเราเป็นทีมเดียวกัน\"</p>`,
   clues:["ของขวัญฟรีคือการสร้างบุญคุณ","เด็กไม่ผิด คนที่ผิดคือผู้ใหญ่ที่หลอก","ผู้ใหญ่ต้องจัดการต่อ ไม่ใช่เด็ก"],
   choices:[{t:"เก็บหลักฐานแชต รายงานบัญชีในเกม บอกยาย และแจ้งตำรวจหรือ 1441",to:"E1",v:"good"},{t:"ให้ภูมิบล็อกบัญชีนั้นเองแล้วลบแชต จะได้จบเรื่องเร็ว",to:"E2",v:"risky"},{t:"ให้ภูมิคุยต่ออีกนิด หลอกถามชื่อจริงกับเบอร์ของพี่บอสไว้ให้ตำรวจ",to:"E3",v:"bad"}]},
  s2b:{title:"คุยต่อในมือถือ",
   body:`<p>วันต่อมาพี่ชัยเห็นภูมินั่งมุมร้าน ก้มคุยในมือถือ อีกแอปหนึ่ง</p>${chat("บ","พี่บอส","แอปใหม่",["อย่าไปเล่นที่ร้านนั้นแล้ว พี่เจ้าของร้านจ้องอยู่","ส่งรหัสแอปธนาคารของยายมา พี่จะเติมให้ทั้งเดือน"])}`,
   clues:["ไล่กลับบ้านโดยไม่อธิบาย ทำให้เด็กซ่อนเก่งขึ้น","คนร้ายใช้โอกาสแยกเด็กออกจากผู้ใหญ่","บอกผู้ปกครองและแจ้งเจ้าหน้าที่"],
   choices:[{t:"บอกยาย เก็บหลักฐาน และแจ้งความ ไม่ไปเผชิญหน้าเอง",to:"E2",v:"good"},{t:"เก็บมือถือภูมิไว้ก่อน ไม่ต้องอธิบาย เด็กยังไม่เข้าใจหรอก",to:"E3",v:"risky"},{t:"ปล่อยไปก่อน เด็กคุยแชตเล่นเดี๋ยวก็เบื่อไปเอง",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ภูมิไม่ต้องแบกความลับคนเดียว",story:"ยายกอดภูมิแล้วบอกว่าภูมิไม่ผิด บัญชีพี่บอสถูกรายงาน และหลักฐานถูกส่งให้ตำรวจ ภูมิสัญญาว่ามีอะไรแปลกจะเล่าให้ยายฟัง",lessons:["ใครขอให้ปิดเป็นความลับจากพ่อแม่ ให้บอกผู้ใหญ่ทันที","คุยกับเด็กแบบไม่ดุ เด็กจะกล้าเล่า","ผู้ใหญ่จัดการต่อ ไม่ให้เด็กไปสืบเอง"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"หยุดได้ แต่ยังมีช่องโหว่",story:"พี่บอสหายไป แต่ไม่มีใครรายงานหรือเก็บหลักฐาน บัญชีเดิมยังเที่ยวทักเด็กคนอื่นต่อ",lessons:["บล็อกช่วยแค่คนเดียว รายงานช่วยคนอื่นด้วย","เก็บหลักฐานไว้เสมอ","ผู้ปกครองต้องรู้"]},
  E3:{type:"danger",label:"เสียหาย",title:"เด็กถูกดึงเข้าไปลึกกว่าเดิม",story:"ภูมิรู้สึกว่าตัวเองผิดและเริ่มซ่อนมากขึ้น ข้อมูลบางส่วนของยายหลุดไปถึงพี่บอส",lessons:["อย่าให้เด็กเป็นคนสืบเอง","ยึดของโดยไม่อธิบาย ทำให้เด็กไม่เล่าอีก","บอกผู้ใหญ่และเจ้าหน้าที่"]},
  E4:{type:"danger",label:"เสียหาย",title:"ปล่อยไปจนสาย",story:"ภูมิส่งรหัสแอปธนาคารของยายไปให้พี่บอส เงินในบัญชียายถูกโอนออกในคืนเดียว",lessons:["สัญญาณเตือนในเกมต้องรีบจัดการ","ทุกคนรอบตัวเด็กช่วยได้ รวมถึงเจ้าของร้าน","บอกผู้ปกครองทันที"]}
 }},

parent:{id:"parent",level:"ยาก",start:"s1",title:"ยายเห็นรายการเงิน",
 learn:["ผู้ปกครองรับมือเมื่อลูกหลานโดนหลอก","ขอเงินคืนผ่านช่องทางที่ถูก","ตั้งค่าควบคุมโดยผู้ปกครอง","ระวังมิจฉาชีพอ้างช่วยคืนเงิน"],
 scenes:{
  s1:{title:"14 รายการ",
   body:`${notif(["เติมเกม 300 · 300 · 99 · 1,500 · 300 · 500 …","รวม 14 รายการ 9,800 บาท ใน 2 สัปดาห์"])}<p>ยายศรีมือสั่น \"ยายจะไปยึดมือถือมันให้หมด แล้วห้ามเล่นเกมไปเลย!\"</p>`,
   clues:["ยายกำลังโกรธ ถ้ารีบลงโทษ เด็กจะซ่อนมากขึ้น","ต้องแยกให้ออกว่ารายการไหนเป็นการซื้อในเกมจริง รายการไหนโอนให้คนแปลกหน้า","รหัสแอปยายต้องเปลี่ยน"],
   choices:[{t:"ชวนยายใจเย็นก่อน แล้วโทรธนาคารเบอร์หลังบัตรเพื่อดูว่ารายการไหนโอนไปไหน",to:"s2a",v:"good"},{t:"ไปเอามือถือภูมิมาดูทันที ก่อนที่จะมีรายการเพิ่ม",to:"s2b",v:"risky"},{t:"โทรเบอร์ \"ฝ่ายคืนเงินเกม\" ที่ค้นเจออันดับแรกใน Google",to:"s3",v:"bad"}]},
  s2a:{title:"แยกรายการ",
   body:`<p>ธนาคารบอกว่า 9 รายการเป็นการซื้อในแอปเกม ส่วน 5 รายการโอนเข้าบัญชีบุคคล ภูมิเดินมาพอดี ตาแดงๆ</p>`,
   clues:["ซื้อในแอป ขอคืนผ่านร้านแอปหรือเกมได้","โอนเข้าบัญชีบุคคล ต้องแจ้งความเพื่ออายัด","คุยกับภูมิแบบไม่ดุ แล้วตั้งค่าควบคุมด้วยกัน"],
   choices:[{t:"ขอคืนเงินรายการในแอป แจ้งความรายการบัญชีบุคคล เปลี่ยนรหัส ตั้งค่าควบคุมโดยผู้ปกครอง แล้วคุยกับภูมิแบบไม่ดุ",to:"E1",v:"good"},{t:"เปลี่ยนรหัสทุกบัญชีให้หมดก็พอ คนร้ายจะเข้าไม่ได้อีก",to:"E2",v:"risky"},{t:"ห้ามภูมิเล่นเกมทั้งปี จะได้ไม่มีเรื่องแบบนี้อีก",to:"E3",v:"risky"}]},
  s2b:{title:"ภูมิวิ่งหนี",
   body:`<p>ยายตะโกนเรียก ภูมิร้องไห้แล้ววิ่งออกจากร้าน มือถือยังอยู่ในมือ</p>`,
   clues:["เด็กกลัวจะตัดการสื่อสาร","บอกว่าโกรธคนหลอก ไม่ได้โกรธภูมิ","ปัญหาเงินยังต้องจัดการ"],
   choices:[{t:"ตามไปคุย บอกว่ายายไม่ได้โกรธภูมิ แต่โกรธคนที่หลอก",to:"s2a",v:"good"},{t:"ปล่อยให้ภูมิอยู่คนเดียวก่อน ใจเย็นแล้วค่อยคุยกันพรุ่งนี้",to:"E3",v:"risky"},{t:"ให้ภูมิสัญญาว่าจะไม่ทำอีก แล้วจบเรื่องไม่ต้องพูดถึงอีก",to:"E2",v:"risky"}]},
  s3:{title:"ฝ่ายคืนเงิน",
   body:`<p>ยายโทรเบอร์ที่ค้นเจอ ปลายสายบอกว่าเป็นฝ่ายคืนเงินของเกม</p>${chat("G","GameRefund Support","บัญชีทางการ ✓",["คืนได้ทั้ง 9,800 บาทค่ะ","ติดตั้งแอปนี้เพื่อยืนยันบัญชีธนาคาร แล้วกรอกเลขบัตรนะคะ"])}`,
   clues:["ผลค้นหาบางอันคือโฆษณาของมิจฉาชีพ","คืนเงินจริงทำผ่านร้านแอปหรือในเกม ไม่ต้องติดตั้งแอปอื่น","ไม่ให้เลขบัตร"],
   choices:[{t:"วางสาย แล้วใช้ช่องทางคืนเงินในร้านแอปและธนาคารจริง",to:"s2a",v:"good"},{t:"ติดตั้งแอปที่เจ้าหน้าที่ส่งมา จะได้ตรวจรายการคืนเงินอัตโนมัติ",to:"E4",v:"bad"},{t:"ให้เลขบัตรเพื่อให้ระบบโอนเงินคืนเข้าบัตรใบเดิม",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ครอบครัวเดียวกัน",story:"รายการซื้อในแอปได้เงินคืนเกือบครบ ส่วนบัญชีที่รับเงินถูกอายัด ภูมิกับยายตั้งกติกาเติมเกมด้วยกัน และรหัสแอปใหม่ไม่ใช่วันเกิดใครอีกแล้ว",lessons:["แยกรายการ: ซื้อในแอปขอคืนได้ โอนบุคคลต้องแจ้งความ","ตั้งค่าควบคุมโดยผู้ปกครองและรหัสที่เดายาก","คุยกันแบบไม่ดุ เด็กจะกล้าบอกครั้งหน้า"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"แก้ได้ครึ่งเดียว",story:"เงินบางส่วนไม่ได้คืนเพราะไม่ได้ขอ และภูมิยังไม่ได้เล่าว่าใครหลอก ช่องโหว่บางอย่างยังอยู่",lessons:["เปลี่ยนรหัสอย่างเดียวไม่พอ","ขอคืนเงินให้ครบทุกช่องทาง","ให้เด็กเล่าเรื่องทั้งหมด"]},
  E3:{type:"danger",label:"เสียหาย",title:"ภูมิซ่อนหนักกว่าเดิม",story:"ภูมิกลัวจนเลิกเล่าทุกอย่าง แล้วไปเล่นเกมด้วยมือถือเพื่อนแทน คนหลอกยังติดต่อภูมิอยู่",lessons:["ลงโทษหนักทำให้เด็กหนีไปซ่อน","ความไว้ใจในบ้านคือเกราะที่ดีที่สุด","จัดการปัญหาเงินและคุยกันไปพร้อมกัน"]},
  E4:{type:"danger",label:"เสียหาย",title:"หลอกซ้ำตอนขอคืนเงิน",story:"แอปที่ติดตั้งคือแอปควบคุมเครื่อง เงินที่เหลือในบัญชียายหายไปอีก 23,000 บาท",lessons:["อย่าโทรเบอร์คืนเงินจากผลค้นหา","คืนเงินจริงไม่ต้องติดตั้งแอปหรือให้เลขบัตร","ใช้ช่องทางในร้านแอป เกม หรือธนาคารเท่านั้น"]}
 }}
};

const EN={
topup:{id:"topup",level:"ยาก",start:"s1",lateStart:"L1",title:"Cheap diamonds from a player",
 learn:["Buying in-game items off-platform","The first deal delivers, to build trust","Kids using an adult's banking app","Secrecy is what scammers want"],
 scenes:{
  s1:{title:"Just one more top-up",
   body:`<p>Phum, Ton's little brother, sits at PC 7 holding Grandma's phone.</p>${gchat("Private chat · RazerKing99 (Lv 98)",[["RazerKing99","5,000 diamonds for just 300, half the in-game price"],["RazerKing99","VIP pack 1,500 this time, hurry. Scan the QR I sent"],["Phum","Got the diamonds last time, thanks bro","#FFC414"]])}<p>\"He really gave me diamonds the first time. He's legit.\"</p>`,
   clues:["The first deal delivers so you'll buy the bigger one","Half price and paid outside the game","The phone in Phum's hand is Grandma's"],
   choices:[{t:"Ask Phum where the money comes from, and get him to pause before paying",to:"s2a",v:"good"},{t:"He really sent the gems last time, so he's trustworthy. Go ahead",to:"s2b",v:"bad"},{t:"Have Phum ask him to send the gems first and pay afterwards",to:"s2b",v:"risky"}]},
  s2a:{title:"Grandma's money",
   body:`<p>Phum looks down. \"I know Grandma's banking PIN. It's my birthday. I've bought four times.\"</p>${notif(["Sent 300 · 300 · 300 · 1,500 baht (this week)"])}<p>\"Don't tell Grandma, she'll be so angry.\"</p>`,
   clues:["The more secret it stays, the less anyone can help","Kids fear punishment. Invite them to talk without blame","Off-platform sellers never refund"],
   choices:[{t:"Tell Phum you'll go and tell Grandma together, and you'll help explain",to:"E1",v:"good"},{t:"Promise to keep it secret if Phum promises never to do it again",to:"E2",v:"risky"},{t:"Help Phum plan to repay Grandma from his pocket money so she isn't upset",to:"E3",v:"bad"}]},
  s2b:{title:"No VIP pack",
   body:`${gchat("Private chat · RazerKing99",[["RazerKing99","System's stuck, pay 500 more to unlock"],["RazerKing99","Or I'll report your ID for off-platform trading. You'll be banned"]])}<p>Phum goes pale. \"I've played this account for three years.\"</p>`,
   clues:["Ban threats are meant to scare you into paying","The unlock fees never end","An adult needs to know now"],
   choices:[{t:"Stop, screenshot, report the player in-game, then tell Grandma together",to:"E2",v:"good"},{t:"Pay the unlock fee, or the account he's played all year gets banned",to:"E4",v:"bad"},{t:"Delete and block the chat so nobody can trick Phum again",to:"E3",v:"bad"}]},
  L1:{title:"Too late, he paid",
   body:`<p>You got there too late. Phum already sent 1,500, and no VIP pack arrived.</p>${gchat("Private chat · RazerKing99",[["RazerKing99","Stuck. Pay 500 to unlock or I report your ID"]])}`,
   clues:["Now limit the damage","Ban threats push more payments","Tell an adult right away"],
   choices:[{t:"Stop, screenshot, report the player, then tell Grandma together",to:"E2",v:"good"},{t:"Pay the unlock fee, or the game account gets banned",to:"E4",v:"bad"},{t:"Delete and block the chat so nobody can trick him again",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Grandma heard it from Phum",story:"Grandma was shocked but didn't scold, because Phum told her himself. She changed her PIN to something nobody's birthday, and they reported the seller together.",lessons:["Buy in-game items only in the game's own store","A first deal that delivers is bait","Help kids tell an adult instead of keeping secrets"]},
  E2:{type:"warn",label:"Close call",title:"Stopped, but some money's gone",story:"No more payments, but what was sent can't be recovered, and if Phum keeps it secret, Grandma's weak PIN is still there.",lessons:["Stopping early limits damage","Secrets stop adults fixing the real problem","Report the player and keep evidence"]},
  E3:{type:"danger",label:"Harmed",title:"The secret went further",story:"Phum tried to repay Grandma by selling his game account to a stranger, got scammed again, and felt too guilty to tell anyone.",lessons:["Never leave a kid carrying the problem alone","Deleting chats deletes evidence","A trusted adult is the way out"]},
  E4:{type:"danger",label:"Harmed",title:"The unlock never ends",story:"500, then 1,000, then 2,000, until Grandma's account had under 100 baht. She found out when paying the electricity bill.",lessons:["Ban threats are a tool to get more money","Real games don't charge unlock fees","Tell an adult as soon as you're threatened"]}
 }},

trade:{id:"trade",level:"ยาก",start:"s1",title:"Trading a rare skin",
 learn:["Fake item-trading sites","An email-change code = account takeover","Trade only inside the game","Turn on 2FA for game accounts"],
 scenes:{
  s1:{title:"The skin everyone wants",
   body:`${gchat("Private chat · TradeMaster",[["TradeMaster","This legendary skin for just 3 of your items"],["TradeMaster","To trade, log in at game-trade.site with your game ID"]])}${site("#6A4C93","game-trade.site","/login","GAME TRADE",["Game ID","Password"],"Log in to receive item")}<p>Phum's friend Baitoey turns round. \"It's got the game's logo.\"</p>`,
   clues:["Logos can be copied. Read the domain","Real games trade in-game, no outside login","Too good to be true, to make you rush"],
   choices:[{t:"Check in the game whether it has its own trade system, no outside login",to:"s2a",v:"good"},{t:"Log in, the site has the game logo and https",to:"s2b",v:"bad"},{t:"Use a spare account to log in, so the main one is safe if it's a trap",to:"s2b",v:"risky"}]},
  s2a:{title:"The game already has trading",
   body:`${gchat("Private chat · TradeMaster",[["TradeMaster","In-game trading is slow, the site's faster"],["TradeMaster","A code will go to your mum's phone. Send it to me to confirm"]])}`,
   clues:["Asking for a code sent to a parent's phone = asking for the account key","Refuse and report","Blocking alone lets them move on to friends"],
   choices:[{t:"Refuse, report the player, and warn the guild",to:"E1",v:"good"},{t:"Send the 6-digit code, he says it's only to confirm the trade",to:"E4",v:"bad"},{t:"Block him quietly and keep playing, no need to make a fuss",to:"E2",v:"risky"}]},
  s2b:{title:"A code on Mum's phone",
   body:`${sms("GameID",["Code 604218 to <b>change your game account's email</b>. Never share it."],"Today 16:05")}<p>Baitoey is about to call her mum: \"Mum, did you get a number on your phone?\"</p>`,
   clues:["This code changes the account email = full takeover","The site already has the password. Change it now","Turn on 2FA"],
   choices:[{t:"Read it out: it's an email-change code. Stop, change the password and turn on 2FA",to:"E2",v:"good"},{t:"Phone Mum for the code and tell her it's a game verification",to:"E4",v:"bad"},{t:"Nothing's lost yet, change the password when you get home",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The whole guild saved",story:"Baitoey reported TradeMaster and warned her guild. Two friends were about to log in to the same site.",lessons:["Trade items only in the game","Never pass on a code sent to someone's phone","Warn your group"]},
  E2:{type:"warn",label:"Close call",title:"Password leaked, account saved",story:"The scammer got the password or is still hunting others. Baitoey changed it and turned on 2FA in time, but must stay alert.",lessons:["Outside logins leak passwords","Change it immediately and turn on 2FA","Report to stop them scamming others"]},
  E3:{type:"danger",label:"Harmed",title:"Taken before she got home",story:"Before she was home, the scammer logged in and linked a new email. Every item was sold on.",lessons:["Never wait after a password leaks","Turn on 2FA before trouble","Contact the game right away to recover"]},
  E4:{type:"danger",label:"Harmed",title:"Account lost and used on friends",story:"Baitoey's account was taken and used to ask guildmates to lend money for diamonds.",lessons:["Never forward a code sent to a phone","Stolen accounts target the people closest","Warn friends at once"]}
 }},

secret:{id:"secret",level:"ยาก",start:"s1",title:"\"Big Bro Boss\" in the game",
 learn:["Strangers in games who ask for secrecy","Free gifts to build trust","Moving the chat to another app","Talking to kids without blame"],
 scenes:{
  s1:{title:"Chai is worried",
   body:`<p>Chai, the net café owner, calls you over quietly. \"That boy chats with an adult in his game every day. I saw this on his screen.\"</p>${gchat("Private chat · Big Bro Boss",[["Big Bro Boss","This is our secret, ok? Don't tell your parents or you'll get banned"],["Big Bro Boss","Send a photo of your grandma's card, I'll give you a special top-up"],["Big Bro Boss","Let's move to another app, people can see here"]])}`,
   clues:["Asking a child to keep secrets from parents is a danger sign","Moving to another app so nobody sees","Asking for an adult's details"],
   choices:[{t:"Go with Chai to talk to Phum without blame, and explain secret-keeping requests are a danger sign",to:"s2a",v:"good"},{t:"Have Chai shut that PC down and send Phum home for now",to:"s2b",v:"risky"},{t:"It's Phum's family business, better let his family handle it",to:"E4",v:"bad"}]},
  s2a:{title:"Phum opens up",
   body:`<p>Phum says quietly, \"Big Bro Boss is kind. He topped up my game for free lots of times. He says we're a team.\"</p>`,
   clues:["Free gifts create a sense of debt","The child isn't to blame, the adult is","Adults take it from here, not the child"],
   choices:[{t:"Keep the chat as evidence, report the account, tell Grandma, and report to police or 1441",to:"E1",v:"good"},{t:"Have Phum block that account and delete the chat to end it fast",to:"E2",v:"risky"},{t:"Have Phum keep chatting to get Boss's real name and number for the police",to:"E3",v:"bad"}]},
  s2b:{title:"Still chatting on the phone",
   body:`<p>Next day Chai sees Phum in a corner, chatting on his phone in a different app.</p>${chat("B","Big Bro Boss","new app",["Stop playing at that café, the owner's watching","Send your grandma's banking PIN, I'll top you up all month"])}`,
   clues:["Sending a kid home without explaining makes them hide better","Scammers use it to separate kids from adults","Tell the guardian and report"],
   choices:[{t:"Tell Grandma, keep evidence and report it. Don't confront him yourself",to:"E2",v:"good"},{t:"Take Phum's phone without explaining, he's too young to understand",to:"E3",v:"risky"},{t:"Leave it for now, kids get bored of these chats on their own",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Phum isn't alone with the secret",story:"Grandma hugged Phum and told him he did nothing wrong. Boss's account was reported and the evidence went to police. Phum promised to tell Grandma when anything feels off.",lessons:["Anyone asking for secrets from parents: tell an adult","Talk without scolding and kids will open up","Adults handle it; kids shouldn't investigate"]},
  E2:{type:"warn",label:"Close call",title:"Stopped, but gaps remain",story:"Boss disappeared, but nobody reported or kept evidence. The account went on messaging other kids.",lessons:["Blocking protects one child, reporting protects others","Always keep evidence","Parents must know"]},
  E3:{type:"danger",label:"Harmed",title:"Pulled in deeper",story:"Phum felt he'd done wrong and started hiding more, and some of Grandma's details reached Boss.",lessons:["Never let a child investigate","Confiscating without explaining stops kids talking","Tell adults and the authorities"]},
  E4:{type:"danger",label:"Harmed",title:"Too late",story:"Phum sent Grandma's banking PIN to Boss. Her account was emptied overnight.",lessons:["Act fast on warning signs in games","Everyone around a child can help, café owners too","Tell the guardian immediately"]}
 }},

parent:{id:"parent",level:"ยาก",start:"s1",title:"Grandma sees the statement",
 learn:["How guardians respond when a child is scammed","Getting refunds the right way","Parental controls","Beware of fake refund helpers"],
 scenes:{
  s1:{title:"14 transactions",
   body:`${notif(["Game top-ups 300 · 300 · 99 · 1,500 · 300 · 500 …","14 transactions, 9,800 baht in 2 weeks"])}<p>Grandma Sri's hands shake. \"I'll take his phone away and ban games for good!\"</p>`,
   clues:["She's angry; punishing in a rush makes kids hide","Separate real in-game purchases from transfers to strangers","Her app PIN must change"],
   choices:[{t:"Help Grandma calm down, then call the bank on the card's number to see where each payment went",to:"s2a",v:"good"},{t:"Grab Phum's phone right now before more charges go through",to:"s2b",v:"risky"},{t:"Call the \"game refunds\" number that comes up first on Google",to:"s3",v:"bad"}]},
  s2a:{title:"Sorting the transactions",
   body:`<p>The bank says 9 were in-app purchases and 5 went to a personal account. Phum walks over, eyes red.</p>`,
   clues:["In-app purchases can be refunded via the app store or game","Transfers to personal accounts need a police report to freeze","Talk with Phum without scolding, then set controls together"],
   choices:[{t:"Request in-app refunds, report the personal-account transfers, change PINs, set parental controls, and talk to Phum without scolding",to:"E1",v:"good"},{t:"Changing every password is enough, they can't get in again",to:"E2",v:"risky"},{t:"Ban Phum from games for a year so it never happens again",to:"E3",v:"risky"}]},
  s2b:{title:"Phum runs off",
   body:`<p>Grandma shouts. Phum bursts into tears and runs out of the café, phone still in hand.</p>`,
   clues:["Frightened kids cut off communication","Say she's angry at the scammer, not at Phum","The money still needs sorting"],
   choices:[{t:"Go after him: Grandma isn't angry at Phum, she's angry at the scammer",to:"s2a",v:"good"},{t:"Give Phum space for now, talk tomorrow once everyone's calm",to:"E3",v:"risky"},{t:"Have Phum promise not to do it again and never bring it up",to:"E2",v:"risky"}]},
  s3:{title:"The refund team",
   body:`<p>Grandma calls a number from a search. The voice says it's the game's refund team.</p>${chat("G","GameRefund Support","official ✓",["We can refund all 9,800 baht","Install this app to verify your bank account, then enter your card number"])}`,
   clues:["Some search results are scam ads","Real refunds go through the app store or game, no extra apps","Never give card details"],
   choices:[{t:"Hang up, and use the real app-store refund and the bank",to:"s2a",v:"good"},{t:"Install the app the agent sent, it checks refunds automatically",to:"E4",v:"bad"},{t:"Give the card number so the refund goes back to the same card",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"One family",story:"Most in-app purchases were refunded and the receiving account was frozen. Phum and Grandma set top-up rules together, and the new PIN isn't anyone's birthday.",lessons:["Sort it: in-app purchases can be refunded, personal transfers need a police report","Parental controls and a hard-to-guess PIN","Talk without scolding so kids tell you next time"]},
  E2:{type:"warn",label:"Close call",title:"Only half fixed",story:"Some money wasn't recovered because nobody asked, and Phum never said who scammed him. Some gaps remain.",lessons:["Changing the PIN alone isn't enough","Request refunds through every channel","Let the child tell the whole story"]},
  E3:{type:"danger",label:"Harmed",title:"Phum hides even more",story:"Phum was too scared to say anything and started gaming on a friend's phone instead. The scammer is still in touch with him.",lessons:["Harsh punishment drives kids into hiding","Trust at home is the best shield","Fix the money and talk at the same time"]},
  E4:{type:"danger",label:"Harmed",title:"Scammed again while seeking a refund",story:"The app was a remote-control app. Another 23,000 baht left Grandma's account.",lessons:["Never call refund numbers from search results","Real refunds need no extra app or card number","Use the app store, game or bank only"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
