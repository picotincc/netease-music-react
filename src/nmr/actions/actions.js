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
    return { type: "login", userId };
}

export function loadUserPlayLists(playlists)
{
  return { type: ACTIVE_USER_PLAYLISTS, playlists };
}

export function activeSelectedPlayList(playlist)
{
  return { type: ACTIVE_SELECTED_PlAYLIST, playlist };
}
