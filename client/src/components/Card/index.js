import React, { useEffect, useState } from 'react'
import Button from '@bit/alexllkong.kong.button'
import './Card.scss'
/**
 * @param {string} title - The card's title
 * @param {string} image - The card's image
 * @param {Object[]} tags - Tags pertaining to the card
 * @param {string} tags[].text - The text of the tag
 * @param {string} tags[].type - String corresponding to some color
 * @param {Function[]} buttonActions - Functions that will attach to buttons
 * @param {Array} info - Array where each index is an array of info category items
 *  */
const Card = ({ title, image, id, tags, buttonActions, info }) => {
	let [isImageLoaded, setIsImageLoaded] = useState(false)
	let [isMoreInfo, setIsMoreInfo] = useState(false)
	let [cardTransition, setCardTransition] = useState('')
	let [moreInfo, setMoreInfo] = useState('cardFront')
	useEffect(() => {
		if (isImageLoaded) setCardTransition('cardTransition')
	}, [isImageLoaded])
	useEffect(() => {
		isMoreInfo ? setMoreInfo('cardMoreInfo') : setMoreInfo('')
	}, [isMoreInfo])
	return (
		<div className={`transitionElement`}>
			<div className={`cardContainer  ${cardTransition}`}>
				<div
					className={`cardFront ${moreInfo} bg-grad-${tags[0].type}`}
				>
					<img
						src={image}
						alt={`${title}`}
						onLoad={() => {
							if (!isImageLoaded) setIsImageLoaded(true)
						}}
					/>
					<div className="cardInfo">
						<div className="basicInfo">
							<h1>{title}</h1>
							<span>{'#' + id}</span>
							<div className="types">
								{tags.map(tag => (
									<h5
										key={tag.text}
										className={`border-color-${tag.type}`}
									>
										{tag.text}
									</h5>
								))}
							</div>
						</div>
						<div className="moreInfo">
							<p>{info[0]}</p>
							<div className="abilities">
								<h3>Abilities</h3>
								{info[1].map(ability => (
									<React.Fragment
										key={ability.name + ' container'}
									>
										<h4 key={ability.name}>
											{ability.name}
										</h4>
										{ability.isHidden ? (
											<h5>hidden</h5>
										) : null}
										<p key={ability.name + ' description'}>
											{ability.description}
										</p>
									</React.Fragment>
								))}
							</div>
						</div>
						<div className="buttons">
							<Button
								className="btn-secondary"
								onClick={() => {
									setIsMoreInfo(!isMoreInfo)
								}}
							>
								More info
							</Button>
							<Button
								className="btn-primary"
								onClick={() => {
									buttonActions[0]()
								}}
							>
								Add to team
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Card as default }
