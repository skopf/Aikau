model.jsonModel = {
   services: [
      {
         name: "alfresco/services/LoggingService",
         config: {
            loggingPreferences: {
               enabled: true,
               all: true
            }
         }
      },
      "alfresco/services/ErrorReporter"
   ],
   widgets:[
      {
         id: "INDICATORS1",
         name: "alfresco/renderers/Indicators",
         config: {
            currentItem: {
               node: {
                  nodeRef: "some://dummy/node",
                  properties: {
                     name: "Test"
                  }
               },
               indicators: [
                  {
                     "id": "exif",
                     "index": "40",
                     "icon": "exif-16.png",
                     "label": "status.exif"
                  },
                  {
                     "id": "geographic",
                     "index": "50",
                     "icon": "geographic-16.png",
                     "label": "status.geographic"
                  }, 
                  {
                     "id": "cloud-indirect-sync",
                     "index": "90",
                     "icon": "not-in-white-list-16.png",
                     "label": "status.cloud-indirect-sync",
                     "overrides": ["exif"],
                     "action": "onCloudIndirectSyncIndicatorAction"
                  },
                  {
                     "id": "bob",
                     "index": "10",
                     "icon": "locked-16.png",
                     "label": "Not translated",
                     "action": "custom",
                     "publishTopic": "CUSTOM_ACTION",
                     "publishPayload": {}
                  }
               ]
            }
         }
      }, 
      {
         id: "ITEM3",
         name: "alfresco/renderers/Indicators",
         config: {}
      },
      {
         id: "INDICATORS3",
         name: "alfresco/renderers/Indicators",
         config: {
            legacyMode: true,
            iconMapping: {
               "custom-icon": "some/custom/image.jpg"
            },
            currentItem: {
               node: {
                  nodeRef: "some://dummy/node",
                  properties: {
                     name: "Test"
                  }
               },
               indicators: [
                  {
                     "id": "exif",
                     "index": "40",
                     "icon": "exif-16.png",
                     "label": "status.exif"
                  },
                  {
                     "id": "custom",
                     "index": "40",
                     "icon": "custom-icon",
                     "label": "status.exif"
                  }
               ]
            }
         }
      },
      {
         name: "alfresco/logging/DebugLog"
      }
   ]
};