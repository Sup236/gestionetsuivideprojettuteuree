function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403);
        return res.send('Il faut vous connecter');
    }

    next();
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role){
            res.status(401);
            return res.send("Tu n'a pas l'autorisation");
        }

        next();
    }
}

module.exports = {
    authUser,
    authRole
}