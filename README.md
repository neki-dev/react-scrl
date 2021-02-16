![react-scrl](https://i.ibb.co/zNPZ2Rr/scrl.png)
* #### Simple and versatile stylized scrollbar for React
  * _Size 3.59 KB (gzip)_
  * _Vertical and horizontal_
  * _Stylizing_
  * _Touchable_ (soon...)

---

### [Demo](https://codesandbox.io/s/react-scrl-u59db)
.
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
     * @param {Object} params - Params of scrolling
     * @param {boolean} params.isDragging - Is scrolling by mouse drag
     */
    const onScroll = useCallback((x, y, params) => {
        console.log(x, y, params);
    }, []);

    return (
        /**
         * @param {string} className - Custom class for wrapper
         * @param {number} speed - Speed of scrolling
         * @param {function} onScroll - Event of scrolling
         */
        <Scrollbar className="example" speed={1} onScroll={onScroll}>
            <p>So many letters...</p>
        </Scrollbar>
    );

};
```