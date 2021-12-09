//nutritional api connection
var getNutritionalFacts = function(foodId){
    var nutritionApiUrl = "https://api.edamam.com/api/nutrition-data?app_id=1ef0bd3b&app_key=183522d5ba98d3967d9553f24e787347&nutrition-type=cooking&ingr=" + foodId;

    fetch(nutritionApiUrl)
    .then(function(response){
        if(response.ok){
            response.json()
             .then(function(data) {
                displayWeather(data);
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