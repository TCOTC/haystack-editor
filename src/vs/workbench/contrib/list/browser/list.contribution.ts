/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IContextKeyService } from "vs/platform/contextkey/common/contextkey"
import {
  IWorkbenchContribution,
  WorkbenchPhase,
  registerWorkbenchContribution2,
} from "vs/workbench/common/contributions"

export class ListContext implements IWorkbenchContribution {
  static readonly ID = "workbench.contrib.listContext"

  constructor(@IContextKeyService contextKeyService: IContextKeyService) {
    contextKeyService.createKey<boolean>("listSupportsTypeNavigation", true)

    // @deprecated in favor of listSupportsTypeNavigation
    contextKeyService.createKey("listSupportsKeyboardNavigation", true)
  }
}

registerWorkbenchContribution2(
  ListContext.ID,
  ListContext,
  WorkbenchPhase.BlockStartup,
)
