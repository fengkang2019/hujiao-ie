import { commodRequest } from '../commodRequest'
import {kesbURL} from '@/utils/api';
// import { acctCustLoginData } from '../fakeData/acctCustLoginData'

//使用mock替换ajax请求返回值
// Mock.mock('acctCustLogin.json', acctCustLoginData)

//设置请求路径
var acctCustLoginAddress;
//开发模式
var devModel = false;
if (devModel) {
    acctCustLoginAddress = 'acctCustLogin.json'
} else {
    acctCustLoginAddress = ''
}

/*
功能代码:82101003
功能名称:AcctCustLogin
功能描述:客户登录
*/
function acctCustLogin(reqData, custId, session) {
    return kesbURL({
			method: 'post',
	        url: acctCustLoginAddress,
            data: JSON.stringify(commodRequest("82101003", reqData, custId, session))
        })
        .then(function(res){
            let resData = res.data.ANSWERS[0];
            //返回值为0，请求成功,否则log端口号和返回的错误信息
            if (resData.ANS_MSG_HDR.MSG_CODE === '0') {
                return resData.ANS_COMM_DATA;
            }
            else {
				return resData.ANS_MSG_HDR.MSG_TEXT
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

export {
    acctCustLogin
}