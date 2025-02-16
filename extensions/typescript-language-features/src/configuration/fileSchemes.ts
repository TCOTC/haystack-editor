/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode"
import { isWeb } from "../utils/platform"

export const file = "file"
export const untitled = "untitled"
export const git = "git"
export const github = "github"
export const azurerepos = "azurerepos"

/** Live share scheme */
export const vsls = "vsls"
export const walkThroughSnippet = "walkThroughSnippet"
export const vscodeNotebookCell = "vscode-notebook-cell"
export const officeScript = "office-script"

/** Used for code blocks in chat by vs code core */
export const chatCodeBlock = "vscode-chat-code-block"

/** Used for code blocks in chat by copilot. */
export const chatBackingCodeBlock = "vscode-copilot-chat-code-block"

export function getSemanticSupportedSchemes() {
  if (isWeb() && vscode.workspace.workspaceFolders) {
    return vscode.workspace.workspaceFolders.map((folder) => folder.uri.scheme)
  }

  return [
    file,
    untitled,
    walkThroughSnippet,
    vscodeNotebookCell,
    chatCodeBlock,
    chatBackingCodeBlock,
  ]
}

/**
 * File scheme for which JS/TS language feature should be disabled
 */
export const disabledSchemes = new Set([git, vsls, github, azurerepos])

export function isOfScheme(uri: vscode.Uri, ...schemes: string[]): boolean {
  const normalizedUriScheme = uri.scheme.toLowerCase()
  return schemes.some((scheme) => normalizedUriScheme === scheme)
}
