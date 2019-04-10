//Add New Cat Form - cat.prototype.newCatForm
//1. browser makes request through click
//2. appends form to page
//3.submits form through ajax request

//Add cats index to agency page
//1.A browser makes request through click (AJAX GET Request)
  //1.B Renders Cat info in JSON
//2. appends list of cat names to page

//Render show cat page
//1. additional click (..see more) adds additional information
//2. allows user to click to next cat


//Edit Cats:
//1. Allows user to edit Cats w/in the index page
//2. prepopulated forms
//3. allows user to save new information about cat or delete or cancel

function openTab(evt, tab) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";

}



$(function (){
  $(".js-previous").on("click", function() {
    var previousId = parseInt($(".js-previous").attr("data-id")) - 1;
  $.getJSON("/agencies/" + previousId + "/cats.json", function(data) {
        $("cat-name").text(data["name"]);
        $("cat-breed").text(data["name"]);
        $("cat-img").attr('src', data["image"]);
      })
})
})

function catShowPage(catId){
  var agencyId = parseInt($(".agency-show").attr("data-id"))
  window.location.href = "/agencies/" + agencyId + "/cats/" + catId
  }

function agencyShowPage(agencyId){
  window.location.href= "/agencies/" + agencyId
}

function editAgency(agencyId){
  window.location.href= "/agencies/" + agencyId + "/edit"
}

$(document).ready(function(){

  $("#new_cat").on("submit", function(e){
    e.preventDefault()
    const values = $(this).serialize()

    $.post('/cats', values)
      .done(function(data) {
        $('#new_cat').trigger("reset").hide();
        $()
        const newCat = new Cat(data)

        const htmlToAdd = newCat.catInfo()
         $("#new-cat-show").html(htmlToAdd)

         const buttonToAdd = newCat.appendButton()
         $('#Cats').html(buttonToAdd)
    })

  })
})
