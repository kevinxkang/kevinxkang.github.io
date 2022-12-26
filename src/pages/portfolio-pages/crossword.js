import {Fade} from "react-awesome-reveal";

export default function Crossword() {
    return (
        <Fade>
        <div className="portfolio-page">
            <img className="header-img" src={process.env.PUBLIC_URL + "/crossword-header.png"} alt="iterative-design" />

            {/*hook section*/}
            <section className="info-wrapper">
                <h2 className="section-header">hook</h2>
                <p id="attention-hook"> "One across is Magnanimous idiot!" </p>

                <p id="chengdu-hook-p">
                    Crossword puzzles are a classic pastime;
                    however, the options for them are limited, and the ones that do exist are often not very good ( no disrespect to the NYT, of course ❤️ )

                    <br/><br/>

                    Hence, for my final project in CS32, I along with other members of my team, decided to create a crossword puzzle generator that would be able to generate, edit, and store puzzles of varying difficulty levels and sizes.

                </p>
            </section>
            {/*challenge section*/}
            <section className="info-wrapper">
                <h2 className="section-header">challenge</h2>
                <p id="challenge-p">
                    Create a crossword puzzle editor that empowers users to create their own crossword puzzles, filling a gap in the existing market.
                </p>

            </section>
            {/*process section*/}
            <section className="info-wrapper">
                <h2 className="section-header">process</h2>
                <h3>market investigation</h3>
                <p id="market-investigation-p">
                    We looked at the existing crossword puzzle generators and editors, and found that they were either too simple or too complex for our needs.
                    <br/><br/>
                    Existing editors and playing sites, such as the NYT's, were either hidden behind paywalls or were too limited in their customization options, making it difficult for
                    users to personalized their puzzles.
                </p>

                <div id={"cw-wrap"}>
                    <img className="cw-img" src={process.env.PUBLIC_URL + "/nyt-cw.png"} alt="cw1" />
                    <p>
                        I mean, just look at this! Even as a NYT subscriber, I only have access to the "Mini Crossword".
                        <br/><br/>
                        I can't even create my own puzzles! bffr, NYT.
                    </p>
                    <img className="cw-img" src={process.env.PUBLIC_URL + "/clw-cw.png"} alt="cw2" />
                    <p>
                        And if I want to find some way to create my own puzzles, I have to go to a site that looks like it was made in 1995.
                        <br/><br/>
                        I don't have any option to customize the size or shape of the puzzle, only the words that go in it - seems rather limited.
                    </p>

                </div>

                <h3>so . . . what's missing?</h3>
                <p>
                    The gap in the market is that is currently no easy way to create, edit, save, and solve puzzles all in one place. Our new app aims to change that.
                </p>


            </section>

            {/*solution section*/}
            <section className="info-wrapper">
                <h2 className="section-header">solution</h2>

                <p>
                    In the end, we were able to successfully develop our app. In addressing the fundamental
                    gaps in the crossword making and solving market, I want to highly key features in our app below.
                </p>
                <h3>board creation</h3>
                <div id={"cw-item"}>
                    <p>Users can create a board of any "x" by "y" size, so long as both values are between 2 and 20</p>

                    <img className="cw-img" src={process.env.PUBLIC_URL + "/create.gif"} alt="cw-create" />
                </div>
                <h3>navigation</h3>
                <div id={"cw-item"}>
                    <img className="cw-img" src={process.env.PUBLIC_URL + "/nav.gif"} alt="cw-nav" />
                    <p>
                        Users can use the W, A, S, and D keys to move in the cardinal directions. The orange highlight
                        indicates the current direction of movement.
                    </p>
                </div>
                <h3>board editing</h3>
                <div id={"cw-item"}>
                    <p>
                        Users can edit the board by clicking on a square and typing in a letter. The board will automatically move. Additionally, Users can delete previous letters by pressing the backspace key.
                    </p>
                    <img className="cw-img" src={process.env.PUBLIC_URL + "/edit.gif"} alt="cw-edit" />
                </div>

                <h3>recommendations and hints</h3>
                <div id={"cw-item"}>
                    <img className="cw-img" src={process.env.PUBLIC_URL + "/rec_hints.gif"} alt="cw-hint" />
                    <p> Importantly, our app has an auto-complete recommendation feature that enables users to fill in gaps with words presents.
                        For each word, the app will allow users to customize the hint, so that they can make the puzzle more personalized.
                    </p>
                </div>

                <h3>save and load</h3>
                <div id={"cw-item"}>
                    <p>Using Google Cloud Base, we allow users to either save privately or publicly to their own Google account so that they can share their work. Once shared, the crossword is in edit mode, allowing friends of users to begin solving.</p>
                    <img className="cw-img" src={process.env.PUBLIC_URL + "/save.gif"} alt="cw-save" />
                </div>





            </section>
            {/*takeaways section*/}
            <section className="info-wrapper">
                <h2 className="section-header">takeaways</h2>
                <p> And here was the <a id="x" href={"https://crossword-editor-demo.web.app/"}>link</a> if you were interesting in exploring it yourself! </p>
                <br/><br/>

                <p>
                    This project was a great learning experience for me, as it was my first large scale/multi-sprint project. I learned a lot about the importance of communication and planning, and how to work with a team to create a product that is both functional and aesthetically pleasing.

                    <br/><br/>

                    Future work for this project would potentially include an algorithim auto complete function that works for the all of the board and not use the current user row/col.
                </p>

            </section>



        </div>
        </Fade>



    );
}