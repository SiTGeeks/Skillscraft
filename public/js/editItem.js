// function generateItem(name, contact, email) {
//   var itemName = '<span class="col name-title">'+name+'</span>';
//   var itemContact = '<span class="col contact-title">'+contact+'</span>';
//   var itemEmail = '<span class="col email">'+email+'</span>';
//   var itemDelete = '<span class="col delete"><a href="" class="button-small"><i class="fas fa-trash"></i></a></span>'
//   var item = '<li class="edit-item">'
//   + itemName
//   + itemContact
//   + itemEmail
//   + itemDelete
//   + '</li>';
//   $(".edit-list-wrapper").append(item);
// }

// //Generate list of items
// $( document ).ready(function() {
//   console.log( "ready!" );
//   generateItem('Clement', '97577347', 'ctjsctjs@gmail.com');
//   generateItem('Clement', '97577347', 'ctjsctjs@gmail.com');
//   generateItem('Clement', '97577347', 'ctjsctjs@gmail.com');
// });


function deleteRegistration(workshopId,name,contact,email,removeBtn){
  var registration = {
    'workshopId': workshopId,
    'name': name,
    'contact': contact,
    'email': email
  };

  $.ajax({
    url: "/ajax/",
    data: {
        action: "unregister",
        param: registration
    },
    dataType: "json",
    success: function(data) {
      removeBtn.parentNode.parentNode.remove();
    },
    error: function(xhr, status){
        console.log("AJAX ERROR GETTING COURSES: " + xhr.status);
    }
  });
}
