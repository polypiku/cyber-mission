/* ===== Bonus zone: the haunted house down the alley — ghosts who got scammed and can't move on ===== */
(function(){
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const doc=(head,stamp,rows)=>`<div class="doc"><div class="dh">${head} <span class="stamp">${stamp}</span></div>${rows.map(r=>`<div class="dr"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}</div>`;

const TH={
merit:{id:"merit",level:"ยาก",start:"s1",title:"ทำบุญที่ไม่เคยมาถึง",
 learn:["เพจทำบุญปลอมที่หากินกับความคิดถึง","บัญชีรับบริจาคต้องเป็นชื่อวัดหรือมูลนิธิ","ตรวจกับวัดจริงด้วยช่องทางที่หาเอง","บอกความจริงอย่างอ่อนโยน"],
 scenes:{
  s1:{title:"ลูกสาวทำบุญให้ทุกคืน",
   body:`<p>แม่ช้อยลอยวนอยู่หน้ากระจกบานเก่า \"ลูกสาวโอนทำบุญไปให้แม่ทุกคืน แต่บุญไม่เคยมาถึงแม่เลย แม่เลยไปไหนไม่ได้\"</p>${chat("ว","วัดป่าสว่างธรรม (ออนไลน์)","เพจ · ผู้ติดตาม 120K ✓",["ทำบุญโลงศพ 999 บาท ส่งถึงผู้ล่วงลับทันที 🙏","โอนเข้าบัญชีพระอาจารย์ นาย ก. 405-2-11xxx"])}`,
   clues:["บัญชีรับบริจาคเป็นชื่อบุคคล ไม่ใช่ชื่อวัด","ยอดผู้ติดตามซื้อได้","คนร้ายเลือกคนที่กำลังเสียใจ"],
   choices:[{t:"ดูว่าบัญชีเป็นชื่อวัดหรือชื่อบุคคล แล้วหาเบอร์วัดจริงมาโทรถาม",to:"s2a",v:"good"},{t:"เพจมีผู้ติดตามเป็นแสนและคนทำบุญทุกวัน น่าจะเป็นของจริง",to:"E3",v:"bad"},{t:"บอกลูกสาวให้โอนน้อยลง ทำบุญได้แต่อย่าให้เดือดร้อน",to:"E2",v:"risky"}]},
  s2a:{title:"วัดจริงไม่มีเพจนี้",
   body:`<p>เจ้าอาวาสวัดจริงบอกว่า \"วัดไม่มีเพจนี้ บัญชีรับบริจาคของวัดเป็นชื่อวัดเท่านั้น\" แม่ช้อยถาม \"แล้วลูกแม่จะเสียใจไหม\"</p>`,
   clues:["บอกความจริงพร้อมทางออก","รายงานเพจเพื่อหยุดหลอกคนอื่น","ทำบุญที่วัดจริงได้เสมอ"],
   choices:[{t:"ช่วยลูกสาวรายงานเพจ และบอกว่าทำบุญที่วัดจริงได้ด้วยใจเดิม",to:"E1",v:"good"},{t:"ไม่ต้องบอกลูกสาว ให้เขาเชื่อต่อไปว่าทำบุญถึงแม่แล้ว",to:"E2",v:"risky"},{t:"ให้ลูกสาวทักเพจไปขอเงินคืน บอกว่าจะแจ้งความถ้าไม่คืน",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ไปสู่สุคติ",title:"บุญถึงแล้ว",story:"ลูกสาวร้องไห้แล้วยิ้ม พรุ่งนี้จะไปทำบุญที่วัดจริง แม่ช้อยลูบหัวลูกที่มองไม่เห็นแม่ แล้วค่อยๆ จางไปในแสงเทียน",lessons:["บัญชีรับบริจาคต้องเป็นชื่อวัดหรือมูลนิธิ","ตรวจกับวัดด้วยเบอร์ที่หาเอง","คนร้ายเลือกช่วงที่เราเศร้าที่สุด"]},
  E2:{type:"warn",label:"เกือบไป",title:"บุญมาถึงครึ่งเดียว",story:"ลูกสาวโอนน้อยลงหรือยังไม่รู้ความจริง เพจปลอมยังอยู่และยังหลอกครอบครัวอื่น แม่ช้อยไปได้ แต่ยังหันมามองด้วยความห่วง",lessons:["แค่ลดจำนวนไม่ได้หยุดการโกง","รายงานเพจปลอม","ความจริงที่บอกอย่างอ่อนโยนดีกว่าความลับ"]},
  E3:{type:"danger",label:"ยังติดอยู่",title:"บุญยังไม่มาถึง",story:"ลูกสาวโอนต่อทุกคืน แถมเพจขอค่า \"พิธีส่งบุญพิเศษ\" อีก แม่ช้อยยังลอยวนอยู่หน้ากระจก",lessons:["ยอดผู้ติดตามไม่ใช่หลักฐาน","ทักไปขอคืน = เปิดทางให้หลอกซ้ำ","ทำบุญผ่านวัดที่ตรวจสอบได้"]}
 }},

inherit:{id:"inherit",level:"ยาก",start:"s1",title:"มรดก 2 ล้าน ติดค่าปลดล็อก",
 learn:["หลอกเรื่องมรดก","มรดกจริงผ่านศาลและธนาคาร","ค่าธรรมเนียมที่งอกไม่หยุด","อย่าส่งสำเนาบัตรให้คนที่ติดต่อมาเอง"],
 scenes:{
  s1:{title:"ตาเหมห่วงหลาน",
   body:`<p>ตาเหมเดินวนไปมาเสียงโซ่ดังแกร๊ก \"หลานตาได้จดหมายแบบนี้ ตาไม่เคยมีเงินสองล้านซะหน่อย!\"</p>${doc("แจ้งสิทธิ์รับมรดก","ด่วน",[["ผู้รับ","หลานของนายเหม"],["ยอดมรดก","2,000,000 บาท"],["ค่าปลดล็อก","25,000 บาท ภายใน 3 วัน"],["โอนเข้า","ทนายสมศักดิ์ (บัญชีส่วนตัว)"]])}`,
   clues:["มรดกจริงจัดการผ่านศาลและธนาคาร","ไม่มีค่าปลดล็อกที่ต้องโอนเข้าบัญชีส่วนตัว","ตาเหมเองยังไม่รู้ว่ามีเงินนี้"],
   choices:[{t:"บอกหลานว่ามรดกจริงไม่มีค่าปลดล็อก ให้โทรถามธนาคารที่ตามีบัญชีด้วยเบอร์ที่หาเอง",to:"E1",v:"good"},{t:"จ่าย 25,000 เทียบกับมรดกสองล้าน ถือว่าคุ้ม",to:"s2",v:"bad"},{t:"ให้หลานส่งสำเนาบัตรให้ทนายตรวจสอบสิทธิ์ก่อนจ่าย",to:"s2",v:"risky"}]},
  s2:{title:"ค่าธรรมเนียมงอก",
   body:`${chat("ท","ทนายสมศักดิ์","สำนักงานกฎหมายมรดก",["ได้รับแล้วครับ ตอนนี้ต้องชำระภาษีมรดกอีก 80,000","ถ้าไม่ชำระภายในวันนี้ สิทธิ์จะถูกยกเลิก"])}<p>ตาเหมกุมหัว \"โอ๊ย หลานตาจะหมดตัว\"</p>`,
   clues:["เงื่อนไขใหม่โผล่มาเรื่อยๆ","\"ภายในวันนี้\" คือการเร่ง","หยุดแล้วแจ้งความ"],
   choices:[{t:"หยุดเลย เก็บหลักฐาน และพาหลานแจ้ง 1441",to:"E2",v:"good"},{t:"จ่ายค่าภาษีรอบสุดท้าย ไม่งั้นเสียสิทธิ์มรดกทั้งหมด",to:"E3",v:"bad"},{t:"ต่อรองขอลดค่าธรรมเนียมลงครึ่งหนึ่ง",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ไปสู่สุคติ",title:"ตาเหมวางโซ่ลงได้",story:"ธนาคารบอกว่าไม่มีมรดกก้อนไหนเลย หลานลบอีเมลและบล็อกทนายปลอม ตาเหมหัวเราะ เสียงโซ่เงียบไป แล้วลอยออกทางหน้าต่าง",lessons:["มรดกจริงผ่านศาลและธนาคาร","ไม่มีค่าปลดล็อกเข้าบัญชีส่วนตัว","ตรวจด้วยเบอร์ที่หาเอง"]},
  E2:{type:"warn",label:"เกือบไป",title:"เสียไปบ้าง แต่หยุดทัน",story:"หลานเสียเงินหรือข้อมูลบัตรไปแล้ว แต่หยุดก่อนจ่ายก้อนใหญ่ ตาเหมไปได้ แต่บ่นตลอดทางว่าไม่น่าเลย",lessons:["ค่าธรรมเนียมที่งอกคือสัญญาณหลอก","อย่าส่งสำเนาบัตรให้คนที่ติดต่อมาเอง","แจ้งความเร็วช่วยอายัดเงินได้"]},
  E3:{type:"danger",label:"ยังติดอยู่",title:"สองล้านที่ไม่มีจริง",story:"หลานจ่ายไปกว่าแสนบาท ทนายหายไปพร้อมเงิน ตาเหมยังเดินวนลากโซ่อยู่ในบ้าน",lessons:["ไม่มีเงินฟรีที่ต้องจ่ายก่อน","ต่อรองค่าธรรมเนียม = ยอมรับว่าจะจ่าย","หยุดแล้วแจ้ง 1441"]}
 }},

romance:{id:"romance",level:"ยาก",start:"s1",title:"แฟนออนไลน์ของผีสาว",
 learn:["หลอกให้รัก (romance scam)","ค้นรูปย้อนกลับ","ข้ออ้างไม่เปิดกล้อง","ของขวัญติดศุลกากร"],
 scenes:{
  s1:{title:"รอแฟนอยู่",
   body:`<p>ผีแป้งนั่งเท้าคางบนบันได \"แป้งรอแฟนอยู่ เขาส่งของขวัญมาจากต่างประเทศ แต่ติดศุลกากร ต้องจ่าย 15,000 ผีไม่มีเงิน แป้งเลยไปไหนไม่ได้\"</p>${chat("J","Captain James 💙","วิศวกรแท่นขุดเจาะ",["ที่รัก ของขวัญติดศุลกากร จ่ายค่าภาษีให้ผมก่อนนะ","ผมเปิดกล้องไม่ได้ อยู่กลางทะเล สัญญาณไม่ดี"])}`,
   clues:["คุยกันนานแต่ไม่เคยเห็นหน้าจริง","ของขวัญติดศุลกากร คือมุกยอดฮิต","อาชีพที่อยู่ไกลเพื่อเลี่ยงการเจอตัว"],
   choices:[{t:"ช่วยแป้งค้นรูปโปรไฟล์ย้อนกลับ ว่ารูปนี้เป็นของใคร",to:"s2a",v:"good"},{t:"ให้แป้งยืมเงินผีตนอื่นไปช่วยเขาก่อน เดี๋ยวเขาก็คืน",to:"E3",v:"bad"},{t:"ขอให้เขาวิดีโอคอลมาก่อน ถ้าเห็นหน้าก็สบายใจ",to:"s2b",v:"risky"}]},
  s2a:{title:"รูปเป็นของคนอื่น",
   body:`<p>รูป Captain James เป็นของเทรนเนอร์ฟิตเนสที่มีคนติดตามหลายแสน และมีโพสต์เตือนว่าถูกเอารูปไปหลอกหลายประเทศ แป้งเงียบไปนาน</p>`,
   clues:["บอกความจริงอย่างอ่อนโยน","บล็อกและรายงานบัญชี","ไม่ต้องไปถามเขาให้เสียเวลา"],
   choices:[{t:"บอกแป้งตรงๆ อย่างอ่อนโยน แล้วช่วยบล็อกและรายงานบัญชี",to:"E1",v:"good"},{t:"ทักไปถามเขาตรงๆ ว่าทำไมใช้รูปคนอื่น ให้โอกาสเขาอธิบาย",to:"E2",v:"risky"},{t:"อาจเป็นรูปเพื่อนเขาที่หน้าคล้ายกัน รอดูก่อนอย่าเพิ่งตัดสิน",to:"E3",v:"bad"}]},
  s2b:{title:"กล้องเสียอีกแล้ว",
   body:`${chat("J","Captain James 💙","วิศวกรแท่นขุดเจาะ",["กล้องผมเสียเพราะคลื่นทะเล 😢","จ่ายก่อนนะที่รัก แล้วเราจะได้เจอกัน"])}`,
   clues:["ข้ออ้างไม่เปิดกล้องซ้ำๆ","\"จ่ายก่อนแล้วจะได้เจอ\" คือเหยื่อล่อ","ตรวจรูปโปรไฟล์ดีกว่ารอ"],
   choices:[{t:"ค้นรูปโปรไฟล์ย้อนกลับแทน",to:"s2a",v:"good"},{t:"โอนให้เขาก่อนเพื่อพิสูจน์ว่าแป้งไว้ใจ",to:"E3",v:"bad"},{t:"รอให้เขาซ่อมกล้องเสร็จก่อนแล้วค่อยคุยต่อ",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ไปสู่สุคติ",title:"แป้งเลิกรอแล้ว",story:"แป้งหัวเราะทั้งน้ำตา \"เสียเวลารอตั้งร้อยปี\" แล้วลอยออกไปเที่ยวงานวัดคืนนี้",lessons:["คุยนานแต่ไม่เคยเห็นหน้า = สัญญาณเตือน","ค้นรูปย้อนกลับช่วยได้","ของขวัญติดศุลกากรคือมุกหลอกเงิน"]},
  E2:{type:"warn",label:"เกือบไป",title:"ยังใจอ่อนนิดๆ",story:"แป้งไม่ได้จ่าย แต่ยังคุยต่อและเขายังหาข้ออ้างใหม่ๆ แป้งไปได้ แต่ยังแอบหันกลับมาดูมือถือ",lessons:["ไม่ต้องเถียงกับคนร้าย บล็อกเลย","ข้ออ้างจะมีไม่จบ","รายงานบัญชีเพื่อปกป้องคนอื่น"]},
  E3:{type:"danger",label:"ยังติดอยู่",title:"รอต่อไป",story:"แป้งยืมเงินผีทั้งบ้านไปจ่าย ของขวัญไม่เคยมา และตอนนี้ต้องจ่ายค่า \"ประกันพัสดุ\" อีก",lessons:["ความรักไม่ต้องพิสูจน์ด้วยการโอนเงิน","ไม่เคยเห็นหน้าจริง อย่าโอน","ค่าธรรมเนียมจะงอกไม่หยุด"]}
 }},

fortune:{id:"fortune",level:"ยาก",start:"s1",title:"หมอดูบอกว่าบ้านมีผี",
 learn:["หลอกด้วยความกลัว","พิธีออนไลน์ที่เก็บเงินเพิ่มเรื่อยๆ","ไม่มีใครรับประกันโชคได้","เก็บหลักฐานและรายงาน"],
 scenes:{
  s1:{title:"พี่โต้งกลัวผี",
   body:`<p>พี่โต้ง ผีเจ้าของบ้าน ตัวสั่นอยู่ใต้โต๊ะ \"หมอดูออนไลน์บอกว่าบ้านนี้ดวงตก มีวิญญาณร้าย ต้องจ่ายค่าสะเดาะเคราะห์ 9,999 ไม่งั้นจะเจอเรื่องร้าย พี่กลัว!\"</p>${chat("ห","อาจารย์ใหญ่ หมอดูแม่น","ไลฟ์ทุกคืน",["ดวงบ้านคุณตกหนัก มีวิญญาณร้ายแอบอยู่","จ่าย 9,999 ภายในคืนนี้ อาจารย์จะทำพิธีให้ ไม่งั้นเคราะห์จะถึงตัว"])}`,
   clues:["ขู่ให้กลัว แล้วเร่งให้จ่ายภายในคืนนี้","ไม่มีใครรับประกันโชคได้","บ้านนี้ผีคือพี่โต้งเอง"],
   choices:[{t:"ชี้ให้พี่โต้งเห็นว่าเขาใช้ความกลัวและเร่งให้จ่าย ไม่ต้องจ่ายอะไร",to:"E1",v:"good"},{t:"จ่ายค่าพิธีไปเพื่อความสบายใจ ถ้าช่วยให้หลับได้ก็คุ้ม",to:"s2",v:"bad"},{t:"ขอให้อาจารย์ทำพิธีผ่านไลฟ์ให้ดูก่อน แล้วค่อยจ่าย",to:"s2",v:"risky"}]},
  s2:{title:"พิธียังไม่จบ",
   body:`${chat("ห","อาจารย์ใหญ่ หมอดูแม่น","ไลฟ์ทุกคืน",["พิธีรอบแรกเสร็จแล้ว แต่วิญญาณร้ายแรงกว่าที่คิด","ต้องจ่ายค่าเครื่องบูชาเพิ่ม 19,999 ไม่งั้นพิธีจะย้อนกลับ"])}`,
   clues:["ค่าใช้จ่ายเพิ่มขึ้นทุกรอบ","ขู่ว่าพิธีจะย้อนกลับ","หยุดตรงนี้ดีที่สุด"],
   choices:[{t:"หยุดจ่าย เก็บหลักฐาน และรายงานบัญชี",to:"E2",v:"good"},{t:"จ่ายเพิ่มรอบสุดท้าย ไม่งั้นพิธีจะย้อนกลับมาแรงกว่าเดิม",to:"E3",v:"bad"},{t:"ขอผ่อนจ่ายเป็นงวด จะได้ไม่หนักเกินไป",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ไปสู่สุคติ",title:"ผีไม่กลัวผีแล้ว",story:"พี่โต้งหัวเราะจนตกเก้าอี้ \"ผีในบ้านก็คือพี่เองนี่หว่า\" แล้วลอยออกไปเปิดหน้าต่างรับลมเป็นครั้งแรกในรอบสิบปี",lessons:["หลอกด้วยความกลัวมักมีการเร่งเวลา","ไม่มีใครรับประกันโชคได้ด้วยเงิน","บล็อกและรายงาน"]},
  E2:{type:"warn",label:"เกือบไป",title:"เสียไปรอบเดียว",story:"พี่โต้งเสีย 9,999 ไปรอบแรก แต่ไม่จ่ายเพิ่ม และรายงานบัญชีไว้ พี่โต้งไปได้ แต่ยังเข็ดหมอดูไปอีกร้อยปี",lessons:["ค่าพิธีที่เพิ่มเรื่อยๆ คือสัญญาณหลอก","ตัดขาดทุนเร็วดีที่สุด","เก็บหลักฐานไว้แจ้งความ"]},
  E3:{type:"danger",label:"ยังติดอยู่",title:"เคราะห์จริงคือการจ่าย",story:"พี่โต้งจ่ายไปเรื่อยๆ จนเงินกงเต๊กหมดบ้าน อาจารย์ยังไลฟ์ทุกคืนและบอกว่าต้องทำอีกเจ็ดพิธี",lessons:["ความกลัวทำให้เราไม่คิด","ผ่อนจ่าย = ยอมรับว่าจะจ่ายต่อ","หยุดแล้วรายงาน"]}
 }}
};

const EN={
merit:{id:"merit",level:"ยาก",start:"s1",title:"Merit that never arrives",
 learn:["Fake donation pages that prey on grief","Donation accounts should be in the temple's or foundation's name","Check with the real temple via a number you find","Tell the truth gently"],
 scenes:{
  s1:{title:"Her daughter donates every night",
   body:`<p>Mae Choy floats in circles before an old mirror. \"My daughter sends merit to me every night, but it never reaches me. So I can't move on.\"</p>${chat("W","Wat Pa Sawang Tham (online)","page · 120K followers ✓",["Donate a coffin for 999 baht, merit reaches the departed instantly 🙏","Transfer to the abbot's account: Mr K. 405-2-11xxx"])}`,
   clues:["The account is a person's name, not the temple's","Followers can be bought","Scammers target grieving people"],
   choices:[{t:"Check whether the account is in the temple's name, then find the real temple's number and call",to:"s2a",v:"good"},{t:"The page has a hundred thousand followers and daily donors, it must be real",to:"E3",v:"bad"},{t:"Tell the daughter to give less, donate but don't strain herself",to:"E2",v:"risky"}]},
  s2a:{title:"The real temple has no such page",
   body:`<p>The real abbot says, \"We have no such page. Our donation account is only in the temple's name.\" Mae Choy asks, \"Will my daughter be heartbroken?\"</p>`,
   clues:["Tell the truth with a way forward","Report the page to stop others being fooled","Merit at the real temple is always possible"],
   choices:[{t:"Help her daughter report the page, and tell her she can make merit at the real temple",to:"E1",v:"good"},{t:"Don't tell her. Let her keep believing her merit reached her mother",to:"E2",v:"risky"},{t:"Have her message the page for a refund, threatening to report it",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Moved on",title:"The merit arrived",story:"Her daughter cried, then smiled: tomorrow she'll go to the real temple. Mae Choy stroked the head of the daughter who couldn't see her, and faded into the candlelight.",lessons:["Donation accounts should carry the temple's or foundation's name","Check with the temple via a number you found","Scammers strike when we're saddest"]},
  E2:{type:"warn",label:"Close call",title:"Half the merit arrived",story:"Her daughter donates less or still doesn't know. The fake page lives on, fooling other families. Mae Choy moves on, but glances back with worry.",lessons:["Paying less doesn't stop the scam","Report fake pages","A gently told truth beats a secret"]},
  E3:{type:"danger",label:"Still stuck",title:"The merit never came",story:"Her daughter keeps paying every night, and now the page wants a \"special merit ceremony\" fee too. Mae Choy still circles the mirror.",lessons:["Follower counts prove nothing","Asking for refunds invites a second scam","Donate through temples you can verify"]}
 }},

inherit:{id:"inherit",level:"ยาก",start:"s1",title:"A 2-million inheritance with an unlock fee",
 learn:["Inheritance scams","Real inheritances go through courts and banks","Fees that keep growing","Never send ID copies to people who contact you"],
 scenes:{
  s1:{title:"Grandpa Hem worries",
   body:`<p>Grandpa Hem paces, chains clanking. \"My grandson got this letter. I never had two million baht!\"</p>${doc("Inheritance notice","URGENT",[["To","Mr Hem's grandson"],["Inheritance","2,000,000 baht"],["Unlock fee","25,000 baht within 3 days"],["Pay to","Lawyer Somsak (personal account)"]])}`,
   clues:["Real inheritances go through courts and banks","No unlock fee is paid into a personal account","Grandpa Hem doesn't even know of this money"],
   choices:[{t:"Tell the grandson real inheritances have no unlock fee; call Grandpa's bank on a number he finds himself",to:"E1",v:"good"},{t:"Pay the 25,000, it's small next to a two-million inheritance",to:"s2",v:"bad"},{t:"Have the grandchild send an ID copy so the lawyer can check eligibility first",to:"s2",v:"risky"}]},
  s2:{title:"Fees keep growing",
   body:`${chat("L","Lawyer Somsak","Inheritance Law Office",["Received. Now 80,000 inheritance tax is due","If unpaid today, the claim is cancelled"])}<p>Grandpa Hem clutches his head. \"My grandson will be ruined!\"</p>`,
   clues:["New conditions keep appearing","\"Today\" is pressure","Stop and report"],
   choices:[{t:"Stop, keep the evidence, and help him report to 1441",to:"E2",v:"good"},{t:"Pay the final tax, or the whole inheritance is forfeited",to:"E3",v:"bad"},{t:"Negotiate to cut the fee in half",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Moved on",title:"Grandpa Hem drops his chains",story:"The bank says there's no inheritance at all. The grandson deletes the email and blocks the fake lawyer. Grandpa Hem laughs, the chains fall silent, and he floats out the window.",lessons:["Real inheritances go through courts and banks","No unlock fees to personal accounts","Check using a number you found"]},
  E2:{type:"warn",label:"Close call",title:"Some lost, stopped in time",story:"The grandson lost some money or his ID details, but stopped before the big payment. Grandpa Hem moves on, grumbling all the way.",lessons:["Growing fees signal a scam","Never send ID copies to someone who contacted you","Reporting fast can freeze money"]},
  E3:{type:"danger",label:"Still stuck",title:"Two million that never existed",story:"The grandson paid over 100,000 baht and the lawyer vanished. Grandpa Hem still drags his chains around the house.",lessons:["Free money you must pay for first isn't free","Negotiating fees means agreeing to pay","Stop and call 1441"]}
 }},

romance:{id:"romance",level:"ยาก",start:"s1",title:"The ghost girl's online boyfriend",
 learn:["Romance scams","Reverse image search","Excuses not to turn on the camera","Gifts stuck in customs"],
 scenes:{
  s1:{title:"Waiting for him",
   body:`<p>Paeng the ghost sits chin in hand on the stairs. \"I'm waiting for my boyfriend. He sent a gift from abroad but it's stuck in customs, I have to pay 15,000. Ghosts don't have money, so I'm stuck too.\"</p>${chat("J","Captain James 💙","oil rig engineer",["Darling, your gift is in customs, please pay the tax first","I can't turn on my camera, I'm at sea, bad signal"])}`,
   clues:["They've talked for ages but she's never seen his face","Gifts stuck in customs are a classic","A far-away job to avoid meeting"],
   choices:[{t:"Help Paeng reverse-search his profile photo to see whose it is",to:"s2a",v:"good"},{t:"Let Paeng borrow from the other ghosts to help him, he'll pay it back",to:"E3",v:"bad"},{t:"Ask him to video call first, seeing his face would settle it",to:"s2b",v:"risky"}]},
  s2a:{title:"The photo is someone else's",
   body:`<p>Captain James's photos belong to a fitness trainer with hundreds of thousands of followers, who has posted warnings that his photos are used in scams in many countries. Paeng goes quiet.</p>`,
   clues:["Tell the truth gently","Block and report the account","No need to confront him"],
   choices:[{t:"Tell Paeng gently and honestly, then help block and report",to:"E1",v:"good"},{t:"Ask him directly why he uses someone else's photo and let him explain",to:"E2",v:"risky"},{t:"Maybe it's a friend who looks alike. Wait and don't judge yet",to:"E3",v:"bad"}]},
  s2b:{title:"Camera broken again",
   body:`${chat("J","Captain James 💙","oil rig engineer",["My camera broke from the sea waves 😢","Pay first darling, then we can meet"])}`,
   clues:["Repeated excuses to avoid the camera","\"Pay first, then we meet\" is bait","Checking the photo beats waiting"],
   choices:[{t:"Reverse-search the profile photo instead",to:"s2a",v:"good"},{t:"Send it first to show Paeng trusts him",to:"E3",v:"bad"},{t:"Wait until his camera is fixed, then carry on",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Moved on",title:"Paeng stops waiting",story:"Paeng laughs through tears: \"I waited a hundred years for this?\" Then she floats off to the temple fair tonight.",lessons:["Long chats but never a face = warning","Reverse image search helps","Gifts stuck in customs are a money trick"]},
  E2:{type:"warn",label:"Close call",title:"Still a little soft",story:"Paeng didn't pay, but kept chatting and he keeps finding new excuses. She moves on, but sneaks a look at her phone.",lessons:["Don't argue with scammers, just block","The excuses never end","Report to protect others"]},
  E3:{type:"danger",label:"Still stuck",title:"Still waiting",story:"Paeng borrowed from every ghost in the house to pay. The gift never came, and now there's a \"parcel insurance\" fee.",lessons:["Love never needs proving with money","Never pay someone you've not seen","The fees keep coming"]}
 }},

fortune:{id:"fortune",level:"ยาก",start:"s1",title:"A fortune teller says the house is haunted",
 learn:["Fear-based scams","Online rituals that keep charging","Nobody can guarantee luck","Keep evidence and report"],
 scenes:{
  s1:{title:"Tong is scared of ghosts",
   body:`<p>Tong, the ghost who owns the house, trembles under a table. \"An online fortune teller says this house has terrible luck and an evil spirit. I must pay 9,999 for a ritual or something awful will happen. I'm scared!\"</p>${chat("M","Grand Master, accurate readings","live every night",["Your house's luck has fallen hard. An evil spirit hides there","Pay 9,999 tonight and I'll perform the ritual, or misfortune will strike you"])}`,
   clues:["Fear first, then rush to pay tonight","Nobody can guarantee luck","The ghost in this house is Tong himself"],
   choices:[{t:"Show Tong he's using fear and a deadline. No need to pay anything",to:"E1",v:"good"},{t:"Pay for the ritual for peace of mind, worth it if it helps him sleep",to:"s2",v:"bad"},{t:"Ask the master to do the ritual on a live stream first, then pay",to:"s2",v:"risky"}]},
  s2:{title:"The ritual isn't finished",
   body:`${chat("M","Grand Master, accurate readings","live every night",["The first ritual is done, but the spirit is stronger than expected","Pay 19,999 for offerings or the ritual will reverse"])}`,
   clues:["The cost rises each round","Threats that the ritual will reverse","Stopping now is best"],
   choices:[{t:"Stop paying, keep evidence, and report the account",to:"E2",v:"good"},{t:"Pay the last bit, or the ritual will backfire even worse",to:"E3",v:"bad"},{t:"Ask to pay in instalments so it isn't too heavy",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Moved on",title:"The ghost isn't scared of ghosts",story:"Tong laughs so hard he falls off his chair: \"The ghost in this house is me!\" Then he floats over and opens the window for the first time in ten years.",lessons:["Fear-based scams come with deadlines","No money can guarantee luck","Block and report"]},
  E2:{type:"warn",label:"Close call",title:"Lost just one round",story:"Tong lost 9,999 on the first round, but paid no more and reported the account. He moves on, wary of fortune tellers for a hundred years.",lessons:["Ritual fees that keep rising signal a scam","Cutting losses early is best","Keep evidence to report"]},
  E3:{type:"danger",label:"Still stuck",title:"The real misfortune is paying",story:"Tong kept paying until the house's spirit money ran out. The master still goes live every night, saying seven more rituals are needed.",lessons:["Fear stops us thinking","Instalments mean agreeing to keep paying","Stop and report"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
