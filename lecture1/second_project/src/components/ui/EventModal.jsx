import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  Divider 
} from '@mui/material';

/**
 * EventModal 컴포넌트 - 클릭/더블클릭 이벤트를 색상으로 구분하여 표시하는 모달
 * 
 * Props:
 * @param {boolean} open - 모달 열림 상태 [Required]
 * @param {function} onClose - 모달 닫기 함수 [Required]
 * @param {Array} events - 이벤트 배열 [Required]
 * @param {function} onClearEvents - 이벤트 초기화 함수 [Required]
 *
 * Example usage:
 * <EventModal 
 *   open={isModalOpen}
 *   onClose={handleCloseModal}
 *   events={events}
 *   onClearEvents={handleClearEvents}
 * />
 */
function EventModal({ open, onClose, events, onClearEvents }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getEventColor = (eventType) => {
    switch (eventType) {
      case 'click':
        return '#4caf50'; // 초록색
      case 'doubleclick':
        return '#9c27b0'; // 보라색
      default:
        return '#757575'; // 회색
    }
  };

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'click':
        return '👆';
      case 'doubleclick':
        return '👆👆';
      default:
        return '❓';
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
          borderRadius: 2,
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#f5f5f5', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          이벤트 로그
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666' }}>
          총 {events.length}개 이벤트
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        {events.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 6,
            color: '#999999'
          }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              이벤트가 없습니다
            </Typography>
            <Typography variant="body2">
              박스를 클릭하거나 더블클릭하여 이벤트를 생성해보세요
            </Typography>
          </Box>
        ) : (
          <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
            {events.map((event, index) => (
              <Box key={index}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2,
                  '&:hover': {
                    bgcolor: '#f8f9fa'
                  }
                }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: getEventColor(event.type),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    fontSize: '1.2rem'
                  }}>
                    {getEventIcon(event.type)}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 'bold',
                      color: getEventColor(event.type)
                    }}>
                      {event.type === 'click' ? '클릭' : '더블클릭'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666666' }}>
                      {formatTime(event.timestamp)}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    bgcolor: getEventColor(event.type),
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    #{index + 1}
                  </Box>
                </Box>
                {index < events.length - 1 && (
                  <Divider sx={{ mx: 2 }} />
                )}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ 
        bgcolor: '#f5f5f5', 
        borderTop: '1px solid #e0e0e0',
        p: 2,
        gap: 1
      }}>
        <Button 
          onClick={onClearEvents}
          variant="outlined"
          color="error"
          disabled={events.length === 0}
          sx={{ minWidth: 100 }}
        >
          전체 삭제
        </Button>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{ minWidth: 100 }}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventModal;