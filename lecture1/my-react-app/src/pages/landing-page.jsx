import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import HeroSection from '../components/landing/hero-section';
import ProblemSection from '../components/landing/problem-section';
import SolutionSection from '../components/landing/solution-section';
import TestimonialSection from '../components/landing/testimonial-section';
import PricingSection from '../components/landing/pricing-section';

/**
 * Landing Page 컴포넌트
 * 
 * Props:
 * - props 없음
 *
 * Example usage:
 * <LandingPage />
 */
function LandingPage() {
  const handleCtaClick = () => {
    // CTA 버튼 클릭 시 실행할 로직
    console.log('CTA 버튼이 클릭되었습니다!');
    // 실제 구현 시에는 회원가입 모달이나 페이지로 이동
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header onCtaClick={handleCtaClick} />
      
      <Box component="main">
        <HeroSection onCtaClick={handleCtaClick} />
        <ProblemSection />
        <SolutionSection />
        <TestimonialSection />
        <PricingSection onCtaClick={handleCtaClick} />
      </Box>
      
      <Footer />
    </Box>
  );
}

export default LandingPage;