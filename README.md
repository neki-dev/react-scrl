### Simple and versatile stylized scrollbar for React
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

    const onScroll = useCallback((x, y, params) => {
        console.log(x, y, params);
    }, []);

    return (
        <Scrollbar className="example" speed={1} onScroll={onScroll}>
            <p>So many letters...</p>
        </Scrollbar>
    );

};
```