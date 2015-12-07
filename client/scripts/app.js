var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  init: function(){},
  send: function(message){
    $.ajax({
      type: "POST",
      url: "https://api.parse.com/1/classes/chatterbox",
      data: JSON.stringify(message),
      // dataType: "object"
    });
  },
  fetch: function(){
    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: "GET"
    });
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message){
    $('<div/>', {
      text: message.text
    }).appendTo('#chats');
  },
  addRoom : function(room){
    $('<div/>', {
      text: room
    }).appendTo('#roomSelect');
  }
};