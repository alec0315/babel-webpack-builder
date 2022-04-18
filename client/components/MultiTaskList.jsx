import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/styles.css";

export default function MultiTaskList(props) {
	const initialState = {
		taskType: "",
		taskName: "",
		summary: "",
	};

	const [multiTaskOpen, setMultiTaskOpen] = useState(false);
	const [multiTaskList, setMultiTaskList] = useState([]);
	const [currentInputValue, setCurrentInputValue] = useState("");

	const handleChange = event => {
		setCurrentInputValue(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		setMultiTaskList(prevState => [...prevState, currentInputValue]);
		setCurrentInputValue("");
		console.log("the submit as a button works!", multiTaskList);
	};

	const deleteTask = task => {
		console.log("this is the task", task);
		setMultiTaskList(multiTaskList.filter(newArray => newArray !== task));
	};

	return (
		<div className="multiTaskContainer">
			{multiTaskOpen ? (
				<div className="wrapper">
					<div className="details">
						<button
							onClick={() => setMultiTaskOpen(!multiTaskOpen)}
							className="btn btn-danger"
							type="button"
						>
							X
						</button>
						<h2>Add Multiple Tasks To Your List:</h2>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Task:</label>
								<input
									className="form-control"
									type="text"
									name="name"
									value={currentInputValue}
									onChange={handleChange}
								/>
								<small
									id="help"
									className="form-text text-muted"
								>
									Add as many tasks as you'd like to this
									list:
								</small>
							</div>
							<button type="submit" className="btn btn-primary">
								{" "}
								Add!
							</button>
						</form>

						<table className="table">
							<thead>
								<tr>
									<th scope="col">Tasks:</th>
								</tr>
							</thead>
							<tbody>
								{multiTaskList.map(task => (
									<tr
										onClick={event => {
											deleteTask(task);
										}}
									>
										<td>{task}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<button
					onClick={() => setMultiTaskOpen(!multiTaskOpen)}
					className="btn btn-success"
					type="button"
				>
					Add Multiple Tasks!
				</button>
			)}
		</div>
	);
}
