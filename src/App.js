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
      name: "Rio de Janeiro"
    },
    {
      name: "São Paulo"
    },
    {
      name: "Belo Horizonte"
    },
    {
      name: "João Pessoa"
    },
    {
      name: "Brasília"
    },
    {
      name: "Belém"
    },
    {
      name: "Salvador"
    },
    {
      name: "Curitiba"
    },
    {
      name: "Fortaleza"
    },
    {
      name: "Manaus"
    }

  ]

  useEffect(() => {

   

    const capitalIds = capitalsName.map(async item => {
      const responses = await api.get(`/weather?q=${item.name}&appid=b8342943dabdefa84d2a44b07fde9d13&units=metric&lang=pt_br`);
      return responses;
    })
    Promise.all(capitalIds)
    .then((res) => setCapital(res))
    .catch((err) => console.log(err))
  


    
   
    
   


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
     <header className="container">
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


     </header>

     <div className="capitais">
            
          <div className="fiveFirst">
            <header className="capitaisHeader"><strong>Capitais</strong></header>
          <div className="minMax"><strong>Min Máx</strong></div>
            {capital.slice([0], [5]).map( x => (
              <>
              
              <li key={x.data.main.id}><strong>{Math.trunc(x.data.main.temp_min)}° {Math.trunc(x.data.main.temp_max)}° {x.data.name}</strong>
              </li>
              </>
            ))}
          </div>

          <div className="fiveLast">
            <header></header>
          <div className="minMax"><strong>Min Máx</strong></div>
            {capital.slice([5], [10]).map( x => (
              <>
              
              <li key={x.data.main.id}><strong>{Math.trunc(x.data.main.temp_min)}° {Math.trunc(x.data.main.temp_max)}° {x.data.name}</strong>
              </li>
              </>
            ))}
          </div>

            
        </div>


    </div>
  );
}

export default App;
