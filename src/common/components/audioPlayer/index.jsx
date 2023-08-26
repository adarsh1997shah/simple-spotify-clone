import { useEffect, useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Avatar, Typography } from '@mui/material';

import { Next } from '@/assets/svg/next';
import { Previous } from '@/assets/svg/previous';

import { setCurrentlyPlaying } from '@/reducers/music';
import { openSnackbar } from '@/reducers/snackbar';

import 'react-h5-audio-player/lib/styles.css';
import './index.css';

function CustomAudioPlayer() {
  const playerRef = useRef();

  const dispatch = useDispatch();
  const { currentlyPlaying, currentPlaylist } = useSelector(
    state => state.music
  );

  useEffect(() => {
    const audioRef = playerRef.current.audio;

    if (currentlyPlaying) {
      audioRef.current?.load();
      audioRef.current?.play();
    }

    return () => {
      if (currentlyPlaying) {
        audioRef.current?.pause();
      }
    };
  }, [currentlyPlaying]);

  const handlePrevious = () => {
    const index = currentPlaylist.findIndex(
      ({ _id }) => _id == currentlyPlaying._id
    );

    if (index > -1 && index != 0) {
      dispatch(setCurrentlyPlaying(currentPlaylist[index - 1]));
    }
  };

  const handleNext = () => {
    const index = currentPlaylist.findIndex(
      ({ _id }) => _id == currentlyPlaying._id
    );

    if (index > -1 && index != currentPlaylist.length - 1) {
      dispatch(setCurrentlyPlaying(currentPlaylist[index + 1]));
    }
  };

  const handleError = () => {
    dispatch(openSnackbar({ severity: 'error', msg: 'Media error occurred' }));
  };

  return (
    <Box
      px={{ mg: 0, lg: 12, height: '100%' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      className="audio-player-container"
    >
      <Box display="flex" gap={4}>
        <Avatar
          alt="Remy Sharp"
          src={currentlyPlaying?.photo}
          sx={{ display: { md: 'none' }, width: 100, height: 100 }}
          variant="rounded"
        />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {currentlyPlaying?.title}
          </Typography>

          <Typography variant="caption" sx={{ opacity: 0.4, fontSize: 16 }}>
            {currentlyPlaying?.artist}
          </Typography>
        </Box>
      </Box>

      <Box
        className="cover-image-container"
        sx={{
          bgcolor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(40px)',
          height: { sm: '100%', md: '300px' },
          width: '100%',
          borderRadius: 2,
          display: { xs: 'none', md: 'block' },
        }}
        mt={2}
      >
        {currentlyPlaying?.photo ? (
          <img src={currentlyPlaying.photo} alt="cover-image" />
        ) : (
          ''
        )}
      </Box>

      <AudioPlayer
        className={`${currentlyPlaying ? '' : 'audio-disable'}`}
        ref={playerRef}
        src={currentlyPlaying?.url}
        onClickPrevious={handlePrevious}
        onClickNext={handleNext}
        showSkipControls
        showJumpControls={false}
        customIcons={{ previous: <Previous />, next: <Next /> }}
        defaultCurrentTime="00:00"
        defaultDuration="00:00"
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.DURATION,
        ]}
        onError={handleError}
      />
    </Box>
  );
}

export default CustomAudioPlayer;
