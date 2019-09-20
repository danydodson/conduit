import { css } from 'styled-components'

export const ViewTabs = css`
  .dd-wrapper {
    user-select: none;
    position: relative;
    width: 222px;
  }
  
  .dd-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 38px;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    cursor: default;
    position: relative;
    background-color: #fff;
  }

  .dd-header span {
    margin-right: 20px;
  }
  
  .dd-header-title {
    font-weight: 300;
    margin: 2px 20px;
    margin-right: 30px;
  }
  
  .angle-down {
    color: #000;
    margin-right: 20px;
  }
  
  .dd-list {
    z-index: 10;
    position: absolute;
    width: 100%;
    border: 1px solid #dfdfdf;
    border-top: none;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #fff;
    box-shadow: 0 2px 5px -1px #e8e8e8;
    font-weight: 700;
    padding: 15px 0;
    max-height: 215px;
    overflow-y: scroll;
  }

  .dd-list-item {
    width: 100%;
    font-size: 1.5rem;
    padding: 8px 10px;
    line-height: 1.6rem;
    cursor: default;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .dd-list-item.selected {
    color: #fff;
    background-color: #ffcc01;
  }
  
  .dd-list-item:hover {
    color: #fff;
    background-color: #ffcc01;
  }
  
  .dd-wrapper-single {
    user-select: none;
    position: relative;
    width: 265px;
  }
  
  .dd-wrapper-single .dd-header {
    border: 1px solid #ccc;
  }
  
  .dd-wrapper-single .dd-header .dd-header-name {
    font-weight: 400;
  }
  
  .dd-wrapper-single .dd-list {
    border: 1px solid #ccc;
    border-top: none;
  }
`
