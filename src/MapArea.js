import React from 'react';


import { Stage, Layer, Rect, Circle} from 'react-konva';

import Grid from '@mui/material/Grid';

function MapArea(props) {

    const {board} = props;

    return (
      <Grid container justifyContent="center" spacing={2}>
      <Stage width={886} height={600} style={{backgroundImage:"url(map.jpeg)", backgroundSize:"contain"}}>
      <Layer>
      {
          <>
          <Rect y={10} x={0} width={35} height={10} rotation={10} fill="red" />
          <Rect y={16} x={38} width={35} height={10} rotation={30} fill="red" />
          <Rect y={35} x={72} width={35} height={10} rotation={45} fill="red" />
          <Circle x={200} y={200} stroke="black" radius={50} />
          </>
      }
      </Layer>
    </Stage>
      </Grid>
    )
}

export default MapArea;
