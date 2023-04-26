import postUploadModalSlice, { PostUploadModalState, addCurContentIndex, close, open } from "@/redux/postUploadModal";
import { ReactElement, useEffect, useState } from "react";
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
}

interface state {
  postUploadModalSlice: PostUploadModalState;
}
export const PostUploadModal = ({ contentList, openBtnStyle, closeBtnStyle }: PostUploadModalProps) => {
  const [hasCloseBtn, setHasCloseBtn] = useState(true);
  const dispatch = useDispatch();
  const isOpen = useSelector(({ postUploadModalSlice: state }: state) => {
    return state.isOpen;
  });
  const curContentIndex = useSelector(({ postUploadModalSlice: state }: state) => {
    return state.curContentIndex;
  });

  const moveNextContentHandler = () => {
    if (curContentIndex < contentList.length) {
      dispatch(addCurContentIndex(1));
    }
  };
  const movePrevContentHandler = () => {
    if (curContentIndex > 0) {
      dispatch(addCurContentIndex(-1));
    }
  };

  const openModalHandler = () => {
    console.log(isOpen);

    dispatch(open());
  };
  const closeModalHandler = () => {
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
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className="modalTitle">{contentList[curContentIndex].modalTitle}</div>
              <div className="modalContent">{contentList[curContentIndex].content}</div>
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
  /* width: 718px; */
  background-color: #ffffff;
  > div.modalTitle {
    width: 100%;
    height: 24px;
    margin: 13px auto;
    text-align: center;
    line-height: 24px;
    font-weight: 400;
    font-size: 20px;
    color: #333333;
  }
  > div.modalContent {
    height: 718px;
    min-width: 803px;
    border-top: 0.8px gray solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
