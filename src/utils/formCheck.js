// 手机号码验证
const validatePhone = (rule, value, callback) => {
    const patter = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$')
    if (!patter.test(value)) {
        return callback(new Error('请输入正确格式的手机号！'))
    } else {
        callback() // 必须有此项回调，否则验证会一直不通过
    }
}
// 邮箱的正则
const validateEmail = (rule, value, callback) => {
    const mailbox = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
    if (!mailbox.test(value)) {
        return callback(new Error('请输入正确格式的邮箱！'))
    } else {
        callback()
    }
}
// 身份证号
const validateIdCardNo = (rule, value, callback) => {
    const mailbox = new RegExp('^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$')
    if (!mailbox.test(value)) {
        return callback(new Error('请输入正确格式的身份证号！'))
    } else {
        callback()
    }
}

// 身高
const height = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入身高"));
    }
    const mailbox = new RegExp(/^\+?[1-9]{1}[0-9]{0,2}\d{0,0}$/)
    if (!mailbox.test(value)) {
        return callback(new Error('请输入1~999内整数'))
    } else {
        callback()
    }
}

// 体重
const weight = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入体重"));
    }
    const mailbox = new RegExp(/^(?:0\.(?:[1-9]{1,1}|0[1-9])|[1-9]\d{0,2}(?:\.[0-9]{1,1}|\.0[1-9])?|999.9)$/)
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0.1~999.9内整数或一位小数'))
    } else {
        callback()
    }
}

// 引体向上
const pullUps = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入单杠引体向上数量"));
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 双杠臂屈伸
const doubleBarFix = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入双杠臂屈伸次数"));
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}



// 仰卧起坐
const sitUps = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入仰卧起坐次数"));
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}



// 俯卧撑
const pushup = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入俯卧撑次数"));
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 俯卧起立
const standUp = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 仰卧举腿
const legLift = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}
// 屈臂悬垂分 3000米跑分
const cantileveredArmMin = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入用时"));
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 屈臂悬垂秒 3000米跑秒
const cantileveredArmSec = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入用时"));
    }
    const mailbox = /^[1-5]?[0-9]$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~59内整数'))
    } else {
        callback()
    }
}

// 30*2 秒,毫秒
const run30Sec = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入用时"));
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}


// 基础体能组合1-分
const jichuMin = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 基础体能组合1-秒
const jichuMiao = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^[1-5]?[0-9]$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~59内整数'))
    } else {
        callback()
    }
}



// 驻地海拔
const checkseaLeave = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入海拔"));
    }
    if (Number(value) <= 4000) {
        const regexp = /^-?[1-9]\d*$|^0$/;
        if (!regexp.test(Number(value))) {

            return callback(new Error("请输入不大于4000的整数"));
        } else {
            callback();
        }
    } else {
        return callback(new Error("请输入不大于4000的整数"));
    }

};

// 双杠支撑前移
const doubleBarMover = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入双杠支撑前移距离"));
    }
    const mailbox = /^(\d|10)(\.\d)?$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0.1~10内整数或一位小数'))
    } else {
        callback()
    }
}



// 8选3
// 屈臂悬垂分 3000米跑分
const new3000Min = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 屈臂悬垂秒 3000米跑秒
const new3000Sec = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^[1-5]?[0-9]$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~59内整数'))
    } else {
        callback()
    }
}


// 记距游
const DistanceSwimming = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

//new 引体向上
const newPullUps = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 俯卧撑
const newPushup = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 仰卧起坐
const newSitUps = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 屈臂悬垂分 3000米跑分
const newCantileveredArmMin = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}

// 屈臂悬垂秒 3000米跑秒
const newCantileveredArmSec = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^[1-5]?[0-9]$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~59内整数'))
    } else {
        callback()
    }
}

// 30*2 秒,毫秒
const newRun30Sec = (rule, value, callback) => {
    if (!value) {
        return callback()
    }
    const mailbox = /^(0|([1-9]\d{0,2}))$/
    if (!mailbox.test(value)) {
        return callback(new Error('请输入0~999内整数'))
    } else {
        callback()
    }
}









