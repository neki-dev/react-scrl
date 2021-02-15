import React, {useState, useMemo, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useResizeDetector} from 'react-resize-detector';

import Track from './Track';

import './styles.scss';

let EVENT_MOUSEWHEEL;
if ('onwheel' in document) {
    EVENT_MOUSEWHEEL = 'wheel';
} else if ('onmousewheel' in document) {
    EVENT_MOUSEWHEEL = 'mousewheel';
} else {
    EVENT_MOUSEWHEEL = 'MozMousePixelScroll';
}

const DIRECTIONS = ['x', 'y'];

const Scrollbar = ({children, speed, className, onScroll}) => {

    const [sizeScreen, setSizeScreen] = useState({x: 0, y: 0});
    const [sizeContent, setSizeContent] = useState({x: 0, y: 0});
    const [offsets, setOffsets] = useState({x: 0, y: 0});
    const [isDragging, setDragging] = useState(false);

    const {ref: refScreen} = useResizeDetector({
        onResize: (x, y) => setSizeScreen({x, y}),
    });

    const {ref: refContent} = useResizeDetector({
        onResize: (x, y) => setSizeContent({x, y}),
    });

    const scopes = useMemo(() => {
        return DIRECTIONS.reduce((a, b) => ({
            ...a,
            [b]: Math.min(100, Math.ceil(sizeScreen[b] / sizeContent[b] * 100)) / 100,
        }), {});
    }, [sizeScreen, sizeContent]);

    const updateOffset = useCallback((direction, offset) => {
        setOffsets((offsets) => ({
            ...offsets,
            [direction]: (typeof offset === 'function') ? offset(offsets[direction]) : offset,
        }));
    }, [sizeContent]);

    const onMouseWheel = useCallback((e) => {
        const velocity = ((e.wheelDeltaY || -e.deltaY) / 15 * speed) / 100;
        updateOffset('y', (offset) => (
            (velocity > 0) ? Math.max(0, offset - velocity) : Math.min(1, offset - velocity)
        ));
        e.preventDefault();
        e.stopPropagation();
    }, []);

    useEffect(() => {
        if (scopes.y === 1) {
            return;
        }
        const screen = refScreen.current;
        screen.addEventListener(EVENT_MOUSEWHEEL, onMouseWheel);
        return () => {
            screen.removeEventListener(EVENT_MOUSEWHEEL, onMouseWheel);
        };
    }, [scopes]);

    useEffect(() => {
        if (!onScroll) {
            return;
        }
        const pxOffsets = DIRECTIONS.map((d) => ((sizeContent[d] - sizeScreen[d]) * offsets[d]));
        onScroll(...pxOffsets, {isDragging});
    }, [offsets, sizeContent, onScroll, isDragging]);

    // ---

    return (
        <div ref={refScreen} className={`scrollbar-screen ${className}`}>
            <div ref={refContent} className={`scrollbar-content ${isDragging ? 'dragging' : ''}`} style={(
                DIRECTIONS.reduce((a, b) => ({...a, [(b === 'x') ? 'left' : 'top']: ((sizeContent[b] - sizeScreen[b]) * -offsets[b])}), {})
            )}>{children}</div>
            {DIRECTIONS.map((d) => (scopes[d] < 1) && (
                <Track key={d} offset={offsets[d]} scope={scopes[d]} direction={d} size={sizeScreen[d]} onUpdate={(offset) => updateOffset(d, offset)} onToggleDrag={setDragging} />
            ))}
        </div>
    );

};

Scrollbar.defaultProps = {
    className: '',
    speed: 1,
    onScroll: undefined,
};

Scrollbar.propTypes = {
    className: PropTypes.string,
    speed: PropTypes.number,
    onScroll: PropTypes.func,
};

export default Scrollbar;