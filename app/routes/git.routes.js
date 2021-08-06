module.exports = app => {
    const gitCommand = require("../controllers/git.controller");

    app.post("/enseignant/projects:id/initGit", gitCommand.initialize);

    app.post("/enseignant/projects:id/pushFile", gitCommand.uploadForPush);

    app.get("/enseignant/projects:id/lastCommit", gitCommand.lastCommit);

}