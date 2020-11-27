import React from 'react'
import { getSearch, getSearchHot } from '../../util/axios'
// 导入样式
import '../../assets/css/search.css'
// 导入路由属性
import { NavLink } from 'react-router-dom'
class Search extends React.Component {
    constructor() {
        super()
        this.getInput = React.createRef();
        this.state = {
            val: '',
            searchlist: [],
            SearchHot: []
        }
    }
    componentDidMount() {
        getSearchHot()
            .then(res => {
                console.log('热搜', res);
                this.setState({
                    SearchHot: (res.data.data).filter((item, i) => {
                        return i < 8
                    })
                })
            })
            .catch(err => {
                console.log('热搜请求失败');
            })
    }

    // 输入框属性改变时触发
    changeval(e) {
        //修改state组件val
        // console.log(e);
        // this.setState({
        //     val: e.target.value
        // })
        //输入框有值，出现列表,热门搜索消失
        if (e.target.value) {
            e.target.parentNode.parentNode.nextSibling.style.display = 'none';
            e.target.parentNode.parentNode.nextSibling.nextSibling.style.display = 'block';
            getSearch({
                keywords: e.target.value,
                type: "mobile",
                limit: 10
            }).then((res) => {
                console.log(res, '搜索');
                // this.state.searchlist=[]
                this.setState({
                    val: e.target.value,
                    searchlist: res.data.result.allMatch
                })
            })
                .catch(err => {
                    console.log('搜索请求失败');
                })


        } else {
            e.target.parentNode.parentNode.nextSibling.style.display = 'block';
            e.target.parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
        }

    }
    render() {
        const { searchlist, SearchHot } = this.state
        return (<div>
            <form className="m-input f-bd f-bd-btm" action="#">
                <div className="inputcover">
                    <i className="u-svg u-svg-srch"></i>
                    <input type="search" name="search" className="input" placeholder="" autoComplete="off" placeholder='搜索歌曲、歌手、专辑' onChange={this.changeval.bind(this)} />
                </div>
            </form>
            {/* 热门搜索 */}
            <div className="m-hotlist">
                <h3 className="tit">热门搜索</h3>
                <ul className="list">
                    {SearchHot.map((ite) => {
                        return (<li key={ite.searchWord} className="item f-bd f-bd-full">
                            <a className="link" href="#">{ite.searchWord}</a>
                        </li>)
                    })}
                </ul>
            </div>

            {/* 搜索列表 */}
            <div className='search'>
                <h3 className="title f-bd f-bd-btm f-thide">搜索"{this.state.val}"</h3>
                <ul>
                    {searchlist.map((item) => {
                        return (
                            <NavLink key={item.keyword} className='recomitem' to={'/play/' + item.keyword}>
                                <i className="u-svg u-svg-search"></i>
                                <span className='f-bd f-bd-btm f-thide'>{item.keyword}</span>
                            </NavLink>

                            // <li onClick={this.toPlay.bind(this, item.id)} key={item.id}>
                            //     <i></i>
                            //     <span>{item.name} </span>
                            // </li>
                          
                    )
                    })}
                </ul>


            </div>
        </div>)
    }
}
export default Search