import React, { useState } from 'react';

const Mcq = (props) => {
    const { question, type, _id, correctAns, options, createdAt} = props.question;
   
    const [ans, setAns] = useState(null);

    const getOptionStyle = (optionKey) => {
        return optionKey === ans ? { color: 'red' } : {};
    }

    return (
        <div className="border m-2 p-1 bg-slate-200 ">
            <div>
                <div className="flex justify-between gap-2">
                    <div>{question}</div>
                    <p>{createdAt}</p>
                </div>
                <ul className="ml-5">
                    <li style={getOptionStyle('a')}>{`A. ${options.a}`}</li>
                    <li style={getOptionStyle('b')}>{`B. ${options.b}`}</li>
                    <li style={getOptionStyle('c')}>{`C. ${options.c}`}</li>
                    <li style={getOptionStyle('d')}>{`D. ${options.d}`}</li>
                </ul>
                <button onClick={() => { ans == null ? setAns(correctAns) : setAns(null) }}
                    className="bg-orange-300 px-1 rounded cursor-pointer">
                    {ans == null ? "show answer" : "hide answer"}
                </button>
            </div>
        </div>
    );
}

export default Mcq;
