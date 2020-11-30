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
					{' '}
					The source code is available on{' '}
					<a href="https://github.com/AlexLLKong/lg-fr-companion-app">
						Github
					</a>
				</p>
				<p className={styles.aboutText}>
					Thanks for checking out lg-fr-companion-app!
				</p>
			</div>
		</div>
	)
}
export { AboutPage as default }
