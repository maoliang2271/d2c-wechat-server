const Router = require("koa-router");
const request = require('request') 

const router = new Router();

// 心跳接口
router.get("/health", async (ctx) => {
  ctx.body = {
    code: 0,
    data: 'ok',
    msg: 'ok'
  }
});

// 小程序调用，获取微信 Open ID
router.get("/wx_openid", async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
});

// 获取创建试用小程序用户授权二维码
router.get("/getCreateMiniAuthUrl", async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
});


router.get("/api/fastregisterbetaweapp", async (ctx) => {
  const data = await request({
    method: 'POST',
    url: 'http://api.weixin.qq.com//wxa/component/fastregisterbetaweapp',
    body: JSON.stringify({
      openid: ctx.request.headers["x-wx-openid"],
      name: 'test',
    })
  })
  console.log(JSON.parse(data))
  ctx.body = JSON.parse(data)
});

// return new Promise((resolve, reject) => {
//   request({
//     method: 'POST',
//     // url: 'http://api.weixin.qq.com/wxa/msg_sec_check?access_token=TOKEN',
//     url: 'http://api.weixin.qq.com/wxa/msg_sec_check', // 这里就是少了一个token
//     body: JSON.stringify({
//       openid: '用户的openid', // 可以从请求的header中直接获取 req.headers['x-wx-openid']
//       version: 2,
//       scene: 2,
//       content: '安全检测文本'
//     })
//   },function (error, response) {
//     console.log('接口返回内容', response.body)
//     resolve(JSON.parse(response.body))
//   })
// })

module.exports = router