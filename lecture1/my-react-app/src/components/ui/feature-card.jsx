import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

/**
 * Feature Card 컴포넌트
 * 
 * Props:
 * @param {node} icon - 아이콘 컴포넌트 [Required]
 * @param {string} title - 기능 제목 [Required]
 * @param {string} description - 기능 설명 [Required]
 * @param {array} features - 세부 기능 목록 [Optional]
 *
 * Example usage:
 * <FeatureCard 
 *   icon={<Icon />} 
 *   title="제목" 
 *   description="설명"
 *   features={['기능1', '기능2']} 
 * />
 */
function FeatureCard({ icon, title, description, features = [] }) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 4,
        textAlign: 'center',
        height: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          borderColor: '#1976d2'
        }
      }}
    >
      <Box sx={{ mb: 3 }}>
        {icon}
      </Box>
      
      <Typography 
        variant="h6" 
        component="h3" 
        sx={{ 
          fontWeight: 'bold',
          mb: 2,
          color: '#1a1a1a'
        }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#666',
          lineHeight: 1.6,
          mb: features.length > 0 ? 3 : 0
        }}
      >
        {description}
      </Typography>
      
      {features.length > 0 && (
        <Box sx={{ textAlign: 'left' }}>
          {features.map((feature, index) => (
            <Box 
              key={index}
              sx={{ 
                color: '#888',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem'
              }}
            >
              <Box 
                sx={{ 
                  width: 6,
                  height: 6,
                  backgroundColor: '#1976d2',
                  borderRadius: '50%',
                  mr: 1
                }}
              />
              {feature}
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default FeatureCard;