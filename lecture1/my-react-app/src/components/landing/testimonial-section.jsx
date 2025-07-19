import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  Avatar
} from '@mui/material';
import SectionWrapper from '../common/section-wrapper';
import { StarOutlined } from '@mui/icons-material';

/**
 * Testimonial Section 컴포넌트
 * 
 * Props:
 * - props 없음
 *
 * Example usage:
 * <TestimonialSection />
 */
function TestimonialSection() {
  const testimonials = [
    {
      name: '김민수',
      company: '스타트업 A',
      role: 'CTO',
      content: '정말 간단하고 직관적이에요. 팀원들이 금방 적응했고, 불필요한 기능이 없어서 집중도가 높아졌습니다.',
      avatar: 'K',
      rating: 5
    },
    {
      name: '이지영',
      company: '디자인 스튜디오 B',
      role: '프로젝트 매니저',
      content: '파일 공유가 정말 편리해요. 클라이언트와의 소통도 원활해졌고, 프로젝트 진행이 훨씬 수월해졌습니다.',
      avatar: 'L',
      rating: 5
    },
    {
      name: '박성호',
      company: '마케팅 에이전시 C',
      role: '팀장',
      content: '카카오톡 업무용으로 쓰다가 이걸로 바꿨는데, 업무와 개인 메시지가 분리되니까 훨씬 깔끔해졌어요.',
      avatar: 'P',
      rating: 5
    }
  ];

  const companies = [
    { name: '스타트업 A', color: '#1976d2' },
    { name: '디자인 스튜디오 B', color: '#4caf50' },
    { name: '마케팅 에이전시 C', color: '#ff9800' },
    { name: '개발회사 D', color: '#9c27b0' }
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
          고객들의 이야기
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          이미 많은 팀들이 TeamChat으로 소통의 변화를 경험하고 있습니다.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {testimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 4,
                height: '100%',
                borderRadius: '16px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    backgroundColor: '#1976d2',
                    mr: 2,
                    width: 48,
                    height: 48
                  }}
                >
                  {testimonial.avatar}
                </Avatar>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#1a1a1a'
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666'
                    }}
                  >
                    {testimonial.role}, {testimonial.company}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarOutlined key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
                ))}
              </Box>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666',
                  lineHeight: 1.6,
                  fontStyle: 'italic'
                }}
              >
                "{testimonial.content}"
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666',
            mb: 4
          }}
        >
          함께하는 기업들
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
          {companies.map((company, index) => (
            <Box 
              key={index}
              sx={{ 
                px: 3,
                py: 2,
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                minWidth: '120px',
                textAlign: 'center'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: company.color,
                  fontWeight: 'bold'
                }}
              >
                {company.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
}

export default TestimonialSection;