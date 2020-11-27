// 引入封装好的模块
import {getMenuList} from '../../util/axios/index.js'

const state = {
    menuList:[]
}

const getters = {
    getMenuList(state){
        return state.menuList
    }
}

const mutations ={
    req_menulist(state,payload){
        state.menuList = payload;
    }
}

const actions ={

    getMenuListAction({commit}){
        getMenuList({istree:true })
        .then(res=>{
            // console.log(res,'模块请求的数据')
            if(res.data.code == 200){
                commit('req_menulist',res.data.list)
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