var isProduction = true;
if(window.location.host == ""){
	console.log("Running in test");
	isProduction = false;
}

function getDonorDetailHTML(donorDetail){
	return "<p>User ID " + donorDetail["userAccountId"] + " donated Rs." + donorDetail["donationAmount"] + "</p><hr>"; 
}

getDonorsCallback = function(data){
	var donorDetails = JSON.parse(data);
	console.log(donorDetails);
	var donorDiv = $('#recentDonorsDiv .panel-body');
	for(id in donorDetails){
		console.log(donorDetails[id]);
		var detailHTML = getDonorDetailHTML(donorDetails[id]);
		console.log(detailHTML);
		donorDiv.append(detailHTML);
	}
}

populateDonationStatus = function(data){
	var donationStatus = JSON.parse(data);
	document.getElementById("donationStatus").innerHTML = donationStatus["value"] + " litres raised";
	document.getElementById("donateStatus").innerHTML = "<h3>We've already raised "
		+ donationStatus["value"] + " litres</h3><br> Help us donate more.";
}

onload = function(){
	if(isProduction){
		xhrHelper.runHttpRequest("GET", "http://localhost:8080/karma/recentdonors?campaignId=1&count=2", false, getDonorsCallback, null);
		xhrHelper.runHttpRequest("GET", "http://localhost:8080/campaign/donationRaised/1", false, populateDonationStatus, null);
	} else {
		//test data here
		var donorDetails = [{"id":2,"campaignid":1,"userAccountId":2,"donationAmount":79.0,"createdDate":1411543714201,"lastUpdatedDate":1411543714201,"donationAnonymous":false,"donationCompleted":true},{"id":1,"campaignid":1,"userAccountId":1,"donationAmount":99.0,"createdDate":1411543082003,"lastUpdatedDate":1411543082003,"donationAnonymous":false,"donationCompleted":true}]
		getDonorsCallback(JSON.stringify(donorDetails));
		var donationStatus = {"id":3,"campaignid":1,"key":"donationRaised","value":"12.23"};
		populateDonationStatus(JSON.stringify(donationStatus));
	}
}

$(document).load(onload);