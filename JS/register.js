$(document).ready(function(){
    $("#registerform").validate({
        rules:{
            fullname:{
                required: true,
                minlength: 3
            },
          
            pass: {
                required: true,
                minlength: 6
                


            },
            confirmpass: {
                required: true,
                equalTo: "#pass"

            },
           
            mobileno: {
                required: true,
                digits:true,
                minlength: 10,
                maxlength: 10
            },
           
            mailid: {
                required: true,
                email: true
            }



        },
        messages:{
            fullname:{
                required: "enter your name",
                minlength: "minimum character should be 3"
            },
            
            pass: {
                required: "enter your password",
                minlength:  "minimum character should be 8"

            },
            confirmpass: {
                required: "enter your confirmpassword",
                equalTo: "password does not match"

            },
            
            mobileno: {
                required: "enter your no",
                digits: "should be no only",
                minlength: "minimum length should be 10",
                maxlength: "maximum length should be 10"
            },
            
            mailid: {
                required: "enter your mailid",
                email: "enter valid mail"
            }
        },
        submitHandler: function(){
            event.preventDefault();
  
      const firstname = $('#fullname').val();
      const password = $('#pass').val();   
      const mobilenumber = $('#mobileno').val();
      const email = $('#mailid').val();
      const profile_image = "";
      
    //   console.log(username,password)
    //   const token = generateToken(); // Replace with your token generation logic
  
      // Save registration data in local storage
      
      axios.post('http://localhost:5000/users', { firstname, password ,mobilenumber, email, profile_image}).then(response => {
          console.log('Registration successful:', response.data);
          const userData = { firstname, password ,mobilenumber, email, profile_image};
          //console.log(userdata)
          localStorage.setItem('userData', JSON.stringify(userData));
          alert('Registration succesful. Please log in.');
          window.location.href = 'login.html';
        })
        
        .catch(error => {
          console.error('Registration failed:', error);
        });
        }
    })

})

