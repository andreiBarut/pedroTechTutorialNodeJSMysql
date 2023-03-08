import { useState } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import "./App.css";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState("");
	const [country, setCountry] = useState("");
	const [position, setPosition] = useState("");
	const [wage, setWage] = useState(0);
	const [newWage, setNewWage] = useState(0);
	const [employeeList, setEmployeeList] = useState([]);
	const [render, setRender] = useState(false);

	const addEmployee = () => {
		console.log(name);
		axios
			.post("http://localhost:3001/create", {
				name: name,
				age: age,
				gender: gender,
				country: country,
				position: position,
				wage: wage,
			})
			.then(() => {
				setEmployeeList([
					...employeeList,
					{
						name: name,
						age: age,
						gender: gender,
						country: country,
						position: position,
						wage: wage,
					},
				]);
				setRender(true);
			})
			.catch((err) => console.log(err));
	};

	const updateEmployee = (id) => {
		// we get this id when we map through the read data, then we pass it to the button "update" which puts our data (which is wage) to the row with the current id
		axios
			.put("http://localhost:3001/update", { wage: newWage, id: id })
			.then((response) => {
				setEmployeeList(
					employeeList.map((val) => {
						return val.employeeID == id
							? {
									id: val.employeeID,
									name: val.employeeName,
									age: val.employeeAge,
									country: val.employeeCountry,
									position: val.employeePosition,
									wage: newWage,
							  }
							: val;
					})
				);
			});
	};

	const getEmployees = () => {
		axios
			.get("http://localhost:3001/employees")
			.then((response) => {
				console.log(response);
				setEmployeeList(response.data);
			})
			.catch((err) => console.log(err));
	};

	const deleteEmployee = (id) => {
		axios
			.delete(`http://localhost:3001/delete/${id}`)
			.then(() => {
				alert(`Person Deleted!`);
				setEmployeeList(
					employeeList.filter((val) => {
						return val.id != id;
					})
				);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="App">
			<div className="app-form-container">
				<label>Name</label>
				<input
					type="text"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<label>Age</label>
				<input
					type="number"
					onChange={(e) => {
						setAge(e.target.value);
					}}
				/>
				<label>Gender</label>
				<input
					type="text"
					onChange={(e) => {
						setGender(e.target.value);
					}}
				/>
				<label>Country</label>
				<input
					type="text"
					onChange={(e) => {
						setCountry(e.target.value);
					}}
				/>
				<label>Position</label>
				<input
					type="text"
					onChange={(e) => {
						setPosition(e.target.value);
					}}
				/>
				<label>Wage(year)</label>
				<input
					type="number"
					onChange={(e) => {
						setWage(e.target.value);
					}}
				/>
				<button className="app-form-add-button" onClick={addEmployee}>
					Add Employee
				</button>
			</div>
			<hr></hr>
			<div
				style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
			>
				<button className="app-form-show-button" onClick={getEmployees}>
					Show Employees
				</button>
			</div>
			<ul
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "1.2rem",
					gap: "1rem",
					marginTop: "1rem",
					listStyleType: "none",
				}}
			>
				{employeeList.map((item) => (
					<li
						key={"li " + item.employeeID}
						style={{
							border: "1px solid black",
							width: "90vw",
							fontFamily: "courier New",
						}}
					>
						<p>ID : {item.employeeID}</p>
						<p>Name : {item.employeeName}</p>
						<p>Age : {item.employeeAge}</p>
						<p>Gender : {item.employeeGender}</p>
						<p>Country : {item.employeeCountry}</p>
						<p>Position : {item.employeePosition}</p>
						<p>Wage : {item.employeeWage}</p>
						<div>
							<input
								type="text"
								placeholder="20000"
								onChange={(e) => {
									setNewWage(e.target.value);
								}}
							/>
							<button onClick={() => updateEmployee(item.employeeID)}>Update</button>
							<button onClick={() => deleteEmployee(item.employeeID)}>Delete</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
