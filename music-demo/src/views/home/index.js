import React from 'react'
import Swiper from 'swiper';
import axios from 'axios'
import '../../../node_modules/swiper/css/swiper.min.css'
import '../../../node_modules/swiper/js/swiper.min.js'

// 导入封装好的后台接口
import { getPersonalized, getNewsong, getBanner } from '../../util/axios'
//引入样式
import "../../assets/css/home.css";
//引入路由属性
import { NavLink } from "react-router-dom";
// 引入静态资源

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            songlist: [],
            bannerlist: [
            ],
            newsonglist: [

            ]

        }
    }
    // 封装函数
    golist(id) {
        // console.log(this, 'hahaha哈哈');
        this.props.history.push(`/list?id=${id}`)
    }
    // 挂载之后调用接口
    componentDidMount() {
        axios.all([getPersonalized({ limit: 6 }), getNewsong({ limit: 8 }), getBanner({ type: 2 })])
            .then(axios.spread((PersonalizedList, NewsongList, BannerList) => {
                console.log(PersonalizedList, '并发');
                if (PersonalizedList.data.code === 200) {
                    this.setState({
                        songlist: PersonalizedList.data.result
                    })
                }

                if (NewsongList.data.code === 200) {
                    this.setState({
                        newsonglist: NewsongList.data.result
                    })
                }

                // console.log(bannerList);
                if (BannerList.data.code === 200) {
                    this.setState({
                        bannerlist: BannerList.data.banners
                    },()=>{
                        let swiper = new Swiper(".swiper-container", {
                            loop: true, //循环播放
                            //autoplay:true //自动切换，如果不设置时间，默认是三秒切换
                            autoplay: {
                                //自定义配置
                                delay: 2000, //时间毫秒制
                            },
                            pagination: {
                                el: '.swiper-pagination'//元素，你的分页的位置
                            }
                        });
                    })
                }
            }))
    }
    componentDidUpdate() {
        // let swiper = new Swiper(".swiper-container", {
        //     loop: true, //循环播放
        //     //autoplay:true //自动切换，如果不设置时间，默认是三秒切换
        //     autoplay: {
        //         //自定义配置
        //         delay: 2000, //时间毫秒制
        //     },
        //     pagination: {
        //         el: '.swiper-pagination'//元素，你的分页的位置
        //     }
        // });
    }
    render() {
        const { bannerlist, songlist, newsonglist } = this.state
        // console.log(songlist);
        // console.log(newsonglist);
        return (<div className='home'>
            {/* 轮播图 */}
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {bannerlist.map((item) => {
                        return (
                            <div className="swiper-slide" key={item.bannerId}>
                                <img src={item.pic}></img>
                            </div>
                        )
                    })}
                </div>
            </div>

            <h2 className='remd_tl'>推荐歌单</h2>
            <ul className='remd_ul'>
                {songlist.map((item) => {
                    return (
                        <li className='remd_li' key={item.id} onClick={this.golist.bind(this, item.id)}>
                            <div className="remd_img">
                                <img className='img' src={item.picUrl}></img>
                                <span className="u-earp remd_lnum">{(item.playCount / 10000).toFixed(1)}万</span>
                            </div>
                            <p className='remd_text'>{item.name}</p>
                        </li>
                    )
                })}
            </ul>


            <h2 className='remd_tl'>最新音乐</h2>
            <div className='sglst'>
                {newsonglist.map((item) => {
                    return (
                        <NavLink key={item.id} className='m-sgitem' to={'/play/' + item.id}>
                            <div className="sgfr f-bd f-bd-btm">
                                <div className="sgchfl">
                                    <div className="f-thide sgtl">{item.name}</div>
                                    <div className="f-thide sginfo">
                                        <i className="u-hmsprt sghot"></i>
                                        {item.song.artists[0].name}{item.song.name}
                                    </div>
                                </div>
                                <div className="sgchfr">
                                    <span className="u-hmsprt sgchply"></span>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>


        </div>)
    }
}
export default Home