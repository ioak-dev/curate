import React, { Component } from 'react';
import './style.scss';
import { fabric } from 'fabric';

let isDown, origX, origY, stroke;
export default class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: this.props.attributes && this.props.attributes.width ? this.props.attributes.width : 600,
            height: this.props.attributes && this.props.attributes.height ? this.props.attributes.height : 600,
            backgroundColor: this.props.attributes && this.props.attributes.backgroundColor ? this.props.attributes.backgroundColor : 'red',
            data: this.props.data ? this.props.data : null
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            width: nextProps.attributes && nextProps.attributes.width ? nextProps.attributes.width : 600,
            height: nextProps.attributes && nextProps.attributes.height ? nextProps.attributes.height : 600,
            backgroundColor: nextProps.attributes && nextProps.attributes.backgroundColor ? nextProps.attributes.backgroundColor : 'red',
            data: nextProps.data ? nextProps.data : null
        }, () => this.refreshCanvas());
    }

    componentDidMount() {
        let canvas = this.refreshCanvas();
        this.mouseDown(canvas);
        this.mouseMove(canvas);
        this.mouseUp(canvas);
    }

    refreshCanvas() {
        let canvas = new fabric.Canvas('c', {
            backgroundColor: this.state.backgroundColor,
            width: this.state.width,
            height: this.state.height
        });
        canvas.isDrawingMode = this.props.edit;
        if (this.state.data) {
            canvas.loadFromDatalessJSON(this.state.data);
        }

        canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
        canvas.freeDrawingBrush.width=10;
        canvas.freeDrawingBrush.color='#D2E4C4';

        return canvas;
    }

    mouseDown(canvas) {
        canvas.on('mouse:down', function(o) {
            isDown = true;
		    let pointer = canvas.getPointer(o.e);
		    origX = pointer.x;
		    origY = pointer.y;
            stroke = new fabric.Line({
                strokeWidth:5,
            });
            canvas.add(stroke);
        });
    }

    mouseMove(canvas) {
        canvas.on('mouse:move', function(o) {
            if (isDown) {
                var pointer = canvas.getPointer(o.e);
        
                    if(origX>pointer.x){
                        stroke.set({ left: Math.abs(pointer.x) });
                    }
                    if(origY>pointer.y){
                        stroke.set({ top: Math.abs(pointer.y) });
                    }
                    
                    stroke.set({ width: Math.abs(origX - pointer.x) });
                    stroke.set({ height: Math.abs(origY - pointer.y) });
            }
        });
    }

    mouseUp(canvas) {
        let that = this;
        canvas.on('mouse:up', function(o) {
                isDown = false;
                // sessionStorage.setItem('canvas', JSON.stringify(canvas));
                that.props.handleChange({
                    height: that.state.height,
                    width: that.state.width,
                    backgroundColor: that.state.backgroundColor,
                }, JSON.stringify(canvas));
        });
    }
    
	generateUUID() {
	    var d = new Date().getTime();
	    if(window.performance && typeof window.performance.now === "function"){
	        d += performance.now(); //use high-precision timer if available
	    }
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	}

    render() {
        // let canvas = new fabric.Canvas('c', {
        //     backgroundColor: 'white',
        //     width: this.props.width,
        //     height: this.props.height
        //   });
        // var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
        // path.set({ left: 120, top: 120 });
        // canvas.add(path);
        return (
            <div className="canvas">
                <canvas id="c" />
            </div>
        );
    }
}