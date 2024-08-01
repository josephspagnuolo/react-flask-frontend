import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useState, useRef } from 'react';

const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    right: 24,
    top: 140,
    width: '32px',
    height: '32px',
    borderRadius: '999px',
  },
});

const CustomButton = styled(Button)({
  boxShadow: 'none',
  color: 'rgb(232, 236, 236)',
  transition: 'ease-in-out',
  transitionDuration: '150ms',
  '&:hover': {
    backgroundColor: 'rgb(225, 101, 33)',
    boxShadow: 'none',
  },
});

const ProfilePictureInput = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };


  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="hide"
      />
      <StyledBadge
        badgeContent={(
          <CustomButton
            aria-label="change profile picture"
            size="large"
            sx={{
              padding: '6px 4px',
              backgroundColor: 'rgb(255, 109, 29)'
            }}
            disableRipple
            onClick={() => { inputRef.current?.click() }}
          >
            <EditIcon sx={{ width: 34, height: 30 }} />
          </CustomButton>
        )}>
        <Avatar
          alt="Profile Picture"
          src={preview ? preview : "/dog.svg"}
          sx={{
            width: 172,
            height: 172,
            backgroundColor: preview ? 'transparent' : 'rgba(255, 109, 29, 0.85)',
          }}
        />
      </StyledBadge>
    </>
  );
}

export default ProfilePictureInput