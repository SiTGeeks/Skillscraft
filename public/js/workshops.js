function generateItem(title, desc, occupied, vacancy, location, date, time, id) {
    var itemLink = id;
    var itemImage = "https://www.chwoodcrafts.com/main/wp-content/uploads/2017/03/ch-woodcraft-custom-cutting-board-2.jpg"; //Todo: Store image link here, add link param to func
    var itemImg = '<img class="workshop-img" src="'+itemImage+'">';
    var itemTitle = '<span class="item-title">'+title+'</span>';
    var itemDesc = '<span class="item-desc">'+desc+'</span>';
    var itemVacancy = '<span class="workshop-item-text item-vacancy"><i class="far fa-user workshop-icon"></i>'+occupied+'/'+vacancy+'</span>';
    var itemLocation = '<span class="workshop-item-text item-location"><i class="fas fa-map-marker workshop-icon"></i>'+location+'</span>';
    var itemDate = '<span class="workshop-item-text item-date"><i class="far fa-calendar workshop-icon"></i>'+date+'</span>';
    var itemTime = '<span class="workshop-item-text item-time"><i class="far fa-clock workshop-icon"></i>'+time+'</span>';
    var item = '<li class="workshop-item">'
    + '<a href="workshop/ws/'
    + itemLink
    + '">'
    + '<div class="workshop-img-wrapper">'
    + itemTitle
    + itemImg
    + '</div>'
    + '</a>'
    +'<div class="workshop-item-wrapper">'
    + itemDesc
    + itemVacancy
    + itemLocation
    + itemDate
    + itemTime
    + '</div>'
    + '<a href="workshop/ws/'+id+'"><div class="workshop-btn button btn-red">View</div></a>'
    + '</li>';

    $(".workshop-list-wrapper").append(item);
}

function generateItems(workshops){
    for(var i=0; i < workshops.length; i++){
        var workshop = workshops[i];
        generateItem(workshop['title'], workshop['desc'], workshop['occupied'], workshop['vacancy'], workshop['location'], workshop['date'], workshop['time'], workshop['id']);
    }
}

//Generate list of items
$( document ).ready(function() {
    var result
    $.ajax({
        url: "/ajax/",
        data: {
            action: "getAllWorkshops",
            param: ""
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
