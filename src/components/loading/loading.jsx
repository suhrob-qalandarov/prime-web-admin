import "./loading.css";

const Loading = ({ message = "Loading..." }) => (
    <div className="loading-overlay">
        <div className="loader-wrap">
            <div className="logo-anim">🛒</div>
            <div className="bars">
                <div></div><div></div><div></div><div></div>
            </div>
            <div className="loading-text">{message}</div>
        </div>
    </div>
);

export default Loading;
