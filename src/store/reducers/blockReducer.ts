import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomBlockI, TextBlockI } from "../../types/MainTypes";

const initialState: CustomBlockI = {
    header: [{
        id: 0,
        text: "text",
        textSize: "16",
        textWeight: "600",
        textColor: "black",
        textDecoration: "none",
        // textFamily: "",
        zone: "header"
    }],
    main: [{
        id: 0,
        text: "text",
        textSize: "16",
        textWeight: "600",
        textColor: "black",
        textDecoration: "none",
        // textFamily: "",
        zone: "header"
    }],
    footer: [{
        id: 0,
        text: "text",
        textSize: "16",
        textWeight: "600",
        textColor: "black",
        textDecoration: "none",
        // textFamily: "",
        zone: "header"
    }],
    decorationOption: ["none", "underline", "underline dotted", "underline wavy", "underline overline"],
    weightOption: ["400", "500", "600", "900"],
    buttonsBlock: [],
    imgBlock: []
}

const customBlockSlice = createSlice({
    name: "customBlockSlice",
    initialState,
    reducers: {
        createNewBlock: (state, action: PayloadAction<{ zone: string | null, blocks: TextBlockI }>) => {
            const newTBlock = {
                id: action.payload.blocks.id,
                text: action.payload.blocks.text,
                textSize: action.payload.blocks.textSize,
                textWeight: action.payload.blocks.textWeight,
                textColor: action.payload.blocks.textColor,
                textDecoration: action.payload.blocks.textDecoration,
                zone: action.payload.zone
            }
            if (action.payload.zone === "header") {
                state.header?.push(newTBlock)
            } else if (action.payload.zone === "main") {
                state.main?.push(newTBlock)
            } else if (action.payload.zone === "footer") {
                state.footer?.push(newTBlock)
            }
        },
        updateTextBlock: (state, action: PayloadAction<{ zone: string | null, id: number; changes: Partial<TextBlockI> }>) => {
            if (action.payload.zone === "header") {
                state.header = state.header.map((block) =>
                    block.id === action.payload.id
                        ? { ...block, ...action.payload.changes }
                        : block
                );
            } else if (action.payload.zone === "main") {
                state.main = state.main.map((block) =>
                    block.id === action.payload.id
                        ? { ...block, ...action.payload.changes }
                        : block
                );
            } else if (action.payload.zone === "footer") {
                state.footer = state.footer.map((block) =>
                    block.id === action.payload.id
                        ? { ...block, ...action.payload.changes }
                        : block
                );
            }
        },
        reorderTextBlocks: (state, action: PayloadAction<{ zone: string | null, blocks: any }>) => {
            if (action.payload.zone === "header") {
                state.header = action.payload.blocks;
            } else if (action.payload.zone === "main") {
                state.main = action.payload.blocks;
            } else if (action.payload.zone === "footer") {
                state.footer = action.payload.blocks;
            }
        }
    }
})

export const { createNewBlock,
    updateTextBlock,
    reorderTextBlocks } = customBlockSlice.actions
export default customBlockSlice.reducer