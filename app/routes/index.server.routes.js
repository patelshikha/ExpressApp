// Load the 'index' controller
const index = require('../controllers/index.server.controllers');


// Define the routes module' method
module.exports = function (app) {

    // Mount the 'index' controller's 'render' method
    app.get('/', index.render);
    //
    app.get('/and_gate', index.andGate);
    //
    app.get('/results', index.linearClassifier);
    //
    app.get('/display', function (req, res) {

        res.render('index1');
    });

    //
    app.get('/function_classifier', index.functionClassifier);
    
};