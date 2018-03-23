function generateItem(name, contact, skills) {
  var itemName = '<span class="col name">'+name+'</span>';
  var itemContact = '<span class="col number">'+contact+'</span>';
  var item = '<li class="dashboard-item">'
  + itemName
  + itemContact
  + '<ul class="col qualitifications">'
  for (val of skills) {//Generate list of skills
    var itemSkills = '<li>'+val+'</li>';
    item += itemSkills;
  }
  + '</ul>'
  + '</li>';

  $(".dashboard-list-wrapper").append(item);
}

function generateItems(checkedInUsers){
  for(var i=0; i<checkedInUsers.length; i++){
    checkedInUser = checkedInUsers[i];
    generateItem(checkedInUser['name'],checkedInUser['contact'],checkedInUser['qualifications'].split(','));
  }
}

//Generate list of items
$( document ).ready(function() {
  $.ajax({
      url: "/ajax/",
      data: {
          action: "getCheckedInUsers",
          param: ""
      },
      dataType: "json",
      success: function(data) {
          generateItems(data);
      },
      error: function(xhr, status){
          console.log("AJAX ERROR GETTING CHECKED IN USERS: " + xhr.status);
      }
  });
});
