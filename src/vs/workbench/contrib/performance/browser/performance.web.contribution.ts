/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LifecyclePhase } from "vs/workbench/services/lifecycle/common/lifecycle"
import { Registry } from "vs/platform/registry/common/platform"
import {
  Extensions,
  IWorkbenchContributionsRegistry,
} from "vs/workbench/common/contributions"
import {
  BrowserResourcePerformanceMarks,
  BrowserStartupTimings,
} from "vs/workbench/contrib/performance/browser/startupTimings"

// -- startup timings

Registry.as<IWorkbenchContributionsRegistry>(
  Extensions.Workbench,
).registerWorkbenchContribution(
  BrowserResourcePerformanceMarks,
  LifecyclePhase.Eventually,
)

Registry.as<IWorkbenchContributionsRegistry>(
  Extensions.Workbench,
).registerWorkbenchContribution(
  BrowserStartupTimings,
  LifecyclePhase.Eventually,
)
