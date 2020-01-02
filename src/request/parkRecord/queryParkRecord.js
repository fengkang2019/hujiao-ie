import { commodRequest } from '../commodRequest'
import {kesbURL} from '@/utils/api.js'

/*
功能代码:85404101
功能名称:queryDayParkSerial_EX
功能描述:当日停车流水-交易流水4.0
*/
function getqueryDayParkSerialEX(reqData, custId, session) {
    return kesbURL({
            method: 'post',
            url: "",
            data: JSON.stringify(commodRequest("85404101", reqData, custId, session))
        })
		.then(function(res){

			return res;
        })
        .catch(function(error) {
            return error
        });
}


export { getqueryDayParkSerialEX }