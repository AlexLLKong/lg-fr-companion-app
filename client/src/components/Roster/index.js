import React, { useEffect, useState } from 'react'
import styles from './Roster.module.scss'
const Roster = ({ team, setSelected }) => {
	let [highlightMember, setHighlightMember] = useState(team.map(member => ''))
	let [memberLoaded, setMemberLoaded] = useState(team.map(member => ''))
	useEffect(() => {
		console.log(memberLoaded)
		if (
			memberLoaded.filter(mem => mem === 'loaded').length ===
			memberLoaded.length
		) {
			setMemberLoaded(memberLoaded.map(mem => styles.showTransition))
			console.log(memberLoaded)
		}
	}, [memberLoaded])
	return (
		<div className={styles.memberContainer}>
			{team.map((member, i) => {
				return (
					<div
						key={`${member.name} rosterId: ${member.rosterId}`}
						className={`${styles.member} bg-grad-${member.types[0].type.name} ${highlightMember[i]} ${memberLoaded[i]}`}
						onClick={() => {
							setSelected(prevSelected =>
								prevSelected === member.name ? '' : member.name
							)
							setHighlightMember(prevHighlight => {
								const indexPrev = prevHighlight.indexOf(
									styles.highlightMember
								)
								return indexPrev === i
									? [...highlightMember.map(member => '')]
									: [
											...highlightMember.map(
												(member, j) =>
													i === j
														? styles.highlightMember
														: ''
											),
									  ]
							})
						}}
					>
						<img
							src={member.sprites.front_default}
							alt={member.name}
							onLoad={() => {
								setMemberLoaded(() => {
									return [
										...memberLoaded.map((member, j) =>
											i === j ? 'loaded' : member
										),
									]
								})
							}}
						/>
					</div>
				)
			})}
		</div>
	)
}
export { Roster as default }
