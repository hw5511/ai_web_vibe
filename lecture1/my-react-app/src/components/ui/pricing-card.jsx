import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import CtaButton from '../common/cta-button';
import { CheckCircleOutlined } from '@mui/icons-material';

/**
 * Pricing Card 컴포넌트
 * 
 * Props:
 * @param {string} name - 플랜 이름 [Required]
 * @param {string} price - 가격 [Required]
 * @param {string} period - 기간 [Required]
 * @param {string} description - 플랜 설명 [Required]
 * @param {array} features - 기능 목록 [Required]
 * @param {boolean} isPopular - 인기 플랜 여부 [Optional, 기본값: false]
 * @param {string} buttonText - 버튼 텍스트 [Required]
 * @param {string} buttonVariant - 버튼 스타일 [Optional, 기본값: 'contained']
 * @param {function} onCtaClick - CTA 버튼 클릭 함수 [Optional]
 *
 * Example usage:
 * <PricingCard 
 *   name="프리미엄 플랜"
 *   price="9,900"
 *   period="월"
 *   description="성장하는 팀을 위한 완전한 기능"
 *   features={['기능1', '기능2']}
 *   isPopular={true}
 *   buttonText="14일 무료 체험"
 *   onCtaClick={handleClick}
 * />
 */
function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  isPopular = false, 
  buttonText, 
  buttonVariant = 'contained',
  onCtaClick 
}) {
  return (
    <Paper 
      elevation={isPopular ? 8 : 2}
      sx={{ 
        p: 4,
        height: '100%',
        borderRadius: '20px',
        position: 'relative',
        border: isPopular ? '2px solid #1976d2' : '1px solid #e0e0e0',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)'
        }
      }}
    >
      {isPopular && (
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
          {name}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            mb: 3
          }}
        >
          {description}
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
            {price === '0' ? '무료' : `₩${price}`}
          </Typography>
          {price !== '0' && (
            <Typography 
              variant="body1" 
              component="span" 
              sx={{ 
                color: '#666',
                ml: 1
              }}
            >
              / {period}
            </Typography>
          )}
        </Box>
      </Box>
      
      <List sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
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
          variant={buttonVariant}
          onClick={onCtaClick}
          fullWidth
        >
          {buttonText}
        </CtaButton>
      </Box>
    </Paper>
  );
}

export default PricingCard;