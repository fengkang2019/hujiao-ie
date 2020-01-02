
import { commodRequest } from '../commodRequest'
import { kesbURL } from '@/utils/api.js'
//设置请求路径
var acctOperModifyOperatorAddress;
//开发模式
var devModel = false;
if (devModel) {
    acctOperModifyOperatorAddress = 'acctCustLogin.json'
} else {
    acctOperModifyOperatorAddress = ''
}

/*
功能代码:82101815
功能名称:AcctOperModifyOperator
功能描述:修改平台账号
*/
function acctOperModifyOperator(reqData, custId, session) {
    return kesbURL({
        method: 'post',
        url: acctOperModifyOperatorAddress,
        data: JSON.stringify(commodRequest("82101815", reqData, custId, session))
    }).then(function (res) {

        return res;
    }).catch(function (error) {
        console.log(error);
    });
}

/*
 * 
功能代码:82101803 82101803
功能名称:acctSetCustPwd
功能描述:修改客户密码
*/
function acctSetCustPwd(reqData, custId, session) {
    return kesbURL({
        method: 'post',
        url: acctOperModifyOperatorAddress,
        data: JSON.stringify(commodRequest("82101803", reqData, custId, session))
    }).then(function (res) {

        return res;
    }).catch(function (error) {
        console.log(error);
    });
}



export {
    acctOperModifyOperator,
    acctSetCustPwd
}
