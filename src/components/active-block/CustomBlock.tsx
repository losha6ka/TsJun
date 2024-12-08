import { FC } from "react";
import {
    // useDispatch,
    useSelector
} from "react-redux";
import { RootState } from "../../store/store";
import { CustomTextBlock } from "./CustomTextBlock";
// import { deleteMenuList } from "../../store/reducers/headerReducer";
export const CustomBlock: FC = () => {
    const header = useSelector((state: RootState) => state.header)
    // const dispatch = useDispatch()
    // const deleteList = (id: number) => {
    //     dispatch(deleteMenuList(id))
    // }
    return <div>
        <header style={{ width: header.width, height: header.height, }}>
            {/* {header.logo && <div>Your logo <input type="file" /></div>}
            <ul>
                {header.menu?.map(m => <li style={{ color: header.textColor }} key={m.id}>{m.list}
                    <button onClick={() => deleteList(m.id)}>x</button></li>)}
            </ul> */}
        </header>
        <CustomTextBlock />
    </div>
}