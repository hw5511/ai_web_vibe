import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Navigation from './components/common/Navigation';
import InteractionEventPage from './pages/InteractionEventPage';
import VisualTestPage from './pages/VisualTestPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation title="Interactive Demo App" />
        <Box sx={{ pt: 8 }}> {/* 네비게이션 높이만큼 상단 패딩 */}
          <Routes>
            <Route path="/" element={<InteractionEventPage />} />
            <Route path="/visual-test" element={<VisualTestPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App