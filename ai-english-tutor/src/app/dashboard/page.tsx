"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase"; // Adjust the path if needed

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Your Dashboard</h1>
      {user ? <p>Email: {user.email}</p> : <p>Loading user info...</p>}
    </div>
  );
};

export default Dashboard;
