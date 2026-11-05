import ManageEvents from "@/components/ManageEvents";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata = { title: "Manage Events" };

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEvents />
    </PrivateRoute>
  );
}