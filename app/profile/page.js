import PrivateRoute from "@/components/PrivateRoute";
import Profile from "@/components/Profile";

export const metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
}