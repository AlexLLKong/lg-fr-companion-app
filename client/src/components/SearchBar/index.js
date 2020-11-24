import React from 'react'
import './SearchBar.scss'
import searchImg from './search.png'
const SearchBar = props => {
	return (
		<div className="searchContainer">
			<img src={searchImg} alt="" />
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
