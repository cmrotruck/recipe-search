var searchBtn = document.getElementById("search-icon-id");
var searchblock = document.getElementById("searchbuttoninner");

var searchInput = function (){

    var searchInputValue = document.querySelector("input[name='search-name']").value;
    console.log(searchInputValue);
    getRecipeResult(searchInputValue);
    // reset form fields for next task to be entered
    document.querySelector("input[name='search-name']").value= "";
};

var getRecipeResult = function(searchword){
    var recipeResultUrl = "https://api.edamam.com/search?app_id=acaa9c88&app_key=48146bbbbfc368c53908337afbb386e6&q=" + searchword;

    fetch(recipeResultUrl)
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function(data) {
                    console.log(data);
                    for (i = 0; i < 6 ; i++){
                        var recipeIdVal = "recipe" + i;
                        var recipeEl = document.getElementById(recipeIdVal) ;
                        console.log(recipeIdVal);
                        //Getting the recipe name
                        let recipeName = data.hits[i].recipe.label;
                        //Getting the recipe type
                        let recipeType = data.hits[i].recipe.dishType[0];
                        //Getting the image path 
                        let recipeImage = data.hits[i].recipe.image;
                        //adding the above values to the DOM
                        $(recipeEl).find(".header").text(recipeName);
                        $(recipeEl).find(".description").text(recipeType);
                        $(recipeEl).find(".image").attr("src", recipeImage);
                    }
                    
                });
                console.log("Connection successful!");
            }
            else{
                console.log("conneciton unsuccessful");
            }
        })
        .catch(function(error){
            console.log("could not connect");
        })

}


//nutritional api connection
var getNutritionalFacts = function(foodId){
    var nutritionApiUrl = "https://api.edamam.com/api/nutrition-data?app_id=1ef0bd3b&app_key=183522d5ba98d3967d9553f24e787347&nutrition-type=cooking&ingr=" + foodId;
    console.log(nutritionApiUrl);
    fetch(nutritionApiUrl)
    .then(function(response){
        if(response.ok){
            response.json()
             .then(function(data) {
                console.log(data);
            });
            console.log("Connection successful!");
        }
        else{
            console.log("conneciton unsuccessful");
        }
    })
    .catch(function(error){
        console.log("could not connect");
    })

}

//onclilck event listener for the search icon
searchBtn.addEventListener("click", searchInput);

//event for enter key on the search option
$(searchblock).on("keydown", (function (event){

    if (event.which == 13){
        searchInput();
    }
        
}));