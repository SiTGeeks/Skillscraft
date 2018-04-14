function deleteCompetency(competency){
	console.log(competency);
	$.ajax({
	    url: "/sc-admin/competency/delete",
	   	type: "POST",
	    data: {
	      action: "deleteCompetency",
	      param: competency
	    },
	    dataType: "json",
	    success: function(data) {
	    },
	    error: function(xhr, status){
	      console.log("AJAX ERROR DELETING COMPETENCY: " + xhr.status);
	    }
 	 });
	location.reload();
}

function addCompetency(competency){
	var newCompetency = $("#competency").val();
	$.ajax({
	    url: "/sc-admin/competency/create",
	    type: "POST",
	    data: {
	      action: "addCompetency",
	      param: newCompetency
	    },
	    dataType: "json",
	    success: function(data) {
	    },
	    error: function(xhr, status){
	      console.log("AJAX ERROR ADDING COMPETENCY: " + xhr.status);
	    }
 	});
	location.reload();
}