/* ===== Zone 2: City Library — attacks that ride on public Wi-Fi and shared spaces ===== */
(function(){
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const site=(color,url,path,logo,fields,btn)=>`<div class="browser" style="--fake:${color}"><div class="addr"><i class="lock"></i><span class="dim">https://</span>${url}<span class="dim">${path}</span></div><div class="page"><div class="flogo"><i></i>${logo}</div>${fields.map(f=>`<div class="field">${f}</div>`).join("")}<div class="fbtn">${btn}</div></div></div>`;
const http=(url,title,lines,btn)=>`<div class="browser" style="--fake:#3C4A5A"><div class="addr"><span class="dim">⚠ http://</span>${url}</div><div class="page"><b>${title}</b>${lines.map(l=>`<div class="field">${l}</div>`).join("")}<div class="fbtn">${btn}</div></div></div>`;
const wifi=(rows)=>`<div class="wifi">${rows.map(r=>`<div class="wr"><div><b>${r[0]}</b><small>${r[1]}</small></div><span class="sig">${r[2]}</span></div>`).join("")}</div>`;
const perm=(title,text,a,b)=>`<div class="perm"><b>${title}</b><p>${text}</p><div class="pbtn"><span>${a}</span><span>${b}</span></div></div>`;
const staff=(who,line)=>`<div class="teller"><div class="tq"><small>${who}</small><b>💻</b></div><p>${line}</p></div>`;
const notif=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;

const TH={
charge:{id:"charge",level:"กลาง",start:"s1",lateStart:"L1",title:"ตู้ชาร์จฟรีที่ขอ “เชื่อถือ”",
 learn:["Juice jacking: สาย USB ที่ส่งข้อมูลได้","ปุ่ม “เชื่อถือคอมพิวเตอร์นี้” คืออะไร","ชาร์จจากปลั๊กไฟหรือพาวเวอร์แบงก์ของตัวเอง","ทำอะไรเมื่อเผลอกดอนุญาต"],
 scenes:{
  s1:{title:"แบตลุงเหลือ 3%",
   body:`<p>ลุงประยูรเสียบมือถือกับสาย USB ที่ห้อยอยู่หน้า “ตู้ชาร์จฟรี” ข้างเคาน์เตอร์</p><p>“ลุงต้องรอสายจากหมอ แบตจะหมดแล้ว”</p>${perm("เชื่อถือคอมพิวเตอร์เครื่องนี้ไหม","การตั้งค่าและข้อมูลของคุณจะเข้าถึงได้จากคอมพิวเตอร์เครื่องนี้เมื่อเชื่อมต่อ","ไม่เชื่อถือ","เชื่อถือ")}`,
   clues:["ที่ชาร์จธรรมดาไม่ต้องถาม “เชื่อถือ” เพราะจ่ายแค่ไฟ","ถ้ามือถือถามแบบนี้ แปลว่าปลายสายคือคอมพิวเตอร์ที่อ่านข้อมูลได้","ปลั๊กไฟ + หัวชาร์จของเราเองปลอดภัยกว่าสาย USB สาธารณะ"],
   choices:[{t:"ให้ลุงกด “ไม่เชื่อถือ” ถอดสาย แล้วไปชาร์จด้วยหัวชาร์จเสียบปลั๊กไฟของร้าน",to:"s2a",v:"good"},{t:"กด “เชื่อถือ” ได้ ตู้นี้ตั้งอยู่ข้างเคาน์เตอร์ของร้านเอง น่าจะเป็นของร้าน",to:"s2b",v:"bad"},{t:"กด “ไม่เชื่อถือ” แต่เสียบชาร์จทิ้งไว้ต่อ เพราะกดปฏิเสธแล้วข้อมูลก็ไม่ไปไหน",to:"s2c",v:"risky"}]},
  s2a:{title:"ถามพนักงาน",
   body:`${staff("พนักงาน","“ตู้นั้นไม่ใช่ของร้านค่ะ เมื่อเช้ายังไม่มีเลย ปลั๊กไฟที่โต๊ะริมหน้าต่างใช้ได้ฟรีนะคะ”")}<p>ลุงประยูรกังวล “แต่เมื่อกี้ลุงเสียบไปแล้วแป๊บนึง จะเป็นอะไรไหม”</p>`,
   clues:["ถ้ายังไม่ได้กดเชื่อถือ ข้อมูลส่วนใหญ่ยังปลอดภัย","ควรเช็กว่ามีแอปหรือโปรไฟล์แปลกถูกติดตั้งไหม","ตู้แปลกปลอมควรแจ้งร้านให้ถอดออก คนอื่นจะได้ไม่โดน"],
   choices:[{t:"เช็กในตั้งค่าว่าไม่มีแอปหรือโปรไฟล์แปลก แล้วขอให้ร้านถอดตู้นั้นออก",to:"E1",v:"good"},{t:"ไม่เป็นไรแล้ว เสียบไม่ถึงนาที คงไม่ทันโดนอะไร",to:"E2",v:"risky"},{t:"รีเซ็ตมือถือลุงเป็นค่าโรงงานเลย กันไว้ก่อน",to:"E2",v:"risky"}]},
  s2b:{title:"มีแอปใหม่โผล่มา",
   body:`${notif(["📲 ติดตั้งแล้ว: “Battery Saver Pro”","🔔 Battery Saver Pro ขอสิทธิ์อ่าน SMS"])}<p>ลุงประยูรงง “ลุงไม่ได้ลงแอปอะไรนะ แต่มันบอกว่าจะช่วยประหยัดแบต”</p>`,
   clues:["แอปที่ติดตั้งเองตอนเสียบสาย = ปลายสายควบคุมเครื่องได้","แอปประหยัดแบตไม่จำเป็นต้องอ่าน SMS","สิทธิ์อ่าน SMS = อ่าน OTP ธนาคารได้"],
   choices:[{t:"ถอดสาย ปฏิเสธสิทธิ์ ลบแอป แล้วโทรเบอร์หลังบัตรให้ธนาคารเฝ้าระวังบัญชี",to:"E2",v:"good"},{t:"ให้สิทธิ์ไปก่อน แอปประหยัดแบตต้องรู้ว่าแอปไหนกินไฟ",to:"E4",v:"bad"},{t:"ถอดสายออกก็พอ แอปจะทำงานไม่ได้ถ้าไม่ได้ต่อตู้",to:"E3",v:"bad"}]},
  s2c:{title:"ชาร์จต่อ",
   body:`<p>สิบนาทีต่อมา หน้าจอลุงประยูรเด้งขึ้นมาอีก</p>${perm("เชื่อถือคอมพิวเตอร์เครื่องนี้ไหม","(ถามซ้ำเป็นครั้งที่ 4)","ไม่เชื่อถือ","เชื่อถือ")}<p>“มันถามไม่หยุดเลย ลุงรำคาญแล้ว กดเชื่อถือให้มันจบๆ ดีไหม”</p>`,
   clues:["การถามซ้ำๆ คือการรอให้เรารำคาญจนกดยอม","ถ้าเครื่องถามแบบนี้ ปลายสายไม่ใช่ที่ชาร์จธรรมดาแน่นอน","ถอดสายคือการตัดปัญหาที่ต้นทาง"],
   choices:[{t:"ถอดสายเดี๋ยวนี้ แล้วบอกพนักงานว่าตู้นี้ขอเข้าถึงข้อมูล",to:"E1",v:"good"},{t:"กดเชื่อถือรอบเดียวพอ แล้วถอดทันทีที่แบตถึง 20%",to:"E4",v:"bad"},{t:"ปิดมือถือแล้วชาร์จต่อ เครื่องปิดอยู่จะไม่มีอะไรรั่ว",to:"E2",v:"risky"}]},
  L1:{title:"ไม่ทัน ลุงกดเชื่อถือแล้ว",
   body:`${notif(["📲 ติดตั้งแล้ว: “Battery Saver Pro”","🔔 Battery Saver Pro ขอสิทธิ์อ่าน SMS"])}<p>“ลุงกดอนุญาตไปแล้ว มันบอกว่าจะชาร์จเร็วขึ้น”</p>`,
   clues:["แอปที่ติดตั้งเองตอนเสียบสาย = ปลายสายควบคุมเครื่องได้","สิทธิ์อ่าน SMS = อ่าน OTP ได้","ต้องรีบถอด ลบ และแจ้งธนาคาร"],
   choices:[{t:"ถอดสาย ปฏิเสธสิทธิ์ ลบแอป แล้วโทรเบอร์หลังบัตรให้ธนาคารเฝ้าระวังบัญชี",to:"E2",v:"good"},{t:"ให้สิทธิ์ไปก่อน แอปประหยัดแบตต้องรู้ว่าแอปไหนกินไฟ",to:"E4",v:"bad"},{t:"ถอดสายออกก็พอ แอปจะทำงานไม่ได้ถ้าไม่ได้ต่อตู้",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ตู้ปลอมถูกถอดออก",story:"ลุงประยูรชาร์จกับปลั๊กไฟของร้านจนรับสายหมอทัน ร้านเปิดตู้ดูพบคอมพิวเตอร์จิ๋วซ่อนอยู่ข้างใน และแจ้งตำรวจ",lessons:["ชาร์จด้วยหัวชาร์จ + ปลั๊กไฟ หรือพาวเวอร์แบงก์ของตัวเอง","ที่ชาร์จจริงไม่ต้องถาม “เชื่อถือ”","เจออุปกรณ์แปลกในที่สาธารณะ แจ้งเจ้าของสถานที่"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รอดแต่ต้องตามเก็บกวาด",story:"ไม่มีเงินหาย แต่ลุงต้องลบแอปแปลก เปลี่ยนรหัส และให้ธนาคารเฝ้าระวังบัญชีอยู่หลายวัน",lessons:["ปลายสาย USB สาธารณะอาจเป็นคอมพิวเตอร์","ถามซ้ำๆ คือการรอให้เรายอม","รู้ตัวเมื่อไหร่ ถอด ลบ แจ้ง ทันที"]},
  E3:{type:"danger",label:"เสียหาย",title:"แอปยังทำงานอยู่",story:"ถอดสายแล้วแต่แอปยังอยู่ในเครื่อง คืนนั้นมันอ่าน OTP แล้วส่งต่อให้คนร้าย เงินในบัญชีลุงประยูรหายไป 23,000 บาท",lessons:["ถอดสายไม่ได้ลบแอปที่ติดตั้งไปแล้ว","ต้องลบแอปและถอนสิทธิ์ทุกครั้ง","สิทธิ์อ่าน SMS อันตรายมาก"]},
  E4:{type:"danger",label:"เสียหาย",title:"OTP ถูกขโมย",story:"แอปได้สิทธิ์อ่าน SMS ทุก OTP ที่เข้ามาถูกส่งไปให้คนร้าย บัญชีของลุงประยูรถูกโอนออกจนเกือบหมด",lessons:["อย่ากด “เชื่อถือ” กับที่ชาร์จสาธารณะ","แอปที่ขอสิทธิ์เกินหน้าที่ = อันตราย","ใช้หัวชาร์จหรือพาวเวอร์แบงก์ของตัวเอง"]}
 }},

helper:{id:"helper",level:"ยาก",start:"s1",title:"“เจ้าหน้าที่ Wi-Fi” ใจดี",
 learn:["เจ้าหน้าที่ปลอมในที่สาธารณะ","โปรไฟล์ / VPN ที่ดักข้อมูลทั้งเครื่อง","การแอบดูรหัส (shoulder surfing)","อย่าให้คนแปลกหน้าจับมือถือ"],
 scenes:{
  s1:{title:"มีคนมาช่วย",
   body:`<p>ยายศรีต่อเน็ตไม่ได้ ชายเสื้อโปโลมีบัตรห้อยคอเดินมา “ผมเป็นทีมไอทีของห้องสมุดครับ ส่งมือถือมา เดี๋ยวตั้งค่าให้”</p><p>บัตรเขียนว่า “CITY LIBRARY · IT SUPPORT” แต่ไม่มีรูป</p>`,
   clues:["ใครก็พิมพ์บัตรห้อยคอได้","เจ้าหน้าที่จริงยืนยันได้ที่เคาน์เตอร์","มือถือที่ปลดล็อกอยู่ในมือคนอื่น = ทุกอย่างในเครื่อง"],
   choices:[{t:"ขอบคุณ แล้วพายายไปถามที่เคาน์เตอร์ว่าเขาเป็นเจ้าหน้าที่จริงไหม",to:"s2a",v:"good"},{t:"ให้เขาตั้งค่า แต่เรายืนดูอยู่ข้างๆ ตลอด จะได้เห็นว่าเขาทำอะไร",to:"s2b",v:"bad"},{t:"ขอให้เขาบอกขั้นตอน แล้วให้ยายกดเองทีละขั้น ยายจะได้ไม่ต้องส่งมือถือ",to:"s2c",v:"risky"}]},
  s2a:{title:"เคาน์เตอร์ไม่รู้จักเขา",
   body:`${staff("พนักงาน","“ที่นี่ไม่มีทีมไอทีเดินตามโต๊ะค่ะ รหัส Wi-Fi อยู่บนบัตรห้องสมุดเลย”")}<p>ชายคนนั้นเดินตามมา “ถ้าอยากเร็วกว่านี้ มีแพ็ก VIP 199 บาท โอนมาบัญชีนี้ได้เลยครับ”</p>`,
   clues:["ขายแพ็กเน็ตด้วยการให้โอนเข้าบัญชีส่วนตัว = สัญญาณหลอก","เคาน์เตอร์ยืนยันแล้วว่าไม่มีเจ้าหน้าที่คนนี้","เก็บข้อมูลบัญชีไว้เป็นหลักฐาน"],
   choices:[{t:"ไม่โอน จำเลขบัญชีไว้ แล้วให้พนักงานแจ้ง รปภ. ดูกล้อง",to:"E1",v:"good"},{t:"199 บาทเอง ยายอยากได้เน็ตเร็ว โอนให้จบๆ",to:"E3",v:"bad"},{t:"เดินหนีเงียบๆ ไม่ต้องยุ่ง",to:"E2",v:"risky"}]},
  s2b:{title:"“ติดตั้งโปรไฟล์”",
   body:`${perm("ติดตั้งโปรไฟล์ “CityLib Secure VPN”","โปรไฟล์นี้จะส่งทราฟฟิกเครือข่ายทั้งหมดผ่านเซิร์ฟเวอร์ VPN และติดตั้งใบรับรอง","ยกเลิก","ติดตั้ง")}<p>เขาพูดเร็ว “ใส่รหัสปลดล็อกเครื่องตรงนี้ครับยาย” แล้วยื่นจอให้ยายพิมพ์ต่อหน้าเขา</p>`,
   clues:["โปรไฟล์ + ใบรับรอง = ดักอ่านเว็บที่เข้ารหัสได้","เขาเห็นรหัสปลดล็อกที่ยายพิมพ์","Wi-Fi ร้านไม่ต้องติดตั้ง VPN ของคนแปลกหน้า"],
   choices:[{t:"กดยกเลิก เอามือถือคืน แล้วเปลี่ยนรหัสปลดล็อกทันที",to:"E2",v:"good"},{t:"ให้ยายติดตั้ง VPN ช่วยเข้ารหัสข้อมูล ปลอดภัยกว่าไม่ใช้",to:"E4",v:"bad"},{t:"ให้ยายเอามือบังตอนพิมพ์รหัส แล้วติดตั้งต่อ",to:"E4",v:"bad"}]},
  s2c:{title:"ขั้นตอนแปลกๆ",
   body:`<p>เขาบอก “เข้าลิงก์นี้ แล้วกดดาวน์โหลดโปรไฟล์ครับ”</p>${http("192.168.4.1/setup","CityLib Wi-Fi Setup",["ขั้นที่ 1: ดาวน์โหลดโปรไฟล์ความปลอดภัย","ขั้นที่ 2: ใส่รหัสปลดล็อกเครื่อง"],"ดาวน์โหลด")}`,
   clues:["หน้าเว็บเป็น http และใช้เลข IP","ไม่มี Wi-Fi ไหนต้องใส่รหัสปลดล็อกเครื่อง","กดเองก็อันตรายเท่ากับให้เขากด"],
   choices:[{t:"หยุด ไม่ดาวน์โหลด แล้วไปถามรหัส Wi-Fi ที่เคาน์เตอร์",to:"E1",v:"good"},{t:"ดาวน์โหลดได้ เพราะยายเป็นคนกดเอง เขาไม่ได้แตะเครื่อง",to:"E4",v:"bad"},{t:"ดาวน์โหลดแต่ข้ามขั้นที่ 2 ไม่ใส่รหัสปลดล็อก",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"เจ้าหน้าที่ปลอมถูกจับได้",story:"รปภ. ดูกล้องแล้วพบว่าชายคนนี้เดินหลอกลูกค้าหลายโต๊ะ ยายศรีได้รหัส Wi-Fi จริงจากบัตรห้องสมุด",lessons:["ยืนยันตัวเจ้าหน้าที่ที่เคาน์เตอร์","อย่าส่งมือถือที่ปลดล็อกให้คนแปลกหน้า","Wi-Fi จริงไม่ต้องติดตั้งโปรไฟล์หรือ VPN"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"ต้องเปลี่ยนรหัสทั้งหมด",story:"ยายไม่เสียเงิน แต่รหัสปลดล็อกหลุดไปแล้ว ต้องเปลี่ยนรหัสเครื่องและรหัสแอปธนาคาร ส่วนชายคนนั้นยังหลอกคนอื่นต่อ",lessons:["คนที่เห็นรหัสเรา = รหัสหลุดแล้ว","ลบโปรไฟล์แปลกในการตั้งค่าทันที","แจ้งเจ้าของสถานที่ คนอื่นจะได้ไม่โดน"]},
  E3:{type:"danger",label:"เสียหาย",title:"โอนแล้วโดนขอเพิ่ม",story:"หลังโอน 199 บาท เขาบอกว่าต้อง “ยืนยันบัญชี” อีก 2,000 บาท ยายเสียไปเกือบสามพันก่อนรู้ตัว",lessons:["อย่าโอนเงินให้คนแปลกหน้าเพื่อซื้อเน็ต","โอนครั้งแรกมักตามด้วยค่าโน่นนี่","ถามที่เคาน์เตอร์เสมอ"]},
  E4:{type:"danger",label:"เสียหาย",title:"ทุกอย่างในเครื่องถูกดัก",story:"โปรไฟล์ทำให้ทุกเว็บที่ยายเข้าผ่านเซิร์ฟเวอร์คนร้าย เมื่อยายเปิดแอปธนาคารในคืนนั้น รหัสก็หลุดไปทันที",lessons:["VPN ของคนแปลกหน้า = ให้เขาเห็นทุกอย่าง","อย่าติดตั้งโปรไฟล์หรือใบรับรองที่ไม่รู้ที่มา","บังรหัสไม่พอ ถ้าเครื่องถูกยึดไปแล้ว"]}
 }},

update:{id:"update",level:"กลาง",start:"s1",title:"Wi-Fi บอกให้อัปเดตเบราว์เซอร์",
 learn:["Captive portal ปลอม","อัปเดตจริงมาจากร้านแอปหรือตั้งค่าเครื่องเท่านั้น","ไฟล์ .apk / สิทธิ์ช่วยการเข้าถึง","แยกเครือข่ายสาธารณะกับงานสำคัญ"],
 scenes:{
  s1:{title:"หน้าต่อ Wi-Fi",
   body:`${wifi([["CityLib-Member","มีรหัสผ่าน","▂▄▆_"],["CityLib_FREE_5G","เชื่อมต่อแล้ว · เปิด","▂▄▆█"]])}${http("citylib-free.net/login","⚠ เบราว์เซอร์ของคุณล้าสมัย",["เพื่อความปลอดภัย กรุณาอัปเดต Chrome ก่อนใช้งาน Wi-Fi","ไฟล์: chrome_update_v121.apk (8.2 MB)"],"อัปเดตตอนนี้")}<p>“เราต้องประชุมออนไลน์กับลูกค้าในห้านาที!”</p>`,
   clues:["Wi-Fi ไม่มีสิทธิ์สั่งให้อัปเดตเบราว์เซอร์","อัปเดตจริงมาจาก Play Store / App Store","ไฟล์ .apk จากเว็บ = ติดตั้งแอปนอกร้านแอป"],
   choices:[{t:"ไม่กด ตัดการเชื่อมต่อ แล้วเปิดฮอตสปอตจากมือถือเราให้เข้าประชุมก่อน",to:"s2a",v:"good"},{t:"อัปเดตเบราว์เซอร์เป็นเรื่องดีอยู่แล้ว เวอร์ชันเก่ามีช่องโหว่ กดอัปเดต",to:"s2b",v:"bad"},{t:"เปิด Play Store เช็กว่ามี Chrome เวอร์ชันใหม่จริงไหม ถ้ามีก็โหลดจากหน้านี้ได้",to:"s2c",v:"risky"}]},
  s2a:{title:"เข้าประชุมทัน",
   body:`<p>ประชุมผ่านฮอตสปอตเรียบร้อย เพื่อนถาม “แล้ว Wi-Fi นั่นล่ะ ปล่อยไว้แบบนั้นเหรอ คนอื่นอาจโดน”</p>`,
   clues:["Wi-Fi ปลอมจะหลอกคนต่อไปเรื่อยๆ","เจ้าของสถานที่สั่งปิดหรือแจ้งเตือนได้","ลบเครือข่ายนั้นออกจากเครื่อง กันต่ออัตโนมัติ"],
   choices:[{t:"ลบ CityLib_FREE_5G ออกจากเครื่อง แล้วแจ้งเคาน์เตอร์ให้เตือนผู้ใช้บริการ",to:"E1",v:"good"},{t:"โพสต์เตือนในเพจส่วนตัวก็พอ",to:"E2",v:"risky"},{t:"ไม่ต้องทำอะไร เราไม่โดนแล้ว",to:"E2",v:"risky"}]},
  s2b:{title:"ติดตั้งแล้ว",
   body:`${perm("อนุญาตให้ “Chrome Update” ใช้บริการช่วยการเข้าถึงไหม","แอปจะสามารถ: ดูและควบคุมหน้าจอ · อ่านทุกอย่างที่คุณพิมพ์","ปฏิเสธ","อนุญาต")}<p>หน้าจอบอก “ต้องอนุญาตเพื่อทำการอัปเดตให้เสร็จ”</p>`,
   clues:["เบราว์เซอร์จริงไม่ต้องใช้สิทธิ์ช่วยการเข้าถึง","สิทธิ์นี้ = เห็นและกดแทนเราได้ทุกอย่าง","ปฏิเสธ ลบแอป แล้วเปลี่ยนรหัสจากเครื่องอื่น"],
   choices:[{t:"ปฏิเสธ ลบแอปนั้น แล้วเปลี่ยนรหัสสำคัญจากคอมพิวเตอร์อีกเครื่อง",to:"E2",v:"good"},{t:"อนุญาต เพราะถ้าไม่ให้ อัปเดตจะค้างครึ่งๆ กลางๆ",to:"E4",v:"bad"},{t:"ปฏิเสธ แล้วใช้งานต่อ แอปไม่มีสิทธิ์ก็ทำอะไรไม่ได้",to:"E3",v:"bad"}]},
  s2c:{title:"Play Store มีอัปเดตจริง",
   body:`<p>ใน Play Store มีปุ่ม “อัปเดต” Chrome อยู่จริง แต่หน้า Wi-Fi ยังเด้งไฟล์ chrome_update_v121.apk ค้างไว้</p>`,
   clues:["อัปเดตมีจริงไม่ได้แปลว่าไฟล์จากหน้า Wi-Fi จะจริง","อัปเดตผ่าน Play Store เท่านั้น","หน้า Wi-Fi ที่ยัดไฟล์ให้ = ปลอม"],
   choices:[{t:"อัปเดตผ่านปุ่มใน Play Store แล้วตัดการเชื่อมต่อ Wi-Fi นั้นทิ้ง",to:"E1",v:"good"},{t:"โหลดไฟล์จากหน้า Wi-Fi เพราะยืนยันแล้วว่ามีเวอร์ชันใหม่จริง",to:"s2b",v:"bad"},{t:"อัปเดตใน Play Store แล้วใช้ Wi-Fi นั้นต่อ",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ไม่มีอะไรหลุด",story:"ประชุมทัน ไม่มีแอปแปลก และเคาน์เตอร์ประกาศเตือนผู้ใช้บริการว่า CityLib_FREE_5G ไม่ใช่ของที่นี่",lessons:["อัปเดตจากร้านแอปหรือตั้งค่าเท่านั้น","Wi-Fi ที่ยัดไฟล์ให้โหลด = ปลอม","งานสำคัญใช้ฮอตสปอตของตัวเอง"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รอดแบบหวุดหวิด",story:"ไม่มีเงินหายแต่ต้องเปลี่ยนรหัสหลายบัญชี และมีคนอื่นอีกหลายคนในห้องสมุดโดนหน้าอัปเดตปลอมเดียวกัน",lessons:["ลบเครือข่ายปลอมออกจากเครื่อง","แจ้งเจ้าของสถานที่เสมอ","Wi-Fi สาธารณะไม่เหมาะกับงานสำคัญ"]},
  E3:{type:"danger",label:"เสียหาย",title:"แอปยังแอบทำงาน",story:"แอปปลอมไม่ได้สิทธิ์ช่วยการเข้าถึง แต่ยังขึ้นหน้าล็อกอินปลอมทับแอปธนาคาร เพื่อนกรอกรหัสไปในคืนนั้นเอง",lessons:["ปฏิเสธสิทธิ์ไม่พอ ต้องลบแอปด้วย","แอปนอกร้านแอปทำได้หลายอย่าง","เปลี่ยนรหัสจากเครื่องอื่น"]},
  E4:{type:"danger",label:"เสียหาย",title:"ถูกควบคุมทั้งเครื่อง",story:"แอปเห็นทุกอย่างที่พิมพ์ ระหว่างประชุมมันกดโอนเงินจากแอปธนาคารแทนเพื่อน และส่งไฟล์งานของลูกค้าออกไป",lessons:["อย่าลงไฟล์ .apk จากหน้าเว็บ","สิทธิ์ช่วยการเข้าถึง = ยกเครื่องให้คนอื่น","Wi-Fi ไม่มีสิทธิ์สั่งให้อัปเดตอะไร"]}
 }},

airdrop:{id:"airdrop",level:"ยาก",start:"s1",title:"ไฟล์จาก “LIB-Printer”",
 learn:["AirDrop / Quick Share จากคนแปลกหน้า","ไฟล์เอกสารที่ขอ “เปิดใช้เนื้อหา” (มาโคร)","ตั้งเครือข่ายสาธารณะให้เป็น Public","ปิดการแชร์ไฟล์ในที่สาธารณะ"],
 scenes:{
  s1:{title:"ใกล้เวลานำเสนอ",
   body:`<p>เพื่อนกำลังซ้อมพรีเซนต์ จู่ๆ มีหน้าต่างเด้ง</p>${perm("“LIB-Printer” ต้องการแชร์ไฟล์","Slides_Template_CityLib.docm (2.1 MB)","ปฏิเสธ","ยอมรับ")}<p>“อ๋อ ที่นี่มีปริ้นเตอร์กลางนี่ อาจเป็นเทมเพลตของห้องสมุด”</p>`,
   clues:["ปริ้นเตอร์ไม่ส่งไฟล์มาหาเรา","ใครก็ตั้งชื่อเครื่องว่า LIB-Printer ได้",".docm = เอกสารที่มีมาโคร (โค้ด) ฝังอยู่"],
   choices:[{t:"ปฏิเสธ แล้วตั้งการรับไฟล์เป็น “ผู้ติดต่อเท่านั้น”",to:"s2a",v:"good"},{t:"รับไว้แต่ยังไม่เปิด เดี๋ยวสแกนไวรัสก่อนค่อยเปิด",to:"s2c",v:"risky"},{t:"รับแล้วเปิดดู แค่ไฟล์ Word ไม่ใช่ไฟล์ .exe ไม่อันตราย",to:"s2b",v:"bad"}]},
  s2a:{title:"ส่งมาอีก",
   body:`<p>สักพักโน้ตบุ๊กแจ้งว่า “มีอุปกรณ์ในเครือข่ายพยายามเข้าถึงโฟลเดอร์ที่แชร์: Documents”</p>${notif(["🔔 เครือข่าย CityLib-Member ถูกตั้งเป็น: เครือข่ายส่วนตัว (Private)","📁 การแชร์ไฟล์: เปิด"])}`,
   clues:["ตั้งเป็น Private = ให้เครื่องอื่นในวงเดียวกันมองเห็นเรา","ในที่สาธารณะต้องตั้งเป็น Public","ปิดการแชร์ไฟล์ในที่สาธารณะ"],
   choices:[{t:"เปลี่ยนเครือข่ายเป็น Public ปิดการแชร์ไฟล์ แล้วแจ้งเคาน์เตอร์",to:"E1",v:"good"},{t:"ตั้งรหัสให้โฟลเดอร์ Documents ก็พอ",to:"E2",v:"risky"},{t:"ไม่เป็นไร ใน Documents มีแต่ไฟล์งานธรรมดา",to:"E3",v:"bad"}]},
  s2b:{title:"เอกสารขอเปิดเนื้อหา",
   body:`<div class="perm"><b>⚠ คำเตือนความปลอดภัย: มาโครถูกปิดใช้งาน</b><p>เอกสารนี้สร้างด้วยเวอร์ชันใหม่ กรุณากด “เปิดใช้งานเนื้อหา” เพื่อแสดงเทมเพลต</p><div class="pbtn"><span>ปิด</span><span>เปิดใช้งานเนื้อหา</span></div></div><p>ในไฟล์เป็นหน้าว่างๆ มีแค่โลโก้ห้องสมุดตัวเบลอ</p>`,
   clues:["เอกสารจริงไม่ต้องเปิดมาโครเพื่อแสดงเนื้อหา","มาโคร = โค้ดที่รันบนเครื่องเรา","หน้าเบลอๆ ล่อให้กดเปิดใช้งาน"],
   choices:[{t:"ปิดไฟล์ ลบทิ้ง แล้วให้โปรแกรมป้องกันไวรัสสแกนเครื่อง",to:"E2",v:"good"},{t:"กดเปิดใช้งานเนื้อหา เทมเพลตของห้องสมุดต้องใช้มาโครจัดรูปแบบ",to:"E4",v:"bad"},{t:"ส่งไฟล์ต่อให้เพื่อนในกลุ่มช่วยเปิดดูในเครื่องเขา",to:"E3",v:"bad"}]},
  s2c:{title:"สแกนแล้วไม่เจออะไร",
   body:`<p>โปรแกรมสแกนบอก “ไม่พบภัยคุกคาม” เพื่อนยิ้ม “งั้นเปิดได้แล้วนะ”</p>`,
   clues:["สแกนไม่เจอ ไม่ได้แปลว่าปลอดภัย","ไฟล์จากคนแปลกหน้าที่ไม่ได้ขอ ไม่ต้องเปิด","มาโครใหม่ๆ หลุดการสแกนได้"],
   choices:[{t:"ไม่เปิด ลบทิ้ง แล้วตั้งการรับไฟล์เป็นผู้ติดต่อเท่านั้น",to:"E1",v:"good"},{t:"เปิดได้ แต่ถ้าขอเปิดมาโครค่อยปิด",to:"s2b",v:"risky"},{t:"เปิดได้ สแกนผ่านแล้ว",to:"s2b",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"เครื่องปลอดภัย พรีเซนต์ผ่าน",story:"เพื่อนพรีเซนต์จบสวย เคาน์เตอร์ประกาศให้สมาชิกปิดการรับไฟล์จากทุกคน และพบว่า “LIB-Printer” คือโน้ตบุ๊กของคนแปลกหน้า",lessons:["ตั้งการรับไฟล์เป็นผู้ติดต่อเท่านั้น","เครือข่ายสาธารณะต้องตั้งเป็น Public","ไฟล์ที่ไม่ได้ขอ ไม่ต้องเปิด"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เกือบไปแล้ว",story:"ไม่มีอะไรรันบนเครื่อง แต่โฟลเดอร์งานถูกมองเห็นอยู่พักหนึ่ง เพื่อนต้องเช็กไฟล์ทั้งหมดและเปลี่ยนการตั้งค่าเครือข่าย",lessons:["ปิดการแชร์ในที่สาธารณะ","สแกนผ่านไม่ได้แปลว่าปลอดภัย","ลบไฟล์แปลกทิ้งเลย"]},
  E3:{type:"danger",label:"เสียหาย",title:"ไฟล์ลูกค้าหลุด",story:"เอกสารงานลูกค้าในโฟลเดอร์ที่แชร์ถูกคัดลอกออกไป และคนร้ายเอาไปขู่ขอเงินลูกค้าของเพื่อน",lessons:["ไฟล์งานธรรมดาของเรา อาจมีค่ากับคนร้าย","อย่าส่งไฟล์แปลกให้คนอื่นเปิด","ตั้งเครือข่ายเป็น Public"]},
  E4:{type:"danger",label:"เสียหาย",title:"เครื่องถูกฝังโปรแกรมสอดแนม",story:"มาโครแอบติดตั้งโปรแกรมสอดแนม ทุกไฟล์ในเครื่องและรหัสที่บันทึกไว้ถูกส่งออกไปหลายวันกว่าจะรู้ตัว",lessons:["อย่ากด “เปิดใช้งานเนื้อหา” กับไฟล์ที่ไม่รู้ที่มา","ปริ้นเตอร์ไม่ส่งไฟล์มาหาเรา","รู้ตัวเมื่อไหร่ สแกนเครื่องและเปลี่ยนรหัสทันที"]}
 }}
};

const EN={
charge:{id:"charge",level:"Medium",start:"s1",lateStart:"L1",title:"The free charger that asks to be “trusted”",
 learn:["Juice jacking: USB cables that carry data","What “Trust this computer” means","Charge from a wall plug or your own power bank","What to do if you tapped allow"],
 scenes:{
  s1:{title:"Uncle's battery is at 3%",
   body:`<p>Uncle Prayoon plugs his phone into a USB cable hanging off a “free charging station” by the counter.</p><p>“I'm waiting for a call from the doctor and my battery's nearly dead.”</p>${perm("Trust this computer?","Your settings and data will be accessible from this computer when connected.","Don't Trust","Trust")}`,
   clues:["A plain charger never asks for “trust”, it only supplies power","If the phone asks this, the other end is a computer that can read data","A wall plug and your own adapter beat a public USB cable"],
   choices:[{t:"Have Uncle tap “Don't Trust”, unplug, and charge from the café's wall socket with an adapter",to:"s2a",v:"good"},{t:"Tap “Trust”, the station sits right by the counter, so it must belong to the place",to:"s2b",v:"bad"},{t:"Tap “Don't Trust” but keep charging, once it's refused no data goes anywhere",to:"s2c",v:"risky"}]},
  s2a:{title:"Asking the staff",
   body:`${staff("Staff","“That station isn't ours. It wasn't there this morning. The sockets by the window are free to use.”")}<p>Uncle worries: “But I had it plugged in for a moment. Is that a problem?”</p>`,
   clues:["Without tapping trust, most data is still safe","Check whether any odd app or profile appeared","Get the station removed so nobody else is caught"],
   choices:[{t:"Check settings for odd apps or profiles, and ask the staff to remove that station",to:"E1",v:"good"},{t:"It's fine, it was plugged in for under a minute",to:"E2",v:"risky"},{t:"Factory reset Uncle's phone right away, just in case",to:"E2",v:"risky"}]},
  s2b:{title:"A new app appeared",
   body:`${notif(["📲 Installed: “Battery Saver Pro”","🔔 Battery Saver Pro wants to read your SMS"])}<p>Uncle is puzzled: “I didn't install anything, but it says it saves battery.”</p>`,
   clues:["An app that installs itself when you plug in = the cable controls the phone","A battery saver has no need to read SMS","Reading SMS means reading bank OTPs"],
   choices:[{t:"Unplug, deny the permission, delete the app, and call the bank number on the card to watch the account",to:"E2",v:"good"},{t:"Allow it, a battery saver needs to know which apps use power",to:"E4",v:"bad"},{t:"Just unplug, the app can't work once it's off the station",to:"E3",v:"bad"}]},
  s2c:{title:"Still charging",
   body:`<p>Ten minutes later the prompt pops up again.</p>${perm("Trust this computer?","(asking for the 4th time)","Don't Trust","Trust")}<p>“It won't stop asking. Shall I just tap trust to make it go away?”</p>`,
   clues:["Asking over and over is waiting for you to give in","If the phone asks this, it's not a plain charger","Unplugging removes the problem at the source"],
   choices:[{t:"Unplug now and tell the staff the station is asking for data access",to:"E1",v:"good"},{t:"Tap trust just once and unplug the moment it reaches 20%",to:"E4",v:"bad"},{t:"Switch the phone off and keep charging, nothing leaks when it's off",to:"E2",v:"risky"}]},
  L1:{title:"Too late, Uncle tapped trust",
   body:`${notif(["📲 Installed: “Battery Saver Pro”","🔔 Battery Saver Pro wants to read your SMS"])}<p>“I already tapped allow. It said it would charge faster.”</p>`,
   clues:["An app that installs itself when you plug in = the cable controls the phone","Reading SMS means reading OTPs","Unplug, delete and tell the bank, fast"],
   choices:[{t:"Unplug, deny the permission, delete the app, and call the bank number on the card to watch the account",to:"E2",v:"good"},{t:"Allow it, a battery saver needs to know which apps use power",to:"E4",v:"bad"},{t:"Just unplug, the app can't work once it's off the station",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The fake station is removed",story:"Uncle charges at the wall socket in time for the doctor's call. The staff open the station and find a tiny computer hidden inside, and call the police.",lessons:["Charge with your own adapter and a wall plug, or a power bank","Real chargers never ask for “trust”","Report odd devices in public places to the venue"]},
  E2:{type:"warn",label:"Close call",title:"Safe, but with cleanup",story:"No money is lost, but Uncle has to delete an odd app, change passwords, and have the bank watch his account for days.",lessons:["A public USB cable may end in a computer","Repeated prompts wait for you to give in","Once you notice: unplug, delete, report"]},
  E3:{type:"danger",label:"Harmed",title:"The app kept running",story:"He unplugged, but the app stayed on the phone. That night it read his OTPs and passed them on. 23,000 baht vanished from Uncle Prayoon's account.",lessons:["Unplugging doesn't remove an installed app","Always delete the app and revoke permissions","SMS-reading permission is very dangerous"]},
  E4:{type:"danger",label:"Harmed",title:"The OTPs were stolen",story:"With SMS access, every OTP went straight to the scammers. Uncle Prayoon's account was drained almost to zero.",lessons:["Never tap “Trust” on a public charger","Apps asking for more than their job = danger","Use your own adapter or power bank"]}
 }},

helper:{id:"helper",level:"Hard",start:"s1",title:"The kind “Wi-Fi staff member”",
 learn:["Fake staff in public places","Profiles / VPNs that intercept the whole phone","Shoulder surfing your passcode","Never hand your phone to a stranger"],
 scenes:{
  s1:{title:"Someone offers help",
   body:`<p>Grandma Sri can't get online. A man in a polo shirt with a lanyard walks over: “I'm IT for the library. Hand me your phone and I'll set it up.”</p><p>The badge says “CITY LIBRARY · IT SUPPORT” but has no photo.</p>`,
   clues:["Anyone can print a lanyard badge","Real staff can be confirmed at the counter","An unlocked phone in a stranger's hand = everything on it"],
   choices:[{t:"Thank him, then walk Grandma to the counter to ask whether he's really staff",to:"s2a",v:"good"},{t:"Let him set it up while you stand right next to him and watch what he does",to:"s2b",v:"bad"},{t:"Ask him to tell Grandma the steps and let her tap each one herself, so the phone never leaves her",to:"s2c",v:"risky"}]},
  s2a:{title:"The counter doesn't know him",
   body:`${staff("Staff","“We don't have IT going round the desks. The Wi-Fi password is on your library card.”")}<p>The man follows you: “If you want it faster, there's a 199-baht VIP pass. Just transfer to this account.”</p>`,
   clues:["Selling Wi-Fi via transfer to a personal account = scam sign","The counter just confirmed he isn't staff","Keep the account details as evidence"],
   choices:[{t:"Don't pay, note the account number, and have the staff get security to check the cameras",to:"E1",v:"good"},{t:"It's only 199 and Grandma wants fast internet, pay and be done",to:"E3",v:"bad"},{t:"Walk away quietly and stay out of it",to:"E2",v:"risky"}]},
  s2b:{title:"“Install the profile”",
   body:`${perm("Install profile “CityLib Secure VPN”","This profile will route all network traffic through a VPN server and install a certificate.","Cancel","Install")}<p>He talks fast: “Type your phone passcode here, Grandma,” and holds the screen up for her to type in front of him.</p>`,
   clues:["Profile + certificate = can read even encrypted sites","He saw the passcode Grandma typed","Venue Wi-Fi never needs a stranger's VPN"],
   choices:[{t:"Tap cancel, take the phone back, and change the passcode right away",to:"E2",v:"good"},{t:"Let Grandma install the VPN, it encrypts her data, safer than none",to:"E4",v:"bad"},{t:"Have Grandma cover the screen while typing the passcode, then carry on",to:"E4",v:"bad"}]},
  s2c:{title:"Odd instructions",
   body:`<p>He says: “Open this link and download the profile.”</p>${http("192.168.4.1/setup","CityLib Wi-Fi Setup",["Step 1: Download the security profile","Step 2: Enter your phone passcode"],"Download")}`,
   clues:["The page is http and uses an IP address","No Wi-Fi needs your phone passcode","Tapping it yourself is as risky as him tapping it"],
   choices:[{t:"Stop, don't download, and ask the counter for the Wi-Fi password",to:"E1",v:"good"},{t:"Download it, Grandma is tapping herself, he never touches the phone",to:"E4",v:"bad"},{t:"Download it but skip step 2, no passcode",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The fake staffer is caught",story:"Security checks the cameras and finds he's been working several tables. Grandma Sri gets the real Wi-Fi password from her library card.",lessons:["Confirm staff at the counter","Never hand an unlocked phone to a stranger","Real Wi-Fi needs no profile or VPN"]},
  E2:{type:"warn",label:"Close call",title:"Every passcode has to change",story:"Grandma loses no money, but her passcode is out. She has to change it and her banking PIN, while the man moves on to someone else.",lessons:["If someone saw your code, it's leaked","Delete odd profiles in settings at once","Tell the venue so others aren't caught"]},
  E3:{type:"danger",label:"Harmed",title:"Paid, then asked for more",story:"After the 199 baht he says the account needs “verifying” for another 2,000. Grandma loses nearly three thousand before she realises.",lessons:["Never pay a stranger for internet access","A first payment is followed by more fees","Always ask at the counter"]},
  E4:{type:"danger",label:"Harmed",title:"Everything on the phone is intercepted",story:"The profile routes every site Grandma visits through the scammer's server. When she opens her bank app that night, her login leaks instantly.",lessons:["A stranger's VPN = they see everything","Never install profiles or certificates of unknown origin","Covering the code doesn't help once the phone is taken over"]}
 }},

update:{id:"update",level:"Medium",start:"s1",title:"The Wi-Fi says update your browser",
 learn:["Fake captive portals","Real updates only come from the app store or system settings",".apk files / accessibility permission","Keep important work off public networks"],
 scenes:{
  s1:{title:"The Wi-Fi page",
   body:`${wifi([["CityLib-Member","Password","▂▄▆_"],["CityLib_FREE_5G","Connected · Open","▂▄▆█"]])}${http("citylib-free.net/login","⚠ Your browser is out of date",["For your security, update Chrome before using the Wi-Fi","File: chrome_update_v121.apk (8.2 MB)"],"Update now")}<p>“I have a client call in five minutes!”</p>`,
   clues:["Wi-Fi has no business telling you to update a browser","Real updates come from the Play Store / App Store","An .apk from a web page = an app from outside the store"],
   choices:[{t:"Don't tap, disconnect, and use your own phone hotspot to join the call",to:"s2a",v:"good"},{t:"Updating a browser is good practice, old versions have holes. Update",to:"s2b",v:"bad"},{t:"Open the Play Store to check a new Chrome really exists, and if so use this page's file",to:"s2c",v:"risky"}]},
  s2a:{title:"Made the call",
   body:`<p>The call goes fine over the hotspot. Your friend asks: “What about that Wi-Fi? Just leave it? Others might fall for it.”</p>`,
   clues:["A fake Wi-Fi keeps catching people","The venue can shut it down or warn visitors","Forget the network so you don't auto-join it"],
   choices:[{t:"Forget CityLib_FREE_5G on the device and tell the counter to warn visitors",to:"E1",v:"good"},{t:"A warning post on your own page is enough",to:"E2",v:"risky"},{t:"Nothing to do, you weren't caught",to:"E2",v:"risky"}]},
  s2b:{title:"Installed",
   body:`${perm("Allow “Chrome Update” to use accessibility?","The app will be able to: see and control your screen · read everything you type","Deny","Allow")}<p>The screen says: “Allow this to finish the update.”</p>`,
   clues:["A real browser never needs accessibility permission","This permission = it sees and taps everything for you","Deny, delete, then change passwords from another device"],
   choices:[{t:"Deny, delete the app, and change important passwords from another computer",to:"E2",v:"good"},{t:"Allow it, otherwise the update is stuck halfway",to:"E4",v:"bad"},{t:"Deny and keep using the phone, without the permission it can't do anything",to:"E3",v:"bad"}]},
  s2c:{title:"The Play Store has an update",
   body:`<p>There really is an “Update” button for Chrome in the Play Store, but the Wi-Fi page still offers chrome_update_v121.apk.</p>`,
   clues:["A real update existing doesn't make the Wi-Fi file real","Update through the Play Store only","A Wi-Fi page pushing files = fake"],
   choices:[{t:"Update through the Play Store button and drop that Wi-Fi network",to:"E1",v:"good"},{t:"Download the Wi-Fi page's file, you confirmed the new version is real",to:"s2b",v:"bad"},{t:"Update in the Play Store and keep using that Wi-Fi",to:"E2",v:"risky"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Nothing leaked",story:"The call goes ahead, no odd app is installed, and the counter warns members that CityLib_FREE_5G isn't theirs.",lessons:["Update only from the app store or settings","Wi-Fi that pushes downloads = fake","Use your own hotspot for important work"]},
  E2:{type:"warn",label:"Close call",title:"A narrow escape",story:"No money is lost, but several passwords need changing, and other people in the library fell for the same fake update page.",lessons:["Forget fake networks on your device","Always tell the venue","Public Wi-Fi isn't for important work"]},
  E3:{type:"danger",label:"Harmed",title:"The app kept working quietly",story:"Without accessibility it still drew a fake login over the bank app. Your friend typed the password that very night.",lessons:["Denying permission isn't enough, delete the app","Apps from outside the store can do a lot","Change passwords from another device"]},
  E4:{type:"danger",label:"Harmed",title:"The whole phone was taken over",story:"The app saw everything typed. During the call it made a bank transfer on your friend's behalf and sent out the client's files.",lessons:["Never install .apk files from web pages","Accessibility permission = handing over the phone","Wi-Fi has no right to demand updates"]}
 }},

airdrop:{id:"airdrop",level:"Hard",start:"s1",title:"A file from “LIB-Printer”",
 learn:["AirDrop / Quick Share from strangers","Documents that ask to “enable content” (macros)","Set public networks to Public","Turn off file sharing in public"],
 scenes:{
  s1:{title:"Right before the presentation",
   body:`<p>Your friend is rehearsing a pitch when a window pops up.</p>${perm("“LIB-Printer” wants to share a file","Slides_Template_CityLib.docm (2.1 MB)","Decline","Accept")}<p>“Oh, there's a shared printer here. Maybe it's the library's template.”</p>`,
   clues:["Printers don't send you files","Anyone can name their device LIB-Printer",".docm = a document with macros (code) inside"],
   choices:[{t:"Decline, and set file receiving to “Contacts only”",to:"s2a",v:"good"},{t:"Accept it but don't open it yet, scan it for viruses first",to:"s2c",v:"risky"},{t:"Accept and open it, it's only a Word file, not an .exe, so it's harmless",to:"s2b",v:"bad"}]},
  s2a:{title:"Another attempt",
   body:`<p>A moment later the laptop warns: “A device on the network is trying to access the shared folder: Documents”</p>${notif(["🔔 Network CityLib-Member is set to: Private","📁 File sharing: On"])}`,
   clues:["Private = other devices on the network can see you","In public, set it to Public","Turn file sharing off in public"],
   choices:[{t:"Switch the network to Public, turn off sharing, and tell the counter",to:"E1",v:"good"},{t:"Put a password on the Documents folder, that's enough",to:"E2",v:"risky"},{t:"It's fine, Documents only holds ordinary work files",to:"E3",v:"bad"}]},
  s2b:{title:"The document wants content enabled",
   body:`<div class="perm"><b>⚠ Security warning: macros have been disabled</b><p>This document was made in a newer version. Click “Enable Content” to display the template.</p><div class="pbtn"><span>Close</span><span>Enable Content</span></div></div><p>The file is a blank page with a blurry library logo.</p>`,
   clues:["Real documents don't need macros to show content","Macros = code that runs on your computer","A blurry page is bait to make you click enable"],
   choices:[{t:"Close the file, delete it, and run a full antivirus scan",to:"E2",v:"good"},{t:"Enable content, the library's template needs macros for formatting",to:"E4",v:"bad"},{t:"Forward it to a friend in the group to open on their machine",to:"E3",v:"bad"}]},
  s2c:{title:"The scan found nothing",
   body:`<p>The scanner says “No threats found.” Your friend smiles: “So it's fine to open now.”</p>`,
   clues:["A clean scan doesn't mean safe","An unrequested file from a stranger needn't be opened","New macros can slip past scanners"],
   choices:[{t:"Don't open it, delete it, and set receiving to contacts only",to:"E1",v:"good"},{t:"Open it, and close it if it asks for macros",to:"s2b",v:"risky"},{t:"Open it, it passed the scan",to:"s2b",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Laptop safe, pitch nailed",story:"Your friend's pitch goes great. The counter tells members to stop accepting files from everyone, and “LIB-Printer” turns out to be a stranger's laptop.",lessons:["Set file receiving to contacts only","Set public networks to Public","Unrequested files don't need opening"]},
  E2:{type:"warn",label:"Close call",title:"That was close",story:"Nothing ran, but the work folder was visible for a while. Your friend has to check every file and fix the network settings.",lessons:["Turn off sharing in public","A clean scan isn't proof of safety","Delete odd files straight away"]},
  E3:{type:"danger",label:"Harmed",title:"Client files leaked",story:"Client documents in the shared folder were copied, and the scammers used them to extort your friend's client.",lessons:["Your ordinary work files can be valuable to scammers","Don't pass odd files to others to open","Set the network to Public"]},
  E4:{type:"danger",label:"Harmed",title:"Spyware planted",story:"The macro quietly installed spyware. Every file and saved password was sent out for days before anyone noticed.",lessons:["Never “Enable Content” on files of unknown origin","Printers don't send you files","Once you notice, scan the machine and change passwords"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
