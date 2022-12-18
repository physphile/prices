import axios from 'axios'

axios.put('http://localhost:3000/smartphones', {}).then(res => {
    console.log(res);
}) 