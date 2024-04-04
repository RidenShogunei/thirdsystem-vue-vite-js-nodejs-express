import { post } from "../http/request";

const getwordApi = (params) => post('http://47.96.160.149:5000/getword', params);

export default getwordApi;