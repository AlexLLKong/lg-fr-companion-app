import React, { useState } from 'react'
import { POKEMON_NATURES } from '../../actions/types'
import Button from '../Button'
import styles from './EditMember.module.scss'
const EditMember = ({ pokemon, modifyPokemon, setShowEditMember }) => {
	let [nickname, setNickname] = useState(pokemon.userInfo.nickname)
	let [level, setLevel] = useState(pokemon.userInfo.level)
	let [nature, setNature] = useState(pokemon.userInfo.nature)
	let [moves, setMoves] = useState(pokemon.userInfo.moves)
	const handleSubmit = e => {
		e.preventDefault()
		const newUserInfo = {
			nickname,
			level,
			nature,
			moves,
		}
		modifyPokemon(pokemon, newUserInfo)
		setShowEditMember(prevShowEditMember => !prevShowEditMember)
	}
	const levels = Array.from(Array(100), (_, x) => x + 1)
	return (
		<form onSubmit={handleSubmit} className={styles.editMemberForm}>
			<div className={styles.formGroup}>
				<label htmlFor="nickname">Nickname</label>
				<input
					id="nickname"
					name="nickname"
					value={nickname}
					onChange={e => {
						setNickname(e.target.value)
					}}
				></input>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="level">Level</label>
				<select
					id="level"
					name="level"
					value={level}
					onChange={e => setLevel(e.target.value)}
				>
					{levels.map(lvl => {
						return (
							<option
								key={`edit pokemon level ${lvl}`}
								value={lvl}
							>
								{lvl}
							</option>
						)
					})}
				</select>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="nature">Nature</label>
				<select
					id="nature"
					name="nature"
					value={nature}
					onChange={e => {
						setNature(e.target.value)
					}}
				>
					{POKEMON_NATURES.map(nature => {
						return (
							<option
								key={`edit pokemon nature ${nature}`}
								value={nature}
							>
								{nature}
							</option>
						)
					})}
				</select>
			</div>
			{Array.from(Array(4), (_, x) => x + 1).map(i => {
				return (
					<React.Fragment key={`move ${i}`}>
						<label htmlFor={`move${i}`}>{`Move ${i}`}</label>
						<select
							id={`move${i}`}
							name={`move${i}`}
							value={moves[i - 1]}
							onChange={e => {
								setMoves([
									...moves.map((move, j) => {
										if (i - 1 === j) return e.target.value
										return moves[j]
									}),
								])
							}}
						>
							<optgroup label="level">
								<option value="-">-</option>
								{pokemon.moves
									.filter(move => {
										const y = move.version_group_details.find(
											x => {
												return (
													x.version_group.name ===
													'firered-leafgreen'
												)
											}
										)
										if (!y) return false
										return (
											y.move_learn_method.name ===
											'level-up'
										)
									})
									.sort((a, b) => {
										return (
											a.version_group_details.find(x => {
												return (
													x.version_group.name ===
													'firered-leafgreen'
												)
											}).level_learned_at -
											b.version_group_details.find(x => {
												return (
													x.version_group.name ===
													'firered-leafgreen'
												)
											}).level_learned_at
										)
									})
									.map(move => {
										return (
											<option
												key={`${pokemon.rosterId} ${move.move.name}`}
												value={`${move.move.name}`}
											>
												{`${
													move.move.name
												} (req. level: ${
													move.version_group_details.find(
														x => {
															return (
																x.version_group
																	.name ===
																'firered-leafgreen'
															)
														}
													).level_learned_at
												})`}
											</option>
										)
									})}
							</optgroup>
							<optgroup label="machine">
								{pokemon.moves
									.filter(move => {
										const y = move.version_group_details.find(
											x => {
												return (
													x.version_group.name ===
													'firered-leafgreen'
												)
											}
										)
										if (!y) return false
										return (
											y.move_learn_method.name ===
											'machine'
										)
									})
									.map(move => {
										return (
											<option
												key={`${pokemon.rosterId} ${move.move.name}`}
												value={`${move.move.name}`}
											>
												{`${move.move.name}`}
											</option>
										)
									})}
							</optgroup>
							<optgroup label="egg">
								{pokemon.moves
									.filter(move => {
										const y = move.version_group_details.find(
											x => {
												return (
													x.version_group.name ===
													'firered-leafgreen'
												)
											}
										)
										if (!y) return false
										return (
											y.move_learn_method.name === 'egg'
										)
									})
									.map(move => {
										return (
											<option
												key={`${pokemon.rosterId} ${move.move.name}`}
												value={`${move.move.name}`}
											>
												{`${move.move.name}`}
											</option>
										)
									})}
							</optgroup>
							<optgroup label="tutor">
								{pokemon.moves
									.filter(move => {
										const y = move.version_group_details.find(
											x => {
												return (
													x.version_group.name ===
													'firered-leafgreen'
												)
											}
										)
										if (!y) return false
										return (
											y.move_learn_method.name === 'tutor'
										)
									})
									.map(move => {
										return (
											<option
												key={`${pokemon.rosterId} ${move.move.name}`}
												value={`${move.move.name}`}
											>
												{`${move.move.name}`}
											</option>
										)
									})}
							</optgroup>
						</select>
					</React.Fragment>
				)
			})}

			<Button className={`btn-primary ${styles.longButton}`}>Save</Button>
			<Button
				className={`btn-secondary ${styles.longButton}`}
				onClick={e => {
					e.preventDefault()
					setShowEditMember(prevShowEditMember => !prevShowEditMember)
				}}
			>
				Cancel
			</Button>
		</form>
	)
}
export { EditMember as default }
