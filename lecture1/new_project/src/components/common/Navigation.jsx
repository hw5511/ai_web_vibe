import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation 컴포넌트
 * 
 * Props:
 * @param {string} title - 앱 제목 [Optional, 기본값: 'Interactive Demo']
 * @param {Array} menuItems - 메뉴 항목들 [Optional]
 *
 * Example usage:
 * <Navigation title="My App" menuItems={[
 *   { label: 'Home', path: '/' },
 *   { label: 'About', path: '/about' }
 * ]} />
 */
function Navigation({ title = 'Interactive Demo', menuItems = [] }) {
  const location = useLocation();

  const defaultMenuItems = [
    { label: 'Interaction Events', path: '/' },
    { label: 'Visual Test', path: '/visual-test' },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: 1200,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: '#333',
            fontWeight: 'bold'
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {items.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#2196F3' : '#666',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                backgroundColor: location.pathname === item.path ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  color: '#2196F3',
                },
                borderRadius: 2,
                px: 2,
                py: 1,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;