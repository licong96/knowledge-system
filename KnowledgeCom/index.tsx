import * as React from 'react';
import './styles';
// import itg from '@itutorgroup/itg-jsbridge';
import { useSpring, useTransition, animated, config } from '../../libs/react-spring';
import { Spring } from '../../libs/react-spring/renderprops';
import { useDrag } from 'react-use-gesture';
import { knowledgeData } from '../../constants/knowledge';
import { getItem, setItem } from '../../utils/localStorage';

const { useEffect, useState, useMemo, useRef, useContext, createContext } = React;

interface UserInfo {
	level: number;
	headIcon: string;
  isshowcertificate: boolean;
  status: number;
}

interface Props {
  userInfo: UserInfo | any;
  status?: number;
	handlerRouterPush?(pathname: string): void;
}
interface StateProps {
  isRest: boolean;
  animTime: any;
  refContent: any;
}

const Context = createContext({} as UserInfo);

/**
 * 非在期知识点
 */
function KnowledgeCom({ userInfo, status, handlerRouterPush }: Props) {
  const [data] = useState<KnowItem[]>(knowledgeData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);  // 记录上一个选中的等级
  const [lineOffsetWidth, setLineOffsetWidth] = useState(29);
  // 存储页面状态
  const [state] = useState<StateProps>({
    isRest: true,
    animTime: null,
    refContent: useRef(),
  });

  useEffect(() => {
    setTimeout(() => {
      const line: any = document.querySelectorAll('.line')[0];
      if (line && line.offsetWidth) {
        setLineOffsetWidth(line.offsetWidth);
      }
    }, 30);
  }, []);
  
  useEffect(() => {
    if (userInfo && userInfo.level) {
      // 注意，动画执行中，如果有其它状态更新，会打断动画
      setTimeout(() => {
        setActiveIndex(userInfo.level);
      }, 30);
    }
  }, [userInfo]);

  function handlerChangeIndex(index: number) {
    if (!state.isRest) {
      return;
    }
    state.isRest = true;
    setPrevActiveIndex(activeIndex);  // 记录上一个选中的等级
    setActiveIndex(index);
  }
  
  return (
    <Context.Provider value={userInfo}>
      <div className={`c-knowledge ${(userInfo && userInfo.headIcon) ? 'knowledge--home' : ''}`}>
        {
          (userInfo.headIcon && userInfo.level) && (
            <div className="user-info">
              <p className="user__level">Lv.{userInfo.level}</p>
            </div>
          )
        }
        {
          status === 5 && (
            <div className="cont__suggest" onClick={() => handlerRouterPush && handlerRouterPush('suggest')}>
              <i className="icon__suggest"></i>
              <span className="suggest__text">学习建议报告</span>
            </div>
          )
        }
        {
          activeIndex ? (
            <Line 
              data={data} 
              activeIndex={activeIndex}
              userInfo={userInfo}
              handlerChangeIndex={handlerChangeIndex}
            />
          ) : null
        }
        
        {
          activeIndex && lineOffsetWidth ? (
            <ScrollBar 
              activeIndex={activeIndex} 
              lineOffsetWidth={lineOffsetWidth} 
              handlerChangeIndex={handlerChangeIndex}
              state={state}
            />
          ) : null
        }
        {
          activeIndex ? (
            <Content 
              data={data}
              activeIndex={activeIndex}
              prevActiveIndex={prevActiveIndex}
              state={state}
              handlerRouterPush={handlerRouterPush}
            />
          ) : null
        }
      </div>
    </Context.Provider>
  )
}


type LineProps = {
  data: KnowItem[];
  activeIndex: number;
  userInfo: UserInfo;
  handlerChangeIndex(i: number): void;
}

