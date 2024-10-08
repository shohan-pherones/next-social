"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const triggerFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    const alreadyFriends = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (alreadyFriends) {
      await prisma.follower.delete({
        where: {
          id: alreadyFriends.id,
        },
      });
    } else {
      const existingFriendRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFriendRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFriendRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const triggerBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const acceptFriendRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingFriendRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFriendRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFriendRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const rejectFriendRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingFriendRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFriendRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFriendRequest.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;

  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, val]) => val !== "")
  );

  if (cover !== "") {
    filteredFields.cover = cover;
  }

  const profileSchema = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = profileSchema.safeParse(filteredFields);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: currentUserId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const addComment = async (postId: number, desc: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId: currentUserId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  const desc = formData.get("desc") as string;
  const descSchema = z.string().min(3).max(255);
  const validateDesc = descSchema.safeParse(desc);

  if (!validateDesc.success) {
    console.log("Invalid caption");
    return;
  }

  try {
    await prisma.post.create({
      data: {
        desc: validateDesc.data,
        userId: currentUserId,
        img,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const addStory = async (img: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId: currentUserId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId: currentUserId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const deletePost = async (postId: number) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId: currentUserId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
