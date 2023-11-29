import { configureStore } from '@reduxjs/toolkit'

import displayBillReducer from '../utils/displayBillSlice'

export default configureStore({
  reducer: {
    displayBill: displayBillReducer
  }
})