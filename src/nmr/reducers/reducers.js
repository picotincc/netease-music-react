import { combineReducers } from 'redux';
import * as ActionType from "../actions/ActionType";


function login(state = "", action)
{
    switch (action.type) {
        case ActionType.USER_LOGIN:
            return action.userId;
        default:
            return state;
    }
}

function activeUserPlayLists(state = [], action)
{
    switch (action.type) {
      case ActionType.REQUEST_PALYLISTS_DATA:
        return state;
      case ActionType.RECEIVE_PALYLISTS_DATA:
        let nextState = action.response;
        return nextState;
      default:
        return state
    }
}

function activeSelectedPlayList(state = null, action)
{
    switch (action.type) {
        case ActionType.REQUEST_PALYLIST_DETAIL:
            return state;
        case ActionType.RECEIVE_PALYLIST_DETAIL:
          let nextState = action.response;
          return nextState;
        default:
          return state
    }
}

const rootReducer = combineReducers({
    userId: login,
    playlists: activeUserPlayLists,
    selectedPlayList: activeSelectedPlayList
});

export default rootReducer;
