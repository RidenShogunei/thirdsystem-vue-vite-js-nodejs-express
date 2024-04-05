import { post } from "../http/request";

const getwordApi = (params) => post('https://chenjinxu.top:5000/getword', params);

export default getwordApi;