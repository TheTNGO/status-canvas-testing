(function () {

    let testline = "hello";
    console.log(testline.substring(0, 3));

    /* First Drawing Example */

    // select canvas tag in HTML
    const myCanvas = document.querySelector('#myCanvas');

    // initialize "drawing object" within "myCanvas" canvas
    const ctx = myCanvas.getContext('2d');

    console.log({ ctx });

    // drawing attributes/image attributes
    ctx.fillStyle = 'teal'; // changing color of the next "drawing method"
    ctx.fillRect(0, 0, 300, 150); // pixel start coordinates/size of drawing INSIDE canvas

    /* New Text drawing methods */

    // (First text method)
    ctx.fillStyle = 'black'; // change .fillstyle color of the next "drawing method" FIRST
    ctx.font = "50px Arial";
    ctx.fillText("Wuut", 10, 50);

    // Second Text method
    ctx.fillStyle = 'red'
    ctx.fillText("Ayyyy", 10, 110);

    // Image Data manipulation
    const imgData = ctx.getImageData(0, 0, 320, 200);

    console.log({ imgData });

    document.getElementById("image").src = myCanvas.toDataURL();



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

    

    lines[currentLine] = {
        text: "",
        yPos: currentLineYPos,
    }

    
    // Font Styles
    ctx2.font = "30px Arial";

    /* Input wiring */

    // Status Text Input


    const textInput = document.querySelector('#inputStatusText');
    textInput.addEventListener('keyup', addText);

    printLines = function () {
        for (let line in lines) {
            addText();
        }
    }

    function addText() {

       
        console.log(submittedText);
        submittedText = textInput.value;

        console.log(lines[currentLine].text.length);

        if (lines[currentLine].text.length > 24) {
            lines[currentLine].yPos -= 20;
            currentLine += 1;
            
            console.log(currentLine);
            lines[currentLine] = {
                text: "",
                yPos: currentLineYPos,
            }
            lines.push(lines[currentLine]);
            
        }

        
        lines[currentLine].text = submittedText;

        // start render    
        ctx2.clearRect(0, 0, 400, 150); // clears canvas after every keypress
        // filled with current canvas dimensions
        ctx2.fillStyle = 'red';

        // print all lines
        for (i = 0; i < lines.length; i++) {
            ctx2.fillText(lines[i].text, 200, lines[i].yPos);
            ctx2.textAlign = "center";
        }

        ctx2.textAlign = "center";
        // console.log(submittedText);
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
            console.log(entry[0]);
            console.log(entry[1]); // what data type is entry[1]?
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