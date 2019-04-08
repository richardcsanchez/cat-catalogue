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

function moreCatInfo() {
  document.getElementById("more-cat-info").hidden = false
};

$(function () {
  $(".js-next").on("click", function() {
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.getJSON("/agencies/" + nextId + ".json", function(data) {
      $(".id").text(data["id"])
      $(".name").text(data["name"]);
      $(".email").text(data["email"]);
      $(".phone_number").text(data["phone_number"]);
      $(".street_1").text(data["street_1"]);
      $(".street_2").text(data["street_2"]);
      $(".city").text(data["city"]);
      $(".state").text(data["state"]);
      $(".zip_code").text(data["zip_code"]);
      $(".cats").text(data["cats"]);
      $("#cat-name").text(data["cats"]["name"]);
      $("#cat-breed").text(data["cats"]["breed"]);

      $(".js-next").attr("data-id", data["id"]);
      $(".js-previous").attr("data-id", data["id"]);

    });
  });
})

$(function () {
  $(".js-previous").on("click", function() {
    var previousId = parseInt($(".js-previous").attr("data-id")) - 1;
    $.getJSON("/agencies/" + previousId + ".json", function(data) {
      $(".id").text(data["id"])
      $(".name").text(data["name"]);
      $(".email").text(data["email"]);
      $(".phone_number").text(data["phone_number"]);
      $(".street_1").text(data["street_1"]);
      $(".street_2").text(data["street_2"]);
      $(".city").text(data["city"]);
      $(".state").text(data["state"]);
      $(".zip_code").text(data["zip_code"]);
      $("#set-agency").text(data["id"]);

      $(".js-next").attr("data-id", data["id"]);
      $(".js-previous").attr("data-id", data["id"]);
    });

  });
});

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

function loadCats() {
  var template = document.getElementById("cat-template").innerHTML
  var previousId = parseInt($(".js-previous").attr("data-id"));
  $.getJSON("/agencies/" + previousId + "/cats.json", function(data) {
    var cats = data

    var templateScript = Handlebars.compile(template);
    var result = templateScript(cats);
    document.getElementsByTagName("main")[0].innerHTML += result;
  })
  // var template = Handlebars.compile(document.getElementById("issue-template").innerHTML);
  // var result = template(issues);
  // document.getElementsByTagName("main")[0].innerHTML += result;
}

function catShowPage(catId){
  var agencyId = parseInt($(".js-previous").attr("data-id"))
  window.location.href = "/agencies/" + agencyId + "/cats/" + catId
  }

  function agencyShowPage(agencyId){
    window.location.href= "/agencies/" + agencyId
  }
