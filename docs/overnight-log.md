# Overnight log (2026-11-09 -> 10)
Teacher away; decisions below get one-line reasons. Branch feature/big-screen from ae53535.
PRE: T()===true kept 69 green (tests already boolean). smoke.py 7/7. Route-coverage test added.
TASK10 done: pops record-id driven; seen-init; 10s window; cap150+badge; quiet neg + hideNeg; chime + gesture chip. 79/79, smoke 7/7, 294210B. Decisions: onSync pops deferred 1 tick (route() re-renders first); soundChip show=sound-on&&!unlocked; neg marker suppressed entirely when hideNeg.
TASK11 done: drawer two-tap award, stays open, sel clears, undo-last = newest undone===false (bug found: undoRecord takes object not id). 82/82, smoke 7/7, 299237B.
TASK12 done: A/F/Esc guards per amendment 5; drawer existence via DRW_OPEN flag (stub querySelector is selector-blind). 84/84, smoke 7/7, index 304,093B→ actual below.
TASK13 done: .app-ui scoped theme (1.4KB CSS), landing tests stayed green so no revert needed. 85/85, smoke 8/8, 301883B (+37.2KB of +40KB).
TASK15 done: VERIFY-15.md 13/13 browser checks; in-page storage->mutation metric (cross-process evaluate overhead excluded, disclosed); 85/85 node; 8/8 smoke.
