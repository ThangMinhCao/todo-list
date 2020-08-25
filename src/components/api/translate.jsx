import axios from 'axios';

export default axios.create({
  baseURL: 'https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation',
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'systran-systran-platform-for-language-processing-v1.p.rapidapi.com',
    'x-rapidapi-key': '8583d6b6e6msh2a5fe1d0626d8f0p1433e2jsn8b63e7e1a66d',
  },
});
