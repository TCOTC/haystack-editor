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
import * as uuid from "vs/base/common/uuid"
import { ensureNoDisposablesAreLeakedInTestSuite } from "vs/base/test/common/utils"

suite("UUID", () => {
  ensureNoDisposablesAreLeakedInTestSuite()

  test("generation", () => {
    const asHex = uuid.generateUuid()
    assert.strictEqual(asHex.length, 36)
    assert.strictEqual(asHex[14], "4")
    assert.ok(
      asHex[19] === "8" ||
        asHex[19] === "9" ||
        asHex[19] === "a" ||
        asHex[19] === "b",
    )
  })

  test("self-check", function () {
    const t1 = Date.now()
    while (Date.now() - t1 < 50) {
      const value = uuid.generateUuid()
      assert.ok(uuid.isUUID(value))
    }
  })
})
