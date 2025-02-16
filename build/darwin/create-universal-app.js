"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the Functional Source License. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const vscode_universal_bundler_1 = require("vscode-universal-bundler");
const cross_spawn_promise_1 = require("@malept/cross-spawn-promise");
const root = path.dirname(path.dirname(__dirname));
async function main(buildDir) {
    const arch = process.env["VSCODE_ARCH"];
    if (!buildDir) {
        throw new Error("Build dir not provided");
    }
    const product = JSON.parse(fs.readFileSync(path.join(root, "product.json"), "utf8"));
    const appName = product.nameLong + ".app";
    const x64AppPath = path.join(buildDir, "VSCode-darwin-x64", appName);
    const arm64AppPath = path.join(buildDir, "VSCode-darwin-arm64", appName);
    const x64AsarPath = path.join(x64AppPath, "Contents", "Resources", "app", "node_modules.asar");
    const arm64AsarPath = path.join(arm64AppPath, "Contents", "Resources", "app", "node_modules.asar");
    const outAppPath = path.join(buildDir, `VSCode-darwin-${arch}`, appName);
    const productJsonPath = path.resolve(outAppPath, "Contents", "Resources", "app", "product.json");
    await (0, vscode_universal_bundler_1.makeUniversalApp)({
        x64AppPath,
        arm64AppPath,
        x64AsarPath,
        arm64AsarPath,
        filesToSkip: [
            "product.json",
            "Credits.rtf",
            "CodeResources",
            "fsevents.node",
            "Info.plist", // TODO@deepak1556: regressed with 11.4.2 internal builds
            "MainMenu.nib", // Generated sequence is not deterministic with Xcode 13
            ".npmrc",
        ],
        outAppPath,
        force: true,
    });
    const productJson = JSON.parse(fs.readFileSync(productJsonPath, "utf8"));
    Object.assign(productJson, {
        darwinUniversalAssetId: "darwin-universal",
    });
    fs.writeFileSync(productJsonPath, JSON.stringify(productJson, null, "\t"));
    // Verify if native module architecture is correct
    const findOutput = await (0, cross_spawn_promise_1.spawn)("find", [outAppPath, "-name", "kerberos.node"]);
    const lipoOutput = await (0, cross_spawn_promise_1.spawn)("lipo", [
        "-archs",
        findOutput.replace(/\n$/, ""),
    ]);
    if (lipoOutput.replace(/\n$/, "") !== "x86_64 arm64") {
        throw new Error(`Invalid arch, got : ${lipoOutput}`);
    }
}
if (require.main === module) {
    main(process.argv[2]).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
//# sourceMappingURL=create-universal-app.js.map