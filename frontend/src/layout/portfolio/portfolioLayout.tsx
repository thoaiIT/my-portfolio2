import Menu from '../components/portfolio/menu/menu';

const PortforlioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-content">
      <Menu />
      {children}
    </div>
  );
};

export default PortforlioLayout;
