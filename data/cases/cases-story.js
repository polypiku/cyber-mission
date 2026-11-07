/* ===== Story cases: the recovery scam (recurring victim) and the final bust ===== */
(function(){
const PH='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"/></svg>';
const XX='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const call=(lab,who,num,note)=>`<div class="call"><div class="lab">${lab}</div><div class="who">${who}</div><div class="num">${num}</div><div class="btnrow"><i class="dec">${XX}</i><i class="acc">${PH}</i></div>${note?`<div class="callnote">${note}</div>`:""}</div>`;
const doc=(head,stamp,rows)=>`<div class="doc"><div class="dh">${head} <span class="stamp">${stamp}</span></div>${rows.map(r=>`<div class="dr"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}</div>`;
const board=(items)=>`<div class="mini-board">${items.map(i=>`<span>${i}</span>`).join("")}</div>`;

const TH={
recover:{id:"recover",level:"ยาก",start:"s1",title:"มีคนช่วยตามเงินคืน",
 learn:["มิจฉาชีพหลอกซ้ำผู้เสียหายเดิม","ไม่มีหน่วยงานไหนเก็บค่าธรรมเนียมก่อนคืนเงิน","ข้อมูลคดีที่ถูกต้องก็หลุดได้","ตามเรื่องผ่านช่องทางที่แจ้งความไว้"],
 scenes:{
  s1:{title:"สายจาก \"สำนักงานกฎหมาย\"",
   body:`<p>คนที่คุณช่วยไม่ทันในโซนก่อน เดินมาหาที่ถนนด้วยสีหน้ามีความหวัง \"มีคนโทรมาบอกว่าตามเงินที่โดนโกงคืนให้ได้ เขารู้หมดเลยว่าโดนไปเท่าไหร่ วันไหน\"</p>${call("สายเรียกเข้า","สำนักงานกฎหมาย ทวงคืนทรัพย์","02 xxx 4400","\"เราติดตามบัญชีคนร้ายเจอแล้วค่ะ ชำระค่าดำเนินการ 3,000 บาท ได้เงินคืนเต็มจำนวนภายใน 7 วัน\"")}`,
   clues:["ผู้เสียหายเดิมคือเป้าหมายที่ง่ายที่สุด","คนร้ายรู้รายละเอียดเพราะเป็นแก๊งเดียวกันหรือได้ข้อมูลไป","การคืนเงินจริงไม่เก็บค่าธรรมเนียมล่วงหน้า"],
   choices:[{t:"บอกว่าเงินคืนต้องผ่านตำรวจหรือธนาคาร ไม่มีใครเก็บค่าดำเนินการก่อน แล้วโทร 1441 ตามเรื่องเดิม",to:"E1",v:"good"},{t:"ขอให้เขาส่งเอกสารรับรองจากสำนักงานกฎหมายมาก่อนจ่าย",to:"s2",v:"risky"},{t:"จ่าย 3,000 เพราะเขารู้เลขคดีและยอดเงินที่เสียไปตรงหมด",to:"E3",v:"bad"}]},
  s2:{title:"เอกสารดูเป็นทางการ",
   body:`${doc("หนังสือรับรองการติดตามทรัพย์","ตราประทับ",[["เลขที่","ทค. 0417/2569"],["ผู้เสียหาย","(ชื่อถูกต้อง)"],["ยอดที่ติดตามได้","เต็มจำนวน"],["ค่าดำเนินการ","3,000 บาท · ชำระภายในวันนี้"]])}<p>\"ส่งรูปบัตรประชาชนกับสมุดบัญชีมาด้วยนะคะ เพื่อโอนเงินคืน\"</p>`,
   clues:["เอกสารทำปลอมได้ ตราประทับก็เช่นกัน","ขอรูปบัตรกับสมุดบัญชี คือการเก็บข้อมูลไปหลอกต่อ","\"ภายในวันนี้\" คือการเร่งอีกแล้ว"],
   choices:[{t:"ไม่ส่งอะไรเพิ่ม วางสาย แล้วไปถามเรื่องที่สถานีตำรวจที่แจ้งความไว้",to:"E2",v:"good"},{t:"ส่งรูปบัตรและจ่ายค่าดำเนินการ เอกสารมีตราครุฑชัดเจน",to:"E3",v:"bad"},{t:"ส่งแค่รูปบัตรให้ตรวจสอบสิทธิ์ แต่ยังไม่จ่ายเงิน",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ไม่โดนซ้ำสอง",story:"เจ้าหน้าที่ 1441 ยืนยันว่าไม่มีหน่วยงานไหนเก็บค่าธรรมเนียมเพื่อตามเงินคืน และช่วยตามเรื่องเดิมให้ เบอร์นั้นถูกส่งเข้ากระดานหลักฐานด้วย",lessons:["ผู้เสียหายเดิมมักถูกหลอกซ้ำ","คืนเงินจริงไม่เก็บค่าธรรมเนียมล่วงหน้า","ตามเรื่องผ่านช่องทางที่แจ้งความไว้เท่านั้น"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เกือบโดนรอบสอง",story:"ไม่เสียเงินเพิ่ม แต่ข้อมูลบางส่วนอาจหลุดไปแล้ว ต้องแจ้งธนาคารให้เฝ้าระวังบัญชี และระวังสายแปลกๆ ต่อไปอีกนาน",lessons:["เอกสารและตราประทับทำปลอมได้","อย่าส่งรูปบัตรประชาชนให้คนที่โทรมาเอง","ถามตำรวจที่รับแจ้งความโดยตรง"]},
  E3:{type:"danger",label:"เสียหาย",title:"หลอกซ้ำสอง",story:"จ่าย 3,000 แล้วมี \"ค่าภาษีคืนเงิน\" ตามมาอีก 8,000 เงินก้อนเดิมไม่เคยกลับมา และข้อมูลบัตรถูกใช้เปิดบัญชีม้าเพิ่ม",lessons:["คนที่รู้รายละเอียดคดี อาจเป็นแก๊งเดียวกัน","ไม่มีหน่วยงานรับจ้างตามเงินคืน","บอกคนรอบตัวให้ระวังมุกนี้ด้วย"]}
 }},

