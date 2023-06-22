import { useEffect, useState } from "react";
import TaggedLi from "./TaggedLi";

const ChatLoader = (props) => {
    const [kakaotalk, setKakaotalk] = useState([]);
    const [telegram, setTelegram] = useState({});

    const handleButtonClick = (e) => {
        console.log(telegram)
    };

    useEffect(() => {
        if (props.ext === "txt") {
            setKakaotalk(props.dump.split('\r\n'));
            setTelegram({});
            //console.log("txt", kakaotalk);
        } else if (props.ext === "json") {
            setTelegram(JSON.parse(props.dump));
            setKakaotalk([]);
            //console.log("json", telegram);
        }
    }, [props.ext, props.dump])
    return (
        <>
        <button onClick={handleButtonClick} type="button" className="btn btn-danger" data-bs-toggle="popover" data-bs-title="대화내역 분석" data-bs-content="업로드 파일 대상 NER 태깅, 주제 분류">2. 대화내역 분석</button>
        <br /><br /><br />
        {kakaotalk && kakaotalk.map((chat, index) => {
            const items_ = chat.split(' : ')
            if (chat === "") {
                return (<br key={index} />)
            } else if (items_.length === 1) {
                return (
                    <div key={index} className="font-weight-bold text-center mb-3">
                        {chat}
                    </div>
                )
            } else {
                if (items_[0] === "저장한 날짜") {
                    return (
                        <div key={index} className="text-center mb-3">
                            {items_[0]} : {items_[1]}
                        </div>
                    )
                } else {
                    const date_ = items_[0].split(', ')[0];
                    const from_ = items_[0].split(', ')[1];
                    const text_ = items_[1];
                    return (
                        <ul key={index} className="list-group py-1 list-group-horizontal">
                            <li className="list-group-item py-1">{date_}</li>
                            <li className="list-group-item py-1">{from_}</li>
                            <TaggedLi className="list-group-item py-1" text={text_} />
                        </ul>
                    )
                    // <TaggedLi text={text_}></TaggedLi>
                }
            }})}
            
        {telegram.name && 
            <div class="font-weight-bold text-center mb-3">
                {telegram.name} : {telegram.type}
            </div>
        }
        {telegram.messages && telegram.messages.map((chat, index) => {
            const type_ = chat.type;
            if (type_ !== "message") {
                return (<></>)
            }
            const date_ = chat.date.split('T')[0]+' '+chat.date.split('T')[1];
            const from_ = chat.from;
            const text_ = chat.text;
            if (text_ === "") {
                return (<></>)
            } else if (typeof text_ === "string") {
                return (
                    <ul key={index} className="list-group py-1 list-group-horizontal">
                        <li className="list-group-item py-1">{date_}</li>
                        <li className="list-group-item py-1">{from_}</li>
                        <TaggedLi className="list-group-item py-1 list-group-item-info" text={text_} />
                    </ul>
                )
                // <TaggedLi text={text_}></TaggedLi>
            } else {
                // 리스트도 필요하게 되면 추후 처리
                // else if (typeof Array.isArray(text_)) {...}
                return (<></>)
            }})}
        </>
    )
};

export default ChatLoader;