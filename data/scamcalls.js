/* coins are tenths of the baht shown (BAHT), so coins:-200 = 2,000 baht.
   Scam calls to the player's own phone. A number keeps calling back until the player blocks it.
   Each call is a short conversation; a choice can end the call (good), or go on to the next step.
   eff: coins = baht lost, privacy/money = bar change, leak = your personal data is now with the gang
   (that unlocks the threat call). Lines: [th, en]. */
const SCAM_CALLS={
  parcel:{
    num:"02-114-7789", tag:["ขนส่งด่วน","Express delivery"],
    steps:[
      {say:["สวัสดีค่ะ ติดต่อจากบริษัทขนส่งนะคะ พัสดุที่ส่งในชื่อคุณมีบัตรประชาชนปลอม 12 ใบ ตอนนี้ตำรวจยึดไว้แล้วค่ะ","Hello, this is the courier company. A parcel sent in your name contains 12 fake ID cards. The police have seized it."],
       q:["คุณจะตอบว่าอะไร","What do you say?"],
       opts:[
        {t:["ไม่ได้ส่งอะไรเลย เดี๋ยววางสายแล้วเช็กในแอปขนส่งเองนะ","I didn't send anything. I'll hang up and check the courier app myself."],good:true,end:true},
        {t:["ไม่จริง! ต้องทำยังไงบ้างคะ","That can't be right! What do I do?"],go:1}]},
      {say:["ดิฉันโอนสายให้ ร.ต.อ. ที่ดูแลคดีนะคะ … (เสียงผู้ชาย) ผมตำรวจครับ ต้องยืนยันตัวตนก่อน บอกเลขบัตรประชาชน 13 หลักกับวันเกิดมาครับ","I'll transfer you to the officer on the case… (a man's voice) Police here. Confirm your identity first: your 13-digit ID number and date of birth."],
       q:["เขาขอข้อมูลส่วนตัว","He wants your personal details"],
       opts:[
        {t:["ตำรวจจริงไม่ขอข้อมูลทางโทรศัพท์ วางสาย","Real police don't ask for this by phone. Hang up."],good:true,end:true},
        {t:["บอกเลขบัตรกับวันเกิดไป","Give your ID number and birthday"],eff:{privacy:-15,leak:true},go:2}]},
      {say:["บัญชีของคุณถูกใช้ฟอกเงิน ต้องโอนเงินทั้งหมดเข้า “บัญชีตรวจสอบ” ของรัฐ ถ้าบริสุทธิ์จะคืนใน 24 ชั่วโมง ห้ามบอกใครนะครับ ไม่งั้นโดนข้อหาด้วย","Your account was used for money laundering. Move all your money to the state ‘checking account’. If you're innocent it comes back in 24 hours. Tell no one, or you'll be charged too."],
       q:["เขาให้โอนเงินและห้ามบอกใคร","Pay up and tell no one"],
       opts:[
        {t:["ไม่โอน วางสาย แล้วโทรเช็กที่ 1441","Don't pay. Hang up and call 1441."],good:true,end:true},
        {t:["โอนไปก่อน เดี๋ยวเขาก็คืน","Pay now, they'll give it back"],eff:{coins:-300,money:-20},end:true}]}],
    lesson:[["ไม่มีหน่วยงานไหนให้โอนเงินไป “ตรวจสอบ”","No real agency asks you to move money ‘for checking’"],["ตำรวจจริงไม่ขอเลขบัตรหรือวันเกิดทางโทรศัพท์","Real police never ask for your ID or birthday by phone"],["สงสัยเมื่อไรให้วางสาย แล้วโทรเช็กที่ 1441 เอง","When in doubt, hang up and call 1441 yourself"]]
  },
  bank:{
    num:"+66 97 552 0193", tag:["ไม่ทราบชื่อ","Unknown"],
    steps:[
      {say:["ฝ่ายความปลอดภัยของธนาคารค่ะ ระบบพบรายการโอน 9,800 บาทออกจากบัญชีของคุณเมื่อสักครู่ ใช่คุณทำรายการเองไหมคะ","Bank security here. We just saw a 9,800-baht transfer out of your account. Was that you?"],
       q:["ตกใจมาก จะตอบยังไง","That's scary. What do you say?"],
       opts:[
        {t:["ขอวางสาย แล้วโทรเบอร์หลังบัตรเอง","I'll hang up and call the number on my card."],good:true,end:true},
        {t:["ไม่ใช่ค่ะ ช่วยยกเลิกให้ด่วนเลย","It wasn't me! Cancel it now!"],go:1}]},
      {say:["ระบบส่งรหัส OTP ไปที่มือถือคุณแล้วค่ะ อ่านรหัส 6 หลักให้ฟังเพื่อยกเลิกรายการนะคะ ต้องรีบภายใน 1 นาที","I've sent an OTP to your phone. Read me the 6 digits to cancel it. You have one minute."],
       sms:["OTP 482913 สำหรับ “ผูกบัญชีกับอุปกรณ์ใหม่” ห้ามบอกรหัสนี้กับผู้อื่น","OTP 482913 to ‘link your account to a new device’. Never share this code."],
       q:["SMS เด้งขึ้นมาพอดี","An SMS pops up"],
       opts:[
        {t:["อ่านดี ๆ … เป็นรหัสผูกเครื่องใหม่ ไม่บอก วางสาย","Read it… it links a new device. Don't share. Hang up."],good:true,end:true},
        {t:["อ่านรหัสให้ฟัง","Read the code out"],eff:{coins:-500,money:-20,privacy:-10,leak:true},end:true}]}],
    lesson:[["OTP ห้ามบอกใคร แม้คนที่บอกว่าเป็นธนาคาร","Never share an OTP, not even with ‘the bank’"],["อ่าน SMS ให้จบ บอกชัดว่ารหัสใช้ทำอะไร","Read the whole SMS: it says what the code is for"],["ธนาคารจริงให้โทรกลับเบอร์หลังบัตรได้เสมอ","A real bank is fine with you calling back on the number on your card"]]
  },
  threat:{
    num:"+66 63 008 4417", tag:["ไม่ทราบชื่อ","Unknown"], needLeak:true,
    steps:[
      {say:["รู้นะว่าแกชื่ออะไร เลขบัตรอะไร เรียนที่ไหน ถ้าไม่โอนมา 2,000 ภายในคืนนี้ จะเอาข้อมูลไปเปิดบัญชีม้า แล้วส่งไปบอกที่บ้าน","I know your name, your ID number and where you study. Send 2,000 tonight or I'll open mule accounts in your name and tell your family."],
       q:["เขาข่มขู่ด้วยข้อมูลที่หลุดไป","He's threatening you with your leaked data"],
       opts:[
        {t:["ไม่โอน เก็บหลักฐาน บล็อก แล้วแจ้งความ","Don't pay. Keep evidence, block, report it."],good:true,end:true},
        {t:["โอนไปให้จบ ๆ","Just pay so it stops"],eff:{coins:-200,money:-15},go:1}]},
      {say:["ได้แล้ว … แต่ยังไม่พอ พรุ่งนี้เอามาอีก 3,000 ไม่งั้นรู้กัน","Got it… but that's not enough. Another 3,000 tomorrow, or else."],
       q:["จ่ายแล้วยังไม่จบ","You paid and it didn't stop"],
       opts:[
        {t:["หยุดจ่าย บล็อกเบอร์ แจ้งความที่ thaipoliceonline.go.th","Stop paying, block, report at thaipoliceonline.go.th"],good:true,end:true},
        {t:["โอนอีก กลัวมาก","Pay again, too scared not to"],eff:{coins:-300,money:-15},end:true}]}],
    lesson:[["จ่ายแล้วไม่จบ คนข่มขู่จะขอเพิ่มเรื่อย ๆ","Paying never ends it. They always ask for more"],["เก็บหลักฐาน บล็อก และแจ้งความออนไลน์ได้ที่ thaipoliceonline.go.th","Keep evidence, block, and report at thaipoliceonline.go.th"],["ถ้าเลขบัตรหลุด ให้แจ้งธนาคาร และระวังการเปิดบัญชีในชื่อเรา","If your ID leaked, tell your bank and watch for accounts opened in your name"]]
  }
};
