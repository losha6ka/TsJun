import { FC } from "react";
import { CustomBlock } from "./CustomBlock";
import { Construction } from "./Construction";
export const MainBlock: FC = () => {
    return <div className="main-block">
        <CustomBlock />
        <Construction />
    </div>
}