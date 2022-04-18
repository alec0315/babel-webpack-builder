const express = require("express");

const app = express();
const path = require("path");
// eslint-disable-next-line import/extensions
const query = require("../database/querys.js");

const port = 3050;
// eslint-disable-next-line import/order
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..")));

// app.use('/', (req, res) => {
//   res.render('index.html')
// })

app.get("/getItems", (req, res) => {
	query.get().then(data => {
		res.send(data);
	});
});

app.post("/createItem", (req, res) => {
	query
		.insert(req.body)
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			res.status(404);
			res.end(error);
		});
});

app.delete("/deleteItem", (req, res) => {
	query
		.deleteItem(req.body.value)
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			res.status(404);
			res.end(error);
		});
});

app.put("/updateNotes", (req, res) => {
	query
		.update(req.body.updateBody)
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			res.status(404);
			res.send(error);
		});
});

app.listen(port, () => {});
