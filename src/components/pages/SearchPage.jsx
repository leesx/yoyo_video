import React, {Component} from 'react';
import {Page, Navbar, ContentBlockTitle, List, ListItem, Searchbar, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';

import appConfig from "./../../utils/appConfig";
const videoData = appConfig.IQIYI_DATA.data;
import VideoList from "./VideoList";


function throttle(fn, delta, context) {
  return function() {
    var args = arguments;
    var then = 0;

    function repeat(now) {
      requestAnimationFrame(repeat);
      if (now - then >= delta) {
        then = now;
        fn.call(context, args);
      }
    }

    requestAnimationFrame(repeat);
  }
}

export class SearchPage extends Component{
    state = {
        searchValue:'',
        filterList:[],
    }
    handleChangeSearch=(e)=>{
      const value = e.target.value.trim();
      if(!value) {
        this.setState({
          filterList:[]
        })
        return false
      };
      const filterList = videoData.filter(item=> item.title.indexOf(value) > -1 || item.role_name.indexOf(value) > -1);
      setTimeout(()=>{
        this.setState({
          filterList
        })
      },300)
    }
    render(){
        const {filterList} = this.state
        return (
            <Page>
                <Navbar backLink="Back" title="电影搜索" sliding />
                <div className="searchbar">
                    <div className="searchbar-input">
                        <input type="search" placeholder="请输入电影名称或者演员名称" onChange={this.handleChangeSearch}  />
                    </div>
                </div>
                <p style={{paddingLeft:10}}>搜索出相关电影:<strong style={{color:'#f00'}}>{filterList.length}</strong>部</p>
                <div className="search-results">
                  <List mediaList >
                    {
                      filterList.map((item, index) => {
                          return (
                              <ListItem
                                  key={`listitem_pagesnum_${index}`}
                                  title={item.title}
                                  badge={item.score}
                                  badgeColor="green"
                                  link={`/play/${item.video_id}`}
                                  media={`<img src=${`${appConfig.VIDEO_PIC_URL}/${item.img_name}`} />`}
                                  //subtitle={item.role_name}
                                  text={`主演:${item.role_name}`}
                              >
                              </ListItem>
                          )
                      })
                    }
                  </List>
                </div>

            </Page>
        )
    }
}
