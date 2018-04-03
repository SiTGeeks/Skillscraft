function generateItem(user) {
  var itemLink = "user/id"
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

//func to generate list
// function generateItems(workshops){
//     for(var i=0; i < users.length; i++){
//         var user = users[i];
//         generateItem(user);
//     }
// }

//Generate list of items
$( document ).ready(function() {
  console.log( "ready!!" );

  user = {
    "name":"John",
    "email":"ctjsctjs@gmail.com",
    "contact":"97577347",
    "skills":[
      "Wood", "Paper", "Metal"
    ]
  };

  generateItem(user);
  generateItem(user);

});
