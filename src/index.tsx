import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/appComponents/App';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
