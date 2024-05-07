import ReactLoading from "react-loading"
    

export default function Loading() {
    return (
        <div className="loading">
            <ReactLoading type="spin" color="#fff"
                height={100} width={50} />
        </div>
    )
}