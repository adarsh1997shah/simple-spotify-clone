import { Box, Grid, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

import Navbar from '@/common/components/Navbar';
import Search from '@/common/components/Search';
import AudioPlayer from '@/common/components/AudioPlayer';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import extractColors from 'extract-colors';

function Home() {
  const { currentlyPlaying } = useSelector(state => state.music);
  const [colors, setColors] = useState([{ hex: '#201606' }, { hex: '#000' }]);

  const getColorFromImage = useCallback(async currentlyPlaying => {
    const colors = await extractColors(currentlyPlaying.photo, {
      crossOrigin: 'Anonymous',
    });

    setColors(colors);
  }, []);

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
        background: `linear-gradient(135deg, ${
          colors[colors.length - 1].hex
        } 0%, ${colors[colors.length - 1].hex} 100%)`,
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
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                  }
                  to="/for-you"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold', opacity: 0.4 }}
                  >
                    For You
                  </Typography>
                </NavLink>

                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                  }
                  to="/top-tracks"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold', opacity: 0.4 }}
                  >
                    Top Tracks
                  </Typography>
                </NavLink>
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
