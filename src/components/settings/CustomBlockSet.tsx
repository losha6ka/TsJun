import { FC } from "react";
import { updateTextBlock } from "../../store/reducers/blockReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ColorSet, withColorSet } from "./HOC/ColorSet";
import { TextSet } from "./HOC/TextSet";
interface CustomBlockSetProps {
    id: number,
    inputRef: any,
    blockText: any
}
export const CustomBlockSet: FC<CustomBlockSetProps> = ({ id, inputRef, blockText }) => {
    const decorationOption = useSelector((state: RootState) => state.customBlock?.decorationOption)
    const weightOption = useSelector((state: RootState) => state.customBlock?.weightOption)
    const dispatch = useDispatch()
    const handleUpdate = (property: string, value: string, id: number) => {
        const changes = { ...blockText, [property]: value };
        dispatch(updateTextBlock({ zone: blockText.zone, id, changes }));
        inputRef.current?.focus();
    }
    const handlerColorChange = (color: string, id: number) => {
        handleUpdate("textColor", color, id)
    };
    const handlerSizeChange = (size: string, id: number) => {
        handleUpdate("textSize", size, id)

    }
    const handlerWeightChange = (weight: string, id: number) => {
        handleUpdate("textWeight", weight, id)
    }
    const handlerDecChange = (decoration: string, id: number) => {
        handleUpdate("textDecoration", decoration, id)
    }
    const ColorSetComponent = withColorSet(ColorSet)
    return <div>
        <ColorSetComponent onColorChange={handlerColorChange} id={id} />
        <TextSet
            onSizeChange={handlerSizeChange}
            onWeightChange={handlerWeightChange}
            onDecorationChange={handlerDecChange}
            valueSize={blockText.textSize}
            valueWeight={blockText.textWeight}
            valueDec={blockText.textDecoration}
            decorationOption={decorationOption}
            weightOption={weightOption}
            id={id}
        />
    </div>
}