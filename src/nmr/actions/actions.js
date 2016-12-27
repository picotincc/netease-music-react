import ServiceClientP from "../service/ServiceClientP";

/*
 * action 类型
 */

export const ACTIVE_USER_PLAYLISTS = 'ACTIVE_USER_PLAYLISTS';
export const ACTIVE_SELECTED_PlAYLIST = 'ACTIVE_SELECTED_PlAYLIST';



export const GET_DATA = 'GET_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA'

/*
 * request异步请求
 */


const fetchPosts = data => dispatch => {
    dispatch(getUserPlayLists(data));
    return getData(data.url, data.paras)
            .then(res => {
                console.log(res);
                dispatch(receiveUserPlayLists(data, res));
            })
}

export const getUserPlayLists = data => ({
    type: GET_DATA,
    data
})

export const receiveUserPlayLists = (data, res) => ({
    type: RECEIVE_DATA,
    data,
    playlists: res.playlist,
    receivedAt: Date.now()
})

export function loadUserPlayLists(userId)
{
    return fetchPosts({
        url: "/user/playlist",
        paras: {
            uid: userId,
            limit: 1000,
            offset: 0
        }
    });
}








/*
 * action 创建函数
 */
export function login(userId)
{
    const id = userId;
    return {
        type: "login",
        userId: id
    };
}




export function activeSelectedPlayList(playlistId)
{
    return {
        type: ACTIVE_SELECTED_PlAYLIST,
        playlist: {}
    };
}







function getData(url, paras)
{
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/api" + url,
            data: paras
        }).always(res => {
            resolve(res);
        });
    });
}
