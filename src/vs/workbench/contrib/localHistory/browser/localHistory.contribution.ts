/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import "vs/workbench/contrib/localHistory/browser/localHistoryCommands"
import {
  WorkbenchPhase,
  registerWorkbenchContribution2,
} from "vs/workbench/common/contributions"
import { LocalHistoryTimeline } from "vs/workbench/contrib/localHistory/browser/localHistoryTimeline"

// Register Local History Timeline
registerWorkbenchContribution2(
  LocalHistoryTimeline.ID,
  LocalHistoryTimeline,
  WorkbenchPhase.BlockRestore /* registrations only */,
)
