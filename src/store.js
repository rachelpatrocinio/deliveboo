import { reactive } from 'vue'

export const store = reactive({
  port: '8000', // API PORT
  chart: [],
  total_price: 0,
  total_qty: 0,
  restaurant_id: 0,
  diffDish: ''
})