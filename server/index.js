const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Users = require('./schemas/users');
const Items = require('./schemas/items');
const Db = require('./mongoDB');
const random = require('random-string-generator');
const serve = require('koa-static');

const router = new Router();
const app = new Koa();
const PORT = 3000;

Db.connect().addEventsLogs();
app.use(bodyParser());
app.use(logger());

router.use('/api', async (ctx, next) => {
  const sid = ctx.cookies.get('sid');
  const userId = ctx.cookies.get('userId');

  const userFromBd = await Users.findOne({ _id: userId });

  if (ctx.request.url === '/api/v1/login') {
    return next();
  }

  if (userFromBd && userFromBd.sid === sid) {
    ctx.request.state = {
      userId,
      sid
    };
    return next();
  } else {
    ctx.status = 401;
  }

  return next();
});

router.get('/api/v1/items', async (ctx, next) => {
  const userId = ctx.cookies.get('userId');
  const items = await Items.findOne({ userId });
  ctx.body = items.items;
});

router.post('/api/v1/items', async (ctx, next) => {
  const items = ctx.request.body.items;
  const userId = ctx.cookies.get('userId');
  const result = await Items.findOneAndUpdate({ userId }, { items });
  ctx.body = true;
});

router.post('/api/v1/login', async (ctx, next) => {
  const loginInfo = ctx.request.body;

  if (!loginInfo.login || !loginInfo.password) {
    return ctx.status = 401;
  }

  const hasUser = await Users.findOne(loginInfo);

  if (hasUser) {
    const sid = random(32);

    await Users.updateOne(loginInfo, { sid });
    ctx.cookies.set('sid', sid);
    ctx.cookies.set('userId', hasUser._id);
    return ctx.status = 200;
  }

  return ctx.status = 401;
});

app.use(router.routes());
app.use(serve('../build'));

app.listen(PORT, () => {
    console.log(`koa started on ${PORT} port`)
});
