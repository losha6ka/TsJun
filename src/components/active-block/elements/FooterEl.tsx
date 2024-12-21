import { FC, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { DndContext, closestCorners } from "@dnd-kit/core";
import { TextBlock } from "../TextBlock";
import { TextBlockI } from "../../../types/MainTypes";
interface FooterElProps {
    handleDragEnd: (e: any, block: any) => void,
    footerCustomBlock: TextBlockI[]
}
export const FooterEl: FC<FooterElProps> = ({ handleDragEnd, footerCustomBlock }) => {
    const [activeBlockId, setActiveBlockId] = useState<number | null>(null); // Состояние активного блока
    return (<div>
        <footer className="footer">Footer</footer>
        <DndContext onDragEnd={(e) => handleDragEnd(e, footerCustomBlock)} collisionDetection={closestCorners}>
            <SortableContext items={footerCustomBlock} strategy={verticalListSortingStrategy}>
                {footerCustomBlock?.filter((el: any) => el.id > 0).map((el: any) => <TextBlock
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