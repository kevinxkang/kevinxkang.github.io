import {Fade} from "react-awesome-reveal";

export default function ChengduTaste() {
    return (
        <Fade>
        <div className="portfolio-page">
            <img className="header-img" src={process.env.PUBLIC_URL + "/chengdu-header.png"} alt="chengdu-taste-header-img" />

                {/*hook section*/}
                <section className="info-wrapper">
                    <h2 className="section-header">hook</h2>

                    <p id="attention-hook"> Hey you! Yeah you, read this! </p>

                    <p id="chengdu-hook-p">
                        Gotcha! Within the first couple of seconds of landing on a website, users make a decision about whether
                        or not they like the site.
                        <br/><br/>
                        <strong>The first impression is and always will be the most important impression. </strong>
                        <br/><br/>
                        As consumer experience shifts digital, from shopping malls to online stores, websites have become the new symbolic storefronts.
                        If this analogy is true, then the first click is the new window display. As a case study for this topic, I will be analyzing the
                        pre-existing pitfalls of the website for a local Providence restaurant, <a href="https://chengdutasteonline.com"  target="_blank">Chengdu Taste</a>,
                        and redesigning it to be more user friendly. The redesign process will be entirely holistic, identifiying usability issues, adapting both lo
                        and hifi wireframes, and finally implementing a responsive design.
                    </p>
                </section>


                {/*challenge section*/}
                <section className="info-wrapper">
                    <h2 className="section-header">Challenge</h2>
                    <p id="challenge-p">
                        How might we redesign the website for Chengdu Taste to be more user friendly, more visually appealing, and more responsive to differing screen sizes?
                    </p>
                </section>


                {/*process section*/}
                <section className="info-wrapper">
                    <h2 className="section-header">process</h2>

                    <h3>
                        Identifying Usability Problems
                    </h3>
                    <p id="part-1-p">
                        For context, Chengdu Taste is a Chinese restaurant located in Providence,
                        Rhode Island that specializes in Sichuan cuisine.
                        Think red hot, chilli laced, numbing spice. As a student who attends Brown
                        University nearby, Chengdu Taste certainly has been
                        a valuable institution that has gotten me through some tough times!

                        <br/><br/>
                        Here's a screenshot of the current website along with a link to it: <a
                        href="https://chengdutasteonline.com"
                        target="_blank">chengdutasteonline.com</a>
                        <br/><br/>
                        <img src={process.env.PUBLIC_URL + "/chengduwebsite.png"} id="chengdu-website"/>
                    </p>

                    <h3> Accessibility </h3>

                    <p id="chengdu-access">
                        On the accessibility end, utilizing  WebAIM WAVE, the Chengdu Taste website does not have any alternative text for its photos. Additionally, there are issues with certain text headers having low contrast with the chosen background color. While it may seem rather pedantic, the issues analyzed by WebAIM Wave demonstrate that Chengdu Taste’s website is not necessarily accessible to all potential users (i.e color-blind, hard of hearing), which is pre-emptively minimizing the market for Chengdu Taste.
                    </p>

                    <h3> Existing Issues </h3>

                    <div className="multidiv-container">
                        <div className="col">
                            <h4>Usability</h4>
                            <ul>
                                <li>
                                    Non-existent link or direction to menu of resturant, which certainly defeats the purpose of a resturant website
                                </li>
                                <li>
                                    Two galleries exist on the bottom of the page versus a dedicated page for the gallery
                                </li>
                                <li>
                                    “Enjoy our food” section has overlapping UI for photos, the slider is not contained in the photos
                                </li>
                                <li>
                                    Photos on the gallery, when hovered over, are set to a default null photo description
                                </li>
                                <li>
                                    Inconsistent font family and colors for visual cleanliness
                                </li>
                                <li>
                                    Upper nav-bar is not fixed in position, leading to inability for users to access different sections while on the lower-half of the page
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Learnability</h4>
                            <ul>
                                <li>
                                    Inconsistency in format for new section headers (Directions v.s Enjoy our food) leading to unclear visual hierarchy                            </li>
                                <li>
                                    Phone numbers are hyperlinked twice, leading to potential confusion over which is accurate
                                </li>
                                <li>
                                    Redundancy of multiple galleries, in differing formats on the same page, may cause users to be unsure of which is accurate                            </li>
                            </ul>
                        </div>
                    </div>

                    <div className={"multidiv-container"}>
                        <div className="col">
                            <h4>Memorability</h4>
                            <ul>
                                <li>
                                    Confusion regarding redundant "Gallery" and "Direction" pages when information is present on home page
                                </li>
                                <li>
                                    The Direction/Gallery tab do not scroll down to the section header but instead opens a new page
                                </li>
                                <li>
                                    Despite the navbar not being fixed, the interactive “back-to-top” arrow is small, unimposing, and is not intuitive with its intended usage                            </li>
                                <li>
                                    Lack of a menu on website will lead potential customers to have to either recall desired items or search else-where (i.e Yelp, Google) for menu photos
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Conceptual Model</h4>
                            <ul>
                                <li>
                                    Lack of menu runs contradictory to conceptual model of online ordering
                                </li>
                                <li>
                                    Lack of description of restaurant's type of cuisine, potentially driving off new customers
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/*solution*/}
                <section className="info-wrapper">
                    <h2 className="section-header">solution</h2>
                    <p id="solution-p">
                        In order to address the aforementioned issues, I've created low-fidelity wireframes, a visual design style guide, and high-fidelity prototypes to iteratively improve on the website's design.
                    </p>
                    <h3> Low-fidelity wireframes </h3>

                    <div className="lofi-grid">
                        <img id ="lofi-1" src ={process.env.PUBLIC_URL +"/lofi-1.png"} alt={"lofi picture"}/>
                        <img id ="lofi-2" src ={process.env.PUBLIC_URL +"/lofi-2.png"} alt={"lofi picture"}/>
                        <img id ="lofi-3" src ={process.env.PUBLIC_URL +"/lofi-3.png"} alt={"lofi picture"}/>
                    </div>

                    <h3> Visual Design Style Guide  </h3>
                    <img id ="visual-guide" src ={process.env.PUBLIC_URL +"/chengdu-vdg.png"} alt={"lofi picture"}/>

                    <h3> High-Fidelity Prototyping   </h3>
                    <div className="hifi-grid">
                        <img id ="lofi-1" src ={process.env.PUBLIC_URL +"/hifi-1.png"} alt={"lofi picture"}/>
                        <img id ="lofi-2" src ={process.env.PUBLIC_URL +"/hifi-2.png"} alt={"lofi picture"}/>
                        <img id ="lofi-3" src ={process.env.PUBLIC_URL +"/hifi-3.png"} alt={"lofi picture"}/>
                    </div>
                </section>

                <section className="info-wrapper">
                    <h2 className="section-header"> Responsive Redesign</h2>
                    <p id="visual-p">And...here's the final result! Below is a screenshot of both a
                        desktop and mobile version of the redesign along with a <a
                            href="https://astonishedorca14.github.io/chengdu-taste-redesign/chengdu_taste.html" target="_blank">link</a>. </p>

                    <div className={"grid"}>
                        <img id="redesign" src={process.env.PUBLIC_URL + "/redesign.png"}/>
                        <img id="redesign-mobile" src={process.env.PUBLIC_URL +"/redesign-mobile.png"}/>
                    </div>
                </section>

                <section className={"info-wrapper"}>
                    <h2 className="section-header">Takeaways</h2>
                    <p>
                        One of the key takeaways from my responsive redesign project was the importance of following best practices in CSS. I learned a lot about techniques like using a mobile-first approach, using responsive units, and organizing my styles for better maintainability.
                        Overall, the project was a great learning experience that allowed me to improve my skills and knowledge in UI/UX design.
                        <br/> <br/>

                        I also found it funny that even got to show the owner of Chengdu Taste the new website I built! He was very happy with the new design and lamented that he had already paid someone to code and design the previous website.

                    </p>

                </section>





                {/*<h1>Hook</h1>*/}
                {/*<h1>Challenge</h1>*/}
                {/*<h1>Process</h1>*/}
                {/*<h1>Take Aways & Next Steps</h1>*/}
                {/*<h1>Project Details</h1>*/}



        </div>
        </Fade>
    );
}