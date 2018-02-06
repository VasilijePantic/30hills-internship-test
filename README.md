# 30hills-internship-test

30hills-internship-test is an app made in Express.js. It uses a MongoDB database to store information.

For You to be able to see logics behind a database, a function called populateDB() in /db/index.js will read data.json file.
It will parse the file,loop through it and will create a User with all the parameters from data.json file.
Also, there is another funcion in /db/index.js which will check if the DB is empty. If not,it will populate the DB with populateDB() function.
This function will also be called when the app starts to make sure that the DB is ready and full.

When you start the app, it will take you to a Search page with a form. In the input field, You can type User's ID (1-20) and look for a result with 2 buttons.


Direct firends results - 1st button.
By clicking this button(if you already typed in ID number of a certain user), You will get all of that User's direct friends and all the information about them from the DB. Depending on the User chosen in the begining, You may get one or a few direct friends in that list.
/results page will be rendered but the route will be /friends.


Friends of friends results - 2nd button.
By clicking this button, You will be able to see all friends of the User's friends without mutual ones and without the User itself. As with Direct friends results, Friends of friends will be displayed in a list.
To make sure that the final list does not contain mutual friends and the User itself,list are being filtered and compared using _.difference and _.uniq methods.
/results page will be rendered again but the route will be /friends-of-friends.

This app serves as a solution to a 30Hills Spring Internship test.


