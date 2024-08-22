"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

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
