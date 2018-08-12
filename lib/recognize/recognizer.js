'use strict';
//Always recognize with Google Speech
const fs = require('fs');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

var Recognizer = function (asrRequest, parser) {

    var log = function () { };

    this.setLogFunction = function (logFunction) {
        log = logFunction;
    };

    this.recognize = function (filename) {
        log('file', filename);

        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;
        const languageCode = 'en-US';

        const request = {
            config: {
                encoding: encoding,
                sampleRateHertz: sampleRateHertz,
                languageCode: languageCode,
            },
            interimResults: false, // If you want interim results, set this to true
        };

        // Stream the audio to the Google Cloud Speech API
        const recognizeStream = client
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', data => {
                console.log(
                    `Transcription: ${data.results[0].alternatives[0].transcript}`
                );
            });

        // Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
        fs.createReadStream(filename).pipe(recognizeStream);
    };
};

module.exports = Recognizer;