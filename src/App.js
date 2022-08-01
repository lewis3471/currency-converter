import { useEffect, useState } from "react";
import Axios from "axios";

import "./App.css";

import Select from "react-select";

function App() {
	const optionsss = [
		{ value: "usd", label: "usd" },
		{ value: "eur", label: "eur" },
		{ value: "jpy", label: "jpy" },
	];
	// Initializing all the state variables
	const [info, setInfo] = useState([]);
	const [input, setInput] = useState(0);
	const [from, setFrom] = useState("usd");
	const [to, setTo] = useState("eur");
	const [options, setOptions] = useState([]);
	const [output, setOutput] = useState(0);

	// Calling the api whenever the dependency changes
	useEffect(() => {
		Axios.get(
			`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
		).then((res) => {
			setInfo(res.data[from]);
		});
	}, [from]);

	// Calling the convert function whenever
	// a user switches the currency
	useEffect(() => {
		setOptions(Object.keys(info));
		convert();
	}, [info]);

	// Function to convert the currency
	function convert() {
		var rate = info[to];
		setOutput(input * rate);
	}

	function validateField(value) {
		var numberlValid = value.match(/^[0-9]+(\.[0-9]{1,2})?$/i);
		if (numberlValid) {
			setInput(value);
		}
	}

	return (
		<div className="App">
			<div className="heading">
				<h1>Currency converter</h1>
			</div>
			<div className="container">
				<div className="left">
					<h3>Amount</h3>
					<input className="amountInput"
						type="number"
						placeholder="Enter the amount"
						onChange={(e) => validateField(e.target.value)}
					/>
				</div>
				<div className="middle">
					<h3>From</h3>

					<Select
						value={from.value}
						placeholder="From"
						onChange={(e) => {
							setFrom(e.value);
						}}
						options={optionsss}
					/>
				</div>

				<div className="right">
					<h3>To</h3>

					<Select
						value={from.value}
						placeholder="To"
						onChange={(e) => {
							setTo(e.value);
						}}
						options={optionsss}
					/>
				</div>
			</div>
			<div className="result">
				<button className="convertBtn"
					onClick={() => {
						convert();
					}}
				>
					Convert
				</button>
				<h2>Converted Amount:</h2>
				<p>
					{input + " " + from + " = " + output.toFixed(2) + " " + to}
				</p>
			</div>
		</div>
	);
}

export default App;
