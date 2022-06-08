import api from './api/api';
import { useState } from 'react';

function App() {

  const [city, setCity] = useState('');

  async function handleSubmit(e){
    e.preventDefault();

    const response = await api.get(`/weather?q=${city}&appid=b8342943dabdefa84d2a44b07fde9d13`);
    console.log(response)
  }

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
          <button>Search</button>

        </form>

     </div>
    </div>
  );
}

export default App;
