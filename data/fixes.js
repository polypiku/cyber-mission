/* The hands-on last step of every case: you fix things yourself on the phone to earn the clue.
   kind: reply (type a message) · pw (inbox + new password) · dial (call the right number)
         settings (flip toggles) · order (put steps in order) · pick (choose one) · multi (choose all that apply) · pin (new app PIN) */
const FIX_TIER = {2:1, 1:2, 4:2, 7:2, 3:3, 6:3, 5:3};
const FIXES = {
  /* ---- library (tier 1) ---- */
  charge:{kind:"settings", app:["ตั้งค่า › USB","Settings › USB"], goal:["ยกเลิกการเชื่อถือตู้ชาร์จ แล้วตั้ง USB เป็นชาร์จอย่างเดียว","Stop trusting the charging kiosk and set USB to charge only"],
    items:[{t:["เชื่อถือคอมพิวเตอร์ “FreeCharge-01”","Trust computer “FreeCharge-01”"],on:true,want:false},{t:["USB: ชาร์จอย่างเดียว","USB: charge only"],on:false,want:true},{t:["โหมดเครื่องบิน","Airplane mode"],on:false,want:false}]},
  helper:{kind:"reply", to:["ห้องสมุดเมือง (ไลน์ทางการ)","City Library (official LINE)"], msg:["สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ","Hello, how can we help?"],
    goal:["แจ้งห้องสมุดว่ามีคนแอบอ้างเป็นเจ้าหน้าที่ Wi-Fi","Tell the library someone is posing as Wi-Fi staff"],
    groups:[{w:["ปลอม","แอบอ้าง","หลอก","fake","pretend","posing","scam"],h:["บอกว่าเป็นของปลอม/แอบอ้าง","Say they're fake / posing"]},{w:["wi-fi","wifi","ไวไฟ","วายฟาย","เจ้าหน้าที่","staff"],h:["พูดถึง Wi-Fi หรือเจ้าหน้าที่","Mention the Wi-Fi or staff"]}]},
  publicpc:{kind:"pw", app:["อีเมล","Mail"], goal:["เปลี่ยนรหัสบัญชีที่เผลอล็อกอินในคอมสาธารณะ","Change the password used on the public PC"],
    inbox:[{from:"no-reply@accounts.hcu.ac.th",s:["รีเซ็ตรหัสผ่านบัญชีของคุณ","Reset your account password"],ok:true},{from:"security@hcu-acc0unts.com",s:["ด่วน! บัญชีถูกระงับ ยืนยันภายใน 1 ชม.","URGENT! Account suspended, verify in 1 hour"]},{from:"library@citylib.go.th",s:["หนังสือครบกำหนดคืน","Your book is due"],skip:true}]},
  airdrop:{kind:"settings", app:["ตั้งค่า › รับไฟล์","Settings › File sharing"], goal:["ปิดการรับไฟล์จากคนแปลกหน้า","Stop receiving files from strangers"],
    items:[{t:["รับไฟล์จาก: ทุกคน","Receive from: Everyone"],on:true,want:false},{t:["รับไฟล์จาก: รายชื่อติดต่อเท่านั้น","Receive from: Contacts only"],on:false,want:true},{t:["เปิดไฟล์ที่ได้รับอัตโนมัติ","Open received files automatically"],on:true,want:false}]},
  /* ---- café (tier 2) ---- */
  qr:{kind:"reply", to:["Bean House (เพจร้าน)","Bean House (café page)"], msg:["สวัสดีค่ะ Bean House ยินดีให้บริการ","Hi, Bean House here!"],
    goal:["แจ้งร้านเรื่องสติกเกอร์ QR บนโต๊ะ","Tell the café about the QR stickers on the tables"],
    groups:[{w:["qr","คิวอาร์"],h:["พูดถึง QR","Mention the QR"]},{w:["ปลอม","สติกเกอร์","แปะทับ","fake","sticker"],h:["บอกว่าเป็นสติกเกอร์ปลอมแปะทับ","Say it's a fake sticker on top"]}]},
  bank:{kind:"dial", goal:["โทรหาธนาคารด้วยเบอร์หลังบัตร ไม่ใช่เบอร์ใน SMS","Call the bank on the number on the card, not the SMS"],
    card:"02 345 6789", sms:["นครทอง: บัญชีถูกระงับ โทร 02 999 1212","Nakhonthong: account frozen, call 02 999 1212"], answer:"023456789"},
  wifi:{kind:"pw", app:["อีเมล","Mail"], goal:["เปลี่ยนรหัสที่กรอกในหน้า Wi-Fi ปลอม แล้วเปิดยืนยันสองขั้นตอน","Change the password typed on the fake Wi-Fi page and turn on 2-step"], twofa:true,
    inbox:[{from:"account-security@mail.google.com",s:["คำขอเปลี่ยนรหัสผ่าน","Password change request"],ok:true},{from:"wifi-free@beanhouse-login.net",s:["ยืนยันการใช้ Wi-Fi อีกครั้ง","Confirm your Wi-Fi login again"]},{from:"news@coffeeclub.co.th",s:["โปรกาแฟ 1 แถม 1","Coffee buy 1 get 1"],skip:true}]},
  chat:{kind:"reply", to:["กลุ่มเพื่อนสนิท","Close friends group"], msg:["ต้นข้าว: ใครว่างโอนให้เราก่อนได้ไหม 2,000 ด่วนมาก","Ton Khao: can someone transfer me ฿2,000? It's urgent"],
    goal:["เตือนเพื่อนในกลุ่มว่าบัญชีต้นข้าวโดนแฮก","Warn the group that Ton Khao's account was hacked"],
    groups:[{w:["แฮก","ปลอม","ไม่ใช่","hack","fake","not her","not him"],h:["บอกว่าบัญชีโดนแฮก","Say the account was hacked"]},{w:["อย่าโอน","ห้ามโอน","ไม่ต้องโอน","don't","do not","dont"],h:["บอกไม่ให้โอน","Tell them not to transfer"]}]},
  /* ---- net café (tier 2) ---- */
  topup:{kind:"pin", app:["แอปธนาคารของยาย","Grandma's banking app"], goal:["ตั้งรหัสแอป 6 หลักใหม่ ที่ไม่ใช่วันเกิดและไม่เรียงกัน","Set a new 6-digit app PIN: no birthdays, no sequences"],
    bad:["120548","050712","250312"], hint:["วันเกิดยาย 12/05/48 · ภูมิ 05/07/12 · แม่ 25/03/12","Birthdays: Grandma 12/05/48 · Phum 05/07/12 · Mum 25/03/12"]},
  trade:{kind:"pick", goal:["ล็อกอินเกมจากเว็บจริงเพื่อเปลี่ยนรหัส","Log in on the real game site to change the password"], q:["เว็บไหนเป็นของจริง","Which site is real?"],
    opts:[{t:"https://game-trade.site/login"},{t:"https://account.rovgame.com",ok:true},{t:"https://rovgame.com.account-verify.co"},{t:"https://r0vgame.com/login"}]},
  secret:{kind:"order", goal:["จัดการบัญชี “พี่บอส” ให้ถูกลำดับ","Deal with the “Boss” account in the right order"],
    steps:[["แคปหน้าจอแชตเก็บไว้","Screenshot the chat"],["รายงานบัญชีในเกม","Report the account in-game"],["บล็อกบัญชี","Block the account"],["เล่าให้ผู้ใหญ่ที่ไว้ใจฟัง","Tell a trusted adult"]]},
  parent:{kind:"settings", app:["ตั้งค่า › การซื้อในแอป","Settings › In-app purchases"], goal:["กันไม่ให้ซื้อในเกมโดยไม่รู้ตัวอีก","Stop surprise in-game purchases"],
    items:[{t:["ต้องใส่รหัสทุกครั้งที่ซื้อ","Require password for every purchase"],on:false,want:true},{t:["บันทึกบัตรเครดิตไว้ในเกม","Card saved in the game"],on:true,want:false},{t:["ขออนุญาตผู้ปกครองก่อนซื้อ","Ask a parent before buying"],on:false,want:true},{t:["แจ้งเตือนเมื่อมีการซื้อ","Notify me of purchases"],on:true,want:true}]},
  /* ---- police (tier 2) ---- */
  report:{kind:"dial", goal:["โทรสายด่วนตำรวจไซเบอร์ ให้อายัดบัญชีปลายทางให้เร็วที่สุด","Call the cyber police hotline to freeze the account fast"], answer:"1441",
    note:["สายด่วน AOC ตำรวจไซเบอร์ (4 หลัก)","Cyber police AOC hotline (4 digits)"]},
  ransom:{kind:"pick", goal:["กู้ไฟล์ร้านจากไฟล์สำรองที่ปลอดภัย","Restore the shop's files from a safe backup"], q:["ใช้ไฟล์สำรองชุดไหน","Which backup do you use?"],
    opts:[{t:["ซิงก์คลาวด์ · 5 นาทีก่อน (ไฟล์ .shadow)","Cloud sync · 5 min ago (.shadow files)"]},{t:["ฮาร์ดดิสก์แยก · 2 วันก่อน · ถอดเก็บไว้","External drive · 2 days ago · kept unplugged"],ok:true},{t:["โฟลเดอร์ Backup ในเครื่องเดียวกัน","Backup folder on the same PC"]}]},
  /* ---- bank (tier 3) ---- */
  rush:{kind:"dial", goal:["โทรหาต้นด้วยเบอร์ที่ยายบันทึกไว้เอง","Call Ton on the number Grandma already saved"], answer:"0812345670",
    contacts:[["ต้น (หลาน)","Ton (grandson)","081 234 5670"],["แม่ปู","Mum Pu","089 765 4321"]], sms:["เบอร์ที่โทรมา: 095 111 2233","The caller: 095 111 2233"], hideNum:false},
  video:{kind:"order", goal:["หลังวางสาย “ตำรวจปลอม” ทำอะไรบ้าง ตามลำดับ","After hanging up on the fake “police”, do these in order"],
    steps:[["บล็อกเบอร์นั้น","Block that number"],["โทร 1441 แจ้งเบอร์","Call 1441 to report it"],["บอกลูกหลาน","Tell the family"]], extra:[["โอนเงินไปให้ตรวจสอบ","Transfer money for “checking”"],["โทรกลับเบอร์เดิม","Call the same number back"]]},
  invest:{kind:"reply", to:["เพื่อนที่ชวนลงทุน","The friend who invited you"], msg:["มาลงด้วยกันนะ เดือนละ 30% ชัวร์ๆ","Join me! 30% a month, guaranteed"],
    goal:["ตอบเพื่อนให้รู้ว่าเป็นกลโกง และควรตรวจสอบกับ ก.ล.ต.","Tell your friend it's a scam and to check with the SEC"],
    groups:[{w:["หลอก","โกง","แชร์ลูกโซ่","scam","ponzi","fake"],h:["บอกว่าเป็นกลโกง","Call it a scam"]},{w:["30","กำไร","การันตี","guarantee","profit","return"],h:["ชี้ว่ากำไรสูงเกินจริง","Point out the impossible return"]},{w:["ก.ล.ต","กลต","sec","ตรวจสอบ","check"],h:["ให้ตรวจสอบกับ ก.ล.ต.","Check with the SEC"]}]},
  remote:{kind:"settings", app:["ตั้งค่า › แอป","Settings › Apps"], goal:["ปิดสิทธิ์และถอนแอป PEA Refund ปลอม แล้วเปิดตัวสแกนแอป","Revoke and remove the fake PEA Refund app, then turn on app scanning"],
    items:[{t:["PEA Refund: ควบคุมหน้าจอ (Accessibility)","PEA Refund: control screen (Accessibility)"],on:true,want:false},{t:["PEA Refund: แชร์หน้าจอ","PEA Refund: screen sharing"],on:true,want:false},{t:["ติดตั้งแอปจากแหล่งที่ไม่รู้จัก","Install unknown apps"],on:true,want:false},{t:["สแกนแอปด้วย Play Protect","Scan apps with Play Protect"],on:false,want:true},{t:["แอปธนาคาร: แจ้งเตือน","Banking app: notifications"],on:true,want:true}]},
  /* ---- university (tier 3) ---- */
  scholar:{kind:"pick", goal:["สมัครทุนจริงจากเว็บมหาวิทยาลัย","Apply for the real scholarship on the university site"], q:["ลิงก์ไหนเป็นของมหาวิทยาลัยจริง","Which link really belongs to the university?"],
    opts:[{t:"https://hcu-scholar.site/apply"},{t:"https://hcu.ac.th.scholarship-apply.com"},{t:"https://www.hcu.ac.th/scholarship",ok:true},{t:"https://hcu-ac-th.com/scholarship"}]},
  itmail:{kind:"pw", app:["อีเมลมหาวิทยาลัย","University mail"], goal:["ตั้งรหัสบัญชีมหาวิทยาลัยใหม่ แล้วเปิดยืนยันสองขั้นตอน","Set a new university password and turn on 2-step"], twofa:true,
    inbox:[{from:"it-support@hcu-mail.help",s:["กล่องจดหมายเต็ม! ยืนยันบัญชี","Mailbox full! Verify your account"]},{from:"noreply@hcu.ac.th",s:["รหัสผ่านของคุณถูกรีเซ็ตตามคำขอ","Your password reset, as requested"],ok:true},{from:"it@hcu.ac.th.mailbox-verify.com",s:["ด่วน: เปลี่ยนรหัสภายในวันนี้","Urgent: change your password today"]},{from:"club@hcu.ac.th",s:["รับสมัครชมรมดนตรี","Music club sign-ups"],skip:true}]},
  parttime:{kind:"multi", goal:["เตรียมหลักฐานให้ปวีณาเอาไปให้การกับพี่ภพ","Pack the evidence Paweena brings to Phop"], q:["เลือกทุกอย่างที่ควรเอาไป","Choose everything she should bring"],
    opts:[{t:["รูปแคปแชตกับ “พี่บอส”","Screenshots of the “Boss” chat"],ok:true},{t:["เลขบัญชีที่ถูกสั่งให้เปิด","The account numbers she was told to open"],ok:true},{t:["สลิปค่าจ้างที่ได้รับ","The payment slips she got"],ok:true},{t:["รหัสผ่านแอปธนาคาร","Her banking app password"]},{t:["ลบแชตทิ้งก่อนไป จะได้ไม่โดนจับ","Delete the chats first so she isn't blamed"]}]},
  fakeprof:{kind:"reply", to:["ไลน์กลุ่มวิชา","Class LINE group"], msg:["“อาจารย์”: นักศึกษาโอนค่าเอกสาร 350 บาทภายในวันนี้","“Lecturer”: transfer ฿350 for handouts today"],
    goal:["เตือนเพื่อนในกลุ่มว่าเป็นอาจารย์ปลอม ให้ยืนยันกับอาจารย์ตัวจริงก่อน","Warn the group it's a fake lecturer; confirm with the real one first"],
    groups:[{w:["ปลอม","ไม่ใช่อาจารย์","หลอก","fake","not the","scam"],h:["บอกว่าเป็นบัญชีปลอม","Say the account is fake"]},{w:["อย่าโอน","ห้ามโอน","ไม่ต้องโอน","don't","do not","dont"],h:["บอกไม่ให้โอน","Tell them not to transfer"]},{w:["ยืนยัน","ถาม","โทร","ภาควิชา","confirm","ask","call","office"],h:["ให้ยืนยันกับอาจารย์ตัวจริง","Confirm with the real lecturer"]}]},
  /* ---- haunted house (tier 3) ---- */
  merit:{kind:"pick", goal:["ช่วยลูกสาวแม่ช้อยทำบุญกับวัดจริง","Help Choy's daughter donate to the real temple"], q:["โอนเข้าบัญชีไหน","Which account do you donate to?"],
    opts:[{t:["“วัดสว่างบุญ” · บัญชี นายธนพล ส.","“Wat Sawang Bun” · account of Mr Thanaphon S."]},{t:["มูลนิธิวัดสว่างบุญ · ตรงกับเว็บและป้ายในวัด","Wat Sawang Bun Foundation · matches the temple site and signs"],ok:true},{t:["เพจ “ทำบุญออนไลน์ได้บุญ x10”","Page “Online merit, 10x the blessing”"]}]},
  inherit:{kind:"order", goal:["จัดการอีเมลมรดกปลอม ตามลำดับ","Deal with the fake inheritance email in order"],
    steps:[["อย่าตอบกลับ","Don't reply"],["รายงานว่าเป็นอีเมลหลอกลวง","Report it as phishing"],["บล็อกผู้ส่ง","Block the sender"],["ลบอีเมล","Delete the email"]], extra:[["ส่งรูปบัตรประชาชนยืนยันตัวตน","Send an ID photo to verify"]]},
  romance:{kind:"multi", goal:["ชี้ให้แป้งเห็นว่าแฟนออนไลน์เป็นมิจฉาชีพ","Show Paeng her online sweetheart is a scammer"], q:["เลือกสัญญาณอันตรายทั้งหมด","Pick every warning sign"],
    opts:[{t:["ไม่เคยยอมเปิดกล้องวิดีโอคอล","Never agrees to a video call"],ok:true},{t:["ขอยืมเงินค่าตั๋วเครื่องบินมาหา","Asks to borrow money for a plane ticket"],ok:true},{t:["รูปโปรไฟล์ไปเจอในเว็บนายแบบ","Profile photo found on a model's site"],ok:true},{t:["ชอบฟังเพลงแนวเดียวกัน","Likes the same music"]},{t:["ส่งรูปดอกไม้มาให้","Sends pictures of flowers"]}]},
  fortune:{kind:"reply", to:["หมอดูออนไลน์","Online fortune teller"], msg:["บ้านคุณมีผี ต้องจ่ายค่าพิธี 9,999 บาท ไม่งั้นโชคร้าย","Your house is haunted. Pay ฿9,999 for a ritual or bad luck follows"],
    goal:["ปฏิเสธไม่จ่าย และบอกว่าจะรายงานเพจ","Refuse to pay and say you'll report the page"],
    groups:[{w:["ไม่จ่าย","ไม่โอน","ไม่สน","ไม่เอา","no","won't","will not","not pay"],h:["ปฏิเสธไม่จ่าย","Refuse to pay"]},{w:["รายงาน","แจ้ง","บล็อก","report","block"],h:["บอกว่าจะรายงาน/บล็อก","Say you'll report or block"]}]}
};
