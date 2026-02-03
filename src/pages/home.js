import { TypeAnimation } from 'react-type-animation';
import { Fade } from "react-awesome-reveal";


export default function Home() {
    return (
        <div className="home-wrap">
            <div className="home-print-container">
                <TypeAnimation
                    sequence={
                    [   2500,
                        "print('hello world!')",
                        3500,
                        "print('",

                    400,
                        "print('welcpme to m",
                        200,
                        "print('welc",
                        300,
                        "print('welcome to my website!')",
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
                        <h2 className="home-h2-text"> hey! i'm kevin 👋 </h2>
                        <p className="home-short-para"> currently a swe at amazon agi building ml infra for nova models
                            {/*I enjoy living on the edge, designing and building software that*/}
                            {/*makes a positive impact on the world.*/}
                        </p>
                        <p className="home-short-para">
                           here you'll find a collection of my projects, experiments, and ramblings.
                        </p>
                        <p className="home-short-para">
                            enjoy!
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

