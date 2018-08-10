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
    // let textLineLength = submittedText.length
    const maxLineChars = 24;
    let currentLineYPosition = 80;

    // Font Styles
    ctx2.font = "30px Arial";

    /* Input wiring */

    // Status Text Input


    const textInput = document.querySelector('#inputStatusText');
    textInput.addEventListener('keyup', addText);

    function addText() {
        console.log(submittedText);
        submittedText = textInput.value;
        ctx2.fillStyle = 'red';
        ctx2.clearRect(0, 0, 400, 150); // clears canvas after every keypress
        if (submittedText.length > 24) {
            let line01 = submittedText.substring(0, 24);
            console.log('For Loop is working');
            console.log(line01);
                        /* Step 3 */ currentLineYPosition += 10; // need to differentiate between lines
        }
        ctx2.fillText(submittedText, 200, currentLineYPosition); // repopulates canvas after every clear with current "submittedText"
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