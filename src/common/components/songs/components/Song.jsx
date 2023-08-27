import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { getMinAndSec } from '@/common/utils/time';

function Song({ song, onClick }) {
  const { currentlyPlaying } = useSelector(state => state.music);

  const { _id, title, photo, duration, artist } = song;

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
      onClick={onClick}
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
}

Song.propTypes = {
  song: PropTypes.object,
  onClick: PropTypes.func,
};

export default Song;
