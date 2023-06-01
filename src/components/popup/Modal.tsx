/**
 * 1. 누르면 등장하는 버튼이 필요
 * 2. 배경을 누르면 꺼져야해(외부로 부터 격리가 되야함.) =>background
 */

import styled from "styled-components";
import { createPortal } from "react-dom";
import { ModalSelectorState } from "@/redux/modal";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "@/redux/modal";
const ModalBackground = styled.div`
  position: relative;
`;
const CloseBackground = styled.div`
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 11;
`;
//<Modal modal={detail한 내용}>버튼</Modal>

export default function Modal() {
  const modal = useSelector(
    (state: ModalSelectorState) => state.modal.children
  );
  const dispatch = useDispatch();
  if (!modal) return <></>;
  return createPortal(
    <>
      <ModalBackground>
        <ModalContent>{modal}</ModalContent>
        <CloseBackground
          onClick={e => {
            e.stopPropagation();
            dispatch(setModal(null));
          }}
        ></CloseBackground>
      </ModalBackground>
    </>,
    document.getElementById("modal-root") || document.createElement("div")
  );
}
