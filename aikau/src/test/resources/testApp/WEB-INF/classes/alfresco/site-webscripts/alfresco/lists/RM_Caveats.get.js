/* global model*/

var caveatsBreadcrumbTrail = {
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
};

var newCaveatButton = {
   name: "alfresco/buttons/AlfButton",
   config: {
      additionalCssClasses: "call-to-action",
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
};

var caveatList = {
   name: "alfresco/lists/AlfList",
   config: {
      noDataMessage: "No caveats configured",
      loadDataPublishTopic: "ALF_CRUD_GET_ALL",
      loadDataPublishPayload: {
         url: "getAllCaveats"
      },
      widgets: [
         {
            name: "alfresco/lists/views/AlfListView",
            config: {
               additionalCssClasses: "bordered",
               widgetsForHeader: [
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Name"
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Marks"
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Users"
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Groups"
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Actions"
                     }
                  }
               ],
               widgets: [
                  {
                     name: "alfresco/lists/views/layouts/Row",
                     config: {
                        widgets: [
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
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
                                             dialogTitle: "Configure security marks for '{name}'",
                                             widgetsContent: [
                                                {
                                                   name: "alfresco/menus/AlfMenuBar",
                                                   config: {
                                                      pubSubScope: "MARKS_",
                                                      widgets: [
                                                         {
                                                            name: "alfresco/documentlibrary/AlfSelectDocumentListItems",
                                                            config: {
                                                               widgets: [
                                                                  {
                                                                     name: "alfresco/menus/AlfMenuGroup",
                                                                     config: {
                                                                        widgets: [
                                                                           {
                                                                              name: "alfresco/menus/AlfMenuItem",
                                                                              config: {
                                                                                 label: "select.all.label",
                                                                                 publishTopic: "ALF_DOCLIST_FILE_SELECTION",
                                                                                 publishPayload: {
                                                                                    label: "All",
                                                                                    value: "selectAll"
                                                                                 }
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/menus/AlfMenuItem",
                                                                              config: {
                                                                                 label: "select.none.label",
                                                                                 publishTopic: "ALF_DOCLIST_FILE_SELECTION",
                                                                                 publishPayload: {
                                                                                    label: "None",
                                                                                    value: "selectNone"
                                                                                 }
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/menus/AlfMenuItem",
                                                                              config: {
                                                                                 label: "invert.selection.label",
                                                                                 publishTopic: "ALF_DOCLIST_FILE_SELECTION",
                                                                                 publishPayload: {
                                                                                    label: "Invert selection",
                                                                                    value: "selectInvert"
                                                                                 }
                                                                              }
                                                                           }
                                                                        ]
                                                                     }
                                                                  }
                                                               ]
                                                            }
                                                         },
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
                                                                     caveatId: "{caveatId}"
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
                                                                     },
                                                                     {
                                                                        name: "alfresco/forms/controls/RadioButtons",
                                                                        config: {
                                                                           name: "access",
                                                                           label: "Access",
                                                                           description: "What access should users without this mark be given to marked content?",
                                                                           value: false,
                                                                           optionsConfig: {
                                                                              fixed: [
                                                                                 {
                                                                                    label: "None (recommended for better security)",
                                                                                    value: false
                                                                                 },
                                                                                 {
                                                                                    label: "Discoverable (ability to find not view or edit the content)",
                                                                                    value: true
                                                                                 }
                                                                              ]
                                                                           }
                                                                        }
                                                                     }
                                                                  ]
                                                               }
                                                            }
                                                         },
                                                         {
                                                            name: "alfresco/documentlibrary/AlfSelectedItemsMenuBarPopup",
                                                            config: {
                                                               label: "Selected items...",
                                                               widgets: [
                                                                  {
                                                                     name: "alfresco/menus/AlfMenuGroup",
                                                                     config: {
                                                                        widgets: [
                                                                           {
                                                                              name: "alfresco/menus/AlfMenuItem",
                                                                              config: {
                                                                                 iconClass: "alf-edit-icon",
                                                                                 label: "Edit"
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/menus/AlfMenuItem",
                                                                              config: {
                                                                                 iconClass: "alf-delete-icon",
                                                                                 label: "Remove"
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
                                                   name: "alfresco/lists/AlfList",
                                                   config: {
                                                      pubSubScope: "MARKS_",
                                                      itemKeyProperty: "markId",
                                                      noDataMessage: "No security marks configured",
                                                      loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                                                      loadDataPublishPayload: {
                                                         url: "getAllSecurityMarks?caveatId={caveatId}"
                                                      },
                                                      widgets: [
                                                         {
                                                            name: "alfresco/lists/views/AlfListView",
                                                            config: {
                                                               additionalCssClasses: "bordered",
                                                               widgetsForHeader: [
                                                                  {
                                                                     name: "alfresco/lists/views/layouts/HeaderCell",
                                                                     config: {
                                                                        label: "" // Selector - no label
                                                                     }
                                                                  },
                                                                  {
                                                                     name: "alfresco/lists/views/layouts/HeaderCell",
                                                                     config: {
                                                                        label: "Name"
                                                                     }
                                                                  },
                                                                  {
                                                                     name: "alfresco/lists/views/layouts/HeaderCell",
                                                                     config: {
                                                                        label: "Discoverable?"
                                                                     }
                                                                  },
                                                                  {
                                                                     name: "alfresco/lists/views/layouts/HeaderCell",
                                                                     config: {
                                                                        label: "Users"
                                                                     }
                                                                  },
                                                                  {
                                                                     name: "alfresco/lists/views/layouts/HeaderCell",
                                                                     config: {
                                                                        label: "Groups"
                                                                     }
                                                                  },
                                                                  {
                                                                     name: "alfresco/lists/views/layouts/HeaderCell",
                                                                     config: {
                                                                        label: "" // Actions - no label
                                                                     }
                                                                  }
                                                               ],
                                                               widgets: [
                                                                  {
                                                                     name: "alfresco/lists/views/layouts/Row",
                                                                     config: {
                                                                        widgets: [
                                                                           {
                                                                              name: "alfresco/lists/views/layouts/Cell",
                                                                              config: {
                                                                                 additionalCssClasses: "mediumpad",
                                                                                 widgets: [
                                                                                    {
                                                                                       name: "alfresco/renderers/Selector",
                                                                                       config: {
                                                                                          itemKey: "markId"
                                                                                       }
                                                                                    }
                                                                                 ]
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/lists/views/layouts/Cell",
                                                                              config: {
                                                                                 additionalCssClasses: "mediumpad",
                                                                                 widgets: [
                                                                                    {
                                                                                       name: "alfresco/renderers/Property",
                                                                                       config: {
                                                                                          propertyToRender: "name"
                                                                                       }
                                                                                    }
                                                                                 ]
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/lists/views/layouts/Cell",
                                                                              config: {
                                                                                 additionalCssClasses: "mediumpad",
                                                                                 widgets: [
                                                                                    {
                                                                                       name: "alfresco/renderers/Boolean",
                                                                                       config: {
                                                                                          propertyToRender: "access"
                                                                                       }
                                                                                    }
                                                                                 ]
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/lists/views/layouts/Cell",
                                                                              config: {
                                                                                 additionalCssClasses: "mediumpad",
                                                                                 widgets: [
                                                                                    {
                                                                                       name: "alfresco/renderers/Property",
                                                                                       config: {
                                                                                          propertyToRender: "userCount"
                                                                                       }
                                                                                    }
                                                                                 ]
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/lists/views/layouts/Cell",
                                                                              config: {
                                                                                 additionalCssClasses: "mediumpad",
                                                                                 widgets: [
                                                                                    {
                                                                                       name: "alfresco/renderers/Property",
                                                                                       config: {
                                                                                          propertyToRender: "groupCount"
                                                                                       }
                                                                                    }
                                                                                 ]
                                                                              }
                                                                           },
                                                                           {
                                                                              name: "alfresco/lists/views/layouts/Cell",
                                                                              config: {
                                                                                 additionalCssClasses: "mediumpad",
                                                                                 widgets: [
                                                                                    {
                                                                                       name: "alfresco/renderers/PublishAction",
                                                                                       config: {
                                                                                          iconClass: "edit-16",
                                                                                          publishTopic: "ALF_CRUD_DELETE",
                                                                                          publishPayloadType: "PROCESS",
                                                                                          publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                                          publishPayload: {
                                                                                             
                                                                                          }
                                                                                       }
                                                                                    },
                                                                                    {
                                                                                       name: "alfresco/renderers/PublishAction",
                                                                                       config: {
                                                                                          iconClass: "delete-16",
                                                                                          publishTopic: "ALF_CRUD_DELETE",
                                                                                          publishPayloadType: "PROCESS",
                                                                                          publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                                          publishPayload: {
                                                                                             url: "deleteSecurityMark?caveatId={caveatId}&markId={markId}",
                                                                                             requiresConfirmation: true,
                                                                                             confirmationTitle: "Delete '{name}'?",
                                                                                             confirmationPrompt: "Are you sure you want to delete '{name}'?"
                                                                                          },
                                                                                          publishGlobal: true
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
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "markCount"
                                       }
                                    }
                                 ]
                              }
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "userCount"
                                       }
                                    }
                                 ]
                              }
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "groupCount"
                                       }
                                    }
                                 ]
                              }
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/PublishAction",
                                       config: {
                                          iconClass: "delete-16",
                                          publishTopic: "ALF_CRUD_DELETE",
                                          publishPayloadType: "PROCESS",
                                          publishPayloadModifiers: ["processCurrentItemTokens"],
                                          publishPayload: {
                                             url: "deleteCaveat?caveatId={caveatId}",
                                             requiresConfirmation: true,
                                             confirmationTitle: "Delete '{name}'?",
                                             confirmationPrompt: "Are you sure you want to delete '{name}'?"
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
};


var securityClearanceBreadcrumbTrail = {
   name: "alfresco/documentlibrary/AlfBreadcrumbTrail",
   config: {
      breadcrumbs: [
         {
            label: "Admin Tools"
         },
         {
            label: "Security clearance"
         }
      ]
   }
};

var securityClearanceToolBar = {
   name: "alfresco/menus/AlfMenuBar",
   config: {
      widgets: [
         {
            name: "alfresco/documentlibrary/AlfSelectDocumentListItems",
            config: {
               widgets: [
                  {
                     name: "alfresco/menus/AlfMenuGroup",
                     config: {
                        widgets: [
                           {
                              name: "alfresco/menus/AlfMenuItem",
                              config: {
                                 label: "select.all.label",
                                 publishTopic: "ALF_DOCLIST_FILE_SELECTION",
                                 publishPayload: {
                                    label: "All",
                                    value: "selectAll"
                                 }
                              }
                           },
                           {
                              name: "alfresco/menus/AlfMenuItem",
                              config: {
                                 label: "select.none.label",
                                 publishTopic: "ALF_DOCLIST_FILE_SELECTION",
                                 publishPayload: {
                                    label: "None",
                                    value: "selectNone"
                                 }
                              }
                           },
                           {
                              name: "alfresco/menus/AlfMenuItem",
                              config: {
                                 label: "invert.selection.label",
                                 publishTopic: "ALF_DOCLIST_FILE_SELECTION",
                                 publishPayload: {
                                    label: "Invert selection",
                                    value: "selectInvert"
                                 }
                              }
                           }
                        ]
                     }
                  }
               ]
            }
         },
         {
            name: "alfresco/documentlibrary/AlfSelectedItemsMenuBarPopup",
            config: {
               label: "Selected items...",
               widgets: [
                  {
                     name: "alfresco/menus/AlfMenuGroup",
                     config: {
                        widgets: [
                           {
                              name: "alfresco/menus/AlfMenuItem",
                              config: {
                                 iconClass: "alf-edit-icon",
                                 label: "Set caveats",
                                 publishTopic: "ALF_RM_APPLY_CAVEATS_DIALOG",
                                 publishGlobal: true
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
};

var securityClearanceList = {
   name: "alfresco/lists/AlfFilteredList",
   config: {
      // pubSubScope: "SECURITY_CLEARANCE_",
      itemKeyProperty: "name",
      loadDataPublishTopic: "ALF_CRUD_GET_ALL",
      loadDataPublishPayload: {
         url: "getUsersAndGroups"
      },
      filteringTopics: ["_valueChangeOf_FILTER"],
      widgetsForFilters: [
         {
            name: "alfresco/forms/controls/TextBox",
            config: {
               fieldId: "TEXTBOX_FILTER",
               name: "name",
               placeHolder: "Search...",
               label: ""
            }
         },
         {
            name: "alfresco/forms/controls/Select",
            config: {
               fieldId: "DROPDOWN_FILTER",
               name: "usersOrGroups",
               label: "",
               optionsConfig: {
                  fixed: [
                     {
                        label: "Users and Groups",
                        value: "BOTH"
                     },
                     {
                        label: "Invidual users",
                        value: "USER"
                     },
                     {
                        label: "User groups",
                        value: "GROUP"
                     }
                  ]
               }
            }
         }
      ],
      widgets: [
         {
            name: "alfresco/lists/views/AlfListView",
            config: {
               additionalCssClasses: "bordered",
               noItemsMessage: "No results",
               widgetsForHeader: [
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "" // Selector
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "" // Avatar thumbnail
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Name"
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Caveats"
                     }
                  },
                  {
                     name: "alfresco/lists/views/layouts/HeaderCell",
                     config: {
                        label: "Clearances"
                     }
                  }
               ],
               widgets: [
                  {
                     name: "alfresco/lists/views/layouts/Row",
                     config: {
                        widgets: [
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 width: "16px",
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/Selector",
                                       config: {
                                          
                                       }
                                    }
                                 ]
                              }
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 width: "100px",
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/AvatarThumbnail",
                                       config: {
                                          // propertyToRender: "description"
                                       }
                                    }
                                 ]
                              }
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "name"
                                       }
                                    }
                                 ]
                              }
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    
                                 ]
                              }
                           },
                           {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                 additionalCssClasses: "mediumpad",
                                 widgets: [
                                    
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
};

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
         name: "alfresco/layout/AlfTabContainer",
         config: {
            widgets: [
               {
                  name: "alfresco/layout/VerticalWidgets",
                  title: "Caveats Marks",
                  config: {
                     widgets: [
                        caveatsBreadcrumbTrail,
                        {
                           name: "alfresco/layout/TitleDescriptionAndContent",
                           config: {
                              title: "Caveats and Security Marks",
                              description: "Meaningful short description of marks and their use...",
                              widgets: [
                                 newCaveatButton,
                                 caveatList
                              ]
                           }
                        }
                     ]
                  }  
               },
               {
                  name: "alfresco/layout/VerticalWidgets",
                  title: "Security Clearance",
                  config: {
                     pubSubScope: "SECURITY_CLEARANCE_",
                     widgets: [
                        securityClearanceBreadcrumbTrail,
                        {
                           name: "alfresco/layout/TitleDescriptionAndContent",
                           config: {
                              title: "Security Clearance",
                              description: "Meaningful short description of security clearance and it's use...",
                              widgets: [
                                 securityClearanceToolBar,
                                 securityClearanceList
                              ]
                           }
                        }
                     ]
                  }
               },
               {
                  name: "alfresco/layout/VerticalWidgets",
                  title: "Logging",
                  delayProcessing: false,
                  config: {
                     widgets: [
                        {
                           name: "aikauTesting/mockservices/RMSecurityMockXhr"
                        },
                        {
                           name: "alfresco/logging/DebugLog"
                        }
                     ]
                  }
               }
            ]
         }
      }
   ]
};