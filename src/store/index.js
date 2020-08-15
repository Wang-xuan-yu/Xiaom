import Vue from "vue";
import Vuex from "vuex";

//引入持久化
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

//实例化
let vuexLocal = new VuexPersist({
    storage: window.localStorage,
    key: "xiaomi_vuex"
})

export default new Vuex.Store({
    //数据源
    state:{
        user:"",
        cartList:[],
    },
    //计算属性
    getters:{

    },
    //修改数据源的内容
    mutations:{
        login(state,paylaod){
            state.user = paylaod;
        },
        //假如购物车操作
        addCart(state,payload){
            //判断此商品是否已经加入过购物车
            //获取传递过来商品是否在购物车列表中存在
            let index = state.cartList.findIndex(item=>{
                return item._id == payload._id;
            });

            if(index > -1 ){
                state.cartList.map(item=>{
                    item.num++;
                })
            }else{//没有添加过
                Vue.set(payload,"num",1);
                Vue.set(payload,"checked",true);
                // payload.num = 1;//商品数量
                // payload.checked = true;//控制是否选中

                state.cartList.push(payload);
            }
        },
        updateCart(state,payload){
            state.cartList = payload;
        }
    },
    //异步处理，提交mutations  commit()方法
    actions:{

    },
    //模块化区分
    modules:{

    },
    //引入插件即可
    plugins:[vuexLocal.plugin]
});