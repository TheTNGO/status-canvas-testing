
(function () {

    /* Manipulating drawing with Text Input */

    /* Canvas Variables */

    const generatedCanvas = document.querySelector('#generatedCanvas');
    const ctx2 = generatedCanvas.getContext('2d');

    let bgColorSelection = 'white';
    let submittedText = "";
    const charLimit = 24;
    let currentLineYPos = 80;

    let lines = [];
    let currentLine = 0;

    let setNewLine = false;

    // Font Styles
    ctx2.font = "30px Arial";

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

        let spaceIndex = submittedText.lastIndexOf(" ");
        console.log("Last Space Index: " + spaceIndex);

        // Input Display/Word Wrapping

        // calculate numOfLines
        if (submittedText.length > charLimit) { // charLimit currently at 24
            numOfLines = Math.ceil(submittedText.length / charLimit);
            console.log(numOfLines);

        }


        // Word wrapping calculations

        let lineTextCut;

        for (let i = 0; i < numOfLines; i++) {

            // First line
            if (i === 0) {

                let submittedLineText = submittedText.substring(0, charLimit);
                console.log("Line 1: submittedLineText: " + submittedLineText);

                let lastSpaceIndex = submittedLineText.lastIndexOf(" ");
                let finalLineText;


                if (submittedText.length > charLimit) {
                    if (lastSpaceIndex !== (charLimit - 1)) {
                        lineTextCut = submittedLineText.substring(lastSpaceIndex + 1, charLimit);
                        console.log('Line 1: lineTextCut: ' + lineTextCut);
                        finalLineText = submittedLineText.substring(0, lastSpaceIndex);
                        console.log('Line 1: finalLineText: ' + finalLineText)
                    } else {
                        finalLineText = submittedText.substring(0, charLimit);
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

                // All other lines
            } else {

                /* Varibles */

                let startingLineTextTemp = lineTextCut + submittedText.substring((charLimit * i), (charLimit * (i + 1)));

                lineTextCut = startingLineTextTemp.substring(charLimit);
                console.log(lineTextCut)

                submittedLineText = startingLineTextTemp.substring(0, charLimit);
                console.log(lineTextCut)

                let lastSpaceIndex = submittedLineText.lastIndexOf(" ");
                let finalLineText;

                /* Wrap Calc */

                if (submittedLineText.length > charLimit) {
                    if (lastSpaceIndex !== (charLimit * (i + 1))) {

                        lineTextCut += submittedLineText.substring(lastSpaceIndex + 1, charLimit);
                        console.log('Line 2: lineTextCut: ' + lineTextCut);

                        finalLineText = submittedLineText.substring(0, lastSpaceIndex);
                        console.log('Line 2: finalLineText: ' + finalLineText)

                    }  // else {
                    //     submittedLineText = submittedText.substring(0, charLimit);
                    // }


                } else {
                    finalLineText = submittedLineText
                }

                console.log('finalLineText length 2: ' + finalLineText.length);
                console.log('Line ' + (i + 1) + ' cut after calc: ' + lineTextCut);
                console.log('Line ' + (i + 1) + ' cut length after calc: ' + lineTextCut.length);

                // previous line yPos shift
                for (let j = 0; j < i; j++) {
                    lines[j].yPos -= 20;
                }

                // grabbing subtring of next line
                lines[i] = {
                    text: finalLineText,
                    yPos: currentLineYPos + 10,
                }

                if(lineTextCut.length !== ""){
                    numOfLines += 1;
                }


            }

        }

        // start render    
        ctx2.clearRect(0, 0, 400, 150); // clears canvas for next render
        ctx2.fillStyle = 'red';

        // print all lines
        for (i = 0; i < lines.length; i++) {
            ctx2.textAlign = "center";
            ctx2.fillText(lines[i].text, 200, lines[i].yPos);

            console.log("In the render loop")
        }

        // clear lines[] in case of subsequent renders
        for (let k = 0; k < lines.length; k++) {
            lines.pop();
        }

        // console.log(submittedText);
    }

    // function refreshText() {
    //     addBackgroundColor(bgColorSelection);
    //     ctx2.fillStyle = 'red';
    //     ctx2.fillText(submittedText, 200, currentLineYPosition);
    //     ctx2.textAlign = "center";
    // }




    // // Background Color Input

    // const backgroundColorInputForm = document.querySelector('#backgroundColorInputForm');

    // backgroundColorInputForm.addEventListener("click", function () {
    //     let bgColorData = new FormData(backgroundColorInputForm);

    //     // Test code
    //     let output = "";
    //     for (const entry of bgColorData) {

    //         bgColorSelection = entry[1];
    //     };
    //     // END Test Code

    //     console.log(bgColorSelection);
    //     addBackgroundColor(bgColorSelection);
    // })

    // // fill entire canvas with background color
    // // redraw text after this is done.
    // function addBackgroundColor(color) {

    //     /* TODO: Add other color settings */

    //     if (color === "black") {
    //         ctx2.fillStyle = 'black'; // changing color of the next "drawing method"
    //         ctx2.fillRect(0, 0, 400, 150); // pixel start coordinates/size of drawing INSIDE canvas
    //         refreshText();

    //         // ctx2.fillStyle = 'red' /* TODO: Fix these two lines to possibly work with "addText()" */
    //         // ctx2.fillText(submittedText, 60, 110);

    //     } else if (color === "white") {
    //         ctx2.fillStyle = 'white'; // changing color of the next "drawing method"
    //         ctx2.fillRect(0, 0, 400, 150); // pixel start coordinates/size of drawing INSIDE canvas
    //         refreshText();
    //         // ctx2.fillStyle = 'red'
    //         // ctx2.fillText(submittedText, 60, 110);
    //     }

    // }






})();