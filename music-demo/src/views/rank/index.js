import React from 'react'
// 导入封装好的后台接口
import { getRank } from '../../util/axios'
// 导入样式
import '../../assets/css/rank.css'
// 导入路由属性
import { NavLink } from 'react-router-dom'
class Rank extends React.Component {
    constructor() {
        super()
        this.state = {
            ranklist: []

        }
    }
    //变成两位
    toTwo(n){
        if(n>=10){
            return n
        }else if(n<10){
            return ('0'+n)
        }
    }
    componentDidMount() {
        //推荐歌单
        getRank({
            id: 3778678
        })
            .then(res => {
                console.log(res, '排行榜');
                let newarr = res.data.playlist.tracks.filter((item,index,arr)=>{
                    return index<20
                })
                this.setState({
                    ranklist: newarr
                })
            })
            .catch(err => {
                console.log('推荐歌单请求失败');
            })
    }
    render() {
        const { ranklist } = this.state;
        return (<div className='rank'>
            <div className="hotop">
                <div className="hotopct">
                    <div className="u-hmsprt hoticon">
                    </div>
                    <div className="hottime">更新日期：11月19日
                    </div>
                </div>
            </div>
            {/* 排行榜 */}
            <div className='sglst'>
                {ranklist.map((item,i) => {
                    return (
                        <NavLink key={item.id} className='m-sgitem' to={'/play/' + item.id}>
                             <div className={i<3?'sgfl sgfl-cred':'sgfl'}>{this.toTwo(i+1)}</div>
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
        </div>)
    }
}
export default Rank