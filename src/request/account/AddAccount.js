
import {
    commodRequest
} from '../commodRequest'
import {kesbURL} from '@/utils/api.js'
//设置请求路径
var acctOperAddOperatorAddress;
//开发模式
var devModel = false;
if (devModel) {
    acctOperAddOperatorAddress = 'acctCustLogin.json'
} else {
    acctOperAddOperatorAddress = ''
}

/*
功能代码:82101810
功能名称:AcctOperAddOperator
功能描述:平台增加企业操作员
*/
function acctOperAddOperator(reqData, custId, session) {
    return kesbURL({
            method: 'post',
            url: acctOperAddOperatorAddress,
            data: JSON.stringify(commodRequest("82101810", reqData, custId, session))
        })
        .then(function(res) {

			return res;
        })
        .catch(function(error) {
            console.log(error);
        });
}

export {
    acctOperAddOperator
}
