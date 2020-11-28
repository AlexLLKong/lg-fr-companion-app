import { ADDED_TO_TEAM, TYPES_LOADING, TYPES_LOADED } from '../actions/types'

const initialTeam = localStorage.getItem('team')
	? JSON.parse(localStorage.getItem('team'))
	: []

const initialState = {
	team: initialTeam,
	types: [],
	typeChart: {},
	isLoading: true,
}
const TeamReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADDED_TO_TEAM:
			localStorage.setItem(
				'team',
				JSON.stringify([...state.team, action.payload])
			)
			return {
				team: [...state.team, action.payload],
			}
		case TYPES_LOADING:
			return {
				...state,
				isLoading: true,
			}
		case TYPES_LOADED:
			return {
				...state,
				types: [...action.payload.res],
				typeChart: action.payload.typeChart,
				isLoading: false,
			}
		default:
			return state
	}
}

export { TeamReducer as default }
