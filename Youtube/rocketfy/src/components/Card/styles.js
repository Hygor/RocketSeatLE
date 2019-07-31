import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: #FFF;
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(192,208,230,.9);
  border-top: 20px solid rgba(230,236,245,0.4);
  margin-bottom: 10px;
  padding: 15px;
  cursor: grab;

  p {
    font-weight: 500;
  }

  header {
    position: absolute;
    top: -22px;
    left: 15px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-top: 5px;
  }

  ${ props => props.isDragging && css`
    border: 2px dashed rgba(0,0,0,.2);
    padding-top: 31px;
    background: transparent; 
    box-shadow: none;
    cursor: grabbing;

    p, img, header {
      opacity: 0;
    }
  `}
  
`;

export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  background: ${props => props.color}; 
`;