bust:{id:"bust",level:"ยาก",start:"s1",title:"ปิดแก๊งเงา",
 learn:["การเชื่อมโยงหลักฐาน","รายงานให้ถูกที่ถูกเวลา","ป้องกันเหยื่อรายใหม่","บทบาทของคนธรรมดาในการหยุดแก๊ง"],
 scenes:{
  s1:{title:"ห้องสืบสวน",
   body:`<p>ตึกที่คุณสืบเจอยังเปิดไฟทั้งคืน คุณกับพี่การ์ดนำหลักฐานทั้งหมดมาให้ตำรวจไซเบอร์ เจ้าหน้าที่ถามคำถามแรก</p>${board(["🏷️ QR → ธนพล","💬 แชต → ปวีณา","💸 เติมเงิน → ปวีณา","🏦 ประกันตัว → สมพงษ์","🐴 แชตพี่เจ"])}<p>\"บัญชีรับเงินพวกนี้ ชิ้นไหนบอกว่ามาจากที่เดียวกัน\"</p>`,
   clues:["มีชิ้นเดียวที่มีรายชื่อบัญชีครบ","บัญชีม้าคือเส้นทางเงินของแก๊ง","คนจ้างเปิดบัญชีคือจุดเชื่อม"],
   choices:[{t:"แชตของพี่เจ ที่มีรายชื่อบัญชีที่จ้างเปิด: ธนพล ปวีณา สมพงษ์",to:"s2",v:"good"},{t:"สติกเกอร์ QR บนโต๊ะ เพราะเป็นหลักฐานชิ้นแรกที่พาไปหาบัญชีปลายทาง",to:"E2",v:"bad"},{t:"สลิปปลอม เพราะมีเลขรายการที่ตามต่อไปที่ธนาคารได้",to:"E2",v:"bad"}]},
  s2:{title:"เว็บปลอมห้าเว็บ",
   body:`${board(["🌐 nakhonthong-verify.co","📶 หน้า Wi-Fi ปลอม","📦 songwai-th.delivery","🧾 slip-check.online","📱 pea-refund.app"])}<p>\"ทั้งห้าเว็บมีอะไรเหมือนกัน แล้วควรทำยังไง\"</p>`,
   clues:["ทุกเว็บชี้ไปเซิร์ฟเวอร์ 185.xx.xx.7","ปิดทีละเว็บ คนร้ายย้ายได้ทัน","ต้องปิดพร้อมกันที่ต้นทาง"],
   choices:[{t:"อยู่บนเซิร์ฟเวอร์เดียวกัน ขอให้ปิดพร้อมกันที่ต้นทาง",to:"s3",v:"good"},{t:"รายงานทีละเว็บตามที่เจอ จะได้ปิดได้ครบทุกเว็บแน่ๆ",to:"E2",v:"risky"},{t:"โพสต์ลิงก์ทั้งหมดลงโซเชียล ให้คนช่วยกันรายงานจนเว็บล่ม",to:"E2",v:"bad"}]},
  s3:{title:"ก่อนวันทลาย",
   body:`${board(["☎️ 02 xxx 8810","📹 +66 8x xxx 0912","📱 แอปให้โทรกลับ 02 xxx 8810"])}<p>เบอร์ทั้งหมดมาจากซิมชุดเดียวกัน ตำรวจพร้อมลงพื้นที่พรุ่งนี้ \"ก่อนหน้านั้น เราควรทำอะไรเพื่อไม่ให้มีเหยื่อเพิ่ม\"</p>`,
   clues:["ผู้เสียหายจะถูกหลอกซ้ำด้วยมุกตามเงินคืน","ประกาศชื่อก่อนจับ คนร้ายหนีทัน","เตือนแบบไม่เปิดเผยแผน"],
   choices:[{t:"เตือนผู้เสียหายทุกคนว่าจะมีคนอ้างช่วยตามเงินคืน ให้แจ้ง 1441 เท่านั้น",to:"E1",v:"good"},{t:"ประกาศชื่อผู้ต้องสงสัยลงโซเชียลก่อน คนจะได้ระวัง",to:"E2",v:"bad"},{t:"ส่งเรื่องให้ตำรวจแล้ว ที่เหลือปล่อยให้ตำรวจจัดการทั้งหมด",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"สำเร็จ",title:"ทลายแก๊งเงา",story:"ตำรวจบุก \"บริษัท ชาโดว์ เทเลเซลส์\" ตึกออฟฟิศฝั่งตรงข้ามถนนที่ข้างนอกดูเหมือนบริษัทธรรมดา แต่ชั้นบนเป็นคอลเซ็นเตอร์ และชั้น 3 ขังคนที่ถูกหลอกมาทำงานไว้ ตามหลักฐานที่คุณเรียงไว้ ปิดเว็บปลอมพร้อมกัน และอายัดบัญชีม้า จะจับได้มากแค่ไหนขึ้นกับว่าคุณช่วยคนไว้ได้กี่คน ยาย ตา และเพื่อนๆ มารอฟังผลที่ถนนหน้าร้าน",lessons:["หลักฐานเล็กๆ จากคนธรรมดา ต่อกันแล้วหยุดแก๊งได้","รายงานให้ถูกที่ และไม่เปิดเผยแผนก่อนเวลา","หลังเหตุการณ์ ต้องระวังมุกหลอกซ้ำเสมอ"]},
  E2:{type:"warn",label:"ยังไม่สำเร็จ",title:"แก๊งหนีทัน",story:"หลักฐานยังเชื่อมกันไม่ชัด หรือแผนรั่วไหลก่อน คนร้ายย้ายเซิร์ฟเวอร์และทิ้งซิมทั้งหมด ตำรวจต้องเริ่มสืบใหม่ ลองเรียงหลักฐานอีกครั้ง",lessons:["หาจุดเชื่อมที่ชัดที่สุด","ปิดพร้อมกันที่ต้นทาง ไม่ใช่ทีละจุด","อย่าเปิดเผยแผนก่อนลงมือ"]}
 }}
};
const EN={
recover:{id:"recover",level:"ยาก",start:"s1",title:"Someone can get your money back",
 learn:["Scammers re-target past victims","No agency charges a fee before a refund","Correct case details can leak too","Follow up through the channel you reported to"],
 scenes:{
  s1:{title:"A call from a \"law office\"",
   body:`<p>The person you couldn't save in an earlier zone walks up to you on the street, looking hopeful. \"Someone called saying they can get my stolen money back. They know exactly how much and when.\"</p>${call("Incoming call","Asset Recovery Law Office","02 xxx 4400","\"We've traced the scammer's account. Pay a 3,000 baht processing fee and get the full amount back within 7 days.\"")}`,
   clues:["Past victims are the easiest targets","They know details because they're the same gang or bought the data","Real refunds never charge an upfront fee"],
   choices:[{t:"Explain refunds go through police or the bank with no upfront fee. Hang up and call 1441 about the original case",to:"E1",v:"good"},{t:"Ask for the law office's certified documents before paying",to:"s2",v:"risky"},{t:"Pay the 3,000, he knows the case number and the exact amount lost",to:"E3",v:"bad"}]},
  s2:{title:"Official-looking papers",
   body:`${doc("Certificate of Asset Recovery","SEAL",[["No.","AR 0417/2026"],["Victim","(correct name)"],["Recovered","Full amount"],["Processing fee","3,000 baht · due today"]])}<p>\"Please also send a photo of your ID card and bank book so we can transfer the refund.\"</p>`,
   clues:["Documents and seals are easy to fake","ID and bank book photos are data for the next scam","\"Due today\" is pressure again"],
   choices:[{t:"Send nothing. Hang up and ask at the police station where the report was filed",to:"E2",v:"good"},{t:"Send the ID photo and pay the fee, the document has the official seal",to:"E3",v:"bad"},{t:"Send only the ID photo for verification, but don't pay yet",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Not fooled twice",story:"The 1441 officer confirmed no agency charges fees to recover money, and followed up the original case. That number went onto the evidence board too.",lessons:["Past victims often get scammed again","Real refunds never charge an upfront fee","Only follow up via the channel you reported to"]},
  E2:{type:"warn",label:"Close call",title:"Nearly round two",story:"No more money lost, but some personal data may have leaked. They had to ask the bank to watch the account and stay wary of strange calls for a long time.",lessons:["Documents and seals can be faked","Never send your ID photo to someone who called you","Ask the police officer who took your report directly"]},
  E3:{type:"danger",label:"Harmed",title:"Scammed twice",story:"After the 3,000 came an 8,000 \"refund tax\". The original money never returned, and the ID was used to open more mule accounts.",lessons:["Someone who knows your case details may be the same gang","No agency is hired to chase refunds","Warn others about this trick too"]}
 }},

bust:{id:"bust",level:"ยาก",start:"s1",title:"Taking down the Shadow gang",
 learn:["Connecting evidence","Reporting in the right place at the right time","Preventing new victims","How ordinary people help stop gangs"],
 scenes:{
  s1:{title:"The investigation room",
   body:`<p>The building you tracked down still glows all night. You and the guard bring all your evidence to the cyber police. The officer asks the first question.</p>${board(["🏷️ QR → Thanaphon","💬 chat → Paweena","💸 top-up → Paweena","🏦 bail → Sompong","🐴 Jay's chat"])}<p>\"Which piece shows these receiving accounts come from the same place?\"</p>`,
   clues:["Only one piece lists all the accounts","Mule accounts are the gang's money route","Whoever hired the account openers is the link"],
   choices:[{t:"Jay's chat, listing the accounts he paid people to open: Thanaphon, Paweena, Sompong",to:"s2",v:"good"},{t:"The table QR sticker, it was the first lead to a receiving account",to:"E2",v:"bad"},{t:"The fake slip, its reference number can be traced at the bank",to:"E2",v:"bad"}]},
  s2:{title:"Five fake sites",
   body:`${board(["🌐 nakhonthong-verify.co","📶 fake Wi-Fi page","📦 songwai-th.delivery","🧾 slip-check.online","📱 pea-refund.app"])}<p>\"What do these five have in common, and what should we do?\"</p>`,
   clues:["Every site points to server 185.xx.xx.7","Take them down one by one and they move","Shut them down together at the source"],
   choices:[{t:"They're on the same server. Ask to shut them all down together at the source",to:"s3",v:"good"},{t:"Report each site one by one so every single one gets taken down",to:"E2",v:"risky"},{t:"Post all the links on social media so people mass-report them",to:"E2",v:"bad"}]},
  s3:{title:"The day before the raid",
   body:`${board(["☎️ 02 xxx 8810","📹 +66 8x xxx 0912","📱 app says call 02 xxx 8810"])}<p>All the numbers come from one batch of SIMs. Police raid tomorrow. \"Before then, what should we do so there are no new victims?\"</p>`,
   clues:["Victims will be re-targeted with refund scams","Naming suspects early lets them escape","Warn without revealing the plan"],
   choices:[{t:"Warn every victim that people will offer to recover their money, and to report only via 1441",to:"E1",v:"good"},{t:"Publish the suspects' names online first so people stay alert",to:"E2",v:"bad"},{t:"The police have it now, leave everything else to them",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Success",title:"The Shadow gang is down",story:"Following the evidence you lined up, police raided \"Shadow Telesales\", an ordinary-looking office building across the road whose upper floors hid a call centre and locked-up workers,, took the fake sites down together and froze the mule accounts. How many get caught depends on how many people you saved. Grandma, Grandpa and your friends wait on the street for the news.",lessons:["Small evidence from ordinary people, joined up, can stop a gang","Report to the right place and don't reveal plans early","Afterwards, always watch for follow-up scams"]},
  E2:{type:"warn",label:"Not yet",title:"The gang slipped away",story:"The links weren't clear enough, or the plan leaked. The gang moved servers and dumped their SIMs, and police must start over. Try arranging the evidence again.",lessons:["Find the clearest link","Shut down at the source, all at once","Don't reveal plans before acting"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
