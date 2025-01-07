import Sidebar from './sidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4">Content</div>
    </div>
  );
};

export default AdminLayout;
