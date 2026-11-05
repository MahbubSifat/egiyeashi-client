import EventDetails from "@/components/EventDetails";

export const metadata = { title: "Event Details" };

export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  return <EventDetails id={id} />;
}