import api from './api/api';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [city, setCity] = useState('');
  const [dt, setDt] = useState([])
  

  useEffect(() => {

    
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    async function submit(){

   

    const response = await api.get(`/weather?q=${city}&appid=b8342943dabdefa84d2a44b07fde9d13&units=metric`);
    const data = {
      temperatura: response.data.main.temp_max,
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
     <div className="container-">

        <h1>Previsão do tempo</h1>

        <form onSubmit={handleSubmit}>

          <input 
          type="text" 
          placeholder="Insira aqui o nome da cidade"
          value={city}
          onChange={inputChange}
          />
          <button type="submit">Search</button>

        </form>

        <ul>
          {dt.map(dados => (
            <li key={dados.temperatura}>
              <span>{dados.temperatura}</span>
            </li>
          ))}
        </ul>
        

     </div>
    </div>
  );
}

export default App;
