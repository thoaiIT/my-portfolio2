import Sidebar from './Sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
};

export default AdminLayout;
