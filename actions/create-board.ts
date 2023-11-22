"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export interface State {
  errors?: {
    title?: string[];
  };
  message?: string | null;
}

const CreateBoard = z.object({
  title: z.string().min(3, "Minimum length of 3 letters is required"),
});

export async function create(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    };
  }
  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return { message: "Database Error" };
  }

  revalidatePath("/organization/org_2YS0vogxVWZgsvT9Dj4zNfe7xOU");
  redirect("/organization/org_2YS0vogxVWZgsvT9Dj4zNfe7xOU");
}
