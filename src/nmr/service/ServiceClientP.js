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

    login()
    {
        this.__pseudoLogin();
        return this._userId;
    }

    __pseudoLogin()
    {
        // this._userId = "78843035";
        this._userId = "260616759";
    }

    getUserPlayLists(uid = this.userId)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${NM_API_URL}/user/playlist/`,
                data: {
                    uid,
                    limit: 1000,
                    offset: 0
                }
            }).always(res => {
                if (res.code === 200)
                {
                    resolve(res.playlist);
                }
                else
                {
                    reject("Response with error code:" + res.code);
                }
            });
        });
    }

    getPlayListDetail(id)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${NM_API_URL}/playlist/detail`,
                data: {
                    id
                }
            }).always(res => {
                if (res.code === 200 )
                {
                    resolve(res.result);
                }
                else
                {
                    reject("Response with error code:" + res.code);
                }
            });
        });
    }

    search(keyword, suggest = false)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: suggest ? `${NM_API_URL}/search/suggest/web` : `${NM_API_URL}/search/get/`,
                method: "post",
                data: {
                    s: keyword,
                    type: 1,
                    offset: 0,
                    limit: 100,
                    sub: false
                }
            }).always(res => {
                if (res)
                {
                    res = JSON.parse(res);
                }

                if (res.code === 200)
                {
                    resolve(res.result.songs);
                }
                else
                {
                    reject("Response with error code:" + res.code);
                }
            });
        });
    }
}
