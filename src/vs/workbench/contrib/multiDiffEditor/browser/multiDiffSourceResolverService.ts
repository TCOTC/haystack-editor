/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BugIndicatingError } from "vs/base/common/errors"
import { IValueWithChangeEvent } from "vs/base/common/event"
import { IDisposable, toDisposable } from "vs/base/common/lifecycle"
import { URI } from "vs/base/common/uri"
import { ContextKeyValue } from "vs/platform/contextkey/common/contextkey"
import { createDecorator } from "vs/platform/instantiation/common/instantiation"

export const IMultiDiffSourceResolverService =
  createDecorator<IMultiDiffSourceResolverService>(
    "multiDiffSourceResolverService",
  )

export interface IMultiDiffSourceResolverService {
  readonly _serviceBrand: undefined

  registerResolver(resolver: IMultiDiffSourceResolver): IDisposable

  resolve(uri: URI): Promise<IResolvedMultiDiffSource | undefined>
}

export interface IMultiDiffSourceResolver {
  canHandleUri(uri: URI): boolean

  resolveDiffSource(uri: URI): Promise<IResolvedMultiDiffSource>
}

export interface IResolvedMultiDiffSource {
  readonly resources: IValueWithChangeEvent<readonly MultiDiffEditorItem[]>
  readonly contextKeys?: Record<string, ContextKeyValue>
}

export class MultiDiffEditorItem {
  constructor(
    readonly original: URI | undefined,
    readonly modified: URI | undefined,
  ) {
    if (!original && !modified) {
      throw new BugIndicatingError("Invalid arguments")
    }
  }

  getKey(): string {
    return JSON.stringify([
      this.modified?.toString(),
      this.original?.toString(),
    ])
  }
}

export class MultiDiffSourceResolverService
  implements IMultiDiffSourceResolverService
{
  public readonly _serviceBrand: undefined

  private readonly _resolvers = new Set<IMultiDiffSourceResolver>()

  registerResolver(resolver: IMultiDiffSourceResolver): IDisposable {
    // throw on duplicate
    if (this._resolvers.has(resolver)) {
      throw new BugIndicatingError("Duplicate resolver")
    }
    this._resolvers.add(resolver)
    return toDisposable(() => this._resolvers.delete(resolver))
  }

  resolve(uri: URI): Promise<IResolvedMultiDiffSource | undefined> {
    for (const resolver of this._resolvers) {
      if (resolver.canHandleUri(uri)) {
        return resolver.resolveDiffSource(uri)
      }
    }
    return Promise.resolve(undefined)
  }
}
