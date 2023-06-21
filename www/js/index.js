$(function displayEmail(employeeNumber) {
      // Invoke secondpage.html with the employeeNumber as a parameter
      window.location.href = "secondpage.html?employeeNumber=employeeNumber";
    }

    function fetchData() {
      // Create an XMLHttpRequest object
      var xhr = new XMLHttpRequest();

      // Define the URL endpoint
      var url = https://kerbau.odaje.biz/getstaff.php;

      // Configure the AJAX request
      xhr.open('GET', url, true);

      // Set the response type
      xhr.responseType = 'json';

      // Handle the AJAX response
      xhr.onload = function() {
        if (xhr.status === 200) {
          var responseData = xhr.response;

          // Extract the email addresses from the response
          var emailAddresses = [];
          for (var i = 1; i < responseData.length; i++) {
            var employee = JSON.parse(responseData[i]);
            var email = employee.email;
            var employeeNumber = employee.employeeNumber;

            // Create a new paragraph element to display the email
            var paragraph = document.createElement('p');
            paragraph.textContent = email;

            // Set the employeeNumber as the id
            paragraph.id = employeeNumber;

            // Add the onclick event to invoke displayEmail function
            paragraph.onclick = function() {
              displayEmail(this.id);
            };

            // Append the paragraph to the body
            document.body.appendChild(paragraph);
          }
        } else {
          // Request was unsuccessful
          console.log('Request failed with status:', xhr.status);
        }
      };

      // Send the AJAX request
      xhr.send();
    }

    // Call the fetchData function when the page is loaded
    window.onload = function() {
      fetchData();
    };
})