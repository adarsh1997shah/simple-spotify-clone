import { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import extractColors from 'extract-colors';

import Navbar from '@/common/components/Navbar';
import Search from '@/common/components/Search';
import AudioPlayer from '@/common/components/audioPlayer';

import { openSnackbar } from '@/reducers/snackbar';
import { getBackgroundColor } from './utils';
import Tab from './components/Tab';

function Home() {
  const [colors, setColors] = useState([
    { red: 32, green: 22, blue: 6, hex: '#201606' },
  ]);

  const dispatch = useDispatch();
  const { currentlyPlaying } = useSelector(state => state.music);

  const getColorFromImage = useCallback(
    async currentlyPlaying => {
      try {
        const colors = await extractColors(currentlyPlaying.photo, {
          pixels: 2,
          distance: 1,
          lightnessDistance: 0,
          hueDistance: 0,
          saturationDistance: 0,
          crossOrigin: 'Anonymous',
        });

        setColors(colors);
      } catch (error) {
        dispatch(openSnackbar({ severity: 'error', msg: error }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentlyPlaying) {
      getColorFromImage(currentlyPlaying);
    }
  }, [getColorFromImage, currentlyPlaying]);

  return (
    <Box
      px={{ xs: 2, md: 4 }}
      pt={{ xs: 2, md: 4 }}
      sx={{
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
          background: getBackgroundColor(colors),
          transition: 'opacity 1s linear',
          opacity: 1,
        },
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={0}
          sm={4}
          md={2.5}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <Navbar />
        </Grid>

        <Grid
          container
          spacing={2}
          item
          xs={12}
          sm={8}
          md={9.5}
          direction={{ md: 'row-reverse' }}
        >
          <Grid item xs={12} md={6} lg={7}>
            <AudioPlayer />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Box className="music-list-wrapper">
              <Box
                className="music-list-nav-wrap"
                display="flex"
                gap={5}
                px={{ xs: 0, md: 2 }}
              >
                <Tab to="/for-you" title="For You" />

                <Tab to="/top-tracks" title="Top Tracks" />
              </Box>

              <Search />

              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
