import { useDispatch } from "react-redux";
import { setItems } from "../../redux/reducers/CardsReducer";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { useState } from "react";

import arrowRight from "../../assets/svgs/arrow-right.svg";
import arrowLeft from "../../assets/svgs/arrow-left.svg";
import More from "../../assets/svgs/more.svg";
import Trash from "../../assets/svgs/trash.svg";
import Close from "../../assets/svgs/close.svg";

import "./style.css";

type Props = {
    title: string,
    dataKey: number
}

export default function Cards(props: Props) {
    const dispatch = useDispatch();
    const [itemTitle, setTitle] = useState('');
    const [cardModal, setCardModal] = useState(false);

    //States
    const cards = useAppSelector(state => state.cards.cards);
    const items = useAppSelector(state => state.cards.items);

    /**
     * Functions
     */
    //Send item to prev card
    const itemToPrev = (index: number, target: number) => {
        if (target > 0) {
            let itemsTemp = JSON.parse(JSON.stringify(items));
            itemsTemp[index].parent = target - 1;
            dispatch(setItems(itemsTemp));
        }
    }

    //Send item to next card
    const itemToNext = (index: number, target: number) => {
        if (target >= 0 && target < (cards.length - 1)) {
            let itemsTemp = JSON.parse(JSON.stringify(items));
            itemsTemp[index].parent = target + 1;
            dispatch(setItems(itemsTemp));
        }
    }

    //Remove item
    const removeItem = (index: number) => {
        let itemsTemp = JSON.parse(JSON.stringify(items));
        itemsTemp.splice(index, 1);
        dispatch(setItems(itemsTemp));
    }

    //Add new item
    const addItem = (title: string, parent: Number) => {
        let itemsTemp = JSON.parse(JSON.stringify(items));
        itemsTemp.push({ title: title, parent: parent })
        dispatch(setItems(itemsTemp));
        openCardModal();
    }

    //Open modal to add new item
    const openCardModal = () => {
        setCardModal(!cardModal);
    }

    /**
     * Events
     */
    const titleHandlerClick = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    return (
        <div className="card-item">
            <h3>{props.title}</h3>
            {items.map((item, index) => {
                if (props.dataKey == item.parent) {
                    return (
                        <div className="item-wrapper" key={index}>
                            <div className="item-header">
                                <p>{item.title}</p>
                                <img onClick={() => removeItem(index)} className="item-trash" src={Trash} />
                            </div>
                            <div className="navigation-container">
                                <span className="tag-title">Tag {props.dataKey + 1}</span>
                                <div className="arrows">
                                    <button className="navigation-arrow" onClick={() => itemToPrev(index, item.parent)}>
                                        <img src={arrowLeft} />
                                    </button>
                                    <button className="navigation-arrow" onClick={() => itemToNext(index, item.parent)}>
                                        <img src={arrowRight} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            <button className="add-new-item" onClick={() => openCardModal()}>
                <img src={More} />
                Add new Card
            </button>

            {cardModal &&
                <div className="add-item-modal">
                    <div className="item-modal-content">
                        <img className="close-modal" src={Close} onClick={() => openCardModal()} />
                        <input className="form-control" type="text" placeholder="Card title" onChange={titleHandlerClick} />
                        <button className="btn" onClick={() => addItem(itemTitle, props.dataKey)}>Create Card</button>
                    </div>
                    <div className="close-item-modal" onClick={() => openCardModal()}></div>
                </div>
            }
        </div>
    );
}