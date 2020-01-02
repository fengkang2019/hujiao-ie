/**
下拉框拼凑 key value
jsonData 请求到的数据
key 用到的key
*/
function downBoxMethods(jsonData, key) {
	if (jsonData != null && key != null) {
		let sysPositionData = [];
		var name = "name";
		var value = "value";
		for (var i in jsonData) {
			let myMap = {
				name: " ",
				value: "serialNumber"
			};
			var eValue = eval('jsonData[i].' + key);
			myMap.name = eValue;
			myMap.value = eValue;
			sysPositionData.push(myMap);
		}
		if (jsonData && jsonData.constructor != Array) {
			if ("出场异常" == eval('jsonData[i].' + "category")) {//异常类型
				let myAll = { name: "全部", value: "serialNumber" };
				sysPositionData.unshift(myAll);
			} else if ("客户车辆类型" == eval('jsonData[i].' + "category")) {
				// let myAll={name:" ",value:"serialNumber"};
				// sysPositionData.unshift(myAll);
			} else if ("月卡类型" == eval('jsonData[i].' + "category")) {
				// let myAll={name:" ",value:"serialNumber"};
				// sysPositionData.unshift(myAll);
			} else if ("订单状态" == eval('jsonData[i].' + "category")) {
				let myAll = { name: "全部", value: "serialNumber" };
				sysPositionData.unshift(myAll);
			} else if ("变更类型" == eval('jsonData[i].' + "category")) {//变更类型
				let myAll = { name: "全部", value: "serialNumber" };
				sysPositionData.unshift(myAll);
			}
		}

		//统计报表的收费员
		if (jsonData.length > 0) {
			if ('string' == typeof jsonData[i].toll_type) {
				let myAll = { name: "全部", value: "serialNumber" };
				sysPositionData.unshift(myAll);
			}
		}

		return sysPositionData;
	}
}

//转换后台的时间格式
function getTime(data) {
	if (data) {
		if (data != 0) {
			var y = data.substring(0, 4);
			var m = data.substring(4, 6);
			var d = data.substring(6, 8);
			var h = data.substring(8, 10);
			var mm = data.substring(10, 12);
			var s = data.substring(12, 14);
			var timeData;
			if ((mm == null || mm == '') && (s == null || s == '') && (h == null || h == '')) {
				timeData = y + "-" + m + "-" + d;
			} else {
				timeData = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s
			}
			return timeData;
		} else {
			return data;
		}
	} else {
		return '';
	}
}

function getcode() {
	var code = 1;
	code++;
}

function getTimeCost(out, ins) {
	if (out && ins) {
		var timeouthms;
		var timeData;
		var timeDatas;
		if (out != 0) {
			var y = out.substring(0, 4);
			var m = out.substring(4, 6);
			var d = out.substring(6, 8);
			var h = out.substring(8, 10);
			var mm = out.substring(10, 12);
			var s = out.substring(12, 14);
			if ((mm == null || mm == '') && (s == null || s == '') && (h == null || h == '')) {
				timeData = y + "-" + m + "-" + d;
			} else {
				timeData = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s
			}
		}
		if (ins != 0) {
			var y = ins.substring(0, 4);
			var m = ins.substring(4, 6);
			var d = ins.substring(6, 8);
			var h = ins.substring(8, 10);
			var mm = ins.substring(10, 12);
			var s = ins.substring(12, 14);
			if ((mm == null || mm == '') && (s == null || s == '') && (h == null || h == '')) {
				timeDatas = y + "-" + m + "-" + d;
			} else {
				timeDatas = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s
			}
		}
		if (ins == 0 || out == 0) {
			var weichuchang = '-';
			return weichuchang;
		}
		// var d1 = new Date(timeData);
		// var d2 = new Date(timeDatas);
		// var d3 = ((d1 - d2) / 60000 );
		// var a = parseInt(d3);
		// var b = a/60;
		// var c = a%60;
		// var e =(a/60)%60;
		// timeouthms = parseInt(b)　 + "小时" + parseInt(c) + "分" + Math.round(e)+ "秒";


		var date1 = new Date(timeDatas.replace(/-/g, "/"));  //开始时间
		var date2 = new Date(timeData.replace(/-/g, "/"));    //结束时间
		var date3 = date2 - date1;   //时间差的毫秒数

		if (Number(date3) <= 0) {
			return "1秒";
		}
		//------------------------------

		//计算出相差天数
		var days = Math.floor(date3 / (24 * 3600 * 1000))

		//计算出小时数

		var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000))
		//计算相差分钟数
		var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000))
		//计算相差秒数
		var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
		var seconds = Math.round(leave3 / 1000)


		timeouthms = (days > 0 ? days + "天 " : "") + (hours > 0 ? hours + "小时 " : "") + (minutes > 0 ? minutes + "分 " : "") + (seconds > 0 ? seconds + "秒" : "");
		return timeouthms;
	} else {
		return "-"
	}
}


