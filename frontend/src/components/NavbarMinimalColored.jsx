import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconGauge,
  IconLogout,
  IconUser,
  IconLogin,
  IconHome,
  IconClipboardList
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './NavbarMinimalColored.module.css';
import { useAuth } from '../context/useAuth';

function NavbarLink({ icon, label, active, onClick }) {
  const Icon = icon;
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        {Icon ? <Icon size={20} stroke={1.5} /> : null}
      </UnstyledButton>
    </Tooltip>
  );
}

export function NavbarMinimalColored() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const data = [
    // { icon: IconHome, label: 'Home', path: '/' },
    { icon: IconGauge, label: 'Dashboard', path: '/dashboard' },
    { icon: IconUser, label: 'Profile', path: '/profile' },
    { icon: IconClipboardList, label: 'Tasks', path: '/tasks' },
  ];

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.path);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <div className={classes.logo}>PA</div>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {user && links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        {user ? (
          <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
        ) : (
          <NavbarLink icon={IconLogin} label="Login" onClick={() => navigate('/login')} />
        )}
      </Stack>
    </nav>
  );
}
