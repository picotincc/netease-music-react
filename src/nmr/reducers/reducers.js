import { combineReducers } from 'redux';
import { ACTIVE_USER_PLAYLISTS, ACTIVE_SELECTED_PlAYLIST, GET_DATA, RECEIVE_DATA } from '../actions/actions';


function login(state = "", action)
{
    switch (action.type) {
        case "login":
            return action.userId;
        default:
            return state;
    }
}

function activeUserPlayLists(state = [], action)
{
    switch (action.type) {
      case GET_DATA:
        return state;
      case RECEIVE_DATA:
        let nextState = action.playlists;
        return nextState;
      default:
        return state
    }
}

const rootReducer = combineReducers({
    userId: login,
    playlists: activeUserPlayLists
});

export default rootReducer;
