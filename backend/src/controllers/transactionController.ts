import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function transferFunds(req: Request, res: Response): Promise<any> {
  const { fromAccountId, toAccountId, amount } = req.body;

  const from = await prisma.bankAccount.findUnique({ where: { id: fromAccountId } });
  const to = await prisma.bankAccount.findUnique({ where: { id: toAccountId } });

  if (!from || !to || from.balance < amount) {
    return res.status(400).json({ message: 'Invalid accounts or insufficient funds' });
  }

  await prisma.$transaction([
    prisma.bankAccount.update({
      where: { id: fromAccountId },
      data: { balance: { decrement: amount } },
    }),
    prisma.bankAccount.update({
      where: { id: toAccountId },
      data: { balance: { increment: amount } },
    }),
    prisma.transaction.create({
      data: { fromAccountId, toAccountId, amount },
    }),
  ]);

  res.json({ message: 'Transfer successful' });
};
