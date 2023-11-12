import React from 'react';

const Button = ({
	name,
	onClick
}:{
	name: string, 
	onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
	return (
		<button onClick={onClick}>{name}</button>
	);
};

export default Button;