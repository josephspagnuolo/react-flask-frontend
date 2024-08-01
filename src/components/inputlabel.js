import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';

const CustomInputLabel = styled(InputLabel)({
  color: 'black',
});

const PrimaryInputLabel = ({ label, htmlFor }) => {
  return (
    <CustomInputLabel shrink htmlFor={htmlFor}>
      {label}
    </CustomInputLabel>
  );
}

export default PrimaryInputLabel;