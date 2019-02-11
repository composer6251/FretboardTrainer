


var previousNote;
var nextNote;
var clickedNote;
var score = 0;
var timeLeft;
var noteIsSharp = false;


function init(){

   hideAllNotesAndSharps();
   previousNote = null;
   nextNote = null;
   clickedNote = null;

    nextNote = getNextNote();

    //first time note is generated
    if(previousNote == null){
        previousNote = nextNote;
    } 

    isSharp(nextNote);
    displayNextNote(nextNote);

}


function getNextNote(){

    nextNote = Math.floor((Math.random() * 34) + 1);

    console.log("nextNote: " + nextNote);

    //Don't repeat note 
    while(previousNote == nextNote){
        nextNote = getNextNote();
    }


    return nextNote;
}

//GUITAR FRET CLICKS

    function compareClickAndNote(elem){

        clickedNote = elem.id.slice(-2);

        console.log("clickedNote = " + clickedNote);

        if(clickedNote.charAt(0)== '-'){
            clickedNote = clickedNote.charAt(1);
        }
        
        if(nextNote == clickedNote){
            console.log("Correct");
            previousNote = nextNote;
            nextNote = getNextNote();
            hidepreviousNote();
            if(noteIsSharp){
                hidepreviousSharp();
                noteIsSharp = false;
            }

            displayNextNote(nextNote);
            isSharp(nextNote);
            score += 1;
            incrementScore();
            clickedNote = null;
        }
        else{
            //alert("Incorrect");
           console.log("incorrect");
        }

    }

    function displayNextNote(rand){
       // console.log("In displayNextNote method");
        document.getElementById('note-box-' + rand).style.display = 'inline';
    }

    function hidepreviousNote(){
       // console.log("In hidepreviousNote method");
        document.getElementById('note-box-'+ previousNote).style.display = 'none';
    }

    function incrementScore(){

        document.getElementById('scoreText').textContent = "Score: " + score;
    }

    //determine if it sharp
    function isSharp(nextNote){

        switch(nextNote){
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
                addSharpImage();
                console.log("Sharp");
                noteIsSharp = true;
                break;

            default:
                console.log("not Sharp");
                break;
        }
        
    }

    

    //add sharp image
    function addSharpImage(){
        document.getElementById('sharp-' + nextNote).style.display = 'inline';
        
    }

    function hidepreviousSharp(){

         document.getElementById('sharp-'+ previousNote).style.display = 'none';
     }
    
     function hideAllNotesAndSharps(){
         var visibleNotes = document.getElementsByClassName("notes");

         for(i = 0; i < visibleNotes.length; i++){
             visibleNotes[i].style.display = "none";
         }
    
     }

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
