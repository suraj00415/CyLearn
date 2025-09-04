import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attackerMachine: null,
    targetMachine: [],
}

const machineSlice = createSlice({
    name: 'machine',
    initialState,
    reducers: {
        setAttackerMachine: (state, action) => {
            state.attackerMachine = action.payload
        },
        setTargetMachine: (state, action) => {
            state.targetMachine = action.payload
        },
        deteleTargetMachine: (state, action) => {
            state.targetMachine = state.targetMachine.filter((machine) => machine.id !== action.payload)
        },
        deleteAttackerMachine: (state) => {
            state.attackerMachine = null
        }
    }
})

export const { setAttackerMachine, setTargetMachine, deleteAttackerMachine, deteleTargetMachine } = machineSlice.actions

export default machineSlice.reducer

export const selectTargetMachine = (state: any) => state.machine.targetMachine
export const selectAttackerMachine = (state: any) => state.machine.attackerMachine
