import { FC } from "react";
import { CustomTextBlock } from "./CustomTextBlock";
export const CustomBlock: FC = () => {
    return <div className="custom-block" >
        <CustomTextBlock />
    </div>
}
// const header = useSelector((state: RootState) => state.header)
// const dispatch = useDispatch()
// const deleteList = (id: number) => {
//     dispatch(deleteMenuList(id))
// }
{/* {header.logo && <div>Your logo <input type="file" /></div>}
<ul>
    {header.menu?.map(m => <li style={{ color: header.textColor }} key={m.id}>{m.list}
        <button onClick={() => deleteList(m.id)}>x</button></li>)}
</ul> */}