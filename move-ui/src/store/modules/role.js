// 引入封装好的模块
import {getRoleList} from '../../util/axios/index.js'

const state = {
    roleList:[]
}

const getters = {
    getRoleList(state){
        return state.roleList
    }
}

const mutations ={
    req_rolelist(state,payload){
        state.roleList = payload;
    }
}

const actions ={
    getRoleListAction({commit}){
        getRoleList()
        .then(res=>{
            // console.log(res,'模块请求的数据')
            if(res.data.code == 200){
                commit('req_rolelist',res.data.list)
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