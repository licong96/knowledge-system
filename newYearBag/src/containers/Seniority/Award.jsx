import React from 'react';
import './styles';

let imgAward = 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/newYearBag/seniority/award.png?v=1';

/**
 * 排名奖励
 */

const Award = props => {
    return (
        <div className="award"> 
            <h3 className="title">排名奖励</h3>
            <img className="img" src={imgAward} alt=""/>
            <div className="explain">
                <h3 className="title">奖品寄送</h3>
                <div className="explain__wrap">
                    <p className="explain__text">1.  游戏排名以活动结束后排名为准，如您排名在50名以内，系统将通过vipJr 微信服务号发送获奖地址填写入口，千万别错过哦~</p>
                    <p className="explain__text">2.  实物奖品将在您填写收货信息后的10个工作日内寄出。</p>
                </div>
            </div>
            <button className="btn-home" onClick={props.handlerReturnHome}></button>
        </div>
    )
};

export default Award;
