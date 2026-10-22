import io
NL = chr(10)
head = io.open('gs/head.html', encoding='utf-8').read()
body = io.open('gs/body.html', encoding='utf-8').read()
tail = io.open('gs/tail.html', encoding='utf-8').read()
fonts = io.open('gs/fonts.css', encoding='utf-8').read()
app_css  = io.open('gs/app.css', encoding='utf-8').read()
land_css = io.open('gs/landing.css', encoding='utf-8').read()
core_js  = io.open('gs/app-core.js', encoding='utf-8').read()
land_js  = io.open('gs/landing.js', encoding='utf-8').read()
html = (head + '<style>' + NL + fonts + NL + app_css + NL + land_css + NL + '</style>'
        + body + '<script>' + NL + core_js + NL + land_js + NL + '</script>' + tail)
io.open('gifted-scholars.html', 'w', encoding='utf-8', newline=NL).write(html)
print('assembled:', len(html.encode('utf-8')), 'bytes')
