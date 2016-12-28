import ServiceClient from "../service/ServiceClientP";
import {
    REQUEST_PALYLISTS_DATA,
    RECEIVE_PALYLISTS_DATA,
    REQUEST_PALYLIST_DETAIL,
    RECEIVE_PALYLIST_DETAIL
} from './ActionType';


export function loadUserPlayLists(userId)
{
    return getUserPlayLists(userId);
}

export function activeSelectedPlayList(playlistId)
{
    return getPlayListDetail(playlistId);
}


export const requestData = (type, data) => ({
    type: type,
    data
});

export const receiveData = (type, data, res) => ({
    type: type,
    data,
    response: res,
    receivedAt: Date.now()
});


/*
 * request异步请求
 */
const getUserPlayLists = uid => (dispatch) => {
    dispatch(requestData(REQUEST_PALYLISTS_DATA, uid));
    return ServiceClient.getInstance().getUserPlayLists(uid)
            .then(res => {
                dispatch(receiveData(RECEIVE_PALYLISTS_DATA, uid, res));
            });
};

const getPlayListDetail = (id) => (dispatch) => {
    dispatch(requestData(REQUEST_PALYLIST_DETAIL, id));
    return ServiceClient.getInstance().getPlayListDetail(id)
            .then(res => {
                dispatch(receiveData(RECEIVE_PALYLIST_DETAIL, id, res));
            });
};
