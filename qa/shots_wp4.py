# WP4 screenshot check — zh default, headless Edge.
# Serve first:  cd gifted-scholars && C:/Python314/python.exe -m http.server 8947
# Run:          C:/Python314/python.exe qa/shots_wp4.py
import os, sys
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8947/index.html"
OUT = os.path.join(os.path.dirname(__file__), "shots")
os.makedirs(OUT, exist_ok=True)
errs = []

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(viewport={"width": 1600, "height": 900}, locale="zh-CN")
    pg = ctx.new_page()
    pg.on("console", lambda m: errs.append(m.text) if m.type in ("error",) else None)
    pg.on("pageerror", lambda e: errs.append(str(e)))

    # 1. classroom with demo data (zh)
    pg.goto(BASE)
    pg.evaluate("seedDemo(); location.hash='#/app/classroom'; route();")
    pg.wait_for_timeout(600)
    pg.screenshot(path=f"{OUT}/1-classroom-zh.png")

    # 2. empty-start card (fresh profile -> onboarding)
    ctx2 = b.new_context(viewport={"width": 1600, "height": 900}, locale="zh-CN")
    pg2 = ctx2.new_page()
    pg2.on("pageerror", lambda e: errs.append(str(e)))
    pg2.goto(BASE)
    pg2.evaluate("location.hash='#/app/classroom'; route();")
    pg2.wait_for_timeout(400)
    pg2.screenshot(path=f"{OUT}/2-empty-start-zh.png")

    # 3. settings (same demo context)
    pg.evaluate("location.hash='#/app/settings'; route();")
    pg.wait_for_timeout(400)
    pg.screenshot(path=f"{OUT}/3-settings-zh.png", full_page=True)

    # 4. student room s1
    pg.evaluate("location.hash='#/room/s1'; route();")
    pg.wait_for_timeout(500)
    pg.screenshot(path=f"{OUT}/4-room-s1-zh.png")

    b.close()

print("console/page errors:", len(errs))
for e in errs[:8]:
    print("  -", e[:160])
print("shots in", OUT)
