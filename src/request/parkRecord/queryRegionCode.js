import { commodRequest } from '../commodRequest'
import { kesbURL } from '@/utils/api.js'

/*
功能代码:85103004
功能名称:queryRegionCode
功能描述:根据parkCode查询区域
*/
function queryRegionCode(reqData, custId, session) {
    return kesbURL({
        method: 'post',
        url: "",
        data: JSON.stringify(commodRequest("85103004", reqData, custId, session))
    })
        .then(function (res) {

            return res;
        })
        .catch(function (error) {
            return error
        });
}


export { queryRegionCode }