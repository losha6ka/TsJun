import { FC } from "react";
import { CustomBlock } from "../CustomBlock";

export const FooterEl: FC<{ currentZone: string | null }> = ({ currentZone }) => {
    return <div>
        <footer className="footer">Footer</footer>
        {currentZone === "footer" && <CustomBlock />}
    </div>
}