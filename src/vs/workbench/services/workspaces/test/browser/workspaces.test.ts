/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from "assert"
import { URI } from "vs/base/common/uri"
import { ensureNoDisposablesAreLeakedInTestSuite } from "vs/base/test/common/utils"
import {
  getWorkspaceIdentifier,
  getSingleFolderWorkspaceIdentifier,
} from "vs/workbench/services/workspaces/browser/workspaces"

suite("Workspaces", () => {
  test("workspace identifiers are stable", function () {
    // workspace identifier
    assert.strictEqual(
      getWorkspaceIdentifier(URI.parse("vscode-remote:/hello/test")).id,
      "474434e4",
    )

    // single folder identifier
    assert.strictEqual(
      getSingleFolderWorkspaceIdentifier(URI.parse("vscode-remote:/hello/test"))
        ?.id,
      "474434e4",
    )
  })

  ensureNoDisposablesAreLeakedInTestSuite()
})
