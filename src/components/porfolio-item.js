import {Link} from "react-router-dom";

const PortfolioItem = (props) => {
    return (
        <div className="portfolio-item">
            <Link className="portfolio-hover"  to={props.page}>
                <img className="portfolio-img" src={props.img} alt={"portfolio item"}/>
                <h2>{props.project}</h2>
                <p>{props.description}</p>
            </Link>
        </div>
    );
}

export default PortfolioItem;