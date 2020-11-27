// 引入封装好的模块
import {getCateList} from '../../util/axios/index.js'

const state = {
    cateList:[]
}

const getters = {
    getCateList(state){
        return state.cateList
    }
}

const mutations ={
    req_catelist(state,payload){
        state.cateList = payload;
    }
}

const actions ={
    getCateListAction({commit}){
        getCateList({
            istree:true
        })
        .then(res=>{
            // console.log(res.data.list,'模块请求商品分类的数据')
            // console.log(res.data.list[0].children[1].catename,'模块请求二级分类的数据')

            if(res.data.code == 200){
                commit('req_catelist',res.data.list)
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