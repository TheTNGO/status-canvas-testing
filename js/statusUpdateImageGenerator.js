(function () {

    /* Manipulating drawing with Text Input */

    /* Canvas Variables */

    const generatedCanvas = document.querySelector('#generatedCanvas');
    const ctx2 = generatedCanvas.getContext('2d');

    let bgColorSelection;
    let submittedText = "";
    const maxLineChars = 24;
    let currentLineYPos = 80;

    let lines = [];
    let currentLine = 0;

    let setNewLine = false;

    lines[currentLine] = {
        text: "",
        yPos: currentLineYPos,
        fullLine: false,
        
    }



    // Font Styles
    ctx2.font = "30px Arial";

    /* Input wiring */

    // Status Text Input


    const textInput = document.querySelector('#inputStatusText');
    textInput.addEventListener('keyup ', addText);

    function addText() {
 

        submittedText = textInput.value;

        if (currentLine === 0){
            lines[currentLine].text = submittedText;
        } else if(currentLine > 0){
            lines[currentLine].text = submittedText.substr(23, (lines[currentLine].text.length + 1))  // line[1]'s text becomes the substring of submittedText (23, number of letters past current length)
            console.log("Current Line Length: " + lines[currentLine].text.length)
        }

        if (lines[currentLine].text.length > 23) {
            setNewLine = true;          

        } 

        if (setNewLine === true){

            lines[currentLine].yPos -= 20; // currentLine (lines[0]) goes up on canvas
            currentLine += 1; // start working on lines[1]
            currentLineYPos += 20;

            lines[currentLine] = { // initiate properties of line[1]
                text: " ",
                yPos: currentLineYPos,
            }


            setNewLine = false; // don't go through this loop again

        }
        
        // start render    
        ctx2.clearRect(0, 0, 400, 150); // clears canvas after every keypress
        // filled with current canvas dimensions
        ctx2.fillStyle = 'red';

        // print all lines
        for (i = 0; i < lines.length; i++) {
            ctx2.fillText(lines[i].text, 200, lines[i].yPos);
            ctx2.textAlign = "center";
            console.log("I loooped")
        }

        ctx2.textAlign = "center";
        // console.log(submittedText);

        console.log(lines);
        console.log(lines[currentLine].text.length);
        console.log("setNewLine " + setNewLine)
        console.log(submittedText);
    }

    function refreshText() {
        ctx2.fillStyle = 'red';
        ctx2.fillText(submittedText, 200, currentLineYPosition);
        ctx2.textAlign = "center";
    }




    // Background Color Input

    const backgroundColorInputForm = document.querySelector('#backgroundColorInputForm');

    backgroundColorInputForm.addEventListener("click", function () {
        let bgColorData = new FormData(backgroundColorInputForm);

        // Test code
        let output = "";
        for (const entry of bgColorData) {
      
            bgColorSelection = entry[1];
        };
        // END Test Code

        console.log(bgColorSelection);
        addBackgroundColor(bgColorSelection);
    })

    // fill entire canvas with background color
    // redraw text after this is done.
    function addBackgroundColor(color) {

        /* TODO: Add other color settings */

        if (color === "black") {
            ctx2.fillStyle = 'black'; // changing color of the next "drawing method"
            ctx2.fillRect(0, 0, 400, 150); // pixel start coordinates/size of drawing INSIDE canvas
            refreshText();

            // ctx2.fillStyle = 'red' /* TODO: Fix these two lines to possibly work with "addText()" */
            // ctx2.fillText(submittedText, 60, 110);

        } else if (color === "white") {
            ctx2.fillStyle = 'white'; // changing color of the next "drawing method"
            ctx2.fillRect(0, 0, 400, 150); // pixel start coordinates/size of drawing INSIDE canvas
            refreshText();
            // ctx2.fillStyle = 'red'
            // ctx2.fillText(submittedText, 60, 110);
        }

    }






})();