var bodyEl = document.querySelector("body");

 var getRecipe = function() {
     var queryString = document.location.search;
     var recipeId = queryString.split("=")[1];
     var apiURL = "https://api.edamam.com/api/recipes/v2/" + recipeId + "?type=public&app_id=579b2f0b&app_key=96bbae1d37867a6a42e036acb98ac063";

    
    //nutritional api connection
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        //ALL WORK GOES HERE
                        var foodPic = data.recipe.images.REGULAR.url;
                        $("#foodPic").attr("src", foodPic);
                        console.log(foodPic);

                        var recipeName = data.recipe.label;
                        $("#title").text(recipeName);
                       console.log(data);

                       var recipeLink = data.recipe.shareAs;
                       $("#link").attr("href",recipeLink);
                       console.log(recipeLink);

                       var ingredients = data.recipe.ingredientLines;
                       var length = ingredients.length;
                       for (var i = 0; i < length; i++) {
                         var ingredient = ingredients[i]
                         var li = $("<li></li>").text(ingredient);
                         $("#ingredient").append(li)
                       }
                    });
                console.log("Connection successful!");
            }
            else {
                console.log("conneciton unsuccessful");
            }
        })
        .catch(function (error) {
            console.log("could not connect");
        })
 }

function round(amount) {
    return Number.parseFloat(amount).toPrecision(3);
}

var loadNutritionalData = function (data, ingredient) {
    console.log(data);
    console.log

    //initialize modal
    $('.ui.modal')
        .modal()
    ;

    //fill out modal

    //calories
    $("#calories").text(Math.round(data.calories));
    console.log(Math.round(data.totalNutrients.FAT.quantity) + " " + data.totalNutrients.FAT.unit);
    //total fat
    $("#totalFatWeight").text(Math.round(data.totalNutrients.FAT.quantity) + " " + data.totalNutrients.FAT.unit);
    $("#TotalFatPercentage").text(Math.round(data.totalDaily.FAT.quantity) + " " + data.totalDaily.FAT.unit);
    //saturated fat
    $("#saturatedFatWeight").text(Math.round(data.totalNutrients.FASAT.quantity) + " " + data.totalNutrients.FASAT.unit);
    $("#saturatedFatpercentage").text(Math.round(data.totalDaily.FASAT.quantity) + " " + data.totalDaily.FASAT.unit);
    //trans fat - no field in response
    //cholesterol
    $("#cholesterolWeight").text(Math.round(data.totalNutrients.CHOLE.quantity) + " " + data.totalNutrients.CHOLE.unit);
    $("#cholesterolPercentage").text(Math.round(data.totalDaily.CHOLE.quantity) + " " + data.totalDaily.CHOLE.unit);
    //sodium
    $("#sodiumWeight").text(Math.round(data.totalNutrients.NA.quantity) + " " + data.totalNutrients.NA.unit);
    $("#sodiumPercentage").text(Math.round(data.totalDaily.NA.quantity) + " " + data.totalDaily.NA.unit);
    //totalCarbs
    $("#totalCarbWeight").text(Math.round(data.totalNutrients.CHOCDF.quantity) + " " + data.totalNutrients.CHOCDF.unit);
    $("#totalCarbPercentage").text(Math.round(data.totalDaily.CHOCDF.quantity) + " " + data.totalDaily.CHOCDF.unit);
    //dietary fiber
    $("#dietaryFiberWeight").text(Math.round(data.totalNutrients.FIBTG.quantity) + " " + data.totalNutrients.FIBTG.unit);
    $("#dietaryFiberPercentage").text(Math.round(data.totalDaily.FIBTG.quantity) + " " + data.totalDaily.FIBTG.unit);
    //total sugars
    $("#totalSugarsWeight").text(Math.round(data.totalNutrients.SUGAR.quantity) + " " + data.totalNutrients.SUGAR.unit);
    // $("#totalSugarsPercentage").text(data.totalDaily.SUGAR.quantity + " " + data.totalDaily.SUGAR.unit);
    //protein
    $("#proteinWeight").text(Math.round(data.totalNutrients.PROCNT.quantity) + " " + data.totalNutrients.PROCNT.unit);
    $("#proteinPercentage").text(Math.round(data.totalDaily.PROCNT.quantity) + " " + data.totalDaily.PROCNT.unit);
    //vitamin D
    // $("#vitaminDWeight").text(data.totalNutrients.VITD.quantity + " " + data.totalNutrients.VITD.unit);
    // $("#vitaminDPercentage").text(data.totalDaily.VITD.quantity + " " + data.totalDaily.VITD.unit);
    //calcium
    $("#calciumWeight").text(Math.round(data.totalNutrients.CA.quantity) + " " + data.totalNutrients.CA.unit);
    $("#calciumPercentage").text(Math.round(data.totalDaily.CA.quantity) + " " + data.totalDaily.CA.unit);
    //iron
    $("#ironWeight").text(Math.round(data.totalNutrients.FE.quantity) + " " + data.totalNutrients.FE.unit);
    $("#ironPercentage").text(Math.round(data.totalDaily.FE.quantity) + " " + data.totalDaily.FE.unit);
    //potassium
    $("#potassiumWeight").text(Math.round(data.totalNutrients.K.quantity) + " " + data.totalNutrients.K.unit);
    $("#potassiumPercentage").text(Math.round(data.totalDaily.K.quantity) + " " + data.totalDaily.K.unit);

    //show modal
    $('.ui.modal')
        .modal('show')
    ;
}

var getNutritionalFacts = function (ingredient) {
    var nutritionApiUrl = "https://api.edamam.com/api/nutrition-data?app_id=1ef0bd3b&app_key=183522d5ba98d3967d9553f24e787347&nutrition-type=cooking&ingr=" + ingredient;

    //nutritional api connection
    fetch(nutritionApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        loadNutritionalData(data,ingredient);
                    });
                console.log("Connection successful!");
            }
            else {
                console.log("conneciton unsuccessful");
            }
        })
        .catch(function (error) {
            console.log("could not connect");
        })

};

$(".ingredients").on("click", function (event) {
    event.preventDefault();
    // console.log(event.target.id);
    // console.log(event.target.textContent);
    getNutritionalFacts(event.target.textContent);
    ;
});

//get recipe
getRecipe();