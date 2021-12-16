var searchBtn = document.getElementById("search-icon-id");
var searchblock = document.getElementById("searchbuttoninner");
var previousResultBtn = document.getElementById("previousSearchId");
var searchResults = [];
var previousResult = [];
var storedData = "";

var searchInput = function (){
    var searchInputValue = document.querySelector("input[name='search-name']").value;
    console.log(searchInputValue);
    getRecipeResult(searchInputValue);
    // reset form fields for next task to be entered
    document.querySelector("input[name='search-name']").value= "";
};

var getRecipeResult = function(searchword){
    var recipeResultUrl = "https://api.edamam.com/search?app_id=acaa9c88&app_key=48146bbbbfc368c53908337afbb386e6&q=" + searchword;  
    
    if (localStorage.getItem('previousResults') == null) {
        localStorage.setItem('previousResults', '[]');
    }
    searchResults = JSON.parse(localStorage.getItem('previousResults'));
    searchResults.push(searchword);
    console.log(searchResults);
    localStorage.setItem('previousResults', JSON.stringify(searchResults));

    fetch(recipeResultUrl)
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function(data) {
                    console.log(data);
                    for (i = 0; i < 6 ; i++) {
                        var recipeIdVal = "recipe" + i;
                        var recipeEl = document.getElementById(recipeIdVal) ;
                        var hideEl = document.getElementById("hideId");

                        if (searchword !== ""){
                            $(hideEl).removeClass("hide");
                            $(hideEl).addClass("recipes");
                            $(searchblock).removeClass("error");
                            $("#inputbox").attr("placeholder", "Search...");
                            //$(previousResultBtn).removeClass("hide");
                            $(previousResultBtn).text("Show Previous Ingredient");
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

                            storedData = data.hits[i].recipe.uri.split("#")[1];
                            
                            var hrefString = "./recipe.html?id=" + storedData;
                            $(recipeEl).attr('href',hrefString);

                        } else {
                            $(searchblock).addClass("error");
                            $("#inputbox").attr("placeholder", "Type an Ingredient");
                        }
                        
                        var hrefString = "./recipe.html?id=" + storedData;
                        console.log(hrefString);
                        $(recipeEl).attr('href',hrefString);
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


var showPreviousSearch = function(){

    if (localStorage.getItem('previousResults') == null) {
        localStorage.setItem('previousResults', '[]');
    }

    var lastResult = JSON.parse(localStorage.getItem('previousResults'));
    console.log(lastResult);
    console.log(lastResult.length);
    if(lastResult.length > 1){
        var lastSearch = lastResult.length -2;
        $(previousResultBtn).text(lastResult[lastSearch]);
        console.log("this is hit third ");
        
    } else if (lastResult.length === 1) {
        var lastSearch = lastResult.length -1;
        $(previousResultBtn).text(lastResult[lastSearch]);
        
        console.log("this is hit second");
    } else  {
        $(previousResultBtn).text(" this is first search");
        console.log("this is hit first time");
    }
}

//onclilck event listener for the search icon
searchBtn.addEventListener("click", searchInput);

//event for enter key on the search option
$(searchblock).on("keydown", (function (event){

    if (event.which == 13){
        searchInput();
    }
        
}));
//showPreviousSearch();

$(previousResultBtn).on("click",  showPreviousSearch);