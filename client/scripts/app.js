var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  init: function(){},
  send: function(message){
    $.ajax({
      type: "POST",
      url: "https://api.parse.com/1/classes/chatterbox",
      data: JSON.stringify(message)
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
    var username = $('<a/>', {
      text: message.username, 
      href:'#', 
      class: 'username', 
      click: function(){
        app.addFriend();
      } 
    });

    var post = $('<p/>', {
      text: message.text, 
      class:'post'
    });

    var msg = $('<div/>');

    username.appendTo(msg);
    post.appendTo(msg);
    msg.appendTo('#chats');
  },
  addRoom: function(room){
    $('<div/>', {
      text: room
    }).appendTo('#roomSelect');
  },
  addFriend: function(){},
  handleSubmit: function(){
    var usr = "username";
    var rm = "roomname";
    var post = $('#message').val();
    console.log(post);
    app.addMessage({username: usr, text: post, roomname: rm});
  }
};
