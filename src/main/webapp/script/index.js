function getDonorDetailHTML(donorDetail){
	detailStr =  "<p><h3>&#8377; " + donorDetail[0]["donationAmount"] + "</h3></p>" +
	"<p>by " + donorDetail[1]["firstName"] + " " + donorDetail[1]["lastName"]+ "</p>";
	email = donorDetail[1]["emailId"];
	if(!MyUtils.isEmptyString(email)){
		detailStr += "<p><a href='mailto:" + email + "'>Email</a></p>"
	}
	return detailStr + "<hr>";
}

populateCampaignDetails = function(data){
	if(!MyUtils.isEmptyString(data)){
		var campaignDetails = JSON.parse(data);
		document.getElementById("campaignName").innerHTML = "<b>" + MyUtils.getValueForKey(campaignDetails, Constants.campaignName) + "</b>";
		document.getElementById("campaignDescription").innerHTML = "<br>" + MyUtils.getValueForKey(campaignDetails, Constants.campaignDescription);
		populateDonationStatus(MyUtils.getValueForKey(campaignDetails, Constants.campaignDonationRaised));
	}
}

populateDonationStatus = function(donationStatus){
	if(MyUtils.isNull(donationStatus)){
		document.getElementById("donationStatus").innerHTML = "You're the first donor!";
		document.getElementById("donateStatus").innerHTML = "<h3>No one has donated yet.</h3><br> " +
		"Be the first one!";
	} else {
		document.getElementById("donationStatus").innerHTML = donationStatus + " litres raised";
		document.getElementById("donateStatus").innerHTML = "<h3>We've already raised "
			+ donationStatus + " litres</h3><br> Help us donate more.";
	}
}

getDonorsCallback = function(data){
	if(!MyUtils.isEmptyString(data)){
		var donorDetails = JSON.parse(data);
		var donorDiv = $('#recentDonorsDiv .panel-body');
		for(id in donorDetails){
			var detailHTML = getDonorDetailHTML(donorDetails[id]);
			donorDiv.append(detailHTML);
		}
	}
}

donateForCause = function(){
	var donateDiv = document.createElement('div');
	donateDiv.id = 'donationDiv';
	donateDiv.style.zIndex = 20;
	donateDiv.hidden = true;
	donateDiv.style.background = "rgba(62,118,194,0.9)";
	donateDiv.style.position = 'absolute';
	donateDiv.style.top = '50px';
	donateDiv.style.left = '50px';
	donateDiv.style.height = '50px';
	donateDiv.style.width = '50px';
	donateDiv.style.border = "5px solid";
	donateDiv.style.borderRadius = "25px";
	donateDiv.style.borderColor = "rgb(62,118,250)";
	document.body.appendChild(donateDiv);
	localHeight = window.innerHeight * 0.7;
	localWidth = window.innerWidth * 0.5; 
	localTop = (window.innerHeight - localHeight)/2;
	localLeft = (window.innerWidth - localWidth)/2;
	donateDiv.hidden = false;
	$("#donationDiv").animate({width:localWidth,height:localHeight,top:(localTop),left:(localLeft)}, "slow");
	donateDiv.style.fontSize = '30px';


}

campaignId=1;
onload = function(){
	//donateForCause();
//	document.getElementById("myCarousel").innerHTML = '<input class="borderlessText" type="text" placeholder="John Doe"'+
//	'	maxlength="100"><br>'+
//	'<input class="borderlessText" type="text" placeholder="Email"'+
//	'	maxlength="100">'+
//	'<br> &#8377;'+
//	'<input class="borderlessText" type="text" placeholder="Donation"'+
//	'	maxlength="100">'+
//	'<br>'+
//	'<input id="cc" type="checkbox" value="1" id="checkboxFourInput" name="" />'+
//	'Anonymous donation?'
	//loadSignUpDiv();
	if(MyUtils.isProduction){
		initFB();
		xhrHelper.runHttpRequest("GET", "http://"+window.location.host+"/karma/recentdonors?campaignId="+campaignId+"&count=2", false, getDonorsCallback, null, null, null, null);
		xhrHelper.runHttpRequest("GET", "http://"+window.location.host+"/campaign/get/"+campaignId, false, populateCampaignDetails, null, null, null, null);
		//xhrHelper.runHttpRequest("GET", "http://"+window.location.host+"/campaign/donationRaised/"+campaignId, false, populateDonationStatus, null);
	} else {
		//test data here
		var donorDetails = [[{"id":1,"campaignid":campaignId,"userAccountId":1,"donationAmount":99.0,"createdDate":1411720472111,"lastUpdatedDate":1411720472111,"donationAnonymous":false,"donationCompleted":true},{"id":1,"firstName":"Ankur","lastName":"Bansal","emailId":"aankur.bansal@gmail.com","createdDate":1411720443673,"lastUpdatedDate":1411720443673}]]
		getDonorsCallback(JSON.stringify(donorDetails));
		var donationStatus = {"id":3,"campaignid":campaignId,"key":"donationRaised","value":"12.23"};
		populateDonationStatus(JSON.stringify(donationStatus));
		var campaignDetails = [{"id":1,"campaignid":campaignId,"key":"name","value":"Boond"},{"id":3,"campaignid":campaignId,"key":"donationRaised","value":"12.23"},{"id":4,"campaignid":1,"key":"description","value":"Every water pump you help to install, every vegetable plot you dig, every campaign you add your voice to, every child you send to school creates new opportunities for communities worldwide"}];
		populateCampaignDetails(JSON.stringify(campaignDetails));
	}
	User.populate();
}

$(document).load(onload);

loadNavigationBar = function(){
	document.getElementById("navigationBar").innerHTML = FileHelper.readStringFromFileAtPath("header.html");
}

loginOrOut = function(){
	option = document.getElementById("loginOrOut").innerHTML;
	if(option == 'Login'){
		document.getElementById("signUpScreen").innerHTML = FileHelper.readStringFromFileAtPath("signUp.html");
		document.getElementById("signUpScreen").hidden = false;
	} else {
		User.logout();
	}
	
}

function closeSignUp(){
	document.getElementById("signUpScreen").hidden = true;
}

function signUpUser(){
	if(MyUtils.isProduction){
		User.login();
	} else {
		MyUtils.populateMockUserData();
		closeSignUp();
	}

}

function showNewUserInput(){
	checked = document.getElementById('newUserChk').checked;
	if(checked){
		document.getElementById('name').hidden = false;
		document.getElementById('confirmPassword').hidden = false;
	} else {
		document.getElementById('name').hidden = true;
		document.getElementById('confirmPassword').hidden = true;
	}
}