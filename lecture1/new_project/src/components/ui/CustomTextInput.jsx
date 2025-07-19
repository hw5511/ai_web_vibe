import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * CustomTextInput 컴포넌트
 * 
 * Props:
 * @param {string} label - 텍스트 필드 라벨 [Optional]
 * @param {string} value - 입력값 [Optional]
 * @param {function} onChange - 입력값 변경 시 실행할 함수 [Optional]
 * @param {string} placeholder - 플레이스홀더 텍스트 [Optional]
 * @param {string} variant - MUI TextField 변형 (outlined, filled, standard) [Optional, 기본값: outlined]
 * @param {boolean} fullWidth - 전체 너비 사용 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <CustomTextInput 
 *   label="이름" 
 *   value={name} 
 *   onChange={handleNameChange} 
 *   placeholder="이름을 입력하세요"
 * />
 */
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[400],
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
      borderWidth: '2px',
    },
    '&.Mui-focused:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.grey[600],
    '&.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  },
  '& .MuiOutlinedInput-input': {
    '&:focus': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

function CustomTextInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  variant = 'outlined', 
  fullWidth = false,
  ...props 
}) {
  return (
    <StyledTextField
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant={variant}
      fullWidth={fullWidth}
      {...props}
    />
  );
}

export default CustomTextInput;