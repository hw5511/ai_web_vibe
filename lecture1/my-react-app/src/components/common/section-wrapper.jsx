import React from 'react';
import { Box, Container } from '@mui/material';

/**
 * Section Wrapper 컴포넌트
 * 
 * Props:
 * @param {node} children - 감쌀 컴포넌트들 [Required]
 * @param {string} backgroundColor - 배경색 [Optional, 기본값: 'transparent']
 * @param {number} py - 상하 패딩 [Optional, 기본값: 8]
 * @param {string} maxWidth - 최대 너비 [Optional, 기본값: 'lg']
 *
 * Example usage:
 * <SectionWrapper backgroundColor="#f5f5f5">
 *   <div>Content</div>
 * </SectionWrapper>
 */
function SectionWrapper({ 
  children, 
  backgroundColor = 'transparent', 
  py = 8,
  maxWidth = 'lg'
}) {
  return (
    <Box
      sx={{
        backgroundColor,
        py
      }}
    >
      <Container maxWidth={maxWidth}>
        {children}
      </Container>
    </Box>
  );
}

export default SectionWrapper;