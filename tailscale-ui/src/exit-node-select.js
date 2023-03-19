import React, { useState, useEffect } from "react";
// import "./styles.css";
import Select from "react-select";

export default function BasicSelect(props) {
    console.log("PROPS", props.nodes);


    // const [options, setOptions] = useState([{
    //     label: "10.1.10.1",
    //     value: "10.1.10.1"
    // }]);

    const [options, setOptions] = useState(props.nodes);


    // const handleInputChange = input => {
    //     console.log(input);
    //     setOptions(
    //         initialOptions.filter(opt => {
    //             console.log(opt);
    //             return (
    //                 opt && opt.value && opt.value.contains && opt.value.contains(input)
    //             );
    //         })
    //     );
    // };
    
    useEffect(() => {
        setOptions(props.nodes);
    }, [props]);

    return (
        <Select options={options} />
    );
}
