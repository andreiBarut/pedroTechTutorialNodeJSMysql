const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // we need to do this otherwise we will get undefined
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "password",
	database: "employeesystem",
});

app.get("/employees", (req, res) => {
	db.query("SELECT * FROM employees", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post("/create", (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	const gender = req.body.age;
	const country = req.body.country;
	const position = req.body.position;
	const wage = req.body.wage;

	db.query(
		"INSERT INTO employees (employeeName, employeeAge, employeeGender, employeeCountry, employeePosition, employeeWage) VALUES (?,?,?,?,?,?)",
		[name, age, gender, country, position, wage],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values Inserted"); // we send a message to our request so we know that it worked
			}
		}
	);
});

app.put("/update", (req, res) => {
	const id = req.body.id;
	const wage = req.body.wage;
	db.query(
		"UPDATE employees SET employeeWage = ? WHERE employeeID = ?",
		[wage, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM employees WHERE employeeID = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	}); // if it's only one question mark, we don't have to pass it as an array
});

app.listen(3001, () => {
	console.log("Yey, your server is running on port 3001");
});
