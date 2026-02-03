import {Link} from "react-router-dom";

const MusingItem = (props) => {
    return (
        <div className="musing-preview-item">
            <Link className="musing-hover" to={props.page} >
                <div className="musing-word-blurb-container">
                    <h4>{props.title}</h4>
                    <p>{props.summary}</p>
                    <p>{props.date}</p>
                </div>
                <div className="musing-img-container">
                    <img className="musing-img" src={props.img}/>
                </div>
            </Link>
        </div>
    );
}

export default MusingItem;