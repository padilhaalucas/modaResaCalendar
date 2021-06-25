import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

export const prisma = new PrismaClient({
  log: ['query'],
});

export const context: Context = {
  prisma,
}