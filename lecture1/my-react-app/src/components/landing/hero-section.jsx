import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import SectionWrapper from '../common/section-wrapper';
import CtaButton from '../common/cta-button';

/**
 * Hero Section 컴포넌트
 * 
 * Props:
 * @param {function} onCtaClick - CTA 버튼 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <HeroSection onCtaClick={handleCtaClick} />
 */
function HeroSection({ onCtaClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SectionWrapper py={isMobile ? 6 : 10}>
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#1a1a1a',
                mb: 2,
                lineHeight: 1.2
              }}
            >
              팀 소통이 이렇게 
              <Box component="span" sx={{ color: '#1976d2' }}>
                간단할 수 있다니!
              </Box>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#666',
                mb: 4,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                lineHeight: 1.4
              }}
            >
              복잡한 설정 없이 3분만에 팀 메신저 구축
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <CtaButton onClick={onCtaClick} size="large">
                지금 무료로 체험하기
              </CtaButton>
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#999',
                fontSize: '0.9rem'
              }}
            >
              신용카드 등록 없이 14일 무료 체험
            </Typography>
          </Box>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: { xs: '300px', md: '400px' },
              backgroundColor: '#f8f9fa',
              borderRadius: '16px',
              border: '2px solid #e9ecef',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                width: '80%',
                height: '80%',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <Box sx={{ 
                height: '40px',
                backgroundColor: '#1976d2',
                borderRadius: '8px',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                px: 2
              }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  TeamChat
                </Typography>
              </Box>
              
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['안녕하세요! 새로운 프로젝트 시작해볼까요?', '좋은 아이디어네요! 언제 시작할까요?', '오늘 오후 3시는 어떤가요?'].map((message, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                      maxWidth: '70%',
                      backgroundColor: index % 2 === 0 ? '#f1f3f4' : '#1976d2',
                      color: index % 2 === 0 ? '#333' : 'white',
                      p: 1.5,
                      borderRadius: '12px',
                      fontSize: '0.85rem'
                    }}
                  >
                    {message}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default HeroSection;