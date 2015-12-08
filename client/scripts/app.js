function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  init: function(){
    // app.fetch();
    //commented fetch out to test idea of only loading 
    //msgs on demand a la whatsapp
  },
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
      type: "GET",
      success: function(data){
        for(var i = 0; i < 20; i++){
          var cur = data.results[i];
          app.addMessage({username: cur.username, text: cur.text, roomname: cur.roomname});
        }
        
      }
    });
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message){

    var username = $('<a/>', {
      text: message.username || '< no username set >', 
      href:'#', 
      class: 'username', 
      click: function(){
        app.addFriend();
      } 
    });

    var roomname = $('<a/>', {
      text: message.roomname || '< no room identified >', 
      href:'#', 
      class: 'roomname', 
      // click: function(){
      //   app.addFriend();
      // } 
    });

    var post = $('<p/>', {
      text: message.text || '< no text entered >', 
      class:'post'
    });

    var msg = $('<li/>');

    username.appendTo(msg);
    roomname.appendTo(msg);
    post.appendTo(msg);
    msg.prependTo('#chats');
  },
  addRoom: function(room){
    $('<div/>', {
      text: room
    }).appendTo('#roomSelect');
  },
  addFriend: function(){},
  handleSubmit: function(){
    console.log("calling");
    var usr = window.location.search.slice(10).replace(/%20/g, ' ');
    var rm = "roomname";
    var post = $('#message').val();
    console.log(post);
    app.send(
      {username: usr, text: post, roomname: rm}
    );
    app.fetch();
  }
};

