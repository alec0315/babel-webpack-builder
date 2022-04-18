const mysql = require("mysql");
const bluebird = require("bluebird");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "zorba_todo",
});

connection.connect();

const pq = bluebird.promisify(connection.query).bind(connection);

const get = () => pq("SELECT * from tasks");

const insert = reqbody =>
	pq("INSERT INTO tasks (taskType, taskName, summary) VALUES (?, ?, ?)", [
		reqbody.taskType,
		reqbody.taskName,
		reqbody.summary,
	]);

const deleteItem = reqbody => pq("DELETE FROM tasks WHERE id = ?", [reqbody]);

const update = updateBody =>
	pq("UPDATE tasks SET summary = ? WHERE id = ?", [
		updateBody.updateNotes,
		updateBody.updateId,
	]);

module.exports.update = update;
module.exports.get = get;
module.exports.insert = insert;
module.exports.deleteItem = deleteItem;
