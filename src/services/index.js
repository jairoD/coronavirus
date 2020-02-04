import axios from 'axios';

var ncov2019 ={
    specific: async function(){
        const res = await axios.get('https://ncov2019-api.herokuapp.com/api/countries/specific');
        return res;
    },
    overall: async function(){
        const res = await axios.get('https://ncov2019-api.herokuapp.com/api/countries/overall');
        return res;
    }
}
export default ncov2019;