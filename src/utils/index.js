
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
            endTime
        ];
    } else if (date == 3) {
        value = [
            (startTime = moment()
                .subtract(7, "day")
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

//封装导出功能函数
export function export2Excel(columns, list) {
    require.ensure([], () => {
        const { export_json_to_excel } = require('@/assets/js/Export2Excel');
        let tHeader = []
        let filterVal = []
        columns.forEach(item => {
            tHeader.push(item.title)
            filterVal.push(item.key)
        })
        const data = list.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, data, '数据列表');
    })
}