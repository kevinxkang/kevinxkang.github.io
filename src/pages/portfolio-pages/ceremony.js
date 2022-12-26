import {Fade} from "react-awesome-reveal";

export default function Personas() {
    return (
        <Fade>
            <div className="portfolio-page">
                <img className="header-img" src={process.env.PUBLIC_URL + "/persona-header.png"} alt="persona-header-img" />
                {/*hook section*/}
                <section className="info-wrapper">
                    <h2 className="section-header">hook</h2>

                    <p id="attention-hook"> The cashier swivels around the touchpad, what do you do? </p>

                    <p id="chengdu-hook-p">
                        Quickly within the last three to four years, touchpad payment devices have become ubiquitous. And if you're not clear about what I'm talking about? It's those new devices at cafes and restaurants that have been charging 15% tip as a default.
                        <br/><br/>
                        With any new technology, its adoption is inevitably saturated with confusion, and as a result the user experience is often subpar.

                        I've been personally fascinated by the rapid integration of these interfaces and decided to conduct a user study to understand the user experience of these devices.
                    </p>
                </section>

                {/*challenge section*/}
                <section className="info-wrapper">
                    <h2 className="section-header">Challenge</h2>
                    <p id="challenge-p">
                        Investigate how users interact with the increasingly integrated touchpad payment devices, probing how users feel about the device and how they interact with it.
                    </p>
                </section>


                {/*process section*/}
                <section className="info-wrapper">
                    <h2 className="section-header">process</h2>

                    <h3>
                        Preparation
                    </h3>

                    <p id="preparation-p">
                        Situated at the heart of Thayer, Ceremony is an institution for Brown University students. Over the course of several hours, I observed and took note of how customers at Ceremony interacted with the touchpad POS system.
                    </p>
                    <br/>
                    <p>Here were the questions I asked:</p>
                    <ul>
                        <li>
                            How intuitive did you feel the touchless payment was? Why did you either opt to use a card, cash, or cashless payment (Apple Pay, Google Pay, Android pay, etc.)?
                        </li>
                        <li>
                            Did you find the tally of product purchases rather intuitive? Was it apparent how much the final total would be?
                        </li>
                        <li>
                            What are your thoughts on the touchpad payment device defaulting the tip percentage to 22%? Do you typically give tip at Ceremony?
                        </li>
                        <li>
                            If you were not entirely familiar with the detached card reader, would you have known that this was the primary payment method? Are the graphics included on the device itself informative?
                        </li>
                        <li>
                            Did the interface properly indicate when it was appropriate to accept payment? Did the employee have to direct you to when it was okay to pay?
                        </li>
                    </ul>


                    <h3>
                        Sketch
                    </h3>

                    <p id="sketch-p">
                        To fully conceptualize the user experience, I sketched out the POS system at Ceremony.
                    </p>

                    <img className={"sketch-img"} src={process.env.PUBLIC_URL + "/sk.webp"} alt="ceremony-sketch-img" />


                    <h3>
                        Observations
                    </h3>

                    <p>Here's what I observed:</p>
                    <ul>
                        <li>
                            Majority of users were familiar with the touchpad payment system
                        </li>
                        <li>
                            Some users selected no tip intentionally despite tip being set to 22%
                        </li>
                        <li>
                            Anecdotal evidence of older age being a confounding factor in opting to not use touchless payment
                        </li>
                        <li>
                            Younger individuals, presumably students, tended to prefer mobile device payment over contactless card tapping
                        </li>
                        <li>
                            Majority of users waited for employee guidance before paying, regardless of payment method
                        </li>
                    </ul>

                    <p>I also conducted random interviews with 3 users. Here's the summary of that:</p>
                    <ul>
                        <li>
                            Previous experience with mobile contactless payment made it significantly made individuals more familiar with where to tap
                        </li>
                        <li>
                            Since the rise of the touchpad payment system, many have felt more obligated to give tips than they otherwise would have been before
                        </li>
                        <li>
                            Many felt that the touchpad could be improved by notifying customers when it was appropriate to pay
                        </li>
                        <li>
                            Customers who opted not to pay with any touchless payment method cited unfamiliarity with new technologies as their reason
                        </li>
                        <li>
                            A lack of certainty of where the digital tip payment would go was a concern for some, as they were unsure if it would go to the cashier or the restaurant
                        </li>
                    </ul>

                    <h3>
                        Personas
                    </h3>

                    <div id="p-grid" className={"grid"}>
                        <img className="persona1-img" src={process.env.PUBLIC_URL + "/persona-1.png"} alt="persona-1-img" />
                        <p>Tiffany faces the issue of feeling pressure and obligation to tip through the interface. She, and this persona, represents the bulk of Ceremony customers I observed: Brown University students.</p>
                        <img className="persona2-img" src={process.env.PUBLIC_URL + "/persona-2.png"} alt="persona-2-img" />
                        <p>Prinav interacts with the interface through a non-mobile wallet payment method and opts to actively not tip. He, and this persona, represents the subset of non-Brown University students that also enjoy Ceremony </p>
                    </div>

                    <h3>
                        Storyboard
                    </h3>
                    <p>Using Tiffany's persona, I storyboarded what an interaction with the POS system at Ceremony might look like.</p>
                    <img className="persona3-img" src={process.env.PUBLIC_URL + "/persona-3.png"} alt="persona-3-img" />
                </section>

                <section className={"info-wrapper"}>
                    <h2 className="section-header">Takeaways</h2>
                    <p>
                        The most interesting part of this project was observing how personal levels of comfort with technology affected how users interacted with the touchpad payment system. I found that the majority of users were familiar with the touchpad payment system, but that older individuals were less likely to use it. This was likely due to a lack of familiarity with the technology, and I think that the touchpad payment system could be improved by including more graphics and instructions on the device itself.

                        Moreover, the dynamic between tipping and the touchpad payment system was interesting. I found that many users felt obligated to tip more than they otherwise would have been before the touchpad payment system was introduced. This was likely due to the default tip percentage being set to 22%, and I think that the touchpad payment system could be improved by allowing users to set their own tip percentage.

                    </p>

                </section>

            </div>
        </Fade>
    );
}
