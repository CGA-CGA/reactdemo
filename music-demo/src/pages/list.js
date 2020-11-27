import React from 'react'
import '../assets/css/list.css'
import {getPlayList } from '../util/axios'
// 导入路由属性
import { NavLink } from 'react-router-dom'
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            playList: {},
            songList: [],
        };
    }
    //跳转播放页面
  toPlay(id) {
    this.props.history.push(`/play?id=${id}`)
  }
    componentDidMount() {
        let query = this.props.location.search.slice(1)
        let queryarr = query.split('&')
        let obj = {}
        queryarr.forEach(item => {
            let temarr = item.split('=');
            obj[temarr[0]] = temarr[1]
        });
        getPlayList({
            id:obj.id
        })
        .then(res=>{
            console.log(res,'歌单详情');
            if (res.data.code == 200) {
                this.setState({
                  playList: res.data.playlist,
                  songList: res.data.playlist.tracks,
                });
              }
        })
    }
    render() {

        return (
            <div className="list">
                <div className="top">
                    <div className="left">
                        <img src={this.state.playList.coverImgUrl}></img>
                    </div>
                    <div className="right">
                        <h3>{this.state.playList.name}</h3>
                        <div className="nick">
                            <img src={this.state.playList.creator ? this.state.playList.creator.avatarUrl : ''}></img>
                            <p>{this.state.playList.creator ? this.state.playList.creator.nickname : ''}</p>
                        </div>
                    </div>
                </div>
                
                <div className='sglst'>
                <h3>歌曲列表</h3>
                {this.state.songList.map((item, i) => {
                    return (
                        <NavLink key={item.id} className='m-sgitem' to={'/play/' + item.id}>
                             <div className='sgfl'>{i+1}</div>
                            <div className="sgfr f-bd f-bd-btm">
                                <div className="sgchfl">
                                   
                                    <div className="f-thide sgtl">{item.name}</div>
                                    <div className="f-thide sginfo">
                                        <i className="u-hmsprt sghot"></i>
                                        {item.ar[0].name}
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
            <div className="store">
                        <div>收藏歌单</div>
            </div>
                {/* <div className="song">
                   
                    <ul className="songList">
                        {this.state.songList.map((item, idx) => {
                            return (
                                <li key={item.id} onClick={this.toPlay.bind(this, item.id)}>
                                    <h4>
                                        {item.name}
                                        <span style={{ color: "#ccc" }}>
                                            {" "}
                                            {item.alia.length > 0 ? `(${item.alia[0]})` : ""}
                                        </span>
                                    </h4>
                                    <p>
                                        {item.ar.map((ar) => {
                                            return <span key={ar.id}>{ar.name}</span>;
                                        })}
                          -<span>{item.name}</span>
                                    </p>
                                    <span className="player"></span>
                                    <i className="numGray">{idx + 1} </i>
                                </li>
                            );
                        })}
                    </ul>
                    
                </div> */}
            </div>
       
        )
    }
}

export default Home