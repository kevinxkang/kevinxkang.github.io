import PortfolioItem from "../components/porfolio-item";
import { Fade } from "react-awesome-reveal";


export default function Portfolio() {
    return (
        <Fade>
        <div className="portfolio-container">
            <div className="portfolio-grid-container">
                <PortfolioItem
                    img={process.env.PUBLIC_URL + "/chengdu-taste-hover-img.png"}
                    page="/work/chengdu-taste"
                    project={"Responsive Redesign: Chengdu Taste"}
                    description={"Modern and responsive redesign for a Providence institution"}
                />
                <PortfolioItem
                    img= {process.env.PUBLIC_URL + "/crossword-hover-img.png"}
                    page="/work/crossword"
                    project={"Crossword Puzzle Editor"}
                    description={"Crossword puzzle editor with ultimate customization"}
                />
                <PortfolioItem
                    img={process.env.PUBLIC_URL + "/interface-hover-img.png"}
                    page="/work/personas"
                    project={"Personas & Storyboarding: Ceremony"}
                    description={"Personas and storyboarding for a touchless payment"}
                />
                <PortfolioItem
                    img={process.env.PUBLIC_URL + "/iterative-design-hover-img.png"}
                    page="/work/iterative-design"
                    project={"Iterative Design: Intuned"}
                    description={"Reimagining and redesigning the user experience for Intuned"}
                />
            </div>
        </div>
        </Fade>
    );
}

