
var user1 = sessionStorage.getItem('loggedInUser');
          
    
if (user1) {
  var userId1 = JSON.parse(user1); // Assuming user1 is a JSON string containing at least an "id" property
  var checkName = userId1.firstname;
  $("#my_username").html(`<h1>Welcome ${checkName} !</h1>`);
  console.log(user1);
}
else{
  $("#my_username").innerHTML(`<h1>Welcome</h1>`);
}