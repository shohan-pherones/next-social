"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";

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

export const updateProfile = async (formData: FormData) => {
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, val]) => val !== "")
  );

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
    return "err";
  }

  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
