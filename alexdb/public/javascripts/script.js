
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
window.addEventListener('load', ()=>{
		console.log("--------------------VOTE SYSTEM READY-----------------------")
		voteSystem()
})
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


function searchbox() {
		var cx = '002964887220593813899:_4vbeaqcig4';
		var gcse = document.createElement('script');
		gcse.type = 'text/javascript';
		gcse.async = true;
		gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(gcse, s);
	}
	window.addEventListener('load', searchbox)

	window.loadMoreBttn.addEventListener('click',() =>{
		listMoreTestimonials()
		console.log('listed more !')
	})

window.loginBttn.addEventListener('click', () =>{
	verifyLogin()
	console.log('LOGIN VERIFICATION IN PROGRESS !')
})





window.addEventListener('load', ()=>{
window.submitTestmonial.addEventListener('click',checkInput)
console.log('checkInput')

})

function listMoreTestimonials(){
	var listSize = 25
	window.location.replace('/testimonials?listSize='+listSize)

}
window.selectTable.addEventListener('click', showItems)



function voteSystem(){

	var button = document.querySelectorAll('.chBttn')

		for (var i= 0; i< button.length; i++) {

			button[i].addEventListener('click', (e)=>{

				console.log('Clicked-----'+e.target.id)

				var status = true

				fetch('/vote?button='+e.target.id, {
					method: 'POST',

				})
			    .then(res => {
			        return res.json()
			      })
			    .then((response) => {
							console.log(status)
							if (status == true){
								alert('Thank you for nominating charity '+ e.target.id+'. Please consider helping this charity in raising funds for their essential needs. You can find their website by clicking the "See Charity Website" button.')
								window.location.replace('/charity')
							}
							else{
								alert('ERROR - PLEASE TRY AGAIN LATER!')
							}
			    })
  		})

	}
}
window.addEventListener('load', ()=>{
		console.log("--------------------VOTE SYSTEM READY-----------------------")
		voteSystem()
})

function verifyLogin(){

	var checkLogin = document.getElementById('loginField').value
	console.log(checkLogin)

	fetch('/verify', {
		method: 'POST',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
		body: JSON.stringify(checkLogin)

	})
		.then(res => {
				return res.json()
			})
			.then((response) => {

			})

				var error = window.error

				if (success == 'false'){
					 error.style.display='flex'
					 console.log('error')

				} else if (success == 'true'){

					console.log('Login Success')
					window.location.replace('/accpanel')
				}

		}



function showItems(){

	let list = document.getElementById('selectTable')
	let name =document.getElementById('changeName')
	let description = document.getElementById('changeDescription')

	list.addEventListener('click', ()=>{
		if (list.value == 'The Name') {
			name.style.display='flex';
		}
		else if(list.value == 'The Description') {
			description.style.display='flex';
		}
		else if(list.value == 'Select item:'){
			name.style.display='none'
			description.style.display='none'
		}
})
}




var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

function verifyEmail(){

	var emailBox = window.emailField.value

	if (emailBox.includes("@"||"gmail"||"yahoo"||"interia"||"wp"||"msn")){
		alert("Verified.")
	} else{
		alert("NOT Verified.")
	}


}
