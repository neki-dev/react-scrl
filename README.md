![react-scrl](https://i.ibb.co/zNPZ2Rr/scrl.png)
* #### Simple and versatile stylized scrollbar for React
  * _Size 245 byte_
  * _Vertical and horizontal_
  * _Stylizing_
  * _Touchable_ (soon...)
---
* ### [Demo](https://stackblitz.com/edit/react-qpagy3)

* ### Install

```sh
npm i react-scrl
```

* ### Usage

```jsx
import React, {useCallback} from 'react';
import Scrollbar from 'react-scrl';

export default () => {

    /**
     * @param {number} x - Left offset in px
     * @param {number} y - Top offset in px
     * @param {Object} offsets - Offsets in %
     * @param {boolean} isDragging - Is scrolling by mouse drag
     */
    const onScroll = useCallback((e) => {
        console.log(e.x, e.y);
    }, []);

    return (
        /**
         * @param {string} className - Custom class for wrapper
         * @param {Object} defaultOffsets - Default offsets in %
         * @param {number} speed - Speed of scrolling
         * @param {function} onScroll - Event of scrolling
         */
        <Scrollbar className="example" speed={1} defaultOffsets={{x: 0, y: 0}} onScroll={onScroll}>
            <p>So many letters...</p>
        </Scrollbar>
    );

};
```