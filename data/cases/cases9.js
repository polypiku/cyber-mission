/* ===== Hard cases for the new places, modelled on Thai news stories where people lost millions =====
   food court: pig, bec · market: gold, share · mini mart: atm, wrong · phone shop: simswap, apk, deepfake · dorm: task */
(function(){
const chat=(ava,name,sub,msgs)=>`<div class="phone"><div class="chathead"><span class="ava">${ava}</span><span><b>${name}</b><small>${sub}</small></span></div><div class="thread">${msgs.map(m=>m.startsWith("@")?`<div class="time">${m.slice(1)}</div>`:m.startsWith(">")?`<div class="bubble me">${m.slice(1)}</div>`:`<div class="bubble">${m}</div>`).join("")}</div></div>`;
const notif=(rows)=>`<div class="notif">${rows.map(r=>`<div>${r}</div>`).join("")}</div>`;
const doc=(head,stamp,rows)=>`<div class="doc"><div class="dh">${head} <span class="stamp">${stamp}</span></div>${rows.map(r=>`<div class="dr"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}</div>`;
const perm=(title,text,a,b)=>`<div class="perm"><b>${title}</b><p>${text}</p><div class="pbtn"><span>${a}</span><span>${b}</span></div></div>`;
const staff=(who,line,ic)=>`<div class="teller"><div class="tq"><small>${who}</small><b>${ic||"💬"}</b></div><p>${line}</p></div>`;
const X=(i,th,en)=>i?en:th;

const D={
/* ---------------- food court ---------------- */
pig:{level:"ยาก", title:["หนุ่มในแอปหาคู่สอนเทรดคริปโต","The dating-app match who teaches crypto"],
 learn:[["หลอกให้รักแล้วชวนลงทุน (หมูตุ๋น)","Romance-investment scams (“pig butchering”)"],["ตรวจศูนย์ซื้อขายกับ ก.ล.ต.","Check the exchange with the SEC"],["ต้องจ่ายก่อนถอน = หลอก","Paying to withdraw = scam"],["วิดีโอคอลก็ปลอมได้","Video calls can be faked"]],
 scenes:{
  s1:{title:["กำไรบนจอ 3,200,000 บาท","3,200,000 baht on the screen"],
   body:i=>`<p>${X(i,"พี่ปุ๊กวางช้อนแล้วยื่นมือถือมาให้ดู “รู้จักเควินในแอปหาคู่มาสามเดือน เขาสอนเทรดคริปโตในแอป BitNova Pro พี่ลงไป 8 แสน ตอนนี้กำไรเป็น 3,200,000 บาทแล้ว แต่จะถอนต้องจ่ายภาษีก่อน บ่ายนี้พี่จะไปกู้ธนาคารมาจ่าย”","Pook puts down her spoon and shows you her phone. “I met Kevin on a dating app three months ago. He taught me to trade crypto on BitNova Pro. I put in 800,000 and it's 3,200,000 baht now, but I have to pay tax before I can withdraw. I'm taking out a bank loan this afternoon.”")}</p>
   ${chat("K","Kevin 💙",X(i,"ออนไลน์","online"),[X(i,"ที่รัก จ่ายภาษีก่อนนะ แล้วเราจะไปญี่ปุ่นด้วยกัน 💕","Darling, pay the tax first, then we'll go to Japan together 💕")])}
   ${notif([X(i,"⛔ ถอนเงินไม่สำเร็จ: ชำระภาษี 15% (480,000 บาท) ภายใน 24 ชม.","⛔ Withdrawal failed: pay 15% tax (480,000 baht) within 24 h")])}`,
   clues:[["รู้จักทางแอปหาคู่ ไม่เคยเจอตัว แต่ชวนลงทุน","Met on a dating app, never met in person, yet talks investing"],["ตัวเลขกำไรบนจอเป็นแค่ตัวเลขที่แอปปลอมสร้าง","The profit is just a number a fake app shows"],["ต้องจ่ายเงินก่อนถอน = กับดัก","Paying before you can withdraw = trap"]],
   choices:[["ถามว่าแอปโหลดมาจากไหน แล้วตรวจรายชื่อศูนย์ซื้อขายที่ได้รับอนุญาตกับ ก.ล.ต. ด้วยกัน","Ask where the app came from, then check the SEC's list of licensed exchanges together","s2a","good"],
            ["ให้พี่ปุ๊กขอวิดีโอคอลกับเควินก่อน ถ้าเห็นหน้าจริงค่อยจ่าย","Have Pook ask Kevin for a video call first. Pay only if he's real","s2b","risky"],
            ["จ่ายภาษีก้อนเดียวให้จบ เพราะยังได้คืนตั้ง 3,200,000 บาท","Pay the tax once and be done. She still gets 3,200,000 baht back","E3","bad"]]},
  s2a:{title:["ไม่มีชื่อในรายชื่อ ก.ล.ต.","Not on the SEC list"],
   body:i=>`<p>${X(i,"แอปโหลดจากลิงก์ที่เควินส่งมา ไม่ได้มาจากสโตร์ และไม่มีชื่อในรายชื่อศูนย์ซื้อขายที่ได้รับอนุญาต พี่ปุ๊กเสียงสั่น “แต่เขาบอกรักพี่ทุกวันเลยนะ… แล้วแปดแสนของพี่ล่ะ”","The app came from a link Kevin sent, not an app store, and isn't on the list of licensed exchanges. Pook's voice shakes. “But he says he loves me every day… and what about my 800,000?”")}</p>`,
   clues:[["ศูนย์เทรดจริงต้องได้รับอนุญาต","Real exchanges are licensed"],["คนร้ายใช้ความรักทำให้เราไม่กล้าสงสัย","Scammers use love so you won't doubt them"],["เงินที่โอนไปแล้ว ยิ่งแจ้งเร็วยิ่งอายัดได้มาก","The faster you report, the more can be frozen"]],
   choices:[["หยุดคุยกับเควิน เก็บแชตกับสลิปทั้งหมด แล้วแจ้ง 1441 วันนี้ให้อายัดบัญชีปลายทาง","Stop talking to Kevin, keep every chat and slip, and report to 1441 today to freeze the accounts","E1","good"],
            ["บอกเควินว่ารู้ทันแล้ว ให้คืนแปดแสนก่อน ไม่งั้นจะแจ้งความ","Tell Kevin she knows, and demand the 800,000 back or she'll go to the police","E2","risky"],
            ["จ้าง “ทนายตามเงินคริปโตคืน” ในเพจ ค่าดำเนินการ 50,000","Hire a “crypto recovery lawyer” from a page for a 50,000 fee","E3","bad"]]},
  s2b:{title:["เควินเปิดกล้องจริง","Kevin turns on his camera"],
   body:i=>`<p>${X(i,"เควินวิดีโอคอลมา 10 วินาที หน้าหล่อเหมือนในรูป แต่ขยับแข็งๆ แล้วตัดไปบอกว่าเน็ตไม่ดี","Kevin video-calls for ten seconds. His face matches the photos but moves stiffly, then the call drops: “bad signal.”")}</p>
   ${chat("K","Kevin 💙",X(i,"ออนไลน์","online"),[X(i,"เห็นไหมว่าผมมีตัวตนจริง จ่ายภาษีเถอะนะที่รัก","See? I'm real. Please pay the tax, darling")])}`,
   clues:[["หน้าในวิดีโอสร้างด้วย AI ได้","A face on video can be made with AI"],["คอลสั้นๆ แล้วอ้างเน็ตหลุด","A short call, then “bad signal”"],["เห็นหน้าไม่ได้พิสูจน์ว่าแอปเทรดเป็นของจริง","Seeing a face doesn't prove the app is real"]],
   choices:[["เห็นหน้าก็ยังต้องตรวจว่าแอปได้รับอนุญาตไหม ไปตรวจกับ ก.ล.ต. ก่อน","Even with a face, check whether the app is licensed. Check with the SEC first","s2a","good"],
            ["จ่ายครึ่งหนึ่งก่อน แล้วขอถอนบางส่วนดูว่าได้จริงไหม","Pay half first and try a partial withdrawal to test it","E2","risky"],
            ["เห็นหน้าแล้วก็พอ ไปกู้เงินมาจ่ายภาษี","She's seen him. Take the loan and pay the tax","E3","bad"]]}
 },
 endings:{
  E1:["safe",["หยุดได้ก่อนกู้เพิ่ม","Stopped before the loan"],["พี่ปุ๊กไม่ได้กู้เงินเพิ่ม ตำรวจอายัดบัญชีปลายทางได้บางส่วน และเธอเล่าเรื่องนี้เตือนเพื่อนทั้งออฟฟิศ","Pook didn't take the loan. Police froze part of the money, and she warned her whole office."],[["คนรู้จักออนไลน์ชวนลงทุน = สัญญาณอันตราย","An online match who talks investing = red flag"],["ตรวจศูนย์ซื้อขายกับ ก.ล.ต. ก่อนเสมอ","Always check the exchange with the SEC"],["ต้องจ่ายก่อนถอน = หลอกแน่นอน","Pay to withdraw = definitely a scam"]]],
  E2:["warn",["เสียไปบางส่วน","Some of it lost"],["พี่ปุ๊กไม่ได้กู้เพิ่ม แต่เควินรู้ตัวก่อน ลบแชตและย้ายเงินออกไป อายัดได้น้อยกว่าที่ควร","Pook didn't borrow more, but Kevin was warned. He deleted the chats and moved the money, so less could be frozen."],[["อย่าเตือนคนร้ายก่อนแจ้งความ","Don't tip off the scammer before reporting"],["แคปหลักฐานไว้ก่อนเสมอ","Screenshot evidence first"],["ทดลองจ่ายครึ่งเดียวก็คือจ่าย","Paying half is still paying"]]],
  E3:["danger",["หมดไป 1,300,000 บาท","1,300,000 baht gone"],["พี่ปุ๊กกู้เงินมาจ่าย “ภาษี” แล้วแอปขอ “ค่าป้องกันการฟอกเงิน” ต่ออีก สุดท้ายเสียไปกว่า 1,300,000 บาท และเควินก็หายไป","Pook borrowed to pay the “tax”, then the app wanted an “anti-money-laundering fee”. She lost over 1,300,000 baht, and Kevin vanished."],[["ทนายตามเงินคืนในเพจคือมิจฉาชีพซ้ำสอง","“Recovery lawyers” on pages are a second scam"],["เงินบนจอแอปปลอมถอนไม่ได้จริง","Money on a fake app can never be withdrawn"],["แจ้ง 1441 ให้เร็วที่สุด","Report to 1441 as fast as possible"]]]
 }},

bec:{level:"ยาก", title:["อีเมลคู่ค้าขอเปลี่ยนเลขบัญชี","The supplier's email changes the bank account"],
 learn:[["อีเมลธุรกิจปลอม (BEC)","Business email compromise (BEC)"],["โทรยืนยันด้วยเบอร์ที่มีอยู่เดิม","Confirm by phone on a number you already have"],["ดูโดเมนอีเมลทีละตัวอักษร","Read email domains letter by letter"],["เอกสารแนบปลอมได้ทั้งหมด","Attachments can all be faked"]],
 scenes:{
  s1:{title:["โอน 12 ล้านก่อนบ่ายสาม","12 million before 3 pm"],
   body:i=>`<p>${X(i,"พี่นกฝ่ายบัญชีกินข้าวไปเปิดโน้ตบุ๊กไป “คู่ค้าเหล็กขอให้โอนค่าของงวดนี้เข้าบัญชีใหม่ หัวหน้าส่งต่อมาว่าอนุมัติแล้ว ต้องโอนก่อนบ่ายสาม”","Nok from accounting eats with her laptop open. “Our steel supplier wants this payment sent to a new account. My boss forwarded it as approved. It has to go before 3 pm.”")}</p>
   ${doc(X(i,"อีเมลจาก finance@siamsteel-co.com","Email from finance@siamsteel-co.com"),X(i,"ด่วน","URGENT"),[[X(i,"ยอด","Amount"),"12,400,000"],[X(i,"บัญชีใหม่","New account"),X(i,"บจก. เอสเอส เทรดดิ้ง","SS Trading Co.")],[X(i,"เหตุผล","Reason"),X(i,"บัญชีเดิมถูกตรวจภาษี","Old account under tax audit")],[X(i,"กำหนด","Deadline"),X(i,"ก่อน 15:00 ไม่งั้นระงับส่งของ","Before 15:00 or deliveries stop")]])}
   <p>${X(i,"อีเมลเก่าๆ ของคู่ค้ามาจาก @siamsteel.co.th","The supplier's old emails came from @siamsteel.co.th")}</p>`,
   clues:[["ขอเปลี่ยนเลขบัญชีทางอีเมล แถมเร่งเวลา","A bank-account change by email, with a deadline"],["โดเมนต่างจากเดิมนิดเดียว","The domain is slightly different"],["บัญชีใหม่เป็นชื่อบริษัทอื่น","The new account has a different company name"]],
   choices:[["โทรหาคู่ค้าด้วยเบอร์ในสัญญาเดิม ไม่ใช่เบอร์ในอีเมล เพื่อยืนยันเลขบัญชี","Call the supplier on the number in the contract, not the one in the email, to confirm","s2a","good"],
            ["ตอบอีเมลนั้นกลับไป ขอหนังสือรับรองบัญชีจากธนาคารก่อน","Reply to that email asking for a bank letter confirming the account","s2b","risky"],
            ["หัวหน้าอนุมัติแล้ว โอนให้ทันบ่ายสาม","The boss approved it. Send it before 3 pm","E3","bad"]]},
  s2a:{title:["คู่ค้าไม่เคยเปลี่ยนบัญชี","The supplier never changed accounts"],
   body:i=>`<p>${X(i,"ฝ่ายบัญชีของคู่ค้าบอกว่า “เราไม่เคยเปลี่ยนบัญชีเลยค่ะ” พี่นกเลื่อนดูอีเมลที่หัวหน้าส่งต่อมาอีกที… มาจาก boss.office.th@gmail.com ไม่ใช่อีเมลบริษัท","The supplier's accounts team says, “We never changed our account.” Nok checks the email her boss forwarded… it came from boss.office.th@gmail.com, not the company address.")}</p>`,
   clues:[["ยืนยันทางช่องทางที่สองทุกครั้งที่มีการเปลี่ยนบัญชี","Confirm every account change through a second channel"],["คนร้ายปลอมเป็นหัวหน้าได้ด้วย","Scammers can pose as your boss too"],["แจ้งฝ่าย IT ให้ตรวจอีเมลทั้งบริษัท","Get IT to check the whole company's email"]],
   choices:[["แจ้งหัวหน้าตัวจริงกับฝ่าย IT ให้เปลี่ยนรหัสอีเมล และตั้งกฎโทรยืนยันทุกครั้งที่เปลี่ยนบัญชี","Tell the real boss and IT, reset email passwords, and make a rule to phone-confirm every account change","E1","good"],
            ["แค่ไม่โอน แล้วลบอีเมลนั้นทิ้ง เรื่องก็จบ","Just don't pay, delete the email, and move on","E2","risky"],
            ["โอนไปครึ่งหนึ่งก่อนให้ของมาส่ง แล้วค่อยตรวจส่วนที่เหลือ","Send half now so deliveries continue, and check the rest later","E3","bad"]]},
  s2b:{title:["ได้หนังสือรับรองจากธนาคาร","A bank letter arrives"],
   body:i=>`<p>${X(i,"ภายในสิบนาที มี PDF ตอบกลับมา โลโก้ธนาคารชัดเจน ลายเซ็นผู้จัดการ และเบอร์โทร “ยืนยันได้ตลอด 24 ชม.”","Within ten minutes a PDF comes back: a clear bank logo, a manager's signature, and a number to “confirm 24 hours a day”.")}</p>`,
   clues:[["คนร้ายทำเอกสารปลอมได้ทุกอย่าง","Scammers can fake any document"],["ถามคนร้ายเองไม่ใช่การยืนยัน","Asking the scammer isn't verifying"],["ใช้ช่องทางที่เรามีอยู่แล้วเท่านั้น","Only use channels you already had"]],
   choices:[["เอกสารมาจากอีเมลเดียวกัน ไม่นับ โทรหาคู่ค้าด้วยเบอร์ในสัญญา","It came from the same email, so it doesn't count. Call the supplier on the contract number","s2a","good"],
            ["โทรเบอร์ในหนังสือนั้นเพื่อยืนยัน","Call the number in the letter to confirm","E3","risky"],
            ["มีหนังสือธนาคารแล้ว โอนได้เลย","There's a bank letter now. Send it","E3","bad"]]}
 },
 endings:{
  E1:["safe",["12 ล้านยังอยู่ครบ","All 12 million safe"],["เงินไม่ได้ออกไปแม้แต่บาทเดียว ฝ่าย IT พบว่ามีคนแอบอ่านอีเมลบริษัทมาสองเดือน และปิดช่องโหว่ได้ทัน","Not a single baht left. IT found someone had been reading company email for two months and shut them out."],[["เปลี่ยนเลขบัญชี = โทรยืนยันทุกครั้ง","Account change = always phone to confirm"],["ดูโดเมนอีเมลทีละตัวอักษร","Read the domain letter by letter"],["หัวหน้าปลอมได้ ต้องเช็กที่อยู่อีเมล","Bosses can be faked. Check the address"]]],
  E2:["warn",["รอดรอบนี้ แต่คนร้ายยังอยู่ในอีเมล","Safe this time, but they're still inside"],["เงินไม่ได้ออกไป แต่ไม่มีใครเปลี่ยนรหัส สองสัปดาห์ต่อมาคนร้ายส่งอีเมลแบบเดียวกันไปหาพนักงานอีกคน","No money left, but nobody changed passwords. Two weeks later the scammers sent the same email to another colleague."],[["ไม่โอนอย่างเดียวยังไม่พอ","Not paying isn't enough"],["แจ้ง IT ให้ปิดทางเข้า","Get IT to close the way in"],["เตือนคนอื่นในทีม","Warn the rest of the team"]]],
  E3:["danger",["12,400,000 บาทหายในชั่วโมงเดียว","12,400,000 baht gone in an hour"],["เงินถูกโอนต่อออกไปหลายบัญชีภายในหนึ่งชั่วโมง คู่ค้ายังรอเงินอยู่ และบริษัทต้องจ่ายซ้ำอีกรอบ","The money was split across many accounts within an hour. The supplier is still unpaid, and the company has to pay again."],[["เอกสารแนบปลอมได้ทั้งหมด","Attachments can all be faked"],["อย่าโทรเบอร์ที่คนร้ายให้มา","Never call the number the scammer gives"],["ความเร่งรีบคืออาวุธของคนร้าย","Urgency is the scammer's weapon"]]]
 }},

/* ---------------- market ---------------- */
gold:{level:"ยาก", title:["ร้านทองออนไลน์ถูกกว่าหน้าร้าน","Online gold cheaper than the shops"],
 learn:[["เพจร้านค้าปลอมที่ก๊อปร้านจริง","Fake shop pages copied from real shops"],["เทียบราคากับประกาศสมาคมค้าทองคำ","Compare with the Gold Traders Association price"],["บัญชีรับเงินต้องเป็นชื่อร้าน","The receiving account should be the shop's"],["ของชิ้นแรกได้จริงเพื่อหลอกก้อนใหญ่","The first small order arrives to set up a big one"]],
 scenes:{
  s1:{title:["ทองถูกกว่าบาทละ 2,000","2,000 baht cheaper per baht-weight"],
   body:i=>`<p>${X(i,"ป้าจันทร์แม่ค้าผลไม้เก็บเงินไว้เป็นค่าเทอมลูกสาว “เพจห้างทองเยาวราชออนไลน์ ขายถูกกว่าหน้าร้านบาทละสองพัน ป้าจะซื้อสามสิบบาท โอนเต็มวันนี้ ส่งถึงบ้านใน 3 วัน”","Auntie Jan the fruit seller has saved for her daughter's tuition. “This Yaowarat gold page sells 2,000 cheaper per baht-weight than the shops. I'm buying thirty. Pay in full today, delivered in 3 days.”")}</p>
   ${chat("ท",X(i,"ห้างทองเยาวราช ออนไลน์","Yaowarat Gold Online"),X(i,"เพจ · ผู้ติดตาม 312K · ไลฟ์ทุกวัน","Page · 312K followers · live daily"),[X(i,"30 บาท ราคาพิเศษ 1,215,000 บาท 🙏","30 baht-weight, special price 1,215,000 🙏"),X(i,"โอนเข้าบัญชี นายสมพงษ์ ร. (ผู้จัดการร้าน)","Pay to Mr Sompong R. (shop manager)")])}`,
   clues:[["ราคาต่ำกว่าราคาตลาดมาก","Far below the market price"],["บัญชีรับเงินเป็นชื่อบุคคล","The account is a person's name"],["ให้โอนเต็มก่อนส่ง","Full payment before delivery"]],
   choices:[["เทียบราคากับประกาศสมาคมค้าทองคำวันนี้ และดูว่าบัญชีเป็นชื่อร้านหรือชื่อคน","Compare with today's Gold Traders Association price and see whether the account is the shop's or a person's","s2a","good"],
            ["ลองสั่งหนึ่งสลึงก่อน ถ้าได้ของจริงค่อยซื้อก้อนใหญ่","Order a quarter-baht first. If it arrives, buy the rest","s2b","risky"],
            ["เพจมีคนติดตามเป็นแสน ไลฟ์ทุกวัน โอนเลย","The page has 300K followers and goes live daily. Pay now","E3","bad"]]},
  s2a:{title:["ร้านจริงไม่ได้ขายแบบนี้","The real shop doesn't sell like this"],
   body:i=>`<p>${X(i,"เบอร์ร้านจริงจาก Google Maps บอกว่า “เราไม่เคยรับเงินเข้าบัญชีส่วนตัว เพจนั้นก๊อปรูปและไลฟ์ของเราไป” ป้าจันทร์หน้าซีด “ป้าโอนมัดจำไปสองหมื่นแล้ว…”","The real shop, found on Google Maps, says: “We never take money into personal accounts. That page copied our photos and live videos.” Auntie Jan goes pale. “I already paid a 20,000 deposit…”")}</p>`,
   clues:[["เพจปลอมก๊อปรูปและไลฟ์จากร้านจริง","Fake pages copy real shops' photos and lives"],["ร้านจริงรับเงินเข้าบัญชีบริษัท","Real shops take money into a company account"],["รีบแจ้งอายัดเงินมัดจำ","Report fast to freeze the deposit"]],
   choices:[["แจ้งธนาคารกับ 1441 ให้อายัดบัญชีที่โอนมัดจำ แล้วรายงานเพจ","Report to her bank and 1441 to freeze the deposit account, and report the page","E1","good"],
            ["ทักเพจขอมัดจำคืนดีๆ","Message the page politely to ask for the deposit back","E2","risky"],
            ["เพจบอกว่าถ้าโอนส่วนที่เหลือ จะคืนมัดจำพร้อมทอง โอนต่อ","The page says pay the rest and they'll return the deposit with the gold. Pay it","E3","bad"]]},
  s2b:{title:["ได้ทองหนึ่งสลึงจริง!","The quarter-baht really arrived!"],
   body:i=>`<p>${X(i,"ทองหนึ่งสลึงมาส่งจริง เพจทักมาทันที","The quarter-baht arrives. The page messages right away.")}</p>
   ${chat("ท",X(i,"ห้างทองเยาวราช ออนไลน์","Yaowarat Gold Online"),X(i,"เพจ","Page"),[X(i,"ลูกค้าเก่าได้โปร 30 บาท ลดเพิ่มอีก วันนี้วันเดียวค่ะ","Returning customers get another discount on 30 baht-weight. Today only!")])}`,
   clues:[["ของชิ้นแรกได้จริง เพื่อให้ไว้ใจก้อนใหญ่","The first item is real so you trust the big one"],["โปรวันเดียว = เร่ง","Today only = pressure"],["ยังไม่รู้ว่าเพจเป็นของร้านจริงไหม","Still unknown if the page is the real shop"]],
   choices:[["ได้ของจริงแต่ยังไม่รู้ว่าร้านจริงไหม หาเบอร์ร้านจาก Google Maps แล้วโทรถาม","The item was real but the shop isn't confirmed. Find its number on Google Maps and call","s2a","good"],
            ["ซื้อเพิ่มแค่หนึ่งบาทพอ ไม่เสี่ยงเยอะ","Buy just one more baht-weight. Low risk","E2","risky"],
            ["ได้ของจริงแล้ว โอน 1,200,000 บาทเลย","It was real. Send the 1,200,000 baht","E3","bad"]]}
 },
 endings:{
  E1:["safe",["เงินค่าเทอมยังอยู่","The tuition money is safe"],["ธนาคารอายัดเงินมัดจำได้ทัน เพจถูกปิด และป้าจันทร์ไปซื้อทองที่หน้าร้านจริงแทน","The bank froze the deposit in time, the page was taken down, and Auntie Jan bought gold at the real shop instead."],[["ราคาถูกผิดปกติ = สัญญาณแรก","Abnormally cheap = first warning"],["บัญชีต้องเป็นชื่อร้าน","The account must be the shop's"],["หาเบอร์ร้านเอง ไม่ใช้เบอร์ในเพจ","Find the shop's number yourself"]]],
  E2:["warn",["เสียไปสี่หมื่น","40,000 lost"],["ป้าจันทร์ไม่ได้โอนก้อนใหญ่ แต่เงินที่จ่ายไปแล้วไม่ได้คืน และเพจบล็อกป้าทันที","Auntie Jan didn't send the big amount, but what she'd paid never came back, and the page blocked her."],[["ทักขอคืนกับคนร้ายไม่ได้ผล","Asking the scammer for a refund doesn't work"],["ซื้อน้อยๆ ก็ยังเป็นเหยื่อ","Small purchases are still bait"],["แจ้งธนาคารทันที","Report to the bank right away"]]],
  E3:["danger",["1,200,000 บาทหายพร้อมเพจ","1,200,000 baht gone with the page"],["ป้าจันทร์โอนเงินทั้งหมด วันรุ่งขึ้นเพจหายไป ทองไม่เคยมา ลูกสาวต้องพักการเรียนหนึ่งเทอม","Auntie Jan sent everything. The next day the page was gone, no gold came, and her daughter had to pause her studies for a term."],[["ยอดคนติดตามซื้อได้","Followers can be bought"],["ไลฟ์ขโมยมาจากร้านจริงได้","Lives can be stolen from real shops"],["ของชิ้นแรกได้จริงเพื่อหลอกก้อนใหญ่","The first order is real to land the big one"]]]
 }},

share:{level:"ยาก", title:["วงแชร์ออนไลน์ของแม่ท้าวที่ไม่เคยเห็นหน้า","An online savings circle run by a host nobody's met"],
 learn:[["แชร์ลูกโซ่ (Ponzi)","Ponzi schemes"],["ดอกเบี้ยสูงผิดปกติ","Abnormally high interest"],["ต้องหาคนใหม่ถึงได้เงิน","You only get paid by bringing people in"],["คนชวนก็อาจโดนคดีด้วย","Recruiters can face charges too"]],
 scenes:{
  s1:{title:["แม่ท้าวชวนเปิดวง VIP","The host offers a VIP circle"],
   body:i=>`<p>${X(i,"เจ๊น้อยแม่ค้าเสื้อผ้าเล่นแชร์ออนไลน์กับแม่ท้าวเจนมาครึ่งปี สมาชิกแปดสิบคน ส่วนใหญ่เป็นแม่ค้าในตลาดนี้ที่เจ๊ชวนมาเอง “ช่วงนี้เงินออกช้าไปหน่อย แต่แม่ท้าวเปิดวง VIP ดอก 50% เจ๊จะลงสามแสน”","Jae Noi the clothes seller has played in Mae Thao Jen's online circle for six months. Eighty members, most of them market sellers she invited herself. “Payouts are a bit late lately, but the host is opening a VIP circle at 50%. I'm putting in 300,000.”")}</p>
   ${chat("จ",X(i,"แม่ท้าวเจน 💎","Mae Thao Jen 💎"),X(i,"กลุ่มแชร์ทองคำ (80)","Golden Circle (80)"),[X(i,"วง VIP ดอก 50% รับแค่ 10 มือ ปิดคืนนี้","VIP circle, 50% interest, only 10 places, closes tonight"),X(i,"โอนเข้าบัญชีผู้ช่วยแม่ท้าวนะคะ","Please pay into my assistant's account")])}`,
   clues:[["ดอกเบี้ยสูงผิดปกติ","Abnormally high interest"],["ไม่มีใครเคยเห็นตัวแม่ท้าว","Nobody has met the host"],["จ่ายช้าแต่ชวนเปิดวงใหม่","Late payouts, yet a new circle"]],
   choices:[["ถามในกลุ่มว่ามีใครเคยเจอแม่ท้าวตัวจริงไหม และเทียบสลิปกันว่าเงินเข้าบัญชีใคร","Ask the group if anyone has met her, and compare slips to see whose accounts the money goes to","s2a","good"],
            ["เปิดวง VIP แต่ลงแค่ครึ่งเดียว","Join the VIP circle with half the money","s2b","risky"],
            ["ชวนแม่ค้าในตลาดเพิ่มอีก เงินจะได้วนเร็วขึ้น","Invite more sellers so money flows faster","E3","bad"]]},
  s2a:{title:["ไม่มีใครเคยเจอเธอ","Nobody has ever met her"],
   body:i=>`<p>${X(i,"สมาชิกเทียบสลิปกัน พบว่าโอนเข้าบัญชีส่วนตัวไม่ซ้ำกันเลยกว่าสิบบัญชี และคนที่ได้เงินก่อน ได้จากเงินของสมาชิกใหม่ทั้งนั้น","Members compare slips: more than ten different personal accounts, and everyone paid out early was paid with newer members' money.")}</p>`,
   clues:[["เอาเงินคนใหม่จ่ายคนเก่า = แชร์ลูกโซ่","Paying old members with new money = Ponzi"],["บัญชีรับเงินเปลี่ยนไปเรื่อยๆ","The receiving accounts keep changing"],["หลักฐานจากหลายคนช่วยคดีได้มาก","Evidence from many victims helps the case"]],
   choices:[["หยุดจ่ายรอบต่อไป รวบรวมสลิปของสมาชิกทุกคน แล้วไปแจ้งความพร้อมกัน","Stop paying, gather everyone's slips, and report together","E1","good"],
            ["หยุดเงียบๆ คนเดียว ไม่ต้องบอกใคร","Quietly stop alone and tell no one","E2","risky"],
            ["รีบเปียรอบนี้ให้ได้ก่อนวงล่ม","Grab this round's pot before it collapses","E3","bad"]]},
  s2b:{title:["วง VIP จ่ายรอบแรกครบ","The VIP circle pays the first round"],
   body:i=>`<p>${X(i,"รอบแรกได้ดอกครบจริง แต่แม่ท้าวบอกว่า “รอบหน้าต้องหาสมาชิกใหม่ 5 คนก่อน ถึงจะปล่อยเงินได้นะคะ”","The first round really pays. Then the host says, “Next round, bring in five new members before I can release the money.”")}</p>`,
   clues:[["จ่ายรอบแรกเพื่อให้เชื่อ","The first payout builds trust"],["ต้องหาคนเพิ่มถึงได้เงิน","Pay only comes if you recruit"],["คนที่ชวนเพื่อนอาจถูกดำเนินคดีด้วย","Recruiters can be charged too"]],
   choices:[["ไม่ชวนใครเพิ่ม และเอาสลิปไปเทียบกับสมาชิกคนอื่น","Recruit nobody, and compare slips with other members","s2a","good"],
            ["ลงเงินเพิ่มเองแทนการชวนคน","Put in more of her own money instead of recruiting","E2","risky"],
            ["ชวนแม่ค้าห้าคนเข้าวง","Bring five sellers into the circle","E3","bad"]]}
 },
 endings:{
  E1:["safe",["วงล่มก่อนคนในตลาดเสียเพิ่ม","Stopped before the market lost more"],["สลิปจากสมาชิกแปดสิบคนช่วยให้ตำรวจตามบัญชีม้าได้หลายบัญชี และไม่มีใครในตลาดโอนเพิ่มอีก","Slips from eighty members helped police trace many mule accounts, and nobody in the market paid in again."],[["ดอกสูง + หาคนเพิ่ม = แชร์ลูกโซ่","High interest + recruiting = Ponzi"],["เทียบสลิปกันช่วยเห็นภาพ","Comparing slips shows the pattern"],["แจ้งความพร้อมกันได้ผลกว่า","Reporting together works better"]]],
  E2:["warn",["รอดคนเดียว","Only she got out"],["เจ๊น้อยหยุดทัน แต่แม่ค้าที่เจ๊ชวนมายังจ่ายต่อ เมื่อวงล่ม หลายคนมาทวงเงินจากเจ๊","Jae Noi stopped in time, but the sellers she invited kept paying. When it collapsed, many came to her for their money."],[["บอกคนที่เราชวนมาด้วย","Warn the people you brought in"],["ลงเงินเองก็ยังเป็นการเลี้ยงวง","Paying in still feeds the scheme"],["หลักฐานต้องรวมกัน","Evidence needs to be pooled"]]],
  E3:["danger",["แม่ท้าวหายไปพร้อม 20 ล้าน","The host vanished with 20 million"],["วงล่มในคืนเดียว แม่ท้าวปิดเฟซหายไปพร้อมเงินราว 20 ล้าน และเจ๊น้อยถูกแม่ค้าที่ชวนมาแจ้งความด้วย","It collapsed overnight. The host deleted her account and vanished with about 20 million, and the sellers Jae Noi recruited filed complaints against her too."],[["ชวนคนเพิ่ม = ทำให้คนรอบตัวเสียหาย","Recruiting hurts the people around you"],["แชร์ลูกโซ่ล่มเสมอ","Ponzi schemes always collapse"],["ไม่มีวง VIP ที่ปลอดภัย","No VIP circle is safe"]]]
 }},

/* ---------------- mini mart ---------------- */
atm:{level:"ยาก", title:["ลุงคุยโทรศัพท์หน้าตู้ ATM","The uncle on the phone at the ATM"],
 learn:[["แก๊งคอลเซ็นเตอร์อ้างเป็นตำรวจ/ปปง.","Call-centre gangs posing as police or AMLO"],["ตำรวจไม่สั่งให้โอนเงินไปตรวจสอบ","Police never ask you to transfer money for checking"],["ชั่วโมงแรกสำคัญที่สุด","The first hour matters most"],["ช่วยอย่างนุ่มนวล ไม่หักหน้า","Help gently, don't humiliate"]],
 scenes:{
  s1:{title:["ลุงกดโอนไม่หยุด","He keeps transferring"],
   body:i=>`<p>${X(i,"ลุงสมศักดิ์ยืนหน้าตู้ ATM มาเกือบชั่วโมง เสียงจากโทรศัพท์ในกระเป๋าเสื้อดังพอได้ยิน","Uncle Somsak has been at the ATM for almost an hour. You can hear the phone in his shirt pocket.")}</p>
   ${staff(X(i,"“พ.ต.ท.” ในสาย","“Police Lt Col” on the line"),X(i,"ชื่อลุงพัวพันคดีฟอกเงิน ต้องโอนเงินทั้งหมดเข้าบัญชีตรวจสอบของ ปปง. ห้ามบอกใคร ไม่งั้นออกหมายจับวันนี้","Your name is linked to money laundering. Transfer all your money to the AMLO checking account. Tell no one, or we issue an arrest warrant today."),"☎️")}
   <p>${X(i,"ลุงหันมาตวาด “อย่ายุ่ง ตำรวจสั่งห้ามบอกใคร” ในบัญชีมีเงินบำนาญ 2,600,000 บาท","He snaps at you, “Stay out of it. The police said tell no one.” His account holds a 2.6-million pension.")}</p>`,
   clues:[["ตำรวจจริงไม่สั่งให้โอนเงินไปตรวจสอบ","Real police never ask for money to be “checked”"],["ห้ามบอกใคร = แยกเหยื่อออกจากคนช่วย","“Tell no one” isolates the victim"],["สั่งให้โอนทั้งหมด","Told to move everything"]],
   choices:[["พูดกับลุงเบาๆ ขอให้พนักงานร้านช่วยโทร 191 ยืนยันกับตำรวจจริงก่อน แค่สองนาที","Speak softly and ask the cashier to call 191 to check with the real police. Just two minutes","s2a","good"],
            ["คว้าโทรศัพท์ลุงมาด่าคนร้ายแล้ววางสาย","Grab his phone, yell at the scammer and hang up","s2b","risky"],
            ["ไม่ใช่เรื่องของเรา ลุงคงรู้ดี","Not our business. He knows what he's doing","E3","bad"]]},
  s2a:{title:["ตำรวจจริงบอกว่าไม่มีคดี","The real police say there's no case"],
   body:i=>`<p>${X(i,"191 ยืนยันว่าไม่มีคดีและไม่มีบัญชีตรวจสอบแบบนั้น ลุงทรุดลงนั่ง “ลุงโอนไปแล้วสองรอบ สี่แสน…”","191 confirms there's no case and no such account. Uncle sits down heavily. “I've already sent two transfers. 400,000…”")}</p>`,
   clues:[["แจ้งธนาคารภายในชั่วโมงแรก","Tell the bank within the first hour"],["1441 ช่วยอายัดข้ามธนาคารได้","1441 can freeze across banks"],["ปลอบลุง ไม่ซ้ำเติม","Comfort him, don't blame him"]],
   choices:[["โทรสายด่วนธนาคารให้ระงับบัญชีลุง แล้วแจ้ง 1441 ให้อายัดบัญชีปลายทางทันที","Call the bank hotline to lock his account, then 1441 to freeze the receiving accounts right away","E1","good"],
            ["พาลุงกลับบ้านไปพักก่อน พรุ่งนี้ค่อยไปแจ้ง","Take him home to rest and report tomorrow","E2","risky"],
            ["โทรกลับเบอร์คนร้ายขอเงินคืน","Call the scammer back to demand the money","E3","bad"]]},
  s2b:{title:["ลุงโกรธและกลัว","He's angry and scared"],
   body:i=>`<p>${X(i,"ลุงตะโกน “ลื้อทำให้ลุงโดนจับ!” แล้วคนร้ายก็โทรกลับมาทันที “มีคนขัดขวางเจ้าหน้าที่ ลุงต้องโอนเดี๋ยวนี้”","He shouts, “You'll get me arrested!” and the scammer calls straight back: “Someone obstructed an officer. Transfer now.”")}</p>`,
   clues:[["หักหน้าทำให้เหยื่อยิ่งเชื่อคนร้าย","Humiliation pushes victims toward the scammer"],["ใจเย็น ให้ลุงตัดสินใจเอง","Stay calm and let him decide"],["ให้คนที่ลุงไว้ใจช่วยยืนยัน","Get someone he trusts to help"]],
   choices:[["ขอโทษลุง แล้วชวนโทรหาลูกสาวลุงกับ 191 ด้วยกัน","Apologise, then offer to call his daughter and 191 together","s2a","good"],
            ["เรียก รปภ. มากันลุงไว้ไม่ให้กดตู้","Call security to keep him away from the ATM","E2","risky"],
            ["ปล่อยลุงไป ลุงไม่เชื่อเราแล้ว","Let him go. He won't listen now","E3","bad"]]}
 },
 endings:{
  E1:["safe",["อายัดทัน 2,200,000 บาทยังอยู่","Frozen in time, 2,200,000 baht safe"],["ธนาคารระงับบัญชีลุงทันที และ 1441 อายัดเงินสี่แสนไว้ได้เกือบหมด ลูกสาวลุงรีบมารับพร้อมขอบคุณพนักงานร้าน","The bank locked his account and 1441 froze most of the 400,000. His daughter came to pick him up and thanked the cashier."],[["ตำรวจไม่มีบัญชีตรวจสอบเงิน","Police have no “checking account”"],["ชั่วโมงแรกคือโอกาสได้เงินคืน","The first hour is when money comes back"],["ช่วยอย่างอ่อนโยน","Help gently"]]],
  E2:["warn",["เงินที่เหลือปลอดภัย แต่สี่แสนไปแล้ว","The rest is safe, 400,000 gone"],["ลุงไม่ได้โอนเพิ่ม แต่กว่าจะแจ้ง เงินสี่แสนถูกโอนต่อไปหลายทอดจนตามไม่ทัน","Uncle sent nothing more, but by the time they reported, the 400,000 had moved through too many accounts."],[["อย่ารอถึงพรุ่งนี้","Don't wait until tomorrow"],["ใช้กำลังทำให้ลุงกลัว","Force makes him more scared"],["แจ้งธนาคารทันที","Call the bank at once"]]],
  E3:["danger",["เงินเกษียณ 2,600,000 บาทหมดบัญชี","A 2.6-million pension gone"],["ลุงโอนจนหมดบัญชีภายในบ่ายวันเดียว “พ.ต.ท.” ปิดเบอร์หายไป","He emptied his account in one afternoon. The “Lt Col” switched off his number and vanished."],[["ห้ามบอกใคร = สัญญาณอันตราย","“Tell no one” = danger"],["เห็นคนโอนเงินแปลกๆ ช่วยได้","You can help when you see it happen"],["ห้ามโทรกลับหาคนร้าย","Never call the scammer back"]]]
 }},

wrong:{level:"ยาก", title:["เงินโอนผิดเข้าบัญชี 5 หมื่น","50,000 sent to you by mistake"],
 learn:[["กลโกงโอนผิดแล้วขอคืน","The “wrong transfer” trick"],["ให้ธนาคารเป็นคนคืนเงิน","Let the bank return it"],["เสี่ยงกลายเป็นบัญชีม้า","Risk of becoming a mule account"],["เช็กเครดิตบูโรเมื่อข้อมูลหลุด","Check your credit report if your ID leaked"]],
 scenes:{
  s1:{title:["มีเงินเข้ามาเอง 50,000","50,000 appears out of nowhere"],
   body:i=>`<p>${X(i,"น้องปรางพนักงานร้านยื่นมือถือให้ดู “อยู่ๆ มีเงินเข้ามาห้าหมื่น แล้วมีคนโทรมาขอให้โอนคืนค่ะ”","Prang the cashier shows you her phone. “Fifty thousand just came in, then someone called asking me to send it back.”")}</p>
   ${notif([X(i,"💰 เงินเข้า 50,000.00 จาก บจก. ควิกแคช","💰 Received 50,000.00 from QuickCash Co."),X(i,"📩 SMS: สินเชื่อของท่านอนุมัติแล้ว 50,000 บาท","📩 SMS: Your 50,000-baht loan has been approved")])}
   ${chat("?",X(i,"เบอร์ไม่รู้จัก","Unknown number"),X(i,"โทรมาเมื่อกี้","called just now"),[X(i,"ขอโทษนะคะ โอนผิด ช่วยโอนคืนเข้าบัญชี น.ส. ปวีณา หน่อยนะคะ ด่วนมาก 🙏","Sorry, wrong transfer! Please send it back to Ms Paweena's account, it's urgent 🙏")])}`,
   clues:[["บัญชีที่ขอให้โอนคืนไม่ใช่บัญชีที่โอนมา","The return account isn't the one that sent it"],["อาจเป็นเงินกู้ในชื่อเรา","It may be a loan in her name"],["ถ้าโอนต่อ เราอาจกลายเป็นบัญชีม้า","Passing it on could make her a mule"]],
   choices:[["ไม่โอนเอง โทรสายด่วนธนาคารให้ตรวจรายการ และให้ธนาคารเป็นคนคืน","Don't send anything. Call her bank to check the transaction and let the bank return it","s2a","good"],
            ["โอนคืนเข้าบัญชีต้นทางที่โอนมาเอง ไม่ใช่บัญชีที่เขาบอก","Send it back to the account it came from, not the one they named","s2b","risky"],
            ["โอนเข้าบัญชีที่เขาบอก เขาพูดสุภาพดี","Send it where they asked. They were polite","E3","bad"]]},
  s2a:{title:["เป็นเงินกู้ในชื่อของปราง","It's a loan in Prang's name"],
   body:i=>`<p>${X(i,"ธนาคารพบว่าเงินมาจากแอปกู้เงินเถื่อน ที่มีคนสมัครด้วยชื่อและบัตรของปราง ปรางนึกออก “เดือนก่อนส่งรูปบัตรประชาชนสมัครงานออนไลน์…”","The bank finds it came from an unlicensed loan app someone signed up for with Prang's name and ID. She remembers: “Last month I sent a photo of my ID card for an online job…”")}</p>`,
   clues:[["รูปบัตรถูกเอาไปเปิดเงินกู้","Her ID photo was used for a loan"],["ให้ธนาคารคืนเงินตามระบบ","Let the bank return it properly"],["เช็กเครดิตบูโรว่ามีหนี้อะไรในชื่อเรา","Check the credit bureau for other debts"]],
   choices:[["ให้ธนาคารคืนเงินตามระบบ แจ้งความว่าข้อมูลถูกใช้ และเช็กเครดิตบูโร","Have the bank return it, report the ID misuse to police, and check her credit report","E1","good"],
            ["ให้ธนาคารคืนเงิน แต่ไม่ต้องแจ้งความ","Have the bank return it, but skip the police report","E2","risky"],
            ["ใช้เงินนี้ไปก่อน เดี๋ยวค่อยคืน","Use the money for now and repay later","E3","bad"]]},
  s2b:{title:["เงินกลับต้นทาง แต่หนี้ยังอยู่","Money returned, debt still there"],
   body:i=>`<p>${X(i,"ต้นทางคือแอปกู้เงินเถื่อน ไม่กี่ชั่วโมงต่อมามีคนโทรทวง “ยังค้าง 50,000 บวกดอก 30% ต่อสัปดาห์ ไม่จ่ายจะประจานรูปให้ทุกคนในรายชื่อ”","The source was a loan shark app. Hours later a collector calls: “You still owe 50,000 plus 30% a week. Pay or we send your photo to all your contacts.”")}</p>`,
   clues:[["แอปกู้เถื่อนขู่ประจาน","Illegal lenders threaten to shame you"],["คืนเองไม่มีหลักฐานตามระบบ","Returning it yourself leaves no official record"],["แอปไม่มีใบอนุญาตจากแบงก์ชาติ","The app has no central bank licence"]],
   choices:[["เก็บหลักฐานการคืนเงิน แจ้งธนาคาร แจ้งความเรื่องแอปกู้เถื่อน และเช็กเครดิตบูโร","Keep proof of the return, tell the bank, report the loan app, and check her credit report","E2","good"],
            ["บล็อกเบอร์ทวงหนี้แล้วเงียบไว้","Block the collector and stay quiet","E3","risky"],
            ["จ่ายดอกให้จบๆ ไป","Pay the interest to make it stop","E3","bad"]]}
 },
 endings:{
  E1:["safe",["ไม่กลายเป็นบัญชีม้า","Not turned into a mule"],["ธนาคารคืนเงินตามระบบ ตำรวจรับแจ้งว่าข้อมูลของปรางถูกใช้ และเครดิตบูโรไม่มีหนี้อื่นเพิ่ม","The bank returned the money properly, police logged the ID misuse, and her credit report showed no other debts."],[["เงินโอนผิด ให้ธนาคารจัดการ","Wrong transfers: let the bank handle it"],["อย่าส่งรูปบัตรให้คนแปลกหน้า","Never send ID photos to strangers"],["บัญชีที่ขอให้คืนต่างจากต้นทาง = หลอก","A different return account = scam"]]],
  E2:["warn",["เงินคืนแล้ว แต่ยังต้องเคลียร์ชื่อ","Money returned, name still to clear"],["ปรางไม่ได้โอนต่อให้ใคร แต่ยังต้องวิ่งเคลียร์หนี้และการขู่จากแอปกู้เถื่อนอีกหลายสัปดาห์","Prang didn't pass the money on, but spent weeks clearing the debt and threats from the loan app."],[["แจ้งความไว้ช่วยยืนยันว่าเราเป็นเหยื่อ","A police report proves you're the victim"],["แอปกู้เถื่อนไม่มีอำนาจตามกฎหมาย","Illegal lenders have no legal power"],["เก็บหลักฐานทุกอย่าง","Keep every piece of evidence"]]],
  E3:["danger",["บัญชีถูกอายัด โดนคดีบัญชีม้า","Account frozen, mule charges"],["บัญชีของปรางกลายเป็นทางผ่านของเงินโกงกว่า 3 ล้าน เธอถูกอายัดบัญชีและถูกเรียกไปให้ปากคำในคดีบัญชีม้า","Prang's account became a route for over 3 million in scam money. It was frozen and she was called in over mule-account charges."],[["โอนต่อตามคำขอ = เป็นทางผ่านเงินโกง","Forwarding on request = moving scam money"],["ใช้เงินที่ไม่ใช่ของเราผิดกฎหมาย","Spending money that isn't yours is illegal"],["อย่าจ่ายดอกแอปกู้เถื่อน","Never pay loan-shark interest"]]]
 }},

/* ---------------- phone shop ---------------- */
simswap:{level:"ยาก", title:["มือถือไม่มีสัญญาณ แล้วเงินก็หาย","No signal, then the money goes"],
 learn:[["การสลับซิม (SIM swap)","SIM swapping"],["OTP ทาง SMS ถูกขโมยได้","SMS codes can be stolen"],["ระงับบัญชีให้เร็วที่สุด","Lock accounts as fast as possible"],["ใช้แอปยืนยันตัวตนแทน SMS","Use an authenticator app instead of SMS"]],
 scenes:{
  s1:{title:["สัญญาณหายตั้งแต่เมื่อคืน","No signal since last night"],
   body:i=>`<p>${X(i,"พี่แจ็คเจ้าของร้านอาหารยื่นมือถือให้ช่างต้น “ขึ้นว่าไม่มีบริการตั้งแต่เมื่อคืน เมื่อวานมีเจ้าหน้าที่ค่ายโทรมาอัปเกรด 5G ฟรี ให้บอกเลขบัตรกับวันเกิด พี่ก็บอกไป”","Jack, a restaurant owner, hands his phone to Ton. “It's said No Service since last night. Yesterday a ‘network agent’ called about a free 5G upgrade and asked my ID number and birthday, so I told them.”")}</p>
   ${notif([X(i,"📶 ไม่มีบริการ","📶 No service"),X(i,"✉️ อีเมลธนาคาร: เข้าสู่ระบบจากอุปกรณ์ใหม่ 02:14","✉️ Bank email: new device sign-in at 02:14")])}
   <p>${X(i,"บัญชีร้านมีเงินหมุนเวียน 1,800,000 บาท","The restaurant account holds 1,800,000 baht.")}</p>`,
   clues:[["สัญญาณหายกะทันหัน อาจถูกสลับซิม","Sudden No Service may be a SIM swap"],["OTP จะไปเข้าซิมของคนร้าย","OTPs now go to the scammer's SIM"],["เคยให้ข้อมูลส่วนตัวทางโทรศัพท์","He gave personal data over the phone"]],
   choices:[["ใช้มือถือร้านโทรสายด่วนธนาคารให้ระงับแอปทันที แล้วไปศูนย์บริการค่ายพร้อมบัตรประชาชน","Use the shop phone to call the bank and lock the app, then go to the network's service centre with his ID","s2a","good"],
            ["รีสตาร์ทเครื่องแล้วรอดูอีกชั่วโมง น่าจะเสามีปัญหา","Restart and wait an hour. Probably a tower problem","s2b","risky"],
            ["โทรกลับหาเจ้าหน้าที่ค่ายคนเมื่อวานให้ช่วยแก้","Call yesterday's “agent” back to fix it","E3","bad"]]},
  s2a:{title:["ระงับทัน แต่มีรายการค้างอยู่","Locked in time, with pending transfers"],
   body:i=>`<p>${X(i,"ธนาคารพบรายการรออนุมัติสามรายการ รวม 1,200,000 บาท ระงับได้ทันทั้งหมด แต่มีหนึ่งรายการ 2 แสนออกไปแล้วตอนตีสอง ค่ายบอกว่ามีคนถือบัตรปลอมมาขอออกซิมใหม่เมื่อวานเย็น","The bank finds three pending transfers worth 1,200,000 baht and stops them all, but 200,000 already went at 2 am. The network says someone with a fake ID got a replacement SIM yesterday evening.")}</p>`,
   clues:[["ขอซิมคืนจากค่าย","Get the number back from the network"],["เปลี่ยนรหัสอีเมลและธนาคาร","Change email and bank passwords"],["ใช้แอปยืนยันตัวตนแทน SMS","Use an authenticator app instead of SMS"]],
   choices:[["คืนซิม เปลี่ยนรหัสทุกบัญชี เปิดการยืนยันแบบแอปแทน SMS และแจ้งความ","Recover the SIM, change every password, switch to app-based verification, and file a report","E1","good"],
            ["คืนซิมอย่างเดียว รหัสไม่ต้องเปลี่ยน","Just recover the SIM. No need to change passwords","E2","risky"],
            ["ขอให้ธนาคารเปิดบัญชีกลับเหมือนเดิมเลย จะได้ใช้จ่ายในร้านต่อ","Ask the bank to unlock everything as before so the shop can keep paying","E2","bad"]]},
  s2b:{title:["ผ่านไปหนึ่งชั่วโมง","An hour later"],
   body:i=>`${notif([X(i,"✉️ โอนเงินสำเร็จ 500,000 บาท","✉️ Transfer successful: 500,000 baht"),X(i,"✉️ โอนเงินสำเร็จ 500,000 บาท","✉️ Transfer successful: 500,000 baht"),X(i,"✉️ เปลี่ยนอีเมลติดต่อสำเร็จ","✉️ Contact email changed")])}`,
   clues:[["ทุกนาทีมีค่า","Every minute counts"],["ซิมหายไม่ใช่เรื่องเสา","It isn't the tower"],["ต้องระงับก่อนทำอย่างอื่น","Lock first, everything else after"]],
   choices:[["รีบโทรธนาคารจากเบอร์อื่นให้ระงับทันที","Call the bank from another phone and lock it now","E2","good"],
            ["ไปธนาคารพรุ่งนี้เช้าตอนสาขาเปิด","Go to the branch tomorrow morning","E3","risky"],
            ["รอให้ค่ายแก้สัญญาณก่อน","Wait for the network to fix the signal","E3","bad"]]}
 },
 endings:{
  E1:["safe",["1,600,000 บาทยังอยู่","1,600,000 baht saved"],["ระงับรายการได้เกือบหมด ซิมกลับมาเป็นของพี่แจ็ค และตอนนี้ทุกบัญชีใช้แอปยืนยันตัวตนแทน SMS","Almost every transfer was stopped, the number is Jack's again, and every account now uses an authenticator app."],[["ไม่มีสัญญาณกะทันหัน = รีบเช็ก","Sudden No Service = act fast"],["อย่าให้เลขบัตรทางโทรศัพท์","Never give your ID number by phone"],["SMS OTP ไม่ปลอดภัยพอสำหรับเงินก้อนใหญ่","SMS codes aren't enough for big money"]]],
  E2:["warn",["เสียไปบางส่วน","Some of it lost"],["บัญชีถูกระงับทัน แต่เงินบางส่วนออกไปแล้ว และคนร้ายยังมีรหัสอีเมลเดิมอยู่","The account was locked in time, but some money was gone and the scammers still knew his old email password."],[["ระงับก่อน คิดทีหลัง","Lock first, think later"],["เปลี่ยนรหัสทุกที่หลังโดนสลับซิม","Change every password after a SIM swap"],["อย่ารีบเปิดบัญชีกลับ","Don't rush to unlock"]]],
  E3:["danger",["เงินร้าน 1,800,000 บาทหมดในคืนเดียว","1,800,000 baht gone in one night"],["คนร้ายใช้ OTP ที่เข้าซิมใหม่โอนเงินร้านออกจนหมด พี่แจ็คต้องปิดร้านชั่วคราวเพราะไม่มีเงินจ่ายลูกน้อง","The scammers used the OTPs on the new SIM to empty the account. Jack had to close the restaurant for a while, unable to pay staff."],[["อย่าโทรกลับหาคนที่ขอข้อมูลเรา","Never call back whoever asked for your data"],["รอ = เสียเพิ่ม","Waiting = losing more"],["ใช้สายด่วนธนาคารจากเครื่องอื่น","Use the bank hotline from another phone"]]]
 }},

apk:{level:"ยาก", title:["แอปคืนภาษีจากไลน์ “กรมสรรพากร”","A tax-refund app from “Revenue Department” LINE"],
 learn:[["แอปดูดเงิน (มัลแวร์ควบคุมเครื่อง)","Remote-control banking malware"],["หน่วยงานรัฐไม่แอดไลน์มาคืนเงิน","Government agencies don't add you on LINE"],["ตัดอินเทอร์เน็ตทันที","Cut the internet immediately"],["ล้างเครื่องหลังติดมัลแวร์","Factory-reset after infection"]],
 scenes:{
  s1:{title:["จอขึ้นว่ากำลังอัปเดต ห้ามปิดเครื่อง","“Updating, do not turn off”"],
   body:i=>`<p>${X(i,"ลุงชิตถือมือถือมาที่ร้าน “เมื่อวานไลน์สรรพากรแอดมา บอกว่าลุงได้คืนภาษีหมื่นสอง ให้ลงแอปจากลิงก์ ลุงกดอนุญาตตามที่เขาบอกทุกอย่าง ตอนนี้จอเป็นแบบนี้” ในแอปธนาคารของลุงมีเงินขายที่ดิน 4,200,000 บาท","Uncle Chit brings his phone in. “Yesterday the ‘Revenue Department’ added me on LINE and said I'm due a 12,000 refund. I installed their app from a link and allowed everything they said. Now the screen is like this.” His bank app holds 4,200,000 baht from selling land.")}</p>
   ${perm(X(i,"⚙️ กำลังอัปเดตระบบ","⚙️ System updating"),X(i,"ห้ามปิดเครื่องหรือปิดอินเทอร์เน็ต 30 นาที","Do not turn off or disconnect for 30 minutes"),"23%","")}`,
   clues:[["หน่วยงานรัฐไม่แอดไลน์มาคืนภาษี","Agencies don't add you on LINE for refunds"],["แอปนอกสโตร์ + สิทธิ์ช่วยเหลือพิเศษ = คุมเครื่องได้","Off-store app + accessibility permission = full control"],["จอ “ห้ามปิดเครื่อง” ปิดบังว่ากำลังโอนเงิน","The “do not turn off” screen hides transfers"]],
   choices:[["ตัดเน็ตทันที (โหมดเครื่องบินหรือถอดซิม) แล้วโทรธนาคารจากเครื่องร้านให้ระงับบัญชี","Cut the internet now (airplane mode or pull the SIM), then call the bank from the shop phone to lock the account","s2a","good"],
            ["รอให้อัปเดตเสร็จ 30 นาที เครื่องจะได้ไม่พัง","Let the update finish so the phone isn't damaged","s2b","risky"],
            ["ทำตามไลน์สรรพากรต่อ ให้ใส่ PIN อีกครั้งเพื่อรับเงิน","Keep following the LINE account and re-enter the PIN to get the refund","E3","bad"]]},
  s2a:{title:["หยุดได้กลางทาง","Stopped mid-way"],
   body:i=>`<p>${X(i,"ธนาคารพบว่ามีโอนออกไปแล้วสองรายการ รายการละ 49,999 ที่เหลือระงับทัน ช่างต้นบอกว่า “แอปปลอมยังอยู่ในเครื่อง ถ้าเปิดเน็ตกลับมันก็ทำงานต่อ”","The bank finds two transfers of 49,999 already gone and stops the rest. Ton says, “The fake app is still in the phone. Turn the internet back on and it carries on.”")}</p>`,
   clues:[["แอปยังอยู่ = ยังอันตราย","App still installed = still dangerous"],["ล้างเครื่อง แล้วเปลี่ยนรหัสจากเครื่องอื่น","Reset, then change passwords from another device"],["ห้ามเปิดแอปธนาคารบนเครื่องนี้จนกว่าจะล้าง","Don't open banking on this phone until it's reset"]],
   choices:[["สำรองรูป ล้างเครื่องคืนค่าโรงงาน แล้วเปลี่ยนรหัสธนาคารจากเครื่องที่ปลอดภัย","Back up photos, factory-reset, then change bank passwords from a safe device","E1","good"],
            ["ลบแอปสรรพากรออกก็น่าจะพอ","Deleting the fake app should be enough","E2","risky"],
            ["เปิดเน็ตกลับเพื่อเช็กยอดในแอปธนาคาร","Turn the internet back on to check the balance","E3","bad"]]},
  s2b:{title:["อัปเดตยังไม่เสร็จ…","Still “updating”…"],
   body:i=>`${notif([X(i,"📩 SMS: โอนเงิน 1,000,000.00 สำเร็จ","📩 SMS: transfer of 1,000,000.00 successful"),X(i,"📩 SMS: เปลี่ยนวงเงินโอนต่อวันเป็น 5,000,000","📩 SMS: daily transfer limit changed to 5,000,000")])}`,
   clues:[["ระหว่าง “อัปเดต” คนร้ายใช้แอปธนาคารอยู่","During the “update” the scammer is using his banking app"],["ตัดเน็ตทันที","Cut the internet now"],["ยิ่งรอยิ่งเสีย","Every minute costs more"]],
   choices:[["ตัดเน็ตทันทีแล้วโทรธนาคาร","Cut the internet now and call the bank","E2","good"],
            ["โทรถามไลน์สรรพากรว่าทำไมมีเงินออก","Message the LINE account to ask why money left","E3","risky"],
            ["รอให้ครบ 30 นาทีตามที่จอบอก","Wait the full 30 minutes as the screen says","E3","bad"]]}
 },
 endings:{
  E1:["safe",["4 ล้านปลอดภัย","4 million safe"],["เสียไปเกือบหนึ่งแสน แต่เงินขายที่ดินที่เหลือปลอดภัย เครื่องถูกล้างสะอาด และลุงตั้งใจจะเตือนเพื่อนในชมรมผู้สูงอายุ","He lost almost 100,000, but the rest of the land money is safe, the phone is clean, and Uncle Chit plans to warn his seniors' club."],[["หน่วยงานรัฐไม่ส่งแอปทางไลน์","Agencies don't send apps over LINE"],["ลงแอปจากสโตร์เท่านั้น","Install apps from the store only"],["จอแปลก = ตัดเน็ตก่อน","Strange screen = cut the internet first"]]],
  E2:["warn",["เสียไปล้านกว่า","Over a million lost"],["ระงับได้ก่อนเงินหมด แต่บางส่วนออกไปแล้ว หรือแอปที่ซ่อนอยู่ยังแอบส่งข้อมูลต่อ","The account was locked before it emptied, but some money was gone, or a hidden app kept sending data."],[["ลบแอปอย่างเดียวไม่พอ ต้องล้างเครื่อง","Deleting isn't enough. Reset the phone"],["ถามคนร้ายไม่ได้อะไร","Asking the scammer gets you nothing"],["ระงับก่อน","Lock first"]]],
  E3:["danger",["เงินขายที่ดิน 4,200,000 บาทหายหมด","4,200,000 baht of land money gone"],["ระหว่างที่จอขึ้นว่ากำลังอัปเดต คนร้ายเพิ่มวงเงินแล้วโอนออกจนหมดบัญชี","While the screen said “updating”, the scammer raised the limit and emptied the account."],[["“ห้ามปิดเครื่อง” คือกับดัก","“Do not turn off” is a trap"],["อย่าใส่ PIN ตามที่คนแปลกหน้าบอก","Never enter your PIN on a stranger's instruction"],["ตัดเน็ตแล้วโทรธนาคารทันที","Cut the internet and call the bank at once"]]]
 }},

deepfake:{level:"ยาก", title:["ลูกชายวิดีโอคอลมาขอเงินด่วน","A video call from her son asking for money"],
 learn:[["Deepfake ปลอมหน้าและเสียงด้วย AI","Deepfakes copy faces and voices with AI"],["ยืนยันด้วยเบอร์เดิมที่บันทึกไว้","Verify on the number you already saved"],["ตั้งคำลับประจำครอบครัว","Set a family code word"],["วิธีสังเกตวิดีโอปลอม","How to spot a fake video"]],
 scenes:{
  s1:{title:["หน้าลูกจริงๆ เสียงก็ใช่","His face, his voice"],
   body:i=>`<p>${X(i,"ป้านวลรีบเข้ามาที่ร้าน “ตั้มลูกป้าวิดีโอคอลมา หน้าตั้มจริงๆ เสียงก็ใช่ บอกว่ารถชน ต้องวางมัดจำโรงพยาบาลสามแสนแปด ให้โอนเข้าบัญชีเพื่อน ห้ามบอกพ่อ มือถือพังเลยใช้เบอร์เพื่อน ป้าจะโอนแล้ว แต่แอปขึ้นเตือน”","Auntie Nuan hurries in. “My son Tam video-called. It was his face, his voice. He crashed his car and needs a 380,000 hospital deposit, sent to his friend's account, and not to tell his dad. His phone broke so he used a friend's. I was about to pay but the app warned me.”")}</p>
   ${chat("ต",X(i,"ตั้ม (เบอร์ใหม่)","Tam (new number)"),X(i,"วิดีโอคอล 0:15","video call 0:15"),[X(i,"แม่ รีบหน่อยนะ หมอรออยู่","Mum please hurry, the doctor's waiting"),X(i,"อย่าบอกพ่อนะ พ่อจะโกรธ","Don't tell Dad, he'll be angry")])}`,
   clues:[["AI ปลอมหน้าและเสียงได้จากคลิปในโซเชียล","AI can copy a face and voice from social clips"],["คอลสั้นแล้วย้ายไปแชต","A short call, then switch to chat"],["เบอร์ใหม่ + บัญชีเพื่อน + ห้ามบอกใคร","New number + friend's account + secrecy"]],
   choices:[["โทรกลับเบอร์เดิมของตั้มที่บันทึกไว้ หรือถามเรื่องที่รู้กันแค่ในครอบครัว","Call Tam on his saved number, or ask something only the family knows","s2a","good"],
            ["ขอให้ตั้มวิดีโอคอลอีกรอบให้นานกว่านี้","Ask Tam to video-call again for longer","s2b","risky"],
            ["หน้าลูกชัดขนาดนั้น ปิดคำเตือนแล้วโอนเลย","His face was that clear. Dismiss the warning and pay","E3","bad"]]},
  s2a:{title:["ตั้มตัวจริงกำลังเรียนอยู่","The real Tam is in class"],
   body:i=>`<p>${X(i,"ตั้มรับสายจากเบอร์เดิม “ผมอยู่ในห้องเรียนครับแม่ ไม่ได้เป็นอะไร” ป้านวลนั่งลง “แล้วหน้ากับเสียงนั่นมาจากไหน” ช่างต้นชี้ไปที่คลิป TikTok ของตั้มที่พูดหน้ากล้องเป็นร้อยคลิป","Tam answers on his usual number. “I'm in class, Mum. I'm fine.” Auntie Nuan sits down. “Then where did that face and voice come from?” Ton points to Tam's TikTok: a hundred clips of him talking to the camera.")}</p>`,
   clues:[["ตั้งคำลับประจำครอบครัว","Set a family code word"],["คลิปพูดหน้ากล้องคือวัตถุดิบของ AI","Talking-to-camera clips are AI raw material"],["รายงานบัญชีที่ใช้หลอก","Report the account used"]],
   choices:[["รายงานเบอร์และบัญชีคนร้าย แล้วตั้งคำลับประจำครอบครัวไว้ใช้ยืนยัน","Report the number and account, and set a family code word for next time","E1","good"],
            ["บล็อกเบอร์แล้วจบ ไม่ต้องบอกใคร","Block the number and leave it at that","E2","risky"],
            ["โทรด่าคนร้ายกลับให้หายแค้น","Call the scammer back to give them a piece of her mind","E2","bad"]]},
  s2b:{title:["คอลรอบสอง","The second call"],
   body:i=>`<p>${X(i,"ตั้มคอลมาอีกครั้ง พอหันข้าง ขอบหน้าเบลอและกระพริบ เสียงร้องไห้ “แม่ไม่เชื่อผมเหรอ ผมเจ็บอยู่นะ”","Tam calls again. When he turns sideways, the edge of his face blurs and flickers. He sobs, “Don't you believe me, Mum? I'm hurt.”")}</p>`,
   clues:[["หันข้างหรือเอามือบังหน้า ภาพ AI มักเพี้ยน","Turning sideways or a hand over the face breaks AI video"],["ใช้ความรู้สึกผิดกดดัน","Guilt is used as pressure"],["ยังต้องยืนยันด้วยช่องทางอื่น","Still verify another way"]],
   choices:[["วางสาย แล้วโทรหาตั้มที่เบอร์เดิมที่บันทึกไว้","Hang up and call Tam on his saved number","s2a","good"],
            ["โอนไปห้าหมื่นก่อนให้หมอรักษา ที่เหลือค่อยว่ากัน","Send 50,000 now for treatment, sort the rest later","E2","risky"],
            ["ลูกร้องไห้ขนาดนี้ โอนเลย","He's crying. Pay it all","E3","bad"]]}
 },
 endings:{
  E1:["safe",["ครอบครัวมีคำลับแล้ว","The family has a code word"],["ไม่เสียเงินสักบาท บัญชีคนร้ายถูกรายงาน และบ้านนี้มีคำลับที่ไม่เคยโพสต์ไว้ที่ไหนเลย","Not a baht lost. The account was reported, and the family now has a code word that's never been posted anywhere."],[["เห็นหน้าได้ยินเสียง ก็ยังปลอมได้","Face and voice can both be faked"],["โทรกลับเบอร์เดิมทุกครั้ง","Always call the saved number"],["คำลับครอบครัวกันคนร้ายได้","A family code word stops them"]]],
  E2:["warn",["รอดรอบนี้","Safe for now"],["ป้านวลไม่ได้เสียก้อนใหญ่ แต่คนร้ายยังใช้หน้าตั้มไปหลอกญาติคนอื่นต่อ หรือเงินห้าหมื่นไม่ได้คืน","Auntie Nuan didn't lose the big amount, but the scammers used Tam's face on other relatives, or the 50,000 never came back."],[["รายงานบัญชีช่วยคนอื่นด้วย","Reporting protects others too"],["ด่าคนร้ายไม่ได้อะไร","Yelling at scammers achieves nothing"],["โอนน้อยก็ยังเสีย","A small payment is still lost"]]],
  E3:["danger",["เกือบล้านหายไปกับลูกปลอม","Nearly a million lost to a fake son"],["ป้านวลโอนสามแสนแปด แล้ว “ตั้ม” ขอค่าผ่าตัดต่ออีก รวมเกือบล้าน กว่าจะรู้ความจริงตั้มก็โทรมาถามว่าแม่หายไปไหนทั้งวัน","She sent 380,000, then “Tam” needed surgery money. Nearly a million in all, before the real Tam called asking where she'd been all day."],[["อย่าปิดคำเตือนของแอปธนาคาร","Don't dismiss your banking app's warnings"],["ห้ามบอกใคร = สัญญาณอันตราย","Secrecy = red flag"],["ความรักถูกใช้เป็นอาวุธได้","Love can be used as a weapon"]]]
 }},

/* ---------------- dorm ---------------- */
task:{level:"ยาก", title:["งานออนไลน์กดไลก์ ได้วันละ 500","Like videos online, earn 500 a day"],
 learn:[["หลอกทำภารกิจออนไลน์ (task scam)","Online task scams"],["งานที่ต้องจ่ายก่อน = หลอก","A job you pay for = scam"],["เงินก้อนแรกได้จริงเพื่อให้เชื่อ","The first payouts are real to hook you"],["บอกคนที่ไว้ใจดีกว่าแก้คนเดียว","Telling someone beats fixing it alone"]],
 scenes:{
  s1:{title:["ทำภารกิจได้เงินจริง","The tasks really paid"],
   body:i=>`<p>${X(i,"น้องแบมนั่งตาแดงอยู่ที่โซฟา “ตอนแรกแค่กดไลก์คลิปได้ 150 ได้ 300 จริงๆ พอเป็นภารกิจพิเศษต้องเติมเงินก่อน เติมไปแล้วสองแสนสาม ทั้งค่าเทอมและเงินยืมเพื่อน ตอนนี้ระบบบอกว่าทำผิดลำดับ ต้องเติมอีกสี่แสนห้า ถึงจะกู้คืนยอด 1,100,000 บาท”","Bam sits red-eyed on the sofa. “At first I just liked clips and really got 150, then 300. Then the special tasks needed a top-up first. I've put in 230,000, my tuition and money from friends. Now it says I did them out of order and need another 450,000 to recover my 1,100,000 baht balance.”")}</p>
   ${chat("T",X(i,"ภารกิจ Like&Earn 🌟","Like&Earn Tasks 🌟"),"Telegram",[X(i,"ภารกิจที่ 28: เติม 450,000 เพื่อปลดล็อกยอด 1,104,500","Task 28: top up 450,000 to unlock 1,104,500"),X(i,"เหลือเวลา 02:00:00","Time left 02:00:00")])}`,
   clues:[["งานที่ต้องจ่ายก่อนได้เงิน = หลอก","A job that charges you first = scam"],["ได้เงินจริงช่วงแรกเพื่อให้เชื่อ","Early real payouts build trust"],["“ทำผิดลำดับ ต้องเติมเงิน” คือกับดักไม่รู้จบ","“Out of order, top up again” never ends"]],
   choices:[["หยุดเติมเงิน เก็บแชตกับสลิป แล้วพาแบมไปแจ้งความ","Stop topping up, save the chats and slips, and take Bam to report it","s2a","good"],
            ["ขอแอดมินลดยอดเหลือครึ่งเดียว","Ask the admin to halve the amount","s2b","risky"],
            ["ยืมเงินเพื่อนในหอเพิ่ม เพื่อกู้คืน 1,100,000 บาท","Borrow more from dorm friends to recover the 1,100,000 baht","E3","bad"]]},
  s2a:{title:["แบมกลัวพ่อแม่รู้","Bam's afraid her parents will find out"],
   body:i=>`<p>${X(i,"แบมร้องไห้ “เงินค่าเทอม… พ่อแม่จะโกรธมาก หนูอยากแก้เองให้จบก่อน”","Bam cries. “My tuition… my parents will be so angry. I want to fix it myself first.”")}</p>`,
   clues:[["บอกคนที่ไว้ใจ ดีกว่าแก้คนเดียว","Telling someone beats facing it alone"],["แจ้งความเร็ว อายัดได้มากขึ้น","Report fast to freeze more"],["มหาลัยมีทุนช่วยเหลือฉุกเฉิน","The university has emergency funds"]],
   choices:[["แจ้ง 1441 กับแจ้งความออนไลน์ก่อน แล้วชวนแบมโทรเล่าให้พ่อแม่ฟังด้วยกัน","Report to 1441 and online police first, then help Bam call her parents together","E1","good"],
            ["แจ้งความ แต่ไม่ต้องบอกพ่อแม่","Report it, but don't tell her parents","E2","risky"],
            ["หางานออนไลน์อื่นมาหาเงินคืนให้เร็ว","Find another online job to earn it back quickly","E3","bad"]]},
  s2b:{title:["แอดมินลดให้!","The admin gives a discount!"],
   body:i=>`${chat("T",X(i,"แอดมิน","Admin"),"Telegram",[X(i,"เห็นใจนะคะ ลดเหลือ 225,000 แต่ต้องโอนภายใน 30 นาที","I feel for you. 225,000, but within 30 minutes")])}`,
   clues:[["ลดราคาให้ = ยังต้องจ่าย","A discount still means paying"],["เร่งเวลา","Time pressure"],["จะมีเงื่อนไขใหม่ตามมาเสมอ","New conditions always follow"]],
   choices:[["ไม่จ่าย แล้วพาแบมไปแจ้งความ","Don't pay, and take Bam to report it","s2a","good"],
            ["ขอผ่อนจ่ายเป็นงวด","Ask to pay in instalments","E2","risky"],
            ["โอน 225,000 ให้จบ","Pay the 225,000 to end it","E3","bad"]]}
 },
 endings:{
  E1:["safe",["หยุดได้ และไม่ต้องสู้คนเดียว","Stopped, and not alone"],["ตำรวจอายัดบัญชีปลายทางได้บางส่วน พ่อแม่ของแบมโกรธแค่แป๊บเดียวแล้วช่วยคุยกับมหาลัยเรื่องค่าเทอม","Police froze part of the money. Bam's parents were angry for a moment, then helped her talk to the university about tuition."],[["งานที่ต้องจ่ายก่อน = หลอก","A job you pay for = scam"],["หยุดตั้งแต่ถูกขอเติมเงินครั้งแรก","Stop at the first top-up request"],["บอกคนที่ไว้ใจ","Tell someone you trust"]]],
  E2:["warn",["หยุดได้ แต่แบกไว้คนเดียว","Stopped, but carrying it alone"],["แบมไม่ได้จ่ายเพิ่ม แต่ไม่กล้าบอกใคร ต้องทำงานพิเศษหลายงานเพื่อใช้หนี้เพื่อนจนเกรดตก","Bam didn't pay more, but told no one, and took several side jobs to repay friends until her grades slipped."],[["ผ่อนจ่ายก็คือจ่าย","Instalments are still payments"],["ไม่ต้องอายที่โดนหลอก","There's no shame in being scammed"],["ขอความช่วยเหลือได้","It's okay to ask for help"]]],
  E3:["danger",["หนี้ 1,100,000 บาทและบัญชีถูกใช้ต่อ","1,100,000 baht in debt, and her account used"],["แบมยืมเงินเพิ่มจนเป็นหนี้รวมกว่า 1,100,000 บาท แล้วแก๊งยังขอใช้บัญชีของแบมรับเงินจากเหยื่อคนอื่น","Bam borrowed until she owed over 1,100,000 baht, then the gang asked to use her account to receive money from other victims."],[["“กู้คืนยอด” ไม่มีอยู่จริง","There's no “balance recovery”"],["อย่ายืมเงินมาเติม","Never borrow to top up"],["ให้คนอื่นใช้บัญชี = บัญชีม้า","Lending your account = mule account"]]]
 }}
};

const LAB={safe:["ปลอดภัย","Safe"],warn:["เฉียดฉิว","Close call"],danger:["เสียหาย","Harmed"]};
function build(id,d,i){
  const p=x=>x[i];
  return {id, level:i?({"ยาก":"Hard","กลาง":"Medium","ง่าย":"Easy"}[d.level]):d.level, start:"s1", title:p(d.title), learn:d.learn.map(p),
    scenes:Object.fromEntries(Object.entries(d.scenes).map(([k,s])=>[k,{title:p(s.title), body:s.body(i), clues:s.clues.map(p), choices:s.choices.map(c=>({t:c[i],to:c[2],v:c[3]}))}])),
    endings:Object.fromEntries(Object.entries(d.endings).map(([k,e])=>[k,{type:e[0],label:LAB[e[0]][i],title:p(e[1]),story:p(e[2]),lessons:e[3].map(p)}]))};
}
for(const [id,d] of Object.entries(D)){ CASES.th[id]=build(id,d,0); CASES.en[id]=build(id,d,1); }
})();
