import React from 'react'
import './SearchBar.scss'

const SearchBar = props => {
	return (
		<div className="searchContainer">
			<label htmlFor="search" />
			<input
				type="search"
				placeholder="Search"
				onChange={props.onChangeHandler}
			></input>
		</div>
	)
}
export { SearchBar as default }
