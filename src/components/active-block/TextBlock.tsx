import { useSortable } from "@dnd-kit/sortable";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTextBlock } from "../../store/reducers/blockReducer";
import { CSS } from "@dnd-kit/utilities";
import { CustomBlockSet } from "../settings/CustomBlockSet";

export const TextBlock: FC<{
    el: { id: number; text: string; textColor: string; textSize: string; textWeight: string; textDecoration: string },
    id: number,
    activeBlockId: number | null,
    setActiveBlockId: (id: number | null) => void
}> = ({ el, id, activeBlockId, setActiveBlockId }) => {
    const dispatch = useDispatch();
    const [valueText, setValueText] = useState(el.text);
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
        if (valueText !== el.text) {
            dispatch(updateTextBlock({ id: id, changes: { text: valueText } }));
        }
        setActiveBlockId(null); // Сброс активного блока

    };

    const onChangeMode = () => {
        if (activeBlockId !== id) {
            setActiveBlockId(id); // Устанавливаем текущий блок активным
        }
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
            if (valueText !== el.text) {
                dispatch(updateTextBlock({ id: id, changes: { text: valueText } }));
            }
            setActiveBlockId(null);
        }
    };

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        color: el.textColor,
        fontSize: el.textSize + "px",
        fontWeight: el.textWeight,
        textDecoration: el.textDecoration,

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
                        color: el.textColor,
                        fontSize: el.textSize + "px",
                        fontWeight: el.textWeight,
                        textDecoration: el.textDecoration,
                        fontFamily: "inherit",
                    }} /><CustomBlockSet id={el.id} inputRef={inputRef} /></div>
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