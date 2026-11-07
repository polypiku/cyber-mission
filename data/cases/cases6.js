/* ===== Zone 6: the university (via soi 1) and Zone 7: the police station (via soi 2) ===== */
(function(){
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const site=(color,url,path,logo,fields,btn)=>`<div class="browser" style="--fake:${color}"><div class="addr"><i class="lock"></i><span class="dim">https://</span>${url}<span class="dim">${path}</span></div><div class="page"><div class="flogo"><i></i>${logo}</div>${fields.map(f=>`<div class="field">${f}</div>`).join("")}<div class="fbtn">${btn}</div></div></div>`;
const mail=(from,addr,subj,lines,btn)=>`<div class="browser" style="--fake:#2F6DB5"><div class="addr"><span class="dim">✉ </span>${from} &lt;${addr}&gt;</div><div class="page"><b>${subj}</b>${lines.map(l=>`<div class="field">${l}</div>`).join("")}${btn?`<div class="fbtn">${btn}</div>`:""}</div></div>`;
const perm=(title,text,a,b)=>`<div class="perm"><b>${title}</b><p>${text}</p><div class="pbtn"><span>${a}</span><span>${b}</span></div></div>`;
const staff=(who,line)=>`<div class="teller"><div class="tq"><small>${who}</small><b>🏛️</b></div><p>${line}</p></div>`;
const notif=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;
const doc=(head,rows,foot)=>`<div class="doc"><b>${head}</b>${rows.map(r=>`<p>${r}</p>`).join("")}${foot?`<small>${foot}</small>`:""}</div>`;

const TH={
scholar:{id:"scholar",level:"กลาง",start:"s1",title:"ทุนเรียนดี 20,000 บาท",
 learn:["ทุนจริงไม่เก็บค่าสมัคร","ช่องทางทางการของมหาวิทยาลัย","อย่าส่งรูปถือบัตรประชาชน","ข้อมูลส่วนตัวถูกเอาไปเปิดบัญชีได้"],
 scenes:{
  s1:{title:"โพสต์ในกลุ่มนักศึกษา",
   body:`<p>เพื่อนเจอโพสต์ในกลุ่มเฟซบุ๊ก “นักศึกษา ม.หัวเฉียวฯ รวมทุน”</p>${site("#0F5E46","hcu-scholar.site","/apply","ทุนเรียนดี 2569",["รับทุน 20,000 บาท · เหลือ 12 ที่!","ค่าธรรมเนียมยืนยันสิทธิ์ 500 บาท","แนบ: รูปหน้า-หลังบัตรประชาชน + เซลฟี่ถือบัตร"],"สมัครเลย")}<p>“เหลือ 12 ที่เอง ค่าเทอมเราก็ใกล้แล้ว”</p>`,
   clues:["โดเมน .site ไม่ใช่เว็บของมหาวิทยาลัย","ทุนจริงไม่ให้จ่ายค่า “ยืนยันสิทธิ์”","เซลฟี่ถือบัตร = เอาไปเปิดบัญชีหรือสมัครสินเชื่อแทนเราได้"],
   choices:[{t:"เช็กประกาศทุนในเว็บและเพจทางการของมหาวิทยาลัย หรือถามกองกิจการนักศึกษา",to:"s2a",v:"good"},{t:"สมัครได้ แต่ส่งแค่รูปบัตรหน้าเดียว ไม่ส่งเซลฟี่",to:"s2b",v:"risky"},{t:"500 บาทแลก 20,000 คุ้มมาก ทุนบางทุนก็เก็บค่าดำเนินการจริง สมัครให้ทันที่",to:"s2c",v:"bad"}]},
  s2a:{title:"กองกิจการนักศึกษาตอบ",
   body:`${staff("เจ้าหน้าที่","“ไม่มีทุนนี้ค่ะ ทุนจริงประกาศในเว็บมหาวิทยาลัย และไม่มีค่าสมัครเลย มีคนมาถามหลายคนแล้ว”")}<p>เพื่อนโล่งอก แต่ในกลุ่มยังมีคนกดไลก์โพสต์นั้นเรื่อยๆ</p>`,
   clues:["คนอื่นในกลุ่มยังเสี่ยงอยู่","รายงานโพสต์และแจ้งแอดมินกลุ่ม","แจ้งมหาวิทยาลัยให้ประกาศเตือน"],
   choices:[{t:"รายงานโพสต์ แจ้งแอดมินกลุ่ม และขอให้มหาวิทยาลัยประกาศเตือน",to:"E1",v:"good"},{t:"คอมเมนต์ใต้โพสต์ว่า “หลอกลวง” ก็พอ",to:"E2",v:"risky"},{t:"เงียบไว้ ไม่อยากมีเรื่องกับใคร",to:"E2",v:"risky"}]},
  s2b:{title:"ส่งรูปบัตรไปแล้ว",
   body:`${chat("🎓","ทุนเรียนดี (แอดมิน)","LINE",["ได้รับรูปบัตรแล้วค่ะ","ขาดอีกขั้นเดียว รบกวนโอนค่ายืนยันสิทธิ์ 500 บาท และส่งเซลฟี่ถือบัตรภายใน 30 นาทีนะคะ","ไม่งั้นสิทธิ์จะตกไปคนถัดไป"])}`,
   clues:["ข้อมูลบัตรหลุดไปแล้วครึ่งหนึ่ง","เร่งเวลา = ไม่ให้คิด","ควรหยุดและแจ้งธนาคาร/เฝ้าระวังการใช้ชื่อเรา"],
   choices:[{t:"หยุดคุย ไม่โอน ไม่ส่งเซลฟี่ แล้วเฝ้าระวังว่ามีใครใช้ชื่อเราเปิดบัญชีหรือสมัครสินเชื่อไหม",to:"E2",v:"good"},{t:"ส่งเซลฟี่แต่ไม่โอน อย่างน้อยจะได้สิทธิ์ไว้ก่อน",to:"E3",v:"bad"},{t:"โอน 500 แต่ไม่ส่งเซลฟี่ เงินแค่ 500 ไม่เป็นไร",to:"E3",v:"bad"}]},
  s2c:{title:"โอนแล้ว",
   body:`${notif(["✅ โอนเงินสำเร็จ 500.00 บาท → น.ส. ปวีณา","💬 แอดมิน: ขอบคุณค่ะ ส่งเซลฟี่ถือบัตรมาได้เลย"])}<p>ชื่อบัญชีผู้รับ… ทำไมคุ้นๆ</p>`,
   clues:["ชื่อ “ปวีณา” โผล่ในเคสอื่นมาแล้ว","ทุนจริงไม่โอนเข้าบัญชีบุคคล","ยังไม่ส่งเซลฟี่ ยังหยุดได้"],
   choices:[{t:"ไม่ส่งอะไรเพิ่ม เก็บสลิปเป็นหลักฐาน แล้วแจ้งความออนไลน์",to:"E2",v:"good"},{t:"ส่งเซลฟี่ไปให้จบ จ่ายแล้วก็อยากได้ทุน",to:"E4",v:"bad"},{t:"ขอเงินคืนจากแอดมินก่อน ถ้าไม่คืนค่อยแจ้ง",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"โพสต์ปลอมถูกลบ",story:"มหาวิทยาลัยประกาศเตือนทุกช่องทาง โพสต์ถูกลบภายในชั่วโมง เพื่อนสมัครทุนจริงผ่านเว็บมหาวิทยาลัยแทน",lessons:["ทุนจริงไม่เก็บค่าสมัคร","เช็กกับหน่วยงานในมหาวิทยาลัยโดยตรง","รายงานโพสต์ปลอม ช่วยคนอื่นด้วย"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รอดแต่ต้องเฝ้าระวัง",story:"ไม่เสียเงินก้อนใหญ่ แต่ข้อมูลบัตรหลุดไปบางส่วน เพื่อนต้องคอยเช็กว่ามีใครใช้ชื่อไปเปิดบัญชีหรือสมัครสินเชื่อไหม",lessons:["ข้อมูลบัตรประชาชนมีค่ามากกว่าที่คิด","หยุดทันทีเมื่อถูกเร่งเวลา","เก็บหลักฐานไว้แจ้งความ"]},
  E3:{type:"danger",label:"เสียหาย",title:"เสียเงินและข้อมูล",story:"แอดมินหายไปพร้อมเงิน และขอ “ค่าดำเนินการ” เพิ่มอีกรอบ เพื่อนเสียทั้งเงินและข้อมูลส่วนตัว",lessons:["อย่าโอนค่าสมัครทุน","อย่าส่งรูปบัตรให้เพจที่ไม่รู้จัก","ขอเงินคืนจากคนร้ายไม่ได้ผล ต้องแจ้งความ"]},
  E4:{type:"danger",label:"เสียหาย",title:"ชื่อเราถูกเอาไปเปิดบัญชีม้า",story:"เดือนต่อมา ตำรวจติดต่อมาเพราะมีบัญชีชื่อเพื่อนใช้รับเงินจากเหยื่อหลายสิบคน ทั้งที่เพื่อนไม่เคยเปิดเลย",lessons:["เซลฟี่ถือบัตร = กุญแจปลอมตัวเป็นเรา","ข้อมูลส่วนตัวถูกใช้ก่ออาชญากรรมได้","ทุนจริงไม่ขอแบบนี้"]}
 }},

itmail:{id:"itmail",level:"ยาก",start:"s1",title:"อีเมลจาก “ฝ่าย IT มหาวิทยาลัย”",
 learn:["ดูโดเมนผู้ส่งจริง","หน้าล็อกอินปลอมของระบบมหาวิทยาลัย","การกดอนุมัติ MFA รัวๆ (MFA fatigue)","แจ้งฝ่าย IT ตัวจริง"],
 scenes:{
  s1:{title:"กล่องจดหมายเต็ม",
   body:`${mail("HCU IT Service","it-support@hcu-mail.help","⚠ กล่องจดหมายของคุณเต็ม 99%",["อีเมลใหม่จะถูกตีกลับภายใน 24 ชั่วโมง","กรุณายืนยันบัญชีเพื่อเพิ่มพื้นที่ฟรี"],"ยืนยันบัญชี")}<p>“งานกลุ่มส่งทางเมลมหาลัยด้วย ถ้าเมลเด้งคือจบ”</p>`,
   clues:["ผู้ส่งใช้โดเมน hcu-mail.help ไม่ใช่โดเมนมหาวิทยาลัย","ขู่ด้วยเวลา 24 ชั่วโมง","ฝ่าย IT จริงไม่ขอรหัสผ่านทางอีเมล"],
   choices:[{t:"ไม่กดลิงก์ เข้าระบบอีเมลเองจากเว็บมหาวิทยาลัยดูพื้นที่ แล้วส่งต่อเมลนี้ให้ฝ่าย IT ตัวจริง",to:"s2a",v:"good"},{t:"กดลิงก์ดู ถ้าหน้าตาเหมือนระบบมหาลัยเป๊ะก็ล็อกอินได้",to:"s2b",v:"bad"},{t:"ตอบกลับเมลไปถามว่าเป็นฝ่าย IT จริงไหม",to:"s2c",v:"risky"}]},
  s2a:{title:"พื้นที่ยังเหลือเยอะ",
   body:`<p>กล่องจดหมายจริงใช้ไป 12% เท่านั้น ฝ่าย IT ตอบกลับว่า “เมลนี้ปลอม ขอบคุณที่แจ้งครับ”</p><p>เพื่อนในกลุ่มทักมา “เรากดล็อกอินไปแล้ว ตอนนี้มีแจ้งเตือนให้กดอนุมัติเด้งไม่หยุดเลย”</p>`,
   clues:["มีคนในกลุ่มโดนไปแล้ว","แจ้งเตือนอนุมัติที่ไม่ได้ขอ = คนร้ายกำลังล็อกอิน","ห้ามกดอนุมัติ และต้องเปลี่ยนรหัสทันที"],
   choices:[{t:"บอกเพื่อนกด “ปฏิเสธ” ทุกครั้ง เปลี่ยนรหัสทันที และแจ้งฝ่าย IT",to:"E1",v:"good"},{t:"บอกให้กดอนุมัติสักครั้ง แจ้งเตือนจะได้หยุดเด้ง",to:"E3",v:"bad"},{t:"บอกให้ปิดเสียงแจ้งเตือนไว้ก่อน เดี๋ยวคนร้ายก็เลิกไปเอง",to:"E2",v:"risky"}]},
  s2b:{title:"หน้าล็อกอินเหมือนจริง",
   body:`${site("#B5222E","hcu-mail.help","/login","HCU · Single Sign-On",["รหัสนักศึกษา","รหัสผ่าน"],"เข้าสู่ระบบ")}${notif(["🔔 คำขอเข้าสู่ระบบใหม่: อนุมัติหรือไม่?"])}<p>พอกดเข้าสู่ระบบ มือถือก็เด้งขอให้อนุมัติทันที</p>`,
   clues:["โลโก้เหมือนได้ แต่โดเมนปลอมไม่ได้","แจ้งเตือนเด้งเพราะคนร้ายเอารหัสไปลองล็อกอินจริง","ถ้ากดอนุมัติ = เปิดประตูให้เขา"],
   choices:[{t:"กดปฏิเสธ เปลี่ยนรหัสจากเว็บจริงทันที และแจ้งฝ่าย IT",to:"E2",v:"good"},{t:"กดอนุมัติ เพราะเป็นคนล็อกอินเองเมื่อกี้",to:"E4",v:"bad"},{t:"ปิดหน้าเว็บแล้วรอดูว่ามีอะไรเกิดขึ้นไหม",to:"E3",v:"risky"}]},
  s2c:{title:"มีคนตอบกลับ",
   body:`${mail("HCU IT Service","it-support@hcu-mail.help","RE: ยืนยันตัวตน",["ใช่ครับ ทีม IT จริง 100%","เพื่อความรวดเร็ว ส่งรหัสนักศึกษาและรหัสผ่านมาทางเมลนี้ได้เลยครับ"],"")}`,
   clues:["ถามคนร้าย คนร้ายก็ตอบว่าจริง","ไม่มี IT ที่ไหนขอรหัสผ่าน","ยืนยันผ่านช่องทางอื่นเสมอ"],
   choices:[{t:"ไม่ตอบ ลบเมล แล้วแจ้งฝ่าย IT ผ่านช่องทางในเว็บมหาวิทยาลัย",to:"E1",v:"good"},{t:"ส่งรหัสไป เพราะเขายืนยันแล้วว่าเป็น IT จริง",to:"E4",v:"bad"},{t:"ส่งแค่รหัสนักศึกษา ไม่ส่งรหัสผ่าน",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ทั้งกลุ่มปลอดภัย",story:"ฝ่าย IT ส่งประกาศเตือนทั้งมหาวิทยาลัยและบล็อกโดเมนปลอม บัญชีของทุกคนในกลุ่มยังปลอดภัย",lessons:["ดูโดเมนผู้ส่งทุกครั้ง","เข้าระบบเองจากเว็บจริง ไม่ผ่านลิงก์","แจ้งเตือนอนุมัติที่ไม่ได้ขอ = ปฏิเสธ"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เปลี่ยนรหัสทัน",story:"รหัสหลุดไปแล้ว แต่ยังไม่มีใครเข้าบัญชีได้ เพราะไม่ได้กดอนุมัติและเปลี่ยนรหัสทัน",lessons:["MFA ช่วยไว้ ถ้าไม่กดอนุมัติเอง","เปลี่ยนรหัสจากเว็บจริงทันที","แจ้ง IT ให้ช่วยตรวจ"]},
  E3:{type:"danger",label:"เสียหาย",title:"บัญชีถูกยึด",story:"คนร้ายเข้าบัญชีอีเมลได้ แล้วใช้มันส่งเมลหลอกต่อไปหาเพื่อนทั้งคณะ",lessons:["อย่ากดอนุมัติเพื่อให้แจ้งเตือนหยุด","ปิดเสียงไม่ใช่วิธีแก้","บัญชีเราอาจถูกใช้หลอกคนอื่น"]},
  E4:{type:"danger",label:"เสียหาย",title:"งานและข้อมูลหลุดทั้งหมด",story:"คนร้ายเข้าได้ทั้งอีเมล ระบบลงทะเบียน และไฟล์งาน แล้วขายข้อมูลนักศึกษาต่อ",lessons:["ไม่มีฝ่าย IT ไหนขอรหัสผ่าน","โลโก้ปลอมได้ โดเมนปลอมไม่ได้","อนุมัติ = ยกบัญชีให้"]}
 }},

parttime:{id:"parttime",level:"ยาก",start:"s1",title:"งานพาร์ทไทม์ “แค่เปิดบัญชี”",
 learn:["บัญชีม้าคืออะไร","เจ้าของบัญชีมีความผิดตามกฎหมาย","ทางออกเมื่อเผลอเป็นบัญชีม้าแล้ว","กล้าบอกตำรวจ"],
 scenes:{
  s1:{title:"ปวีณาร้องไห้อยู่หลังตึก",
   body:`<p>นักศึกษาสาวชื่อปวีณานั่งร้องไห้ “เราแค่รับงานพาร์ทไทม์ เปิดบัญชีให้บริษัท เดือนละ 3,000”</p>${notif(["🔒 บัญชีของท่านถูกระงับชั่วคราว กรุณาติดต่อสาขา","💬 พี่บอส: ห้ามบอกใครเด็ดขาด ไม่งั้นโดนเองนะ"])}<p>“ตอนนี้บัญชีโดนอายัด แล้วพี่บอสก็ขู่เรา”</p>`,
   clues:["รับจ้างเปิดบัญชี = บัญชีม้า","คำขู่ “ห้ามบอกใคร” คือวิธีคุมเหยื่อ","ยิ่งเงียบ ยิ่งถูกใช้ต่อ"],
   choices:[{t:"บอกปวีณาว่าเธอเป็นทั้งเหยื่อและพยาน ชวนไปเล่าทุกอย่างให้พี่ภพที่สถานีตำรวจ",to:"s2a",v:"good"},{t:"แนะนำให้ปิดบัญชีเงียบๆ แล้วตัดการติดต่อพี่บอส จะได้ไม่โยงถึงตัว",to:"s2b",v:"bad"},{t:"ให้ปวีณาไปขอให้พี่บอสช่วยปลดอายัดก่อน เขาน่าจะมีคนรู้จัก",to:"s2c",v:"bad"}]},
  s2a:{title:"ปวีณากลัว",
   body:`<p>“ถ้าไปหาตำรวจ เราจะโดนจับไหม พี่บอสบอกว่าเราผิดเต็มๆ”</p>${chat("👔","พี่บอส","LINE",["ได้ข่าวว่ามีคนไปคุยกับเธอ","อย่าคิดไปแจ้งความ ไม่งั้นรูปบัตรเธอจะไปอยู่ทุกกลุ่ม"])}`,
   clues:["การไปแจ้งเองและให้ความร่วมมือ ดีกว่าถูกตามจับทีหลัง","คำขู่คือหลักฐาน แคปเก็บไว้","เธอไม่ต้องเผชิญเรื่องนี้คนเดียว"],
   choices:[{t:"แคปแชตขู่เก็บไว้ บอกเธอว่าให้ความร่วมมือคือทางที่ดีที่สุด แล้วไปสถานีด้วยกัน",to:"E1",v:"good"},{t:"บอกเธอว่าอย่าเพิ่งไป รอให้เรื่องเงียบก่อน",to:"E3",v:"risky"},{t:"ตอบโต้พี่บอสในแชตแทนเธอให้รู้ว่าไม่กลัว",to:"E2",v:"risky"}]},
  s2b:{title:"ปิดบัญชีไม่ได้",
   body:`${staff("ธนาคาร","“บัญชีนี้ถูกอายัดตามคำขอของเจ้าหน้าที่ค่ะ ปิดเองไม่ได้ ต้องติดต่อพนักงานสอบสวน”")}<p>ปวีณาตัวสั่น “แล้วพี่บอสส่งงานใหม่มาอีก ให้เปิดบัญชีที่ธนาคารอื่นเพิ่ม”</p>`,
   clues:["บัญชีที่ถูกอายัดหนีไม่ได้","เปิดบัญชีเพิ่ม = ผิดซ้ำ","ทางออกคือคุยกับตำรวจ"],
   choices:[{t:"ไม่เปิดบัญชีเพิ่ม พาเธอไปหาพี่ภพเล่าความจริงทั้งหมด",to:"E2",v:"good"},{t:"เปิดบัญชีใหม่รอบสุดท้าย แล้วค่อยเลิก",to:"E4",v:"bad"},{t:"ให้เธอหนีกลับบ้านต่างจังหวัดสักพัก",to:"E3",v:"bad"}]},
  s2c:{title:"พี่บอสยื่นข้อเสนอ",
   body:`${chat("👔","พี่บอส","LINE",["ปลดอายัดได้ค่ะ จ่ายค่าเคลียร์ 8,000","หรือช่วยหาเพื่อนมาเปิดบัญชีเพิ่มอีก 3 คน ก็หักลบกันไป"])}`,
   clues:["คนที่ทำให้เดือดร้อน ไม่ใช่คนที่จะช่วย","ชวนเพื่อน = ลากคนอื่นเข้ามาด้วย","ปลดอายัดผ่านคนร้ายไม่มีจริง"],
   choices:[{t:"ปฏิเสธทุกข้อ แคปแชตเก็บ แล้วพาเธอไปหาพี่ภพ",to:"E2",v:"good"},{t:"ช่วยเธอหาเพื่อนมาเปิดบัญชีแทน",to:"E4",v:"bad"},{t:"รวมเงินกันจ่าย 8,000 ให้จบเรื่อง",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ปวีณายอมเป็นพยาน",story:"ปวีณาให้ปากคำกับพี่ภพ พร้อมแชตของ “พี่บอส” และเลขบัญชีทั้งหมดที่เธอถูกสั่งให้เปิด หลักฐานชิ้นนี้ชี้ตรงไปที่ตึกฝั่งตรงข้าม",lessons:["บัญชีม้ามีความผิด แม้ไม่ได้ตั้งใจ","ให้ความร่วมมือกับตำรวจคือทางออก","คำขู่และแชตคือหลักฐาน"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เกือบสายไป",story:"ปวีณายอมไปให้ปากคำในที่สุด แต่หลักฐานบางส่วนถูกลบไปแล้ว",lessons:["ยิ่งรีบบอก ยิ่งเก็บหลักฐานได้ครบ","อย่าเปิดบัญชีเพิ่ม","อย่าโต้ตอบคนร้ายเอง"]},
  E3:{type:"danger",label:"เสียหาย",title:"ปวีณาหายตัวไป",story:"ปวีณาเลือกเงียบ พี่บอสใช้บัญชีอื่นของเธอต่อ และสุดท้ายเธอถูกหมายเรียกในฐานะผู้ต้องหา",lessons:["การเงียบทำให้ถูกใช้ต่อ","จ่ายเงินให้คนร้ายไม่ได้แก้อะไร","หนีไม่ได้ทำให้ความผิดหายไป"]},
  E4:{type:"danger",label:"เสียหาย",title:"เพื่อนอีกหลายคนกลายเป็นบัญชีม้า",story:"เพื่อนอีกสามคนถูกดึงเข้ามา ทุกคนถูกหมายเรียก แก๊งได้บัญชีใหม่ไปใช้ต่อ",lessons:["อย่าชวนคนอื่นเปิดบัญชีให้ใคร","รับจ้างเปิดบัญชี = มีความผิด","บอกตำรวจเร็วที่สุด"]}
 }},

fakeprof:{id:"fakeprof",level:"กลาง",start:"s1",title:"อาจารย์ในไลน์กลุ่มขอค่าเอกสาร",
 learn:["การปลอมตัวเป็นอาจารย์","ยืนยันผ่านช่องทางทางการ","แจ้งเตือนเพื่อนในกลุ่ม","รายงานบัญชีปลอม"],
 scenes:{
  s1:{title:"อาจารย์ทักกลุ่ม",
   body:`${chat("👩‍🏫","อ.มณี (วิชาความปลอดภัยไซเบอร์)","กลุ่มไลน์ Sec 01",["นักศึกษาทุกคน ค่าชีทสอบปลายภาค 150 บาท","โอนเข้าบัญชีผู้ช่วยสอนภายในวันนี้ ไม่งั้นไม่มีสิทธิ์สอบนะคะ","@ บัญชี: น.ส. ปวีณา xxx-x-x1234"])}<p>อาจารย์มณีตัวจริงยืนอยู่ตรงหน้า งงมาก “ครูไม่ได้ส่งข้อความนี้นะ”</p>`,
   clues:["อาจารย์ตัวจริงยืนยันแล้วว่าไม่ได้ส่ง","บัญชีปลอมใช้รูปและชื่ออาจารย์","ชื่อผู้รับ “ปวีณา” อีกแล้ว"],
   choices:[{t:"ให้อาจารย์ประกาศในระบบเรียนออนไลน์ของมหาวิทยาลัยว่าไม่มีการเก็บเงิน แล้วรายงานบัญชีปลอม",to:"s2a",v:"good"},{t:"ให้อาจารย์ทักไปคุยกับบัญชีปลอมให้หยุด",to:"s2b",v:"risky"},{t:"บอกในกลุ่มว่า “อย่าโอน” แล้วออกจากกลุ่ม",to:"s2c",v:"bad"}]},
  s2a:{title:"มีคนโอนไปแล้ว",
   body:`<p>ประกาศขึ้นแล้ว แต่นักศึกษาสามคนโอนไปก่อนหน้า คนหนึ่งถามว่า “แล้วเงินเราล่ะ”</p>`,
   clues:["เก็บสลิปไว้เป็นหลักฐาน","แจ้งความออนไลน์และติดต่อธนาคาร","ยิ่งเร็วยิ่งมีโอกาสอายัดบัญชีปลายทาง"],
   choices:[{t:"รวบรวมสลิปและแชต ให้ทั้งสามคนแจ้ง 1441 และแจ้งความออนไลน์ทันที",to:"E1",v:"good"},{t:"ให้ทักไปขอเงินคืนจากบัญชีปลอม",to:"E2",v:"risky"},{t:"บอกว่าแค่ 150 บาท ปล่อยไปเถอะ",to:"E2",v:"risky"}]},
  s2b:{title:"บัญชีปลอมตอบกลับ",
   body:`${chat("👩‍🏫","อ.มณี (ปลอม)","LINE",["ใครคือตัวปลอมกันแน่คะ 😊","นักศึกษาอย่าเชื่อบัญชีนั้น ครูเปลี่ยนไลน์ใหม่ค่ะ"])}<p>ในกลุ่มเริ่มงงว่าใครจริงใครปลอม</p>`,
   clues:["เถียงกับคนร้ายทำให้คนอื่นสับสนยิ่งขึ้น","ใช้ช่องทางที่ปลอมไม่ได้ เช่น ระบบเรียนของมหาวิทยาลัย","รายงานบัญชีปลอมกับแอป"],
   choices:[{t:"หยุดเถียง ประกาศผ่านระบบเรียนออนไลน์ของมหาวิทยาลัย และรายงานบัญชีปลอม",to:"E2",v:"good"},{t:"ให้อาจารย์ส่งรูปบัตรประจำตัวลงกลุ่มเพื่อยืนยัน",to:"E3",v:"bad"},{t:"ปล่อยให้นักศึกษาตัดสินเองว่าเชื่อใคร",to:"E3",v:"bad"}]},
  s2c:{title:"กลุ่มยังคุยต่อ",
   body:`<p>พอเราออกจากกลุ่ม ก็ไม่เห็นว่ามีอะไรเกิดขึ้นอีก วันรุ่งขึ้นเพื่อนบอกว่า “มีคนโอนไปเกือบยี่สิบคน”</p>`,
   clues:["เตือนแล้วออกไป ไม่ได้หยุดคนร้าย","ต้องมีประกาศจากช่องทางทางการ","คนที่โอนแล้วต้องแจ้งความ"],
   choices:[{t:"ให้อาจารย์ประกาศทางการ แล้วช่วยคนที่โอนไปแจ้ง 1441 และแจ้งความออนไลน์",to:"E2",v:"good"},{t:"ไม่ใช่ความผิดเรา เราเตือนแล้ว",to:"E3",v:"bad"},{t:"โพสต์ด่าคนโอนว่าไม่ระวัง",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ตามเงินทัน",story:"ทั้งสามคนแจ้งทันเวลา บัญชีปลายทางถูกอายัด และบัญชีไลน์ปลอมถูกปิด อาจารย์ขอบคุณที่ช่วยกันจัดการ",lessons:["ยืนยันผ่านช่องทางทางการที่ปลอมยาก","เก็บหลักฐานและแจ้งให้เร็ว","รายงานบัญชีปลอม"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"หยุดได้แต่ช้าไปนิด",story:"บัญชีปลอมถูกปิด แต่เงินบางส่วนถูกโอนออกไปก่อนอายัด",lessons:["อย่าเถียงกับคนร้าย","ยิ่งแจ้งเร็วยิ่งได้เงินคืน","ประกาศทางการชัดที่สุด"]},
  E3:{type:"danger",label:"เสียหาย",title:"โดนกันทั้งคณะ",story:"บัญชีปลอมทักนักศึกษาทีละคน เก็บเงินได้หลายหมื่น และข้อมูลส่วนตัวของอาจารย์ถูกนำไปใช้ต่อ",lessons:["อย่าส่งเอกสารส่วนตัวเพื่อยืนยัน","เตือนแล้วต้องช่วยแก้ต่อ","ปล่อยให้สับสน = คนร้ายได้เปรียบ"]}
 }},

report:{id:"report",level:"ง่าย",start:"s1",title:"แจ้งความอย่างไรให้ได้เงินคืน",
 learn:["สายด่วน AOC 1441","แจ้งความออนไลน์ thaipoliceonline.go.th","หลักฐานที่ต้องเตรียม","อย่าเตือนคนร้ายก่อนแจ้งอายัด"],
 scenes:{
  s1:{title:"ลุงโดนหลอกเมื่อวาน",
   body:`<p>ลุงคนหนึ่งนั่งรอคิวที่สถานี “ลุงโดนหลอกโอนไป 40,000 เมื่อวาน ลบแชตทิ้งไปแล้วเพราะโมโห”</p><p>“ลุงว่าจะทักไปด่ามันสักหน่อย ขู่ว่าจะแจ้งความ เผื่อมันกลัวแล้วคืนเงิน”</p>`,
   clues:["ช่องทางรับแจ้งความออนไลน์ทางการคือสายด่วน 1441 และ thaipoliceonline.go.th","ทักไปเตือนคนร้ายก่อน = เขาจะรีบย้ายเงินและลบบัญชี","สลิปและประวัติในแอปธนาคารยังเป็นหลักฐานได้"],
   choices:[{t:"บอกลุงอย่าเพิ่งทักไปหาคนร้าย แล้วช่วยรวบรวมสลิปและประวัติโอนในแอปธนาคาร",to:"s2a",v:"good"},{t:"ให้ลุงทักไปขู่ว่าจะแจ้งความ บางทีคนร้ายอาจกลัวแล้วคืนเงิน",to:"s2b",v:"bad"},{t:"บอกลุงว่าลบแชตไปแล้ว หลักฐานไม่พอ แจ้งไปก็ไม่ได้อะไร",to:"s2c",v:"bad"}]},
  s2a:{title:"เตรียมหลักฐาน",
   body:`${doc("รายการหลักฐาน",["☐ สลิปโอนเงิน / ประวัติรายการในแอป","☐ เลขบัญชีและชื่อบัญชีปลายทาง","☐ ชื่อ / เบอร์ / ลิงก์โปรไฟล์ของคนร้าย","☐ แชตที่เหลือ (ถ้ามี) และเวลาที่เกิดเหตุ"],"ยิ่งแจ้งเร็ว ยิ่งมีโอกาสอายัดบัญชีทัน")}<p>บัญชีปลายทางคือ… น.ส. ปวีณา</p>`,
   clues:["แจ้ง 1441 ให้ช่วยประสานอายัดบัญชี","แจ้งความออนไลน์ได้ตลอด 24 ชม.","ชื่อปวีณาโยงกับเคสอื่น เป็นหลักฐานสำคัญ"],
   choices:[{t:"โทร 1441 ก่อนเพื่อให้ช่วยอายัดบัญชีเร็วที่สุด แล้วแจ้งความออนไลน์ พร้อมส่งให้พี่ภพดู",to:"E1",v:"good"},{t:"รอให้พนักงานสอบสวนเรียกคิว ค่อยเล่าทั้งหมดทีเดียว",to:"E2",v:"risky"},{t:"โทรหาธนาคารปลายทางเองเพื่อขอเงินคืน",to:"E2",v:"risky"}]},
  s2b:{title:"คนร้ายตอบกลับ",
   body:`${chat("👤","บัญชีคนร้าย","LINE",[">ถ้าไม่คืนเงิน ลุงจะแจ้งความ!","แจ้งไปเลยลุง 😂","@ ผู้ใช้นี้ออกจากการสนทนาแล้ว"])}${notif(["💸 (ธนาคารปลายทาง) มีการโอนเงินออกจากบัญชีผู้รับทั้งหมด 2 นาทีที่แล้ว"])}`,
   clues:["พอรู้ตัว คนร้ายรีบย้ายเงินและหนี","ยังโทร 1441 ให้ช่วยตามบัญชีถัดไปได้","สลิปและเลขบัญชียังเป็นหลักฐาน"],
   choices:[{t:"โทร 1441 ทันที แจ้งความออนไลน์ด้วยสลิปที่มี แล้วเล่าให้พี่ภพฟัง",to:"E2",v:"good"},{t:"ทักไปอีกหลายๆ รอบจนกว่าเขาจะตอบ",to:"E3",v:"bad"},{t:"เลิกแล้ว เงินไปแล้วคงไม่ได้คืน",to:"E3",v:"bad"}]},
  s2c:{title:"ลุงจะกลับบ้าน",
   body:`<p>ลุงลุกจะเดินออก “งั้นลุงกลับดีกว่า เสียเวลา”</p><p>พี่ภพที่เคาน์เตอร์เงยหน้ามอง</p>`,
   clues:["ลบแชตแล้วไม่ได้แปลว่าไม่มีหลักฐาน","สลิปและประวัติในแอปธนาคารยังอยู่","ยังไม่สายที่จะแจ้ง"],
   choices:[{t:"รั้งลุงไว้ บอกว่าสลิปในแอปยังเป็นหลักฐานได้ แล้วพาไปคุยกับพี่ภพ",to:"E2",v:"good"},{t:"ปล่อยลุงกลับ เป็นการตัดสินใจของลุง",to:"E3",v:"bad"},{t:"แนะนำให้ลุงลองหาคนช่วยตามเงินในกลุ่มเฟซบุ๊กแทน",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"อายัดบัญชีทัน",story:"บัญชีปลายทางถูกอายัดก่อนเงินถูกโอนต่อ ลุงมีโอกาสได้เงินคืน และพี่ภพได้หลักฐานโยงไปที่ปวีณาเพิ่ม",lessons:["สายด่วน 1441 และ thaipoliceonline.go.th คือช่องทางทางการ","เตรียมสลิป เลขบัญชี ชื่อคนร้าย เวลา","ยิ่งเร็วยิ่งดี"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"แจ้งได้แต่ช้า",story:"แจ้งความสำเร็จ แต่เงินส่วนหนึ่งถูกโอนต่อไปแล้วก่อนอายัด",lessons:["ไม่ต้องรอคิว โทร 1441 ได้เลย","ธนาคารปลายทางคืนเงินเองไม่ได้ ต้องผ่านขั้นตอน","อย่าทักไปหาคนร้าย"]},
  E3:{type:"danger",label:"เสียหาย",title:"โดนซ้ำสอง",story:"ลุงไม่ได้แจ้งความ เงินถูกโอนต่อไปหลายทอดจนตามไม่ได้ และหายไปถาวร",lessons:["อย่าเตือนคนร้ายก่อนแจ้งอายัด","ลบแชตแล้วก็ยังแจ้งได้","อย่ายอมแพ้ก่อนแจ้ง"]}
 }},

summons:{id:"summons",level:"กลาง",start:"s1",title:"หมายเรียกทาง LINE",
 learn:["หมายเรียกจริงส่งอย่างไร","QR จ่ายค่าปรับปลอม","ยืนยันกับสถานีโดยตรง","ตำรวจไม่ให้โอนเงินตรวจสอบ"],
 scenes:{
  s1:{title:"เอกสารดูทางการมาก",
   body:`<p>ผู้หญิงคนหนึ่งยื่นมือถือให้ดู “เขาส่งหมายเรียกมา บอกว่าเรามีคดีฟอกเงิน”</p>${doc("หมายเรียกผู้ต้องหา (ด่วนที่สุด)",["คดีฟอกเงิน เลขที่ 0412/2569","ให้ชำระค่าประกันตัวออนไลน์ 25,000 บาท ภายใน 2 ชม.","สแกน QR เพื่อชำระ หากไม่ชำระจะออกหมายจับทันที"],"ส่งผ่าน LINE: “สภ.เมือง (สอบสวน)”")}`,
   clues:["หมายเรียกจริงไม่ให้จ่ายเงินผ่าน QR","ขู่ “2 ชั่วโมง” คือการเร่ง","เราอยู่ในสถานีตำรวจอยู่แล้ว ถามได้ทันที"],
   choices:[{t:"ยื่นเอกสารให้พี่ภพที่เคาน์เตอร์ตรวจว่ามีคดีจริงไหม",to:"s2a",v:"good"},{t:"โทรกลับเบอร์ในเอกสารเพื่อยืนยันกับพนักงานสอบสวน",to:"s2b",v:"bad"},{t:"จ่ายไปก่อนกันถูกจับ ถ้าไม่มีคดีจริงค่อยขอคืน",to:"s2c",v:"bad"}]},
  s2a:{title:"พี่ภพตรวจ",
   body:`${staff("พี่ภพ","“ไม่มีคดีนี้ครับ ตำรวจไม่ส่งหมายผ่าน LINE และไม่มีการให้โอนเงินค่าประกันผ่าน QR แบบนี้”")}<p>“แต่เขามีชื่อ นามสกุล และเลขบัตรเราถูกหมด”</p>`,
   clues:["ข้อมูลส่วนตัวหลุดจากที่อื่นได้","มีข้อมูลเราไม่ได้แปลว่าเป็นของจริง","บล็อก แจ้ง และเปลี่ยนรหัสบัญชีสำคัญ"],
   choices:[{t:"บล็อกบัญชีนั้น เก็บเอกสารไว้เป็นหลักฐาน และเฝ้าระวังว่าข้อมูลหลุดไปที่ไหนบ้าง",to:"E1",v:"good"},{t:"ตอบกลับว่ารู้แล้วว่าปลอม ให้เขากลัว",to:"E2",v:"risky"},{t:"ลบแชตทิ้งให้หมดจะได้ไม่เครียด",to:"E2",v:"risky"}]},
  s2b:{title:"“พนักงานสอบสวน” รับสาย",
   body:`<p>“ครับ ผมร้อยตำรวจโทสมชาย ถ้าคุณไม่ชำระใน 1 ชั่วโมง จะมีเจ้าหน้าที่ไปที่บ้าน”</p><p>“อย่าบอกใครนะครับ คดีนี้เป็นความลับ”</p>`,
   clues:["เบอร์ในเอกสารปลอม ก็ต่อสายไปหาคนร้าย","“อย่าบอกใคร” = แยกเหยื่อให้โดดเดี่ยว","พี่ภพอยู่ตรงนี้ ถามตัวจริงได้เลย"],
   choices:[{t:"วางสาย แล้วเดินไปถามพี่ภพที่เคาน์เตอร์ทันที",to:"E2",v:"good"},{t:"ขอเลขบัญชีจากเขา แล้วไปโอนที่ธนาคารให้ถูกต้อง",to:"E3",v:"bad"},{t:"ต่อรองขอผ่อนจ่าย",to:"E3",v:"bad"}]},
  s2c:{title:"จ่ายแล้ว",
   body:`${notif(["✅ โอนเงินสำเร็จ 25,000.00 บาท → น.ส. ปวีณา","💬 สภ.เมือง: ได้รับแล้ว ต้องชำระค่าตรวจสอบเพิ่ม 15,000"])}`,
   clues:["ชื่อผู้รับคือบัญชีบุคคล ไม่ใช่หน่วยงาน","ขอเพิ่มเรื่อยๆ = หลอก","แจ้ง 1441 ทันทีเพื่ออายัด"],
   choices:[{t:"หยุดจ่าย แจ้ง 1441 ทันที แล้วแจ้งความกับพี่ภพตรงนี้เลย",to:"E2",v:"good"},{t:"จ่ายค่าตรวจสอบ จะได้ปิดคดีให้จบ",to:"E3",v:"bad"},{t:"รอดูก่อนว่าเขาจะคืนเงินไหม",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ไม่เสียสักบาท",story:"เธอบล็อกบัญชีปลอม และเอกสารปลอมกลายเป็นหลักฐาน QR ชี้ไปที่บัญชีเดียวกับแก๊งเงา",lessons:["ตำรวจไม่ส่งหมายและไม่เก็บเงินผ่าน LINE","มีข้อมูลเราไม่ได้แปลว่าเป็นของจริง","ถามที่สถานีโดยตรง"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รู้ตัวทัน",story:"เธอเครียดมากแต่ไม่เสียเงินเพิ่ม พี่ภพช่วยแจ้งอายัดบัญชีที่รับเงิน",lessons:["อย่าโทรเบอร์ในเอกสารที่ส่งมา","อย่าโต้ตอบคนร้าย","แจ้งเร็วช่วยได้มาก"]},
  E3:{type:"danger",label:"เสียหาย",title:"เสียไปหลายหมื่น",story:"เธอจ่ายตามที่ถูกขอทุกครั้ง จนเงินเก็บหมด ก่อนจะเดินมาที่เคาน์เตอร์",lessons:["หมายเรียกจริงไม่มี QR ชำระเงิน","ขอเพิ่มเรื่อยๆ = หลอก","ถามตำรวจตัวจริงก่อนจ่ายเสมอ"]}
 }}
};

const EN={
scholar:{id:"scholar",level:"Medium",start:"s1",title:"The 20,000-baht merit scholarship",
 learn:["Real scholarships charge no fee","The university's official channels","Never send a selfie holding your ID","Personal data can open accounts in your name"],
 scenes:{
  s1:{title:"A post in the student group",
   body:`<p>Your friend spots a post in the Facebook group “HCU students: all scholarships”.</p>${site("#0F5E46","hcu-scholar.site","/apply","Merit Scholarship 2026",["20,000 baht · only 12 places left!","Eligibility confirmation fee: 500 baht","Attach: both sides of your ID + a selfie holding it"],"Apply now")}<p>“Only 12 left, and my tuition is due soon.”</p>`,
   clues:["A .site domain isn't the university's site","Real scholarships don't charge a “confirmation” fee","A selfie with your ID lets someone open accounts or loans as you"],
   choices:[{t:"Check the official university site and page, or ask Student Affairs",to:"s2a",v:"good"},{t:"Apply, but send only the front of the ID, no selfie",to:"s2b",v:"risky"},{t:"500 for 20,000 is worth it, some scholarships do charge processing fees. Apply before it fills",to:"s2c",v:"bad"}]},
  s2a:{title:"Student Affairs replies",
   body:`${staff("Officer","“There's no such scholarship. Real ones are on the university website and have no fee. Several students have asked already.”")}<p>Your friend is relieved, but people in the group keep liking the post.</p>`,
   clues:["Others in the group are still at risk","Report the post and tell the group admin","Ask the university to issue a warning"],
   choices:[{t:"Report the post, tell the admin, and ask the university to post a warning",to:"E1",v:"good"},{t:"Comment “scam” under the post, that's enough",to:"E2",v:"risky"},{t:"Stay quiet, don't want trouble",to:"E2",v:"risky"}]},
  s2b:{title:"The ID is already sent",
   body:`${chat("🎓","Scholarship (admin)","LINE",["Got your ID, thanks","One last step: transfer the 500-baht confirmation fee and send the selfie with your ID within 30 minutes","Otherwise the place goes to the next person"])}`,
   clues:["Half your ID data has already leaked","Time pressure = no time to think","Stop now and watch for misuse of your name"],
   choices:[{t:"Stop replying, don't pay, no selfie, and watch for accounts or loans opened in your name",to:"E2",v:"good"},{t:"Send the selfie but not the money, at least you keep your place",to:"E3",v:"bad"},{t:"Pay the 500 but skip the selfie, it's only 500",to:"E3",v:"bad"}]},
  s2c:{title:"Paid",
   body:`${notif(["✅ Transfer successful: 500.00 baht → Ms Paweena","💬 Admin: Thanks! Send the selfie with your ID now"])}<p>The receiving name… why does it sound familiar?</p>`,
   clues:["“Paweena” has shown up in other cases","Real scholarships don't use personal accounts","No selfie sent yet, you can still stop"],
   choices:[{t:"Send nothing more, keep the slip as evidence, and file an online report",to:"E2",v:"good"},{t:"Send the selfie, you've paid already and want the scholarship",to:"E4",v:"bad"},{t:"Ask the admin for a refund first, report only if they refuse",to:"E3",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The fake post is gone",story:"The university warns everyone on every channel and the post is removed within the hour. Your friend applies for a real scholarship on the university site.",lessons:["Real scholarships charge no fee","Check with the university directly","Reporting fake posts protects others"]},
  E2:{type:"warn",label:"Close call",title:"Safe, but watchful",story:"No big loss, but some ID data leaked. Your friend has to watch for anyone using their name to open accounts or loans.",lessons:["ID data is worth more than you think","Stop when you're rushed","Keep evidence for a report"]},
  E3:{type:"danger",label:"Harmed",title:"Money and data lost",story:"The admin vanishes with the money and asks for another “processing fee”. Your friend loses both money and personal data.",lessons:["Never pay a scholarship fee","Never send ID photos to unknown pages","Asking scammers for refunds doesn't work, report it"]},
  E4:{type:"danger",label:"Harmed",title:"An account opened in your name",story:"A month later the police call: an account in your friend's name received money from dozens of victims, though they never opened it.",lessons:["A selfie with your ID = a key to become you","Personal data can be used for crimes","Real scholarships never ask for this"]}
 }},

itmail:{id:"itmail",level:"Hard",start:"s1",title:"An email from “University IT”",
 learn:["Check the real sender domain","Fake university login pages","Approving MFA prompts to make them stop (MFA fatigue)","Report to the real IT team"],
 scenes:{
  s1:{title:"Mailbox full",
   body:`${mail("HCU IT Service","it-support@hcu-mail.help","⚠ Your mailbox is 99% full",["New mail will bounce within 24 hours","Verify your account to get free extra space"],"Verify account")}<p>“Our group work goes through uni mail. If it bounces, we're done.”</p>`,
   clues:["The sender uses hcu-mail.help, not the university's domain","A 24-hour threat","Real IT never asks for passwords by email"],
   choices:[{t:"Don't click. Log into uni mail yourself to check space, then forward this to the real IT team",to:"s2a",v:"good"},{t:"Open the link, and if it looks exactly like the uni system, log in",to:"s2b",v:"bad"},{t:"Reply to ask if they're really IT",to:"s2c",v:"risky"}]},
  s2a:{title:"Plenty of space left",
   body:`<p>The real mailbox is only 12% full. IT replies: “That email is fake. Thanks for reporting.”</p><p>A groupmate messages: “I logged in already. Now approval prompts keep popping up on my phone.”</p>`,
   clues:["Someone in the group has fallen for it","Approval prompts you didn't ask for = the attacker is logging in","Never approve, and change the password now"],
   choices:[{t:"Tell them to tap “Deny” every time, change the password now, and tell IT",to:"E1",v:"good"},{t:"Tell them to approve once so the prompts stop",to:"E3",v:"bad"},{t:"Tell them to mute notifications, the attacker will give up",to:"E2",v:"risky"}]},
  s2b:{title:"A very real-looking login",
   body:`${site("#B5222E","hcu-mail.help","/login","HCU · Single Sign-On",["Student ID","Password"],"Sign in")}${notif(["🔔 New sign-in request: approve?"])}<p>The moment you sign in, your phone asks you to approve.</p>`,
   clues:["Logos can be copied, domains can't","The prompt appears because the attacker is trying your password right now","Approving opens the door for them"],
   choices:[{t:"Deny, change the password on the real site at once, and tell IT",to:"E2",v:"good"},{t:"Approve, you're the one who just signed in",to:"E4",v:"bad"},{t:"Close the page and see what happens",to:"E3",v:"risky"}]},
  s2c:{title:"Someone replies",
   body:`${mail("HCU IT Service","it-support@hcu-mail.help","RE: Identity check",["Yes, 100% the real IT team","For speed, just send your student ID and password to this address"],"")}`,
   clues:["Ask a scammer and they'll say they're real","No IT team asks for passwords","Always verify through another channel"],
   choices:[{t:"Don't reply, delete it, and report through the university website",to:"E1",v:"good"},{t:"Send the password, they confirmed they're IT",to:"E4",v:"bad"},{t:"Send only the student ID, not the password",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The whole group is safe",story:"IT warns the whole university and blocks the fake domain. Everyone's account in the group stays safe.",lessons:["Always check the sender domain","Log in yourself from the real site, not a link","Unrequested approval prompts = deny"]},
  E2:{type:"warn",label:"Close call",title:"Password changed in time",story:"The password leaked, but nobody got in because nobody approved and it was changed in time.",lessons:["MFA saves you if you don't approve it yourself","Change the password on the real site at once","Ask IT to check"]},
  E3:{type:"danger",label:"Harmed",title:"Account taken over",story:"The attacker got into the email and used it to send more phishing to the whole faculty.",lessons:["Never approve just to stop the prompts","Muting isn't a fix","Your account can be used to fool others"]},
  E4:{type:"danger",label:"Harmed",title:"Work and data all leaked",story:"The attacker got into email, registration and files, then sold student data on.",lessons:["No IT team asks for passwords","Logos can be faked, domains can't","Approve = handing over the account"]}
 }},

parttime:{id:"parttime",level:"Hard",start:"s1",title:"A part-time job: “just open an account”",
 learn:["What a mule account is","Account owners are legally liable","What to do if you already became a mule","Having the courage to tell the police"],
 scenes:{
  s1:{title:"Paweena crying behind the building",
   body:`<p>A student named Paweena sits crying. “I only took a part-time job opening accounts for a company, 3,000 a month.”</p>${notif(["🔒 Your account is temporarily suspended. Please contact your branch","💬 Boss: Don't tell anyone. Or it's on you."])}<p>“Now my account's frozen and Boss is threatening me.”</p>`,
   clues:["Being paid to open accounts = a mule account","“Tell no one” is how they control victims","Staying quiet lets them keep using you"],
   choices:[{t:"Tell Paweena she's both a victim and a witness, and offer to go with her to tell Phop at the station",to:"s2a",v:"good"},{t:"Suggest she quietly close the account and cut off Boss so nothing traces back",to:"s2b",v:"bad"},{t:"Have her ask Boss to unfreeze it first, he probably knows people",to:"s2c",v:"bad"}]},
  s2a:{title:"Paweena is scared",
   body:`<p>“If I go to the police, will I be arrested? Boss says it's all my fault.”</p>${chat("👔","Boss","LINE",["Heard someone's been talking to you","Don't even think of reporting, or your ID photo goes to every group"])}`,
   clues:["Coming forward and cooperating beats being tracked down later","The threat is evidence, screenshot it","She doesn't have to face this alone"],
   choices:[{t:"Screenshot the threat, tell her cooperating is the best path, and go to the station together",to:"E1",v:"good"},{t:"Tell her to wait until things calm down",to:"E3",v:"risky"},{t:"Reply to Boss yourself to show you're not scared",to:"E2",v:"risky"}]},
  s2b:{title:"The account can't be closed",
   body:`${staff("Bank","“This account is frozen at an investigator's request. You can't close it yourself, please contact the investigating officer.”")}<p>Paweena is shaking. “And Boss just sent a new job: open an account at another bank.”</p>`,
   clues:["A frozen account can't be escaped","Opening another one = a second offence","The way out is talking to the police"],
   choices:[{t:"No new accounts. Take her to Phop and tell the whole truth",to:"E2",v:"good"},{t:"Open one last account, then quit",to:"E4",v:"bad"},{t:"Have her lie low at home upcountry for a while",to:"E3",v:"bad"}]},
  s2c:{title:"Boss makes an offer",
   body:`${chat("👔","Boss","LINE",["I can unfreeze it. Clearing fee 8,000","Or bring 3 friends to open accounts and we'll call it even"])}`,
   clues:["The one who caused the trouble won't fix it","Recruiting friends drags others in","There's no unfreezing through scammers"],
   choices:[{t:"Refuse everything, screenshot the chat, and take her to Phop",to:"E2",v:"good"},{t:"Help her find friends to open accounts instead",to:"E4",v:"bad"},{t:"Chip in together and pay the 8,000 to end it",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Paweena agrees to testify",story:"Paweena gives a statement to Phop, with Boss's chats and every account number she was told to open. This evidence points straight at the building across the road.",lessons:["Mule accounts are a crime, even unintentionally","Cooperating with police is the way out","Threats and chats are evidence"]},
  E2:{type:"warn",label:"Close call",title:"Nearly too late",story:"Paweena does give a statement in the end, but some evidence has already been deleted.",lessons:["The sooner you speak up, the more evidence survives","Don't open more accounts","Don't argue with scammers yourself"]},
  E3:{type:"danger",label:"Harmed",title:"Paweena disappears",story:"Paweena stays silent. Boss keeps using her other accounts, and she ends up summoned as a suspect.",lessons:["Silence lets them keep using you","Paying scammers fixes nothing","Running away doesn't erase the offence"]},
  E4:{type:"danger",label:"Harmed",title:"More friends become mules",story:"Three more friends are pulled in. All of them are summoned, and the gang gets fresh accounts.",lessons:["Never recruit others to open accounts","Opening accounts for pay is a crime","Tell the police as soon as possible"]}
 }},

fakeprof:{id:"fakeprof",level:"Medium",start:"s1",title:"The “lecturer” asks for a document fee in the LINE group",
 learn:["Impersonating lecturers","Verify through official channels","Warn others in the group","Report fake accounts"],
 scenes:{
  s1:{title:"A message to the class group",
   body:`${chat("👩‍🏫","Dr Manee (Cyber Security)","LINE group Sec 01",["Everyone: the final exam handout costs 150 baht","Transfer to the TA account today or you can't sit the exam","@ Account: Ms Paweena xxx-x-x1234"])}<p>The real Dr Manee is standing right here, baffled. “I never sent that.”</p>`,
   clues:["The real lecturer confirms she didn't send it","The fake account uses her name and photo","The receiving name is “Paweena” again"],
   choices:[{t:"Have her announce on the university's learning system that no fee exists, and report the fake account",to:"s2a",v:"good"},{t:"Have her message the fake account and tell it to stop",to:"s2b",v:"risky"},{t:"Post “don't pay” in the group and leave it",to:"s2c",v:"bad"}]},
  s2a:{title:"Some already paid",
   body:`<p>The announcement is up, but three students paid before it. One asks: “What about my money?”</p>`,
   clues:["Keep the slips as evidence","Report online and contact the bank","The faster, the better the chance to freeze the account"],
   choices:[{t:"Gather slips and chats, and have all three call 1441 and file online reports now",to:"E1",v:"good"},{t:"Have them message the fake account for refunds",to:"E2",v:"risky"},{t:"It's only 150, let it go",to:"E2",v:"risky"}]},
  s2b:{title:"The fake account replies",
   body:`${chat("👩‍🏫","Dr Manee (fake)","LINE",["Which one is the fake, I wonder 😊","Students, don't trust that account. I've switched to a new LINE"])}<p>The group starts to wonder who's real.</p>`,
   clues:["Arguing with the scammer confuses everyone more","Use a channel that can't be faked, like the university learning system","Report the fake account to the app"],
   choices:[{t:"Stop arguing, announce through the university learning system, and report the fake account",to:"E2",v:"good"},{t:"Have her post her staff ID card in the group as proof",to:"E3",v:"bad"},{t:"Let students decide who to believe",to:"E3",v:"bad"}]},
  s2c:{title:"The group carries on",
   body:`<p>After you leave, you don't see what happens. Next day a friend says: “Almost twenty people paid.”</p>`,
   clues:["Warning and leaving doesn't stop the scammer","An official announcement is needed","People who paid must report it"],
   choices:[{t:"Get the lecturer to announce officially and help those who paid call 1441 and report online",to:"E2",v:"good"},{t:"Not our fault, we warned them",to:"E3",v:"bad"},{t:"Post a rant at the people who paid",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The money was caught in time",story:"All three report in time, the receiving account is frozen and the fake LINE is closed. Dr Manee thanks everyone for acting together.",lessons:["Verify through official channels that are hard to fake","Keep evidence and report fast","Report fake accounts"]},
  E2:{type:"warn",label:"Close call",title:"Stopped, slightly late",story:"The fake account is closed, but some money moved before the freeze.",lessons:["Don't argue with scammers","The faster the report, the more you recover","Official announcements are clearest"]},
  E3:{type:"danger",label:"Harmed",title:"The whole faculty got hit",story:"The fake account messaged students one by one, took tens of thousands, and the lecturer's personal data was used again.",lessons:["Don't post personal documents as proof","A warning needs follow-through","Confusion helps the scammer"]}
 }},

report:{id:"report",level:"Easy",start:"s1",title:"How to report so you can get money back",
 learn:["The AOC hotline 1441","Online reports at thaipoliceonline.go.th","Evidence to prepare","Don't warn the scammer before the freeze"],
 scenes:{
  s1:{title:"Scammed yesterday",
   body:`<p>An older man waits at the station. “I was tricked into transferring 40,000 yesterday. I deleted the chat because I was so angry.”</p><p>“I'm going to message him and threaten to report him. Maybe he'll get scared and pay me back.”</p>`,
   clues:["The official channels are the 1441 hotline and thaipoliceonline.go.th","Warning the scammer first = they move the money and vanish","Bank-app slips and history still count as evidence"],
   choices:[{t:"Tell him not to contact the scammer yet, and help him gather slips and transfer history from his bank app",to:"s2a",v:"good"},{t:"Let him threaten to report the scammer, they might get scared and refund",to:"s2b",v:"bad"},{t:"Tell him the chat is gone so there's not enough evidence, reporting won't help",to:"s2c",v:"bad"}]},
  s2a:{title:"Preparing evidence",
   body:`${doc("Evidence checklist",["☐ Transfer slips / transaction history","☐ Receiving account number and name","☐ Scammer's name / number / profile link","☐ Any remaining chats and the time it happened"],"The sooner you report, the better the chance of freezing the account")}<p>The receiving account is… Ms Paweena.</p>`,
   clues:["Call 1441 to help coordinate an account freeze","Online reports are open 24 hours","Paweena's name links to other cases, key evidence"],
   choices:[{t:"Call 1441 first to freeze the account as fast as possible, then report online and show Phop",to:"E1",v:"good"},{t:"Wait for the investigator to call his number and tell everything then",to:"E2",v:"risky"},{t:"Call the receiving bank yourself to ask for a refund",to:"E2",v:"risky"}]},
  s2b:{title:"The scammer replies",
   body:`${chat("👤","Scammer's account","LINE",[">Pay me back or I'll report you!","Go ahead, grandpa 😂","@ This user has left the chat"])}${notif(["💸 (receiving bank) All funds moved out of the receiving account 2 minutes ago"])}`,
   clues:["Once warned, the scammer moves the money and runs","1441 can still help trace the next account","Slips and account numbers are still evidence"],
   choices:[{t:"Call 1441 now, report online with the slips, and tell Phop",to:"E2",v:"good"},{t:"Keep messaging until he answers",to:"E3",v:"bad"},{t:"Give up, the money's gone",to:"E3",v:"bad"}]},
  s2c:{title:"He's leaving",
   body:`<p>He gets up to go. “I'll just go home then. Waste of time.”</p><p>Phop at the counter looks up.</p>`,
   clues:["A deleted chat doesn't mean no evidence","Slips and bank-app history remain","It's not too late to report"],
   choices:[{t:"Stop him: his bank-app slips still count. Take him to talk to Phop",to:"E2",v:"good"},{t:"Let him go, it's his decision",to:"E3",v:"bad"},{t:"Suggest he try a Facebook group that helps recover money",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The account was frozen in time",story:"The receiving account is frozen before the money moves on. He has a real chance of getting it back, and Phop gets more evidence linking to Paweena.",lessons:["1441 and thaipoliceonline.go.th are the official channels","Prepare slips, account numbers, scammer details, times","The sooner the better"]},
  E2:{type:"warn",label:"Close call",title:"Reported, but late",story:"The report is filed, but part of the money moved before the freeze.",lessons:["Don't wait in the queue, call 1441 straight away","The receiving bank can't just refund you","Don't message the scammer"]},
  E3:{type:"danger",label:"Harmed",title:"Scammed twice",story:"He never reports it. The money hops through account after account until it can't be traced.",lessons:["Don't warn the scammer before the freeze","You can still report after deleting chats","Don't give up before reporting"]}
 }},

summons:{id:"summons",level:"Medium",start:"s1",title:"A summons over LINE",
 learn:["How real summonses arrive","Fake fine-payment QR codes","Check with the station directly","Police never ask you to transfer money to “check” it"],
 scenes:{
  s1:{title:"It looks very official",
   body:`<p>A woman shows you her phone. “They sent me a summons saying I'm in a money-laundering case.”</p>${doc("Summons of suspect (most urgent)",["Money laundering case no. 0412/2026","Pay online bail of 25,000 baht within 2 hours","Scan the QR to pay. Failure means an arrest warrant"],"Sent via LINE: “City Police (Investigation)”")}`,
   clues:["Real summonses never ask you to pay by QR","A 2-hour threat is pressure","You're already in a police station, ask right now"],
   choices:[{t:"Hand the document to Phop at the counter to check whether the case exists",to:"s2a",v:"good"},{t:"Call the number on the document to confirm with the investigator",to:"s2b",v:"bad"},{t:"Pay first to avoid arrest, ask for it back if there's no case",to:"s2c",v:"bad"}]},
  s2a:{title:"Phop checks",
   body:`${staff("Phop","“There's no such case. Police don't send summonses by LINE, and there's no bail paid by QR like this.”")}<p>“But they had my full name and ID number.”</p>`,
   clues:["Personal data can leak from elsewhere","Having your data doesn't make it real","Block, report, and change key passwords"],
   choices:[{t:"Block the account, keep the document as evidence, and watch where else her data may have leaked",to:"E1",v:"good"},{t:"Reply that she knows it's fake, to scare them",to:"E2",v:"risky"},{t:"Delete the whole chat to stop worrying",to:"E2",v:"risky"}]},
  s2b:{title:"The “investigator” answers",
   body:`<p>“Yes, Police Lieutenant Somchai here. If you don't pay within the hour, officers will come to your home.”</p><p>“Don't tell anyone. This case is confidential.”</p>`,
   clues:["The fake document's number reaches the scammer","“Tell no one” isolates the victim","The real Phop is right here, ask him"],
   choices:[{t:"Hang up and go straight to Phop at the counter",to:"E2",v:"good"},{t:"Get the account number from him and pay at the bank properly",to:"E3",v:"bad"},{t:"Negotiate to pay in instalments",to:"E3",v:"bad"}]},
  s2c:{title:"Paid",
   body:`${notif(["✅ Transfer successful: 25,000.00 baht → Ms Paweena","💬 City Police: Received. A further 15,000 verification fee is required"])}`,
   clues:["The receiver is a personal account, not an agency","More and more fees = a scam","Call 1441 at once to freeze it"],
   choices:[{t:"Stop paying, call 1441 now, and report to Phop right here",to:"E2",v:"good"},{t:"Pay the verification fee to close the case",to:"E3",v:"bad"},{t:"Wait to see if they refund it",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Not a single baht lost",story:"She blocks the fake account, and the fake document becomes evidence. The QR points to the same account as the Shadow gang.",lessons:["Police don't send summonses or collect money over LINE","Having your data doesn't make it real","Ask at the station directly"]},
  E2:{type:"warn",label:"Close call",title:"Caught it in time",story:"She was badly shaken but lost no more money. Phop helps freeze the receiving account.",lessons:["Don't call numbers on documents you were sent","Don't engage with scammers","Reporting fast helps a lot"]},
  E3:{type:"danger",label:"Harmed",title:"Tens of thousands lost",story:"She paid every time she was asked until her savings were gone, before walking up to the counter.",lessons:["Real summonses have no payment QR","Endless extra fees = a scam","Always ask a real officer before paying"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
