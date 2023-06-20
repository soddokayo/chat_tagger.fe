import React, { useEffect, useState } from "react";
import axios from "axios";

const TaggedLi = (props) => {
    const [text, setText] = useState("");
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setText(props.text);
    }, [props.text]);
    useEffect(() => {
        if (text === "" || flag) {
            return;
        }
        const req = {
            sent: text,
        };
        axios
            .post(process.env.REACT_APP_BE_URL+"/api/both", req, {timeout: 100000})
            .then((res) => {
                if (res.data.length !== 0) {
                    for (var ner of res.data) {
                        const new_text = text.slice(0, ner.start) + "<" + text.slice(ner.start, ner.end) + ":"+ner.entity_group+">" + text.slice(ner.end)
                        setText(new_text)
                        console.log(new_text)
                        setFlag(true);
                    }
                }
            })
            .catch((e) => {
                console.log("error with", text, "msg: ", e);
            });
    }, [text]);
    return (
        <li class={props.class+(flag&&" list-group-item-danger")}>{text}</li>
    );
};

export default TaggedLi;