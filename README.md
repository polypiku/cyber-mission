# Cyber Mission · ภารกิจรู้ทันไซเบอร์

เกมสอนความปลอดภัยไซเบอร์แบบเดินสำรวจ (top-down) เล่นบนเบราว์เซอร์ได้ทั้งคอมและมือถือ รองรับภาษาไทยและอังกฤษ

เลือกตัวละครชายหรือหญิง ใส่ชื่อตัวเอง แล้วเริ่มที่มหาวิทยาลัย ตำรวจไซเบอร์พี่ภพขอให้ช่วยสืบ "แก๊งเงา" ไล่ไปทีละบท: ห้องสมุด → คาเฟ่ → ร้านเน็ต → ธนาคาร → มหาวิทยาลัย ช่วยคนไม่ให้โดนหลอก ลงมือแก้เองในมือถือ เก็บเบาะแสส่งตำรวจ แฝงตัวเข้าตึกรังแก๊ง แล้วบุกพร้อมตำรวจ ตอนจบมี 5 แบบ ขึ้นกับจำนวนเบาะแสที่ส่ง

> **เล่นเลย:** https://polypiku.github.io/cyber-mission/ (ใช้ได้หลังเปิด GitHub Pages)

![ถนนหน้าร้าน สี่แยก และไฟจราจร](docs/screenshots/street.webp)

| เคสในมือถือ | หน้าโฮมมือถือ | คัทซีนบุกรังแก๊ง |
|---|---|---|
| ![case](docs/screenshots/case.webp) | ![phone](docs/screenshots/phone.webp) | ![raid](docs/screenshots/raid.webp) |

## สิ่งที่อยู่ในเกม

- **15 เคสโหดจากกลโกงที่เจอในไทย** (5 สถานที่ ที่ละ 3 เคส) ครอบคลุมหัวข้อวิชาความมั่นคงปลอดภัยไซเบอร์: QR ปลอมแปะทับ, Wi-Fi ฝาแฝด (Evil twin), ยึดบัญชีไลน์ด้วย OTP, ข้อมูลรั่วแล้วถูกลองรหัส (Credential stuffing), คีย์ล็อกเกอร์, แรนซัมแวร์, วิดีโอคอลตำรวจปลอม, แอปดูดเงินคุมจอ, เสียงหลานปลอมด้วย AI, เว็บเติมเกมปลอม (Phishing), แอปเงินกู้เถื่อน, หลอกรักชวนเทรดคริปโต, MFA fatigue, บัญชีม้า, สายอ้างงานทุน
- **คนร้ายแฝงตัวในฝูงคน**: แฮกเกอร์ Wi-Fi นั่งปนกับลูกค้าทั่วไป ถ้าปล่อยไว้นาน มือถือจะค่อยๆ กระตุกจนติดไวรัส ต้องรีบไปร้านซ่อมภายใน 30 วินาที
- **ลงมือแก้เองทุกเคส**: พิมพ์ข้อความเตือน เลือกอีเมลรีเซ็ตตัวจริงแล้วตั้งรหัสใหม่ โทรเบอร์หลังบัตร ปิดสิทธิ์แอปปลอม ฯลฯ ยากขึ้นทีละบท
- **เบาะแส 25 ชิ้น**: จากเคส ของแปลกที่ซ่อนในห้อง คนแปลกหน้า และการแฝงตัวในตึก
- **มือถือในเกม**: หน้าโฮม แชต Wi-Fi สแกนไวรัส และอัปเกรด (ตัวจัดการรหัสผ่าน VPN สำรองคลาวด์ แว่นนักสืบระดับ 1-3)
- **เมืองที่เดินได้**: สี่แยกมีไฟจราจรและทางม้าลาย, ห้องสมุด 2 ชั้น, ตึกออฟฟิศ 3 ตึก (สุ่มทุกเกมว่าตึกไหนเป็นรังแก๊ง), สถานีตำรวจกับห้องขัง 10 ห้อง
- **เนื้อเรื่องและฉากจบ 3 แบบ (ถูกจับตัว · จับได้แต่ลูกน้อง · จับได้บอส)**: คัทซีนที่ตัวละครเดินเอง พร้อมภาพสรุปแบบการ์ตูนช่อง
- **เงินเป็นบาท** และร้านอัปเกรด, เสียงสังเคราะห์สดไม่ใช้ไฟล์เสียง, บันทึกความคืบหน้าไว้ในเบราว์เซอร์

## เล่นบนเครื่องตัวเอง

ไม่ต้องติดตั้งอะไร แค่เปิดเว็บเซิร์ฟเวอร์เล็กๆ ในโฟลเดอร์นี้

```bash
python3 -m http.server 8000
# แล้วเปิด http://localhost:8000
```

