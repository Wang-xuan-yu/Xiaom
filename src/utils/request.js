//1. 引入一个axios对象
import axios from "axios";
//2. 创建Server实例
const Server = axios.create({
    baseURL: "",
    timeout: 3000
});


//3. 定义一个请求拦截器
Server.interceptors.request.use(function(config){
    //返回配置信息
    return config;
},function(error){
    return Promise.reject(error);
})


//4. 定义一个响应拦截器
Server.interceptors.response.use(function(response){
    if(response.status == 200){
        return response.data;
    }
    return response;
},function(error){
    return Promise.reject(error);
})

//5. 抛出Server实例
export default Server;