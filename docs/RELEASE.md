# RELEASE.md — deploy checklist & rollback

**Rule: nothing ships without Teacher Mo's explicit approval.** Everything below is prepared
and verified locally; the actual push is one command once approved.

## 0. Pre-flight (do first, in order)
1. **Export a backup from the LIVE site first** — open
   <https://my-gifts-with-mo.duckdns.org/> → 设置 → 导出备份 → save the JSON somewhere safe
   (this is the classroom's current data; releases never touch it, but backups precede
   every structural change as a matter of hygiene).
2. Confirm branch state: `git log --oneline -3` shows `54f59f6` (cp-remake) on
   `feature/big-screen`; suite green (`node test-bundle.js` → ALL PASS).

## 1. What changes on the server
Exactly ONE file is served: `index.html` (330,168 B, single file, offline-capable).
- Cloudflare Pages project `englishwithmo` serves from the repo — deploying means pushing
  the branch to GitHub and letting Pages build (or direct upload with wrangler
  `cf-deploy/deploy_cf.bat` if that path is used for this site).
- GitHub Pages mirror updates from the same push.
- No DNS changes. No backend. No database (localStorage lives in each device's browser and
  is **untouched** by deploys).

## 2. Merge & deploy (after approval)
```bash
git push -u origin feature/big-screen        # 1st push: review via PR/diff
# after review:
git checkout feature/big-screen
git merge --no-ff feature/big-screen -m "merge: Big Screen + professional remake"  # if on main
git push origin main                          # Pages redeploys automatically
```
3. Verify live: open the site → landing shows 产品特性/三步上手/教室大屏 nav → `#/screen`
   works → `#/help` loads → zh default intact → export a fresh backup from the live site.

## 3. Rollback (any time, non-destructive)
- Git: `git revert <merge-commit>` + push (preferred), or redeploy the previous known-good
  artifact `index.html` from tag `cp-overnight-final` (`git show cp-overnight-final:index.html > index.html`).
- Data rollback is NEVER needed for a deploy: class data lives in the browser, and the app's
  import (设置 → 导入备份) restores the JSON from step 0 if anything ever went wrong.

## 4. Teacher guide (双语速查 / quick guide)

**开始大屏 / Start the Big Screen**
在教室电脑打开本站 → 右上角「进入教室」→ 侧栏「教室大屏」（或网址加 `#/screen`）→ 按 `F` 全屏。
Open the site on the classroom computer → Enter classroom → Big Screen (or add `#/screen`) → `F` for fullscreen.

**加分 / Award points**
大屏上点「✨ 快速加分」：选学生 → 点规则，两下完成；点错了点「撤销上一条」。评分页（课堂）可批量选人。
On the screen tap Quick award: pick students → tap a rule. Mistake? Undo last. The Classroom tab allows multi-select.

**随机点名 / Random pick**
大屏顶栏「随机点名」→「抽一个」。全班轮过一圈后自动重新装袋，公平不重复。
Top bar → Random pick → Draw. Everyone gets a turn before the bag refills.

**声音 / Sound**
大屏默认静音；第一次点页面出现「🔊 点按开启声音」提示，点一下即可；🔊/🔇 按钮随时开关。
Sound starts muted; a one-tap chip unlocks it (browsers require a gesture); the 🔊 button toggles anytime.

**重置 / Reset**
设置 → 重置演示数据 / 清空重来（都有「先下载备份」按钮）。平时备份：设置 → 导出备份。
Settings → Reset/Start empty (both offer "download backup first"). Routine backups: Settings → Export.

**隐私 / Privacy**
所有数据只存在这台电脑的浏览器里。请固定用同一个网址打开；换电脑先导出、再导入。
All data stays in this browser. Always use the same address; to move computers, export then import.

## 5. Post-release check (5 minutes)
Landing zh ✓ · language toggle ✓ · enter classroom ✓ · big screen goal + pops ✓ ·
picker draws ✓ · help view ✓ · export backup ✓ · console clean (F12) ✓.
