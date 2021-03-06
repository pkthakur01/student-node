const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const log4js = require('log4js');
const logger = log4js.getLogger('school-APP-Log');
const serverConfig = require("./configs/server_config");



log4js.configure({
    appenders: { school: { type: 'dateFile', filename: 'school-log.log', pattern: '.yyyy-MM-dd', compress: true } },
    categories: { default: { appenders: ['school'], level: 'debug' } }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const cors = require('cors');
app.options('*', cors());
app.use(cors());


const student = require('./routes/student.js');
app.use("/", student);




app.listen(serverConfig.port, function () {
    logger.info("app listening on port: " + serverConfig.port);
    console.log("app listening on port: " + serverConfig.port);
});