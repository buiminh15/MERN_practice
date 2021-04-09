
import axios from 'axios';
const BASE_URL = 'http://localhost:4000/api/v1'

const get =  (api) => {
  return  axios.get(BASE_URL + api)
}

export default { get }

