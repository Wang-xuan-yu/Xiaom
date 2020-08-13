<template>
  <div class="box">
    <div class="login">
      <a>Login</a>
      <a>Logout</a>
    </div>
    <el-container>
      <!-- 头部区域 -->
      <el-header class="header">
        <span>
          sort by:
          <span @click="changSort">
            price:
            <i class="el-icon-d-caret" v-show="sort==0"></i>
            <i class="el-icon-caret-top" v-show="sort==1"></i>
            <i class="el-icon-caret-bottom" v-show="sort==2"></i>
          </span>
        </span>
      </el-header>
      <el-container>
        <!-- 左侧区域 -->
        <el-aside class="left">
          <h3>PRICE：</h3>
          <ul>
            <li
              v-for="(item,index) in prices"
              :key="index"
              :class="{act:pIndex==index}"
              @click="pIndex = index"
            >{{item}}</li>
          </ul>
        </el-aside>

        <!-- 内容区域 -->
        <el-main class="main">
            <div class="goods-list">
                <div class="item" v-for="(item,index) in goodsList" :key="index">
                    <img :src="'/static/img/'+item.productImage"/>
                    <p>{{item.productName}}</p>
                    <p>${{item.salePrice}}</p>
                    <el-button plain type="danger">加入购物车</el-button>
                </div>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
      this.getGoodsList();
  },
  data() {
    return {
      //左侧的价格区间
      pIndex: 0, //当前选中的价格索引值
      prices: [
        "All",
        "0.00-100.00",
        "100.00-500.00",
        "500.00-1000.00",
        "1000.00-2000.00",
        "2000.00-5000.00",
      ], //价格区间列表
      //价格排序
      sort: 0,
      goodsList: [],
    };
  },
  computed: {},
  methods: {
    //改变升序或者价格的降序
    changSort() {
      if (this.sort == 0 || this.sort == 2) {
        this.sort = 1;
      } else {
        this.sort = 2;
      }
    },

    //获取商品的列表数据
    getGoodsList(){
        this.$axios.get("/static/data.json")
        .then(res=>{
            console.log(res);
            this.goodsList = res.result.list;
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 90%;
  background: #f0f0f0;
  margin: 0px auto;
  padding-top: 5px;
  cursor: pointer;
  .login {
    width: 100%;
    text-align: right;
    line-height: 60px;
    background: #fff;
    margin-bottom: 10px;
  }
  .header {
    line-height: 60px;
    background: #fff;
    text-align: right;
    padding: 0px 10px;
    box-sizing: border-box;
  }
  //左侧区域的信息
  .left {
    width: 15% !important;
    padding: 10px;
    box-sizing: border-box;
    ul {
      padding: 0px;
      margin: 0px;
      list-style: none;
      width: 100%;
      li {
        line-height: 30px;
        font-size: 16px;
        margin-bottom: 10px;
      }
      li.act {
        border-left: #a00000 3px solid;
        color: #a00000;
        font-weight: bold;
        text-indent: 10px;
      }
    }
  }
  
  .main{
      width: 85% !important;
      .goods-list{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          .item{
              padding: 10px;
              box-sizing: border-box;
              width: 23%;
              margin:1%;
              min-height: 80px;
              background: #FFF;
              img{
                  width: 100%;
              }
              .el-button{
                  width: 100%;
              }
          }
      }
  }
}
</style>
