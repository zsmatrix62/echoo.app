import "./App.scss";
import { MainPage } from "./app/pages/main-page";
import { useMount } from "react-use";
import { createContext, useContext, useState } from "react";
import { SharedSubjectContext } from "./app/context/shared-subjects";
import { useObservableState } from "observable-hooks";
import { Pref } from "./app/context/pref";
import { useLocalStore } from "./app/libs/hooks/localstore";
import { EchooSettings, EchooSettingsDefault } from "./app/shared/setting";
import { FirstLanchingModal } from "./app/shared/first-lanching-dialog";
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import { LocaleProvider } from '@douyinfe/semi-ui';
export const isTauriAppContext = createContext(false);

function App() {
	const sharedSubsCtx = useContext(SharedSubjectContext);
	// const appEnvs = useContext(AppEnvsContext)
	const [isTauri, setIsTauri] = useObservableState((obs) => {
		return obs;
	}, false);

	const p = Pref.getInstance();
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
		setIsTauri(!!window.__TAURI__);
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
			p.darkModeEnabled.$.next(enable);
		}

		// @ts-ignore
		p.theme.$.next(settings["appearance:theme"] as string);
		p.theme.subscribe({
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

	// notify user to allow analytics
	let [showFirstLanchingDialog, setShowFirstLanchingDialog] = useState(false)
	useMount(() => {
		p.isFirstLanching.$.subscribe(yes => {
			setShowFirstLanchingDialog(yes)
		})
		p.allowAnalytics.$.subscribe(yes => {
			if (yes) {
				injectAnalyticsCodes()
			}
		})
	})

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

	const injectAnalyticsCodes = () => {
		const h = document.getElementsByTagName("head")[0]
		const body = document.getElementsByTagName("body")[0]

		const ga_s = document.createElement("script")
		const gs_ss = document.createElement("script")
		ga_s.src = "https://www.googletagmanager.com/gtag/js?id=G-68ZK6XEPVH"
		ga_s.async = true
		gs_ss.innerHTML = `
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		};
		gtag('js', new Date());
		gtag('config', 'G-68ZK6XEPVH');
		`
		const tag_mgr_head = document.createElement("script")
		tag_mgr_head.innerHTML = `
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
													 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		 })(window,document,'script','dataLayer','GTM-N9NMZCN');
		`
		const ns = body.getElementsByTagName("noscript")[0]
		const f = document.createElement("iframe")
		f.src = "https://www.googletagmanager.com/ns.html?id=GTM-N9NMZCN"
		f.height = "0"
		f.width = "0"
		f.style.display = "none"
		f.style.visibility = "hidden"
		ns.appendChild(f)

		h.appendChild(ga_s)
		h.appendChild(gs_ss)
		h.appendChild(tag_mgr_head)

	}

	return (
		<>
			{showFirstLanchingDialog &&
				<FirstLanchingModal onVisibleChange={(v: any) => {
					const p = Pref.getInstance();
					p.allowAnalytics.value = v["allow-analytics"]
					p.isFirstLanching.value = false
					setShowFirstLanchingDialog(false)
				}} />}
			<isTauriAppContext.Provider value={isTauri}>
				<LocaleProvider locale={en_GB}>
					<MainPage />
				</LocaleProvider>
			</isTauriAppContext.Provider>
		</>
	);
}

export default App;
