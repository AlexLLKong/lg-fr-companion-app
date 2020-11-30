import React, { useState, useEffect } from 'react'
import styles from './MatchupSection.module.scss'
const MatchupSection = ({ type, typeMatchups }) => {
	let [collapsed, setCollapsed] = useState(true)
	let [collapseClass, setCollapseClass] = useState(styles.collapsed)
	useEffect(() => {
		collapsed ? setCollapseClass(styles.collapsed) : setCollapseClass('')
	}, [collapsed, setCollapseClass])
	return (
		<React.Fragment>
			<h4
				className={`background-${type}`}
				onClick={() => setCollapsed(!collapsed)}
			>
				{type}
			</h4>
			<div className={`${styles.typeMatchup} ${collapseClass}`}>
				{typeMatchups[type].map(x => (
					<div
						className={`${styles.teamMatchups}`}
						key={`${type} ${x.name} matchup`}
					>
						<img
							src={x.img}
							alt={x.name}
							className={`${styles.matchupIcon}`}
						/>
						<p className={`${styles.matchup}`}>{x.matchup}x</p>
					</div>
				))}
			</div>
		</React.Fragment>
	)
}
export { MatchupSection as default }
