import { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import extractColors from 'extract-colors';
import { motion } from 'framer-motion';

import Navbar from '@/common/components/Navbar';
import Search from '@/common/components/Search';
import AudioPlayer from '@/common/components/audioPlayer';

import { openSnackbar } from '@/reducers/snackbar';
import { getBackgroundColor } from './utils';
import Tab from './components/Tab';

function Home() {
  const [colors, setColors] = useState({
    initial: [{ red: 32, green: 22, blue: 6, hex: '#201606' }],
    current: [{ red: 32, green: 22, blue: 6, hex: '#201606' }],
  });

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

        setColors(prev => ({ initial: prev.current, current: colors }));
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
      component={motion.div}
      px={{ xs: 2, md: 4 }}
      pt={{ xs: 2, md: 4 }}
      animate={{
        background: [
          getBackgroundColor(colors.initial),
          getBackgroundColor(colors.current),
        ],
      }}
      initial={false}
      transition={{ delay: 0.2, duration: 0.5, ease: 'linear' }}
      sx={{
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
