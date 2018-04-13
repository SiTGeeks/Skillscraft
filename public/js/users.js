function generateItem(user) {
  var itemLink = "user/"+user.id;
  var itemName = '<span class="col-3 name">'+user.name+'</span>';
  var itemContact = '<span class="col-3 number">'+user.contact+'</span>';
  var itemEmail = '<span class="col-3 number">'+user.email+'</span>';
  var itemSkills = user.skills
  var item = '<a href='+itemLink+'>'
  +'<li class="dashboard-item item-profile">'
  + itemName
  + itemContact
  + itemEmail

  + '<span class="col qualitifications"><ul>'
  for (val of itemSkills) {//Generate list of skills
    var itemSkills = '<li>'+val+'</li>';
    item += itemSkills;
  }
  + '</span>'
  + '</ul>'
  + '</li>'
  + '</a>';

  $(".dashboard-list-wrapper").append(item);
}

function generateItems(users){
  for(var i=0; i < users.length; i++){
    var user = users[i];
    user["skills"] = user["skills"].split(",");
    generateItem(user);
  }
}

//Onkeyup filter search function for user list
function filterFunc(event) {
  var userInput = event.value.toUpperCase();
  $('.name').each(function() {
    if (this.textContent.toUpperCase().indexOf(userInput) > -1) {
      $(this).parent().css({"display":""});
    } else {
      $(this).parent().css({"display":"none"});
    }
  });
}

//Generate list of items
$( document ).ready(function() {
  $.ajax({
    url: "/ajax/",
    data: {
      action: "getAllUsers"
    },
    dataType: "json",
    success: function(data) {
      generateItems(data);
    },
    error: function(xhr, status){
      console.log("AJAX ERROR GETTING COURSES: " + xhr.status);
    }
  });
});
