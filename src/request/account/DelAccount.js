import { commodRequest } from '../commodRequest';
import {kesbURL} from '@/utils/api';
//设置请求路径
var acctOperDelOperatorAddress;
//开发模式
var devModel = false;
if (devModel) {
    acctOperDelOperatorAddress = 'acctCustLogin.json'
} else {
    acctOperDelOperatorAddress = ''
}

/*
功能代码:82101816
功能名称:AcctOperDelOperator
功能描述:删除平台账号
*/
function acctOperDelOperator(reqData, custId, session) {
    return kesbURL({
            method: 'post',
            url: acctOperDelOperatorAddress,
            data: JSON.stringify(commodRequest("82101816", reqData, custId, session))
        }).then(function(res) {

			return res;
        }).catch(function(error) {
            console.log(error);
        });
}

export {
    acctOperDelOperator
}
