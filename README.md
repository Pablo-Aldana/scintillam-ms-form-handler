# scintilam-ms-form-handler
Middleware to handle a form submission, submitting the data to Hubspot using Hubspot API and uploading images to the server. 
After form submission it sent an html email using nodemailer to the subscriber.

As submission to Hubspot is by async await the error handling is sent by email to a configurable email address so that you won't miss a subscription. 

This allows to have your own branded form with your own logic integrated with Hubspot or potentially any other CRM

.env file is necessary with the secret information such:
- Emai configuration
- Hubspot API
- Hubspot Form..

It has image validation by header so that avoid malicious files to be uploaded.

## Install
```bash
# With NPM
npm i install

# USE

node server.js

# DOCKER
docker build -t scintillam-ms-form-handler .
docker run -ti -p 8000:8000 -v /Users/Pablo/Downloads/file-upload/example:/app/uploads scintillam-ms-form-handler:latest

```
## Usage
When form is submited. Mandatory fields are validated on client side and server side. 
File is upload to uploads folder. It can be mapped with a volume using docker.



## Credit
Created by [VIVE](https://vivelaapp.es) a  [Scintillam](https://www.scintillam.com) company
