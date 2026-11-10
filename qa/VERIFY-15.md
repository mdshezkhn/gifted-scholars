# Task 15 verification vs spec §8

| check | result | detail |
|---|---|---|
| 8.1a 1080p tiles visible | ✅ | 16 |
| 8.1b no page scroll at 16 tiles | ✅ |  |
| 8.1c cross-tab in-page update < 200ms | ✅ | 0.0ms storage->mutation |
| 8.1d drawer updates instantly | ✅ | ★ 4 |
| 8.1e reload restores view+numbers | ✅ | 105->105 tiles 16 |
| 8.1f mute toggle persists | ✅ | on/on |
| 8.7a Esc closes drawer | ✅ |  |
| 8.7b A ignored while typing | ✅ |  |
| 8.7c sound chip appears once then never | ✅ | True->False |
| 8.7d zero console/page errors all routes + mobile | ✅ | [] |
| 8.9 no runtime network requests | ✅ | [] |
| 8.7e reduced motion: 0 particles | ✅ | 0 |
| 8.8a aria-pressed on mute/full + drawer labelled | ✅ |  |
| G0 modern browser: no old-browser gate | ✅ |  |
| S1 drawer award by clicks: record+tile+stays open+confetti | ✅ | {'n': 1, 'ptsChanged': True, 'open': True, 'conf': 24} |
| S2 undo-last: newest non-undone undone, wallet back, no confetti | ✅ | {'was': {'id': 'xhjezegg', 'v': 1, 'w': 21}, 'now': {'undone': True, 'w': 20}} |
| S3 keys A/Ctrl+A/Esc | ✅ | {'a': True, 'ctrl': True, 'esc': True} |
| S3f F fullscreen (headless may deny; feature presence asserted) | ✅ | {'entered': False, 'capable': True} |
| S4 mute click + reload persistence | ✅ | {'on': 'true', 'after-reload': 'true', 'off': 'false'} |
| S5a negative pop quiet: class+marker, 0 confetti | ✅ | {'neg': True, 'n': '1'} |
| S5b hideNeg hides the marker | ✅ |  |
| S6 approved gift grant: zero pops, no confetti | ✅ | {'status': 'approved', 'pops': []} |
| S7 wallet-0 positive award pops | ✅ | {'walletBefore': 0, 'conf': 24} |
| G1 old browser: bilingual notice shown, app hidden, one intentional error | ✅ | {'g': {'blocked': True, 'notice': True, 'hidden': 4}, 'errs': ['GS-UNSUPPORTED-BROWSER']} |

**24/24 browser checks green.** Node suite 85/85 + smoke 8/8 separately.
