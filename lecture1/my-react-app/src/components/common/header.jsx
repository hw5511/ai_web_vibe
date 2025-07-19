import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  useTheme,
  useMediaQuery 
} from '@mui/material';

/**
 * Header 컴포넌트
 * 
 * Props:
 * @param {function} onCtaClick - CTA 버튼 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <Header onCtaClick={handleCtaClick} />
 */
function Header({ onCtaClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            color: '#1976d2',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          TeamChat
        </Typography>
        
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button color="inherit" sx={{ color: '#666' }}>
              기능소개
            </Button>
            <Button color="inherit" sx={{ color: '#666' }}>
              요금제
            </Button>
            <Button color="inherit" sx={{ color: '#666' }}>
              고객후기
            </Button>
            <Button color="inherit" sx={{ color: '#666' }}>
              문의하기
            </Button>
          </Box>
        )}
        
        <Button 
          variant="contained" 
          color="primary"
          onClick={onCtaClick}
          sx={{ 
            borderRadius: '20px',
            px: 3,
            py: 1
          }}
        >
          무료로 시작하기
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;