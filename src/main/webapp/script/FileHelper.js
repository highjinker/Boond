function FileHelper() {
}

FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
{
	var request = new XMLHttpRequest();
	request.open("GET", pathOfFileToReadFrom, false);
	request.send(null);
	var returnValue = request.responseText;

	return returnValue;
}

function GetUrlValue(){
	var pathOfFileToRead = window.location.search.substring(1);
	if(pathOfFileToRead.length > 0){
		var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(pathOfFileToRead);
		document.getElementById('page_content').innerHTML = contentsOfFileAsString;
	}
	if(pathOfFileToRead == "comments.html"){
		loadComments();
	}
}