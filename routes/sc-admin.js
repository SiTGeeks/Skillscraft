const dbUtil = require('../firebaseCollection');

module.exports = function(app){
	//get functions
	app.get("/sc-admin", function(req, res){
		//admin login page
		res.render("admin");
		res.end();
	});

	// app.get("/sc-admin/home", requireLogin, function(req, res){
	// 	//admin logged in home
	// 	res.render('dashboard',adminDetail);
	// });
	// app.get("/sc-admin/workshop",requireLogin, function(req, res){
	// 	//admin logged in home
	// 	res.render('adminworkshop');
	// });
	// app.get("/sc-admin/create-workshop", requireLogin, function(req, res){
	// 	//admin logged in home
	// 	res.render('addnew');
	// });


	app.get("/sc-admin/home", function(req, res){
		//admin logged in home
		res.render('dashboard',
		{
			bannerText:"Admin Dashboard"
		});
	});

	app.get("/sc-admin/workshop", function(req, res){
		//admin logged in home
		res.render("adminworkshop",
		{
			bannerText:"Browse all workshops"
		});
	});

	app.get("/sc-admin/workshop/ws/:ws", function(req, res){
		dbUtil.getAdminWorkshopWithId(req.params.ws, function(data, registered){
			res.render('edititem',
			{
				ws: data,
				registered
			});
			console.log(registered);
			res.end;
		});
	});

	app.get("/sc-admin/create-workshop", function(req, res){
		//admin logged in home
		res.render('addnew');
	});


	app.get("/sc-admin/logout", function(req,req){
		req.session.reset();
		req.redirect("/sc-admin/");
	});

	//post functions
	app.post("/sc-admin/login", function(req, res){
		//admin login action

		//auth here
		user = loginValidate();
		if(!user){
			res.render('/sc-admin/login',{error: "Invalid E-mail or password"})
		}else{
			res.session.user = user;
			res.redirect('/sc-admin/home')
		}
	});

	app.post("/sc-admin/editWorkshop",function(req,res){
		//back to edit item with message
		var host = req.headers.host;
		var hostParts = host.split("/");
		var workshopId = hostParts[hostParts.length-1];

		var workshopName = req.body.title;
		var workshopCategory = req.body.category;
		var workshopDate = req.body.date;
		var workshopTime = req.body.time;
		var workshopLevel = req.body.level;
		var workshopDescription = req.body.description;
		
		dbUtil.updateWorkshop(workshopId, 
				workshopName, 
				workshopDescription,
				-1,
				workshopTime,
				workshopLocation,
			function(success){
				var msg = "";
				if(success){
					msg = "";
				}else{
					msg = "";
				}
				res.redirect('/sc-admin/workshop', success);
				res.end();
			});

	});

	app.post("/sc-admin/createAccounts",requireLogin, function(req,res){
		//create accounts for course attendees
	});

	app.post("/sc-admin/newAdmin", function(req,res){
		//new admin account
	});

}

function requireLogin(req,res,next){
	if(!req.user){
		res.redirect('/sc-admin');
	}else{
		next();
	}
}
