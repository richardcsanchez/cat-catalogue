function showCat(catId){
  var agencyId = document.getElementsByClassName("cat-agency").innerHTML
  window.location.href = "/agencies/" + agencyId + "/cats/" + catId
  }
