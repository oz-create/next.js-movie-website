"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { CiSearch } from 'react-icons/ci';
import { List, ListItem, ListItemButton, TextField } from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMemo, useState } from 'react';
import { ListTypeArray, PeopleTypeArray } from '@/types/type';
import { BASE_URL } from '@/config/constants';
import Link from 'next/link';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SearchDrawer() {
  const { list, nowPlayingMovies, upcomingMovies, series, people, topRatedSeries } = useSelector((state: RootState) => state.movies)
  const [search, setSearch] = useState("");

  const mergedMovies = useMemo(() => {
    return [...nowPlayingMovies, ...list, ...upcomingMovies].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
    );
  }, [nowPlayingMovies, list, upcomingMovies]);

  const mergedSeries = useMemo(() => {
    return [...series, ...topRatedSeries].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
    );
  }, [series, topRatedSeries]);

  const filteredMovies = useMemo(() => {
    if (!search.trim()) return [];
    return mergedMovies.filter(movie =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, mergedMovies]);

  const filteredSeries = useMemo(() => {
    if (!search.trim()) return [];
    return mergedSeries.filter(serie =>
      serie.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, mergedSeries]);

  const filteredPeople = useMemo(() => {
    if (!search.trim()) return [];
    return people.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, people]);

  const [state, setState] = useState({ top: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const listed = (anchor: Anchor) => (
    <Box
      sx={{ p: 2, backgroundColor: "var(--light-color)" }}
      role="presentation"
    >
      <TextField
        fullWidth
        placeholder="Search..."
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "var(--color-primary)",
            "& fieldset": {
              borderColor: "var(--color-primary)",
              borderRadius: "0.7rem"
            },
            "&:hover fieldset": { borderColor: "var(--color-primary)" },
            "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
          },
          "& .MuiInputBase-input::placeholder": { color: "var(--color-primary)", opacity: 1 },
        }}
      />
      <List>
        {filteredMovies.map((movie, index) => (
          <Link href={"/movies/" + movie.id}  key={index}>
            <ListItemButton
              onClick={() => {
                setState({ top: false }); // drawer kapansın
                setSearch(""); // search temizlensin
              }}>
              <Image src={BASE_URL + movie.poster_path} alt={movie.title} width={100} height={100} className='rounded-lg w-[4.5rem] h-[4.5rem] object-cover mr-3' />
              <p className='text-base text-[var(--color-primary)]'>{movie.title}</p>
          </ListItemButton>
          </Link>
        
        ))}
        {filteredSeries.map((serie, index) => (
          <Link href={"/series/" + serie.id}  key={index}>
          <ListItemButton
              onClick={() => {
                setState({ top: false }); // drawer kapansın
                setSearch(""); // search temizlensin
          }}>
            <Image src={BASE_URL + serie.poster_path} alt={serie.name} width={100} height={100} className='rounded-lg w-[4.5rem] h-[4.5rem] object-cover mr-3' />
            <p className='text-base text-[var(--color-primary)]'>{serie.name}</p>
          </ListItemButton>
          </Link>
          
        ))}
        {filteredPeople.map((person, index) => (
          <Link href={"/charactors/" + person.id}  key={index}>
            <ListItemButton
              onClick={() => {
                setState({ top: false }); // drawer kapansın
                setSearch(""); // search temizlensin
            }}>
              <Image src={BASE_URL + person.profile_path} alt={person.name} width={100} height={100} className='rounded-lg w-[4.5rem] h-[4.5rem] object-cover mr-3' />
              <p className='text-base text-[var(--color-primary)]'>{person.name}</p>
            </ListItemButton>
          </Link>
          
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['top'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} sx={{ m: 0, p: 0, minWidth: "2rem" }}>
            <CiSearch className='text-[var(--color-primary)] w-8 h-8 object-cover' />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {listed(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
