<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button 
        class="check-button" 
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calc" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkBtn/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components:{
    CheckButton
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>item.checked=false)
      }
      else{
        this.cartList.forEach(item=>item.checked=true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择商品后再结算',2000)
      }
    }
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item=>item.checked).reduce((pre,item)=>{
        return pre + item.price * item.count
      },0)
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      if (this.cartList.length==0) return false //当carlist中没有元素时
      return !this.cartList.find(item=>!item.checked)
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    background-color: #eee;
    position: relative;
    display: flex;
    bottom: 145px;
    line-height: 50px;
  }
  .check-area{
    display: flex;
    align-items: center;
    width: 70px;
    
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 0 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calc{
    width: 100px;
    text-align: center;
    color: #fff;
    background-color: var(--color-high-text);
  }
</style>