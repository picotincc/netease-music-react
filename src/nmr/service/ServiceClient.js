const NM_API_URL = "/api";

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

    getUserPlayListsByPromise(uid = this.userId)
{
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${NM_API_URL}/user/playlist/`,
            data: {
                uid,
                limit: 1000,
                offset: 0
            }
        }).then(data => {
            resolve(data);
        });
    });
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
            return res.result;
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
                url: suggest ? `${NM_API_URL}/search/suggest/web` : `${NM_API_URL}/search/get/`,
                method: "post",
                data: {
                    s: keyword,
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

        if (res)
        {
            res = JSON.parse(res);
        }

        if (res.code === 200 )
        {
            return res.result.songs;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }
}
