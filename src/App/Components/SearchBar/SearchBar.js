import { Button, Paper, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const SearchBar = ({ label, fullWidth, value, onChange, onClear }) => {
	return (
		<>
			<Paper
				style={{
					display: 'flex',
					flexDirection: 'row'
				}}>
				<Button disabled>
					<SearchIcon />
				</Button>
				<TextField
					value={value}
					onChange={onChange}
					label={label}
					fullWidth={fullWidth}
				/>
				{!value ? null : (
					<Button onClick={onClear} color='primary' variant='text'>
						<CloseIcon />
					</Button>
				)}
			</Paper>
		</>
	);
};

export default SearchBar;
