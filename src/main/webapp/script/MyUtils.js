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
		MyUtils.showError('signUpAlert', item.placeholder + " cannot be blank");
	}else {
		item.style.background="rgba(1,1,1,0)";
		MyUtils.hideError('signUpAlert', item.placeholder + " cannot be blank");
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
		MyUtils.hideError('signUpAlert', "The email address entered by you is not valid!!");
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
		MyUtils.hideError('signUpAlert', "The value cannot be less than " + min +" characters!!");
	}
	if(item.value.length > max){
		item.style.background=errorBgColor;
		MyUtils.showError('signUpAlert', "The value cannot be greater than " + max +" characters!!");
		vc = false;
	}else {
		MyUtils.hideError('signUpAlert', "The value cannot be greater than " + max +" characters!!");
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
			MyUtils.hideError('signUpAlert', "Passwords don't match!!");
			vc = false;
		}
	}else {
		MyUtils.hideError('signUpAlert', "Passwords don't match!!");
	}
	return vc;
}

var errors = [];
MyUtils.showError = function(reporterID, message){
	if(errors.indexOf(message) < 0){
		errors.push(message);
	}
	updateErrorMessage(reporterID, errors);
}

MyUtils.hideError = function(reporterID, message){
	index = errors.indexOf(message)
	if(index > -1){
		errors.splice(index, 1)
	}
	updateErrorMessage(reporterID, errors);
}

function updateErrorMessage(reporterID, errorArr){
	if(errors.length > 0){
		document.getElementById(reporterID).innerHTML = MyUtils.getErrorMessage(errors);
		document.getElementById(reporterID).hidden = false;
	} else {
		document.getElementById(reporterID).hidden = true;
	}
}

MyUtils.getErrorMessage = function(errorArr){
	var html = "<ul>";
	for(index in errorArr){
		html += "<li>"+errorArr[index]+"</li>";
	}
	html += "</ul>";
	return html;
}