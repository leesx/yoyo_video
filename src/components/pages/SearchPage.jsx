import React, {Component} from 'react';
import {Page, Navbar, ContentBlockTitle, List, ListItem, Searchbar, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';



export class SearchPage extends Component{
    onChange=(e)=>{
        console.log(e.persist())
    }
    render(){
        return (
            <Page>
                <Navbar backLink="Back" title="Searchbar" sliding />
                <Searchbar
                    cancelLink="Cancel"
                    searchList="#search-list"
                    onChange={this.onChange}
                />
                <List className="searchbar-not-found">
                    <ListItem title="Nothing found" />
                </List>
                <List className="searchbar-found" id="search-list">
                    {
                        Array.apply(null, Array(100)).map((item, index) => {
                            return (<ListItem  key={index} title={`Item ${index + 1}`} />);
                        })
                    }
                </List>
            </Page>
        )
    }
}