function MyUtils() {}
 
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