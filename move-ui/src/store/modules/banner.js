// 引入封装好的模块
import {getBannerList} from '../../util/axios/index.js'

const state = {
    bannerList:[]
}

const getters = {
    getBannerList(state){
        return state.bannerList
    }
}

const mutations ={
    req_bannerlist(state,payload){
        state.bannerList = payload;
    }
}

const actions ={
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            console.log(res,'模块请求轮播图的数据')

            if(res.data.code == 200){
                commit('req_bannerlist',res.data.list)
            }
        })
        .catch(err=>{
            console.log(err,'错误响应');
        })
    }
}

//默认导出所有的内容
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true
}