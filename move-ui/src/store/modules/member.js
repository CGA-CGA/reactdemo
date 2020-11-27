// 引入封装好的模块
import {getMemberList} from '../../util/axios/index.js'

const state = {
    memberList:[]
}

const getters = {
    getMemberList(state){
        return state.memberList
    }
}

const mutations ={
    req_memberlist(state,payload){
        state.memberList = payload;
    }
}

const actions ={
    getMemberListAction({commit}){
        getMemberList()
        .then(res=>{
            console.log(res,'模块请求会员管理列表的数据')
            if(res.data.code == 200){
                commit('req_memberlist',res.data.list)
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