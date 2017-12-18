/**
 * Created by leesx on 2017/12/15.
 */
import React, {Component} from "react";
import {List, ListItem} from "framework7-react";
import appConfig from "./../../utils/appConfig";
const videoData = appConfig.IQIYI_DATA.data;
let pages_num = 0;
export default class VideoList extends Component {
    state = {
        listItems: []
    }

    componentDidMount() {
        this.renderItem()
    }

    renderItem = () => {
        const {listItems} = this.state;
        const currentData = videoData.slice(pages_num,pages_num+10);
        const items = currentData.map((item, index) => {
            return (
                <ListItem
                    key={`listitem_pagesnum_${pages_num}_${index}`}
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
        //listItems = listItems.concat(items)
        pages_num +=10;
        this.setState({
            listItems:listItems.concat(items)
        })
    }
    handleClickLoadMore = () => {
        this.renderItem()
    }

    render() {
        const {listItems} = this.state
        return (
            <div>
                <List mediaList>
                    {listItems}
                </List>
                <p style={{textAlign:'center'}} onClick={this.handleClickLoadMore}>点击加载更多</p>
            </div>
        )
    }
}