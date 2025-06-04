import {
  Autocomplete,
  TextField,
  ThemeProvider,
  createTheme,
  Box,
} from '@mui/material';

const options = ['Option 1', 'Option 2', 'Option 3'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function CustomAutocomplete() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 2, bgcolor: 'background.default', color: 'text.primary' }}>
        <Autocomplete
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="No Border"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
              }}
            />
          )}
        />
      </Box>
    </ThemeProvider>
  );
}