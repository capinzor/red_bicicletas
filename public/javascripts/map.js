var map = L.map('main_map').setView([4.6297100, -74.0817500], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2FwaW56b25yIiwiYSI6ImNrbGh6ajM2ZDJpcjEybnFlM2w4Mjd0dGgifQ.BqEhEUUYNh-QJlXeiu22VA'
}).addTo(map);


$.ajax({
    dataType:"json",
    url: "api/bicycles",
    success: function (result) {
        console.log(result);
        result.bicycles.forEach(function(bicy){
            L.marker(bicy.location, {title: bicy.id}).addTo(map);
        });
    }
})