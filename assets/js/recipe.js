var bodyEl = document.querySelector("body");

var getRecipe = function () {
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
                        // $("#foodPic").addClass("recipe-pic");
                        console.log(foodPic);

                        var recipeName = data.recipe.label;
                        $("#title").text(recipeName);
                        console.log(data);

                        var recipeLink = data.recipe.url;
                        $("#link").attr("href", recipeLink);
                        console.log(recipeLink);

                        var ingredients = data.recipe.ingredientLines;
                        var length = ingredients.length;
                        for (var i = 0; i < length; i++) {
                            var ingredient = ingredients[i]
                            var li = $("<li>").text(ingredient);
                            $("#ingredient").append(li)
}});
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

var getFullNutritionFacts = function () {
    var queryString = document.location.search;
    var recipeId = queryString.split("=")[1];
    var apiURL = "https://api.edamam.com/api/recipes/v2/" + recipeId + "?type=public&app_id=579b2f0b&app_key=96bbae1d37867a6a42e036acb98ac063";


    //nutritional api connection
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {

                            //initialize modal
                            $('.ui.modalF')
                            .modal()
                            ;

                            $("#caloriesF").text(Math.round(data.recipe.calories));
                            console.log(Math.round(data.recipe.totalNutrients.FAT.quantity) + " " + data.recipe.totalNutrients.FAT.unit);
                             //total fat
                            $("#totalFatWeightF").text(Math.round(data.recipe.totalNutrients.FAT.quantity) + " " + data.recipe.totalNutrients.FAT.unit);
                            $("#TotalFatPercentageF").text(Math.round(data.recipe.totalDaily.FAT.quantity) + " " + data.recipe.totalDaily.FAT.unit);
                            //saturated fat
                            $("#saturatedFatWeightF").text(Math.round(data.recipe.totalNutrients.FASAT.quantity) + " " + data.recipe.totalNutrients.FASAT.unit);
                            $("#saturatedFatpercentageF").text(Math.round(data.recipe.totalDaily.FASAT.quantity) + " " + data.recipe.totalDaily.FASAT.unit);
                            //trans fat - no field in response
                            //cholesterol
                            $("#cholesterolWeightF").text(Math.round(data.recipe.totalNutrients.CHOLE.quantity) + " " + data.recipe.totalNutrients.CHOLE.unit);
                            $("#cholesterolPercentageF").text(Math.round(data.recipe.totalDaily.CHOLE.quantity) + " " + data.recipe.totalDaily.CHOLE.unit);
                            //sodium
                            $("#sodiumWeightF").text(Math.round(data.recipe.totalNutrients.NA.quantity) + " " + data.recipe.totalNutrients.NA.unit);
                            $("#sodiumPercentageF").text(Math.round(data.recipe.totalDaily.NA.quantity) + " " + data.recipe.totalDaily.NA.unit);
                            //totalCarbs
                            $("#totalCarbWeightF").text(Math.round(data.recipe.totalNutrients.CHOCDF.quantity) + " " + data.recipe.totalNutrients.CHOCDF.unit);
                            $("#totalCarbPercentageF").text(Math.round(data.recipe.totalDaily.CHOCDF.quantity) + " " + data.recipe.totalDaily.CHOCDF.unit);
                            //dietary fiber
                            $("#dietaryFiberWeightF").text(Math.round(data.recipe.totalNutrients.FIBTG.quantity) + " " + data.recipe.totalNutrients.FIBTG.unit);
                            $("#dietaryFiberPercentageF").text(Math.round(data.recipe.totalDaily.FIBTG.quantity) + " " + data.recipe.totalDaily.FIBTG.unit);
                            //total sugars
                            $("#totalSugarsWeightF").text(Math.round(data.recipe.totalNutrients.SUGAR.quantity) + " " + data.recipe.totalNutrients.SUGAR.unit);
                            // $("#totalSugarsPercentage").text(data.totalDaily.SUGAR.quantity + " " + data.totalDaily.SUGAR.unit);
                            //protein
                            $("#proteinWeightF").text(Math.round(data.recipe.totalNutrients.PROCNT.quantity) + " " + data.recipe.totalNutrients.PROCNT.unit);
                            $("#proteinPercentageF").text(Math.round(data.recipe.totalDaily.PROCNT.quantity) + " " + data.recipe.totalDaily.PROCNT.unit);
                            //vitamin D
                            // $("#vitaminDWeight").text(data.totalNutrients.VITD.quantity + " " + data.totalNutrients.VITD.unit);
                            // $("#vitaminDPercentage").text(data.totalDaily.VITD.quantity + " " + data.totalDaily.VITD.unit);
                            //calcium
                            $("#calciumWeightF").text(Math.round(data.recipe.totalNutrients.CA.quantity) + " " + data.recipe.totalNutrients.CA.unit);
                            $("#calciumPercentageF").text(Math.round(data.recipe.totalDaily.CA.quantity) + " " + data.recipe.totalDaily.CA.unit);
                            //iron
                            $("#ironWeightF").text(Math.round(data.recipe.totalNutrients.FE.quantity) + " " + data.recipe.totalNutrients.FE.unit);
                            $("#ironPercentageF").text(Math.round(data.recipe.totalDaily.FE.quantity) + " " + data.recipe.totalDaily.FE.unit);
                            //potassium
                            $("#potassiumWeightF").text(Math.round(data.recipe.totalNutrients.K.quantity) + " " + data.recipe.totalNutrients.K.unit);
                            $("#potassiumPercentageF").text(Math.round(data.recipe.totalDaily.K.quantity) + " " + data.recipe.totalDaily.K.unit);



                            //show modal
                            $('.ui.modalF')
                             .modal('show')
                            ;
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
                        loadNutritionalData(data, ingredient);
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

$(".full-nutrition-facts").on("click", function (event) {
    event.preventDefault();
    // console.log(event.target.id);
    // console.log(event.target.textContent);
    getFullNutritionFacts(event.target.textContent);
    ;
});


//get recipe
getRecipe();