/* Task 11: two-tap quick-award drawer */
T("drawer two-tap award",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  openDrawer();
  const panel=document.querySelector("#drwPanel");
  if(!panel)return "no drawer panel";
  drawerToggle(S.students[0].id);drawerToggle(S.students[2].id);
  const rule=S.rules.find(r=>r.value>0);
  const n0=S.records.length;
  drawerApply(rule.id);
  if(S.records.length!==n0+1)return "no record";
  const rec=S.records[0];
  if(rec.studentIds.length!==2||rec.studentIds.indexOf(S.students[0].id)<0)return "wrong students";
  if(rec.value!==rule.value)return "wrong value";
  if(!document.querySelector("#drwPanel"))return "drawer closed after award";
  if(drawerSelCount()!==0)return "selection must clear";
  closeDrawer();
  return true;
}),"select 2, tap rule => 1 record, drawer stays, sel clears"),
T("drawer undo last targets newest non-undone",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  const a=S.students[0],b=S.students[1],rule=S.rules.find(r=>r.value>0);
  withState(function(){applyRule(rule,[a.id]);});
  withState(function(){applyRule(rule,[b.id]);});
  const newest=S.records[0];
  withState(function(){doUndo(newest.id);});           /* newest already undone */
  openDrawer();
  drawerUndoLast();
  const still=S.records.filter(r=>r.undone===false);
  if(still.length!==0)return still.length+" non-undone remain";
  if(S.records[1].undone!==true)return "second-newest not undone";
  closeDrawer();
  return true;
}),"undoes newest record with undone===false"),
T("drawer award pops tiles behind",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  openDrawer();
  drawerToggle(S.students[0].id);
  const rule=S.rules.find(r=>r.value>0);
  drawerApply(rule.id);
  const pops=screenAfterChange();
  closeDrawer();
  return (pops&&pops.length===1&&pops[0].sign==="pos")?true:"no pop from drawer award";
}),"drawer award path triggers pops"),
