import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function TaskPlaceholderCard() {
  return (
    <Stack spacing={1}>
        <div style={{ display: "flex" }}>
            <Skeleton variant="circular" width={40} height={40}sx={{ marginLeft: '15px' }} />
            <Skeleton variant="rectangular" width={125} height={40} sx={{ marginLeft: '15px' }} />
        </div>
        {/* <Skeleton variant="rectangular" width={170} height={30} /> */}
        <Skeleton variant="rounded" width={170} height={40} style={{ marginBottom: 25 }} />
        <Skeleton variant="rounded" width={170} height={25} />
    </Stack>
  );
}
