import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAccount = async (req: Request, res: Response) => {
  const { accountType, balance } = req.body;
  const userId = (req as any).user.userId;

  const account = await prisma.bankAccount.create({
    data: { accountType, balance, userId },
  });

  res.json(account);
};

export const getAccounts = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const accounts = await prisma.bankAccount.findMany({ where: { userId } });
  res.json(accounts);
};
