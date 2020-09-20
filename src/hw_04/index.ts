const userRouter = require('./routers/user.router');
const groupRouter = require('./routers/group.router');
const userGroupRouter = require('./routers/userGroup.router');

const express = require('express');
const app = express();
const router = [userRouter, groupRouter, userGroupRouter];
const PORT = 3000;
app.use(express.json());
app.listen(PORT);
app.use('/', router);
