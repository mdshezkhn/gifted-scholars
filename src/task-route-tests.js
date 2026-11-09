/* route coverage: every route renders non-empty without throwing (zh) */
T("route coverage all views",safeT(function(){
  seedDemo();const bad=[];
  const routes=["#/","#/app/classroom","#/app/records","#/app/shop","#/app/leaderboard","#/app/settings","#/screen","#/room/"+S.students[0].id,"#/app/nosuch"];
  for(const r of routes){
    try{location.hash=r;route();
      const h=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;
      if(h.length<40)bad.push(r+" empty");
    }catch(e){bad.push(r+" THREW "+(e&&e.message||e));}
  }
  return bad.length===0?true:bad.join(",");
}),"all routes render non-empty; unknown #/app tab falls back to classroom");
