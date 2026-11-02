import CreateEvent from "@/components/CreateEvent";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEvent />
    </PrivateRoute>
  );
}