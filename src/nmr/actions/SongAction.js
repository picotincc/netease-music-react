import { ACTIVE_SONG } from './ActionType';

export function activeSelectedSong(song)
{
    return {
        type: ACTIVE_SONG,
        song
    };
}
