import React,{Component} from 'react';
import {Page, ContentBlock, Navbar} from 'framework7-react';
import {getCurrentRoute} from './../App'
import appConfig from './../../utils/appConfig';
const videoData = appConfig.IQIYI_DATA.data;
export class PlayPage extends Component{
    state={
        data:{},
        iframeURL:''
    }
    componentDidMount(){
        const route = getCurrentRoute();
        const {videoID} = route.params;

        const curpageData = videoData.find(item=>item.video_id == videoID);
        const iframeURL = `http://api.baiyug.cn/vip/index.php?url=${curpageData.link}`;
        this.setState({
            data:curpageData,
            iframeURL
        })

    }
    render(){
        const {data,iframeURL} = this.state
        return (
            <Page>
                <Navbar title={data.title} backLink="返回" sliding />
                <ContentBlock inner>
                    <iframe width="100%" height={window.screen.availWidth*3/4} frameBorder="0" src={iframeURL}>

                    </iframe>
                    <div>
                        <p>片名:{data.title}</p>
                        <p>主演:<span style={{color:'#ccc'}}>{data.role_name}</span></p>
                        <p>评分:<span style={{color:'#f00'}}>{data.score}</span></p>
                        <div>
                            <img src={`${appConfig.VIDEO_PIC_URL}/${data.img_name}`} />
                        </div>
                    </div>
                </ContentBlock>
            </Page>
        )
    }
}