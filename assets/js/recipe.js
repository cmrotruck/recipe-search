var bodyEl = document.querySelector("body");
//nutritional api connection
var loadNutritionalData = function (data, ingredient) {
    console.log(data);
    console.log

    $('.ui.modal')
        .modal()
    ;

    // var modalEl = document.createElement("div");
    // modalEl.classList = "ui modal";

    // var closeIconEl = document.createElement("i");
    // closeIconEl.classList = "close icon";
    // modalEl.appendChild(closeIconEl);

    // var headerEl = document.createElement("div");
    // headerEl.className = "modalheader";
    // headerEl.textContent = "Nutrition Facts";
    // modalEl.appendChild(headerEl);

    // var servingSizeEl = document.createElement("div");
    // servingSizeEl.className = "serving-size";
    // servingSizeEl.textContent = "Amount Per Serving";
    // modalEl.appendChild(servingSizeEl);

    // var calorieEl = document.createElement("div");
    // calorieEl.className = "calorie-header";
    // calorieEl.textContent = "Calories";
    // modalEl.appendChild(calorieEl);


    // bodyEl.appendChild(modalEl);


    $('.ui.modal')
        .modal('show')
    ;
}

var getNutritionalFacts = function (ingredient) {
    var nutritionApiUrl = "https://api.edamam.com/api/nutrition-data?app_id=1ef0bd3b&app_key=183522d5ba98d3967d9553f24e787347&nutrition-type=cooking&ingr=" + ingredient;

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