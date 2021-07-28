module.exports = app => {
    const gitCommand = require("../controllers/git.controller");

    app.get("/enseignant/projects:id/initGit", gitCommand.initialize);

}