import axios from "axios";

const API = axios.create({
    baseURL:"https://api-football-v1.p.rapidapi.com/v3",
    headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': 'a5d1832ea6msh1866d8215135accp1f8370jsn10e3ff796005'
    },
    // params: {league: '39', season: '2021', country: 'ENGLAND'},
});

export default API;