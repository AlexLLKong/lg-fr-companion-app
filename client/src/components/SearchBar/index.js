import React from 'react'
import './SearchBar.scss'
import searchImg from './search.png'
const SearchBar = props => {
	return (
		<div className="searchContainer">
			<img className="searchIcon" src={searchImg} alt="" />
			<label htmlFor="search" />
			<input
				className="searchInput"
				type="search"
				placeholder="Search"
				onChange={props.onChangeHandler}
			></input>
		</div>
	)
}
export { SearchBar as default }
