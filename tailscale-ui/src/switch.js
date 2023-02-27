import * as React from 'react';
import Switch from '@mui/material/Switch';
const electron = window.require("electron");


export default function ControlledSwitches(statusTracker, indicator) {
    const [checked, setChecked] = React.useState(statusTracker.connected);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked) {
            electron.ipcRenderer.send("disconnect", null);
            indicator.connected = "error";

        }
        else {
            electron.ipcRenderer.send("connect", null);
            indicator.connected = "success";

        }

    };

    return (
        <Switch
            label="Connected to TailNet"
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}