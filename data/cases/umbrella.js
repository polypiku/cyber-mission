/* Rainy-day street cases. When it first rains and you have no umbrella, one of these is picked at random;
   help that person and they give you their umbrella. Each belongs to someone who stands on the street. */
const UMB_CASES={u_parcel:"fon", u_alert:"grandpa", u_shop:"grandma"};
(function(){
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const notif=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;
const X=(i,th,en)=>i?en:th;
const D={
u_parcel:{title:["พัสดุของใช้เด็กติดพายุ","Baby things stuck in the storm"],
 learn:[["SMS พัสดุปลอม","Fake parcel texts"],["ขนส่งจริงไม่ขอค่าส่งเพิ่มผ่านลิงก์","Real couriers don't ask for fees by link"],["เช็กเลขพัสดุในแอปขนส่งเอง","Check tracking in the courier's own app"]],
 scenes:{
  s1:{title:["SMS: พัสดุล่าช้าเพราะพายุ","Text: parcel delayed by storm"],
   body:i=>`<p>${X(i,"พี่ฝนยืนหลบฝนใต้ร่ม มือถือสั่น “พี่สั่งของใช้ลูกไว้ รอมาสามวันแล้ว”","Fon shelters under her umbrella as her phone buzzes. “I ordered things for the baby. It's been three days.”")}</p>
   ${notif([X(i,"📩 ไปรษณีย์: พัสดุของท่านล่าช้าเนื่องจากพายุ กรุณาชำระค่าจัดส่งใหม่ 25 บาท ภายในวันนี้ thpost-redeliver.top","📩 Post: your parcel is delayed by the storm. Pay a 25-baht redelivery fee today: thpost-redeliver.top")])}`,
   clues:[["ลิงก์ไม่ใช่เว็บไปรษณีย์จริง","The link isn't the real post office site"],["แค่ 25 บาท เพื่อให้ไม่ทันคิด","Only 25 baht, so you don't stop to think"],["ใช้ข่าวพายุมาทำให้ดูน่าเชื่อ","Uses the storm to sound believable"]],
   choices:[["เอาเลขพัสดุจากแอปร้านค้า ไปเช็กในแอปไปรษณีย์ไทยเอง","Take the tracking number from the shop app and check it in the official post app","s2a","good"],
            ["กดลิงก์ดูเฉยๆ ก่อน ยังไม่จ่าย","Just open the link to look, without paying","s2b","risky"],
            ["จ่าย 25 บาทให้จบ ของลูกจะได้มาไว","Pay the 25 baht so the baby things come quickly","E3","bad"]]},
  s2a:{title:["พัสดุจริงไม่ได้ติดอะไร","The real parcel is fine"],
   body:i=>`<p>${X(i,"แอปไปรษณีย์บอกว่าพัสดุ “กำลังนำจ่าย” พรุ่งนี้ ไม่มีค่าส่งเพิ่ม พี่ฝนถอนหายใจ","The post app says the parcel is “out for delivery” tomorrow with no extra fee. Fon breathes out.")}</p>`,
   clues:[["ดูสถานะจากแอปทางการเท่านั้น","Only trust the official app's status"],["รายงาน SMS หลอกได้","Fake texts can be reported"],["บอกคนรอบตัวที่สั่งของออนไลน์","Warn people who shop online"]],
   choices:[["ลบ SMS แล้วรายงานว่าเป็นข้อความหลอก","Delete the text and report it as a scam","E1","good"],
            ["เก็บ SMS ไว้ก่อน เผื่อพัสดุมาไม่ถึงจริง","Keep the text in case the parcel really doesn't come","E2","risky"],
            ["ส่งต่อลิงก์ให้แม่ เผื่อแม่มีพัสดุค้างด้วย","Forward the link to her mum in case she has a parcel too","E3","bad"]]},
  s2b:{title:["หน้าเว็บขอเลขบัตร","The page asks for a card"],
   body:i=>`<p>${X(i,"หน้าเว็บมีโลโก้ไปรษณีย์ ช่องให้กรอกเลขบัตร วันหมดอายุ และรหัส 3 หลักหลังบัตร","The page has the post office logo and boxes for card number, expiry date and the 3-digit code on the back.")}</p>`,
   clues:[["ขอข้อมูลบัตรครบชุด","Asks for full card details"],["25 บาทเป็นเหยื่อล่อเอาเลขบัตร","25 baht is bait for the card number"],["ยังไม่ได้กรอก = ยังไม่สาย","Nothing typed yet = not too late"]],
   choices:[["ปิดหน้าเว็บ ไม่กรอกอะไร แล้วไปเช็กในแอปไปรษณีย์","Close the page without typing anything and check the post app","s2a","good"],
            ["กรอกแต่เลขบัตร ไม่ใส่รหัสหลังบัตร","Type only the card number, not the back code","E2","risky"],
            ["กรอกครบแล้วจ่าย","Fill everything in and pay","E3","bad"]]}
 },
 endings:{
  E1:["safe",["ของมาถึงพรุ่งนี้ ไม่เสียสักบาท","It arrives tomorrow, not a baht lost"],["พี่ฝนรายงาน SMS แล้วเล่าให้กลุ่มคุณแม่ฟัง ทุกคนระวังกันมากขึ้น","Fon reported the text and told her mums' group, and everyone is more careful now."],[["เช็กพัสดุในแอปทางการ","Check parcels in the official app"],["ขนส่งไม่ขอค่าส่งผ่านลิงก์","Couriers don't charge by link"],["รายงาน SMS หลอก","Report scam texts"]]],
  E2:["warn",["รอดไปหวุดหวิด","A narrow escape"],["ไม่ได้เสียเงิน แต่ข้อมูลบางส่วนหลุดไปแล้ว หรือข้อความหลอกยังค้างอยู่ให้กดพลาดได้อีก","No money gone, but some details leaked, or the scam text is still there to tap by mistake."],[["ข้อมูลบัตรครึ่งเดียวก็อันตราย","Half your card details is still dangerous"],["อย่าเก็บข้อความหลอกไว้","Don't keep scam texts"],["โทรอายัดบัตรถ้ากรอกไปแล้ว","Call to block the card if you typed it"]]],
  E3:["danger",["บัตรโดนรูดหมดวงเงิน","The card got maxed out"],["ไม่กี่นาทีหลังจ่าย 25 บาท บัตรถูกรูดซื้อของออนไลน์หลายหมื่นบาท","Minutes after paying 25 baht, the card was charged tens of thousands online."],[["ลิงก์ใน SMS = อย่ากด","Links in texts = don't tap"],["เงินน้อยก็เป็นกับดักได้","Small amounts can be traps"],["อายัดบัตรทันทีถ้าพลาด","Block the card right away if you slip"]]]
 }},
u_alert:{title:["แจ้งเตือนพายุจากไลน์ “กรมอุตุฯ”","A storm warning from “Met Dept” on LINE"],
 learn:[["แอปปลอมที่อ้างหน่วยงานรัฐ","Fake apps claiming to be government"],["หน่วยงานรัฐไม่แจกเงินผ่านแอปในไลน์","Agencies don't pay out through LINE apps"],["ลงแอปจากสโตร์เท่านั้น","Install apps from the store only"]],
 scenes:{
  s1:{title:["ลงทะเบียนรับเงินชดเชยพายุ","Sign up for storm compensation"],
   body:i=>`<p>${X(i,"ตาบุญยืนใต้กันสาด ยื่นมือถือให้ดู “ไลน์กรมอุตุฯ เพิ่งแอดมา บอกว่าพายุเข้า ให้ลงแอปรับเงินชดเชยครัวเรือนละ 3,000”","Grandpa Boon stands under an awning and shows you his phone. “The Met Department just added me on LINE. They say a storm's coming and I can get 3,000 baht per household through their app.”")}</p>
   ${chat("☁️",X(i,"กรมอุตุฯ แจ้งเตือนภัย","Met Dept Alerts"),"LINE",[X(i,"⚠️ พายุเข้า! ลงแอป “TMD Aid” รับเงินชดเชย 3,000 บาท ภายใน 24 ชม.","⚠️ Storm alert! Install “TMD Aid” to claim 3,000 baht within 24 hours"),X(i,"📎 TMD-Aid.apk","📎 TMD-Aid.apk")])}`,
   clues:[["หน่วยงานรัฐไม่แอดไลน์มาหาเอง","Agencies don't add you on LINE"],["ไฟล์ .apk นอกสโตร์","An .apk file outside the store"],["ให้เวลาแค่ 24 ชม.","Only 24 hours"]],
   choices:[["บอกตาว่าอย่าเพิ่งลง แล้วเช็กข่าวจากเว็บกรมอุตุฯ จริงด้วยกัน","Tell him not to install yet, and check the real Met Department site together","s2a","good"],
            ["ลงแอปแต่ไม่ให้สิทธิ์อะไรเลย","Install it but refuse every permission","s2b","risky"],
            ["ลงเลย ได้ตั้ง 3,000","Install it, it's 3,000 baht","E3","bad"]]},
  s2a:{title:["ไม่มีเงินชดเชยแบบนี้","There's no such payment"],
   body:i=>`<p>${X(i,"เว็บกรมอุตุฯ จริงมีแค่ประกาศเตือนฝนตกหนัก ไม่มีเงินชดเชยผ่านแอป แถมมีประกาศเตือนเรื่องแอปปลอมด้วย","The real Met Department site only has a heavy-rain warning, no payments through any app, and a notice warning about fake apps.")}</p>`,
   clues:[["เช็กจากเว็บทางการ","Check the official site"],["บล็อกและรายงานบัญชีปลอม","Block and report the fake account"],["เตือนเพื่อนวัยเดียวกัน","Warn friends his age"]],
   choices:[["ลบไฟล์ บล็อกและรายงานบัญชีไลน์นั้น","Delete the file, block and report the LINE account","E1","good"],
            ["บล็อกอย่างเดียว ไม่ต้องรายงาน","Just block it, no need to report","E2","risky"],
            ["ส่งต่อให้เพื่อนในชมรม เผื่อเขาได้เงิน","Forward it to his club friends in case they qualify","E3","bad"]]},
  s2b:{title:["แอปขอสิทธิ์ช่วยเหลือพิเศษ","The app wants accessibility access"],
   body:i=>`<p>${X(i,"แอปเด้งขึ้นมา “เปิดสิทธิ์การช่วยเหลือพิเศษเพื่อยืนยันตัวตน” ไม่ให้กดข้าม","The app pops up: “Turn on accessibility access to verify your identity.” There's no skip button.")}</p>`,
   clues:[["สิทธิ์นี้ควบคุมเครื่องได้ทั้งหมด","This permission can control the whole phone"],["ไม่ให้ข้าม = บังคับ","No skip = forced"],["ยังถอนการติดตั้งได้","It can still be uninstalled"]],
   choices:[["ถอนการติดตั้งแอปทันที แล้วไปเช็กเว็บกรมอุตุฯ","Uninstall it right away and check the Met Department site","s2a","good"],
            ["เปิดสิทธิ์แป๊บเดียวแล้วค่อยปิด","Turn it on briefly, then off again","E3","risky"],
            ["เปิดสิทธิ์ตามที่ขอ","Turn it on as asked","E3","bad"]]}
 },
 endings:{
  E1:["safe",["ตาไม่เสียอะไรเลย","Grandpa lost nothing"],["ตาบุญรายงานบัญชีปลอม แล้วไปเล่าให้เพื่อนในชมรมฟัง","Grandpa Boon reported the fake account and told his club."],[["รัฐไม่แจกเงินผ่านไลน์","The government doesn't pay out via LINE"],["อย่าลงไฟล์ .apk","Don't install .apk files"],["เช็กข่าวจากเว็บทางการ","Check news on official sites"]]],
  E2:["warn",["รอด แต่คนอื่นยังโดนได้","Safe, but others could still fall for it"],["ตาปลอดภัย แต่บัญชีปลอมยังส่งข้อความหาคนอื่นต่อ","Grandpa is safe, but the fake account keeps messaging others."],[["รายงานช่วยคนอื่นด้วย","Reporting protects others"],["ลงแอปปลอมแล้วรีบถอน","Uninstall fake apps fast"],["บอกลูกหลานให้ช่วยดู","Ask family to double-check"]]],
  E3:["danger",["แอปดูดเงินบำนาญ","The app drained his pension"],["แอปควบคุมเครื่องแล้วโอนเงินบำนาญของตาออกไปขณะที่จอขึ้นว่ากำลังลงทะเบียน","The app took over the phone and moved his pension out while the screen said “registering”."],[["สิทธิ์ช่วยเหลือพิเศษอันตรายมาก","Accessibility access is very dangerous"],["อย่าส่งต่อแอปปลอม","Don't forward fake apps"],["ถ้าพลาด ตัดเน็ตแล้วโทรธนาคาร","If it happens, cut the internet and call the bank"]]]
 }},
u_shop:{title:["เพจล้างสต๊อกเสื้อกันฝน ลด 90%","A rainwear page: 90% off"],
 learn:[["ร้านออนไลน์ปลอม","Fake online shops"],["ลดราคาเกินจริง + โอนก่อน","Unreal discounts + pay first"],["ดูรีวิวและอายุเพจ","Check reviews and page age"]],
 scenes:{
  s1:{title:["ร่มกับเสื้อกันฝนถูกมาก","Super-cheap umbrellas and raincoats"],
   body:i=>`<p>${X(i,"ยายศรีเปียกฝนนิดหน่อย กำลังดูไลฟ์ “ล้างสต๊อกหน้าฝน ร่ม+เสื้อกันฝน เหลือ 59 บาท จาก 590 โอนก่อนส่งภายในวันนี้”","Grandma Sri is a bit wet and watching a live sale: “Rainy-season clearance! Umbrella + raincoat 59 baht instead of 590. Pay first, delivered today.”")}</p>
   ${chat("🛍️",X(i,"ร้านร่มดี ราคาโรงงาน","Good Umbrellas Factory Price"),X(i,"เพจ · สร้างเมื่อ 5 วันก่อน","Page · created 5 days ago"),[X(i,"เหลือ 3 ชิ้นสุดท้าย! โอนเข้าบัญชี นายธนพล ส.","Last 3 left! Pay to Mr Thanaphon S.")])}`,
   clues:[["ลดราคา 90% ผิดปกติ","90% off is abnormal"],["เพจเพิ่งสร้าง 5 วัน","The page is only 5 days old"],["โอนเข้าบัญชีบุคคล","Payment to a personal account"]],
   choices:[["ดูอายุเพจ รีวิว และชื่อบัญชีก่อน แล้วชวนยายซื้อร้านที่มีเก็บเงินปลายทาง","Check the page's age, reviews and account name, and suggest a shop with cash on delivery","s2a","good"],
            ["ทักถามแม่ค้าก่อนว่าของมีจริงไหม","Message the seller first to ask if the stock is real","s2b","risky"],
            ["โอน 59 บาท ถูกขนาดนี้ไม่เสียหายมาก","Pay the 59 baht, it's so cheap it hardly matters","E3","bad"]]},
  s2a:{title:["รีวิวมีแต่คนโดนโกง","The reviews are all from victims"],
   body:i=>`<p>${X(i,"คอมเมนต์ล่าสุดเต็มไปด้วยคนบอกว่า “โอนแล้วโดนบล็อก” และบัญชีชื่อธนพล ส. มีคนเตือนในกลุ่มเตือนภัยแล้ว","The latest comments are full of “paid and got blocked”, and the Thanaphon S. account has already been flagged in a scam-warning group.")}</p>`,
   clues:[["อ่านคอมเมนต์ล่าสุด","Read the newest comments"],["ค้นชื่อบัญชีก่อนโอน","Search the account name before paying"],["เก็บเงินปลายทางปลอดภัยกว่า","Cash on delivery is safer"]],
   choices:[["ไม่ซื้อ รายงานเพจ แล้วพายายไปซื้อร่มที่ร้านจริง","Don't buy, report the page, and take Grandma to buy one at a real shop","E1","good"],
            ["ไม่ซื้อ แต่ไม่ต้องรายงาน","Don't buy, but don't bother reporting","E2","risky"],
            ["ยังซื้ออยู่ดี เผื่อรอบนี้ส่งจริง","Buy anyway, maybe this time it ships","E3","bad"]]},
  s2b:{title:["แม่ค้าส่งคลิปของจริงมา","The seller sends a video"],
   body:i=>`<p>${X(i,"แม่ค้าส่งคลิปโกดังเต็มไปด้วยร่ม “ของจริงค่ะคุณยาย รีบโอนนะคะ ใกล้หมดแล้ว”","The seller sends a clip of a warehouse full of umbrellas: “It's real, Grandma! Hurry, almost gone.”")}</p>`,
   clues:[["คลิปหาจากที่ไหนก็ได้","Clips can come from anywhere"],["ยังเร่งให้โอน","Still pushing to pay"],["ยังไม่ได้ดูรีวิว","Reviews still unchecked"]],
   choices:[["คลิปไม่ได้พิสูจน์อะไร ไปดูรีวิวและอายุเพจก่อน","A clip proves nothing. Check the reviews and page age","s2a","good"],
            ["ขอโอนครึ่งเดียวก่อน","Offer to pay half first","E3","risky"],
            ["เห็นของจริงแล้ว โอนเลย","Saw the stock, pay now","E3","bad"]]}
 },
 endings:{
  E1:["safe",["ยายได้ร่มดีจากร้านจริง","Grandma got a proper umbrella"],["ยายซื้อร่มที่ร้านจริงในราคาปกติ และเพจปลอมถูกปิดหลังโดนรายงานหลายครั้ง","Grandma bought one at a real shop for a normal price, and the fake page was taken down after many reports."],[["ถูกเกินจริง = ระวัง","Too cheap = careful"],["ดูรีวิวล่าสุดก่อนซื้อ","Read recent reviews first"],["เก็บเงินปลายทางปลอดภัยกว่า","Cash on delivery is safer"]]],
  E2:["warn",["ยายไม่โดน แต่คนอื่นยังโดน","Grandma's fine, others aren't"],["ยายไม่เสียเงิน แต่เพจปลอมยังไลฟ์หลอกคนอื่นต่อทุกคืน","Grandma lost nothing, but the page keeps live-selling to others every night."],[["รายงานเพจช่วยคนอื่น","Reporting helps others"],["ของถูกเกินจริงมักไม่มีจริง","Unreal deals usually aren't real"],["ค้นชื่อบัญชีก่อนโอน","Search the account first"]]],
  E3:["danger",["โอนแล้วโดนบล็อก","Paid, then blocked"],["ยายโอนไป แม่ค้าบล็อกทันที แล้วเอาชื่อยายไปขอยืมเงินจากคนในรายชื่อเพื่อนต่อ","Grandma paid and was blocked at once, then the scammer used her name to ask her friends for loans."],[["เงินน้อยก็เป็นเหยื่อได้","Small payments still make you a victim"],["คลิปของจริงปลอมได้","Stock videos can be fake"],["อย่าโทษตัวเอง แจ้ง 1441","Don't blame yourself, report to 1441"]]]
 }}
};
const LAB={safe:["ปลอดภัย","Safe"],warn:["เฉียดฉิว","Close call"],danger:["เสียหาย","Harmed"]};
const build=(id,d,i)=>({id, level:i?"Medium":"กลาง", start:"s1", title:d.title[i], learn:d.learn.map(x=>x[i]),
  scenes:Object.fromEntries(Object.entries(d.scenes).map(([k,s])=>[k,{title:s.title[i], body:s.body(i), clues:s.clues.map(x=>x[i]), choices:s.choices.map(c=>({t:c[i],to:c[2],v:c[3]}))}])),
  endings:Object.fromEntries(Object.entries(d.endings).map(([k,e])=>[k,{type:e[0],label:LAB[e[0]][i],title:e[1][i],story:e[2][i],lessons:e[3].map(x=>x[i])}]))});
for(const [id,d] of Object.entries(D)){ CASES.th[id]=build(id,d,0); CASES.en[id]=build(id,d,1); }
})();
