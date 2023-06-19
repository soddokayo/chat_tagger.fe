import { useEffect, useState } from "react";

const ChatLoader = (props) => {
    const [chatList, setChatList] = useState([]);
    useEffect(() => {
        //console.log(props.lines);
        setChatList(props.lines);
        // for (var line in props.lines) {
        //     if (chatList.length > 3) {
        //         console.log(line);
        //         break;
        //     }
        //     setChatList(chatList => [...chatList, line]);
        // }
        //console.log(chatList);
    })
    return (
        <>
        {chatList.map((chat) => {
            const items_ = chat.split(' : ')
            if (chat === "") {
                return (<br />)
            } else if (items_.length === 1) {
                return (
                    <div class="font-weight-bold text-center mb-3">
                        {chat}
                    </div>
                )
            } else {
                if (items_[0] === "저장한 날짜") {
                    return (
                        <div class="text-center mb-3">
                            {items_[0]} : {items_[1]}
                        </div>
                    )
                } else {
                    return (
                        <ul class="list-group list-group-horizontal">
                            <li class="list-group-item py-1">{items_[0].split(', ')[0]}</li>
                            <li class="list-group-item py-1">{items_[0].split(', ')[1]}</li>
                            <li class="list-group-item py-1 list-group-item-warning">{items_[1]}</li>
                        </ul>
                    )
                }
            }})}
        </>
    )
};

export default ChatLoader;