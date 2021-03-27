import { commands, ExtensionContext, window } from 'vscode';

function invokeRemoteCommandWithActiveDocument(commandName: string) {
    const activeEditor = window.activeTextEditor;
    if (!activeEditor) {
        window.showErrorMessage('No document opened');
        return;
    }

    const activeDocument = activeEditor.document;
    commands.executeCommand(commandName, activeDocument.uri.toString());
}


export default function registerCommands(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand('pysen.triggerLintDocument', () => {
        invokeRemoteCommandWithActiveDocument('pysen.callLintDocument');
    }));

    context.subscriptions.push(commands.registerCommand('pysen.triggerFormatDocument', () => {
        invokeRemoteCommandWithActiveDocument('pysen.callFormatDocument');
    }));

    context.subscriptions.push(commands.registerCommand('pysen.triggerLintWorkspace', () => {
        commands.executeCommand('pysen.callLintWorkspace');
    }));

    context.subscriptions.push(commands.registerCommand('pysen.triggerFormatWorkspace', () => {
        commands.executeCommand('pysen.callFormatWorkspace');
    }));
}
