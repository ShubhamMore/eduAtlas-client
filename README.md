installation process (this is only in developing mode)
1.npm i 
2.don't run npm audit (it will break the application)
3.ng serve 

Eduatlus dependency
1.anglar/cli = ^8.0.2
2.typescript = 3.4.1
3.nebular/theme = 4.4.0
4.angular-in-memory-web-api= ^0.8.0


Folder Structure
1.@core    (Need to remove data from this folder)
2.@theme -> components -> footer, header, search-input, tiny-mice, index.ts	
3.admin -> forgot-password 
	-> login
	-> otp
	-> sign-up
4.pages(project inner part start from here)
	-> communication(Feature Module) -> announcement(component)	
					 -> communication(moduel, routing-module)	
	-> e-commerce(Institute Dashboard)
	-> home (after Login landing page) shows multiple institutes 					    
	-> institute (Feature Module)
		-> add-institute (component) -> manage-institute(component)
					     -> mime-type.validator.ts (Institute Logo Validation)	
		-> add-students(component) -> manage-students(active Students)
					   -> pending-student
		-> attandance(component)(only add attandance)
		-> branch-conf(Feature Module)
			-> add-batch -> manage-batch
			-> add-course -> manage-course
					-> view-course
			-> branch(module, routing-module)
			-> discount -> manage-discount
			-> receipt-conf -> manage-receipt
			-> role-management (only add role)
		-> institute(module, routing-module)
	
	-> membership (component)
	-> miscellaneous (component) shows 404 error for undefined route
	-> schedule 	-> add-schedule
			-> manage-schedule
			-> view-schedule
	-> page-menu.ts (shows sidebard menu)
	-> pages-routing.module.ts
	-> pages.component.scss
	-> pages.component.ts
	-> pages.module.ts
----------------------------------------------------------------------------

SERVICES
 services 	-> auth-interceptor(no use)
		-> otp (service)
		-> role (service)
		-> schedule (service)
		-> api.service (crud operation for INSTITUTE, STUDENT, BRANCH-CONF)
		-> auth.service (LOGIN, SIGN-UP)
		-> country.service (Third party api, to fetch country,state,city in add-Institute component)
--------------------------------------------------------------------------------

app-routing.module (Pages, login, sign-Up)
app.component.ts
app.module.ts
------------------------------------------------------------------------------------
GUARDS
auth.guard.ts -> login
bManager.guard.ts -> Branch Manger Guard
counsellor.guard.ts 
institute.guard.ts
teacher.guard.ts
		
			

		    	