import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.scss'

const linkUrls = ['/', '/team', '/about']
const linkNames = ['Pokedex', 'Team', 'About']

const Navbar = () => {
	let location = useLocation()
	useEffect(() => {
		setSelected(linkNames[linkUrls.indexOf(location.pathname)])
	}, [location])
	let [selected, setSelected] = useState(
		linkNames[linkUrls.indexOf(location.pathname)]
	)
	return (
		<nav className={styles.navbar}>
			<ul>
				{linkUrls.map((link, i) => (
					<li key={`link to ${linkNames[i]}`}>
						<Link to={link}>
							<div>{linkNames[i]}</div>
							{selected === linkNames[i] ? (
								<div className={styles.navIndicator}></div>
							) : null}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
export { Navbar as default }
