function xhrHelper(){}

xhrHelper.runHttpRequest = function(method, url, isAsync, callback, postData, headers, callbackArguments, errorCallback)
{
	if(MyUtils.isNull(method) || MyUtils.isNull(url) || MyUtils.isNull(isAsync)){
		throw "Method/URL/isAsync cannot be null";
	}
	if(method == "POST" && MyUtils.isNull(postData)){
		throw "postData cannot be null when the method is POST";
	}
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			if(!MyUtils.isNull(callback)){
				callback(xmlhttp.responseText, callbackArguments);
			}
		} else {
			if(!MyUtils.isNull(errorCallback)){
				errorCallback(xmlhttp.responseText, callbackArguments);
			}
		}
	}
	xmlhttp.open(method,url,isAsync);
	if(!MyUtils.isNull(headers)){
		for(header in headers){
			xmlhttp.setRequestHeader(header, headers[header]);
		}
	}
	console.log(xmlhttp);
	if(MyUtils.isNull(postData)){
		xmlhttp.send();
	} else {
		xmlhttp.send(JSON.stringify(postData));
	}
}