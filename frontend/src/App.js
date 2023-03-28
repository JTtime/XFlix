import { ThemeProvider } from '@mui/material';
import { Routes as Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoPage from './components/VideoPage';
import { SnackbarProvider } from 'notistack';
import theme from './Theme';
import VideoContextProvider from './contextstore/VideoContext';
import { Provider } from 'react-redux'
import  store  from './api/videoStore';


export const config = {
    endpoint: `https://2fa05a82-cb6a-467f-9650-0a307ef17311.mock.pstmn.io/v1`, 
};

function App() {



    return (
        <VideoContextProvider >
            <Provider store={store}>
                <div className="App">
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider
                            dense
                            preventDuplicate
                            maxSnack={3}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            autoHideDuration={1000}
                        >
                            <Switch>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/video/:id" element={<VideoPage />} />
                            </Switch>
                        </SnackbarProvider>
                    </ThemeProvider>
                </div>
            </Provider>

        </VideoContextProvider>
    );
}

export default App;
