function submitWorkshopDetails(){
	var workshopDetails = {};
	var workshopDetailsForm  = $('#createWorkshopForm');
	workshopDetailsForm.serializeArray().map(function(v) {workshopDetails[v.name] =  v.value;});

	var validForm = true;
	//some checks with workshop details
	if(validForm){
		console.log(workshopDetails);
		workshopDetailsForm.submit();
	}
}

//Init date and time picker

$( function() {
  $("#datepicker").datepicker();
  $('#timepicker').wickedpicker();
});
console.log($('.timepicker').wickedpicker('time'));
