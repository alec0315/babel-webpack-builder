import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/styles.css";

export default function IntakeForm(props) {
	const initialState = {
		taskType: "",
		taskName: "",
		summary: "",
	};

	const [newTask, setNewTask] = useState(initialState);
	const [newTaskOpen, setNewTaskOpen] = useState(false);

	const openTaskButton = event => {
		event.preventDefault();
		setNewTaskOpen(!newTaskOpen);
	};

	const handleChange = event => {
		setNewTask(prevState => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = event => {
		event.preventDefault();

		const newBody = newTask;
		setNewTask(initialState);
		axios
			.post("/createItem", newBody)
			.then(data => {
				props.updateList();
				toast("Item Added!");
			})
			.catch(error => {
				res.send(error);
			});
		setNewTaskOpen(!newTaskOpen);
	};

	return (
		<div className="intakeFormWrapper">
			<ToastContainer />
			{newTaskOpen ? (
				<div className="form-group">
					<button
						className="btn btn-danger"
						onClick={openTaskButton}
						type="button"
					>
						X
					</button>
					<h5>Add a Task or Goal:</h5>
					<form onSubmit={handleSubmit}>
						<div className="col">
							<label>
								Task:
								<input
									name="taskName"
									type="text"
									className="form-control"
									value={newTask.taskName}
									onChange={e => handleChange(e)}
								/>
							</label>
						</div>
						<div className="col">
							<label>
								Description:
								<input
									name="summary"
									type="text"
									className="form-control"
									value={newTask.summary}
									onChange={e => handleChange(e)}
								/>
							</label>
						</div>

						<label>
							Goal or Task?
							<select
								name="taskType"
								value={newTask.taskType}
								onChange={e => handleChange(e)}
							>
								<option value={null}>Select</option>
								<option value="goal">Goal</option>
								<option value="task">Task</option>
							</select>
						</label>

						<input
							className="btn btn-success"
							type="submit"
							value="Submit"
						/>
					</form>
				</div>
			) : (
				<button
					className="btn btn-success"
					type="button"
					onClick={openTaskButton}
				>
					Add a Task!
				</button>
			)}
		</div>
	);
}
