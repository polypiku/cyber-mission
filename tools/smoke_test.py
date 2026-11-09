"""Open the game in a headless browser and check that nothing breaks.

Serves the project folder, then at desktop and phone sizes: starts a new game,
walks into every zone, opens the phone and a case, and reports any JavaScript
errors or images that failed to load. Exits with code 1 if anything is wrong.

Usage: python3 tools/smoke_test.py
Needs: pip install playwright && playwright install chromium
"""
import asyncio, functools, http.server, os, sys, threading
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8799

def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass
    handler = functools.partial(Quiet, directory=ROOT)
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler).serve_forever()

SKIP_INTRO = ("closeSheet(); endCoach(); S.prologue=true; S.intro=true;"
              "S.tut={case:1,end:1,vil:1}; closeDlg(); urgent=null; S.unlocked=9; S.chapter=5; S.briefed=true;"
              "[1,2,3,4,6,7].forEach(z=>S.seen[z]=true)")

async def check(browser, name, viewport):
    page = await browser.new_page(viewport=viewport)
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    await page.goto(f"http://127.0.0.1:{PORT}/index.html")
    await page.wait_for_timeout(1200)
    await page.click("[data-tplay]")
    await page.wait_for_timeout(400)
    await page.click("[data-go=new]")
    await page.wait_for_timeout(1000)
    await page.evaluate(SKIP_INTRO)
    for zone in [1, 2, 3, 4, 6, 7]:
        await page.evaluate(f"goZone({zone}); closeDlg(); urgent=null; rush=null")
        await page.wait_for_timeout(300)
    await page.evaluate("goOutside(1); closeDlg(); openPhone()")
    await page.wait_for_timeout(300)
    await page.evaluate("closeSheet(); goZone(1); closeDlg(); urgent=null;"
                        "openCase('qr', npcs.find(n=>n.role==='grandma'))")
    await page.wait_for_timeout(300)
    broken = await page.evaluate(
        "Object.values(IMG).flatMap(v=>Object.values(v)).filter(i=>!(i.complete&&i.naturalWidth)).length")
    await page.close()
    ok = not errors and broken == 0
    print(f"{'PASS' if ok else 'FAIL'}  {name:8} errors={len(errors)} broken_images={broken}")
    for e in errors[:5]:
        print("      ", e)
    return ok

async def main():
    threading.Thread(target=serve, daemon=True).start()
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        results = [await check(browser, "desktop", {"width": 1280, "height": 800}),
                   await check(browser, "phone", {"width": 390, "height": 844})]
        await browser.close()
    sys.exit(0 if all(results) else 1)

asyncio.run(main())
