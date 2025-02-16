/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter, Event } from "vs/base/common/event"

class TabFocusImpl {
  private _tabFocus: boolean = false
  private readonly _onDidChangeTabFocus = new Emitter<boolean>()
  public readonly onDidChangeTabFocus: Event<boolean> =
    this._onDidChangeTabFocus.event

  public getTabFocusMode(): boolean {
    return this._tabFocus
  }

  public setTabFocusMode(tabFocusMode: boolean): void {
    this._tabFocus = tabFocusMode
    this._onDidChangeTabFocus.fire(this._tabFocus)
  }
}

/**
 * Control what pressing Tab does.
 * If it is false, pressing Tab or Shift-Tab will be handled by the editor.
 * If it is true, pressing Tab or Shift-Tab will move the browser focus.
 * Defaults to false.
 */
export const TabFocus = new TabFocusImpl()
