import React from 'react'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            userInfo:{
                username:'',
                password:'',
            }
        }
    }
    // 封装方法把输入框的值赋给userinfo
    changeUserInfo(type,e){
        let {userInfo} = this.state
        userInfo[type] = e.target.value
        this.setState({
            userInfo
        })
    }

    login(){
        if(this.state.userInfo.username==''||this.state.userInfo.password==''){
            alert('用户名或密码为空')
        }else{
            if(this.state.userInfo.username=='cga'&& this.state.userInfo.password=='123'){
                alert('登录成功')
            }else{
                alert('用户名或密码错误')
            }
        }
    }
    render(){
        return(<div>
            用户名：<input type ='text' onChange={this.changeUserInfo.bind(this,'username')}></input><br/>
            密码：<input type ='text' onChange={this.changeUserInfo.bind(this,'password')}></input><br/>
            <button onClick={this.login.bind(this)}>提交</button>
        </div>)
    }

}

export default Login