export default {
    // demo 仅供参考
    common: {
        // ---------------------公共验证方法
        phone: [{// 手机号
            required: true,
            message: '手机号不能为空'
        }, {
            validator: validatePhone,
            trigger: 'blur'
        }],
        email: [{// 邮箱
            required: true,
            message: '邮箱不能为空'
        },
        {
            validator: validateEmail,
            trigger: 'blur'
        }
        ],
        idCardNo: [{// 身份证号码
            required: true,
            message: '身份证号码不能为空'
        },
        {
            validator: validateIdCardNo,
            trigger: 'blur'
        }
        ]
    },
    // 个人成绩评定-新兵入伍
    Enlist: {
        birthday: [
            { required: true, message: "请输入出生日期", trigger: "blur" },
        ],
        height: [
            {
                validator: height,
                required: true,
                trigger: "blur",
            },
        ],
        weight: [
            {
                validator: weight,
                required: true,
                trigger: "blur",
            },
        ],
        // 引体向上
        pullUps: [
            {
                validator: pullUps,
                required: true,
                trigger: "blur",
            },
        ],
        // 双杠臂屈伸
        doubleBarFix: [
            {
                validator: doubleBarFix,
                required: true,
                trigger: "blur",
            },
        ],
        //双杠支撑前移
        doubleBarMover: [
            {
                validator: doubleBarMover,
                required: true,
                trigger: "blur",
            },
        ],
        //仰卧起坐
        sitUps: [
            {
                validator: sitUps,
                required: true,
                trigger: "blur",
            },
        ],
        //3000米跑分
        run3000Min: [
            {
                validator: cantileveredArmMin,
                required: true,
                trigger: "blur",
            },
        ],
        //3000米跑秒
        run3000Second: [
            {
                validator: cantileveredArmSec,
                required: true,
                trigger: "blur",
            },
        ],
        //基础体能组合1
        makeUp1Min: [
            {
                validator: jichuMin,
                trigger: "blur",
            },
        ],
        //基础体能组合1秒
        makeUp1Second: [
            {
                validator: jichuMin,
                trigger: "blur",
            },
        ],
        //基础体能组合2 -分
        makeUp2Min: [
            {
                validator: jichuMin,
                trigger: "blur",
            },
        ],
        //基础体能组合2秒
        makeUp2Second: [
            {
                validator: jichuMin,
                trigger: "blur",
            },
        ],
        //屈臂悬垂分
        cantileveredArmMin: [
            {
                validator: cantileveredArmMin,
                required: true,
                trigger: "blur",
            },
        ],
        //屈臂悬垂秒
        cantileveredArmSec: [
            {
                validator: cantileveredArmSec,
                required: true,
                trigger: "blur",
            },
        ],
        //3000分
        run3000Min: [
            {
                validator: cantileveredArmMin,
                required: true,
                trigger: "blur",
            },
        ],
        //3000秒
        run3000Second: [
            {
                validator: cantileveredArmSec,
                required: true,
                trigger: "blur",
            },
        ],
        //5000分
        run5000min: [
            {
                validator: cantileveredArmMin,
                required: true,
                trigger: "blur",
            },
        ],
        //5000秒
        run5000sec: [
            {
                validator: cantileveredArmSec,
                required: true,
                trigger: "blur",
            },
        ],
        //平板支撑分
        PlateSupportMin: [
            {
                validator: cantileveredArmMin,
                required: true,
                trigger: "blur",
            },
        ],
        //平板支撑秒
        PlateSupportSec: [
            {
                validator: cantileveredArmSec,
                required: true,
                trigger: "blur",
            },
        ],
        altitude: [//驻地海拔
            {
                validator: checkseaLeave,
                required: true,
                trigger: "blur",
            },
        ],
        snakeSec: [//蛇形跑毫秒，秒
            {
                validator: run30Sec,
                required: true,
                trigger: "blur",
            },
        ],
        snakeHSec: [//蛇形跑毫秒，秒
            {
                validator: run30Sec,
                required: true,
                trigger: "blur",
            },
        ],
        legLift: [//仰卧举腿
            {
                validator: legLift,
                required: true,
                trigger: "blur",
            },
        ],
        standUp: [//俯卧起立
            {
                validator: standUp,
                required: true,
                trigger: "blur",
            },
        ],
        pushup: [//俯卧撑
            {
                validator: pushup,
                required: true,
                trigger: "blur",
            },
        ],
    },
    // 个人成绩评定-新兵入伍
    injuries: {
        birthday: [
            { required: true, message: "请输入出生日期", trigger: "blur" },
        ],
        height: [
            {
                validator: height,
                required: true,
                trigger: "blur",
            },
        ],
        weight: [
            {
                validator: weight,
                required: true,
                trigger: "blur",
            },
        ],
        altitude: [//驻地海拔
            {
                validator: checkseaLeave,
                required: true,
                trigger: "blur",
            },
        ],

        // 任选3
        // 引体向上
        pullUps: [
            {
                validator: newPullUps,
                required: true,
                trigger: "blur",
            },
        ],
        pushup: [//俯卧撑
            {
                validator: newPushup,
                required: true,
                trigger: "blur",
            },
        ],
        //仰卧起坐
        sitUps: [
            {
                validator: newSitUps,
                required: true,
                trigger: "blur",
            },
        ],
        //屈臂悬垂分
        cantileveredArmMin: [
            {
                validator: newCantileveredArmMin,
                required: true,
                trigger: "blur",
            },
        ],
        //屈臂悬垂秒
        cantileveredArmSec: [
            {
                validator: newCantileveredArmSec,
                required: true,
                trigger: "blur",
            },
        ],

        //平板支撑分
        PlateSupportMin: [
            {
                validator: newCantileveredArmMin,
                required: true,
                trigger: "blur",
            },
        ],
        //平板支撑秒
        PlateSupportSec: [
            {
                validator: newCantileveredArmSec,
                required: true,
                trigger: "blur",
            },
        ],

        snakeSec: [//蛇形跑毫秒，秒
            {
                validator: newRun30Sec,
                required: true,
                trigger: "blur",
            },
        ],
        snakeHSec: [//蛇形跑毫秒，秒
            {
                validator: newRun30Sec,
                required: true,
                trigger: "blur",
            },
        ],
        legLift: [//仰卧举腿
            {
                validator: legLift,
                required: true,
                trigger: "blur",
            },
        ],
        standUp: [//俯卧起立
            {
                validator: standUp,
                required: true,
                trigger: "blur",
            },
        ],

        // 任选1
        //3000分
        run3000Min: [
            {
                validator: new3000Min,
                required: true,
                trigger: "blur",
            },
        ],
        //3000秒
        run3000Second: [
            {
                validator: new3000Sec,
                required: true,
                trigger: "blur",
            },
        ],
        //5000分
        run5000min: [
            {
                validator: new3000Min,
                required: true,
                trigger: "blur",
            },
        ],
        //5000秒
        run5000sec: [
            {
                validator: new3000Sec,
                required: true,
                trigger: "blur",
            },
        ],
        DistanceSwimming: [//记距游
            {
                validator: DistanceSwimming,
                required: false,
                trigger: "blur",
            },
        ],
    },

}
