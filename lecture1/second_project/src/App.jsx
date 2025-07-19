import { useState, useRef } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import SimpleBox from './components/ui/SimpleBox';
import EventModal from './components/ui/EventModal';

function App() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickTimeoutRef = useRef(null);

  const handleBoxClick = () => {
    // 더블클릭 이벤트를 위한 딜레이 처리
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      const newEvent = {
        type: 'click',
        timestamp: Date.now()
      };
      setEvents(prev => [...prev, newEvent]);
      clickTimeoutRef.current = null;
    }, 300); // 300ms 딜레이로 더블클릭과 구분
  };

  const handleBoxDoubleClick = () => {
    // 클릭 이벤트 타임아웃 취소
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    
    const newEvent = {
      type: 'doubleclick',
      timestamp: Date.now()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClearEvents = () => {
    setEvents([]);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      py: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            클릭 이벤트 데모
          </Typography>
          <Typography variant="h6" color="text.secondary">
            박스를 클릭하거나 더블클릭하여 이벤트를 확인해보세요
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                이벤트 테스트 영역
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                아래 박스를 클릭하거나 더블클릭하여 이벤트를 발생시키세요
              </Typography>
              
              {/* 색상 안내 */}
              <Box sx={{ display: 'flex', gap: 3, mt: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    bgcolor: '#4caf50', 
                    borderRadius: '50%',
                    border: '2px solid #2e7d32'
                  }} />
                  <Typography variant="body2">
                    클릭 이벤트 (초록색)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    bgcolor: '#9c27b0', 
                    borderRadius: '50%',
                    border: '2px solid #7b1fa2'
                  }} />
                  <Typography variant="body2">
                    더블클릭 이벤트 (보라색)
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <SimpleBox
                onClick={handleBoxClick}
                onDoubleClick={handleBoxDoubleClick}
                title="클릭 테스트 박스"
                description="클릭하거나 더블클릭하세요"
                width={350}
                height={250}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom>
                이벤트 현황
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                발생한 이벤트를 확인하고 관리할 수 있습니다
              </Typography>
            </Box>

            <Box sx={{ 
              bgcolor: '#f8f9fa', 
              border: '1px solid #e9ecef',
              borderRadius: 2,
              p: 3,
              textAlign: 'center'
            }}>
              <Typography variant="h4" sx={{ 
                color: '#495057',
                mb: 1,
                fontWeight: 'bold'
              }}>
                {events.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                총 발생한 이벤트
              </Typography>
              
              {events.length > 0 && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    최근 이벤트:
                  </Typography>
                  <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: events[events.length - 1].type === 'click' ? '#4caf50' : '#9c27b0',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    {events[events.length - 1].type === 'click' ? '👆 클릭' : '👆👆 더블클릭'}
                  </Box>
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  onClick={handleOpenModal}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  이벤트 로그 보기
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleClearEvents}
                  disabled={events.length === 0}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  전체 삭제
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <EventModal
          open={isModalOpen}
          onClose={handleCloseModal}
          events={events}
          onClearEvents={handleClearEvents}
        />
      </Container>
    </Box>
  );
}

export default App;