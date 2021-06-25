import { PrismaClient } from '@prisma/client'
import { DateTime } from "luxon";

const prisma = new PrismaClient()

export async function seed() {
  // Staff Members
  const john = await prisma.staffMember.upsert({
    where: { email: 'john@brand.com' },
    update: {},
    create: {
      email: 'john@brand.com',
      firstName: 'John',
      lastName: 'Doe',
    }
  });

  const jane = await prisma.staffMember.upsert({
    where: { email: 'janne@brand.com' },
    update: {},
    create: {
      email: 'jane@brand.com',
      firstName: 'Jane',
      lastName: 'Tomas',
    }
  });

  // Clients
  const client1 = await prisma.client.upsert({
    where: { brandName: 'Client 1' },
    update: {},
    create: {
      brandName: 'Client 1',
    },
  });
  const client2 = await prisma.client.upsert({
    where: { brandName: 'Client 2' },
    update: {},
    create: {
      brandName: 'Client 2',
    },
  });
  const client3 = await prisma.client.upsert({
    where: { brandName: 'Client 3' },
    update: {},
    create: {
      brandName: 'Client 3',
    },
  });

  // Appointments
  await Promise.all([
    prisma.appointment.create({
      data: {
        staffMemberId: john.id,
        clientId: client1.id,
        startAt: DateTime.utc(2021, 6, 7, 12).toJSDate(),
        endAt: DateTime.utc(2021, 6, 7, 13, 30).toJSDate(),
      }
    }),
    prisma.appointment.create({
      data: {
        staffMemberId: john.id,
        clientId: client2.id,
        startAt: DateTime.utc(2021, 6, 7, 14).toJSDate(),
        endAt: DateTime.utc(2021, 6, 7, 15).toJSDate(),
      }
    }),
    prisma.appointment.create({
      data: {
        staffMemberId: jane.id,
        clientId: client1.id,
        startAt: DateTime.utc(2021, 6, 8, 12).toJSDate(),
        endAt: DateTime.utc(2021, 6, 8, 13, 45).toJSDate(),
      }
    }),
    prisma.appointment.create({
      data: {
        staffMemberId: john.id,
        clientId: client3.id,
        startAt: DateTime.utc(2021, 6, 8, 12).toJSDate(),
        endAt: DateTime.utc(2021, 6, 8, 13).toJSDate(),
      }
    }),
  ]);
}
  