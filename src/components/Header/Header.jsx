import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // State to manage the mobile menu's open/closed status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: 'Dashboard', slug: "/dashboard", active: authStatus },
    { name: 'All Posts', slug: "/all-posts", active: authStatus },
    { name: 'Add Post', slug: "/add-post", active: authStatus },
    { name: 'Login', slug: "/login", active: !authStatus },
    { name: 'Signup', slug: "/signup", active: !authStatus },
  ];

  // Function to close the mobile menu, useful for when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className='py-3 sticky top-0 z-50 shadow-md bg-slate-800/90 backdrop-blur-sm border-b border-slate-700'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4 shrink-0'>
            <Link to='/' onClick={closeMenu}>
              <Logo width='70px' />
            </Link>
          </div>

          {/* --- DESKTOP NAVIGATION (Hidden on mobile) --- */}
          <ul className='hidden md:flex items-center ml-auto space-x-1 sm:space-x-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block px-3 sm:px-4 py-2 text-sm font-medium
                      transition-colors duration-200 rounded-full
                      ${isActive ? "bg-teal-500 text-white" : "text-slate-200 hover:bg-slate-700"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* --- MOBILE MENU BUTTON (Hamburger, visible only on mobile) --- */}
          <div className="ml-auto md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-200 hover:text-white"
            >
              {/* Conditional rendering for Hamburger vs. Close (X) icon */}
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* --- MOBILE MENU DROPDOWN --- */}
        {/* This entire block is only rendered if isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <ul className="flex flex-col items-center space-y-4 pt-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="w-full text-center">
                    <NavLink
                      to={item.slug}
                      // When a link is clicked, the menu closes
                      onClick={closeMenu} 
                      className={({ isActive }) =>
                        `inline-block w-full px-3 py-2 text-sm font-medium
                        transition-colors duration-200 rounded-md
                        ${isActive ? "bg-teal-500 text-white" : "text-slate-200 hover:bg-slate-700"}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="w-full mt-2 pt-2 border-t border-slate-700">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;