//转换时间格式(无年月日 只有时分秒)
function hmsTime(data) {
	if (data != 0) {
		if (data.length == 5) {
			data = "0" + data;
		}
		var hh = data.substring(0, 2);
		var mm = data.substring(2, 4);
		var ss = data.substring(4, 6);
		return hh + ":" + mm + ":" + ss
	} else {
		return "00:00:00"
	}
}

//处理后台返回的时间
function produceTime(data) {
	if (data != "") {
		if (data.length == 5) {
			return "0" + data;
		} else {
			return data;
		}
	} else {
		return "000000"
	}
}

//时间(带时分秒)
function ymdhmsTime(data) {
	if (data != "") {
		let startDate = data.split(" ");
		let startDate1 = startDate[0].split("-");
		let startDate2 = startDate[1].split(":");
		let startDateInfo = startDate1[0] + startDate1[1] + startDate1[2] + startDate2[0] + startDate2[1] + startDate2[2];
		return startDateInfo;
	} else {
		return data;
	}

}

//时间(不带时分秒)
function yymmddTime(data) {
	if (data != "") {
		let startDate = data.split("-");
		let startDateInfo = startDate[0] + startDate[1] + startDate[2].substring(0, 2);
		return startDateInfo;
	} else {
		return data;
	}

}
/**
 * 停车场信息
 * @param saveEnterprise 保存的企业信息
 * @param passParkCode 传来的park_code
 */
function getParkInfo(saveEnterprise, passParkCode) {
	if (null != saveEnterprise && null != passParkCode) {
		for (var i = 0; i < saveEnterprise.length; i++) {
			if (saveEnterprise[i].park_code == passParkCode) {
				return { "park_name": saveEnterprise[i].full_name, "park_code": passParkCode, "cust_id": saveEnterprise[i].cust_id, "cust_parent_id": saveEnterprise[i].cust_parent_id }
			}
		}
	}
}

/**
 * 
 * @param {Object} park 运营商及运营商的停车场信息
 * @param {Array} saveEnterprise 保存的企业信息
 */
function getParkList(park, saveEnterprise) {
	let parkList = [];

	//1为运营商
	if (park.type == 1) {
		if (park.parkCodeList != "" && park.id != park.parkCodeList) {
			let pkArray = park.parkCodeList.split(",");
			let tempName;
			if (pkArray && pkArray.length > 0) {
				pkArray.forEach(p => {
					tempName = getParkInfo(saveEnterprise, p).park_name;
					parkList.push({
						name: tempName,
						value: p
					})
				})
			}
		}
	} else if (park.type == 4) { //4 为停车场
		parkList.push({ name: park.name, value: park.id });
	}
	return parkList
}

/**
性别字典-gender
saveSex 保存字典的类型
passSex 传来的类型
*/
function genderMethods(saveSex, passSex) {
	var gender = "gender";
	if (null != saveSex[gender] && null != passSex) {
		if (passSex % 1 == 0) {
			if (passSex == 0) {
				return "未知";
			}
			return saveSex[gender][Number(passSex)].item; //根据传来的整型性别返回String
		} else {
			if (saveSex[gender][1].item == passSex) {
				return saveSex[gender][1].cval;
			} else if (saveSex[gender][2].item == passSex) {
				return saveSex[gender][2].cval;
			} else {
				return 0;
			}
		}
	}
}
/**
职位字典-occupation
saveSex 保存字典的类型
passSex 传来的类型
*/
function occupationMethods(saveSex, passSex) {
	var occupation = "occupation";
	if (passSex % 1 == 0) {
		if ("undefined" != typeof saveSex[occupation][Number(passSex)]) {
			return saveSex[occupation][Number(passSex)].item; //根据传来的整型性别返回String
		} else {
			return passSex;
		}
	} else {
		for (var i in saveSex[occupation]) {
			if (saveSex[occupation][i].item == passSex) {
				return saveSex[occupation][i].cval;
			}
		}
	}
}
/**
交易类型组合-tradetype
saveSex 保存字典的类型
passSex 传来的类型
*/
function tradetypeMethods(saveSex, passSex) {
	var tradetype = "tradetype";
	if (passSex % 1 == 0) {
		if ("undefined" != typeof saveSex[tradetype][Number(passSex)]) {
			return saveSex[tradetype][Number(passSex)].item; //根据传来的整型性别返回String
		} else {
			return passSex;
		}
	} else {
		for (var i in saveSex[tradetype]) {
			if (saveSex[tradetype][i].item == passSex) {
				return saveSex[tradetype][i].cval;
			}
		}
	}
}
/**
订单状态-orderstate
saveSex 保存字典的类型
passSex 传来的类型
*/
function orderstateMethods(saveSex, passSex) {
	var orderstate = "orderstate";
	if (passSex % 1 == 0) {
		if (null != saveSex[orderstate][Number(passSex)]) {
			return saveSex[orderstate][Number(passSex)].item; //根据传来的整型性别返回String
		} else {
			return passSex;
		}
	} else {
		if (passSex == "全部") {
			return "";
		} else {
			for (var i in saveSex[orderstate]) {
				if (saveSex[orderstate][i].item == passSex) {
					return saveSex[orderstate][i].cval;
				}
			}
		}
	}
}

