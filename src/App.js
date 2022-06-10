import api from './api/api';
import { useCallback, useEffect, useState } from 'react';
import './style.css';


function App() {

  const [city, setCity] = useState('');
  const [dt, setDt] = useState([]);
  const [capital, setCapital] = useState([]);

  useEffect(() => {

    async function capitaiss(){

      const responses = await api.get(`/weather?q=${capital}&appid=b8342943dabdefa84d2a44b07fde9d13&units=metric&lang=pt_br`);
      const data = {
      temperaturaC: responses.data.main.temp,
      tempmaxC: responses.data.main.temp_max,
      nomeCapital: responses.data.name,
    }

    setCapital([data]);


    }

    capitaiss();
    


  }, [])
  

  const handleSubmit = useCallback((e) => {
    
    e.preventDefault();

    async function submit(){
      if(!setDt === []){
        setDt([]);
      }
     

    const response = await api.get(`/weather?q=${city}&appid=b8342943dabdefa84d2a44b07fde9d13&units=metric&lang=pt_br`);
        console.log(response)
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
