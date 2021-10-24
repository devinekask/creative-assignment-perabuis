{
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    var colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    //set interval to check every few milliseconds if speech is ready to be started
    setInterval(function () {
        if (speech) {
            if (aanHetPraten) {
                console.log('I am hearing you');
            }
            else {
                aanHetPraten = true;
                recognition.start();
                console.log('Ready to receive a color command.');
            }
        }
    }, 500);

    recognition.onresult = function (event) {
        let color = event.results[0][0].transcript;
        color = color.toLowerCase();
        console.log('i heard' + color);
        let ballNumber = getRandomNumber(9, 10);


        if (color == 'pink' || color == 'coral' || color == 'fuchsia' || color == 'orange' || color == 'orchid' || color == 'salmon') {
            ballNumber = 0;
            console.log('pink!');
        }
        else if (color == 'aqua' || color == 'azure' || color == 'blue' || color == 'cyan' || color == 'indigo' || color == 'maroon' || color == 'navy' || color == 'turquoise') {
            ballNumber = 1;
            console.log('blue!');
        }
        else if (color == 'violet' || color == 'lavender' || color == 'purple') {
            ballNumber = 14;
            console.log('purple!');

        }
        else if (color == 'crimson' || color == 'red' || color == 'sienna' || color == 'tomato') {
            console.log('red!');
            ballNumber = 2;
        }
        else if (color == 'gold' || color == 'goldenrod' || color == 'yellow') {
            console.log('gold!');
            ballNumber = 3;
        }
        else if (color == 'green' || color == 'khaki' || color == 'lime' || color == 'olive') {
            console.log('green!');
            ballNumber = 12;
        }
        else if (color == 'black' || color == 'brown' || color == 'chocolate' || color == 'gray' || color == 'moccasin') {
            console.log('black!');
            ballNumber = 13;
        }
        else if (color == 'white' || color == 'beige' || color == 'ivory' || color == 'silver' || color == 'snow') {
            console.log('white!');
            ballNumber = 15;
        }
        christmasDecorationArr.push({ image: eval(`imgDecoration${ballNumber}`), ballX: 490, ballY: 200, heightBall: 35, widthBall: 35, rollover: false, laatLos: false });
    }

    recognition.onspeechend = function () {
        recognition.stop();
        aanHetPraten = false;
    }

    recognition.onnomatch = function (event) {
        console.log("I didn't recognise that color.");
        aanHetPraten = false;
    }

    recognition.onerror = function (event) {
        aanHetPraten = false;
        speech = false;
        if (event.error == 'no-speech') {
            console.log('Error occured' + event.error);
        }
    }

}