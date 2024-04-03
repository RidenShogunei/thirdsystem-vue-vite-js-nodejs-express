import { get } from "../http/request";

const getwordApi = (params) => get('/getword', params);

export default getwordApi;