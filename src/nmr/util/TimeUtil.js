export default class TimeUtil
{
    static formatPlayTime(ms)
    {
        const s = Math.round(ms / 1000);
        const sec = s % 60;
        const min = (s - sec) / 60;
        return _digt2(min) + ":" + _digt2(sec);
    }

    static formatAudioCurTime(t)
    {
        const s = Math.round(t);
        const sec = s % 60;
        const min = (s - sec) / 60;
        return _digt2(min) + ":" + _digt2(sec);
    }
}

function _digt2(num)
{
    if (num >= 10)
    {
        return num;
    }
    else
    {
        return "0" + num;
    }
}
