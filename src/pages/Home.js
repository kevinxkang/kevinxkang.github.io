import { TypeAnimation } from 'react-type-animation';
import { Fade } from "react-awesome-reveal";


export default function Home() {
    return (
        <div className="home-wrap">
            <div className="home-print-container">
                <TypeAnimation
                    sequence={
                    [   2500,
                        "print('Hello World!')",
                        3500,
                        "print('",
                        400,
                        "print('Welcpme to m",
                        200,
                        "print('Welc",
                        300,
                        "print('Welcome to my website!')",
                    ]}
                     cursor={true}
                     className="print-animation"
                    // cursor={true}
                    // speed={30}
                />
            </div>
            <div className="home-text-container">
                <Fade bottom>
                    <h2 className="home-h2-text"> Hey! I'm Astonished Orca 👋</h2>
                    <p className="home-short-para"> I'm currently a Senior at Brown University studying Computer Science.
                        I enjoy living on the edge, designing and building software that
                        makes a positive impact on the world.
                    </p>
                    <p className="home-short-para">
                        I love to learn, love to think, and love to teach. Here you'll find
                        a collection of my projects, experiments, and ramblings.
                    </p>
                    <p className="home-short-para">
                        Enjoy your stay, but don't stay too long — I happen to be a busy Orca 🐳
                    </p>
                </Fade>
            </div>
        </div>
    );
}

