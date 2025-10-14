import {
  Outlet, 
  Navigate, 
} from 'react-router-dom'
import useFetch from '@/hooks/useFetch'
import {
  SidebarProvider, 
  SidebarTrigger, 
} from '@/components/ui/sidebar'
import AdminSidebar from '@/components/AdminSideBar'

export default function AdminLayout() {
  if (!localStorage.getItem('accessToken'))
    return (<Navigate to="/accounts/log-in" replace={true} />);

  const {data, isPending, error} = useFetch('http://localhost:3000/users/me');

  if (error)
    return (<Navigate to="/" replace={true} />);

  return (
    <SidebarProvider defaultOpen={ true } >
      <AdminSidebar userData={ data } />
      <main className='w-full'>
        <div className='flex justify-start items-start gap-x-2 h-full pr-4'>
          <SidebarTrigger className='w-10 h-10 ml-3 mt-3' />
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
