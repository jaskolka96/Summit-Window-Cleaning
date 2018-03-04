
CharacterCount = function(TextArea,FieldToCount){
	var myField = document.getElementById(TextArea);
	var myLabel = document.getElementById(FieldToCount);
	if(!myField || !myLabel){return false}; // catches errors
	var MaxChars =  myField.maxLengh;
	if(!MaxChars){MaxChars =  myField.getAttribute('maxlength') ; }; 	if(!MaxChars){return false};
	var remainingChars =   MaxChars - myField.value.length
	myLabel.innerHTML = remainingChars+" Characters Remaining"
}

//SETUP!!
setInterval(function(){CharacterCount('myfield1','CharCountLabel1')},55);
setInterval(function(){CharacterCount('myfield2','CharCountLabel2')},55);
