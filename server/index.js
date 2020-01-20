const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Users = require('./schemas/users');
const Db = require('./mongoDB');
const random = require('random-string-generator');

const router = new Router();
const app = new Koa();
const PORT = 3000;

Db.connect().addEventsLogs();
app.use(bodyParser());
app.use(logger());


router.use('/api', async (ctx, next) => {
  const cookie = ctx.cookies.get('sid');
  if (cookie === '123') {
    return next();
  } else {
    ctx.status = 401;
  }
}); 

// router.get('/api/v1/user', async (ctx, next) => {
//   ctx.body = await Users.find({});
// });

router.post('/login', async (ctx, next) => {
  const loginInfo = ctx.request.body;

  if (!loginInfo.login || !loginInfo.password) {
    return ctx.status = 401;
  }

  const hasUser = await Users.findOne(loginInfo);
  
  if (hasUser) {
    const sid = random(32);

    await Users.updateOne(loginInfo, { sid });
    ctx.cookies.set('sid', sid);
    return ctx.status = 200;
  }

  return ctx.status = 401;
});

// router.get('/api/v1/task', (ctx, next) => {
//   ctx.body = 'task success';
// });

app.use(router.routes());
 
app.listen(3000, () => {
    console.log(`koa started on ${PORT} port`)
});