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

    var diagnostic = document.querySelector('.output');
    var bg = document.querySelector('html');
    var hints = document.querySelector('.hints');

    var colorHTML = '';
    colors.forEach(function (v, i, a) {
        //V is de kleur, i de index, a zijn ze allemaal
        console.log(v, i);
        colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
    });
    hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';


    setInterval(function () {
        if (speech) {
            if (aanHetPraten) {
                console.log('ik ben al aan het luisteren');
            }
            else {
                aanHetPraten = true;
                recognition.start();
                console.log('Ready to receive a color command.');
            }
        }
    }, 1000);

    /* document.body.onclick = function () {
         recognition.start();
         console.log('Ready to receive a color command.');
     }*/

    recognition.onresult = function (event) {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        var color = event.results[0][0].transcript;
        diagnostic.textContent = 'Result received: ' + color + '.';
        bg.style.backgroundColor = color;
        //console.log(color);
        //console.log('Confidence: ' + event.results[0][0].confidence);
        christmasDecorationArr.push({ image: `imgKerstbal${3}`, ballX: 60, ballY: 90, heightBall: 50, widthBall: 50, rollover: false, laatLos: false });
        //  console.log(christmasDecorationArr);
    }

    recognition.onspeechend = function () {
        recognition.stop();
        aanHetPraten = false;
    }

    recognition.onnomatch = function (event) {
        diagnostic.textContent = "I didn't recognise that color.";
        aanHetPraten = false;
    }

    recognition.onerror = function (event) {
        diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
        aanHetPraten = false;
        speech = false;
        if (event.error == 'no-speech') {
            //hier een variabele maken met feedback van santa
            console.log('sorry ik hoorde je niet');
        }
    }
}