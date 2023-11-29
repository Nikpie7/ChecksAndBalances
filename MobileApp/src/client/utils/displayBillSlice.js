import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: "",
    title: "",
    billType: "",
    billNumber: "",
    congressNum: -1,
    lastUpdated: "",
    committee: "",
    relatedInterest: "",
    sponsor: "",
    cosponsors: [],
    summary: "",
    accessVotes: {
        democrat: -1,
        republican: -1,
        independent: -1
    },
    subject: "",
    billAmendments: [],
    billActions: "",

};

const displayBillSlice = createSlice({
    name: 'displayBill',
    initialState,
    reducers: {
      displayBillUpdate(state, action) {
        state = action.payload
      }
    }
  })
  
  export const { displayBillUpdate } = displayBillSlice.actions
  
  export default displayBillSlice.reducer