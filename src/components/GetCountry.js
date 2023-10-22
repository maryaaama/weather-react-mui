import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useEffect, useState} from 'react';
import Weather from './weather';
import Container from '@mui/material/Container';


export default function GetCountry() {

    const options=[
        'Asia%2FTokyo' ,
        'Europe%2FMoscow' ,
        'Europe%2FBerlin',
        'Europe%2FLondon' ,
        'America%2FChicago' ,
         'Australia%2FSydney' ,
        ]
    
     const [value, setValue] = useState(options[0]);
     const [inputValue, setInputValue] =useState('');
     const [air,setAir]=useState([
      
       ['latitude', 52.5],
       ['longitude', 13.400009],
       ['generationtime_ms', 0.5478858947753906],
       ['utc_offset_seconds', 32400],
       ['timezone', 'Asia/Tokyo'],
       ['timezone_abbreviation', 'JST'],
       ['elevation', 38]
      ]); 
     let num =  value.indexOf('%2F', 3);
     let aName =value.slice(0, num) ;
     let bName = value.slice(num+3 , value.length);
    

     useEffect(() => {
      console.log('value:'+value); 
      getCountries(value);
     },[value])

     async function getCountries(value){await
      fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2022-01-01&end_date=2022-12-31&daily=temperature_2m_mean,rain_sum&timezone=${value}`)
      .then(response => response.json())
      .then(data =>{ 
      setAir (Object.entries(data))
      console.log(Object.entries(data));
                  })
                }
   if (air){
    
     return (

       <>
      <Container maxWidth='xs'  style={{display:'flex', marginTop:70 , marginLeft:50}}>
      
      <div>{`country name: '${aName}'`}</div>

      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
       
      />
      </Container>
  
      <Weather {...air} aName={aName} bName={bName}></Weather>
    
      
     
    </>
  )}
  
}
