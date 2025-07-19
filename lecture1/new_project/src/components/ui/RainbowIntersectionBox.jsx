import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Chip, LinearProgress } from '@mui/material';

/**
 * RainbowIntersectionBox 컴포넌트
 * 
 * Props:
 * @param {number} width - 박스 너비 [Optional, 기본값: 400]
 * @param {number} height - 박스 높이 [Optional, 기본값: 300]
 * @param {string} title - 박스 제목 [Optional, 기본값: 'Rainbow Box']
 * @param {string} id - 박스 고유 식별자 [Optional, 기본값: 'rainbow-box']
 *
 * Example usage:
 * <RainbowIntersectionBox 
 *   width={450}
 *   height={350}
 *   title="무지개 관찰 박스"
 *   id="rainbow-1"
 * />
 */
function RainbowIntersectionBox({ 
  width = 400, 
  height = 300, 
  title = 'Rainbow Box',
  id = 'rainbow-box'
}) {
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const [lastAction, setLastAction] = useState('대기 중');
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
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
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0.00 to 1.00 in 0.01 increments
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

  // HSL을 RGB로 변환하는 함수
  const hslToRgb = (h, s, l) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // threshold 값에 따라 무지개 색상 계산
  const getRainbowColor = (ratio) => {
    if (ratio === 0) return '#2C3E50'; // 어두운 회색 (비활성)
    
    // 0.0 ~ 1.0을 0 ~ 300도로 매핑 (보라색 제외하고 빨강으로 돌아오기)
    const hue = ratio * 300;
    const saturation = 0.8;
    const lightness = 0.5;
    
    return hslToRgb(hue, saturation, lightness);
  };

  // 텍스트 색상 결정 (배경색에 따라)
  const getTextColor = (ratio) => {
    return ratio > 0.5 ? 'white' : 'white';
  };

  // 무지개 색상 이름 가져오기
  const getColorName = (ratio) => {
    if (ratio === 0) return '비활성';
    if (ratio <= 0.16) return '빨강';
    if (ratio <= 0.33) return '주황';
    if (ratio <= 0.5) return '노랑';
    if (ratio <= 0.66) return '초록';
    if (ratio <= 0.83) return '파랑';
    return '보라';
  };

  const currentColor = getRainbowColor(intersectionRatio);
  const textColor = getTextColor(intersectionRatio);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: width,
        height: height,
        backgroundColor: currentColor,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: isIntersecting 
          ? '0 12px 40px rgba(0, 0, 0, 0.4)' 
          : '0 6px 20px rgba(0, 0, 0, 0.2)',
        transform: isIntersecting ? 'scale(1.02)' : 'scale(1)',
        border: `3px solid ${intersectionRatio > 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
        mx: 'auto',
        my: 3,
        overflow: 'hidden',
      }}
    >
      {/* 제목 */}
      <Typography 
        variant="h5" 
        color={textColor}
        sx={{ 
          mb: 3,
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>

      {/* 현재 Threshold 값 대형 표시 */}
      <Box sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        borderRadius: 2, 
        px: 3, 
        py: 2, 
        mb: 2,
        textAlign: 'center'
      }}>
        <Typography 
          variant="h3" 
          color="white"
          sx={{ 
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)',
            mb: 1
          }}
        >
          {(intersectionRatio * 100).toFixed(1)}%
        </Typography>
        <Typography 
          variant="h6" 
          color="white"
          sx={{ 
            opacity: 0.9,
            fontWeight: 'bold'
          }}
        >
          {getColorName(intersectionRatio)}
        </Typography>
      </Box>

      {/* 상태 정보 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Chip
            label={isIntersecting ? '👁️ 보임' : '👻 안보임'}
            sx={{
              backgroundColor: isIntersecting ? 'rgba(76, 175, 80, 0.9)' : 'rgba(158, 158, 158, 0.9)',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
          
          <Chip
            label={`진입: ${entryCount}회`}
            sx={{
              backgroundColor: 'rgba(33, 150, 243, 0.9)',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
          
          <Chip
            label={lastAction}
            sx={{
              backgroundColor: 'rgba(255, 152, 0, 0.9)',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>
      </Box>

      {/* 무지개 스펙트럼 프로그레스 바 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: `${(1 - intersectionRatio) * 100}%`,
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '0 0 12px 12px',
            transition: 'right 0.3s ease',
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.7rem',
        }}
      >
        ID: {id}
      </Typography>

      {/* 색상 정보 */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.7rem',
          fontFamily: 'monospace',
        }}
      >
        {currentColor}
      </Typography>
    </Box>
  );
}

export default RainbowIntersectionBox;