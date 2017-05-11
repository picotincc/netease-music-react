import { ACTIVE_SONG, ACTIVE_PLAYINGLIST } from './ActionType';

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
