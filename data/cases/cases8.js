/* ===== Replacement cases so no two cases teach the same scam: investment scam, ransomware, public computers ===== */
(function(){
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const notif=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;
const perm=(title,text,a,b)=>`<div class="perm"><b>${title}</b><p>${text}</p><div class="pbtn"><span>${a}</span><span>${b}</span></div></div>`;
const staff=(who,line,ic)=>`<div class="teller"><div class="tq"><small>${who}</small><b>${ic||"💬"}</b></div><p>${line}</p></div>`;
const lock=(lines)=>`<div class="perm" style="background:#2A0A0A;color:#FFD3D3;border-color:#E5402F"><b style="color:#FF6B6B">${lines[0]}</b>${lines.slice(1).map(l=>`<p>${l}</p>`).join("")}</div>`;
const board=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;

const TH={
invest:{id:"invest",level:"ยาก",start:"s1",title:"กลุ่มลงทุนกำไร 30% ต่อเดือน",
 learn:["แชร์ลูกโซ่ / ลงทุนปลอม","ถอนครั้งแรกได้ = เหยื่อล่อ","ต้องจ่าย “ภาษี” ก่อนถอน = หลอก","เช็กใบอนุญาตกับหน่วยงานกำกับ"],
 scenes:{
  s1:{title:"เพื่อนจะลงเงินเพิ่ม",
   body:`<p>เพื่อนยืนรอคิวถอนเงินสด “จะเอาไปลงกลุ่มลงทุน AI เพิ่ม เดือนที่แล้วได้ 30% ถอนออกมาได้จริงด้วย”</p>${chat("📈","AI Smart Invest VIP","กลุ่มไลน์ · 1,240 คน",["🎉 สมาชิก K*** ถอนกำไร 52,000 บาทสำเร็จ!","รอบพิเศษคืนนี้ ลง 100,000 รับคืน 130,000 ใน 7 วัน","@ ปิดรับ 23:59"])}`,
   clues:["กำไรสูงและแน่นอน = สัญญาณอันตรายที่สุด","ถอนได้ครั้งแรก มักเป็นเหยื่อล่อให้ลงเพิ่ม","ธุรกิจลงทุนจริงต้องมีใบอนุญาตที่ตรวจสอบได้"],
   choices:[{t:"ชวนเพื่อนตรวจชื่อบริษัทกับหน่วยงานกำกับการลงทุนก่อน ยังไม่ถอนเงิน",to:"s2a",v:"good"},{t:"ให้เพื่อนลงเพิ่มแค่ครึ่งเดียว เพราะเคยถอนได้จริง ความเสี่ยงไม่สูง",to:"s2b",v:"bad"},{t:"ให้เพื่อนถอนกำไรเดิมออกมาให้หมดก่อน ถ้าถอนได้ค่อยลงต่อ",to:"s2c",v:"risky"}]},
  s2a:{title:"ไม่มีชื่อในระบบ",
   body:`<p>ค้นแล้วไม่พบบริษัทนี้ในรายชื่อผู้ได้รับอนุญาต เพื่อนเริ่มลังเล “แต่เงินเดิมเรายังอยู่ในระบบตั้งสองแสน”</p>`,
   clues:["เงินที่เห็นในหน้าเว็บอาจเป็นแค่ตัวเลข","อย่าโอนเพิ่มเพื่อ “ปลดล็อก”","เก็บหลักฐานและแจ้งความ"],
   choices:[{t:"หยุดโอนทุกอย่าง แคปหน้าบัญชีและสลิปทั้งหมด แล้วแจ้ง 1441 กับแจ้งความออนไลน์",to:"E1",v:"good"},{t:"ลองขอถอนเงินเดิมออกมาก่อน แล้วค่อยแจ้งความ",to:"E2",v:"risky"},{t:"ถามแอดมินในกลุ่มว่าบริษัทมีใบอนุญาตไหม",to:"E2",v:"risky"}]},
  s2b:{title:"ถอนไม่ได้แล้ว",
   body:`${notif(["⛔ ถอนเงินไม่สำเร็จ: บัญชีของท่านถูกตรวจสอบ","💬 แอดมิน: ต้องชำระภาษีกำไร 15% (30,000 บาท) ก่อนถอน"])}`,
   clues:["ภาษีจริงไม่จ่ายให้แพลตฟอร์มก่อนถอน","ยิ่งจ่าย ยิ่งถูกขอเพิ่ม","หยุดตอนนี้ยังเสียน้อยกว่า"],
   choices:[{t:"หยุดจ่าย เก็บหลักฐาน แล้วแจ้ง 1441 ทันที",to:"E2",v:"good"},{t:"จ่ายภาษี ไม่งั้นเงินสองแสนจะหายหมด",to:"E4",v:"bad"},{t:"ชวนเพื่อนคนอื่นมาลงแทน จะได้ค่าแนะนำไปจ่ายภาษี",to:"E4",v:"bad"}]},
  s2c:{title:"ถอนได้ 5,000",
   body:`${notif(["✅ ถอนเงินสำเร็จ 5,000 บาท","💬 แอดมิน: เห็นไหมคะ ถอนได้จริง ลงรอบ VIP วันนี้รับโบนัส 20%"])}<p>“เห็นมะ ถอนได้จริง!”</p>`,
   clues:["ให้ถอนเงินก้อนเล็กได้ เพื่อให้ลงก้อนใหญ่","ถอนได้ ≠ ถูกกฎหมาย","ยังไม่ได้ตรวจใบอนุญาตเลย"],
   choices:[{t:"เก็บเงินที่ถอนได้ไว้ ไม่ลงเพิ่ม แล้วตรวจใบอนุญาตก่อน",to:"s2a",v:"good"},{t:"ลงรอบ VIP เพราะพิสูจน์แล้วว่าถอนได้",to:"s2b",v:"bad"},{t:"ลงแค่ 5,000 ที่ถอนได้กลับไป ถือว่าไม่เสียอะไร",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"หยุดทันก่อนเสียเพิ่ม",story:"เพื่อนไม่ได้ลงเงินเพิ่ม และหลักฐานทั้งหมดช่วยให้ตำรวจปิดกลุ่มไลน์นั้นได้",lessons:["กำไรสูงแน่นอน = หลอก","เช็กใบอนุญาตกับหน่วยงานกำกับก่อนลงทุน","ถอนได้ครั้งแรกคือเหยื่อล่อ"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เสียไปบ้าง แต่หยุดทัน",story:"เงินเดิมในระบบถอนไม่ได้แล้ว แต่เพื่อนไม่โอนเพิ่ม และแจ้งความไว้ทัน",lessons:["ตัวเลขในหน้าเว็บไม่ใช่เงินจริง","อย่าจ่าย “ภาษี” เพื่อถอน","ถามแอดมินไม่ใช่การตรวจสอบ"]},
  E3:{type:"danger",label:"เสียหาย",title:"เงินวนกลับเข้ากับดัก",story:"เงินที่ถอนได้ถูกลงกลับไป และรอบนี้ถอนไม่ได้อีกเลย",lessons:["อย่าลงซ้ำเพราะเคยถอนได้","แชร์ลูกโซ่ใช้เงินคนใหม่จ่ายคนเก่า","หยุดตั้งแต่สัญญาณแรก"]},
  E4:{type:"danger",label:"เสียหาย",title:"หมดตัว",story:"จ่ายภาษี ค่าธรรมเนียม ค่าปลดล็อกไปเรื่อยๆ จนเสียเกือบห้าแสน และเพื่อนอีกสองคนที่ถูกชวนก็เสียด้วย",lessons:["ถูกขอเงินเพื่อถอน = หลอกแน่นอน","อย่าชวนคนอื่นมาลงทุนแทน","แจ้ง 1441 ให้เร็วที่สุด"]}
 }},

ransom:{id:"ransom",level:"ยาก",start:"s1",title:"แรนซัมแวร์ยึดร้าน แล้วขู่ปล่อยข้อมูล",
 learn:["แรนซัมแวร์คืออะไร","ตัดเครื่องออกจากเครือข่ายทันที","อย่าจ่ายค่าไถ่","สำรองข้อมูลแบบแยกเก็บ (ออฟไลน์)"],
 scenes:{
  s1:{title:"จอเปลี่ยนเป็นสีแดง",
   body:`<p>คุณแก้ว เจ้าของร้านออนไลน์ หอบโน้ตบุ๊กมาที่สถานี มือสั่น</p>${lock(["🔒 ไฟล์ทั้งหมดของคุณถูกเข้ารหัส","รายชื่อลูกค้า 3,412 คน · ที่อยู่ · เบอร์โทร อยู่กับเราแล้ว","จ่าย 0.5 BTC ภายใน 48 ชั่วโมง ไม่งั้นเราจะปล่อยข้อมูลลงเว็บ และส่งให้ลูกค้าทุกคน","⏱ 47:58:12"])}${chat("☠","ShadowLock","LINE",["อย่าแจ้งตำรวจ เรารู้ทุกอย่างที่คุณทำ","ร้านคุณอยู่ไม่ได้แน่ถ้าลูกค้ารู้ว่าข้อมูลรั่ว"])}<p>“โน้ตบุ๊กยังต่อ Wi-Fi ของร้านกับฮาร์ดดิสก์สำรองอยู่เลย”</p>`,
   clues:["มัลแวร์ลามไปเครื่องหรือไดรฟ์อื่นในเครือข่ายเดียวกันได้","ขู่ว่า “อย่าแจ้งตำรวจ” คือการแยกเหยื่อ","จ่ายแล้วไม่มีอะไรรับประกันว่าจะได้ไฟล์คืน"],
   choices:[{t:"ถอดสาย ปิด Wi-Fi ถอดฮาร์ดดิสก์สำรองออกทันที แล้วแจ้งพี่ภพพร้อมภาพหน้าจอเรียกค่าไถ่",to:"s2a",v:"good"},{t:"รีสตาร์ตเครื่องก่อน บางทีหน้าจอนี้อาจหายไปเอง",to:"s2c",v:"risky"},{t:"ทักไปต่อรองขอลดค่าไถ่ จะได้ปิดเรื่องเงียบๆ ไม่ให้ลูกค้ารู้",to:"s2b",v:"bad"}]},
  s2a:{title:"ไฟล์สำรองยังอยู่ไหม",
   body:`${staff("พี่ภพ","“ตัดเครื่องทันดีมาก ห้ามจ่าย เราจะเก็บหลักฐานไว้ตามตัว มีไฟล์สำรองที่ไม่ได้เสียบไว้กับเครื่องไหมครับ”","👮")}<p>“มีแฟลชไดรฟ์สำรองเมื่อสัปดาห์ก่อน เก็บไว้ในลิ้นชัก”</p>`,
   clues:["ไฟล์สำรองที่ไม่ได้ต่ออยู่ = ไม่ถูกเข้ารหัส","ต้องล้างเครื่องให้สะอาดก่อนกู้คืน","แจ้งลูกค้าตามจริงดีกว่าปิดบัง"],
   choices:[{t:"ล้างเครื่องให้สะอาด กู้คืนจากไฟล์สำรอง เปลี่ยนรหัสทุกบัญชี แล้วแจ้งลูกค้าให้ระวังข้อความแปลก",to:"E1",v:"good"},{t:"เสียบแฟลชไดรฟ์เข้าเครื่องเดิมเลย จะได้กู้ไฟล์เร็วที่สุด",to:"E3",v:"bad"},{t:"กู้คืนไฟล์แต่ไม่บอกลูกค้า จะได้ไม่เสียชื่อร้าน",to:"E2",v:"risky"}]},
  s2b:{title:"ต่อรองแล้ว",
   body:`${chat("☠","ShadowLock","LINE",["ลดให้เหลือ 0.3 BTC ก็ได้ ใจดีแล้วนะ","จ่ายแล้วส่งสลิปมา เดี๋ยวส่งตัวถอดรหัสให้"])}<p>คุณแก้วเริ่มหาวิธีซื้อบิตคอยน์</p>`,
   clues:["ต่อรองได้ = เขาเห็นว่าเราจะจ่าย","จ่ายแล้วอาจโดนขอซ้ำ และข้อมูลก็ยังถูกขายได้","ยังไม่ได้ตัดเครื่องออกจากเครือข่ายเลย"],
   choices:[{t:"หยุดคุย ไม่จ่าย ตัดเครื่องออกจากเครือข่าย แล้วแจ้งพี่ภพ",to:"E2",v:"good"},{t:"จ่าย 0.3 BTC ถูกลงตั้งเยอะ",to:"E4",v:"bad"},{t:"จ่ายครึ่งหนึ่งก่อน ที่เหลือจ่ายเมื่อได้ไฟล์คืน",to:"E4",v:"bad"}]},
  s2c:{title:"รีสตาร์ตแล้ว",
   body:`<p>เครื่องเปิดขึ้นมาหน้าเดิม และฮาร์ดดิสก์สำรองที่เสียบอยู่ก็ถูกเข้ารหัสด้วย</p>${notif(["⚠ พบไฟล์ .shadowlock บนไดรฟ์ E:","💬 ShadowLock: ไฟล์สำรองของคุณก็อยู่กับเราแล้ว 😊"])}<p>มีเว็บโฆษณา “โปรแกรมถอดรหัสฟรี 100%” ขึ้นมาในผลค้นหา</p>`,
   clues:["ไดรฟ์ที่เสียบค้างไว้โดนไปด้วย","โปรแกรมถอดรหัสจากเว็บแปลก อาจเป็นมัลแวร์ซ้ำ","ยังตัดเครื่องตอนนี้ได้"],
   choices:[{t:"ถอดทุกอย่างออกจากเครื่อง ตัดเน็ต แล้วแจ้งพี่ภพพร้อมหลักฐาน",to:"E2",v:"good"},{t:"โหลดโปรแกรมถอดรหัสฟรีจากเว็บนั้นมาลอง",to:"E3",v:"bad"},{t:"จ่ายค่าไถ่ เพราะไฟล์สำรองก็โดนแล้ว",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ร้านกลับมาเปิดได้",story:"คุณแก้วกู้ไฟล์จากไฟล์สำรองที่แยกเก็บไว้ ไม่จ่ายสักบาท และภาพหน้าจอเรียกค่าไถ่กลายเป็นหลักฐานชิ้นสำคัญ",lessons:["ตัดเครื่องออกจากเครือข่ายทันที","อย่าจ่ายค่าไถ่","สำรองข้อมูลแล้วถอดเก็บแยก"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"เสียไฟล์บางส่วน",story:"ไฟล์ล่าสุดบางส่วนกู้ไม่ได้ ต้องทำรายการสินค้าใหม่หลายวัน แต่ไม่ได้จ่ายค่าไถ่",lessons:["รีสตาร์ตไม่ช่วย","ซื่อสัตย์กับลูกค้าเรื่องข้อมูลรั่ว","สำรองข้อมูลให้บ่อยขึ้น"]},
  E3:{type:"danger",label:"เสียหาย",title:"ไฟล์สำรองโดนด้วย",story:"ไฟล์สำรองถูกเข้ารหัสไปด้วย หรือติดมัลแวร์ซ้ำจากโปรแกรมฟรี ข้อมูลทั้งหมดหายถาวร",lessons:["อย่าเสียบไฟล์สำรองกับเครื่องที่ติดเชื้อ","โปรแกรมถอดรหัสฟรีจากเว็บแปลก = อันตราย","ล้างเครื่องก่อนกู้คืนเสมอ"]},
  E4:{type:"danger",label:"เสียหาย",title:"จ่ายแล้วก็ยังโดน",story:"จ่ายแล้วไม่ได้ตัวถอดรหัส ถูกเรียกเงินเพิ่ม และรายชื่อลูกค้าก็ยังถูกปล่อยลงเว็บ",lessons:["จ่ายค่าไถ่ไม่รับประกันอะไร","ต่อรอง = บอกว่าเราจะจ่าย","แจ้งตำรวจแม้ถูกขู่"]}
 }},

publicpc:{id:"publicpc",level:"กลาง",start:"s1",title:"คอมพิวเตอร์สาธารณะในห้องสมุด",
 learn:["อุปกรณ์ดักแป้นพิมพ์ (keylogger)","อย่าทำธุรกรรมบนคอมสาธารณะ","ออกจากระบบและไม่ให้จำรหัส","แจ้งเจ้าหน้าที่เมื่อเจออุปกรณ์แปลก"],
 scenes:{
  s1:{title:"ขอยืมคอมห้องสมุด",
   body:`<p>เพื่อนมือถือแบตหมด เลยมาใช้คอมสาธารณะชั้น 2 “ขอเข้าแอปธนาคารบนเว็บแป๊บ ต้องโอนค่าหอวันนี้”</p><p>ระหว่างสายคีย์บอร์ดกับเครื่อง มีหัวต่อ USB เล็กๆ เสียบคั่นอยู่</p>`,
   clues:["หัวต่อเล็กๆ ระหว่างคีย์บอร์ดกับเครื่อง อาจเป็นตัวดักทุกปุ่มที่กด","คอมสาธารณะไม่ควรใช้ทำธุรกรรม","ห้องสมุดไม่ได้เสียบอุปกรณ์แบบนี้ไว้"],
   choices:[{t:"ไม่ล็อกอินบนเครื่องนี้ แจ้งเจ้าหน้าที่ให้ดูหัวต่อนั้น แล้วยืมพาวเวอร์แบงก์ชาร์จมือถือแทน",to:"s2a",v:"good"},{t:"ใช้โหมดไม่ระบุตัวตน (incognito) แล้วล็อกอินได้ ประวัติจะไม่ถูกเก็บ",to:"s2b",v:"bad"},{t:"ดึงหัวต่อนั้นออกเองแล้วล็อกอินต่อ",to:"s2c",v:"risky"}]},
  s2a:{title:"เจ้าหน้าที่ตรวจ",
   body:`${staff("บรรณารักษ์","“ไม่ใช่ของห้องสมุดค่ะ เจออีกสองเครื่อง เมื่อเช้ามีคนนั่งเครื่องนี้นานมาก”","📚")}<p>เพื่อนนึกขึ้นได้ “เมื่อวานเราล็อกอินเฟซบุ๊กเครื่องข้างๆ แล้วกด ‘จำรหัสผ่าน’ ไว้ด้วย”</p>`,
   clues:["เครื่องข้างๆ ก็อาจมีตัวดัก","รหัสที่จำไว้ในเครื่องสาธารณะ ใครก็ใช้ต่อได้","เปลี่ยนรหัสและออกจากระบบทุกอุปกรณ์"],
   choices:[{t:"เปลี่ยนรหัสเฟซบุ๊กจากมือถือตัวเองทันที กดออกจากระบบทุกอุปกรณ์ และเปิดยืนยันสองชั้น",to:"E1",v:"good"},{t:"ไปเครื่องเมื่อวานแล้วกดออกจากระบบก็พอ",to:"E2",v:"risky"},{t:"ไม่เป็นไร เฟซบุ๊กไม่มีข้อมูลสำคัญ",to:"E3",v:"bad"}]},
  s2b:{title:"โอนเสร็จแล้ว",
   body:`<p>เพื่อนโอนค่าหอสำเร็จในโหมดไม่ระบุตัวตน แล้วปิดหน้าต่าง</p>${notif(["🔔 (สองชั่วโมงต่อมา) มีการเข้าสู่ระบบบัญชีธนาคารจากอุปกรณ์ใหม่"])}`,
   clues:["โหมดไม่ระบุตัวตนไม่ได้กันตัวดักแป้นพิมพ์","ทุกปุ่มที่กดถูกส่งออกไปแล้ว","ต้องรีบเปลี่ยนรหัสและแจ้งธนาคาร"],
   choices:[{t:"โทรเบอร์หลังบัตรให้ธนาคารระงับการเข้าสู่ระบบ แล้วเปลี่ยนรหัสจากมือถือตัวเอง",to:"E2",v:"good"},{t:"น่าจะเป็นธนาคารตรวจระบบเฉยๆ รอดูก่อน",to:"E4",v:"bad"},{t:"กลับไปคอมเครื่องเดิมเพื่อเปลี่ยนรหัสให้เร็วที่สุด",to:"E4",v:"bad"}]},
  s2c:{title:"ดึงออกแล้ว",
   body:`<p>เพื่อนดึงหัวต่อออกแล้วล็อกอิน แต่หน้าจอมีโปรแกรมแปลกเปิดค้างอยู่ด้านล่าง “RemoteHelper”</p>`,
   clues:["เครื่องอาจมีโปรแกรมดักอยู่ข้างในด้วย","เอาตัวดักออกเองทำให้หลักฐานหาย","ยังไม่ได้แจ้งเจ้าหน้าที่"],
   choices:[{t:"หยุด ออกจากระบบ แจ้งเจ้าหน้าที่พร้อมให้หัวต่อนั้นเป็นหลักฐาน แล้วเปลี่ยนรหัสจากมือถือตัวเอง",to:"E2",v:"good"},{t:"ปิดโปรแกรมนั้นแล้วทำธุรกรรมต่อ",to:"E4",v:"bad"},{t:"เก็บหัวต่อกลับบ้านไปลองเสียบดูว่าคืออะไร",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"ปลอดภัย",title:"ตัวดักถูกยึดหมด",story:"ห้องสมุดเก็บตัวดักแป้นพิมพ์ได้สามตัว ส่งให้ตำรวจ และติดป้ายเตือนทุกเครื่อง บัญชีของเพื่อนปลอดภัย",lessons:["อย่าทำธุรกรรมบนคอมสาธารณะ","ไม่กด “จำรหัสผ่าน” บนเครื่องคนอื่น","เจออุปกรณ์แปลก แจ้งเจ้าหน้าที่"]},
  E2:{type:"warn",label:"เฉียดฉิว",title:"รอดแบบหวุดหวิด",story:"รหัสหลุดไปแล้ว แต่เปลี่ยนทันก่อนเงินหาย ต้องเฝ้าระวังบัญชีอีกพักใหญ่",lessons:["incognito ไม่กัน keylogger","เปลี่ยนรหัสจากเครื่องของตัวเอง","ออกจากระบบทุกอุปกรณ์"]},
  E3:{type:"danger",label:"เสียหาย",title:"บัญชีถูกยึด",story:"คนร้ายเข้าเฟซบุ๊กของเพื่อน แล้วทักยืมเงินเพื่อนทุกคนในรายชื่อ",lessons:["บัญชีโซเชียลก็มีค่ากับคนร้าย","อย่าเอาอุปกรณ์แปลกไปเสียบเครื่องตัวเอง","เปลี่ยนรหัสทันที"]},
  E4:{type:"danger",label:"เสียหาย",title:"เงินในบัญชีหายหมด",story:"คนร้ายใช้รหัสที่ดักได้ล็อกอินธนาคาร โอนเงินออกก่อนเพื่อนจะรู้ตัว",lessons:["คอมสาธารณะ ≠ ที่ทำธุรกรรม","ทุกปุ่มที่กดอาจถูกดัก","แจ้งธนาคารทันทีที่มีการล็อกอินแปลก"]}
 }}
};

const EN={
invest:{id:"invest",level:"Hard",start:"s1",title:"An investment group paying 30% a month",
 learn:["Ponzi / fake investment schemes","A first successful withdrawal is bait","Paying “tax” before withdrawing = scam","Check licences with the regulator"],
 scenes:{
  s1:{title:"Your friend wants to invest more",
   body:`<p>Your friend is queueing to withdraw cash. “I'm putting more into the AI investment group. I made 30% last month and actually withdrew it.”</p>${chat("📈","AI Smart Invest VIP","LINE group · 1,240 members",["🎉 Member K*** withdrew 52,000 baht profit!","Special round tonight: invest 100,000, get 130,000 back in 7 days","@ Closes 23:59"])}`,
   clues:["High, guaranteed returns = the biggest red flag","A first withdrawal that works is often bait to invest more","Real investment firms have licences you can check"],
   choices:[{t:"Get your friend to check the company with the investment regulator first, before withdrawing",to:"s2a",v:"good"},{t:"Let them invest only half, they've withdrawn before so the risk is low",to:"s2b",v:"bad"},{t:"Have them withdraw all their profit first, and reinvest only if that works",to:"s2c",v:"risky"}]},
  s2a:{title:"Not on the register",
   body:`<p>The company isn't on the list of licensed firms. Your friend hesitates: “But my 200,000 is still in the system.”</p>`,
   clues:["The balance on the site may just be a number","Never pay more to “unlock” it","Keep evidence and report"],
   choices:[{t:"Stop all transfers, screenshot the account page and slips, call 1441 and file an online report",to:"E1",v:"good"},{t:"Try to withdraw the original money first, then report",to:"E2",v:"risky"},{t:"Ask the group admin if the company is licensed",to:"E2",v:"risky"}]},
  s2b:{title:"Withdrawals blocked",
   body:`${notif(["⛔ Withdrawal failed: your account is under review","💬 Admin: pay 15% profit tax (30,000 baht) before withdrawing"])}`,
   clues:["Real tax is never paid to the platform before withdrawing","The more you pay, the more they ask","Stopping now loses less"],
   choices:[{t:"Stop paying, keep evidence, and call 1441 now",to:"E2",v:"good"},{t:"Pay the tax, or all 200,000 is lost",to:"E4",v:"bad"},{t:"Recruit other friends to invest, and use the referral bonus for the tax",to:"E4",v:"bad"}]},
  s2c:{title:"Withdrew 5,000",
   body:`${notif(["✅ Withdrawal successful: 5,000 baht","💬 Admin: See? Withdrawals work. Join the VIP round today for a 20% bonus"])}<p>“See, it really pays out!”</p>`,
   clues:["Small withdrawals are allowed so you'll deposit big","Paying out ≠ legal","The licence still hasn't been checked"],
   choices:[{t:"Keep the 5,000, invest nothing more, and check the licence first",to:"s2a",v:"good"},{t:"Join the VIP round, withdrawals are proven",to:"s2b",v:"bad"},{t:"Put just the 5,000 back in, nothing lost",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Stopped before losing more",story:"Your friend invests nothing more, and the evidence helps police shut down the LINE group.",lessons:["Guaranteed high returns = scam","Check licences with the regulator before investing","The first withdrawal is bait"]},
  E2:{type:"warn",label:"Close call",title:"Some lost, but stopped",story:"The money in the system can't be withdrawn, but your friend sends nothing more and reports it in time.",lessons:["The number on a site isn't real money","Never pay “tax” to withdraw","Asking the admin isn't checking"]},
  E3:{type:"danger",label:"Harmed",title:"Back into the trap",story:"The withdrawn money goes back in, and this time nothing comes out.",lessons:["Don't reinvest because a withdrawal worked","Ponzi schemes pay old members with new money","Stop at the first sign"]},
  E4:{type:"danger",label:"Harmed",title:"Wiped out",story:"Tax, fees, unlock charges, on and on, until nearly half a million is gone, and two recruited friends lose money too.",lessons:["Being asked to pay to withdraw = definitely a scam","Never recruit others to invest","Call 1441 as fast as possible"]}
 }},

ransom:{id:"ransom",level:"Hard",start:"s1",title:"Ransomware locks a shop and threatens a leak",
 learn:["What ransomware is","Disconnect from the network at once","Don't pay the ransom","Keep offline backups"],
 scenes:{
  s1:{title:"The screen turns red",
   body:`<p>Kaew, who runs an online shop, rushes into the station with her laptop, hands shaking.</p>${lock(["🔒 All your files have been encrypted","3,412 customers · addresses · phone numbers are now ours","Pay 0.5 BTC within 48 hours or we publish the data and message every customer","⏱ 47:58:12"])}${chat("☠","ShadowLock","LINE",["Don't call the police. We see everything you do","Your shop is finished if customers learn their data leaked"])}<p>“The laptop is still on the shop Wi-Fi with the backup drive plugged in.”</p>`,
   clues:["Malware can spread to other devices or drives on the same network","“Don't call the police” isolates the victim","Paying guarantees nothing"],
   choices:[{t:"Unplug, turn off Wi-Fi, remove the backup drive at once, and report to Phop with the ransom screen",to:"s2a",v:"good"},{t:"Restart the laptop first, the screen might just go away",to:"s2c",v:"risky"},{t:"Message them to negotiate the price down and settle quietly so customers never know",to:"s2b",v:"bad"}]},
  s2a:{title:"Is there a backup?",
   body:`${staff("Phop","“Good call disconnecting. Don't pay. We'll keep the evidence to trace them. Do you have a backup that wasn't plugged in?”","👮")}<p>“There's a flash drive backup from last week in my drawer.”</p>`,
   clues:["A backup that wasn't connected = not encrypted","Clean the machine before restoring","Being honest with customers beats hiding it"],
   choices:[{t:"Wipe the laptop clean, restore from the backup, change every password, and warn customers about odd messages",to:"E1",v:"good"},{t:"Plug the flash drive into the same laptop now to restore fastest",to:"E3",v:"bad"},{t:"Restore the files but tell customers nothing, to protect the shop's name",to:"E2",v:"risky"}]},
  s2b:{title:"Negotiating",
   body:`${chat("☠","ShadowLock","LINE",["Fine, 0.3 BTC. That's generous","Pay, send the slip, and we'll send the decryptor"])}<p>Kaew starts looking up how to buy bitcoin.</p>`,
   clues:["Negotiating tells them you'll pay","Paying may bring more demands, and the data can still be sold","The laptop still isn't disconnected"],
   choices:[{t:"Stop talking, don't pay, disconnect the laptop, and report to Phop",to:"E2",v:"good"},{t:"Pay 0.3 BTC, it's much cheaper now",to:"E4",v:"bad"},{t:"Pay half now, the rest when the files come back",to:"E4",v:"bad"}]},
  s2c:{title:"Restarted",
   body:`<p>The laptop boots to the same screen, and the plugged-in backup drive is encrypted too.</p>${notif(["⚠ .shadowlock files found on drive E:","💬 ShadowLock: we have your backup too 😊"])}<p>A search result advertises a “100% free decryption tool”.</p>`,
   clues:["The drive left plugged in got hit too","A decryptor from an odd site may be more malware","You can still disconnect now"],
   choices:[{t:"Unplug everything, cut the internet, and report to Phop with the evidence",to:"E2",v:"good"},{t:"Download the free decryptor from that site and try it",to:"E3",v:"bad"},{t:"Pay the ransom, the backup's gone anyway",to:"E4",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"The shop reopens",story:"Kaew restores from her separate backup, pays nothing, and the ransom screen becomes key evidence.",lessons:["Disconnect from the network at once","Don't pay the ransom","Back up, then unplug and store separately"]},
  E2:{type:"warn",label:"Close call",title:"Some files lost",story:"Some recent files can't be recovered and she spends days rebuilding the product list, but she pays no ransom.",lessons:["Restarting doesn't help","Be honest with customers about leaks","Back up more often"]},
  E3:{type:"danger",label:"Harmed",title:"The backup got hit too",story:"The backup is encrypted too, or the “free tool” brings a second infection. All data is lost for good.",lessons:["Never plug a backup into an infected machine","“Free decryptors” from odd sites are dangerous","Always clean before restoring"]},
  E4:{type:"danger",label:"Harmed",title:"Paid, and still hit",story:"No decryptor arrives, they demand more, and the customer list is published anyway.",lessons:["Paying guarantees nothing","Negotiating says you'll pay","Report to police even when threatened"]}
 }},

publicpc:{id:"publicpc",level:"Medium",start:"s1",title:"The library's public computer",
 learn:["Hardware keyloggers","Never do banking on public computers","Log out and never save passwords","Report odd devices to staff"],
 scenes:{
  s1:{title:"Borrowing a library PC",
   body:`<p>Your friend's phone is dead, so they sit at a public PC on floor 2. “Just need web banking for a moment, rent is due today.”</p><p>Between the keyboard cable and the computer there's a small USB adapter plugged in.</p>`,
   clues:["A small adapter between keyboard and PC can record every key","Public computers aren't for banking","The library didn't fit this"],
   choices:[{t:"Don't log in here. Tell staff about the adapter, and borrow a power bank to charge the phone instead",to:"s2a",v:"good"},{t:"Use incognito mode and log in, nothing gets saved",to:"s2b",v:"bad"},{t:"Pull the adapter out yourself and carry on logging in",to:"s2c",v:"risky"}]},
  s2a:{title:"Staff check",
   body:`${staff("Librarian","“That's not ours. There are two more. Someone sat at this machine for ages this morning.”","📚")}<p>Your friend remembers: “Yesterday I logged into Facebook on the next PC and ticked ‘remember password’.”</p>`,
   clues:["The next machine may have a logger too","A password saved on a public PC can be used by anyone","Change it and log out everywhere"],
   choices:[{t:"Change the Facebook password from their own phone now, log out of all devices, and turn on two-step verification",to:"E1",v:"good"},{t:"Go to yesterday's PC and log out, that's enough",to:"E2",v:"risky"},{t:"It's fine, Facebook has nothing important",to:"E3",v:"bad"}]},
  s2b:{title:"Transfer done",
   body:`<p>Rent is paid in incognito mode and the window closed.</p>${notif(["🔔 (two hours later) New sign-in to your bank account from a new device"])}`,
   clues:["Incognito does nothing against a keylogger","Every key pressed has already gone out","Change passwords and tell the bank fast"],
   choices:[{t:"Call the number on the card to block sign-ins, then change the password from their own phone",to:"E2",v:"good"},{t:"Probably just the bank checking, wait and see",to:"E4",v:"bad"},{t:"Go back to the same PC to change the password as fast as possible",to:"E4",v:"bad"}]},
  s2c:{title:"Pulled it out",
   body:`<p>Your friend removes the adapter and logs in, but a strange program, “RemoteHelper”, sits open at the bottom of the screen.</p>`,
   clues:["The PC may have software spying too","Removing the logger yourself destroys evidence","Staff still don't know"],
   choices:[{t:"Stop, log out, hand the adapter to staff as evidence, and change passwords from their own phone",to:"E2",v:"good"},{t:"Close that program and finish the transfer",to:"E4",v:"bad"},{t:"Take the adapter home to plug in and see what it is",to:"E3",v:"bad"}]}
 },
 endings:{
  E1:{type:"safe",label:"Safe",title:"Every logger seized",story:"The library finds three keyloggers, hands them to police and puts warnings on every machine. Your friend's accounts are safe.",lessons:["Never bank on public computers","Never tick “remember password” on others' machines","Report odd devices to staff"]},
  E2:{type:"warn",label:"Close call",title:"A narrow escape",story:"The password leaked, but it was changed before money went missing. The account needs watching for a while.",lessons:["Incognito doesn't stop keyloggers","Change passwords from your own device","Log out of all devices"]},
  E3:{type:"danger",label:"Harmed",title:"Account taken over",story:"The attacker gets into your friend's Facebook and asks everyone on the friends list for money.",lessons:["Social accounts are valuable to scammers","Never plug odd devices into your own machine","Change passwords straight away"]},
  E4:{type:"danger",label:"Harmed",title:"The account is emptied",story:"The attacker uses the captured password to log into the bank and moves the money before your friend notices.",lessons:["Public PCs ≠ banking","Every key may be recorded","Tell the bank at the first odd sign-in"]}
 }}
};
Object.assign(CASES.th, TH); Object.assign(CASES.en, EN);
})();
