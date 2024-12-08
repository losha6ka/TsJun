import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeConstructionHM, changeConstructionHMF, changeConstructionMF } from "../../store/reducers/constructionReducer";
import { RootState } from "../../store/store";
import { TextBlockI } from "../../types/MainTypes";
import { createNewBlock } from "../../store/reducers/blockReducer";

export const ConstructionSet: FC = () => {
    const blockText = useSelector((state: RootState) => state.customBlock?.textBlock)

    const dispatch = useDispatch()
    const HMF = "HMF"
    const HM = "HM"
    const MF = "MF"
    const onChangeConstruction = (c: string) => {
        if (c === HMF) {
            dispatch(changeConstructionHMF({}))
        } else if (c === HM) {
            dispatch(changeConstructionHM({}))
        } else {
            dispatch(changeConstructionMF({}))
        }
    }
    const onAddNewBlock = () => {
        const newId = blockText.length > 0 ? Math.max(...blockText.map(item => item.id)) + 1 : 0;

        const newBlock: TextBlockI = {
            id: newId,
            text: "text",  // Установите текст по умолчанию или возьмите значение из состояния
            textColor: "black", // Установите цвет текста по умолчанию или используйте значение из состояния
            textSize: "16",     // Используем значение `size` из `useTextSettings`
            textWeight: "600",
            textDecoration: "none", // Используем значение `decoration` из `useTextSettings`
            decorationOption: ["none"], // Используем значение `decoration` из `useTextSettings`
            weightOption: ["none"], // Используем значение `decoration` из `useTextSettings`
        }
        dispatch(createNewBlock(newBlock))
    }
    return <div>
        <div>
            <button onClick={() => onAddNewBlock()}>Добавить блок текста</button>
        </div>
        <h2>Изменить структуру</h2>
        <div>
            <button onClick={() => onChangeConstruction(HMF)}>Шапка Контент Подвал</button>
            <button onClick={() => onChangeConstruction(HM)}>Шапка Контент</button>
            <button onClick={() => onChangeConstruction(MF)}>Контент Подвал</button>
        </div>
    </div>
}