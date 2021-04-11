
import axios from 'axios';
const BASE_URL = 'http://localhost:4000/api/v1'

const get = (api) => {
  return axios.get(BASE_URL + api)
}
const post = (api, body) => {
  return axios.post(BASE_URL + api, body)
}

export default { get, post }

