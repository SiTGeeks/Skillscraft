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