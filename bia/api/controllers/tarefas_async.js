var AWS = require("aws-sdk");

var queue_url = "https://sqs.us-east-1.amazonaws.com/310189683227/tarefas_bia";

if (process.env.AWS_SAM_LOCAL === "true")
  AWS.config.loadFromPath("./config_send.json");

var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

module.exports = () => {
  const controller = {};

  controller.create = (req, res) => {
    let tarefa = {
      titulo: req.body.titulo,
      dia_atividade: req.body.dia,
      importante: req.body.importante,
    };

    var params = {
      MessageBody: JSON.stringify(tarefa),
      QueueUrl: queue_url,
    };

    sqs.sendMessage(params, function (err, data) {
      if (err) {
        res.status(500).send({
          message: err.message || "Deu ruim.",
        });
      } else {
        res.send(data.MessageId);
      }
    });
  };

  controller.find = (req, res) => {
    let uuid = req.params.uuid;
    Tarefas.findByPk(uuid)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Deu ruim.",
        });
      });
  };
  return controller;
};
