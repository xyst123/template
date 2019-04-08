/**
 * 自营mock模块 detault
 * request
 */
module.exports = {
    api: 'GET /api/bar',
    response: {
        ok: {
            "code": 0,
            "message": "成功",
            'data': {
                test: 'bar'
            }
        }
    }
}



