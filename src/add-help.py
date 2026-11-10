import io, os

p = "i18n.js"
s = io.open(p, encoding="utf-8").read()

en_anchor = 'faq6A:"Yes \\u2014 every page adapts to phones and tablets.'
zh_marker = "faq6A:\""  # second occurrence is zh

# --- EN block ---
en_add = (
    'faq6A:"Yes \\u2014 every page adapts to phones and tablets.'
)
# find the end of the EN faq6A string then append after it
i_en = s.index(en_anchor)
j_en = s.index('"', i_en + len("faq6A:"))  # opening quote
# walk to closing quote (respect escaped \")
k = j_en + 1
while True:
    if s[k] == "\\":
        k += 2
        continue
    if s[k] == '"':
        break
    k += 1
en_block = (
    ',h5Q:"Where do I start?",h5A:"Three steps: add students and rules in Settings; tap students then a rule in the Classroom (two taps); press F or open the Big Screen to project it. Try the demo anytime to explore.",'
    'h6Q:"What can I change in Settings?",h6A:"Rules (points, icons), class name, the class goal, hiding minus markers on the Big Screen, sound, and export/import. Editing a rule never erases history; hidden minus markers still count.",'
    'faq7Q:"How do I restore a backup on a new computer?",faq7A:"Open the site on the new computer, go to Settings, choose Import backup, and select the JSON file you exported. Students, records and gifts all come back. Export weekly to be safe.",'
    'faq8Q:"Our school PC has Deep Freeze or a restore card. What should I do?",faq8A:"Restore cards reset the computer and the browser\'s local data with it. Export a backup before each class ends (Settings, Export backup) and keep the JSON on a USB drive or cloud folder; import it after a reset. This site has no cloud backup."'
)
s = s[:k+1] + en_block + s[k+1:]

# --- ZH block: find faq6A AFTER the EN insertion ---
i_zh = s.index("faq6A:\"", i_en + len(en_block) + 50)
j_zh = s.index('"', i_zh + len("faq6A:"))
k = j_zh + 1
while True:
    if s[k] == "\\":
        k += 2
        continue
    if s[k] == '"':
        break
    k += 1
zh_block = (
    ',h5Q:"刚接触，从哪里开始？",h5A:"三步：在「设置」里添加学生和规则；在「教室」里先点学生、再点规则（两次点击）；按 F 或打开「教室大屏」投影给全班。随时可用「试试演示」先体验一遍。",'
    'h6Q:"设置里能改什么？",h6A:"规则（分值、图标）、班级名称、课堂目标、大屏隐藏扣分、声音，以及导出/导入。改规则不会丢历史记录；隐藏扣分只是大屏不显示，分数照常计算。",'
    'faq7Q:"如何把备份恢复到新电脑？",faq7A:"在新电脑打开网站 → 设置 → 导入备份 → 选择之前导出的 JSON 文件，学生、记录和礼物都会回来。建议每周末导出一次。",'
    'faq8Q:"学校电脑装了还原卡或冰点（Deep Freeze）怎么办？",faq8A:"还原卡会把电脑重置，浏览器里的本地数据也会被清空。每次下课前导出备份（设置 → 导出备份），把 JSON 存到 U 盘或网盘；还原后用导入恢复。本站没有云端备份。"'
)
s = s[:k+1] + zh_block + s[k+1:]

io.open(p + ".tmp", "w", encoding="utf-8", newline="").write(s)
os.replace(p + ".tmp", p)
print("i18n: 4 help topics added (en+zh)")

# --- helpData rows ---
p2 = "landing.js"
s2 = io.open(p2, encoding="utf-8").read()
anchor = ' [t("faq6Q"),t("faq6A"),t("faq6Q")+" "+t("faq6A")+"'
i = s2.index(anchor)
# find end of this array-row line (the closing ],
j = s2.index("],", i) + 1
rows = (
    ' [t("h5Q"),t("h5A"),t("h5Q")+" "+t("h5A")+" start begin quickstart 开始 入门"],'
    ' [t("h6Q"),t("h6A"),t("h6Q")+" "+t("h6A")+" settings rules goal hide 设置 规则 目标"],'
    ' [t("faq7Q"),t("faq7A"),t("faq7Q")+" "+t("faq7A")+" restore import json 恢复 导入"],'
    ' [t("faq8Q"),t("faq8A"),t("faq8Q")+" "+t("faq8A")+" deep freeze restore card 还原卡 冰点"],'
)
s2 = s2[:j] + "\n" + rows.rstrip(",") + s2[j:]
io.open(p2 + ".tmp", "w", encoding="utf-8", newline="").write(s2)
os.replace(p2 + ".tmp", p2)
print("helpData: 4 rows added")
