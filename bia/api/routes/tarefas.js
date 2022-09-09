module.exports = (app) => {
  const controller = require("../controllers/tarefas")();
  const controller_async = require("../controllers/tarefas_async")();

  app
    .route("/api/tarefas")
    .get(controller.findAll)
    .post(controller_async.create);
  app.route("/api/tarefas/:uuid").get(controller.find);
  app
    .route("/api/tarefas/update_priority/:uuid")
    .put(controller.update_priority);
  app.route("/api/tarefas/:uuid").delete(controller.delete);
};
