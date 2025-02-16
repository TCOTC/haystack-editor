/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LegacyLinesDiffComputer } from "vs/editor/common/diff/legacyLinesDiffComputer"
import { DefaultLinesDiffComputer } from "vs/editor/common/diff/defaultLinesDiffComputer/defaultLinesDiffComputer"
import { ILinesDiffComputer } from "vs/editor/common/diff/linesDiffComputer"

export const linesDiffComputers = {
  getLegacy: () => new LegacyLinesDiffComputer(),
  getDefault: () => new DefaultLinesDiffComputer(),
} satisfies Record<string, () => ILinesDiffComputer>
