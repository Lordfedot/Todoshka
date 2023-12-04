"use client";

import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";

type Props = {
  data: ListWithCards[];
  boardId: string;
};

export const ListContainer = ({ boardId, data }: Props) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
