import { FC } from "react";
import { CustomBlock } from "../CustomBlock";

export const MainEl: FC<{ currentZone: string | null }> = ({ currentZone }) => {
    return <div>
        <main className="main">Main</main>
        {currentZone === "main" && <CustomBlock />}
    </div>
}