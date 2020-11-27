import {
	POKEDEX_LOADED,
	POKEDEX_LOADING,
	POKEDEX_DATA_LOADING,
	POKEDEX_DATA_LOADED,
} from './types'
import Card from '../components/Card'
import CardGrid from '../components/CardGrid'
import { Pokedex } from 'pokeapi-js-wrapper'
const options = {
	cache: true,
	cacheImages: true,
}
const P = new Pokedex(options)

export const getPokedex = () => dispatch => {
	dispatch({ type: POKEDEX_DATA_LOADING })
	const pokemonIds = Array.from(Array(151), (_, x) => x + 1)

	P.getPokemonByName(pokemonIds)
		.then(pokemonList => {
			P.getPokemonSpeciesByName(pokemonIds).then(pokemonSpecies => {
				let combined = pokemonList.map((pokemon, index) => {
					return {
						...pokemonSpecies[index],
						...pokemon,
					}
				})
				const abilityIds = Array.from(Array(233), (_, x) => x + 1)
				const generations = [
					'generation-iii',
					'generation-ii',
					'generation-i',
				]
				P.getAbilityByName(abilityIds).then(abilities => {
					abilities = abilities.filter(x =>
						generations.find(y => y === x.generation.name)
							? true
							: false
					)

					const regex = /(?<=ability\/)(.*)(?=\/)/
					combined = combined.map(pokemon => {
						pokemon.abilities = pokemon.abilities
							.map(ability => {
								const id = parseInt(
									ability.ability.url.match(regex)
								)
								const abilityData = abilities.find(
									x => x.id === id
								)
								if (abilityData === undefined) return undefined
								const newAbility = {
									...ability,
									...abilityData,
								}
								return newAbility
							})
							.filter(x => x !== undefined)

						return pokemon
					})

					dispatch({
						type: POKEDEX_DATA_LOADED,
						payload: combined,
					})
				})
			})
		})
		.catch(err => console.log(err))
}

export const filterPokedex = (data, query = '') => dispatch => {
	dispatch({ type: POKEDEX_LOADING })

	const cards = generateCards(configureData(data), query)
	dispatch({
		type: POKEDEX_LOADED,
		payload: cards,
	})
}
const formatAbilityName = name => {
	name = name[0].toUpperCase() + name.substr(1, name.length - 1)
	name = name.split('-').join(' ')
	return name
}

const filterTypes = types => {
	types = types
		.map(type => ({
			text: type.type.name,
			type: type.type.name,
		}))
		.filter(y => y.type !== 'fairy')
	if (types.length === 0)
		return [
			{
				text: 'normal',
				type: 'normal',
			},
		]
	return types
}
const configureData = dataResponse => {
	return dataResponse.map(x => ({
		title: x.name,
		image: x.sprites.other.dream_world.front_default,
		id: x.id,
		tags: filterTypes(x.types),

		buttonActions: [
			{
				name: 'Temp',
				function: () => console.log('button works'),
			},
		],
		info: [
			[
				x.flavor_text_entries.find(
					y =>
						y.language.name === 'en' && y.version.name === 'firered'
				).flavor_text,
			],
			[
				...x.abilities.map(y => {
					if (y === undefined) console.log(x)
					return {
						name: formatAbilityName(y.name),
						description: y.effect_entries.find(
							z => z.language.name === 'en'
						).short_effect,
						isHidden: y.is_hidden,
					}
				}),
			],
		],
	}))
}

const generateCards = (data, query) => {
	return (
		<CardGrid>
			{data
				.filter(x => (query ? x.title.includes(query) : x))
				.map(x => (
					<Card key={x.id} {...x} />
				))}
		</CardGrid>
	)
}
