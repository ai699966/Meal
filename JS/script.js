var allMeals = [];
var wishMeals = [];
var homeMeals = [];
var category = document.getElementsByClassName("category");

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
    <div class ="mealCard col-1 ">
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
  let cartona = "";
  for (let index = 0; index < wishMeals.length; index++) {
    cartona += `
      <div class ="mealCard col-1">
          <div class="mealCardImg">
              <img src=${wishMeals[index].strCategoryThumb} alt="Meal Image"/>
          </div>
          <div class="mealCardInfo">
              <h4 class="text-center">${wishMeals[index].strCategory}</h4>
              <div class ="addWish"><div><i class="fa-solid fa-heart cursor"></i></div></div>
          </div>
      </div>`;
  }
  document.getElementById("wishList").innerHTML = cartona;
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
        <div class ="mealCard col-1 ">
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
  document.getElementById("wish").innerHTML = wishMeals.length;
  renderWishMeals();
};
const removeFromWish = (meal) => {
  let newWish = wishMeals.filter((items) => items.id !== meal.id);
};
getAllMeals();
