#!/usr/bin/env bash
#
# Copyright (c) Microsoft Corporation. All rights reserved.
#

if [[ "$OSTYPE" == "darwin"* ]]; then
	realpath() { [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"; }
	HAYSTACK_PATH=$(dirname $(dirname $(dirname $(dirname $(dirname $(realpath "$0"))))))
else
	HAYSTACK_PATH=$(dirname $(dirname $(dirname $(dirname $(dirname $(readlink -f $0))))))
fi

PROD_NAME="Code Server - Dev"
VERSION=""
COMMIT=""
EXEC_NAME="$(basename "$(test -L "$0" && readlink "$0" || echo "$0")")"
CLI_SCRIPT="$HAYSTACK_PATH/out/server-cli.js"
node "$CLI_SCRIPT" "$PROD_NAME" "$VERSION" "$COMMIT" "$EXEC_NAME" "$@"
