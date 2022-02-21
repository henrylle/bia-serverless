const serverlessExpress = require("@vendia/serverless-express");
const app = require("./config/express")();
exports.handler = serverlessExpress({ app });
