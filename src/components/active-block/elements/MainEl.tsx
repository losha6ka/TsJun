import { FC, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { DndContext, closestCorners } from "@dnd-kit/core";
import { TextBlock } from "../TextBlock";
import { TextBlockI } from "../../../types/MainTypes";
interface MainElProps {
    handleDragEnd: (e: any, block: any) => void,
    mainCustomBlock: TextBlockI[]
}
export const MainEl: FC<MainElProps> = ({ handleDragEnd, mainCustomBlock }) => {
    const [activeBlockId, setActiveBlockId] = useState<number | null>(null); // Состояние активного блока
    return (<div>
        <main className="main">Main</main>
        <DndContext onDragEnd={(e) => handleDragEnd(e, mainCustomBlock)} collisionDetection={closestCorners}>
            <SortableContext items={mainCustomBlock} strategy={verticalListSortingStrategy}>
                {mainCustomBlock?.filter((el: any) => el.id > 0).map((el: any) => <TextBlock
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