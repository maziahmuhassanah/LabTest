$( function getEmployeeDetails() {
      // Get the employeeNumber from the URL query parameter
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var employeeNumber = urlParams.get('employeeNumber');

      // Create an XMLHttpRequest object
      var xhr = new XMLHttpRequest();

      // Define the URL endpoint
      var url = 'https://kerbau.odaje.biz/getstaffbyid.php?id=employeeNumber';

      // Configure the AJAX request
      xhr.open('GET', url, true);

      // Set the response type
      xhr.responseType = 'json';

      // Handle the AJAX response
      xhr.onload = function() {
        if (xhr.status === 200) {
          var responseData = xhr.response;

          // Check the status of the response
          var status = JSON.parse(responseData[0]).status;
          if (status === 1) {
            // Extract employee details
            var employee = JSON.parse(responseData[1]);
            var employeeDetails = '<p>Employee Name: ' + employee.firstName + ' ' + employee.lastName + '</p>' +
                                  '<p>Email: ' + employee.email + '</p>' +
                                  '<p>Office Code: ' + employee.officeCode + '</p>' +
                                  '<p>Extension: ' + employee.extension + '</p>' +
                                  '<p>Job Title: ' + employee.jobTitle + '</p>';

            if (employee.reportsTo !== null) {
              employeeDetails += '<p>Reports To: ' + employee.reportsTo + '</p>';
            }

            // Display the employee details
            var detailsContainer = document.getElementById('employeeDetails');
            detailsContainer.innerHTML = employeeDetails;
          } else {
            // No data associated with the employee number found
            var detailsContainer = document.getElementById('employeeDetails');
            detailsContainer.innerHTML = '<p>No data found for the employee number.</p>';
          }
        } else {
          // Request was unsuccessful
          console.log('Request failed with status:', xhr.status);
        }
      };

      // Send the AJAX request
      xhr.send();
    }

    // Call the getEmployeeDetails function when the page is loaded
    window.onload = function() {
      getEmployeeDetails();
    };
})