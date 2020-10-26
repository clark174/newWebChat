var id, name;

$(document).ready(function () {
    $('#sendText').click(sendText);

    var input = document.getElementById("textinput");
    // Respond to enter key
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendText();
      }
    });

    id=makeid(10);
    console.log("ID:",id);

    $('#updateId').click(updateId);

    var userList = [];

});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

//respond to updateId button
function updateId(){
    id = $('#idText').val();
    $('#idText').val(""); //could be improved
    $('#currentId').text(id+"(You)");
}

// Function to force scrollable window at bottom
function updateScroll(){
    var element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
}

 // Respond to send button
function sendText() {
  console.log("sendText");
  // Get the text from the text box
  inText = $('#textinput').val();
  // Clear the input text
  $('#textinput').val("");

  //document.getElementById('chatBox').innerHTML += "<font color='red'>You: </font>" + inText+"<br />";
  // force to bottom
  updateScroll();

  message=inText.replace("","+");

//proposed feature: show other users' chat names before their messages
  //name = "_" + id + ":";
  //message = name.concat(message);
  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/team2_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

//function to check if other messages have come through.
function checkText(){
  message = ""; //empty message

  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/team2_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

function processResults(data) {
  // add to the bottom of the chat box
   console.log("got:"+data);

//proposed: clear own id from "received" messages?
  //data.split('_').forEach(function(str) {str.remove(id+":")});

//add new users to the user list
  data.split('\n').forEach(function(item)
    {
    var user = item.substr(0,item.indexOf("_")); //attempt to find usernames in data
    if(user!=undefined && !userList.contains(user)){ //if the user is new, add it to the list
      $('#currentId').append("<p>"+user+"</p>");
      userList.push(user);
      }
    }
  );

   $('#chatBox').append(data);

   setTimeout(checkText, 1000); //auto-update every 1 second
}
