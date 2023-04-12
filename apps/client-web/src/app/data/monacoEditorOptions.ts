export const MonacoEditorOptions = {
	ReadOnly: (lang: string, theme = 'vs-light') => {
		return {
			theme: theme,
			wordWrap: 'on',
			readOnly: true,
			contextmenu: false,
			language: lang,
			automaticLayout: true,
			lineNumbers: 'off',
			minimap: { enabled: false },
			scrollBeyondLastLine: false,
		};
	},
};
