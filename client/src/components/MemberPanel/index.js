import React, { useState } from 'react'
import EditMember from '../EditMember'
import Button from '../Button'
import styles from './MemberPanel.module.scss'
const MemberPanel = ({
	generalInfo,
	userInfo,
	modifyUserInfo,
	removePokemonFromTeam,
	setSelected,
}) => {
	let [showEditMember, setShowEditMember] = useState(false)
	//{generalInfo.moves.find(obj => obj.move.name === move).version_group_details.find(obj => obj.version_group.name === 'firered_leafgreen').level_learned_at}
	return (
		<div className={styles.memberPanel}>
			{!showEditMember ? (
				<div className={styles.memberInfo}>
					<h3>
						{userInfo.nickname
							? userInfo.nickname
							: generalInfo.name}
					</h3>
					<div className="">
						<h4>{`level: ${userInfo.level}`}</h4>
						<h4>{`nature: ${userInfo.nature}`}</h4>
						{userInfo.moves.map((move, i) => (
							<div
								key={`${generalInfo.rosterId} ${move.move.name}${i}`}
								className={styles.moveInfo}
							>
								<h4>
									{`move ${i + 1}`}{' '}
									{move.version_group_details.find(
										obj =>
											obj.version_group.name ===
											'firered-leafgreen'
									).level_learned_at > userInfo.level ? (
										<span className={styles.warning}>
											lvl req
										</span>
									) : null}
								</h4>

								<h4>{move.move.name}</h4>
							</div>
						))}
					</div>
				</div>
			) : null}

			{showEditMember ? (
				<>
					<EditMember
						pokemon={generalInfo}
						modifyPokemon={modifyUserInfo}
						setShowEditMember={setShowEditMember}
					/>
				</>
			) : (
				<>
					<Button
						className={`btn-secondary ${styles.longButton}`}
						onClick={e => {
							e.preventDefault()
							setShowEditMember(!showEditMember)
						}}
					>
						Edit
					</Button>
					<Button
						className={`btn-danger ${styles.longButton}`}
						onClick={e => {
							e.preventDefault()
							setSelected('')
							removePokemonFromTeam(generalInfo.rosterId)
						}}
					>
						Remove
					</Button>
				</>
			)}
		</div>
	)
}
export { MemberPanel as default }
