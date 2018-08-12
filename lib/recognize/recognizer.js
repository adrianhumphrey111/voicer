'use strict';

var Recognizer = function (asrRequest, parser) {

    var log = function () {};

    this.setLogFunction = function (logFunction) {
        log = logFunction;
    };

    this.recognize = function (file) {
        log('file', file);        
        console.log({file})
    };
};

module.exports = Recognizer;