import { createSlice } from "@reduxjs/toolkit";

const StudentSlice = createSlice({
    initialState:[],
    name:"students",
    reducers:{
        addStudent(state,action){
            state.push(action.payload)
        },
        updateStudent(state,action){
            const {index,name,subject,mark} = action.payload;
            state[index] = {index,name,subject,mark}
        },
        deleteStudent(state, action){
            const index = action.payload;
            state.splice(index, 1);
        },
    }
});

export const {addStudent,updateStudent,deleteStudent} = StudentSlice.actions;

export default StudentSlice.reducer