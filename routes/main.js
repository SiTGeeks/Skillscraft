const dbUtil = require('../firebaseCollection');

module.exports = function(app){
	//get functions
	app.get("/", function(req, res){
		//homepage
		res.render('index');
		res.end();
	});

	app.get("/checkin", function(req, res){
		//QR sign in page
	});

	app.get("/workshop/", function(req, res){
		//browse workshops
		res.render("workshop",
		{user:"non-admin",
		bannerText:"Browse all workshops"}
	);
	res.end();
});

app.get("/workshop/ws/:ws", function(req, res){
	//fetch db using ws
	workshopPromise = dbUtil.getWorkshopWithId(req.params.ws, function(data){
		console.log(data);
		res.render('item',
		{
			ws: data,
			bannerText: data['title']}
		);
		res.end;
	});
	// res.render('item');
	// res.end();
});

};
