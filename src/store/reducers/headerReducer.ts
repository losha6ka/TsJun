import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeaderI } from "../../types/MainTypes";

const initialState: HeaderI = {
    width: "100%",
    height: "100px",
    logo: false,
    menu: [],
    bgColor: "white",
    textColor: "black"
}

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setHeader: (state, action: PayloadAction<Partial<HeaderI>>) => {
            return { ...state, ...action.payload }
        },
        addToMenu: (state, action: PayloadAction<string>) => {
            if (state.menu) {
                const newList = {
                    id: state.menu.length > 0 ? state.menu[state.menu?.length - 1].id + 1 : 0,
                    list: action.payload
                }
                state.menu?.push(newList)
            }
        },
        deleteMenuList: (state, action: PayloadAction<number>) => {
            state.menu = state.menu?.filter(item => item.id !== action.payload)
        }
    }

})

export const { setHeader, addToMenu, deleteMenuList } = headerSlice.actions;
export default headerSlice.reducer