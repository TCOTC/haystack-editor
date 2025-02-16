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
import { resolveWorkbenchCommonProperties } from "vs/workbench/services/telemetry/browser/workbenchCommonProperties"
import { InMemoryStorageService } from "vs/platform/storage/common/storage"
import { ensureNoDisposablesAreLeakedInTestSuite } from "vs/base/test/common/utils"

suite("Browser Telemetry - common properties", function () {
  const commit: string = undefined!
  const version: string = undefined!
  let testStorageService: InMemoryStorageService

  teardown(() => {
    testStorageService.dispose()
  })

  ensureNoDisposablesAreLeakedInTestSuite()

  setup(() => {
    testStorageService = new InMemoryStorageService()
  })

  test("mixes in additional properties", async function () {
    const resolveCommonTelemetryProperties = () => {
      return {
        userId: "1",
      }
    }

    const props = resolveWorkbenchCommonProperties(
      testStorageService,
      commit,
      version,
      false,
      undefined,
      undefined,
      false,
      resolveCommonTelemetryProperties,
    )

    assert.ok("commitHash" in props)
    assert.ok("sessionID" in props)
    assert.ok("timestamp" in props)
    assert.ok("common.platform" in props)
    assert.ok("common.timesincesessionstart" in props)
    assert.ok("common.sequence" in props)
    assert.ok("version" in props)
    assert.ok("common.firstSessionDate" in props, "firstSessionDate")
    assert.ok("common.lastSessionDate" in props, "lastSessionDate")
    assert.ok("common.isNewSession" in props, "isNewSession")
    assert.ok("common.machineId" in props, "machineId")

    assert.strictEqual(props["userId"], "1")
  })

  test("mixes in additional dyanmic properties", async function () {
    let i = 1
    const resolveCommonTelemetryProperties = () => {
      return Object.defineProperties(
        {},
        {
          userId: {
            get: () => {
              return i++
            },
            enumerable: true,
          },
        },
      )
    }

    const props = resolveWorkbenchCommonProperties(
      testStorageService,
      commit,
      version,
      false,
      undefined,
      undefined,
      false,
      resolveCommonTelemetryProperties,
    )
    assert.strictEqual(props["userId"], 1)

    const props2 = resolveWorkbenchCommonProperties(
      testStorageService,
      commit,
      version,
      false,
      undefined,
      undefined,
      false,
      resolveCommonTelemetryProperties,
    )
    assert.strictEqual(props2["userId"], 2)
  })
})
