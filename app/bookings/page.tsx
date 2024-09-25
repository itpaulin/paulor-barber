import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { Card, CardContent } from "../_components/ui/card";
import { db } from "../_lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: "asc",
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  return (
    <>
      <Header />

      <div className="p-4">
        <h1 className="text-xl"> Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <>
            <h4 className="pt-6 text-xs font-medium uppercase text-gray-400">
              Confirmados
            </h4>
            <br className="pt-2" />
            <div className="flex flex-col gap-6">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
        {finishedBookings.length > 0 && (
          <>
            <h4 className="pt-6 text-xs font-medium uppercase text-gray-400">
              Finalizados
            </h4>
            <br className="pt-2" />
            <div className="flex flex-col gap-6">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
