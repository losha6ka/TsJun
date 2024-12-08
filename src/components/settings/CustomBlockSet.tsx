import { FC } from "react";
import { updateTextBlock } from "../../store/reducers/blockReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ColorSet, withColorSet } from "./HOC/ColorSet";
import { TextSet } from "./HOC/TextSet";
export const CustomBlockSet: FC<{ id: number, inputRef: any }> = ({ id, inputRef }) => {
    const blockText = useSelector((state: RootState) => state.customBlock?.textBlock)
    const dispatch = useDispatch()

    const handlerColorChange = (color: string, id: number) => {
        dispatch(updateTextBlock({ id, changes: { ...blockText, textColor: color } }));
        inputRef.current?.focus();
    };
    const handlerSizeChange = (size: string, id: number) => {
        dispatch(updateTextBlock({ id, changes: { ...blockText, textSize: size } }));
        inputRef.current?.focus();
    }
    const handlerWeightChange = (weight: string, id: number) => {
        dispatch(updateTextBlock({ id, changes: { ...blockText, textWeight: weight } }));
        inputRef.current?.focus();

    }
    const handlerDecChange = (decoration: string, id: number) => {
        dispatch(updateTextBlock({ id, changes: { ...blockText, textDecoration: decoration } }));
        inputRef.current?.focus();

    }
    const ColorSetComponent = withColorSet(ColorSet)
    return <div>
        {blockText?.filter((el) => el.id === id).map((el) => <div key={id}>
            <ColorSetComponent onColorChange={handlerColorChange} id={id} />
            <TextSet
                onSizeChange={handlerSizeChange}
                onWeightChange={handlerWeightChange}
                onDecorationChange={handlerDecChange}
                valueSize={el.textSize}
                valueWeight={el.textWeight}
                valueDec={el.textDecoration}
                decorationOption={blockText[0].decorationOption}
                weightOption={blockText[0].weightOption}
                id={id}
            />
        </div>)}
    </div>
}