/**
  密码状态-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function pwdTypeMethods(saveSex, passSex) {
	var amount_type = "pwd_type";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
支付方式-digestcode
saveSex 保存字典的类型
passSex 传来的类型
*/
function digestCodeMethods(saveSex, passSex) {
	var digestcode = "digestcode";
	if (passSex % 1 == 0) {
		if (saveSex[digestcode][Number(passSex)] != null) {
			return saveSex[digestcode][Number(passSex)].digest_name; //根据传来的整型性别返回String
		} else {
			return passSex;
		}
	} else {
		for (var i in saveSex[digestcode]) {
			if (saveSex[digestcode][i].digest_name == passSex) {
				return saveSex[digestcode][i].digest_code;
			}
		}
	}
}
/**
收费类型-payflag
saveSex 保存字典的类型
passSex 传来的类型
*/
function payflagMethods(saveSex, passSex) {
	var payflag = "payflag";
	if (passSex % 1 == 0) {
		if ("undefined" != typeof saveSex[payflag][Number(passSex)]) {
			return saveSex[payflag][Number(passSex)].item; //根据传来的整型性别返回String
		} else {
			return passSex;
		}
	} else {
		if (passSex != "全部") {
			for (var i in saveSex[payflag]) {
				if (saveSex[payflag][i].item == passSex) {
					return saveSex[payflag][i].cval;
				}
			}
		} else {
			return "";
		}
	}
}
/**
异常类型-outoperate
saveSex 保存字典的类型
passSex 传来的类型
*/
function outoperateMethods(saveSex, passSex) {
	var outoperate = "outoperate";
	if (passSex % 1 == 0) {
		if ("undefined" != typeof saveSex[outoperate][Number(passSex)]) {
			return saveSex[outoperate][Number(passSex)].item; //根据传来的整型性别返回String
		} else {
			return passSex;
		}
	} else {
		if (passSex != "全部") {
			for (var i in saveSex[outoperate]) {
				if (saveSex[outoperate][i].item == passSex) {
					return saveSex[outoperate][i].cval;
				}
			}
		} else {
			return "";
		}
	}
}
/**
打卡类型-checktype
saveSex 保存字典的类型
passSex 传来的类型
*/
function checktypeCardMethods(saveSex, passSex) {
	var checktype = "checktype";
	if (null != saveSex[checktype] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[checktype][Number(passSex)]) {
				return saveSex[checktype][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[checktype]) {
				if (saveSex[checktype][i].item == passSex) {
					return saveSex[checktype][i].cval;
				}
			}
		}
	}
}
/**
车辆类型-car_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function cartypeMethods(saveSex, passSex) {
	var car_type = "car_type";
	if (passSex % 1 == 0) {
		if (null != saveSex[car_type][Number(passSex)]) {
			if (saveSex[car_type][Number(passSex)].item) {
				return saveSex[car_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			return 1;
		}
	} else {
		if ("" == passSex) {
			return 1;
		} else {
			for (var i in saveSex[car_type]) {
				if (saveSex[car_type][i].item == passSex) {
					return saveSex[car_type][i].cval;
				}
			}
		}
	}
}

/**
月卡类型-card_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function cardtypeMethods(saveSex, passSex) {
	var card_type = "card_type";
	if (passSex % 1 == 0) {
		if (null != saveSex[card_type][Number(passSex)]) {
			return saveSex[card_type][Number(passSex)].item; //根据传来的整型性别返回String
		} else {
			return 1;
		}
	} else {
		if ("" == passSex) {
			return 1;
		} else {
			for (var i in saveSex[card_type]) {
				if (saveSex[card_type][i].item == passSex) {
					return saveSex[card_type][i].cval;
				}
			}
		}
	}
}
/**
车辆类型下拉框拼凑 key value
jsonData 请求到的数据
key 用到的key
*/
function downBoxCarTypeMethods(jsonData, key) {

	if (jsonData != null && key != null) {
		let sysPositionData = [];
		var name = "name";
		var value = "value";
		for (var i in jsonData) {
			let myMap = {
				name: "",
				value: "serialNumber"
			};
			var eValue = eval('jsonData[i].' + key);
			myMap.name = eValue;
			sysPositionData.push(myMap);
		}

		return sysPositionData;
	}
}
/**
会员卡 所属停车场-cust_id
saveSex 保存字典的类型
passSex 传来的类型
*/
function custIdMenberMethods(saveSex, passSex) {
	for (var i = 0; i < saveSex.length; i++) {
		if (saveSex[i].full_name == passSex) {
			return saveSex[i].cust_id;
		}
	}
	return passSex;
}
/**
资产类别-assets_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function operationManagerPropertysMethods(saveSex, passSex) {
	var assets_type = "assets_type";
	if (null != saveSex[assets_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[assets_type][Number(passSex)]) {
				return saveSex[assets_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[assets_type]) {
				if (saveSex[assets_type][i].item == passSex) {
					return saveSex[assets_type][i].cval;
				}
			}
		}
	}
}
/**
交易渠道-trade_obj_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function operationTransactionMethods(saveSex, passSex) {
	var trade_obj_type = "trade_obj_type";
	if (null != saveSex[trade_obj_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[trade_obj_type][Number(passSex)]) {
				return saveSex[trade_obj_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[trade_obj_type]) {
				if (saveSex[trade_obj_type][i].item == passSex) {
					return saveSex[trade_obj_type][i].cval;
				}
			}
		}
	}
}
/**
变更类型-amount_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function paySearchContributionsMethods(saveSex, passSex) {
	var amount_type = "amount_type";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
会员管理 缴费详情 车辆类型-amount_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function payTheFeescarTypeMethods(saveSex, passSex) {
	var car_type = "car_type";
	if (null != saveSex[car_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[car_type][Number(passSex)]) {
				return saveSex[car_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[car_type]) {
				if (saveSex[car_type][i].item == passSex) {
					return saveSex[car_type][i].cval;
				}
			}
		}
	}
}
/**
结算方式-settle_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function clearingFormsMethods(saveSex, passSex) {
	var settle_type = "settle_type";
	if (null != saveSex[settle_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[settle_type][Number(passSex)]) {
				return saveSex[settle_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[settle_type]) {
				if (saveSex[settle_type][i].item == passSex) {
					return saveSex[settle_type][i].cval;
				}
			}
		}
	}
}
/**
使用状态 -use_status
saveSex 保存字典的类型
passSex 传来的类型
*/
function userModeStatusMethods(saveSex, passSex) {
	var use_status = "use_status";
	if (null != saveSex[use_status] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[use_status][Number(passSex)]) {
				return saveSex[use_status][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[use_status]) {
				if (saveSex[use_status][i].item == passSex) {
					return saveSex[use_status][i].cval;
				}
			}
		}
	}
}
/**
结算周期 -settle_cycle
saveSex 保存字典的类型
passSex 传来的类型
*/
function settlementIntervalMethods(saveSex, passSex) {
	var settle_cycle = "settle_cycle";
	if (null != saveSex[settle_cycle] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[settle_cycle][Number(passSex)]) {
				return saveSex[settle_cycle][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[settle_cycle]) {
				if (saveSex[settle_cycle][i].item == passSex) {
					return saveSex[settle_cycle][i].cval;
				}
			}
		}
	}
}

