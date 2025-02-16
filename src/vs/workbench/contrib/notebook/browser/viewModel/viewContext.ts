/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IBaseCellEditorOptions } from "vs/workbench/contrib/notebook/browser/notebookBrowser"
import { NotebookEventDispatcher } from "vs/workbench/contrib/notebook/browser/viewModel/eventDispatcher"
import { NotebookOptions } from "vs/workbench/contrib/notebook/browser/notebookOptions"

export class ViewContext {
  constructor(
    readonly notebookOptions: NotebookOptions,
    readonly eventDispatcher: NotebookEventDispatcher,
    readonly getBaseCellEditorOptions: (
      language: string,
    ) => IBaseCellEditorOptions,
  ) {}
}
