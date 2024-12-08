import { ChangeEvent, FC, useState } from "react";


interface WithTextSetProps {
    onSizeChange: (size: string, id: number) => void,
    onWeightChange: (weight: string, id: number) => void,
    onDecorationChange: (decoration: string, id: number) => void,
    valueSize: string,
    valueWeight: string,
    valueDec: string,
    decorationOption: string[],
    weightOption: string[]
    id: number
}

export const TextSet: FC<WithTextSetProps> = ({
    onSizeChange, onWeightChange, onDecorationChange,
    valueSize, valueWeight, valueDec,
    decorationOption, weightOption, id
}) => {
    const [localSize, setLocalSize] = useState<string>(valueSize);

    const onChangeWeight = (e: ChangeEvent<HTMLSelectElement>) => {
        onWeightChange(e.target.value, id);
    }

    const onChangeDec = (e: ChangeEvent<HTMLSelectElement>) => {
        onDecorationChange(e.target.value, id);
    }
    const onChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
        const newSize = e.target.value;
        setLocalSize(newSize);
        onSizeChange(newSize, id); // Передаем новое значение размера для конкретного блока
    };
    return <div>
        <div>
            Размер текста (Pixels)
            <input type="range" value={localSize} onChange={onChangeSize}
            />
        </div>
        <div >
            Толщина текста
            <select value={valueWeight} onChange={onChangeWeight}
            >
                {weightOption.map((w) => (
                    <option value={w} key={w}>{w}</option>
                ))}
            </select>
        </div>
        <div>
            Декорации
            <select value={valueDec} onChange={onChangeDec}
            >
                {decorationOption.map((d) => (
                    <option value={d} key={d}>{d}</option>
                ))}
            </select>
        </div>
    </div>
}