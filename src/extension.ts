import * as vscode from 'vscode';

// Include your custom Arma 3 language ID here
const supportedLanguages = [
  'javascript',
  'typescript',
  'json',
  'python',
  'sqf' // custom defined in package.json
];

export function activate(context: vscode.ExtensionContext) {
  const formatter = vscode.languages.registerDocumentFormattingEditProvider(supportedLanguages, {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
      const edits: vscode.TextEdit[] = [];

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const original = line.text;

        const formatted = original
          .trim()
          .replace(/\s*=\s*/g, ' = ')
          .replace(/\s*;\s*/g, '; ')
          .replace(/\s*{\s*/g, ' { ')
          .replace(/\s*}\s*/g, ' } ')
          .replace(/ {2,}/g, ' ')
          .replace(/\s+$/, '');

        if (original !== formatted) {
          edits.push(vscode.TextEdit.replace(
            new vscode.Range(i, 0, i, original.length),
            formatted
          ));
        }
      }

      return edits;
    }
  });

  context.subscriptions.push(formatter);
}

export function deactivate() {}
