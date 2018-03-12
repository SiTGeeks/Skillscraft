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

//Generate list of items
$( document ).ready(function() {
  console.log( "ready!!" );
  var skills1 = ["Wood", "Paper", "Metal"];
  var skills2 = ["Wood", "Paper", "MetalPaper","Wood", "PaperPaperPaper", "Metal"];
  var skills3 = ["Wood", "Paper", "Metal","Wood", "PaperPaper", "Metal","PaperWood", "Paper", "Metal"];
  generateItem('Clement', '97577347', skills1);
  generateItem('Clement', '97577347', skills2);
  generateItem('Clement', '97577347', skills3);
});
