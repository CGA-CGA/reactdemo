// 引入封装好的模块
import { getUserList, getUserCount } from '../../util/axios/index.js'

const state = {
    userList: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
}

const getters = {
    getUserList(state) {
        return state.userList
    },
    getUserCount(state) {
        return state.total
    },
    getUserSize(state) {
        return state.size
    }
}
const mutations = {
    req_userlist(state, payload) {
        state.userList = payload;
    },
    req_usercount(state, payload) {
        state.total = payload;
    },
    req_page(state, payload) {
        state.page = payload;
    },
}

const actions = {
    getUserListAction(comtext) {
        getUserList({
            size: comtext.state.size,
            page: comtext.state.page
        })
            .then(res => {
                console.log(res, '请求管理员列表得到的数据')
                if (res.data.code == 200) {
                    let data = res.data.list?res.data.list:[];
                    comtext.commit('req_userlist', data)
                    //判断一下，当前是不是第一页 如果不是并且你当前的这个列表等于0
                    if (comtext.state.page != 1 &&data.length == 0) {
                        //重新调取修改页码的行动
                        comtext.dispatch('changePageAction', comtext.state.page - 1)
                        //重新调取列表
                        comtext.dispatch('getUserListAction')
                        return
                    }
                }
            })
            .catch(err => {
                console.log(err, '错误d响应');
            })
    },
    //封装一个获取总条数事件
    getUserCountAction({ commit }) {
        getUserCount().then(res => {
            console.log(res, '请求总条数得到的数据')
            if (res.data.code == 200) {
                commit('req_usercount', res.data.list[0].total)
            }
        }).catch(err => {
            console.log(err, '获取总条数失败');
        })
    },
    //封装一个修改page的action
    changePageAction(context, paload) {
        context.commit('req_page', paload)
        //重新调取列表
        context.dispatch('getUserListAction')
    }
}

//默认导出所有的内容
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
}