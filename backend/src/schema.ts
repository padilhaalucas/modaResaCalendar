import { Appointment, Client, StaffMember } from '.prisma/client'
import { gql, IResolvers, makeExecutableSchema } from 'apollo-server'
import { Context } from './context'

export const typeDefs = gql`
  type StaffMember {
    id: String!
    email: String!
    firstName: String!
    lastName: String!
    appointments: [Appointment!]!
  }

  type Client {
    id: String!
    brandName: String!
    appointments: [Appointment!]!
  }

  type Appointment {
    id: String!
    startAt: String!
    endAt: String!
    client: Client!
    clientId: String!
    staffMember: StaffMember!
    staffMemberId: String!
  }

  input AppointmentInput {
    startAt: String!
    endAt: String!
    clientId: String!
    staffMemberId: String!
  }

  type Query {
    allAppointments: [Appointment!]!
    allStaffMembers: [StaffMember!]!
    allClients: [Client!]!
  }

  type Mutation {
    createAppointment(appointment: AppointmentInput!): Appointment
  }
`

type AppointmentInput = {
  startAt: string
  endAt: string
  clientId: string
  staffMemberId: string
}

const resolvers: IResolvers<any, Context> = {
  Query: {
    allAppointments: (_parent: any, _: any, ctx: Context) => ctx.prisma.appointment.findMany(),
    allStaffMembers: (_parent: any, _: any, ctx: Context) => ctx.prisma.staffMember.findMany(),
    allClients: (_parent: any, _: any, ctx: Context) => ctx.prisma.client.findMany(),
  },
  Mutation: {
    createAppointment: async (_: any, input: {appointment: AppointmentInput}, ctx: Context) => {
      return ctx.prisma.appointment.create({
        data: {
          startAt: new Date(input.appointment.startAt),
          endAt: new Date(input.appointment.endAt),
          clientId: input.appointment.clientId,
          staffMemberId: input.appointment.staffMemberId,
        },
      })
    }
  },
  Appointment: {
    staffMember: (parent: Appointment, _: any, ctx: Context) => ctx.prisma.staffMember.findUnique({
      where: { id: parent.staffMemberId },
    }),
    client: (parent: Appointment, _: any, ctx: Context) => ctx.prisma.client.findUnique({
      where: { id: parent.clientId },
    }),
  },
  StaffMember: {
    appointments: (parent: StaffMember, _: any, ctx: Context) => ctx.prisma.appointment.findMany({
      where: { staffMemberId: parent.id }
    }),
  },
  Client: {
    appointments: (parent: Client, _: any, ctx: Context) => ctx.prisma.appointment.findMany({
      where: { clientId: parent.id }
    }),
  },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })
