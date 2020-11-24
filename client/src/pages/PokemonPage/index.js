import React from 'react'
import SearchBar from 'components/SearchBar'
import CardGrid from 'components/CardGrid'
import Card from 'components/Card'
import Button from 'components/Button'
import './PokedexPage.scss'
import test from './test.png'

const mockCardData = [
	{
		title: 'Butterfree',
		image: test,
		id: '12',
		tags: [
			{
				text: 'Bug',
				bgColor: 'green',
				color: 'black',
			},
			{
				text: 'Flying',
				bgColor: 'gray',
				color: 'black',
			},
		],
		buttonActions: [
			{
				name: 'Print',
				function: () => console.log('button works'),
			},
		],
	},
]
const generateCards = data => {
	return data.map(x => <Card key={x.id} {...x} />)
}
const tempFn = e => {
	console.log(e.target.value)
}
const PokedexPage = () => {
	return (
		<div className="container">
			<Button
				className="btn-primary"
				onClick={() => console.log('button works')}
			>
				Click me
			</Button>
			<Button
				className="btn-secondary"
				onClick={() => console.log('button works')}
			>
				Click me
			</Button>
			<Button
				className="btn-danger"
				onClick={() => console.log('button works')}
			>
				Click me
			</Button>
			<SearchBar onChangeHandler={tempFn} />
			<CardGrid>{generateCards(mockCardData)}</CardGrid>
		</div>
	)
}

export { PokedexPage as default }
