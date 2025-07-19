import { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';

/**
 * ScrollToolbar 컴포넌트
 * 
 * Props:
 * @param {number} height - 툴바 높이 [Optional, 기본값: 60]
 * @param {string} backgroundColor - 툴바 배경색 [Optional, 기본값: 'rgba(255, 255, 255, 0.95)']
 * @param {number} topOffset - 상단 오프셋 (네비게이션 높이) [Optional, 기본값: 0]
 *
 * Example usage:
 * <ScrollToolbar height={70} backgroundColor="rgba(33, 150, 243, 0.9)" topOffset={64} />
 */
function ScrollToolbar({ height = 60, backgroundColor = 'rgba(255, 255, 255, 0.95)', topOffset = 0 }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('정지');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 스크롤 방향 감지
      if (currentScrollY > prevScrollY) {
        setScrollDirection('아래로');
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('위로');
      } else {
        setScrollDirection('정지');
      }
      
      setScrollY(currentScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  const getDirectionColor = () => {
    switch (scrollDirection) {
      case '아래로':
        return '#4CAF50';
      case '위로':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getDirectionIcon = () => {
    switch (scrollDirection) {
      case '아래로':
        return '↓';
      case '위로':
        return '↑';
      default:
        return '●';
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: topOffset,
        left: 0,
        right: 0,
        height: height,
        backgroundColor: backgroundColor,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        zIndex: 1100,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
        스크롤 모니터
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            방향:
          </Typography>
          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                  {getDirectionIcon()}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {scrollDirection}
                </Typography>
              </Box>
            }
            sx={{
              backgroundColor: getDirectionColor(),
              color: 'white',
              fontWeight: 'bold',
              minWidth: 80,
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            ScrollY:
          </Typography>
          <Chip
            label={`${Math.round(scrollY)}px`}
            sx={{
              backgroundColor: '#2196F3',
              color: 'white',
              fontWeight: 'bold',
              minWidth: 80,
              fontFamily: 'monospace',
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            진행률:
          </Typography>
          <Chip
            label={`${Math.round((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`}
            sx={{
              backgroundColor: '#9C27B0',
              color: 'white',
              fontWeight: 'bold',
              minWidth: 60,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ScrollToolbar;