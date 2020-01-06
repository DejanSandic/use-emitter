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
## EmitterProvider
```jsx
// App.jsx
import React from 'react';

import { EmitterProvider } from 'use-emitter';

// import some kind of event emitter
import EventEmitter from 'events';
const myEmitter = new EventEmitter();

// you can also use socket.io as event emitter
import io from 'socket.io-client';
const myEmitter = io('http://some-socket-server.com');


export default function () {
   return (
      <EmitterProvider emitter={myEmitter}>{...children}</EmitterProvider>
   );
};
```

## useEvent
Use data and the emit function for the specific event.
```jsx
import React from 'react';

import { useEvent } from 'use-emitter';

export default function SomeComponent () {
   const [ message, emitMessage ] = useEvent('new-message');
   const firstMessage = useEvent.once('new-message');

   return (
         <div>
            <p>Current message: {message}</p>
            <p>First message: {firstMessage}</p>
         </div>

         <input
            type="text"
            value={message}
            onChange={e => emitMessage(e.target.value)}
         />
      </div>
   );
};
```

You can also provide the default value of the event as the second parameter of the useEvent function.

```js
const message = useEvent('new-message', 'Message has not been set yet');
const firstMessage = useEvent.once('new-message', 'Message has not been set yet');
```

## useEmit
Use only emit function for the specific event.
```jsx
import React, { useState } from 'react';

import { useEmit } from 'use-emitter';

export default function SomeComponent () {
   const [ messageText, setMessageText ] = useState('');
   const emitMessage = useEmit('message');

   return (
      <div>
         <input
            type="text"
            value={messageText}
            onChange={e => updateMessageText(e.target.value)}
         />

         <button onClick={() => emitMessage(messageText)}>
            Set message
         </button>
      </div>
   );
}
```

## useEmitter
Use the full instance of the emitter with all of its methods.
```js
import { useEmitter } from 'use-emitter';

export default function SomeComponent () {
   const emitter = useEmitter();
}
```

## Additional properties
Additional properties for the `on` method.<br>
If the event emitter of your choice expects additional options, you can provide them after the default value.
```js
import { useEvent } from 'use-emitter';

export default function SomeComponent () {
   const [data, emitData] = useEvent('event-name', null, arg1, arg2, arg3);
}

// Event emitter will receive the next arguments:
// emitter.on('event-name', callback(), arg1, arg2, arg3)
```

Additional properties for the `emit` method.<br>
If the event emitter of your choice expects additional options or multiple data values, you can provide them as the arguments of the emit function.
```js
import { useEvent } from 'use-emitter';

export default function SomeComponent () {
   const [data, emitData] = useEvent('event-name');

   function handleClick () {
      emitData(data, arg1, arg2, arg3)
   }
}

// Event emitter will receive the next arguments:
// emitter.emit('event-name', data, arg1, arg2, arg3)
```