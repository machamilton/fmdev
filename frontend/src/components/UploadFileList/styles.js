import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    max-width: 220px;
    strong {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      div {
        border: 0;
        display: inline;
        background: transparent;
        color: #e57878;
        margin-left: 5px;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;

export const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;
