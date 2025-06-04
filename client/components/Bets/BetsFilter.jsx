import { useRouteLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { betsActions } from '../../src/store/bets-slice';
import { useDispatch } from 'react-redux';
import { Autocomplete, TextField, Chip, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function BetsFilter() {
  const players = useRouteLoaderData("bets-root");
  const [filter, setFilters] = useState({
    players: [],
    search: '',
    status: ''
  });

  const dispatch = useDispatch();
  function filterByStatus(element) {
    setFilters(prevState => {
      return {
        ...prevState,
        status: element.target.value
      }
    });
    dispatch(
      betsActions.filterByStatus({
        status: element.target.value
      })
    );
  }

  function filterByPlayers(value) {
    setFilters(prevState => {
      return {
        ...prevState,
        players: [...value]
      }
    });
    dispatch(
      betsActions.filterByPlayerIs({
        _ids: value.map(v => (v._id))
      })
    );
  }

  function filterBySearchTerm(element) {
    setFilters(prevState => {
      return {
        ...prevState,
        search: element.target.value
      }
    });
    dispatch(
      betsActions.filterBySearchTerm({
        term: element.target.value
      })
    );
  }

  return (
    <section className="sticky top-[60px] z-40 bg-gray-800 text-white p-1">
      <div className='flex flex-col lg:flex-row gap-1 md:gap-4 w-full items-stretch'>
        <div className='flex-1'>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            getOptionLabel={(option) => option.display_name}
            value={filter.players}
            options={players}
            onChange={(event, newValue) => {
              filterByPlayers(newValue);
            }}
            renderValue={(values, getItemProps) =>
              values.map((option, index) => {
                const { key, ...itemProps } = getItemProps({ index });
                return (
                  <Chip
                    color="primary"
                    key={key}
                    label={option.display_name}
                    {...itemProps}
                    sx={{
                      backgroundColor: '#1e1e1e',   // Dark background
                      color: '#ffffff',             // Label color
                      border: 'none',               // Remove border
                      '&:hover': {
                        backgroundColor: '#2c2c2c', // Darker on hover
                      },
                      '& .MuiChip-label': {
                        fontWeight: 500,            // Optional: make label bolder
                      },
                      '& .MuiChip-deleteIcon': {
                        color: '#bbbbbb',           // Close icon color
                        '&:hover': {
                          color: '#ffffff',
                        },
                      },
                    }}
                  />
                );
              })
            }
            renderInput={(params) => (<TextField {...params} label="Filter by player:"
              sx={{
                '& .MuiInputBase-root': {
                  color: '#FFFFFF',
                  backgroundColor: '#121212',
                },
                '& .MuiInputLabel-root': {
                  color: '#AAAAAA',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#FFFFFF',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiInputBase-root': {
                  backgroundColor: '#1E1E1E',
                },
              }}
            />)}
          />

        </div>
        <div className='flex-1'>
          <TextField
            id="outlined-basic"
            label="Search by title"
            variant="outlined"
            autoComplete="off"
            fullWidth
            onChange={filterBySearchTerm}
            sx={{
              '& .MuiInputBase-root': {
                color: '#FFFFFF',
                backgroundColor: '#121212',
              },
              '& .MuiInputLabel-root': {
                color: '#AAAAAA',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FFFFFF',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiInputBase-root': {
                backgroundColor: '#1E1E1E',
              },
            }}
          />
        </div>
        <div className='flex-1 text-white'>
          <FormControl fullWidth
            sx={{
              '& .MuiInputLabel-root': {
                color: '#AAAAAA', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FFFFFF', // Label color on focus
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#121212', // Input background
                color: '#FFFFFF',           // Selected value color
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',           // Remove border
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              },
              '& .MuiSvgIcon-root': {
                color: '#FFFFFF', // Dropdown arrow icon color
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">Filter by status:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              value={filter.status}
              label="Filter by status:"
              fullWidth
              onChange={filterByStatus}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="ongoing">On going</MenuItem>
              <MenuItem value="void">Void</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </section>
  );
}

export default BetsFilter;
