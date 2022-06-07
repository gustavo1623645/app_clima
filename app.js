//- Your API key is 3d5a56c7389191fd64de5f21ad3f5b42
const key="3d5a56c7389191fd64de5f21ad3f5b42";
 let lat;
 let lon;

 const temp=document.querySelector("#temp");
 const tempDesc=document.querySelector("#temp-desc");
 const tempMax=document.querySelector("#temp-max");
 const tempMin=document.querySelector("#temp-min");


 const city=document.querySelector("#ciudad");
 const icono=document.querySelector("#icono");
 const vViento=document.querySelector("#v-viento");
 const VVientoDesc=document.querySelector("#v-viento-desc");


//usamos la api de js para obtener datos de geolocalizcion
  navigator.geolocation.getCurrentPosition(posicion=>{
    //  console.log("longuitud: "+posicion.coords.longitude) //nunca
      lon=posicion.coords.longitude
      lat=posicion.coords.latitude

      const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=es&units=metric`
     // console.log(url)

       //ahora usamos fetch para hacer la peticiones
 
     fetch(url)
  .then (response=>{
    return response.json()
  })
  .then(data=>{
    console.log(data);//ahora data dentra todos los datos
   const temperatura=Math.round(data.main.temp)  //obtenemos la temperatiura
   temp.textContent=`${temperatura} °C`  //agregamos la temperatura al dom

   const tempMaxima=Math.round(data.main.temp_max);
   tempMax.textContent=`Temperatura maxima: ${tempMaxima}°C`

   const tempMinima=Math.round(data.main.temp_min);
   tempMin.textContent=`Temperatura minima: ${tempMinima}°C`

   const descripcion=data.weather[0].description
   tempDesc.textContent=`${descripcion}`

   //campturamos velocidad de viento
   let viento=data.wind.speed;
   console.log(viento+"viento")
   VVientoDesc.textContent=`${viento} m/s`

   //ahora capturamos la cuidad y el icono
   const ciudad=data.name
   city.textContent=ciudad
   //ahora capturamos el icono y usaremos un switch para valorar cada description
   switch(data.weather[0].main){ 
     case "Clouds":
       console.log("nublado")
       icono.src="animated/cloudy.svg"
     break;
     case "Clear":
       console.log("despejado")
       icono.src="animated/day.svg"
     break;

     case "Thunderstorm":
     console.log("tormenta")
     icono.src="animated/thunder.svg"
     break;
     
     case "Drizzle":
     console.log("llovizna")
     icono.src="animated/rainy-4.svg"
      break;
      
      case "Rain":
     console.log("lluvia")
     icono.src="animated/rainy-7.svg"
     break;
     
     case "Snow":
     console.log("Nieve")
     icono.src="animated/snowy-5.svg"
     break;
   }
   

  })
  .catch(error=>{
   console.log(error)
  })
  });

  


  
  