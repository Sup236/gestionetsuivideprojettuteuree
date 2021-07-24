module.exports = app => {
    const projects = require("../controllers/project.controller");
    const authJwt = require("../middleware/authJwt");

    app.get("/enseignant", projects.findAll);

    app.post("/enseignant", projects.create);

    app.put("/enseignant:id", projects.update);

    app.get("/enseignant:id", projects.findOne);

    app.delete("/enseignant:id", projects.delete);

    app.post("/enseignant:id", projects.setEtat);

    app.get("/enseignant/archive", projects.findAllArchive);
}