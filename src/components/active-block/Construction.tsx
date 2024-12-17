import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { HeaderEl } from "./elements/HeaderEl";
import { MainEl } from "./elements/MainEl";
import { FooterEl } from "./elements/Footer";
import { createNewBlockHeader, createNewBlockMain, createNewBlockFooter } from "../../store/reducers/blockReducer";
import { TextBlockI } from "../../types/MainTypes";
export const Construction: FC = () => {
    const dispatch = useDispatch()
    // const construction = useSelector((state: RootState) => state.construction)
    const blockText = useSelector((state: RootState) => state.customBlock?.textBlock)
    const [menuVisible, setMenuVisible] = useState<boolean>(false)
    const [menuPos, setMenuPos] = useState<{ x?: number, y?: number }>({ x: 0, y: 0 })
    const [currentZone, setCurrentZone] = useState<string | null>(null); // Зона, где произошел ПКМ
    const blockRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        document.addEventListener("mousedown", offContextMenu);
        return () => {
            document.removeEventListener("mousedown", offContextMenu);
        };
    }, []);
    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, zone: string) => {
        e.preventDefault()
        if (blockRef.current?.contains(e.target as Node)) {
            setMenuPos({ x: e.pageX, y: e.pageY })
            setCurrentZone(zone)
            setMenuVisible(true)
        }
    }
    const offContextMenu = (e: MouseEvent) => {
        if (!blockRef.current?.contains(e.target as Node)) {
            setMenuPos({ x: 0, y: 0 })
            setMenuVisible(false)
        }
    }

    const onAddNewBlock = () => {
        if (!currentZone) return; // Проверяем, что зона определена
        const newId = blockText.length > 0 ? Math.max(...blockText.map(item => item.id)) + 1 : 0;
        const newBlock: TextBlockI = {
            id: newId,
            text: "text",
            textColor: "black",
            textSize: "16",
            textWeight: "600",
            textDecoration: "none",
            decorationOption: [...blockText[0].decorationOption],
            weightOption: [...blockText[0].weightOption],
        }
        if (currentZone === "header") {
            dispatch(createNewBlockHeader(newBlock))
        } else if (currentZone === "main") {
            dispatch(createNewBlockMain(newBlock))
        } else if (currentZone === "footer") {
            dispatch(createNewBlockFooter(newBlock))
        }
        setMenuVisible(false); // Скрываем контекстное меню
    }
    return <div ref={blockRef}>
        {menuVisible && (
            <ul
                style={{
                    position: "absolute",
                    top: menuPos.y,
                    left: menuPos.x,
                    zIndex: 1000,
                }}
            >
                <li>
                    <button onClick={() => onAddNewBlock()}>Добавить блок текста</button>
                </li>
            </ul>
        )}
        {/* {construction.headerMainFooter ? */}
        <div className="wrapper" style={{ gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}>
            <div onContextMenu={(e) => handleContextMenu(e, "header")}>
                <HeaderEl currentZone={currentZone} />
            </div>
            <div onContextMenu={(e) => handleContextMenu(e, "main")}>
                <MainEl currentZone={currentZone} />
            </div>
            <div onContextMenu={(e) => handleContextMenu(e, "footer")}>
                <FooterEl currentZone={currentZone} />
            </div>
        </div>
        {/* : construction.headerMain ?
                <div className="wrapper" style={{ gridTemplateRows: "auto 1fr" }}>
                    <HeaderEl />
                    <MainEl />
                </div>
                : construction.mainFooter &&
                <div className="wrapper" style={{ gridTemplateRows: "1fr auto", minHeight: "100vh" }}>
                    <MainEl />
                    <FooterEl />
                </div>} */}
    </div >
}