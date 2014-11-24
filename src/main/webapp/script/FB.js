function initFB(){
	loadFBSDK(document, 'script', 'facebook-jssdk');
}

var isSDKLoaded = false;

//Load the SDK asynchronously
loadFBSDK = function(d, s, id) {
	console.log("load SDK");
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
};

window.fbAsyncInit = function() {
	console.log("fbAsyncInit");
	FB.init({
		appId      : '1487082464875406',
		//appId      : '1487089331541386',
		cookie     : true,  // enable cookies to allow the server to access 
		// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.1' // use version 2.1
	});
	isSDKLoaded = true;
}

function loginWithFB() {
	if(!MyUtils.isProduction){
		console.log("Not in production. Using test data");
		MyUtils.populateMockUserData();
		return;
	}
	if(!isSDKLoaded){
		console.log("FB not initialized");
		return;
	}
	console.log("loginWithFB");
	FB.login(function(response) {
		statusChangeCallback(response);
	});
}

function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	if (response.status === 'connected') {
		fbLoginCallback(response);
	} else if (response.status === 'not_authorized') {
		console.log('Please log into this app.');
	} else {
		console.log('Please log into Facebook.');
	}
}

function fbLoginCallback(response) {
	console.log("fbLoginCallback" + JSON.stringify(response));
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log(response);
		console.log('Successful login for: ' + response.name);
		var fbUserDetails = {"id":null,"firstName":response.first_name,"lastName":response.last_name,"userIdentifier":response.id,"createdDate":null,"lastUpdatedDate":null}
		headers = {"Accept":"application/json","Content-type":"application/json"}
		xhrHelper.runHttpRequest('POST', "http://"+window.location.host+"/user/addUser" , false, User.populateUserInfo, fbUserDetails, headers, "facebook", null)
	});
}