let searchBox = document.querySelector(".search-box");
let searchBtn = document.querySelector(".search-btn");
let recipeContainer = document.querySelector(".recipe-container");
let recipeDetailsContent = document.querySelector(".recipe-details-content");
let closeBtn = document.querySelector(".close-btn");

const fetchRecipes = async (qurry) => {
    recipeContainer.innerHTML = "<h2>Searching Recipes...</h2>"
    try {
        
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${qurry}`)
    const response = await data.json()
    console.log(response)
    recipeContainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div")
        recipeDiv.classList.add("recipe")
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" />
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement("button")
        button.textContent = "View Recipe"
        recipeContainer.appendChild(recipeDiv)
        recipeDiv.appendChild(button)

        button.addEventListener("click", () => {
            openRecipePopup(meal)
        })

        recipeContainer.appendChild(recipeDiv)
    });
}  catch (error) {
    recipeContainer.innerHTML = "<h2>please enter correct name of recipe.</h2>"
}
}

const fetchIngredents = (meal) => {
    let ingredentsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredient}</li>`
        } else {
            break
        }
    }
    return ingredentsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredentsList">${fetchIngredents(meal)}</ul>
    <div class="Instructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
</div>
`
    recipeDetailsContent.parentElement.style.display = "block";

}

closeBtn.addEventListener("click", ()=>{
    recipeDetailsContent.parentElement.style.display = "none"
})


searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const searchInput = searchBox.value.trim()
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the recipe name in the search box.</h2>`
        return;
    }
    fetchRecipes(searchInput)
})