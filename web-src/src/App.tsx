import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import {MainPage} from "./app/pages/main-page";
import {useMount} from "react-use";
import {createContext, useContext} from "react";
import {SharedSubjectContext} from "./app/context/shared-subjects";
import {useObservableState} from "observable-hooks";
import {Pref} from "./app/context/pref";


export const isTauriAppContext = createContext(false)

function App() {
    const sharedSubsCtx = useContext(SharedSubjectContext)
    // const appEnvs = useContext(AppEnvsContext)
    const [isTauri, setIsTauri] = useObservableState((obs) => {
        return obs
    }, false)


    // hooks
    // listen window resize events
    useMount(() => {
        const sendEvent = () => {
            sharedSubsCtx.windowSizeChange$.next([window.innerWidth ?? 0, window.innerHeight ?? 0])
        }
        window.addEventListener("resize", () => {
            sendEvent()
        })
        sendEvent()
    })

    // check is in tauri client or not
    useMount(() => {
        sharedSubsCtx.tauri$.subscribe(t => {
            if (t) {
                setIsTauri(true)
            } else {
                setIsTauri(false)
            }
        })
    })

    // subscribe dark mode
    useMount(() => {
        Pref.getInstance().darkModeEnabled.subscribe(
            {
                next: enabled => {
                    const body = document.body;
                    if (enabled) {
                        body.setAttribute('theme-mode', 'dark');
                    } else {
                        if (body.hasAttribute('theme-mode')) {
                            body.removeAttribute('theme-mode');
                        }
                    }
                }
            }
        )
    })

    return <BrowserRouter>
        <isTauriAppContext.Provider value={isTauri}>
            <Routes>
                <Route path="/" element={<MainPage/>}> </Route>
            </Routes>
        </isTauriAppContext.Provider>
    </BrowserRouter>
}

export default App;
