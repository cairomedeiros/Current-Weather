// api URL: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api key: b8342943dabdefa84d2a44b07fde9d13

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
})

export default api;