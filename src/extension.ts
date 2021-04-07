import * as net from 'net'
import { workspace, ExtensionContext, window, WorkspaceConfiguration } from 'vscode';
import registerCommands from './commands';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;


function useLanguageServerOverTCP(host: string, port: number): ServerOptions {
	return () => {
		return new Promise((resolve, reject) => {
			const clientSocket = new net.Socket();
			clientSocket.connect(port, host, () => {
				resolve({
					reader: clientSocket,
					writer: clientSocket,
				});
			});
		});
	};
}

function useLanguageServerOverStdio(pythonPath: string): ServerOptions {
	return {
		command: pythonPath,
		args: ['-m', 'pysen_ls', '--io'],
	};
}

function getPythonPath(config: WorkspaceConfiguration): string {
	let pythonPath = config.get<string>('pythonPath');
	if (pythonPath) {
		return pythonPath;
	}

	pythonPath = workspace.getConfiguration('python').get<string>('pythonPath');
	if (pythonPath) {
		return pythonPath;
	}

	return 'python3';
}

export function activate(context: ExtensionContext) {
	const config = workspace.getConfiguration('pysen.client');

	registerCommands(context);

	let serverOptions: ServerOptions;
	const connectionMode = config.get<string>('connectionMode');
	switch (connectionMode) {
		case 'stdio':
			const pythonPath = getPythonPath(config);
			console.log(`use '${pythonPath}' for the python path`);
			serverOptions = useLanguageServerOverStdio(pythonPath);
			break;
		case 'tcp':
			console.log(`use tcp`);
			serverOptions = useLanguageServerOverTCP(config.get<string>('tcpHost', '127.0.0.1'), config.get<number>('tcpPort', 3746));
			break;
		default:
			window.showErrorMessage(`unknown connection mode: ${connectionMode}`);
			return;
	}

	const serverConfig = workspace.getConfiguration('pysen.server');
	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'python' }],
		outputChannelName: 'pysen LanguageServer',
		initializationOptions: {'config': serverConfig},
	};

	client = new LanguageClient(
		'pysen language server',
		serverOptions,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
