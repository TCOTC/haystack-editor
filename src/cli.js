/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check
"use strict"

// Delete `HAYSTACK_CWD` very early even before
// importing bootstrap files. We have seen
// reports where `code .` would use the wrong
// current working directory due to our variable
// somehow escaping to the parent shell
// (https://github.com/microsoft/vscode/issues/126399)
delete process.env["HAYSTACK_CWD"]

const bootstrap = require("./bootstrap")
const bootstrapNode = require("./bootstrap-node")
const product = require("../product.json")

// Enable portable support
// @ts-ignore
bootstrapNode.configurePortable(product)

// Enable ASAR support
bootstrap.enableASARSupport()

// Signal processes that we got launched as CLI
process.env["HAYSTACK_CLI"] = "1"

// Load CLI through AMD loader
require("./bootstrap-amd").load("vs/code/node/cli")
