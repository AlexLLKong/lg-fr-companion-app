import React from 'react'
import './Card.scss'
/**
 * @param {string} title - The card's title
 * @param {string} image - The card's image
 * @param {Object[]} tags - Tags pertaining to the card
 * @param {string} tags[].text - The text of the tag
 * @param {string} tags[].bgColor - The background color of the tag
 * @param {string} tags[].color - The text color of the tag
 * @param {Object[]} buttonActions - Functions that will attach to buttons
 * @param {string} buttonActions.name - The button text
 * @param {Function} buttonActions.function - The function that will be called onClick
 *  */
const Card = ({ title, image, id, tags, buttonActions }) => {
	return (
		<div className="cardContainer">
			<img src={image} alt={`${title}`} />
			<div>
				<h1>{title}</h1>
				<span>{'#' + id}</span>
				<div>
					{tags.map(tag => (
						<h5
							key={tag.text}
							style={{
								background: tag.bgColor,
								color: tag.color,
							}}
						>
							{tag.text}
						</h5>
					))}
				</div>
				<div>
					{buttonActions.map(action => (
						<button key={action.name} onClick={action.function}>
							{action.name}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export { Card as default }
