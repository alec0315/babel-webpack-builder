import React, { useState } from "react";
// eslint-disable-next-line import/extensions
import ItemModal from "./ItemModal.jsx";

export default function GoalList(props) {
	const [currentGoal, setCurrentGoal] = useState("");
	const [toggleOpen, setToggleOpen] = useState(false);

	const handleUpdateCurrent = goal => {
		setCurrentGoal(prevState => ({
			...prevState,
			summary: goal,
		}));
	};

	const openItem = (e, goal) => {
		e.preventDefault();
		setToggleOpen(!toggleOpen);
		setCurrentGoal(goal);
	};

	const closeItem = e => {
		setToggleOpen(!toggleOpen);
		e.preventDefault();
	};

	return (
		<>
			<div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Goals</th>
						</tr>
					</thead>
					<tbody>
						{props.listGoals.map(task => {
							if (task.taskType === "goal") {
								return (
									<tr
										onClick={event => {
											openItem(event, task);
										}}
									>
										<td>{task.taskName}</td>
									</tr>
								);
							}
						})}
					</tbody>
				</table>
			</div>
			<div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Upcoming Tasks</th>
						</tr>
					</thead>
					<tbody>
						{props.listGoals.map(task => {
							if (task.taskType === "task") {
								return (
									<tr
										onClick={event => {
											openItem(event, task);
										}}
									>
										<td>{task.taskName}</td>
									</tr>
								);
							}
						})}
					</tbody>
				</table>
			</div>
			{toggleOpen ? (
				<ItemModal
					currentItem={currentGoal}
					closeItem={closeItem}
					updateList={props.updateList}
					handleCurrentUpdate={handleUpdateCurrent}
				/>
			) : (
				// eslint-disable-next-line react/jsx-no-useless-fragment
				<></>
			)}
		</>
	);
}
