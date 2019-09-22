# Setting up the front end

1. I created a subdirectory `/paste` in a website I have control over.
1. I had to update the .htaccess in that directory (found in `/aws_lambda/.htaccess`)
1. I had to buid for prod with `ng build --prod --base-href /paste/ --deploy-url /paste/`
1. I uploaded all the files from the `dist` directory there.
