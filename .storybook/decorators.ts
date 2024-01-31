import { MockInjector } from '@stories/stories/mocks';

/**
 * Default story decorator - just center the story and get rid of background
 */
export const DefaultDecorator = () => {
  MockInjector.init();
  return {
    name: 'StoryDefaultDecorator',
    template: `
        <div style="height:100%;display:flex;justify-content:center;">
            <story/>
        </div>`,
    i18n: MockInjector.i18n,
    mounted() {
      document.body.style.background = 'unset';
    },
  };
};

/**
 * Story decorator that takes the whole space
 */
export const FullSizeDecorator = () => {
  //MockInjector.init();
  return {
    name: 'StoryFullSizeDecorator',
    template: `
        <div style="width:100vw;height:100vh;background-color:aliceblue;display:flex;justify-content:center;">
            <story/>
        </div>`,
    //i18n: MockInjector.i18n,
  };
};

/**
 * Dashboard card story decorator
 */
export const DashboardCardDecorator = () => {
  return {
    name: 'StoryDashboardCardDecorator',
    template: `
      <div class="dashboard-container">
          <div class="grid">
              <div class="brick-size-2x2 item mx-4">
                  <div class="item-content">
                      <div class="dashboard-card">
                          <div class="h-100">
                              <div class="dashboard-card-title dashboard-drag-element">
                                  <i class="card-icon icon-cards-map noDrag"></i>&nbsp;
                                  <div class="text-truncate card-title-label" style="text-align: left;">Title</div>
                                  <div>
                                      <i class="card-hide-button fa fa-times noDrag"/>
                                  </div>
                              </div>
                              <div class="content-panel-container">
                                  <div class="w-100 h-100">
                                      <story/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>`,
    //i18n: MockInjector.i18n,
  };
};
/*
export const MapDecorator = () => {
  return {
    name: 'StoryMapDecorator',
    components: {
      SimpleMapPanel,
      MapLegendCard,
      MapControls,
      BusyIndicator,
    },
    template: `
      <SimpleMapPanel>
          <BusyIndicator />
          <template #layer-controls="{ setExpanded }">
              <MapLegendCard @collapse="setExpanded(!$event)" style="width: 240px; height: 100%"/>
          </template>
          <template #map-controls>
              <MapControls :search="true"/>
          </template>
          <story/>
      </SimpleMapPanel>`,
    i18n: MockInjector.i18n,
  };
};
*/
