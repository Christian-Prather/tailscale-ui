import * as React from 'react';
import Switch from '@mui/material/Switch';
const electron = window.require("electron");


export default function ControlledSwitches(props) {
    const [checked, setChecked] = React.useState(props.connected);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked) {
            electron.ipcRenderer.send("disconnect", null);
            props.callback(false, "Disconnected");
        }
        else {
            electron.ipcRenderer.send("connect", null);
            props.callback(true, "Connected");
        }
    };

    React.useEffect(() => {
        setChecked(props.connected);
    }, [props.connected]);

    return (
        <Switch
            label="Connected to TailNet"
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}