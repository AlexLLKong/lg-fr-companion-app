import React, { useEffect, useState } from 'react'
import Button from '@bit/alexllkong.kong.button'
import './Card.scss'
/**
 * @param {string} title - The card's title
 * @param {string} image - The card's image
 * @param {Object[]} tags - Tags pertaining to the card
 * @param {string} tags[].text - The text of the tag
 * @param {string} tags[].type - String corresponding to some color
 * @param {Object[]} buttonActions - Functions that will attach to buttons
 * @param {string} buttonActions.name - The button text
 * @param {Function} buttonActions.function - The function that will be called onClick
 *  */
const Card = ({ title, image, id, tags, buttonActions }) => {
	let [isImageLoaded, setIsImageLoaded] = useState(false)
	let [cardTransition, setCardTransition] = useState('')
	useEffect(() => {
		setCardTransition('cardTransition')
	}, [isImageLoaded])
	return (
		<div className={`transitionElement`}>
			<div className={`cardContainer ${cardTransition}`}>
				<div className="cardFront">
					<img
						src={image}
						alt={`${title}`}
						onLoad={() => {
							if (!isImageLoaded) setIsImageLoaded(true)
						}}
					/>
					<div>
						<h1>{title}</h1>
						<span>{'#' + id}</span>
						<div>
							{tags.map(tag => (
								<h5
									key={tag.text}
									className={`type-${tag.type}`}
								>
									{tag.text}
								</h5>
							))}
						</div>
						<div>
							{buttonActions.map(action => (
								<Button
									key={action.name}
									className="btn-primary"
									onClick={action.function}
								>
									{action.name}
								</Button>
							))}
						</div>
					</div>
				</div>
				<div className="cardBack"></div>
			</div>
		</div>
	)
}

export { Card as default }
