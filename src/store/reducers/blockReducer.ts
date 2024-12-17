import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomBlockI, TextBlockI } from "../../types/MainTypes";

const initialState: CustomBlockI = {
    header: [],
    main: [],
    footer: [],
    textBlock: [
        {
            id: 0,
            text: "text",
            textSize: "16",
            textWeight: "600",
            textColor: "black",
            textDecoration: "",
            // textFamily: "",
            decorationOption: ["none", "underline", "underline dotted", "underline wavy", "underline overline"],
            weightOption: ["400", "500", "600", "900"],
        }
    ],
    buttonsBlock: [],
    imgBlock: []
}

const customBlockSlice = createSlice({
    name: "customBlockSlice",
    initialState,
    reducers: {
        createNewBlockHeader: (state, action: PayloadAction<TextBlockI>) => {
            if (state.textBlock) {
                const newTBlock = {
                    id: action.payload.id,
                    text: action.payload.text,
                    textSize: action.payload.textSize,
                    textWeight: action.payload.textWeight,
                    textColor: action.payload.textColor,
                    textDecoration: action.payload.textDecoration,
                    decorationOption: action.payload.decorationOption,
                    weightOption: action.payload.weightOption
                }
                state.header?.push(newTBlock)
            }
        },
        createNewBlockMain: (state, action: PayloadAction<TextBlockI>) => {
            if (state.textBlock) {
                const newTBlock = {
                    id: action.payload.id,
                    text: action.payload.text,
                    textSize: action.payload.textSize,
                    textWeight: action.payload.textWeight,
                    textColor: action.payload.textColor,
                    textDecoration: action.payload.textDecoration,
                    decorationOption: action.payload.decorationOption,
                    weightOption: action.payload.weightOption
                }
                state.main?.push(newTBlock)
            }
        },
        createNewBlockFooter: (state, action: PayloadAction<TextBlockI>) => {
            if (state.textBlock) {
                const newTBlock = {
                    id: action.payload.id,
                    text: action.payload.text,
                    textSize: action.payload.textSize,
                    textWeight: action.payload.textWeight,
                    textColor: action.payload.textColor,
                    textDecoration: action.payload.textDecoration,
                    decorationOption: action.payload.decorationOption,
                    weightOption: action.payload.weightOption
                }
                state.footer?.push(newTBlock)
            }
        },
        updateTextBlock: (state, action: PayloadAction<{ id: number; changes: Partial<TextBlockI> }>) => {
            state.textBlock = state.textBlock.map((block) =>
                block.id === action.payload.id
                    ? { ...block, ...action.payload.changes } // Обновляем только указанные свойства
                    : block
            );
        },
        reorderTextBlocks: (state, action: PayloadAction<TextBlockI[]>) => {
            state.textBlock = action.payload;
        }
    }
})

export const { updateTextBlock, createNewBlockHeader, createNewBlockMain, createNewBlockFooter, reorderTextBlocks } = customBlockSlice.actions
export default customBlockSlice.reducer