import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MenuItems } from '@/constants/menu';
import { paths } from '@/routes/paths';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const BreadcrumbAdmin = () => {
  const location = useLocation();
  console.log({ location, MenuItems });

  const getCurrentMenuName = useCallback(() => {
    const currentMenu = MenuItems.find((item) =>
      location.pathname.includes(item.url)
    );

    return currentMenu?.title;
  }, [location]);

  return (
    <Breadcrumb className="mt-6">
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={paths.admin.dashboard}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{getCurrentMenuName()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbAdmin;
