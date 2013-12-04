Mobile Design Templates
===========
Quickly build engaging enterprise mobile apps with these high-impact visual design templates that utilize mobile-optimized HTML5 and CSS3 to give your customers the best user experience. Combine these modular design templates with Salesforce Mobile Services and [Developer Mobile Packs](http://www2.developerforce.com/mobile/services/mobile-packs) to connect to Salesforce Platform and access customer data. View, edit and update customer data, view backend reports, find nearby records, and more using these templates. Take advantage of these customizable, open-source templates and focus on building engaging mobile apps for your customers, employees, and partners.

[The Template home page](http://www2.developerforce.com/mobile/services/mobile-templates) has a detailed walkthrough of the different templates included in this repo. Be sure to also see the [Mobile Templates Jumpstarter sample app](https://github.com/developerforce/MobileTemplates-JumpstartApp) for an example of building an HTML 5 mobile app using Mobile Design Templates. For additional information, please refer to the [Mobile Design Templates FAQ](http://www2.developerforce.com/mobile/services/mobile-templates/templates-faq).

Key Features
============
* Modular and customizable open-source CSS3 and HTML5 markup that can be modified at will to meet the specific UI/UX requirements of a mobile app.
* Combine these static templates with a JavaScript library like [ForceTk](https://github.com/developerforce/Force.com-JavaScript-REST-Toolkit) or one of the [Mobile Packs for Backbone, Angular or Knockout](http://www2.developerforce.com/mobile/services/mobile-packs) to provide live data bindings with any Salesforce backend.
* Cross-platform (iOS, Android etc.) support courtesy of the use of standard web technologies like HTML5, CSS3 and JavaScript.
* Optimized for the phone form factor.
* Use-case agnostic. The base HTML5/CSS3 can be modified to work with any Salesforce object (Standard or Custom) in the context of any mobile use case.

Gallery
============
Check out the Mobile [Design Templates Gallery](https://github.com/developerforce/Mobile-Design-Templates/wiki/Gallery) for a quick look at all the templates included in this repo.


#Getting Started
## Visualforce
Step 1. `git clone https://github.com/developerforce/Mobile-Design-Templates.git` or Download it as Zip by clicking on Download ZIP button. If you have downloaded it as a ZIP file, unzip it.

Step 2. You only need files in `common/js`, `common/css` and `common/images`, but for simplicity sake just zip the whole `common` folder.

Step 3. Upload it as static resource with name `Mobile-Design-Templates`.
 
Step 4.  Create a new Visualforce page.

Step 5. Reference the JS, CSS & Images in your Visualforce page like below:

```
   <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, 
                                  minimum-scale=1, maximum-scale=1, user-scalable=no"/> 
      <apex:stylesheet value="{!URLFOR($Resource.Mobile_Design_Templates, 
                'Mobile-Design-Templates-master/common/css/app.min.css')}"/>
      <apex:includeScript value="{!URLFOR($Resource.Mobile_Design_Templates, 
                'Mobile-Design-Templates-master/common/js/jQuery2.0.2.min.js')}"/>
      <apex:includeScript value="{!URLFOR($Resource.Mobile_Design_Templates, 
                'Mobile-Design-Templates-master/common/js/jquery.touchwipe.min.js')}"/>
      <apex:includeScript value="{!URLFOR($Resource.Mobile_Design_Templates, 
                'Mobile-Design-Templates-master/common/js/main.min.js')}"/>
   </head>
   <body>
     <!-- Copy Paste Template HTML's body here -->
   </body>
 
   ```
 
Step 6.  The downloaded repo has all the templates arranged in different folders. For example `List View` folder alone has `Standard.html`, `Tabbed.html`, `Picture.html` etc 6 templates.
 
 
 Step 7. Open one of those templates and copy-paste the `body` of the template into your visualforce page.
 
 Step 8. That should show the template in your Visual force page. 
 

   
## Hybrid (Local or Remote)
(You plan to create a hybrid app and store js, css etc <a href='http://www2.developerforce.com/en/mobile/getting-started/ios#hybrid' target='_blank'> locally in the app</a> or  <a href='http://www2.developerforce.com/en/mobile/getting-started/html5' target='_blank'> run it remotely on Heroku </a>)

Step 1. `git clone https://github.com/developerforce/Mobile-Design-Templates.git` or Download it as Zip by clicking on Download ZIP button. If you have downloaded it as a ZIP file, unzip it.

Step 2. You only need files in `common/js`, `common/css` and `common/images`.

Step 3.  The downloaded repo has all the templates arranged in different folders. For example `List View` folder alone has `Standard.html`, `Tabbed.html`, `Picture.html` etc 6 templates.

Step 4: Copy the files in Step #2 and one of the templates and refer JS, CSS, Images from the template files.

## For More..
* Read <a href='http://blogs.developerforce.com/developer-relations/2013/08/getting-started-with-mobile-design-templates.html' target='_blank'>Getting Started With Mobile Design Templates</a> blog. 
* Read <a href='http://blogs.developerforce.com/developer-relations/2013/08/simple-calendar-app-with-mobile-design-templates.html' target='_blank'>Simple Calendar App with Mobile Design Templates</a> blog. 
*  Read <a href='http://blogs.developerforce.com/developer-relations/2013/08/capturematic-leveraging-mobile-templates-in-a-backbone-js-app.html' target='_blank'>Capturematic: Leveraging Mobile Templates in a Backbone.js App</a> blog. 


 




[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/developerforce/mobile-design-templates/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

