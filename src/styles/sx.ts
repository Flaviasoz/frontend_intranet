export const sxTextField = {
  width: '100%',
  '& label.Mui-focused': {
    color: '#00b2a6',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#00b2a6',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#00b2a6',
    },
    '&:hover fieldset': {
      borderColor: '#00b2a6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00b2a6',
    },
  },
}

export const sxLogin = {
  m: 2,
  width: '38.5ch',
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& label.Mui-focused, & .MuiInputLabel-standard': {
    color: 'white',
  },
  '& .MuiInput-underline:before, & .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '&& .MuiInput-root:hover::before': {
    borderColor: 'white',
  },
  '& .MuiInputBase-input-MuiInput-input:invalid': {
    boxShadow: '0 0 0 30px black inset',
  },
}
