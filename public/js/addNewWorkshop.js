function submitWorkshopDetails(){
	var workshopDetails = {};
	var workshopDetailsForm  = $('#createWorkshopForm');
	workshopDetailsForm.serializeArray().map(function(v) {workshopDetails[v.name] =  v.value;});

	var validForm = true;
	//some checks with workshop details
	if(validForm){
		console.log(workshopDetails);
		document.forms["createWorkshopForm"].submit();
	}
}

//Init date and time picker
var options = {
  twentyFour: true
}

$( function() {
  $("#datepicker").datepicker();
  $('#timepicker').wickedpicker(options);
});
console.log($('.timepicker').wickedpicker('time'));
