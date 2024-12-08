import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SiteConstructionI } from "../../types/MainTypes";

const initialState: SiteConstructionI = {
    headerMainFooter: true,
    headerMain: false,
    mainFooter: false
}

const constructionSlice = createSlice({
    name: "construction",
    initialState,
    reducers: {
        changeConstructionHMF: (state, action: PayloadAction<Partial<SiteConstructionI>>) => {
            Object.assign(state, { headerMainFooter: true, headerMain: false, mainFooter: false, ...action.payload })
        },
        changeConstructionHM: (state, action: PayloadAction<Partial<SiteConstructionI>>) => {
            Object.assign(state, { headerMainFooter: false, headerMain: true, mainFooter: false, ...action.payload })
        },
        changeConstructionMF: (state, action: PayloadAction<Partial<SiteConstructionI>>) => {
            Object.assign(state, { headerMainFooter: false, headerMain: false, mainFooter: true, ...action.payload })
        }
    }
})

export const { changeConstructionHMF, changeConstructionHM, changeConstructionMF } = constructionSlice.actions
export default constructionSlice.reducer