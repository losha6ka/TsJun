import { FC } from "react";
import { CustomBlock } from "../CustomBlock";

export const HeaderEl: FC<{ currentZone: string | null }> = ({ currentZone }) => {
    return <div>
        <header className="header">Header</header>
        {currentZone === "header" && <CustomBlock />}
    </div>
}