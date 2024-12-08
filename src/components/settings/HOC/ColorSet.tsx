import { FC } from "react";

const colors = ["red", "green", "black", "yellow"]

interface WithColorSetProps {
    onColorChange: (color: string, id: number) => void,
    id: number
}
export function withColorSet(Component: FC<WithColorSetProps>) {
    return ({ onColorChange, id }: WithColorSetProps) => <Component onColorChange={onColorChange} id={id} />
}
export const ColorSet: FC<WithColorSetProps> = ({ onColorChange, id }) => {
    return <div>
        {colors.map(c =>
        (<button onClick={() => onColorChange(c, id)}
            style={{ backgroundColor: c, width: "30px", height: "30px" }}
            key={c}>
        </button>))}
    </div>
}