const dbUtil = require('../firebaseCollection');
const debug = true;

module.exports = function(app){
	//get functions
	app.get("/sc-admin", function(req, res){
		//admin login page
		res.render("admin",
			{
				error:"false"
			});
		res.end();
	});

	app.get("/sc-admin/home", requireLogin, function(req, res){
		//admin logged in home
		res.render('dashboard',
		{
			bannerText:"Admin Dashboard"
		});
	});

	app.get("/sc-admin/workshop", requireLogin, function(req, res){
		//admin logged in home
		res.render("adminworkshop",
		{
			bannerText:"Browse all workshops"
		});
	});

	app.get("/sc-admin/users", function(req, res){
		//admin logged in home
		res.render("users",
		{
			bannerText:"Manage Users"
		});
	});


	app.get("/sc-admin/user/:id", function(req, res){
		//admin logged in home
		dbUtil.getUserById(req.params.id,function(user){
			res.render("profile",
			{
				bannerText:"User Profile",
				user: user
			});
			res.end();
		});

	});

	app.get("/sc-admin/workshop/ws/:ws", function(req, res){
		dbUtil.getAdminWorkshopWithId(req.params.ws, function(data, registered){
			res.render('edititem',
			{
				ws: data,
				registered
			});
			res.end();
		});
	});

	app.get("/sc-admin/create-workshop",  requireLogin,function(req, res){
		//admin logged in home
		dbUtil.getQualifications(function(qualificationList){
			res.render('addnew',
				{
					qualificationList
				}
			);
		})
	});


	app.get("/sc-admin/logout", function(req,req){
		req.session.reset();
		req.redirect("/sc-admin/");
	});

	//post functions
	app.post("/sc-admin", function(req, res){
		//admin login action
		//res.redirect('/sc-admin/home')
		var email = req.body.email;
		var password = req.body.password;
		console.log("logging in");
		dbUtil.loginUser(email, password, function(user){
			if(!user){
				res.render('admin',{error: "true"});
			}else{
				req.session.user = user;
				res.redirect('/sc-admin/home');
			}
			res.end();
		});

	});

	app.post("/sc-admin/editWorkshop", requireLogin,function(req,res){
		//back to edit item with message
		var host = req.headers.referer;
		var hostParts = host.split("/");
		var workshopId = hostParts[hostParts.length-1];

		var workshopName = req.body.title;
		var workshopLocation = req.body.location;
		var workshopDate = req.body.date;
		var workshopVacancy = req.body.vacancy;
		var workshopTime = req.body.time;
		var workshopLevel = req.body.level;
		var workshopDescription = req.body.description;
		var workshopImage = "workshopImage";

		dbUtil.updateWorkshop(
				workshopId,
				workshopName,
				workshopDescription,
				workshopVacancy,
				workshopDate,
				workshopTime,
				workshopLocation,
				workshopLevel,
				workshopImage,
			function(success){
				var msg = "";
				if(success){
					msg = "true";
				}else{
					msg = "false";
				}
				res.redirect('/sc-admin/workshop');
				res.end();
			});
	});

	app.post("/sc-admin/createWorkshop", requireLogin,function(req,res){
		//back to edit item with message
		var workshopName = req.body.title;
		var workshopDescription = req.body.description;
		var workshopLocation = req.body.location;
		var workshopVacancy = req.body.vacancy;
		var workshopDate = req.body.date;
		var workshopTime = req.body.time;
		var workshopLevel = req.body.level;

		dbUtil.createWorkshop(
				workshopName,
				workshopDescription,
				workshopLocation,
				workshopVacancy,
				workshopDate,
				workshopTime,
				workshopLevel,
				null,
			function(success){
				var msg = "";
				if(success){
					msg = "success";
				}else{
					msg = "failed";
				}
				res.redirect('/sc-admin/workshop');
				res.end();
		});
	});

	//post functions
	app.post("/sc-admin/login", function(req, res){
		//admin login action
		//res.redirect('/sc-admin/home')
		var email = req.body.email;
		var password = req.body.password;
		dbUtil.loginUser(email, password, function(user){
			if(!user){
				res.render('/sc-admin',{error: "Invalid E-mail or password"});
			}else{
				req.session.user = user;
				res.redirect('/sc-admin/home');

			}
			res.end();
		});

	});
}

function requireLogin(req,res,next){
	if(!req.user && !debug){
		res.redirect('/sc-admin');
	}else{
		next();
	}
}
