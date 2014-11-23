function User() {}

User.data = null;
User.source = null;

User.populateUserInfo = function(userData, source){
	User.data = JSON.parse(userData);
	localStorage.setItem("userData", userData);
	User.source = source;
	User.populate();
}

User.populate = function(){
	if(!MyUtils.isNull(localStorage.getItem('userData'))){
		User.data = JSON.parse(localStorage.getItem('userData'));
	}
	if(!MyUtils.isNull(User.data)){
		document.getElementById("helloMsg").innerHTML = "Hello, " + User.data.response["firstName"];
		document.getElementById("loginOrOut").innerHTML = "Logout";
		closeSignUp();
	} else {
		console.log("No user information");
	}
}

User.login = function(){
	if(validate()){
		console.log("validated");
		var name = document.getElementById('name').value
		var nameArr = name.split(" ");
		var guestEmail = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		var confirmPassword = document.getElementById('confirmPassword').value;
		var checked = document.getElementById('newUserChk').checked;

		if(checked){

			var userDetail = {};
			userDetail["firstName"] = nameArr[0]
			if(nameArr.length > 1){
				userDetail["lastName"] = nameArr[nameArr.length - 1]
			}
			userDetail["userIdentifier"] = guestEmail;
			console.log(userDetail);
			headers = {"Accept":"application/json","Content-type":"application/json"}
			xhrHelper.runHttpRequest('POST', "http://"+window.location.host+"/user/addUser" , false, User.populateUserInfo, userDetail, headers, null, null)
		} else {

		}
	} else {
		document.getElementById('signUpAlert').hidden = false;
	}
}

User.logout = function(){
	User.data = null;
	localStorage.removeItem("userData");
	document.getElementById("loginOrOut").innerHTML = "Login";
	document.getElementById("helloMsg").innerHTML = "Hello, Guest";
}

function validate(){
	checked = document.getElementById('newUserChk').checked;
	validationSucceded = true;
	msg="";
	var guestName = document.getElementById('name');
	var guestEmail = document.getElementById('email');
	var password = document.getElementById('password');
	var confirmPassword = document.getElementById('confirmPassword');
	console.log(validationSucceded);
	validationSucceded = MyUtils.validateEmail(guestEmail) && validationSucceded;
	console.log(validationSucceded);
	if(checked){
		validationSucceded = MyUtils.validateNotNull(guestName) && validationSucceded;
	}
	console.log(validationSucceded);
	validationSucceded = MyUtils.validateNotNull(guestEmail) && validationSucceded;
	console.log(validationSucceded);
	validationSucceded = MyUtils.validateNotNull(password) && validationSucceded;
	console.log(validationSucceded);
	if(checked){
		validationSucceded = MyUtils.validateNotNull(confirmPassword) && validationSucceded;
	}
	console.log(validationSucceded);
	validationSucceded = MyUtils.passwordLength(password, 1, 100) && validationSucceded;
	console.log(validationSucceded);
	validationSucceded = MyUtils.validateSamePassword && validationSucceded;
	console.log(validationSucceded);
	return validationSucceded;
}