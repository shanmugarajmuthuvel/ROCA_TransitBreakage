import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { Provider } from "react-redux";
import type { Store } from "@reduxjs/toolkit";

import * as strings from "TransitBreakageWebPartStrings";
import TransitBreakage from "./components/TransitBreakage";
import type { ITransitBreakageProps } from "./components/ITransitBreakageProps";
import { ServiceLocator } from "../../shared/services/ServiceLocator";
import { configureAppStore } from "./store";

export interface ITransitBreakageWebPartProps {
  description: string;
}

export default class TransitBreakageWebPart extends BaseClientSideWebPart<ITransitBreakageWebPartProps> {
  private _store!: Store;

  public async onInit(): Promise<void> {
    await super.onInit();
    this._store = configureAppStore();
    ServiceLocator.init(this.context);
  }

  public render(): void {
    const element: React.ReactElement<ITransitBreakageProps> = React.createElement(
      TransitBreakage,
      {
        description: this.properties.description,
        context: this.context,
      }
    );

    ReactDom.render(
      React.createElement(Provider, { store: this._store, children: element }),
      this.domElement
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
