import React from 'react'
import styles from './AboutPage.module.scss'
const AboutPage = () => {
	return (
		<div className="container">
			<div className={styles.textContainer}>
				<h1>Hi!</h1>
				<p className={styles.aboutText}>
					lg-fr-companion-app is meant to help players keep track of
					important information while playing. The app gets data from{' '}
					<a href="https://pokeapi.co/">PokeApi</a>.{' '}
				</p>
				<p className={styles.aboutText}>
					Having more than 6 pokemon on your team is definitely a
					feature not a bug 👍
				</p>
				<p className={styles.aboutText}>
					{' '}
					The source code is available on{' '}
					<a href="https://github.com/AlexLLKong/lg-fr-companion-app">
						Github
					</a>
				</p>
				<p className={styles.aboutText}>
					Thanks for checking out lg-fr-companion-app!
				</p>
				<h2>Pokedex Search terms</h2>
				<table className={styles.searchTermTable}>
					<thead>
						<tr>
							<th>Term</th>
							<th>Parameters</th>
							<th>Example</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>type:</td>
							<td>Any lg/fr type</td>
							<td>type: flying = all the flying type pokemon</td>
						</tr>
						<tr>
							<td>id:</td>
							<td>Any whole number from 1 to 151</td>
							<td>id: 100 = Voltorb</td>
						</tr>
						<tr>
							<td>ability:</td>
							<td>Any ability in lg-fr</td>
							<td>
								ability:marvel scale = Dratini, Dragonair{' '}
								<br></br> Note: A space after 'ability:'
								searches for multi-word abilities
							</td>
						</tr>
						<tr>
							<td>egg:</td>
							<td>Any egg group in lg-fr</td>
							<td>egg: ditto = Ditto</td>
						</tr>
						<tr>
							<td>!team</td>
							<td>None</td>
							<td>Shows the pokemon currently on your team</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
export { AboutPage as default }
