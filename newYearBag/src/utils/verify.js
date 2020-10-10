
/**
 * 验证手机号
 * @param { Number } number 手机号
 * @param { String } nationCode 默认86
 * @return { Boolean } 手机号是否符合规范
 */
export function verifyPhone(number, nationCode = '86') {
    const nationCodeVerifyArr = [{
        // China
        nationCode: '86',
        verifyReg: /^(1[0-9]{2}|288)[0-9]{8}$/
    }, {
        // HK
        nationCode: '852',
        verifyReg: /^[5,6,9][0-9]{7}$/,
    }, {
        // TW
        nationCode: '886',
        verifyReg: /^9[0-9]{8}$/,
    }, {
        // japan
        nationCode: '81',
        verifyReg: /^0[5|6|7|8|9]0[0-9]{8}$/,
    }];
    let reg = /^(1[0-9]{2}|288)[0-9]{8}$/;

    nationCodeVerifyArr.forEach(item => {
        if (item.nationCode === nationCode) {
            reg = item.verifyReg
        }
    })

    try {
        if (reg.test(number)) {
            return true
        } else {
            return false
        }
    } catch {}
}