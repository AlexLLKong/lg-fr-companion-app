import { combineReducers } from 'redux'
import PokedexReducer from './PokedexReducer.js'
import TeamReducer from './TeamReducer.js'
export default combineReducers({
	pokedex: PokedexReducer,
	team: TeamReducer,
})