//会员管理--缴费查询--月卡来源0时转成平台目前只有平台  以后需要再加字典暂时不加
function monthCardPark(data) {
	var months = '';
	if (data == 0) {
		months = "平台";
	} else {
		months = "平台";
	}
	return months;
}
//资产管理 对方账户  是0 显示空
function oppositeSide(data) {
	var reciprocal = '';
	if (data == 0) {
		reciprocal = ''
	}
	return reciprocal;
}
//性别的下拉框
function setGender(sexData, key) {

	if (sexData != null && key != null) {
		let sysPositionData = [];
		var name = "name";
		var value = "value";
		for (var i in sexData) {
			let myMap = {
				name: "",
				value: "serialNumber"
			};
			var eValue = eval('sexData[i].' + key);
			myMap.name = eValue;
			sysPositionData.push(myMap);
		}
		let myAll = { name: "未知", value: "serialNumber" };
		sysPositionData.unshift(myAll);
		return sysPositionData;
	}
}
/**
预约类型-locktype
saveSex 保存字典的类型
passSex 传来的类型
*/
function locktypeMethods(saveSex, passSex) {
	var amount_type = "locktype";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
预约状态-fixflag
saveSex 保存字典的类型
passSex 传来的类型
*/
function fixflagMethods(saveSex, passSex) {
	var amount_type = "fixflag";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
是否缴费-paystate
saveSex 保存字典的类型
passSex 传来的类型
*/
function paystateMethods(saveSex, passSex) {
	var amount_type = "paystate";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
收费类型-tracetype
saveSex 保存字典的类型
passSex 传来的类型
*/
function tracetypeMethods(saveSex, passSex) {
	var amount_type = "tracetype";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}

/**
流水类型-result
saveSex 保存字典的类型
passSex 传来的类型
*/
function resultMethods(saveSex, passSex) {
	var amount_type = "result";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
 收费员类型-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function tollTypeMethods(saveSex, passSex) {
	var amount_type = "toll_type";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
  状态标识-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function tollstatusMethods(saveSex, passSex) {
	var amount_type = "tollstatus";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
  证件类型-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function idtypeMethods(saveSex, passSex) {
	var amount_type = "idtype";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
  用户类型-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function usertypeMethods(saveSex, passSex) {
	var amount_type = "user_type";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
  会员状态-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function carStateMethods(saveSex, passSex) {
	var amount_type = "car_state";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
  会员级别-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function memberLevelMethods(saveSex, passSex) {
	var amount_type = "member_level";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
  客户级别-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function custLevelMethods(saveSex, passSex) {
	var amount_type = "cust_level";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/**
  客户状态-result
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function custStatusMethods(saveSex, passSex) {
	var amount_type = "cust_status";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].cval;
					}
				}
			} else {
				return "";
			}
		}
	}
}



/**
区域类型-space_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function spaceTypeMethods(saveSex, passSex) {
	var amount_type = "space_type";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type]) {
				if (saveSex[amount_type][Number(passSex)]) {
					return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
				}
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
主区域编号 parent_region_code
type 可传可不传
passSex 传来的类型
*/
function parentRegionCodeMethods(type, passSex) {

	if (type == 'type') {
		if (passSex) {
			if (passSex == 0) {
				return "主区域"
			} else {
				return "子区域"
			}
		}
	} else {
		if (passSex) {
			if (passSex == 0) {
				return ""
			} else {
				return passSex;
			}
		}
	}
}
/**
白天计费方式-d_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function dTypeMethods(saveSex, passSex) {
	var amount_type = "d_type";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}

/**
夜晚计费方式-n_type
saveSex 保存字典的类型
passSex 传来的类型
*/
function nTypeMethods(saveSex, passSex) {
	var amount_type = "n_type";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
工作日历类型-worktype
saveSex 保存字典的类型
passSex 传来的类型
*/
function workTypeMethods(saveSex, passSex) {
	var amount_type = "worktype";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
24小时计算方式-cycle
saveSex 保存字典的类型
passSex 传来的类型
*/
function cycleMethods(saveSex, passSex) {
	var amount_type = "cycle";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			for (var i in saveSex[amount_type]) {
				if (saveSex[amount_type][i].item == passSex) {
					return saveSex[amount_type][i].cval;
				}
			}
		}
	}
}
/**
所属主区域 key value
jsonData 请求到的数据
key 用到的key
不要当前点击选中的内容
*/
function downBoxAreaRegionCode(jsonData, key, item) {
	if (jsonData != null && key != null) {
		let sysPositionData = [];
		var name = "name";
		var value = "value";
		for (var i in jsonData) {
			if (item.region_code != eval('jsonData[i].' + 'region_code') && eval('jsonData[i].' + 'parent_region_code') == '0') {
				let myMap = {
					name: "",
					value: "serialNumber"
				};
				var eValue = eval('jsonData[i].' + key);
				myMap.name = eValue;
				sysPositionData.push(myMap);
			}
		}

		return sysPositionData;
	}
}

/**
 区域选择 数据组装
 */
function downBoxAreaRegion(jsonData, name, value, item) {
	if (jsonData != null && name != null) {
		let sysPositionData = [];
		sysPositionData.push({ name: '全部', value: '0' })

		for (var i in jsonData) {
			if (item.region_code != eval('jsonData[i].' + 'region_code') && eval('jsonData[i].' + 'parent_region_code') == '0') {
				let myMap = {
					name: "",
					value: "serialNumber"
				};
				myMap.name = eval('jsonData[i].' + name);
				myMap.value = eval('jsonData[i].' + value);
				sysPositionData.push(myMap);
			}
		}

		return sysPositionData;
	}
}


/**
下拉框拼凑 key value
jsonData 请求到的数据
key1 拼凑用到的name的值,默认为item
key2 拼凑用到的value的值,默认为cval
*/
function downBoxFunction(jsonData, key1 = 'item', key2 = 'cval') {
	let sysPositionData = [];
	for (let i in jsonData) {
		let myMap = {
			name: " ",
			value: ""
		};
		if (eval('jsonData[i].' + key1) != undefined && eval('jsonData[i].' + key2) != undefined) {
			let eName = eval('jsonData[i].' + key1);
			let eValue = eval('jsonData[i].' + key2);
			myMap.name = eName;
			myMap.value = eValue;
			sysPositionData.push(myMap);
		}
	}
	return sysPositionData;
}

/**
  生产厂商-led_company
 saveSex 保存字典的类型
 passSex 传来的类型
 */
function ledCompanyMethods(saveSex, passSex) {
	var amount_type = "led_company";
	if (null != saveSex[amount_type] && null != passSex) {
		if (passSex % 1 == 0) {
			if ("undefined" != typeof saveSex[amount_type][Number(passSex)]) {
				return saveSex[amount_type][Number(passSex)].item; //根据传来的整型性别返回String
			} else {
				return passSex;
			}
		} else {
			if (passSex != "全部") {
				for (var i in saveSex[amount_type]) {
					if (saveSex[amount_type][i].item == passSex) {
						return saveSex[amount_type][i].ival;
					}
				}
			} else {
				return "";
			}
		}
	}
}

/*
dictionary 完整的数据字典,Json格式
type 保存字典中的key,string格式
value 传来的值，string或int格式
*/
function dictionaryFunction(dictionary, type, value) {
	if (dictionary[type] != null) {
		let tarObj = dictionary[type];
		if (value % 1 == 0) {
			if ("undefined" != typeof tarObj[Number(value)]) {
				return tarObj[Number(value)].item; //根据传来的整型返回String
			} else {
				return value;
			}
		} else {
			for (let Key in tarObj) {
				if (tarObj[Key].item == value) {
					return tarObj[Key].cval;
				}
			}
			return value;
		}
	} else {
		return value;
	}
}
export {
	genderMethods,
	downBoxMethods,
	occupationMethods,
	tradetypeMethods,
	orderstateMethods,
	getTime,
	hmsTime,
	produceTime,
	ymdhmsTime,
	yymmddTime,
	digestCodeMethods,
	payflagMethods,
	outoperateMethods,
	cartypeMethods,
	cardtypeMethods,
	downBoxCarTypeMethods,
	custIdMenberMethods,
	checktypeCardMethods,
	operationManagerPropertysMethods,
	operationTransactionMethods,
	paySearchContributionsMethods,
	monthCardPark,
	payTheFeescarTypeMethods,
	oppositeSide,
	setGender,
	clearingFormsMethods,
	userModeStatusMethods,
	settlementIntervalMethods,
	locktypeMethods,
	fixflagMethods,
	paystateMethods,
	tracetypeMethods,
	resultMethods,
	getParkInfo,
	getParkList,
	tollTypeMethods,
	tollstatusMethods,
	idtypeMethods,
	spaceTypeMethods,
	parentRegionCodeMethods,
	dTypeMethods,
	nTypeMethods,
	workTypeMethods,
	cycleMethods,
	downBoxAreaRegionCode,
	dictionaryFunction,
	downBoxFunction,
	downBoxAreaRegion,
	usertypeMethods,
	carStateMethods,
	memberLevelMethods,
	custLevelMethods,
	custStatusMethods,
	ledCompanyMethods,
	pwdTypeMethods,
	getTimeCost
};
