import RootRoutes from './routes';
import React from 'react';

import './css/egov/base.css';
import './css/egov/layout.css';
import './css/egov/component.css';
import './css/egov/page.css';
import './css/egov/response.css';


import './css/flambus/base.css';
import './css/flambus/layout.css';
import './css/flambus/component.css';
import './css/flambus/page.css';
import './css/flambus/response.css';

function App() {

  return (
    <div className="wrap">
        <RootRoutes />
    </div>
  )
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.REACT_APP_EGOV_CONTEXT_URL", process.env.REACT_APP_EGOV_CONTEXT_URL);

export default App;
