import { Box, Typography } from '@mui/material';

/**
 * SimpleBox 컴포넌트 - 클릭/더블클릭 이벤트를 처리하는 단순한 박스
 * 
 * Props:
 * @param {function} onClick - 클릭 시 호출되는 함수 [Required]
 * @param {function} onDoubleClick - 더블클릭 시 호출되는 함수 [Required]
 * @param {string} title - 박스 제목 [Optional, 기본값: '클릭 테스트 박스']
 * @param {string} description - 박스 설명 [Optional, 기본값: '클릭하거나 더블클릭하세요']
 * @param {number} width - 박스 너비 [Optional, 기본값: 300]
 * @param {number} height - 박스 높이 [Optional, 기본값: 200]
 *
 * Example usage:
 * <SimpleBox 
 *   onClick={handleClick}
 *   onDoubleClick={handleDoubleClick}
 *   title="이벤트 테스트"
 * />
 */
function SimpleBox({ 
  onClick, 
  onDoubleClick, 
  title = '클릭 테스트 박스',
  description = '클릭하거나 더블클릭하세요',
  width = 300,
  height = 200
}) {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        bgcolor: '#f5f5f5',
        border: '2px solid #e0e0e0',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: '#eeeeee',
          borderColor: '#bdbdbd',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
        }
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 1,
          color: '#424242',
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#666666',
          textAlign: 'center'
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export default SimpleBox;