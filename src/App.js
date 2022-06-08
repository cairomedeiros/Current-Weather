import api from './api/api';
import { useCallback, useEffect, useState } from 'react';
import './style.css';


function App() {

  const [city, setCity] = useState('');
  const [dt, setDt] = useState([])
  

  useEffect(() => {

    
  }, [])

  const handleSubmit = useCallback((e) => {
    
    e.preventDefault();
    async function submit(){
     

    const response = await api.get(`/weather?q=${city}&appid=b8342943dabdefa84d2a44b07fde9d13&units=metric&lang=pt_br`);

    const hasCidade = dt.find( cidade => cidade.idzada === city);

    if(hasCidade){
      throw new Error('Clima da cidade já está sendo mostrado!')
    }

    const data = {
      idzada: response.data.sys.id,
      temperatura: response.data.main.temp,
      tempmax: response.data.main.temp_max,
      tempmin: response.data.main.temp_min,
      weatherr: response.data.weather[0].description,
    }
    
    setDt([...dt, data]);
    setCity('');

    }
    submit();

  }, [city, dt])

  function inputChange(e){
    setCity(e.target.value);
  }

  return (
    <div className="App">
     <div className="container">

        <h1>Previsão do tempo</h1>

        <div>
          {dt.map(dados => (
            <div className="weatherReport" key={dados.idzada}>
              <p>Niterói, RJ - BR</p>
              <h1>20º Nublado</h1>

              <div className="infos">
                <h2>16°^25°</h2>
                <h2>Sensação 19°c</h2>
                <h2>Vento 18km/h</h2>
                <h2>Humidade 89%</h2>
              </div>
            </div>
          ))}
        </div>

        <form className="forms" onSubmit={handleSubmit}>

          <input 
          type="text" 
          placeholder="Insira aqui o nome da cidade"
          value={city}
          onChange={inputChange}
          />
          <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>

        </form>

        
        

     </div>

     <div className="capitais">

     </div>


    </div>
  );
}

export default App;
