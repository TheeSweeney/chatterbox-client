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
  }
};