import {
    commodRequest
} from '../commodRequest'
import { enterpriseURL, kesbURL, agentTreeURL } from '@/utils/api'


//设置请求路径
var queryEnterpriseByAccountIdAddress = ''
var queryEnterpriseByMoreAddress = ''

/*
 功能代码:82202082
 功能名称:queryEnterpriseByAccountId
 功能描述:根据客户号查询其下子运营商/停车场信息（展开运营商树）
 */
function queryEnterpriseByAccountId(reqData, custId, session) {
    return enterpriseURL({
        method: 'post',
        url: queryEnterpriseByAccountIdAddress,
        headers: { 'Content-Type': "application/json" },
        data: JSON.stringify(commodRequest("82202082", reqData, custId, session))
    })
        .then(function (res) {
            let resData = res.data.ANSWERS[0];
            //返回值为0，请求成功,否则log端口号和返回的错误信息
            if (resData.ANS_MSG_HDR.MSG_CODE == '0') {
                // console.log(resData.ANS_COMM_DATA);
                return resData.ANS_COMM_DATA;
            } else {
                console.log('ERROR 82202082 ' + resData.ANS_MSG_HDR.MSG_TEXT);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

/*
 功能名称:queryNewEnterpriseByAccountId 获取运营商树的新接口
 功能描述:根据客户号查询其下子运营商/停车场信息（展开运营商树）
 */
function queryNewEnterpriseByAccountId(reqData, custId, session) {
    return agentTreeURL({
        method: 'post',
        url: "",
        headers: { 'Content-Type': "application/json" },
        data: JSON.stringify(reqData)
    })
        .then(function (res) {
            if (res.status == 200) {
                return res.data
            } else {
                console.log('获取agentTree失败');
            }
        })
        .catch(function (error) {
            console.log(error)
        });
}


/*
 功能代码:82202083
 功能名称:queryEnterpriseByMore
 功能描述:根据客户号查询其下子运营商/停车场信息
 */
function queryEnterpriseByMore(reqData, custId, session) {
    return kesbURL({
        method: 'post',
        url: "",
        data: JSON.stringify(commodRequest("82202083", reqData, custId, session))
    })
        .then(function (res) {
            let resData = res.data.ANSWERS[0];
            //返回值为0，请求成功,否则log端口号和返回的错误信息
            if (resData.ANS_MSG_HDR.MSG_CODE == '0') {
                // console.log(resData.ANS_COMM_DATA);
                return resData.ANS_COMM_DATA;
            } else {
                console.log('ERROR 82202083 ' + resData.ANS_MSG_HDR.MSG_TEXT);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export {
    queryEnterpriseByAccountId,
    queryEnterpriseByMore,
    queryNewEnterpriseByAccountId
}