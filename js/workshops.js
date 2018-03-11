function generateItem(title, desc, vacancy, location, date, time) {
    var itemImg = '<img class="workshop-img" src="">';
    var itemTitle = '<span class="item-title">'+title+'</span>';
    var itemDesc = '<span class="item-desc">'+desc+'</span>';
    var itemVacancy = '<span class="workshop-item-text item-vacancy"><i class="far fa-user workshop-icon"></i>'+vacancy+'</span>';
    var itemLocation = '<span class="workshop-item-text item-location"><i class="fas fa-map-marker workshop-icon"></i>'+location+'</span>';
    var itemDate = '<span class="workshop-item-text item-date"><i class="far fa-calendar workshop-icon"></i>'+date+'</span>';
    var itemTime = '<span class="workshop-item-text item-time"><i class="far fa-clock workshop-icon"></i>'+time+'</span>';
    var item = '<li class="workshop-item">'
    + '<div class="workshop-img-wrapper">'
    + itemImg
    + itemTitle
    + '</div>'
    +'<div class="workshop-item-wrapper">'
    + itemDesc
    + itemVacancy
    + itemLocation
    + itemDate
    + itemTime
    + '</div>'
    + '<a href="./item.html"><div class="workshop-btn button btn-red">View</div></a>'
    + '</li>';

    $(".workshop-list-wrapper").append(item);
}

//Generate list of items 
$( document ).ready(function() {
    console.log( "ready!" );
    var desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisl diam, posuere ut leo id, tincidunt consectetur justo. Aliquam eu dui et ligula imperdiet hendrerit. Nunc nisi ante, molestie eget ex nec, bibendum maximus ante. Phasellus vitae dui felis. Phasellus placerat ante id felis cursus, vitae facilisis velit tristique. Pellentesque eget mauris dictum, vehicula augue pretium, dapibus mauris. Donec condimentum non nisi in laoreet. Fusce efficitur, augue ut eleifend aliquet, mauris nisl lobortis eros, eu molestie sem nibh ac neque.";

    generateItem("Wood", desc, "25/50", "SR1B", "25 Aug", "25:00");
    generateItem("Wood", desc, "25/50", "SR1B", "25 Aug", "25:00");
    generateItem("Wood", desc, "25/50", "SR1B", "25 Aug", "25:00");
    generateItem("Wood", desc, "25/50", "SR1B", "25 Aug", "25:00");
    generateItem("Wood", desc, "25/50", "SR1B", "25 Aug", "25:00");
    generateItem("Wood", desc, "25/50", "SR1B", "25 Aug", "25:00");
});
