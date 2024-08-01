import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 15,
  padding: '6px 18px',
  backgroundColor: 'rgb(255, 109, 29)',
  borderRadius: '6px',
  minWidth: '160px',
  maxHeight: '38.25px',
  '&:hover': {
    backgroundColor: 'rgb(225, 101, 33)',
    boxShadow: 'none',
  },
});

const PrimaryButton = ({ text, func }) => {
  return (
    <CustomButton variant="contained" disableRipple onClick={func}>
      {text}
    </CustomButton>
  );
}

export default PrimaryButton;
