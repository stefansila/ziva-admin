import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const sidebarLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: 'https://global.divhunt.com/89e2a09a484e311f49d14896e2b4508c_970.svg' },
  { to: '/users', label: 'Users', icon: 'https://global.divhunt.com/c3d20b10622fe2b295cbe3086f70c4dc_2919.svg' },
  { to: '/group-management', label: 'Group Management', icon: 'https://global.divhunt.com/029ae6c69a8ea749dc77752c52376da4_2844.svg' },
  { to: '/devices', label: 'Devices', icon: 'https://global.divhunt.com/4e4370d880c20f32b4539afd25d51526_755.svg' },
  { to: '/finance', label: 'Finance', icon: 'https://global.divhunt.com/40fd43526f922ef6aed2e509821d63d3_1563.svg' },
  { to: '/analytics', label: 'Analytics', icon: 'https://global.divhunt.com/b95711458073b64bb1517c6c9270b592_711.svg' },
  { to: '/diary-analysis', label: 'Diary Analysis', icon: 'https://global.divhunt.com/4baefdb43ce86c4ae225742edfb8eaab_2025.svg' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar hamburger">
      <div className="user-info-top">
        <img 
          src="/assets/media/Image-Sample.svg" 
          loading="lazy" 
          alt="User Avatar" 
          className="user-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <span className="user-title">Admin User</span>
        <span className="user-mail">admin@example.com</span>
      </div>
      <div className="sidebar-links-wrapper">
        {sidebarLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`sidebar-link${location.pathname.startsWith(link.to) ? ' sidebar-link-active' : ''}`}
          >
            <img src={link.icon} loading="lazy" alt="" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      <img src="https://global.divhunt.com/8ca0135b676e12de7e510e50caeee915_79012.avif" loading="lazy" alt="" className="sidebar-image" />
    </div>
  );
};

export default Sidebar; 