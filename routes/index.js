module.exports = function(app){
	require('./ajax')(app);
	require('./main')(app);
	require('./sc-admin')(app);
};

