import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";

const PRINT_SEQUENCE = [
    2000,
    "print('hello world!')",
    3500,
    "print('",
    400,
    "print('welcpme to m",
    200,
    "print('welc",
    300,
    "print('welcome to my website!')",
];

const HOME_PARAGRAPHS = [
    "currently at amazon agi building ai/ml infrastructure for nova models",
    "here you'll find a collection of my musings, experiments, and essays",
    "enjoy!",
];

export default function Home() {
    return (
        <section className="home-wrap">
            <div className="home-print-container">
                <TypeAnimation
                    sequence={PRINT_SEQUENCE}
                    cursor
                    className="print-animation"
                />
            </div>
            <div className="home-text-container">
                <div className="home-text-wrap">
                    <Fade bottom>
                        <h2 className="home-h2-text">
                            hey! i'm kevin <span className="wave-emoji" aria-hidden="true">👋</span>
                        </h2>
                        {HOME_PARAGRAPHS.map((text) => (
                            <p className="home-short-para" key={text}>
                                {text}
                            </p>
                        ))}
                    </Fade>
                </div>
            </div>
        </section>
    );
}
