const loadMeals = name => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = ``;
    // console.log(meals)
    meals.forEach(meal => {
        // console.log(meal);

        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div class="card" onclick="showDetails(${meal.idMeal})">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}.</p>
            </div>
        </div>
        `;
        mealsContainer.appendChild(mealDiv);

    });
}

const searchFood = () => {
    const inputField = document.getElementById('input-field');
    const input = inputField.value;
    loadMeals(input);
    inputField.value = '';
    const displayField = document.getElementById('meal-detail');
    displayField.innerHTML = ``;

}

const showDetails = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = (meal) => {
    // console.log(meal);
    const displayField = document.getElementById('meal-detail');
    displayField.innerHTML = ``;
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');
    mealDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    `;
    displayField.appendChild(mealDiv);
}


loadMeals('');