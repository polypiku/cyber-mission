/* What each character says, the first-time tour and talking to people. */
/* ---------- scripts ---------- */
const t=(th,en)=>({t:{th,en}});
const me=(th,en)=>({who:"__me",t:{th,en}});
function lines(arr){ return arr.map(l=>l.who==="__me"?{...l,who:S.char}:l); }
const CH = {
  help:[{label:{th:"ได้เลย ลองดูให้",en:"Sure, let me look"},fn:null},{label:{th:"ไว้ก่อนนะ",en:"Maybe later"},ghost:true}],
  again:[{label:{th:"ลองเคสนี้อีกครั้ง",en:"Replay this case"},fn:null},{label:{th:"ไม่เป็นไร",en:"No thanks"},ghost:true}]
};
const SCRIPT = {
  grandma:{ intro:[t("หลานจ๋า มานี่หน่อย","Come here a moment, dear."),t("ป้ายบนโต๊ะบอกว่าสแกนแล้วลด 50% แต่ยายสายตาไม่ค่อยดี มือถือก็ใช้ไม่ค่อยเป็น","The sign on the table says scanning gets 50% off, but my eyes aren't great and I'm not good with phones."),t("หลานช่วยลองดูแทนยายหน่อยได้ไหม","Could you try it for me?")],
    after:{safe:t("ขอบใจนะหลาน ร้านบอกว่าไม่มีโปรนี้เลย ยายเกือบโดนแล้ว","Thank you, dear. The café says there's no such promo. I nearly fell for it."),warn:t("ดีนะที่หลานดูชื่อผู้รับก่อน เดี๋ยวยายไปจ่ายที่เคาน์เตอร์ดีกว่า","Good thing you checked the payee. I'll pay at the counter instead."),danger:t("แย่เลย แค่สแกน QR ก็เสียหายได้ขนาดนี้ คราวหน้าเราต้องระวังกว่านี้นะหลาน","Oh dear, all that from one QR scan. We'll be more careful next time.")} },
  grandpa:{ intro:[t("หลาน มานี่หน่อย ตาทำตามที่ SMS บอกอยู่","Come here, dear. I'm doing what the SMS says."),t("ธนาคารบอกบัญชีตาจะถูกระงับ ตากำลังกรอกรหัสอยู่เลย","The bank says my account will be suspended. I'm typing my password now."),t("หลานช่วยดูหน่อยว่าทำถูกไหม","Can you check I'm doing it right?")],
    after:{safe:t("อ๋อ ต้องเช็กในแอปจริงนี่เอง ตาสบายใจแล้ว ขอบใจมากนะ","Ah, check in the real app. I feel much better. Thank you."),warn:t("เกือบไปแล้ว ดีที่หลานรีบให้ตาเปลี่ยนรหัส","That was close. Good thing you made me change my password."),danger:t("ตาไม่น่ากดเลย… เงินบำนาญตา","I shouldn't have pressed it… my pension…")} },
  friend:{ intro:[t("เฮ้ย มาพอดีเลย!","Hey, perfect timing!"),t("เน็ตมือถือเราหมด แต่ต้องส่งรายงานคืนนี้ ร้านนี้มี Wi-Fi ให้เลือกสองชื่อ","My mobile data ran out and my report's due tonight. This café shows two Wi-Fi networks."),t("ช่วยเราดูหน่อยว่าควรทำยังไง","Can you help me figure out what to do?")],
    after:{safe:t("เกือบต่ออันที่ไม่มีรหัสแล้ว ขอบใจนะ","I almost joined the open one. Thanks!"),warn:t("โอเค ตัดการเชื่อมต่อแล้ว ต่อไปจะระวัง","Okay, disconnected. I'll be careful from now on."),danger:t("แย่แล้ว ข้อมูลเราอาจหลุดไปแล้ว ต้องรีบเปลี่ยนรหัสผ่าน","Oh no, my data might be out there. I need to change my passwords now.")} },
  tips:[t("ข้อความที่เร่งให้รีบตัดสินใจ มักมีอะไรแอบแฝง","Messages that rush you usually hide something."),t("QR Code ก็คือลิงก์แบบหนึ่ง ตรวจให้ดีเหมือนลิงก์ทั่วไป","A QR code is just a link. Check it like any other link."),t("ก่อนโอนเงิน ดูชื่อผู้รับให้ดีทุกครั้ง","Before paying, always read the payee's name."),t("ถ้าไม่แน่ใจ ให้ตรวจสอบผ่านช่องทางที่เราหาเอง ไม่ใช่ช่องทางที่อีกฝ่ายให้มา","If unsure, check through a channel you find yourself, not one they give you."),t("ใครขอรหัส OTP จากเรา ให้สงสัยไว้ก่อนเสมอ","Anyone asking for your OTP should make you suspicious.")]
};
const SCRIPT2 = {
  grandpa:{ intro:[t("หลาน! แบตลุงจะหมดแล้ว หมอจะโทรมาอีกสิบนาที","Dear! My battery's dying and the doctor calls in ten minutes."),t("ตรงนั้นมีตู้ชาร์จฟรี มีสายให้เสียบเลย แต่มันขึ้นถามอะไรไม่รู้","There's a free charging station with cables, but it's asking me something odd.")],
    after:{safe:t("ชาร์จกับปลั๊กไฟธรรมดาก็ได้นี่ ลุงไม่รู้มาก่อนเลยว่าสายชาร์จขโมยข้อมูลได้","A normal wall socket works fine. I never knew a cable could steal data."),warn:t("ลุงต้องเปลี่ยนรหัสหลายอย่างเลย แต่เงินไม่หาย","I had to change a lot of passwords, but no money's gone."),danger:t("ลุงแค่อยากชาร์จแบต…","I only wanted to charge my battery…")} },
  grandma:{ intro:[t("หลานจ๋า ช่วยป้าดูหน่อย","Dear, can you look at this for me?"),t("ข่าวบอกเว็บขายไหมพรมข้อมูลรั่ว แล้วมือถือป้าก็เด้งแจ้งเตือนไม่หยุดเลย","The news says the yarn shop leaked its data, and now my phone won't stop beeping.")],
    after:{safe:t("ป้ามีกุญแจแยกทุกบัญชีแล้ว สอนเพื่อนในชมรมด้วย","Every account has its own key now. I'm teaching the club too."),warn:t("ป้าต้องตามเปลี่ยนรหัสอีกหลายที่เลย","I still have more passwords to change."),danger:t("ทั้งอีเมลทั้งเงินในวอลเล็ตหายหมด…","My email and my wallet money are both gone…")} },
  tips:{ intro:[t("มือถือแบตหมด เลยมายืมคอมห้องสมุด","My phone died, so I'm using a library computer."),t("ต้องโอนค่าหอผ่านเว็บธนาคารวันนี้ด่วนเลย","I have to pay rent through web banking today.")],
    after:{safe:t("ห้องสมุดเจอตัวดักแป้นพิมพ์ตั้งสามตัว!","The library found three keyloggers!"),warn:t("เปลี่ยนรหัสทัน แต่ใจหายเลย","Changed the password in time. Scary."),danger:t("เงินค่าหอหายหมดแล้ว…","My rent money's gone…")} },
  friend:{ intro:[t("เดี๋ยวเราต้องพรีเซนต์งาน ขอซ้อมแป๊บ","I have to pitch soon, let me rehearse."),t("เมื่อกี้มีไฟล์เด้งมาจาก LIB-Printer น่าจะเป็นเทมเพลตของห้องสมุดนะ","A file just popped up from LIB-Printer. Probably the library's template.")],
    after:{safe:t("ตั้งรับไฟล์เป็นผู้ติดต่อเท่านั้นแล้ว พรีเซนต์ผ่านด้วย!","Receiving is set to contacts only now, and the pitch went great!"),warn:t("ปิดการแชร์ไฟล์แล้ว เกือบไปแล้วจริงๆ","Sharing's off now. That was way too close."),danger:t("ไฟล์งานหายหมดเลย…","All my work files are gone…")} }
};
const SCRIPT3 = {
  grandma:{ intro:[t("แย่แล้วๆ! หลานจ๋า ช่วยยายด้วย!","Oh no, oh no! Dear, please help me!"),t("ต้นหลานยายโทรมาร้องไห้ บอกขับรถชนคน ตำรวจจับไว้ ต้องโอนค่าประกันตัว 50,000 ภายในชั่วโมงนี้","My grandson Ton called crying. He hit someone with the car, the police have him, and I must wire 50,000 bail within the hour."),t("เขาบอกห้ามบอกแม่มันด้วย ยายทำยังไงดี!","He said not to tell his mum. What do I do?!")],
    after:{safe:t("ต้นปลอดภัยดี ยายใจหายหมดเลย ขอบใจนะหลาน ที่ไม่ปล่อยให้ยายรีบ","Ton's fine. My heart nearly stopped. Thank you for not letting me rush."),warn:t("ดีนะที่พนักงานถามไว้ ยายเกือบโอนไปแล้ว","Good thing the teller asked. I almost sent it."),danger:t("เงินเก็บยาย… ทั้งที่ต้นไม่ได้เป็นอะไรเลย","My savings… and Ton was fine all along.")} },
  grandpa:{ intro:[t("(ตาบุญกระซิบ) อย่าเข้ามาใกล้นะหลาน","(Grandpa Boon whispers) Don't come too close, dear."),t("ตำรวจในวิดีโอคอลบอกว่าตาพัวพันคดีฟอกเงิน ห้ามคุยกับใคร ต้องอยู่คนเดียว","The police on this video call say I'm linked to money laundering. I can't talk to anyone. I have to stay alone."),t("…หลานว่าตาควรทำยังไง","…What do you think I should do?")],
    after:{safe:t("ตาเหมือนตื่นจากฝันเลย ถ้าหลานไม่มานั่งข้างๆ ตาคงถอนเงินไปแล้ว","It's like waking from a dream. If you hadn't sat with me, I'd have withdrawn it."),warn:t("พนักงานช่วยไว้ แต่ตาต้องคอยระวังเรื่องบัตรประชาชนอีกนาน","The teller saved me, but I'll have to watch my ID for a long time."),danger:t("ตาไม่น่าเชื่อเขาเลย เงินเก็บทั้งชีวิต…","I should never have believed him. My whole life's savings…")} },
  friend:{ intro:[t("เฮ้ย มาธนาคารเหมือนกันเหรอ","Hey, you're at the bank too?"),t("เรามาถอนเงินไปลงกลุ่มลงทุน AI เพิ่ม เดือนที่แล้วได้ 30% เลยนะ!","I'm withdrawing more to put into the AI investment group. I made 30% last month!")],
    after:{safe:t("ดีที่เช็กใบอนุญาตก่อน กลุ่มนั้นไม่มีอยู่จริงเลย","Glad we checked the licence. That company doesn't exist."),warn:t("เงินเดิมถอนไม่ได้แล้ว แต่ไม่เสียเพิ่ม","Can't get the old money out, but I didn't lose more."),danger:t("เราเสียไปเกือบหมดตัว…","I've lost almost everything…")} },
  tips:{ intro:[t("รอคิวนานจัง เลยว่าจะทำเรื่องคืนเงินค่าประกันมิเตอร์ไฟไปด้วย","The queue's so long, I figured I'd do the meter deposit refund meanwhile."),t("เจ้าหน้าที่ส่งลิงก์ให้โหลดแอปมาในไลน์ บอกหมดเขตวันนี้","An agent sent me an app link on LINE. Says it ends today."),t("ช่วยดูหน่อย","Can you take a look?")],
    after:{safe:t("ทำผ่านแอปทางการแป๊บเดียวก็เสร็จ ขอบใจนะ","Done in a minute through the official app. Thanks!"),warn:t("เกือบโดนดูดเงินแล้ว ต้องเปลี่ยนรหัสใหม่หมดเลย","I nearly got drained. Now I'm changing every password."),danger:t("ยืนอยู่ในธนาคารแท้ๆ แต่เงินหายหมดบัญชี","I was standing right in the bank and my account got emptied.")} }
};
const SCRIPT0 = {
  grandma:{ intro:[t("หลานจ๋า! มีข่าวดี","Dear! Good news!"),t("มีสำนักงานกฎหมายโทรมาบอกว่าตามเงินที่ยายโดนโกงคืนให้ได้ เขารู้หมดเลยว่ายายเสียไปเท่าไหร่","A law office called saying they can get back the money I lost. They know exactly how much."),t("แค่จ่ายค่าดำเนินการนิดหน่อย หลานว่าดีไหม","Just a small processing fee. What do you think?")],
    after:{safe:t("ยายเกือบโดนซ้ำแล้ว ขอบใจนะหลาน","I nearly got fooled twice. Thank you, dear."),warn:t("ยายจะระวังมากกว่านี้","I'll be much more careful."),danger:t("โดนซ้ำสองเลยหรือนี่…","Fooled twice…")} },
  grandpa:{ intro:[t("หลาน มีคนโทรมาว่าจะช่วยตามเงินที่ตาเสียไปคืน","Dear, someone called offering to recover the money I lost."),t("เขารู้วันที่ รู้ยอดเงิน ตาว่าน่าจะของจริงนะ","They know the date and the amount. I think it's real."),t("ตาควรทำยังไง","What should I do?")],
    after:{safe:t("ตาไม่จ่ายแล้ว ไปตามเรื่องที่โรงพักดีกว่า","I won't pay. I'll follow up at the police station."),warn:t("เกือบไปแล้ว ตาไม่ส่งอะไรเพิ่มแล้ว","Close one. I won't send anything else."),danger:t("ตาโดนซ้ำอีกแล้ว…","I've been fooled again…")} }
};
function thanksLine(role,id){
  if(id && id!=="grandma" && id!=="grandpa") return t("ขอบใจที่ช่วยไว้นะ","Thanks for looking out for me.");
  const saved=(VICTIM_CASES[role]||[]).filter(k=>S.best[k]==="safe").length;
  if(role==="grandma") return saved?t("ยายเล่าให้เพื่อนในชมรมฟังหมดแล้ว ว่าหลานช่วยยายไว้","I told everyone at my club how you saved me."):t("วันนี้อากาศดีนะหลาน","Lovely weather today, dear.");
  return saved?t("ตาติดเบอร์ 1441 ไว้ข้างโทรศัพท์บ้านแล้วนะ","I've stuck 1441 next to the home phone now."):t("ตามานั่งรับลมแถวนี้ทุกเย็น","I come here for the breeze every evening.");
}
const SCRIPT4 = {
  friend:{ intro:[t("พี่! มาพอดีเลย","Hey! Perfect timing."),t("โฆษณาบอกเติมเพชรลด 70% ผมใส่ไอดีกับรหัสไปแล้ว","An ad says 70% off diamonds. I've typed my ID and password."),t("เหลือแค่รหัสในอีเมล ใส่เลยนะ","Just the email code left. Shall I?")],
    after:{safe:t("เพื่อนในห้องเกือบโดนกันหมด ผมเตือนทันพอดี","Nearly my whole class fell for it. I warned them just in time."),warn:t("เปลี่ยนรหัสแล้ว แต่ไอดีผมส่งลิงก์ไปให้เพื่อนบางคนแล้ว","Password changed, but my account already sent the link to some friends."),danger:t("ไอดีเลเวล 98 ของผมหายแล้ว…","My level-98 account is gone…")} },
  tips:{ intro:[t("ดูนี่! สกินตำนานแลกกับของแค่ 3 ชิ้น","Look! A legendary skin for just 3 items."),t("เขาให้ล็อกอินเว็บเทรด มีโลโก้เกมด้วยนะ","He wants me to log in on a trade site. It even has the game logo."),t("ช่วยดูหน่อย","Can you check?")],
    after:{safe:t("เตือนกิลด์แล้ว มีเพื่อนเกือบโดนสองคน","I warned the guild. Two friends nearly fell for it."),warn:t("เปลี่ยนรหัสกับเปิด 2FA แล้ว","Changed my password and turned on 2FA."),danger:t("บัญชีหายแล้ว… ของสะสมสามปี","My account's gone… three years of items.")} },
  grandpa:{ intro:[t("น้อง ดีใจด้วยกับพี่หน่อย","Be happy for me!"),t("เจนนี่ที่คุยกันทุกคืน สอนพี่เทรดคริปโต กำไรเกือบเท่าตัวแล้ว คืนนี้พี่จะลงเพิ่ม 50,000","Jenny, who I talk to every night, is teaching me crypto. Almost doubled already. Tonight I'm putting in 50,000.")],
    after:{safe:t("เงินเก็บของร้านยังอยู่ ขอบใจที่ดึงพี่ไว้","The shop's savings are safe. Thanks for pulling me back."),warn:t("พี่เจ็บ แต่ยังดีที่หยุดทัน","It hurts, but at least I stopped in time."),danger:t("เงินเก็บหมด แล้วเจนนี่ก็หายไป…","The savings are gone, and so is Jenny…")} },
  grandma:{ intro:[t("น้องจ๋า ช่วยพี่ด้วย","Please, can you help me?"),t("ต้องจ่ายค่าเทอมภูมิพรุ่งนี้ เจอแอปกู้ด่วน อนุมัติ 5 นาที แต่มันขอสิทธิ์เยอะมาก","Phum's fees are due tomorrow. I found a quick-loan app, approved in 5 minutes, but it wants so many permissions.")],
    after:{safe:t("โรงเรียนให้แบ่งจ่ายได้ พี่บอกเพื่อนบ้านให้ถอนแอปด้วย","The school lets me pay in parts. I told the neighbour to delete the app too."),warn:t("พี่ถอนแอปแล้ว แต่บางคนในรายชื่อได้ข้อความแย่ๆ ไปแล้ว","I deleted it, but some contacts already got nasty messages."),danger:t("หนี้มันงอกไม่หยุดเลยน้อง…","The debt just keeps growing…")} },
};
const SCRIPT5 = {
  grandma:{ intro:[t("หลาน… หลานมองเห็นแม่ด้วยหรือ","Child… you can see me?"),t("ลูกสาวแม่ทำบุญส่งมาให้ทุกคืน แต่บุญไม่เคยมาถึงเลย แม่เลยไปไหนไม่ได้","My daughter sends me merit every night, but it never arrives. So I can't move on."),t("ช่วยดูให้แม่หน่อยนะ","Please look into it for me.")],
    after:{safe:t("บุญมาถึงแล้ว… ขอบใจนะหลาน","The merit has arrived… thank you, child."),warn:t("แม่ไปได้แล้ว แต่ยังห่วงคนอื่นอยู่","I can go now, but I still worry for others."),danger:t("ยังไปไม่ได้… ลูกยังโอนอยู่ทุกคืน","I still can't go… she keeps paying every night.")} },
  grandpa:{ intro:[t("แกร๊ก… แกร๊ก… อ้าว มีคนมองเห็นตาด้วย","Clank… clank… oh, someone can see me."),t("หลานตาได้จดหมายว่ามีมรดกสองล้าน ต้องจ่ายค่าปลดล็อกก่อน ตาไม่เคยมีเงินขนาดนั้นซะหน่อย","My grandson got a letter about a two-million inheritance with an unlock fee. I never had that kind of money!"),t("ช่วยหลานตาด้วย","Please help him.")],
    after:{safe:t("หมดห่วงแล้ว ตาไปละนะ","No more worries. I'll be off now."),warn:t("เสียไปนิดหน่อย แต่ก็หยุดทัน","Lost a little, but stopped in time."),danger:t("หลานตาหมดตัวแล้ว…","My grandson's lost everything…")} },
  tips:{ intro:[t("ชู่ว์… แป้งรอแฟนอยู่","Shh… I'm waiting for my boyfriend."),t("เขาเป็นวิศวกรแท่นขุดเจาะ ส่งของขวัญมาแต่ติดศุลกากร ผีไม่มีเงินจ่ายเลยติดอยู่ตรงนี้","He's an oil rig engineer. He sent a gift but it's stuck in customs. Ghosts have no money, so I'm stuck here."),t("ช่วยแป้งหน่อย","Help me?")],
    after:{safe:t("เลิกรอแล้ว ไปเที่ยวงานวัดดีกว่า!","I'm done waiting. Off to the temple fair!"),warn:t("แป้งไปละ แต่ขอแอบดูมือถือแป๊บ","I'm off, just a peek at my phone…"),danger:t("ยังรอเขาอยู่…","Still waiting for him…")} },
  friend:{ intro:[t("อ๊าก! คนเป็น! เอ้ย ไม่ใช่ คุณมาช่วยผมใช่ไหม","Argh! A living person! I mean… you're here to help me?"),t("หมอดูออนไลน์บอกว่าบ้านผมมีผี ต้องจ่ายค่าสะเดาะเคราะห์ 9,999","An online fortune teller says my house is haunted and I need a 9,999 ritual."),t("ผมกลัวผีมากเลย","I'm terrified of ghosts.")],
    after:{safe:t("ผีในบ้านก็คือผมเองนี่หว่า! ไปเปิดหน้าต่างดีกว่า","The ghost in this house is me! I'll go open the window."),warn:t("เข็ดหมอดูไปอีกร้อยปี","I'm done with fortune tellers for a century."),danger:t("ต้องทำอีกเจ็ดพิธี…","Seven more rituals…")} }
};
const SCRIPT6 = {
  friend:{ intro:[t("เจอโพสต์ทุนเรียนดี 20,000 บาท!","I found a 20,000-baht merit scholarship!"),t("เหลือแค่ 12 ที่ ต้องจ่ายค่ายืนยันสิทธิ์นิดหน่อยเอง","Only 12 places left, just a small confirmation fee.")],
    after:{safe:t("ทุนจริงไม่เก็บเงินเลยแฮะ สมัครผ่านเว็บมหาลัยแล้ว","Real scholarships are free. I applied on the uni site."),warn:t("ต้องคอยเช็กว่ามีใครเอาชื่อเราไปใช้ไหม","I have to keep checking nobody uses my name."),danger:t("ข้อมูลบัตรเราหลุดไปแล้ว…","My ID details are out there now…")} },
  tips:{ intro:[t("เมลจากฝ่าย IT บอกว่ากล่องจดหมายเต็ม","An email from IT says my mailbox is full."),t("ถ้าไม่ยืนยันภายใน 24 ชั่วโมง งานกลุ่มส่งไม่ได้แน่","If I don't verify in 24 hours, our group work won't go through.")],
    after:{safe:t("ฝ่าย IT ขอบคุณที่แจ้งด้วย เลยประกาศเตือนทั้งมหาลัย","IT thanked us and warned the whole university."),warn:t("เปลี่ยนรหัสทัน ยังดีที่ไม่กดอนุมัติ","Changed the password in time. Good thing nobody approved."),danger:t("มีเมลหลอกส่งออกจากบัญชีเราไปทั้งคณะ…","Phishing went out from my account to the whole faculty…")} },
  parent:{ intro:[t("มีคนโทรมาบอกว่าเจนลูกแม่ได้ทุน!","Someone called to say my Jen won a scholarship!"),t("แต่ต้องโอนค่าเปิดบัญชีภายในชั่วโมงนี้ แม่เลยรีบมา","But I have to pay a fee within the hour, so I rushed over.")],
    after:{safe:t("คณะประกาศเตือนแล้ว แม่บอกกลุ่มผู้ปกครองด้วย","The faculty posted a warning, and I told the parents' group."),warn:t("แม่ไม่โอนเพิ่มแล้ว แต่ต้องคอยระวังสายแปลกๆ","I won't pay any more, but I'm watching for strange calls."),danger:t("เงินค่าเทอมของเจน… แม่จะไปแจ้งความเดี๋ยวนี้","Jen's tuition money… I'm going to report it now.")}},
  paweena:{ intro:[t("ฮือ… เราแค่รับงานพาร์ทไทม์","Sob… I only took a part-time job."),t("เขาให้เปิดบัญชีให้บริษัท ตอนนี้บัญชีโดนอายัด แล้วพี่บอสก็ขู่เรา","They had me open accounts for a company. Now it's frozen and Boss is threatening me.")],
    after:{safe:t("ขอบคุณที่ไปเป็นเพื่อนนะ เราจะเล่าทุกอย่างให้ตำรวจฟัง","Thank you for coming with me. I'll tell the police everything."),warn:t("เราไปให้ปากคำแล้ว แต่แชตบางส่วนหายไป","I gave a statement, but some chats are gone."),danger:t("…","…")} },
  prof:{ intro:[t("มีคนปลอมเป็นครูในไลน์กลุ่ม","Someone's pretending to be me in the class LINE group."),t("เก็บเงินค่าชีทนักศึกษา ครูไม่เคยเก็บเลย","Collecting handout fees from students. I never charge for those.")],
    after:{safe:t("ประกาศในระบบเรียนแล้ว ไม่มีใครโดนเพิ่ม","It's on the learning system now. Nobody else got caught."),warn:t("บัญชีปลอมถูกปิดแล้ว แต่บางคนเสียเงินไป","The fake is closed, but some lost money."),danger:t("นักศึกษาโดนไปหลายคนเลย ครูเสียใจมาก","So many students were caught. I'm heartbroken.")} }
};
const SCRIPT7 = {
  grandpa:{ intro:[t("ตาโดนหลอกโอนไปสี่หมื่นเมื่อวาน","I was tricked out of forty thousand yesterday."),t("ลบแชตไปแล้วด้วย แจ้งความไปจะได้อะไรไหมเนี่ย","And I deleted the chat. Will reporting even help?")],
    after:{safe:t("อายัดบัญชีทัน ตามีโอกาสได้เงินคืนแล้ว","They froze the account in time. I might get my money back."),warn:t("แจ้งได้แล้ว ถึงจะช้าไปหน่อย","At least it's reported, even if a bit late."),danger:t("ตาเสียเงินสองรอบแล้ว…","I've lost money twice now…")} },
  visitor:{ intro:[t("ช่วยด้วย! จอโน้ตบุ๊กร้านเราเป็นสีแดงหมด","Help! My shop laptop screen has gone all red."),t("เขาบอกว่าไฟล์ทั้งหมดถูกล็อก และจะปล่อยข้อมูลลูกค้าถ้าไม่จ่าย","They say every file is locked, and they'll leak my customers' data unless I pay.")],
    after:{safe:t("กู้ไฟล์คืนได้หมด ไม่ต้องจ่ายสักบาท","Got everything back without paying a baht."),warn:t("เสียไฟล์ไปบางส่วน แต่ไม่ได้จ่ายค่าไถ่","Lost some files, but I didn't pay the ransom."),danger:t("จ่ายไปแล้วข้อมูลลูกค้าก็ยังหลุด…","I paid and the customer data leaked anyway…")} }
};
const scriptFor=(role)=>({0:SCRIPT0,2:SCRIPT2,3:SCRIPT3,4:SCRIPT4,5:SCRIPT5,6:SCRIPT6,7:SCRIPT7}[S.zone]||SCRIPT)[role];
const ZONE_INTRO = {
  6:[t("ถนนจากสี่แยกพาเรามาถึงมหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ","The road from the crossroads brings us to Huachiew Chalermprakiet University."),t("แก๊งเงาชอบเล็งนักศึกษา เพราะทุกคนออนไลน์ทั้งวัน และบางคนกำลังหาเงิน","The Shadow gang targets students: everyone's online all day, and some need money."),t("ได้ยินว่ามีนักศึกษาชื่อปวีณาเกี่ยวข้องด้วย ลองหาเธอดูนะ","I've heard a student called Paweena is mixed up in this. Try to find her.")],
  7:[t("นี่คือสถานีตำรวจ ฐานของพี่ภพ ตำรวจไซเบอร์","This is the police station, Phop's base. He's cyber police."),t("ที่นี่เราจะได้เรียนวิธีแจ้งความที่ถูกต้อง และเอาหลักฐานทั้งหมดมาส่ง","Here you'll learn how to report properly, and hand in all the evidence."),t("ช่วยคนให้ครบทุกที่ แล้วกลับมาคุยกับพี่ภพ เราจะบุกตึกแก๊งเงาด้วยกัน","Help everyone everywhere, then come back to Phop. We'll raid the Shadow gang's building together.")],
  2:[t("โซน 1 ห้องสมุดเมือง ที่นี่ใหญ่กว่าที่อื่น มีสองชั้น บันไดอยู่มุมขวาบน","Zone 2, the City Library. It's bigger than the others and has two floors. The stairs are top right."),t("คนเยอะ Wi-Fi ฟรี ปลั๊กฟรี คอมสาธารณะ มิจฉาชีพชอบที่แบบนี้มาก","Crowds, free Wi-Fi, free charging, public computers. Scammers love it here."),t("ป้ายที่บันไดจะบอกว่าอีกชั้นยังมีคนรอความช่วยเหลืออยู่กี่คน","The sign by the stairs shows how many people still need help on the other floor.")],
  5:[t("ขนลุกจัง… ที่นี่คือบ้านร้างในตรอก","Spooky… this is the abandoned house in the alley."),t("ผีที่นี่ก็โดนแก๊งหลอกเหมือนกัน เรื่องค้างคาใจเลยไปไหนไม่ได้","Even the ghosts here were scammed. With business left unfinished, they can't move on."),t("ช่วยผีให้ได้ไปต่อนะ พี่รอตรงประตูนี่แหละ ไม่เข้าไปลึกกว่านี้แล้ว","Help them move on. I'll wait right here by the door. I'm not going any further.")],
  4:[t("โซน 3 ร้านเน็ต NET ZONE เด็กๆ มาเล่นเกมที่นี่ทุกวัน","Zone 3, NET ZONE. Kids come here to game every day."),t("แก๊งเงาเริ่มหลอกเด็กในเกม ทั้งขายของนอกระบบ ยึดบัญชี และชวนให้ปิดเป็นความลับจากผู้ใหญ่","The Shadow gang has started targeting kids in games: off-platform sales, account theft, and asking them to keep secrets from adults."),t("ช่วยทั้งเด็กและผู้ปกครองนะ บางทีสิ่งที่ยากที่สุดคือช่วยให้เด็กกล้าเล่า","Help both the kids and their guardian. Sometimes the hardest part is helping a child feel safe to talk.")],
  3:[t("โซน 4 ธนาคาร ที่นี่เรื่องจริงจังขึ้นมาก","Zone 4, the bank. Things get serious here."),t("คนที่โดนหลอกมักถูกเร่งและถูกสั่งให้อยู่คนเดียว บางคนเดินมาถอนเงินสดไปให้คนร้ายถึงที่ บางคนโอนทีละหลายแสน","Victims are rushed and told to stay alone. Some come here to withdraw cash for the scammer, some wire hundreds of thousands."),t("ครั้งนี้คุณต้องช่วยคนอื่นที่กำลังตื่นตระหนก บางทีการช่วยที่ดีที่สุดคือทำให้เขาไม่อยู่คนเดียว","This time you're helping people in a panic. Sometimes the best help is making sure they're not alone.")]
};
function mentorIntro2(){
  return lines([
    t("ยินดีด้วย! มาถึงโซน 2 แล้ว ที่นี่คือร้านสะดวกซื้อ QuickMart ที่มีจุดรับพัสดุด้วย","Congrats, welcome to Zone 2! This is QuickMart, a store with a parcel point."),
    t("มิจฉาชีพชอบอ้างเรื่องพัสดุ ขนส่ง ซื้อขายออนไลน์ และงานเสริม โจทย์ที่นี่ยากขึ้นนะ","Scammers love parcels, couriers, online selling and side jobs. Things get harder here."),
    t("ไปโซนไหนก่อนก็ได้ แต่ต้องช่วยให้ครบทุกคนทุกโซนถึงจะได้ฉากจับแก๊ง และยิ่งเก็บ ★ ได้มาก ยิ่งจับได้ครบ","Visit the zones in any order, but help everyone in every zone to reach the final raid. The more ★ you collect, the more of the gang gets caught.")
  ]);
}
/* ---------- first-time game tour, told by the mentor ---------- */
function gameTour(){
  const m=npcs.find(n=>n.role==="mentor"), M=m?m.id:"guardGirl";
  const vic=()=>{ const vw=VW/Z, vh=VH/Z, inView=n=>n.x>camX+50&&n.x<camX+vw-50&&n.y-CHAR_H>camY+60&&n.y<camY+vh-40;
    const c=npcs.filter(x=>x.role!=="mentor"&&caseOf(x)).sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y));
    const n=c.find(inView)||c[0]; return n?{x:n.x-46,y:n.y-CHAR_H-30,w:92,h:CHAR_H+46}:null; };
  return [
    {who:M, t:["ยินดีต้อนรับ","Welcome"], d:["สวัสดี "+nm(S.char)+"! พี่ชื่อ"+PEOPLE[M].name.th+" อาสาสมัครไซเบอร์ ก่อนไปห้องสมุด พี่จะพาดูก่อนว่าเล่นยังไง","Hi "+nm(S.char)+"! I'm "+PEOPLE[M].name.en+", a cyber volunteer. Before you head to the library, let me show you how this works."]},
    {who:M, t:["คนที่ต้องการความช่วยเหลือ","People who need help"], d:["คนที่มีเครื่องหมาย ! บนหัว กำลังเจอเรื่องแปลกๆ เดินไปใกล้แล้วคุย จะเข้าสู่เคส ช่วยเขาตัดสินใจให้ถูก","Anyone with a ! over their head is facing something fishy. Walk up and talk to start a case, then help them choose well."]},
    TOUCH?{who:M, sel:"#joy", t:["การเดิน","Moving"], d:["แตะค้างตรงไหนก็ได้ทางซ้ายของจอแล้วลาก จอยจะโผล่ใต้นิ้ว หรือแตะที่พื้นเพื่อเดินไปตรงนั้น","Press and drag anywhere on the left of the screen and the joystick appears under your thumb. Or tap the floor to walk there."]}
         :{who:M, sel:"#keys", t:["การเดิน","Moving"], d:["เดินด้วย WASD หรือปุ่มลูกศร หรือคลิกที่พื้น พอเข้าใกล้ใครหรืออะไรก็ตาม กด E เพื่อคุยหรือใช้งาน","Walk with WASD or the arrow keys, or click the floor. Near someone or something? Press E to talk or use it."]},
    TOUCH?{who:M, sel:"#act", t:["ปุ่มทำงาน","Action button"], d:["ปุ่มขวาล่างจะเปลี่ยนตามสิ่งที่อยู่ใกล้ คุย เข้าร้าน ให้อาหารแมว หรือเล่นมินิเกม","The bottom-right button changes with what's nearby: talk, enter, feed the cat, play a mini-game."]}:null,
    {who:M, sel:"#bars", t:["หลอดสถานะและเงิน","Status bars & money"], d:["เงิน ความเป็นส่วนตัว และความไว้ใจ ขึ้นลงตามการตัดสินใจ เงิน 💵 ได้จากการช่วยคน เอาไปซื้อของที่ร้านหมอโฟน แต่ถ้าโดนหลอกเงินจะหายจริง","Money, privacy and trust rise and fall with your choices. Money 💵 comes from helping people and buy upgrades at Phone Dr., but scams really take it."]},
    {who:M, sel:"#prog", t:["คะแนนและแผนที่","Score & map"], d:["ดาวที่เก็บได้ในที่นี้ แตะเพื่อเปิดแผนที่ภารกิจ ดูว่าบทไหนเปิดแล้ว และยังเหลือใครต้องช่วย","Stars collected here. Tap it for the mission map: see which chapters are open and who still needs help."]},
    {who:M, sel:"#phoneBtn", t:["มือถือของคุณ","Your phone"], d:["จะมี SMS เด้งเข้ามาระหว่างเล่น ตัดสินว่าจริงหรือหลอก และระวัง Wi-Fi ฟรีในร้าน ถ้าต่อผิด มือถือจะโดนแฮก!","Messages arrive as you play: decide real or scam. And beware free Wi-Fi in the shops. Join the wrong one and your phone gets hacked!"]},
    {who:M, sel:"#boardBtn", t:["บอร์ดหลักฐาน","Evidence board"], d:["ทุกเคสที่ช่วยจนจบและลงมือแก้ในมือถือสำเร็จ จะได้เบาะแสหนึ่งชิ้น ยังมีเบาะแสซ่อนอยู่อีก มองหาเครื่องหมาย ? ในห้อง","Every case you finish, including the hands-on fix on the phone, gives a clue. More clues are hidden in rooms; look for the ? marks."]},
    {who:M, world:{x:372,y:560,w:120,h:70}, t:["ออกไปข้างนอก","Going outside"], d:["ประตูด้านล่างพาลงไปที่ถนน เดินลงไปจนถึงสี่แยก ห้องสมุดอยู่ทางซ้าย ซอย 2 ทางขวาไปสถานีตำรวจของพี่ภพ ที่อื่นจะเปิดเมื่อได้เบาะแสชี้ไป","The bottom door leads down to the street. Walk to the crossroads: the library is on the left, Soi 2 on the right goes to Phop's police station. Other places open as leads point to them."]},
    {who:M, sel:"#menuBtn", t:["เมนู","Menu"], d:["เปลี่ยนภาษา เปิดปิดเสียง เปิดสมุดกลโกง และดูทัวร์นี้ซ้ำได้ที่นี่","Change language, toggle sound, open the scam book, or replay this tour here."]},
    {who:M, t:["เป้าหมาย","The goal"], d:["ตามเบาะแสไปทีละที่ แล้วเอาไปส่งพี่ภพ ยิ่งมีเบาะแสมาก ตอนบุกยิ่งจับได้ครบ ฉากจบมี 3 แบบ จำสามคำ: หยุด คิด ตรวจสอบ","Follow the leads place by place and hand them to Phop. The more clues, the more of the gang gets caught. There are 3 endings. Remember: stop, think, check."]}
  ].filter(Boolean);
}
function startTour(){
  if(!S.prologue){ closeDlg(); openCutscene(L("บทนำ · แก๊งเงา","Prologue · The Shadow gang"), PROLOGUE(), ()=>{ S.prologue=true; save(); startTour(); }); return; }
  if(!S.briefed){ briefing(); return; }
  closeDlg(); closeSheet(); keys.clear(); target=null;
  startCoach(gameTour(), ()=>{ if(!S.intro){ S.intro=true; save(); setTimeout(zoneEvent,300); } hudKey=""; });
  // skipping still counts as having seen it
  const sk=coach&&coach.el.querySelector(".co-skip"); if(sk) sk.onclick=()=>{ const d=coach.done; endCoach(false); d&&d(); };
}
function briefing(){
  const p=npcs.find(n=>n.id==="police"); if(p) face(player,p);
  say("police", lines([t(`ยินดีที่ได้รู้จักนะ ${nm(S.char)} นี่โอ๊ต อาสาสมัครไซเบอร์ เขาจะคอยช่วยน้องตลอดทาง`,`Nice to meet you, ${nm(S.char)}. This is Oat, a cyber volunteer. He'll back you up the whole way.`),
    t("ทุกครั้งที่ช่วยคนได้ จะได้เบาะแสหนึ่งชิ้น เปิดดูได้ที่บอร์ดหลักฐาน","Each person you help gives you a clue. You can see them on the evidence board."),
    t("ในห้องต่างๆ อาจมีของแปลกๆ ซ่อนอยู่ ตรงไหนมีเครื่องหมาย ? ให้เดินไปดู เจอแล้วเอามาส่งพี่ที่สถานีตำรวจ","Odd things may be hidden in rooms. Walk to any ? mark, and bring what you find to me at the police station."),
    t("เริ่มที่ห้องสมุดเมืองก่อนเลย ออกประตูด้านล่างแล้วเดินลงไปที่สี่แยก ห้องสมุดอยู่ทางซ้าย","Start with the City Library. Go out the bottom door, walk down to the crossroads, and the library is on the left.")]),
    {onEnd:()=>{ S.briefed=true; save(); hudKey=""; buildCast(); startTour(); }});
}
function mentorIntro(){
  const n=npcs.find(x=>x.role==="mentor");
  return lines([
    t(`สวัสดี! พี่ชื่อ${nm(n.id)} จากทีมการ์ดไซเบอร์`,`Hi! I'm ${nm(n.id)} from the Cyber Guard team.`),
    t("วันนี้ที่ร้าน Bean House มีหลายคนเจอเรื่องแปลกๆ เกี่ยวกับมือถือกับอินเทอร์เน็ต ช่วยพี่ดูแลหน่อยนะ","Today at Bean House, several people have run into strange things on their phones and the internet. Help me look after them."),
    TOUCH?t("ใช้จอยสติ๊กซ้ายล่างเพื่อเดิน หรือแตะที่พื้น พอเข้าใกล้ใครให้กดปุ่ม \"คุย\"","Use the joystick at the bottom left or tap the floor to walk. When you're close to someone, press \"Talk\".")
         :t("ใช้ WASD หรือปุ่มลูกศรเพื่อเดิน หรือคลิกที่พื้น พอเข้าใกล้ใครให้กด E","Walk with WASD or the arrow keys, or click the floor. When you're close to someone, press E."),
    t("คนที่มีเครื่องหมาย ! ต้องการความช่วยเหลือ ทุกการตัดสินใจมีผลกับหลอดด้านบน: เงิน ความเป็นส่วนตัว และความไว้ใจ","People with a ! need help. Every decision affects the bars at the top: money, privacy and trust."),
    t("ประตูด้านล่างพาออกไปที่ถนน ข้างนอกมีร้านอื่นเปิดรออยู่ ไปช่วยที่ไหนก่อนก็ได้ แต่ต้องช่วยให้ครบทุกที่ถึงจะได้ฉากจบ","The door at the bottom leads to the street. Other shops are open; help in any order, but finish everywhere to reach the ending."),
    t("ช่วงนี้มีแก๊งมิจฉาชีพแก๊งหนึ่งออกอาละวาดทั้งเมือง พี่เรียกมันว่า \"แก๊งเงา\" ทุกครั้งที่ช่วยคนได้ จะได้หลักฐานไปติดบอร์ดสืบสวน","A scam gang is working this whole town. I call them the \"Shadow gang\". Every time you help someone, you'll get evidence for the investigation board."),
    t("จำไว้สามคำ: หยุด คิด ตรวจสอบ ไปลุยกันเลย!","Remember three words: stop, think, check. Let's go!")
  ]);
}

