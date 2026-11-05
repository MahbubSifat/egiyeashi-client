import JoinedEvents from "@/components/JoinedEvents";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata = { title: "Joined Events" };

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEvents />
    </PrivateRoute>
  );
}