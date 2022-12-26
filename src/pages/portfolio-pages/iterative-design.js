import {Fade} from "react-awesome-reveal";


export default function IterativeDesign() {
    return (
        <Fade>
        <div className="portfolio-page">
            <img className="header-img" src={process.env.PUBLIC_URL + "/iterative-header.png"} alt="iterative-design" />

            {/*hook section*/}
            <section className="info-wrapper">
                <h2 className="section-header">hook</h2>
                <p id="attention-hook"> Does functionality outweigh aesthetic perfection? </p>

                <p id="chengdu-hook-p">
                    Iterative design is an industry standard for designing products, yet early stage tech startups are often marred incomplete front-facing websites in comparison to their products.
                    <br/>
                    <br/>
                    As a case study, I along with other Brown University students took on a comprehensive iterative design process for the startup Intuned, developing a hifi-mockup of Intuned's interface.

                    {/*Intuned is a startup funded by YCombinator that provides data analytics for engineering managers; their software allows teams to connect data from various sources, such as GitHub, Jira, and Notion, and run custom queries to analyze and explore the data.*/}
                </p>
            </section>

            {/*challenge section*/}
            <section className="info-wrapper">
                <h2 className="section-header">challenge</h2>
                <p id={"challenge-p"}>
                    Develop increased familiarity with the design process by creating a prototype which allows users to view and manage team members, build dashboards for data analytics, and create custom data queries.
                </p>

            </section>
            {/*process section*/}
            <section className="info-wrapper">
                <h2 className="section-header">process</h2>


                <h3> Intuned </h3>
                <p>
                    For context, Intuned provides data analytics for engineering managers.
                    Their software allows teams to connect data from various sources, such as GitHub, Jira, and Notion, and run custom queries to analyze and explore the data.
                </p>

                <h3>Sketching & Wireframing</h3>
                <p>
                    Here are the initial sketches we created while brainstorming ideas for our prototype.
                    We explored a wide variety of designs, such as where the navigation bar should be placed, how we should display team members, and how dashboards and metric creation should look like.
                </p>
                <img className={"sketch-img"} src={process.env.PUBLIC_URL + "/design-iterative-1.png"} alt="iterative-sketches" />
                <img className={"sketch-img"} src={process.env.PUBLIC_URL + "/design-iterative-2.png"} alt="iterative-sketches" />

                <p>
                    After discussing the different sketches, we decided to implement design number 1. We wanted to include notifications on the dashboard page, and we also liked the navigation bar display at the top with a search bar. We also thought that the metrics page was less cluttered and more intuitive in this sketch, as it included a progress bar to tell users how far they were in the process.
                    <br/>
                    <br/>
                    Here's a low fidelity wireframe of the final design:
                </p>

                <img className={"sketch-img"} src={process.env.PUBLIC_URL + "/design-iterative-3.png"} alt="iterative-sketches" />


                <h3>High Fidelity Mockup</h3>
                <p>
                    Next, our group created an interactive high-fidelity prototype based on the wireframe we created. While full functionality wasn't a priority, we ensured key interactions were implemented.
                    This mockup was presented to a panel of students and industry professionals, who provided feedback on the design.
                    <br/>
                    <br/>
                    Here's our interactive high-fidelity mockup of our interface before we received feedback:
                </p>

                <iframe
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fo9FpXODdTeUAu36U84OEjR%2Fcs1300-iterative-design-before-feedback%3Fnode-id%3D14%253A2100%26scaling%3Dscale-down%26page-id%3D0%253A1%26starting-point-node-id%3D14%253A2100"
                allowFullScreen
                />

                <p>
                   From the panel, we received the following feedback on our mockup:
                </p>

                {/*make a bullet pointed list*/}
                <h4>Feedback</h4>
                <ul>
                    <li>
                        Notification icons should have same color — different colors are a bit distracting
                    </li>
                    <li>
                        Users should be able to see other notifications when selecting a single notification — try removing the blur from the notifications for the “Notification Click” page
                    </li>
                    <li>
                        Search bar gets cut off by the MacBook notch when interacting with the prototype. Making it smaller could fix this problem
                    </li>
                    <li>
                        The profile icon and profile picture have the same functionality — remove one since having both is redundant
                    </li>
                    <li>
                        On the “My Team” page, there is no need for the team members to be in a carousel view, as this requires more effort than scrolling
                    </li>
                    <li>
                        Try leveraging an exit modal to provide a cleaner exit to the “Create metric” flow
                    </li>
                    <li>
                        Consider moving the notification panel to the right side of the “My Dashboard” page to establish better hierarchy; the notifications are subordinate to the dashboard panel
                    </li>
                </ul>

                <p>
                    Here's our interactive high-fidelity mockup of our interface with updates from the we received feedback:
                </p>

                <iframe
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FaqBnvhI1q1a3EDv55sor1d%2Fcs1300-iterative-design-Final%3Fnode-id%3D14%253A2100%26scaling%3Dscale-down%26page-id%3D0%253A1%26starting-point-node-id%3D14%253A2100"
                allowFullScreen
                />

            </section>

            {/*user testing section*/}
            <section className="info-wrapper">
                <h2 className="section-header">user testing</h2>

                <p>
                    Lastly, to test the usability of our hifi prototype we used UserTesting.com to see how three users interacted with our interface.
                </p>

                <h3>
                    Testing Instructions
                </h3>

                <p>
                    Our primary task was to navigate into the metrics page and create a github metric.
                    The overarching task was also divided into two subtasks which was first navigating into the metric page and second successfully creating a github metric.

                    <br/>
                    <br/>
                    Here are the instructions we provided to the users:
                </p>
                <h4>Instructions</h4>
                <ol type={1}>
                    <li>
                        “Without leaving the homepage, what are your initial impressions of the website? Please be specific in your explanation.”
                    </li>
                    <li>
                        “Now, from the homepage, please locate and navigate to the metrics page.”
                    </li>
                    <li>
                        “Once in the metrics tab, create a new Github metric. Please continue until you receive confirmation that a new metric is added.”
                    </li>
                </ol>
                <h3>
                    User Responses
                </h3>

                <p>
                    For each question I’ll briefly discuss general feedback, common errors, and overall performance.
                </p>

                <h4>Feedback</h4>
                <ul>
                    <li>
                        Thought the color palette intuitive, noting that the vibrancy of the colors made it easy to determine the hierarchy of the colors.
                    </li>
                    <li>
                        Found that the usage of modular dashboards aligned with their expectation for Intuned’s intended purpose.
                    </li>
                    <li>
                        It was easy to both locate, navigate, and click into the metrics’ tab.
                    </li>
                    <li>
                        Users expressed more confusion and difficulty creating a new Github metric. Specifically, users mentioned that the labels and buttons were not necessarily clear for creating a new metric.                    </li>
                </ul>

                <h3>
                    Observations and Future Work
                </h3>

                <p>
                    Overall, our UserTesting results were in line with our expectations. The users didn't have difficulty in completing the tasks and found our design intuitive.
                    If anything, the users had more difficulty grasping that our website was a mockup and not a real product.
                    <br/>
                    <br/>
                    Future iterations of our design, if we were to continue working on this project, would include:  (1) enlarge the size of the button to “Create Your Own” and (2) update the text of the button to be “Create Your Own Metric”. This would directly address the visibility issue and confusion of functionality expressed by the users.
                </p>

            </section>


            {/*takeaways section*/}
            <section className="info-wrapper">
                <h2 className="section-header">takeaways</h2>

                <p>
                    We actually ended up reaching out to the founders of Intuned and got a response! They were very happy with our design and said they would be interested in hearing more behind our motivation to conduct a iterative design process for Intuned.
                    Our group thought it was pretty neat they took the time to reach out to us, so we wanted to share our response with you all.


                </p>


                <img id={"email-img"} src={process.env.PUBLIC_URL + "/intuned-email.png"} alt="email" />


            </section>



        </div>
        </Fade>




    );
}