/* ---------- talking ---------- */
function interact(){ const n=nearest(); const sp=nearSpot(); if(sp && (!n || Math.hypot(sp.x-player.x,sp.y-player.y)<Math.hypot(n.x-player.x,n.y-player.y))){ collectSpot(sp); return; } if(n){ face(player,n); talkTo(n); return; } if(nearKiosk()){ openArcade(); return; } if(nearCat()){ feedCat(); return; } if(nearBirds()){ feedBirds(); return; } if(nearHQ()){ hqT=0; tryHQ(); return; } if(nearRepair()){ openRepair(); return; } if(nearVillain()){ talkVillain(); return; } const d=nearDoor(); if(d) tryEnter(d); }
function nearKiosk(){ return S.zone===0 && S.char && Math.hypot(player.x-KIOSK.x,player.y-(KIOSK.y+18))<58; }
function nearDoor(){ if(S.zone!==0||!S.char) return null; return BUILDINGS.find(b=>Math.abs(player.x-b.door)<46 && player.y<300) || null; }
let lockToastT=0;
function tryEnter(b){
  if(b.closed){ player.y=Math.max(player.y,282); target=null; targetNpc=null; keys.clear(); if(performance.now()-lockToastT<1500) return; lockToastT=performance.now(); toast(L("ร้านนี้ปิดปรับปรุงอยู่","This shop is closed for renovation")); return; }
  if(b.alley ? (b.soi || ghostOpen()) : (!b.soon && zoneOpen(b.zone))){ enterZone(b.zone); return; }
  if(b.alley){ player.y=Math.max(player.y,282); target=null; targetNpc=null; keys.clear(); if(performance.now()-lockToastT<1500) return; lockToastT=performance.now(); toast(lockMsg(5)); return; }
  player.y=Math.max(player.y,282); target=null; targetNpc=null; keys.clear();
  if(performance.now()-lockToastT<1500) return; lockToastT=performance.now();
  toast(b.soon ? L("ยังไม่เปิด","Not open yet") : lockMsg(b.zone));
}
/* the university front: a picture by the author (the old SVG scene below is kept as a fallback) */
/* the university front, drawn as an SVG scene (no image files) */
function hcuSVG(){
  const ink="#3A2A22", br="#E8906F", brD="#CF7457", brL="#F2A688", win="#5F7C8C", winL="#BFE0EE";
  const cloud=(x,y,s,cls)=>`<g class="${cls}" transform="translate(${x} ${y}) scale(${s})"><path d="M0 60 Q0 20 45 22 Q60 -8 105 6 Q140 -6 160 26 Q205 22 205 60 Z" fill="#fff" stroke="${ink}" stroke-width="0" opacity=".97"/></g>`;
  const tree=(x,y,s)=>`<g class="tree" transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="0" width="10" height="34" fill="#8A5A33" stroke="${ink}" stroke-width="3"/><ellipse cx="0" cy="40" rx="26" ry="6" fill="rgba(0,0,0,.12)"/><g class="leaf"><circle cx="0" cy="-22" r="26" fill="#3FA85A" stroke="${ink}" stroke-width="4"/><circle cx="-16" cy="-6" r="17" fill="#3FA85A" stroke="${ink}" stroke-width="4"/><circle cx="16" cy="-6" r="17" fill="#3FA85A" stroke="${ink}" stroke-width="4"/><circle cx="0" cy="-12" r="20" fill="#3FA85A"/><circle cx="-8" cy="-28" r="7" fill="#6CC77F"/></g></g>`;
  const rowWins=(x,y,w,n,h)=>{ let s=""; const gap=w/n; for(let i=0;i<n;i++) s+=`<rect x="${x+i*gap+5}" y="${y}" width="${gap-10}" height="${h}" rx="2" fill="${win}" stroke="${ink}" stroke-width="3"/><rect x="${x+i*gap+9}" y="${y+4}" width="${(gap-18)*.35}" height="${h-8}" fill="${winL}" opacity=".55"/>`; return s; };
  const band=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${win}" stroke="${ink}" stroke-width="3"/><rect x="${x+6}" y="${y+4}" width="${w*.25}" height="${h-8}" fill="${winL}" opacity=".45"/>`;
  const student=(cls,c1,c2,hair)=>`<g class="${cls}"><ellipse cx="0" cy="46" rx="10" ry="3" fill="rgba(0,0,0,.18)"/><rect x="-7" y="22" width="5" height="22" rx="2" fill="${ink}"/><rect x="2" y="22" width="5" height="22" rx="2" fill="${ink}" class="legb"/><path d="M-10 4 h20 v20 h-20z" fill="${c1}" stroke="${ink}" stroke-width="2.5"/><path d="M-10 18 h20 v8 h-20z" fill="${c2}" stroke="${ink}" stroke-width="2.5"/><circle cx="0" cy="-6" r="10" fill="#F6D6B8" stroke="${ink}" stroke-width="2.5"/><path d="M-10 -8 Q-9 -18 0 -17 Q10 -18 10 -8 Q4 -12 -10 -8Z" fill="${hair}" stroke="${ink}" stroke-width="2"/></g>`;
  return `<svg class="hcu-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Huachiew Chalermprakiet University">
  <defs><linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7EC3F2"/><stop offset="1" stop-color="#CDEBFF"/></linearGradient>
  <linearGradient id="hlawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CD46B"/><stop offset="1" stop-color="#7DBE52"/></linearGradient></defs>
  <rect width="1600" height="900" fill="url(#hsky)"/>
  <circle cx="1380" cy="120" r="54" fill="#FFE27A" opacity=".9"/>
  ${cloud(70,90,1.2,"cl c1")}${cloud(520,250,.65,"cl c2")}${cloud(1240,150,1.05,"cl c3")}
  <!-- far left wing (perspective) -->
  <path d="M0 355 L170 375 L170 640 L0 700 Z" fill="${br}" stroke="${ink}" stroke-width="5"/>
  <path d="M0 430 L170 440 L170 470 L0 465Z" fill="${win}" stroke="${ink}" stroke-width="4"/><path d="M0 535 L170 530 L170 560 L0 570Z" fill="${win}" stroke="${ink}" stroke-width="4"/>
  <!-- left block -->
  <path d="M170 380 L275 385 L275 372 L390 392 L390 610 L170 640 Z" fill="${br}" stroke="${ink}" stroke-width="5"/>
  ${band(185,445,85,30)}${band(185,515,85,30)}<rect x="315" y="440" width="58" height="26" fill="${winL}" stroke="${ink}" stroke-width="3"/><rect x="315" y="505" width="58" height="26" fill="${winL}" stroke="${ink}" stroke-width="3"/><rect x="315" y="570" width="58" height="24" fill="${win}" stroke="${ink}" stroke-width="3"/>
  <!-- connector left -->
  <rect x="390" y="415" width="140" height="185" fill="${brD}" stroke="${ink}" stroke-width="5"/>${band(398,445,124,26)}${band(398,500,124,26)}${band(398,555,124,26)}
  <!-- main block -->
  <rect x="530" y="405" width="540" height="195" fill="${br}" stroke="${ink}" stroke-width="5"/>
  ${rowWins(620,430,130,1,26)}${rowWins(620,480,130,1,26)}${rowWins(620,530,130,1,26)}${rowWins(850,430,130,1,26)}${rowWins(850,480,130,1,26)}${rowWins(850,530,130,1,26)}
  <!-- small towers -->
  <path d="M550 400 L550 600 L615 600 L615 400 L582 378 Z" fill="${brL}" stroke="${ink}" stroke-width="5"/><rect x="574" y="408" width="14" height="28" rx="6" fill="${ink}"/><rect x="570" y="460" width="22" height="22" fill="${ink}"/><rect x="570" y="515" width="22" height="22" fill="${ink}"/>
  <path d="M985 400 L985 600 L1050 600 L1050 400 L1017 378 Z" fill="${brL}" stroke="${ink}" stroke-width="5"/><rect x="1010" y="408" width="14" height="28" rx="6" fill="${ink}"/><rect x="1006" y="460" width="22" height="22" fill="${ink}"/><rect x="1006" y="515" width="22" height="22" fill="${ink}"/>
  <!-- central tower -->
  <path d="M705 600 L705 235 L800 168 L895 235 L895 600 Z" fill="${br}" stroke="${ink}" stroke-width="6"/>
  <path d="M785 200 L800 212 L815 200" fill="none" stroke="${brD}" stroke-width="5" stroke-linecap="round"/>
  <text x="800" y="262" text-anchor="middle" font-family="'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif" font-weight="800" font-size="30" fill="${ink}">หัวเฉียว</text>
  <text x="800" y="298" text-anchor="middle" font-family="'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif" font-weight="800" font-size="24" fill="${ink}">เฉลิมพระเกียรติ</text>
  <rect x="740" y="318" width="120" height="104" fill="${brD}" stroke="${ink}" stroke-width="5"/><rect x="750" y="328" width="100" height="34" fill="${winL}" stroke="${ink}" stroke-width="3"/><rect x="750" y="378" width="100" height="34" fill="${winL}" stroke="${ink}" stroke-width="3"/>
  ${band(735,440,130,26)}${band(735,490,130,26)}
  <path d="M760 600 Q800 556 840 600 Z" fill="#3FA85A" stroke="${ink}" stroke-width="4"/>
  <!-- connector right -->
  <rect x="1070" y="415" width="140" height="185" fill="${brD}" stroke="${ink}" stroke-width="5"/>${band(1078,445,124,26)}${band(1078,500,124,26)}${band(1078,555,124,26)}
  <!-- right blocks -->
  <path d="M1210 405 L1330 400 L1330 600 L1210 600 Z" fill="${br}" stroke="${ink}" stroke-width="5"/>${band(1225,440,90,24)}${band(1225,495,90,24)}${band(1225,550,90,24)}
  <path d="M1330 395 L1510 388 L1510 600 L1330 600 Z" fill="${br}" stroke="${ink}" stroke-width="5"/>${band(1345,440,150,24)}${band(1345,495,90,24)}
  <path d="M1510 375 L1600 368 L1600 600 L1510 600 Z" fill="${brD}" stroke="${ink}" stroke-width="5"/>
  <!-- lawn + walkway -->
  <path d="M0 700 L170 640 L390 610 L1600 600 L1600 900 L0 900 Z" fill="url(#hlawn)" stroke="${ink}" stroke-width="5"/>
  <path d="M760 600 L840 600 L1010 900 L590 900 Z" fill="#E9DDC7" stroke="${ink}" stroke-width="4"/>
  <path d="M800 610 L800 900" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="22 18" opacity=".8"/>
  <!-- glass building, right foreground -->
  <path d="M1440 520 L1600 498 L1600 690 L1440 650 Z" fill="${br}" stroke="${ink}" stroke-width="5"/>
  <path d="M1460 528 L1600 510 L1600 640 L1460 620 Z" fill="#D9F0FA" stroke="${ink}" stroke-width="4"/>
  <path d="M1495 524 L1495 625 M1530 519 L1530 630 M1565 514 L1565 635 M1460 560 L1600 548" stroke="${ink}" stroke-width="3"/>
  <path d="M1462 600 Q1530 585 1598 600 L1598 640 L1462 620Z" fill="#6CC77F" opacity=".6"/>
  ${tree(190,650,1.25)}${tree(530,560,.95)}${tree(1150,565,.95)}${tree(1420,640,1.15)}${tree(80,780,.9)}
  ${[[300,740],[640,690],[1050,700],[1300,800],[120,860],[1500,860]].map(([x,y])=>`<path d="M${x} ${y} l-6 -14 M${x+10} ${y} l0 -16 M${x+20} ${y} l6 -14" stroke="#4E9A3A" stroke-width="5" stroke-linecap="round"/>`).join("")}
  <g transform="translate(700 760)">${student("st s1","#FFFFFF","#22344A","#3B2A20")}</g>
  <g transform="translate(905 700) scale(.85)">${student("st s2","#FFFFFF","#3B3B3B","#2A1A12")}</g>
  </svg>`;
}
let arriving=false;
function enterZone(z){ if(z===6) return showArrive(()=>goZone(6)); goZone(z); }
/* the university's front gate, shown before you walk in */
function showArrive(go){
  arriving=true; keys.clear(); target=null; targetNpc=null;
  const el=document.createElement("div"); el.className="arrive"; el.setAttribute("role","dialog");
  const first=!S.seen[6];
  el.innerHTML=`<div class="ar-img"><img class="ar-photo" src="${UNI_FRONT}" alt="${L("หน้ามหาวิทยาลัย","The university front")}"></div><div class="ar-shade"></div>
    <div class="ar-box"><small>${L("ถนนจากสี่แยก","From the crossroads")}</small><b>${L("มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ","Huachiew Chalermprakiet University")}</b>
    <p>${first?L("ได้ยินว่ามีนักศึกษาหลายคนโดนแก๊งเงาหลอก… และมีคนชื่อปวีณาเกี่ยวข้องด้วย","Word is the Shadow gang has been targeting students here… and someone called Paweena is involved."):L("กลับมาที่มหาวิทยาลัยอีกครั้ง","Back at the university.")}</p>
    <div class="ar-btns"><button class="btn g" data-back><span>${L("กลับไปที่ถนน","Back to the street")}</span></button><button class="btn y" data-in><span>🚶 ${L("เดินเข้าไป","Walk in")}</span></button></div></div>`;
  document.body.appendChild(el); sfx("ping");
  const done=(enter)=>{ if(!arriving) return; arriving=false; el.classList.add("out"); setTimeout(()=>el.remove(),350); if(enter) go(); else { player.y=Math.max(player.y,300); } };
  el.querySelector("[data-in]").onclick=()=>done(true);
  el.querySelector("[data-back]").onclick=()=>done(false);
  el.querySelector("[data-in]").focus();
}
/* a freed ghost floats up into the light and leaves the map */
function startAscend(n){
  n.ascend=0.001; sfx("ev");
  toast(L(`${nm(n.id)} ไปสู่สุคติแล้ว ✨`,`${nm(n.id)} has moved on ✨`));
  const iv=setInterval(()=>{ n.ascend+=0.03; if(n.ascend>=2){ clearInterval(iv); npcs=npcs.filter(x=>x!==n);
    if(ZONES[5].cases.every(k=>S.best[k] && S.best[k]!=="danger")) setTimeout(()=>toast(L("บ้านผีสิงสงบแล้ว ผีทุกตนได้ไปต่อแล้ว ขอบคุณนะ","The haunted house is at peace. Every ghost has moved on. Thank you!")),400); } },30);
}
/* bank: grandma runs up to you in a panic */
let rush=null;
/* timed events: someone is about to make a mistake, get there first */
const URGENT={1:{role:"grandma",cid:"qr",secs:45,say:{th:"สแกนเลยดีกว่า…",en:"I'll just scan it…"},start:{th:"ยายศรีกำลังจะสแกน QR บนโต๊ะ! ไปให้ทันก่อนหมดเวลา",en:"Grandma Sri is about to scan the table QR! Get there in time"},late:{th:"ไม่ทัน! ยายสแกนจ่ายไปแล้ว",en:"Too late! Grandma already scanned and paid"}},
  4:{role:"friend",cid:"topup",secs:45,say:{th:"ใส่รหัสเลยดีกว่า…",en:"I'll just type the code…"},start:{th:"ภูมิกำลังจะใส่รหัสในเว็บเติมเพชรลด 70%! ไปคุยก่อนหมดเวลา",en:"Phum is about to type his code into a 70%-off diamond site! Talk to him in time"},late:{th:"ไม่ทัน! ภูมิใส่รหัสไปแล้ว ไอดีถูกยึด",en:"Too late! Phum typed the code and lost his account"}},
  2:{role:"grandma",cid:"leak",secs:50,say:{th:"เปลี่ยนแค่เว็บไหมพรมพอ…",en:"I'll just change the yarn shop one…"},start:{th:"ป้าแดงโดนเตือนว่ามีคนพยายามเข้าบัญชี! ไปช่วยก่อนหมดเวลา",en:"Auntie Daeng's accounts are under attack! Get there in time"},late:{th:"ไม่ทัน! เฟซบุ๊กป้าแดงถูกยึดไปแล้ว",en:"Too late! Auntie Daeng's Facebook has been taken"}}};
