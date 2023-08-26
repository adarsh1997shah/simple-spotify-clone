import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

import { getMinAndSec } from '@/common/utils/time';

import { setCurrentlyPlaying } from '@/reducers/music';

function MusicList() {
  const dispatch = useDispatch();
  const { currentlyPlaying, filteredData } = useSelector(state => state.music);

  const handleSelectMusic = id => () => {
    const music = filteredData.find(({ _id }) => _id == id);

    if (music) {
      dispatch(setCurrentlyPlaying(music));
    }
  };

  return (
    <Box
      className="music-list-container"
      sx={{
        maxHeight: { xs: 'none', sm: '44vh', md: '77vh' },
        overflowY: { xs: 'none', sm: 'scroll' },
      }}
    >
      <List sx={{ bgcolor: 'transparent' }}>
        {filteredData.map(({ _id, title, photo, duration, artist }) => {
          const { min, seconds } = getMinAndSec(duration);

          return (
            <ListItemButton
              key={_id}
              selected={currentlyPlaying?._id == _id}
              sx={{
                pr: 0,
                borderRadius: 2,
                transition: 'all 200ms linear',
                ':hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                },
              }}
              onClick={handleSelectMusic(_id)}
            >
              <ListItem
                disablePadding
                secondaryAction={
                  <div>
                    {min}:{seconds}
                  </div>
                }
              >
                <ListItemAvatar>
                  <Avatar src={photo} alt={title} />
                </ListItemAvatar>
                <ListItemText
                  primary={title}
                  secondary={artist}
                  sx={{
                    '& p': {
                      color: '#fff',
                      opacity: '0.6',
                    },
                    '& span': {
                      width: '85%',
                    },
                  }}
                />
              </ListItem>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default MusicList;
