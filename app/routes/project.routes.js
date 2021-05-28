module.exports = app => {
    const projects = require("../controllers/project.controller");
    const users = require("../controllers/user.controller");

    var router = require("express").Router();

    router.post("/", projects.create);

    router.get("/", projects.findAll);

    router.get("/archive", projects.findAllArchive);

    router.put("/:id", projects.update);

    router.get("/:id", projects.findOne);

    router.delete("/:id", projects.delete);

    router.delete("/", projects.deleteAll);

    app.use('/projects', router);
}