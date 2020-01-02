import { commodRequest } from '../commodRequest'
import { kesbURL } from '@/utils/api.js'

/*
功能代码:87202011
功能名称:queryCarId
功能描述:所有车牌信息
*/
function queryCarId(reqData, custId, session) {
    return kesbURL({
        method: 'post',
        url: "",
        data: JSON.stringify(commodRequest("87202011", reqData, custId, session))
    })
        .then(function (res) {

            return res;
        })
        .catch(function (error) {
            return error
        });
}


export { queryCarId }