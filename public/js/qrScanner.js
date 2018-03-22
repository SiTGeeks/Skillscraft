var scanner;

//Initialise Scanner
function initScanner(){
  scanner = new Instascan.Scanner({ video: document.getElementById('qrVideo') });
  scanner.addListener('scan', function (content) {
    /*
    Do some call to post with the content as ID
    */
    onQRScan(content);
    stopScanner();
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
}

function stopScanner(){
  scanner.stop();
}

function onQRScan(content){
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

/*
//Outputcheck in message and time, refresh page after timer countdown
//Params:
(bool) Result: true == success, false == fail
(bool) Mode: true == CheckIn mode, false == CheckOut mode
(string) time: Output time as html text
*/
function scanResult(result, mode, time){

  //If ajax returns fail
  if(result == false){
    $(".popup-text").html("Scan Unsuccessful")
    $(".popup-smalltext").html("Please try scanning again");

  } else {  //If ajax returns success

    if(mode == true){
      //Replace html content to show time
      $("#qrVideo").hide();
      $(".popup-text").html("Check in Success!")
      $(".popup-smalltext").html("You have successfully checked in at " + time);
    } else {
      //Replace html content to show time
      $("#qrVideo").hide();
      $(".popup-text").html("Check out Success!")
      $(".popup-smalltext").html("You have successfully checked out at " + time)
    }
    //Timeout after 5 seconds torefresh page
    setTimeout(function(){ window.location = "/"; }, 5000);
  }
}