let urgent=null;
function startUrgent(){
  const u=URGENT[S.zone]; if(!u || S.best[u.cid] || S.late[u.cid]) return false;
  const n=npcs.find(x=>x.role===u.role); if(!n) return false;
  urgent={n, cid:u.cid, t:u.secs, total:u.secs, u};
  toast(u.start[S.lang]); return true;
}
function stepUrgent(dt){
  if(!urgent || busy()) return;
  if(S.best[urgent.cid]){ urgent=null; return; }
  urgent.t-=dt;
  if(urgent.t<=0){ S.late[urgent.cid]=true; save(); toast(urgent.u.late[S.lang]); urgent=null; hudKey=""; }
}
function drawUrgent(g,now){
  if(!urgent) return;
  const n=urgent.n, f=Math.max(0,urgent.t/urgent.total), y=n.y-CHAR_H-30;
  g.save();
  // speech + countdown bar
  g.font="700 12px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; const s=urgent.u.say[S.lang]; const tw=Math.max(84,g.measureText(s).width+18);
  rr(g,n.x-tw/2,y-20,tw,24,6); g.fillStyle="#FFFFFF"; g.fill(); g.lineWidth=2.5; g.strokeStyle=INK; g.stroke();
  g.fillStyle=INK; g.textAlign="center"; g.textBaseline="middle"; g.fillText(s,n.x,y-8);
  rr(g,n.x-tw/2,y+8,tw,9,4); g.fillStyle="#FFFFFF"; g.fill(); g.stroke();
  g.fillStyle=f<.3?"#E5402F":f<.6?"#FF5A1F":"#FFC414"; rr(g,n.x-tw/2+2,y+10,(tw-4)*f,5,2); g.fill();
  g.font="800 11px 'Noto Sans Thai', 'Sukhumvit Set', Thonburi, 'Leelawadee UI', Tahoma, sans-serif"; g.fillStyle=f<.3?"#E5402F":INK; g.fillText(Math.ceil(urgent.t)+"s",n.x+tw/2+14,y+12);
  // ring on the floor pulses
  if(!RM){ g.globalAlpha=.5+.5*Math.sin(now/120); g.beginPath(); g.ellipse(n.x,n.y,26,9,0,0,7); g.strokeStyle="#E5402F"; g.lineWidth=3; g.stroke(); }
  g.restore();
}
function zoneEvent(){
  if(S.zone===1 || S.zone===2 || S.zone===4){ startUrgent(); return; }
  if(S.zone!==3 || S.best.rush) return;
  const g=npcs.find(n=>n.role==="grandma"); if(!g) return;
  rush={n:g, t:0};
  toast(L("ยายศรีวิ่งเข้ามา!","Grandma Sri is running over!"));
}
function stepRush(dt){
  if(!rush) return;
  const n=rush.n, dx=player.x-n.x, dy=player.y-n.y, d=Math.hypot(dx,dy);
  rush.t+=dt;
  if(d<54 || rush.t>4){ n.moving=false; n.home="down"; face(n,player); face(player,n); const r=rush; rush=null; if(!busy()) talkTo(r.n); return; }
  const sp=290*dt; n.x+=dx/d*sp; n.y+=dy/d*sp; n.moving=true; n.t=(n.t||0)+dt*1.4;
  n.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?"left":"right"):(dy<0?"up":"down");
}
