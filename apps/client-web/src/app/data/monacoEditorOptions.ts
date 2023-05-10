import type { JoinedEditorOptions } from 'ng-zorro-antd/code-editor';

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

export const MonacoEditorOptionsZorror = {
	ReadOnly: (lang: string, theme = 'vs-light'): JoinedEditorOptions => {
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
