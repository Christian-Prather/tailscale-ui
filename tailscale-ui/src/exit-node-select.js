import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

import Select from 'react-select';

export default function BasicSelect(props) {
    const [ip, setIp] = React.useState('local');

    const handleChange = (event) => {
        // setIp(event.target.value);
        setIp(event.target.label);
    };

    var ips = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ];

    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ip}
            label="Exit Node"
            onChange={handleChange}
            options={ips}
        >
            {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}

        </Select>
    );
}
