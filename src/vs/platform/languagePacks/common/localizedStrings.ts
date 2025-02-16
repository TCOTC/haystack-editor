/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from "vs/nls"

/**
 * These are some predefined strings that we test during smoke testing that they are localized
 * correctly. Don't change these strings!!
 */

const open: string = nls.localize("open", "open")
const close: string = nls.localize("close", "close")
const find: string = nls.localize("find", "find")

export default {
  open: open,
  close: close,
  find: find,
}