// 12等级
function Line({ data, activeIndex, userInfo, handlerChangeIndex }: LineProps) {
  return (
    <section className="top-section">
      <ul className="line-wrap">
        {
          data.map((item: KnowItem, index: number) => {
            const height = (index * 12) + 26;
            return (
              <li className={`line ${activeIndex === (index + 1) ? 'active' : ''}`} key={index}>
                <div className="line__main" onClick={() => handlerChangeIndex(item.level)}>
                  <div className="line__text" style={{ bottom: `${(height + 20) / 37.5}rem` }}>{item.powerTitle}</div>
                  <div className="line__black" style={{ height: `${height / 37.5}rem` }}></div>
                  <span className="line__num">{item.level}</span>
                  {
                    (userInfo.level === item.level && userInfo.headIcon) && (
                      <div className="user__head" style={{ bottom: `${(height + 60) / 37.5}rem` }}>
                        <img className="head-icon" src={userInfo.headIcon} alt=""/>
                      </div>
                    )
                  }
                </div>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}


type ContentProps = {
  data: KnowItem[];
  activeIndex: number;
  prevActiveIndex: number;
  state: StateProps;
	handlerRouterPush(pathname: string): void;
}
// 具体内容
function Content({ data, activeIndex, prevActiveIndex, state, handlerRouterPush }: ContentProps) {
  const userInfo = useContext(Context);
  const [height, setHeight] = useState('');
  const contentItem = [] as any;
  data.forEach((item: KnowItem) => {
    contentItem.push(
      useMemo(() => (
        { style, direction, state }: any
      ) => (
        <ContentItem style={style} item={item} direction={direction} state={state}></ContentItem>
      ), [item])
    )
  });

  const direction = activeIndex > prevActiveIndex ? 'right' : 'left';
  const transitions = useTransition(activeIndex, data => data, {
    from: { 
      transform: `translate3d(${ direction === 'left' ? '-100%' : '100%' },0,0)`
    },
    enter: {
      transform: 'translate3d(0%,0,0)'
    },
    leave: { 
      transform: `translate3d(${ direction === 'left' ? '100%' : '-100%' },0,0)`
    },
    onRest: () => (state.isRest = true),
  });

  useEffect(() => {
    if (state.refContent.current) {
      setHeight(state.refContent.current.clientHeight + 'px');
    } else {
      setHeight('auto');
    }
  }, [activeIndex]);

  return (
    <div className="content" style={{ height: height }}>
      {
        userInfo.isshowcertificate && (
          <div className="cont__certificate" onClick={() => handlerRouterPush('certificate')}>
            <i className="icon__certificate"></i>
            <span className="certificate__text">我的证书</span>
          </div>
        )
      }
      {
        transitions.map(({ item, props, key }: {item: number, props: any, key: string }) => {
          const Item = contentItem[item - 1];
          return <Item key={key} style={props} direction={direction} state={state} />
        })
      }
    </div>
  )
}

type ContentItemProps = {
  style: any;
  item: KnowItem;
  direction: string;
  state: StateProps;
}

function ContentItem({ style, item, direction, state }: ContentItemProps) {
  const userInfo = useContext(Context);
  useEffect(() => {
    return () => {
      clearTimeout(state.animTime);
    }
  }, []);

  return (
    <animated.div className="content__item" ref={state.refContent} style={style}>
      <div className="level">
        <span className="level__num">Lv.{item.level}</span>
        {
          (userInfo.level === item.level && userInfo.headIcon) && <span className="level__label">我的等级</span>
        }
      </div>
      <Spring
        delay={100}
        from={{ transform: direction === 'left' ? 'translate3d(-50px,0,0)' : 'translate3d(50px,0,0)' }}
        to={{ transform: 'translate3d(0,0,0)' }}
      >
        {
          props => (
            <div className="power" style={props}>
              <p className="power__title">{item.power}</p>
              <div className="power__content">
                <p className="power__text-1">{item.powerTitle}</p>
                <p className="power__text-2">{item.powerText}</p>
              </div>
            </div>
          )
        }
      </Spring>
      <Spring
        delay={200}
        from={{ transform: direction === 'left' ? 'translate3d(-50px,0,0)' : 'translate3d(50px,0,0)' }}
        to={{ transform: 'translate3d(0,0,0)' }}
      >
        {props => (
          <div className="know" style={props}>
            <p className="know__title">{item.know}</p>
            <div className="know__content">
              {
                item.knowDetail && item.knowDetail.map((list, index: number) => (
                  <div className="know__block" key={index}>
                    <p className="know__left know__text">{list.title}</p>
                    <div className="know__right">
                      {
                        list.child && list.child.map((text: string, index: number) => <p className="know__text" key={index}>{text}</p>)
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </Spring>
    </animated.div>
  )
}

type ScrollBarProps = {
  activeIndex: number;
  lineOffsetWidth: number;
  handlerChangeIndex(i: number): void;
  state: StateProps;
}
// 滑动条
function ScrollBar({ activeIndex, lineOffsetWidth, handlerChangeIndex, state }: ScrollBarProps) {
  const [hint, setHint] = useState(getItem('hint') || '0');
  const [htmlSize] = useState(parseFloat(document.documentElement.style.fontSize));
  const [rootLeft] = useState(document.getElementById('root').offsetLeft);
  
  useEffect(() => {
    setTimeout(() => {
      setHint('1');
      setItem('hint', '1');
    }, 2500);
  }, []);

  const [shadow, setShadow] = useState(false);

  const space = htmlSize * 0.32;  // 间隙
  const lineWidth = lineOffsetWidth / 2;  // 容器的一半
  const proportion = Math.min(window.innerWidth, 500) - (space * 2);

  const [{ x }, set] = useSpring(() => ({ x: (activeIndex / 12 * proportion - lineWidth) }));
  const bind = useDrag(({ xy: [mx], first, last }) => {
    const pro = (mx - rootLeft - space) / proportion;
    const moveTo = () => {
      for (let i = 1; i <= 12; i++) {
        if (pro > (i - 1) / 12 && pro <= i / 12) {
          set({ x: i / 12 * proportion - lineWidth });
          handlerChangeIndex(i);
          break;
        }
        // 处理异常情况
        if (pro < 0) {
          set({ x: 1 / 12 * proportion - lineWidth });
          handlerChangeIndex(i);
          break;
        }
        if (pro > 1) {
          set({ x: 12 / 12 * proportion - lineWidth });
          handlerChangeIndex(12);
          break;
        }
      }
    }
    set({ x: Math.min(Math.max(space, mx - rootLeft - space), proportion) });

    if (first) {
      setShadow(true);
    }
    if (last) {
      setShadow(false);
      state.isRest = true;
      moveTo();
      clearTimeout(state.animTime);
    }
    // 处理异常情况
    clearTimeout(state.animTime);
    state.animTime = setTimeout(() => {
      moveTo();
    }, 500);
  }, { axis: 'x' });

  set({ x: (activeIndex / 12 * proportion - lineWidth) });

  return (
    <section className="scrollbar">
      <animated.div 
        className={`bar ${shadow ? 'active' : ''}`} 
        {...bind()}
        style={{
          left: x,
        }}  
      ></animated.div>
      {
        hint === '0' && <div className="hint__wrap hint--1">左右滑动可查看不同级别对应知识点</div>
      }
    </section>
  )
}

export default KnowledgeCom;
