import React from 'react'
import './Button.scss'
/**
 * @param {string} className -  btn-primary, btn-secondary, btn-danger
 * @param {Function} onClick - onClick function
 * @param {boolean} disabled - optional, default false, disables the button
 */
const Button = ({ children, className, onClick, disabled = false }) => {
	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}

export { Button as default }
