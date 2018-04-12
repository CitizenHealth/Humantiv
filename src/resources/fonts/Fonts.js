import React from 'react';
import {Platform} from 'react-native';

export const Fonts = {
    icons: 'humantiv-icons',
    ...Platform.select({
        ios: { regular: "SofiaPro-Regular"},
        android: { regular: "Sofia-Pro-Regular" }}),
    ...Platform.select({
        ios: { bold: "SofiaPro-SemiBold"},
        android: { bold: "Sofia-Pro-SemiBold" }}),
    ...Platform.select({
        ios: { light: "SofiaPro-UltraLight"},
        android: { light: "Sofia-Pro-UltraLight" }})           
}