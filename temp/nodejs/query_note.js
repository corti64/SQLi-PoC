// NPM Library Inclusions!   
    // |also,,,|NPM =  Node Package Manager......This is all This is all server side code, NOT OUR FRONT END CODE
const mysql = require('mysql'); // To make MySQL Connections : 
const { makeDb } = require('mysql-async-simple'); // Lib to solve the async issues with MySql : https://github.com/hashgit/mysql-async-simple
const express = require('express'); // To do different things depending on where the user visits : https://www.npmjs.com/package/express

const app = express(); //this is just setting the express so everytime we just have to type "app"
const PORT=80; //the application needs an open network port so it can receive SQL requests, we have it set as Port 80 for now. But it doesnt matter which one we just need a port that can receive requests.   Also, anywhere you see 'PORT' in the code, it actually means that number which is '80' for now. Last line in code has it listening.

// NOTE: In order to parsing of JSON to work, Content-Type: application/json must be set in the POST request.
app.use(express.urlencoded({
        extended: true
  })
);

app.use(express.json());

app.post('/', async function (req, res) { // For HTTP POST Requests:

        // Must be asychronus, otherwise it'll be too fast for the mysqlwork() function and just return a "Promise"
        var mysqlresponse = await mysqlwork(req.body.user, req.body.password); // Set the value of the "mysqlresponse" variable once mysqlwork() function completes! (await)
        console.log(mysqlresponse);
        await res.send(mysqlresponse); // Send the mysqlresponse value.

});

app.get('/', (req, res) => { // Error Message for HTTP GET Requests
          res.send('Please HTTP POST JSON: {"user":"username","password":"password"} and ensure you are using Content-Type: application/json')
})

async function mysqlwork(user, password) { // Must by asynchronous, otherwise the function returns before the query is complete! 

        // MySQL Setup
        const con = mysql.createConnection({host: "localhost", user: "root", password: "MF1AiPELlmXu", database: "users"}); //when you call this string it makes a database connection
        var querystring = "SELECT * FROM people WHERE name = '" + user + "' AND password = '" + password + "'";
        const db = makeDb(); //this is a function for setting up an asynchronous database connection so we finish the query and then return the value before moving on
        await db.connect(con); //this means we're going to await making a database connection, and DONT do anything else until that connection is made.

        try { 
                var result = await db.query(con, querystring);//the 'result' is the value we pull out of the database, it's the returned query. So we try that first. If the SQL syntax is invalid, then it's going to catch an exception which is the NEXT PIECE BELOW.
        }
        catch(e){ //the (e) is a specific error catching syntax in JavaScript. So, if it's invalid SQL syntax or request, it will return this error!
                return "NICE TRY HACKER! (Try to put:  bob' OR 1=1#  into the User Field!)"
        }
        finally { //'finaly' means once one or both of those things are done, we close the database connection. And when I say "those things" I mean, We connect to the database once the function is called, do the work, and then get out of the database
                await db.close(con);
        }

        try{ // TODO: Support multiple entries so that we can print all values maybe?
                return "User: " + result[0].name + " logged in with Password: " + result[0].password +  ".\n" + querystring; //after the database connection is closed,  we wanna say the username result and passworrd. and if these thigns worked, there will be values returned in the application  (e.g., this node.js code is an app that communicates with the MySQL server and the Front End). If the 'result', 'name' and 'password' dont exist then we will catch(e) then we will move down to the next block, which returns  "Username or Password is Incorrect!\ 
     
        }
        catch(e){
                return "Username or Password is Incorrect!\n" + querystring;            //return means we get the output of the function and the "Username..Incorrect!" string. The output is getting saved into the  MySQL response variable. The STrings make the results easy to grab
        } //NOW, we go back up to the completed function 'mysqlresponse' at the top. 1 of the above 3 return values above gets saved into that variable  (e.g,, 1. syntax error. 2. valid or 3. invalid  )

}

app.listen(PORT, () => {
  console.log('listening on: ' + PORT);
})