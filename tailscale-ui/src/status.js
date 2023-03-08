import Chip from '@mui/material/Chip';
import { useEffect } from 'react';

import React from 'react';


export default function TailscaleStatus(props) {
    const [indicator, setIndicator] = React.useState(props.indicator);
    const [label, setLabel] = React.useState(props.label);
    // const handleChange = (event) => {
    //     setConnected(connected);
    // };
    useEffect(() => {
        setIndicator(props.indicator);
        setLabel(props.label);
    }, [props]);

    return (
        <Chip
            label={label}
            color={indicator}
        />
    );

}
