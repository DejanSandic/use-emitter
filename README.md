# use-emitter
React helper for event emitters and socket.io

# Installation
```bash
npm install use-emitter
```
```bash
yarn add use-emitter
```

# Usage
## EmitterProvider :
```jsx
// App.jsx
import React from 'react'

import { EmitterProvider } from 'use-emitter';

// Import components
import { DisplayMessage, SetMessage } from './components'

// import some kind of event emitter and
import EventEmitter from 'events';
const myEmitter = new EventEmitter();


export default function App () {
   return (
      <EmitterProvider emitter={myEmitter}>
         <DisplayMessage />
         <SetMessage />
      </EmitterProvider>
   );
};
```

## useEvent :
Use data for the specific event emitted by the emitter
```jsx
// DisplayMessage.jsx
import React from 'react'

import { useEvent } from 'use-emitter';

export default function DisplayMessage () {
   const message = useEvent('new-message');
   const firstMessage = useEvent.once('new-message');

   return (
      <div>
         <p>First message: {firstMessage}</p>
         <p>Current message: {message}</p>
      </div>
   );
};
```

You can also provide the default value of the event as the second parameter of the useEvent function.

```js
const message = useEvent('new-message', 'Message has not been set yet');
const firstMessage = useEvent.once('new-message', 'Message has not been set yet');
```

## useEmitter
Use a full instance of the emitter with all of its methods.
```jsx
// SetMessage.jsx
import React, { useState } from 'react'

import { useEmitter } from 'use-emitter';

export default function DisplayMessage () {
   const [ message, setMessage ] = useState('');
   const updateMessage = (e) => setMessage(e.target.value);

   const emitter = useEmitter();

   return (
      <div>
         <input type="text" value={message} onChange={updateMessage}>

         <button onClick={(e) => emitter.emit('new-message', e.target.value)}>
            Set message
         </button>
      </div>
   );
}
```
