const controller = require("../controller/index");

const route = (app) => {

    app.post('/api/v1/login', controller.loginController);

    app.get('/api/v1/users/profile', controller.authentication, controller.getUserProfileController);

    app.delete('/api/v1/users/:id', controller.authentication, controller.deleteUserController);
}

module.exports = route;