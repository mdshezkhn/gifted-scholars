import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page()
    pg.goto("https://my-gifts-with-mo.duckdns.org/", timeout=45000)
    print("BROWSER-OK title:", pg.title()[:40], "| https:", pg.url[:30])
    b.close()
sys.stdout.flush()
import os; os._exit(0)
