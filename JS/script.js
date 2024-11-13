var allMeals = [];
var homeMeals = [];
var category = document.getElementsByClassName("category");
var shiftAmount = 0;

async function getAllMeals() {
  let URL = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  const response = await fetch(URL);
  console.log(response);
  const data = await response.json();
  allMeals = data.categories;
  console.log(allMeals);
  homeMeals = allMeals.slice(0, 6);
  renderMeals();
}

const renderMeals = () => {
  let cartona = "";
  for (let index = 0; index < allMeals.length; index++) {
    cartona += `
    <div class ="mealCard col-4 ">
        <div class="mealCardImg">
            <img src=${allMeals[index].strCategoryThumb} alt="Meal Image"/>
        </div>
        <div class="mealCardInfo">
            <h4 class="text-center" style="color: #ffffff;">${allMeals[index].strCategory}</h4>
            <div class ="addWish"><div><i class="fa-regular fa-heart cursor" style ="color:#fdd428;"></i></div></div>
        </div>
    </div>`;
  }
  document.getElementById("meals").innerHTML = cartona;
  let wishEvents = document.getElementsByClassName("addWish");
  for (let i = 0; i < wishEvents.length; i++) {
    wishEvents[i].addEventListener("click", function (e) {
      console.log("click");
      addToWishMeals(allMeals[i]);
      console.log(e.target);
    });
  }
};
const renderWishMeals = () => {
  if (wishMeals.length == 0 ) {
  document.getElementById("favMeal").innerHTML = `<h2 class="text-center py-3 text-white"> No Meals Added </h2>`;
  } else {
    let cartona = "";
  for (let index = 0; index < wishMeals.length; index++) {
    cartona += `
      <div class =" d-flex w-100 justify-content-center align-items-between">
          <div class="">
              <img src=${wishMeals[index].strCategoryThumb} alt="Meal Image"/>
          </div>
          <div class=" d-flex justify-content-center align-items-center">
              <h6 class="text-center text-white">${wishMeals[index].strCategoryDescription}</h4>
          </div>
          <div class="removeWish text-danger" onclick="removeFromWish(${wishMeals[index].idCategory})"><i class="fa-solid fa-xmark cursor"></i></div>
      </div>`;
  }
  document.getElementById("favMeal").innerHTML = cartona;
  }
  
};

async function renderCategoryMeals(prop) {
   prop = prop;
   console.log(prop);
   
  let url = `https://ai699966.github.io/API/Meals.json`;
  let response = await fetch(url);
  let data = await response.json();
  let meals = data[prop];
      let cartona = ``;
      for (let index = 0; index < meals.length; index++) {
        cartona += `
        <div class ="mealCard col-4 ">
        <div class="mealCardImg">
            <img src=${meals[index].strMealThumb} alt="Meal Image"/>
        </div>
        <div class="mealCardInfo">
            <h4 style="color: #ffffff;">${meals[index].strMeal}</h4>
            <div class ="addWish" style="background-color: gray;"><div><i class="fa-regular fa-heart cursor" style ="color:#fdd428;"></i></div></div>
        </div>
    </div>`;
      }
      document.getElementById("meals").innerHTML = cartona;
      let wishEvents = document.getElementsByClassName("addWish");
  for (let i = 0; i < wishEvents.length; i++) {
    wishEvents[i].addEventListener("click", function (e) {
      console.log("click");
      addToWishMeals(allMeals[i]);
      console.log(e.target);
    });
}};


category = document.getElementsByClassName("category");
for (let i = 0; i < category.length; i++) {
  category[i].addEventListener("click", function (e) {
    if (e.target.innerHTML == "Recommended") {
      document.getElementById("mealsTitle").innerHTML = "Recommended Meals";
      renderMeals();      
    }else {
      document.getElementById("mealsTitle").innerHTML = `${e.target.innerHTML} Meals`;
      renderCategoryMeals(e.target.innerHTML);
    }
  });}
const addToWishMeals = (meal) => {
  let selectedMeal = allMeals.filter((item) => item === meal);
  wishMeals.push(selectedMeal[0]);
  console.log(wishMeals);
  
  localStorage.setItem("wishMeals", JSON.stringify(wishMeals));
  document.getElementById("wish").innerHTML = wishMeals.length;

};
const removeFromWish = (id) => {
  console.log(`remove ${id}`);
  
  let newWish = wishMeals.filter((items) => items.idCategory !== `${id}`);
  wishMeals = newWish;
  localStorage.setItem("wishMeals", JSON.stringify(wishMeals));
  document.getElementById("wish").innerHTML = wishMeals.length;
  renderWishMeals();
};
getAllMeals();
if (localStorage.getItem("wishMeals") != null) {
  var wishMeals = JSON.parse(localStorage.getItem("wishMeals"));
  document.getElementById("wish").innerHTML = wishMeals.length;
  renderWishMeals();
} else {
   var wishMeals = [];
  renderWishMeals();
}

function shiftLeft () {
  if (window.screen.width > 768) {
    shiftAmount = shiftAmount - 150; 
    if (shiftAmount > -440 || shiftAmount == -440) {
      document.getElementsByClassName("rightArrow")[0].removeAttribute("disabled")
     document.getElementsByClassName("menue")[0].style.transform =  `translateX(${shiftAmount}px)`;
      
    } else {
      shiftAmount = -440;
      document.getElementsByClassName("leftArrow")[0].setAttribute("disabled", true)
      document.getElementsByClassName("menue")[0].style.transform =  `translateX(${shiftAmount}px)`;
    }
  } else {
    shiftAmount = shiftAmount - 40; 
    if (shiftAmount > -440 || shiftAmount == -580) {
      document.getElementsByClassName("rightArrow")[0].removeAttribute("disabled")
     document.getElementsByClassName("menue")[0].style.transform =  `translateX(${shiftAmount}px)`;
      
    } else {
      shiftAmount = -580;
      document.getElementsByClassName("leftArrow")[0].setAttribute("disabled", true)
      document.getElementsByClassName("menue")[0].style.transform =  `translateX(${shiftAmount}px)`;
    }
  }

};
 function shiftRight() {
  shiftAmount = shiftAmount + 150; 
  if (shiftAmount  < 0 || shiftAmount == 0 ) {
    document.getElementsByClassName("leftArrow")[0].removeAttribute("disabled")
   document.getElementsByClassName("menue")[0].style.transform =  `translateX(${shiftAmount}px)`;
    
  }else {
    shiftAmount = 0;
    document.getElementsByClassName("rightArrow")[0].setAttribute("disabled", true);
    document.getElementsByClassName("menue")[0].style.transform =  `translateX(${shiftAmount}px)`;  
  }
};
