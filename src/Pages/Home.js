import React,{useState} from 'react'
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from "../graphql/Queries"

const Home = () => {
    const [citySearched,setCitySearched]=useState("")
        
    const [getWeather,{loading,data,error}] = useLazyQuery(GET_WEATHER_QUERY,{
        variables: {name:citySearched}
    })
    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error found</h1>
    if (data){
        console.log(data)
    }
    
    return ( 
        <div className="home">
            <h1>Search for Weather</h1>
            <input value={citySearched} onChange={(e)=>setCitySearched(e.target.value)} type="text" placeholder="City name..."></input>
            <button onClick={()=>getWeather()}>Search</button>
            <div className="weather">
                {data &&(
                    <>
                        <h1>City name: {data.getCityByName.name}</h1>
                        <h1>Actual Temperature: {data.getCityByName.weather.temperature.actual}</h1>
                        <h1>Weather description: {data.getCityByName.weather.summary.description}</h1>
                        <h1>Wind speed:{data.getCityByName.weather.wind.speed} km/h</h1>
                    </>
                )}                
            </div>
        </div>
     );
}
 
export default Home;