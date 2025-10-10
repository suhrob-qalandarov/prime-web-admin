import axios from 'axios'
import urls from '../../src/constants/urls';

axios.defaults.baseURL = urls.apiBaseUrl;
axios.defaults.withCredentials = true;

export default axios