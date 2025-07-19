import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper
} from '@mui/material';
import SectionWrapper from '../common/section-wrapper';
import { 
  FlashOnOutlined, 
  CloudUploadOutlined, 
  GroupOutlined 
} from '@mui/icons-material';

/**
 * Solution Section 컴포넌트
 * 
 * Props:
 * - props 없음
 *
 * Example usage:
 * <SolutionSection />
 */
function SolutionSection() {
  const solutions = [
    {
      icon: <FlashOnOutlined sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: '실시간 메시징',
      description: '빠르고 안정적인 실시간 메시지 전송으로 즉시 소통할 수 있습니다.',
      features: ['읽음 표시', '타이핑 알림', '오프라인 메시지 저장']
    },
    {
      icon: <CloudUploadOutlined sx={{ fontSize: 48, color: '#4caf50' }} />,
      title: '간편한 파일 공유',
      description: '드래그 앤 드롭으로 파일을 쉽게 공유하고 관리할 수 있습니다.',
      features: ['최대 100MB 지원', '이미지 미리보기', '파일 검색 기능']
    },
    {
      icon: <GroupOutlined sx={{ fontSize: 48, color: '#ff9800' }} />,
      title: '그룹 관리',
      description: '프로젝트별, 부서별로 그룹을 만들어 체계적으로 소통하세요.',
      features: ['무제한 그룹 생성', '멤버 권한 설정', '그룹 알림 관리']
    }
  ];

  return (
    <SectionWrapper py={10}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            color: '#1a1a1a'
          }}
        >
          TeamChat의 핵심 기능
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          팀 소통에 꼭 필요한 기능들만 선별하여 간단하고 효과적으로 제공합니다.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {solutions.map((solution, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                textAlign: 'center',
                height: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                  borderColor: '#1976d2'
                }
              }}
            >
              <Box sx={{ mb: 3 }}>
                {solution.icon}
              </Box>
              
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#1a1a1a'
                }}
              >
                {solution.title}
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666',
                  lineHeight: 1.6,
                  mb: 3
                }}
              >
                {solution.description}
              </Typography>
              
              <Box sx={{ textAlign: 'left' }}>
                {solution.features.map((feature, featureIndex) => (
                  <Box 
                    key={featureIndex}
                    sx={{ 
                      color: '#888',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 6,
                        height: 6,
                        backgroundColor: '#1976d2',
                        borderRadius: '50%',
                        mr: 1
                      }}
                    />
                    {feature}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
}

export default SolutionSection;