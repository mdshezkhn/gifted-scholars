# Extra checks a/b/d

| check | result | detail |
|---|---|---|
| a1 group award 30 students no crash | ✅ | {'awardMs': 11.199999988079071, 'pops': 30, 'particles': 150, 'badges': 24} |
| a2 particle cap holds (<=150 live) | ✅ | 150 granted, 24 badge fallbacks |
| a3 award+render time sane @4x throttle | ✅ | 11ms in-page |
| a4 zero page errors @4x | ✅ | [] |
| b1 corrupt JSON -> fresh state, no crash | ✅ | [] |
| b2 quota exceeded caught, banner path, no throw | ✅ |  |
| b3 50 students render on screen | ✅ | 50 |
| b4 escaped name does not execute | ✅ |  |
| b5 zero page errors robustness | ✅ | [] |
| d1 OS reduce: 0 confetti particles | ✅ | 0 |
| d2 Settings Motion=off: 0 confetti particles | ✅ | 0 |
