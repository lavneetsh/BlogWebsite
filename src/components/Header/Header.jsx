// src/components/Header/Header.jsx

import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  // Added "Dashboard" to the navigation items
  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: 'Dashboard', slug: "/dashboard", active: authStatus }, // New Item
    { name: 'All Posts', slug: "/all-posts", active: authStatus },
    { name: 'Add Post', slug: "/add-post", active: authStatus },
    { name: 'Login', slug: "/login", active: !authStatus },
    { name: 'Signup', slug: "/signup", active: !authStatus },
  ];

  return (
    <header className='py-3 sticky top-0 z-50 shadow-md bg-slate-800/80 backdrop-blur-sm border-b border-slate-200'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4 shrink-0'>
            <NavLink to='/'>
              <Logo width='70px' />
            </NavLink>
          </div>
          <ul className='flex items-center ml-auto space-x-1 sm:space-x-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block px-3 sm:px-4 py-2 text-sm font-medium
                      transition-colors duration-200 rounded-full
                      ${isActive ? "bg-teal-50 text-teal-600" : "text-white hover:bg-slate-800"}`
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
        </nav>
      </Container>
    </header>
  );
}

export default Header;