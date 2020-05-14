'use strict';
/*<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
	portalId: "7669490",
	formId: "0dad4dd1-8474-41d3-b9b2-57955908d0ee"
});
</script>*/
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const {sendEmail, sendErrorEmail} = require("./sendEmail");
const {HUBSPOTFORMURL} = require('../config.js');
const  hubSpotCreateContact =  (contact) => {
     
  // Create the new request 
  var xhr = new XMLHttpRequest();
  var url = HUBSPOTFORMURL;
  if (!contact.email
        || !contact.firstName
        || !contact.lastName
        || !contact.phone
        || !contact.company)
  {
    throw new Error('Invalid Information in form: email: ' 
                        + contact.email + " FirstName: "
                        + contact.firstName + " lastName: "
                        + contact.lastName + " phone: "
                        + contact.phone + " company "
                        + contact.company);
  }
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
      }

    ]
  };
  
  var final_data = JSON.stringify(data);
  
  xhr.open('POST', url);
  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = async function() {
    if (xhr.readyState == 4 && xhr.status == 200) { 
      console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
      //throw new Error("MEEEEHH");
      sendEmail(contact);
    } else if (xhr.readyState == 4 && xhr.status == 400) { 
      console.log(xhr.responseText); // Returns a 400 error the submission is rejected.  
      sendErrorEmail(xhr.responseText + " Form submitted: " + final_data);       
    } else if (xhr.readyState == 4 && xhr.status == 403) { 
      console.log(xhr.responseText + " Form submitted: " + final_data); 
      // Returns a 403 error if the portal isn't allowed to post submissions.           
      sendErrorEmail(xhr.responseText + " Form submitted: " + final_data);
    } else if (xhr.readyState == 4 && xhr.status == 404) { 
      console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found
      sendErrorEmail(xhr.responseText + " Form submitted: " + final_data) ;     
    }
  };
  
  
  // Sends the request 
    
  xhr.send(final_data);
  console.log("send the request", final_data);
};

module.exports = {hubSpotCreateContact};
