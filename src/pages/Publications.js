import React from 'react';
import "../styles/Page.css";
import "../styles/Publications.css";
const Publications = () => {
    const publications_buttons = [
        "Multi-modal Learning",
        "Limited Supervision Vision",
        "Person Centric Vision",
        "Synthesis and Generation",
        "Remote Sensing and Earth Vision",
        "Medical Image Analysis",
    ];
    const publications = [
        {
            title: "Multi-modal Learning",
            papers: [
                {
                    image: "",
                    authors:
                        "Mohamed El Amine Boudjoghra, Salwa Al Khatib, Jean Lahoud, Hisham Cholakkal, Rao Anwer, Salman H Khan, Fahad Shahbaz Khan (2024).",
                    link: "#",
                    description: "3D Indoor Instance Segmentation in an Open-World.",
                    conference:
                        "Advances in Neural Information Processing Systems Vol. 36.",
                },
                {
                    image: "",
                    authors:
                        "Omkar Thawakar, Muzammal Naseer, Rao Muhammad Anwer, Salman Khan, Michael Felsberg, Mubarak Shah, Fahad Shahbaz Khan (2024).",
                    link: "#",
                    description:
                        "Composed Video Retrieval via Enriched Context and Discriminative Embeddings.",
                    conference:
                        "Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition.",
                },
                {
                    image: "",
                    authors:
                        "Syed Talal Wasim, Muzammal Naseer, Salman Khan, Ming-Hsuan Yang, Fahad Shahbaz Khan (2024).",
                    link: "#",
                    description:
                        "VideoGrounding-DINO: Towards Open-Vocabulary Spatio-Temporal Video Grounding.",
                    conference:
                        "Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition.",
                },
            ],
        },
    ];
    return (
        <div className="page">

            {/* Banner Image */}
            <div
                className="banner"
                style={{
                    backgroundImage: `url("https://www.shutterstock.com/shutterstock/photos/2152122757/display_1500/stock-photo-business-intelligence-businessman-using-laptop-computer-global-network-connection-data-exchange-2152122757.jpg")`,
                }}
            >
                <div className="banner-overlay">
                    <h2 className="banner-title">Intelligent Visual Analytics Lab</h2>
                    <p className="banner-subtitle">Computer Vision Lab @ MBZUAI</p>
                </div>
            </div>

            <div className="floating-box">
                <h2 className="floating-box-title">Publications</h2>
            </div>
            <div className="publications-container">
                <div className="publications-grid">
                    {publications_buttons.map((title, index) => (
                        <button key={index} className="publication-button">
                            {title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="section">
                <h2 className="section-title">Multi-modal Learning</h2>
                {publications[0].papers.map((paper, idx) => (
                    <div key={idx} className="paper-item">
                        <img src={paper.image} alt="Paper Illustration" />
                        <div className="paper-content">
                            <p className="authors">{paper.authors}</p>
                            <a href={paper.link} className="paper-title">
                                {paper.description}
                            </a>
                            <p className="conference">{paper.conference}</p>
                            <button className="read-paper">Read the Paper</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2 className="section-title">Visual Recognition with Limited Supervision</h2>
                {publications[0].papers.map((paper, idx) => (
                    <div key={idx} className="paper-item">
                        <img src={paper.image} alt="Paper Illustration" />
                        <div className="paper-content">
                            <p className="authors">{paper.authors}</p>
                            <a href={paper.link} className="paper-title">
                                {paper.description}
                            </a>
                            <p className="conference">{paper.conference}</p>
                            <button className="read-paper">Read the Paper</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2 className="section-title">Person Centric Vision</h2>
                {publications[0].papers.map((paper, idx) => (
                    <div key={idx} className="paper-item">
                        <img src={paper.image} alt="Paper Illustration" />
                        <div className="paper-content">
                            <p className="authors">{paper.authors}</p>
                            <a href={paper.link} className="paper-title">
                                {paper.description}
                            </a>
                            <p className="conference">{paper.conference}</p>
                            <button className="read-paper">Read the Paper</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2 className="section-title">Synthesis and Generation</h2>
                {publications[0].papers.map((paper, idx) => (
                    <div key={idx} className="paper-item">
                        <img src={paper.image} alt="Paper Illustration" />
                        <div className="paper-content">
                            <p className="authors">{paper.authors}</p>
                            <a href={paper.link} className="paper-title">
                                {paper.description}
                            </a>
                            <p className="conference">{paper.conference}</p>
                            <button className="read-paper">Read the Paper</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2 className="section-title">Remote Sensing and Earth Vision</h2>
                {publications[0].papers.map((paper, idx) => (
                    <div key={idx} className="paper-item">
                        <img src={paper.image} alt="Paper Illustration" />
                        <div className="paper-content">
                            <p className="authors">{paper.authors}</p>
                            <a href={paper.link} className="paper-title">
                                {paper.description}
                            </a>
                            <p className="conference">{paper.conference}</p>
                            <button className="read-paper">Read the Paper</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="section">
                <h2 className="section-title">others</h2>
                {publications[0].papers.map((paper, idx) => (
                    <div key={idx} className="paper-item">
                        <img src={paper.image} alt="Paper Illustration" />
                        <div className="paper-content">
                            <p className="authors">{paper.authors}</p>
                            <a href={paper.link} className="paper-title">
                                {paper.description}
                            </a>
                            <p className="conference">{paper.conference}</p>
                            <button className="read-paper">Read the Paper</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Publications; 