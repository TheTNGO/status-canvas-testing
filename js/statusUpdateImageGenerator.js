
// TODO: 
// make width size a variable
// figure out line spacing
// incorporate bgColorSelection
// make sure that words over the character limit don't put addText() into inifinite loop
// might make it so that the word takes up its own line regardless of charLimit
// fix "undefined" errors on start of post-lines[0] word wrap 
(function () {

    /* Manipulating drawing with Text Input */

    /* Canvas Variables */

    const generatedCanvas = document.querySelector('#generatedCanvas');
    const ctx2 = generatedCanvas.getContext('2d');

    let bgColorSelection = 'white';
    let submittedText = "";
    const charLimit = 36;
    let currentLineYPos = 250;
    let baselineXPos = 200;

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
    textInputSubmit.addEventListener('click', function () {
        clearLines();
        addText();
    })


    function clearLines() {
        while (lines.length !== 0) {
            lines.pop();
        }
    }


    function addText() {

        console.log("I'm addiiiiiiiiiiiiing")

        // clear lines[] in case of subsequent renders




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

                let testSub = submittedText.substring((charLimit * i), (charLimit * (i + 1)));


                console.log('adding to line text cut: ' + submittedText.substring((charLimit * i), (charLimit * (i + 1))) + "Length: " + testSub.length);

                if (typeof lineTextCut !== "undefined") {
                    if (testSub.length !== 0 || typeof testSub !== "undefined") {
                        startingLineTextTemp = lineTextCut + submittedText.substring((charLimit * i), (charLimit * (i + 1)));


                    } else {
                        startingLineNextTemp = lineTextCut;

                    }

                } else {
                    startingLineTextTemp = testSub;

                }

                if (startingLineTextTemp.length > charLimit) {
                    lineTextCut = startingLineTextTemp.substring(charLimit);
                } else {
                    lineTextCut = "";

                }
                console.log(lineTextCut);

                let submittedLineText = startingLineTextTemp.substring(0, charLimit);
                console.log(lineTextCut)

                let lastSpaceIndex = submittedLineText.lastIndexOf(" ");

                let finalLineText;

                /* Wrap Calc */

                // if (lineTextCut.length !== 0) {
                if (lastSpaceIndex !== (charLimit - 1)) {
                    lineTextCut = submittedLineText.substring(lastSpaceIndex + 1, charLimit) + lineTextCut;

                    finalLineText = submittedLineText.substring(0, lastSpaceIndex);
                    console.log('Line 2: finalLineText: ' + finalLineText)
                } else {
                    finalLineText = submittedLineText;
                }
                // } else {
                //     finalLineText = submittedLineText;
                // }

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

                let nextLine = submittedText.substring((charLimit * (i + 1)), (charLimit * (i + 2)));

                console.log(nextLine);
                console.log(lines.length);
                if ((typeof lineTextCut !== "undefined") || (lineTextCut.length > 0)) {

                    if (nextLine.length === 0) {


                        if (lines[i].text.length + lineTextCut.length < charLimit) {
                            lines[i].text += ' ' + lineTextCut;
                        } else {
                            for (let j = 0; j < lines.length; j++) {
                                lines[j].yPos -= 20;

                            }
                            lines[i + 1] = {
                                text: lineTextCut,
                                yPos: currentLineYPos,
                            }
                        }
                        // grabbing subtring of next line


                        // lines.pop();

                        break;

                    }
                    else {
                        numOfLines += 1;

                    }

                    // console.log('Line ' + (i + 1) + ' finalLineText length: ' + finalLineText.length);
                    // console.log('Line ' + (i + 1) + ' cut after calc: ' + lineTextCut);
                    // console.log('Line ' + (i + 1) + ' cut length after calc: ' + lineTextCut.length);
                }


            }
            console.log('loop finished');
        }

        /* Start Render */

        ctx2.clearRect(0, 0, 400, 500); // clears canvas for next render

        addBackgroundColor(bgColorSelection);


        // ctx2.fillStyle = 'red'; /* Text fillstyle will be incorporated in bgColorSelection

        // print all lines
        for (let x = 0; x < lines.length; x++) {
            ctx2.textAlign = "center";
            ctx2.fillText(lines[x].text, baselineXPos, lines[x].yPos);
            console.log("In the render loop")
        }



        console.log(lines);

    }

    // Background Color Input

    const backgroundColorInputForm = document.querySelector('#backgroundColorInputForm');

    backgroundColorInputForm.addEventListener("click", function () {
        let bgColorData = new FormData(backgroundColorInputForm);
        console.log(bgColorData);

        // Test code
        let output = "";

        for (z = 0; z > bgColorData.length; z++){
            console.log(bgColorData[z]);
        }
        for (const entry of bgColorData) {
            
            bgColorSelection = entry[1];
        };
        // END Test Code

        console.log(bgColorSelection);
        addBackgroundColor(bgColorSelection);
        addText();
    })

    // fill entire canvas with background color
    // redraw text after this is done.
    function addBackgroundColor(color) {

        /* TODO: Add other color settings */

        if (color === "black") {
            ctx2.fillStyle = 'black'; // changing color of the next "drawing method"
            ctx2.fillRect(0, 0, 400, 500); // pixel start coordinates/size of drawing INSIDE canvas

            ctx2.fillStyle = 'white'; // text color

            

        } else if (color === "white") {
            ctx2.fillStyle = 'white'; // changing color of the next "drawing method"
            ctx2.fillRect(0, 0, 400, 500); // pixel start coordinates/size of drawing INSIDE canvas

            ctx2.fillStyle = 'black'; // text color

        }

    }



})();