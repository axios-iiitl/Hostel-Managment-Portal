# Hostel Management Portal  of IIIT Lucknow
A simple Hostel Management Portal based on **Node.js**  with custom **Admin and Student Dashboard.**
## Instructions for Setup:
1. Download the zip file and extract it to a New Folder.
2. Open terminal and navigate to the folder.
  ### Setting Up Server:
   * Make the folder config inside the new folder and the file **keys.js** inside it.
   * Use **MongoDB** as the database for this project.
   * Make Database having collections named as **users,leaves and admins**.
   * Make file **keys.js** like this: ![key.js](https://user-images.githubusercontent.com/54629424/79287275-e9e38e80-7ee0-11ea-8041-9f8dd3ab330f.png)

 #### Enabling Login with Google:
  `A guide about this can be found here`: [Simple guide to get clientID and clientSecret.](https://developers.google.com/adwords/api/docs/guides/authentication)
   * Put these keys in **keys.js**.
1. Download all the dependencies which are in **package.json**.
1. Run the command **npm start** to start the project.

## Admin Dashboard:
* Admin can see the **Contact Information** , **Item Information** and the past leaves of the particular student in the dashboard.
* Admin can **approve** or **reject** the leave request  of the student from the dashboard.

## User/Student  Dashboard:
* He/She can edit the **Items and Contact information**.
* They can request for the leave application and can review whether it gets approval or not.
* User can not create more than one applications at a time and he/she can create once it gets approved or reject.

### Developed by:
 [Rishabh Shukla](https://github.com/blurry-x-face), [Lav Joshi](https://github.com/lav-joshi) and [Pathan Moin Khan](https://github.com/MightyMoin)
