import React from 'react';

export const CheckIcon = ({ ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		className="custom checkmark"
		{...props}
	>
		<path className="icon-background" d="M0 0h24v24H0z" fill="transparent" />
		<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#4CAF50" />
	</svg>
);

export default CheckIcon;
