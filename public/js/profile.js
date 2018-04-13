function removeCompetency(competency,id){
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
	    },
	    error: function(xhr, status){
	      console.log("AJAX ERROR REMOVING COMPETENCY: " + xhr.status);
	    }
  	});
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
