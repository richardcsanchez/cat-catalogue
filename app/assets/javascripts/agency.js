$(document).ready(function() {
  loadCatIndex()
  toggleTabs()
  newCat()
  newCatFormReload()
  loadCatData()
})

function loadCatData() {
  $(".cats-index").on("click", function(e){
    var button = $( e.target ).closest( "button" )
    var catId = parseInt(button.attr("id"))
    var agencyId = parseInt(button.attr("agency_id"))
      fetch(agencyId + '/cats/' + catId + '.json')
        .then(res => res.json())
        .then(cat => {
          let newCat = new Cat(cat)
          let catHTML = newCat.catInfo()
          $(".cats-index").hide()
          $("#cat-data").show()
          $("#cat-data").html(catHTML)
        })
      })
  }

  function loadCatIndex(){
    $('.newCat').hide()
    $('.cats-index').hide()
    $('#cat-data').hide()
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
      $('#cat-data').hide()
      })

    $('#new-cat-button').on("click", function() {
        $('.newCat').toggle()
        $('.cats-index').hide()
        $('#cat-data').hide()
      })
    }

  function newCat(){
    $("#new_cat").on("submit", function(e){
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
        e.preventDefault()
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
      var agencyId = parseInt($(".cats-index-list").attr("agency_id"))
      window.location.href = "/agencies/" + agencyId + "/cats/" + catId
    }

  function agencyShowPage(agencyId){
    window.location.href= "/agencies/" + agencyId
  }

  function editAgency(agencyId){
    window.location.href= "/agencies/" + agencyId + "/edit"
  }
