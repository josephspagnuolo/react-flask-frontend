import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const CustomTextInput = styled(InputBase)({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: '#F3F6F9',
    border: '1.5px solid',
    borderColor: 'rgba(255, 109, 29, 0.7)',
    fontSize: 16,
    padding: '14px 30px',
    '&:focus': {
      boxShadow: 'none',
      borderColor: 'rgb(255, 109, 29)',
    },
    '&::placeholder': {
      color: 'gray'
    }
  },
});

const PrimaryTextInput = ({ id, placeholder, value, setter }) => {
  return (
    <CustomTextInput
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        setter(event.target.value);
      }}
    />
  );
}

export default PrimaryTextInput;
