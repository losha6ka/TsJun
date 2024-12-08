import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { HeaderEl } from "./elements/HeaderEl";
import { MainEl } from "./elements/MainEl";
import { FooterEl } from "./elements/Footer";

export const Construction: FC = () => {
    const construction = useSelector((state: RootState) => state.construction)
    return <div >
        {construction.headerMainFooter ?
            <div className="wrapper" style={{ gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}>
                <HeaderEl />
                <MainEl />
                <FooterEl />
            </div>
            : construction.headerMain ?
                <div className="wrapper" style={{ gridTemplateRows: "auto 1fr" }}>
                    <HeaderEl />
                    <MainEl />
                </div>
                : construction.mainFooter &&
                <div className="wrapper" style={{ gridTemplateRows: "1fr auto", minHeight: "100vh" }}>
                    <MainEl />
                    <FooterEl />
                </div>}
    </div >
}