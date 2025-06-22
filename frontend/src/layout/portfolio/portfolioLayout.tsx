import Navbar from '../components/portfolio/navbar/navbar';
import Footer from '../components/portfolio/footer/footer';
import CustomCursor from '@/components/CustomCursor';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col relative">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <CustomCursor />
    </>
  );
};

export default PortfolioLayout;
