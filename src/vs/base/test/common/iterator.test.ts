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
import { Iterable } from "vs/base/common/iterator"
import { ensureNoDisposablesAreLeakedInTestSuite } from "vs/base/test/common/utils"

suite("Iterable", function () {
  ensureNoDisposablesAreLeakedInTestSuite()

  const customIterable = new (class {
    *[Symbol.iterator]() {
      yield "one"
      yield "two"
      yield "three"
    }
  })()

  test("first", function () {
    assert.strictEqual(Iterable.first([]), undefined)
    assert.strictEqual(Iterable.first([1]), 1)
    assert.strictEqual(Iterable.first(customIterable), "one")
    assert.strictEqual(Iterable.first(customIterable), "one") // fresh
  })

  test("wrap", function () {
    assert.deepStrictEqual([...Iterable.wrap(1)], [1])
    assert.deepStrictEqual([...Iterable.wrap([1, 2, 3])], [1, 2, 3])
  })
})
