'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">edu-atlas documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-e108f288d289cbc718011271f87b7943"' : 'data-target="#xs-components-links-module-AdminModule-e108f288d289cbc718011271f87b7943"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-e108f288d289cbc718011271f87b7943"' :
                                            'id="xs-components-links-module-AdminModule-e108f288d289cbc718011271f87b7943"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminCouponsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminCouponsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminInstituteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminInstituteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminInstitutesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminInstitutesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminPlansComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminPlansComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminSavePlanComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminSavePlanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminSmsPackComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminSmsPackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveAdminCouponsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SaveAdminCouponsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveAdminSmsPackComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SaveAdminSmsPackComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-87f8d1ba774173bd530c4e4d8705a8fb"' : 'data-target="#xs-components-links-module-AppModule-87f8d1ba774173bd530c4e4d8705a8fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-87f8d1ba774173bd530c4e4d8705a8fb"' :
                                            'id="xs-components-links-module-AppModule-87f8d1ba774173bd530c4e4d8705a8fb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OtpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OtpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TermsAndConditionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TermsAndConditionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BranchModule.html" data-type="entity-link">BranchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BranchModule-309a6e97dd6b19a8dc485a6a05401f92"' : 'data-target="#xs-components-links-module-BranchModule-309a6e97dd6b19a8dc485a6a05401f92"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BranchModule-309a6e97dd6b19a8dc485a6a05401f92"' :
                                            'id="xs-components-links-module-BranchModule-309a6e97dd6b19a8dc485a6a05401f92"' }>
                                            <li class="link">
                                                <a href="components/AddBatchesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddBatchesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCourseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddCourseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddEmployeeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddEmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BranchConfComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BranchConfComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiscountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiscountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageBatchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageBatchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageCourseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageCourseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageDiscountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageDiscountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageEmployeeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageEmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageReceiptComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageReceiptComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReceiptConfComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReceiptConfComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewCourseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewCourseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewEmployeeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewEmployeeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BranchRoutingModule.html" data-type="entity-link">BranchRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CheckoutModule.html" data-type="entity-link">CheckoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CheckoutModule-e1c6422989ff79587a2d8edb1b20f37c"' : 'data-target="#xs-components-links-module-CheckoutModule-e1c6422989ff79587a2d8edb1b20f37c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CheckoutModule-e1c6422989ff79587a2d8edb1b20f37c"' :
                                            'id="xs-components-links-module-CheckoutModule-e1c6422989ff79587a2d8edb1b20f37c"' }>
                                            <li class="link">
                                                <a href="components/CheckoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommRoutingModule.html" data-type="entity-link">CommRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CommunicationModule.html" data-type="entity-link">CommunicationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CommunicationModule-e479e4961ca9d9a72be3a050f03bd305"' : 'data-target="#xs-components-links-module-CommunicationModule-e479e4961ca9d9a72be3a050f03bd305"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommunicationModule-e479e4961ca9d9a72be3a050f03bd305"' :
                                            'id="xs-components-links-module-CommunicationModule-e479e4961ca9d9a72be3a050f03bd305"' }>
                                            <li class="link">
                                                <a href="components/AddForumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnnouncementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnnouncementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommunicationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommunicationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForumDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForumDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageAnnouncementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageAnnouncementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyForumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewAnnouncementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewAnnouncementsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InstituteModule.html" data-type="entity-link">InstituteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InstituteModule-394cd7bd9075daf6bade66e0b62a6bd6"' : 'data-target="#xs-components-links-module-InstituteModule-394cd7bd9075daf6bade66e0b62a6bd6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InstituteModule-394cd7bd9075daf6bade66e0b62a6bd6"' :
                                            'id="xs-components-links-module-InstituteModule-394cd7bd9075daf6bade66e0b62a6bd6"' }>
                                            <li class="link">
                                                <a href="components/AddAttendanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddInstituteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddInstituteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddLeadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddLeadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddScheduleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddStudentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddStudentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttandanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AttandanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstituteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstituteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstituteHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InstituteHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageInstituteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageInstituteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageLeadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageLeadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageScheduleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageStudentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageStudentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PendingStudentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PendingStudentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudyMaterialComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudyMaterialComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewAttendanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewInstituteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewInstituteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewLeadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewLeadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewScheduleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewStudentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewStudentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InstRoutingModule.html" data-type="entity-link">InstRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MiscellaneousModule.html" data-type="entity-link">MiscellaneousModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MiscellaneousModule-d469bdb8b4c6966390f4467624c4d3a0"' : 'data-target="#xs-components-links-module-MiscellaneousModule-d469bdb8b4c6966390f4467624c4d3a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MiscellaneousModule-d469bdb8b4c6966390f4467624c4d3a0"' :
                                            'id="xs-components-links-module-MiscellaneousModule-d469bdb8b4c6966390f4467624c4d3a0"' }>
                                            <li class="link">
                                                <a href="components/MiscellaneousComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MiscellaneousComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MiscellaneousRoutingModule.html" data-type="entity-link">MiscellaneousRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OnlineClassesModule.html" data-type="entity-link">OnlineClassesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OnlineClassesModule-086d0e3f8363b5e5f79b02830365d2e1"' : 'data-target="#xs-components-links-module-OnlineClassesModule-086d0e3f8363b5e5f79b02830365d2e1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OnlineClassesModule-086d0e3f8363b5e5f79b02830365d2e1"' :
                                            'id="xs-components-links-module-OnlineClassesModule-086d0e3f8363b5e5f79b02830365d2e1"' }>
                                            <li class="link">
                                                <a href="components/AddOnlineClassComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddOnlineClassComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddOnlineClassLinkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddOnlineClassLinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageOnlineClassComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageOnlineClassComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OnlineClassLinksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlineClassLinksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OnlineClassSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlineClassSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OnlineClassesConfComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlineClassesConfComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OnlineClassesUpgradeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlineClassesUpgradeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayVideoRecordingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayVideoRecordingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadClassRecordingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadClassRecordingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UtilitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UtilitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewClassRecordingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewClassRecordingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OnlineClassesRoutingModule.html" data-type="entity-link">OnlineClassesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link">PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PagesModule-1169fb66e65c2a8cf6168717a3176a40"' : 'data-target="#xs-components-links-module-PagesModule-1169fb66e65c2a8cf6168717a3176a40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-1169fb66e65c2a8cf6168717a3176a40"' :
                                            'id="xs-components-links-module-PagesModule-1169fb66e65c2a8cf6168717a3176a40"' }>
                                            <li class="link">
                                                <a href="components/ChangePasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangePasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ECommerceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ECommerceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MembershipComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MembershipComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PagesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmsRechargeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SmsRechargeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesRoutingModule.html" data-type="entity-link">PagesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-01e862915081e7fdc6d25c3c89713291"' : 'data-target="#xs-pipes-links-module-SharedModule-01e862915081e7fdc6d25c3c89713291"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-01e862915081e7fdc6d25c3c89713291"' :
                                            'id="xs-pipes-links-module-SharedModule-01e862915081e7fdc6d25c3c89713291"' }>
                                            <li class="link">
                                                <a href="pipes/SafeHtmlPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeHtmlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentModule.html" data-type="entity-link">StudentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StudentModule-9fcdccfdee7c430c893620cf11dfa745"' : 'data-target="#xs-components-links-module-StudentModule-9fcdccfdee7c430c893620cf11dfa745"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentModule-9fcdccfdee7c430c893620cf11dfa745"' :
                                            'id="xs-components-links-module-StudentModule-9fcdccfdee7c430c893620cf11dfa745"' }>
                                            <li class="link">
                                                <a href="components/OnlineClassLinkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlineClassLinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OnlineeClassComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlineeClassComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayLinksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayLinksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentAnnouncementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentAnnouncementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentAttendanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentAttendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentEnrollmentDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentEnrollmentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentForumCommentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentForumCommentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentForumsChatsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentForumsChatsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentInstituteHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentInstituteHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentInstitutesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentInstitutesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentMeetingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentMeetingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentMentoringComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentMentoringComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentPerformanceReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentPerformanceReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentScheduleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentStudyMaterialComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentStudyMaterialComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentTestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentTestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentViewAnnouncementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentViewAnnouncementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentViewEnrollmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentViewEnrollmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentViewScheduleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentViewScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewLinksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewLinksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentReportModule.html" data-type="entity-link">StudentReportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StudentReportModule-9edf836eb5bbd71a7c165494ebdd5c42"' : 'data-target="#xs-components-links-module-StudentReportModule-9edf836eb5bbd71a7c165494ebdd5c42"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentReportModule-9edf836eb5bbd71a7c165494ebdd5c42"' :
                                            'id="xs-components-links-module-StudentReportModule-9edf836eb5bbd71a7c165494ebdd5c42"' }>
                                            <li class="link">
                                                <a href="components/AddPTMsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddPTMsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagePTMsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagePTMsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MentoringComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MentoringComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SheduleMentoringComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SheduleMentoringComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentReportConfComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentReportConfComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentReportRoutingModule.html" data-type="entity-link">StudentReportRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentRoutingModule.html" data-type="entity-link">StudentRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TestsModule.html" data-type="entity-link">TestsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TestsModule-0aee8449fb746e7fcc3cf663197d773f"' : 'data-target="#xs-components-links-module-TestsModule-0aee8449fb746e7fcc3cf663197d773f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TestsModule-0aee8449fb746e7fcc3cf663197d773f"' :
                                            'id="xs-components-links-module-TestsModule-0aee8449fb746e7fcc3cf663197d773f"' }>
                                            <li class="link">
                                                <a href="components/CreateTestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateTestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateTestsScoreComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateTestsScoreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageTestsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageTestsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewReportComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestsRoutingModule.html" data-type="entity-link">TestsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ThemeModule.html" data-type="entity-link">ThemeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' : 'data-target="#xs-components-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' :
                                            'id="xs-components-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OneColumnLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OneColumnLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ThreeColumnsLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThreeColumnsLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TinyMCEComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TinyMCEComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TwoColumnsLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TwoColumnsLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' : 'data-target="#xs-pipes-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' :
                                            'id="xs-pipes-links-module-ThemeModule-21057c9ae3f283756b22e0049f4999db"' }>
                                            <li class="link">
                                                <a href="pipes/CapitalizePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CapitalizePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NumberWithCommasPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumberWithCommasPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PluralPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PluralPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/RoundPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RoundPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TimingPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimingPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/NbSimpleRoleProvider.html" data-type="entity-link">NbSimpleRoleProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserData.html" data-type="entity-link">UserData</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link">AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnalyticsService.html" data-type="entity-link">AnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnnouncementService.html" data-type="entity-link">AnnouncementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link">ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttendanceService.html" data-type="entity-link">AttendanceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link">CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CouponService.html" data-type="entity-link">CouponService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link">EmployeeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InstituteService.html" data-type="entity-link">InstituteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link">LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeetingService.html" data-type="entity-link">MeetingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link">MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OtpService.html" data-type="entity-link">OtpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link">PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleAssignService.html" data-type="entity-link">RoleAssignService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScheduleService.html" data-type="entity-link">ScheduleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeoService.html" data-type="entity-link">SeoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmsPackService.html" data-type="entity-link">SmsPackService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocketioService.html" data-type="entity-link">SocketioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StateService.html" data-type="entity-link">StateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentService.html" data-type="entity-link">StudentService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminAuthGuard.html" data-type="entity-link">AdminAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/BranchAuthGuard.html" data-type="entity-link">BranchAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EaLiveGuard.html" data-type="entity-link">EaLiveGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EaLiveLitePlusGuard.html" data-type="entity-link">EaLiveLitePlusGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EaLiveValuePowerGuard.html" data-type="entity-link">EaLiveValuePowerGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/InstituteAuthGuard.html" data-type="entity-link">InstituteAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginAuthGuard.html" data-type="entity-link">LoginAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ManageInstituteAuthGuard.html" data-type="entity-link">ManageInstituteAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentAuthGuard.html" data-type="entity-link">StudentAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentEaLiveGuard.html" data-type="entity-link">StudentEaLiveGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthResponseData.html" data-type="entity-link">AuthResponseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BatchData.html" data-type="entity-link">BatchData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseData.html" data-type="entity-link">CourseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiscountData.html" data-type="entity-link">DiscountData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InstituteData.html" data-type="entity-link">InstituteData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReceiptData.html" data-type="entity-link">ReceiptData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StudentsData.html" data-type="entity-link">StudentsData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyOTP.html" data-type="entity-link">VerifyOTP</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});