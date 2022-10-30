import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ExamleState {
  value: number
}

const initialState = { value: 0 } as ExamleState

const exampleSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state: any) {
      state.value++;
    },
    decrement(state: any) {
      state.value--;
    },
    incrementByAmount(state: any, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
})

export const { increment, decrement, incrementByAmount } = exampleSlice.actions
export default exampleSlice.reducer