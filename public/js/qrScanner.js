$( document ).ready(function() {
  let scanner = new Instascan.Scanner({ video: document.getElementById('qrVideo') });
  scanner.addListener('scan', function (content) {
    /*
    Do some call to post with the content as ID
    */
    onQRScan(content);
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error('No cameras found.');
    }
  }).catch(function (e) {
    console.error(e);
  });
});


function onQRScan(content){
  //DO SOME CHECKS HERE

  $.ajax({
      url: "/ajax/",
      data: {
          action: "checkin",
          param: content
      },
      dataType: "json",
      success: function(data) {

      },
      error: function(xhr, status){
          console.log("AJAX ERROR GETTING COURSES: " + xhr.status);
      }
  });
}

//Outputcheck in message and time, refresh page after timer countdown
function checkinTime(time){
  //Replace html content to show time
  $("#qrVideo").hide();
  $(".popup-text").html("Check in Success!")
  $(".popup-smalltext").html("You have successfully checked in at " + time);

  //Timeout after 5 seconds torefresh page
  setTimeout(function(){ window.location = "/"; }, 5000);
}

//Outputcheck out message and time, refresh page after timer countdown
function checkoutTime(time){
  //Replace html content to show time
  $("#qrVideo").hide();
  $(".popup-text").html("Check out Success!")
  $(".popup-smalltext").html("You have successfully checked out at " + time)

  //Timeout after 5 seconds torefresh page
  setTimeout(function(){ window.location = "/"; }, 5000);
}
