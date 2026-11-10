/* ===== Zone 3: bank cases (harder, about helping someone under pressure) ===== */
(function(){
const PH='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"/></svg>';
const XX='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const call=(lab,who,num,note)=>`<div class="call"><div class="lab">${lab}</div><div class="who">${who}</div><div class="num">${num}</div><div class="btnrow"><i class="dec">${XX}</i><i class="acc">${PH}</i></div>${note?`<div class="callnote">${note}</div>`:""}</div>`;
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const vcall=(time,cap,banner,sub)=>`<div class="vcall"><div class="vtop"><span class="rec"></span>${cap} · ${time}</div><div class="vstage"><div class="vbanner">${banner}</div><div class="cop"><i class="cap"></i><i class="head"></i><i class="body"></i></div><div class="self"></div></div><div class="vsub">${sub}</div></div>`;
const teller=(q,line)=>`<div class="teller"><div class="tq"><small>Q</small><b>${q}</b></div><p>${line}</p></div>`;

const TH={
rush:{id:"rush",level:"ยาก",start:"s1",title:"เสียงหลานขอเงินด่วน (เสียงปลอม AI)",
 learn:["เสียงปลอมด้วย AI (deepfake) จากคลิปในโซเชียล","แก๊งอ้างเป็นญาติที่เดือดร้อน","การตรวจสอบผ่านคนในครอบครัว","ทำไมคำว่า \"ห้ามบอกใคร\" คือสัญญาณอันตราย","ข้อมูลในโซเชียลถูกใช้หลอกได้"],
 scenes:{
  s1:{title:"ยายวิ่งเข้ามา",
   body:`<p>ยายศรีมือสั่น ยื่นมือถือให้ดู เมื่อ 10 นาทีก่อนมีสายเข้า เสียงเหมือนต้น หลานชายของยายเป๊ะ ทั้งน้ำเสียงและคำติดปาก แต่ต้นเพิ่งโพสต์คลิปร้องเพลงลงโซเชียลเมื่อวาน</p>${call("สายที่ไม่ได้รับ 2 สาย","ไม่ทราบชื่อ","+66 9x xxx 4471","\"ยาย ผมเอง ต้นไง ผมขับรถชนคน ตำรวจจับอยู่… อย่าบอกแม่นะยาย\"")}${chat("ต","ต้น","บัญชีใหม่",["@วันนี้ 10:12","ยาย มือถือผมโดนยึด ใช้ไลน์นี้แทนนะ","จ่าบอกโอนค่าประกันตัว 50,000 เข้าบัญชีนี้ได้เลย นายสมพงษ์ ร. 412-0-55xxx","ภายใน 1 ชม. นะยาย ไม่งั้นผมต้องนอนในห้องขัง 🙏"])}`,
   clues:["\"อย่าบอกแม่\" ตัดคนที่ตรวจสอบได้ดีที่สุดออกไป","บัญชีชื่อคนอื่น ไม่ใช่ของสถานีตำรวจหรือของต้น","เสียงเหมือนเป๊ะไม่ได้แปลว่าเป็นตัวจริง AI เลียนเสียงจากคลิปไม่กี่วินาทีได้"],
   choices:[{t:"ปลอบยายก่อน แล้วโทรหาต้นที่เบอร์เดิมที่ยายบันทึกไว้",to:"s2a",v:"good"},{t:"ถามคำถามที่มีแต่ต้นจะรู้ผ่านไลน์ใหม่นั้น ถ้าตอบถูกก็เป็นตัวจริง",to:"s2b",v:"risky"},{t:"พายายไปเคาน์เตอร์ก่อน ถ้าต้นถูกจับจริง ทุกนาทีสำคัญ",to:"s3",v:"bad"}]},
  s2a:{title:"ต้นไม่รับสาย",
   body:`<p>เบอร์เดิมของต้นดังจนตัดไป ไม่มีคนรับ ยายเริ่มร้องไห้ ทันใดนั้นมีสายใหม่เข้ามา</p>${call("สายเรียกเข้า","จ่าสมชาย","+66 8x xxx 0912","\"ป้าครับ อีก 20 นาทีผมต้องส่งตัวหลานเข้าเรือนจำแล้วนะ ถ้าไม่อยากให้เป็นเรื่องใหญ่ อย่าโทรบอกใคร\"")}`,
   clues:["ต้นไม่รับสายไม่ได้แปลว่าเขาถูกจับ อาจอยู่ในห้องเรียนหรือทำงาน","ยิ่งเร่งเวลา ยิ่งต้องหยุด","ตำรวจจริงไม่ให้โอนเงินประกันเข้าบัญชีส่วนตัว"],
   choices:[{t:"โทรหาแม่ของต้นทันที ถึง \"จ่า\" จะห้ามบอกใครก็ตาม",to:"E1",v:"good"},{t:"ขอเบอร์สถานีจาก \"จ่า\" แล้วโทรกลับไปยืนยันว่ามีคดีจริงไหม",to:"s3",v:"bad"},{t:"ให้ยายโอนครึ่งเดียวก่อน 25,000 ซื้อเวลาระหว่างตามตัวต้น",to:"E3",v:"bad"}]},
  s2b:{title:"เขาตอบถูก",
   body:`${chat("ต","ต้น","บัญชีใหม่",[">ถ้าเป็นต้นจริง แมวที่บ้านยายชื่ออะไร","มะลิไงยาย 😭 เร็วๆ นะ จ่ารออยู่"])}<p>ยายถอนหายใจโล่งอก \"ใช่ต้นจริงๆ ด้วย\" แล้วหยิบบัตรคิวลุกขึ้น คุณนึกขึ้นได้ว่าเคยเห็นรูปแมวมะลิในเฟซบุ๊กของต้น</p>`,
   clues:["คำถามที่คำตอบอยู่ในโซเชียล ใช้ยืนยันตัวตนไม่ได้","คนร้ายเตรียมข้อมูลจากโปรไฟล์สาธารณะมาก่อน","การยืนยันที่ดีต้องผ่านช่องทางที่เราติดต่อเอง"],
   choices:[{t:"บอกยายว่าเรื่องแมวอยู่ในเฟซบุ๊ก แล้วชวนโทรหาแม่ของต้น",to:"E1",v:"good"},{t:"ให้ยายโอนได้ แต่ต้องเป็นบัญชีชื่อต้นเท่านั้น เงินจะไม่หายไปไหน",to:"s3",v:"bad"},{t:"พายายไปเคาน์เตอร์แล้วถามพนักงานธนาคารว่าควรทำยังไง",to:"s3",v:"risky"}]},
  s3:{title:"ที่เคาน์เตอร์",
   body:`${teller("A047","พนักงาน: \"คุณยายจะโอน 50,000 ให้ใครคะ เกี่ยวข้องเป็นอะไรกัน ช่วงนี้มีคนโดนหลอกให้โอนค่าประกันตัวเยอะเลยค่ะ\"")}<p>ยายตอบเบาๆ ว่า \"ให้หลานค่ะ\" ตามที่ \"จ่า\" สอนไว้ว่าถ้าธนาคารถามให้ตอบแบบนี้</p>`,
   clues:["คนร้ายสอนเหยื่อล่วงหน้าว่าจะตอบธนาคารยังไง","พนักงานธนาคารเห็นเคสแบบนี้บ่อย และหยุดธุรกรรมได้","เปลี่ยนไปโอนช่องทางอื่นเพื่อเลี่ยงคำถาม คือสัญญาณว่าถูกชักจูง"],
   choices:[{t:"บอกพนักงานตามจริงว่ามีคนอ้างเป็นตำรวจให้โอนค่าประกัน",to:"E2",v:"good"},{t:"บอกพนักงานว่าเป็นเรื่องในครอบครัว ยายตั้งใจโอนเอง",to:"E4",v:"bad"},{t:"ชวนยายโอนผ่านแอปแทน เร็วกว่าและไม่ต้องรอคิว",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ต้นนั่งเรียนอยู่",story:"แม่ของต้นโทรหาเขาผ่านเพื่อนร่วมห้อง ต้นนั่งเรียนอยู่ ไม่ได้ขับรถด้วยซ้ำ ยายร้องไห้อีกรอบ แต่คราวนี้เพราะโล่งใจ",lessons:["เรื่องด่วนของคนในครอบครัว ให้ยืนยันผ่านคนในครอบครัวอีกคน","\"ห้ามบอกใคร\" คือวิธีตัดคนที่จะช่วยเราออกไป","ตำรวจไม่ให้โอนค่าประกันตัวเข้าบัญชีส่วนตัว"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เคาน์เตอร์เบรกไว้ทัน",story:"พนักงานพักรายการไว้ แล้วช่วยโทรหาแม่ของต้นจนรู้ว่าเป็นแก๊งหลอก ยายไม่เสียเงิน แต่เกือบไปแล้ว และคนร้ายรู้แล้วว่ายายเชื่อง่าย อาจโทรมาอีก",lessons:["บอกความจริงกับพนักงานธนาคาร พวกเขาช่วยหยุดเรื่องแบบนี้ได้","ควรตรวจสอบตั้งแต่ก่อนเดินไปเคาน์เตอร์","เตือนคนในบ้านว่าแก๊งอาจโทรกลับมาอีก"]},
  E3:{type:"danger",label:"เสียหาย",title:"ครึ่งแรกไม่เคยพอ",story:"25,000 บาทหายไปทันที ไม่กี่นาทีต่อมา \"จ่า\" โทรมาบอกว่าคู่กรณีเรียกเพิ่มอีก 80,000 ยายถึงเพิ่งยอมโทรหาแม่ของต้น",lessons:["โอนบางส่วนเพื่อซื้อเวลา คือการยืนยันว่าเราจ่ายได้","คนร้ายจะเรียกเพิ่มเรื่อยๆ","ถ้าโอนไปแล้ว รีบโทรธนาคารและแจ้ง 1441 ทันที"]},
  E4:{type:"danger",label:"เสียหาย",title:"เงินเก็บก้อนสุดท้าย",story:"50,000 บาทเข้าบัญชีม้าแล้วถูกโอนต่อภายในไม่กี่นาที ตกเย็นต้นโทรมาหายายตามปกติ โดยไม่รู้เรื่องอะไรเลย",lessons:["อย่าช่วยปิดบังเรื่องกับพนักงานธนาคาร","การเลี่ยงคำถามด้วยการโอนผ่านแอป ทำให้ไม่มีใครเบรกได้","ญาติที่เดือดร้อนจริงรอให้ยืนยันได้เสมอ"]}
 }},

video:{id:"video",level:"ยาก",start:"s1",title:"วิดีโอคอลจาก \"ตำรวจ\"",
 learn:["การควบคุมเหยื่อผ่านวิดีโอคอล","ทำไมคนร้ายสั่งให้อยู่คนเดียว","ข้อมูลส่วนตัวไม่ได้พิสูจน์ว่าเป็นเจ้าหน้าที่","สายด่วน 1441 และการช่วยคนที่ถูกครอบงำ"],
 scenes:{
  s1:{title:"ตาบุญนั่งอยู่มุมห้อง",
   body:`<p>ตาบุญนั่งหันหน้าเข้าผนัง ใส่หูฟัง ถือมือถือไว้ระดับสายตา บนจอเป็นชายในชุดเครื่องแบบ</p>${vcall("03:12:47","วิดีโอคอล","สถานีตำรวจ ศูนย์ปราบปรามการฟอกเงิน","\"คุณพัวพันคดีฟอกเงิน ห้ามวางสาย ห้ามบอกใคร ต้องอยู่คนเดียวตลอดการสอบสวน\"")}<p>ตากระซิบกับคุณ \"อย่าเข้ามานะหลาน เขาบอกห้ามคุยกับใคร\"</p>`,
   clues:["คุยต่อเนื่อง 3 ชั่วโมงคือการไม่ให้เหยื่อได้คิด","ตำรวจจริงไม่สอบสวนผ่านวิดีโอคอล และไม่สั่งให้อยู่คนเดียว","คำขู่ว่าถ้าบอกใครจะผิดกฎหมาย มีไว้ตัดคนช่วย"],
   choices:[{t:"เดินไปนั่งข้างตา ให้ตาเห็นว่าไม่ได้อยู่คนเดียว แล้วกระซิบถามว่าเกิดอะไรขึ้น",to:"s2a",v:"good"},{t:"ไม่เข้าไปยุ่ง ถ้าเป็นคดีจริง การไปขัดขวางอาจทำให้เรามีความผิดด้วย",to:"s3",v:"bad"},{t:"ขอคุยกับ \"ตำรวจ\" ในวิดีโอเอง ถามชื่อ ยศ สังกัดให้ละเอียด",to:"s2c",v:"risky"}]},
  s2a:{title:"ตาเล่าให้ฟัง",
   body:`<p>ตาเล่าเสียงเบาว่า \"เขาให้ถอนเงินสด 300,000 ไปตรวจสอบ มีเจ้าหน้าที่นอกเครื่องแบบรอรับอยู่หน้าธนาคาร ถ้าบริสุทธิ์จะคืนให้ใน 24 ชั่วโมง พรุ่งนี้ต้องไปเปิดห้องโรงแรมอยู่คนเดียวเพื่อสอบต่อ\"</p>${vcall("03:15:02","วิดีโอคอล","สถานีตำรวจ ศูนย์ปราบปรามการฟอกเงิน","\"คุณตา ใครอยู่ข้างๆ ครับ ไล่เขาไป ไม่อย่างนั้นถือว่าขัดขวางเจ้าพนักงาน\"")}`,
   clues:["ไม่มีหน่วยงานไหนรับเงินสดไป \"ตรวจสอบ\"","การให้ไปอยู่โรงแรมคนเดียว คือการกักตัวทางใจ","พอมีคนมาอยู่ข้างๆ คนร้ายจะรีบไล่ทันที"],
   choices:[{t:"ช่วยตาวางสาย แล้วใช้มือถือเราโทร 1441 ด้วยกัน",to:"E1",v:"good"},{t:"ให้ตาถอนเงินไปก่อน แล้วเราตามไปดูว่าเจ้าหน้าที่ที่มารับมีบัตรจริงไหม",to:"E3",v:"bad"},{t:"บอกตาว่าตำรวจจริงไม่วิดีโอคอล แล้วเคารพการตัดสินใจของตาเอง",to:"s3",v:"risky"}]},
  s2c:{title:"เขามีหมายจับ",
   body:`<p>ชายในจอยิ้ม แล้วยกเอกสารขึ้นมาให้กล้องเห็น</p><div class="doc"><div class="dh">หมายจับ <span class="stamp">ด่วนที่สุด</span></div><div class="dr"><span>ชื่อ</span><b>นายบุญ ศรีสุข</b></div><div class="dr"><span>เลขบัตร</span><b>3 1012 00xxx 45 1</b></div><div class="dr"><span>ข้อหา</span><b>ฟอกเงิน · บัญชีม้า</b></div></div><p>\"ใครขัดขวางจะโดนข้อหาด้วยนะครับน้อง\" ตาหน้าซีด \"เขามีเลขบัตรตาด้วย…\"</p>`,
   clues:["เลขบัตรและชื่อหลุดได้จากหลายที่ ไม่ได้พิสูจน์อะไร","เอกสารบนจอทำปลอมได้ง่าย","คนร้ายขู่คนที่เข้ามาช่วยด้วย เพื่อให้ถอยออกไป"],
   choices:[{t:"บอกตาว่าการรู้เลขบัตรไม่ได้แปลว่าเป็นตำรวจ แล้วช่วยตาวางสาย",to:"s2a",v:"good"},{t:"ขอให้เขายกบัตรตำรวจและหมายจับให้กล้องเห็นชัดๆ ก่อน",to:"s3",v:"bad"},{t:"แคปหน้าจอเก็บเป็นหลักฐานไว้ก่อน แล้วให้ตาคุยต่อจนจบ",to:"s3",v:"risky"}]},
  s3:{title:"ที่เคาน์เตอร์ถอนเงิน",
   body:`${teller("B112","พนักงาน: \"คุณตาจะถอนเงินสด 300,000 ไปทำอะไรคะ\"")}<p>ตาตอบตามที่ถูกสอนไว้ \"ซื้อที่ดินครับ\" หูฟังยังเสียบอยู่ จอมือถือในกระเป๋าเสื้อยังเปิดกล้องอยู่</p>`,
   clues:["เหยื่อถูกสอนเหตุผลไว้ตอบธนาคาร","หูฟังที่ยังเสียบอยู่ แปลว่าคนร้ายยังฟังอยู่","การเปลี่ยนเป็นโอนเงิน ไม่ได้ทำให้ปลอดภัยขึ้น"],
   choices:[{t:"แตะไหล่ตา แล้วบอกพนักงานเบาๆ ว่าตาคุยวิดีโอคอลกับ \"ตำรวจ\" มาหลายชั่วโมง",to:"E2",v:"good"},{t:"ไม่พูดอะไร เป็นเงินของตา และตาก็ดูตั้งใจแล้ว",to:"E4",v:"bad"},{t:"แนะนำให้ตาโอนแทนการถือเงินสด จะได้ไม่เสี่ยงโดนชิงระหว่างทาง",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ไม่ได้อยู่คนเดียวอีกต่อไป",story:"พอวางสาย ตาเหมือนตื่นจากฝัน เจ้าหน้าที่ 1441 ยืนยันว่าเป็นแก๊งคอลเซ็นเตอร์ และแนะนำให้ตาบล็อกเบอร์และแจ้งลูกหลาน เงินไม่หายแม้แต่บาทเดียว",lessons:["คนร้ายชนะเมื่อเหยื่ออยู่คนเดียว การไปนั่งข้างๆ คือการช่วยที่ได้ผลที่สุด","ตำรวจจริงไม่สอบสวนผ่านวิดีโอคอลและไม่รับเงินไปตรวจ","โทร 1441 หรือ 191 เมื่อสงสัย"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"พนักงานช่วยถ่วงเวลา",story:"พนักงานขอให้ตานั่งรอ แล้วเชิญผู้จัดการมาคุยพร้อมโทรหาลูกสาวของตา เงินไม่ได้ถูกถอน แต่ตาเคยส่งรูปบัตรประชาชนให้คนร้ายไปแล้ว ต้องระวังการถูกสวมรอยต่อ",lessons:["การกระซิบบอกพนักงาน ช่วยหยุดได้แม้เหยื่อยังไม่เชื่อ","ถ้าเคยส่งรูปบัตรให้ใคร ควรแจ้งธนาคารและเฝ้าระวังบัญชี","ยิ่งช่วยเร็วยิ่งเสียหายน้อย"]},
  E3:{type:"danger",label:"เสียหาย",title:"บัตรที่ดูเหมือนจริง",story:"หน้าธนาคาร ชายเสื้อโปโลยกบัตรที่มีตราดูน่าเชื่อถือ รับถุงเงินแล้วขึ้นมอเตอร์ไซค์ไป คุณเพิ่งรู้ว่าดูบัตรอย่างเดียวไม่มีทางแยกของจริงกับของปลอมได้",lessons:["อย่าพิสูจน์ด้วยการไปดูตอนส่งเงิน เพราะคนร้ายเตรียมของปลอมไว้แล้ว","ไม่มีเจ้าหน้าที่คนไหนรับเงินสดไปตรวจสอบ","เจอเหตุแบบนี้ ให้รีบแจ้ง 191 พร้อมทะเบียนรถ"]},
  E4:{type:"danger",label:"เสียหาย",title:"เงินเก็บทั้งชีวิต",story:"300,000 บาทหายไปในบ่ายวันเดียว คืนนั้น \"ตำรวจ\" โทรมาอีกเพื่อบอกว่าต้องโอนเพิ่มเป็นค่าธรรมเนียมคืนเงิน",lessons:["\"เงินของเขาเอง\" ไม่ใช่เหตุผลที่จะเงียบ เมื่อเห็นสัญญาณถูกหลอก","การโอนแทนเงินสดไม่ทำให้ปลอดภัยขึ้น","คนร้ายจะกลับมาหลอกซ้ำด้วยเรื่องค่าธรรมเนียม"]}
 }},

mule:{id:"mule",level:"ยาก",start:"s1",title:"รับจ้างเปิดบัญชี บัญชีละ 2,000",
 learn:["บัญชีม้าคืออะไร","ทำไมการให้แค่เลขบัญชีก็อันตราย","สิ่งที่ต้องทำเมื่อพลาดไปแล้ว","ความผิดทางกฎหมายของเจ้าของบัญชี"],
 scenes:{
  s1:{title:"งานง่าย รายได้ดี",
   body:`<p>เพื่อนถือบัตรคิวรอเปิดบัญชีใหม่ แล้วยื่นแชตให้ดู</p>${chat("J","พี่เจ · งานพาร์ทไทม์","กลุ่มหางานนักศึกษา",["@วันนี้ 09:40","น้องแค่เปิดบัญชีใหม่ + สมัครแอป แล้วส่งสมุดบัญชี ซิม และรหัสให้ทีมดูแลนะ","ได้ทันทีบัญชีละ 2,000 บาท ถูกกฎหมาย เป็นบัญชีรับเงินร้านค้าออนไลน์ 👍","เปิดได้กี่ธนาคารยิ่งได้เยอะ"])}`,
   clues:["ร้านค้าจริงเปิดบัญชีในชื่อตัวเองได้ ไม่ต้องจ้างคนอื่น","การส่งซิมและรหัสให้คนอื่น คือการยกบัญชีให้เขาใช้","\"ถูกกฎหมาย\" ที่ต้องพูดย้ำ มักไม่ถูกกฎหมาย"],
   choices:[{t:"บอกเพื่อนว่านี่คือบัญชีม้า มีความผิด ให้ยกเลิกคิวเลย",to:"s2a",v:"good"},{t:"ให้เพื่อนเปิดได้ แต่ให้แค่เลขบัญชี ไม่ให้รหัสหรือบัตร ATM",to:"s2b",v:"risky"},{t:"เป็นเงินของเพื่อนและเพื่อนตัดสินใจเองแล้ว เคารพเขาดีกว่า",to:"E4",v:"bad"}]},
  s2a:{title:"เปิดไปแล้วหนึ่งบัญชี",
   body:`<p>เพื่อนหน้าเสีย \"แต่เมื่อวานเราเปิดไปแล้วหนึ่งบัญชี ส่งสมุด ซิม กับรหัสให้พี่เจไปแล้ว ได้เงินมา 2,000\"</p>${chat("J","พี่เจ · งานพาร์ทไทม์","กลุ่มหางานนักศึกษา",["@เมื่อวาน 18:20","ได้รับแล้วนะน้อง เงินโอนให้แล้ว ✔","ห้ามไปแจ้งปิดบัญชีนะ ไม่งั้นน้องผิดเองเพราะเป็นเจ้าของบัญชี"])}`,
   clues:["ยิ่งรีบระงับบัญชี ยิ่งลดจำนวนผู้เสียหาย","แชตคือหลักฐานว่าเราถูกชักจูง ห้ามลบ","คำขู่ว่า \"น้องผิดเอง\" มีไว้ให้เงียบ"],
   choices:[{t:"ไปเคาน์เตอร์ขอระงับบัญชีนั้นทันที เก็บแชตไว้ แล้วแจ้งความ",to:"E1",v:"good"},{t:"ลบแชตกับพี่เจทิ้ง แล้วปิดบัญชีเงียบๆ จะได้ไม่โยงถึงเรา",to:"E3",v:"bad"},{t:"ทักไปขอบัญชีคืนจากพี่เจดีๆ ก่อน อาจยอมคืนให้",to:"E2",v:"risky"}]},
  s2b:{title:"ขอแค่เลขบัญชี",
   body:`${chat("J","พี่เจ · งานพาร์ทไทม์","กลุ่มหางานนักศึกษา",["@วันนี้ 11:05","โอเค แค่เลขบัญชีก็ได้ ✌","เดี๋ยวลูกค้าร้านโอนเข้ามานะ น้องช่วยโอนต่อเข้าบัญชีทีม หัก 10% เป็นค่าจ้างเลย"])}<div class="notif"><div>เงินเข้า 18,000 บาท จาก นางสาว ว. · เงินเข้า 30,000 บาท จาก นาย ก.</div></div>`,
   clues:["เงินที่เข้ามาคือเงินของผู้เสียหายที่ถูกหลอก","การโอนต่อทำให้เราเป็นทางผ่านของเงิน","แจ้งธนาคารก่อนแตะเงินก้อนนี้"],
   choices:[{t:"ไม่แตะเงิน แจ้งธนาคารว่ามีเงินแปลกเข้าบัญชี และเล่าเรื่องทั้งหมด",to:"E2",v:"good"},{t:"โอนต่อตามที่บอก เพราะเป็นเงินค่าสินค้าของร้านค้าจริง",to:"E4",v:"bad"},{t:"โอนคืนกลับไปที่บัญชีต้นทางเองเลย เงินจะได้กลับไปหาเจ้าของ",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"หยุดก่อนเป็นม้า",story:"ธนาคารระงับบัญชีได้ก่อนมีเงินผู้เสียหายเข้ามา ตำรวจรับแจ้งความไว้เป็นหลักฐานว่าเพื่อนถูกชักจูง และได้แชตของพี่เจไปขยายผลต่อ",lessons:["บัญชีม้าคือบัญชีที่คนร้ายใช้รับเงินผู้เสียหาย เจ้าของบัญชีมีความผิด","ถ้าพลาดไปแล้ว ให้ระงับบัญชีและแจ้งความโดยเร็ว","เก็บหลักฐานทุกอย่างไว้ อย่าลบ"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"บัญชีถูกอายัด แต่ไม่โดนคดี",story:"บัญชีถูกอายัดระหว่างตรวจสอบ เพื่อนต้องไปให้ปากคำหลายรอบ แต่เพราะไม่ได้โอนเงินต่อและรีบแจ้งเอง จึงไม่ถูกดำเนินคดี การโอนคืนเองหรือรอขอคืนจากคนร้ายเสียเวลาและเสี่ยงกว่าการบอกธนาคารตรงๆ",lessons:["เงินแปลกเข้าบัญชี อย่าโอนต่อหรือโอนคืนเอง ให้แจ้งธนาคาร","คนร้ายไม่มีวันคืนบัญชีให้","ยิ่งแจ้งเร็ว ยิ่งพิสูจน์ความบริสุทธิ์ได้ง่าย"]},
  E3:{type:"danger",label:"เสียหาย",title:"หลักฐานหายไปกับแชต",story:"บัญชีนั้นถูกใช้รับเงินผู้เสียหายกว่าสิบคน หมายเรียกมาถึงบ้าน เพื่อนไม่มีแชตเหลือไว้พิสูจน์ว่าถูกหลอกจ้าง",lessons:["การลบแชตไม่ได้ลบความผิด แต่ลบหลักฐานที่ช่วยเรา","เจ้าของบัญชีม้ามีโทษทั้งจำคุกและปรับ","บัญชีที่ยกให้คนอื่นไปแล้ว ต้องรีบระงับ"]},
  E4:{type:"danger",label:"เสียหาย",title:"กลายเป็นบัญชีม้า",story:"บัญชีของเพื่อนกลายเป็นทางผ่านเงินที่หลอกมาจากคนอื่น ทุกบัญชีในชื่อเพื่อนถูกระงับ และต้องเจอคดีอาญาจากค่าจ้าง 2,000 บาท",lessons:["ไม่มีงานไหนจ้างให้เปิดบัญชีแล้วส่งให้คนอื่นใช้","เงินที่ผ่านบัญชีเราคือเงินของผู้เสียหายจริงๆ","เห็นเพื่อนจะทำ ต้องเตือน เพราะผลกระทบหนักกว่าค่าจ้างมาก"]}
 }},

remote:{id:"remote",level:"ยาก",start:"s1",title:"คืนเงินค่าประกันมิเตอร์",
 learn:["แอปควบคุมเครื่องระยะไกล (ดูดเงิน)","สิทธิ์ \"ช่วยการเข้าถึง\" อันตรายแค่ไหน","เรื่องจริงที่ถูกใช้เป็นเหยื่อล่อ","สิ่งที่ต้องทำทันทีเมื่อเครื่องถูกควบคุม"],
 scenes:{
  s1:{title:"ทำเรื่องระหว่างรอคิว",
   body:`<p>รอคิวนาน เลยว่าจะทำเรื่องคืนเงินที่มีคนโทรมาบอกเมื่อเช้า</p>${chat("ก","การไฟฟ้า · คืนเงิน","บัญชีทางการ ✓",["@วันนี้ 10:31","สวัสดีค่ะ ท่านมีสิทธิ์รับเงินคืนค่าประกันมิเตอร์ 1,200 บาท","ดาวน์โหลดแอปเพื่อยืนยันตัวตนได้ที่ <span class=\"url\">pea-refund.app/apk</span>","สิทธิ์หมดเขตวันนี้ 16:00 น. นะคะ"])}`,
   clues:["เครื่องหมาย ✓ หรือโลโก้ในแชต ใครก็ตั้งได้","ไฟล์ .apk คือแอปที่ไม่ผ่านร้านแอปทางการ","หมดเขตวันนี้ คือการเร่งให้ไม่ทันคิด"],
   choices:[{t:"เข้าเว็บการไฟฟ้าที่ค้นหาเอง เพื่อดูว่ามีโครงการนี้จริงไหม",to:"s1b",v:"good"},{t:"โหลดแอปมาดูก่อนเฉยๆ ยังไม่กรอกอะไร ไม่น่าเสียหาย",to:"s2",v:"bad"},{t:"ขอให้เจ้าหน้าที่ในแชตส่งรูปบัตรพนักงานมายืนยันตัวตนก่อน",to:"s2",v:"risky"}]},
  s1b:{title:"โครงการมีจริง",
   body:`<div class="browser"><div class="addr"><span class="lock"></span>เว็บไซต์การไฟฟ้า (ค้นหาเอง)</div><div class="page"><b>คืนเงินประกันการใช้ไฟฟ้า</b><p>ยื่นขอคืนได้ผ่านแอปพลิเคชันทางการ หรือที่สำนักงานเท่านั้น เจ้าหน้าที่ไม่ส่งลิงก์ให้ติดตั้งแอปทางแชต</p></div></div><p>เพื่อนบอก \"เห็นไหม มีจริง งั้นกดลิงก์ในไลน์ก็ได้มั้ง เร็วกว่า\"</p>`,
   clues:["คนร้ายชอบใช้เรื่องจริงเป็นเหยื่อล่อ","มีโครงการจริง ไม่ได้แปลว่าลิงก์ในแชตเป็นของจริง","ใช้ช่องทางที่หน่วยงานบอกไว้บนเว็บของเขาเอง"],
   choices:[{t:"ทำผ่านแอปทางการที่ค้นหาเองจากร้านแอป แล้วบล็อกแชตนั้น",to:"E1",v:"good"},{t:"กดลิงก์ในไลน์ได้ เพราะยืนยันแล้วว่าโครงการนี้มีจริง",to:"s2",v:"bad"},{t:"ถามในแชตว่าทำไมไม่ให้ใช้แอปทางการ ถ้าตอบได้สมเหตุสมผลค่อยทำต่อ",to:"s2",v:"risky"}]},
  s2:{title:"แอปขอสิทธิ์",
   body:`<p>ติดตั้งแอปเสร็จ แอปเด้งหน้าต่างขึ้นมา</p><div class="perm"><b>อนุญาตให้ \"PEA Refund\" ใช้บริการช่วยการเข้าถึงไหม</b><p>แอปจะสามารถ: ดูและควบคุมหน้าจอ · อ่านทุกอย่างที่คุณพิมพ์ · ทำงานแทนคุณ</p><div class="pbtn"><span>ปฏิเสธ</span><span>อนุญาต</span></div></div><p>ในแชตเขียนว่า \"กดอนุญาตเพื่อให้ระบบกรอกข้อมูลให้อัตโนมัติค่ะ\"</p>`,
   clues:["สิทธิ์ช่วยการเข้าถึงทำให้แอปเห็นและกดหน้าจอแทนเราได้","แอปคืนเงินไม่จำเป็นต้องควบคุมเครื่อง","แค่ติดตั้งก็เสี่ยงแล้ว ต้องลบและป้องกันบัญชี"],
   choices:[{t:"ไม่อนุญาต ลบแอป แล้วเปลี่ยนรหัสแอปธนาคารจากอีกเครื่อง",to:"E2",v:"good"},{t:"กดอนุญาต แอปทางการหลายแอปก็ขอสิทธิ์แบบนี้ตอนติดตั้ง",to:"s3",v:"bad"},{t:"ตั้งรหัสแอปธนาคารให้ยากขึ้นก่อน แล้วค่อยกดอนุญาต",to:"s3",v:"risky"}]},
  s3:{title:"จอค้าง",
   body:`<div class="update"><b>กำลังอัปเดตระบบ</b><div class="bar"><i style="width:47%"></i></div><small>ห้ามปิดเครื่อง ห้ามใช้งานระหว่างอัปเดต</small></div><p>หน้าจอกดอะไรไม่ได้ แต่ไฟแจ้งเตือนยังกะพริบอยู่เรื่อยๆ</p>`,
   clues:["หน้าจออัปเดตปลอมคือม่านบังตา ขณะที่คนร้ายกำลังโอนเงิน","ตัดอินเทอร์เน็ตคือการตัดมือคนร้าย","ธนาคารอยู่ตรงหน้า ให้ระงับบัญชีทันที"],
   choices:[{t:"ถอดซิม ปิด Wi-Fi แล้ววิ่งไปเคาน์เตอร์ให้ระงับบัญชีทันที",to:"E3",v:"good"},{t:"รอให้อัปเดตเสร็จตามหน้าจอ ถ้าปิดกลางคันเครื่องอาจพัง",to:"E4",v:"bad"},{t:"กดปิดเครื่องแล้วเปิดใหม่ ค้างแบบนี้มักแก้ได้ด้วยการรีสตาร์ต",to:"E4",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ใช้ช่องทางทางการ",story:"ยื่นคืนเงินผ่านแอปทางการเสร็จในห้านาที เงิน 1,200 บาทเข้าบัญชีตามรอบ ส่วนแชตปลอมถูกรายงานและบล็อก",lessons:["เรื่องจริงถูกใช้เป็นเหยื่อล่อได้เสมอ","หน่วยงานไม่ส่งลิงก์ให้ติดตั้งแอปทางแชต","ติดตั้งแอปจากร้านแอปทางการเท่านั้น"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"ลบแอปทัน",story:"เงินไม่หาย แต่แอปอยู่ในเครื่องมาหลายนาทีและอาจอ่านข้อมูลบางอย่างไปแล้ว ต้องเปลี่ยนรหัสหลายบริการ และพนักงานแนะนำให้ล้างเครื่องเพื่อความชัวร์",lessons:["ไม่ให้สิทธิ์ช่วยการเข้าถึงกับแอปที่ไม่รู้จัก","ถ้าเผลอติดตั้ง ให้ลบ เปลี่ยนรหัส และพิจารณาล้างเครื่อง","อย่าโหลดไฟล์ .apk จากลิงก์ในแชต"]},
  E3:{type:"warn",label:"เฉียดฉิว",title:"ตัดเน็ตทัน",story:"คนร้ายโอนออกไปได้หนึ่งรายการ 9,800 บาทก่อนเน็ตถูกตัด ธนาคารระงับบัญชีที่เหลือไว้ได้ทันและช่วยประสานเรื่องอายัดปลายทาง",lessons:["เมื่อเครื่องถูกควบคุม ให้ตัดอินเทอร์เน็ตทันที","รีบแจ้งธนาคารให้ระงับบัญชีและแจ้ง 1441","หน้าจออัปเดตปลอมมีไว้ซื้อเวลาให้คนร้าย"]},
  E4:{type:"danger",label:"เสียหาย",title:"เงินหมดบัญชีระหว่างรอคิว",story:"พอหน้าจอกลับมา เงิน 186,000 บาทถูกโอนออกไปเป็นสิบรายการ ทั้งที่ยืนอยู่ในธนาคารแท้ๆ",lessons:["อย่ารอให้อัปเดตเสร็จ หรือรีสตาร์ตแล้วหวังว่าจะหาย","แอปควบคุมระยะไกลทำงานต่อได้แม้เปลี่ยนรหัส","ตัดเน็ตก่อน แล้วรีบระงับบัญชี"]}
 }}
};

const EN={
rush:{id:"rush",level:"Hard",start:"s1",title:"Grandson's urgent call (an AI-cloned voice)",
 learn:["AI-cloned voices (deepfakes) made from social media clips","Scammers posing as a relative in trouble","Verifying through another family member","Why \"don't tell anyone\" is a red flag","How social media details get used against you"],
 scenes:{
  s1:{title:"Grandma rushes over",
   body:`<p>Grandma Sri's hands are shaking as she shows you her phone. Ten minutes ago a caller sounded exactly like Ton, her grandson, down to his catchphrases. Ton posted a singing clip on social media yesterday.</p>${call("2 missed calls","Unknown","+66 9x xxx 4471","\"Grandma, it's me, Ton. I hit someone with the car, the police have me… don't tell Mum.\"")}${chat("T","Ton","new account",["@Today 10:12","Grandma they took my phone, use this LINE","The sergeant says transfer 50,000 bail to this account: Mr Sompong R. 412-0-55xxx","Within 1 hour please or I sleep in a cell 🙏"])}`,
   clues:["\"Don't tell Mum\" cuts out the person best placed to check","The account is someone else's, not the police's or Ton's","Sounding exactly right doesn't make it him: AI can clone a voice from a few seconds of video"],
   choices:[{t:"Calm Grandma first, then call Ton on the number she already has saved",to:"s2a",v:"good"},{t:"Ask something only Ton would know through that new LINE. Right answer, it's him",to:"s2b",v:"risky"},{t:"Get Grandma to the counter first. If Ton really is in custody, every minute counts",to:"s3",v:"bad"}]},
  s2a:{title:"Ton doesn't pick up",
   body:`<p>Ton's usual number rings out. Nobody answers. Grandma starts crying. Then a new call comes in.</p>${call("Incoming call","Sgt Somchai","+66 8x xxx 0912","\"Ma'am, in 20 minutes I send your grandson to prison. If you don't want this to get bigger, don't call anyone.\"")}`,
   clues:["Ton not answering doesn't mean he's arrested. He may be in class or at work","The more they rush you, the more you should stop","Real police never take bail into a personal account"],
   choices:[{t:"Call Ton's mum right away, even though the \"sergeant\" said not to",to:"E1",v:"good"},{t:"Get the station number from the \"sergeant\" and call back to confirm the case",to:"s3",v:"bad"},{t:"Have Grandma send half, 25,000, to buy time while we reach Ton",to:"E3",v:"bad"}]},
  s2b:{title:"He got it right",
   body:`${chat("T","Ton","new account",[">If you're really Ton, what's the cat at Grandma's called?","Mali, Grandma 😭 hurry, the sergeant's waiting"])}<p>Grandma sighs with relief: \"It really is Ton.\" She takes her queue ticket and stands up. Then you remember seeing photos of Mali the cat on Ton's Facebook.</p>`,
   clues:["Questions whose answers are on social media can't prove identity","Scammers study public profiles beforehand","Real verification goes through a channel you contact yourself"],
   choices:[{t:"Tell Grandma the cat is all over Facebook, and suggest calling Ton's mum",to:"E1",v:"good"},{t:"She can transfer, but only to an account in Ton's name, so the money is safe",to:"s3",v:"bad"},{t:"Take her to the counter and ask the bank staff what to do",to:"s3",v:"risky"}]},
  s3:{title:"At the counter",
   body:`${teller("A047","Teller: \"Who is the 50,000 for, ma'am? How are you related? Lots of people have been tricked into paying 'bail' lately.\"")}<p>Grandma answers quietly, \"It's for my grandson,\" just as the \"sergeant\" coached her to say if the bank asked.</p>`,
   clues:["Scammers coach victims on what to tell the bank","Bank staff see this often and can stop the transfer","Switching channels to avoid questions is a sign of being manipulated"],
   choices:[{t:"Tell the teller the truth: someone posing as police wants bail money",to:"E2",v:"good"},{t:"Tell the staff it's a family matter and Grandma wants to send it",to:"E4",v:"bad"},{t:"Suggest Grandma use the app instead, it's faster and there's no queue",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Ton was in class",story:"Ton's mum reached him through a classmate. He was sitting in a lecture and hadn't even been driving. Grandma cried again, this time from relief.",lessons:["For a relative's emergency, confirm through another family member","\"Don't tell anyone\" is how they cut off your help","Police never take bail into a personal account"]},
  E2:{type:"warn",label:"Close call",title:"The counter stopped it",story:"The teller paused the transfer and helped call Ton's mum, which exposed the scam. Grandma lost nothing, but it was close, and the gang now knows she's an easy target. They may call again.",lessons:["Be honest with bank staff. They can stop this","It's better to check before reaching the counter","Warn the family that the gang may call back"]},
  E3:{type:"danger",label:"Harmed",title:"Half is never enough",story:"25,000 was gone instantly. Minutes later the \"sergeant\" called: the other party now wanted 80,000 more. Only then did Grandma call Ton's mum.",lessons:["Paying part to buy time just proves you can pay","They will keep asking for more","If money is sent, call the bank and 1441 right away"]},
  E4:{type:"danger",label:"Harmed",title:"Her last savings",story:"The 50,000 landed in a mule account and was moved on within minutes. That evening Ton called Grandma as usual, knowing nothing at all.",lessons:["Don't help hide the story from bank staff","Dodging questions by using the app removes the last brake","A relative in real trouble can always wait for a check"]}
 }},

video:{id:"video",level:"ยาก",start:"s1",title:"A video call from the \"police\"",
 learn:["Controlling victims over video call","Why scammers order victims to stay alone","Personal data doesn't prove someone is an officer","Hotline 1441 and helping someone who's under control"],
 scenes:{
  s1:{title:"Grandpa alone in the corner",
   body:`<p>Grandpa Boon sits facing the wall, earphones in, phone held up at eye level. On screen is a man in uniform.</p>${vcall("03:12:47","Video call","Police Station · Anti-Money-Laundering Centre","\"You're linked to a money-laundering case. Don't hang up. Don't tell anyone. Stay alone for the whole investigation.\"")}<p>Grandpa whispers to you, \"Stay back, dear. They said not to talk to anyone.\"</p>`,
   clues:["Three hours non-stop is designed to stop the victim thinking","Real police don't investigate over video call or order you to be alone","Threats that telling anyone is illegal are meant to cut off help"],
   choices:[{t:"Sit down next to Grandpa so he isn't alone, and whisper to ask what's going on",to:"s2a",v:"good"},{t:"Stay out of it. If it's a real case, interfering could get us in trouble too",to:"s3",v:"bad"},{t:"Ask to speak to the \"officer\" yourself and get his name, rank and unit",to:"s2c",v:"risky"}]},
  s2a:{title:"Grandpa explains",
   body:`<p>Grandpa whispers: \"They want me to withdraw 300,000 in cash for checking. A plain-clothes officer is waiting outside. If I'm innocent it comes back in 24 hours. Tomorrow I have to check into a hotel alone for more questioning.\"</p>${vcall("03:15:02","Video call","Police Station · Anti-Money-Laundering Centre","\"Sir, who is next to you? Send them away, or it counts as obstructing an officer.\"")}`,
   clues:["No agency takes cash away to \"check\" it","Being sent to a hotel alone is psychological detention","As soon as someone sits beside the victim, scammers try to send them away"],
   choices:[{t:"Help Grandpa hang up, then call 1441 together on your phone",to:"E1",v:"good"},{t:"Let Grandpa withdraw it, then go with him and check the collector's ID",to:"E3",v:"bad"},{t:"Tell Grandpa real police don't video call, then respect his own decision",to:"s3",v:"risky"}]},
  s2c:{title:"He has a warrant",
   body:`<p>The man on screen smiles and holds a document up to the camera.</p><div class="doc"><div class="dh">ARREST WARRANT <span class="stamp">URGENT</span></div><div class="dr"><span>Name</span><b>Mr Boon Srisuk</b></div><div class="dr"><span>ID no.</span><b>3 1012 00xxx 45 1</b></div><div class="dr"><span>Charge</span><b>Money laundering · mule account</b></div></div><p>\"Anyone who interferes will be charged too, young one.\" Grandpa goes pale. \"He has my ID number…\"</p>`,
   clues:["Names and ID numbers leak from many places and prove nothing","Documents on a screen are easy to fake","Scammers threaten helpers too, to make them back off"],
   choices:[{t:"Tell Grandpa knowing an ID number doesn't make someone police, and help him hang up",to:"s2a",v:"good"},{t:"Ask him to hold his police ID and the warrant up clearly to the camera",to:"s3",v:"bad"},{t:"Screenshot it all as evidence first, then let Grandpa finish the call",to:"s3",v:"risky"}]},
  s3:{title:"At the withdrawal counter",
   body:`${teller("B112","Teller: \"What is the 300,000 in cash for, sir?\"")}<p>Grandpa gives the coached answer: \"To buy land.\" His earphones are still in, and the phone in his shirt pocket still has its camera on.</p>`,
   clues:["Victims are coached with a reason to tell the bank","Earphones still in means the scammer is still listening","Switching to a transfer doesn't make it safer"],
   choices:[{t:"Touch Grandpa's shoulder and quietly tell the teller he's been on a video call with \"police\" for hours",to:"E2",v:"good"},{t:"Say nothing. It's his money and he seems sure",to:"E4",v:"bad"},{t:"Suggest he transfer instead of carrying cash, so he isn't robbed on the way",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Not alone any more",story:"Once the call ended, Grandpa seemed to wake from a dream. The 1441 officer confirmed it was a call-centre gang and advised blocking the number and telling the family. Not a single baht was lost.",lessons:["Scammers win when the victim is alone. Sitting beside them is the most effective help","Real police don't investigate by video call or collect cash to check","Call 1441 or 191 when in doubt"]},
  E2:{type:"warn",label:"Close call",title:"The teller bought time",story:"The teller asked Grandpa to wait, brought in the manager and called his daughter. Nothing was withdrawn, but Grandpa had already sent the scammers a photo of his ID card and must watch for identity misuse.",lessons:["A quiet word to staff can stop it even if the victim isn't convinced yet","If you've sent your ID photo to anyone, tell your bank and watch your accounts","The sooner you step in, the less damage"]},
  E3:{type:"danger",label:"Harmed",title:"A badge that looked real",story:"Outside, a man in a polo shirt flashed a convincing badge, took the bag of cash and rode off on a motorbike. A badge alone could never tell you real from fake.",lessons:["Don't try to verify at the handover. They come prepared","No officer collects cash for checking","If it happens, call 191 with the bike's plate number"]},
  E4:{type:"danger",label:"Harmed",title:"A lifetime of savings",story:"300,000 baht gone in one afternoon. That night the \"police\" called again: a refund fee had to be paid first.",lessons:["\"It's his money\" is no reason to stay quiet when you see the signs","A transfer is no safer than cash here","They'll come back for a second round with \"fees\""]}
 }},

mule:{id:"mule",level:"ยาก",start:"s1",title:"Paid 2,000 per bank account",
 learn:["What a mule account is","Why sharing just the account number is dangerous","What to do after a mistake","The account owner's legal liability"],
 scenes:{
  s1:{title:"Easy job, good money",
   body:`<p>Your friend is holding a queue ticket to open a new account, and shows you a chat.</p>${chat("J","Jay · part-time jobs","student job group",["@Today 09:40","Just open a new account + sign up for the app, then send the book, SIM and passwords to the team","Instant 2,000 per account. Totally legal, it's for online shop payments 👍","The more banks the more you earn"])}`,
   clues:["A real shop can open accounts in its own name","Handing over the SIM and passwords gives away the account","\"Totally legal\" said twice usually isn't"],
   choices:[{t:"Tell your friend it's a mule account and illegal. Cancel the queue",to:"s2a",v:"good"},{t:"Let your friend open it but only share the number, never the PIN or ATM card",to:"s2b",v:"risky"},{t:"It's his money and his decision. Better to respect that",to:"E4",v:"bad"}]},
  s2a:{title:"One already opened",
   body:`<p>Your friend's face falls. \"But I opened one yesterday and sent Jay the book, SIM and password. I got 2,000.\"</p>${chat("J","Jay · part-time jobs","student job group",["@Yesterday 18:20","Got it, money sent ✔","Don't go closing the account, or it's on you since you're the owner"])}`,
   clues:["The sooner the account is frozen, the fewer victims","The chat proves you were lured. Don't delete it","\"It's on you\" is meant to keep you quiet"],
   choices:[{t:"Go to the counter to freeze that account now, keep the chat, and report it to police",to:"E1",v:"good"},{t:"Delete the chat with J and quietly close the account so nothing links back",to:"E3",v:"bad"},{t:"Message J politely and ask for the account back first. He might agree",to:"E2",v:"risky"}]},
  s2b:{title:"Just the number",
   body:`${chat("J","Jay · part-time jobs","student job group",["@Today 11:05","OK, just the account number then ✌","Shop customers will pay in. Forward it to the team account and keep 10%"])}<div class="notif"><div>Received 18,000 from Ms W. · Received 30,000 from Mr K.</div></div>`,
   clues:["That money belongs to scam victims","Forwarding it makes you the money's route","Tell the bank before touching it"],
   choices:[{t:"Don't touch it. Report the strange deposits to the bank and explain everything",to:"E2",v:"good"},{t:"Forward it as told, it's real payment for the shop's goods",to:"E4",v:"bad"},{t:"Send it straight back to the sender's account so it returns to its owner",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Stopped before becoming a mule",story:"The bank froze the account before any victim money arrived. Police recorded the report as proof your friend was lured, and used Jay's chat to follow the gang.",lessons:["A mule account receives victims' money. The owner is liable","If you slipped, freeze the account and report quickly","Keep every piece of evidence"]},
  E2:{type:"warn",label:"Close call",title:"Frozen, but no charges",story:"The account was frozen during the investigation and your friend had to give statements several times. Because no money was forwarded and they came forward fast, there were no charges. Sending money back yourself or waiting on the scammer only costs time.",lessons:["Strange deposits: don't forward or return them yourself, tell the bank","Scammers never give accounts back","The faster you report, the easier it is to prove innocence"]},
  E3:{type:"danger",label:"Harmed",title:"The evidence went with the chat",story:"The account received money from more than ten victims. A summons arrived at home, and your friend had no chat left to prove they'd been lured.",lessons:["Deleting chats doesn't delete guilt, only your evidence","Mule account owners face prison and fines","Accounts you handed over must be frozen fast"]},
  E4:{type:"danger",label:"Harmed",title:"Became a mule",story:"Your friend's account became a channel for money stolen from others. Every account in their name was frozen, and they faced criminal charges, all for 2,000 baht.",lessons:["No real job pays you to open an account for someone else","The money passing through is real victims' money","If a friend is about to do it, warn them. The fallout is far worse than the pay"]}
 }},

remote:{id:"remote",level:"ยาก",start:"s1",title:"Meter deposit refund",
 learn:["Remote-control apps that drain accounts","How dangerous the Accessibility permission is","Real programmes used as bait","What to do the moment your phone is taken over"],
 scenes:{
  s1:{title:"Sorting it out in the queue",
   body:`<p>The queue is long, so they decide to sort out the refund someone called about this morning.</p>${chat("E","Electricity · Refunds","official account ✓",["@Today 10:31","Hello, you're eligible for a 1,200 baht meter deposit refund","Download the app to verify: <span class=\"url\">pea-refund.app/apk</span>","Offer ends today at 16:00"])}`,
   clues:["A ✓ or logo in a chat can be set by anyone","An .apk file is an app outside the official store","\"Ends today\" is pressure to stop you thinking"],
   choices:[{t:"Open the electricity authority's site you search for yourself, and check the programme",to:"s1b",v:"good"},{t:"Just install the app to look, don't enter anything yet. No harm",to:"s2",v:"bad"},{t:"Ask the agent in the chat for a photo of their staff ID first",to:"s2",v:"risky"}]},
  s1b:{title:"The programme is real",
   body:`<div class="browser"><div class="addr"><span class="lock"></span>Electricity authority site (searched yourself)</div><div class="page"><b>Deposit refunds</b><p>Apply only through the official app or at an office. Staff never send links to install apps through chat.</p></div></div><p>Your friend says, \"See, it's real. So the LINE link is fine, it's quicker.\"</p>`,
   clues:["Scammers love real programmes as bait","A real programme doesn't make a chat link real","Use the channel the agency lists on its own site"],
   choices:[{t:"Use the official app from the app store, and block that chat",to:"E1",v:"good"},{t:"Use the LINE link, you've confirmed the scheme is real",to:"s2",v:"bad"},{t:"Ask the chat why not the official app, and carry on if the reason makes sense",to:"s2",v:"risky"}]},
  s2:{title:"The app wants permission",
   body:`<p>The app installs and a window pops up.</p><div class="perm"><b>Allow \"PEA Refund\" to use Accessibility?</b><p>The app will be able to: view and control your screen · read everything you type · act on your behalf</p><div class="pbtn"><span>Deny</span><span>Allow</span></div></div><p>The chat says, \"Tap Allow so the system can fill in your details automatically.\"</p>`,
   clues:["Accessibility lets an app see and tap your screen for you","A refund app has no need to control your phone","Just installing it is a risk. Remove it and protect your accounts"],
   choices:[{t:"Deny, uninstall, and change the banking app passcode from another device",to:"E2",v:"good"},{t:"Allow it, many official apps ask for this when installing",to:"s3",v:"bad"},{t:"Set a stronger bank app passcode first, then allow it",to:"s3",v:"risky"}]},
  s3:{title:"Frozen screen",
   body:`<div class="update"><b>Updating system</b><div class="bar"><i style="width:47%"></i></div><small>Do not turn off or use your phone</small></div><p>Nothing responds to taps, but the notification light keeps blinking.</p>`,
   clues:["A fake update screen is a curtain while they move money","Cutting the internet cuts off the scammer's hands","The bank is right there. Freeze the account now"],
   choices:[{t:"Pull the SIM, turn off Wi-Fi, and run to the counter to freeze the account",to:"E3",v:"good"},{t:"Wait for the update to finish, stopping it halfway could brick the phone",to:"E4",v:"bad"},{t:"Restart the phone, freezes like this are usually fixed by a restart",to:"E4",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Through the official channel",story:"The refund was filed in the official app in five minutes. The 1,200 baht arrived on schedule, and the fake chat was reported and blocked.",lessons:["Real news is always fair game as bait","Agencies don't send app-install links in chat","Only install apps from the official store"]},
  E2:{type:"warn",label:"Close call",title:"Deleted in time",story:"No money was lost, but the app sat on the phone for several minutes and may have read some data. Several passwords had to be changed, and the bank staff advised a factory reset to be sure.",lessons:["Never grant Accessibility to unknown apps","If you installed one, remove it, change passwords and consider a reset","Don't install .apk files from chat links"]},
  E3:{type:"warn",label:"Close call",title:"Cut off in time",story:"One 9,800 baht transfer got out before the internet was cut. The bank froze the rest immediately and helped request a hold on the receiving account.",lessons:["If your phone is taken over, cut the internet at once","Get the bank to freeze accounts and report to 1441","Fake update screens buy the scammer time"]},
  E4:{type:"danger",label:"Harmed",title:"Drained while waiting in line",story:"When the screen came back, 186,000 baht had gone out in a dozen transfers, while they were standing inside the bank.",lessons:["Don't wait for the 'update' or restart and hope","Remote-control apps keep working after a passcode change","Cut the internet first, then freeze your account"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
