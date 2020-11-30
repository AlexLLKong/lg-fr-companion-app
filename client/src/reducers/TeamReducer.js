import {
	ADDED_TO_TEAM,
	TYPES_LOADING,
	TYPES_LOADED,
	MODIFY_USER_INFO,
	REMOVE_FROM_TEAM,
} from '../actions/types'

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
				isLoading: true,
			}
		case TYPES_LOADING:
			return {
				...state,
				types: [],
				isLoading: true,
			}
		case TYPES_LOADED:
			return {
				...state,
				types: [...action.payload.res],
				typeChart: action.payload.typeChart,
				isLoading: false,
			}
		case MODIFY_USER_INFO:
			localStorage.setItem(
				'team',
				JSON.stringify([
					...state.team.map(member => {
						if (member.name === action.payload.name)
							return action.payload
						return member
					}),
				])
			)
			return {
				...state,
				team: [
					...state.team.map(member => {
						if (member.name === action.payload.name)
							return action.payload
						return member
					}),
				],
			}
		case REMOVE_FROM_TEAM:
			localStorage.setItem(
				'team',
				JSON.stringify([
					...state.team.filter(x => x.rosterId !== action.payload),
				])
			)
			return {
				...state,
				team: state.team.filter(x => x.rosterId !== action.payload),
			}
		default:
			return state
	}
}

export { TeamReducer as default }
