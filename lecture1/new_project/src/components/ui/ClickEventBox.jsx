import { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * ClickEventBox 컴포넌트
 * 
 * Props:
 * @param {number} width - 박스 너비 [Optional, 기본값: 200]
 * @param {number} height - 박스 높이 [Optional, 기본값: 200]
 * @param {function} onSingleClick - 싱글클릭 이벤트 핸들러 [Optional]
 * @param {function} onDoubleClick - 더블클릭 이벤트 핸들러 [Optional]
 * @param {number} clickDelay - 클릭 딜레이 시간(ms) [Optional, 기본값: 300]
 *
 * Example usage:
 * <ClickEventBox 
 *   onSingleClick={() => console.log('Single click!')}
 *   onDoubleClick={() => console.log('Double click!')}
 * />
 */
function ClickEventBox({ 
  width = 200, 
  height = 200, 
  onSingleClick, 
  onDoubleClick, 
  clickDelay = 300 
}) {
  const [clickState, setClickState] = useState('normal'); // 'normal', 'single', 'double'
  const [lastEvent, setLastEvent] = useState('');
  const clickTimeoutRef = useRef(null);

  const handleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      
      // 더블클릭 처리
      setClickState('double');
      setLastEvent('더블클릭');
      if (onDoubleClick) {
        onDoubleClick();
      }
      
      // 3초 후 상태 초기화
      setTimeout(() => {
        setClickState('normal');
        setLastEvent('');
      }, 3000);
    } else {
      // 첫 번째 클릭
      clickTimeoutRef.current = setTimeout(() => {
        // 싱글클릭 처리
        setClickState('single');
        setLastEvent('싱글클릭');
        if (onSingleClick) {
          onSingleClick();
        }
        
        clickTimeoutRef.current = null;
        
        // 3초 후 상태 초기화
        setTimeout(() => {
          setClickState('normal');
          setLastEvent('');
        }, 3000);
      }, clickDelay);
    }
  };

  const getBoxColor = () => {
    switch (clickState) {
      case 'single':
        return '#4CAF50'; // 초록색
      case 'double':
        return '#FF9800'; // 주황색
      default:
        return '#2196F3'; // 파란색
    }
  };

  const getBoxShadow = () => {
    switch (clickState) {
      case 'single':
        return '0 4px 20px rgba(76, 175, 80, 0.4)';
      case 'double':
        return '0 4px 20px rgba(255, 152, 0, 0.4)';
      default:
        return '0 4px 20px rgba(33, 150, 243, 0.3)';
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: width,
        height: height,
        backgroundColor: getBoxColor(),
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: getBoxShadow(),
        userSelect: 'none',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }}
    >
      <Typography 
        variant="h6" 
        color="white" 
        sx={{ 
          mb: 1,
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}
      >
        클릭 테스트
      </Typography>
      
      {lastEvent && (
        <Typography 
          variant="body2" 
          color="white" 
          sx={{ 
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
          }}
        >
          {lastEvent}
        </Typography>
      )}
      
      <Typography 
        variant="caption" 
        color="white" 
        sx={{ 
          mt: 1,
          opacity: 0.8,
          textAlign: 'center'
        }}
      >
        단일: 초록 | 더블: 주황
      </Typography>
    </Box>
  );
}

export default ClickEventBox;