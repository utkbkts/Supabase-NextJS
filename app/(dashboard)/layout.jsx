import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const DashboardLayout = async ({ children }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    redirect("/login");
  }
  // console.log(data.session.user);
  return (
    <div>
      <Navbar user={data} />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
