import React, { useState, useEffect } from 'react'
import axios from 'axios'

const promise = axios.get('https://restcountries.eu/rest/v2/all')
console.log(promise)

promise.then(response => {
  console.log(response)
})


const CountryList = ({country, click, weather}) => {

  if (country.length > 10){
    return 'Too many matches, specify another filter'
  }else if (country.length === 1){
    return <Countryinfo mycountry={country[0]} weather={weather}/>
  }else{
    return <CountryForm mycountry={country} click={click}/>
  }
}


const CountryForm= ({mycountry, click}) => (
  <div>
  <form action='/'>
  {mycountry.map(country =>
    <p>
    {country.name}
    <button type='button' onClick={click} value={country.name}>show</button>
    </p>)
  }
  </form>
  </div>
)


const Countryinfo = ({mycountry,weather}) =>{
  //const iconURL = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
  // <h2> weather in {weather.name} </h2>
  // <p> temperature: {weather.main.temp} </p>
  // <img src={iconURL}/>
  //<p> wind: {weather.wind.speed}m/s direction {weather.wind.deg} degree</p>
    return(
      <div>
      <h1>{mycountry.name}</h1>
      <p> capital {mycountry.capital} </p>
      <p> population {mycountry.population} </p>
      <h2> languages </h2>
      <ul>
      {mycountry.languages.map(language => <li> {language.name} </li>)}
      </ul>
      <img src={mycountry.flag} alt='flag' width='20%'/>


      </div>
)
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [mycountry, setMyCountry] = useState([])
  const [weatherURL, setURL] = useState('')

  useEffect(()=> {
    axios.get('https://restcountries.eu/rest/v2/all').then(
      response=>{
      console.log('countries fulfulled')
      setCountries(response.data)
    })
  },[])

  // weatherData
  const [weather, setWeather] = useState([])

  let city = '';
  const unit = 'metric';
  const appid = '7db7166fa83a7bc52d2596385c027f2b';
  let url = '';

    useEffect(() => {
        axios.get(weatherURL).then(
          response => {
            console.log('weather fulfulled')
            setWeather(response.data)
          })
    }, [])



  const handleTextChange = (event) => {
    setSearchCountry(event.target.value)
    const findCountry = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))

    if (event.target.value === ''){
      setMyCountry([])
    }else{
      setMyCountry(findCountry)
    }
    if (mycountry.length===1) {
      city = mycountry[0].capital
      setURL('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appid + '&units=' + unit)
    }
  }


  const click =(event) =>{
    setMyCountry(mycountry.filter(country => country.name === event.target.value))
    setSearchCountry('')
  }


  return (
    <div>
      <p>find countries: <input value={searchCountry} onChange={handleTextChange} /></p>
      <CountryList key={mycountry.length+1} country={mycountry} click={click} weather={weather}/>
    </div>
  )
}

export default App
