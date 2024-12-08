import {
    //  ChangeEvent, 
    FC,
    //  useState
} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToMenu, setHeader } from "../../store/reducers/headerReducer";
// import { ColorSet, withColorSet } from "./HOC/ColorSet";
// import { RootState } from "../../store/store";


export const HeaderSet: FC = () => { return <div></div> }
//     const logo = useSelector((state: RootState) => state.header.logo)
//     const dispatch = useDispatch()
//     const [value, setValue] = useState<string>("")
//     const handlerColorChange = (color: string) => dispatch(setHeader({ textColor: color }));
//     const ColorSetComponent = withColorSet(ColorSet)
//     const handlerValue = (e: ChangeEvent<HTMLInputElement>) => {
//         setValue(e.target.value)
//     }
//     const addList = (value: string) => {
//         if (value.trim()) {
//             dispatch(addToMenu(value));
//             setValue(""); // очищаем поле после добавления
//         }
//     }
//     const toggleLogo = () => {
//         dispatch(setHeader({ logo: !logo }))
//     }
//     return <div>
//         <input value={value} onChange={handlerValue} type="text" />
//         <button onClick={() => addList(value)}>add</button>
//         <div>
//             <input id="logo" type="checkbox" onClick={toggleLogo} />
//             <label htmlFor="logo">
//                 logo
//             </label>
//         </div>
//         <ColorSetComponent handlerColorChange={handlerColorChange} />
//     </div>
// }