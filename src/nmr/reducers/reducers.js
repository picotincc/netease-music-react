import { combineReducers } from 'redux';
import { ACTIVE_USER_PLAYLISTS, ACTIVE_SELECTED_PlAYLIST } from '../actions/actions';


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
        case ACTIVE_USER_PLAYLISTS:
            return action.playlists;
        default:
            return state;
    }
}

function activeSelectedPlayList(state = [], action)
{
    switch (action.type) {
        case ACTIVE_SELECTED_PlAYLIST:
            return action.playlist;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    userId: login,
    playlists: activeUserPlayLists,
    playlist: activeSelectedPlayList
});

export default rootReducer;
