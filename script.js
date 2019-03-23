/*****Having to click twice randomly on notes***** //BECAUSE PREVIOUSNOTE NOT BEING CHANGED
D major : B is problem note
*/

///**************JS 367 IS PROBLEM: MAKE RANDOMNOTEINKEY -1 ON 367************/

///**************app displays F instead of E# and C instead of B#************/

//Flow -> GenerateMajorKey()-> 

var  randomNoteInKey;

var timeLeft;
var noteIsSharp;

var notesInKey;
var previousNote;

var isTonicFlat = false;
var isTonicSharp = false;


// function goToIndexPage(){

//     var scale = document.getElementById("keydropdown");
//     var scaleName = scale.options[scale.selectedIndex].value;
    
//     console.log(scaleName);

//     location.href='index.html';
// }

function init(){

//Letter name
var note = document.getElementById("keydropdown");
var letterNameOfScale = note.options[note.selectedIndex].value;

var scaleDegree = generateScaleDegree(letterNameOfScale);

//Scale Name  
var scale = document.getElementById("scaledropdown");
var scaleName = scale.options[scale.selectedIndex].value;

//range
var octaves = document.getElementById("rangedropdown");
var numOfOctaves = octaves.options[octaves.selectedIndex].value;

   hideAllNotesAndSharps();
   previousNote = null;
   var clickedNote = 0;
   noteIsSharp = false;


   var keyIsFlat = determineIfFlatOrSharpKey(letterNameOfScale, scaleName);
    notesInKey = keyGeneratorController(scaleDegree, scaleName, numOfOctaves);
    console.log("notesInKey: " + notesInKey);
    generateNoteAndDisplayNoteAndSharp(noteIsSharp, previousNote, notesInKey, keyIsFlat);

    return notesInKey, previousNote;
    
}

function generateScaleDegree(scaleName){

var degree;

 switch(scaleName){
     //3 octaves
     case 'E':

     degree = 1;
     break;
     case 'F':
     degree = 2;
     break;
     case 'F#':
     degree = 3;
     break;
     case 'G':
     degree = 4;
     break;
     case 'G#':
     degree = 5;
     break;
     case 'A':
     degree = 6;
     break;
     case 'A#':
     case 'Bb':
     degree = 7;
     isTonicFlat = true;
     break;
     case 'B':
     degree = 8;   
     case 'C':
     degree = 9;
     break;
     case 'C#':
     degree = 10;
     break;
     case 'D':
     degree = 11;
     break;
     case 'D#':
     degree = 12;
     break;
     
 }



    return degree;
}

function isTonicFlat(){


}

function determineIfFlatOrSharpKey(letterNameOfScale, scaleName){

    var scaleNameAndQuality = letterNameOfScale + " " + scaleName;
    var isFlat = false;

    switch(scaleNameAndQuality){
        case 'Ab Major':
        isFlat = true;
        break;
        case 'Bb Major':
        isFlat = true;
        break;
        case 'Cb Major':
        isFlat = true;
        break;
        case 'Db Major':
        isFlat = true;
        break;
        case 'Eb Major':
        isFlat = true;
        break;
        case 'F Major':
        isFlat = true;
        break;
        case 'F Major':
        isFlat = true;
        break;
        default:
        break;
    }

    return isFlat;
}

//app displays F instead of E# and C instead of B#
function scaleHasSharpEorB(){

}

function generateNoteAndDisplayNoteAndSharp(noteIsSharp, previousNote, notesInKey, keyIsFlat){

            if(noteIsSharp){
                hidepreviousSharpOrFlat();
                noteIsSharp = false;
            }
           
            //only for pressing BEGIN
            if(previousNote != null){
                previousNote = setPreviousNote(nextNoteIndex, previousNote);
            }
            // get new note
            var  nextNoteIndex = getNextNoteIndex(notesInKey, previousNote);
                 randomNoteInKey = getRandomNoteFromKey(nextNoteIndex, notesInKey);
                 previousNote = setPreviousNote(randomNoteInKey);

                // console.log("randomNoteInKey : " + randomNoteInKey);
            
            
                //****** */
            //displayNextNote(randomNoteInKey);

            //check if new note is sharp and display it
            noteIsSharp = isSharp(randomNoteInKey);

            
            if(noteIsSharp && keyIsFlat){

                //change to accomadate diatonic note change for flat, A# to Bb
                randomNoteInKey += 1;

                //displayFlat
                displayFlatImage();

                //display note
                displayNextNote(randomNoteInKey);

                //decrement randomNoteInKey
                randomNoteInKey -= 1;

                
            }
            else if (noteIsSharp){

                displaySharpImage();
                displayNextNote(randomNoteInKey);
            }

            else{
                displayNextNote(randomNoteInKey);
            }
}
//Takes User Input and generates scale and range
function keyGeneratorController(scaleDegree, scaleName,numOfOctaves){

    if(scaleName === 'Major'){
      var  notesInKey = generateMajorKey(scaleDegree, numOfOctaves);
    }
    else if(scaleName === 'Minor'){
        notesInKey = generateNaturalMinorKey(scaleDegree, numOfOctaves);
    }
    else if(scaleName === 'Harmonic Minor'){
        notesInKey = generateHarmonicMinorKey(scaleDegree, numOfOctaves);
    }
    else if(scaleName === 'Pentatonic Minor'){
        notesInKey = generatePentatonicMinorKey(scaleDegree, numOfOctaves);
    }

    

    return notesInKey;
}


