import { ACTIVE_SONG, ACTIVE_PLAYINGLIST, ACTIVE_PLAYER } from './ActionType';

export function activeSelectedSong(song)
{
    return {
        type: ACTIVE_SONG,
        song
    };
}

export function activePlayingList(list)
{
    return {
        type: ACTIVE_PLAYINGLIST,
        list
    };
}

export function activePlayer(tag)
{
    return {
        type: ACTIVE_PLAYER,
        tag
    };
}
