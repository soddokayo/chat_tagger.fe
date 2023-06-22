import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
import * as bootstrap from "bootstrap";

const TaggedLi = (props) => {
    const [text, setText] = useState("");
    const [ners, setNers] = useState([]);
    const tag_color = {
        DT: "btn-warning", // DATE
        LC: "btn-info", // LOCATION
        OG: "btn-secondary", // ORGANIZATION
        PS: "btn-success", // PERSON
        QT: "btn-dark", // QUANTITY
        TI: "btn-primary", // TIME
        CR: "btn-danger", // CRIME
    }

    useEffect(() => {
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    }, [])

    useEffect(() => {
        setText(props.text);
    }, [props.text]);
    useEffect(() => {
        if (text === "" || ners.length !== 0) {
            return;
        }
        const req = {
            sent: text,
        };

        axiosRetry(axios, { retries: 5 });

        axios
            .post(process.env.REACT_APP_BE_URL+"/api/both", req, {timeout: 100000})
            .then((res) => {
                if (res.data.length !== 0) {
                    setNers(res.data);
                    // for (var ner of res.data) {
                    //     const new_text = text.slice(0, ner.start) + "<" + text.slice(ner.start, ner.end) + ":"+ner.entity_group+">" + text.slice(ner.end)
                    //     setText(new_text)
                    //     console.log(new_text)
                    // }
                }
            })
            .catch((e) => {
                console.log("error with", text, "msg: ", e);
            });
    }, [text]);
    return (
        <li className={
            ners.length !== 0
            ? props.className+" "+"bg-light"//"list-group-item-warning"
            : props.className
        }>{
            ners.length !== 0
            ? ners.map((ner, idx) => {
                const color = "btn py-0 px-1 mx-1 "+tag_color[ner.entity_group]
                if (idx === 0) { // 처음
                    if (ners.length === 1){
                        return (
                            <> 
                            {text.slice(0, ner.start)} 
                            <span className={color} data-bs-toggle="popover" data-bs-title={ner.entity_group} data-bs-content={ner.word}>
                                {text.slice(ner.start, ner.end)} 
                            </span> 
                            {text.slice(ner.end)}
                            </>

                        )
                    }
                    return (
                        <> 
                        {text.slice(0, ner.start)} 
                        <span className={color} data-bs-toggle="popover" data-bs-title={ner.entity_group} data-bs-content={ner.word}>
                            {text.slice(ner.start, ner.end)} 
                        </span> 
                        {text.slice(ner.end, ners[idx+1].start-1)}
                        </>
                    )
                } else if (idx !== ners.length-1) { // 중간
                    return (
                        <> 
                        {text.slice(ners[idx-1].end+1, ner.start)} 
                        <span className={color} data-bs-toggle="popover" data-bs-title={ner.entity_group} data-bs-content={ner.word}>
                            {text.slice(ner.start, ner.end)} 
                        </span> 
                        {text.slice(ner.end, ners[idx+1].start-1)}
                        </>
                    )
                } else { // 끝
                    return (
                        <> 
                        {text.slice(ners[idx-1].end+1, ner.start)} 
                        <span className={color} data-bs-toggle="popover" data-bs-title={ner.entity_group} data-bs-content={ner.word}>
                            {text.slice(ner.start, ner.end)} 
                        </span> 
                        {text.slice(ner.end)}
                        </>
                    )
            }})
            : text
        }</li>
    );
};

export default TaggedLi;