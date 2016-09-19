import ServiceClient from "../service/ServiceClientP";

/*
 * action 类型
 */

export const ACTIVE_USER_PLAYLISTS = 'ACTIVE_USER_PLAYLISTS';
export const ACTIVE_SELECTED_PlAYLIST = 'ACTIVE_SELECTED_PlAYLIST';

/*
 * action 创建函数
 */
export function login(userId)
{
    const id = ServiceClient.getInstance().login(userId);
    return {
        type: "login",
        userId: id
    };
}

export function loadUserPlayLists()
{
    ServiceClient.getInstance().getUserPlayLists().then(res => {
        return {
            type: ACTIVE_USER_PLAYLISTS,
            playlists: res
        };
    });
}

export function activeSelectedPlayList(playlistId)
{
    ServiceClient.getInstance().getPlayListDetail(playlistId).then(res => {
        return {
            type: ACTIVE_SELECTED_PlAYLIST,
            playlist: res.tracks
        };
    });
}
