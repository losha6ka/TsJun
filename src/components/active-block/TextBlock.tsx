import { useSortable } from "@dnd-kit/sortable";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTextBlock } from "../../store/reducers/blockReducer";
import { CSS } from "@dnd-kit/utilities";
import { CustomBlockSet } from "../settings/CustomBlockSet";

export const TextBlock: FC<{
    id: number,
    activeBlockId: number | null,
    setActiveBlockId: (id: number | null) => void,
    blockText: any
}> = ({ id, activeBlockId, setActiveBlockId, blockText }) => {
    const dispatch = useDispatch();
    const [valueText, setValueText] = useState(blockText.text);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const inputRef = useRef<HTMLInputElement | null>(null)
    const blockRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (activeBlockId === id) {
            const timer = setTimeout(() => {
                inputRef.current?.focus()
            }, 50)
            return () => clearTimeout(timer);
        }
    }, [activeBlockId, id]);
    useEffect(() => {
        // Добавляем обработчик событий
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Удаляем обработчик событий при размонтировании
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setValueText(e.target.value);
    };

    const offChangeMode = () => {
        if (valueText !== blockText.text) {
            dispatch(updateTextBlock({ zone: blockText.zone, id: id, changes: { text: valueText } }));
        }
        setActiveBlockId(null); // Сброс активного блока

    };

    const onChangeMode = () => {
        if (activeBlockId !== id) {
            setActiveBlockId(id); // Устанавливаем текущий блок активным
        }
        console.log(blockText)
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
            if (valueText !== blockText.text) {
                dispatch(updateTextBlock({ zone: blockText.zone, id: id, changes: { text: valueText } }));
            }
            setActiveBlockId(null);
        }
    };

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        color: blockText.textColor,
        fontSize: blockText.textSize + "px",
        fontWeight: blockText.textWeight,
        textDecoration: blockText.textDecoration,

    }
    return (<div>
        {activeBlockId === id ? (
            <div
                ref={blockRef}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        offChangeMode();
                    }
                }}
            ><input
                    ref={inputRef}
                    value={valueText}
                    onChange={handleChangeText}
                    style={{
                        color: blockText.textColor,
                        fontSize: blockText.textSize + "px",
                        fontWeight: blockText.textWeight,
                        textDecoration: blockText.textDecoration,
                        fontFamily: "inherit",
                    }} /><CustomBlockSet blockText={blockText} id={blockText.id} inputRef={inputRef} /></div>
        ) : (
            <div
                ref={activeBlockId !== id ? setNodeRef : undefined}
                {...(activeBlockId !== id ? { ...attributes, ...listeners } : {})}
                style={style}
                onMouseUp={onChangeMode}
            >
                {valueText}
            </div>
        )}
    </div>
    );
};