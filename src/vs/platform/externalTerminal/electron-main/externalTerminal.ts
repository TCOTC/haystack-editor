/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IExternalTerminalService } from "vs/platform/externalTerminal/common/externalTerminal"
import { createDecorator } from "vs/platform/instantiation/common/instantiation"

export const IExternalTerminalMainService =
  createDecorator<IExternalTerminalMainService>("externalTerminal")

export interface IExternalTerminalMainService extends IExternalTerminalService {
  readonly _serviceBrand: undefined
}
