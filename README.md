# Paste House Project

This project was created by Sid M as the honors project for Front-End JavaScript Frameworks: Angular on Coursera (https://www.coursera.org/learn/angular/home/welcome)

See it running here : http://siddhant.name/paste/

---

You can see more details in the `docs/` directory, including:  
- Ideation (in markdown, pdf and rtf)  
- UI design (in pdf and rtf)  
- Final report (in pdf and rtf)  
- Setting up backend using AWS (md)  
- Setting up frontend on an apache based webserver (md) 

---

Note that `app/shared/urls.ts` is not included in the repository. 
```
export const writeURL = 'https://INSERT URL HERE';
export const readURL = 'http://INSERT URL HERE'; 
```
These two endpoints point to S3 (to read) and (AWS Lambda function through an) API Gateway (to write).   
(See `docs/backend.md` for more details)