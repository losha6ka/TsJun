import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { reorderTextBlocks } from "../../store/reducers/blockReducer";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { DndContext, closestCorners } from "@dnd-kit/core";
import { TextBlock } from "./TextBlock";

export const CustomTextBlock: FC = () => {
    const blockTextFromRedux = useSelector((state: RootState) => state.customBlock.textBlock);
    const dispatch = useDispatch()
    const [activeBlockId, setActiveBlockId] = useState<number | null>(null); // Состояние активного блока
    const handleDragEnd = (e: any) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        const activeIndex = blockTextFromRedux.findIndex((el) => el.id === active.id);
        const overIndex = blockTextFromRedux.findIndex((el) => el.id === over.id);

        // Меняем порядок блоков
        const updatedBlocks = arrayMove(blockTextFromRedux, activeIndex, overIndex);

        // Обновляем состояние в Redux
        dispatch(reorderTextBlocks(updatedBlocks));
    };
    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <div>
                <SortableContext items={blockTextFromRedux} strategy={verticalListSortingStrategy}>
                    {blockTextFromRedux.map((el) => <TextBlock key={el.id} el={el} id={el.id}
                        activeBlockId={activeBlockId}
                        setActiveBlockId={setActiveBlockId}
                    />)}
                </SortableContext>
            </div>
        </DndContext>
    );
};