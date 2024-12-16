import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeConstructionHM, changeConstructionHMF, changeConstructionMF } from "../../store/reducers/constructionReducer";

export const ConstructionSet: FC = () => {
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

    return <div>
        <h2>Изменить структуру</h2>
        <div>
            <button onClick={() => onChangeConstruction(HMF)}>Шапка Контент Подвал</button>
            <button onClick={() => onChangeConstruction(HM)}>Шапка Контент</button>
            <button onClick={() => onChangeConstruction(MF)}>Контент Подвал</button>
        </div>
    </div>
}