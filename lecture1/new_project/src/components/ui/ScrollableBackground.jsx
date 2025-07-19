import { Box } from '@mui/material';

/**
 * ScrollableBackground 컴포넌트
 * 
 * Props:
 * @param {number} viewportMultiplier - 뷰포트 높이 배수 [Optional, 기본값: 3]
 * @param {string} gradientStart - 그라데이션 시작 색상 [Optional, 기본값: '#667eea']
 * @param {string} gradientEnd - 그라데이션 끝 색상 [Optional, 기본값: '#764ba2']
 * @param {React.ReactNode} children - 자식 컴포넌트 [Optional]
 *
 * Example usage:
 * <ScrollableBackground viewportMultiplier={4} gradientStart="#ff6b6b" gradientEnd="#4ecdc4">
 *   <YourContent />
 * </ScrollableBackground>
 */
function ScrollableBackground({ 
  viewportMultiplier = 3, 
  gradientStart = '#667eea',
  gradientEnd = '#764ba2',
  children 
}) {
  return (
    <Box
      sx={{
        minHeight: `${viewportMultiplier * 100}vh`,
        background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(
              45deg,
              transparent 40%,
              rgba(255, 255, 255, 0.03) 50%,
              transparent 60%
            ),
            linear-gradient(
              -45deg,
              transparent 40%,
              rgba(255, 255, 255, 0.03) 50%,
              transparent 60%
            )
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        },
      }}
    >
      {children}
    </Box>
  );
}

export default ScrollableBackground;