หรือใช้ส่วนเสริม Live Server ใน VS Code ก็ได้

ถ้าอยากได้ไฟล์เดียวที่ดับเบิลคลิกเปิดได้ทันที:

```bash
python3 tools/build_single.py     # ได้ไฟล์ dist/cyber-mission.html
```

## โครงสร้างโปรเจกต์

```
index.html            หน้าเกม + ลำดับการโหลดสคริปต์
css/style.css         หน้าตาทั้งหมด (HUD, มือถือ, การ์ด, คัทซีน)
js/
  core.js             เซฟ เสียง ตัวละคร โซน คะแนน หลักฐาน
  progress.js         บทต่างๆ ว่าโซนไหนเปิดแล้ว
  world.js            แผนที่ ห้อง ถนน สี่แยก ห้องสมุด 2 ชั้น
  render.js           วาดฉากบน canvas
  crowd.js            ฝูงคน แฮกเกอร์แฝงตัว ตำรวจคุมตัว ไวรัส เงิน
  story.js            บทนำ สถานีตำรวจ การบุก ฉากจบ
  engine.js           กล้อง ลูปเกม การควบคุม HUD กล่องบทพูด
  talk.js             บทพูดของแต่ละคน ทัวร์แนะนำเกม
  office.js           ตึกออฟฟิศ 3 ตึก ทั้งข้างนอกและข้างใน
  cinema.js           คัทซีนที่ตัวละครเดินเอง
  clues.js            เบาะแสนอกเคส แว่นนักสืบ การส่งเบาะแสให้ตำรวจ
  fix.js              ขั้นลงมือแก้เองในมือถือตอนท้ายเคส
  ui.js               หน้าต่างเคส การ์ตูนช่อง บทสอนเคสแรก
  phone.js            มือถือ: หน้าโฮม แชต Wi-Fi สแกน
  arcade.js           มินิเกมที่ตู้ข้างถนน
  main.js             โหลดรูปแล้วเริ่มเกม
data/
  cases/              เนื้อหาเคสทั้งหมด (ไทย/อังกฤษ)
  fixes.js            โจทย์ลงมือแก้ของแต่ละเคส
  sprites.js          รายการรูปตัวละคร
  heroes.js           รูปตัวละครที่เลือกเล่นได้
assets/               รูปตัวละครทุกท่า (WebP)
tools/
  build_single.py     รวมทุกอย่างเป็นไฟล์ HTML เดียว
  smoke_test.py       เปิดเกมอัตโนมัติแล้วเช็กว่าไม่มี error
```

เขียนด้วย HTML, CSS และ JavaScript ล้วน ไม่ใช้เฟรมเวิร์กหรือไลบรารี วาดทุกอย่างบน `<canvas>`

## ทดสอบ

```bash
pip install playwright && playwright install chromium
python3 tools/smoke_test.py
```

สคริปต์จะเปิดเกมทั้งขนาดจอคอมและจอมือถือ เดินเข้าทุกโซน เปิดมือถือ เปิดเคส แล้วรายงานว่ามี error หรือรูปโหลดไม่ขึ้นหรือเปล่า

## ผู้จัดทำ

ออกแบบเกม เนื้อเรื่อง และกำกับ: ฑิตยา คูณศรี (พริ้ง) · วิทยาการคอมพิวเตอร์ มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ

เขียนโค้ดร่วมกับ Claude (Anthropic)

ชื่อธนาคาร ร้านค้า บุคคล และเว็บไซต์ในเกมเป็นเรื่องสมมติทั้งหมด

## Play together (online)

- Other players in the same place show up walking around with their name above them. Cases stay on each player's own device.
- The 🏆 quiz table (the dice table at the university, or the mini-game kiosk) runs a 5-question race. Everyone at the table gets the same questions at the same time, and the scoreboard is live.
- Only presence is shared: nickname, character, position and quiz score. Nothing is stored.
- **Link:** Supabase Realtime when `SUPA.url` and `SUPA.key` are filled in at the top of `js/mp.js` (for the public website). Otherwise the Claude artifact room. Otherwise single-player.
- **Testing on one computer:** open `index.html?mpdev` in two tabs.

## Scam calls to your own phone

- After the first case, unknown numbers call the player now and then.
- **Decline or miss a call:** the same number calls back later.
- **Block:** that number stops calling for good.
- **Answer:** a talk scene with choices. A bad choice can cost money or leak your personal data.
- **Leaked data:** brings a threat call, and paying it only makes them ask for more.
- **Spam filter:** turning on "Filter spam and scam calls" in the in-game phone settings labels these calls as suspected scams.
- **Scripts:** `data/scamcalls.js`.
