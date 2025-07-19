import { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * DraggableBox 컴포넌트
 * 
 * Props:
 * @param {number} width - 박스 너비 [Optional, 기본값: 120]
 * @param {number} height - 박스 높이 [Optional, 기본값: 120]
 * @param {number} initialX - 초기 X 위치 [Optional, 기본값: 50]
 * @param {number} initialY - 초기 Y 위치 [Optional, 기본값: 50]
 * @param {string} backgroundColor - 배경 색상 [Optional, 기본값: '#9C27B0']
 * @param {string} title - 박스 제목 [Optional, 기본값: '드래그']
 *
 * Example usage:
 * <DraggableBox 
 *   width={150}
 *   height={150}
 *   initialX={100}
 *   initialY={100}
 *   backgroundColor="#E91E63"
 *   title="드래그 박스"
 * />
 */
function DraggableBox({ 
  width = 120, 
  height = 120, 
  initialX = 50, 
  initialY = 50, 
  backgroundColor = '#9C27B0',
  title = '드래그'
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    
    const rect = boxRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    
    // 마우스 커서 변경
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // 화면 경계 체크
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <Box
      ref={boxRef}
      onMouseDown={handleMouseDown}
      sx={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 1000,
        boxShadow: isDragging 
          ? '0 8px 30px rgba(0, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: isDragging ? 'none' : 'box-shadow 0.3s ease',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        '&:hover': {
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.25)',
          transform: isDragging ? 'scale(1.05)' : 'scale(1.02)',
        },
      }}
    >
      <Typography 
        variant="body1" 
        color="white" 
        sx={{ 
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          mb: 0.5
        }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant="caption" 
        color="white" 
        sx={{ 
          opacity: 0.8,
          textAlign: 'center',
          fontSize: '0.7rem'
        }}
      >
        {isDragging ? '드래그 중...' : '드래그 가능'}
      </Typography>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          width: 8,
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '50%',
        }}
      />
    </Box>
  );
}

export default DraggableBox;