import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function SelectMenu({ label, data, setSelected } : {label: string, data: any[], setSelected: React.Dispatch<React.SetStateAction<any>>}) {
  const [age, setAge] = React.useState('');
  

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    setSelected(event.target.value as string);
    //filter()
  };
  return (
     <Box sx={{ minWidth: 198 }} className="">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"
        sx={{
          color:"var(--color-primary)"
        }}>{ label }</InputLabel>
        <Select
          labelId={`demo-simple-select-label${label}`}
          id="demo-simple-select"
          value={age}
          label={label}
          onChange={handleChange}
             sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary-blue)", // varsayılan border rengi
                color: "var(--color-primary)",
                borderRadius: "0.75rem"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary-blue)", // hover durumunda
                color: "var(--color-primary)"
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary-blue)", // focus olduğunda
              },
              "& .MuiSelect-select": {
                color: "var(--color-primary)", // input text rengi
              },
              "& .MuiSvgIcon-root": {
                color: "var(--color-primary)", // ok işareti rengi
              },
            }}
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "var(--color-primary)" }}>Seçiniz</span>; // placeholder
              }
              return selected;
            }}
        >
            {
                data.map((item,index)=> (
                     <MenuItem key={index} value={item} className='text-[var(--color-primary)]'>{item}</MenuItem>
                ))
            }
     
        </Select>
      </FormControl>
    </Box>
  )
}
