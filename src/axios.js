import axios from 'axios'
const instance=axios.create({
    baseURL:'https://nawsocial.herokuapp.com/'
})
export default instance
