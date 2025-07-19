import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Chip } from '@mui/material';

/**
 * IntersectionBox 컴포넌트
 * 
 * Props:
 * @param {number} width - 박스 너비 [Optional, 기본값: 300]
 * @param {number} height - 박스 높이 [Optional, 기본값: 200]
 * @param {string} backgroundColor - 기본 배경색 [Optional, 기본값: '#2196F3']
 * @param {string} activeColor - 활성 상태 배경색 [Optional, 기본값: '#4CAF50']
 * @param {string} title - 박스 제목 [Optional, 기본값: 'Intersection Box']
 * @param {number} threshold - 감지 임계값 [Optional, 기본값: 0.5]
 * @param {string} id - 박스 고유 식별자 [Optional, 기본값: 'intersection-box']
 *
 * Example usage:
 * <IntersectionBox 
 *   width={350}
 *   height={250}
 *   backgroundColor="#9C27B0"
 *   activeColor="#E91E63"
 *   title="관찰 박스 1"
 *   threshold={0.7}
 *   id="box-1"
 * />
 */
function IntersectionBox({ 
  width = 300, 
  height = 200, 
  backgroundColor = '#2196F3',
  activeColor = '#4CAF50',
  title = 'Intersection Box',
  threshold = 0.5,
  id = 'intersection-box'
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [entryCount, setEntryCount] = useState(0);
  const [lastAction, setLastAction] = useState('대기 중');
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = Math.round(entry.intersectionRatio * 100);
          setIntersectionRatio(ratio);
          
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            setEntryCount(prev => prev + 1);
            setLastAction('진입함');
          } else {
            setIsIntersecting(false);
            setLastAction('이탈함');
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px'
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  const getCurrentColor = () => {
    return isIntersecting ? activeColor : backgroundColor;
  };

  const getStatusText = () => {
    return isIntersecting ? '뷰포트 내부' : '뷰포트 외부';
  };

  const getStatusIcon = () => {
    return isIntersecting ? '👁️' : '👻';
  };

  return (
    <Box
      ref={boxRef}
      sx={{
        width: width,
        height: height,
        backgroundColor: getCurrentColor(),
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transition: 'all 0.5s ease',
        boxShadow: isIntersecting 
          ? '0 8px 30px rgba(0, 0, 0, 0.3)' 
          : '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: isIntersecting ? 'scale(1.05)' : 'scale(1)',
        border: isIntersecting ? '3px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
        mx: 'auto',
        my: 2,
      }}
    >
      {/* 제목 */}
      <Typography 
        variant="h6" 
        color="white" 
        sx={{ 
          mb: 2,
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>

      {/* 상태 정보 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h4" component="span">
            {getStatusIcon()}
          </Typography>
          <Chip
            label={getStatusText()}
            sx={{
              backgroundColor: isIntersecting ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
              color: isIntersecting ? getCurrentColor() : 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Chip
            label={`가시성: ${intersectionRatio}%`}
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'monospace',
            }}
          />
          
          <Chip
            label={`진입 횟수: ${entryCount}`}
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>

        <Chip
          label={`최근 동작: ${lastAction}`}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      </Box>

      {/* 프로그레스 바 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${intersectionRatio}%`,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            transition: 'width 0.3s ease',
          }}
        />
      </Box>

      {/* ID 표시 */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.7rem',
        }}
      >
        ID: {id}
      </Typography>
    </Box>
  );
}

export default IntersectionBox;