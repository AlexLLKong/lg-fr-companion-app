import React, { useEffect, useState } from 'react'
import { POKEMON_TYPES } from '../../actions/types'
import MatchupSection from '../MatchupSection'
import styles from './TeamPanel.module.scss'
const TeamPanel = ({ teamInfo, types, typeChart }) => {
	const calculateDefenseMatchupsAll = (types, typeChart) => {
		const calculateMatchup = (def, att, typeChart) => {
			return def.reduce((total, curr) => {
				return (total *= typeChart.get(`${att.name} ${curr.name}`)
					.effectiveness)
			}, 1)
		}
		let defMatchups = {}
		types.forEach(type => {
			defMatchups[type.name] = teamInfo.map(pokemon => {
				return {
					name: pokemon.name,
					rosterId: pokemon.rosterId,
					img: pokemon.sprites.front_default,
					matchup: calculateMatchup(
						[...pokemon.types.map(x => x.type)],
						type,
						typeChart
					),
				}
			})
		})
		return defMatchups
	}
	const defMatchups = calculateDefenseMatchupsAll([...types], typeChart)
	let [collapsed, setCollapsed] = useState(true)
	let [collapseClass, setCollapseClass] = useState(styles.collapsed)
	useEffect(() => {
		collapsed ? setCollapseClass(styles.collapsed) : setCollapseClass('')
	}, [collapsed, setCollapseClass])
	return (
		<React.Fragment>
			<div className={styles.teamPanel}>
				<div
					className={styles.sectionHeader}
					onClick={() => setCollapsed(!collapsed)}
				>
					<h3>Defense Matchups</h3>
					<span
						className={`material-icons ${styles.carat} ${
							collapsed ? styles.collapseCarat : ''
						}`}
					>
						keyboard_arrow_up
					</span>
				</div>
				<div className={`${styles.matchupContainer} ${collapseClass}`}>
					{POKEMON_TYPES.map(type => (
						<MatchupSection
							key={`${type} defmatchup`}
							type={type}
							typeMatchups={defMatchups}
						/>
					))}
				</div>
			</div>
		</React.Fragment>
	)
}
export { TeamPanel as default }
