import React from 'react';


import { Stage, Layer} from 'react-konva';

import Grid from '@mui/material/Grid';

function MapArea(props) {

    // const {board} = props;

    return (
      <Grid container justifyContent="center" spacing={2}>
      <Stage width={886} height={600} style={{backgroundImage:"url(map.jpeg)", backgroundSize:"contain"}}>
      <Layer>
      {
          // <Rect y={10} width={50} height={50} fill="red" />
          // <Circle x={200} y={200} stroke="black" radius={50} />

      }
      </Layer>
    </Stage>
      </Grid>
    )
}

export default MapArea;
