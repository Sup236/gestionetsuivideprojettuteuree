module.exports = app => {
    const projects = require("../controllers/project.controller");

    app.get("/enseignant", projects.findAll);

    app.post("/projects", projects.create);

    app.get("/archive", projects.findAllArchive);

    app.put("/projects/:id", projects.update);

    app.get("/projects/:id", projects.findOne);

    app.delete("/projects/:id", projects.delete);

    app.delete("/projects", projects.deleteAll);
    
}