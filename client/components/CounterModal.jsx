import React, { useState } from "react";
import "../../styles/styles.css";

export default function CounterModal(props) {
	const [openCounter, setOpenCounter] = useState(false);
	const [count, setCount] = useState(0);
	return (
		<div className="counterContainer">
			{openCounter ? (
				<div className="wrapper">
					<div className="details">
						<button
							onClick={() => setOpenCounter(!openCounter)}
							className="btn btn-danger"
							type="button"
						>
							X
						</button>
						<h5>Learn how to count, you fucking idiot...</h5>
						<button type="button">-</button>
						<h1>{count}</h1>
						<button type="button">+</button>
					</div>
				</div>
			) : (
				<button
					onClick={() => setOpenCounter(!openCounter)}
					className="btn btn-primary"
					type="button"
				>
					Learn How To Count!
				</button>
			)}
		</div>
	);
}
