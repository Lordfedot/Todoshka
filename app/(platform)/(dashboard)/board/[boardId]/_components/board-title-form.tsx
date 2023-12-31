"use client";

import { Board } from "@prisma/client";
import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";

type Props = {
  data: Board;
};

export const BoardTitleForm = ({ data }: Props) => {
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      disableEditting();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditting, setIsEditting] = useState(false);

  const disableEditting = () => {
    setIsEditting(false);
  };

  const enableEditting = () => {
    setIsEditting(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === data.title) {
      disableEditting();
    } else {
      execute({ title, id: data.id });
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditting) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2 relative"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
        {fieldErrors && (
          <p className="p-1 text-white rounded-sm bg-red-600">
            {fieldErrors?.title?.[0]} !
          </p>
        )}
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditting}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
