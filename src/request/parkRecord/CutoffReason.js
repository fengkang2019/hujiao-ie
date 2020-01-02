import { commodRequest } from '../commodRequest'
import { kesbURL } from '@/utils/api.js'

/*
功能代码:81001004
功能名称:queryDayParkSerial_EX
功能描述:开闸原因
*/
function getCutoffReason(reqData, custId, session) {
    return kesbURL({
        method: 'post',
        url: "",
        data: JSON.stringify(commodRequest("81001004", reqData, custId, session))
    })
        .then(function (res) {

            return res;
        })
        .catch(function (error) {
            return error
        });
}


export { getCutoffReason }