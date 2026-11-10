/* ===== The 15-case set: new and rewritten cases based on scams reported in Thailand =====
   chat (LINE takeover via OTP), leak (credential stuffing after a data breach),
   topup (fake game login), loanapp (illegal loan app abusing permissions), crypto (pig-butchering) */
(function(){
const PH='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"/></svg>';
const XX='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const call=(lab,who,num,note)=>`<div class="call"><div class="lab">${lab}</div><div class="who">${who}</div><div class="num">${num}</div><div class="btnrow"><i class="dec">${XX}</i><i class="acc">${PH}</i></div>${note?`<div class="callnote">${note}</div>`:""}</div>`;
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const sms=(from,lines,time)=>`<div class="phone"><div class="phone-top"><b>${from}</b><span>SMS</span></div>${lines.map(l=>`<div class="bubble">${l}</div>`).join("")}<div class="time">${time}</div></div>`;
const site=(color,url,path,logo,fields,btn)=>`<div class="browser" style="--fake:${color}"><div class="addr"><i class="lock"></i><span class="dim">https://</span>${url}<span class="dim">${path}</span></div><div class="page"><div class="flogo"><i></i>${logo}</div>${fields.map(f=>`<div class="field">${f}</div>`).join("")}<div class="fbtn">${btn}</div></div></div>`;
const perm=(title,text,a,b)=>`<div class="perm"><b>${title}</b><p>${text}</p><div class="pbtn"><span>${a}</span><span>${b}</span></div></div>`;
const notif=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;
const staff=(who,line,ic)=>`<div class="teller"><div class="tq"><small>${who}</small><b>${ic||"🏛️"}</b></div><p>${line}</p></div>`;
const gchat=(title,lines)=>`<div class="gchat"><div class="gch">${title}</div>${lines.map(l=>`<div class="gl"><b style="color:${l[2]||"#7FE0A8"}">${l[0]}</b> ${l[1]}</div>`).join("")}</div>`;

const TH={
chat:{id:"chat",level:"ยาก",start:"s1",title:"เพื่อนขอรหัส 6 หลัก",
 learn:["OTP คือกุญแจบัญชี ห้ามให้ใครแม้แต่เพื่อน","บัญชีเพื่อนที่ถูกยึดใช้หลอกต่อเป็นทอดๆ","ยืนยันตัวตนผ่านอีกช่องทาง","ตั้งรหัสล็อกและผูกอีเมลกับบัญชีแชต"],
 scenes:{
  s1:{title:"“ส่งรหัสให้หน่อย กดผิด”",
   body:`${chat("ต","ต้นข้าว","ออนไลน์",["@19:42","แก ขอโทษนะ เราสมัครไลน์ใหม่แล้วเผลอใส่เบอร์แกแทนเบอร์เรา","เดี๋ยวมีรหัส 6 หลักเข้าไปที่เครื่องแก ส่งมาให้เราหน่อยนะ ด่วนเลย 🙏"])}${sms("LINE",["รหัสยืนยัน LINE ของคุณคือ 482913 ห้ามบอกรหัสนี้กับผู้อื่น"],"19:43")}<p>รหัสเด้งขึ้นมาจริงๆ และข้อความก็มาจากบัญชีต้นข้าวที่คุยกันทุกวัน</p>`,
   clues:["ข้อความ SMS เขียนชัดว่า “ห้ามบอกรหัสนี้กับผู้อื่น”","รหัสที่เข้าเครื่องเรา คือรหัสเข้าบัญชีของเรา ไม่ใช่ของต้นข้าว","บัญชีเป็นของเพื่อนจริง แต่คนพิมพ์อาจไม่ใช่"],
   choices:[{t:"ไม่ส่ง แล้วโทรหาต้นข้าวด้วยเบอร์โทรศัพท์ปกติ",to:"s2a",v:"good"},{t:"ถามคำถามที่มีแต่ต้นข้าวจะรู้ในแชตก่อน ถ้าตอบถูกค่อยส่ง",to:"s2b",v:"risky"},{t:"เพื่อนสนิทกันมาหลายปี ส่งรหัสให้เลย แค่รหัสสมัครเอง",to:"s3",v:"bad"}]},
  s2a:{title:"ต้นข้าวรับสาย",
   body:`${call("กำลังโทร","ต้นข้าว","08x xxx 2210","“ไลน์เราโดนยึดตั้งแต่เมื่อคืน! มีคนทักมาขอรหัสแบบนี้แหละ เราก็ส่งไปเพราะนึกว่าเป็นพี่สาว”")}<p>ในกลุ่มเพื่อนมีคนพิมพ์ว่า “ต้นข้าวขอรหัสเราด้วย ส่งไปแล้วนะ” และไลน์ของคนนั้นก็เริ่มทักขอยืมเงินคนอื่นต่อ</p>`,
   clues:["คนร้ายใช้บัญชีที่ยึดได้ ไปยึดบัญชีถัดไปเรื่อยๆ","เตือนทั้งกลุ่มเร็วที่สุด","บัญชีที่ถูกยึดต้องกู้คืนและแจ้งแพลตฟอร์ม"],
   choices:[{t:"เตือนในกลุ่มว่าห้ามส่งรหัส ช่วยต้นข้าวกู้บัญชี แล้วตั้งรหัสล็อกและผูกอีเมลให้ไลน์ของตัวเอง",to:"E1",v:"good"},{t:"บล็อกบัญชีต้นข้าวแล้วลบแชตทิ้ง เราไม่ได้ส่งรหัส ไม่เกี่ยวกับเรา",to:"E2",v:"risky"},{t:"ส่งรหัสปลอมไปแกล้งคนร้าย ให้เสียเวลาเล่นๆ",to:"E2",v:"risky"}]},
  s2b:{title:"เขาตอบถูก",
   body:`${chat("ต","ต้นข้าว","ออนไลน์",["@19:45",">เมื่อวานเราไปกินอะไรกัน","ชาบูหน้ามอไง แกลืมแล้วเหรอ 😂","รีบๆ หน่อยนะ รหัสหมดอายุใน 2 นาที"])}<p>ตอบถูกจริงๆ แต่ภาพชาบูนั้นต้นข้าวเคยส่งไว้ในแชตนี้</p>`,
   clues:["คนที่ยึดบัญชีได้ อ่านแชตเก่าทั้งหมดได้","ถามในช่องทางเดียวกับที่สงสัย จึงยืนยันอะไรไม่ได้","ยังไม่ส่ง ยังหยุดได้"],
   choices:[{t:"หยุดคุย แล้วโทรหาต้นข้าวด้วยเบอร์โทรศัพท์",to:"s2a",v:"good"},{t:"เขาตอบถูกแล้ว ส่งรหัสให้",to:"s3",v:"bad"},{t:"ขอให้อัดคลิปเสียงยืนยันมาก่อน",to:"E2",v:"risky"}]},
  s3:{title:"ไลน์เราเด้งออก",
   body:`${notif(["⚠️ บัญชี LINE ของคุณถูกใช้เข้าสู่ระบบบนอุปกรณ์อื่น","คุณออกจากระบบแล้ว"])}<p>ไม่ถึงนาที แม่โทรมา “ลูกทักมาขอยืม 8,000 ไปจ่ายค่าหอ แม่จะโอนอยู่แล้วนะ”</p>`,
   clues:["ตอนนี้คนร้ายเป็น “เรา” ในสายตาทุกคน","บอกคนใกล้ชิดด้วยเสียงจริง เร็วที่สุด","กู้บัญชีผ่านเบอร์โทรและอีเมลที่ผูกไว้"],
   choices:[{t:"บอกแม่ห้ามโอน โทรเตือนคนใกล้ชิด แล้วกู้บัญชีและแจ้ง LINE ทันที",to:"E2",v:"good"},{t:"รอให้ไลน์ส่งอีเมลมาเอง ค่อยกู้พรุ่งนี้",to:"E3",v:"bad"},{t:"ขอให้แม่ถามในแชตก่อนว่าใช่ลูกจริงไหม",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ตัดวงจรได้",story:"ไม่มีใครในกลุ่มส่งรหัสเพิ่ม ต้นข้าวกู้บัญชีคืนได้ คุณตั้งรหัสล็อกและผูกอีเมลให้ไลน์ของตัวเองเรียบร้อย",lessons:["OTP ห้ามให้ใคร แม้แต่เพื่อนสนิท","ยืนยันผ่านอีกช่องทาง เช่น โทรเบอร์ปกติ","ตั้งรหัสล็อกและผูกอีเมลกับบัญชีแชต"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รอด แต่คนรอบตัวยังเสี่ยง",story:"คุณไม่เสียบัญชีหรือเงิน แต่บางคนในกลุ่มยังไม่รู้ตัว หรือบัญชีคุณถูกใช้หลอกไปบ้างแล้ว",lessons:["เตือนคนอื่นเร็วเท่ากับช่วยเขา","คำถามส่วนตัวในแชต คนร้ายอ่านย้อนหลังได้","บัญชีถูกยึด ให้แจ้งแพลตฟอร์มทันที"]},
  E3:{type:"danger",label:"เสียหาย",title:"แม่โอนให้คนร้าย",story:"แม่โอนไป 8,000 บาท เพื่อนอีกสามคนก็ได้ข้อความขอยืมเงินจากบัญชีของคุณ กว่าจะกู้คืนได้ใช้เวลาสองวัน",lessons:["ทุกนาทีที่บัญชีถูกยึด คนร้ายหลอกคนใกล้ตัวเรา","ถามในแชตที่ถูกยึดไม่ได้ช่วยอะไร","OTP ที่ส่งไปแล้ว ต้องรีบกู้บัญชีทันที"]}
 }},

leak:{id:"leak",level:"ยาก",start:"s1",lateStart:"s2b",title:"รหัสเดียวใช้ทุกเว็บ",
 learn:["ข้อมูลรั่วจากเว็บหนึ่ง ถูกเอาไปลองทุกบัญชี (Credential stuffing)","เปลี่ยนรหัสอีเมลก่อน เพราะเป็นกุญแจกู้ทุกบัญชี","รหัสไม่ซ้ำกันและยืนยันสองขั้นตอน","อีเมลเตือนภัยปลอมที่ฉวยโอกาสจากข่าว"],
 scenes:{
  s1:{title:"ป้าแดงงง",
   body:`<p>ป้าแดงจากชมรมถักไหมพรมยื่นมือถือมา “เมื่อเช้ามีข่าวว่าเว็บขายไหมพรมที่ป้าซื้อประจำ ข้อมูลลูกค้ารั่ว แล้วตอนนี้มีอะไรเด้งเต็มเลย”</p>${notif(["📧 มีการพยายามเข้าสู่ระบบ Facebook จากเครื่องใหม่ (กัมพูชา)","💳 วอลเล็ต: รหัสผ่านไม่ถูกต้อง 3 ครั้ง","📧 “ทีมความปลอดภัย”: ข้อมูลของคุณรั่ว ยืนยันตัวตนภายใน 24 ชม. → คลิก"])}<p>“ป้าใช้รหัสเดียวกันทุกที่แหละ Daeng1965 จำง่ายดี”</p>`,
   clues:["รหัสที่รั่วจากเว็บเดียว ถูกเอาไปลองกับทุกบัญชี","มีคนกำลังลองเข้า Facebook และวอลเล็ตอยู่ตอนนี้","อีเมลให้คลิกยืนยันตัวตน ฉวยโอกาสจากข่าวรั่ว"],
   choices:[{t:"ช่วยป้าเปลี่ยนรหัสอีเมลก่อน แล้วไล่เปลี่ยนบัญชีอื่นให้ไม่ซ้ำกัน และเปิดยืนยันสองขั้นตอน",to:"s2a",v:"good"},{t:"เปลี่ยนแค่รหัสเว็บไหมพรมที่รั่ว ที่อื่นไม่ได้รั่ว",to:"s2b",v:"risky"},{t:"กดลิงก์ในอีเมล “ทีมความปลอดภัย” ให้เขาช่วยตรวจ",to:"s2c",v:"bad"}]},
  s2a:{title:"รหัสใหม่แบบไหนดี",
   body:`<p>เปลี่ยนรหัสอีเมลเสร็จ ป้าถามต่อ “แล้วบัญชีอื่นตั้งยังไงดี ป้าจำไม่ไหวหรอกถ้าไม่เหมือนกัน”</p>${notif(["✅ เปลี่ยนรหัสอีเมลแล้ว · ออกจากระบบทุกเครื่องแล้ว"])}`,
   clues:["รหัสยาว ไม่ซ้ำ และไม่ใช่ปีเกิด","ตัวจัดการรหัสผ่านช่วยจำแทนได้","ยืนยันสองขั้นตอนกันได้แม้รหัสหลุด"],
   choices:[{t:"ใช้ตัวจัดการรหัสผ่านสร้างรหัสยาวไม่ซ้ำกันทุกบัญชี และเปิดยืนยันสองขั้นตอน",to:"E1",v:"good"},{t:"ตั้งรหัสใหม่อันเดียวที่ยาวๆ แล้วใช้กับทุกบัญชีเหมือนเดิม",to:"E2",v:"risky"},{t:"เปลี่ยนเป็น Daeng1966 ทุกที่ คนร้ายเดาไม่ถึงหรอก",to:"E3",v:"bad"}]},
  s2b:{title:"เช้าวันต่อมา",
   body:`${notif(["📘 Facebook: รหัสผ่านถูกเปลี่ยน","💬 เพื่อนป้า: “แดง ขายไหมพรมราคาส่งจริงเหรอ โอนไปแล้วนะ”"])}<p>เฟซบุ๊กป้าโพสต์ขายของถูกๆ ให้เพื่อนในชมรม และคนร้ายเปลี่ยนรหัสไปแล้ว</p>`,
   clues:["บัญชีที่ไม่ได้เปลี่ยนรหัส ถูกยึดไปแล้ว","เพื่อนของป้ากำลังโดนหลอกต่อ","อีเมลยังเป็นของป้า ใช้กู้คืนได้"],
   choices:[{t:"เปลี่ยนรหัสอีเมล กู้เฟซบุ๊กผ่านหน้าบัญชีถูกแฮก เตือนเพื่อนในชมรม แล้วเปิดยืนยันสองขั้นตอน",to:"E2",v:"good"},{t:"สมัครเฟซบุ๊กใหม่ใช้แทน ของเก่าช่างมัน",to:"E3",v:"bad"},{t:"ทักไปขอคืนจากคนร้ายในแชต",to:"E3",v:"bad"}]},
  s2c:{title:"หน้า “ยืนยันตัวตน”",
   body:`${site("#3B5998","security-check-th.help","/verify","ศูนย์ความปลอดภัยบัญชี",["อีเมล","รหัสผ่านเดิม","รหัส OTP ที่ส่งไปยังมือถือ"],"ยืนยันตัวตน")}<p>ป้าพิมพ์อีเมลไปแล้ว กำลังจะพิมพ์รหัส</p>`,
   clues:["โดเมนไม่ใช่ของ Facebook หรือผู้ให้บริการอีเมล","ขอทั้งรหัสเดิมและ OTP = จะเอาไปเข้าบัญชีจริง","ยังไม่ได้ใส่รหัส ยังทัน"],
   choices:[{t:"ปิดหน้านี้ แล้วเข้าแอปอีเมลจริงเพื่อเปลี่ยนรหัสเอง",to:"s2a",v:"good"},{t:"ใส่รหัสเดิมได้ แต่ไม่ใส่ OTP",to:"E2",v:"risky"},{t:"ใส่ครบ เขาจะได้ล็อกบัญชีให้ป้า",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ทุกบัญชีมีกุญแจของตัวเอง",story:"คนร้ายลองรหัสเก่ากี่ครั้งก็เข้าไม่ได้ ป้าแดงไปสอนเพื่อนในชมรมให้ตั้งรหัสไม่ซ้ำกันด้วย",lessons:["เว็บหนึ่งรั่ว ให้เปลี่ยนรหัสทุกที่ที่ใช้ซ้ำ","เริ่มจากอีเมล เพราะเป็นกุญแจกู้บัญชีอื่น","รหัสไม่ซ้ำกัน + ยืนยันสองขั้นตอน"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"ยังมีช่องโหว่",story:"ป้าไม่เสียเงิน แต่บางบัญชีถูกยึดไปช่วงหนึ่ง หรือยังใช้รหัสเดียวกันทุกที่ ถ้ามีเว็บรั่วอีกก็โดนอีก",lessons:["รหัสเดียวกันทุกที่ = กุญแจดอกเดียวเปิดทุกบ้าน","อีเมลเตือนภัยปลอมมาพร้อมข่าวรั่วเสมอ","เตือนเพื่อนเมื่อบัญชีถูกยึด"]},
  E3:{type:"danger",label:"เสียหาย",title:"ถูกยึดทั้งอีเมลและวอลเล็ต",story:"คนร้ายเข้าอีเมล เปลี่ยนรหัสทุกบัญชี และโอนเงินออกจากวอลเล็ต 6,500 บาท เพื่อนในชมรมโอนค่าไหมพรมปลอมไปอีกหลายคน",lessons:["รหัสที่แค่เปลี่ยนตัวเลข คนร้ายเดาได้","อย่ากรอกรหัสและ OTP ในลิงก์จากอีเมล","กู้บัญชีผ่านช่องทางของแพลตฟอร์มเท่านั้น"]}
 }},

topup:{id:"topup",level:"ยาก",start:"s1",lateStart:"s3",title:"เติมเพชรลด 70%",
 learn:["เว็บล็อกอินเกมปลอม (Phishing)","โฆษณาในโซเชียลพาไปเว็บปลอมได้","รหัสยืนยันในอีเมลคือกุญแจบัญชี","บัญชีที่ถูกขโมยถูกใช้หลอกเพื่อนต่อ"],
 scenes:{
  s1:{title:"โฆษณาในคลิปสั้น",
   body:`<p>ภูมิ น้องชายของต้น เลื่อนคลิปสั้นแล้วกดโฆษณา “เติมเพชรลด 70% วันนี้วันเดียว”</p>${site("#5B2A86","garena-topup70.shop","/login","TOPUP CENTER",["ไอดีเกม / อีเมล","รหัสผ่าน","รหัสยืนยันที่ส่งไปอีเมล"],"รับเพชร")}<p>“พี่ ผมใส่ไอดีกับรหัสไปแล้ว เหลือแค่รหัสในอีเมล”</p>`,
   clues:["ชื่อเว็บไม่ใช่เว็บทางการของเกม","ร้านเติมเกมไม่ต้องใช้รหัสผ่านของเรา ใช้แค่ไอดี","รหัสยืนยันในอีเมลคือกุญแจเข้าบัญชี"],
   choices:[{t:"หยุดภูมิ ไม่ใส่รหัสในอีเมล แล้วรีบเข้าเกมจากแอปจริงเปลี่ยนรหัส",to:"s2a",v:"good"},{t:"ล็อกอินด้วยเฟซบุ๊กแทน ไม่ต้องให้รหัสเกม",to:"s2b",v:"risky"},{t:"ใส่รหัสให้ครบ ลด 70% คุ้มมาก",to:"s3",v:"bad"}]},
  s2a:{title:"เปลี่ยนรหัสทัน",
   body:`${notif(["✅ เปลี่ยนรหัสผ่านเกมแล้ว · ออกจากระบบทุกอุปกรณ์"])}<p>ภูมิทำหน้าเศร้า “แต่โฆษณานี้เพื่อนในห้องก็กดกันหลายคนเลย”</p>`,
   clues:["เพื่อนของภูมิยังเสี่ยง","รายงานโฆษณาปลอมช่วยคนอื่นได้","เติมเกมผ่านช่องทางในเกมหรือร้านค้าทางการเท่านั้น"],
   choices:[{t:"เปิดยืนยันสองขั้นตอน รายงานโฆษณา แล้วให้ภูมิเตือนเพื่อนในห้อง",to:"E1",v:"good"},{t:"เปลี่ยนรหัสแล้วพอ ไม่ต้องบอกใคร ภูมิจะได้ไม่โดนเพื่อนล้อ",to:"E2",v:"risky"},{t:"หาเว็บลดราคาอื่นที่ดูน่าเชื่อกว่าแทน",to:"E2",v:"risky"}]},
  s2b:{title:"ปุ่มเฟซบุ๊กปลอม",
   body:`${site("#3B5998","facebook-login.garena-topup70.shop","/oauth","facebook",["อีเมลหรือเบอร์โทรศัพท์","รหัสผ่าน"],"เข้าสู่ระบบ")}<p>ปุ่มพาไปหน้าตาเหมือนเฟซบุ๊ก แต่ชื่อเว็บยังลงท้ายด้วย garena-topup70.shop</p>`,
   clues:["หน้าล็อกอินเฟซบุ๊กจริงอยู่ที่ facebook.com เท่านั้น","คราวนี้จะเสียทั้งบัญชีเกมและเฟซบุ๊ก","ยังไม่กดเข้าสู่ระบบ"],
   choices:[{t:"ปิดหน้านี้ แล้วเปลี่ยนรหัสเกมในแอปจริง",to:"s2a",v:"good"},{t:"ใส่รหัสเฟซบุ๊ก เพราะหน้าตาเหมือนของจริง",to:"s3",v:"bad"},{t:"ลองใส่รหัสผิดดูก่อนว่าเว็บรู้ไหม",to:"E2",v:"risky"}]},
  s3:{title:"ไอดีหาย",
   body:`${gchat("แชตกิลด์",[["ระบบ","คุณถูกออกจากระบบ: มีการเข้าสู่ระบบจากอุปกรณ์อื่น","#FF8A80"],["Phum_007","ใครอยากได้เพชรถูก กดลิงก์นี้ garena-topup70.shop","#FFC414"],["เพื่อนภูมิ","จริงดิ เดี๋ยวกดเลย"]])}<p>คนร้ายใช้ไอดีของภูมิส่งลิงก์ให้เพื่อนในกิลด์ต่อ</p>`,
   clues:["บัญชีที่ถูกขโมย ใช้หลอกคนที่ไว้ใจเรา","ต้องกู้บัญชีผ่านฝ่ายช่วยเหลือของเกม","เตือนเพื่อนด้วยช่องทางอื่นทันที"],
   choices:[{t:"แจ้งฝ่ายช่วยเหลือของเกมให้ล็อกบัญชี และให้ภูมิเตือนเพื่อนทางอื่นทันที",to:"E2",v:"good"},{t:"สมัครไอดีใหม่ ไอดีเก่าปล่อยไป",to:"E3",v:"bad"},{t:"ทักไปขอไอดีคืนจากคนร้าย",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ไอดีรอด เพื่อนก็รอด",story:"ภูมิยังได้เล่นไอดีเดิม และเตือนเพื่อนทั้งห้องทันก่อนมีใครใส่รหัส โฆษณาปลอมถูกลบหลังมีคนรายงานหลายคน",lessons:["เติมเกมผ่านช่องทางทางการเท่านั้น","ร้านเติมเกมไม่ขอรหัสผ่านหรือรหัสยืนยัน","เปิดยืนยันสองขั้นตอนให้บัญชีเกม"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รอด แต่ยังมีคนเสี่ยง",story:"บัญชีของภูมิปลอดภัยแล้ว แต่เพื่อนบางคนยังกดโฆษณาเดียวกัน หรือไอดีถูกใช้ส่งลิงก์ไปบ้างแล้ว",lessons:["หน้าล็อกอินเหมือนจริง ดูชื่อเว็บเสมอ","เตือนเพื่อนช่วยตัดวงจร","รหัสหลุดให้เปลี่ยนในแอปจริงทันที"]},
  E3:{type:"danger",label:"เสียหาย",title:"ไอดีเลเวล 98 หายถาวร",story:"ไอดีที่ภูมิเล่นมาสามปีถูกขายต่อ เพื่อนในกิลด์อีกห้าคนโดนขโมยไอดีจากลิงก์เดียวกัน",lessons:["ไอดีเกมมีมูลค่า คนร้ายจึงอยากได้","สมัครใหม่ไม่ได้หยุดคนร้ายใช้ไอดีเก่า","แจ้งฝ่ายช่วยเหลือของเกมให้เร็วที่สุด"]}
 }},

loanapp:{id:"loanapp",level:"ยาก",start:"s1",title:"กู้ด่วน 5 นาที ไม่เช็กบูโร",
 learn:["แอปเงินกู้นอกระบบขอสิทธิ์เกินจำเป็น","การทวงหนี้ด้วยการประจานผิดกฎหมาย","ตรวจรายชื่อผู้ให้กู้ที่ได้รับอนุญาต","ถอนสิทธิ์และเก็บหลักฐาน"],
 scenes:{
  s1:{title:"ค่าเทอมภูมิ",
   body:`<p>แม่ปุ๋ย แม่ของภูมิ นั่งกดมือถือหน้าซีด “ต้องจ่ายค่าเทอมภูมิ 5,000 พรุ่งนี้ เจอแอปนี้ในโฆษณา อนุมัติใน 5 นาที”</p>${perm("“เงินด่วนทันใจ” ขอสิทธิ์เข้าถึง","รายชื่อติดต่อ · รูปภาพทั้งหมด · ข้อความ SMS · ตำแหน่งที่ตั้ง","ไม่อนุญาต","อนุญาตทั้งหมด")}<p>แอปนี้โหลดจากลิงก์ในไลน์ ไม่ได้มาจาก Store</p>`,
   clues:["แอปกู้เงินไม่จำเป็นต้องใช้รายชื่อ รูป และ SMS","ติดตั้งจากลิงก์ ไม่ผ่าน Store","“ไม่เช็กบูโร อนุมัติ 5 นาที” คือคำโฆษณาของเงินกู้นอกระบบ"],
   choices:[{t:"ยังไม่ติดตั้ง ช่วยแม่ปุ๋ยตรวจรายชื่อผู้ให้กู้ที่ได้รับอนุญาต และถามโรงเรียนเรื่องผ่อนค่าเทอม",to:"s2a",v:"good"},{t:"ติดตั้งได้ แต่กดไม่อนุญาตรายชื่อกับรูป",to:"s2b",v:"risky"},{t:"อนุญาตทั้งหมด เงินจะได้เข้าเร็ว",to:"s3",v:"bad"}]},
  s2a:{title:"ไม่มีชื่อในรายชื่อ",
   body:`<p>ค้นในรายชื่อผู้ให้บริการสินเชื่อที่ได้รับอนุญาต ไม่พบชื่อ “เงินด่วนทันใจ” ส่วนโรงเรียนตอบว่าแบ่งจ่ายค่าเทอมได้ 2 งวด</p><p>แม่ปุ๋ยถอนหายใจ “แต่เพื่อนบ้านป้าก็ใช้แอปนี้อยู่นะ”</p>`,
   clues:["ไม่มีใบอนุญาต = เงินกู้นอกระบบ","ทางเลือกที่ถูกกฎหมายมีมากกว่าที่คิด","เพื่อนบ้านอาจกำลังโดนอยู่"],
   choices:[{t:"แบ่งจ่ายค่าเทอม และบอกเพื่อนบ้านให้ถอนสิทธิ์แอป เก็บหลักฐาน ถ้าถูกทวงแบบประจานให้แจ้งตำรวจ",to:"E1",v:"good"},{t:"แบ่งจ่ายกับโรงเรียน เรื่องเพื่อนบ้านไม่ใช่ธุระ",to:"E2",v:"risky"},{t:"ลองหาแอปกู้เงินตัวอื่นที่รีวิวดีกว่า",to:"E2",v:"risky"}]},
  s2b:{title:"แอปไม่ยอมทำงาน",
   body:`${perm("ต้องอนุญาตรายชื่อติดต่อเพื่อดำเนินการต่อ","ระบบใช้รายชื่อติดต่อเพื่อยืนยันตัวตนผู้กู้","ยกเลิก","อนุญาต")}<p>แอปขึ้นข้อความนี้ซ้ำทุกครั้งที่กดถัดไป</p>`,
   clues:["บังคับขอรายชื่อ = เตรียมไว้ทวงหนี้แบบประจาน","ผู้ให้กู้จริงยืนยันตัวตนด้วยบัตรประชาชนกับบัญชี ไม่ใช่รายชื่อเพื่อน","ถอนการติดตั้งตอนนี้ยังทัน"],
   choices:[{t:"ถอนการติดตั้งแอป แล้วไปตรวจรายชื่อผู้ให้กู้ที่ได้รับอนุญาต",to:"s2a",v:"good"},{t:"อนุญาตแค่รายชื่อ แต่ไม่ให้รูป",to:"s3",v:"bad"},{t:"ปล่อยแอปไว้ในเครื่อง เผื่อใช้วันหลัง",to:"E2",v:"risky"}]},
  s3:{title:"ได้เงินไม่ครบ แล้วตามมาด้วยการประจาน",
   body:`${notif(["💵 อนุมัติ 5,000 บาท · โอนเข้า 3,000 บาท (หักค่าธรรมเนียม 2,000)","⏰ ต้องชำระคืน 7,000 บาท ภายใน 7 วัน"])}${chat("💀","เงินด่วนทันใจ (ทวงหนี้)","ไลน์",["@วันที่ 8","ไม่จ่ายวันนี้ จะส่งรูปแกพร้อมคำว่า “คนโกง” ให้ทุกคนในรายชื่อ","จ่ายค่าเลื่อนนัด 1,500 ก่อนก็ได้"])}`,
   clues:["ได้ 3,000 ต้องคืน 7,000 ใน 7 วัน คือดอกเบี้ยเกินกฎหมายหลายเท่า","การขู่ประจานต่อคนอื่นเป็นการทวงหนี้ที่ผิดกฎหมาย","จ่าย “ค่าเลื่อน” ไม่มีวันจบ"],
   choices:[{t:"ไม่จ่ายตามคำขู่ เก็บแชตเป็นหลักฐาน ถอนสิทธิ์ ถอนแอป บอกคนใกล้ชิดก่อน แล้วแจ้งตำรวจ",to:"E2",v:"good"},{t:"จ่ายค่าเลื่อนนัด 1,500 ไปก่อนให้เขาหยุด",to:"E3",v:"bad"},{t:"กู้แอปอื่นมาจ่ายแอปนี้",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ค่าเทอมจ่ายได้ ไม่มีหนี้โหด",story:"แม่ปุ๋ยแบ่งจ่ายค่าเทอมกับโรงเรียน เพื่อนบ้านถอนแอปและเก็บหลักฐานไว้แจ้งความ ไม่มีใครในซอยโดนประจาน",lessons:["ตรวจรายชื่อผู้ให้กู้ที่ได้รับอนุญาตก่อนกู้","แอปกู้เงินไม่ควรขอรายชื่อ รูป และ SMS","มีทางเลือกที่ถูกกฎหมายเสมอ ลองถามก่อน"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"หยุดได้ แต่เจ็บตัว",story:"แม่ปุ๋ยไม่โดนหนักกว่าเดิม แต่บางคนในรายชื่อได้ข้อความประจาน หรือคนรอบตัวยังเสี่ยงอยู่",lessons:["การทวงหนี้แบบประจานผิดกฎหมาย แจ้งตำรวจได้","ถอนสิทธิ์ก่อน แล้วค่อยถอนแอป","บอกคนใกล้ชิดก่อนที่คนร้ายจะส่งข้อความ"]},
  E3:{type:"danger",label:"เสียหาย",title:"หนี้งอกไม่หยุด",story:"แม่ปุ๋ยจ่ายค่าเลื่อนนัดสามรอบ รวมกว่า 12,000 บาท แต่รูปของเธอก็ยังถูกส่งไปหาญาติและที่ทำงาน",lessons:["จ่ายตามคำขู่ไม่ทำให้คนร้ายหยุด","กู้ใหม่มาโปะหนี้เก่า ยิ่งจมลึก","เก็บหลักฐานแล้วแจ้งตำรวจ"]}
 }},

crypto:{id:"crypto",level:"ยาก",start:"s1",title:"แฟนออนไลน์สอนเทรดคริปโต",
 learn:["แก๊งหลอกให้รักแล้วชวนลงทุน (Pig-butchering)","กำไรบนหน้าจอเป็นตัวเลขปลอม","ตรวจแพลตฟอร์มกับ ก.ล.ต.","ถอนเงินต้องจ่ายค่าธรรมเนียม = หลอก"],
 scenes:{
  s1:{title:"พี่ชัยกำลังจะโอนเงินเก็บ",
   body:`<p>พี่ชัย เจ้าของร้านเน็ต ยิ้มไม่หุบ “เจนนี่คุยกับพี่ทุกคืนมาสามอาทิตย์ เขาสอนพี่เทรดคริปโต ลองลงไป 1,000 ได้กำไรแล้ว”</p>${site("#0E5E6F","bitnova-th.com","/wallet","BitNova",["ยอดเงิน: 1,960 USDT","กำไรวันนี้ +96%","เจนนี่: ลงเพิ่ม 50,000 ก่อนปิดรอบคืนนี้นะคะ ❤️"],"ฝากเงิน")}<p>“พี่จะโอนเงินเก็บของร้านไป 50,000 คืนนี้”</p>`,
   clues:["คนรู้จักทางออนไลน์ไม่เคยเจอตัว แต่ชวนลงทุน","กำไร 96% ในวันเดียวไม่มีอยู่จริง","รีบให้ลงเพิ่ม “ก่อนปิดรอบคืนนี้”"],
   choices:[{t:"ชวนพี่ชัยตรวจชื่อแพลตฟอร์มกับรายชื่อของ ก.ล.ต. ก่อนโอน",to:"s2a",v:"good"},{t:"ให้ลองถอนเงินกำไรออกมาก่อน ถ้าถอนได้ก็แปลว่าจริง",to:"s2b",v:"risky"},{t:"กำไรขึ้นจริงบนจอ ลงเพิ่มได้เลย",to:"s3",v:"bad"}]},
  s2a:{title:"ไม่พบชื่อ",
   body:`<p>ไม่พบ BitNova ในรายชื่อผู้ประกอบธุรกิจที่ได้รับอนุญาต พี่ชัยส่งข้อความถามเจนนี่</p>${chat("J","เจนนี่ ❤️","ออนไลน์",["ไม่เชื่อใจเจนเหรอคะ 😢","ถ้าไม่ลงคืนนี้ เราคงไปต่อกันไม่ได้แล้ว"])}`,
   clues:["ใช้ความรู้สึกกดดันแทนการตอบคำถาม","แพลตฟอร์มไม่มีใบอนุญาต","1,000 บาทแรกอาจเสียไปแล้ว แต่เงินเก็บยังอยู่"],
   choices:[{t:"หยุดโอน เก็บแชตและหน้าจอทั้งหมด แล้วแจ้งความออนไลน์",to:"E1",v:"good"},{t:"หยุดโอน แต่บล็อกแล้วลบแชตทิ้ง อายเกินกว่าจะบอกใคร",to:"E2",v:"risky"},{t:"ลงแค่ 10,000 พอ เพื่อรักษาความสัมพันธ์",to:"s3",v:"bad"}]},
  s2b:{title:"ถอนได้ 500",
   body:`${notif(["✅ ถอนเงินสำเร็จ 500 บาท"])}${chat("J","เจนนี่ ❤️","ออนไลน์",["เห็นไหมคะ ถอนได้จริง","ทีนี้ลงเพิ่ม 50,000 รับโบนัส VIP 30% นะคะ"])}<p>พี่ชัยตาเป็นประกาย “ถอนได้จริงด้วย!”</p>`,
   clues:["ให้ถอนได้นิดหน่อยเพื่อให้ไว้ใจ แล้วหลอกก้อนใหญ่","ถอนได้ ไม่ได้แปลว่าแพลตฟอร์มถูกกฎหมาย","ยังไม่ได้โอนก้อนใหญ่"],
   choices:[{t:"ยังไม่โอน แล้วตรวจแพลตฟอร์มกับ ก.ล.ต. ก่อน",to:"s2a",v:"good"},{t:"ถอนได้แล้ว แปลว่าจริง โอนเลย",to:"s3",v:"bad"},{t:"โอนครึ่งเดียวก่อน",to:"s3",v:"bad"}]},
  s3:{title:"ถอนไม่ได้",
   body:`${site("#0E5E6F","bitnova-th.com","/withdraw","BitNova",["ยอดเงิน: 148,200 USDT","⚠️ บัญชีถูกตรวจสอบ ชำระภาษี 15% ก่อนถอน","ภาษีที่ต้องชำระ: 22,230 USDT"],"ชำระภาษี")}<p>เจนนี่บอก “จ่ายภาษีก่อนนะคะ แล้วเราจะได้เงินก้อนนี้มาสร้างครอบครัวกัน”</p>`,
   clues:["แพลตฟอร์มจริงหักภาษีจากยอด ไม่ให้โอนเพิ่ม","ยิ่งจ่าย ยิ่งมีค่าใช้จ่ายใหม่","แจ้ง 1441 กับธนาคารเร็ว ยิ่งมีโอกาสอายัด"],
   choices:[{t:"หยุดจ่าย โทร 1441 และธนาคารเพื่ออายัดบัญชีที่โอนไป แล้วแจ้งความพร้อมหลักฐาน",to:"E2",v:"good"},{t:"จ่ายภาษีเพื่อถอนเงินทั้งหมดออกมา",to:"E3",v:"bad"},{t:"ยืมเงินญาติมาจ่ายภาษี",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"เงินเก็บของร้านยังอยู่",story:"พี่ชัยเสียไปแค่ 1,000 บาทแรก แต่เงินเก็บ 50,000 ยังอยู่ หลักฐานแชตช่วยตำรวจโยงบัญชีรับเงินกับแก๊งเดียวกัน",lessons:["คนรู้จักออนไลน์ชวนลงทุน = สัญญาณอันตรายสูงสุด","ตรวจแพลตฟอร์มกับ ก.ล.ต. ก่อนโอน","เก็บหลักฐานไว้ แม้จะอาย"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เจ็บแต่ยังไม่หมดตัว",story:"พี่ชัยหยุดได้ แต่เสียเงินไปบางส่วน หรือไม่มีหลักฐานพอให้ตำรวจตามต่อ",lessons:["ถอนได้นิดหน่อยคือเหยื่อล่อ","ยิ่งแจ้งเร็ว ยิ่งมีโอกาสอายัดเงิน","อย่าลบแชต มันคือหลักฐาน"]},
  E3:{type:"danger",label:"เสียหาย",title:"เงินเก็บหายพร้อมหัวใจ",story:"พี่ชัยจ่ายค่าภาษี ค่าปลดล็อก และค่าธรรมเนียมรวมกว่า 180,000 บาท แล้วเจนนี่ก็หายไป",lessons:["ค่าธรรมเนียมก่อนถอนเงิน คือการหลอกซ้ำ","อย่ายืมเงินคนอื่นมาจ่ายให้แก๊ง","แจ้ง 1441 ทันทีเมื่อรู้ตัว"]}
 }}
};

const EN={
chat:{id:"chat",level:"Hard",start:"s1",title:"A friend asks for your 6-digit code",
 learn:["An OTP is the key to your account: never give it away, even to friends","Taken-over accounts are used to take over the next one","Confirm through a different channel","Set a lock code and link an email to your chat account"],
 scenes:{
  s1:{title:"“Send me the code, I typed it wrong”",
   body:`${chat("T","Ton Khao","Online",["@19:42","Sorry! I signed up for a new LINE and typed your number instead of mine","A 6-digit code is coming to your phone, please send it to me, it's urgent 🙏"])}${sms("LINE",["Your LINE verification code is 482913. Do not share this code with anyone."],"19:43")}<p>The code really arrived, and the message is from the Ton Khao account you chat with every day.</p>`,
   clues:["The SMS clearly says “Do not share this code with anyone”","A code sent to your phone opens your account, not Ton Khao's","The account is your friend's, but the person typing may not be"],
   choices:[{t:"Don't send it. Call Ton Khao on her normal phone number",to:"s2a",v:"good"},{t:"Ask a question only Ton Khao would know first, then send it if she's right",to:"s2b",v:"risky"},{t:"We've been friends for years. Send the code, it's just a sign-up code",to:"s3",v:"bad"}]},
  s2a:{title:"Ton Khao picks up",
   body:`${call("Calling","Ton Khao","08x xxx 2210","“My LINE was taken last night! Someone asked me for a code just like this, and I sent it because I thought it was my sister.”")}<p>In the friends' group someone writes, “Ton Khao asked me for a code too, I sent it.” Now that person's LINE starts asking others for money.</p>`,
   clues:["Scammers use each stolen account to steal the next","Warn the whole group as fast as possible","A taken-over account must be recovered and reported"],
   choices:[{t:"Warn the group never to send codes, help Ton Khao recover her account, then set a lock code and link email on your own LINE",to:"E1",v:"good"},{t:"Block Ton Khao's account and delete the chat. You didn't send anything",to:"E2",v:"risky"},{t:"Send a fake code to waste the scammer's time",to:"E2",v:"risky"}]},
  s2b:{title:"The answer is right",
   body:`${chat("T","Ton Khao","Online",["@19:45",">What did we eat yesterday?","Shabu near campus, did you forget? 😂","Hurry, the code expires in 2 minutes"])}<p>The answer is correct, but Ton Khao posted that shabu photo in this very chat.</p>`,
   clues:["Whoever took the account can read all the old chats","Asking in the same channel you doubt proves nothing","You haven't sent it yet, so you can still stop"],
   choices:[{t:"Stop chatting and call Ton Khao on her phone number",to:"s2a",v:"good"},{t:"The answer was right, send the code",to:"s3",v:"bad"},{t:"Ask for a voice clip to prove it first",to:"E2",v:"risky"}]},
  s3:{title:"You're logged out",
   body:`${notif(["⚠️ Your LINE account was used to log in on another device","You have been logged out"])}<p>Within a minute your mum calls: “You asked to borrow 8,000 for the dorm. I was just about to send it.”</p>`,
   clues:["To everyone else, the scammer is now “you”","Tell the people closest to you by voice, fast","Recover the account using the phone number and email linked to it"],
   choices:[{t:"Tell Mum not to pay, call close friends, then recover the account and report it to LINE right away",to:"E2",v:"good"},{t:"Wait for LINE to email you and recover it tomorrow",to:"E3",v:"bad"},{t:"Ask Mum to check in the chat whether it's really you",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The chain is broken",story:"Nobody else in the group sends a code, Ton Khao gets her account back, and your own LINE now has a lock code and a linked email.",lessons:["Never share an OTP, even with a close friend","Confirm through another channel, like a normal phone call","Set a lock code and link an email to your chat account"]},
  E2:{type:"warn",label:"Close call",title:"You're fine, others are still at risk",story:"You didn't lose your account or money, but some friends still don't know, or your account was already used to trick a few people.",lessons:["Warning others fast protects them","Personal questions in chat can be answered from old messages","Report a taken-over account at once"]},
  E3:{type:"danger",label:"Harmed",title:"Mum paid the scammer",story:"Mum transferred 8,000 baht, and three friends got loan requests from your account. It took two days to get it back.",lessons:["Every minute an account is taken, people close to you are targeted","Checking in the hijacked chat doesn't help","After sending an OTP, recover the account immediately"]}
 }},

leak:{id:"leak",level:"Hard",start:"s1",lateStart:"s2b",title:"One password for every site",
 learn:["A leak from one site gets tried on every account (credential stuffing)","Change your email password first: it's the key to recovering everything else","Unique passwords and two-step verification","Fake security emails that ride on breach news"],
 scenes:{
  s1:{title:"Auntie Daeng is confused",
   body:`<p>Auntie Daeng from the knitting club holds out her phone. “The news says the yarn shop I always buy from leaked its customers' data, and now all of this keeps popping up.”</p>${notif(["📧 Someone tried to log in to Facebook from a new device (Cambodia)","💳 Wallet: wrong password 3 times","📧 “Security team”: your data leaked, verify within 24 hours → click"])}<p>“I use the same password everywhere. Daeng1965. Easy to remember.”</p>`,
   clues:["A password leaked from one site gets tried on every account","Someone is trying Facebook and the wallet right now","The “verify” email rides on the breach news"],
   choices:[{t:"Help her change the email password first, then give every other account its own password and turn on 2-step",to:"s2a",v:"good"},{t:"Only change the yarn shop password, that's the one that leaked",to:"s2b",v:"risky"},{t:"Click the link in the “security team” email so they can check",to:"s2c",v:"bad"}]},
  s2a:{title:"What kind of new password?",
   body:`<p>The email password is changed. She asks, “And the others? I can't remember them if they're all different.”</p>${notif(["✅ Email password changed · logged out of all devices"])}`,
   clues:["Long, unique, and not a birth year","A password manager can remember them for you","Two-step verification protects you even if a password leaks"],
   choices:[{t:"Use a password manager to make a long, unique password for each account and turn on 2-step",to:"E1",v:"good"},{t:"Make one new long password and use it everywhere again",to:"E2",v:"risky"},{t:"Change it to Daeng1966 everywhere. No one will guess",to:"E3",v:"bad"}]},
  s2b:{title:"The next morning",
   body:`${notif(["📘 Facebook: your password was changed","💬 A friend: “Daeng, are you really selling yarn at wholesale? I've paid.”"])}<p>Her Facebook is posting cheap sales to the club, and the scammer has changed the password.</p>`,
   clues:["The accounts you didn't change have been taken","Her friends are being scammed now","The email is still hers and can be used to recover"],
   choices:[{t:"Change the email password, recover Facebook through its hacked-account page, warn the club, and turn on 2-step",to:"E2",v:"good"},{t:"Make a new Facebook and forget the old one",to:"E3",v:"bad"},{t:"Message the scammer and ask for it back",to:"E3",v:"bad"}]},
  s2c:{title:"The “verify” page",
   body:`${site("#3B5998","security-check-th.help","/verify","Account Security Center",["Email","Current password","OTP sent to your phone"],"Verify")}<p>She has typed her email and is about to type the password.</p>`,
   clues:["The domain isn't Facebook's or her email provider's","Asking for the password and the OTP = they want to log in for real","No password typed yet, still in time"],
   choices:[{t:"Close it and change the password in the real email app",to:"s2a",v:"good"},{t:"Type the password but not the OTP",to:"E2",v:"risky"},{t:"Fill in everything so they can lock the account for her",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Every account has its own key",story:"No matter how often the scammers try the old password, it fails. Auntie Daeng teaches the club to use unique passwords too.",lessons:["When one site leaks, change every reused password","Start with email: it unlocks the rest","Unique passwords + two-step verification"]},
  E2:{type:"warn",label:"Close call",title:"Still a gap",story:"She lost no money, but some accounts were taken for a while, or she still uses one password everywhere and the next leak will hit again.",lessons:["One password everywhere = one key for every house","Fake security emails always follow breach news","Warn friends when an account is taken"]},
  E3:{type:"danger",label:"Harmed",title:"Email and wallet both taken",story:"The scammers got into her email, changed every password and took 6,500 baht from her wallet. Several club members paid for fake yarn.",lessons:["Changing only a digit is easy to guess","Never type passwords and OTPs into links from emails","Recover accounts only through the platform's own pages"]}
 }},

topup:{id:"topup",level:"Hard",start:"s1",lateStart:"s3",title:"70% off game diamonds",
 learn:["Fake game login pages (phishing)","Social media ads can lead to fake sites","The code in your email is the key to the account","Stolen accounts are used to trick friends"],
 scenes:{
  s1:{title:"An ad in a short video",
   body:`<p>Phum, Ton's little brother, taps an ad between short videos: “70% off diamonds, today only.”</p>${site("#5B2A86","garena-topup70.shop","/login","TOPUP CENTER",["Game ID / email","Password","Code sent to your email"],"Get diamonds")}<p>“I've typed my ID and password already. Just the email code left.”</p>`,
   clues:["The site isn't the game's official one","Top-up shops only need your ID, never your password","The code in your email is the key to the account"],
   choices:[{t:"Stop Phum, don't enter the email code, and change the password in the real game app right away",to:"s2a",v:"good"},{t:"Log in with Facebook instead so the game password isn't needed",to:"s2b",v:"risky"},{t:"Fill in the code. 70% off is a great deal",to:"s3",v:"bad"}]},
  s2a:{title:"Changed in time",
   body:`${notif(["✅ Game password changed · logged out of all devices"])}<p>Phum looks down. “Lots of kids in my class clicked that ad too.”</p>`,
   clues:["Phum's friends are still at risk","Reporting the fake ad protects others","Top up only inside the game or at official stores"],
   choices:[{t:"Turn on 2-step, report the ad, and have Phum warn his class",to:"E1",v:"good"},{t:"Changing the password is enough. Don't tell anyone so Phum isn't teased",to:"E2",v:"risky"},{t:"Find another discount site that looks more trustworthy",to:"E2",v:"risky"}]},
  s2b:{title:"A fake Facebook button",
   body:`${site("#3B5998","facebook-login.garena-topup70.shop","/oauth","facebook",["Email or phone number","Password"],"Log in")}<p>The button opens a page that looks like Facebook, but the address still ends in garena-topup70.shop.</p>`,
   clues:["The real Facebook login is only on facebook.com","Now he'd lose both the game account and Facebook","He hasn't pressed log in yet"],
   choices:[{t:"Close it and change the game password in the real app",to:"s2a",v:"good"},{t:"Type the Facebook password, it looks real",to:"s3",v:"bad"},{t:"Type a wrong password to test whether the site notices",to:"E2",v:"risky"}]},
  s3:{title:"The account is gone",
   body:`${gchat("Guild chat",[["System","You were logged out: signed in on another device","#FF8A80"],["Phum_007","Want cheap diamonds? Click garena-topup70.shop","#FFC414"],["Phum's friend","Really? Clicking now"]])}<p>The scammer uses Phum's account to send the link to his guild.</p>`,
   clues:["Stolen accounts trick the people who trust us","Recover it through the game's support team","Warn friends through another channel now"],
   choices:[{t:"Ask the game's support to lock the account, and have Phum warn his friends another way now",to:"E2",v:"good"},{t:"Make a new account and let the old one go",to:"E3",v:"bad"},{t:"Message the scammer and ask for the account back",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The account and the class are safe",story:"Phum keeps his account and warns the whole class before anyone else types a password. The fake ad comes down after many reports.",lessons:["Top up only through official channels","Top-up shops never ask for passwords or codes","Turn on 2-step for game accounts"]},
  E2:{type:"warn",label:"Close call",title:"Safe, but others are exposed",story:"Phum's account is safe now, but some friends clicked the same ad, or his account already sent the link to a few people.",lessons:["Look at the site name, not how real the page looks","Warning friends breaks the chain","If a password leaks, change it in the real app at once"]},
  E3:{type:"danger",label:"Harmed",title:"A level-98 account, gone for good",story:"The account Phum played for three years is sold on. Five guild members lose theirs through the same link.",lessons:["Game accounts are worth money, so scammers want them","A new account doesn't stop them using the old one","Contact the game's support as soon as possible"]}
 }},

loanapp:{id:"loanapp",level:"Hard",start:"s1",title:"Loan in 5 minutes, no credit check",
 learn:["Illegal loan apps ask for far more permissions than they need","Shaming people to collect debts is illegal","Check the list of licensed lenders","Revoke permissions and keep evidence"],
 scenes:{
  s1:{title:"Phum's school fees",
   body:`<p>Mae Pu, Phum's mum, stares at her phone. “I need 5,000 for Phum's school fees tomorrow. I found this app in an ad. Approved in 5 minutes.”</p>${perm("“Quick Cash” wants access to","Contacts · All photos · SMS · Location","Don't allow","Allow all")}<p>She got the app from a link in LINE, not from the Store.</p>`,
   clues:["A loan app doesn't need your contacts, photos and SMS","It was installed from a link, not the Store","“No credit check, approved in 5 minutes” is how illegal lenders advertise"],
   choices:[{t:"Don't install it yet. Check the list of licensed lenders with her, and ask the school about paying in parts",to:"s2a",v:"good"},{t:"Install it, but deny contacts and photos",to:"s2b",v:"risky"},{t:"Allow everything so the money comes faster",to:"s3",v:"bad"}]},
  s2a:{title:"Not on the list",
   body:`<p>“Quick Cash” isn't on the list of licensed lenders. The school replies that fees can be paid in two parts.</p><p>Mae Pu sighs. “But the neighbour uses this app.”</p>`,
   clues:["No licence = an illegal lender","There are more legal options than you'd think","The neighbour may be at risk right now"],
   choices:[{t:"Pay the fees in parts, and tell the neighbour to revoke the app's permissions, keep evidence, and go to the police if they shame her",to:"E1",v:"good"},{t:"Pay in parts. The neighbour isn't our business",to:"E2",v:"risky"},{t:"Look for another loan app with better reviews",to:"E2",v:"risky"}]},
  s2b:{title:"The app won't continue",
   body:`${perm("Contacts access is required to continue","We use your contacts to verify the borrower","Cancel","Allow")}<p>The message comes back every time she taps next.</p>`,
   clues:["Forcing contacts access = getting ready to shame you","Real lenders check your ID and bank account, not your friends","Uninstalling now is still in time"],
   choices:[{t:"Uninstall the app, then check the list of licensed lenders",to:"s2a",v:"good"},{t:"Allow contacts but not photos",to:"s3",v:"bad"},{t:"Keep the app in case she needs it later",to:"E2",v:"risky"}]},
  s3:{title:"Short-paid, then shamed",
   body:`${notif(["💵 Approved 5,000 baht · received 3,000 baht (2,000 fee deducted)","⏰ Repay 7,000 baht within 7 days"])}${chat("💀","Quick Cash (collections)","LINE",["@Day 8","Pay today or we send your photo labelled “CHEAT” to everyone in your contacts","Or pay a 1,500 extension fee first"])}`,
   clues:["Getting 3,000 and repaying 7,000 in 7 days is many times the legal interest","Threatening to shame you to others is illegal debt collection","Extension fees never end"],
   choices:[{t:"Don't pay the threat. Keep the chat as evidence, revoke permissions, uninstall, warn close contacts first, then report to the police",to:"E2",v:"good"},{t:"Pay the 1,500 extension so they stop",to:"E3",v:"bad"},{t:"Borrow from another app to pay this one",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Fees paid, no loan shark",story:"Mae Pu pays the school in parts. The neighbour uninstalls the app and keeps evidence. Nobody in the street gets shamed.",lessons:["Check the list of licensed lenders before borrowing","A loan app shouldn't ask for contacts, photos and SMS","There are legal options; ask first"]},
  E2:{type:"warn",label:"Close call",title:"Stopped, but it hurt",story:"Mae Pu stopped it getting worse, but some contacts got shaming messages, or people around her are still at risk.",lessons:["Shaming to collect debt is illegal: report it","Revoke permissions first, then uninstall","Tell close contacts before the scammers do"]},
  E3:{type:"danger",label:"Harmed",title:"Debt that keeps growing",story:"Mae Pu paid three extension fees, over 12,000 baht, and her photo was still sent to relatives and her workplace.",lessons:["Paying threats doesn't make them stop","Borrowing to pay off old debt sinks you deeper","Keep evidence and report to the police"]}
 }},

crypto:{id:"crypto",level:"Hard",start:"s1",title:"An online sweetheart teaches crypto trading",
 learn:["Romance-and-investment scams (pig-butchering)","Profits on screen are made-up numbers","Check platforms with the SEC","Paying fees to withdraw = a scam"],
 scenes:{
  s1:{title:"Chai is about to send his savings",
   body:`<p>Chai, the net café owner, can't stop smiling. “Jenny has talked to me every night for three weeks. She's teaching me crypto. I put in 1,000 and I'm already in profit.”</p>${site("#0E5E6F","bitnova-th.com","/wallet","BitNova",["Balance: 1,960 USDT","Today's profit +96%","Jenny: Add 50,000 before the round closes tonight ❤️"],"Deposit")}<p>“I'm sending the shop's 50,000 savings tonight.”</p>`,
   clues:["Someone he's never met in person is pushing an investment","96% profit in a day doesn't exist","Pressure to add more “before the round closes tonight”"],
   choices:[{t:"Get Chai to check the platform against the SEC's list before sending anything",to:"s2a",v:"good"},{t:"Have him try to withdraw the profit first. If it works, it's real",to:"s2b",v:"risky"},{t:"The profit is right there on the screen. Add more",to:"s3",v:"bad"}]},
  s2a:{title:"Not on the list",
   body:`<p>BitNova isn't on the list of licensed businesses. Chai messages Jenny about it.</p>${chat("J","Jenny ❤️","Online",["Don't you trust me? 😢","If you don't put it in tonight, I don't think we have a future"])}`,
   clues:["Emotional pressure instead of an answer","The platform has no licence","The first 1,000 may be gone, but the savings are safe"],
   choices:[{t:"Stop the transfer, save every chat and screen, and file an online police report",to:"E1",v:"good"},{t:"Stop, but block her and delete the chats. Too embarrassing to tell anyone",to:"E2",v:"risky"},{t:"Put in just 10,000 to save the relationship",to:"s3",v:"bad"}]},
  s2b:{title:"500 comes out",
   body:`${notif(["✅ Withdrawal successful: 500 baht"])}${chat("J","Jenny ❤️","Online",["See? It really works","Now add 50,000 for a 30% VIP bonus"])}<p>Chai's eyes light up. “It really works!”</p>`,
   clues:["Letting you withdraw a little builds trust for the big one","Being able to withdraw doesn't make it legal","The big transfer hasn't happened yet"],
   choices:[{t:"Hold off and check the platform with the SEC first",to:"s2a",v:"good"},{t:"It paid out, so it's real. Send it",to:"s3",v:"bad"},{t:"Send half first",to:"s3",v:"bad"}]},
  s3:{title:"Can't withdraw",
   body:`${site("#0E5E6F","bitnova-th.com","/withdraw","BitNova",["Balance: 148,200 USDT","⚠️ Account under review. Pay 15% tax before withdrawing","Tax due: 22,230 USDT"],"Pay tax")}<p>Jenny says, “Pay the tax first, then we'll have this money to start a family.”</p>`,
   clues:["Real platforms deduct tax from the balance; they don't ask you to send more","Every payment brings a new fee","Calling 1441 and the bank fast gives the best chance to freeze it"],
   choices:[{t:"Stop paying, call 1441 and the bank to freeze the receiving accounts, and report with evidence",to:"E2",v:"good"},{t:"Pay the tax to withdraw everything",to:"E3",v:"bad"},{t:"Borrow from relatives to pay the tax",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The shop's savings are safe",story:"Chai only lost the first 1,000 baht. His 50,000 savings are untouched, and the chat evidence helps police link the receiving accounts to the same gang.",lessons:["An online contact pushing investments = the biggest red flag","Check the platform with the SEC before sending money","Keep evidence, even if it's embarrassing"]},
  E2:{type:"warn",label:"Close call",title:"Hurt, but not ruined",story:"Chai stopped, but lost part of the money, or there isn't enough evidence for police to follow up.",lessons:["A small withdrawal is bait","The sooner you report, the better the chance to freeze money","Don't delete the chats: they're evidence"]},
  E3:{type:"danger",label:"Harmed",title:"Savings and heart, both gone",story:"Chai paid tax, unlock and service fees totalling over 180,000 baht, and then Jenny vanished.",lessons:["Fees before withdrawal are a second scam","Never borrow money to pay the gang","Call 1441 the moment you realise"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
