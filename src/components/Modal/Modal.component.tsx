import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
  color: black;
  box-sizing: border-box;
  font-size: 2rem;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 100%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  font-size: inherit;
  i {
    width: 100%;
  }
  &:hover {
    background-color: lightgrey;
  }
`;

const Title = styled.h1`
  margin: 1rem 0;
`;

interface ModalProps {
  children: React.ReactNode[] | React.ReactNode;
  close: () => void;
  title: string;
}

class Modal extends React.Component<ModalProps> {
  modalRoot: HTMLDivElement;
  constructor(props: ModalProps) {
    super(props);

    this.modalRoot = document.createElement('div');
    this.modalRoot.id = '#modal-root';
    document.body.appendChild(this.modalRoot);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modalRoot);
  }
  render() {
    return ReactDOM.createPortal(
      <Container>
        <>
          <ExitButtonContainer>
            <ButtonClose onClick={this.props.close}>
              <i className="far fa-times-circle" />
              esc
            </ButtonClose>
          </ExitButtonContainer>
          <Title>{this.props.title}</Title>
          {this.props.children}
        </>
      </Container>,
      this.modalRoot
    );
  }
}

export default Modal;
