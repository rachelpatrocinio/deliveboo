import { reactive } from 'vue'

export const store = reactive({
  port: '8000', // API PORT
  chart: [],
  total_price: 0,
  total_qty: 0,
  restaurant_id: 0,
  diffDish: '',

  windowScroll(){
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  },

  pageScroll(){
    window.scrollTo({ top: 620, left: 0, behavior: "smooth" });
  }
})