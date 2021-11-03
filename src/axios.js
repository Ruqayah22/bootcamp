import axios from 'axios';

// const api = axios

// api.defaults.baseURL='http://localhost:3000/';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});


api.interceptors.request.use(async(config)=>{
    const token = JSON.parse(localStorage.getItem('user')) ; 


    if(token){
        config.headers["authorization"] =`Bearer ${token}`;
    }
    return config;
}); 


const apiWithoutAuth = axios.create({
    baseURL: 'http://localhost:3000',
});

export{api, apiWithoutAuth};

