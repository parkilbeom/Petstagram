import postUploaderSlice from "@/redux/postImageUploader";
import postUploadModalSlice, { PostUploadModalState, addCurContentIndex, close, open } from "@/redux/postUploadModal";
import { MouseEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled, { StyledComponent } from "styled-components";

export interface PostUploadModalContent {
  modalTitle: string;
  content: ReactElement;
}
export interface PostUploadModalProps {
  contentList: PostUploadModalContent[];
  openBtnStyle?: StyledComponent<"button", any, {}, never>;
  /**
   * 해당 값을 false로 주게 되면 바깥 화면 터치로 모달을 닫게 하고 closeBtn은 존재하지 않게 됨
   * */
  closeBtnStyle?: StyledComponent<"button", any, {}, never> | boolean;
  hasHeader?: boolean;
  contentStyle?: StyledComponent<"div", any, {}, never>;
}

interface state {
  postUploadModalSlice: PostUploadModalState;
}
export const PostUploadModal = ({ contentList, openBtnStyle, closeBtnStyle, hasHeader = false, contentStyle }: PostUploadModalProps) => {
  const [hasCloseBtn, setHasCloseBtn] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useSelector(({ postUploadModalSlice: state }: state) => {
    return state.isOpen;
  });
  const curContentIndex = useSelector(({ postUploadModalSlice: state }: state) => {
    return state.curContentIndex;
  });
  const nextBtnActived = useSelector(({ postUploadModalSlice: state }: state) => {
    return state.nextBtnActived;
  });
  const prevBtnActived = useSelector(({ postUploadModalSlice: state }: state) => {
    return state.prevBtnActived;
  });

  const moveNextContentHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (curContentIndex < contentList.length) {
      dispatch(addCurContentIndex(1));
    }
  };
  const movePrevContentHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (curContentIndex > 0) {
      dispatch(addCurContentIndex(-1));
    }
  };

  const openModalHandler = () => {
    console.log(isOpen);

    dispatch(open());
  };
  const closeModalHandler = () => {
    dispatch(postUploaderSlice.actions.clearImageList());
    dispatch(close());
  };

  useEffect(() => {
    // setCurContentIndex(contentList.length);
    if (openBtnStyle) {
      ModalBtn = openBtnStyle;
    }
    if (typeof closeBtnStyle != "boolean" && closeBtnStyle) {
      ExitBtn = closeBtnStyle;
    } else if (closeBtnStyle == false) {
      setHasCloseBtn(false);
    }

    if (contentStyle) {
      ModalContent = contentStyle;
    }
  }, []);

  return (
    <>
      <ModalContainer id="modal" role="dialog" tabIndex={-1} aria-modal="true">
        <ModalBtn
          onClick={openModalHandler}
          // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다.
        >
          {" "}
          Open Modal
          {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
        </ModalBtn>
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
        {isOpen && contentList[curContentIndex] ? (
          <ModalBackdrop onClick={closeModalHandler}>
            {hasCloseBtn ? <ExitBtn onClick={closeModalHandler}>x</ExitBtn> : null}
            <ModalView onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}>
              {hasHeader ? (
                <ModalHeader>
                  {nextBtnActived ? (
                    <button className="modalPrevBtn" onClick={movePrevContentHandler}>
                      <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.439341 10.4393C-0.146446 11.0251 -0.146446 11.9749 0.439341 12.5607L9.98528 22.1066C10.5711 22.6924 11.5208 22.6924 12.1066 22.1066C12.6924 21.5208 12.6924 20.5711 12.1066 19.9853L3.62132 11.5L12.1066 3.01472C12.6924 2.42893 12.6924 1.47919 12.1066 0.893398C11.5208 0.307611 10.5711 0.307611 9.98528 0.893398L0.439341 10.4393ZM26.5 10L1.5 10L1.5 13L26.5 13L26.5 10Z"
                          fill="#333333"
                        />
                      </svg>
                    </button>
                  ) : null}

                  <div className="modalTitle">{contentList[curContentIndex].modalTitle}</div>
                  {nextBtnActived ? (
                    <button className="modalNextBtn" onClick={moveNextContentHandler}>
                      다음
                    </button>
                  ) : null}
                </ModalHeader>
              ) : null}
              {/* <div className="modalContent">{contentList[curContentIndex].content}</div> */}
              <ModalContent>{contentList[curContentIndex].content}</ModalContent>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export let ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: 1px solid cornflowerblue;
  padding: 20px;
  color: pink;
  border-radius: 30px;
  cursor: grab;
`;

export let ExitBtn = styled(ModalBtn)`
  background-color: #4000c7;
  position: fixed;
  top: 0;
  right: 0;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: "dialog",
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;

  overflow: hidden;
  background-color: #ffffff;

  /* > div.modalContent {
    height: 700px;
    min-width: 803px;
    max-width: 1095px;
    border-top: 0.8px gray solid;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
`;

let ModalContent = styled.div`
  height: 700px;
  min-width: 803px;
  max-width: 1095px;
  border-top: 0.8px gray solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 24px;
  margin: 13px auto;
  text-align: center;
  line-height: 24px;
  font-weight: 400;
  font-size: 20px;
  color: #333333;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  > div.modalTitle {
    max-width: 100%;
    margin: 0 auto;
    height: 24px;
  }
  > button {
    display: flex;
    width: 35px;
    height: 24px;
    justify-content: center;
    cursor: pointer;
    background-color: #ffffff;
    align-items: center;
    padding: 0px;
    border: none;

    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #ff3700;
    overflow: hidden;
  }
  > button.modalPrevBtn {
    margin-left: 25px;
  }
  > button.modalNextBtn {
    margin-right: 25px;
  }
`;
