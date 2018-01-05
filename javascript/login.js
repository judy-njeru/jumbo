
var users = [];
var customer = {};
var firstName = '';
var lastName = '';
var emailAddress= '';
var password = '';
var confirmPassword = '';
var userChangeName = document.getElementById('userChange');


var firstNameInput   = document.getElementById("fname");
var lastNameInput    = document.getElementById("lname");
var emailAddressInput = document.getElementById("emailaddress");
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("cpassword");




function createAccount() {
  //get the values from the input boxes in lower case

  userChangeName = firstNameInput.value;
  document.getElementById('userChange').innerHTML = "Hi " + userChangeName;


  firstName = firstNameInput.value.toLowerCase();
  lastName = lastNameInput.value.toLowerCase();
  emailAddress = emailAddressInput.value.toLowerCase();
  password = passwordInput.value.toLowerCase();
  confirmPassword = confirmPasswordInput.value.toLowerCase();

  if (password != confirmPassword) {
    document.getElementById('wrongPass').innerHTML = "Incorrect confirm password";
  }



  //clear the input boxes

  firstNameInput.value ="";
  lastNameInput.value="";
  emailAddressInput.value="";
  passwordInput.value="";
  confirmPasswordInput.value="";

  //push data into users array
  customer = { firstName: firstName, lastName: lastName, emailAddress: emailAddress, password: password, confirmPassword: confirmPassword };
  users.push(customer);


}

//window.location.href="index.html";
//sign in function
var signIn = function(){

  var valid = false;
  var invalid = document.getElementById("invalidLogin");
  var loginaddress = document.getElementById("loginaddress").value;
  var loginpassword = document.getElementById("loginpassword").value;

  //clear the input boxes
  loginaddress.value="";
  loginpassword.value="";

  //loop through array to find the correct password email and address
  for (var i=0; i <users.length; i++) {
    if ((loginaddress == users[i].emailAddress) && (loginpassword == users[i].password)) {
    window.location = "checkout1.html";
    }
    if (loginaddress !== users[i].emailAddress) {
      invalidLogin = "Your email address is incorrect.";
      invalid.style.width = "100%";
      invalid.style.marginTop = "10px";
      invalid.style.marginBottom = "15px";
      invalid.style.fontFamily = "'Open Sans', sans-serif";
      invalid.style.fontSize = "0.8em";
      invalid.style.marginTop = "10px";
      invalid.style.color = "red";
    }
    if (loginpassword !== users[i].password) {
      invalidLogin = "Your password is incorrect.";
      invalid.style.width = "100%";
      invalid.style.marginTop = "10px";
      invalid.style.marginBottom = "15px";
      invalid.style.fontFamily = "'Open Sans', sans-serif";
      invalid.style.fontSize = "0.8em";
      invalid.style.marginTop = "10px";
      invalid.style.color = "red";
    }
    if ((loginaddress !== users[i].emailAddress) && (loginpassword !== users[i].password)) {
      invalidLogin = "Your email address or password is incorrect.";
      invalid.style.width = "100%";
      invalid.style.marginTop = "10px";
      invalid.style.marginBottom = "15px";
      invalid.style.fontFamily = "'Open Sans', sans-serif";
      invalid.style.fontSize = "0.8em";
      invalid.style.marginTop = "10px";
      invalid.style.color = "red";
    }

  document.getElementById("invalidLogin").innerHTML = invalidLogin;
  }

}
