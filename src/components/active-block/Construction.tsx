import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { HeaderEl } from "./elements/HeaderEl";
import { MainEl } from "./elements/MainEl";
import { FooterEl } from "./elements/FooterEl";
import { createNewBlock, reorderTextBlocks } from "../../store/reducers/blockReducer";
import { TextBlockI } from "../../types/MainTypes";
import { arrayMove } from "@dnd-kit/sortable";
export const Construction: FC = () => {
    const dispatch = useDispatch()
    const blockTextHeader = useSelector((state: RootState) => state.customBlock?.header)
    const blockTextMain = useSelector((state: RootState) => state.customBlock?.main)
    const blockTextFooter = useSelector((state: RootState) => state.customBlock?.footer)
    const construction = useSelector((state: RootState) => state.construction)
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
        const newId = blockTextHeader.length > 0 ? Math.max(...blockTextHeader.map(item => item.id)) + 1 : 0;
        const newBlock: TextBlockI = {
            id: newId,
            text: "text",
            textColor: "black",
            textSize: "16",
            textWeight: "600",
            textDecoration: "none",
            zone: currentZone
        }
        dispatch(createNewBlock({ zone: currentZone, blocks: newBlock }))
        setMenuVisible(false); // Скрываем контекстное меню
    }
    const handleDragEnd = (e: any, block: any) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        const activeIndex = block.findIndex((el: any) => el.id === active.id);
        const overIndex = block.findIndex((el: any) => el.id === over.id);

        // Меняем порядок блоков
        const updatedBlocks = arrayMove(block, activeIndex, overIndex);

        // Обновляем состояние в Redux
        dispatch(reorderTextBlocks({ zone: currentZone, blocks: updatedBlocks }));
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
        {construction.headerMainFooter ?
            <div className="wrapper" style={{ gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}>
                <div onContextMenu={(e) => handleContextMenu(e, "header")}>
                    <HeaderEl handleDragEnd={handleDragEnd}
                        headerCustomBlock={blockTextHeader} />
                </div>
                <div onContextMenu={(e) => handleContextMenu(e, "main")}>
                    <MainEl handleDragEnd={handleDragEnd}
                        mainCustomBlock={blockTextMain} />
                </div>
                <div onContextMenu={(e) => handleContextMenu(e, "footer")}>
                    <FooterEl handleDragEnd={handleDragEnd}
                        footerCustomBlock={blockTextFooter} />
                </div>
            </div>
            : construction.headerMain ?
                <div className="wrapper" style={{ gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}>
                    <div onContextMenu={(e) => handleContextMenu(e, "header")}>
                        <HeaderEl handleDragEnd={handleDragEnd}
                            headerCustomBlock={blockTextHeader} />
                    </div>
                    <div onContextMenu={(e) => handleContextMenu(e, "main")}>
                        <MainEl handleDragEnd={handleDragEnd}
                            mainCustomBlock={blockTextMain} />
                    </div>
                </div>
                : construction.mainFooter &&
                <div className="wrapper" style={{ gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}>
                    <div onContextMenu={(e) => handleContextMenu(e, "main")}>
                        <MainEl handleDragEnd={handleDragEnd}
                            mainCustomBlock={blockTextMain} />
                    </div>
                    <div onContextMenu={(e) => handleContextMenu(e, "footer")}>
                        <FooterEl handleDragEnd={handleDragEnd}
                            footerCustomBlock={blockTextFooter} />
                    </div>
                </div>}
    </div >
}
