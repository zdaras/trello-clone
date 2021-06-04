import React from 'react';

export const ReceiveIcon = (props: { [key: string]: any }) => (
	<svg
		{...props}
		className="custom"
		xmlns="http://www.w3.org/2000/svg"
		width="21.695"
		height="21.695"
		viewBox="0 0 21.695 21.695"
	>
		<path className="icon-background" d="M21.7,21.695H0V0H21.7Z" fill="transparent" />
		<path
			className="second-path"
			d="M4.8,18.378H17.406a1.8,1.8,0,0,0,1.8-1.8V5.8a1.8,1.8,0,0,0-1.8-1.8h-2.7a.9.9,0,1,0,0,1.8h2.7v9.89H4.8V5.8H7.5A.9.9,0,1,0,7.5,4H4.8A1.8,1.8,0,0,0,3,5.8V16.581A1.8,1.8,0,0,0,4.8,18.378Zm6.618-5.706,2.512-2.507a.45.45,0,0,0-.315-.773H12V4.9a.9.9,0,0,0-1.8,0V9.392H8.592a.445.445,0,0,0-.315.764l2.512,2.507a.444.444,0,0,0,.63.009Z"
			transform="translate(-0.256 -0.384)"
		/>
	</svg>
);

export default ReceiveIcon;
