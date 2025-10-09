import {Outlet, Navigate} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSideBar";

export default function AdminLayout() {
  // if (!localStorage.getItem("accesToken"))
  //   return (<Navigate to="/accounts/log-in" replace={true} />);

  return (
    <SidebarProvider defaultOpen={true} >
      <AdminSidebar />
      <main className="w-full">
        <div className="h-full pr-4 flex justify-start items-start gap-x-2">
          <SidebarTrigger className="ml-3 mt-3 w-10 h-10" />
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
