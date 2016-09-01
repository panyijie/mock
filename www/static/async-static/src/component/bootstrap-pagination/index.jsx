//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  BOOTSTRAP_PAGINATION_INIT: 'BOOTSTRAP_PAGINATION_INIT'
};

//component body
export class BootstrapPagination extends React.Component {
  render() {
    let totalPageNum = parseInt(this.props.dataSource.totalPage);
    let currentPageNum = parseInt(this.props.dataSource.currentPage);
    let pageLink = this.props.link;
    let pageShow = parseInt(this.props.pageShow);

    if (totalPageNum === 1) {
      return (
        <nav className="bootstrap-pagination">
          <ul className="pagination">
            <li className="active"><a href={pageLink + '1'}>1</a></li>
          </ul>
        </nav>
      );
    } else {
      let linkNodes = [];

      if (parseInt(currentPageNum) === 1) {
        linkNodes.push(<li className="disabled"><a href={pageLink + '1'}>首页</a></li>);
        linkNodes.push(<li className="disabled"><a href={pageLink + '1'}>上一页</a></li>);
      } else {
        linkNodes.push(<li><a href={pageLink + '1'}>首页</a></li>);
        linkNodes.push(<li><a href={pageLink + (currentPageNum-1)}>上一页</a></li>);
      }

      if (currentPageNum < pageShow) {
        let actualNum = (pageShow < totalPageNum) ? pageShow : totalPageNum;
        for (let i = 1; i <= actualNum; i++) {
          if (i === currentPageNum) {
            linkNodes.push(
              <li className="active">
                <a href={pageLink + i}>{i}</a>
              </li>
            );
          } else {
            linkNodes.push(
              <li>
                <a href={pageLink + i}>{i}</a>
              </li>
            );
          }
        }
      } else {
        linkNodes.push(
          <li>
            <a href={pageLink + (currentPageNum-(currentPageNum%pageShow)-1)}>…</a>
          </li>
        );

        let paginationStart = currentPageNum - (currentPageNum % pageShow);
        let paginationEnd = currentPageNum - (currentPageNum % pageShow) + pageShow;
        if (paginationEnd > totalPageNum) {
          paginationEnd = totalPageNum;
        }
        for (let j = paginationStart; j <= paginationEnd; j++) {
          if (j === currentPageNum) {
            linkNodes.push(
              <li className="active">
                <a href={pageLink + j}>{j}</a>
              </li>
            );
          } else {
            linkNodes.push(
              <li>
                <a href={pageLink + j}>{j}</a>
              </li>
            );
          }
        }
      }

      if (currentPageNum < (totalPageNum - pageShow)) {
        linkNodes.push(
          <li>
            <a href={pageLink + (currentPageNum-(currentPageNum%pageShow)+pageShow)}>…</a>
          </li>
        );
      }

      if (currentPageNum === totalPageNum) {
        linkNodes.push(<li className="disabled"><a
          href={pageLink + (currentPageNum+1)}>下一页</a></li>);
        linkNodes.push(<li className="disabled"><a href={pageLink + totalPageNum}>末页</a>
        </li>);
      } else {
        linkNodes.push(<li><a href={pageLink + (currentPageNum+1)}>下一页</a></li>);
        linkNodes.push(<li><a href={pageLink + totalPageNum}>末页</a></li>);
      }

      return (
        <nav className="bootstrap-pagination">
          <ul className="pagination">
            {linkNodes}
          </ul>
        </nav>
      );
    }
  }
}