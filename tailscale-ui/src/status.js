import Chip from '@mui/material/Chip';


export default function TailscaleStatus(props) {
    // const [connected, setConnected] = React.useState(connected);

    // const handleChange = (event) => {
    //     setConnected(connected);
    // };

    return (
        <Chip
            label={props.label}
            color={props.indicator}
        />
    );

}
