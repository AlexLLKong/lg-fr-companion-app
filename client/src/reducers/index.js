import { combineReducers } from 'redux'
import PokedexReducer from './PokedexReducer.js'
export default combineReducers({
	pokedex: PokedexReducer,
})
