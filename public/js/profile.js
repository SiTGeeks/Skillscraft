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