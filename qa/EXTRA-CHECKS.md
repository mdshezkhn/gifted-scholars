# Extra checks (a/b/d) — D:\links-personal\links-personal\web\workspace\github\gifted-scholars\qa\extra_checks.py

| check | result | detail |
|---|---|---|
| a1 group award to 30 renders | ✅ |  |
| a2 frame times @4x throttle | ✅ | {'n': 90, 'median': 16.699999999999818, 'p95': 16.800000000000182, 'max': 16.900 |
| a3 particle cap holds | ✅ | 0 |
| a4 zero page errors @throttle | ✅ | [] |
| b1 corrupt JSON does not crash | ✅ | #/screen |
| b2 quota exceeded -> banner, no crash | ❌ | {'blocked': False, 'banner': True} |
| b3 50 students render | ✅ | 50 |
| b4 zero page errors (robustness) | ✅ | [] |
| d1 OS reduced-motion: no particles | ✅ | {'cls': '', 'motion': False, 'particles': 0} |
| d2 Motion=off: badge only, no particles | ✅ | {'cls': '', 'particles': 0, 'badge': 0} |
| d3 zero page errors (motion) | ✅ | [] |
