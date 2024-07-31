

const Subjective = (props) => {
    const { question, _id, correctAns, createdAt} = props.question;

    return (
        <div className="mb-4 p-1 bg-slate-300 rounded ">
            <div>
                <div className="flex justify-between gap-2">
                    <div className="text-red-400"> {question}</div>
                    <p>{createdAt}</p>
                </div>
                <div className="">
                    <p>Answer:- {correctAns}</p>
                </div>
            </div>
        </div>
    )
}

export default Subjective;