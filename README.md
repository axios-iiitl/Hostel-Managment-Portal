# Hostel Management Portal  of IIIT Lucknow
A simple Hostel Management Portal based on **Node.js**  with custom **Admin and Student Dashboard.**
## Instructions for Setup:
1. Download the zip file and extract it to a New Folder.
2. Open terminal and navigate to the folder.
  ### Setting Up Server:
   * Make the folder config inside the new folder and the file **keys.js** inside it.
   * Use **MongoDB** as the database for this project.
   * Make Database having collections named as **users,leaves and admins**.
   * Make file **keys.js** like this:
![alt text](https://lh3.googleusercontent.com/BDVMtqa3NNt0gwJZFQvoFzWbBlpwuk5iZuK1tMGVjxUi5Pf6Vb9ytYhlEI-qz6_hnZOVGPe40KE0w98UtfzsYtHUm2lG5b-XGGP0pXy-WLtDOFOL-6w8WAgZO6OFTzBCHXplyVqAtAkw79GM20rQlz31C_Au3KD2PXE0ZWyTlalopW0HKul-Z3v8txoZKvXWePiqn-rnDN1JmOpnHdLXJVmPnjyllpC1IlhLys_LFrZfACJsVPtvIfJNoCtp-S-3aVfEtZ3ZYu42RuZc271O04fZqvyJr2hwoz5-RzAfuWUOH1gEDv_FLdM21ELMf3mpvcoOIFNjtqgGyKDw_71wpSUSY5SyRe1GIc-UfIGk5neTFe4zzrvD7J_RvvPEM3uJZNFgbw3V8yl3x6w4Ec_TvpuijfzZVjmKJr9H5c1t7UI7EEfTb30x0nmp8xvULTq0Si6sOXXtjh15dAN2_dGYOnVwVNG-AUZODzsv7tc8Z-SxIA4C012qmAV9YlaCogVyR6g570uTwQTZoEv7AGcOBb-m4cAdQtrwck95vlVW22ERx1q3aqDpDGLuvfLcDCpAnop4NctEdFvG7HmOiL5ZBAlfPbi_ZOa1HD_bnxlzH1--dEFV3_oAs9vcmuSSYSzQ2v5F3CvbR3-4zGav-DWrGtfmEg1BIY0LG8xwKaFdG6Of3-IYkBu_9X-5DxFI0A=w1620-h650-no "Logo Title Text 1")
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
 Rishabh Shukla: [@blurry-x-face](https://github.com/blurry-x-face)
 Lav Joshi: [@lav-joshi](https://github.com/lav-joshi)
 Pathan Moin Khan : [@MightyMoin](https://github.com/MightyMoin)


