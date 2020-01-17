
import moment from "moment"

//选择 今日 昨日 七天 30日
export function chooseDate(date, value) {
    let endTime = moment().format("YYYYMMDD" + "235959");
    let startTime = "";
    if (date == 1) {
        value = [
            (startTime = moment().format("YYYYMMDD" + "000000")),
            endTime
        ];
    } else if (date == 2) {
        value = [
            (startTime = moment()
                .subtract(1, "day")
                .format("YYYYMMDD" + "000000")),
            (endTime = moment().subtract(1, "days").format("YYYYMMDD" + "235959"))
        ];
    } else if (date == 3) {
        value = [
            (startTime = moment()
                .subtract(6, "day")
                .format("YYYYMMDD" + "000000")),
            endTime
        ];
    } else {
        value = [
            (startTime = moment()
                .subtract(30, "day")
                .format("YYYYMMDD" + "000000")),
            endTime
        ];
    }
    return value
};


//保存 vuex数据页面刷新时不销毁
export function saveUserLogin(that) {
    if (sessionStorage.getItem("store")) {
        that.$store.replaceState(
            Object.assign(
                {},
                that.$store.state,
                JSON.parse(sessionStorage.getItem("store"))
            )
        );
        sessionStorage.removeItem("store");
    }

    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(that.$store.state));
    });
}

//获取cookie 
export function getCookie(key) {
    let cookie = document.cookie;
    if (cookie) {
        let cookieList = cookie.split("; ");
        for (var i = 0; i < cookieList.length; i++) {
            var item = cookieList[i]; //"key=value"
            var itemList = item.split("="); //["key","value"]
            var itemKey = decodeURIComponent(itemList[0]);
            var itemValue = decodeURIComponent(itemList[1]);
            if (itemKey == key) {
                return itemValue;
            }
        }
        return "";
    } else {
        return "";
    }
}
//增(key不存在)删(days为负数)改(key存在)
export function setCookie(key, value, days) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() - 8);
    document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";expires=" + date + ";path=/";

}