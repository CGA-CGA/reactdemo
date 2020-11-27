import http from './axios'

//封装推荐歌单接口
export function getPersonalized(params){
    return http.get('/personalized',{
        params
    })
}
//封装最新音乐接口
export function getNewsong(params){
    return http.get('/personalized/newsong',{
        params
    })
}
//封装bannerlist轮播
export function getBanner(params){
    return http.get('/banner',{
        params
    })
}
//封装排行榜
export function getRank(params){
    return http.get('/top/list',{
        params
    })
}
//封装搜索
export function getSearch(params){
    return http.get('/search/suggest',{
        params
    })
}
//封装搜索
export function getSearchHot(params){
    return http.get('/search/hot/detail',{
        params
    })
}
//封装歌单详情
export function getPlayList(params){
    return http.get('/playlist/detail',{
        params
    })
}
//获取歌曲详情
export function songDetail(params){
    return http.get('/song/detail',{
        params
    })
}

//获取音乐URL
export function playUrl(params){
    return http.get('/song/url',{
        params
    })
}

//获取歌词
export function getLyric(params){
    return http.get('/lyric',{
        params
    })
}
