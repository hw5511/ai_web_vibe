import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

/**
 * EventModal 컴포넌트
 * 
 * Props:
 * @param {boolean} open - 모달 열림/닫힘 상태 [Required]
 * @param {function} onClose - 모달 닫기 핸들러 [Required]
 * @param {string} eventType - 이벤트 타입 ('single' | 'double') [Required]
 * @param {string} title - 모달 제목 [Optional]
 * @param {string} message - 모달 메시지 [Optional]
 *
 * Example usage:
 * <EventModal 
 *   open={isOpen}
 *   onClose={handleClose}
 *   eventType="single"
 *   title="싱글클릭"
 *   message="싱글클릭 이벤트가 발생했습니다!"
 * />
 */
function EventModal({ 
  open, 
  onClose, 
  eventType, 
  title = '이벤트 알림', 
  message = '이벤트가 발생했습니다!' 
}) {
  const getEventColor = () => {
    switch (eventType) {
      case 'single':
        return '#4CAF50';
      case 'double':
        return '#FF9800';
      default:
        return '#2196F3';
    }
  };

  const getEventIcon = () => {
    switch (eventType) {
      case 'single':
        return '👆';
      case 'double':
        return '👆👆';
      default:
        return '📱';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: getEventColor(),
          color: 'white',
          textAlign: 'center',
          py: 3,
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography variant="h4" component="span">
            {getEventIcon()}
          </Typography>
          {title}
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ py: 4, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            color: getEventColor(),
            fontWeight: 'bold'
          }}
        >
          {message}
        </Typography>
        
        <Box
          sx={{
            display: 'inline-block',
            backgroundColor: getEventColor(),
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: 2,
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
        >
          {eventType === 'single' ? '싱글클릭 이벤트' : '더블클릭 이벤트'}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: getEventColor(),
            color: 'white',
            px: 4,
            py: 1,
            borderRadius: 2,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: getEventColor(),
              opacity: 0.9,
            }
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventModal;