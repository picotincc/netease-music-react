import ServiceClient from "../service/ServiceClient";

import {
    REQUEST_PALYLISTS_DATA,
    RECEIVE_PALYLISTS_DATA,
    REQUEST_PALYLIST_DETAIL,
    RECEIVE_PALYLIST_DETAIL,
    REQUEST_SEARCH_DATA,
    RECEIVE_SEARCH_DATA
} from './ActionType';


export function loadUserPlayLists(userId)
{
    return async(dispatch) => {
        dispatch(requestData(REQUEST_PALYLISTS_DATA, userId));
        const res = await ServiceClient.getInstance().getUserPlayLists(userId);
        dispatch(receiveData(RECEIVE_PALYLISTS_DATA, userId, res));
        return res;
    }
}

export function activeSelectedPlayList(playlistId)
{
    return async(dispatch) => {
        dispatch(requestData(REQUEST_PALYLIST_DETAIL, playlistId));
        const res = await ServiceClient.getInstance().getPlayListDetail(playlistId);
        dispatch(receiveData(RECEIVE_PALYLIST_DETAIL, playlistId, res));
        return res;
    }
}

export function search(keyword)
{
    return async(dispatch) => {
        dispatch(requestData(REQUEST_SEARCH_DATA, keyword));
        const res = await ServiceClient.getInstance().searchSongs(keyword);
        dispatch(receiveData(RECEIVE_SEARCH_DATA, keyword, res));
        return res;
    }
}


const requestData = (type, data) => ({
    type: type,
    data
});

const receiveData = (type, data, res) => ({
    type: type,
    data,
    response: res,
    receivedAt: Date.now()
});
