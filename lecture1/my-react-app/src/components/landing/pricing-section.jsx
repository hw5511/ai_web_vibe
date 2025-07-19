import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import SectionWrapper from '../common/section-wrapper';
import CtaButton from '../common/cta-button';
import { CheckCircleOutlined } from '@mui/icons-material';

/**
 * Pricing Section 컴포넌트
 * 
 * Props:
 * @param {function} onCtaClick - CTA 버튼 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <PricingSection onCtaClick={handleCtaClick} />
 */
function PricingSection({ onCtaClick }) {
  const plans = [
    {
      name: '무료 플랜',
      price: '0',
      period: '무료',
      description: '소규모 팀을 위한 기본 기능',
      features: [
        '팀원 5명까지',
        '메시지 기록 1,000개',
        '파일 용량 1GB',
        '기본 그룹 기능',
        '이메일 지원'
      ],
      isPopular: false,
      buttonText: '무료로 시작하기',
      buttonVariant: 'outlined'
    },
    {
      name: '프리미엄 플랜',
      price: '9,900',
      period: '월',
      description: '성장하는 팀을 위한 완전한 기능',
      features: [
        '팀원 무제한',
        '메시지 기록 무제한',
        '파일 용량 100GB',
        '고급 그룹 관리',
        '화상 통화 지원',
        '우선 고객 지원',
        '관리자 대시보드',
        'API 연동'
      ],
      isPopular: true,
      buttonText: '14일 무료 체험',
      buttonVariant: 'contained'
    }
  ];

  return (
    <SectionWrapper py={10}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            color: '#1a1a1a'
          }}
        >
          간단하고 명확한 요금제
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          팀의 규모와 필요에 따라 선택하세요. 언제든지 변경 가능합니다.
        </Typography>
      </Box>
      
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid size={{ xs: 12, md: 5 }} key={index}>
            <Paper 
              elevation={plan.isPopular ? 8 : 2}
              sx={{ 
                p: 4,
                height: '100%',
                borderRadius: '20px',
                position: 'relative',
                border: plan.isPopular ? '2px solid #1976d2' : '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.15)'
                }
              }}
            >
              {plan.isPopular && (
                <Chip 
                  label="가장 인기"
                  color="primary"
                  sx={{ 
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: 'bold'
                  }}
                />
              )}
              
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#1a1a1a'
                  }}
                >
                  {plan.name}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#666',
                    mb: 3
                  }}
                >
                  {plan.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 2 }}>
                  <Typography 
                    variant="h3" 
                    component="span" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#1976d2'
                    }}
                  >
                    {plan.price === '0' ? '무료' : `₩${plan.price}`}
                  </Typography>
                  {plan.price !== '0' && (
                    <Typography 
                      variant="body1" 
                      component="span" 
                      sx={{ 
                        color: '#666',
                        ml: 1
                      }}
                    >
                      / {plan.period}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <List sx={{ mb: 4 }}>
                {plan.features.map((feature, featureIndex) => (
                  <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlined 
                        sx={{ 
                          color: '#4caf50',
                          fontSize: 20
                        }} 
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature}
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: '#666'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ textAlign: 'center' }}>
                <CtaButton 
                  variant={plan.buttonVariant}
                  onClick={onCtaClick}
                  fullWidth
                >
                  {plan.buttonText}
                </CtaButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#999',
            mb: 2
          }}
        >
          모든 플랜에는 SSL 보안, 99.9% 업타임, 24/7 서버 모니터링이 포함됩니다.
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#999'
          }}
        >
          궁금한 점이 있으시면 언제든지 문의해주세요.
        </Typography>
      </Box>
    </SectionWrapper>
  );
}

export default PricingSection;