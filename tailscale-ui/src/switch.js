import * as React from 'react';
import Switch from '@mui/material/Switch';
const electron = window.require("electron");


export default function ControlledSwitches(props) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked) {
            electron.ipcRenderer.send("disconnect", null);
            props.callback(false, "Disconnected");
            // props.connected = "error";
            // props.label = "Disconnected"

        }
        else {
            electron.ipcRenderer.send("connect", null);
            props.callback(true, "Connected");

            // props.connected = "success";
            // props.label = "Connected"

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