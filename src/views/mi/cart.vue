<template>
  <div>
      <el-container>
          <el-header>
              <h3>我的购物车</h3>
          </el-header>
          <el-main>
              <el-table :data="cartList">
                  <el-table-column label="全选">
                      <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.checked"></el-checkbox>
                      </template>
                  </el-table-column>
                   <el-table-column label="商品">
                       <template slot-scope="scope">
                           <img :src="'/static/img/'+scope.row.productImage" style="width: 80px"/>
                           <p v-text="scope.row.productName"></p>
                      </template>
                  </el-table-column>
                  <el-table-column label="价格">
                      <template slot-scope="scope">
                          ￥<span v-text="scope.row.salePrice"></span>
                      </template>
                  </el-table-column>
                  <el-table-column label="数量">
                      <template slot-scope="scope">
                          <el-input-number v-model="scope.row.num" :min="1"></el-input-number>
                      </template>
                  </el-table-column>
                  <el-table-column label="小计">
                      <template slot-scope="scope">
                          ￥<span v-text="scope.row.salePrice*scope.row.num"></span>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                          <i class="el-icon-delete" style="font-size: 22px;" @click="remove(scope.row._id)"></i>
                      </template>
                  </el-table-column>
              </el-table>

              <el-footer style="display:flex;justify-content: space-between;line-height: 60px;background: #F0F0F0;">
                  <div>
                      <input type="checkbox" v-model="checked" @change="checkAll"/> 全选 
                  </div>
                  <div>
                      totalAmounts: <strong >￥{{totalAmount}}</strong>
                      <el-button type="danger" size="mini">CHECKOUT</el-button>
                  </div>
              </el-footer>
          </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
      this.cartList = this.$store.state.cartList;
  },
  data() {
    return {
        cartList:[],
        checked: true,
    };
  },
  computed:{
      totalAmount(){
          if(this.cartList.length>0){
              this.$store.commit("updateCart",this.cartList);
          }
          let amount = 0;

          this.cartList.forEach(item=>{
              //判断是否选中
              if(item.checked == true){
                  amount += item.salePrice*item.num;
              }
          })

          return amount;
      }
  },
  watch:{
      cartList:{
          handler(newValue){
              console.log(newValue);
              let nums = 0;
              newValue.forEach(item=>{
                  if(item.checked == true){
                      nums++;
                  }
              })

              if(nums == newValue.length){
                  this.checked = true;
              }else{
                  this.checked = false;
              }
          },
          deep:true,
      }
  },
  methods: {
      checkAll(e){
          console.log(e.target.checked);
          //设置全选和全不选
          this.cartList.forEach(item=>{
              item.checked = e.target.checked
          })
      },
      remove(id){
          let index = this.cartList.findIndex(item=>{
              return item._id == id;
          })
          this.cartList.splice(index,1);

          this.$store.commit("updateCart",this.cartList);
      }
  },
};
</script>

<style scoped>

</style>
