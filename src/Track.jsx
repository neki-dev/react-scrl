import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const ScrollbarTrack = ({size, offset, scope, direction, onUpdate, onToggleDrag}) => {

    const [isDragging, setDragging] = useState(false);

    const refTrack = useRef(null);
    const refDrag = useRef({
        offset: 0,
        start: 0,
    });

    const onDrag = (e) => {
        onToggleDrag(true);
        setDragging(true);
        refDrag.current = {
            offset,
            start: (direction === 'x') ? e.pageX : e.pageY,
        };
        e.preventDefault();
    };

    const onUndrag = () => {
        onToggleDrag(false);
        setDragging(false);
    };

    const onMove = (e) => {
        const shift = refDrag.current.start - ((direction === 'x') ? e.pageX : e.pageY);
        const velocity = shift / (size * (1 - scope));
        const next = (velocity > 0)
            ? Math.max(0, refDrag.current.offset - velocity)
            : Math.min(1, refDrag.current.offset - velocity);
        if (offset !== next) {
            onUpdate(next);
        }
        e.preventDefault();
    };

    useEffect(() => {
        const track = refTrack.current;
        track.addEventListener('mousedown', onDrag);
        return () => {
            track.removeEventListener('mousedown', onDrag);
        };
    }, [offset]);

    useEffect(() => {
        if (!isDragging) {
            return;
        }
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUndrag);
        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUndrag);
        };
    }, [isDragging]);

    useEffect(() => {
        return () => {
            onUpdate(0);
        };
    }, []);

    // ---

    return (
        <div className={`scrollbar-thumb direction-${direction}`} style={{[(direction === 'y') ? 'height' : 'width']: size}}>
            <div ref={refTrack} className={`scrollbar-track ${isDragging ? 'dragging' : ''}`} style={{
                [(direction === 'y') ? 'top' : 'left']: (size * (1 - scope) * offset),
                [(direction === 'y') ? 'height' : 'width']: (size * scope),
            }}>
                <span />
            </div>
        </div>
    );

};

ScrollbarTrack.propTypes = {
    size: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    scope: PropTypes.number.isRequired,
    direction: PropTypes.oneOf(['x', 'y']).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onToggleDrag: PropTypes.func.isRequired,
};

export default ScrollbarTrack;