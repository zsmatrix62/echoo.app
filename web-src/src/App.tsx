import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { MainPage } from "./app/pages/main-page";
import { useMount } from "react-use";
import { createContext, useContext } from "react";
import { SharedSubjectContext } from "./app/context/shared-subjects";
import { useObservableState } from "observable-hooks";
import { Pref } from "./app/context/pref";
import { useLocalStore } from "./app/libs/hooks/localstore";
import { EchooSettings, EchooSettingsDefault } from "./app/shared/setting";

export const isTauriAppContext = createContext(false);

function App() {
  const sharedSubsCtx = useContext(SharedSubjectContext);
  // const appEnvs = useContext(AppEnvsContext)
  const [isTauri, setIsTauri] = useObservableState((obs) => {
    return obs;
  }, false);

  // hooks
  // listen window resize events
  useMount(() => {
    const sendEvent = () => {
      sharedSubsCtx.windowSizeChange$.next([
        window.innerWidth ?? 0,
        window.innerHeight ?? 0,
      ]);
    };
    window.addEventListener("resize", () => {
      sendEvent();
    });
    sendEvent();
  });

  // check is in tauri client or not
  useMount(() => {
    sharedSubsCtx.tauri$.subscribe((t) => {
      if (t) {
        setIsTauri(true);
      } else {
        setIsTauri(false);
      }
    });
  });

  const [settings] = useLocalStore<EchooSettings>(
    "settings",
    EchooSettingsDefault
  );

  // subscribe dark mode
  useMount(() => {
    function enableDark(enable: boolean) {
      const body = document.body;
      if (enable) {
        body.setAttribute("theme-mode", "dark");
      } else {
        if (body.hasAttribute("theme-mode")) {
          body.removeAttribute("theme-mode");
        }
      }
      Pref.getInstance().darkModeEnabled.$.next(enable);
    }

    // @ts-ignore
    Pref.getInstance().theme.$.next(settings["appearance:theme"] as string);
    Pref.getInstance().theme.subscribe({
      next: (theme) => {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        switch (theme) {
          case "dark":
            enableDark(true);
            break;
          case "light":
            enableDark(false);
            break;
          default:
            enableDark(mql.matches);
            mql.addEventListener("change", (e) => {
              enableDark(e.matches);
            });
        }
      },
    });
  });

  useMount(() => {
    // @ts-ignore
    let tauri = window.__TAURI__;
    if (tauri) {
      tauri.invoke("get_system", {}).then((os: string) => {
        Pref.getInstance().osName.value = os;
      });
      tauri.path.appDir().then((s: any) => {
        console.log(s);
      });
      ["open-settings", "open-about", "open-help"].forEach((evt) => {
        tauri.event.listen(evt, (event: object) => {
          sharedSubsCtx.beEvent$.next(event);
        });
      });
    }
  });

  return (
    <BrowserRouter basename={window.location.pathname || ""}>
      <isTauriAppContext.Provider value={isTauri}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            {" "}
          </Route>
        </Routes>
      </isTauriAppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
