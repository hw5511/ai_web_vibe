import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper
} from '@mui/material';
import SectionWrapper from '../common/section-wrapper';
import { 
  MessageOutlined, 
  EmailOutlined, 
  SettingsOutlined 
} from '@mui/icons-material';

/**
 * Problem Section 컴포넌트
 * 
 * Props:
 * - props 없음
 *
 * Example usage:
 * <ProblemSection />
 */
function ProblemSection() {
  const problems = [
    {
      icon: <MessageOutlined sx={{ fontSize: 48, color: '#ff6b6b' }} />,
      title: '카카오톡 업무 혼재',
      description: '개인 메시지와 업무 메시지가 뒤섞여 중요한 내용을 놓치게 됩니다.'
    },
    {
      icon: <EmailOutlined sx={{ fontSize: 48, color: '#ffa726' }} />,
      title: '이메일의 느린 소통',
      description: '즉시 답변이 필요한 상황에서 이메일은 너무 느리고 비효율적입니다.'
    },
    {
      icon: <SettingsOutlined sx={{ fontSize: 48, color: '#ab47bc' }} />,
      title: '복잡한 협업 툴',
      description: '기능이 너무 많아 팀원들이 사용법을 익히기 어렵고 혼란스럽습니다.'
    }
  ];

  return (
    <SectionWrapper backgroundColor="#f8f9fa" py={10}>
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
          이런 문제로 고민하셨나요?
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          많은 팀들이 겪고 있는 소통의 어려움들을 해결해드립니다.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {problems.map((problem, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 4,
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Box sx={{ mb: 3 }}>
                {problem.icon}
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
                {problem.title}
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666',
                  lineHeight: 1.6
                }}
              >
                {problem.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
}

export default ProblemSection;