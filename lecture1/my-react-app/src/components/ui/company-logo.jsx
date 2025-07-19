import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Company Logo 컴포넌트
 * 
 * Props:
 * @param {string} name - 회사 이름 [Required]
 * @param {string} color - 로고 색상 [Optional, 기본값: '#1976d2']
 * @param {string} size - 로고 크기 [Optional, 기본값: 'medium']
 *
 * Example usage:
 * <CompanyLogo name="스타트업 A" color="#1976d2" size="large" />
 */
function CompanyLogo({ name, color = '#1976d2', size = 'medium' }) {
  const sizeMap = {
    small: { minWidth: '100px', py: 1.5, fontSize: '0.9rem' },
    medium: { minWidth: '120px', py: 2, fontSize: '1rem' },
    large: { minWidth: '150px', py: 2.5, fontSize: '1.1rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  return (
    <Box 
      sx={{ 
        px: 3,
        py: currentSize.py,
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        minWidth: currentSize.minWidth,
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          borderColor: color
        }
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          color: color,
          fontWeight: 'bold',
          fontSize: currentSize.fontSize
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default CompanyLogo;