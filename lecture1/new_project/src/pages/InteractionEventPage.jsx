import { useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import CustomTextInput from '../components/ui/CustomTextInput';
import ClickEventBox from '../components/ui/ClickEventBox';
import EventModal from '../components/ui/EventModal';
import DraggableBox from '../components/ui/DraggableBox';
import ScrollToolbar from '../components/ui/ScrollToolbar';
import ScrollableBackground from '../components/ui/ScrollableBackground';
import IntersectionBox from '../components/ui/IntersectionBox';
import RainbowIntersectionBox from '../components/ui/RainbowIntersectionBox';

/**
 * InteractionEventPage 컴포넌트
 * 
 * 인터랙션 이벤트 데모 페이지
 * - Text Input 컴포넌트 (hover, focus 상태)
 * - Click Event Box (단일/더블클릭 구분)
 * - Draggable Box (드래그 가능한 고정 박스)
 * - Intersection Observer (뷰포트 감지)
 * - Rainbow Intersection Box (무지개 색상 변화)
 * - Scroll Toolbar (스크롤 정보 표시)
 */
function InteractionEventPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSingleClick = () => {
    setEventType('single');
    setEventMessage('싱글클릭 이벤트가 발생했습니다!');
    setModalOpen(true);
  };

  const handleDoubleClick = () => {
    setEventType('double');
    setEventMessage('더블클릭 이벤트가 발생했습니다!');
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* 스크롤 툴바 - 네비게이션 아래에 위치 */}
      <ScrollToolbar height={60} topOffset={64} />
      
      {/* 스크롤 가능한 배경 */}
      <ScrollableBackground 
        viewportMultiplier={3} 
        gradientStart="#667eea" 
        gradientEnd="#764ba2"
      >
        <Box sx={{ 
          width: '100%', 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 },
          pt: { xs: 18, md: 20 }, // 네비게이션(64px) + 스크롤툴바(60px) + 여백
        }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Interactive Components Demo
            </Typography>
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Text Input Demo
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 3,
                    maxWidth: 400,
                    mx: 'auto'
                  }}>
                    <CustomTextInput
                      label="이름"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="이름을 입력하세요"
                      fullWidth
                    />
                    
                    <CustomTextInput
                      label="이메일"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="이메일을 입력하세요"
                      type="email"
                      fullWidth
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Click Event Demo
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ClickEventBox
                      width={250}
                      height={250}
                      onSingleClick={handleSingleClick}
                      onDoubleClick={handleDoubleClick}
                      clickDelay={300}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        {/* Intersection Observer 박스들 */}
        <Box sx={{ py: 4 }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Intersection Observer 데모
            </Typography>
            
            <IntersectionBox 
              width={350}
              height={200}
              backgroundColor="#9C27B0"
              activeColor="#E91E63"
              title="관찰 박스 1"
              threshold={0.3}
              id="box-1"
            />
            
            <Box sx={{ height: '50vh' }} />
            
            <IntersectionBox 
              width={400}
              height={250}
              backgroundColor="#FF9800"
              activeColor="#4CAF50"
              title="관찰 박스 2"
              threshold={0.6}
              id="box-2"
            />
            
            <Box sx={{ height: '30vh' }} />
            
            <IntersectionBox 
              width={320}
              height={180}
              backgroundColor="#3F51B5"
              activeColor="#00BCD4"
              title="관찰 박스 3"
              threshold={0.8}
              id="box-3"
            />
            
            <Box sx={{ height: '40vh' }} />
            
            <RainbowIntersectionBox 
              width={500}
              height={350}
              title="🌈 무지개 Threshold 박스"
              id="rainbow-1"
            />
          </Container>
        </Box>
        
        {/* 추가 콘텐츠 섹션들 */}
        <Box sx={{ 
          width: '100%', 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 }
        }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              스크롤 섹션 2
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              스크롤을 통해 페이지의 다양한 섹션을 탐험해보세요. 
              상단 툴바에서 스크롤 방향과 현재 위치를 확인할 수 있습니다.
            </Typography>
            
            <Box sx={{ mt: 6 }}>
              <IntersectionBox 
                width={380}
                height={220}
                backgroundColor="#795548"
                activeColor="#FFC107"
                title="관찰 박스 4"
                threshold={0.4}
                id="box-4"
              />
            </Box>
          </Container>
        </Box>
        
        <Box sx={{ 
          width: '100%', 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 }
        }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              스크롤 섹션 3
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                mb: 4
              }}
            >
              마지막 섹션입니다. 드래그 가능한 박스들과 함께 
              다양한 인터랙티브 요소들을 체험해보세요.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 4 }}>
              <IntersectionBox 
                width={280}
                height={160}
                backgroundColor="#E91E63"
                activeColor="#8BC34A"
                title="관찰 박스 5"
                threshold={0.5}
                id="box-5"
              />
              
              <IntersectionBox 
                width={280}
                height={160}
                backgroundColor="#607D8B"
                activeColor="#FF5722"
                title="관찰 박스 6"
                threshold={0.7}
                id="box-6"
              />
            </Box>
            
            <Box sx={{ height: '20vh' }} />
            
            <RainbowIntersectionBox 
              width={450}
              height={300}
              title="🌈 무지개 박스 2"
              id="rainbow-2"
            />
          </Container>
        </Box>
      </ScrollableBackground>
      
      {/* 드래그 가능한 고정 박스들 */}
      <DraggableBox 
        width={120}
        height={120}
        initialX={50}
        initialY={50}
        backgroundColor="#9C27B0"
        title="드래그 1"
      />
      
      <DraggableBox 
        width={100}
        height={100}
        initialX={200}
        initialY={80}
        backgroundColor="#E91E63"
        title="드래그 2"
      />
      
      <DraggableBox 
        width={140}
        height={140}
        initialX={350}
        initialY={120}
        backgroundColor="#3F51B5"
        title="드래그 3"
      />
      
      <EventModal
        open={modalOpen}
        onClose={handleModalClose}
        eventType={eventType}
        title={eventType === 'single' ? '싱글클릭' : '더블클릭'}
        message={eventMessage}
      />
    </>
  );
}

export default InteractionEventPage;