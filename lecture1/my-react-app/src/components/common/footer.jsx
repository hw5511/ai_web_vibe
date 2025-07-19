import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Link,
  Divider 
} from '@mui/material';

/**
 * Footer 컴포넌트
 * 
 * Props:
 * - props 없음
 *
 * Example usage:
 * <Footer />
 */
function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#f5f5f5',
        py: 6,
        mt: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              TeamChat
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              팀 소통의 새로운 기준을 제시하는 심플한 메신저 서비스입니다.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              서비스
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ color: '#666' }}>
                기능소개
              </Link>
              <Link href="#" color="inherit" sx={{ color: '#666' }}>
                요금제
              </Link>
              <Link href="#" color="inherit" sx={{ color: '#666' }}>
                고객후기
              </Link>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              지원
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ color: '#666' }}>
                도움말
              </Link>
              <Link href="#" color="inherit" sx={{ color: '#666' }}>
                문의하기
              </Link>
              <Link href="#" color="inherit" sx={{ color: '#666' }}>
                개발자 API
              </Link>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              연락처
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              이메일: support@teamchat.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              전화: 02-1234-5678
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            © 2024 TeamChat. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;