import { configureStore } from '@reduxjs/toolkit'

import displayBillReducer from '../utils/displayBillSliceSlice'

export default configureStore({
  reducer: {
    displayBill: displayBillReducer
  }
})