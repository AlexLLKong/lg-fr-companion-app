import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './TeamPage.scss'
import { getTypes } from '../../actions/TeamActions'
import { POKEMON_TYPES } from '../../actions/types'
const Roster = teamObj => {
	return (
		<div className="memberContainer">
			{teamObj.team.map(member => {
				return (
					<div
						className={`member bg-grad-${member.types[0].type.name}`}
					>
						<img
							src={member.sprites.front_default}
							alt={member.name}
						/>
					</div>
				)
			})}
		</div>
	)
}

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
	let [collapseClass, setCollapseClass] = useState('collapsed')
	useEffect(() => {
		collapsed ? setCollapseClass('collapsed') : setCollapseClass('')
	}, [collapsed, setCollapseClass])
	return (
		<React.Fragment>
			<div className="teamPanel">
				<h3 onClick={() => setCollapsed(!collapsed)}>
					Defense Matchups
				</h3>
				<div className={`${collapseClass}`}>
					{POKEMON_TYPES.map(type => (
						<MatchupSection
							type={type}
							typeMatchups={defMatchups}
						/>
					))}
				</div>
			</div>
		</React.Fragment>
	)
}
const MatchupSection = ({ type, typeMatchups }) => {
	let [collapsed, setCollapsed] = useState(true)
	let [collapseClass, setCollapseClass] = useState('collapsed')
	useEffect(() => {
		collapsed ? setCollapseClass('collapsed') : setCollapseClass('')
	}, [collapsed, setCollapseClass])
	return (
		<React.Fragment>
			<h4
				className={`background-${type}`}
				onClick={() => setCollapsed(!collapsed)}
			>
				{type}
			</h4>
			<div className={`typeMatchup ${collapseClass}`}>
				{typeMatchups[type].map(x => (
					<React.Fragment key={`${type} ${x.name} matchup`}>
						<img src={x.img} alt={x.name} className="matchupIcon" />
						<p className="matchup">{x.matchup}x</p>
					</React.Fragment>
				))}
			</div>
		</React.Fragment>
	)
}
const MemberPanel = info => {
	return <div className="memberPanel">{info.name}</div>
}
const TeamPage = ({ team, types, typeChart, isLoading, getTypes }) => {
	useEffect(() => {
		getTypes()
	}, [getTypes])
	let [selected, setSelected] = useState('')
	return !isLoading ? (
		<div className="container">
			<Roster team={[...team]} />
			{selected ? (
				<MemberPanel />
			) : (
				<TeamPanel
					teamInfo={team}
					types={types}
					typeChart={typeChart}
				/>
			)}
		</div>
	) : null
}

const mapStatetoProps = state => ({
	team: state.team.team,
	types: state.team.types,
	typeChart: state.team.typeChart,
	isLoading: state.team.isLoading,
})

export default connect(mapStatetoProps, { getTypes })(TeamPage)
