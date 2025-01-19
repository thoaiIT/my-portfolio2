import { useEffect, useRef, useState } from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { PortfolioMenuItems } from '@/constants/menu';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const Menu = () => {
  const container = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline>();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useGSAP(
    () => {
      gsap.set('.menu-link-item-holder', { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          duration: 1.2,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.menu-link-item-holder', {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.inOut',
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);

  const toggelMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link to={paths.portfolio.index}>Portfolio</Link>
        </div>
        <div className="menu-open" onClick={toggelMenu}>
          <p>Menu</p>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link to={paths.portfolio.index}>Portfolio</Link>
          </div>
          <div className="menu-close" onClick={toggelMenu}>
            <p>Close</p>
          </div>
        </div>
        <div className="menu-close-icon" onClick={toggelMenu}>
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {PortfolioMenuItems.map((item, index) => (
              <div className="menu-link-item" key={index + item.title}>
                <div className="menu-link-item-holder" onClick={toggelMenu}>
                  <Link to={item.url} className="menu-link">
                    {item.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="#">Facebook &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Github &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>Email: thoainguyen.forwork@gmail.com</p>
              <p>Phone: 0123456789</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>View Showreel</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
