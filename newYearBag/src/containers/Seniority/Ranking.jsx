import React from 'react';
import './styles';

/**
 * 我的福袋和排行榜
 */

const Ranking = props => {
    let { listData, userData, handlerStartGame, handlerShare } = props;

    const List = () => {
        if (listData.activityList) {
            return (
                listData.activityList.map((item, index) => {
                    return (
                        <li className="list" key={index}>
                            <span className="no text-red">No.{item.rank}</span>
                            <span className="name">{item.name}</span>
                            <span className="text-red">{item.qty}福袋</span>
                        </li>
                    )
                })
            )
        } else {
            return null
        }
    }

    // 如果排名是 0 ，那就显示 `---`
    let currentRank = userData.rank || 0;
    let currentQty = userData.ttl_qty || 0;

    if (currentRank <= 0) {
        currentRank = '---';
        currentQty = '---'
    }

    return (
        <div className="ranking">
            <div className="logo"></div>
            <h3 className="title">您当前排行</h3>
            <div className="grade">
                <div className="grade__list">
                    <p className="text">{currentRank}</p>
                    <p className="desc">当前排名</p>
                </div>
                <div className="grade__list">
                    <p className="text">{currentQty}</p>
                    <p className="desc">累积福袋</p>
                </div>
            </div>
            <h3 className="title">游戏排行榜</h3>
            <p className="sub-title">展示前50名</p>
            <ul className="seniority">
                {List()}
            </ul>
            <div className={`btn-wrap ${props.isActivityEnd ? 'over' : ''}`}>
                <button className="btn-share" onClick={handlerShare}></button>
                <button className="btn-again" onClick={handlerStartGame}></button>
            </div>
        </div>
    )
};

export default Ranking;
