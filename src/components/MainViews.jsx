/**
 * Created by leesx on 2017/12/15.
 */
import React, {PropTypes} from "react";
import {
    View,
    Navbar,
    Pages,
    Page,
    ContentBlock,
    ContentBlockTitle,
    Views,
    Searchbar,
    NavCenter,
    List,
    ListItem,
    Link
} from "framework7-react";
import VideoList from "./pages/VideoList";

import {getFramework7} from './App'

const MainViews = (props, context) => {
    return (
        <Views>
            <View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
                {/* Navbar */}
                {context.framework7AppContext.theme.ios ? (
                        <Navbar>
                            {/*<NavLeft>*/}
                            {/*<Link icon="icon-bars" openPanel="left" />*/}
                            {/*</NavLeft>*/}
                            <NavCenter sliding>悠悠视吧</NavCenter>

                        </Navbar>
                    ) : null}
                {/* Pages */}
                <Pages>
                    <Page>
                        <Searchbar
                            placeholder="输入电影名称或者主演名称"
                        />
                        <ContentBlockTitle onClick={() => getFramework7().mainView.router.loadPage('/search/')}>欢迎来到悠悠视吧</ContentBlockTitle>
                        <ContentBlock inner>
                            <p>搜集网络大片一起共享</p>
                            <List>
                                <ListItem link="/search/" title="快速搜索电影"></ListItem>
                            </List>
                        </ContentBlock>
                        <ContentBlockTitle>最新电影</ContentBlockTitle>
                        {/*<List>*/}
                        {/*<ListItem link="/about/" title="About"></ListItem>*/}
                        {/*<ListItem link="/form/" title="Form"></ListItem>*/}
                        {/*</List>*/}
                        <VideoList />
                    </Page>
                </Pages>
                {/*<Toolbar tabbar labels>*/}
                {/*<Link icon="icon-back" text="首页" tabLink="#tab1"></Link>*/}
                {/*<Link icon="icon-2" text="搜索" tabLink="#tab2"></Link>*/}
                {/*</Toolbar>*/}
            </View>
        </Views>
    );
};

MainViews.contextTypes = {
    framework7AppContext: PropTypes.object
};

export default MainViews