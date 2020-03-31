//https://hackernoon.com/neural-networks-from-scratch-for-javascript-linguists-part1-the-perceptron-632a4d1fbad2
var PerceptronModel = require('./PerceptronModel');



// Create a new 'render' controller method
exports.render = function (req, res) {
    // If the session's 'lastVisit' property is set, print it out in the console 
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }

    // Set the session's 'lastVisit' property
    req.session.lastVisit = new Date();

    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('index', {
        title: 'Simple Perceptron Examples'
    });
};

/*
****************************************
* AND gate example with Perceptron class
* **************************************
*/
exports.andGate = function (req, res) {
    // Create the model
    var p = new PerceptronModel();
    
    // Train the model with input with a diagonal boundary, AND gate.
    
    for (var i = 0; i < 11; i++) {
        p.train([1, 1], 1);
        p.train([0, 1], 0);
        p.train([1, 0], 0);
        p.train([0, 0], 0);
    }
    p.predict([0, 0]); // 0
   // p.predict([0, 1]); // 0
    //p.predict([1, 0]); // 0
    //p.predict([1, 1]); // 1

    // The perceptron has learned enough to classify correctly:
    result = p.predict([1, 1]) //0

    // Use the 'response' object to render the 'index' view with a 'classificationResult' property
    res.render('./and_gate.ejs', {
        classificationResult: JSON.stringify(result),
        
    });  
    

};
//

//
// Using perceptron as a linear classifier
//
exports.linearClassifier = function (req, res) {  
    //
    //Friendly or not friendly example using teeth and size features
    //
    //normalized teeth and size features
    //X1 data
    var X1 = [0.27, 0.09, 0.00, 0.23, 0., 1.00, 0.32];
    //X2 data
    var X2 = [0.50, 0.48, 0.12, 0.00, 1.00, 0.73, 0.33];

    //labels data
    var labels = [1, 1, 1, 0, 1, 0, 0];

    var data = [];

    // Create the model
    var p = new PerceptronModel();
    // Train the model
    for (var i = 0; i < 100; i++) {
        for (let i = 0; i < X1.length; i++) {
            p.train([X1[i], X2[i]], labels[i]);

        }
    }
    //
    console.log('weights and bias: ')
    console.log(p.bias)
    console.log(p.weights)
    var weights = p.weights;
    var bias = p.bias;

    //y = (-w1/w2)x + (-bias/w2) = a*x + b
    //line coefficients
    var a = -weights[0] / weights[1];
    var b = -bias / weights[1];

    console.log('a and b: ')

    console.log(a)
    console.log(b)
    //calculating tw0 points to draw the line
    //x2 = a*x1 +b : x1 = 0 --> x2 = b, x1 = 1 --> x2 = a + b
    // line points:  (0,b) and (1, a+b)

    //It is important to notice that it will converge to any solution
    //that satisfies the training set.
    //Try to retrain to see if it changes.

    // Now we can use it to categorize samples it's never seen.
    // For example: something with 29 teeth and a size of 23 cm, likely to be nice ?
    predictionResult = p.predict([
        "0.76",
        "0.07"
    ]);

    console.log("prediction: ", predictionResult);
    //prepare data values for the chart
    for (let i = 0; i < X1.length; i++) {
        
        data[i] = { x: X1[i], y: X2[i]  };

    }
    console.log('data: ', data[0])

    console.log('data: ', data)

    // Use the 'response' object to render the 'index' view with a 'classificationResult' property
    res.render('./results.ejs', {
        dataPoints: data,
        predictionResult: predictionResult,
        a: a,
        b: b,
    });  

};


/*
*******************************************
* AND gate example with perceptron function
* *****************************************
*/exports.functionClassifier = function (req, res) { 
    // Create a perceptron model:
    var p = perceptron()
    /*
    // Train with a feature vector [0] that has label 1,
    //        and a feature vector [1] that has label 0.
    p.train([0], 1);
    p.train([1], 0);
    p.train([0], 1);

    // The perceptron has learned enough to classify correctly:
    result = p.predict([0]);
    // 1
    //p.predict([1])
    // 0
    console.log(result);
    */

    // Train the model with input with a diagonal boundary, AND gate.

    for (var i = 0; i < 5; i++) {
        p.train([1, 1], 1);
        p.train([0, 1], 0);
        p.train([1, 0], 0);
        p.train([0, 0], 0);
    }
    p.predict([0, 0]); // 0
    p.predict([0, 1]); // 0
    p.predict([1, 0]); // 0
    p.predict([1, 1]); // 1

    // The perceptron has learned enough to classify correctly:
    result = p.predict([1, 0]) //0
    console.log('perceptron function:', result)

    // Use the 'response' object to render the 'index' view with a 'classificationResult' property
    res.render('./function_classifier_results.ejs', {
        classificationResult: JSON.stringify(result)
        
    });    

};

// # [Perceptron Classifier](http://en.wikipedia.org/wiki/Perceptron)
// https://planspace.org/20150610-a_javascript_perceptron/perceptron.js
//https://github.com/simple-statistics/simple-statistics/blob/master/src/perceptron.js
// This is a single-layer perceptron classifier that takes
// arrays of numbers and predicts whether they should be classified
// as either 0 or 1 (negative or positive examples).
function perceptron() {
    //
    var perceptron_model = {},
        // The weights, or coefficients of the model;
        // weights are only populated when training with data.
        weights = [],
        // The bias term, or intercept; it is also a weight but
        // it's stored separately for convenience as it is always
        // multiplied by one.
        bias = 0;

    // ## Predict
    // Use an array of features with the weight array and bias
    // to predict whether an example is labeled 0 or 1.
    perceptron_model.predict = function (features) {
        // Only predict if previously trained
        // on the same size feature array(s).
        if (features.length !== weights.length) return null;
        // Calculate the sum of features times weights,
        // with the bias added (implicitly times one).
        var score = 0;
        for (var i = 0; i < weights.length; i++) {
            score += weights[i] * features[i];
        }
        score += bias;
        // Classify as 1 if the score is over 0, otherwise 0.
        return score > 0 ? 1 : 0;
    };

    // ## Train
    // Train the classifier with a new example, which is
    // a numeric array of features and a 0 or 1 label.
    perceptron_model.train = function (features, label) {
        // Require that only labels of 0 or 1 are considered.
        if (label !== 0 && label !== 1) return null;
        // The length of the feature array determines
        // the length of the weight array.
        // The perceptron will continue learning as long as
        // it keeps seeing feature arrays of the same length.
        // When it sees a new data shape, it initializes.
        if (features.length !== weights.length) {
            weights = features;
            bias = 1;
        }
        // Make a prediction based on current weights.
        var prediction = perceptron_model.predict(features);
        // Update the weights if the prediction is wrong.
        if (prediction !== label) {
            var gradient = label - prediction;
            for (var i = 0; i < weights.length; i++) {
                weights[i] += gradient * features[i];
            }
            bias += gradient;
        }
        return perceptron_model;
    };

    // Conveniently access the weights array.
    perceptron_model.weights = function () {
        return weights;
    };

    // Conveniently access the bias.
    perceptron_model.bias = function () {
        return bias;
    };

    // Return the completed model.
    return perceptron_model;
};
