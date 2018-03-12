
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
//

function checkInput() {
	let checkRating = window.selectRating.value
	let checkService = window.selectService.value
	let checkMessage = window.myfield2.value
	let checkUser = window.testimonialUsernameField.value

	if (checkRating == "") {
		alert('Please select the rating.')
	}

	else if (checkService == "") {
		alert('Please select service.')
	}

	else if (checkMessage == ""){
		alert('please insert a comment.')
	}
	else if (checkUser == ""){
		alert('please insert your username.')
	}

	else{
		console.log('sent')
	}
}

window.addEventListener('load', ()=>{
window.submitTestmonial.addEventListener('click',checkInput)
console.log('checkInput')
})
