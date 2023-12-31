import { withProviders } from './providers';
import { AppRouter } from './routes/router';
import type React from 'react';
import './app.css';

/**
 * @name App
 * @constructor
 */
const App = (): React.ReactNode => <AppRouter />;

export default withProviders(App);
