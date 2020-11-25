import {
	POKEDEX_LOADED,
	POKEDEX_LOADING,
	POKEDEX_DATA_LOADED,
	POKEDEX_DATA_LOADING,
} from 'actions/types'

const initialState = {
	isDataLoading: true,
	isPokedexLoading: true,
	data: [],
	dex: {},
}

const PokedexReducer = (state = initialState, action) => {
	switch (action.type) {
		case POKEDEX_DATA_LOADING:
			return {
				...state,
				isDataLoading: true,
			}
		case POKEDEX_DATA_LOADED:
			return {
				...state,
				data: [...action.payload],
				isDataLoading: false,
			}
		case POKEDEX_LOADING:
			return {
				...state,
				isPokedexLoading: true,
			}
		case POKEDEX_LOADED:
			return {
				...state,
				dex: action.payload,
				isPokedexLoading: false,
			}
		default:
			return state
	}
}

export { PokedexReducer as default }
