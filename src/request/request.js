import axios from 'axios'

export default {
    /**
     * 用户登录接口
     */
    login(params) {
        return axios.get('/login',{
            params:params
        });
    },  
    /**
     * 用户注册接口
     */
    register(params){
        return axios.post('/register',params);
    },
    /**
     * 获取好友列表
     */
    getFriendList(){
        return axios.get('/getList');
    },
    /**
     * 获取某个好友的个人信息
     */
    getFriendInfor(params){
        return axios.get('/getUserInfor',{
            params:params
        });
    },
    /**
     * 获取与某个好友的聊天记录
     */
    getRecord(params){
        return axios.get('/getChatRecord',{
            params:params
        });
    },
    /**
     * 发消息给某个好友
     */
    sendMessage(params){
        return axios.post('/sendContent',params);
    },
    /**
     * 获取未读消息
     */
    getUnreadMessage(){
        return axios.get('/getUnreadChatRecord');
    }
    
}


