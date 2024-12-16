import { FC, useEffect, useRef, useState } from "react";
import { CustomBlock } from "./CustomBlock";
import { Construction } from "./Construction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { createNewBlock } from "../../store/reducers/blockReducer";
import { TextBlockI } from "../../types/MainTypes";
export const MainBlock: FC = () => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false)
    const [menuPos, setMenuPos] = useState<{ x?: number, y?: number }>({ x: 0, y: 0 })
    const blockRef = useRef<HTMLDivElement | null>(null)
    const blockText = useSelector((state: RootState) => state.customBlock?.textBlock)
    const dispatch = useDispatch()
    useEffect(() => {
        // Добавляем обработчик событий
        document.addEventListener("mousedown", offContextMenu);

        return () => {
            // Удаляем обработчик событий при размонтировании
            document.removeEventListener("mousedown", offContextMenu);
        };
    }, []);
    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (blockRef.current?.contains(e.target as Node)) {
            setMenuPos({ x: e.pageX, y: e.pageY })
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
        const newId = blockText.length > 0 ? Math.max(...blockText.map(item => item.id)) + 1 : 0;
        const newBlock: TextBlockI = {
            id: newId,
            text: "text",  // Установите текст по умолчанию или возьмите значение из состояния
            textColor: "black", // Установите цвет текста по умолчанию или используйте значение из состояния
            textSize: "16",     // Используем значение `size` из `useTextSettings`
            textWeight: "600",
            textDecoration: "none", // Используем значение `decoration` из `useTextSettings`
            decorationOption: [...blockText[0].decorationOption], // Используем значение `decoration` из `useTextSettings`
            weightOption: [...blockText[0].weightOption], // Используем значение `decoration` из `useTextSettings`
        }
        dispatch(createNewBlock(newBlock))
    }
    return <div className="main-block" onContextMenu={handleContextMenu} ref={blockRef}>
        {menuVisible && (
            <ul
                style={{
                    position: "absolute",
                    top: menuPos.y,
                    left: menuPos.x,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    listStyle: "none",
                    padding: "10px",
                    margin: 0,
                    zIndex: 1000,
                }}
            >
                <li
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => {
                        console.log("Action 1");
                        setMenuVisible(false); // Скрываем меню
                    }}
                >
                    <button onClick={() => onAddNewBlock()}>Добавить блок текста</button>

                </li>
            </ul>
        )}
        <CustomBlock />
        <Construction />
    </div>
}