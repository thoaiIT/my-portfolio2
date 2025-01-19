import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import BreadcrumbAdmin from '../components/admin/breadcrumbAdmin';
import { AppSidebar } from '../components/admin/appSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 mt-6" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbAdmin />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
