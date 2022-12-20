import { createSlice, configureStore } from "@reduxjs/toolkit";



export const socketSlice = createSlice({
    name: "socket",
    initialState : {socketStorage : null} as any,
    reducers : {
        storeSocket(state, action){
            const socket = action.payload;
            state.socketStorage = socket;
            console.log(state.socketStorage);   
        },
        giveSocket(state){
            if(state.socketStorage === null) return;

            return {...state?.socketStorage};
        }
    }
})

export const socketStore = configureStore({reducer : socketSlice.reducer})