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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const ansiColors = require("ansi-colors");
const root = path.dirname(path.dirname(__dirname));
const rootCG = path.join(root, "extensionsCG");
const productjson = JSON.parse(fs.readFileSync(path.join(__dirname, "../../product.json"), "utf8"));
const builtInExtensions = productjson.builtInExtensions || [];
const webBuiltInExtensions = productjson.webBuiltInExtensions || [];
const token = process.env["GITHUB_TOKEN"];
const contentBasePath = "raw.githubusercontent.com";
const contentFileNames = ["package.json", "package-lock.json", "yarn.lock"];
async function downloadExtensionDetails(extension) {
    const extensionLabel = `${extension.name}@${extension.version}`;
    const repository = url.parse(extension.repo).path.substr(1);
    const repositoryContentBaseUrl = `https://${token ? `${token}@` : ""}${contentBasePath}/${repository}/v${extension.version}`;
    async function getContent(fileName) {
        try {
            const response = await fetch(`${repositoryContentBaseUrl}/${fileName}`);
            if (response.ok) {
                return { fileName, body: Buffer.from(await response.arrayBuffer()) };
            }
            else if (response.status === 404) {
                return { fileName, body: undefined };
            }
            else {
                return { fileName, body: null };
            }
        }
        catch (e) {
            return { fileName, body: null };
        }
    }
    const promises = contentFileNames.map(getContent);
    console.log(extensionLabel);
    const results = await Promise.all(promises);
    for (const result of results) {
        if (result.body) {
            const extensionFolder = path.join(rootCG, extension.name);
            fs.mkdirSync(extensionFolder, { recursive: true });
            fs.writeFileSync(path.join(extensionFolder, result.fileName), result.body);
            console.log(`  - ${result.fileName} ${ansiColors.green("✔︎")}`);
        }
        else if (result.body === undefined) {
            console.log(`  - ${result.fileName} ${ansiColors.yellow("⚠️")}`);
        }
        else {
            console.log(`  - ${result.fileName} ${ansiColors.red("🛑")}`);
        }
    }
    // Validation
    if (!results.find((r) => r.fileName === "package.json")?.body) {
        // throw new Error(`The "package.json" file could not be found for the built-in extension - ${extensionLabel}`);
    }
    if (!results.find((r) => r.fileName === "package-lock.json")?.body &&
        !results.find((r) => r.fileName === "yarn.lock")?.body) {
        // throw new Error(`The "package-lock.json"/"yarn.lock" could not be found for the built-in extension - ${extensionLabel}`);
    }
}
async function main() {
    for (const extension of [...builtInExtensions, ...webBuiltInExtensions]) {
        await downloadExtensionDetails(extension);
    }
}
main().then(() => {
    console.log(`Built-in extensions component data downloaded ${ansiColors.green("✔︎")}`);
    process.exit(0);
}, (err) => {
    console.log(`Built-in extensions component data could not be downloaded ${ansiColors.red("🛑")}`);
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=builtInExtensionsCG.js.map