import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MovieSearchTypeArray } from '@/types/type';

export default function SelectMenu({ label, data } : {label: string, data: MovieSearchTypeArray}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
     <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{ label }</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
            {
                data.map(item => (
                    <MenuItem key={item.id} value={item.release_date}>{item.release_date}</MenuItem>
                ))
            }
     
        </Select>
      </FormControl>
    </Box>
  )
}
