function register(workshopId){ 
	var registrationData = {
		'name': $("#name").val(),
		'email': $("#email").val(),
		'contact': $("#contact").val(),
		'workshopId': workshopId
	};
    
    $.ajax({
        url: "/ajax/",
        data: {
            action: "signup",
            param: registrationData
        },
        dataType: "json",
        error: function(xhr, status){
            console.log("AJAX ERROR REGISTERING FOR COURSE: " + xhr.status);
        }
    });
}