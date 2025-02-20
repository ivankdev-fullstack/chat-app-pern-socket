import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const getSidebarUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      select: {
        id: true,
        fullname: true,
        avatarImg: true,
      },
    });

    res.status(200).json(users);
  } catch (err: any) {
    console.error("Error in `getSidebarUsers`.", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getMessagesByConversation = async (req: Request, res: Response) => {
  try {
    const chatUserId = req.params.id;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, chatUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(conversation.messages);
  } catch (err: any) {
    console.error("Error in getMessages.", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const sendMessage = async (req: Request, res: Response) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user.id;
    const { message } = req.body;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        content: message,
        conversationId: conversation.id,
      },
    });
    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err: any) {
    console.error("Error in sendMessage.", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

export { getMessagesByConversation, getSidebarUsers, sendMessage };
