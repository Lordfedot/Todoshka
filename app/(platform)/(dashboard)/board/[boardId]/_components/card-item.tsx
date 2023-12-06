"use client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@prisma/client";

type Props = {
  data: Card;
  index: number;
};

export const CardItem = ({ data, index }: Props) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => cardModal.onOpen(data.id)}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
