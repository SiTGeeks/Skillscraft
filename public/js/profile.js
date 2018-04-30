function removeCompetency(competency,id, item){
	params = {
      	'competency': competency,
      	'id': id
	}
	$.ajax({
	    url: "/ajax/",
	    data: {
	      action: "removeCompetency",
	      param: params
	    },
	    dataType: "json",
	    success: function(data) {
				if(data === true){
					item.parentNode.remove()
				}
				console.log("result succ?:" + data);
	    },
	    error: function(xhr, status){
	      console.log("AJAX ERROR REMOVING COMPETENCY: " + xhr.status);
	    }
  	});
}

function submitEditProfile(){
  var profileDetails = {};
  var profileDetailsForm  = $('#editProfileForm');
  profileDetailsForm.serializeArray().map(function(v) {profileDetails[v.name] =  v.value;});
  var validForm = true;

  if(validForm){
    document.forms["editProfileForm"].submit();
  }
}


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#profile-image').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$("#image-input").change(function() {
  readURL(this);
});
