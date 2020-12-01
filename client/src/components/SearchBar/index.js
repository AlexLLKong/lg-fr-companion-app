import React from 'react'
import './SearchBar.scss'

const SearchBar = props => {
	return (
		<div className="searchContainer">
			<label htmlFor="search" />
			<input
				type="search"
				placeholder="Search by name or use a search term like type: fire, see About page for more"
				onChange={props.onChangeHandler}
			></input>
		</div>
	)
}
export { SearchBar as default }
