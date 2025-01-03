import { FC, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { DndContext, closestCorners } from "@dnd-kit/core";
import { TextBlock } from "../TextBlock";
import { TextBlockI } from "../../../types/MainTypes";
interface HeaderElProps {
    handleDragEnd: (e: any, block: any) => void,
    headerCustomBlock: TextBlockI[]
}
export const HeaderEl: FC<HeaderElProps> = ({ handleDragEnd, headerCustomBlock }) => {
    const [activeBlockId, setActiveBlockId] = useState<number | null>(null); // Состояние активного блока

    return (<div>
        <header className="header">Header</header>
        <DndContext onDragEnd={(e) => handleDragEnd(e, headerCustomBlock)} collisionDetection={closestCorners}>
            <SortableContext items={headerCustomBlock} strategy={verticalListSortingStrategy}>
                {headerCustomBlock?.filter((el: any) => el.id > 0).map((el: any) => <TextBlock
                    key={el.id}
                    blockText={el}
                    id={el.id}
                    activeBlockId={activeBlockId}
                    setActiveBlockId={setActiveBlockId}
                />)}
            </SortableContext>
        </DndContext >
    </div>
    )
}