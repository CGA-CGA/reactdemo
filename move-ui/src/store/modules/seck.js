// 引入封装好的模块
import {getSeckList} from '../../util/axios/index.js'

const state = {
    seckList:[]
}

const getters = {
    getSeckList(state){
        return state.seckList
    }
}

const mutations ={
    req_secklist(state,payload){
        state.seckList = payload;
    }
}

const actions ={
    getSeckListAction({commit}){
        getSeckList()
        .then(res=>{
            console.log(res,'模块请求限时秒杀的数据')

            if(res.data.code == 200){
                commit('req_secklist',res.data.list)
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