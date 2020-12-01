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
const dummyMove = {
	move: { name: '-' },
	version_group_details: [
		{
			level_learned_at: 0,
			move_learn_method: { name: 'n/a' },
			version_group: { name: 'firered-leafgreen' },
		},
	],
}
export const getPokedex = () => dispatch => {
	dispatch({ type: POKEDEX_DATA_LOADING })
	const pokemonIds = Array.from(Array(151), (_, x) => x + 1)

	P.getPokemonByName(pokemonIds)
		.then(pokemonList => {
			// In lgfr pokemon <=> pokemon species
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
					// filter out newer abilities
					abilities = abilities.filter(x =>
						generations.find(y => y === x.generation.name)
							? true
							: false
					)
					// add abilities to pokedex data
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
					// filter out moves that are not obtainable in lgfr
					combined = combined.map(pokemon => {
						pokemon.moves = [
							...pokemon.moves.filter(move =>
								move.version_group_details.filter(group => {
									return (
										group.version_group.name ===
										'firered-leafgreen'
									)
								}).length > 0
									? true
									: false
							),
							dummyMove,
						]
						return pokemon
					})
					// filter out fairy types for normal
					combined = combined.map(pokemon => {
						pokemon.types = pokemon.types
							.map((typeObj, i) => {
								if (typeObj.type.name === 'fairy' && i === 0) {
									return {
										slot: typeObj.slot,
										type: {
											name: 'normal',
											url:
												'https://pokeapi.co/api/v2/type/1/',
										},
									}
								} else return typeObj
							})
							.filter(typeObj => typeObj.type.name !== 'fairy')
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

export const filterPokedex = (
	data,
	query = '',
	addPokemontoTeam
) => dispatch => {
	dispatch({ type: POKEDEX_LOADING })

	const cards = generateCards(configureData(data, addPokemontoTeam, query))
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
const configureData = (dataResponse, addPokemontoTeam, query) => {
	dataResponse = routeQuery(dataResponse, query)
	return dataResponse.map(x => {
		const fireAddPokemonToTeam = () => {
			addPokemontoTeam(x)
		}
		return {
			title: x.name,
			image: x.sprites.other.dream_world.front_default,
			id: x.id,
			tags: filterTypes(x.types),

			buttonActions: [fireAddPokemonToTeam],
			info: [
				[
					x.flavor_text_entries.find(
						y =>
							y.language.name === 'en' &&
							y.version.name === 'firered'
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
		}
	})
}

const generateCards = data => {
	return (
		<CardGrid>
			{data.map(x => (
				<Card key={x.id} {...x} />
			))}
		</CardGrid>
	)
}

const typeRegex = RegExp('type:.*')
const idRegex = RegExp('id:.*')
const abilityRegex = RegExp('ability:.*')
const eggGroupRegex = RegExp('egg:.*')

const routeQuery = (data, query) => {
	if (typeRegex.test(query)) {
		return data.filter(x =>
			x.types.filter(obj => query.includes(obj.type.name)).length > 0
				? true
				: false
		)
	} else if (idRegex.test(query)) {
		return data.filter(
			x => x.id === parseInt(query.replace(/ /g, '').substr(3))
		)
	} else if (abilityRegex.test(query)) {
		return data.filter(x =>
			x.abilities.filter(obj =>
				formatAbilityName(obj.ability.name)
					.toLowerCase()
					.includes(query.substr(8))
			).length > 0
				? true
				: false
		)
	} else if (query === '!team') {
		const team = JSON.parse(localStorage.getItem('team'))
		return data.filter(x =>
			team.find(y => y.name === x.name) ? true : false
		)
	} else if (eggGroupRegex.test(query)) {
		return data.filter(x =>
			x.egg_groups.filter(obj =>
				obj.name.includes(query.replace(/ /g, '').substr(4))
			).length > 0
				? true
				: false
		)
	} else {
		return data.filter(x => (query ? x.name.includes(query) : x))
	}
}
