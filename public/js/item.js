function register(workshopId){

	if(validateRegisterForm()){ //If passed validation
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
		    success: function(data) {
		    	//Success message here
		    	resultMsg(data);
		    },
			error: function(xhr, status){
				console.log("AJAX ERROR REGISTERING FOR COURSE: " + xhr.status);
			}
		});
	};
}



function validateRegisterForm() {
	event.preventDefault();

	//Get values from input
	var name = $("#name").val();
	var email = $("#email").val();
	var contact = $("#contact").val();

	//Reset error
	$(".err-name").html("");
	$(".err-email").html("");
	$(".err-contact").html("");

	//Declare variables
	var valid = true;
	var icon = '<i class="error-icon fas fa-exclamation-circle"></i>';

	//Validate name input
	if (name==""){
		$(".err-name").html(icon + "Please enter your name.");
		valid = false;
	} else if (!isAlpha(name)){
		$(".err-name").html(icon + "Please enter only alphabetical characters.");
		valid = false;
	}

	//Validate email input
	if (email==""){
		$(".err-email").html(icon + "Please enter your email.");
		valid = false;
	} else if (!validateEmail(email)){
		$(".err-email").html(icon + "Please enter a valid email.");
		valid = false;
	}

	//Validate contact input
	if (contact==""){
		$(".err-contact").html(icon + "Please enter your contact number.");
		valid = false;
	} else if (!validateContact(contact)){
		$(".err-contact").html(icon + "Please enter a valid contact number.");
		valid = false;
	}
	return valid;
}


//Function to validate email format using regex
function validateEmail(email) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(email)) {
		return true;
	}
	else {
		return false;
	}
}

//Function to validate contact format using regex
function validateContact(contact){
	var filter = /^[9|8][0-9]{7}$/;
	if (filter.test(contact)) {
		return true;
	}
	else {
		return false;
	}
}

//Function to validate only alphabetical characters
function isAlpha(string) {
	var filter = /^[A-Za-z]+$/;
	if (filter.test(string)) {
		return true;
	}
	else {
		return false;
	}
}

//Display success message upon successful registration
//Param: true==successful, fail==unsuccessful
function resultMsg(result) {

	var titleContent;
	var textContent;

	if (result==true){
		titleContent = 'Registration Success';
		textContent = 'Click to return to the home page.';
	} else {
		titleContent = 'Registration Failed';
		textContent = 'You have already registered for this workshop. Click to return to the home page.';
	}

	var title = '<h class="popup-text">'+titleContent+'</h>';
	var text = '<p class="popup-smalltext">'+textContent+'</p>';
	var nextBtn = '<a href="/workshop"><button class="popup-register-btn button btn-red">Home</button></a>';
	var closeBtn = '<a class="popup-close" data-popup-close="popup-2" href="#"><i class="fas fa-times"></i></a>';
	var content = title + text + nextBtn + closeBtn;

	$(".popup-inner").html(content);
}
