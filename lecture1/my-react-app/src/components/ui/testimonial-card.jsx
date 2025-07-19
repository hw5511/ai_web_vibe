import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { StarOutlined } from '@mui/icons-material';

/**
 * Testimonial Card 컴포넌트
 * 
 * Props:
 * @param {string} name - 고객 이름 [Required]
 * @param {string} company - 회사명 [Required]
 * @param {string} role - 직책 [Required]
 * @param {string} content - 후기 내용 [Required]
 * @param {string} avatar - 아바타 텍스트 [Required]
 * @param {number} rating - 평점 [Optional, 기본값: 5]
 *
 * Example usage:
 * <TestimonialCard 
 *   name="김민수" 
 *   company="스타트업 A" 
 *   role="CTO"
 *   content="정말 좋은 서비스입니다." 
 *   avatar="K"
 *   rating={5}
 * />
 */
function TestimonialCard({ 
  name, 
  company, 
  role, 
  content, 
  avatar, 
  rating = 5 
}) {
  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 4,
        height: '100%',
        borderRadius: '16px',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar 
          sx={{ 
            backgroundColor: '#1976d2',
            mr: 2,
            width: 48,
            height: 48
          }}
        >
          {avatar}
        </Avatar>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: '#1a1a1a'
            }}
          >
            {name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666'
            }}
          >
            {role}, {company}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', mb: 2 }}>
        {[...Array(rating)].map((_, i) => (
          <StarOutlined key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
        ))}
      </Box>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#666',
          lineHeight: 1.6,
          fontStyle: 'italic'
        }}
      >
        "{content}"
      </Typography>
    </Paper>
  );
}

export default TestimonialCard;