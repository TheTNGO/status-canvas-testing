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

    
