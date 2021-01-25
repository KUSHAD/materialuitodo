import { Paper, TextField } from '@material-ui/core';
import React from 'react';

const SearchBar = ({
	label,
	fullWidth,
	uiAfterInputField,
	value,
	onChange,
	uiBeforeInputField,
}) => {
	return (
		<>
			<Paper
				style={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				{uiBeforeInputField}
				<TextField
					value={value}
					onChange={onChange}
					label={label}
					fullWidth={fullWidth}
				/>
				{uiAfterInputField}
			</Paper>
		</>
	);
};

export default SearchBar;
