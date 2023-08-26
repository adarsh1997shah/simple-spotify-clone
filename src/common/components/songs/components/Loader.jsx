import { Avatar, Skeleton } from '@mui/material';
import { Box } from '@mui/system';

export function Loader() {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {Array.from(new Array(4)).map((_, index) => (
        <Box key={index} display="flex" alignItems="center" gap={2}>
          <Skeleton variant="circular" sx={{ bgcolor: 'grey.900' }}>
            <Avatar sx={{ width: 60, height: 60 }} />
          </Skeleton>

          <Skeleton
            variant="rounded"
            height={60}
            sx={{ bgcolor: 'grey.900', width: '100%' }}
          />
        </Box>
      ))}
    </Box>
  );
}
