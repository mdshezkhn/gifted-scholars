# Release & deploy — feature/big-screen

## Deploy checklist (in order)

1. **Export a backup from the LIVE site first.** Open
   `https://my-gifts-with-mo.duckdns.org/` → 设置 → 数据 → 导出备份. Keep the
   JSON file safe (Downloads folder is fine). This is the only copy of the
   live class data — the new build does not migrate or touch it, but you never
   deploy without a backup in hand.
2. **Review the branch.** `feature/big-screen`, tags cp-task10…cp-task15.
   Read `qa/MORNING-REPORT.md` and `qa/VERIFY-15.md`.
3. **Push** (needs your approval): `git push -u origin feature/big-screen`.
   GitHub Actions runs build + 85 tests + byte-diff automatically.
4. **Merge to main** (fast-forward) after CI is green:
   `git checkout main && git merge --ff-only feature/big-screen && git push`.
5. **GitHub Pages** deploys main automatically (same file name `index.html`).
   Wait for the Pages build to finish (~1 min).
6. **Hard-refresh the classroom computer** (Ctrl+F5). The single-file app has
   no cache-busting; one hard reload picks up the new build.
7. **Smoke on the classroom machine:** open the site → 大屏 button → confirm
   tiles render → ✨快速加分 → award one student → undo it.

### What changes

- Only `index.html` changes (single-file app). `README.md`, CI workflow,
  `src/*` and `qa/*` also update in the repo but are not needed at runtime.
- **Data is untouched**: format is still `version:1` localStorage
  (`gifted-scholars-v1`). New fields (`settings.sound`, `settings.hideNeg`,
  `settings.goal`) are additive with safe defaults; old data upgrades on
  first load (verified by the baseline-fixture test).

### How to roll back

- `git checkout main` then `git revert` the merge commit and push — or, in an
  emergency, redeploy the previous `index.html` (it is fully self-contained;
  keep a copy of the old file before deploying: `cp index.html index.prev.html`
  outside the repo).
- Student data never needs a rollback: it lives in the browser's localStorage
  and is only read, never migrated destructively. Restore from the step-1
  backup via 设置 → 数据 → 导入 if ever needed.

---

## Teacher guide / 教师使用指南

### English

**Start the big screen:** open the site on the classroom computer, click
**大屏** (or go to `…#/screen`). Press `F` for fullscreen. Press `Esc` twice to
leave (once closes the drawer).

**Award points (single computer):** click **✨ 快速加分** (or press `A`) →
tap one or more students → tap a rule. Two taps per award. The drawer stays
open for the next award. **↩︎ 撤销上一次** undoes the newest award.

**Two-browser-window setup:** keep the big screen on `#/screen` and open a
second **window of the same browser** for `#/app/classroom`. Awards appear on
the screen within a blink. (Two different browsers do NOT share data — always
use the same address, too: duckdns and github.io are separate.)

**Sound:** off by default. Click 🔇 once to turn it on, then tap anywhere once
(the chip reminds you) — positive awards now chime. Negative points never
make a sound.

**Reset:** Settings (设置) has 恢复演示班级 (reload the demo class) and
清空重来 (start empty). Both ask first, and both offer **先下载备份** — do it.

### 中文

**打开大屏：** 在教室电脑上打开网站，点「大屏」（或直接访问 `…#/screen`）。
按 `F` 进入全屏；按两次 `Esc` 退出（第一次先关抽屉）。

**加分（同一台电脑）：** 点「✨ 快速加分」（或按 `A`）→ 先点学生（可选多个）
→ 再点规则。每次加分只要两下。抽屉保持打开，方便连续加分。
「↩︎ 撤销上一次」撤销最近一次加分。

**两个窗口的用法：** 大屏停在 `#/screen`，再开一个**同一浏览器的窗口**打开
`#/app/classroom` 打分，大屏立刻更新。（不同浏览器的数据不互通；网址也要固定
用一个——duckdns 和 github.io 是两个独立的数据空间。）

**声音：** 默认关闭。点一次 🔇 打开，然后在页面上任意点一下（会有提示气泡），
加分就有铃声；扣分永远静音。

**重置：** 「设置」里有「恢复演示班级」和「清空重来」，都会先确认，并提供
「先下载备份」——请务必备份。

---

© 2026 Mohammed Shehzad Khan · Free for schools, forever.
