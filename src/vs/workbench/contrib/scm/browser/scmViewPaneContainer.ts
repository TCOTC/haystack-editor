/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import "vs/css!./media/scm"
import { localize } from "vs/nls"
import { ITelemetryService } from "vs/platform/telemetry/common/telemetry"
import {
  ISCMViewService,
  VIEWLET_ID,
} from "vs/workbench/contrib/scm/common/scm"
import { IInstantiationService } from "vs/platform/instantiation/common/instantiation"
import { IContextMenuService } from "vs/platform/contextview/browser/contextView"
import { IThemeService } from "vs/platform/theme/common/themeService"
import { IStorageService } from "vs/platform/storage/common/storage"
import { IConfigurationService } from "vs/platform/configuration/common/configuration"
import { IWorkbenchLayoutService } from "vs/workbench/services/layout/browser/layoutService"
import { IExtensionService } from "vs/workbench/services/extensions/common/extensions"
import { IWorkspaceContextService } from "vs/platform/workspace/common/workspace"
import { IViewDescriptorService } from "vs/workbench/common/views"
import { ViewPaneContainer } from "vs/workbench/browser/parts/views/viewPaneContainer"

export class SCMViewPaneContainer extends ViewPaneContainer {
  constructor(
    @ISCMViewService private readonly scmViewService: ISCMViewService,
    @IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
    @ITelemetryService telemetryService: ITelemetryService,
    @IInstantiationService instantiationService: IInstantiationService,
    @IContextMenuService contextMenuService: IContextMenuService,
    @IThemeService themeService: IThemeService,
    @IStorageService storageService: IStorageService,
    @IConfigurationService configurationService: IConfigurationService,
    @IExtensionService extensionService: IExtensionService,
    @IWorkspaceContextService contextService: IWorkspaceContextService,
    @IViewDescriptorService viewDescriptorService: IViewDescriptorService,
  ) {
    super(
      VIEWLET_ID,
      { mergeViewWithContainerWhenSingleView: true },
      instantiationService,
      configurationService,
      layoutService,
      contextMenuService,
      telemetryService,
      extensionService,
      themeService,
      storageService,
      contextService,
      viewDescriptorService,
    )
  }

  override create(parent: HTMLElement): void {
    super.create(parent)
    parent.classList.add("scm-viewlet")
  }

  override getOptimalWidth(): number {
    return 400
  }

  override getTitle(): string {
    return localize("source control", "Source Control")
  }

  override getActionsContext(): unknown {
    return this.scmViewService.visibleRepositories.length === 1
      ? this.scmViewService.visibleRepositories[0].provider
      : undefined
  }
}
