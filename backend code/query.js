// NPM Library Inclusions!
const mysql = require('mysql'); // To make MySQL Connections : 
const { makeDb } = require('mysql-async-simple'); // Lib to solve the async issues with MySql : https://github.com/hashgit/mysql-async-simple
const express = require('express'); // To do different things depending on where the user visits : https://www.npmjs.com/p
ackage/express
const cors = require('cors');
const dotenv = require('dotenv'); // Needed to use an .env file for MySQL!
dotenv.config()
const app = express();
const PORT = 8080; // Localhost Port 3000
// NOTE: In order to parsing of JSON to work, Content-Type: application/json must be set in the POST request.
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.post('/', async function (req, res) { // For HTTP POST Requests:
        // Must be asychronus, otherwise it'll be too fast for the mysqlwork() function and just return a "Promise"
        var mysqlresponse = await mysqlwork(req.body.user, req.body.password); // Set the value of the "mysqlresponse" variable once mysqlwork() function completes! (await)
        console.log(mysqlresponse);
        await res.send(mysqlresponse); // Send the mysqlresponse value.
});
app.get('/', (req, res) => {
        res.send('Please HTTP POST JSON: {"user":"username","password":"password"} and ensure you are using Content-Type: application/json')
})
async function mysqlwork(user, password) { // Must by asynchronous, otherwise the function returns before the query is complete! 
        // MySQL Setup
        const con = mysql.createConnection({host: 'localhost', user: 'root', password: '9PD5uKkSkA3HgvXy', database: "users"});
        var querystring = "SELECT * FROM people WHERE name = '" + user + "' AND password = '" + password + "'";
        const db = makeDb();
        await db.connect(con);
        try {
                var result = await db.query(con, querystring);
        }
        catch(e){ // Invalid SQL Syntax Error happens here!
                return "NICE TRY, HACKER! (Hint:  bob' OR 1=1#  in the User Field!)"
        }
        finally {
                await db.close(con);
        }
        try{ // TODO: Support multiple entries so that we can print all values maybe?
                if (typeof result[0].name !== 'undefined' && typeof result[0].name !== 'undefined'){
                        return "User: " + user  + " logged in with Password: " + password +  ".\n" + querystring;
                }
        }
        catch(e){
                return "Username or Password is Incorrect!\n" + querystring;
        }
}
app.listen(PORT, () => {
  console.log('listening on: ' + PORT);
})
