
import axios from "@/utils/axios";


let kesbapi = '';

//设置kesb路径in
let kesbURL = '';

let kesbJavaURL = '';

let baseJavaUrl = '';

let baseJavaUrlG = '';

let enterpriseURL = ''


let agentTreeURL = ''

// const BASE_URL = COMMON_CONSTANT.BASE_URL;
const BASE_URL =process.env.baseURl;

const CommonUrl =process.env.serverUrlPark ;


    kesbapi = BASE_URL + '/kesb/api/';
    //设置kesb路劲in
    kesbURL = axios.create({
        baseURL: BASE_URL + '/kesb_req'
    });
    kesbJavaURL = axios.create({
        baseURL: BASE_URL
    });

    enterpriseURL = axios.create({
		baseURL: BASE_URL + "/kesb/api"
	});

    agentTreeURL = axios.create({
		baseURL: BASE_URL + "/kesb/api/ent/tree"
	});

    baseJavaUrl = BASE_URL + '/fly-park';

    baseJavaUrlG = BASE_URL + "/cloud-park";

export {
    kesbapi,
    kesbURL,
    baseJavaUrl,
    kesbJavaURL,
    baseJavaUrlG,
    enterpriseURL,
    agentTreeURL
}