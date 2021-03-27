# pysen-vscode

![](https://github.com/bonprosoft/pysen-vscode/blob/master/assets/imgs/pysen-vscode.gif?raw=true)

## Install

`pysen-ls` is required for the language server implementation.

```sh
$ pip install pysen-ls
```

## Commands

- Lint Current Document (`pysen.triggerLintDocument`)
- Lint Entire Workspace (`pysen.triggerLintWorkspace`)
- Format Current Document (`pysen.triggerFormatDocument`)
- Format Entire Workspace (`pysen.triggerFormatWorkspace`)
- Reload Server Configuration (`pysen.reloadServerConfiguration`)

## Settings

You can configure both client and server settings via Setting page in VSCode.
Keep in mind that you need to call `Reload Server Configuration` or restart the vscode instance if you change the server configuration.

#### pysen.client.connectionMode
Controls the communication method to pysen-ls.

- Value: choices
  - `stdio`: Use stdio to communicate with pysen-ls.
  - `tcp`: Use tcp to connect pysen-ls. You need to launch pysen-ls.

#### pysen.client.pythonPath
Specifies the python path to use pysen.

- Value: string

#### pysen.client.tcpHost
Specifies the host name to connect pysen-ls server. This setting only works with connectionMode is 'tcp'.

- Value: string

#### pysen.client.tcpPort
Specifies the port to connect pysen-ls server. This setting only works with connectionMode is 'tcp'.

- Value: number

#### pysen.server.enableLintOnSave
Controls whether to trigger the lint task on save.

- Value: boolean

#### pysen.server.enableCodeAction
Enable/disable code actions.

- Value: boolean

#### pysen.server.lintTargets
Controls target names for pysen to invoke in the lint task.

- Value: array of strings
- Default: `["lint"]`

#### pysen.server.formatTargets
Controls target names for pysen to invoke in the format task.

- Value: array of strings
- Default: `["format", "lint"]`
