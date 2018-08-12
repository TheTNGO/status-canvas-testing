const generatedCanvas = document.querySelector('#generatedCanvas');
    const ctx = generatedCanvas.getContext('2d');

    const textInput = document.querySelector('#inputStatusText');
    

    
    
    
    var max_width  = 250;
    var fontSize   =  12;
    var lines      =  new Array();
    var width = 0, i, j;
    
    var result;
    var color = "red";

    // Font and size is required for ctx.measureText()
    ctx.font   = fontSize + "px Arial";

    let text = textInput.value;

    addText = function(){
            // Start calculation
        while ( text.length ) {
            for( i=text.length; ctx.measureText(text.substr(0,i)).width > max_width; i-- );
        
            result = text.substr(0,i);
        
            if ( i !== text.length )
                for( j=0; result.indexOf(" ",j) !== -1; j=result.indexOf(" ",j)+1 );
            
            lines.push( result.substr(0, j|| result.length) );
            width = Math.max( width, ctx.measureText(lines[ lines.length-1 ]).width );
            text  = text.substr( lines[ lines.length-1 ].length, text.length );
        }
    
 

    // Render
    // ctx.clearRect(0, 0, 400, 150);
    ctx.fillStyle = color;
    for ( i=0, j=lines.length; i<j; ++i ) {
    	ctx.fillText( lines[i], 8, 5 + fontSize + (fontSize+5) * i );
    }

    }
    textInput.addEventListener('keyup', addText);


    /* old word wrap */
    // if (currentLine === 0){
        //     lines[currentLine].text = submittedText;
        // } else if(currentLine > 0){
        //     lines[currentLine].text = submittedText.substr(23, (lines[currentLine].text.length + 1))  // line[1]'s text becomes the substring of submittedText (23, number of letters past current length)
        //     console.log("Current Line Length: " + lines[currentLine].text.length)
        // }

        // if (lines[currentLine].text.length > 23) {
        //     setNewLine = true;          

        // } 

        // if (setNewLine === true){

        //     lines[currentLine].yPos -= 20; // currentLine (lines[0]) goes up on canvas
        //     currentLine += 1; // start working on lines[1]
        //     currentLineYPos += 20;

        //     lines[currentLine] = { // initiate properties of line[1]
        //         text: " ",
        //         yPos: currentLineYPos,
        //     }


        //     setNewLine = false; // don't go through this loop again

        // }

    /* old word wrap render */

      // print all lines
        for (i = 0; i < lines.length; i++) {
            ctx2.textAlign = "center";
            ctx2.fillText(lines[i].text, 200, lines[i].yPos);
            
        }

    /* old word wrap logs */

    // console.log(lines);
    //     console.log(submittedText);
    //     console.log(lines[currentLine].text.length);
    //     console.log("setNewLine " + setNewLine)

    
