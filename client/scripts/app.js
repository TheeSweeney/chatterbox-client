function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

var lastCreatedAt = new Date();
var rooms = [];

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  init: function(){
    app.fetch();
    //commented fetch out to test idea of only loading 
    //msgs on demand a la whatsapp
  },
  send: function(message){
    $.ajax({
      type: "POST",
      url: "https://api.parse.com/1/classes/chatterbox",
      data: JSON.stringify(message)
    });
    console.log(new Date());
  },
  fetch: function(){
    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: "GET",
      success: function(data){
        for(var i = 0; i < data.results.length; i++){
          var cur = data.results[i];
          // var curDate = new Date(cur.createdAt);
          // console.log(curDate, lastCreatedAt)
          // if(curDate.getTime()  >= lastCreatedAt.getTime()){
          //   break;
          // }else{
            
            if(rooms.indexOf(cur.roomname) === -1){

              rooms.push(cur.roomname);
            }
            app.addMessage({username: cur.username, text: cur.text, roomname: cur.roomname}, cur.objectId);  
          // }
        }

        for(var i = 0; i < rooms.length; i++){
          if(rooms[i] !== undefined){
            var opt = $('<option/>', {text: rooms[i]});
            console.log(opt);
            opt.appendTo('#roomSelect');
          }
        }
      
        // lastCreatedAt = new Date(data.results[0].createdAt);
      }



    });
    
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message, usrID){

    var username = $('<a/>', {
      text: message.username || '< no username set >', 
      href:'#', 
      class: 'username ' + message.username, 
      click: function(){
        // console.log($(this))
        // var input = $(this);
        app.addFriend(message.username);
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
    msg.appendTo('#chats');
  },
  addRoom: function(room){
    $('<div/>', {
      text: room
    }).appendTo('#roomSelect');
  },
  addFriend: function(usrID){
    $('.' + usrID).addClass("friend")
  },
  handleSubmit: function(){
    console.log("calling");
    var usr = window.location.search.slice(10).replace(/%20/g, ' ');
    var rm = "roomname";
    var post = $('#message').val();
    console.log(post);
    app.send(
      {username: usr, text: post, roomname: rm}
    );
    app.clearMessages();
    app.fetch();
  }
};

