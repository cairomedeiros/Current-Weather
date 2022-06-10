import api from './api/api';
import { useCallback, useEffect, useState } from 'react';
import './style.css';
import { Axios } from 'axios';


function App() {

  const [city, setCity] = useState('');
  const [dt, setDt] = useState([]);
  const [capital, setCapital] = useState([]);



  const capitalsName = [

    {
      name: "Rio de Janeiro",
      id: 3451190
    },
    {
      name: "São Paulo",
      id: 3448439
    },
    {
      name: "Belo Horizonte",
      id: 3470127
    },
    {
      name: "João Pessoa",
      id: 3397277
    },
    {
      name: "Brasília",
      id: 3469058
    },
    {
      name: "Belém",
      id: 3405870
    },
    {
      name: "Salvador",
      id: 3450554
    },
    {
      name: "Curitiba",
      id: 6322752
    },
    {
      name: "Fortaleza",
      id: 6320062
    },
    {
      name: "Manaus",
      id: 3663517
    }

  ]

  useEffect(() => {

   const getWeatherCapital = async () => {

    const capitalIds = capitalsName.map(item => item.name);
    const response = await api.get(`/weather?q=${capitalIds.join(", ")}&appid=b8342943dabdefa84d2a44b07fde9d13&units=metric&lang=pt_br`);
    console.log(response);

    
   }
    
   getWeatherCapital();


  }, [])
  

  const handleSubmit = useCallback((e) => {
    
    e.preventDefault();

    async function submit(){
      if(!setDt === []){
        setDt([]);
      }
     

    const response = await api.get(`/weather?q=${city}&appid=b8342943dabdefa84d2a44b07fde9d13&units=metric&lang=pt_br`);
        
    const hasCidade = dt.find( cidade => cidade.id === city);

    if(hasCidade){
      throw new Error('Clima da cidade já está sendo mostrado!')
    }

    const data = {
      id: response.data.sys.id,
      nome: response.data.name,
      pais: response.data.sys.country,
      temperatura: response.data.main.temp,
      tempmax: response.data.main.temp_max,
      tempmin: response.data.main.temp_min,
      weatherr: response.data.weather[0].description,
      vento: response.data.wind.speed,
      feel: response.data.main.feels_like,
      humidade: response.data.main.feels_like,

    }
    
    setDt([data]);
    setCity('');

    }
    submit();

  }, [city, dt])

  function inputChange(e){
    setCity(e.target.value);
  }

  return (
    <div className="geral">
     <div className="container">
        <div className="titulo">
          <h1>Previsão do tempo</h1>
          
        </div>

        <div>
          {dt.map(dados => (
            <div className="weatherReport" key={dados.id}>
              <p>{dados.nome}, {dados.pais}</p>
              <h1>{dados.temperatura}°C {dados.weatherr}</h1>

              <div className="infos" key={dados.id}>
                <p>{dados.tempmin}°</p>
                <p>{dados.tempmax}°</p>
                <p>{dados.vento}Km/h</p>
                <h2>{dados.feel}°C</h2>
                <h2>{dados.humidade}%</h2>
              </div>
            </div>
          ))}
        </div>

        <form className="formulario" onSubmit={handleSubmit}>

          <input 
          type="text-area" 
          placeholder="Insira aqui o nome da cidade"
          value={city}
          onChange={inputChange}
          />
          <button type="submit">search</button>

        </form>

        
        

     </div>

     <div className="capitais">

     </div>


    </div>
  );
}

export default App;
