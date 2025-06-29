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
                <div className="home-text-wrap">
                    <Fade bottom>
                        <h2 className="home-h2-text"> Hey! I'm Kevin 👋 </h2>
                        <p className="home-short-para"> I'm currently a Software Engineer at Amazon AGI building Nova and shaping the future of human-computer interaction
                            {/*I enjoy living on the edge, designing and building software that*/}
                            {/*makes a positive impact on the world.*/}
                        </p>
                        <p className="home-short-para">
                            I love to learn, think, and teach. Here you'll find
                            a collection of my projects, experiments, and ramblings.
                        </p>
                        <p className="home-short-para">
                            Enjoy your stay!
                        </p>
                    </Fade>
                </div>
                {/*<div className="home-text-pfp-wrap">*/}
                {/*    <Fade>*/}
                {/*        <img className ="home-text-pfp" src={process.env.PUBLIC_URL + "/home/profile-picture.jpg"} alt="Profile"/>*/}
                {/*    </Fade>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

