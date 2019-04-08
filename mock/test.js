/**
 * 自营mock模块 detault
 * request
 */
module.exports = {
    api: 'GET /api/foo',
    response: {
        ok: {
            "code": 1,
            "message": "成功",
            'data': {
                test: 'foo'
            }
        }
    }
}



