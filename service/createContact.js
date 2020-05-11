 'use strict';
 /*<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
	portalId: "7669490",
	formId: "0dad4dd1-8474-41d3-b9b2-57955908d0ee"
});
</script>*/
 const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 const sendEmail = require("./sendEmail");
 const  hubSpotCreateContact = async (contact) => {
     console.log("I'm in hubspot");
    // Create the new request 
    var xhr = new XMLHttpRequest();
    var url = 'https://api.hsforms.com/submissions/v3/integration/submit/7669490/0dad4dd1-8474-41d3-b9b2-57955908d0ee'
    
    // Example request JSON:
    var data = {
      "fields": [
        {
          "name": "email",
          "value": contact.email
        },
        {
          "name": "firstname",
          "value": contact.firstName
        },
        {
            "name": "lastname",
            "value": contact.lastName
        },
        {
            "name": "phone",
            "value": contact.phone
        },
        {
            "name": "company",
            "value": contact.company
        },
        {
            "name": "company_description",
            "value": contact.companyDescription
        },
        {
            "name": "website",
            "value": contact.website
        },

      ]
    }
  
    var final_data = JSON.stringify(data)
  
    xhr.open('POST', url);
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) { 
            console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
            sendEmail.sendEmail(contact);
        } else if (xhr.readyState == 4 && xhr.status == 400){ 
          console.log(xhr.responseText); // Returns a 400 error the submission is rejected.          
        } else if (xhr.readyState == 4 && xhr.status == 403){ 
          console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.           
        } else if (xhr.readyState == 4 && xhr.status == 404){ 
          console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found     
        }
       }
  
  
    // Sends the request 
    
    xhr.send(final_data);
    console.log("send the request", final_data);
  }

  module.exports = {hubSpotCreateContact};
