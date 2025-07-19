import React from 'react';
import { Button } from '@mui/material';

/**
 * CTA Button 컴포넌트
 * 
 * Props:
 * @param {string} children - 버튼 텍스트 [Required]
 * @param {function} onClick - 버튼 클릭 시 실행할 함수 [Optional]
 * @param {string} variant - 버튼 스타일 [Optional, 기본값: 'contained']
 * @param {string} size - 버튼 크기 [Optional, 기본값: 'large']
 * @param {boolean} fullWidth - 전체 너비 사용 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <CtaButton onClick={handleClick}>무료로 시작하기</CtaButton>
 */
function CtaButton({ 
  children, 
  onClick, 
  variant = 'contained', 
  size = 'large',
  fullWidth = false 
}) {
  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        borderRadius: '25px',
        px: 4,
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
          transform: 'translateY(-2px)'
        },
        transition: 'all 0.3s ease'
      }}
    >
      {children}
    </Button>
  );
}

export default CtaButton;