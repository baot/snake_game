import { screenConfig } from './config';

const canvas = document.getElementById("game");
// Change canvas size to fit window size
canvas.width = screenConfig.width;
canvas.height = screenConfig.height;

const ctx = canvas.getContext("2d");

export default ctx
