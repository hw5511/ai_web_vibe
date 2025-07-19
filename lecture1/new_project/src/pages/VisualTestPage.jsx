import { Box, Container, Typography } from '@mui/material';

/**
 * VisualTestPage 컴포넌트
 * 
 * 시각적 테스트 및 UI 컴포넌트 데모 페이지
 * - 향후 개발 예정
 */
function VisualTestPage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="sm">
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '3rem' },
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            mb: 2
          }}
        >
          Visual Test Page
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          준비 중입니다...
        </Typography>
      </Container>
    </Box>
  );
}

export default VisualTestPage;