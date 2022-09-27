import { useAppSelector } from "../../redux/hooks/useAppSelector";

import Cards from "../../components/Cards";

import "./style.css";
import BackgroundImage from "../../assets/background-image.png"

export default function Home() {
    
    const cards = useAppSelector(state => state.cards.cards);

    return (
        <section className="home-wrapper">
            <img className="home-bg" src={BackgroundImage} />
            <div className="project container">
                <h1 className="project-title">Organize your project</h1>
                <div className="card-list">
                    {cards.map((card, index) => <Cards key={index} title={card.title} dataKey={index} />)}
                </div>
            </div>
        </section>
    );
}