const NM_API_URL = "http://localhost:4000";

export default class ServiceClient
{
    static _instance = null;

    constructor()
    {
        this._userId = null;
    }

    static getInstance()
    {
        if(ServiceClient._instance === null)
        {
            ServiceClient._instance = new ServiceClient();
        }
        return ServiceClient._instance;
    }

    get userId()
    {
        return this._userId;
    }

    async login()
    {
        await this.__pseudoLogin();
        return this._userId;
    }

    async __pseudoLogin()
    {
        this._userId = "78843035";
    }

    async getUserPlayLists(uid = this.userId)
    {
        let res = null;
        try {
            res = await $.ajax({
                url: `${NM_API_URL}/user/playlist/`,
                data: {
                    uid,
                    limit: 1000,
                    offset: 0
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res.code === 200)
        {
            return res.playlist;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }

    async getPlayListDetail(id)
    {
        let res = null;
        try {
            res = await $.ajax({
                url: `${NM_API_URL}/playlist/detail`,
                data: {
                    id
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res.code === 200 )
        {
            return res.playlist;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }

    async getMusicUrl(id)
    {
        let res = null;
        try {
            res = await $.ajax({
                url: `${NM_API_URL}/music/url`,
                data: {
                    id
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res.code === 200 )
        {
            return res.data[0];
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }

    async search(keyword, suggest = false)
    {
        let res = null;
        try {
            res = await $.ajax({
                url: suggest ? `${NM_API_URL}/search/suggest` : `${NM_API_URL}/search`,
                method: "GET",
                data: {
                    keywords: keyword,
                    type: 1,
                    offset: 0,
                    limit: 100,
                    sub: false
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res.code === 200 )
        {
            return res.result;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }

    async getSongDetail(id) {
        let res = null;
        try {
            res = await $.ajax({
                url: `http://music.163.com/weapi/v3/song/detail`,
                method: "post",
                data: {
                    id,
                    c: JSON.stringify([{id: id}]),
                    ids: '[' + id + ']',
                    csrf_token: ""
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res)
        {
            res = JSON.parse(res);
        }

        if (res.code === 200 )
        {
            return res.result;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }
}
