function showCat(catId){
  var agencyId = document.getElementsByClassName("cat-agency").innerHTML
  window.location.href = "/agencies/" + agencyId + "/cats/" + catId
  }

  function filterByCost() {
    window.location.href = "/cats/filter_by_cost"
    }


function Cat(cat) {
     this.name = cat.name
     this.breed = cat.breed
     this.age = cat.age
     this.sex = cat.sex
     this.disposition = cat.disposition
     this.cost = cat.cost
     this.adopted = cat.adopted
     this.user_id = cat.user_id
     this.neutered = cat.neutered
     this.image = cat.image
     this.agency_id = cat.agency_id
     this.owner_id = cat.owner_id
}

  Cat.prototype.catInfo = function () {
     let catParagraph =
     `<p>${this.name} is a ${this.age} year old ${this.breed} cat. It is known for being ${this.disposition}. <p>`

     return catParagraph
   }

   Cat.prototype.appendButton = function () {
     let button = `
     <button class="cats-index-list" id=${this.id} onClick="catShowPage(this.id)">
         <p class="cat-id" data-id="${this.id}">${this.id}</p>
         <img id="cat-image" src=${this.image}>
         <p>${this.name}</p>
         <p>${this.breed}</p>
         </button> `

         return button
   }
