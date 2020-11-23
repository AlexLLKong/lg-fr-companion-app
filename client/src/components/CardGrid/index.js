import React from 'react'
import './CardGrid.scss'
const CardGrid = props => {
	return <div className="gridContainer">{[...props.children]}</div>
}

export { CardGrid as default }
