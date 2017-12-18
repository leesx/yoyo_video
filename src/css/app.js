import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "search-results list-blockmedia-list item-media": {
        "width": 60,
        "height": 60,
        "overflow": "hidden"
    },
    "search-results list-blockmedia-list item-media img": {
        "maxWidth": "100%"
    },
    "search-results list-blockmedia-list item-title": {
        "fontSize": 14
    },
    "search-results list-blockmedia-list item-text": {
        "fontSize": 12
    }
});