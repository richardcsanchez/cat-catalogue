$(document).ready(function() {
  loadCatIndex()
  toggleTabs()
  newCat()
  newCatFormReload()
})


  function loadCatIndex(){
  $('.newCat').hide()
  $('.cats-index').hide()
  let agencyId = parseInt($(".agency-show").attr("data-id"))
  fetch('/agencies/' + agencyId + '/cats.json')
    .then(res => res.json())
    .then(cats => {
      cats.forEach(cat => {

        let newCat = new Cat(cat)
        let catHTML = newCat.appendButton()
        $('.cats-index').append(catHTML)

    })
  })
  }

  function toggleTabs() {
    $("#cat-index-button").on("click", function() {
      $('.cats-index').toggle()
      $('.newCat').hide()
      })

    $('#new-cat-button').on("click", function() {
        $('.newCat').toggle()
        $('.cats-index').hide()
      })
    }

  function newCat(){
    $("#new_cat").on("submit", function(e){
      e.preventDefault()
      const values = $(this).serialize()

      $.post('/cats', values)
        .done(function(data) {

          $('#new_cat').trigger("reset")

          $('#new-cat-form').hide()

          const newCat = new Cat(data)

          const htmlToAdd = newCat.catInfo()
          $("#new-cat-show").show()
           $("#new-cat-show").html(htmlToAdd)

           const buttonToAdd = newCat.appendButton()
           $('.cats-index').append(buttonToAdd)

           $('#newCatFormReload').css('display','block');
      })
    })
  }

  function newCatFormReload(){
    $('#newCatFormReload').on("click", function(e){
      $('#new-cat-form').show()
      $("#new-cat-show").hide()
      $('#newCatFormReload').hide()
    })
  }

  function catShowPage(catId){
    var agencyId = parseInt($(".agency-id").attr("data-id"))
    window.location.href = "/agencies/" + agencyId + "/cats/" + catId
    }

  function agencyShowPage(agencyId){
    window.location.href= "/agencies/" + agencyId
  }

  function editAgency(agencyId){
    window.location.href= "/agencies/" + agencyId + "/edit"
  }
