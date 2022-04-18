import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line import/extensions
import IntakeForm from "./IntakeForm.jsx";
// eslint-disable-next-line import/extensions
import TaskList from "./TaskList.jsx";
// eslint-disable-next-line import/extensions
import MultiTaskList from "./MultiTaskList.jsx";
// eslint-disable-next-line import/extensions
import CounterModal from "./CounterModal.jsx";
import "../../styles/styles.css";

export default function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		axios.get("/getItems").then(res => {
			setTasks(res.data);
		});
	}, []);

	const updateList = () => {
		axios.get("/getItems").then(res => {
			setTasks(res.data);
		});
	};

	return (
		<div>
			<div className="headerWrapper">
				<h1>To-Do List</h1>
			</div>
			<CounterModal />
			<IntakeForm updateList={updateList} />
			<TaskList listGoals={tasks} updateList={updateList} />
			<MultiTaskList />
		</div>
	);
}
