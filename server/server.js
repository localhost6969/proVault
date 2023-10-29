const express = require("express");
const app = express();
const { automateFile } = require("./automate");
const cron = require("node-cron");

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/interval/:interval", (req, res) => {
	try {
		const { interval } = req.params;
		const { address } = req.query;
		console.log("Request got in");
		cron.schedule(`*/${interval} * * * * *`, () => {
			automateFile();
			console.log(`running a task every ${interval} seconds`);
		});
	} catch (err) {
		console.error(err);
	}
});

app.get("/run", (req, res) => {
	try {
		automateFile();
	} catch (err) {
		console.errro(err);
	}
});

app.get("/stopInterval", (req, res) => {
	console.log("Cron job stopped");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
