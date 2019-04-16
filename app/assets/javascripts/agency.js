$(document).ready(function() {
  loadCatIndex()
  toggleTabs()
  newCat()
  newCatFormReload()
})

$(document).ready(function() {
  $(".cats-index").on("click", function(e){
    var button = $( e.target ).closest( "button" )
    var catId = parseInt(button.attr("id"))
    var agencyId = parseInt($(".agency-id").attr("data-id"))
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
  })
//   $('button#cats-index-list').on("click", function() {
//     console.log("click")
//   //   var $li = $(this).closest('li')
//   //
//   //   })
//   })
// })


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

  // function catShowPage(catId){
  //   var agencyId = parseInt($(".agency-id").attr("data-id"))
  //   window.location.href = "/agencies/" + agencyId + "/cats/" + catId
  //   }

  function agencyShowPage(agencyId){
    window.location.href= "/agencies/" + agencyId
  }

  function editAgency(agencyId){
    window.location.href= "/agencies/" + agencyId + "/edit"
  }

  function Agency(agency) {
    this.name = agency.name
    this.street_1 = agency.street_1
    this.street_2 = agency.street_2
    this.city = agency.city
    this.state = agency.state
    this.zip_code = agency.zip_code
    this.email = agency.email
    this.phone_number = agency.phone_number
  }
