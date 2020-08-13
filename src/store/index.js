import Vue from "vue";
import Vuex from "vuex";

//引入持久化
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

//实例化
let vuexLocal = new VuexPersist({
    storage: window.localStorage
})

export default new Vuex.Store({
    //数据源
    state:{

    },
    //计算属性
    getters:{

    },
    //修改数据源的内容
    mutations:{

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