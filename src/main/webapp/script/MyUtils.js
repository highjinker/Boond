function MyUtils() {}

errorBgColor="#f2dede";

MyUtils.isNull = function(object) {
    return object == null;
};

MyUtils.isEmptyString = function(object) {
    return object == null || object == "";
};

MyUtils.getValueForKey = function(keyValueArray, key){
	for(id in keyValueArray){
		if (keyValueArray[id]["key"] == key){
			return keyValueArray[id]["value"];
		}
	}
	return null;
}

MyUtils.validateNotNull = function(item, elementId){
	msg="";
	var validationSucceded = true;
	if(item == null || item.value == null || item.value == ''){
		validationSucceded = false;
		item.style.background=errorBgColor;
		if(item.placeholder.indexOf("Required", 0) < 0){
			item.placeholder = item.placeholder + " - Required"
		}
		msg="All fields are mandatory";
		MyUtils.showError('signUpAlert', "Required fields cannot be blank!!");
	}else {
		item.style.background="rgba(1,1,1,0)";
		MyUtils.hideError('signUpAlert');
	}
	return validationSucceded;
}

MyUtils.validateEmail = function(item){
	if(MyUtils.isEmptyString(item.value)){
		return true;
	}
	var vc = true;
	var regexp = /.*@.*\..*/gi;
	msg="";
	if(item == null || item.value == null || item.value == ''){
		return;
	}
	if(item.value.match(regexp) == null){
		item.style.background=errorBgColor;
		vc = false;
		MyUtils.showError('signUpAlert', "The email address entered by you is not valid!!");
	} else {
		item.style.background="rgba(1,1,1,0)";
		MyUtils.hideError('signUpAlert');
	}
	return vc;
}

MyUtils.passwordLength = function(item, min, max){
	var vc = true;
	if(item.value.length < min){
		item.style.background=errorBgColor;
		MyUtils.showError('signUpAlert', "The value cannot be less than " + min +" characters!!");
		vc = false;
	}else {
		MyUtils.hideError('signUpAlert');
	}
	if(item.value.length > max){
		item.style.background=errorBgColor;
		MyUtils.showError('signUpAlert', "The value cannot be greater than " + max +" characters!!");
		vc = false;
	}else {
		MyUtils.hideError('signUpAlert');
	}
	return vc;
}
MyUtils.validateSamePassword = function(){
	var vc = true;
	var password = document.getElementById('password');
	var confirmPassword = document.getElementById('confirmPassword');
	var validationSucceded = true;
	validationSucceded = MyUtils.validateNotNull(password) && validationSucceded;
	validationSucceded = MyUtils.validateNotNull(confirmPassword) && validationSucceded;
	if(validationSucceded){
		if(password.value != confirmPassword.value){
			password.style.background=errorBgColor;
			confirmPassword.style.background=errorBgColor;
			MyUtils.showError('signUpAlert', "Passwords don't match!!");
			vc = false;
		} else {
			MyUtils.hideError('signUpAlert');
			vc = false;
		}
	}else {
		MyUtils.hideError('signUpAlert');
	}
	return vc;
}

MyUtils.showError = function(reporterID, message){
	document.getElementById(reporterID).innerHTML = message
	document.getElementById(reporterID).hidden = false;
}

MyUtils.hideError = function(reporterID){
	document.getElementById(reporterID).hidden = true;
}