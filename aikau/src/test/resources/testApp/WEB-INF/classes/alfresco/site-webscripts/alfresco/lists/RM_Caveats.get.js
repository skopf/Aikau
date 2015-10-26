/* global model*/
model.jsonModel = {
   services: [
      {
         name: "alfresco/services/LoggingService",
         config: {
            loggingPreferences: {
               enabled: true,
               all: true,
               warn: true,
               error: true
            }
         }
      },
      "alfresco/services/CrudService",
      "alfresco/services/DialogService"
   ],
   widgets:[
      {
         name: "alfresco/documentlibrary/AlfBreadcrumbTrail",
         config: {
            breadcrumbs: [
               {
                  label: "Admin Tools"
               },
               {
                  label: "Caveat Marks"
               }
            ]
         }
      },
      {
         name: "alfresco/layout/TitleDescriptionAndContent",
         config: {
            title: "Caveats and Security Marks",
            description: "Meaningful short description of marks and their use...",
            widgets: [

            ]
         }
      },
      {
         name: "alfresco/menus/AlfMenuBar",
         config: {
            widgets: [
               {
                  name: "alfresco/menus/AlfMenuBarItem",
                  config: {
                     label: "Add caveat",
                     publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
                     publishPayload: {
                        dialogId: "CREATE_CAVEAT",
                        dialogTitle: "Create a new caveat",
                        formSubmissionTopic: "ALF_CRUD_CREATE",
                        formSubmissionPayloadMixin: {
                           url: "addCaveat"
                        },
                        formSubmissionGlobal: true,
                        widgets: [
                           {
                              name: "alfresco/forms/controls/TextBox",
                              config: {
                                 name: "name",
                                 label: "Caveat",
                                 value: "",
                                 requirementConfig: {
                                    initialValue: true
                                 }
                              }
                           }
                        ]
                     }
                  }
               }
            ]
         }
      },
      {
         name: "alfresco/lists/AlfList",
         config: {
            loadDataPublishTopic: "ALF_CRUD_GET_ALL",
            loadDataPublishPayload: {
               url: "getAllCaveats"
            },
            widgets: [
               {
                  name: "alfresco/lists/views/AlfListView",
                  config: {
                     widgets: [
                        {
                           name: "alfresco/lists/views/layouts/Row",
                           config: {
                              widgets: [
                                 {
                                    name: "alfresco/lists/views/layouts/Cell",
                                    config: {
                                       widgets: [
                                          {
                                             name: "alfresco/renderers/PropertyLink",
                                             config: {
                                                propertyToRender: "name",
                                                useCurrentItemAsPayload: false,
                                                publishTopic: "ALF_CREATE_DIALOG_REQUEST",
                                                publishPayloadType: "PROCESS",
                                                publishPayloadModifiers: ["processCurrentItemTokens"],
                                                publishPayload: {
                                                   dialogId: "EDIT_CAVEAT",
                                                   dialogTitle: "Edit caveat",
                                                   widgetsContent: [
                                                      {
                                                         name: "alfresco/menus/AlfMenuBar",
                                                         config: {
                                                            pubSubScope: "MARKS_",
                                                            widgets: [
                                                               {
                                                                  name: "alfresco/menus/AlfMenuBarItem",
                                                                  config: {
                                                                     label: "Add security mark",
                                                                     publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
                                                                     publishGlobal: true,
                                                                     publishPayload: {
                                                                        dialogId: "CREATE_MARK",
                                                                        dialogTitle: "Create a new security mark",
                                                                        formSubmissionTopic: "ALF_CRUD_CREATE",
                                                                        formSubmissionPayloadMixin: {
                                                                           url: "addSecurityMark",
                                                                           caveat: "{id}"
                                                                        },
                                                                        formSubmissionGlobal: true,
                                                                        widgets: [
                                                                           {
                                                                              name: "alfresco/forms/controls/TextBox",
                                                                              config: {
                                                                                 name: "name",
                                                                                 label: "Mark Name",
                                                                                 value: "",
                                                                                 visibilityConfig: {
                                                                                    initialValue: true
                                                                                 },
                                                                                 requirementConfig: {
                                                                                    initialValue: true
                                                                                 }
                                                                              }
                                                                           }
                                                                        ]
                                                                     }
                                                                  }
                                                               }
                                                            ]
                                                         }
                                                      },
                                                      {
                                                         name: "alfresco/lists/AlfList",
                                                         config: {
                                                            pubSubScope: "MARKS_",
                                                            loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                                                            loadDataPublishPayload: {
                                                               url: "getAllSecurityMarks?caveat={id}"
                                                            },
                                                            widgets: [
                                                               {
                                                                  name: "alfresco/lists/views/AlfListView",
                                                                  config: {
                                                                     widgets: [
                                                                        {
                                                                           name: "alfresco/lists/views/layouts/Row",
                                                                           config: {
                                                                              widgets: [
                                                                                 {
                                                                                    name: "alfresco/lists/views/layouts/Cell",
                                                                                    config: {
                                                                                       widgets: [
                                                                                          {
                                                                                             name: "alfresco/renderers/Property",
                                                                                             config: {
                                                                                                propertyToRender: "name"
                                                                                             }
                                                                                          }
                                                                                       ]
                                                                                    }
                                                                                 }
                                                                              ]
                                                                           }
                                                                        }
                                                                     ]
                                                                  }
                                                               }
                                                            ]
                                                         }
                                                      }
                                                   ]
                                                }
                                             }
                                          }
                                       ]
                                    }
                                 }
                              ]
                           }
                        }
                     ]
                  }
               }
            ]
         }
      },
      {
         name: "aikauTesting/mockservices/RMSecurityMockXhr"
      },
      {
         name: "alfresco/logging/DebugLog"
      }
   ]
};