import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function TaskPlaceholderTitle() {
  return (
    <Stack spacing={1}>
      <div style={{ display: "flex", width: "100%" }}>
        <Skeleton variant="rectangular" width={170} height={25} sx={{ marginLeft: '80px' }} />
        <Skeleton variant="rectangular" width={170} height={25} sx={{ marginLeft: '70px' }} />
        <Skeleton variant="rectangular" width={170} height={25} sx={{ marginLeft: '60px' }} />
        <Skeleton variant="rectangular" width={170} height={25} sx={{ marginLeft: '60px' }} />
        <Skeleton variant="rectangular" width={170} height={25} sx={{ marginLeft: '60px' }} />
      </div>
    </Stack>
  );
}
