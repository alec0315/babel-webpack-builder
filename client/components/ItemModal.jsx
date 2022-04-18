import React, { useState } from "react";
import "../../styles/styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function itemModal(props) {
	const [updateNotes, setUpdateNotes] = useState("");

	const handleNoteChange = event => {
		setUpdateNotes(event.target.value);
	};

	const updateItem = event => {
		const updateBody = {
			updateNotes,
			updateId: props.currentItem.id,
		};
		props.handleCurrentUpdate(updateNotes);

		console.log(updateBody);
		axios
			.put("/updateNotes", { updateBody })
			.then(data => {
				console.log("this is the update", data.data);
				props.updateList();
				toast("Item Updated");
			})
			.catch(error => {
				console.log("there was an error updating notes", error);
			});
		event.preventDefault();
	};

	const deleteItem = (e, value) => {
		e.preventDefault();
		axios.delete("/deleteItem", { data: { value } }).then(res => {
			toast(`Item Deleted!`);
			props.updateList();
		});
		props.closeItem();
	};

	return (
		<div className="wrapper">
			<div className="details">
				<button type="button" onClick={props.closeItem}>
					X
				</button>
				<ToastContainer />
				<div>
					<h2>{props.currentItem.taskName}</h2>
					<h5>{props.currentItem.summary}</h5>

					<form onSubmit={updateItem}>
						<label>
							Update Notes:
							<input
								type="text"
								name="name"
								value={updateNotes}
								onChange={handleNoteChange}
							/>
						</label>
						<input type="submit" value="Submit" />
					</form>
				</div>

				<button
					onClick={event => {
						deleteItem(event, props.currentItem.id);
					}}
					type="button"
					className="btn btn-danger"
				>
					Delete Item
				</button>
			</div>
		</div>
	);
}
