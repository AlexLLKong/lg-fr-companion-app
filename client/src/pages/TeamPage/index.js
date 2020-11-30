import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './TeamPage.scss'
import {
	getTypes,
	modifyUserInfo,
	removePokemonFromTeam,
} from '../../actions/TeamActions'
import Pokeball from '../../components/Pokeball-animation'
import Roster from '../../components/Roster'
import TeamPanel from '../../components/TeamPanel'
import MemberPanel from '../../components/MemberPanel'

const TeamPage = ({
	team,
	types,
	typeChart,
	isLoading,
	getTypes,
	modifyUserInfo,
	removePokemonFromTeam,
}) => {
	useEffect(() => {
		getTypes()
	}, [getTypes])
	let [selected, setSelected] = useState('')
	return isLoading ? (
		<div className="container">
			<Pokeball />
		</div>
	) : (
		<div className="container">
			<Roster team={[...team]} setSelected={setSelected} />
			{selected ? (
				<MemberPanel
					generalInfo={
						team.filter(member => member.name === selected)[0]
					}
					userInfo={
						team.filter(member => member.name === selected)[0]
							.userInfo
					}
					modifyUserInfo={modifyUserInfo}
					removePokemonFromTeam={removePokemonFromTeam}
					setSelected={setSelected}
				/>
			) : (
				<TeamPanel
					teamInfo={team}
					types={types}
					typeChart={typeChart}
				/>
			)}
		</div>
	)
}

const mapStatetoProps = state => ({
	team: state.team.team,
	types: state.team.types,
	typeChart: state.team.typeChart,
	isLoading: state.team.isLoading,
})

export default connect(mapStatetoProps, {
	getTypes,
	modifyUserInfo,
	removePokemonFromTeam,
})(TeamPage)