function getNextNoteIndex(notesInKey, previousNote){

    var min=0; 
    var max=notesInKey.length;  
    nextNoteIndex =Math.floor(Math.random() * (+max - +min)) + +min; 
    console.log("Random Number Generated : " + nextNoteIndex );  


    //window.crypto.getRandomValues(notesInKey);

    // nextNoteIndex = Math.floor(Math.random() * (notesInKey.length)); // doesn't get [0]

    console.log("nextNoteIndex: "+ nextNoteIndex);

    //Don't repeat note 
    while(previousNote == nextNoteIndex){
        nextNoteIndex = getNextNoteIndex(notesInKey, previousNote);
    }
    return nextNoteIndex; 
}
function getRandomNoteFromKey(nextNoteIndex, notesInKey){
    
    var nextRandomNote = notesInKey[nextNoteIndex];

    return nextRandomNote;
}

function setPreviousNote(randomNoteInKey){

    var prevNote = randomNoteInKey;

    return prevNote;
}

/******************GUITAR FRET CLICKS*******************/

    function compareClickAndNote(elem){
        var score = 0;

        clickedNote = elem.id.slice(-2);

        //console.log("clickedNote = " + clickedNote);

        if(clickedNote.charAt(0)== '-'){
            clickedNote = clickedNote.charAt(1);
        }
        
        if(randomNoteInKey == clickedNote){
            console.log("Correct");

            
            setPreviousNote(randomNoteInKey);
           
            hidepreviousNote(randomNoteInKey);
            if(noteIsSharp){

                //is key flat?
                // yes
                hidepreviousSharpOrFlat(randomNoteInKey);
                noteIsSharp = false;
            }

            generateNoteAndDisplayNoteAndSharp(noteIsSharp, previousNote, notesInKey);

            score += 1;
            incrementScore(score);
            clickedNote = null;
        }
        else{
          // console.log("incorrect");
           alert("Try again, Broheim!");
        }

    }

    function incrementScore(score){

        document.getElementById('scoreText').textContent = "Score: " + score;
    }

    //determine if it sharp
    function isSharp(randomNoteInKey){

        switch(randomNoteInKey){
            case 3:
            case 5:
            case 7:
            case 10:
            case 12:
            case 15:
            case 17:
            case 19:
            case 22:
            case 24:
            case 27:
            case 29:
            case 31:
            case 34:
            case 36:
            case 39:
            case 41:
            case 43:
                return noteIsSharp = true;
                break;

            default:
             //   console.log("not Sharp");
                return noteIsSharp = false;
                break;
        }
        
    }

    
    function displayNextNote(randomNoteInKey){
       
        document.getElementById('note-box-' + randomNoteInKey).style.display = 'inline';
    }

    function hidepreviousNote(randomNoteInKey){

        document.getElementById('note-box-'+ randomNoteInKey).style.display = 'none';
    }

    //add sharp image
    function displaySharpImage(){
        document.getElementById('sharp-' + randomNoteInKey).style.display = 'inline';
        
    }

    function displayFlatImage(){

        var flat = document.getElementById('flat-'+ randomNoteInKey);
        console.log(flat);
        flat.src = "images/flat.png"
        document.getElementById('sharp-' + randomNoteInKey).style.display = 'inline';

        
    }

    function hidepreviousSharpOrFlatOrFlat(){

         document.getElementById('sharp-'+ randomNoteInKey).style.display = 'none';
     }
    
     function hideAllNotesAndSharps(){
         var visibleNotes = document.getElementsByClassName("notes");

         for(i = 0; i < visibleNotes.length; i++){
             visibleNotes[i].style.display = "none";
         }
    
     }


    /**************************************
    ***************KEY GENERATORS**********
    ***************************************/

     /***********MAJOR KEY********/
     function generateMajorKey(scaleDegree, numOfOctaves){
         //array for entire key
         var notesInKey = []; 
         //set range for 1 octave
         var range = 7;
         //add lowest tonic note
         notesInKey.push(scaleDegree);
        // I = 1 to equate to scale degrees
        for(i=1; i <= range; i++){
            if(i == 1 || i == 2 || i == 4 || i == 5 || i == 6){

                //Whole Step
                scaleDegree +=2;
                notesInKey.push(scaleDegree);
            }

            else if(i == 3){
                //Half Step
                scaleDegree +=1;
                notesInKey.push(scaleDegree);
            }
            else{
                //Half Step
                scaleDegree +=1;
                notesInKey.push(scaleDegree);

                //Last degree of scale, reduce numOfOctaves
                numOfOctaves--;

                //if there's still octaves to go, start loop over
                if(numOfOctaves != 0){
                    i = 0
                    range = 7;
                }
            }
        }

      //  console.log("notesInKey Major Key: " + notesInKey);
        return notesInKey;
     }

     /***********NATURAL MINOR KEY********/
     function generateNaturalMinorKey(scaleDegree, numOfOctaves){
         //array for entire key
         var notesInKey = []; 
         //set range for 1 octave
         var range = 7;
         //add lowest tonic note
         notesInKey.push(scaleDegree);
        // I = 1 to equate to scale degrees
        for(i=1; i <= range; i++){
            if(i == 1 || i == 3 || i == 4 || i == 6){

                //Whole Step
                scaleDegree +=2;
                notesInKey.push(scaleDegree);
            }

            else if(i == 2 || i == 5){
                //Half Step
                scaleDegree +=1;
                notesInKey.push(scaleDegree);
            }
            else{
                //Whole Step
                scaleDegree +=2;
                notesInKey.push(scaleDegree);

                //Last degree of scale, reduce numOfOctaves
                numOfOctaves--;

                //if there's still octaves to go, start loop over
                if(numOfOctaves != 0){
                    i = 0
                    range = 7;
                }
            }
        }
        console.log("notesInKey Natural Minor: " + notesInKey)
        return notesInKey;
     }
      
     /***********HARMONIC MINOR KEY********/
     function generateHarmonicMinorKey(scaleDegree, numOfOctaves){
         //array for entire key
         var notesInKey = []; 
         //add lowest tonic note
         notesInKey.push(scaleDegree);

        //Start range at one octave
        var range = 7;

        // I = 1 to equate to scale degrees
        for(i=1; i <= range; i++){
            if(i == 1 || i == 3 || i == 4){

                //Whole Step
                scaleDegree +=2;
                notesInKey.push(scaleDegree);
            }
            else if(i == 6){
                scaleDegree +=3;
                notesInKey.push(scaleDegree);
            }
            else if(i == 2 || i == 5){

                //Half Step
                scaleDegree +=1;
                notesInKey.push(scaleDegree);
            }
            else{
                //Half Step
                scaleDegree +=1;
                notesInKey.push(scaleDegree);

                //Last degree of scale, reduce numOfOctaves
                numOfOctaves--;

                //if there's still octaves to go, start loop over
                if(numOfOctaves != 0){
                    i = 0
                    range = 7;
                }
            }
        }
        console.log("notesInKey Harmonic Minor: " + notesInKey)
        return notesInKey;
     }
      
     /***********PENTATONIC MINOR KEY********/
     //W + H, W,W, W + H, W
     function generatePentatonicMinorKey(scaleDegree, numOfOctaves){
         //array for entire key
         var notesInKey = []; 
         //set range for 1 octave
         var range = 5;
         //add lowest tonic note
         notesInKey.push(scaleDegree);
        // I = 1 to equate to scale degrees
        for(i = 1; i <= range; i++){
            if(i == 1 || i == 4){

                //Whole Step
                scaleDegree +=3;
                notesInKey.push(scaleDegree);
            }

            else if(i == 2 || i == 3){
                //Half Step
                scaleDegree +=2;
                notesInKey.push(scaleDegree);
            }
            else{
                //Whole Step
                scaleDegree +=2;
                notesInKey.push(scaleDegree);

                //Last degree of scale, reduce numOfOctaves
                numOfOctaves--;

                //if there's still octaves to go, start loop over
                if(numOfOctaves != 0){
                    i = 0
                    range = 5;
                }
            }
        }
        console.log("notesInKey Pentatonic Minor: " + notesInKey);
        return notesInKey;
     }

     function displayNotesInKey(notesInKey){

     //   console.log("notes in Key length: " + notesInKey.length);

        for(i = 0; i < notesInKey.length; i++){


            document.getElementById('note-box-' + notesInKey[i]).style.display = 'inline';
        
        }

     }


    /**************************************
    ***************FUTURE IMPLEMENTATION**********
    ***************************************/
        //Future Implementation
        function hideAllFrets(){

        }
   
        //Future Implementation
        function getKey(){
   
        }
   
        //Future Implementation
        function getPosition(){
   
        }
   
        //Future Implementation
        function getStringName(){
            
        }
   
        //Future Implementation
        function keySignature(){
   
       }

       function hideUnusedLedgerLines(){

       }



     
      


    