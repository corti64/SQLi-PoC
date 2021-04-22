let email = document.querySelector("#email-input");
let password = document.querySelector("#password-input");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlePost);

function handlePost(event) {
    event.preventDefault(); //prevents addEventListener, specifically the "event" default behavior, which automatically reloads the page
    emailInputElement = document.querySelector("#email-input"); // id, #email-input", is value user types into email field in search-form
    passwordInputElement = document.querySelector("#password-input"); 
    post(emailInputElement.value,passwordInputElement.value);
  }

function post(postJSON)
axios.post('http://54.80.233.229/nodejs/query.js', {user: email,password: password}).then(diplay);


/**
const axios = require('axios')
axios.post('http://54.80.233.229/nodejs/query.js', {
	email: emailvariablegoeshere,
	password: passwordvariablegoeshere
})
**/


