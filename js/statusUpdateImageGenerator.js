
// TODO: 
// make width size a variable
// figure out line spacing
// incorporate bgColorSelection

(function () {

    /* Manipulating drawing with Text Input */

    /* Canvas Variables */

    const generatedCanvas = document.querySelector('#generatedCanvas');
    const ctx2 = generatedCanvas.getContext('2d');

    let bgColorSelection = 'white';
    let submittedText = "";
    const charLimit = 36;
    let currentLineYPos = 250;

    let lines = [];
    let currentLine = 0;

    let setNewLine = false;

    // Font Styles
    ctx2.font = "20px Arial";

    /* Input wiring */

    // Status Text Input


    const textInput = document.querySelector('#inputStatusText');
    // textInput.addEventListener('keyup', addText);


    const textInputSubmit = document.querySelector('#addStatusText');
    textInputSubmit.addEventListener('click', addText);



    function addText() {

        console.log("I'm addiiiiiiiiiiiiing")

        submittedText = textInput.value;
        let numOfLines = 1;



        // Input Display/Word Wrapping

        // calculate numOfLines
        if (submittedText.length > charLimit) { // charLimit currently at 24
            numOfLines = Math.ceil(submittedText.length / charLimit);
            console.log(numOfLines);

        }


        // Word wrapping calculations

        let lineTextCut;
        let startingLineTextTemp;

        for (let i = 0; i < numOfLines; i++) {

            console.log(lineTextCut);

            let lineTextCutTemp = lineTextCut;


            // First line
            if (i === 0) {

                let submittedLineText = submittedText.substring(0, charLimit);
                console.log("Line 1: submittedLineText: " + submittedLineText);

                let lastSpaceIndex = submittedLineText.lastIndexOf(" ");
                let finalLineText;


                if (submittedText.length >= charLimit) {
                    if (lastSpaceIndex !== (charLimit - 1)) {
                        lineTextCut = submittedLineText.substring(lastSpaceIndex + 1, charLimit);
                        console.log('Line 1: lineTextCut: ' + lineTextCut);
                        finalLineText = submittedLineText.substring(0, lastSpaceIndex);
                        console.log('Line 1: finalLineText: ' + finalLineText)
                    } else {
                        finalLineText = submittedText.substring(0, charLimit);
                        console.log('why am I here?')
                    }

                    lines[i] = {
                        text: finalLineText,
                        yPos: currentLineYPos,
                    }

                } else {
                    lines[i] = {
                        text: submittedText.substring(0, (submittedText.length)),
                        yPos: currentLineYPos,
                    }
                }

                console.log('end of first line')

            // All other lines
            
            } else {
            /* Varibles */

                if (lineTextCut.length) {
                    startingLineTextTemp = lineTextCut + submittedText.substring((charLimit * i), (charLimit * (i + 1)));

                } else {
                    startingLineTextTemp = submittedText.substring((charLimit * i), (charLimit * (i + 1)));

                }


                lineTextCut = startingLineTextTemp.substring(charLimit);
                console.log(lineTextCut);

                let submittedLineText = startingLineTextTemp.substring(0, charLimit);
                console.log(lineTextCut)

                let lastSpaceIndex = submittedLineText.lastIndexOf(" ");

                let finalLineText;

                /* Wrap Calc */

                if (lineTextCut.length !== 0) {
                    if (lastSpaceIndex !== (charLimit - 1)) {
                        lineTextCut = submittedLineText.substring(lastSpaceIndex + 1, charLimit) + lineTextCut;

                        finalLineText = submittedLineText.substring(0, lastSpaceIndex);
                        console.log('Line 2: finalLineText: ' + finalLineText)
                    } else {
                        finalLineText = submittedLineText;
                    }
                } else {
                    finalLineText = submittedLineText;
                }

                // previous line yPos shift
                for (let j = 0; j < lines.length; j++) {
                    lines[j].yPos -= 20;
                    currentLineYPos
                }

                // grabbing subtring of next line
                lines[i] = {
                    text: finalLineText,
                    yPos: currentLineYPos,
                }

                console.log('end line ' + (i + 1))

                if (lineTextCut.length !== 0) {
                    numOfLines += 1;
                    // console.log('Line ' + (i + 1) + ' finalLineText length: ' + finalLineText.length);
                    // console.log('Line ' + (i + 1) + ' cut after calc: ' + lineTextCut);
                    // console.log('Line ' + (i + 1) + ' cut length after calc: ' + lineTextCut.length);
                } else {
                    break;
                }
            }
            console.log('loop finished');
        }

        /* Start Render */
        
        ctx2.clearRect(0, 0, 400, 500); // clears canvas for next render
        ctx2.fillStyle = 'red';

        // print all lines
        for (let x = 0; x < lines.length; x++) {
            ctx2.textAlign = "center";
            ctx2.fillText(lines[x].text, 200, lines[x].yPos);
            console.log("In the render loop")
        }

        // clear lines[] in case of subsequent renders
        for (let k = 0; k < lines.length; k++) {
            lines.pop();

        }

        console.log(lines);

    }

})();