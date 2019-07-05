# 757.OLS.Project-Login-Authentication-users-dashboard
This is a private Project under (NDA) between onelightsystem OLS (LLC) OLS iee.aeo Nazar and Freelancer Jeremy Diaz
the project start it on 757.

Project status:
777.ch1 branch merged and deployed
* General UI
  * Login [comleted**]
  * Registration **
  * 4 different form variations as per your google forms depending on what type of account is being created **
  * Error handling **
* General registration workflow **
* Dashboard home page **

790.CP2 branch request it for merge to the ols.web.admin
* Hook up the auth ui to firebase **
* Hook up the registration forms to firebase db **
* Set up password change and account recovery **

* Flesh out the dashboard as per your specifications
* Dashboard UI hooked up to custom user object. ---Displaying basic user data.

794.ols.web.admin updating the domain 

JD didnt pulled master 794 but continue from 787 without ols.updates794

797. chp2.5 branch merged and deployed by JD with 787.ols.updates version

* Improved mobile UI**
> * Improved menu item rendering
> * Improved routing
> * Improved OLS firebase API (including fixes to fetch user data without breaking auth)
> * Added profile page that allows users to update their application status.* //!!comment from ols.web.admin //!! when user registering this is their right to see their data what been subbmited on domain and updating it after


797ols.cto.web.admin indicated it  authentication [error] the user can login to the dashboard without verifyied email [spam risk]

798.ols.web.admin request for branch 2.5 to be pushed to the master branch
800. [verification issues fixed] on chp2.5 pushed, merged and dekpoyed by JD

801. ols.web.admin pulled origin master and began testing on local server 
wile ready to push to the master, the chp2.5 improved branch  with restored 794.ols.updates version was pushed to the master - merged and delpoyed [not recommennded with out pre-request to merge and deploy] //!! to prevent other main branch progress //!!

* Added the ability for users to resend their verification emails if needed 
  * Will need to try to log in and click that option through the dialog box
  * Can not make box asking for gmail due to firebase needed a user object
    authenticated to start an email verification request
* Fixed merge conflicts between checkpoint2.5 branch and master
  * Now OLS updates are visible on the dashboard
* Improved UI for registration and password reset pages
  * Now there is a floating button where users can go back
* Added error messages on failed login attempts
  * Will appear as a dialog modal
  
 
 801. ols.web.admin pulled origin master and began testing on local server , adding fields on the register page met the chalange to improve the registration to the user profile page 




