
$(document).ready(function()
{
console.log('hello!');
alert('hello')

var config = {
    apiKey: "AIzaSyCTrdMLR3CE3z0OEIVYRTMt5SAfjkTrshE",
    authDomain: "dailytodolists.firebaseapp.com",
    databaseURL: "https://dailytodolists.firebaseio.com",
    projectId: "dailytodolists",
    storageBucket: "dailytodolists.appspot.com",
    messagingSenderId: "695992389588"
    };
firebase.initializeApp(config);

//  database reference //
var databaseRef = firebase.database().ref('todolists');

// Posting data to the front page when child_added fired //
databaseRef.on('child_added', function(storedNote){
    var newelyAdded = storedNote.val();
    var storedNotsId = storedNote.key
    $("#unorderedList").after("<div  id='appendedNoteId' class='apendedToDoList'>"  + newelyAdded.note +  "<input type='button' id='deleteList' value='x'>  </div> ");
    $('#toDoListinputField').val('');

// Remove items //
    function removeItem(){
    $('#deleteList').on('click', function(){
    var removeDataRef = firebase.database().ref('todolists')
    removeDataRef.child(storedNotsId).remove();
    $(this).parent().fadeOut('slow');

    });}
removeItem();

// Deactivate notes //
function deactivateLists(){
        var argumentSwitch = 0;
        $('#appendedNoteId').click(function(){
        if (argumentSwitch == 0)
        {
          $(this).css('text-decoration', 'line-through');
          $(this).css('background-color', '#A9A9A9');
          argumentSwitch = 1;
        }
        else if(argumentSwitch == 1)
        {
            $(this).css('text-decoration', 'none');
            $(this).css('background-color', '');
            argumentSwitch = 0;
        }
        else
            $(this).css('text-decoration', 'line-through');
        })
  };
  deactivateLists();

})

// storing new notes //
$('#addButton').on('click', function(){
    var noteFieldValue = $('#toDoListinputField').val()
    if (noteFieldValue === "" || noteFieldValue === " " ){
      $('#toDoListinputField').css('border', 'solid 2px red');
      $("#engineText").html("Enter Valid value first");
      $("#engineText").css('color', 'red');
    }
    else{
        databaseRef.push({
            note: $('#toDoListinputField').val()
        })
    }
});

//About the game section //
function aboutPageLink(){
  $('#theAboutButton').on('click', function(){
  location.href = "https://ourtodolist.herokuapp.com/about";
})};
  aboutPageLink();
})
