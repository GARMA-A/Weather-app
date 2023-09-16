const iconel = document.querySelector(".weather-icon");
const tempel = document.querySelector(".temperature-value p");
const desel = document.querySelector(".temperature-description p");
const locael = document.querySelector(".location");
const notiel = document.querySelector(".notification");
const cir1 =  document.querySelector(".circle-spain");
const cir2 =  document.querySelector(".circle-spain2");
cir1.innerHTML = `<img src= "imgs/01d.png"/>`;
cir2.innerHTML = `<img src= "imgs/13d.png"/>`;



const weather = {};
weather.temperature = {
    unit : "celsius",
   

}



const kelvin = 273;
const key = "20b34a9d7ccb5cd85e154737b6782279";
function celsiusToFahrenheit(temperature)
{
    return(temperature * 9/5 )+32;
}
function getWeather(latitude,longitude)
{
    let api = "https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=20b34a9d7ccb5cd85e154737b6782279&units=metric" ;
   
    
    fetch(api)
    .then(function(response)
    {
        let data = response.json();
        return data;
    })
    .then(function(data)
    {
        weather.temperature.value=Math.floor(data.main.temp );
    
        weather.description = data.weather[0].description;
        weather.iconid = data.weather[0].icon;
        console.log(weather.iconid);
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function()
    {
        displayWeather();
    })
}



function displayWeather()
{


  iconel.innerHTML = `<img src= "imgs/${weather.iconid}.png"/>`;

  tempel.innerHTML = `${weather.temperature.value}° <span> C </span>`;

  desel.innerHTML = weather.description;

  locael.innerHTML = `${weather.city}, ${weather.country}`;

}



tempel.addEventListener("click", function()
{
if(weather.temperature.value === undefined) return;
if(weather.temperature.unit === "celsius")
{
  let fahrenheit =celsiusToFahrenheit(weather.temperature.value);
  fahrenheit = Math.floor(fahrenheit);
  tempel.innerHTML = `${fahrenheit}° <span>F</span>`;
  weather.temperature.unit = "fahrenheit";
}
else
{
 tempel.innerHTML = `${weather.temperature.value}° <span>C</span>`;
 weather.temperature.unit = "celsius";
}


});


if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else
{
    notiel.classList.remove("back");
    notiel.classList.add("ani");
    notiel.style.display ="block";
    notiel.innerHTML = "<p>PLZ turn on GPS</p>";

}
function setPosition(position)
{
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
getWeather(latitude,longitude);


}

function showError(error)
{
    notiel.classList.remove("back");
    notiel.classList.add("ani");
    notiel.style.display ="block";

    notiel.innerHTML=`<p>PLZ turn on GPS !</p>`;

}
















